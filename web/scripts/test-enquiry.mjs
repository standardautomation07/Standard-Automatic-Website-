/**
 * Enquiry delivery tests.
 *
 *   npm run test:enquiry
 *
 * Exercises validation, the composed email and the delivery boundary. The
 * SMTP send is made against a throwaway local mail server started by this
 * script, so the suite proves a real SMTP conversation end to end without
 * needing a password and without a message ever leaving the machine.
 */
import net from "node:net";

const sample = {
  name: "Rahul Deshmukh",
  company: "Bharat Logistics Pvt Ltd",
  phone: "+91 98220 11223",
  email: "rahul@bharatlogistics.example",
  product: "high-speed-roll-up-door",
  width: "4200 mm",
  height: "4000 mm",
  application: "warehouse dispatch bay",
  location: "Chakan industrial area",
  city: "Pune",
  quantity: "3 openings",
  projectStage: "budgeting",
  usage: "heavy",
  variant: "stainless guides",
  operation: "motorised",
  message: "Three dispatch bays, high cycle count, need speed and a safety edge. <urgent>",
  sourcePage: "/products/high-speed-doors/high-speed-roll-up-door",
};

const { composeEnquiry, deliverEnquiry, validate } = await import("../src/lib/enquiry.ts");

let fails = 0;
const check = (ok, label, detail = "") => {
  if (!ok) fails++;
  console.log(ok ? "  OK  " : "  FAIL", label, detail);
};

console.log("== validation");
check(Object.keys(validate(sample)).length === 0, "a complete enquiry validates");
check(validate({ ...sample, name: "", message: "" }).name !== undefined, "missing name is rejected");
check(validate({ ...sample, product: "not-a-product" }).product !== undefined, "unknown product is rejected");

console.log("\n== composed email");
const mail = composeEnquiry(sample);
console.log("  subject:", mail.subject);
check(
  mail.subject === "[Website Enquiry] Request for Quote — High Speed Roll-Up Door",
  "subject carries the product name",
);
check(mail.family === "High Speed Doors", "family resolved from the catalogue", mail.family);
for (const [label, needle] of [
  ["customer name", "Rahul Deshmukh"],
  ["company", "Bharat Logistics Pvt Ltd"],
  ["email", "rahul@bharatlogistics.example"],
  ["phone", "+91 98220 11223"],
  ["product", "High Speed Roll-Up Door"],
  ["product family", "High Speed Doors"],
  ["quantity", "3 openings"],
  ["location", "Chakan industrial area"],
  ["city", "Pune"],
  ["usage label", "hundreds of cycles a day"],
  ["message", "Three dispatch bays"],
  ["source page", "/products/high-speed-doors/high-speed-roll-up-door"],
]) {
  check(mail.text.toLowerCase().includes(needle.toLowerCase()), `text body has the ${label}`);
}
check(/Received: .*IST/.test(mail.text), "text body has the date and time");
check(mail.html.includes("&lt;urgent&gt;"), "html body escapes visitor input");

console.log("\n== empty fields are omitted");
const sparse = composeEnquiry({ ...sample, company: "", city: "", variant: "", quantity: "" });
check(!sparse.text.includes("Company:"), "an unfilled field is left out");
check(sparse.text.includes("Name:"), "a filled field is kept");

console.log("\n== delivery: nothing configured");
delete process.env.ENQUIRY_PROVIDER;
const logged = [];
const info = console.info;
console.info = (...a) => logged.push(a.join(" "));
const unconfigured = await deliverEnquiry(sample);
console.info = info;
check(unconfigured === "recorded", "reports 'recorded', never a false 'sent'", unconfigured);
check(logged.join("").includes("Rahul Deshmukh"), "the enquiry is written to the server log");

/* A minimal SMTP server: enough of the protocol for nodemailer to complete a
   session, so the transport, auth and message are all genuinely exercised. */
function fakeSmtp() {
  const session = { mailFrom: "", rcptTo: [], data: "", authSeen: false };
  const server = net.createServer((socket) => {
    let collecting = false;
    socket.write("220 test.local ESMTP\r\n");
    socket.on("data", (chunk) => {
      for (const line of chunk.toString().split("\r\n").filter(Boolean)) {
        if (collecting) {
          if (line === ".") {
            collecting = false;
            socket.write("250 OK queued\r\n");
          } else session.data += line + "\n";
          continue;
        }
        const cmd = line.toUpperCase();
        if (cmd.startsWith("EHLO") || cmd.startsWith("HELO")) socket.write("250-test.local\r\n250 AUTH PLAIN LOGIN\r\n");
        else if (cmd.startsWith("AUTH")) { session.authSeen = true; socket.write("235 OK\r\n"); }
        else if (cmd.startsWith("MAIL FROM")) { session.mailFrom = line; socket.write("250 OK\r\n"); }
        else if (cmd.startsWith("RCPT TO")) { session.rcptTo.push(line); socket.write("250 OK\r\n"); }
        else if (cmd === "DATA") { collecting = true; socket.write("354 send it\r\n"); }
        else if (cmd === "QUIT") { socket.write("221 bye\r\n"); socket.end(); }
        else socket.write("250 OK\r\n");
      }
    });
    socket.on("error", () => {});
  });
  return { server, session };
}

console.log("\n== delivery: SMTP (against a local test server, nothing leaves this machine)");
const { server, session } = fakeSmtp();
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;

process.env.ENQUIRY_PROVIDER = "smtp";
process.env.SMTP_HOST = "127.0.0.1";
process.env.SMTP_PORT = String(port);
process.env.SMTP_USER = "sales@standardautomations.in";
process.env.SMTP_PASSWORD = "test-app-password";
delete process.env.ENQUIRY_TO;
delete process.env.ENQUIRY_FROM;

const sent = await deliverEnquiry(sample);
check(sent === "sent", "reports 'sent' once the server accepts it", sent);
check(session.authSeen, "the session authenticates as the mailbox");
check(session.mailFrom.includes("sales@standardautomations.in"), "envelope sender is the company mailbox", session.mailFrom);
check(
  session.rcptTo.some((r) => r.includes("sales@standardautomations.in")),
  "delivered to sales@standardautomations.in",
  session.rcptTo.join(","),
);
check(/^From: .*sales@standardautomations\.in/m.test(session.data), "From header is the company mailbox, not the visitor");
check(!/^From:.*bharatlogistics/m.test(session.data), "the visitor's domain never appears in From");
check(/^Reply-To: .*rahul@bharatlogistics\.example/m.test(session.data), "Reply-To is the customer");
// The subject contains an em dash, so nodemailer sends it as a MIME
// encoded-word. Decode it before comparing rather than matching raw bytes.
const lines = session.data.split("\n");
const start = lines.findIndex((l) => l.startsWith("Subject: "));
let subjectLine = start === -1 ? "" : lines[start].slice("Subject: ".length);
for (let i = start + 1; i < lines.length && /^[ \t]/.test(lines[i]); i += 1) {
  subjectLine += lines[i].trimStart();
}
const decodedSubject = subjectLine.replace(/=\?UTF-8\?([BQ])\?(.*?)\?=/gi, (_, kind, body) => {
  if (kind.toUpperCase() === "B") return Buffer.from(body, "base64").toString("utf8");
  // Quoted-printable: gather the raw bytes first, then decode as UTF-8, so a
  // multi-byte character such as an em dash survives.
  const bytes = [];
  const source = body.replace(/_/g, " ");
  for (let i = 0; i < source.length; i += 1) {
    if (source[i] === "=" && /^[0-9A-F]{2}$/i.test(source.slice(i + 1, i + 3))) {
      bytes.push(parseInt(source.slice(i + 1, i + 3), 16));
      i += 2;
    } else bytes.push(source.charCodeAt(i));
  }
  return Buffer.from(bytes).toString("utf8");
});
check(decodedSubject === mail.subject, "subject carried into the message", decodedSubject);
check(/Content-Type: text\/plain/.test(session.data) && /Content-Type: text\/html/.test(session.data), "sent as text + html");

console.log("\n== delivery: ENQUIRY_TO overrides the default");
session.rcptTo.length = 0;
process.env.ENQUIRY_TO = "someone.else@example.com";
await deliverEnquiry(sample);
check(session.rcptTo.some((r) => r.includes("someone.else@example.com")), "the environment wins", session.rcptTo.join(","));
delete process.env.ENQUIRY_TO;

console.log("\n== delivery: failures are surfaced, not swallowed");
await new Promise((r) => server.close(r));
let threw = false;
try {
  await deliverEnquiry(sample);
} catch {
  threw = true;
}
check(threw, "an unreachable server throws so the form shows the fallback routes");

delete process.env.SMTP_PASSWORD;
let noCreds = false;
try {
  await deliverEnquiry(sample);
} catch (e) {
  noCreds = e.message.includes("SMTP_USER or SMTP_PASSWORD");
}
check(noCreds, "missing credentials throw rather than dropping the enquiry");

console.log(fails ? `\n${fails} FAILURES` : "\nENQUIRY DELIVERY CHECKS PASSED");
process.exit(fails ? 1 : 0);
