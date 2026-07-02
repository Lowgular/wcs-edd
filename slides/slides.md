---
theme: default
title: Eval Driven Development
info: |
  WCS workshop — measuring AI code generation, one scoreboard at a time.
  18:00–21:00. prompt → context → harness.
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
mdc: true
colorSchema: dark
fonts:
  sans: DM Sans
  serif: DM Serif Display
  mono: DM Mono
  # weights kept default; loaded from Google Fonts at build time
---

<Wordmark class="h-14 mx-auto mb-8 opacity-95" />

# Eval Driven Development

<div class="opacity-70 mt-6">

prompt → context → harness · measured every step

</div>

<div class="abs-br m-6 opacity-50 text-sm">
18:00 – 21:00
</div>

<!--
Tonight's spine: prompt → context → harness.
We never fork WCS. Every move is a config-level seam.
The number on screen drives every decision we make.
-->

---
layout: center
class: text-center
---

# Tonight

<div class="opacity-70 -mt-2 mb-2 text-sm">Three hours · one repo · one number that has to go up</div>

<div class="flex justify-center gap-12 mt-8 text-left text-sm leading-relaxed">

  <div class="flex flex-col gap-3">
    <div><b>Evals 101</b> — how do you grade an improviser?</div>
    <div><b>Prompt Engineering</b> — teach the house rules</div>
    <div><b>Context Engineering</b> — stop shipping the manual</div>
  </div>

  <div class="flex flex-col gap-3">
    <div><b>Harness Engineering</b> — give the model a loop</div>
    <div><b>Advanced Harness</b> — write the loop yourself</div>
    <div><b>What's next</b></div>
  </div>

</div>

<!--
Three hours, one repo, one number that has to go up.
First half: get the score green. Second half: rebuild the machine that clears it.
Agenda mirrors the deck's real sections: Prompt → Context → Harness → Advanced Harness → What's next.
-->

---
layout: center
---

# Meet Andrew

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="neutral" :size="192" />

<div class="text-left max-w-md">

<div v-click="1">

### Senior Angular dev · the team's unofficial tech lead

</div>

<div v-click="2" class="flex flex-wrap gap-2 mt-4 text-sm">
<span class="px-3 py-1 rounded-full border border-white/15">the reliable one</span>
<span class="px-3 py-1 rounded-full border border-white/15">plans work · defines tasks</span>
<span class="px-3 py-1 rounded-full border border-white/15">answers everyone's questions</span>
<span class="px-3 py-1 rounded-full border border-white/15">gets the business</span>
<span class="px-3 py-1 rounded-full border border-white/15">lives for tech · meetups</span>
<span class="px-3 py-1 rounded-full border border-white/15">serious about his craft</span>
<span class="px-3 py-1 rounded-full border border-white/15">AI-curious, a bit skeptical</span>
</div>

</div>

</div>

<!--
MEET ANDREW — the audience's stand-in. Spend a minute making him REAL and SYMPATHETIC; the room
should recognize themselves, or their best teammate, in him.

Who he is:
- The reliable one — always delivers, the team's performer.
- The UNOFFICIAL tech lead: the go-to who plans the work, defines the tasks, and answers everyone's questions.
- Understands the BUSINESS, not just the code.
- Loves the craft — conferences, workshops, meetups. Takes engineering seriously.
- Cautious about AI, but honest enough to see the value in it.

Why these traits matter (the seed we pay off later):
The very skills that make Andrew a great tech lead — PLANNING work, DEFINING tasks, ANSWERING questions,
understanding the business — are EXACTLY the skills of architecting an AI system (an Autonomous Task Solver):
decompose the work, specify each step, judge the output. So the shift "up the stack" isn't abandoning his
craft — it's applying it one level higher. Andrew is the person BEST positioned to make the jump; he just
doesn't know it yet. That tension drives the Problem section next.
-->

---
layout: center
clicks: 4
---

# The role keeps collapsing

<div class="flex items-center justify-center gap-4 mt-12">

<div v-click="1" class="flex flex-col gap-1.5">
<Box tone="slate" title="FE" w="96px" />
<Box tone="slate" title="BE" w="96px" />
<Box tone="slate" title="QA" w="96px" />
</div>

<span v-click="2" class="text-2xl opacity-40">→</span>

<div v-click="2" class="flex flex-col gap-1.5">
<Box tone="slate" title="FE" w="96px" />
<Box tone="slate" title="BE" w="96px" />
</div>

<span v-click="3" class="text-2xl opacity-40">→</span>

<Box v-click="3" tone="sky" title="Full-stack" w="124px" />

</div>

<div v-click="4" class="mt-12 text-center opacity-80">

Each wave puts more on every dev — and bets AI closes the gap.

</div>

<!--
PROBLEM, beat 1 — the shifting landscape. The collapse, left → right: QA disappears first, then the FE/BE
split merges into full-stack. Each wave pushes MORE onto every dev and bets AI closes the gap. Stop at
full-stack here — the FORK ("Product Builder? AI Engineer?") gets its own slide, after Andrew's "what's next?".
-->

---
layout: center
clicks: 4
---

# Andrew does the math

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="worried" />

<div class="text-left flex flex-col gap-4 items-start">

<div v-click="1">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">shrinking team</span>
</div>

<div v-click="2">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">doing the boring stuff</span>
</div>

<div v-click="3">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">expectations keep rising</span>
</div>

<div v-click="4">
<span class="px-3 py-1 rounded-full border border-amber-400/40 text-amber-200 text-sm">what's next?</span>
</div>

</div>

</div>

<!--
PROBLEM, beat 1.5 — Andrew makes it personal (the worried turn). Three facts, nothing fancy:
- DOING THE BORING STUFF — agents write most of the code now; his day is gluing / reviewing / coordinating,
  less of the craft he loved.
- EXPECTATIONS KEEP RISING — his team shrank (2 BE + 2 FE + 1 QA + Scrum Master + PO → 2 full-stack + 1 PM):
  first QA, then FE/BE merged, now product too. Each wave puts more on him.
- …WHAT'S NEXT? — the design? He loves the craft (architecture, implementation, review), not being stretched
  ever wider. He's unsure he can — or wants to — keep up.
Hook: "what's next?" gets two honest answers on the NEXT slide — Product Builder or AI Engineer. The way
forward isn't WIDER (more roles) — it can be DEEPER: architect AI systems, the craft he loves at higher leverage.
-->

---
layout: center
clicks: 4
---

# Two new skill sets

<div v-click="1" class="text-center mb-5">
<span class="px-3 py-1 rounded-full border border-white/15 text-xs opacity-80">shared floor · AI-fluent · automate your own toil</span>
</div>

<div class="grid grid-cols-2 gap-6 text-left">

<div v-click="2" class="p-5 rounded-xl border border-amber-400/30">

### Product Builder

<span class="inline-block px-2.5 py-1 rounded-full border border-amber-400/40 text-amber-200 text-xs">AI-assisted · human in the loop</span>

<div class="flex flex-wrap gap-2 mt-3 text-xs">
<span class="px-2.5 py-1 rounded-full border border-white/15">full-stack</span>
<span class="px-2.5 py-1 rounded-full border border-white/15">UX-heavy</span>
<span class="px-2.5 py-1 rounded-full border border-white/15">daily customer loops</span>
<span class="px-2.5 py-1 rounded-full border border-white/15">ship behind flags</span>
</div>

<div class="mt-4 text-sm opacity-75">optimises → <span class="text-amber-200">customer value & speed</span></div>

</div>

<div v-click="3" class="p-5 rounded-xl border border-violet-400/30">

### AI Engineer

<span class="inline-block px-2.5 py-1 rounded-full border border-violet-400/40 text-violet-200 text-xs">AI-automated · system in the loop</span>

<div class="flex flex-wrap gap-2 mt-3 text-xs">
<span class="px-2.5 py-1 rounded-full border border-white/15">writes agents</span>
<span class="px-2.5 py-1 rounded-full border border-white/15">deterministic workflows</span>
<span class="px-2.5 py-1 rounded-full border border-white/15">reusable & secure</span>
</div>

<div class="mt-4 text-sm opacity-75">optimises → <span class="text-violet-200">automation & security</span></div>

</div>

</div>

<div v-click="4" class="mt-8 text-center opacity-80 text-sm">

Not either / or — two **directions**. Tonight we build the **AI Engineer** set: deeper, the craft Andrew loves.

</div>

<!--
TWO SKILL SETS, not a fork — two emerging DIRECTIONS, both giving the next advantage. AI fluency + automating
your own toil is the SHARED FLOOR (everyone stands on it). They diverge in where you go DEEPER:

PRODUCT BUILDER — AI-ASSISTED, human in the loop. Customer-close, bespoke work; full-stack + business sense +
enjoys delivering customer satisfaction. Lots of UX, fast customer loops. Too custom to fully automate, so the
human stays in the loop. Delivery simplifies: trunk-based, maybe no CI, feature flags, ship daily, test on prod
behind a flag (caveat: low-gate fits reversible / low-stakes; money/safety/compliance still needs gates).
Output = the product. Optimises customer value & speed.

AI ENGINEER — AI-AUTOMATED, system in the loop. Structured/repeatable work; writes agents, builds predictable &
DETERMINISTIC workflows, takes the human OUT of the loop reliably. Output = the automation system itself.
Optimises automation & security.

The axis: ASSISTED (you wield AI live, per bespoke task) vs AUTOMATED (you build the system that runs without
you). Not company size — the WORK. Not either/or — many will blend; pick where you double down.

Why this is Andrew's slide: Product Builder = go WIDER (his worry). AI Engineer = go DEEPER into the craft he
loves, at higher leverage. Tonight we build the AI Engineer set — prompt → context → harness, evals, automated workflows.
-->

---
layout: center
clicks: 6
---

# Evolution of AI

<div class="flex items-stretch justify-center gap-4 mt-6">

<div class="flex flex-col justify-between text-[11px] opacity-50 py-1 text-right leading-tight">
<span>you drive</span>
<span>more automation<br/>wider scope</span>
<span>runs itself</span>
</div>

<div class="flex flex-col items-center gap-1">

<div v-click="1" class="w-[430px] px-4 py-2 rounded-lg flex items-center justify-between border border-white/15 text-white" style="background: linear-gradient(160deg,#64748b,#334155)">
<span class="font-semibold text-sm">Autocomplete</span>
<span class="text-[11px] opacity-80">You code, AI guesses</span>
</div>

<div v-click="2" class="text-base opacity-40 leading-none">↓</div>
<div v-click="2" class="w-[430px] px-4 py-2 rounded-lg flex items-center justify-between border border-white/15 text-white" style="background: linear-gradient(160deg,#06b6d4,#0e7490)">
<span class="font-semibold text-sm">Coding Assistant</span>
<span class="text-[11px] opacity-80">You ask, AI answers</span>
</div>

<div v-click="3" class="text-base opacity-40 leading-none">↓</div>
<div v-click="3" class="w-[430px] px-4 py-2 rounded-lg flex items-center justify-between border border-white/15 text-white" style="background: linear-gradient(160deg,#3d9ad9,#1b5e88)">
<span class="font-semibold text-sm">Coding Agent</span>
<span class="text-[11px] opacity-80">You explain, AI implements</span>
</div>

<div v-click="4" class="text-base opacity-40 leading-none">↓</div>
<div v-click="4" class="w-[430px] px-4 py-2 rounded-lg flex items-center justify-between border border-white/15 text-white" style="background: linear-gradient(160deg,#6366f1,#3730a3)">
<span class="font-semibold text-sm">Task Agents</span>
<span class="text-[11px] opacity-80">You spec, AI creates PR</span>
</div>

<div v-click="5" class="text-base opacity-40 leading-none">↓</div>
<div v-click="5" class="w-[430px] px-4 py-2 rounded-lg flex items-center justify-between border border-white/15 text-white" style="background: linear-gradient(160deg,#8b5cf6,#5b21b6)">
<span class="font-semibold text-sm">Workflow</span>
<span class="text-[11px] opacity-80">You verify, AI fixes</span>
</div>

<div v-click="6" class="text-base opacity-40 leading-none">↓</div>
<div v-click="6" class="w-[430px] px-4 py-2 rounded-lg flex items-center justify-between border border-white/15 text-white" style="background: linear-gradient(160deg,#22c55e,#15803d)">
<span class="font-semibold text-sm">Dark Factory</span>
<span class="text-[11px] opacity-80">You architect, AI does all</span>
</div>

</div>

</div>

<!--
EVOLUTION OF AI — top → bottom the division of labor shifts from YOU to the AI. Read each as "you X, ai Y":
1. Autocomplete — you write, ai guesses.
2. Coding Assistant — you write, ai proposes.
3. Coding Agent — you explain, ai writes.
4. Task Agents — specs saved, ai solves the task.
5. Workflow — you check, ai writes all (chained tasks; your checks are the gates).
6. Dark Factory — you trust, ai does all (lights-out, no human in the loop; term from fully-automated manufacturing).
Left axis: you drive (top) → runs itself (bottom). Going down, your share shrinks and scope widens
(line → task → tasks → workflow → whole factory). The AI Engineer's craft lives in the LOWER half — the specs,
checks, and harness that make Task Agents → Dark Factory trustworthy. That's tonight.
-->

---
layout: center
clicks: 4
---

# Andrew gets excited

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="excited" />

<div class="text-left flex flex-col gap-4 items-start">

<div v-click="1">
<span class="px-3 py-1 rounded-full border border-emerald-400/40 text-emerald-200 text-sm">still engineering!</span>
</div>

<div v-click="2">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">but AI makes mistakes</span>
</div>

<div v-click="3">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">it needs my context</span>
</div>

<div v-click="4">
<span class="px-3 py-1 rounded-full border border-amber-400/40 text-amber-200 text-sm">where do I start?</span>
</div>

</div>

</div>

<!--
PROBLEM → HOPE (the turn). Andrew gets excited: the AI Engineer path is STILL ENGINEERING — architecture,
specs, judgment, the craft he loves, one level up. Relief: he doesn't have to become a UX / product generalist;
he can go DEEPER.
But he's clear-eyed: AI makes mistakes, and it's only as good as the CONTEXT he feeds it — which is exactly
where his tech-lead skills (planning, defining tasks, judging output) pay off.
The catch: he doesn't know WHERE TO START. That's the hook into the workshop — the rest of tonight IS the
"where to start": prompt → context → harness, measured by evals. Next: the vision he's chasing, then the through-line.
-->

---
layout: center
clicks: 7
---

# Automatic Workflows

<div class="flex justify-center mt-10">
<div class="scale-90">

<Flow numbered reveal :items="[
  { icon: '🎨', title: 'Figma',      sub: 'design',         tone: 'sky' },
  { icon: '📖', title: 'Storybook',  sub: 'components',     tone: 'sky' },
  { icon: '🅰️', title: 'Angular',    sub: 'implementation', tone: 'sky' },
  { icon: '🔌', title: 'API',        sub: 'endpoints',      tone: 'sky' },
  { icon: '🗄️', title: 'DB schema',  sub: 'data model',     tone: 'sky' },
  { icon: '🎭', title: 'Playwright', sub: 'e2e tests',      tone: 'sky' },
]" />

</div>
</div>

<div v-click="7" class="mt-8 text-center opacity-80">

Each step is an <span class="font-semibold">Autonomous Task Solver</span> — chain them, and the workflow runs itself.

</div>

<div class="abs-br m-6 text-xs opacity-50">🚧 what I'm building now</div>

<!--
THE VISION — answers Andrew's "where do I start?" with "here's where it goes." Zoom-OUT: a whole delivery
pipeline, each step an Autonomous Task Solver handing off to the next. Say: "automate a task → map & chain the
tasks → automate the WHOLE workflow." This pipeline (Figma → Storybook → Angular → API → DB schema → Playwright)
is exactly what I'm building now. The caption name-drops "Autonomous Task Solver" — that's the unit we define
and learn to build tonight. We zoom from the whole pipeline into one box, then into how it's built.
-->

---
layout: center
clicks: 1
---

# Start with one step

<div class="flex justify-center mt-10">
<div class="scale-90 flex items-center gap-2">

<div class="opacity-30"><Box tone="sky" icon="🎨" title="Figma" sub="design" /></div>
<span class="opacity-20 text-xl">→</span>
<div class="opacity-30"><Box tone="sky" icon="📖" title="Storybook" sub="components" /></div>
<span class="opacity-20 text-xl">→</span>

<div class="relative scale-110">
<div class="absolute -top-7 left-1/2 -translate-x-1/2 text-[11px] text-emerald-300 font-semibold whitespace-nowrap">start here ↓</div>
<div class="rounded-2xl ring-2 ring-emerald-400">
<Box tone="emerald" icon="🅰️" title="Angular" sub="implementation" />
</div>
</div>

<span class="opacity-20 text-xl">→</span>

<div class="opacity-30"><Box tone="sky" icon="🔌" title="API" sub="endpoints" /></div>
<span class="opacity-20 text-xl">→</span>
<div class="opacity-30"><Box tone="sky" icon="🗄️" title="DB schema" sub="data model" /></div>
<span class="opacity-20 text-xl">→</span>
<div class="opacity-30"><Box tone="sky" icon="🎭" title="Playwright" sub="e2e tests" /></div>

</div>
</div>

<div v-click="1" class="mt-12 text-center opacity-80">

Make <span class="font-semibold text-emerald-300">one step</span> trustworthy tonight — generating Angular code. The rest of the pipeline is the same craft, repeated.

</div>

<!--
ZOOM-IN — the real answer to "where do I start?": not the whole pipeline at once. Pick ONE step and make it
trustworthy. Tonight that step is ANGULAR code generation (exactly what WCS scores). Master the craft on one
step — prompt → context → harness, measured by evals — and the rest of the pipeline is the SAME craft repeated.
Hand-off into the workshop body: from here on, everything is about making the Angular step reliable.
-->

---
layout: center
clicks: 3
---

# Autonomous Task Solver

<div class="flex items-center justify-center gap-5 mt-10">

<div v-click="1" class="relative border border-white/15 rounded-xl p-3 pt-5 flex flex-col gap-2">
<span class="absolute -top-2.5 left-3 px-2 text-[11px] uppercase tracking-widest bg-[#1e1e1e] opacity-60">tasks</span>
<Box tone="slate" title="login form" w="128px" />
<Box tone="slate" title="user list" w="128px" />
<Box tone="slate" title="product detail" w="128px" />
<Box tone="slate" title="content tabs" w="128px" />
</div>

<span v-click="2" class="text-3xl opacity-40">→</span>

<Box v-click="2" tone="violet" icon="🤖" title="Autonomous Task Solver" sub="one system · any task" w="190px" />

<span v-click="3" class="text-3xl opacity-40">→</span>

<div v-click="3" class="flex flex-col gap-2">
<Box tone="emerald" title="Deterministic" sub="reliable · repeatable" w="184px" />
<Box tone="emerald" title="Automatic" sub="invoke & walk away" w="184px" />
<Box tone="emerald" title="Long-running" sub="multi-step · unattended" w="184px" />
</div>

</div>

<!--
THE UNIT — zoom from the pipeline (and the one Angular step) into the thing we build: an Autonomous Task Solver.
Left: many tasks, ONE solver — you invoke it with a tiny task prompt (it can ship as skill / agent / MCP / CLI).
Middle: the solver = the system we engineer (prompt → context → harness).
Right: why it beats raw chat — DETERMINISTIC (reliable/repeatable), AUTOMATIC (invoke & walk away),
LONG-RUNNING (multi-step, unattended). Next: Andrew's last question (how?), then the through-line.
-->

---
layout: center
clicks: 3
---

# Andrew is unimpressed

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="confused" />

<div class="text-left flex flex-col gap-4 items-start">

<div v-click="1">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">heard that before</span>
</div>

<div v-click="2">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">tried it, didn't work</span>
</div>

<div v-click="3">
<span class="px-3 py-1 rounded-full border border-amber-400/40 text-amber-200 text-sm">how do I code it?</span>
</div>

</div>

</div>

<!--
PROBLEM → almost resolved, one gap left. Andrew is sold on the VISION (Automatic Workflows) and the UNIT
(Autonomous Task Solver) — he gets the idea. But it's all concept; he has no clue how to ACTUALLY build one.
That gap IS the workshop. The through-line next hands him the map (prompt → context → harness), and the rest
of tonight fills it in. End of the story beats — from here on, we DO it.
-->

---
layout: center
clicks: 6
---

# The idea

<div class="flex justify-center mt-10">
<div class="scale-90">

<LoopEngine reveal />

</div>
</div>

<!--
THE HIGH-LEVEL IDEA — the whole game in one loop, before EDD formalises it.
KEY framing: the TASK is SOURCED (Jira, a backlog, a spec) — you don't write it, you only make sure it's
STRUCTURED and carries enough context to say WHAT to build (not HOW). The HOW is what YOU provide.
So the prompt = ONE thing split in half: HOW (instructions you engineer) + WHAT (the task you source).
The loop: Start → Context (HOW + WHAT) → AI → Evals → back to Context (not good enough) or → End (good enough).
Evals is the gate that closes the loop. Next: Eval-Driven Development formalises this loop as red/green/blue.
-->

---
layout: center
clicks: 7
---

# Eval Driven Development

<div class="mt-6">

<Cycle reveal
  :edges="['low score', 'high score', 'keep score']"
  :phases="[
    { tone: 'red',   tag: '🔴 RED',   title: 'Write evals' },
    { tone: 'green', tag: '🟢 GREEN', title: 'Write prompt' },
    { tone: 'blue',  tag: '🔵 BLUE',  title: 'Refactor prompt', optional: true },
  ]"
  caption="New spec? System instructions first (green — fool-proof). Relocate to context / wiki / tool / harness only when the system says so (blue). Re-run the evals." />

</div>

<!--
This is the spine. Three ACTORS: eval set (you author), AI system (you engineer), solution score (the feedback).
Three MOVES = red/green/blue:
- RED  — write the bar before you can clear it. Answers "do we start with eval?" → yes, test-first.
- GREEN — get a new capability working the easiest way: drop it in the system instructions.
- BLUE — RARE, scale-driven: relocate a rule to its proper home (context/wiki/tool/harness), re-run evals.
The whole prompt→context→harness arc is ONE rule's journey from its cheap default home to its proper home —
each move a blue forced by a smell, gated by evals staying green. Saturate all evals → add a new task → red again.
Next: a quick checkpoint (Andrew's — and the room's — questions), then into doing it.
-->

---
layout: center
clicks: 1
---

# Andrew has questions

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="curious" />

<div class="text-left max-w-md">

<div v-click="1" class="flex flex-wrap gap-2 mt-4 text-sm">
<span class="px-3 py-1 rounded-full border border-white/15">are we grading the model?</span>
<span class="px-3 py-1 rounded-full border border-white/15">how about MCP, Skills and Tools?</span>
<span class="px-3 py-1 rounded-full border border-white/15">is eval like a unit test?</span>
<span class="px-3 py-1 rounded-full border border-white/15">could the AI write its own evals?</span>
</div>

</div>

</div>

<!--
CHECKPOINT — the payoff of the Andrew device: his confusion = the room's. The whole story was built to PREEMPT
the dry-run derailment, which hit right here. Technique: ASK OPEN first — "what's nagging you?" — and only
reveal the seed badges (click) if the room is quiet, to prime them.
Crib answers (one line each):
- "are we grading the MODEL?" → No. We engineer a SYSTEM to saturate the task; the model is a swappable part.
- "how about MCP and Skills?" → those are FORMS / delivery. The same task solver ships as a Skill, an MCP, an agent,
  or a CLI. MCP = how you wire tools & context into the loop (harness); Skills = the packaging you invoke with a
  tiny prompt. We build toward this in the harness section.
- "is eval like a unit test?" → close cousin, not the same. A test asserts ONE fixed pass/fail; an eval SCORES a
  distribution (graded, averaged over non-deterministic runs). A test breaks when code changes; an eval moves when
  QUALITY changes. (Our ratings wrap deterministic checks like lint — so an eval CAN contain tests.) Full answer = next section.
- "what can't you eval?" → the honest one. Deterministic checks (lint, build, structure) eval cleanly; TASTE / UX /
  novel correctness need a model-judge or a human — flaky & costly, so off by default tonight. The skill is choosing
  what's worth a deterministic rating vs a human gate. (Expanding — let it breathe; it previews the four quadrants.)
(Task-vs-instructions, "do I reuse the instructions", and "why do I care" were already covered — only revisit if asked.)
Then: everyone runs the baseline — and reacts.
-->

---
layout: center
class: text-center
---

# 🔧 Set it up

<div class="text-left max-w-xl mx-auto mt-4 text-base leading-relaxed">

Pull the repo and **follow the README** — it walks you through the rest.

```bash
git clone https://github.com/Lowgular/wcs-edd
cd wcs-edd
```

</div>

<div class="mt-6 text-center text-sm opacity-70">the README covers it: <code>npm install</code> → grab a free <b>Gemini API key</b> → <code>export GOOGLE_GENERATIVE_AI_API_KEY=…</code></div>

<!--
SET IT UP — hands-on, right after the checkpoint. Everyone clones the repo and follows the README.
Don't read the steps aloud — the README is the source of truth: npm install, then a free Gemini key
from aistudio.google.com/apikey, exported as GOOGLE_GENERATIVE_AI_API_KEY (the ai-sdk runner reads it).
Give the room a minute to get green, then the very next slide is one command.
-->

---
layout: center
class: text-center
---

# 🔧 Run your first eval

<div class="max-w-2xl mx-auto mt-2">

```bash
./run-task.sh 0   # baseline prompt — scored by the off-the-shelf ratings
```

</div>

<div v-click class="text-center mt-6">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">one command · one number · your first scoreboard</span>
</div>

<div class="mt-7 text-center text-xs opacity-55">the script fixes runner (ai-sdk) + model (flash) + skip-flags — you only pick the stage number · report lands in <code>.web-codegen-scorer/</code></div>

<!--
RUN IT YOURSELF — one simple command, no boilerplate. run-task.sh hides runner + model + --skip-* and
runs from the repo root; the ONLY knob is the stage number, and stage 0 is the basic baseline prompt
scored by the off-the-shelf ratings. It runs every entry task and prints a 0–100 score.
- "Score NaN did not fit into any bucket" → no app assessed (the script handles cwd for you).
- Open the printed report in .web-codegen-scorer/: generated files + per-rating breakdown + score.
This is the SAME ./run-task.sh <n> we keep using all night — stage 0 is just the first rung.
Next: Andrew (and the room) reacts to the result.
-->

---
layout: center
clicks: 3
---

# Andrew is not impressed

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="unimpressed" />

<div class="text-left flex flex-col gap-4 items-start">

<div v-click="1">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">seen this before · meh code</span>
</div>

<div v-click="2">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">and a weaker model? (flash, not Opus)</span>
</div>

<div v-click="3">
<span class="px-3 py-1 rounded-full border border-amber-400/40 text-amber-200 text-sm">…is this it?</span>
</div>

</div>

</div>

<!--
ANDREW IS NOT IMPRESSED — and that's the POINT. The baseline is exactly his everyday AI experience: meh code.
Worse, we deliberately ran a WEAKER model than he's used to (gemini-2.5-flash; he lives on Opus). So he's
deflated: "is this it?"
The setup: the magic was never the raw MODEL — it's the SYSTEM we build around it. The rest of the night proves
a weak model + an engineered system (prompt → context → harness), measured by evals, beats raw vibes from a strong
one. His disappointment is the motivation — now we move the number.
-->

---
layout: center
---

# We skipped the first move

<div class="mt-6">

<Cycle focus="red"
  :edges="['low score', 'high score', 'keep score']"
  :phases="[
    { tone: 'red',   tag: '🔴 RED',   title: 'Define what good looks like' },
    { tone: 'green', tag: '🟢 GREEN', title: 'Write prompt' },
    { tone: 'blue',  tag: '🔵 BLUE',  title: 'Refactor prompt', optional: true },
  ]"
  caption="No evals, no quality bar in the context — so nothing pulls the model above its average." />

</div>

<!--
THE CALLBACK — this is the EDD ring again, but RED is spotlit and green/blue are faded. The point in one line:
we never did RED. We never DEFINED what good looks like, and we never put that expectation into the context.
So of course the baseline is average — there was no bar to clear and no memory of "good" to pull from.
It's not the model's fault, and it's not "buy a bigger model." We just skipped the first move.
Tonight is doing RED first: define the bar, then make the system clear it. Straight into evals next.
-->

---

# The four quadrants

<div class="mt-1 scale-95 origin-top">

<Quadrants
  top="ground truth" bottom="no ground truth" left="code · objective" right="LLM-as-judge · subjective"
  reveal :order="['br', 'tr', 'tl', 'bl']"
  :tl="{ tag: 'Exact', tone: 'emerald', items: ['retriever analysis'] }"
  :tr="{ tag: 'Semantic', tone: 'orange', items: ['text analysis'] }"
  :bl="{ tag: 'Structural', tone: 'yellow', items: ['code analysis'] }"
  :br="{ tag: 'Preference', tone: 'rose', items: ['image analysis'] }" />

</div>

<!--
THE FAMOUS 2×2 of evaluation — two ORTHOGONAL axes:
- VERTICAL: ground truth (top) ↔ no ground truth (bottom) — is there a known correct answer to compare to?
- HORIZONTAL: code · objective (left) ↔ LLM-as-judge · subjective (right) — does a program grade, or a model?

Why this framing matters for US: "build me a login form" has NO ground truth — infinite valid answers. So the
whole top row (reference-based) is off the table. The instinct is then to fall to the bottom-right: ask an LLM
"is this good?" — subjective, flaky, costly. We refuse. We engineer the BOTTOM-LEFT: objective, code-based checks
that need no reference — eslint, type-check, compiles & runs, AST rules. THAT is where the WCS ratings live.

Bonus property of the LEFT column: code graders are deterministic, repeatable, free, no quota. The RIGHT column
(LLM judge) is stochastic and burns tokens — the autoraters (common-autorater-code-quality / -visuals) are the
bottom-right, disabled by id tonight. Caveat that bites in block 2: objective ≠ correct — static ratings reward
idiom ADOPTION, not correctness.

KEY POINT — the quadrant is a CHOICE, not a property of the task. You COULD eval generated code bottom-right
("LLM, is this good code?") — subjective, inconsistent, can't even reliably catch a compile error → poor score.
We deliberately choose bottom-left: objective code checks. Same task, better quadrant. THAT is the lesson.
-->

---

# Definition of done

<div class="opacity-70 -mt-2 mb-4 text-sm">Each category, by how you'd grade it — one dot per eval quadrant.</div>

<div class="grid grid-cols-2 gap-6 text-left">

<DoD v-click="1" box="white" title="🔬 White-box" lens="read the code" :cats="[
  { name: 'Architecture', subs: [
    { q: 'structural', text: 'patterns · anti-patterns' },
    { q: 'preference', text: 'good design?' } ] },
  { name: 'Code quality', subs: [
    { q: 'structural', text: 'complexity · coupling · cohesion' },
    { q: 'preference', text: 'extensible? elegant?' } ] },
  { name: 'Conventions', subs: [
    { q: 'structural', text: 'idioms · style guide · lint' } ] },
  { name: 'Testability', subs: [
    { q: 'structural', text: 'tests exist · coverage' },
    { q: 'preference', text: 'meaningful?' } ] },
  { name: 'Security', subs: [
    { q: 'structural', text: 'unsafe APIs · secrets' },
    { q: 'exact', text: 'CVE vs known DB' } ] },
]" />

<DoD v-click="2" box="black" title="🔭 Black-box" lens="run it, observe" :cats="[
  { name: 'Correctness', subs: [
    { q: 'exact', text: 'tests · behaves as expected' },
    { q: 'structural', text: 'builds · runs' } ] },
  { name: 'Reliability', subs: [
    { q: 'exact', text: 'edge cases vs expected' },
    { q: 'structural', text: 'error / empty states' } ] },
  { name: 'Performance', subs: [
    { q: 'structural', text: 'metric vs budget' } ] },
  { name: 'Accessibility', subs: [
    { q: 'structural', text: 'axe rules' } ] },
  { name: 'Visual fidelity', subs: [
    { q: 'exact', text: 'pixel-diff vs baseline' },
    { q: 'semantic', text: 'matches design?' },
    { q: 'preference', text: 'looks good?' } ] },
]" />

</div>

<!--
DEFINITION OF DONE = the bar a task must clear, expressed as measurable categories. Two lenses (same split as
the quadrants: static-read vs run-and-observe):
- WHITE-BOX (read the code): architecture, code quality, conventions/idiom, testability, static security.
- BLACK-BOX (run it, observe): correctness, reliability, performance, a11y, visual fidelity.

WHY START WHITE-BOX (left, revealed first): it's Andrew's pain (badly written code), AND it's the only signal you
can act on in ONE SHOT — a static check gives a gradient to optimize the prompt against. Black-box needs a LOOP
(observe a behavior failure → fix → re-run), which a single generation can't close.

The honest nuance (don't sell a clean white→black gradient): white-box doesn't go AWAY as you get autonomous —
with no human reading diffs it matters MORE. Black-box GRADUATES because (a) the harness gives you a loop to act
on it, and (b) the code becomes disposable/regenerable. Black-box is the destination; white-box is how you earn
the trust to get there — skip it and quality regresses to the mean (callback to the no-memory slide).
Maps onto the night: prompt/one-shot → white-box static ratings; harness (Builder→Verifier→Fixer) → black-box.

THE 80/20 CALLOUT (the close): treat this as a TASK RESOLVER, not a benchmark.
- Objective ~80% (green Exact + yellow Structural): automate with structured, eval-driven engineering — code grades
  it, deterministic, free. This is the system-in-the-loop.
- Subjective ~20% (orange Semantic + red Preference): do NOT grade it with an LLM judge — that's circular (model
  judging a model), flaky, and costly. YOU judge it; your taste is the higher-signal grader. Human-in-the-loop.
Discipline that makes the 20% pay off: capture your judgment as a new spec/eval/example so it (a) steers the next
iteration and (b) MIGRATES LEFTWARD — orange/red → yellow/green — once you find an objective proxy. So the 20% is
the FRONTIER feeding the 80%, and it SHRINKS over iterations. That's the EDD red phase: your judgment authors the
next eval. Ties back to assisted-vs-automated (the two skill sets). Caveat: 80/20 is a vibe ratio; for pure
art/copy the subjective part is the whole job and won't compress.
-->

---
layout: center
clicks: 3
---

# Andrew is overwhelmed

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="overwhelmed" />

<div class="text-left flex flex-col gap-4 items-start">

<div v-click="1">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">quadrants · whole definition of done · four cycles · examples…</span>
</div>

<div v-click="2">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"I didn't think it'd be this complex"</span>
</div>

<div v-click="3">
<span class="px-3 py-1 rounded-full border border-amber-400/40 text-amber-200 text-sm">"…how do I even start?"</span>
</div>

</div>

</div>

<!--
ANDREW IS OVERWHELMED — and on purpose. We just stacked the four quadrants, the entire definition of done,
the 80/20 split, and a four-stage cycle plan. Any sane senior dev's reaction: "gosh, I didn't think grading
this was such a complex task — how do I even START?"
That question is the hinge. The answer is the relief: you DON'T boil the ocean. You start with the cheapest,
most off-the-shelf move — turn on the rules the framework team already wrote (angular-eslint) — and climb the
ladder one cycle at a time. The through-line (next) hands him the map for the whole night; the prompt block
then shows the first rung. Overwhelm → one small first step.
-->

---
layout: section
---

# Prompt Engineering

### Teaching the model the house rules

---

# 🔧 Use what's already there

<div class="text-center opacity-70 -mt-2 mb-6 text-sm">The cheapest first move: turn on the rules the Angular team already wrote. You author nothing.</div>

<div class="max-w-2xl mx-auto">

```bash
./run-task.sh 1   # SAME baseline prompt — now scored by angular-eslint
```

</div>

<div v-click class="text-center mt-6">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">Off-the-shelf eval + "follow those same rules" in the prompt → the score jumps. You authored neither.</span>
</div>

<div class="mt-7 text-center text-xs opacity-55">the script fixes the model (flash) + skip-flags — you only ever pick the config number · runs all tasks</div>

<!--
DEMO — STAGE 1: "use what's already there." This answers Andrew's "how do I even start?" → you DON'T boil the
ocean. We ALREADY ran stage 0 earlier (the baseline, scored by WCS's built-in ratings). Now ONE run:
- ./run-task.sh 1 — turn on the off-the-shelf angular-eslint rating AND point the prompt at the SAME rules.
  system-instructions.s1.md is just the baseline prompt + a "follow the angular-eslint recommended rules"
  section — you wrote no eval and no novel rule — so the off-the-shelf score climbs to near-perfect.
run-task.sh hides the noise: runner + model + --skip-* are fixed, the only knob is the stage number; it runs
from the repo root over every entry task. Run 1 LIVE, then keep climbing 2 → 3 → 4 (custom rules → graded →
Signal Forms example) — THOSE stages add YOUR opinions on top of what the framework team already gave you.
Lesson: start with what exists — the cheapest rules (and eval) are the ones someone already wrote.
-->

---
layout: center
clicks: 3
---

# Andrew is interested

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="warming-up" />

<div class="text-left flex flex-col gap-4 items-start">

<div v-click="1">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"ok — I get it" ✓</span>
</div>

<div v-click="2">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"…but this is pretty basic"</span>
</div>

<div v-click="3">
<span class="px-3 py-1 rounded-full border border-amber-400/40 text-amber-200 text-sm">"how do I add my own?"</span>
</div>

</div>

</div>

<!--
ANDREW WANTS MORE — stage 1 landed: off-the-shelf angular-eslint gave a cheap win and he gets the loop ("ok, I
get it"). But the off-the-shelf set is shallow — it's the committee's opinion, and it's SILENT on plenty he
cares about ("this is pretty basic"). So the natural pull: "how do I add MY rules?" That's stage 2 = ADD —
encode the standards the linter doesn't have. (We deliberately keep CHANGE/override out of here — changing how
something scores is a NEW distribution, which is stage 3's job.) Next: the demo for adding custom rules.
-->

---

# 🔧 Add your own rules

<div class="text-center opacity-70 -mt-2 mb-6 text-sm">Off-the-shelf is shallow. Encode the standards the linter doesn't have — your PR comments, as evals.</div>

<div class="max-w-2xl mx-auto">

```bash
./run-task.sh 2   # + custom rules: no route.snapshot · `private` over `#` · signal I/O · pure state…
```

</div>

<div v-click class="text-center mt-6">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">Rules the committee doesn't have — your standards, now scored.</span>
</div>

<div class="mt-7 text-center text-xs opacity-55">these are custom eslint rules you author — same one knob: the config</div>

<!--
DEMO — STAGE 2: ADD your own rules. The cumulative config.s2 turns on the binary custom ratings the official
linter is silent on: no-route-snapshot, no-hash-private (`private` over `#`), input-output (signal I/O), no-mutate,
pure-state, reactive, formatting. The prompt (s2.md) stacks the matching "house rules" on top of stage 1.
HERE I'll explain HOW a custom rule is built — the eslint-rules/ dir: an angular-eslint rule run over the
generated files, wired to a rating. Pure ADD (the linter has no equivalent); nothing here changes an existing
rule's scoring — that's stage 3. Run: ./run-task.sh 2 → watch the score climb again as your opinions get enforced.
-->

---
layout: center
clicks: 3
---

# Andrew wants more

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="pushing" />

<div class="text-left flex flex-col gap-4 items-start">

<div v-click="1">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"ok, cool" ✓</span>
</div>

<div v-click="2">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"…but this is very binary"</span>
</div>

<div v-click="3">
<span class="px-3 py-1 rounded-full border border-amber-400/40 text-amber-200 text-sm">"how about the grey zones?"</span>
</div>

</div>

</div>

<!--
ANDREW WANTS NUANCE — stages 1–2 are pass/fail: a rule is satisfied or it isn't. But much of "quality" isn't
binary — some choices are better-or-worse, not right-or-wrong. "How about the grey zones?" is the pull into
GRADED scoring (partial credit). It's also where you OVERRULE the linter (change-detection): an override isn't
yes/no, it's a re-distribution of the score across tiers — which is exactly why CHANGE belongs here, not stage 2.
Next: the demo for graded ratings.
-->

---

# 🔧 Score the grey zones

<div class="text-center opacity-70 -mt-2 mb-6 text-sm">Pass/fail is too blunt. Give partial credit for "acceptable" — and overrule the linter where it's outdated.</div>

<div class="max-w-2xl mx-auto">

```bash
./run-task.sh 3   # graded: change-detection · standalone · model-kind · model-purity
```

</div>

<div v-click class="text-center mt-6">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">ideal = 100 · acceptable = 75 · wrong = 0 — change-detection even <i>overrules</i> angular-eslint</span>
</div>

<div class="mt-7 text-center text-xs opacity-55">a rating returns a range, not a yes/no — this is what makes it an eval, not a test</div>

<!--
DEMO — STAGE 3: GRADED / the grey zones. config.s3 adds the tiered ratings: change-detection (no key 100 >
OnPush 75 > Default 0), standalone (no key 100 > true 75 > false 0), model-kind (type > interface > class),
model-purity (share of readonly, method-free props). Two lessons:
1. RANGES, not 0/1 — partial credit. This IS the test-vs-eval line (callback to the Questions slide).
2. CHANGE / override — change-detection CONTRADICTS @angular-eslint/prefer-on-push: the linter wants explicit
   OnPush, you reward OMITTING it (it's the default now). The override is a re-distribution across tiers — that's
   why it lives in the graded stage, not stage 2. Still TELL-able (the changeDetection concept is in weights), so
   no example needed — that's stage 4's job.
Run: ./run-task.sh 3 → the score gets more honest (and a touch lower where "acceptable" isn't "ideal").
-->

---
layout: center
clicks: 3
---

# Andrew is sold

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="sold" />

<div class="text-left flex flex-col gap-4 items-start">

<div v-click="1">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"ok — I see the value in it" ✓</span>
</div>

<div v-click="2">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"…but everything so far, the model already knew"</span>
</div>

<div v-click="3">
<span class="px-3 py-1 rounded-full border border-amber-400/40 text-amber-200 text-sm">"what about brand-new things?"</span>
</div>

</div>

</div>

<!--
ANDREW IS SOLD — he's grinning now; the eval-driven loop clicks and he sees the value. But he spots the catch:
stages 1–3 all worked because the model ALREADY KNEW the concept — we only had to TELL it (a rule, a preference,
a re-scored tier). "What about brand-new things?" = APIs the model has never seen, that aren't in the weights at
all. Telling won't work there. That's the hinge into stage 4: SHOW, don't tell. Next: the demo — Signal Forms.
-->

---

# 🔧 Show what it can't know

<div class="text-center opacity-70 -mt-2 mb-6 text-sm">When the API isn't in the weights, telling fails — it invents one. You have to <b>show</b>. (Signal Forms · the custom <code>@Service</code> decorator.)</div>

<div class="max-w-2xl mx-auto">

```bash
./run-task.sh 4   # + Signal Forms & @Service — telling failed, so the prompt now SHOWS worked examples
```

</div>

<div v-click class="text-center mt-6">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">tell → it hallucinates the API · show → it lands · …and the prompt just got <i>fat</i></span>
</div>

<div class="mt-7 text-center text-xs opacity-55">out-of-weights → few-shot example · forms & services jump to the top tier (100%) · that weight is the ceiling →</div>

<!--
DEMO — STAGE 4: SHOW what it can't know. config.s4 turns on the forms rating AND the service-decorator rating;
s4.md carries the full Signal Forms EXAMPLE (form() + [formRoot]/[formField] + submission.action + template) and
the custom @Service decorator example (@Service() from ./service, grades @Service 100 > Injectable+root 75 >
scoped 50 > empty 0). The lesson: neither @angular/forms/signals NOR our home-grown @Service is in the weights —
earlier stages told the model rules and it complied because it KNEW the concept. Here a rule isn't enough; tell it
"use Signal Forms" / "use @Service" and it hallucinates (wrong imports, falls back to @Injectable). SHOW the
example → it lands → both ratings jump to the top tier.
THE CEILING: those examples are big. The prompt is now fat, and every task drags ALL of them whether or not it has
a form or a service. That bloat is exactly the wall that hands off to CONTEXT ENGINEERING — send the right thing,
just in time, instead of stuffing every rule and example into one prompt. Run: ./run-task.sh 4.
-->

---

# Prompt Engineering — the scorecard

<div class="grid grid-cols-2 gap-8 mt-6 text-left max-w-4xl mx-auto text-sm">

<div>

#### <span class="text-emerald-300">✓ Wins</span>

- **Cheap** — just text
- **Fast** — experiment what works
- **Reliable** — no fetching

</div>

<div>

#### <span class="text-amber-300">✗ Limits</span>

- **Context bloat** — every rule rides every task
- **Does not generalize** — tuned for one task, not the next
- **Static** — the same prompt for every task

</div>

</div>

<div v-click class="text-center mt-7 text-sm">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">The fix isn't a smaller prompt — it's the <i>right</i> prompt, just in time. →</span>
</div>

<!--
PROMPT ENGINEERING SCORECARD — close the section honestly (benefits ↔ limits, per the README).
WINS: cheapest lever, the off-the-shelf→custom→graded→examples ladder, deterministic & free, and it exports
(rules/skills) so the work isn't trapped here. LIMITS (this is what motivates the rest of the night): context
bloat, cost, maintainability/portability (one giant file), no cross-task scaling (one-size-fits-all), still one
shot. The closing line reframes: don't shrink the prompt — deliver the RIGHT slice just in time → Context
Engineering (next divider).
-->

---
layout: center
clicks: 3
---

# Andrew won't ship this

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="maintainer" />

<div class="text-left flex flex-col gap-4 items-start">

<div v-click="1">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">does it scale?</span>
</div>

<div v-click="2">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">how much will it cost?</span>
</div>

<div v-click="3">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">how do I maintain it?</span>
</div>

</div>

</div>

<!--
ANDREW WON'T SHIP THIS — he was sold a minute ago, but the engineer's NFR instincts kick in once the prompt is
fat. Three real problems, all non-functional:
1. COST — the whole rule file is input tokens on EVERY task, EVERY run. It scales the bill linearly with bloat.
2. MAINTAINABILITY / usability — one giant rules file he'd never want in his daily workflow.
3. CROSS-TASK WASTE — most tasks need a SLICE: user-list will never use Signal Forms; login will never format a
   price. Yet one-prompt-fits-all drags everything everywhere. Brute force that doesn't scale across tasks.
This is the exact wall the agenda promised ("the prompt bloats"). The fix isn't a smaller prompt — it's the RIGHT
prompt, just in time. That's Context Engineering. Next: the prompt-engineering scorecard, then the section.
-->

---
layout: section
---

# Context Engineering

### Stop shipping the whole manual

---

# What is context, exactly?

<div class="text-center opacity-70 -mt-2 mb-6 text-sm">Developers must consider six primary types of context.</div>

<div class="grid grid-cols-3 gap-4 max-w-5xl mx-auto text-left text-sm">

<div v-click class="rounded-xl border border-white/20 border-l-4 border-l-indigo-400/70 bg-white/5 p-4">
  <div class="font-extrabold mb-1 text-indigo-300">🧭 Instructions</div>
  <div class="opacity-80">The agent's core role, goals, and operational boundaries.</div>
</div>

<div v-click class="rounded-xl border border-white/20 border-l-4 border-l-sky-400/70 bg-white/5 p-4">
  <div class="font-extrabold mb-1 text-sky-300">📚 Knowledge</div>
  <div class="opacity-80">Retrieved documents, architectural diagrams, and domain-specific data.</div>
</div>

<div v-click class="rounded-xl border border-white/20 border-l-4 border-l-violet-400/70 bg-white/5 p-4">
  <div class="font-extrabold mb-1 text-violet-300">🧠 Memory</div>
  <div class="opacity-80">Short-term session logs (what just happened) and long-term persistent state (what the project is).</div>
</div>

<div v-click class="rounded-xl border border-white/20 border-l-4 border-l-emerald-400/70 bg-white/5 p-4">
  <div class="font-extrabold mb-1 text-emerald-300">🧩 Examples</div>
  <div class="opacity-80">Few-shot behavioral demonstrations and codebase reference patterns.</div>
</div>

<div v-click class="rounded-xl border border-white/20 border-l-4 border-l-cyan-400/70 bg-white/5 p-4">
  <div class="font-extrabold mb-1 text-cyan-300">🔌 Tools</div>
  <div class="opacity-80">The precise definitions of the APIs, scripts, and external services the agent can invoke.</div>
</div>

<div v-click class="rounded-xl border border-white/20 border-l-4 border-l-rose-400/70 bg-white/5 p-4">
  <div class="font-extrabold mb-1 text-rose-300">🛡️ Guardrails</div>
  <div class="opacity-80">Hard constraints, formatting rules, and safety validations.</div>
</div>

</div>

<!--
QUOTED VERBATIM from the source article (NOTES.md) — the six types of context, word for word. This grounds the
vocabulary before we split it into static vs dynamic (next slide) and before the WCS-specific translation
("Static core, dynamic memory", two slides on). Don't paraphrase this slide — the point is to show the room the
actual source definition.
-->

---

# Static vs. dynamic context — as written

<div class="text-center opacity-70 -mt-2 mb-6 text-sm">Context engineering means balancing which of these six elements the agent possesses upfront versus what it can retrieve on demand.</div>

<div class="grid grid-cols-2 gap-6 max-w-4xl mx-auto text-left text-sm">

<div v-click="1" class="rounded-xl border border-white/30 bg-white/8 p-5">
  <div class="flex items-baseline gap-2 mb-3">
    <span class="text-lg font-extrabold">📌 Static context</span>
    <span class="text-xs uppercase tracking-wider opacity-55">always loaded</span>
  </div>
  <ul class="flex flex-col gap-2">
    <li><b>System instructions</b></li>
    <li><b>Rule files</b> — <code>AGENTS.md</code>, <code>CLAUDE.md</code>, <code>GEMINI.md</code></li>
    <li><b>Global memory</b></li>
    <li><b>Persona definitions</b></li>
  </ul>
  <div class="mt-3 text-xs opacity-60">Expensive — every token rides every call, whether relevant or not.</div>
</div>

<div v-click="2" class="rounded-xl border border-dashed border-amber-300/40 bg-amber-400/5 p-5">
  <div class="flex items-baseline gap-2 mb-3">
    <span class="text-lg font-extrabold">⚡ Dynamic context</span>
    <span class="text-xs uppercase tracking-wider opacity-55">loaded on demand</span>
  </div>
  <ul class="flex flex-col gap-2">
    <li><b>Skill instructions</b> — triggered by task matching</li>
    <li><b>Tool results</b> — retrieved during execution</li>
    <li><b>RAG documents</b> — fetched from wikis / pipelines</li>
    <li><b>Session history</b> — windowed</li>
  </ul>
  <div class="mt-3 text-xs opacity-60">Efficient — the agent pays the token cost only when it's needed.</div>
</div>

</div>

<div v-click="3" class="max-w-3xl mx-auto mt-6 text-sm text-center opacity-80">Where the boundary sits is a genuine engineering trade-off — too much static wastes tokens, too little and the agent forgets. The best systems treat it as a first-class, versioned decision.</div>

<!--
The static/dynamic split, distilled from the source article into bullets — implementation nouns (AGENTS.md /
CLAUDE.md / GEMINI.md, global memory, skills, RAG, session history) kept intact so the terms still land, just not
as a wall of prose. Laid into the same two-column shape the NEXT slide ("Static core, dynamic memory") uses for
the WCS-specific translation. Read the trade-off line (v-click) aloud — it's the seed for "Andrew is overwhelmed"
and the scorecard's limits three slides on.
-->

---
layout: center
clicks: 3
---

# Andrew is overwhelmed again

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="overwhelmed" />

<div class="text-left flex flex-col gap-4 items-start">

<div v-click="1">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"ok… that's a whole memory system"</span>
</div>

<div v-click="2">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"I just want my login form built"</span>
</div>

<div v-click="3">
<span class="px-3 py-1 rounded-full border border-amber-400/40 text-amber-200 text-sm">"so what do I actually do?"</span>
</div>

</div>

</div>

<!--
ANDREW OVERWHELMED, AGAIN — the theory is correct but it's A LOT (a whole memory system) for a senior dev who
"just wants the login form built." Honest reaction: "so what do I actually do?" Same hinge as before: overwhelm →
one simple move. Next we lay out the retrieval landscape, then make it concrete in the demo.
-->

---

# How retrieval is usually done

<div class="text-center opacity-70 -mt-2 mb-6 text-sm">Two conventional ways to turn a pile of docs into "just what this task needs".</div>

<div class="grid grid-cols-2 gap-6 max-w-4xl mx-auto text-left text-sm">

<!-- Classical / vector RAG -->
<div v-click="1" class="rounded-xl border border-white/25 bg-white/5 p-5">
  <div class="flex items-baseline gap-2 mb-3">
    <span class="text-lg font-extrabold">📦 Classical RAG</span>
    <span class="text-xs uppercase tracking-wider opacity-55">vector</span>
  </div>
  <ul class="flex flex-col gap-2">
    <li>chunk → embed → <b>vector DB</b> → top-k by similarity</li>
    <li>You own the DB, the chunking, the tuning</li>
    <li>The workhorse — but <b>tuning is real</b> (big chunks bloat, small chunks miss)</li>
  </ul>
</div>

<!-- GraphRAG -->
<div v-click="2" class="rounded-xl border border-dashed border-amber-300/40 bg-amber-400/5 p-5">
  <div class="flex items-baseline gap-2 mb-3">
    <span class="text-lg font-extrabold">🕸 GraphRAG</span>
    <span class="text-xs uppercase tracking-wider opacity-55">Neo4j</span>
  </div>
  <ul class="flex flex-col gap-2">
    <li>entities + relations → retrieve <b>subgraphs</b>, multi-hop</li>
    <li><b>Promise:</b> connect facts across documents</li>
    <li><b>Reality:</b> heavy infra to build &amp; keep fresh — barely beats vector. Rarely worth it.</li>
  </ul>
</div>

</div>

<div v-click="3" class="mt-6 text-center text-xs opacity-55">the graph that <i>does</i> pay off for code isn't over docs — it's over the <b>code</b> (AST → graph → cypher) → code-graph</div>

<!--
THE LANDSCAPE, PART 1 — the two conventional retrieval techniques, honestly. CLASSICAL (vector) RAG is the
workhorse: chunk → embed → vector DB → top-k. You own the DB + chunking + tuning (this is the "tuning is real"
from the scorecard). GRAPHRAG (Neo4j): build a knowledge graph of entities/relations, retrieve subgraphs / do
multi-hop. The PITCH is connecting facts across docs; the REALITY (my experience, and the common finding) is the
infra cost — graph construction, entity extraction, keeping it fresh — rarely earns its keep; plain vector already
gets ~90%. It only wins when queries are inherently relational over a structured domain — which curating Angular
conventions isn't. SHARP NUANCE (dim note): a graph DOES pay off for code — but a graph over the CODE (deterministic
AST, cheap to derive: code-graph / sensors), not GraphRAG over prose. Cheap+high-value vs expensive+low-marginal.
-->

---

# The curated alternative

<div class="text-center opacity-70 -mt-2 mb-6 text-sm">Skip automated retrieval entirely — hand-write a small, linked knowledge base.</div>

<div class="max-w-3xl mx-auto text-left text-sm">

<div class="rounded-xl border border-white/25 bg-white/5 p-5">
  <div class="flex items-baseline gap-2 mb-3">
    <span class="text-lg font-extrabold">🗂 Obsidian wiki</span>
    <span class="text-xs uppercase tracking-wider opacity-55">Karpathy-style · hand-curated</span>
  </div>
  <ul class="flex flex-col gap-2">
    <li>Markdown notes + <b>backlinks</b> — a human distills the knowledge</li>
    <li>The <b>index &amp; links are the retrieval</b> — navigate, don't embed</li>
    <li>A small, opinionated wiki beats a RAG firehose on <b>signal-to-noise</b></li>
    <li class="opacity-70">Cost: it's manual, and it doesn't auto-scale</li>
  </ul>
</div>

</div>

<div v-click class="text-center mt-6 text-sm">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">I haven't run this in anger — it deserves its own talk. But the philosophy is right: <i>curation is the cheapest retriever.</i></span>
</div>

<!--
THE LANDSCAPE, PART 2 — the curated alternative, in the spirit of Karpathy's hand-curated knowledge approach
(Obsidian: linked markdown notes). Instead of automating retrieval over raw docs, a HUMAN distills the knowledge
and the index + backlinks ARE the retrieval — you (or the agent) navigate, no embeddings. The bet: a small,
opinionated, well-organized wiki beats a RAG firehose because the signal-to-noise is unmatched. Honest framing
(amber): I like it, haven't used it for real, it deserves its own talk — but the principle holds: CURATION is the
cheapest retriever. This is the same philosophy behind lowgy (curated, index-guided guidance, not RAG). Don't
over-claim a specific Karpathy product/quote — present it as the curated-wiki philosophy he champions.
-->

---

# QMD — RAGless

<div class="text-center opacity-70 -mt-2 mb-8 text-sm">Like <i>serverless</i> — the thing's still there, you just stop managing it.</div>

<div class="max-w-3xl mx-auto text-left text-sm">

<div class="rounded-xl border border-amber-400/30 bg-amber-400/5 p-5">
  <div class="flex items-baseline gap-2 mb-3">
    <span class="text-lg font-extrabold">📚 QMD</span>
    <span class="text-xs uppercase tracking-wider opacity-55">Query Markup Documents · on-device</span>
  </div>
  <ul class="flex flex-col gap-2">
    <li><b>Hybrid retrieval</b> — BM25 (SQLite FTS5) + vector embeddings + LLM rerank, fused by rank</li>
    <li><b>Markdown-aware chunking</b> (~900 tok) — AST-aware for code (TS · Py · Go · Rust)</li>
    <li><b>Runs local</b> — GGUF embed / rerank / query-expand models, auto-downloaded. No cloud, no DB to own.</li>
    <li><b>Built for agents</b> — MCP server + <span class="font-mono">--json</span> CLI, path-context in every hit</li>
    <li class="opacity-70">You write markdown → <span class="font-mono">qmd add ./wiki</span> · <span class="font-mono">qmd query</span> — chunking · embeddings · retrieval all handled</li>
  </ul>
</div>

</div>

<div v-click class="text-center mt-6 text-sm">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">You write markdown · QMD does the retrieval · you care about RAG <i>less</i>.</span>
</div>

<!--
THE LANDSCAPE, PART 3 — the synthesis, and what the deck actually uses. Say the heading yourself: RAGless is LIKE
serverless — serverless ≠ no servers (servers, handled — you write functions); RAGless ≠ no RAG (RAG, handled — you
write markdown). The card is what QMD actually is (github.com/tobi/qmd): HYBRID retrieval — BM25 over SQLite FTS5
+ vector embeddings + an LLM reranker, fused by reciprocal rank; MARKDOWN-AWARE chunking (~900 tok, AST-aware for
code); RUNS LOCAL — three small GGUF models (embed / rerank / query-expand) auto-download, no cloud and no vector
DB to own; BUILT FOR AGENTS — ships an MCP server + --json CLI and returns path-context with every hit. So it's the
best of parts 1 and 2: vector RAG's power with the curated wiki's authoring simplicity. This is the tool behind the
"Fetch, don't pin" demo. Land the line: you write markdown, QMD does retrieval, you think about RAG LESS. (Honest
tie to the next beat: RAGless ≠ infallible — it can still miss → Andrew puzzled.)
-->

---

# 🔧 Fetch, don't pin

<div class="text-center opacity-70 -mt-2 mb-6 text-sm">Slim the prompt to the static core — let the model pull the one skill the task needs.</div>

<div class="max-w-2xl mx-auto">

```bash
./run-task.sh 5   # RAG — slim core + wiki retrieval, injected up front (single shot)
```

</div>

<div v-click class="text-center mt-6 text-sm">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200"><code>user-list</code> pays for nothing it doesn't use · <code>login</code> fetches the form skill on demand</span>
</div>

<div class="mt-7 text-center text-xs opacity-55">needs an agentic runner — the model has to call out to fetch (that's the seam into the harness)</div>

<!--
DEMO — CONTEXT ENGINEERING: fetch, don't pin. The move: cut the fat prompt down to the slim static core (house
rules + output contract) and let the model RETRIEVE the per-task piece — the Signal Forms skill, a wiki doc —
just-in-time, instead of carrying everything. Run it and compare to the stage-4 fat-prompt run: same (or better)
score on form tasks, but user-list no longer drags the form example → lower tokens, leaner prompt.
NOTE on the runner: ai-sdk is single-shot and can't fetch — retrieval needs an AGENTIC runner (gemini-cli + the
Angular MCP, or the QMD wiki). That "it has to call out" is exactly the seam into Harness Engineering. (Stage 5
= config.s5.mjs wires this single-shot RagRunner; stages 6–10 wire the tool/verify/workflow runners.)
-->

---

# Context engineering — the scorecard

<div class="grid grid-cols-2 gap-8 mt-6 text-left max-w-4xl mx-auto text-sm">

<div>

#### <span class="text-emerald-300">✓ Wins</span>

- **Bounded** — per-task window stays small as capabilities grow
- **Focused** — irrelevant guidance can't mislead the model
- **Reusable** — partials & skills shared across tasks and tools

</div>

<div>

#### <span class="text-amber-300">✗ Limits</span>

- **Can miss** — the retriever may skip the doc the task needed
- **Tuning is real** — big docs bloat, small docs miss
- **Observability** — can go off the rails

</div>

</div>

<div v-click class="text-center mt-7 text-sm">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">And it's still <i>one shot</i> — a miss has no recovery. The fix is a loop. →</span>
</div>

<!--
CONTEXT SCORECARD — closes the section honestly, same shape as the prompt + harness scorecards.
WINS: the per-task window stays BOUNDED as you add capabilities (vs the prompt that bloated for everyone);
irrelevant guidance can't drag the model; partials/skills are REUSABLE across tasks and tools.
LIMITS: the retriever can MISS the doc a task needed (Andrew's score drop); tuning is real work — big docs bloat
the window, small docs cause misses; and it only PAYS OFF AT SCALE — for a small wiki the retrieval machinery is
overhead, you're better off just pinning it in the prompt; retrieval earns its keep once the corpus is too big to
carry wholesale.
THE TURN: the limit that matters most is "still one shot" — nothing rechecks or recovers from a miss. That's the
loop → Harness Engineering (next divider). Same forward-pointing amber as the prompt scorecard.
-->

---
layout: center
clicks: 3
---

# Andrew is puzzled

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="puzzled" />

<div class="text-left flex flex-col gap-4 items-start">

<div v-click="1">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"wait — the score dropped"</span>
</div>

<div v-click="2">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"cheaper, sure… but worse"</span>
</div>

<div v-click="3">
<span class="px-3 py-1 rounded-full border border-amber-400/40 text-amber-200 text-sm">"did I just trade quality for cost?"</span>
</div>

</div>

</div>

<!--
ANDREW IS PUZZLED — context engineering bought lower tokens, but the RETRIEVER MISSED. On some tasks it didn't
pull the doc/skill the task needed (e.g. failed to fetch Signal Forms for a form), so the model fell back to its
average and the score DROPPED versus the fat-prompt run. So the trade looks bad: cheaper, yes — but worse code.
He paid in correctness for a token saving he didn't really ask for. That's the real context-engineering limit
(README: can miss the document · retriever complexity · still one-shot). The deeper issue is "still one-shot":
nothing CHECKS whether the right context arrived, and nothing RECOVERS when it didn't. That missing check-and-
recover is exactly what a LOOP gives you → the hand-off into Harness Engineering.
-->

---
layout: section
---

# Harness Engineering

### One shot is the wall — give the model a loop

<!--
SECTION DIVIDER — the third lever, and the answer to Andrew's puzzlement. Prompt and Context both lived inside a
SINGLE pass: you tune what goes in, then you hope. The retriever missing the doc (last slide) exposed the real
wall — nobody CHECKS whether the right context arrived, and nobody RECOVERS when it didn't. A harness breaks the
one-shot: the model gets a LOOP (act → observe → correct), and then YOU write that loop so it's deterministic,
not vibes. Same evals as before — they're now the verifier inside the loop. Keep the through-line: prompt hit a
ceiling → context still one-shot → harness cracks it.
-->

---

# Agentic RAG — let the model fetch

<div class="text-center opacity-70 -mt-2 mb-6 text-sm">The fix for Andrew's missed doc: stop fetching <i>once, up front</i> — hand the retriever over as a tool.</div>

<div class="grid grid-cols-2 gap-6 max-w-4xl mx-auto text-left text-sm">

<!-- ONE-SHOT RAG — the wall -->
<div class="rounded-xl border border-white/20 bg-white/5 p-5">
  <div class="flex items-baseline gap-2 mb-3">
    <span class="text-lg font-extrabold opacity-80">📌 One-shot RAG</span>
    <span class="text-xs uppercase tracking-wider opacity-55">fetch, then hope</span>
  </div>
  <ul class="flex flex-col gap-2 opacity-80">
    <li><b>You</b> retrieve up front, stuff it in, generate.</li>
    <li>One guess at what the task needs.</li>
    <li>A miss is <b>fatal</b> — nothing reads the gap.</li>
    <li class="opacity-60">→ Andrew's score drop</li>
  </ul>
</div>

<!-- AGENTIC RAG — the loop -->
<div class="rounded-xl border border-dashed border-amber-300/40 bg-amber-400/5 p-5">
  <div class="flex items-baseline gap-2 mb-3">
    <span class="text-lg font-extrabold">⚡ Agentic RAG</span>
    <span class="text-xs uppercase tracking-wider opacity-55">fetch as a tool</span>
  </div>
  <ul class="flex flex-col gap-2">
    <li>Retrieval is a <b>tool the model calls</b>.</li>
    <li>It reads what came back, judges if it's enough.</li>
    <li>Not enough? <b>It fetches again</b> — then generates.</li>
    <li class="opacity-70">→ a miss is now recoverable</li>
  </ul>
</div>

</div>

<div v-click class="text-center mt-5 text-sm">
  <span class="px-4 py-2 rounded-full border border-white/15 opacity-80">One shot → a few shots. But the shift isn't the <i>count</i>…</span>
</div>

<div v-click class="text-center mt-3 text-sm">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">…the <b>agent decides</b> — what to fetch, when it has enough, when to stop. You hand over the tool, not the steps.</span>
</div>

<!--
AGENTIC RAG — the first concrete harness move, and the literal answer to "did I trade quality for cost?". One-shot
RAG (last section) retrieved ONCE, before generating: one guess, and the miss that dropped Andrew's score had no
recovery. Agentic RAG makes RETRIEVAL A TOOL: the model calls it, reads the result, decides if it's enough, and
calls it again if not — then generates. So we move from one shot to a FEW shots.
THE POINT (don't let it get lost): few-shot prompting = YOU script the rounds/examples ahead of time. Agentic =
the AGENT drives the loop — chooses the query, judges sufficiency, decides when to stop. You hand over the tool
and the goal, not a fixed pipeline. That handover of CONTROL is what makes it a harness, not just more context.
Mechanics: needs an agentic runner (gemini-cli / claude-code) + the retriever exposed over MCP (Angular MCP, the
wiki). The recovered miss is exactly the build-repair loop generalized to retrieval — next slides make it a loop.
-->

---

# One probabilistic box, wrapped in a loop

<div class="text-center opacity-70 -mt-2 mb-8 text-sm">The agent is code <i>you</i> write — it calls the model, runs the tools, and feeds results back.</div>

<div class="flex items-center justify-center gap-2 mt-2">

  <!-- LLM (red — probabilistic) -->
  <div class="w-40 rounded-xl border-2 border-red-400/70 bg-red-500/10 px-4 py-6 text-center shrink-0">
    <div class="text-xl font-extrabold text-red-300">LLM</div>
    <div class="text-xs opacity-60 mt-1">the model · guesses</div>
  </div>

  <!-- arrows: Agent ⇄ LLM -->
  <div class="flex flex-col gap-4 items-center text-[11px] w-28 shrink-0">
    <div class="text-center text-sky-200">
      <div class="opacity-75">prompt + results</div>
      <div class="text-lg leading-none">⟵</div>
    </div>
    <div class="text-center text-red-200">
      <div class="text-lg leading-none">⟶</div>
      <div class="opacity-75">tool request</div>
    </div>
  </div>

  <!-- AGENT (blue — deterministic hub) -->
  <div class="w-44 rounded-xl border-2 border-sky-400/70 bg-sky-500/10 px-4 py-6 text-center shrink-0">
    <div class="text-xl font-extrabold text-sky-300">Agent</div>
    <div class="text-xs opacity-60 mt-1">your loop</div>
    <div class="text-[11px] text-sky-200/80 mt-2">↻ repeat until done</div>
  </div>

  <!-- arrows: Agent ⇄ Tools -->
  <div class="flex flex-col gap-4 items-center text-[11px] w-24 shrink-0">
    <div class="text-center text-sky-200">
      <div class="opacity-75">invoke</div>
      <div class="text-lg leading-none">⟶</div>
    </div>
    <div class="text-center text-sky-200">
      <div class="text-lg leading-none">⟵</div>
      <div class="opacity-75">result</div>
    </div>
  </div>

  <!-- TOOL (blue — deterministic · read-only retrieval) -->
  <div class="w-44 rounded-xl border-2 border-sky-400/70 bg-sky-500/10 px-4 py-6 text-center shrink-0">
    <div class="text-base font-extrabold text-sky-300 mb-2">Tool</div>
    <div class="flex flex-col gap-1.5 text-[11px]">
      <span class="rounded-full border border-sky-400/30 px-2 py-0.5">Retriever · QMD</span>
    </div>
    <div class="text-[10px] opacity-50 mt-3">read-only · <i>get</i></div>
  </div>

</div>

<!-- legend -->
<div class="flex items-center justify-center gap-8 mt-10 text-sm">
  <div class="flex items-center gap-2">
    <span class="inline-block w-3.5 h-3.5 rounded-sm border-2 border-red-400/70 bg-red-500/20"></span>
    <span><b class="text-red-300">red</b> — non-deterministic / probabilistic <span class="opacity-60">(the model)</span></span>
  </div>
  <div class="flex items-center gap-2">
    <span class="inline-block w-3.5 h-3.5 rounded-sm border-2 border-sky-400/70 bg-sky-500/20"></span>
    <span><b class="text-sky-300">blue</b> — deterministic / programmatic <span class="opacity-60">(code you write)</span></span>
  </div>
</div>

<div v-click class="text-center mt-7 text-sm">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">One red box. Everything you control is blue — the harness is how you box the guessing in.</span>
</div>

<!--
THE MENTAL MODEL for the whole harness half. Draw the line: exactly ONE thing is probabilistic — the LLM (red).
Everything else is YOUR deterministic code (blue): the agent that drives the loop, and the tool it invokes. RIGHT
NOW (agentic RAG) that's a single READ-ONLY tool — the retriever (QMD/MCP); the agent can only GET things. It can't
yet CHECK anything — verification tools arrive on the self-verify slide. The flow: agent sends a prompt → the model
GUESSES, and part of that guess is "I need tool X" (tool request, red→blue) → the agent INVOKES the tool
(deterministic) → gets a result → feeds it back into the next prompt (blue→red). Repeat until done.
WHY IT MATTERS: prompt & context engineering tuned the INPUT to the red box and hoped. The harness wraps the red
box in a blue loop you own — so a bad guess is observed and corrected by deterministic code, not shipped. That's
the lever: you can't make the model deterministic, but you decide how much of the system is. More blue around the
red = more control. This legend (red=probabilistic, blue=deterministic) carries through every harness slide.
-->

---

# 🔧 Same task — now the agent fetches

<div class="text-center opacity-70 -mt-2 mb-6 text-sm">The exact <code>ctx</code> task, but retrieval is a tool the model calls — it recovers the miss.</div>

<div class="max-w-2xl mx-auto">

```bash
./run-task.sh 6   # agentic RAG — the agent fetches wiki partials via tools (vs single-shot RAG)
```

</div>

<div v-click class="text-center mt-7 text-sm">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200"><b>Don't plan every step</b> — hand over the tool and let the <b>agent decide</b> what to fetch, and when it has enough.</span>
</div>

<div class="mt-7 text-center text-xs opacity-55">the score isn't fixed — the agent drives, so every run differs · that unpredictability is the trade for handing over control</div>

<!--
DEMO — AGENTIC RAG. Deliberately NO score on screen: the agent drives its own retrieval, so the run is
non-deterministic — tokens and score shift every time. Don't promise a number you can't reproduce live; make the
UNPREDICTABILITY the point. SAME task as the ctx / one-shot-RAG demo, only the runner changes — from a single-shot
retrieve-then-generate to an agent that calls the retriever as a tool, reads the result, and fetches again if it
needs more. The lesson to land: DON'T PLAN EVERY STEP. You hand over the tool + the goal and let the agent decide
what to fetch and when it has enough — you don't script the rounds. That handover buys recovery (a missed fetch is
no longer fatal) at the cost of determinism. This is the previous slide's diagram made real: blue agent loops
around the red model.
WIRED — stage 6 is `config.s6.mjs` (SingleToolAgentRunner): one tool-calling loop, the wiki index injected up
front, the agent reads the partials it decides it needs (intro/full) and writes the app — instead of us
front-loading retrieval. Run it with `./run-task.sh 6` (the old two-phase runner is `./run-task.sh 6.old`).
-->

---
layout: center
clicks: 3
---

# Andrew is skeptical

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="unimpressed" />

<div class="text-left flex flex-col gap-4 items-start">

<div v-click="1">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"ok — this actually feels like AI"</span>
</div>

<div v-click="2">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"but it burns a lot more tokens"</span>
</div>

<div v-click="3">
<span class="px-3 py-1 rounded-full border border-amber-400/40 text-amber-200 text-sm">"…and no real gain in accuracy"</span>
</div>

</div>

</div>

<!--
ANDREW IS SKEPTICAL — the honest counter-beat to the agentic demo, and the goal this section actually lands. Yes,
it FEELS like AI: the model drives its own retrieval, calls the tool, decides when it has enough — the magic is
finally visible. But strip the feeling and read the scorecard: it BURNS MORE TOKENS (the loop re-sends its growing
transcript every step, and an unbounded agent can over-fetch) and on this task set there's NO RELIABLE ACCURACY WIN
— the score swings run-to-run because the agent is non-deterministic. So "feels like AI" is not "is better." That
doubt is the SETUP: fetching alone isn't the gain — the loop has to CHECK its own work, not just GET more context.
That's the next move (self-verify: a tool that checks, not just gets) plus the deterministic loop YOU write. Don't
resolve it here — let the skepticism pull us into Harness II. (The old "Andrew is amazed" beat is parked at the end
of the deck for now — decide later whether the arc ends amazed or skeptical.)
-->

---

# Now the loop can check, not just get

<div class="text-center opacity-70 -mt-2 mb-4 text-sm">Same loop as agentic RAG — but now a tool can also <b>check</b>, not just <i>get</i>. The agent runs the evals, reads the failures, and fixes until they pass.</div>

<div class="flex items-center justify-center gap-2 mt-1">

  <!-- LLM (red — probabilistic) -->
  <div class="w-36 rounded-xl border-2 border-red-400/70 bg-red-500/10 px-3 py-4 text-center shrink-0">
    <div class="text-lg font-extrabold text-red-300">LLM</div>
    <div class="text-[11px] opacity-60 mt-1">the model · guesses</div>
  </div>

  <!-- arrows: Agent ⇄ LLM -->
  <div class="flex flex-col gap-3 items-center text-[11px] w-24 shrink-0">
    <div class="text-center text-sky-200"><div class="opacity-75">prompt + results</div><div class="text-lg leading-none">⟵</div></div>
    <div class="text-center text-red-200"><div class="text-lg leading-none">⟶</div><div class="opacity-75">tool request</div></div>
  </div>

  <!-- AGENT (blue — deterministic hub) -->
  <div class="w-40 rounded-xl border-2 border-sky-400/70 bg-sky-500/10 px-3 py-4 text-center shrink-0">
    <div class="text-lg font-extrabold text-sky-300">Agent</div>
    <div class="text-[11px] opacity-60 mt-1">your loop</div>
    <div class="text-[11px] text-sky-200/80 mt-2">↻ repeat until done</div>
  </div>

  <!-- arrows: Agent ⇄ Tools -->
  <div class="flex flex-col gap-3 items-center text-[11px] w-20 shrink-0">
    <div class="text-center text-sky-200"><div class="opacity-75">invoke</div><div class="text-lg leading-none">⟶</div></div>
    <div class="text-center text-sky-200"><div class="text-lg leading-none">⟵</div><div class="opacity-75">result</div></div>
  </div>

  <!-- TOOLS — now GET + CHECK -->
  <div class="w-48 rounded-xl border-2 border-sky-400/70 bg-sky-500/10 px-4 py-3 text-center shrink-0">
    <div class="text-base font-extrabold text-sky-300 mb-2">Tools</div>
    <div class="text-[10px] uppercase tracking-wider opacity-50 mb-1"><i>get</i></div>
    <div class="flex flex-col gap-1 text-[11px]">
      <span class="rounded-full border border-sky-400/30 px-2 py-0.5">Retriever · QMD</span>
    </div>
    <div class="text-[10px] uppercase tracking-wider opacity-50 mt-2 mb-1 text-emerald-300/70"><i>check</i> ← new</div>
    <div class="flex flex-col gap-1 text-[11px]">
      <span class="rounded-full border border-emerald-400/50 text-emerald-200 px-2 py-0.5">Evals · Lint</span>
      <span class="rounded-full border border-emerald-400/50 text-emerald-200 px-2 py-0.5">Build</span>
    </div>
  </div>

</div>

<!--
THE MENTAL MODEL for self-verify. This is the SAME agentic-RAG loop from two slides back — one red box, your blue
loop — with ONE addition: a CHECK tool. Until now the agent could only GET tools (retrieval); now it also gets the
VERIFIER (evals + build) as a tool. The flow it unlocks: generate → run the evals/build → read which ratings failed
→ fix → re-run, until everything is green. That closing of the loop is what the run on the next slide shows.
KEY DISTINCTION (sets up Harness II): right now the AGENT decides when to re-run and when it's done — convenient,
but it's still the red box judging itself. Next section: YOU own that loop (builder → verifier → fixer) so "done"
is decided by deterministic code, not the model's say-so.
-->

---

# 🔧 Let it check its own work

<div class="text-center opacity-70 -mt-2 mb-6 text-sm">The exact task, but the agent now gets the <b>verifier</b> (evals + build) as a tool — it generates, runs them, reads the failures, and fixes until green.</div>

<div class="max-w-2xl mx-auto">

```bash
./run-task.sh 7   # verify loop — evals exposed as a tool the agent calls & re-runs (write → verify → fix)
```

</div>

<div v-click class="text-center mt-7 text-sm">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200"><b>Let the agent self-reflect and improve</b> — it runs the checks, reads its own failures, and fixes until they pass.</span>
</div>

<!--
DEMO — SELF-VERIFY. No score on screen (same reason as the agentic demo: it's a non-deterministic loop, so a fixed
number isn't reproducible live). SAME task as every harness run so far — only the runner changes: the agent now
gets the VERIFIER (evals + build) as a tool, not just the retriever. The move to land: LET THE AGENT SELF-REFLECT
AND IMPROVE — it generates → runs the checks → reads which ratings failed → fixes → re-runs, closing the loop on
its OWN output instead of shipping the first guess. That self-correction is the real gain the previous section was
missing (fetching alone didn't earn it). Run it and watch the verify passes drop findings toward zero. For now
enjoy it — the honest catch ("but the model still judges itself / verify ≠ done") is the next section's job.
WIRED — stage 7 is `config.s7.mjs` (VerifyAgentRunner): the agent gets a verify(lint) tool and loops write → verify → fix until the checks pass. Run with `./run-task.sh 7`.
-->

---
layout: center
clicks: 3
---

# Andrew wants more

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="pushing" />

<div class="text-left flex flex-col gap-4 items-start">

<div v-click="1">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"wow — I got 100%?"</span>
</div>

<div v-click="2">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"the token usage is worth it"</span>
</div>

<div v-click="3">
<span class="px-3 py-1 rounded-full border border-amber-400/40 text-amber-200 text-sm">"can I expand my evals?"</span>
</div>

</div>

</div>

<!--
ANDREW WANTS MORE — the self-verify loop hit 100% on its own, and the earlier skepticism flips. "Wow — 100%?" =
the green is real, earned by the loop closing on its own output. "The token usage is worth it" = this is the
answer to his skeptic beat (yes it burns more tokens, but now the accuracy gain is real, so the trade pays). "Can
I expand my evals?" = the forward pull: the verifier is only as good as the checks behind it, so widen the bar —
more ratings, a real build, accessibility. That question hands off to "make it more complete" (stage 8: white-box
rules + build + axe). Play it warm: the trade he doubted just resolved in his favor, and now he wants MORE checks.
-->

---

# Now it can run the app, not just read it

<div class="text-center opacity-70 -mt-2 mb-4 text-sm">Same loop — but the agent's <b>check</b> tools now reach the <i>running</i> app: a real <b>build</b> and an <b>axe</b> accessibility audit, not just static analysis of the source.</div>

<div class="flex items-center justify-center gap-2 mt-1">

  <!-- LLM (red — probabilistic) -->
  <div class="w-36 rounded-xl border-2 border-red-400/70 bg-red-500/10 px-3 py-4 text-center shrink-0">
    <div class="text-lg font-extrabold text-red-300">LLM</div>
    <div class="text-[11px] opacity-60 mt-1">the model · guesses</div>
  </div>

  <!-- arrows: Agent ⇄ LLM -->
  <div class="flex flex-col gap-3 items-center text-[11px] w-24 shrink-0">
    <div class="text-center text-sky-200"><div class="opacity-75">prompt + results</div><div class="text-lg leading-none">⟵</div></div>
    <div class="text-center text-red-200"><div class="text-lg leading-none">⟶</div><div class="opacity-75">tool request</div></div>
  </div>

  <!-- AGENT (blue — deterministic hub) -->
  <div class="w-40 rounded-xl border-2 border-sky-400/70 bg-sky-500/10 px-3 py-4 text-center shrink-0">
    <div class="text-lg font-extrabold text-sky-300">Agent</div>
    <div class="text-[11px] opacity-60 mt-1">your loop</div>
    <div class="text-[11px] text-sky-200/80 mt-2">↻ repeat until done</div>
  </div>

  <!-- arrows: Agent ⇄ Tools -->
  <div class="flex flex-col gap-3 items-center text-[11px] w-20 shrink-0">
    <div class="text-center text-sky-200"><div class="opacity-75">invoke</div><div class="text-lg leading-none">⟶</div></div>
    <div class="text-center text-sky-200"><div class="text-lg leading-none">⟵</div><div class="opacity-75">result</div></div>
  </div>

  <!-- TOOLS — GET + CHECK (white-box) + CHECK (black-box, new) -->
  <div class="w-52 rounded-xl border-2 border-sky-400/70 bg-sky-500/10 px-4 py-3 text-center shrink-0">
    <div class="text-base font-extrabold text-sky-300 mb-2">Tools</div>
    <div class="text-[10px] uppercase tracking-wider opacity-50 mb-1"><i>get</i></div>
    <div class="flex flex-col gap-1 text-[11px]">
      <span class="rounded-full border border-sky-400/30 px-2 py-0.5">Retriever · QMD</span>
    </div>
    <div class="text-[10px] uppercase tracking-wider opacity-50 mt-2 mb-1"><i>check · reads code</i></div>
    <div class="flex flex-col gap-1 text-[11px]">
      <span class="rounded-full border border-sky-400/30 px-2 py-0.5">Evals · Lint</span>
    </div>
    <div class="text-[10px] uppercase tracking-wider opacity-50 mt-2 mb-1 text-amber-300/70"><i>check · runs app</i> ← new</div>
    <div class="flex flex-col gap-1 text-[11px]">
      <span class="rounded-full border border-amber-400/50 text-amber-200 px-2 py-0.5">Build</span>
      <span class="rounded-full border border-amber-400/50 text-amber-200 px-2 py-0.5">Axe · a11y</span>
    </div>
  </div>

</div>

<div v-click class="text-center mt-6 text-sm">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">white-box → black-box: it doesn't just <i>read</i> like good code — it <i>builds</i> and it's <i>accessible</i>. The bar got wider.</span>
</div>

<!--
THE TOOL ESCALATION for "more complete". Same red-box-in-a-blue-loop, third widening of the toolset:
- get (Retriever · QMD) — agentic RAG.
- check · reads code (Evals · Lint) — the white-box self-verify from the last pair; static analysis, no run.
- check · runs app (Build · Axe) — NEW and BLACK-BOX: the project actually BUILDS, and axe audits the rendered
  output for accessibility. These are WCS checks we'd been skipping (--skip-axe-testing etc.); the stage 8 config
  adds them (the built-in build rating + axe) and `./run-task.sh 8` turns axe back on.
WHY IT MATTERS: a white-box pass can love code that doesn't compile or that no screen-reader can use. Reaching the
running app is the honest, wider bar — which is exactly why the score DROPS first on the next slide before the
self-verify loop climbs it back. Black-box checks need the app to build + serve, so they sit at the far
(deterministic-verifier) end of the Definition-of-done spectrum.
-->

---

# 🔧 Make it more complete

<div class="text-center opacity-70 -mt-2 mb-6 text-sm">Stop skipping the hard checks. Add <b>real build</b> + <b>axe (a11y)</b> — the agent verifies against those too.</div>

<div class="max-w-2xl mx-auto">

```bash
./run-task.sh 8   # white-box rules + real build + axe accessibility
```

</div>

<div class="mt-7 text-center text-xs opacity-55">this is the white-box → black-box move: it doesn't just <i>read</i> like good code, it <i>builds</i> and it's <i>accessible</i></div>

<!--
DEMO — MORE COMPLETE (placeholder numbers; not run live). Answers Andrew's "can it become more complete?". So far
every rating was WHITE-BOX static analysis — it checks the code without running it. Now we drop the --skip flags
and add BLACK-BOX checks: the project actually BUILDS, and axe runs accessibility audits on the rendered output.
THE BEAT: a wider eval is an HONEST eval — the score DROPS first (78), because we're now measuring things the
white-box pass never saw (build errors, missing labels/roles/contrast). Then the self-verify loop from the last
demo does its job: the agent reads the build + axe failures as tool results and fixes them → back to 100, but on a
much wider definition of done. Callback to the "Definition of done" slide: we're walking from the white-box end
toward the black-box end. Completeness = more of the quadrants covered, same green loop driving it.
-->

---

# The agentic loop — the scorecard

<div class="grid grid-cols-2 gap-8 mt-6 text-left max-w-4xl mx-auto text-sm">

<div>

#### <span class="text-emerald-300">✓ Wins</span>

- **Strong results** — green on a wide bar
- **Scalable context** — semantic & procedural memory, fetched just-in-time
- **Self-verify** — build, evals & axe as tools it can re-run

</div>

<div>

#### <span class="text-amber-300">✗ Limits</span>

- **Not reliable long-run** — the model owns "done", so it drifts run-to-run
- **It can choke** — too many steps, loses the thread
- **Longer & pricier** — more tokens, risk of runaway loops

</div>

</div>

<div v-click class="text-center mt-7 text-sm">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">The fix isn't a smarter agent — it's a loop <i>you</i> control. →</span>
</div>

<!--
HARNESS I SCORECARD (placeholder — keep it simple). Honest benefits ↔ limits of handing the loop to the AGENT.
WINS: strong scores on a wider definition of done; context scales (semantic = wiki/knowledge, procedural = skills,
pulled just-in-time instead of pinned); and it self-verifies (build/evals/axe as tools it re-runs).
LIMITS — all the same root cause, the loop lives inside the RED box: nothing GUARANTEES it actually verifies (that
decision is non-deterministic — Andrew's "is my job done?"); it can CHOKE on long multi-step tasks (loses the
thread); and it runs longer = more tokens + risk of unexpected/runaway loops. Don't oversell the fixes here.
THE TURN (→ Harness II): you can't make the model reliable, but you can take the LOOP out of its hands — write
builder → verifier → fixer as deterministic code YOU own, so "did it verify?" stops being a model decision.
-->

---
layout: center
clicks: 3
---

# Andrew is sold

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="sold" />

<div class="text-left flex flex-col gap-4 items-start">

<div v-click="1">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"ok — it's fully customizable"</span>
</div>

<div v-click="2">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"this is really powerful"</span>
</div>

<div v-click="3">
<span class="px-3 py-1 rounded-full border border-amber-400/40 text-amber-200 text-sm">"but how can I make it more reliable?"</span>
</div>

</div>

</div>

<!--
ANDREW IS SOLD — the basic-harness payoff lands and the spell breaks in the good way. "Fully customizable" = he
now SEES the mechanism — the loop is code HE owns (runner, tools, ratings, stop condition), a deterministic loop
wrapping a probabilistic model (the red/blue picture), not a black box he tunes from outside. "Really powerful" =
the control is the point — every seam is his to shape. Then the engineer's instinct returns as the RIGHT question,
not a retreat: "how can I make it more reliable?" — because right now the AGENT decides when it's done, so it
drifts (the scorecard's long-run limit). That question is the hinge into Advanced Harness: YOU write the loop so
"done" stops being the model's call. Play it warm and forward-leaning — sold first, then the hand-off.
-->

---
layout: section
---

# Advanced Harness Engineering

### Stop trusting the agent to run the show — write the loop yourself

<!--
SECTION DIVIDER — the turn from the last scorecard. Harness I handed the loop to the AGENT (it decides when to
verify, when it's done) — convenient, but the control still lives inside the red box, so it can skip the check,
choke, or loop forever. Advanced harness = take the loop OUT of the model's hands: YOU write deterministic code
that orchestrates it — builder → verifier → fixer, with explicit steps, gates, and stop conditions. The model
still does the probabilistic work inside each box (blue/red diagram), but "did it build? did evals pass? are we
done?" are now decided by code, not vibes. This is what makes it scale to bigger tasks and stop choking.
-->

---

# You write the loop now

<div class="text-center opacity-70 -mt-2 mb-8 text-sm">The harness is deterministic code <i>you</i> own — it orchestrates the agents and gates every step.</div>

<div class="flex items-center justify-center gap-2 mt-2">

  <!-- HARNESS (blue — deterministic controller) -->
  <div class="w-44 rounded-xl border-2 border-sky-400/70 bg-sky-500/10 px-4 py-6 text-center shrink-0">
    <div class="text-xl font-extrabold text-sky-300">Harness</div>
    <div class="text-xs opacity-60 mt-1">the loop you write</div>
    <div class="text-[11px] text-sky-200/80 mt-2">↻ build → verify → fix</div>
  </div>

  <!-- arrows: Harness ⇄ Agents -->
  <div class="flex flex-col gap-4 items-center text-[11px] w-24 shrink-0">
    <div class="text-center text-sky-200">
      <div class="opacity-75">assign step</div>
      <div class="text-lg leading-none">⟶</div>
    </div>
    <div class="text-center text-red-200">
      <div class="text-lg leading-none">⟵</div>
      <div class="opacity-75">output</div>
    </div>
  </div>

  <!-- WORKFLOW STEPS (a pipeline: red agents that guess, blue checks the harness runs) -->
  <div class="rounded-xl border-2 border-dashed border-white/25 px-3 py-3 shrink-0">
    <div class="text-[11px] uppercase tracking-wider opacity-55 text-center mb-2">Workflow steps</div>
    <div class="flex flex-col gap-1 items-center">
      <div class="w-40 rounded-lg border-2 border-red-400/70 bg-red-500/10 px-3 py-1.5 text-center text-sm font-bold text-red-300">Planner <span class="text-[10px] font-normal opacity-60">· agent</span></div>
      <div class="text-sky-200/50 text-sm leading-none">↓</div>
      <div class="w-40 rounded-lg border-2 border-red-400/70 bg-red-500/10 px-3 py-1.5 text-center text-sm font-bold text-red-300">Implementer <span class="text-[10px] font-normal opacity-60">· agent</span></div>
      <div class="text-sky-200/50 text-sm leading-none">↓</div>
      <div class="w-40 rounded-lg border-2 border-sky-400/70 bg-sky-500/10 px-3 py-1.5 text-center text-sm font-bold text-sky-300">Verifier <span class="text-[10px] font-normal opacity-60">· check</span></div>
      <div class="text-sky-200/50 text-sm leading-none">↓</div>
      <div class="w-40 rounded-lg border-2 border-sky-400/70 bg-sky-500/10 px-3 py-1.5 text-center text-sm font-bold text-sky-300">Validator <span class="text-[10px] font-normal opacity-60">· check</span></div>
      <div class="text-sky-200/50 text-sm leading-none">↓</div>
      <div class="w-40 rounded-lg border-2 border-red-400/70 bg-red-500/10 px-3 py-1.5 text-center text-sm font-bold text-red-300">Fixer <span class="text-[10px] font-normal opacity-60">· agent</span></div>
    </div>
  </div>

  <!-- arrows: Agents ⇄ Tools -->
  <div class="flex flex-col gap-4 items-center text-[11px] w-24 shrink-0">
    <div class="text-center text-sky-200">
      <div class="opacity-75">invoke</div>
      <div class="text-lg leading-none">⟶</div>
    </div>
    <div class="text-center text-sky-200">
      <div class="text-lg leading-none">⟵</div>
      <div class="opacity-75">result</div>
    </div>
  </div>

  <!-- TOOLS (blue — deterministic) -->
  <div class="w-44 rounded-xl border-2 border-sky-400/70 bg-sky-500/10 px-4 py-4 text-center shrink-0">
    <div class="text-base font-extrabold text-sky-300 mb-2">Tools</div>
    <div class="flex flex-col gap-1.5 text-[11px]">
      <span class="rounded-full border border-sky-400/30 px-2 py-0.5">Retriever · MCP</span>
      <span class="rounded-full border border-sky-400/30 px-2 py-0.5">Build</span>
      <span class="rounded-full border border-sky-400/30 px-2 py-0.5">Files</span>
      <span class="rounded-full border border-sky-400/30 px-2 py-0.5">Tests · axe</span>
    </div>
  </div>

</div>

<!-- legend -->
<div class="flex items-center justify-center gap-8 mt-8 text-sm">
  <div class="flex items-center gap-2">
    <span class="inline-block w-3.5 h-3.5 rounded-sm border-2 border-red-400/70 bg-red-500/20"></span>
    <span><b class="text-red-300">red</b> — probabilistic <span class="opacity-60">(planner, implementer &amp; fixer)</span></span>
  </div>
  <div class="flex items-center gap-2">
    <span class="inline-block w-3.5 h-3.5 rounded-sm border-2 border-sky-400/70 bg-sky-500/20"></span>
    <span><b class="text-sky-300">blue</b> — deterministic <span class="opacity-60">(harness, checks &amp; tools you own)</span></span>
  </div>
</div>

<div v-click class="text-center mt-7 text-sm">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">Verify &amp; validate are <i>steps you own</i> — the harness always runs them; the agents only guess, they can't skip the gate.</span>
</div>

<!--
THE ADVANCED-HARNESS PICTURE — same red/blue legend as the earlier diagram, but the control has MOVED, and the
workflow is now explicit STEPS. Only the guessing parts are RED: the Planner (decomposes the task) and the
Implementer (writes the code) call the model. The checks are BLUE — the Verifier (does it meet the conventions /
build?) and the Validator (does it actually satisfy the task?) are deterministic steps the harness RUNS; no model
judges itself. The blue HARNESS sits outside, orchestrating: assign a step, read the output, gate the next move
(pass → done, fail → back to the implementer, stuck → stop). Tools stay blue and shared across steps. The win over
Harness I: "did it verify?" is no longer the model's call — verify and validate are pipeline steps YOU own, so the
agent can't skip them, can't declare itself done, can't loop forever (the harness owns the stop condition).
Punchline: orchestration and the checks are yours; guessing is theirs. That's how it scales without choking.
-->

---

# 🔧 A bigger task, many agents

<div class="text-center opacity-70 -mt-2 mb-6 text-sm">One that would choke a single agent — the harness splits it across <b>builder · verifier · fixer</b> and gates each step.</div>

<div class="max-w-2xl mx-auto">

```bash
./run-task.sh 9   # orchestrated workflow — harness drives planner → writer → verifier → fixer
```

</div>

<div v-click class="text-center mt-7 text-sm">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">trust the agent — but <b>guardrail</b> it: the harness gates every step</span>
</div>

<div class="mt-7 text-center text-xs opacity-55">watch the hand-offs — each agent does one job; the <i>code between them</i> decides what runs next</div>

<!--
DEMO — MANY AGENTS (placeholder numbers; not run live). The payoff of the previous diagram. Pick a task big enough
that ONE agent chokes (loses the thread, skips the check, or loops) — show it stall / score low. Then run the
ORCHESTRATED version: the blue harness assigns Builder → reads output → runs Verifier (always, can't be skipped) →
on fail routes to Fixer → re-verifies → stops when green or when the harness says stop. Same task, now 100.
WHAT TO POINT AT: the hand-offs are deterministic CODE, not the model deciding what's next; the verifier step is
guaranteed; the stop condition is owned by the harness (no runaway loop). This is the answer to all three Harness-I
limits at once (no-guarantee-it-checks, choking, runaway cost). Optional: mention parallel workers / a planner as
"more red boxes, same blue shell."
WIRED — stage 9 is `config.s9.mjs` (WorkflowAgentRunner): the harness — not the model — drives a deterministic planner → writer → (verify → fixer)* pipeline. Stage 10 (`config.s10.mjs`) is the tuned variant: per-agent models + a one-rule-at-a-time fixer.
-->

---
layout: center
clicks: 2
---

# Andrew is in love

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="in-love" />

<div class="text-left flex flex-col gap-4 items-start">

<div v-click="1">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"oh — <i>this</i> is what I'm supposed to be doing"</span>
</div>

<div v-click="2">
<span class="px-3 py-1 rounded-full border border-amber-400/40 text-amber-200 text-sm">"this feels like engineering again"</span>
</div>

</div>

</div>

<!--
ANDREW IS IN LOVE — the emotional landing of the whole night. He stopped babysitting a chatbot and started building
a SYSTEM: evals that define done, a deterministic harness that orchestrates probabilistic agents. The role that
"kept collapsing" at the start has reformed into something he recognizes — designing loops, gates, and contracts.
"This is what I'm supposed to be doing" = the job didn't disappear (his "is my job done?" fear), it moved UP a
level: from typing code to engineering the machine that writes it. "This feels like engineering again" = discipline
is back — measurable, deterministic, owned. This is the resolution of Andrew's arc; from here we zoom out (where to
go next / real codebase). Let it breathe before the closer.
-->

---

# Bonus: each agent, its own model

<div class="text-center opacity-70 -mt-2 mb-8 text-sm">The blue shell owns orchestration — so every red box is swappable. Route each job to the model that fits.</div>

<div class="flex items-center justify-center gap-2 mt-2">

  <!-- HARNESS (blue — deterministic controller) -->
  <div class="w-40 rounded-xl border-2 border-sky-400/70 bg-sky-500/10 px-3 py-6 text-center shrink-0">
    <div class="text-lg font-extrabold text-sky-300">Harness</div>
    <div class="text-xs opacity-60 mt-1">the loop you write</div>
    <div class="text-[11px] text-sky-200/80 mt-2">↻ build → verify → fix</div>
  </div>

  <!-- arrow -->
  <div class="flex flex-col gap-4 items-center text-[11px] w-16 shrink-0">
    <div class="text-center text-sky-200"><div class="text-lg leading-none">⟶</div></div>
    <div class="text-center text-red-200"><div class="text-lg leading-none">⟵</div></div>
  </div>

  <!-- WORKFLOW STEPS (same pipeline as before — red agents guess, blue checks the harness runs — now each red box tagged with its model) -->
  <div class="rounded-xl border-2 border-dashed border-white/25 px-3 py-3 shrink-0">
    <div class="text-[11px] uppercase tracking-wider opacity-55 text-center mb-2">Workflow steps</div>
    <div class="flex flex-col gap-0.5 items-center">
      <div class="w-56 rounded-lg border-2 border-red-400/70 bg-red-500/10 px-3 py-1 text-center">
        <div class="text-sm font-bold text-red-300">Planner <span class="opacity-50 font-normal">· agent</span></div>
        <div class="text-[11px] opacity-70">☁ Gemini 2.5 Flash <span class="opacity-50">· cloud</span></div>
      </div>
      <div class="text-sky-200/50 text-sm leading-none">↓</div>
      <div class="w-56 rounded-lg border-2 border-red-400/70 bg-red-500/10 px-3 py-1 text-center">
        <div class="text-sm font-bold text-red-300">Implementer <span class="opacity-50 font-normal">· agent</span></div>
        <div class="text-[11px] opacity-70">☁ Gemini 2.5 Flash <span class="opacity-50">· cloud</span></div>
      </div>
      <div class="text-sky-200/50 text-sm leading-none">↓</div>
      <div class="w-56 rounded-lg border-2 border-sky-400/70 bg-sky-500/10 px-3 py-1 text-center">
        <div class="text-sm font-bold text-sky-300">Verifier <span class="opacity-50 font-normal">· check</span></div>
        <div class="text-[11px] opacity-70">⚙ lint · deterministic <span class="text-emerald-300">· $0</span></div>
      </div>
      <div class="text-sky-200/50 text-sm leading-none">↓</div>
      <div class="w-56 rounded-lg border-2 border-sky-400/70 bg-sky-500/10 px-3 py-1 text-center">
        <div class="text-sm font-bold text-sky-300">Validator <span class="opacity-50 font-normal">· check</span></div>
        <div class="text-[11px] opacity-70">⚙ build · deterministic <span class="text-emerald-300">· $0</span></div>
      </div>
      <div class="text-sky-200/50 text-sm leading-none">↓</div>
      <div class="w-56 rounded-lg border-2 border-red-400/70 bg-red-500/10 px-3 py-1 text-center">
        <div class="text-sm font-bold text-red-300">Fixer <span class="opacity-50 font-normal">· agent</span></div>
        <div class="text-[11px] opacity-70">🖥 Gemma 4 · local <span class="text-emerald-300">· $0</span></div>
      </div>
    </div>
  </div>

  <!-- arrow -->
  <div class="flex flex-col gap-4 items-center text-[11px] w-16 shrink-0">
    <div class="text-center text-sky-200"><div class="text-lg leading-none">⟶</div></div>
    <div class="text-center text-sky-200"><div class="text-lg leading-none">⟵</div></div>
  </div>

  <!-- TOOLS (blue — deterministic) -->
  <div class="w-40 rounded-xl border-2 border-sky-400/70 bg-sky-500/10 px-3 py-4 text-center shrink-0">
    <div class="text-base font-extrabold text-sky-300 mb-2">Tools</div>
    <div class="flex flex-col gap-1.5 text-[11px]">
      <span class="rounded-full border border-sky-400/30 px-2 py-0.5">Wiki · MCP</span>
      <span class="rounded-full border border-sky-400/30 px-2 py-0.5">Build</span>
      <span class="rounded-full border border-sky-400/30 px-2 py-0.5">Files</span>
    </div>
  </div>

</div>

<div class="text-center mt-8 text-xs opacity-60">this run's bill: planner + implementer billed · verifier, validator &amp; fixer <span class="text-emerald-300">$0</span> — <code>WorkflowOptimisedAgentRunner</code></div>

<!--
BONUS — PER-AGENT MODEL ROUTING. Same pipeline as the last slide (planner → implementer → verifier → validator,
now + fixer), one new idea: because the loop is deterministic CODE you own, each RED box is just a function call —
so you pick the model PER ROLE. Real in the repo (WorkflowOptimisedAgentRunner + models.mjs): the PLANNER and
IMPLEMENTER (the writer) run on the paid Gemini --model where reasoning/quality matter; the VERIFIER and VALIDATOR
are deterministic checks (lint / build) — $0, not models at all (so they're BLUE, not red); the output-heavy FIXER
runs on a LOCAL Ollama model (gemma4:26b by default, override FIXER_MODEL), so its many tokens cost nothing and
aren't rate-limited. usageTracker prices each call by its own model → the banner shows only planner + implementer
billed, everything else $0. THE POINT: orchestration being yours turns "which model?" from one global choice into a
per-step knob — heavy thinking → frontier; mechanical grinding → free local; deterministic checks → no model.
(Honest caveat: the repo's optimised runner fixes ONE RULE at a time and its verify step is lint; "validator" here
stands for the build/behavioural gate. WorkflowAgentRunner is single-model; the OPTIMISED one is the split. Local
Gemma needs `ollama` running.)
-->

---

# Harness engineering — the scorecard

<div class="grid grid-cols-2 gap-8 mt-6 text-left max-w-4xl mx-auto text-sm">

<div>

#### <span class="text-emerald-300">✓ Wins</span>

- **Deterministic control** — verifier always runs, _you_ own the stop condition
- **Scales** — focused agents, bigger tasks, no choking
- **Cost is a knob** — route per role: frontier · free local · plain code

</div>

<div>

#### <span class="text-amber-300">✗ Limits</span>

- **You own the loop** — orchestration code to build, debug & maintain
- **More moving parts** — agents, roles, infra (local models, MCP)
- **Still probabilistic inside** — it _gates_ bad output, doesn't prevent it

</div>

</div>

<div v-click class="text-center mt-7 text-sm">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">You can't make the model deterministic — so you engineer everything <i>around</i> it.</span>
</div>

<!--
HARNESS SCORECARD — closes the technique ladder honestly, same shape as the prompt + agentic scorecards.
WINS: the loop is yours, so control is real — the verifier ALWAYS runs, the stop condition is code (no skipped
checks, no runaway loops); it scales (split a big task across focused agents instead of one choking); and cost
becomes a per-step knob (frontier model where it thinks, free local where it grinds, no model at all for the
deterministic verifier).
LIMITS — the honest price: you now OWN orchestration code (write/debug/maintain it); more moving parts and infra
(roles, MCP, a local model server); and the model is still probabilistic INSIDE each box — the harness gates and
recovers, it doesn't make the model correct. Worth it at scale, overkill for a one-off.
THE RESOLUTION (whole arc, not a forward pointer): prompt → context → harness were three levers on the SAME
problem, measured by the SAME evals. You can't make the red box deterministic — so you engineer the blue around it.
That's the thesis of the night. Next we zoom out: what this looks like in a real codebase / where to go.
-->

---
layout: center
clicks: 2
---

# 👋 Andrew says goodbye

<div class="flex items-center justify-center gap-12 mt-6">

<Andrew emotion="goodbye" />

<div class="text-left flex flex-col gap-4 items-start">

<div v-click="1">
<span class="px-3 py-1 rounded-full border border-white/15 text-sm">"I came in babysitting a chatbot…"</span>
</div>

<div v-click="2">
<span class="px-3 py-1 rounded-full border border-amber-400/40 text-amber-200 text-sm">"…I'm leaving with a system to engineer. See you out there."</span>
</div>

</div>

</div>

<!--
ANDREW SAYS GOODBYE — the human send-off, one beat before the CTA. Closes his arc with a wave: the guy who started
the night worried his job was collapsing leaves with a bigger one — engineering the machine, not just feeding it.
Keep it warm and brief; it's the exhale that hands off to "Let's stay connected". Don't re-teach — just land the
emotion and move to the contact slide.
-->

---
layout: section
---

# What's next

### Beyond the workshop — the frontier, the tooling, your repo

<!--
SECTION DIVIDER — closes the technique trilogy (prompt → context → harness, each with a scorecard) and opens the
zoom-out closer. Everything so far was the METHOD; from here it's where it goes: the in-context ceiling and the
frontier beyond it (open models / fine-tuning), the tooling landscape (and the honest WCS caveat), what this looks
like in a real codebase, and the one concrete first step home. Keep it brief — this is a breath before the landing.
-->

---

# It was all in-context learning

<div class="text-center opacity-70 -mt-2 mb-6 text-sm">Tonight we never touched the weights. On a frontier model, that gets you ~<b>90%</b> — cheap, and changeable in minutes.</div>

<div class="grid grid-cols-2 gap-6 max-w-4xl mx-auto text-left text-sm">

<!-- The 90% -->
<div v-click class="rounded-xl border border-white/25 bg-white/5 p-5">
  <div class="flex items-baseline gap-2 mb-3">
    <span class="text-lg font-extrabold">🧠 In-context</span>
    <span class="text-xs uppercase tracking-wider opacity-55">tonight · ~90%</span>
  </div>
  <ul class="flex flex-col gap-2">
    <li><b>Prompt</b> · <b>Context</b> · <b>Harness</b></li>
    <li>Frontier model, <b>no training</b></li>
    <li>Change it in minutes, not GPU-days</li>
  </ul>
</div>

<!-- The last 10% -->
<div v-click class="rounded-xl border border-dashed border-amber-300/40 bg-amber-400/5 p-5">
  <div class="flex items-baseline gap-2 mb-3">
    <span class="text-lg font-extrabold">🔩 Own the model</span>
    <span class="text-xs uppercase tracking-wider opacity-55">the last 10%</span>
  </div>
  <ul class="flex flex-col gap-2">
    <li><b>Open models</b> — your weights <span class="opacity-55">(🔗 my HF)</span></li>
    <li><b>Fine-tune</b> — SFT → RL <span class="opacity-55">(your evals = the reward)</span></li>
    <li><b>Scale</b> — data · compute · your own harness</li>
  </ul>
</div>

</div>

<div v-click class="text-center mt-6 text-sm">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">In-context learning <i>rents</i> capability. To squeeze the last bits, you <i>buy</i> it — and your evals stop grading, start <b>training</b>.</span>
</div>

<!--
THE CEILING / FRONTIER. Honest reframe of the whole night: prompt + context + harness = IN-CONTEXT LEARNING — we
shaped the inputs to a FROZEN frontier model and never touched its weights. On a good frontier model that's ~90%
of the value, and it's cheap + reversible (edit a prompt, not retrain). To squeeze the last 10% / push further you
go INTO the model: open-weight models you control (→ live: show my Hugging Face account), fine-tuning — SFT first,
then RL, where the verifiable evals from tonight become the REWARD signal (RLVR; this is the capstone callback —
the eval was the coach all along), and then scale it (data, compute, your own training harness).
DELIVERY: don't teach this — name it so the senior crowd knows you know the ceiling you're standing on. The line
"in-context rents, fine-tuning buys" lands the boundary. Keep the HF reveal short — one screen, proof not a tour.
-->

---

# You don't have to build it all

<div class="text-center opacity-70 -mt-2 mb-6 text-sm">Tonight's stack was hand-rolled to teach. In the wild, there's prior art — and an honest caveat about WCS.</div>

<div class="grid grid-cols-3 gap-4 max-w-5xl mx-auto text-left text-sm">

<div v-click class="rounded-xl border border-white/15 p-4">
  <div class="text-xs uppercase tracking-wider opacity-55 mb-2">Agents</div>
  <ul class="flex flex-col gap-1.5">
    <li><b>LangChain DeepAgents</b> — long-horizon orchestration</li>
  </ul>
</div>

<div v-click class="rounded-xl border border-white/15 p-4">
  <div class="text-xs uppercase tracking-wider opacity-55 mb-2">Evals & grading</div>
  <ul class="flex flex-col gap-1.5">
    <li><b>DeepEval</b> — pytest-style LLM evals</li>
    <li><b>SkillGrade</b> — Minko's skill grading</li>
  </ul>
</div>

<div v-click class="rounded-xl border border-white/15 p-4">
  <div class="text-xs uppercase tracking-wider opacity-55 mb-2">Harness & benchmarks</div>
  <ul class="flex flex-col gap-1.5">
    <li><b>Harbor</b> · <b>Terminal-Bench</b></li>
    <li><b>benchmark-runner</b> <span class="opacity-55">— mine</span></li>
  </ul>
</div>

</div>

<div v-click class="max-w-3xl mx-auto mt-6 text-sm text-center rounded-lg border border-amber-400/30 bg-amber-400/5 px-4 py-3">
  ⚠️ <b>WCS was a great teaching example — but it's a <i>benchmarking</i> tool.</b> The real move is eval-<i>harness</i> engineering you build for <i>your</i> codebase.
</div>

<div v-click class="text-center mt-5 text-sm">
  <span class="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200">The takeaway isn't WCS — it's the discipline. Bring the harness home to your repo.</span>
</div>

<!--
THE TOOLING LANDSCAPE + HONEST CAVEAT. Two jobs here. (1) Point at prior art so nobody thinks they must hand-roll
everything: AGENTS — LangChain DeepAgents (long-horizon); EVALS — DeepEval (pytest-style), SkillGrade (Minko's);
HARNESS/BENCH — Harbor, Terminal-Bench, and my own benchmark-runner (show it). (2) Be honest about WCS: it was the
perfect TEACHING vehicle tonight, but it's fundamentally a BENCHMARKING tool — fixed tasks, scoring a model. Your
codebase isn't a benchmark; the durable skill is eval-HARNESS engineering you build yourself (Harbor / Terminal-
Bench are reference points; benchmark-runner is my worked example). Punchline: the lesson is the discipline, not
the tool — take the harness to your own repo.
NOTE TO SELF: verify the one-line descriptors for SkillGrade / Harbor before presenting — these are my references,
swap in the exact framing I want. DeepAgents = LangChain; DeepEval = confident-ai; Terminal-Bench = terminal agents.
-->

---
layout: center
class: text-center
---

# Let's stay connected

<div class="flex items-center justify-center gap-14 mt-8">

  <!-- Profile: photo + name + headline -->
  <div class="flex flex-col items-center gap-3 shrink-0">
    <img src="data:image/jpeg;base64,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" class="w-44 h-44 rounded-full object-cover border-2 border-white/15" alt="Greg Radzio" />
    <div class="text-2xl font-bold mt-1">Greg Radzio</div>
    <div class="text-sm opacity-70 max-w-[15rem]">Eval-driven AI codegen · agentic harnesses · Angular tooling</div>
  </div>

  <!-- QR + link -->
  <div class="flex flex-col items-center gap-4 shrink-0">
    <div class="bg-white rounded-2xl p-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37" shape-rendering="crispEdges" width="192" height="192" role="img" aria-label="Connect with Greg on LinkedIn"><path fill="#ffffff" d="M0 0h37v37H0z"/><path stroke="#000000" d="M4 4.5h7m6 0h2m1 0h5m1 0h7M4 5.5h1m5 0h1m2 0h5m1 0h1m1 0h1m2 0h1m1 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h1m2 0h2m2 0h2m2 0h1m2 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m1 0h1m4 0h3m1 0h1m4 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h2m1 0h1m1 0h1m2 0h5m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h1m1 0h2m3 0h2m5 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h1m1 0h1m3 0h2m3 0h2M4 12.5h1m1 0h5m2 0h7m1 0h3m2 0h5M7 13.5h1m3 0h1m2 0h4m2 0h4m1 0h4m3 0h1M4 14.5h2m1 0h4m2 0h3m1 0h3m1 0h1m4 0h1M4 15.5h1m4 0h1m1 0h1m3 0h2m1 0h1m4 0h3m1 0h1m1 0h1m1 0h1M5 16.5h1m1 0h6m1 0h4m1 0h3m1 0h1m5 0h2M4 17.5h1m2 0h1m3 0h1m1 0h1m2 0h2m2 0h7m1 0h1m3 0h1M7 18.5h2m1 0h5m1 0h5m1 0h1m1 0h4m1 0h2M4 19.5h1m1 0h4m3 0h1m1 0h1m2 0h3m6 0h2m2 0h1M4 20.5h2m2 0h4m3 0h2m4 0h1m1 0h1m3 0h1m1 0h2M4 21.5h3m2 0h1m1 0h1m2 0h4m3 0h8m1 0h1m1 0h1M4 22.5h1m1 0h1m1 0h3m1 0h3m2 0h5m4 0h2m2 0h1M4 23.5h1m3 0h2m1 0h1m4 0h2m2 0h1m1 0h1m1 0h5m2 0h1M4 24.5h1m2 0h1m1 0h3m3 0h2m1 0h2m1 0h2m1 0h5m1 0h3M12 25.5h1m1 0h3m3 0h3m1 0h1m3 0h5M4 26.5h7m3 0h1m4 0h3m1 0h2m1 0h1m1 0h3M4 27.5h1m5 0h1m1 0h1m1 0h2m2 0h3m2 0h2m3 0h1m2 0h1M4 28.5h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h1m2 0h1m1 0h1m2 0h5m1 0h3M4 29.5h1m1 0h3m1 0h1m1 0h2m2 0h3m1 0h1m1 0h2m3 0h1m1 0h4M4 30.5h1m1 0h3m1 0h1m1 0h4m1 0h3m1 0h1m1 0h1m1 0h7M4 31.5h1m5 0h1m3 0h5m5 0h4m1 0h1m1 0h1M4 32.5h7m1 0h1m1 0h1m1 0h1m2 0h3m1 0h1m2 0h5"/></svg>
    </div>
    <div class="text-sky-300 text-lg font-mono">linkedin.com/in/greg-radzio</div>
    <div class="text-sm opacity-70">Scan, connect, and tell me what you're building.</div>
  </div>

</div>

<div class="mt-10 text-sm opacity-50">Thanks for tonight 🙏</div>

<!--
CALL TO ACTION — the literal last slide. Goal: get them to FOLLOW/CONNECT on LinkedIn while the talk is fresh.
Leave this slide up during Q&A so the QR stays scannable (white card = guaranteed contrast). Keep the ask warm and
specific ("tell me what you're building") — a reason to connect beats "follow me".
Photo is embedded inline (data URI sourced from slides/public/greg.jpeg). QR + handle are live
(https://www.linkedin.com/in/greg-radzio/). To change the photo, re-embed from a new greg.jpeg.
-->
