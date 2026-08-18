# Architectural & Design Decisions

### 1. Why this strategy over the obvious alternative rejected?
I chose a lightweight React + Tailwind CSS architecture with a deterministic client-side state machine over heavy UI component libraries (Mantine, Chakra, or pre-made templates). This provides instantaneous sub-second initial loads, zero bundle bloat, and complete control over responsive layout breakpoints without dealing with CSS stylesheet conflicts.

### 2. One trade-off made under the time limit, and what I'd do with a real week
* **Trade-off:** Endpoint latency metrics and error states are simulated through deterministic React component state rather than consuming live streaming Server-Sent Events (SSE).
* **Full Week Vision:** With a full development week, I would deploy a lightweight Go/Node.js edge worker daemon that runs real scheduled cron ping jobs against user-provided URLs and visualizes historical response time percentiles (p50, p95, p99) via SVG sparkline charts.

### 3. AI tools usage & personal verification
I leveraged AI assistance for rapid baseline scaffolding of the Tailwind utility classes and the initial Konami key sequence array. I personally audited and verified the responsive viewport constraints (ensuring zero horizontal scrolling at both 390px mobile and 1440px desktop), standardized dark/light contrast ratios across all states, and verified clean component re-rendering.