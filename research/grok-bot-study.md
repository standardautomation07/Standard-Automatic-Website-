# How Grok's bots work, and what we could build like them

Research date: 2026-10-30. The xAI documentation pages could not be opened
from the research environment (network blocked), so everything below comes
from search-result summaries of xAI's docs and from third-party coverage.
Statements marked **(xAI)** trace to docs.x.ai or x.ai. Everything else is
secondary reporting and should be checked before we rely on it.

## 1. "Grok bots" means three different things

| Name | What it is | Where it lives |
| --- | --- | --- |
| **@grok on X** | Reply bot. Tag it under a post and it answers in the thread. | X timeline |
| **Grok Bot** | Always-on agents ("AI teammates"), each with a cloud computer. Beta since about Aug 2026. | Grok Bot app, plus `@bot` on X |
| **Grok 4 Heavy / 4.20 multi-agent** | Several model instances work on one prompt in parallel, then merge their answers. | Inside a single Grok answer |

### 1a. @grok, the X reply bot

- Triggered by a mention. It reads the tagged post, plus the post above it
  and any quoted post, as context.
- Grounded in real-time public X posts and web search, which is why its
  answers are current.
- Replies publicly in the thread.
- xAI has not published its internals (routing, hosting, moderation).

### 1b. Grok Bot, the agent product (the closest match to "AI agents")

- **Persistent cloud computer** with a browser, file system and terminal.
  Bots keep working while your own device is off, and they keep files,
  browser sessions and logins across turns.
- **Shared machine (xAI):** every Bot on an account shares one machine and
  gets its own screen on it. xAI warns not to treat separate Bots as a
  security boundary.
- **Named Bots with roles.** One account runs a roster of Bots. Coverage
  lists group chats, agent-to-agent handoffs, skills, routines (scheduled
  jobs), plugins and MCP connectors.
- **Works without APIs:** a Bot signs into your existing tools through the
  browser, so it can use systems that have no clean API.
- **Triggers:** chat in the app, scheduled routines, and tagging `@bot` on
  X. The tagged post, its parent and any quoted post become a task. `@bot`
  posts a short public acknowledgement, and the results stay private in
  the app **(xAI)**.
- **Human approval:** "Auto-review" with custom rules and approval cards,
  plus a per-desktop setting for local commands. An approval does not undo
  work that is already finished.
- **Pricing (xAI FAQ):** no standalone plan. Usage comes from the same
  weekly pool as Grok and Cursor, and prepaid credit covers anything past
  the pool. Included on Premium, Super and Ultra tiers. Recurring routines
  use up the pool every time they run.
- **Not disclosed:** which model runs the Bots, and exact memory limits.

### 1c. Multi-agent "Heavy" reasoning

- Several agents (reported as 4, and 16 on Heavy) attack the same problem
  independently, compare results and combine them into one answer.
  Community reporting names the roles: coordinator, research, logic/math
  and contrarian. This costs roughly 10× more and is much slower.

## 2. The pattern underneath

Every Grok bot is the same loop:

```
trigger (mention / chat / schedule / webhook)
  → gather context (thread, files, memory, live search)
  → model plans and calls tools (search, browser, code, connectors)
  → approval gate for risky actions
  → deliver result (reply, message, file, update in a system)
  → write back to memory
```

Any capable model API with tool use can reproduce this loop. The
differentiators are: (1) **persistence**, meaning state and a workspace
that survive between runs; (2) **triggers** beyond chat; (3) **real tools**
with approval gates; (4) **live data grounding**.

## 3. What this could mean for Standard Automation

Candidate bots, built on the material this repo already has
(`research/product-master.json`, the product and guide pages, and the
structured enquiry in `web/src/lib/enquiry.ts`):

1. **Website sales assistant (chat widget).** Answers product questions
   from our own catalogue, asks the five spec inputs (clear width, clear
   height, application, location, usage) and fills the enquiry form.
   *Lowest effort, highest direct value.*
2. **Enquiry triage bot.** Runs on each new enquiry: classifies it,
   suggests the product and variant, drafts a quotation email for sales
   to approve, and logs it to a sheet or CRM.
3. **Follow-up / routine bot.** Scheduled: chases quotes with no reply,
   sends a daily summary of enquiries, and watches competitor pages.
4. **Social reply bot (like @grok).** Answers mentions on X, LinkedIn or
   WhatsApp Business. Needs those platforms' APIs and strict moderation.
5. **Content/SEO bot.** Drafts new resource guides from the research files
   for human review.

Recommended order: 1 → 2 → 3. Each one reuses the previous one's catalogue
knowledge and tools.

## 4. Decisions needed before building

- Which bot(s) first, and on which channels (website, WhatsApp, email, X)?
- Model provider and budget (Claude, Grok API, or another).
- Where conversations and leads are stored (email only, Google Sheet, CRM,
  database such as Supabase).
- Which actions may run without human approval (for example, sending an
  email to a customer).

## Sources

- xAI: [Grok Bot overview](https://docs.x.ai/grok-bot/overview),
  [Grok Bot FAQ](https://docs.x.ai/grok-bot/faq),
  [Grok Bot changelog](https://x.ai/changelog/bot),
  [API tools overview](https://docs.x.ai/docs/tools/overview)
- X: [About Grok](https://help.x.com/en/using-x/about-grok)
- Coverage: [Unite.AI](https://www.unite.ai/xai-launches-grok-bot-always-on-ai-teammates-with-their-own-cloud-computers/),
  [Composio guide](https://composio.dev/content/guide-to-frok-bot),
  [Digital Applied](https://www.digitalapplied.com/blog/grok-bot-ai-teammates-launch-cloud-computer-2026),
  [Paralect](https://www.paralect.com/stack/grok-bot),
  [LLM Matchmaker](https://www.llmmatchmaker.com/blog/grok-bot-x-subscription),
  [AIToolsReview](https://aitoolsreview.co.uk/insights/grok-bot-agent-launch),
  [Layer3 Labs](https://www.layer3labs.io/guides/what-is-grok-bot),
  [OfficeChai on Grok 4 Heavy](https://officechai.com/miscellaneous/elon-musk-explains-how-grok4-heavy-xais-multi-agent-reasoning-model-works/),
  [Verdent on Grok 4.20](https://www.verdent.ai/guides/grok-4-20-multi-agent-system)
