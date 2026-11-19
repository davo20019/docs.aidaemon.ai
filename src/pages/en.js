import { codeBlock, callout, configTable } from '../helpers.js';
import sdkPages from './sdk-en.js';

const pages = [
  {
    slug: '/',
    section: null,
    title: 'AIDaemon Documentation — Personal AI Agent Daemon',
    description: 'Documentation for aidaemon, an open-source personal AI agent daemon. Chat via Telegram, Slack, or Discord. Extend with MCP, use any LLM.',
    content: () => `
<h1><span class="ai">AID</span>aemon</h1>
<p class="lead">A personal AI agent that runs as a daemon. Always on, always learning. Chat from the AIDaemon app or Telegram, Slack and Discord, extend with MCP, powered by any LLM.</p>

${callout('success', 'New here?', 'Start with <a href="/getting-started/build">Install</a>: download the app for macOS, Windows or Linux and open it. Current version: <strong>0.21.0</strong>.')}

<p>aidaemon is a self-hosted AI agent written in Rust that runs as a background service on your machine. It connects to ChatGPT, Anthropic, Gemini, xAI or any OpenAI-compatible LLM provider, communicates through its own app (desktop, web and terminal) and via Telegram, Slack, or Discord, and can execute tools, manage its own configuration, remember facts, browse the web, and spawn sub-agents — all autonomously.</p>

<h2>Key Features</h2>
<ul>
  <li><strong>The AIDaemon app</strong> — one app for desktop, web and terminal: streaming replies, Read aloud, approvals, settings and usage. See <a href="/app">The AIDaemon App</a></li>
  <li><strong>Live views</strong> — watch the agent's browser and take over when it needs a sign-in</li>
  <li><strong>Coding agents</strong> — Claude Code, Codex, Antigravity and any Agent Client Protocol agent, in a permission mode you choose</li>
  <li><strong>Daemon architecture</strong> — runs as systemd/launchd service, always available</li>
  <li><strong>Multi-channel</strong> — chat via Telegram, Slack, or Discord, multi-user access control</li>
  <li><strong>Agentic tool use</strong> — autonomous multi-step reasoning with approvals for side effects</li>
  <li><strong>MCP integration</strong> — extend with any Model Context Protocol server</li>
  <li><strong>Persistent memory</strong> — SQLite-backed history with semantic search via embeddings</li>
  <li><strong>Multi-model routing</strong> — automatic Fast/Primary/Smart tier selection</li>
  <li><strong>Email triggers</strong> — IMAP IDLE monitoring for inbox notifications</li>
  <li><strong>Command approval</strong> — interactive Telegram approval for shell commands</li>
  <li><strong>Skills system</strong> — dynamic prompt enhancement via markdown files</li>
  <li><strong>Self-maintenance</strong> — reads, updates, validates, and restores its own config</li>
  <li><strong>Browser automation</strong> — Chrome with persistent login sessions, screenshots, and form filling</li>
  <li><strong>Web research</strong> — built-in web search (DuckDuckGo/Brave) and URL fetching</li>
  <li><strong>Sub-agent spawning</strong> — recursive agent delegation for complex tasks</li>
  <li><strong>CLI agent delegation</strong> — delegate to Claude Code, Codex, Antigravity, Gemini, Copilot, Aider, or any ACP agent</li>
  <li><strong>Scheduled tasks</strong> — cron-style recurring tasks with natural language parsing</li>
  <li><strong>File transfer</strong> — send and receive files via Telegram with path security</li>
  <li><strong>Secrets management</strong> — OS keychain and environment variable support</li>
  <li><strong>Token cost tracking</strong> — per-model usage stats, /cost command, plan limits and balances in Settings</li>
  <li><strong>Event sourcing</strong> — immutable event log with daily consolidation into facts and procedures</li>
  <li><strong>Goals + tasks</strong> — break bigger work into trackable tasks and keep progress moving</li>
  <li><strong>Health monitoring</strong> — HTTP, TCP, command, and file probes with alerting</li>
  <li><strong>Dynamic skills</strong> — install from registries or auto-promote repeated procedures</li>
  <li><strong>Self-updater</strong> — auto-update from GitHub releases with configurable modes</li>
  <li><strong>Discord integration</strong> — slash commands, interactive approval buttons, multi-bot support</li>
  <li><strong>Command risk assessment</strong> — 4-level risk scoring (Safe/Medium/High/Critical) for terminal commands</li>
  <li><strong>People intelligence</strong> — a personal contact book that remembers birthdays, preferences, and relationships for you</li>
</ul>

<h2>Architecture at a Glance</h2>
${codeBlock(`Telegram ──┐
Slack    ──┤──> ChannelHub ──> Agent ──> LLM Provider
Discord  ──┘         │
                     ├──> Tools
                     │    ├── terminal (risk assessment)
                     │    ├── system info
                     │    ├── memory (facts)
                     │    ├── config manager
                     │    ├── web search + fetch
                     │    ├── browser (optional)
                     │    ├── file transfer
                     │    ├── sub-agents + CLI agents
                     │    ├── health probes
                     │    ├── manage skills
                     │    ├── manage people
                     │    ├── scheduler
                     │    └── MCP tools (dynamic)
                     │
                     ├──> Events
                     │    ├── immutable event log
                     │    └── daily consolidation
                     │
                     ├──> Goals + Tasks
                     │    ├── break work into tasks
                     │    └── track progress + retries
                     │
                     ├──> State
                     │    ├── SQLite persistence
                     │    └── in-memory working mem
                     │
                     └──> Facts
                          └── injected into system prompt

Triggers ───> EventBus ───> Agent
   └── IMAP IDLE

Health ───> GET /health (axum)`, 'text', 'architecture')}

<h2>Quick Links</h2>
<ul>
  <li><a href="/getting-started/build">Install</a> — download the app for macOS, Windows or Linux</li>
  <li><a href="/app">The AIDaemon App</a> — chat, approvals, live views, settings</li>
  <li><a href="/configuration">Configuration Reference</a> — full config.toml documentation</li>
  <li><a href="/tools">Tools</a> — built-in and extensible tool system</li>
  <li><a href="/telegram">Telegram</a> — bot setup, commands, approval flow</li>
  <li><a href="/slack">Slack</a> — workspace integration via Socket Mode</li>
  <li><a href="/discord">Discord</a> — bot setup, slash commands, approval buttons</li>
  <li><a href="/event-sourcing">Event Sourcing</a> — immutable events and consolidation</li>
  <li><a href="/plans">Plans (Legacy)</a> — old planning system notes for older installs</li>
  <li><a href="/health-monitoring">Health Monitoring</a> — service probes and alerting</li>
</ul>
`
  },
  {
    slug: '/getting-started',
    section: 'Getting Started',
    title: 'Overview',
    description: 'Get AIDaemon running on your computer: download the app, open it, connect a model, and start chatting.',
    content: () => `
<h1>Getting Started</h1>
<p class="lead">Download the AIDaemon app, open it, connect a model, and start chatting. No terminal needed on macOS or Windows.</p>

<p>The current version is <strong>0.21.0</strong>.</p>

<h2>What you need</h2>
<ul>
  <li><strong>A computer</strong> &mdash; a Mac (Apple silicon or Intel), a Windows PC, or Linux (x86_64 or ARM64).</li>
  <li><strong>A model</strong> &mdash; a ChatGPT plan you sign in to, or an API key from a provider such as Anthropic, Google Gemini, OpenAI or OpenRouter, or a model running on your own machine (Ollama, llama.cpp). The app finds one already on your computer when it can.</li>
  <li><strong>Optional:</strong> a Telegram, Slack or Discord bot, if you also want to talk to your agent from your phone's chat apps. You can add it later.</li>
</ul>

<h2>Steps</h2>
<ol>
  <li><a href="/getting-started/build">Install</a> &mdash; download and open the app for your computer</li>
  <li><a href="/getting-started/wizard">First run</a> &mdash; the app starts the assistant and connects a model</li>
  <li><a href="/app">Use the app</a> &mdash; chat, approvals, live views, settings</li>
  <li><a href="/configuration">Configure</a> &mdash; every setting is also in <code>config.toml</code> and on the app's Settings page</li>
</ol>
`
  },
  {
    slug: '/getting-started/build',
    section: 'Getting Started',
    title: 'Install',
    description: 'Download and install AIDaemon on macOS, Windows or Linux, step by step. Advanced options: Homebrew, Cargo, building from source, servers.',
    content: () => `
<h1>Install AIDaemon</h1>
<p class="lead">Pick your computer below and follow the steps. It takes a few minutes, and on macOS and Windows you never need a terminal.</p>

<p>All downloads are on the <a href="https://github.com/davo20019/aidaemon/releases/latest" target="_blank" rel="noopener">latest release page</a>. The current version is <strong>0.21.0</strong>.</p>

<h2>macOS</h2>
<p><strong>First, check which Mac you have:</strong> click the Apple menu (the apple logo at the top left of the screen) &rarr; <strong>About This Mac</strong>. If the <strong>Chip</strong> line says <em>Apple M&hellip;</em>, you have Apple silicon. If it shows a <strong>Processor</strong> line with <em>Intel</em>, you have an Intel Mac.</p>
<ol>
  <li>Download the app for your Mac:
    <ul>
      <li>Apple silicon (M1, M2, M3 and later): <a href="https://github.com/davo20019/aidaemon/releases/latest/download/AIdaemon-macos-aarch64.dmg"><code>AIdaemon-macos-aarch64.dmg</code></a></li>
      <li>Intel: <a href="https://github.com/davo20019/aidaemon/releases/latest/download/AIdaemon-macos-x86_64.dmg"><code>AIdaemon-macos-x86_64.dmg</code></a></li>
    </ul>
  </li>
  <li>Open the downloaded <code>.dmg</code> file.</li>
  <li>Drag <strong>AIDaemon</strong> into the <strong>Applications</strong> folder.</li>
  <li>Open AIDaemon from Applications (or Launchpad).</li>
</ol>
${callout('info', 'If macOS blocks it the first time', 'Open <strong>System Settings &rarr; Privacy &amp; Security</strong>, scroll down to the message about AIDaemon and click <strong>Open Anyway</strong>. You only need to do this once.')}

<h2>Windows</h2>
<ol>
  <li>Download <a href="https://github.com/davo20019/aidaemon/releases/latest/download/aidaemon-windows-x86_64.zip"><code>aidaemon-windows-x86_64.zip</code></a>.</li>
  <li>Right-click the zip file and choose <strong>Extract All&hellip;</strong>. Extract it to a folder you will keep (for example <code>%LOCALAPPDATA%\\AIDaemon</code>), not your Downloads folder.</li>
  <li>Open the extracted folder and double-click <code>aidaemon-app.exe</code>.</li>
</ol>
${callout('info', 'If Windows SmartScreen warns you', 'Click <strong>More info</strong>, then <strong>Run anyway</strong>.')}

<h2>Linux</h2>
<p>Open a terminal and run the installer. It downloads the right build for your machine (x86_64 or ARM64), checks it, and installs the app too:</p>
${codeBlock(`curl -sSfL https://get.aidaemon.ai | bash`, 'bash')}
<p>Or download a release archive yourself and extract it:</p>
<ul>
  <li>x86_64: <a href="https://github.com/davo20019/aidaemon/releases/latest/download/aidaemon-linux-x86_64.tar.gz"><code>aidaemon-linux-x86_64.tar.gz</code></a></li>
  <li>ARM64 (aarch64): <a href="https://github.com/davo20019/aidaemon/releases/latest/download/aidaemon-linux-aarch64.tar.gz"><code>aidaemon-linux-aarch64.tar.gz</code></a></li>
</ul>
<p>Then open the app with <code>aidaemon app</code> (a window) or <code>aidaemon tui</code> (in the terminal).</p>

<h2>Homebrew (macOS or Linux)</h2>
${codeBlock(`brew install davo20019/tap/aidaemon`, 'bash')}
<p>Then run <code>aidaemon app</code>.</p>

<h2>What happens next</h2>
<p>The first time the app opens, it starts the assistant on this computer (now and at every login, no administrator password needed) and helps you connect a model. See <a href="/getting-started/wizard">First run</a>.</p>

<h2>Advanced</h2>

<h3>Cargo</h3>
<p>For Rust developers:</p>
${codeBlock(`cargo install --locked --git https://github.com/davo20019/aidaemon aidaemon`, 'bash')}

<h3>Build from source</h3>
${codeBlock(`git clone https://github.com/davo20019/aidaemon.git
cd aidaemon
cargo build --release`, 'bash')}
<p>The binary is at <code>./target/release/aidaemon</code>. The default features are <code>discord</code>, <code>slack</code>, <code>encryption</code>, <code>browser</code>, <code>terminal-bridge</code>, <code>otel</code> and <code>execution-docker</code>. Optional features include <code>computer_use</code> and <code>computer_use-macos</code> (operate native macOS apps) and <code>sdk-memory</code>. The app itself lives in <code>clients/app</code> and is built separately.</p>

<h3>Running on a server</h3>
<p>On a server, run <code>AIDaemon</code> with no config. It prints a link and a one-time code. Reach the machine's port <code>8788</code> through an SSH tunnel or your own HTTPS tunnel, open the link on your laptop or phone, and finish setup there (the code pairs the first device only):</p>
${codeBlock(`# on your laptop
ssh -L 8788:127.0.0.1:8788 you@your-server
# then open the printed link in your browser`, 'bash')}
<p>Prefer a terminal? <code>aidaemon setup</code> connects the model right there. To keep the daemon running, see <a href="/service-install">Run as a service</a>. To reach the app from other devices without SSH, see <a href="/app/gateway">Client Gateway &amp; pairing</a>.</p>

<h3>Verify a download</h3>
<p>Every release file has a matching <code>.sha256</code> file on the release page. The one-line installer checks it for you.</p>
`
  },
  {
    slug: '/getting-started/wizard',
    section: 'Getting Started',
    title: 'First Run',
    description: 'What happens the first time you open AIDaemon: the assistant starts on your computer, finds or connects a model, and opens your first conversation.',
    content: () => `
<h1>First Run</h1>
<p class="lead">The first time you open the AIDaemon app, it starts the assistant on your computer and helps you connect a model. Nothing is saved until a test call to the model answers.</p>

<h2>1. Where the assistant runs</h2>
<p>The desktop app starts the assistant (the daemon) on this computer right away, now and at every login, with no administrator password. This is <strong>Run it here</strong>, the same as <code>aidaemon service install</code>. To run it on a server instead, choose <strong>Run it on another machine instead</strong> and paste the link that server printed (see <a href="/getting-started/build">Install &rarr; Running on a server</a>).</p>

<h2>2. Connect a model</h2>
<p>The app looks for a model already on your computer &mdash; a ChatGPT sign-in, a provider key in the environment (such as <code>OPENAI_API_KEY</code> or <code>ANTHROPIC_API_KEY</code>), or Ollama or llama.cpp running locally &mdash; and offers it in one click. Or pick a provider yourself:</p>
<ul>
  <li><strong>ChatGPT subscription</strong> &mdash; sign in from the app. On another device, paste the address the browser ends on.</li>
  <li><strong>A provider key</strong> &mdash; the key is checked first, then you pick a model from your account's own list (the usual one is preselected).</li>
  <li><strong>Self-hosted</strong> &mdash; <strong>Ollama (local)</strong>, <strong>llama.cpp (local)</strong>, or <strong>Another OpenAI-compatible service</strong> with your server's address (LM Studio, vLLM) and the key left empty.</li>
</ul>
<p>Each provider says whether it uses your plan, bills per token, or runs on your own machine. One test call must answer before anything is saved.</p>

<table class="config-table">
<thead><tr><th>Provider</th><th>Key variable</th><th>Starting models (primary / fast / smart)</th><th>Billing</th></tr></thead>
<tbody>
<tr><td>OpenAI (ChatGPT subscription)</td><td>sign-in</td><td>gpt-6-sol / gpt-6-luna / gpt-6-sol</td><td>Your plan</td></tr>
<tr><td>Anthropic</td><td><code>ANTHROPIC_API_KEY</code></td><td>claude-sonnet-5-5 / claude-haiku-5-5 / claude-opus-5-5</td><td>Per token</td></tr>
<tr><td>OpenAI</td><td><code>OPENAI_API_KEY</code></td><td>gpt-5</td><td>Per token</td></tr>
<tr><td>Google Gemini</td><td><code>GEMINI_API_KEY</code> or <code>GOOGLE_API_KEY</code></td><td>gemini-4-hydrogen / gemini-3.5-flash-lite / gemini-4-argon</td><td>Per token</td></tr>
<tr><td>OpenRouter</td><td><code>OPENROUTER_API_KEY</code></td><td>moonshotai/kimi-k2.5</td><td>Per token</td></tr>
<tr><td>xAI (Grok)</td><td><code>XAI_API_KEY</code></td><td>grok-4</td><td>Per token</td></tr>
<tr><td>DeepSeek</td><td><code>DEEPSEEK_API_KEY</code></td><td>deepseek-chat / deepseek-chat / deepseek-reasoner</td><td>Per token</td></tr>
<tr><td>Moonshot AI (Kimi)</td><td><code>MOONSHOT_API_KEY</code></td><td>kimi-k2.5 / kimi-k2.5 / kimi-k2-thinking</td><td>Per token</td></tr>
<tr><td>MiniMax</td><td><code>MINIMAX_API_KEY</code></td><td>MiniMax-M2.5 / MiniMax-M2.5-highspeed / MiniMax-M2.5</td><td>Per token</td></tr>
<tr><td>Cloudflare AI Gateway, other OpenAI-compatible</td><td>&mdash;</td><td>Your choice</td><td>Per token</td></tr>
<tr><td>Ollama, llama.cpp</td><td>none</td><td>Listed from your server</td><td>Local</td></tr>
</tbody>
</table>
<p>These are only the starting picks; the app offers what your account actually lists. See <a href="/providers">Providers</a> for the config each one writes.</p>
${callout('info', 'llama.cpp and port 8080', '<code>llama-server</code> and the daemon\'s health check both default to port 8080. Start one of them elsewhere (<code>llama-server --port 8081</code>, or <code>[daemon] health_port</code>) and give llama.cpp\'s address in its form.')}

<h2>3. Your first conversation</h2>
<p>Your first conversation opens next. Its greeting says what the agent does on its own, what it asks you about first, and offers prompts to press. To talk to your agent from Telegram, Slack or Discord later, use <strong>Settings &rarr; Reach it from your phone</strong>: connect a bot by its token, and that step is done once your first message there has been answered.</p>

<h2>Setup from a terminal</h2>
<p>With no <code>config.toml</code>, <code>AIDaemon</code> runs <em>setup mode</em>: the Client Gateway on its usual loopback address (port 8788) with no agent behind it, plus a one-time link and code for a device elsewhere. The first device to redeem it becomes the owner device. <code>aidaemon setup</code> takes the model step in the terminal instead. The old interactive setup wizard is gone; <code>aidaemon setup low-latency</code> is unchanged.</p>
`
  },
  {
    slug: '/app',
    section: 'App',
    title: 'The AIDaemon App',
    description: 'The AIDaemon app for desktop, web and terminal: chat, approvals, live views of the agent\'s browser, project files, read aloud, settings and usage.',
    content: () => `
<h1>The AIDaemon App</h1>
<p class="lead">One app for the desktop, the web and the terminal: chat with your agent, answer its approvals, watch its work, and change its settings.</p>

<h2>Opening it</h2>
<table class="config-table">
<thead><tr><th>Where</th><th>How</th></tr></thead>
<tbody>
<tr><td>Desktop window</td><td>Open AIDaemon (macOS, Windows), or run <code>aidaemon app</code></td></tr>
<tr><td>Terminal</td><td><code>aidaemon tui</code></td></tr>
<tr><td>Browser on this machine</td><td><code>aidaemon web</code> opens the web build and pairs it (confirm in the terminal)</td></tr>
<tr><td>Phone or another computer</td><td>Pair it, then open the gateway's address. See <a href="/app/gateway">Client Gateway &amp; pairing</a>.</td></tr>
</tbody>
</table>
<p>The app talks to the daemon through the <a href="/app/gateway">Client Gateway</a>. Downloads and the installer set it up for you; with the gateway off, the app says how to turn it on.</p>

<h2>Chatting</h2>
<ul>
  <li><strong>Replies stream in</strong> as the model writes them (web and desktop).</li>
  <li><strong>Read aloud</strong> &mdash; under a reply, beside Copy, Read aloud speaks it with the system's own voice: the browser's speech in the web app, <code>say</code> on macOS, Windows' built-in voices, and <code>spd-say</code> or <code>espeak-ng</code> (or <code>espeak</code>) on Linux. With none of those installed on Linux there is no button. Code blocks are said as "(code)" and links as their text.</li>
  <li><strong>Dictation</strong> &mdash; in the web app through the browser's speech recognizer. Pressing Send ends dictation.</li>
  <li><strong>Which model answered</strong> &mdash; under each reply, after its time and Copy, the provider and model that actually wrote it (a failover is named when it answered).</li>
  <li><strong>Edit and Send again</strong> &mdash; every message you sent has Copy, Edit and Send again. Both add a new message at the end, so nothing above is lost.</li>
  <li><strong>Archive</strong> &mdash; archive or bring back a conversation from its menu. Archived ones are under Archived in the sidebar's filter, and search looks through them too. Writing in an archived chat brings it back.</li>
  <li><strong>Pull to refresh</strong> &mdash; pull a list down past its top, or on desktop press Cmd/Ctrl+R. Back after 30 seconds or more away, the app catches up on its own.</li>
  <li><strong>Steps survive a reconnect</strong> &mdash; reconnecting during a turn shows what each step was given and gave back.</li>
</ul>

<h2>Keyboard</h2>
<p>The app is keyboard-first: <kbd>Esc</kbd> stops the session's work, <kbd>y</kbd>/<kbd>s</kbd>/<kbd>a</kbd>/<kbd>n</kbd> answer an approval card once it has been on screen long enough to read, and one palette (<kbd>Ctrl/Cmd+K</kbd>) holds sessions and commands. The status line always says whether the daemon is connected, reconnecting, not running, or has signed the device out.</p>

<h2>Approvals</h2>
<p>Every approval card from every chat can be answered from the app; the first answer wins, and the chat's card then says who answered. The first card on each device explains what the agent asks about and what each answer does.</p>

<h2>Live views: watch and take over</h2>
<p>A conversation's header opens a live view of the agent's browser: watch it work, take control, and give it back. On a phone it works like a browser (tap to click, drag to scroll, pinch to zoom, type with the phone's keyboard); with a mouse and keyboard it works like a remote desktop window. When the agent needs you (a sign-in, a captcha) it hands you the tab with a take-over card on every channel (Open the live view, Done, Not now). You type the sign-in yourself; the agent never sees it.</p>
<p>With <code>[surfaces] desktop = true</code> (off by default, macOS with computer use), this computer's displays can be watched and driven the same way, and <code>aidaemon share-screen</code> pairs another computer once and shares its main display. See <a href="/configuration">Configuration &rarr; [surfaces]</a>.</p>

<h2>Projects and files</h2>
<p>A coding conversation's details pane has a <strong>Files</strong> tab, and a project's page opens its folder: read-only, git's changes marked, ignored files on request, secrets shown by name only. Pictures and PDFs preview. Projects can be pinned, sorted and deleted from their menu (deleting a project leaves its folder on disk alone).</p>
<p>A conversation in a project keeps what it learns in that project's own notes under <code>~/.aidaemon/projects/&lt;project-id&gt;/memory/</code>, apart from your personal memory. It also gets the repository's own skills (<code>.agents/skills</code>, <code>.claude/skills</code>) and can start the MCP servers its <code>.mcp.json</code> declares, each only after you approve its exact command. Your own <code>~/.aidaemon/AGENTS.md</code> is loaded as the broadest instruction file of every project.</p>

<h2>Coding agents</h2>
<p>Each coding agent runs in a permission mode you pick per agent in Settings, and Settings shows whether each one can work now. See <a href="/tools/cli-agents">CLI Agent Delegation</a>.</p>

<h2>Settings</h2>
<p>The Settings page (desktop, web and terminal) shows every setting <code>config.toml</code> holds or documents, by table, with its value or default, whether changing it asks first, and whether it takes effect on a reload or a restart. Edit settings in place, store secrets in the keychain, switch providers and add failovers, manage MCP servers and bots, and Reload or Restart. Security-sensitive changes (secrets, <code>base_url</code>, allowed users, the gateway, MCP and CLI agent commands) wait for your approval like any card.</p>
<p>Settings also shows <strong>what each account has used and has left</strong>: a ChatGPT plan's 5-hour and weekly limits and an OpenRouter key's balance, each with a meter and its reset.</p>

<h2>Automations</h2>
<p>Schedules may name an IANA time zone ("every weekday at 8am Europe/Madrid") and follow its daylight saving. Automation cards show the schedule's zone and the runs in your time; a run missed while the daemon was off is listed as Missed. See <a href="/scheduler">Scheduled Tasks</a>.</p>
`
  },
  {
    slug: '/app/gateway',
    section: 'App',
    title: 'Client Gateway & Pairing',
    description: 'The Client Gateway serves the AIDaemon app and paired devices: config keys, commands, pairing, tunnels and the client protocol.',
    content: () => `
<h1>Client Gateway &amp; Pairing</h1>
<p class="lead">The Client Gateway serves the AIDaemon Client Protocol to your own apps and paired devices. It listens on loopback only; other devices reach it through a tunnel.</p>

<h2>Turning it on</h2>
<p>The macOS and Windows downloads and first-run setup turn it on for you. By hand:</p>
${codeBlock(`[client_gateway]
enabled = true
# bind = "127.0.0.1"
# port = 8788
# public_url = "https://aidaemon.example.ts.net"   # your HTTPS tunnel, for pairing links`, 'toml', 'config.toml')}
<p>Or ask the agent to "enable the client gateway": <code>manage_config</code> does it in one approved step, then restarts. Any change to a <code>client_gateway</code> key needs the owner's approval.</p>

${configTable([
  ['enabled', 'bool', 'false', 'Serve the Client Gateway'],
  ['bind', 'string', '"127.0.0.1"', 'Listen address. Must be loopback: a non-loopback bind is refused.'],
  ['port', 'integer', '8788', 'Listen port'],
  ['token_file', 'string', 'null', 'Where the local token\'s hash is kept. Empty: the daemon\'s default path.'],
  ['retention_days', 'integer', '7', 'Resume window. A client further behind gets a snapshot.'],
  ['max_events', 'integer', '100000', 'Most events the resume log keeps'],
  ['watch_risk_ceiling', 'string', '"medium"', 'Highest risk a paired watch may approve; above it a watch may only deny'],
  ['public_url', 'string', 'null', 'The HTTPS address paired devices use, put in pairing links'],
  ['app_dir', 'string', 'null', 'Directory of the app\'s web build, served at <code>/client/v1/next/</code>. The installer puts it in <code>~/.aidaemon/app-web</code>.'],
])}

<h2>Endpoints</h2>
<ul>
  <li><code>/client/v1/ws</code> &mdash; WebSocket</li>
  <li><code>POST /client/v1/commands</code> and long-poll <code>GET /client/v1/events</code></li>
  <li><code>/client/v1/next/</code> &mdash; the web app (<code>/client/v1/app</code> redirects there)</li>
</ul>
<p>The current client protocol is <strong>1.39</strong>. Clients resume from their last event without loss or duplicates.</p>

<h2>The local token</h2>
<p>Apps on the same machine sign in with the local token saved at <code>~/.aidaemon/client-token</code> (owner-only), minted on first use. <code>aidaemon client-token</code> saves it there; add <code>--print</code> to print it for scripts.</p>

<h2>Pairing phones and browsers</h2>
<ol>
  <li>Send <code>/pair_device</code> in a chat, or run <code>aidaemon pair</code> in a terminal (it shows a QR code). This makes a single-use code valid for ten minutes.</li>
  <li>Open the link on the device. It redeems the code with its own key.</li>
  <li>Confirm in that chat or terminal.</li>
</ol>
<p>Each paired device gets short-lived tokens carrying its scopes (observe, chat, approve). <code>/devices</code> lists devices and <code>/revoke_device &lt;id&gt;</code> ends a device's tokens and open connections at once.</p>

<h2>Reaching it from other devices</h2>
<p>The gateway only listens on loopback. Let the daemon run the tunnel itself:</p>
${codeBlock(`[exposure.client_gateway]
adapter = "tailscale"        # private to your tailnet; mode = "funnel" makes it public`, 'toml', 'config.toml')}
<p>Adapters: <code>tailscale</code> (<code>serve</code> or <code>funnel</code>), <code>cloudflare</code> (<code>named</code>, or <code>quick</code> for a throwaway address), <code>manual</code> (the <code>url</code> of a reverse proxy you run) and <code>command</code>. <code>cloudflared</code> or <code>tailscale</code> must be on <code>PATH</code>. Changes apply after a restart; <code>/exposure</code> shows each tunnel's state. An SSH tunnel to port 8788 also works.</p>
`
  },
  {
    slug: '/configuration',
    section: 'Configuration',
    title: 'Full config.toml Reference',
    description: 'Complete config.toml reference for aidaemon. All configuration sections, keys, types, and defaults.',
    content: () => `
<h1>Configuration</h1>
<p class="lead">Complete reference for <code>config.toml</code>. All sections and their defaults.</p>

<h2>[provider]</h2>
${configTable([
  ['kind', 'string', '"openai_compatible"', 'Provider type: <code>openai_compatible</code>, <code>openai_chatgpt</code>, <code>anthropic</code>, <code>google_genai</code> or <code>xai_native</code>. See <a href="/providers">Providers</a>.'],
  ['api_key', 'string', '—', 'API key for the provider (required)'],
  ['gateway_token', 'string', 'null', 'Optional Cloudflare AI Gateway token used as <code>cf-aig-authorization</code>'],
  ['base_url', 'string', '—', 'API base URL (required for <code>openai_compatible</code>; optional for <code>anthropic</code>, with or without <code>/v1</code>)'],
  ['reasoning_effort', 'string', 'null', 'Extended thinking, e.g. <code>low</code>, <code>medium</code>, <code>high</code>, <code>off</code>'],
  ['streaming', 'bool', 'false', 'Opt-in SSE streaming transport for OpenAI-compatible providers'],
  ['auto_upgrade', 'bool', 'true', 'Move the model in use to the newest version of its line once the provider lists it (checked daily, proven with one tool call first). Pay-per-token providers are only told. See <a href="/providers">Providers</a>.'],
])}

<h2>[[provider.fallbacks]]</h2>
<p>Ordered cross-provider fallbacks, each with the same keys as <code>[provider]</code> and its own <code>[provider.fallbacks.models]</code>. A provider whose quota, credit or key fails is skipped until its stated reset.</p>

<h2>[provider.models]</h2>
${configTable([
  ['primary', 'string', '(provider default)', 'Default model for general queries'],
  ['fast', 'string', '(provider default)', 'Low-latency model for simple turns (prefer non-reasoning instruct models)'],
  ['smart', 'string', '(provider default)', 'Model for complex execution turns (can be the same as primary)'],
  ['default', 'string', '—', 'Alternative to <code>primary</code>: the model for normal requests'],
  ['fallback', 'array', '[]', 'Ordered models tried when calls fail'],
])}

${callout('info', 'Model Defaults', 'Provider-aware defaults are filled automatically by first-run setup (from the provider catalog) and may change across releases as provider catalogs evolve. For production, pin explicit model IDs in <code>[provider.models]</code>. If all three tiers resolve to the same model, auto-routing is disabled. See <a href="/router">Model Routing</a>.')}
${callout('warn', 'Fast Tier Guidance', 'Set <code>provider.models.fast</code> to a cheap non-reasoning instruction model for routing. Avoid reasoning/thinking models in <code>fast</code> because they usually increase token burn and latency for no routing benefit.')}

<h2>[telegram]</h2>
${configTable([
  ['bot_token', 'string', '—', 'Telegram bot token from @BotFather (required)'],
  ['allowed_user_ids', 'array', '[]', 'Numeric Telegram user IDs allowed to chat. Empty = no restriction.'],
])}

<h2>[slack]</h2>
<p>Requires the <code>slack</code> feature flag at compile time. See <a href="/slack">Slack</a> for full setup guide.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Enable the Slack channel'],
  ['app_token', 'string', '—', 'Slack App-Level Token for Socket Mode (<code>xapp-...</code>)'],
  ['bot_token', 'string', '—', 'Slack Bot Token for Web API (<code>xoxb-...</code>)'],
  ['allowed_user_ids', 'array', '[]', 'Slack user IDs allowed to interact. Empty = no restriction.'],
  ['use_threads', 'bool', 'true', 'Reply in threads by default'],
])}

<h2>[discord]</h2>
<p>Requires the <code>discord</code> feature flag at compile time. See <a href="/discord">Discord</a> for full setup guide.</p>
${configTable([
  ['bot_token', 'string', '&mdash;', 'Discord bot token from the Developer Portal'],
  ['allowed_user_ids', 'array', '[]', 'Discord user IDs allowed to interact. Empty = no restriction.'],
  ['guild_id', 'integer', 'null', 'Optional guild/server ID to restrict the bot to a single server'],
])}

<h2>[state]</h2>
${configTable([
  ['db_path', 'string', '"aidaemon.db"', 'Path to SQLite database file'],
  ['working_memory_cap', 'integer', '50', 'Max messages per session kept in memory'],
  ['consolidation_interval_hours', 'integer', '6', 'Hours between memory consolidation runs'],
  ['max_facts', 'integer', '100', 'Maximum number of facts injected into the system prompt'],
  ['daily_token_budget', 'integer', 'null', 'Ignored since 0.20.0 (logged once at startup). Cap spend with a provider spend limit; per-goal budgets and <code>subagents.task_token_budget</code> still apply.'],
  ['encryption_key', 'string', 'null', 'SQLCipher encryption key (requires <code>encryption</code> feature). AES-256 at rest.'],
  ['upgrade_backups', 'integer', '2', 'Snapshots kept in <code>backups/</code> next to the database, one written when a new aidaemon version first starts on it. <code>0</code> turns it off.'],
])}

<h2>[memory]</h2>
${configTable([
  ['backend', 'string', '"daemon"', '<code>daemon</code> (built-in memory) or <code>sdk</code> (the aidaemon-memory crate; build with <code>--features sdk-memory</code>)'],
  ['path', 'string', '"aidaemon-memory.db"', 'SQLite file for the <code>sdk</code> backend'],
  ['embedding_model', 'string', '"AllMiniLML6V2Q"', 'Local fastembed model, e.g. <code>AllMiniLML6V2</code>, <code>BGESmallENV15</code>, <code>BGEBaseENV15</code>, <code>ParaphraseMLMiniLML12V2</code>. Changing it re-embeds stored memory once, in the background.'],
  ['project_memory', 'bool', 'true', 'A conversation placed in a project keeps what it learns in that project\'s own notes'],
  ['projects_dir', 'string', '"~/.aidaemon/projects"', 'Where project notes live (one directory per project id)'],
])}

<h2>[terminal]</h2>
${configTable([
  ['allowed_prefixes', 'array', '(see below)', 'Command prefixes auto-approved without user confirmation'],
  ['initial_timeout_secs', 'integer', '30', 'Timeout in seconds for initial command execution'],
  ['max_output_chars', 'integer', '4000', 'Truncate command output beyond this length'],
  ['permission_mode', 'string', '"default"', 'Risk permission mode: <code>default</code>, <code>cautious</code>, or <code>yolo</code>. See <a href="/tools/command-risk">Command Risk</a>.'],
])}

<p>Default allowed prefixes:</p>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

${callout('warn', 'Shell Operators', 'Commands containing <code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code> <code>$()</code> or backticks <strong>always</strong> require approval, even if the prefix is whitelisted.')}

<h2>[daemon]</h2>
${configTable([
  ['health_port', 'integer', '8080', 'Port for the health check HTTP endpoint'],
  ['health_bind', 'string', '"127.0.0.1"', 'Bind address. Use "0.0.0.0" for external access.'],
])}

<h2>[triggers.email]</h2>
${configTable([
  ['host', 'string', '—', 'IMAP server hostname (e.g., imap.gmail.com)'],
  ['port', 'integer', '—', 'IMAP port (typically 993 for TLS)'],
  ['username', 'string', '—', 'Email account username'],
  ['password', 'string', '—', 'Email account password or app-specific password'],
  ['folder', 'string', '"INBOX"', 'IMAP folder to monitor'],
])}

<h2>[mcp.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Executable path or name for the MCP server'],
  ['args', 'array', '[]', 'Command-line arguments'],
])}

<h2>[browser]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Enable browser automation tool'],
  ['headless', 'bool', 'true', 'Run Chrome without a visible window'],
  ['screenshot_width', 'integer', '1280', 'Browser viewport width in pixels'],
  ['screenshot_height', 'integer', '720', 'Browser viewport height in pixels'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Chrome profile directory for persistent sessions'],
  ['profile', 'string', 'Default', 'Chrome profile name within user_data_dir'],
  ['remote_debugging_port', 'integer', 'null', 'Connect to existing Chrome on this port (advanced)'],
])}

<h2>[skills]</h2>
${configTable([
  ['dir', 'string', '"skills"', 'Directory containing skill markdown files'],
  ['enabled', 'bool', 'true', 'Enable the skills system'],
  ['registries', 'array', '[]', 'URLs of skill registry JSON manifests for browsing/installing skills'],
])}

<h2>[subagents]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Allow the agent to spawn sub-agents'],
  ['max_depth', 'integer', '3', 'Maximum nesting level for sub-agent recursion'],
  ['max_iterations', 'integer', '10', 'Max agentic loop steps per sub-agent invocation'],
  ['max_response_chars', 'integer', '8000', 'Truncate sub-agent responses beyond this length'],
  ['timeout_secs', 'integer', '300', 'Sub-agent execution timeout in seconds'],
])}

<h2>[client_gateway]</h2>
<p>Serves the <a href="/app">AIDaemon app</a> and paired devices. Full reference: <a href="/app/gateway">Client Gateway &amp; Pairing</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Serve the Client Gateway'],
  ['bind', 'string', '"127.0.0.1"', 'Loopback only'],
  ['port', 'integer', '8788', 'Listen port'],
  ['public_url', 'string', 'null', 'HTTPS tunnel address for pairing links'],
])}

<h2>[surfaces]</h2>
<p>Live views: watch and take over the agent's browser from a paired app.</p>
${configTable([
  ['enabled', 'bool', 'true', 'Offer live views'],
  ['allow_control', 'bool', 'true', 'Allow taking control, not only watching'],
  ['control_anytime', 'bool', 'true', 'Take control without the agent asking; <code>false</code>: only during a handoff'],
  ['desktop', 'bool', 'false', 'macOS with <code>[computer_use]</code>: also watch and drive this computer\'s displays'],
  ['max_live_sessions', 'integer', '8', 'Live views open at once'],
  ['max_fps', 'integer', '20', 'Most frames per second a view gets'],
  ['max_width', 'integer', '1280', 'Widest frame a view gets'],
  ['disconnect_grace_secs', 'integer', '30', 'Control returns to the agent this long after your device stops watching'],
  ['idle_release_secs', 'integer', '900', 'Control returns to the agent after this long with no input'],
])}

<h2>[cli_agents]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Enable CLI agent delegation tool'],
  ['timeout_secs', 'integer', '600', 'Global timeout for CLI agent execution'],
  ['max_output_chars', 'integer', '16000', 'Global max output length from CLI agents'],
])}

<h2>[cli_agents.tools.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Command to execute'],
  ['args', 'array', '[]', 'Default arguments passed to the command'],
  ['description', 'string', '—', 'Tool description shown to the LLM'],
  ['timeout_secs', 'integer', 'null', 'Override global timeout for this tool'],
  ['max_output_chars', 'integer', 'null', 'Override global max output for this tool'],
  ['protocol', 'string', 'null', '<code>"acp"</code> hosts an agent that speaks the Agent Client Protocol; each action it takes is asked first'],
])}

<h2>[search]</h2>
${configTable([
  ['backend', 'string', '"duckduckgo"', 'Search backend: <code>duckduckgo</code> (no key needed) or <code>brave</code>'],
  ['api_key', 'string', '""', 'API key for Brave search (supports <code>"keychain"</code>)'],
])}

<h2>[scheduler]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Enable the scheduled tasks system'],
  ['tick_interval_secs', 'integer', '30', 'How often the scheduler checks for due tasks'],
])}

<h2>[[scheduler.tasks]]</h2>
<p>Pre-defined scheduled tasks loaded from config on startup:</p>
${configTable([
  ['name', 'string', '—', 'Human-readable task label'],
  ['schedule', 'string', '—', 'Natural language or cron expression (see <a href="/scheduler">Scheduler</a>)'],
  ['prompt', 'string', '—', 'What the agent should do when the task fires'],
  ['oneshot', 'bool', 'false', 'Fire once then auto-delete'],
  ['trusted', 'bool', 'false', 'Run with full autonomy (no terminal approval needed)'],
])}

<h2>[files]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Enable file transfer tools (send/receive)'],
  ['inbox_dir', 'string', '"~/.aidaemon/files/inbox"', 'Directory for received files from Telegram'],
  ['outbox_dirs', 'array', '["~"]', 'Directories the agent is allowed to send files from'],
  ['max_file_size_mb', 'integer', '10', 'Maximum file size for transfers in MB'],
  ['retention_hours', 'integer', '24', 'Hours to retain received files before cleanup'],
])}

<h2>Secrets Management</h2>
<p>Sensitive config values support two resolution methods beyond plain text, plus an optional env-only storage mode:</p>

<h3>OS Keychain</h3>
<p>Set any secret field to <code>"keychain"</code> to resolve it from the OS keychain (macOS Keychain, Linux secret-service):</p>
${codeBlock(`[provider]
api_key = "keychain"    # Resolved from keychain entry "api_key"

[telegram]
bot_token = "keychain"  # Resolved from keychain entry "bot_token"`, 'toml')}

<p>Store values with the <code>keychain</code> CLI command before first run:</p>
${codeBlock(`# Store a secret (prompts interactively)
aidaemon keychain set api_key
aidaemon keychain set bot_token

# Verify a stored secret (shows masked value)
aidaemon keychain get api_key

# Remove a secret
aidaemon keychain delete api_key`, 'bash')}

${callout('tip', 'Security', 'The <code>set</code> command prompts for the value interactively with confirmation, keeping secrets out of your shell history.')}

<h3>Environment Variables</h3>
<p>Use <code>\${VAR_NAME}</code> syntax anywhere in config values:</p>
${codeBlock(`[provider]
api_key = "\${GOOGLE_API_KEY}"

[telegram]
bot_token = "\${TELEGRAM_BOT_TOKEN}"`, 'toml')}

<h3>Env-only Mode (No Keychain)</h3>
<p>If you prefer not to use the OS keychain, set these runtime environment variables:</p>
${codeBlock(`# Disable OS keychain storage and use env file-backed secrets
export AIDAEMON_NO_KEYCHAIN=1

# Optional: choose a specific env file path (default: ./.env)
export AIDAEMON_ENV_FILE=/absolute/path/to/.env`, 'bash')}

<p>In this mode, aidaemon reads secrets from the selected env file (or process environment when no env file exists) and persists secret updates back to that env file &mdash; including OAuth access/refresh token rotation.</p>

${callout('warning', 'Env-only Security', 'Keep the env file private (<code>chmod 600</code>) and out of version control.')}

${callout('info', 'Supported Keychain Fields', 'Fields supporting <code>"keychain"</code>: <code>provider.api_key</code>, <code>provider.gateway_token</code>, <code>telegram.bot_token</code>, <code>slack.app_token</code>, <code>slack.bot_token</code>, <code>discord.bot_token</code>, <code>triggers.email.password</code>, <code>state.encryption_key</code>, <code>search.api_key</code>, and <code>http_auth.*</code> profile fields.')}

<h2>[health]</h2>
<p>Health monitoring system. See <a href="/health-monitoring">Health Monitoring</a>.</p>
${configTable([
  ['enabled', 'bool', 'true', 'Enable the health monitoring system'],
  ['tick_interval_secs', 'integer', '30', 'How often to check for due probes'],
  ['result_retention_days', 'integer', '7', 'Days to retain health check results'],
])}

<h2>[[health.probes]]</h2>
${configTable([
  ['name', 'string', '&mdash;', 'Probe name'],
  ['probe_type', 'string', '&mdash;', 'Type: http, command, file, or port'],
  ['target', 'string', '&mdash;', 'Target URL, command, file path, or host:port'],
  ['schedule', 'string', '&mdash;', 'Cron expression or interval'],
  ['consecutive_failures_alert', 'integer', '3', 'Alert after N consecutive failures'],
  ['alert_session_ids', 'array', '[]', 'Session IDs to notify on alert'],
])}

<h2>[updates]</h2>
<p>Self-update system. See <a href="/updates">Self-Updater</a>.</p>
${configTable([
  ['mode', 'string', '"check_only"', 'Update mode: enable, check_only, or disable'],
  ['check_interval_hours', 'integer', '24', 'Hours between update checks'],
  ['check_at_utc_hour', 'integer', 'null', 'Specific UTC hour (0-23) for daily check'],
  ['confirmation_timeout_mins', 'integer', '60', 'Minutes to wait for user approval'],
])}

<h2>[people]</h2>
<p>People Intelligence — a personal contact book managed by your assistant. See <a href="/tools/people">People Intelligence</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Initial state for people intelligence (can be toggled at runtime via chat)'],
  ['auto_extract', 'bool', 'true', 'Automatically learn facts about people from conversations'],
  ['auto_extract_categories', 'string[]', '["birthday", "preference", "interest", "work", "family", "important_date"]', 'Fact categories that can be auto-extracted'],
  ['restricted_categories', 'string[]', '["health", "finance", "political", "religious"]', 'Categories that are never auto-extracted'],
  ['fact_retention_days', 'integer', '180', 'Days before unconfirmed auto-extracted facts are pruned'],
  ['reconnect_reminder_days', 'integer', '30', 'Days of inactivity before suggesting a reconnect'],
])}

<h2>Example Config</h2>
${codeBlock(`[provider]
kind = "google_genai"
api_key = "AIza..."

[provider.models]
primary = "gemini-3-flash-preview"
fast = "gemini-2.5-flash-lite"
smart = "gemini-3-pro-preview"

[telegram]
bot_token = "123456:ABC-DEF..."
allowed_user_ids = [123456789]

# Slack (requires --features slack)
# [slack]
# enabled = true
# app_token = "xapp-..."
# bot_token = "xoxb-..."
# allowed_user_ids = ["U123456789"]
# use_threads = true

[state]
db_path = "aidaemon.db"
working_memory_cap = 50
max_facts = 100

[terminal]
allowed_prefixes = ["ls", "cat", "head", "tail", "echo", "date", "whoami"]

[daemon]
health_port = 8080

[mcp.filesystem]
command = "npx"
args = ["-y", "@anthropic/mcp-filesystem"]

[browser]
enabled = true
headless = true

[skills]
dir = "skills"
enabled = true

[search]
backend = "duckduckgo"

[scheduler]
enabled = true

[[scheduler.tasks]]
name = "Morning check-in"
schedule = "weekdays at 9am"
prompt = "Check system health and summarize any overnight alerts"
trusted = true

[files]
enabled = true
inbox_dir = "~/.aidaemon/files/inbox"
outbox_dirs = ["~"]

# Discord (requires --features discord)
# [discord]
# bot_token = "MTIz..."
# allowed_user_ids = [123456789012345678]

# Health monitoring
[health]
enabled = true

[[health.probes]]
name = "API Server"
probe_type = "http"
target = "https://api.example.com/health"
schedule = "every 5m"

# People intelligence (opt-in, can also enable via chat)
# [people]
# enabled = true

# Self-updater
[updates]
mode = "check_only"`, 'toml', 'config.toml')}
`
  },
  {
    slug: '/providers',
    section: 'Configuration',
    title: 'Provider Setup',
    description: 'Configure LLM providers for aidaemon: ChatGPT subscription, Anthropic, Google Gemini, OpenAI-compatible APIs, xAI, local models, fallbacks and model upgrades.',
    content: () => `
<h1>Provider Setup</h1>
<p class="lead">The app's first-run setup and Settings page write the <code>[provider]</code> section for you. This page shows what they write, for editing by hand.</p>

<h2>Provider Kinds</h2>
<table class="config-table">
<thead><tr><th>kind</th><th>Used for</th></tr></thead>
<tbody>
<tr><td><code>openai_chatgpt</code></td><td>A ChatGPT plan through sign-in (no API key)</td></tr>
<tr><td><code>anthropic</code></td><td>Anthropic's native Messages API</td></tr>
<tr><td><code>google_genai</code></td><td>Google Gemini's native API</td></tr>
<tr><td><code>xai_native</code></td><td>xAI (Grok)</td></tr>
<tr><td><code>openai_compatible</code> (default)</td><td>OpenAI, OpenRouter, DeepSeek, Moonshot, MiniMax, Cloudflare AI Gateway, Ollama, llama.cpp and any OpenAI-compatible API</td></tr>
</tbody>
</table>
<p><code>api_key = "keychain"</code> reads the key from the OS keychain; <code>api_key = "\${ENV_VAR}"</code> reads it from the environment. See <a href="/configuration">Secrets Management</a>.</p>

<h2>ChatGPT subscription</h2>
<p>Runs on a ChatGPT plan instead of metered API billing. Sign in from the app, or in a terminal:</p>
${codeBlock(`aidaemon auth login openai          # add --paste for headless/remote installs
aidaemon auth status
aidaemon auth logout openai`, 'bash')}
${codeBlock(`[provider]
kind = "openai_chatgpt"
api_key = ""                        # unused; credentials come from the sign-in

[provider.models]
primary = "gpt-6-sol"
fast = "gpt-6-luna"
smart = "gpt-6-sol"`, 'toml')}
<p>When the plan's usage limit is reached, the call moves straight to your fallback providers until the stated reset. Settings shows the plan's 5-hour and weekly limits.</p>

<h2>Anthropic</h2>
${codeBlock(`[provider]
kind = "anthropic"
api_key = "keychain"
# base_url = "https://api.anthropic.com/v1"   # optional; with or without /v1

[provider.models]
primary = "claude-sonnet-5-5"
fast = "claude-haiku-5-5"
smart = "claude-opus-5-5"`, 'toml')}
${callout('info', 'Base URL', 'The API root may be given with or without a trailing <code>/v1</code> (the provider catalog uses <code>https://api.anthropic.com/v1</code>); requests always go to <code>/v1/messages</code>. Before 0.21.0 a base URL ending in <code>/v1</code> was sent to <code>/v1/v1/messages</code> and every call failed with a 404.')}
<h3>Prompt cache</h3>
<p>aidaemon uses Anthropic's prompt cache. The fixed prefix (tool definitions and the system prompt) is cached for one hour, so a reply after a pause, or a new conversation within the hour, reads it from the cache. The conversation tail keeps the five-minute cache. Deferred tools are declared up front, so loading one with <code>load_tools</code> no longer rewrites the cache. <code>reasoning_effort</code> (<code>low</code>, <code>medium</code>, <code>high</code>, <code>off</code>) maps to extended thinking.</p>

<h2>Google Gemini</h2>
<p>Native Google Generative AI API, with a key from <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Google AI Studio</a>.</p>
${codeBlock(`[provider]
kind = "google_genai"
api_key = "keychain"

[provider.models]
primary = "gemini-4-hydrogen"
fast = "gemini-3.5-flash-lite"
smart = "gemini-4-argon"`, 'toml')}
<p>When a request offers no tools, Gemini can ground its answer with Google Search. Tool results are sent back as user-role parts, as current Gemini models require (fixed in 0.21.0: before, a turn with a tool call kept falling back and never replied). A daily quota that runs out moves the call to your fallback providers at once.</p>

<h2>OpenAI</h2>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "keychain"
base_url = "https://api.openai.com/v1"

[provider.models]
primary = "gpt-5"
fast = "gpt-5"
smart = "gpt-5"`, 'toml')}

<h2>xAI (Grok)</h2>
${codeBlock(`[provider]
kind = "xai_native"
api_key = "keychain"
base_url = "https://api.x.ai/v1"

[provider.models]
primary = "grok-4"
fast = "grok-4"
smart = "grok-4"`, 'toml')}

<h2>OpenRouter</h2>
<p>Models from many providers through one key and the OpenAI-compatible format. Settings shows the key's balance.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "keychain"
base_url = "https://openrouter.ai/api/v1"

[provider.models]
primary = "moonshotai/kimi-k2.5"
fast = "moonshotai/kimi-k2.5"
smart = "moonshotai/kimi-k2.5"`, 'toml')}

<h2>DeepSeek</h2>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "keychain"
base_url = "https://api.deepseek.com"

[provider.models]
primary = "deepseek-chat"
fast = "deepseek-chat"
smart = "deepseek-reasoner"`, 'toml')}

<h2>Moonshot AI (Kimi)</h2>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "keychain"
base_url = "https://api.moonshot.ai/v1"

[provider.models]
primary = "kimi-k2.5"
fast = "kimi-k2.5"
smart = "kimi-k2-thinking"`, 'toml')}

<h2>MiniMax</h2>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "keychain"
base_url = "https://api.minimax.io/v1"

[provider.models]
primary = "MiniMax-M2.5"
fast = "MiniMax-M2.5-highspeed"
smart = "MiniMax-M2.5"`, 'toml')}

<h2>Cloudflare AI Gateway</h2>
<p>Sits in front of upstream providers and exposes an OpenAI-compatible endpoint.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "keychain"          # upstream provider key
gateway_token = "keychain"    # optional: Authenticated Gateway mode
base_url = "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/compat"

[provider.models]
primary = "your-model-id"`, 'toml')}
${callout('info', 'Cloudflare Auth Modes', 'You can run with just <code>api_key</code> (basic mode), or add <code>gateway_token</code> to send <code>cf-aig-authorization</code> for Authenticated Gateway mode.')}

<h2>Ollama and llama.cpp (local)</h2>
<p>Self-hosted models need no key. First-run setup lists the models your server offers.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = ""
base_url = "http://localhost:11434/v1"   # Ollama
# base_url = "http://localhost:8080/v1"  # llama.cpp's llama-server

[provider.models]
primary = "your-model-id"`, 'toml')}
${callout('warn', 'Local addresses', 'HTTP is only allowed to localhost addresses. <code>llama-server</code> and the daemon\'s health check both default to port 8080: move one of them (<code>llama-server --port 8081</code>, or <code>[daemon] health_port</code>).')}

<h2>Fallback providers</h2>
<p>Entries under <code>[[provider.fallbacks]]</code> are tried in order after the main provider's own models. A provider whose account cannot answer (a plan's usage limit, a daily quota, no credit, a rejected key) is skipped at once and stays skipped until its stated reset. Switching the main provider in Settings keeps the old one as a failover.</p>
${codeBlock(`[[provider.fallbacks]]
kind = "anthropic"
api_key = "keychain"
[provider.fallbacks.models]
default = "claude-sonnet-5-5"`, 'toml')}
<p><code>[provider.models]</code> takes either <code>primary</code> / <code>fast</code> / <code>smart</code> or <code>default</code> plus an ordered <code>fallback = [...]</code> list of models tried when calls fail.</p>

<h2>Model upgrades</h2>
<p>Once a day the daemon checks each provider's model list and moves a model to the newest version of its own line (for example <code>gpt-6-sol</code> to <code>gpt-6.2-sol</code>; never another size, a snapshot or a preview). It first proves the new model with one tool call, keeps the old one as the first fallback, and tells you. With a pay-per-token provider you are only told. Turn it off with:</p>
${codeBlock(`[provider]
auto_upgrade = false`, 'toml')}
<p>A <code>/model</code> pin postpones the upgrade.</p>
`
  },
  {
    slug: '/telegram',
    section: 'Telegram',
    title: 'Bot Setup',
    description: 'Set up aidaemon as a Telegram bot. Create a bot via BotFather, configure tokens, and enable messaging.',
    content: () => `
<h1>Telegram Bot Setup</h1>
<p class="lead">Telegram is aidaemon&rsquo;s primary channel, built on the teloxide framework. See also <a href="/slack">Slack</a> for workspace integration.</p>

<h2>Create a Bot</h2>
<ol>
  <li>Message <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a> on Telegram</li>
  <li>Send <code>/newbot</code> and follow the prompts</li>
  <li>Copy the bot token (format: <code>123456789:ABCdefGHIjklMNOpqrSTUvwxYZ</code>)</li>
</ol>

<h2>Get Your User ID</h2>
<p>Your numeric Telegram user ID is needed for the <code>allowed_user_ids</code> list. You can find it by messaging <a href="https://t.me/userinfobot" target="_blank" rel="noopener">@userinfobot</a>.</p>

<h2>Configuration</h2>
${codeBlock(`[telegram]
bot_token = "123456789:ABCdefGHIjklMNOpqrSTUvwxYZ"
allowed_user_ids = [123456789]`, 'toml', 'config.toml')}

${callout('warn', 'Access Control', 'If <code>allowed_user_ids</code> is empty, <strong>anyone</strong> who finds your bot can chat with it. Always set this in production.')}

<h2>Features</h2>
<ul>
  <li><strong>Typing indicator</strong> — sent every 4 seconds during agent processing</li>
  <li><strong>Markdown rendering</strong> — agent responses are converted to Telegram HTML</li>
  <li><strong>Long message splitting</strong> — responses over 4096 chars are split at paragraph/line boundaries</li>
  <li><strong>Screenshot sharing</strong> — browser screenshots sent as photos with captions</li>
  <li><strong>File transfer</strong> — send and receive documents, photos, audio, video via Telegram</li>
  <li><strong>Live task status</strong> — <code>/tasks</code> shows running agent tasks with elapsed time</li>
  <li><strong>Inline approval buttons</strong> — Allow Once / Allow Always / Deny buttons for command approval</li>
  <li><strong>Multi-bot support</strong> — configure multiple Telegram bots via <code>[[telegram.bots]]</code></li>
  <li><strong>Enhanced file handling</strong> — MIME type detection, size limits, and path security validation</li>
</ul>

<h2>Retry Behavior</h2>
<p>The Telegram dispatcher uses exponential backoff on crashes:</p>
<ul>
  <li>Initial backoff: 5s</li>
  <li>Doubles each crash: 5s → 10s → 20s → 40s → 60s (max)</li>
  <li>Resets to 5s if the bot runs stable for 60+ seconds</li>
</ul>
`
  },
  {
    slug: '/telegram/commands',
    section: 'Telegram',
    title: 'Commands',
    description: 'Built-in Telegram slash commands for aidaemon: /model, /clear, /cost, /status, /help, and more.',
    content: () => `
<h1>Telegram Commands</h1>
<p class="lead">Built-in slash commands for controlling the agent from Telegram.</p>

<table class="config-table">
<thead><tr><th>Command</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Show the current active model</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Switch to a specific model (disables auto-routing)</td></tr>
<tr><td><code>/models</code></td><td>List all available models from the provider (active model marked)</td></tr>
<tr><td><code>/auto</code></td><td>Re-enable automatic model routing based on query complexity</td></tr>
<tr><td><code>/reload</code></td><td>Reload config.toml (with auto-restore from backup if broken)</td></tr>
<tr><td><code>/restart</code></td><td>Full restart — exec new process (picks up new binary, config, MCP servers)</td></tr>
<tr><td><code>/cost</code></td><td>Show token usage statistics (last 24h, 7d, top models)</td></tr>
<tr><td><code>/tasks</code></td><td>List running and recent agent tasks for your session</td></tr>
<tr><td><code>/cancel &lt;id&gt;</code></td><td>Cancel a running task by ID</td></tr>
<tr><td><code>/help</code></td><td>Show list of available commands</td></tr>
<tr><td><code>/start</code></td><td>Same as /help</td></tr>
</tbody>
</table>

<h2>Model Switching</h2>
${codeBlock(`/model claude-3.5-sonnet
# Switches to claude-3.5-sonnet and disables auto-routing

/auto
# Re-enables automatic Fast/Primary/Smart routing`, 'text')}

${callout('info', 'Model Override', 'When you manually set a model with <code>/model</code>, auto-routing is disabled until you send <code>/auto</code>.')}

<h2>Config Reload</h2>
<p>The <code>/reload</code> command reloads <code>config.toml</code> at runtime. If the config is invalid, aidaemon automatically restores from backup:</p>
<ol>
  <li><code>.toml.lastgood</code> — last config that successfully completed an LLM call</li>
  <li><code>.toml.bak</code> → <code>.toml.bak.1</code> → <code>.toml.bak.2</code> — 3-deep rotation</li>
</ol>
`
  },
  {
    slug: '/telegram/approval',
    section: 'Telegram',
    title: 'Approval Flow',
    description: 'Interactive inline keyboard approval for restricted terminal commands in Telegram.',
    content: () => `
<h1>Command Approval Flow</h1>
<p class="lead">Interactive inline keyboard approval for restricted terminal commands.</p>

<h2>How It Works</h2>
<ol>
  <li>The agent requests a terminal command that isn't in the allowed prefixes list (or contains shell operators)</li>
  <li>An approval request is sent to the first user in <code>allowed_user_ids</code></li>
  <li>The user sees an inline keyboard with three buttons:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Command requires approval:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow Once</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Allow Always</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Approval Options</h2>
<table class="config-table">
<thead><tr><th>Option</th><th>Behavior</th></tr></thead>
<tbody>
<tr><td><strong>Allow Once</strong></td><td>Execute the command this time only</td></tr>
<tr><td><strong>Allow Always</strong></td><td>Execute and add the command prefix to <code>terminal.allowed_prefixes</code> in config.toml</td></tr>
<tr><td><strong>Deny</strong></td><td>Reject the command — agent receives denial message</td></tr>
</tbody>
</table>

${callout('warn', 'Shell Operators', 'Commands containing <code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code> <code>$()</code> or backticks <strong>always</strong> require approval, even if the prefix is whitelisted. This prevents injection attacks.')}

${callout('danger', 'Untrusted Sources', 'Sessions originating from triggers (like email) are marked as untrusted. All terminal commands in untrusted sessions <strong>always</strong> require approval, regardless of allowed prefixes.')}
`
  },
  {
    slug: '/slack',
    section: 'Slack',
    title: 'Workspace Setup',
    description: 'Connect aidaemon to Slack via Socket Mode. Create a Slack app, configure OAuth scopes, and enable real-time messaging.',
    content: () => `
<h1>Slack Integration</h1>
<p class="lead">Connect aidaemon to your Slack workspace via Socket Mode for real-time messaging.</p>

${callout('success', 'Pre-built Binaries', 'If you installed via the one-line script or Homebrew, Slack support is already included. Just configure <code>config.toml</code> below. The feature flag is only needed when <a href="/getting-started/build">building from source</a>.')}

<h2>Create a Slack App</h2>
<ol>
  <li>Go to <a href="https://api.slack.com/apps" target="_blank" rel="noopener">api.slack.com/apps</a> and click <strong>Create New App</strong></li>
  <li>Choose <strong>From scratch</strong>, name it (e.g., "aidaemon"), and select your workspace</li>
  <li>Under <strong>Socket Mode</strong>, enable it and generate an <strong>App-Level Token</strong> with the <code>connections:write</code> scope &mdash; this is your <code>app_token</code> (<code>xapp-...</code>)</li>
  <li>Under <strong>OAuth &amp; Permissions</strong>, add these <strong>Bot Token Scopes</strong>:
    <ul>
      <li><code>channels:read</code> &mdash; list members in public channels</li>
      <li><code>chat:write</code> &mdash; send messages</li>
      <li><code>files:read</code> &mdash; download files sent by users</li>
      <li><code>files:write</code> &mdash; upload files to Slack</li>
      <li><code>groups:read</code> &mdash; list members in private channels (needed for resolving user names in private channels)</li>
      <li><code>im:read</code> &mdash; read DM metadata (required for file transfers in direct messages)</li>
      <li><code>reactions:write</code> &mdash; add status reactions (hourglass during processing)</li>
      <li><code>users:read</code> &mdash; resolve user info</li>
    </ul>
  </li>
  <li>Under <strong>Event Subscriptions</strong>, enable events and subscribe to:
    <ul>
      <li><code>message.channels</code> &mdash; messages in public channels</li>
      <li><code>message.groups</code> &mdash; messages in private channels</li>
      <li><code>message.im</code> &mdash; direct messages</li>
    </ul>
  </li>
  <li>Under <strong>App Home</strong>, scroll to <strong>Show Tabs</strong> and enable the <strong>Messages Tab</strong>. Check <strong>"Allow users to send Slash commands and messages from the messages tab"</strong> &mdash; without this, users cannot DM the bot.</li>
  <li>Install the app to your workspace &mdash; copy the <strong>Bot User OAuth Token</strong> (<code>xoxb-...</code>)</li>
</ol>

<h2>Configuration</h2>
${codeBlock(`[slack]
enabled = true
app_token = "xapp-1-..."
bot_token = "xoxb-..."
allowed_user_ids = ["U123456789"]
use_threads = true`, 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'Enable the Slack channel'],
  ['app_token', 'string', '&mdash;', 'App-Level Token for Socket Mode (<code>xapp-...</code>). Supports <code>"keychain"</code> and <code>$&#123;ENV&#125;</code>.'],
  ['bot_token', 'string', '&mdash;', 'Bot User OAuth Token (<code>xoxb-...</code>). Supports <code>"keychain"</code> and <code>$&#123;ENV&#125;</code>.'],
  ['allowed_user_ids', 'array', '[]', 'Slack user IDs allowed to interact. Empty = no restriction.'],
  ['use_threads', 'bool', 'true', 'Reply in threads by default. Each thread gets its own session context.'],
])}

<h2>Find Your Slack User ID</h2>
<p>Click on your profile in Slack, then click <strong>More</strong> &rarr; <strong>Copy member ID</strong>. The format is <code>U</code> followed by alphanumeric characters (e.g., <code>U0123ABCDEF</code>).</p>

<h2>Features</h2>
<ul>
  <li><strong>Socket Mode</strong> &mdash; real-time WebSocket connection, no public URL required</li>
  <li><strong>Threaded replies</strong> &mdash; configurable threaded conversations with per-thread session context</li>
  <li><strong>File transfer</strong> &mdash; send and receive files through Slack</li>
  <li><strong>Block Kit approvals</strong> &mdash; interactive buttons for terminal command approval</li>
  <li><strong>Slash commands</strong> &mdash; same commands as Telegram (<code>/cost</code>, <code>/model</code>, <code>/tasks</code>, etc.)</li>
  <li><strong>Status reactions</strong> &mdash; hourglass emoji while processing, removed on completion</li>
  <li><strong>Markdown conversion</strong> &mdash; standard markdown automatically converted to Slack mrkdwn format</li>
  <li><strong>Message chunking</strong> &mdash; long responses split to respect Slack&rsquo;s 39KB message limit</li>
  <li><strong>Auto-reconnect</strong> &mdash; exponential backoff on connection failure (5s &rarr; 60s max)</li>
</ul>

<h2>Session Model</h2>
<p>Slack sessions are identified by channel and thread:</p>
<ul>
  <li><strong>Channel message:</strong> <code>slack:{channel_id}</code></li>
  <li><strong>Thread message:</strong> <code>slack:{channel_id}:{thread_ts}</code> (when <code>use_threads</code> is enabled)</li>
</ul>
<p>Each session maintains its own conversation history, working memory, and facts context.</p>

${callout('warn', 'Access Control', 'If <code>allowed_user_ids</code> is empty, <strong>anyone</strong> in the workspace who can message the bot can interact with it. Always set this in production.')}
`
  },
  {
    slug: '/slack/commands',
    section: 'Slack',
    title: 'Commands',
    description: 'Slash commands available for aidaemon in Slack: /model, /clear, /cost, /status, and more.',
    content: () => `
<h1>Slack Commands</h1>
<p class="lead">Slash commands available in Slack. The same set of commands as Telegram.</p>

<table class="config-table">
<thead><tr><th>Command</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Show the current active model</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Switch to a specific model (disables auto-routing)</td></tr>
<tr><td><code>/models</code></td><td>List all available models from the provider (active model marked)</td></tr>
<tr><td><code>/auto</code></td><td>Re-enable automatic model routing based on query complexity</td></tr>
<tr><td><code>/reload</code></td><td>Reload config.toml (with auto-restore from backup if broken)</td></tr>
<tr><td><code>/restart</code></td><td>Full restart &mdash; exec new process (picks up new binary, config, MCP servers)</td></tr>
<tr><td><code>/cost</code></td><td>Show token usage statistics (last 24h, 7d, top models)</td></tr>
<tr><td><code>/tasks</code></td><td>List running and recent agent tasks for your session</td></tr>
<tr><td><code>/cancel &lt;id&gt;</code></td><td>Cancel a running task by ID</td></tr>
<tr><td><code>/help</code></td><td>Show list of available commands</td></tr>
</tbody>
</table>

${callout('info', 'Slash vs. Plain Text', 'In Slack, these commands are sent as regular messages starting with <code>/</code> in a DM or channel with the bot. They are not registered as Slack slash commands in the app manifest.')}
`
  },
  {
    slug: '/slack/approval',
    section: 'Slack',
    title: 'Approval Flow',
    description: 'Interactive Block Kit buttons for approving restricted terminal commands in Slack.',
    content: () => `
<h1>Slack Approval Flow</h1>
<p class="lead">Interactive Block Kit buttons for approving restricted terminal commands in Slack.</p>

<h2>How It Works</h2>
<ol>
  <li>The agent requests a terminal command that isn&rsquo;t in the allowed prefixes list (or contains shell operators)</li>
  <li>An approval message is sent to the Slack channel/thread with Block Kit buttons</li>
  <li>The user sees three interactive buttons:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Command requires approval:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow Once</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Allow Always</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Approval Options</h2>
<table class="config-table">
<thead><tr><th>Option</th><th>Behavior</th></tr></thead>
<tbody>
<tr><td><strong>Allow Once</strong></td><td>Execute the command this time only</td></tr>
<tr><td><strong>Allow Always</strong></td><td>Execute and persist the command prefix for future auto-approval</td></tr>
<tr><td><strong>Deny</strong></td><td>Reject the command &mdash; agent receives denial message</td></tr>
</tbody>
</table>

<p>The approval flow in Slack works identically to Telegram. &ldquo;Allow Always&rdquo; persists the prefix to SQLite so it survives daemon restarts.</p>

${callout('warn', 'Shell Operators', 'Commands containing <code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code> <code>$()</code> or backticks <strong>always</strong> require approval, even if the prefix is whitelisted.')}
`
  },
{
    slug: '/discord',
    section: 'Discord',
    title: 'Bot Setup',
    description: 'Connect aidaemon to Discord. Create a Discord application, configure the bot, and enable slash commands.',
    content: () => `
<h1>Discord Bot Setup</h1>
<p class="lead">Connect aidaemon to Discord via the gateway API.</p>

${callout('success', 'Pre-built Binaries', 'If you installed via the one-line script or Homebrew, Discord support is already included. Just configure <code>config.toml</code> below. The feature flag is only needed when <a href="/getting-started/build">building from source</a>.')}

<h2>Create a Discord Application</h2>
<ol>
  <li>Go to the <a href="https://discord.com/developers/applications" target="_blank" rel="noopener">Discord Developer Portal</a></li>
  <li>Click <strong>New Application</strong> and name it (e.g., &ldquo;aidaemon&rdquo;)</li>
  <li>Under <strong>Bot</strong>, click <strong>Add Bot</strong></li>
  <li>Copy the <strong>Bot Token</strong> &mdash; this is your <code>bot_token</code></li>
  <li>Enable these <strong>Privileged Gateway Intents</strong>:
    <ul>
      <li><code>Message Content Intent</code> &mdash; read message text</li>
      <li><code>Server Members Intent</code> &mdash; resolve user info</li>
    </ul>
  </li>
  <li>Under <strong>OAuth2 &rarr; URL Generator</strong>, select scopes <code>bot</code> and <code>applications.commands</code>, then permissions: Send Messages, Read Message History, Attach Files, Use Slash Commands</li>
  <li>Use the generated URL to invite the bot to your server</li>
</ol>

<h2>Configuration</h2>
${codeBlock(`[discord]
bot_token = "MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.AbCdEf.xxxxx"
allowed_user_ids = [123456789012345678]
guild_id = 987654321098765432`, 'toml', 'config.toml')}

${configTable([
  ['bot_token', 'string', '&mdash;', 'Discord bot token from the Developer Portal. Supports <code>"keychain"</code>.'],
  ['allowed_user_ids', 'array', '[]', 'Discord user IDs (snowflake integers) allowed to interact. Empty = no restriction.'],
  ['guild_id', 'integer', 'null', 'Optional server/guild ID. If set, the bot only responds in that server.'],
])}

<h2>Get Your Discord User ID</h2>
<p>Enable <strong>Developer Mode</strong> in Discord settings (Appearance &rarr; Advanced), then right-click your username and select <strong>Copy User ID</strong>.</p>

<h2>Features</h2>
<ul>
  <li><strong>Gateway connection</strong> &mdash; real-time WebSocket connection via serenity framework</li>
  <li><strong>Slash commands</strong> &mdash; registered application commands (see <a href="/discord/commands">Commands</a>)</li>
  <li><strong>Interactive buttons</strong> &mdash; approval flow with clickable buttons (see <a href="/discord/approval">Approval Flow</a>)</li>
  <li><strong>File transfer</strong> &mdash; send and receive files as Discord attachments</li>
  <li><strong>Message splitting</strong> &mdash; long responses split to respect Discord&rsquo;s 2000-char message limit</li>
  <li><strong>Auto-reconnect</strong> &mdash; exponential backoff on connection failure (5s &rarr; 60s cap)</li>
  <li><strong>User allowlist</strong> &mdash; per-bot token access control</li>
  <li><strong>Multi-bot support</strong> &mdash; run multiple Discord bots with separate configs</li>
</ul>

<h2>Session Model</h2>
<p>Discord sessions are identified by channel:</p>
<ul>
  <li><strong>Channel message:</strong> <code>discord:{channel_id}</code></li>
</ul>
<p>Each channel maintains its own conversation history, working memory, and facts context.</p>

${callout('warn', 'Access Control', 'If <code>allowed_user_ids</code> is empty, <strong>anyone</strong> who can message the bot can interact with it. Always set this in production.')}
`
  },
  {
    slug: '/discord/commands',
    section: 'Discord',
    title: 'Slash Commands',
    description: 'Registered Discord application commands for aidaemon: /ask, /model, /clear, /status, and more.',
    content: () => `
<h1>Discord Slash Commands</h1>
<p class="lead">Registered application commands available in Discord. Accessible via <code>/</code> in the message input.</p>

<table class="config-table">
<thead><tr><th>Command</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/ask &lt;message&gt;</code></td><td>Send a message to the agent</td></tr>
<tr><td><code>/model</code></td><td>Show the current active model</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Switch to a specific model (disables auto-routing)</td></tr>
<tr><td><code>/models</code></td><td>List all available models from the provider</td></tr>
<tr><td><code>/auto</code></td><td>Re-enable automatic model routing</td></tr>
<tr><td><code>/clear</code></td><td>Clear session conversation history</td></tr>
<tr><td><code>/cost</code></td><td>Show token usage statistics</td></tr>
<tr><td><code>/tasks</code></td><td>List running and recent agent tasks</td></tr>
<tr><td><code>/cancel &lt;id&gt;</code></td><td>Cancel a running task by ID</td></tr>
<tr><td><code>/status</code></td><td>Show daemon status and uptime</td></tr>
<tr><td><code>/help</code></td><td>Show list of available commands</td></tr>
</tbody>
</table>

<h2>Regular Messages</h2>
<p>In addition to slash commands, users can also interact by mentioning the bot or sending direct messages. The bot processes these as regular conversation messages.</p>

${callout('info', 'Command Registration', 'Slash commands are automatically registered with Discord when the bot connects. If you change guild_id, commands will re-register for the new scope.')}
`
  },
  {
    slug: '/discord/approval',
    section: 'Discord',
    title: 'Approval Flow',
    description: 'Interactive button components for approving restricted terminal commands in Discord.',
    content: () => `
<h1>Discord Approval Flow</h1>
<p class="lead">Interactive button components for approving restricted terminal commands in Discord.</p>

<h2>How It Works</h2>
<ol>
  <li>The agent requests a terminal command that isn&rsquo;t in the allowed prefixes list (or contains shell operators)</li>
  <li>An approval message is sent to the Discord channel with interactive buttons</li>
  <li>The user sees three clickable buttons:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Command requires approval:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow Once</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Allow Always</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Approval Options</h2>
<table class="config-table">
<thead><tr><th>Option</th><th>Behavior</th></tr></thead>
<tbody>
<tr><td><strong>Allow Once</strong></td><td>Execute the command this time only</td></tr>
<tr><td><strong>Allow Always</strong></td><td>Execute and persist the command prefix for future auto-approval</td></tr>
<tr><td><strong>Deny</strong></td><td>Reject the command &mdash; agent receives denial message</td></tr>
</tbody>
</table>

<p>The approval flow in Discord uses serenity&rsquo;s <code>ComponentInteraction</code> API. &ldquo;Allow Always&rdquo; persists the prefix to SQLite so it survives daemon restarts.</p>

${callout('info', 'Button Expiry', 'Discord interaction tokens expire after 15 minutes. If no response is received within that window, the approval request times out and the command is denied.')}
`
  },
    {
    slug: '/tools',
    section: 'Tools',
    title: 'Tools Overview',
    description: 'Overview of all built-in tools the aidaemon LLM agent can call: terminal, memory, browser, web search, and more.',
    content: () => `
<h1>Tools</h1>
<p class="lead">aidaemon provides a set of built-in tools the LLM can call autonomously during the agentic loop.</p>

<h2>Tool Trait</h2>
<p>All tools implement the same interface:</p>
${codeBlock(`trait Tool {
    fn name(&self) -> &str;
    fn description(&self) -> &str;
    fn schema(&self) -> Value;       // OpenAI function-calling format
    async fn call(&self, args: &str) -> Result<String>;
}`, 'rust')}

<h2>Built-in Tools</h2>
<table class="config-table">
<thead><tr><th>Tool</th><th>Description</th><th>Config</th></tr></thead>
<tbody>
<tr><td><a href="/tools/terminal"><code>terminal</code></a></td><td>Execute shell commands with approval flow</td><td>[terminal]</td></tr>
<tr><td><a href="/tools/system-info"><code>system_info</code></a></td><td>Query hostname, OS, uptime, memory</td><td>Always enabled</td></tr>
<tr><td><a href="/tools/memory"><code>remember_fact</code></a></td><td>Store long-term facts in SQLite</td><td>Always enabled</td></tr>
<tr><td><a href="/tools/config-manager"><code>manage_config</code></a></td><td>Read/update/restore config.toml</td><td>Always enabled</td></tr>
<tr><td><a href="/tools/web-search"><code>web_search</code></a></td><td>Search the web (DuckDuckGo or Brave)</td><td>[search]</td></tr>
<tr><td><a href="/tools/web-fetch"><code>web_fetch</code></a></td><td>Fetch and extract readable content from URLs</td><td>Always enabled</td></tr>
<tr><td><a href="/tools/browser"><code>browser</code></a></td><td>Chrome automation with persistent login sessions</td><td>[browser] enabled=true</td></tr>
<tr><td><a href="/tools/send-file"><code>send_file</code></a></td><td>Send files to the user via Telegram or Slack</td><td>[files]</td></tr>
<tr><td><a href="/tools/sub-agents"><code>spawn_agent</code></a></td><td>Spawn recursive sub-agents</td><td>[subagents]</td></tr>
<tr><td><a href="/tools/cli-agents"><code>cli_agent</code></a></td><td>Delegate to external CLI tools</td><td>[cli_agents]</td></tr>
<tr><td><a href="/scheduler"><code>scheduler</code></a></td><td>Create, manage, and run scheduled tasks</td><td>[scheduler]</td></tr>
<tr><td><a href="/tools/command-risk"><code>command_risk</code></a></td><td>4-level risk assessment for terminal commands</td><td>[terminal]</td></tr>
<tr><td><a href="/health-monitoring"><code>health_probe</code></a></td><td>Manage and run health probes</td><td>[health]</td></tr>
<tr><td><a href="/skills"><code>manage_skills</code></a></td><td>Add, remove, browse, install dynamic skills</td><td>[skills]</td></tr>
<tr><td><a href="/tools/people"><code>manage_people</code></a></td><td>Personal contact book with birthdays, preferences, relationships</td><td>Always registered</td></tr>
<tr><td><a href="/mcp">MCP tools</a></td><td>Dynamically discovered via MCP servers</td><td>[mcp.*]</td></tr>
</tbody>
</table>

${callout('info', 'Dynamic Budget', 'The agent also has a built-in <code>request_more_iterations</code> pseudo-tool that extends the agentic loop budget by 10 iterations (up to a hard cap) when the current budget is insufficient to complete a task.')}

<h2>Tool Registration Order</h2>
<p>Tools are registered during initialization in this order:</p>
<ol>
  <li>SystemInfoTool</li>
  <li>TerminalTool (with approval channel)</li>
  <li>RememberFactTool</li>
  <li>ConfigManagerTool</li>
  <li>WebFetchTool</li>
  <li>WebSearchTool</li>
  <li>BrowserTool (if enabled)</li>
  <li>SendFileTool (if files.enabled)</li>
  <li>CliAgentTool (if enabled)</li>
  <li>SchedulerTool (if scheduler.enabled)</li>
  <li>HealthProbeTool (if health.enabled)</li>
  <li>ManageSkillsTool</li>
  <li>ManagePeopleTool (always registered, gated internally)</li>
  <li>MCP tools (if configured)</li>
</ol>
`
  },
  {
    slug: '/tools/terminal',
    section: 'Tools',
    title: 'Terminal Tool',
    description: 'Execute shell commands on the host system via aidaemon. Commands run through sh -c with risk assessment.',
    content: () => `
<h1>Terminal Tool</h1>
<p class="lead">Execute shell commands on the host system. Commands are run via <code>sh -c</code>.</p>

<h2>Parameters</h2>
${configTable([
  ['command', 'string', '—', 'The shell command to execute (required for action="run")'],
  ['action', 'string', '"run"', 'One of: run, check, kill, trust_all'],
  ['pid', 'integer', '—', 'Process ID required for check/kill'],
])}

<h2>Approval Logic</h2>
<p>A command is auto-approved only if <strong>both</strong> conditions are met:</p>
<ol>
  <li>The command starts with a prefix in <code>terminal.allowed_prefixes</code></li>
  <li>The command does <strong>not</strong> contain any shell operators</li>
</ol>

<h3>Shell Operators (always require approval)</h3>
${codeBlock(`; | && || $() \` (backticks)`, 'text')}

<h3>Default Allowed Prefixes</h3>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

<h2>Output</h2>
<p>Returns stdout first, then stderr (if any). Output is truncated to <code>terminal.max_output_chars</code> (default 4000 characters).</p>

<h2>Background Commands (New)</h2>
<p>If a command exceeds the initial timeout, it moves to the background and returns a PID.</p>
<ul>
  <li><code>action="check"</code> + <code>pid</code> shows partial/final output</li>
  <li><code>action="kill"</code> + <code>pid</code> stops a running background command</li>
  <li>Recent completed output is retained briefly so follow-up checks still work</li>
</ul>

<h2>Hard Safety Blocks (New)</h2>
<p>Certain destructive patterns are now blocked before approval flow, including broad/sensitive <code>rm -rf</code> and <code>find ... -delete</code> targets.</p>

<h2>Configuration</h2>
${codeBlock(`[terminal]
allowed_prefixes = ["ls", "cat", "head", "tail", "echo", "date"]
initial_timeout_secs = 30
max_output_chars = 4000
permission_mode = "default"`, 'toml', 'config.toml')}

<h2>Allow Always (Persistent)</h2>
<p>When the user clicks "Allow Always" in Telegram:</p>
<ol>
  <li>The first word of the command is extracted as the prefix</li>
  <li>The prefix is added to the in-memory allowed list</li>
  <li>The prefix is persisted to SQLite (<code>terminal_allowed_prefixes</code> table)</li>
  <li>On restart, persisted prefixes are merged with config prefixes</li>
</ol>
<p>This means "Allow Always" approvals survive daemon restarts without modifying config.toml.</p>

${callout('danger', 'Untrusted Sessions', 'Sessions from triggers (email, etc.) are flagged as untrusted. <strong>All</strong> commands in untrusted sessions require approval regardless of the whitelist.')}
`
  },
{
    slug: '/tools/command-risk',
    section: 'Tools',
    title: 'Command Risk Assessment',
    description: 'Every terminal command is scored with a 4-level risk system: Safe, Medium, High, and Critical. 60+ patterns.',
    content: () => `
<h1>Command Risk Assessment</h1>
<p class="lead">Every terminal command is scored with a 4-level risk system before execution.</p>

<h2>Risk Levels</h2>
<table class="config-table">
<thead><tr><th>Level</th><th>Auto-Approved?</th><th>Examples</th></tr></thead>
<tbody>
<tr><td><strong>Safe</strong></td><td>Yes (if prefix whitelisted)</td><td><code>ls</code>, <code>cat</code>, <code>date</code>, <code>echo</code></td></tr>
<tr><td><strong>Medium</strong></td><td>After first approval</td><td><code>curl</code>, <code>git push</code>, <code>npm install</code></td></tr>
<tr><td><strong>High</strong></td><td>After first approval</td><td><code>rm</code>, <code>mv</code>, <code>chmod</code>, <code>kill</code></td></tr>
<tr><td><strong>Critical</strong></td><td>Never persisted (default)</td><td><code>sudo rm -rf</code>, <code>dd</code>, <code>mkfs</code></td></tr>
</tbody>
</table>

<h2>Permission Modes</h2>
${configTable([
  ['default', '—', '—', 'Safe/Medium/High approvals persist across restarts. Critical is per-session only.'],
  ['cautious', '—', '—', 'All approvals are per-session only.'],
  ['yolo', '—', '—', 'All approvals persist forever.'],
])}

<h2>Dangerous Constructs</h2>
<p>Patterns that always elevate risk:</p>
<ul>
  <li>Command substitution: <code>$(...)</code> and backticks</li>
  <li>Process substitution: <code>&gt;(...)</code>, <code>&lt;(...)</code></li>
  <li>Redirection: <code>&gt;</code>, <code>&gt;&gt;</code></li>
  <li>Multiple commands: <code>;</code>, <code>&amp;&amp;</code>, <code>||</code></li>
  <li>Pipes into shells or <code>sudo</code></li>
</ul>

<h2>Sensitive Path Detection</h2>
<p>Commands referencing these files are automatically elevated:</p>
<ul>
  <li><code>.env</code> &mdash; environment secrets</li>
  <li>SSH keys: <code>id_rsa</code>, <code>id_ed25519</code></li>
  <li>Cloud configs: <code>.aws</code>, <code>.kube</code>, <code>.docker</code></li>
  <li>System auth: <code>shadow</code>, <code>passwd</code>, <code>sudoers</code></li>
  <li>Credentials: <code>master.key</code>, <code>.netrc</code>, <code>.pgpass</code></li>
</ul>

<h2>Hard Blocks (New)</h2>
<p>Even before approval flow, broad or sensitive delete patterns are blocked, including risky <code>rm -rf</code> and <code>find ... -delete</code> targets.</p>

${callout('info', 'Configuration', 'Set <code>terminal.permission_mode</code> in config.toml. Default is <code>"default"</code>.')}
`
},
    {
    slug: '/tools/system-info',
    section: 'Tools',
    title: 'System Info Tool',
    description: 'Query OS, hostname, architecture, CPU, memory, disk, uptime, and process info via the system info tool.',
    content: () => `
<h1>System Info Tool</h1>
<p class="lead">Query basic system information. Always enabled, no parameters.</p>

<h2>Parameters</h2>
<p>None — this tool takes no arguments.</p>

<h2>Output</h2>
<p>Returns a text report with:</p>
<ul>
  <li><strong>Hostname</strong></li>
  <li><strong>Operating system</strong></li>
  <li><strong>Uptime</strong></li>
  <li><strong>Memory usage</strong></li>
</ul>

<p>Memory is collected platform-specifically:</p>
<ul>
  <li><strong>Linux:</strong> parsed from <code>free -h</code></li>
  <li><strong>macOS:</strong> parsed from <code>vm_stat</code></li>
</ul>
`
  },
  {
    slug: '/tools/memory',
    section: 'Tools',
    title: 'Memory / Facts Tool',
    description: 'Store and retrieve long-term facts that persist across sessions and are injected into the system prompt.',
    content: () => `
<h1>Memory / Facts Tool</h1>
<p class="lead">Store and retrieve long-term facts that persist across sessions and are injected into the system prompt.</p>

<h2>Tool Name</h2>
<p><code>remember_fact</code></p>

<h2>Parameters</h2>
${configTable([
  ['category', 'string', '—', 'Grouping category (e.g., "user", "preference", "project")'],
  ['key', 'string', '—', 'Unique identifier within the category'],
  ['value', 'string', '—', 'The fact content to store'],
])}

<h2>Storage</h2>
<p>Facts are upserted into the <code>facts</code> table in SQLite. The <code>(category, key)</code> pair is unique — storing a fact with the same category and key overwrites the previous value.</p>

<h2>System Prompt Injection</h2>
<p>Up to <code>state.max_facts</code> (default 100) facts are injected into the system prompt under a <code>## Known Facts</code> section, grouped by category and ordered by most recently updated. This means the agent always has access to its stored knowledge.</p>

${codeBlock(`## Known Facts

### user
- name: David
- timezone: US/Pacific

### project
- language: Rust
- repo: /home/david/projects/myapp`, 'text', 'system prompt injection')}

<h2>Facts Table Schema</h2>
${configTable([
  ['id', 'integer', 'auto', 'Auto-incrementing primary key'],
  ['category', 'string', '—', 'Grouping category'],
  ['key', 'string', '—', 'Fact key (unique per category)'],
  ['value', 'string', '—', 'Fact content'],
  ['source', 'string', '""', 'Who stored it: "agent" or "user"'],
  ['created_at', 'timestamp', 'now', 'When the fact was created'],
  ['updated_at', 'timestamp', 'now', 'When the fact was last updated'],
])}
`
  },
  {
    slug: '/tools/config-manager',
    section: 'Tools',
    title: 'Config Manager Tool',
    description: 'The aidaemon agent can read, update, validate, and restore its own configuration file autonomously.',
    content: () => `
<h1>Config Manager Tool</h1>
<p class="lead">The agent can read, update, validate, and restore its own configuration file.</p>

<h2>Tool Name</h2>
<p><code>manage_config</code></p>

<h2>Actions</h2>

<h3>read</h3>
<p>Returns the full config.toml content with sensitive fields redacted:</p>
${codeBlock(`api_key = "***REDACTED***"
bot_token = "***REDACTED***"
password = "***REDACTED***"`, 'toml')}

<h3>get</h3>
<p>Read a specific TOML key path:</p>
${codeBlock(`action: "get"
key: "provider.models.primary"
# Returns: "gemini-3-flash-preview"`, 'text')}

<h3>set</h3>
<p>Update a specific key with a new value (TOML literal format):</p>
${codeBlock(`action: "set"
key: "state.working_memory_cap"
value: "100"`, 'text')}

<p>Before writing:</p>
<ol>
  <li>Creates backup (3-deep ring rotation: <code>.bak</code> → <code>.bak.1</code> → <code>.bak.2</code>)</li>
  <li>Validates the new config (TOML syntax + full deserialization)</li>
  <li>Sets file permissions to 0600 (owner-only) on Unix</li>
</ol>

<h3>restore</h3>
<p>Rollback to the most recent backup file.</p>

${callout('info', 'Last Known Good', 'After every successful LLM call, the current config is stamped as <code>.toml.lastgood</code>. This is the first file tried during recovery.')}

<h2>Backup Priority</h2>
<ol>
  <li><code>config.toml.lastgood</code> — proven working config</li>
  <li><code>config.toml.bak</code> — most recent backup</li>
  <li><code>config.toml.bak.1</code></li>
  <li><code>config.toml.bak.2</code></li>
</ol>
`
  },
  {
    slug: '/tools/browser',
    section: 'Tools',
    title: 'Browser Tool',
    description: 'Chrome automation with persistent login sessions for web browsing, form filling, and screenshots.',
    content: () => `
<h1>Browser Tool</h1>
<p class="lead">Chrome automation with persistent login sessions. Log in once, and the agent can browse authenticated sites on your behalf.</p>

${callout('success', 'Pre-built Binaries', 'If you installed via the one-line script or Homebrew, the browser tool is already included. Just enable it in <code>config.toml</code> below. The feature flag is only needed when <a href="/getting-started/build">building from source</a>.')}

<h2>Quick Start</h2>
<p>Two steps to get the agent browsing with your login sessions:</p>

<h3>1. Log into your services</h3>
${codeBlock(`aidaemon browser login`, 'bash')}
<p>Chrome opens with a dedicated profile. Log into the services you want the agent to access (Gmail, GitHub, AWS Console, Jira, etc.), then close Chrome. Your sessions are saved to <code>~/.aidaemon/chrome-profile/</code> and persist across restarts.</p>

<h3>2. Enable the browser tool</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}

<p>That's it. The agent can now browse authenticated sites using your saved sessions.</p>

${callout('info', 'Try It', 'Send the agent a message like <em>"Go to https://mail.google.com and take a screenshot"</em> — it should show your inbox, already logged in.')}

<h2>Configuration</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Enable the browser tool'],
  ['headless', 'bool', 'true', 'Run Chrome without a visible window'],
  ['screenshot_width', 'int', '1280', 'Browser viewport width in pixels'],
  ['screenshot_height', 'int', '720', 'Browser viewport height in pixels'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Chrome profile directory for persistent sessions'],
  ['profile', 'string', 'Default', 'Chrome profile name within user_data_dir'],
  ['remote_debugging_port', 'int', 'null', 'Connect to an existing Chrome instance on this port (advanced)'],
])}

<h3>Minimal config</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}
<p>Everything else has sensible defaults. Sessions are automatically saved to <code>~/.aidaemon/chrome-profile/</code>.</p>

<h2>Actions</h2>

<table class="config-table">
<thead><tr><th>Action</th><th>Parameters</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>navigate</code></td><td><code>url</code></td><td>Navigate to URL, wait 2s for page load</td></tr>
<tr><td><code>screenshot</code></td><td><code>selector?</code></td><td>PNG screenshot of full page or specific element</td></tr>
<tr><td><code>click</code></td><td><code>selector</code></td><td>Click an element by CSS selector</td></tr>
<tr><td><code>fill</code></td><td><code>selector, value</code></td><td>Type text into a form input</td></tr>
<tr><td><code>get_text</code></td><td><code>selector?</code></td><td>Extract text content from element or full page</td></tr>
<tr><td><code>execute_js</code></td><td><code>script</code></td><td>Run arbitrary JavaScript and return the result</td></tr>
<tr><td><code>wait</code></td><td><code>selector, timeout_secs?</code></td><td>Wait for an element to appear (default 10s timeout)</td></tr>
<tr><td><code>close</code></td><td>—</td><td>Close the browser session</td></tr>
</tbody>
</table>

<h2>Session Persistence</h2>
<p>The browser tool uses a dedicated Chrome profile at <code>~/.aidaemon/chrome-profile/</code> that stores cookies, local storage, and login sessions. This means:</p>
<ul>
  <li>Log in once via <code>aidaemon browser login</code>, sessions persist indefinitely</li>
  <li>The agent launches Chrome headless with this profile — already authenticated</li>
  <li>Sessions survive aidaemon restarts and system reboots</li>
  <li>Re-run <code>aidaemon browser login</code> anytime to add new services or refresh expired sessions</li>
</ul>

${callout('warn', 'Isolated from Personal Chrome', 'The agent uses its own Chrome profile, completely separate from your personal browser. Your personal bookmarks, extensions, and sessions are never touched.')}

<h2>Deployment Modes</h2>

<h3>Isolated instance (recommended)</h3>
<p>When running aidaemon on a dedicated server or VM, no other Chrome is running. The agent launches and owns Chrome directly.</p>
${codeBlock(`# SSH into your instance
ssh user@my-server

# One-time: log into services
aidaemon browser login

# Config
# [browser]
# enabled = true

# Done — agent handles Chrome automatically from here`, 'bash')}
<p>For headless servers, use SSH with X forwarding (<code>ssh -X</code>) or VNC for the initial login.</p>

<h3>Personal computer</h3>
<p>When running aidaemon alongside your personal Chrome, the agent launches a separate Chrome instance with its own profile. Both run side by side without conflict.</p>
${codeBlock(`# Same setup — separate Chrome instance, no conflict
aidaemon browser login

# Your personal Chrome (47 tabs, extensions, bookmarks) → untouched
# Aidaemon's Chrome (~/.aidaemon/chrome-profile/) → isolated`, 'bash')}

<h3>Advanced: Connect to existing Chrome</h3>
<p>For power users who want to connect to a Chrome instance already running with a remote debugging port:</p>
${codeBlock(`[browser]
enabled = true
remote_debugging_port = 9222`, 'toml', 'config.toml')}
<p>Start Chrome with <code>--remote-debugging-port=9222</code> and the agent connects to it directly. This shares the Chrome instance's sessions but requires Chrome to be launched with the debugging flag.</p>

<h2>Screenshots</h2>
<p>Screenshots are captured as PNG and sent to the user via the active channel (Telegram photo, Slack file upload, etc.) with captions describing the page URL.</p>

<h2>Use Cases</h2>
<ul>
  <li><strong>Monitoring</strong> — Check dashboards (Grafana, Vercel, AWS Console), screenshot deployment status</li>
  <li><strong>Data extraction</strong> — Scrape JS-rendered pages, pull reports from admin panels</li>
  <li><strong>Workflow automation</strong> — Fill forms, navigate multi-step flows on internal tools</li>
  <li><strong>Testing</strong> — Navigate your deployed app, verify UI, check responsive layouts</li>
  <li><strong>Authenticated browsing</strong> — Interact with any service you've logged into, no API keys needed</li>
</ul>

<h2>Building from Source</h2>
<p>The browser tool requires the <code>browser</code> feature flag:</p>
${codeBlock(`cargo build --release --features browser`, 'bash')}
<p>Requires a Chromium-based browser installed (Chrome, Chromium, Brave, or Edge).</p>
`
  },
  {
    slug: '/tools/sub-agents',
    section: 'Tools',
    title: 'Sub-Agent Spawning',
    description: 'Spawn child agents for complex tasks with recursive delegation. Each sub-agent gets its own tool set.',
    content: () => `
<h1>Sub-Agent Spawning</h1>
<p class="lead">The agent can spawn child agents for complex tasks, enabling recursive delegation.</p>

<h2>Tool Name</h2>
<p><code>spawn_agent</code></p>

<h2>Parameters</h2>
${configTable([
  ['mission', 'string', '—', 'High-level role/context for the sub-agent'],
  ['task', 'string', '—', 'Concrete question or work to accomplish'],
])}

<h2>Behavior</h2>
<ul>
  <li>Child agent runs at <code>parent_depth + 1</code></li>
  <li>Inherits parent's provider, state store, model, and non-spawn tools</li>
  <li>Gets a focused system prompt: base instructions + mission context</li>
  <li>Runs a complete agentic loop in an isolated session (<code>sub-{depth}-{uuid}</code>)</li>
  <li>Returns final text response to parent (truncated to <code>max_response_chars</code>)</li>
  <li>If <code>child_depth &lt; max_depth</code>, child also gets the <code>spawn_agent</code> tool</li>
</ul>

<h2>Configuration</h2>
${codeBlock(`[subagents]
enabled = true
max_depth = 3
max_iterations = 10
max_response_chars = 8000
timeout_secs = 300`, 'toml', 'config.toml')}

${callout('info', 'Recursion Limit', 'Sub-agents can spawn their own sub-agents up to <code>max_depth</code> levels deep. At max depth, the spawn_agent tool is not provided.')}

${callout('warn', 'Timeout', 'Each sub-agent invocation has a hard timeout (<code>timeout_secs</code>). If a sub-agent takes too long, the parent receives a timeout error.')}
`
  },
  {
    slug: '/tools/cli-agents',
    section: 'Tools',
    title: 'CLI Agent Delegation',
    description: 'Delegate coding work to Claude Code, Codex, Antigravity CLI, Gemini CLI, Copilot, Aider or any Agent Client Protocol agent, in a permission mode you choose.',
    content: () => `
<h1>CLI Agent Delegation</h1>
<p class="lead">Delegate tasks to external coding agents (Claude Code, Codex, Antigravity CLI, Gemini CLI, Copilot, Aider) or to any agent that speaks the Agent Client Protocol, each in a permission mode you choose.</p>

<h2>Tool Name</h2>
<p><code>cli_agent</code></p>

<h2>Parameters</h2>
${configTable([
  ['tool', 'string', '—', 'Name of the CLI tool to invoke (e.g., "claude", "codex", "agy")'],
  ['prompt', 'string', '—', 'The prompt/task to send to the CLI tool'],
  ['working_dir', 'string', 'null', 'Working directory for command execution'],
])}

<h2>Discovered Agents</h2>
<p>When <code>cli_agents.enabled = true</code> with no explicit tool configs, these are registered if their command is installed:</p>

<table class="config-table">
<thead><tr><th>Name</th><th>Agent</th><th>Command</th></tr></thead>
<tbody>
<tr><td>claude</td><td>Claude Code</td><td><code>claude -p --output-format stream-json --verbose</code></td></tr>
<tr><td>codex</td><td>Codex</td><td><code>codex exec --json</code></td></tr>
<tr><td>agy</td><td>Antigravity CLI (Agent Client Protocol)</td><td><code>agy acp</code></td></tr>
<tr><td>gemini</td><td>Gemini CLI (Agent Client Protocol)</td><td><code>gemini --acp</code></td></tr>
<tr><td>copilot</td><td>Copilot CLI</td><td><code>copilot -p</code></td></tr>
<tr><td>aider</td><td>Aider</td><td><code>aider --message</code></td></tr>
</tbody>
</table>

<p>When a call names no tool, the first available of <code>claude</code>, <code>codex</code>, <code>agy</code>, <code>copilot</code>, <code>aider</code> is used. Gemini CLI is not in that order (Google now serves it only to enterprise licences and paid API keys); it is used when named, and its readiness check reports a refused personal sign-in.</p>

<h2>Permission Modes</h2>
<p>Each coding agent runs in one of three modes, set per agent on the app's Settings page:</p>
<table class="config-table">
<thead><tr><th>Mode</th><th>Behavior</th></tr></thead>
<tbody>
<tr><td><strong>Checked by AIDaemon</strong> (default)</td><td>Confined to the project folder by the agent's own sandbox; anything beyond it is asked first and judged by your own rules</td></tr>
<tr><td><strong>Every command checked</strong></td><td>Runs on the machine itself, with every command and file change (except the agent's own short list of read-only commands) asked first</td></tr>
<tr><td><strong>Full access</strong></td><td>Runs on the machine with nothing asked. Choosing it asks you first.</td></tr>
</tbody>
</table>
<p>Claude Code and Codex ask AIDaemon instead of refusing on their own, so your grants answer what they cover and a card asks the rest. Settings also shows whether each agent can work now (<strong>Ready</strong>, or <strong>Not usable</strong> with its reason and fix, and <strong>Check again</strong>); work is never routed to an agent that cannot run.</p>

<h2>Any Agent Client Protocol agent</h2>
<p>An agent that speaks the <a href="https://agentclientprotocol.com" target="_blank" rel="noopener">Agent Client Protocol</a> can be added under <code>[cli_agents.tools.&lt;name&gt;]</code> with <code>protocol = "acp"</code>. aidaemon hosts it over the protocol, and each action it takes is asked first, so every one can be judged.</p>
${codeBlock(`[cli_agents.tools.my-acp-agent]
command = "my-acp-agent"
args = ["--acp"]            # whatever starts its protocol server
protocol = "acp"
description = "An ACP coding agent"`, 'toml', 'config.toml')}

<h2>Custom Configuration</h2>
${codeBlock(`[cli_agents]
enabled = true
timeout_secs = 600
max_output_chars = 16000

[cli_agents.tools.claude]
command = "claude"
args = ["-p", "--output-format", "json"]
description = "Claude Code for coding tasks"

[cli_agents.tools.custom-tool]
command = "/usr/local/bin/my-ai-tool"
args = ["--json"]
description = "My custom AI tool"
timeout_secs = 120`, 'toml', 'config.toml')}
<p>Setting any <code>[cli_agents.tools.*]</code> entry replaces the discovered list. A stored launch cannot widen what a known agent may do: arguments that would bypass its sandbox or approvals are refused.</p>

<h2>Output Extraction</h2>
<p>The tool attempts to extract structured output:</p>
<ul>
  <li><strong>JSON:</strong> looks for <code>result</code>, <code>output</code>, <code>content</code>, or <code>message</code> fields</li>
  <li><strong>JSONL:</strong> takes the last line containing content</li>
  <li><strong>Fallback:</strong> returns raw output, truncated to <code>max_output_chars</code></li>
</ul>
`
  },
  {
    slug: '/tools/web-search',
    section: 'Tools',
    title: 'Web Search Tool',
    description: 'Search the web via DuckDuckGo or Brave and return titles, URLs, and snippets to the LLM agent.',
    content: () => `
<h1>Web Search Tool</h1>
<p class="lead">Search the web and return titles, URLs, and snippets. Supports DuckDuckGo (default, no key needed) and Brave backends.</p>

<h2>Tool Name</h2>
<p><code>web_search</code></p>

<h2>Parameters</h2>
${configTable([
  ['query', 'string', '—', 'The search query (required)'],
  ['max_results', 'integer', '5', 'Maximum number of results to return'],
])}

<h2>Backends</h2>
<table class="config-table">
<thead><tr><th>Backend</th><th>API Key</th><th>How It Works</th></tr></thead>
<tbody>
<tr><td><strong>DuckDuckGo</strong> (default)</td><td>Not required</td><td>Fetches <code>https://lite.duckduckgo.com/lite/</code> and parses HTML results</td></tr>
<tr><td><strong>Brave</strong></td><td>Required</td><td>Calls <code>https://api.search.brave.com/res/v1/web/search</code> JSON API</td></tr>
</tbody>
</table>

<h2>Configuration</h2>
${codeBlock(`[search]
backend = "duckduckgo"  # or "brave"
api_key = ""            # Required only for Brave`, 'toml', 'config.toml')}

<h2>Output Format</h2>
<p>Returns numbered markdown results:</p>
${codeBlock(`1. [Page Title](https://example.com/page)
   A brief snippet describing the page content...

2. [Another Result](https://example.com/other)
   Another snippet...`, 'text')}
`
  },
  {
    slug: '/tools/web-fetch',
    section: 'Tools',
    title: 'Web Fetch Tool',
    description: 'Fetch any URL and extract readable content. Supports HTML-to-text conversion with configurable limits.',
    content: () => `
<h1>Web Fetch Tool</h1>
<p class="lead">Fetch a URL and extract its readable content. Always enabled, no configuration required.</p>

<h2>Tool Name</h2>
<p><code>web_fetch</code></p>

<h2>Parameters</h2>
${configTable([
  ['url', 'string', '—', 'The URL to fetch (required)'],
  ['max_chars', 'integer', '20000', 'Maximum characters to return'],
])}

<h2>Behavior</h2>
<ol>
  <li>Fetches URL with browser-like headers (Firefox user-agent, standard Accept headers)</li>
  <li>Attempts readability extraction to get clean article text</li>
  <li>Falls back to full HTML-to-markdown conversion</li>
  <li>Truncates to <code>max_chars</code> at a safe UTF-8 boundary</li>
</ol>

${callout('info', 'Complements Browser Tool', 'Use <code>web_fetch</code> for quick content extraction without spinning up Chrome. Use the <a href="/tools/browser">Browser Tool</a> for interactive pages requiring JavaScript, form filling, or screenshots.')}
`
  },
  {
    slug: '/tools/send-file',
    section: 'Tools',
    title: 'File Transfer',
    description: 'Send and receive files via Telegram or Slack. Path validation and sensitive file blocking built in.',
    content: () => `
<h1>File Transfer</h1>
<p class="lead">Send files to the user via Telegram or Slack, and receive files from the user. Validates paths and blocks sensitive files.</p>

<h2>Tool Name</h2>
<p><code>send_file</code> (outbound)</p>

<h2>Parameters</h2>
${configTable([
  ['file_path', 'string', '—', 'Absolute path to the file to send (required)'],
  ['caption', 'string', 'null', 'Optional caption for the file'],
])}

<h2>Configuration</h2>
${codeBlock(`[files]
enabled = true
inbox_dir = "~/.aidaemon/files/inbox"
outbox_dirs = ["~"]
max_file_size_mb = 10
retention_hours = 24`, 'toml', 'config.toml')}

<h2>Security</h2>
<p>The tool enforces path restrictions to prevent accidental leaking of secrets:</p>
<ul>
  <li><strong>Allowed paths:</strong> Only files within <code>outbox_dirs</code> or <code>inbox_dir</code></li>
  <li><strong>Symlink resolution:</strong> Canonicalizes paths to prevent directory traversal</li>
  <li><strong>Blocked patterns:</strong> <code>.ssh</code>, <code>.gnupg</code>, <code>.env</code>, <code>credentials</code>, <code>.key</code>, <code>.pem</code>, <code>.aws/credentials</code>, <code>.netrc</code>, <code>.docker/config.json</code>, <code>config.toml</code></li>
</ul>

<h2>Inbound Files</h2>
<p>Users can send files to the bot in Telegram or Slack. aidaemon downloads them to <code>inbox_dir</code> and makes them available to the agent. Supports documents, photos, audio, video, and voice messages, up to <code>max_file_size_mb</code>.</p>

${callout('warn', 'Outbox Directories', 'The <code>outbox_dirs</code> list controls which directories the agent can send files from. Keep it as narrow as possible in production.')}
`
  },
  {
    slug: '/tools/people',
    section: 'Tools',
    title: 'People Intelligence',
    description: 'A personal contact book managed by your AI assistant. Remembers birthdays, preferences, and relationships — all stored locally on your machine.',
    content: () => `
<h1>People Intelligence</h1>
<p class="lead">Think of it as a contact book, but with a personal assistant who remembers the details for you. Birthdays, preferences, communication styles, how you know someone &mdash; aidaemon keeps it all organized and reminds you when it matters. Everything lives on your computer or server, never sent to third parties.</p>

${callout('info', 'Runtime Toggle', 'People Intelligence can be enabled or disabled at any time via chat. Just say <strong>"enable people intelligence"</strong> or use the <code>manage_people</code> tool with action <code>enable</code>/<code>disable</code>. No restart required.')}

<h2>How It Works</h2>
<ol>
  <li><strong>Add contacts</strong> &mdash; manually add people or let aidaemon learn about them from conversations</li>
  <li><strong>Remember details</strong> &mdash; birthdays, preferences, interests, work info, and more</li>
  <li><strong>Link identities</strong> &mdash; connect a person to their Telegram, Slack, or Discord identity</li>
  <li><strong>Proactive reminders</strong> &mdash; aidaemon naturally mentions upcoming birthdays and suggests reconnections</li>
  <li><strong>Context adaptation</strong> &mdash; when a known person messages, aidaemon adapts its communication style</li>
</ol>

<h2>Tool Name</h2>
<p><code>manage_people</code></p>

<h2>Actions</h2>
<table class="config-table">
<thead><tr><th>Action</th><th>Description</th><th>Required Params</th></tr></thead>
<tbody>
<tr><td><code>enable</code></td><td>Turn on People Intelligence (persists across restarts)</td><td>&mdash;</td></tr>
<tr><td><code>disable</code></td><td>Turn off People Intelligence (data is preserved)</td><td>&mdash;</td></tr>
<tr><td><code>status</code></td><td>Show enabled/disabled state and contact count</td><td>&mdash;</td></tr>
<tr><td><code>add</code></td><td>Add a new person</td><td>name</td></tr>
<tr><td><code>list</code></td><td>List all contacts (filter by relationship)</td><td>&mdash;</td></tr>
<tr><td><code>view</code></td><td>View person details and all facts</td><td>name or id</td></tr>
<tr><td><code>update</code></td><td>Update person fields (relationship, notes, style)</td><td>name or id</td></tr>
<tr><td><code>remove</code></td><td>Delete a person and all their facts</td><td>name or id</td></tr>
<tr><td><code>add_fact</code></td><td>Store a fact about someone (birthday, preference, etc.)</td><td>person_name, category, key, value</td></tr>
<tr><td><code>remove_fact</code></td><td>Delete a specific fact by ID</td><td>fact_id</td></tr>
<tr><td><code>link</code></td><td>Link a platform identity to a person</td><td>person_name, platform_id</td></tr>
<tr><td><code>export</code></td><td>Export all data for a person as JSON</td><td>person_name</td></tr>
<tr><td><code>purge</code></td><td>Full cascade delete (person + facts + links)</td><td>person_name</td></tr>
<tr><td><code>audit</code></td><td>Review auto-extracted facts (unverified)</td><td>&mdash; (or person_name)</td></tr>
<tr><td><code>confirm</code></td><td>Verify an auto-extracted fact (set confidence to 100%)</td><td>fact_id</td></tr>
</tbody>
</table>

<h2>Parameters</h2>
${configTable([
  ['action', 'string', '&mdash;', 'Action to perform (required)'],
  ['name', 'string', 'null', "Person's name (for add, view, update, remove)"],
  ['id', 'integer', 'null', "Person's database ID (for update, remove)"],
  ['relationship', 'string', 'null', 'Relationship type: spouse, family, friend, coworker, acquaintance'],
  ['notes', 'string', 'null', 'Free-form notes about the person'],
  ['communication_style', 'string', 'null', 'How to communicate: casual, formal, warm, etc.'],
  ['language', 'string', 'null', 'Preferred language for interaction'],
  ['person_name', 'string', 'null', "Person's name (for add_fact, link, export, purge, audit)"],
  ['category', 'string', 'null', 'Fact category: birthday, preference, interest, work, family, important_date, personality, gift_idea'],
  ['key', 'string', 'null', "Fact key (e.g., 'birthday', 'favorite_food')"],
  ['value', 'string', 'null', 'Fact value'],
  ['platform_id', 'string', 'null', "Platform-qualified ID (e.g., 'slack:U123', 'telegram:456')"],
  ['display_name', 'string', 'null', 'Display name for the platform identity'],
  ['fact_id', 'integer', 'null', 'Fact ID (for remove_fact, confirm)'],
])}

<h2>Enabling</h2>
<p>There are two ways to enable People Intelligence:</p>

<h3>Option 1: Via chat (recommended)</h3>
<p>Just tell your bot to enable it. The setting is stored in the database and persists across restarts.</p>
${codeBlock('You: "Enable people intelligence"\naidaemon: "People Intelligence enabled. I\'ll now remember contacts..."', 'text', 'chat')}

<h3>Option 2: Via config.toml</h3>
<p>Set the initial state in your config file. This value is used to seed the database on first run; after that, the runtime setting takes precedence.</p>
${codeBlock('[people]\nenabled = true', 'toml', 'config.toml')}

<h2>Organic Learning</h2>
<p>When <code>auto_extract</code> is enabled (default), aidaemon automatically learns about people from conversations during its regular memory consolidation cycle:</p>
<ul>
  <li>Detects mentions of people, their preferences, birthdays, and relationships</li>
  <li>Creates person records and stores facts with 70% confidence (auto-extracted)</li>
  <li>Owner can review and confirm facts via the <code>audit</code> and <code>confirm</code> actions</li>
</ul>

${callout('warn', 'Restricted Categories', 'Health info, financial details, political opinions, and religious beliefs are <strong>never</strong> auto-extracted, even if mentioned in conversation. This is enforced by <code>restricted_categories</code>.')}

<h2>Background Tasks</h2>
<p>When enabled, aidaemon runs daily background checks:</p>
<ul>
  <li><strong>Stale fact pruning</strong> &mdash; removes unconfirmed auto-extracted facts older than <code>fact_retention_days</code> (default 180)</li>
  <li><strong>Upcoming date reminders</strong> &mdash; detects birthdays and important dates within 14 days</li>
  <li><strong>Reconnect suggestions</strong> &mdash; flags people who haven't been contacted in <code>reconnect_reminder_days</code> (default 30)</li>
</ul>

<h2>Privacy Model</h2>
<table class="config-table">
<thead><tr><th>Context</th><th>Behavior</th></tr></thead>
<tbody>
<tr><td>Owner DMs</td><td>Full people graph injected into system prompt (names, facts, relationships)</td></tr>
<tr><td>Non-owner (linked)</td><td>Communication style adaptation only (no fact injection to other users)</td></tr>
<tr><td>Public channels</td><td>No personal facts injected</td></tr>
</tbody>
</table>

<h2>Configuration</h2>
${codeBlock('[people]\nenabled = true\nauto_extract = true\nauto_extract_categories = ["birthday", "preference", "interest", "work", "family", "important_date"]\nrestricted_categories = ["health", "finance", "political", "religious"]\nfact_retention_days = 180\nreconnect_reminder_days = 30', 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'Initial state (can be toggled at runtime via chat)'],
  ['auto_extract', 'bool', 'true', 'Learn facts about people from conversations automatically'],
  ['auto_extract_categories', 'string[]', '[...]', 'Categories that can be auto-extracted'],
  ['restricted_categories', 'string[]', '[...]', 'Categories that are never auto-extracted'],
  ['fact_retention_days', 'integer', '180', 'Days before unconfirmed facts are pruned'],
  ['reconnect_reminder_days', 'integer', '30', 'Days of inactivity before suggesting a reconnect'],
])}
`
  },
  {
    slug: '/mcp',
    section: 'MCP',
    title: 'MCP Overview',
    description: 'Extend aidaemon with Model Context Protocol servers for filesystem access, databases, APIs, and more.',
    content: () => `
<h1>MCP Integration</h1>
<p class="lead">Extend aidaemon with any <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener">Model Context Protocol</a> server to add filesystem access, databases, APIs, and more.</p>

<h2>How It Works</h2>
<ol>
  <li>aidaemon spawns each configured MCP server as a subprocess</li>
  <li>Communicates via JSON-RPC 2.0 over stdin/stdout</li>
  <li>Calls <code>tools/list</code> to discover available tools</li>
  <li>Each discovered tool is wrapped as a native aidaemon <code>Tool</code></li>
  <li>The LLM can call MCP tools the same way as built-in tools</li>
</ol>

<h2>Protocol Details</h2>
<ul>
  <li><strong>Protocol version:</strong> 2024-11-05</li>
  <li><strong>Client info:</strong> name="aidaemon", version="0.1.0"</li>
  <li><strong>Transport:</strong> line-delimited JSON over stdin/stdout</li>
  <li><strong>Initialization:</strong> <code>initialize</code> request → <code>notifications/initialized</code></li>
</ul>

<h2>Example</h2>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@anthropic/mcp-filesystem", "/home/user/documents"]

[mcp.sqlite]
command = "npx"
args = ["-y", "@anthropic/mcp-sqlite", "my-database.db"]

[mcp.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]`, 'toml', 'config.toml')}

${callout('info', 'Error Handling', 'If an MCP server fails to start or list tools, the error is logged but other servers and built-in tools continue to work.')}
`
  },
  {
    slug: '/mcp/configuration',
    section: 'MCP',
    title: 'MCP Server Config',
    description: 'Configure MCP servers in aidaemon config.toml. Stdio and SSE transport, environment variables, and timeouts.',
    content: () => `
<h1>MCP Server Configuration</h1>
<p class="lead">Each MCP server is defined as a named section under <code>[mcp]</code> in config.toml.</p>

<h2>Config Format</h2>
${codeBlock(`[mcp.<server-name>]
command = "<executable>"
args = ["arg1", "arg2", ...]`, 'toml')}

${configTable([
  ['command', 'string', '—', 'Executable or script to launch the MCP server'],
  ['args', 'array', '[]', 'Arguments passed to the command'],
])}

<h2>Discovery Process</h2>
<ol>
  <li>For each <code>[mcp.*]</code> section, spawn the process with the configured command and args</li>
  <li>Initialize the JSON-RPC connection (protocol handshake)</li>
  <li>Call <code>tools/list</code> to enumerate available tools</li>
  <li>Wrap each tool's name, description, and input schema as a native Tool</li>
  <li>Log any errors per-server without failing globally</li>
</ol>

<h2>Examples</h2>

<h3>Filesystem Access</h3>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@anthropic/mcp-filesystem", "/home/user/projects"]`, 'toml')}

<h3>Web Search</h3>
${codeBlock(`[mcp.brave-search]
command = "npx"
args = ["-y", "@anthropic/mcp-brave-search"]`, 'toml')}

<h3>Custom Python Server</h3>
${codeBlock(`[mcp.my-server]
command = "python3"
args = ["/path/to/my_mcp_server.py"]`, 'toml')}

${callout('info', 'Stderr Logging', 'MCP server stderr output is captured and logged by aidaemon for debugging. Check the daemon logs if a server isn\'t working.')}

<h2>Threat Detection</h2>
<p>aidaemon performs audit-only threat detection on MCP tool calls. Suspicious patterns are logged but <strong>do not block execution</strong>.</p>

<h3>Suspicious Argument Patterns</h3>
<ul>
  <li><strong>File access:</strong> <code>/etc/passwd</code>, <code>/etc/shadow</code>, <code>.ssh/</code>, <code>.env</code></li>
  <li><strong>Config/secrets:</strong> <code>config.toml</code>, <code>aidaemon.db</code>, <code>api_key</code>, <code>bot_token</code>, <code>encryption_key</code></li>
  <li><strong>Network:</strong> <code>curl</code>, <code>wget</code>, <code>nc</code>, <code>base64</code></li>
  <li><strong>Code execution:</strong> <code>eval(</code>, <code>exec(</code>, <code>| sh</code>, <code>| bash</code></li>
  <li><strong>Destructive:</strong> <code>; rm </code>, <code>chmod 777</code></li>
</ul>

<h3>Suspicious Output Patterns</h3>
<ul>
  <li>Potential API keys: <code>sk-</code>, <code>ghp_</code> prefixes</li>
  <li>Private keys: <code>-----BEGIN</code>, <code>PRIVATE KEY</code></li>
  <li>Sensitive terms: <code>password</code>, <code>bot_token</code></li>
</ul>

${callout('warn', 'Audit Only', 'Threat detection is informational — it logs warnings but does not block tool execution. Check your daemon logs for any flagged patterns.')}
`
  },
  {
    slug: '/triggers',
    section: 'Triggers',
    title: 'Email Triggers',
    description: 'Monitor email inboxes with IMAP IDLE and trigger the aidaemon agent on new messages automatically.',
    content: () => `
<h1>Email Triggers</h1>
<p class="lead">Monitor your inbox with IMAP IDLE and trigger the agent on new emails.</p>

<h2>How It Works</h2>
<ol>
  <li>aidaemon connects to the configured IMAP server with TLS</li>
  <li>Selects the configured folder (default: INBOX)</li>
  <li>Enters IMAP IDLE mode — a persistent connection that waits for new messages</li>
  <li>When a new email arrives, fetches the envelope (subject, sender)</li>
  <li>Creates an Event and broadcasts it via the internal event bus</li>
  <li>The agent processes the event and sends a notification via Telegram</li>
</ol>

<h2>Configuration</h2>
${codeBlock(`[triggers.email]
host = "imap.gmail.com"
port = 993
username = "you@gmail.com"
password = "your-app-password"
folder = "INBOX"`, 'toml', 'config.toml')}

${callout('warn', 'Gmail App Passwords', 'For Gmail with 2FA, generate an app-specific password at <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener">myaccount.google.com/apppasswords</a>.')}

<h2>Event Format</h2>
${codeBlock(`Event {
    source: "email",
    session_id: "email_trigger",
    content: "New email from sender@example.com: Subject line here"
}`, 'rust')}

<h2>Event Bus</h2>
<p>Triggers use a Tokio broadcast channel to deliver events. The agent listens on the receiver end and processes each event as a new message in its own session.</p>

${callout('danger', 'Untrusted Sessions', 'Email trigger sessions are marked as <strong>untrusted</strong>. All terminal commands in these sessions require explicit approval, regardless of the allowed_prefixes whitelist.')}

<h2>Reconnection</h2>
<p>If the IMAP connection drops, aidaemon waits 30 seconds and reconnects automatically.</p>
`
  },
  {
    slug: '/skills',
    section: 'Skills',
    title: 'Skills System',
    description: 'Dynamic prompt enhancement via markdown files. Skills inject context-specific instructions based on keyword triggers.',
    content: () => `
<h1>Skills System</h1>
<p class="lead">Dynamic prompt enhancement via markdown files. Skills inject context-specific instructions when triggered by keywords in user messages.</p>

<h2>Configuration</h2>
${codeBlock(`[skills]
dir = "skills"
enabled = true`, 'toml', 'config.toml')}

<h2>Skill File Format</h2>
<p>Skills are markdown files with YAML-like frontmatter, stored in the skills directory:</p>
${codeBlock(`---
name: Code Review
description: Provides code review guidelines
triggers: review, code review, PR, pull request
---
When reviewing code, follow these guidelines:

1. Check for security vulnerabilities
2. Verify error handling
3. Assess readability and naming
4. Look for performance issues
5. Ensure tests are adequate`, 'markdown', 'skills/code-review.md')}

<h2>Frontmatter Fields</h2>
${configTable([
  ['name', 'string', '—', 'Display name of the skill'],
  ['description', 'string', '—', 'Brief description (shown in "Available Skills" list)'],
  ['triggers', 'string', '—', 'Comma-separated keywords that activate the skill'],
])}

<h2>Hybrid Matching</h2>
<p>Skill activation uses a two-stage process:</p>
<ol>
  <li><strong>Pattern matching</strong> — whole-word, case-insensitive keyword search. If any trigger appears as a complete word in the user&rsquo;s message, the skill is a candidate.</li>
  <li><strong>LLM confirmation</strong> — the fast model validates whether each candidate skill is actually relevant to the user&rsquo;s intent. This prevents false activations from coincidental keyword matches.</li>
</ol>
<p>The confirmation step is <strong>fail-open</strong>: if the LLM call fails or times out, all pattern-matched candidates are activated.</p>

<h2>System Prompt Injection</h2>
<p>When skills are loaded, the system prompt is enhanced with:</p>
<ol>
  <li><strong>Available Skills</strong> — lists all skill names and descriptions</li>
  <li><strong>Active Skills</strong> — full body of each matched skill</li>
  <li><strong>Known Facts</strong> — stored facts (injected below skills)</li>
</ol>

${codeBlock(`## Available Skills
- Code Review: Provides code review guidelines
- DevOps: Infrastructure and deployment help

## Active Skill: Code Review
When reviewing code, follow these guidelines:
...

## Known Facts
### user
- name: David`, 'text', 'system prompt structure')}

<h2>Dynamic Skills</h2>
<p>Beyond static filesystem skills, aidaemon supports runtime skill management through the <code>manage_skills</code> tool and optional registries.</p>

<h3>manage_skills Tool Actions</h3>
<table class="config-table">
<thead><tr><th>Action</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>add</code></td><td>Fetch a skill from a URL</td></tr>
<tr><td><code>add_inline</code></td><td>Parse raw markdown content as a skill</td></tr>
<tr><td><code>list</code></td><td>Show all loaded skills with metadata</td></tr>
<tr><td><code>remove</code></td><td>Delete a skill by name</td></tr>
<tr><td><code>enable</code> / <code>disable</code></td><td>Activate or deactivate a skill</td></tr>
<tr><td><code>browse</code></td><td>Search across configured registries</td></tr>
<tr><td><code>install</code></td><td>Install from a registry</td></tr>
<tr><td><code>update</code></td><td>Re-fetch skill from source URL</td></tr>
</tbody>
</table>

<h3>Auto-Promotion</h3>
<p>A background task runs every 12 hours, evaluating frequently-used procedures for automatic promotion into reusable skills.</p>
`
  },
  {
    slug: '/scheduler',
    section: 'Scheduler',
    title: 'Scheduled Tasks',
    description: 'Create recurring and one-shot scheduled tasks with natural language or cron expressions in aidaemon.',
    content: () => `
<h1>Scheduled Tasks</h1>
<p class="lead">Create recurring and one-shot tasks with natural language or cron expressions. The agent executes the task prompt on schedule.</p>

${callout('info', 'Automations and time zones', 'Ask in plain words and the agent sets it up: <code>set_reminder</code> (a <code>message</code> and a <code>when</code>) for plain reminders, which only message you, and <code>schedule_task</code> for scheduled work. A time or recurring schedule may name an IANA zone (&ldquo;every weekday at 8am Europe/Madrid&rdquo;, &ldquo;2030-07-15 09:00 Asia/Tokyo&rdquo;) and follows its daylight saving; otherwise times are in your own zone. Abbreviations such as &ldquo;EST&rdquo; are refused with a request for the IANA name. A run missed while the daemon was off is recorded as Missed and never counts as a failure.')}

<h2>Tool Name</h2>
<p><code>scheduler</code></p>

<h2>Actions</h2>
<table class="config-table">
<thead><tr><th>Action</th><th>Required Params</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>create</code></td><td>name, schedule, prompt</td><td>Create a new scheduled task</td></tr>
<tr><td><code>list</code></td><td>—</td><td>List all tasks with status and next run time</td></tr>
<tr><td><code>delete</code></td><td>id</td><td>Delete a task by UUID</td></tr>
<tr><td><code>pause</code></td><td>id</td><td>Pause a task (stops firing)</td></tr>
<tr><td><code>resume</code></td><td>id</td><td>Resume a paused task (recomputes next run)</td></tr>
</tbody>
</table>

<h2>Create Parameters</h2>
${configTable([
  ['name', 'string', '—', 'Human-readable label for the task'],
  ['schedule', 'string', '—', 'Natural language or 5-field cron expression'],
  ['prompt', 'string', '—', 'What the agent should do when the task fires'],
  ['oneshot', 'bool', 'false', 'Fire once then auto-delete'],
  ['trusted', 'bool', 'false', 'Run with full autonomy (no terminal approval needed)'],
])}

<h2>Natural Language Schedules</h2>
<p>The scheduler parses common patterns into cron expressions:</p>

<table class="config-table">
<thead><tr><th>Input</th><th>Cron</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>hourly</code></td><td><code>0 * * * *</code></td><td>Every hour at :00</td></tr>
<tr><td><code>daily</code></td><td><code>0 0 * * *</code></td><td>Every day at midnight</td></tr>
<tr><td><code>weekly</code></td><td><code>0 0 * * 0</code></td><td>Every Sunday at midnight</td></tr>
<tr><td><code>monthly</code></td><td><code>0 0 1 * *</code></td><td>First of the month</td></tr>
<tr><td><code>every 5m</code></td><td><code>*/5 * * * *</code></td><td>Every 5 minutes</td></tr>
<tr><td><code>every 2h</code></td><td><code>0 */2 * * *</code></td><td>Every 2 hours</td></tr>
<tr><td><code>daily at 9am</code></td><td><code>0 9 * * *</code></td><td>Every day at 9:00 AM</td></tr>
<tr><td><code>daily at 14:30</code></td><td><code>30 14 * * *</code></td><td>Every day at 2:30 PM</td></tr>
<tr><td><code>weekdays at 8:30</code></td><td><code>30 8 * * 1-5</code></td><td>Mon-Fri at 8:30 AM</td></tr>
<tr><td><code>weekends at 10am</code></td><td><code>0 10 * * 0,6</code></td><td>Sat-Sun at 10:00 AM</td></tr>
<tr><td><code>in 2h</code></td><td>(computed absolute)</td><td>One-shot, fires once in 2 hours</td></tr>
<tr><td><code>in 30m</code></td><td>(computed absolute)</td><td>One-shot, fires once in 30 minutes</td></tr>
</tbody>
</table>

<p>Standard 5-field cron expressions are also accepted directly (e.g., <code>0 9 * * 1-5</code>).</p>

<h2>Configuration</h2>
${codeBlock(`[scheduler]
enabled = true
tick_interval_secs = 30

[[scheduler.tasks]]
name = "Morning check-in"
schedule = "weekdays at 9am"
prompt = "Check system health and report any issues"
trusted = true

[[scheduler.tasks]]
name = "Backup reminder"
schedule = "weekly"
prompt = "Remind me to run backups"`, 'toml', 'config.toml')}

<h2>Task Storage</h2>
<p>Tasks are persisted in SQLite (<code>scheduled_tasks</code> table). Config-defined tasks are synced on startup — removed tasks are cleaned up automatically. Tasks created via the tool persist indefinitely.</p>

<h2>Missed Tasks</h2>
<p>On startup, the scheduler checks for tasks that should have fired while the daemon was down. Missed tasks are fired immediately during recovery.</p>

${callout('warn', 'Trusted vs Untrusted', 'Trusted tasks run with full terminal access (no approval needed). Untrusted tasks (default) require approval for any terminal commands, just like email trigger sessions.')}
`
  },
  {
    slug: '/router',
    section: 'Router',
    title: 'Model Routing',
    description: 'Automatic model tier routing: Fast, Primary, or Smart. Keyword heuristics and message length classification.',
    content: () => `
<h1>Model Routing</h1>
<p class="lead">Automatic tier-based model selection routes each query to the most appropriate model: Fast, Primary, or Smart.</p>

<h2>Tiers</h2>
<table class="config-table">
<thead><tr><th>Tier</th><th>Use Case</th><th>Typical Model</th></tr></thead>
<tbody>
<tr><td><strong>Fast</strong></td><td>Intent-gate, greetings, yes/no, short lookups</td><td>mistral-small-3.1-24b-instruct, mistral-nemo, gpt-5-nano</td></tr>
<tr><td><strong>Primary</strong></td><td>General conversation and most tool-enabled tasks</td><td>gpt-5-mini, claude-sonnet-4.5, gemini-3-flash-preview</td></tr>
<tr><td><strong>Smart</strong></td><td>High-stakes or long-form complex execution</td><td>gpt-5.1, claude-opus-4.6, gemini-3-pro-preview</td></tr>
</tbody>
</table>

<h2>Fast Tier Model Guidance</h2>
<p>Use a cheap, low-latency, non-reasoning instruct model for <code>provider.models.fast</code>. The fast tier is mostly an intent gate and routing pass, not deep execution.</p>
<ul>
  <li><strong>Good fast picks:</strong> <code>mistralai/mistral-small-3.1-24b-instruct</code>, <code>mistralai/mistral-nemo</code>, <code>google/gemma-3-12b-it</code></li>
  <li><strong>Avoid in fast tier:</strong> heavy reasoning/thinking models that burn extra tokens on classification-only turns</li>
  <li><strong>If unsure:</strong> start with <code>fast=mistralai/mistral-small-3.1-24b-instruct</code>, <code>primary=openai/gpt-5-mini</code>, <code>smart=openai/gpt-5.1</code></li>
</ul>

<h2>Classification Rules</h2>

<h3>Smart Tier (complex tasks)</h3>
<p>A query is classified as Smart if any of these are true:</p>
<ul>
  <li>Contains a code fence (<code>\`\`\`</code>)</li>
  <li>Message length &gt; 500 characters</li>
  <li>Contains 3+ question marks</li>
  <li>Contains keywords: <em>implement, refactor, debug, analyze, step by step, write code, architecture, optimize, algorithm, explain how, write a, build a, create a function, design, compare and contrast, walk me through, troubleshoot, review this, fix this, rewrite</em></li>
</ul>

<h3>Fast Tier (simple queries)</h3>
<p>A query is classified as Fast if any of these are true:</p>
<ul>
  <li>Exact match greetings/acknowledgments: <em>hi, hello, hey, thanks, ok, yes, no, sure, bye, goodbye, ty, cool, nice, great, awesome, lol, haha, wow</em> (case insensitive)</li>
  <li>Single word message</li>
  <li>Short message: &lt;20 chars AND &le;3 words</li>
  <li>Simple lookup prefix (<em>what is, who is, define, when is, where is</em>) + &le;6 total words</li>
</ul>

<h3>Primary Tier (default)</h3>
<p>Everything else falls to the Primary tier.</p>

<h2>Disabling Auto-Routing</h2>
<ul>
  <li>If all three model tiers are the same, routing is automatically disabled</li>
  <li>Sending <code>/model &lt;name&gt;</code> in Telegram disables routing (manual override)</li>
  <li>Sending <code>/auto</code> re-enables automatic routing</li>
</ul>
`
  },
  {
    slug: '/cost-tracking',
    section: 'Cost Tracking',
    title: 'Token Usage & Budgets',
    description: 'Track token consumption per model and session. Set daily budgets and check stats via /cost command.',
    content: () => `
<h1>Token Usage &amp; Cost Tracking</h1>
<p class="lead">Track token consumption per model and session. Set daily budgets to control spending. Check stats from Telegram with <code>/cost</code>.</p>

<h2>How It Works</h2>
<ol>
  <li>Every LLM call records input and output tokens to the <code>token_usage</code> SQLite table</li>
  <li>Each record includes: model name, session ID, token counts, and timestamp</li>
  <li>Optionally, set a daily token budget that blocks LLM calls once exceeded</li>
  <li>Budget resets automatically at midnight UTC</li>
</ol>

<h2>Configuration</h2>
${configTable([
  ['daily_token_budget', 'integer', 'null', 'Maximum total tokens (input + output) per day. Null = unlimited.'],
])}

${codeBlock(`[state]
daily_token_budget = 1000000  # 1M tokens per day`, 'toml', 'config.toml')}

${callout('info', 'Budget Scope', 'The daily budget is global — it counts all tokens across all sessions and models. When exceeded, LLM calls return an error until midnight UTC.')}

<h2>Telegram /cost Command</h2>
<p>Send <code>/cost</code> in Telegram to view usage statistics:</p>
${codeBlock(`Token usage (last 24h):
  Input:  12,450 tokens
  Output: 8,230 tokens

Token usage (last 7d):
  Input:  87,320 tokens
  Output: 52,180 tokens

Top models (7d):
  gemini-3-flash-preview: 98,400 tokens
  gemini-3-pro-preview: 41,100 tokens`, 'text')}

<h2>Database Schema</h2>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Auto-incrementing primary key'],
  ['session_id', 'TEXT', '—', 'Which user/chat session made the call'],
  ['model', 'TEXT', '—', 'Which LLM model was used'],
  ['input_tokens', 'INTEGER', '—', 'Tokens sent to the model'],
  ['output_tokens', 'INTEGER', '—', 'Tokens generated by the model'],
  ['created_at', 'TEXT', 'now', 'UTC timestamp of the call'],
])}

<h2>What&rsquo;s Tracked</h2>
<ul>
  <li>Input tokens (context + user message) per LLM call</li>
  <li>Output tokens (model response) per LLM call</li>
  <li>Model name for per-model breakdowns</li>
  <li>Session ID for per-user tracking</li>
  <li>Timestamp for time-windowed queries (24h, 7d)</li>
</ul>
`
  },
  {
    slug: '/architecture',
    section: 'Architecture',
    title: 'Agent Loop & Error Recovery',
    description: 'The aidaemon agentic loop: message handling, LLM calls, tool execution, stall detection, and error recovery.',
    content: () => `
<h1>Agent Loop &amp; Error Recovery</h1>
<p class="lead">The core agentic loop: receive message, call LLM, execute tools, iterate, respond.</p>

<h2>Agent Loop Flow</h2>
<ol>
  <li><strong>Persist user message</strong> — stored with importance score</li>
  <li><strong>Auto-route model</strong> — classify query complexity (if not overridden)</li>
  <li><strong>Build system prompt</strong> — base prompt + matched skills + known facts</li>
  <li><strong>Retrieve context</strong> — tri-hybrid memory retrieval</li>
  <li><strong>Iterate</strong> (up to <code>max_iterations</code>):
    <ul>
      <li>Collect pinned old memories + recent messages (deduplicated)</li>
      <li>Build OpenAI-format message list</li>
      <li>Call LLM with error-classified recovery</li>
      <li>If tool calls → execute each, persist results, continue loop</li>
      <li>If no tool calls OR final iteration → return text response</li>
    </ul>
  </li>
  <li><strong>Max iterations reached</strong> → return timeout message</li>
</ol>

<h2>Dynamic Iteration Budget</h2>
<p>The agent has a built-in <code>request_more_iterations</code> tool that extends the loop budget when the current limit is insufficient:</p>
<ul>
  <li>Extends budget by <strong>10 iterations</strong> per call</li>
  <li>Hard cap prevents unlimited extension (typically 25 total)</li>
  <li>Requires a <code>reason</code> parameter explaining what remains to be done</li>
  <li>Used when the agent has a clear plan but would otherwise run out of iterations mid-task</li>
</ul>

<h2>Error Recovery Strategy</h2>
<p>The <code>call_llm_with_recovery</code> method classifies errors and responds accordingly:</p>

<table class="config-table">
<thead><tr><th>Error Type</th><th>Strategy</th></tr></thead>
<tbody>
<tr><td><strong>Auth / Billing</strong></td><td>Return immediately to user — no retry</td></tr>
<tr><td><strong>Rate Limit</strong></td><td>Wait <code>retry_after_secs</code> (capped at 60s), retry once</td></tr>
<tr><td><strong>Timeout / Network / Server Error</strong></td><td>Wait 2s, retry once; on failure, fall back to previous model</td></tr>
<tr><td><strong>Not Found (bad model)</strong></td><td>Immediately switch to fallback model</td></tr>
<tr><td><strong>Unknown</strong></td><td>Propagate as error</td></tr>
</tbody>
</table>

${callout('info', 'Last Known Good', 'After every successful LLM call, the current config is saved as <code>config.toml.lastgood</code>. This enables automatic recovery from bad config changes.')}

<h2>Message Ordering Fixup</h2>
<p>To satisfy constraints across Gemini, Anthropic, and OpenAI providers, aidaemon runs a three-pass fixup on the message history before each LLM call:</p>
<ol>
  <li><strong>Pass 1:</strong> Merge consecutive same-role messages (combines tool_calls arrays)</li>
  <li><strong>Pass 2:</strong> Drop orphaned tool results (no matching assistant tool_call) and strip orphaned tool_calls (no matching tool result)</li>
  <li><strong>Pass 3:</strong> Merge again after orphan removal may create new consecutive same-role messages</li>
</ol>

<h2>Tool Execution</h2>
<p>During the loop, each tool call receives:</p>
<ul>
  <li><code>_session_id</code> — injected automatically for session tracking</li>
  <li><code>_untrusted_source</code> — flag set for trigger-originated sessions</li>
</ul>

<h2>Stall &amp; Repetition Detection</h2>
<p>The agent loop includes safeguards against getting stuck:</p>
<ul>
  <li><strong>Stall detection</strong> &mdash; if the same tool is called 3+ times consecutively with similar arguments, the loop breaks</li>
  <li><strong>Repetition detection</strong> &mdash; detects repeated response text and forces a break</li>
  <li><strong>Hard iteration limit</strong> &mdash; default 10, extendable to 25 via <code>request_more_iterations</code></li>
</ul>

<h2>Session Types</h2>
<table class="config-table">
<thead><tr><th>Session Type</th><th>Format</th><th>Trusted</th></tr></thead>
<tbody>
<tr><td>Telegram chat</td><td>Chat ID as string</td><td>Yes</td></tr>
<tr><td>Slack channel</td><td><code>slack:{channel_id}</code> or <code>slack:{channel_id}:{thread_ts}</code></td><td>Yes</td></tr>
<tr><td>Discord channel</td><td><code>discord:{channel_id}</code></td><td>Yes</td></tr>
<tr><td>Email trigger</td><td><code>email_trigger</code></td><td>No</td></tr>
<tr><td>Event trigger</td><td><code>event_{uuid}</code></td><td>No</td></tr>
<tr><td>Sub-agent</td><td><code>sub-{depth}-{uuid}</code></td><td>Inherited</td></tr>
</tbody>
</table>
`
  },
  {
    slug: '/architecture/state',
    section: 'Architecture',
    title: 'State Management & Memory',
    description: 'SQLite-backed persistence with semantic search via embeddings, tri-hybrid retrieval, and memory layers.',
    content: () => `
<h1>State Management &amp; Memory</h1>
<p class="lead">SQLite-backed persistence with in-memory working memory, semantic search via embeddings, and tri-hybrid retrieval.</p>

${callout('info', 'v0.9.x update', 'Canonical conversation persistence is now the <code>events</code> table. Legacy <code>messages</code> data is migrated into events during upgrade.')}

<h2>Database Schema</h2>

<h3>messages table</h3>
${configTable([
  ['id', 'TEXT PK', '—', 'UUID primary key'],
  ['session_id', 'TEXT', '—', 'Session identifier (indexed)'],
  ['role', 'TEXT', '—', 'user, assistant, or tool'],
  ['content', 'TEXT', 'null', 'Message text content'],
  ['tool_call_id', 'TEXT', 'null', 'ID for tool result messages'],
  ['tool_name', 'TEXT', 'null', 'Tool name for tool messages'],
  ['tool_calls_json', 'TEXT', 'null', 'JSON array of tool calls'],
  ['created_at', 'TEXT', '—', 'RFC3339 timestamp'],
  ['importance', 'REAL', '0.5', 'Importance score (0.0–1.0)'],
  ['embedding', 'BLOB', 'null', 'JSON-encoded Vec&lt;f32&gt; embedding'],
  ['embedding_error', 'TEXT', 'null', 'Error message if embedding failed'],
  ['consolidated_at', 'TEXT', 'null', 'Memory consolidation timestamp'],
])}

<h3>facts table</h3>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Auto-incrementing primary key'],
  ['category', 'TEXT', '—', 'Grouping category'],
  ['key', 'TEXT', '—', 'Fact key (unique per category)'],
  ['value', 'TEXT', '—', 'Fact content'],
  ['source', 'TEXT', '""', 'Who stored it: "agent" or "user"'],
  ['created_at', 'TEXT', '—', 'RFC3339 timestamp'],
  ['updated_at', 'TEXT', '—', 'RFC3339 timestamp'],
])}

<h3>macros table</h3>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Auto-incrementing primary key'],
  ['trigger_tool', 'TEXT', '&mdash;', 'Tool that triggers the macro'],
  ['trigger_args_pattern', 'TEXT', 'null', 'Arguments pattern to match'],
  ['next_tool', 'TEXT', '&mdash;', 'Tool to chain next'],
  ['next_args', 'TEXT', '&mdash;', 'Arguments for the chained tool'],
  ['confidence', 'REAL', '0.0', 'Confidence score for the macro'],
  ['used_count', 'INTEGER', '0', 'Number of times the macro has been used'],
  ['created_at', 'TEXT', '&mdash;', 'RFC3339 timestamp'],
  ['updated_at', 'TEXT', '&mdash;', 'RFC3339 timestamp'],
])}

<h3>scheduled_tasks table</h3>
${configTable([
  ['id', 'TEXT PK', '—', 'UUID primary key'],
  ['name', 'TEXT', '—', 'Human-readable task label'],
  ['cron_expr', 'TEXT', '—', 'Computed 5-field cron expression'],
  ['original_schedule', 'TEXT', '—', 'User input (natural language or cron)'],
  ['prompt', 'TEXT', '—', 'Agent prompt to execute on schedule'],
  ['source', 'TEXT', '—', '"tool" (created via tool) or "config" (from config.toml)'],
  ['is_oneshot', 'INTEGER', '0', 'Fire once then auto-delete'],
  ['is_paused', 'INTEGER', '0', 'Paused tasks do not fire'],
  ['is_trusted', 'INTEGER', '0', 'Trusted tasks skip terminal approval'],
  ['next_run_at', 'TEXT', '—', 'RFC3339 timestamp of next scheduled run'],
  ['last_run_at', 'TEXT', 'null', 'RFC3339 timestamp of last execution'],
  ['created_at', 'TEXT', '—', 'RFC3339 timestamp'],
  ['updated_at', 'TEXT', '—', 'RFC3339 timestamp'],
])}

<h3>terminal_allowed_prefixes table</h3>
${configTable([
  ['prefix', 'TEXT PK', '—', 'Command prefix persisted from "Allow Always" approvals'],
])}

<h2>Working Memory</h2>
<p>An in-memory <code>HashMap&lt;String, VecDeque&lt;Message&gt;&gt;</code> per session, capped at <code>working_memory_cap</code> (default 50). Avoids database hits for recent conversation history.</p>

<h2>Tri-Hybrid Retrieval</h2>
<p>The <code>get_context</code> method combines three retrieval strategies:</p>

<table class="config-table">
<thead><tr><th>Strategy</th><th>Source</th><th>Limit</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td><strong>Recency</strong></td><td>Last N messages</td><td>10</td><td>Conversational continuity</td></tr>
<tr><td><strong>Salience</strong></td><td>importance &ge; 0.8</td><td>5</td><td>Critical flagged memories</td></tr>
<tr><td><strong>Relevance</strong></td><td>Vector similarity &gt; 0.65</td><td>5</td><td>Semantic search via embeddings</td></tr>
</tbody>
</table>

<p>Results are deduplicated by message ID before being included in context.</p>

<h2>Embedding Service</h2>
<ul>
  <li><strong>Model:</strong> AllMiniLML6V2 (via fastembed)</li>
  <li>Runs in background — embeds new messages after they are appended</li>
  <li>Enables the relevance leg of tri-hybrid retrieval</li>
</ul>

<h2>Memory Consolidation</h2>
<p>A background task runs every <code>consolidation_interval_hours</code> (default 6). It compresses old conversations into summaries using the fast model, reducing storage and context window usage.</p>

<h2>Importance Scoring</h2>
<table class="config-table">
<thead><tr><th>Role</th><th>Default Score</th></tr></thead>
<tbody>
<tr><td>User message</td><td>0.5</td></tr>
<tr><td>Assistant response</td><td>0.5</td></tr>
<tr><td>Tool output</td><td>0.3</td></tr>
<tr><td>System message</td><td>0.1</td></tr>
</tbody>
</table>

<h2>Connection Pool</h2>
<ul>
  <li>SQLite pool: max 5 connections</li>
  <li>Journal mode: WAL (Write-Ahead Logging) for concurrent reads</li>
  <li>Auto-creates database and tables if missing</li>
</ul>
`
  },
  {
    slug: '/service-install',
    section: 'Service',
    title: 'Run as a Service',
    description: 'Run aidaemon at login with aidaemon service install (launchd, systemd user unit, Windows logon task), or as a system-wide service.',
    content: () => `
<h1>Service Installation</h1>
<p class="lead">Keep aidaemon running in the background, starting at login.</p>

<h2>For this user (recommended)</h2>
${codeBlock(`aidaemon service install      # this user, at login, from ~/.aidaemon (--dir to change); starts it now
aidaemon service uninstall`, 'bash')}
<p>No administrator rights needed. This is what the app's <strong>Run it here</strong> does on first run: a launchd agent on macOS, a systemd user unit on Linux (lingering is turned on so it outlives your login session), and a logon task on Windows. The macOS app download runs the daemon from inside <code>AIdaemon.app</code> instead.</p>

<h2>System-wide (legacy)</h2>
${codeBlock(`./aidaemon install-service`, 'bash')}

<p><code>install-service</code> still writes the system-wide unit on Linux (needs sudo) or the launch agent on macOS without starting it. It auto-detects the platform:</p>

<h2>Linux (systemd)</h2>
<p>Creates <code>/etc/systemd/system/aidaemon.service</code>:</p>
${codeBlock(`[Unit]
Description=aidaemon AI Agent
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/full/path/to/aidaemon
WorkingDirectory=/path/to/config/dir
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target`, 'ini', 'aidaemon.service')}

<p>Then enables and starts the service:</p>
${codeBlock(`sudo systemctl daemon-reload
sudo systemctl enable --now aidaemon`, 'bash')}

<h2>macOS (launchd)</h2>
<p>Creates <code>$HOME/Library/LaunchAgents/ai.aidaemon.plist</code>:</p>
${codeBlock(`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>ai.aidaemon</string>
    <key>ProgramArguments</key>
    <array>
        <string>/full/path/to/aidaemon</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/aidaemon.stdout.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/aidaemon.stderr.log</string>
</dict>
</plist>`, 'xml', 'ai.aidaemon.plist')}

<p>Then loads the service:</p>
${codeBlock(`launchctl load ~/Library/LaunchAgents/ai.aidaemon.plist`, 'bash')}

${callout('warning', 'Prevent macOS Sleep', 'macOS may suspend background processes when the system sleeps. To keep aidaemon running continuously, use <code>caffeinate</code>:<br><br><code>caffeinate -s aidaemon</code><br><br>The <code>-s</code> flag prevents sleep while the process is running. You can also use <code>caffeinate -i</code> to prevent idle sleep without keeping the display on. If running as a launchd service, add <code>caffeinate -s</code> before the binary path in your plist <code>ProgramArguments</code>.')}

<h2>Health Check</h2>
<p>Once running as a service, verify with:</p>
${codeBlock(`curl http://127.0.0.1:8080/health
# {"status": "ok"}`, 'bash')}

<p>The health endpoint is served by axum on the configured <code>daemon.health_bind:daemon.health_port</code>.</p>
`
  },
  {
    slug: '/event-sourcing',
    section: 'Event Sourcing',
    title: 'Event System',
    description: 'Immutable event log for all agent actions. Daily consolidation into facts and procedures. Session context.',
    content: () => `
<h1>Event Sourcing</h1>
<p class="lead">Every agent action is recorded as an immutable event. Events are the single source of truth for what happened during a session.</p>

<h2>Event Types</h2>
<p>The system tracks 16 event types across 6 categories:</p>

<table class="config-table">
<thead><tr><th>Category</th><th>Event Type</th><th>Description</th></tr></thead>
<tbody>
<tr><td rowspan="2"><strong>Session</strong></td><td><code>SessionStart</code></td><td>New conversation session begins</td></tr>
<tr><td><code>SessionEnd</code></td><td>Session terminated</td></tr>
<tr><td rowspan="2"><strong>Conversation</strong></td><td><code>UserMessage</code></td><td>User sends a message</td></tr>
<tr><td><code>AssistantResponse</code></td><td>Agent sends a response</td></tr>
<tr><td rowspan="2"><strong>Tools</strong></td><td><code>ToolCall</code></td><td>Agent invokes a tool</td></tr>
<tr><td><code>ToolResult</code></td><td>Tool execution completes</td></tr>
<tr><td><strong>Thinking</strong></td><td><code>ThinkingStart</code></td><td>Agent begins reasoning</td></tr>
<tr><td rowspan="2"><strong>Tasks</strong></td><td><code>TaskStart</code></td><td>Agent begins a task</td></tr>
<tr><td><code>TaskEnd</code></td><td>Task completes (with status)</td></tr>
<tr><td><strong>Errors</strong></td><td><code>Error</code></td><td>Error occurs during processing</td></tr>
<tr><td rowspan="2"><strong>Sub-Agents</strong></td><td><code>SubAgentSpawn</code></td><td>Sub-agent is spawned</td></tr>
<tr><td><code>SubAgentComplete</code></td><td>Sub-agent finishes</td></tr>
<tr><td rowspan="3"><strong>Approvals</strong></td><td><code>ApprovalRequested</code></td><td>Command approval request sent</td></tr>
<tr><td><code>ApprovalGranted</code></td><td>User approved a command</td></tr>
<tr><td><code>ApprovalDenied</code></td><td>User denied a command</td></tr>
</tbody>
</table>

<h2>Event Structure</h2>
${codeBlock(`struct Event {
    id: i64,              // Auto-incrementing ID
    session_id: String,   // Session identifier
    event_type: EventType,// One of the 16 types above
    data: JsonValue,      // Event-specific payload
    created_at: DateTime, // Timestamp
    consolidated_at: Option<DateTime>, // When processed
    task_id: Option<String>,   // Associated goal/task run
    tool_name: Option<String>, // For tool events
}`, 'rust')}

<h2>Daily Consolidation</h2>
<p>A background task runs at <strong>3:00 AM UTC</strong> daily and processes unconsolidated events:</p>
<ol>
  <li><strong>Fact extraction</strong> &mdash; the LLM analyzes event sequences to extract durable facts</li>
  <li><strong>Procedure learning</strong> &mdash; repeated tool-call patterns are captured as procedures</li>
  <li><strong>Error solution tracking</strong> &mdash; errors and their resolutions are paired for future debugging</li>
</ol>
<p>After processing, events are marked with a <code>consolidated_at</code> timestamp.</p>

<h2>Session Context</h2>
<p>The event system provides a session summary for LLM context that includes tools used, errors encountered, approvals granted/denied, and sub-agent activity.</p>

<h2>Event Pruning</h2>
<p>A background task runs at <strong>3:30 AM UTC</strong> and removes events older than the retention period (default 30 days).</p>

${callout('info', 'Immutability', 'Events are append-only. The <code>consolidated_at</code> field is the only field ever updated after creation.')}
`
  },
  {
    slug: '/plans',
    section: 'Plans',
    title: 'Plans (Legacy)',
    description: 'Legacy reference for old plan-based execution. Current aidaemon versions use goals and tasks.',
    content: () => `
<h1>Plans (Legacy)</h1>
<p class="lead">This page is for older setups. Current aidaemon versions run work with goals and tasks.</p>

${callout('warning', 'v0.9.x update', 'Plans are no longer the main execution path. aidaemon now breaks work into goals and tasks.')}

<h2>Use these pages now</h2>
<ul>
  <li><a href="/tools">Tools</a> — how work is run in the current system</li>
  <li><a href="/scheduler">Scheduled Tasks</a> — recurring or one-time automation</li>
  <li><a href="/event-sourcing">Event Sourcing</a> — full history of what happened</li>
</ul>

<h2>When this page matters</h2>
<p>If you still run an older release that uses plans, this page remains as a legacy reference.</p>
`
  },
  {
    slug: '/health-monitoring',
    section: 'Health Monitoring',
    title: 'Service Probes',
    description: 'Define HTTP, TCP, command, and file health probes for your services with alerting and trend tracking.',
    content: () => `
<h1>Health Monitoring</h1>
<p class="lead">Define health probes for your services and get alerted when something breaks.</p>

<h2>Probe Types</h2>
<table class="config-table">
<thead><tr><th>Type</th><th>Target Format</th><th>What It Checks</th></tr></thead>
<tbody>
<tr><td><code>http</code></td><td>URL</td><td>HTTP status code, response body, latency</td></tr>
<tr><td><code>port</code></td><td>host:port</td><td>TCP connectivity</td></tr>
<tr><td><code>command</code></td><td>Shell command</td><td>Exit code matches expected (default: 0)</td></tr>
<tr><td><code>file</code></td><td>File path</td><td>File exists and is not older than max_age_secs</td></tr>
</tbody>
</table>

<h2>Configuration</h2>
${codeBlock(`[health]
enabled = true
tick_interval_secs = 30
result_retention_days = 7

[[health.probes]]
name = "API Server"
probe_type = "http"
target = "https://api.example.com/health"
schedule = "every 5m"
consecutive_failures_alert = 3
latency_threshold_ms = 2000
alert_session_ids = ["123456789"]

[[health.probes]]
name = "Database"
probe_type = "port"
target = "localhost:5432"
schedule = "every 1m"`, 'toml', 'config.toml')}

<h2>HTTP Probe Options</h2>
${configTable([
  ['timeout_secs', 'integer', '10', 'Request timeout in seconds'],
  ['expected_status', 'integer', '200', 'Expected HTTP status code'],
  ['expected_body', 'string', 'null', 'Expected substring in response body'],
  ['method', 'string', '"GET"', 'HTTP method'],
  ['headers', 'object', '{}', 'Custom HTTP headers'],
])}

<h2>Alerting</h2>
<p>When a probe fails <code>consecutive_failures_alert</code> times in a row, an alert is sent to all session IDs in <code>alert_session_ids</code>.</p>

<h2>Background Tasks</h2>
<ul>
  <li><strong>Tick loop</strong> &mdash; runs every <code>tick_interval_secs</code> (default 30), executes due probes</li>
  <li><strong>Cleanup</strong> &mdash; runs at <strong>3:40 AM UTC</strong>, removes old results</li>
</ul>

${callout('info', 'Dynamic Probes', 'Probes can also be created at runtime by the agent via the <code>health_probe</code> tool.')}
`
  },
  {
    slug: '/updates',
    section: 'Updates',
    title: 'Self-Updater',
    description: 'Auto-update aidaemon from GitHub releases. Three modes: notify, download, or auto-install.',
    content: () => `
<h1>Self-Updater</h1>
<p class="lead">aidaemon can check for new releases on GitHub and update itself automatically.</p>

<h2>Recent Release Highlights</h2>
<ul>
  <li><strong>v0.21.0</strong> &mdash; Read aloud in the app, replies that stream as they are written, Anthropic's one-hour prompt cache kept across deferred tool loads, and fixes for Anthropic base URLs ending in <code>/v1</code> and for Gemini tool calls</li>
  <li><strong>v0.20.0</strong> &mdash; the AIDaemon app for desktop, web and terminal; macOS, Windows and ARM64 Linux downloads; first run from the app; live views of the agent's browser; coding agent permission modes; project files and project memory; model auto-upgrades; usage meters; schedules in any time zone</li>
  <li><strong>v0.9.2</strong> &mdash; better tool reliability, stronger intent checks, safer background command handling, and path aliases</li>
  <li><strong>v0.9.1</strong> &mdash; improved follow-up context, project scope constraints, graceful stall handling, and hard blocks for dangerous deletes</li>
  <li><strong>v0.9.0</strong> &mdash; consultant system rollout, major agent refactor, shared runtime reloads, and canonical event migration</li>
</ul>

<h2>Update Modes</h2>
<table class="config-table">
<thead><tr><th>Mode</th><th>Behavior</th></tr></thead>
<tbody>
<tr><td><code>enable</code></td><td>Automatically download and apply updates, then restart</td></tr>
<tr><td><code>check_only</code> (default)</td><td>Notify and wait for approval before applying</td></tr>
<tr><td><code>disable</code></td><td>No update checks</td></tr>
</tbody>
</table>

<h2>Configuration</h2>
${codeBlock(`[updates]
mode = "check_only"
check_interval_hours = 24
check_at_utc_hour = 6
confirmation_timeout_mins = 60`, 'toml', 'config.toml')}

${configTable([
  ['mode', 'string', '"check_only"', 'Update mode: enable, check_only, or disable'],
  ['check_interval_hours', 'integer', '24', 'Hours between update checks'],
  ['check_at_utc_hour', 'integer', 'null', 'Specific UTC hour (0-23) for daily check'],
  ['confirmation_timeout_mins', 'integer', '60', 'Minutes to wait for user approval'],
])}

<h2>Update Process</h2>
<ol>
  <li><strong>Check</strong> &mdash; queries GitHub Releases API</li>
  <li><strong>Compare</strong> &mdash; semver comparison</li>
  <li><strong>Notify</strong> &mdash; sends release notes to channels</li>
  <li><strong>Approve</strong> (check_only) &mdash; approval request with timeout</li>
  <li><strong>Download</strong> &mdash; platform-specific binary</li>
  <li><strong>Replace</strong> &mdash; overwrites current binary</li>
  <li><strong>Restart</strong> &mdash; exits with code 75 to trigger service restart</li>
</ol>

<h2>Platform Support</h2>
<table class="config-table">
<thead><tr><th>Platform</th><th>Architecture</th></tr></thead>
<tbody>
<tr><td>Linux</td><td>x86_64, aarch64</td></tr>
<tr><td>macOS</td><td>x86_64, aarch64</td></tr>
</tbody>
</table>

${callout('info', 'macOS app download', 'The daemon inside <code>AIdaemon.app</code> does not replace itself: it says when a new version is out, and you install the new <code>.dmg</code> from the <a href="https://github.com/davo20019/aidaemon/releases/latest">latest release</a> to update both.')}
${callout('warn', 'Homebrew Users', 'If installed via Homebrew, use <code>brew upgrade aidaemon</code> instead, or set <code>mode = "disable"</code>.')}
`
  },
  {
    slug: '/terminal/self-hosting',
    section: 'Terminal',
    title: 'Self-Hosting the Terminal Broker',
    description: 'Deploy your own terminal broker on Cloudflare Workers for full control over the relay infrastructure between Telegram and your local machine.',
    content: () => `
<h1>Self-Hosting the Terminal Broker</h1>
<p class="lead">The terminal feature lets you run CLI agents (Claude, Codex, Gemini) directly from Telegram. By default it uses the shared hosted broker at <code>terminal.aidaemon.ai</code>. Self-hosting gives you full control over the relay infrastructure.</p>

<h2>Architecture</h2>
<p>The terminal system has three components:</p>
<ul>
  <li><strong>aidaemon daemon</strong> (Rust) &mdash; runs on your machine, spawns PTY sessions, bridges to the broker via WebSocket</li>
  <li><strong>Broker</strong> (Cloudflare Worker) &mdash; WebSocket relay between the Mini App and the daemon. Handles auth, rate limiting, and session management</li>
  <li><strong>Mini App</strong> (embedded in broker) &mdash; Telegram Mini App frontend with xterm.js terminal emulator</li>
</ul>

${codeBlock(`Telegram ──> Mini App (browser) <──WSS──> Broker (CF Worker) <──WSS──> aidaemon daemon ──> local PTY

                                        ┌───────────────────┐
  ┌──────────┐    ┌──────────────────┐   │  Cloudflare        │   ┌────────────────┐   ┌───────────┐
  │ Telegram │───>│ Mini App         │<─>│  Worker (Broker)   │<─>│ aidaemon       │──>│ local PTY │
  │          │    │ (xterm.js)       │   │  - auth            │   │ (terminal      │   │ (bash,    │
  │          │    │                  │   │  - rate limiting   │   │  bridge)       │   │  zsh...)  │
  └──────────┘    └──────────────────┘   │  - session mgmt   │   └────────────────┘   └───────────┘
                         WSS             └───────────────────┘          WSS`, 'text', 'architecture')}

${callout('info', 'End-to-End Encryption', 'The broker is a transparent relay &mdash; it never sees the actual terminal content. All terminal I/O is encrypted between the Mini App and your daemon.')}

<h2>Prerequisites</h2>
<ul>
  <li><strong>Cloudflare account</strong> &mdash; free tier is sufficient for personal use</li>
  <li><strong>A Telegram bot</strong> &mdash; created via <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a></li>
  <li><strong>aidaemon installed and running</strong> &mdash; with the Telegram channel configured (<a href="/telegram">Telegram setup guide</a>)</li>
  <li><strong>Node.js 18+</strong> and <strong>npm</strong> &mdash; for the <a href="https://developers.cloudflare.com/workers/wrangler/" target="_blank" rel="noopener">wrangler CLI</a></li>
</ul>

<h2>Step 1 &mdash; Clone the Broker</h2>
<p>The broker is a standalone Cloudflare Worker project. Clone it and install dependencies:</p>
${codeBlock(`git clone https://github.com/davo20019/terminal.aidaemon.ai.git
cd terminal.aidaemon.ai
npm install`, 'bash')}

<h2>Step 2 &mdash; Configure Deployment</h2>
<p>Open <code>wrangler.toml</code> and choose how you want to deploy:</p>

<h3>Option A: workers.dev Subdomain (Simplest)</h3>
<p>If you don't have a custom domain, use Cloudflare's free <code>*.workers.dev</code> subdomain. Comment out or remove the <code>routes</code> block:</p>
${codeBlock(`name = "terminal-broker"
main = "src/index.js"
compatibility_date = "2024-12-05"
compatibility_flags = ["nodejs_compat"]

# No routes block = uses your-name.workers.dev
# Your broker URL will be: https://terminal-broker.<your-subdomain>.workers.dev

[durable_objects]
bindings = [
  { name = "TERMINAL_SESSION", class_name = "TerminalSession" }
]

[[migrations]]
tag = "v1"
new_classes = ["TerminalSession"]`, 'toml', 'wrangler.toml (workers.dev)')}

<h3>Option B: Custom Domain</h3>
<p>If you have a domain on Cloudflare DNS, set up a route to it:</p>
${codeBlock(`name = "terminal-broker"
main = "src/index.js"
compatibility_date = "2024-12-05"
compatibility_flags = ["nodejs_compat"]

routes = [
  { pattern = "terminal.yourdomain.com", zone_name = "yourdomain.com" }
]

[durable_objects]
bindings = [
  { name = "TERMINAL_SESSION", class_name = "TerminalSession" }
]

[[migrations]]
tag = "v1"
new_classes = ["TerminalSession"]`, 'toml', 'wrangler.toml (custom domain)')}

${callout('info', 'Cloudflare DNS Required', 'Custom domains must be managed by Cloudflare DNS (orange-cloud proxied). If your domain is on another registrar, you can either transfer it or add it as a <a href="https://developers.cloudflare.com/dns/zone-setups/" target="_blank" rel="noopener">Cloudflare zone</a>.')}

<h2>Step 3 &mdash; Set Secrets</h2>
<p>The broker needs a few secrets to operate. Set them using the wrangler CLI:</p>

${codeBlock(`# Required: signs all authentication tokens
npx wrangler secret put SESSION_SIGNING_KEY
# paste output of: openssl rand -base64 32

# Required: validates Telegram user identity
npx wrangler secret put TELEGRAM_BOT_TOKEN
# paste your bot token from @BotFather

# Optional: protects admin API endpoints
npx wrangler secret put ADMIN_API_KEY
# paste a strong random string`, 'bash')}

${callout('danger', 'Protect Your Signing Key', 'The <code>SESSION_SIGNING_KEY</code> signs all authentication tokens. If it is compromised, an attacker could forge sessions. Generate a strong random value and store it securely. Rotate it immediately if you suspect a leak.')}

<p>Full list of available secrets:</p>
${configTable([
  ['SESSION_SIGNING_KEY', 'string', '&mdash;', 'Required. Signs auth tokens. Generate with <code>openssl rand -base64 32</code>'],
  ['TELEGRAM_BOT_TOKEN', 'string', '&mdash;', 'Required. Bot token from @BotFather. Must match the token in your aidaemon config'],
  ['ADMIN_API_KEY', 'string', '&mdash;', 'Optional. Protects admin endpoints (user management, quota overrides)'],
  ['BILLING_WEBHOOK_SECRET', 'string', '&mdash;', 'Optional. HMAC secret for billing webhook signature verification'],
])}

<h2>Step 4 &mdash; Deploy</h2>
<p>Deploy the broker to Cloudflare Workers:</p>
${codeBlock(`npx wrangler deploy`, 'bash')}

<p>You should see output like this:</p>
${codeBlock(`Uploaded terminal-broker (3.45 sec)
Published terminal-broker (0.35 sec)
  https://terminal-broker.your-subdomain.workers.dev
Current Deployment ID: abc12345-...`, 'text', 'deploy output')}

${callout('info', 'Durable Object Migration', 'The first deploy automatically creates the Durable Object migration for <code>TerminalSession</code>. No manual migration steps are needed.')}

<h2>Step 5 &mdash; Configure aidaemon</h2>
<p>Point your aidaemon daemon at your self-hosted broker. Update your <code>config.toml</code>:</p>

${codeBlock(`[terminal]
web_app_url = "https://your-broker.your-domain.com"
daemon_ws_url = "wss://your-broker.your-domain.com/v1/ws/daemon"`, 'toml', 'config.toml')}

<p>Or use environment variables:</p>
${codeBlock(`export AIDAEMON_TERMINAL_WEB_APP_URL="https://your-broker.your-domain.com"
export AIDAEMON_TERMINAL_BROKER_URL="wss://your-broker.your-domain.com/v1/ws/daemon"`, 'bash')}

<p>Restart aidaemon after changing the configuration for the new values to take effect.</p>

<h2>Step 6 &mdash; Configure Telegram</h2>
<p>How you configure Telegram depends on how you launch the terminal:</p>

<h3>Via /terminal Command (Inline Buttons)</h3>
<p>If you use the <code>/terminal</code> command in your bot chat, the Mini App URL comes from <code>web_app_url</code> in your <code>config.toml</code>. No BotFather changes are needed &mdash; the inline button URL is set by aidaemon automatically.</p>

<h3>Via Menu Button</h3>
<p>If you want the terminal accessible as a permanent menu button in your bot:</p>
<ol>
  <li>Open <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a> on Telegram</li>
  <li>Send <code>/mybots</code> and select your bot</li>
  <li>Go to <strong>Bot Settings</strong> &rarr; <strong>Menu Button</strong></li>
  <li>Set the URL to your broker (e.g. <code>https://terminal-broker.your-subdomain.workers.dev</code>)</li>
</ol>

${callout('warn', 'HTTPS Required', 'Telegram requires the Mini App URL to use HTTPS. Both <code>workers.dev</code> subdomains and Cloudflare-proxied custom domains provide HTTPS automatically.')}

<h2>Verification</h2>
<p>Confirm everything is working:</p>

<h3>1. Health Check</h3>
${codeBlock(`curl https://your-broker.your-domain.com/health`, 'bash')}
<p>Expected response:</p>
${codeBlock(`{
  "ok": true,
  "service": "your-broker.your-domain.com",
  "version": "1.0.0",
  "timestamp": "2026-03-01T12:00:00.000Z"
}`, 'json', 'health response')}

<h3>2. Test the Mini App</h3>
<p>Send <code>/terminal</code> to your bot in Telegram. The Mini App should open and display the terminal interface.</p>

<h3>3. Check aidaemon Logs</h3>
<p>Look for the terminal bridge connection in your aidaemon logs:</p>
${codeBlock(`[INFO] Connecting terminal bridge to broker: wss://your-broker.your-domain.com/v1/ws/daemon`, 'text', 'aidaemon logs')}

${callout('success', 'All Set', 'If the health check returns <code>"ok": true</code>, the Mini App opens in Telegram, and aidaemon logs show the broker connection &mdash; your self-hosted terminal is fully operational.')}

<h2>Quota Configuration</h2>
<p>The broker enforces per-user monthly quotas to prevent abuse. It tracks session starts, active minutes, bytes transferred, and WebSocket frames. The default "free" plan limits are generous and more than sufficient for personal use.</p>

<p>To customize the plan limits, set the <code>PLAN_LIMITS_JSON</code> environment variable in your <code>wrangler.toml</code>:</p>
${codeBlock(`[vars]
PLAN_LIMITS_JSON = '{"free":{"maxSessionsPerMonth":500,"maxMinutesPerMonth":3000,"maxBytesPerMonth":536870912,"maxFramesPerMonth":500000}}'`, 'toml', 'wrangler.toml')}

<p>To set a specific user to the "pro" plan (or any custom plan), use the admin API:</p>
${codeBlock(`curl -X POST https://your-broker.your-domain.com/admin/users/TELEGRAM_USER_ID/plan \\
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"plan": "pro"}'`, 'bash')}

<p>Available plan limit keys:</p>
${configTable([
  ['maxSessionsPerMonth', 'integer', '100', 'Maximum terminal sessions a user can start per month'],
  ['maxMinutesPerMonth', 'integer', '600', 'Maximum active terminal minutes per month'],
  ['maxBytesPerMonth', 'integer', '104857600', 'Maximum bytes transferred per month (default ~100 MB)'],
  ['maxFramesPerMonth', 'integer', '100000', 'Maximum WebSocket frames per month'],
])}

<h2>Troubleshooting</h2>
<table class="config-table">
<thead><tr><th>Symptom</th><th>Cause</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>"Terminal bridge disabled" in aidaemon logs</td><td><code>daemon_ws_url</code> is misconfigured</td><td>Must use <code>wss://</code> (not <code>ws://</code>). Cloudflare Workers require TLS.</td></tr>
<tr><td>Mini App shows "invalid session"</td><td>Token mismatch</td><td><code>TELEGRAM_BOT_TOKEN</code> in the broker must exactly match the bot token in your aidaemon <code>config.toml</code></td></tr>
<tr><td>"Token signature mismatch"</td><td>Missing or wrong signing key</td><td>Ensure <code>SESSION_SIGNING_KEY</code> is set via <code>npx wrangler secret put</code></td></tr>
<tr><td>WebSocket connection drops</td><td>Worker error or timeout</td><td>Check the Cloudflare dashboard &rarr; Workers &amp; Pages &rarr; your worker &rarr; Logs for errors</td></tr>
<tr><td>"daemon_auth_rate_limited"</td><td>Too many failed connection attempts</td><td>Wait 60 seconds, then fix the underlying auth issue and reconnect</td></tr>
</tbody>
</table>

<h2>Security Notes</h2>
<ul>
  <li>The broker is a <strong>transparent relay</strong> &mdash; terminal content is end-to-end encrypted between the Mini App and your daemon</li>
  <li>The broker sees: user IDs, session metadata, and encrypted frame sizes &mdash; but <strong>never</strong> the actual terminal content</li>
  <li>The <code>SESSION_SIGNING_KEY</code> is the most critical secret &mdash; rotate it immediately if compromised</li>
  <li>All connections use TLS (WSS) &mdash; Cloudflare Workers enforce HTTPS by default</li>
</ul>

${callout('info', 'Full Threat Model', 'For a detailed security analysis, see the <a href="https://github.com/davo20019/terminal.aidaemon.ai/blob/main/SECURITY.md" target="_blank" rel="noopener">SECURITY.md</a> in the broker repository.')}
`
  },
];

export default [...pages, ...sdkPages];
