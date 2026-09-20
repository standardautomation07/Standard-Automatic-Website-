import { existsSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src");
const isFile = (p) => existsSync(p) && statSync(p).isFile();
const withExt = (p) => [p, p + ".ts", p + ".tsx", path.join(p, "index.ts")].find(isFile);
export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    const hit = withExt(path.join(SRC, specifier.slice(2)));
    if (hit) return { url: pathToFileURL(hit).href, shortCircuit: true };
  }
  if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL?.startsWith("file:") && !path.extname(specifier)) {
    const hit = withExt(path.resolve(path.dirname(fileURLToPath(context.parentURL)), specifier));
    if (hit) return { url: pathToFileURL(hit).href, shortCircuit: true };
  }
  return next(specifier, context);
}
export async function load(url, context, next) {
  if (url.endsWith(".json") && !context.importAttributes?.type) return next(url, { ...context, importAttributes: { type: "json" } });
  return next(url, context);
}
