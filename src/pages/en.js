import { codeBlock, callout, configTable } from '../helpers.js';

const pages = [
  {
    slug: '/',
    section: null,
    title: 'aidaemon Documentation — Personal AI Agent Daemon',
    description: 'Documentation for aidaemon, an open-source personal AI agent daemon. Chat via Telegram, Slack, or Discord. Extend with MCP, use any LLM.',
    content: () => `
<h1><span class="ai">AI</span>daemon</h1>
<p class="lead">A personal AI agent that runs as a daemon. Always on, always learning. Chat from Telegram, extend with MCP, powered by any LLM.</p>

<p>aidaemon is a self-hosted AI agent written in Rust that runs as a background service on your machine. It connects to any OpenAI-compatible LLM provider, communicates via Telegram, Slack, or Discord, and can execute tools, manage its own configuration, remember facts, browse the web, and spawn sub-agents — all autonomously.</p>

<h2>Key Features</h2>
<ul>
  <li><strong>Daemon architecture</strong> — runs as systemd/launchd service, always available</li>
  <li><strong>Multi-channel</strong> — chat via Telegram, Slack, or Discord, multi-user access control</li>
  <li><strong>Agentic tool use</strong> — autonomous multi-step reasoning with up to 10 iterations</li>
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
  <li><strong>CLI agent delegation</strong> — delegate to Claude, Gemini, Codex, Aider, etc.</li>
  <li><strong>Scheduled tasks</strong> — cron-style recurring tasks with natural language parsing</li>
  <li><strong>File transfer</strong> — send and receive files via Telegram with path security</li>
  <li><strong>Secrets management</strong> — OS keychain and environment variable support</li>
  <li><strong>Token cost tracking</strong> — per-model usage stats, daily budgets, /cost command</li>
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
  <li><a href="/getting-started">Getting Started</a> — build and run aidaemon</li>
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
    description: 'Build aidaemon from source, run the setup wizard, and have your personal AI agent running in minutes.',
    content: () => `
<h1>Getting Started</h1>
<p class="lead">Build aidaemon from source, run the setup wizard, and have your personal AI agent running in minutes.</p>

<h2>Requirements</h2>
<ul>
  <li><strong>Rust toolchain</strong> — install via <a href="https://rustup.rs" target="_blank" rel="noopener">rustup.rs</a></li>
  <li><strong>SQLite</strong> — typically pre-installed on macOS/Linux</li>
  <li><strong>Telegram bot token</strong> — create via <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a></li>
  <li><strong>LLM API key</strong> — from Google AI Studio, OpenAI, Anthropic, OpenRouter, or use local Ollama</li>
</ul>

<h2>Steps</h2>
<ol>
  <li><a href="/getting-started/build">Build from source</a> — clone and compile</li>
  <li><a href="/getting-started/wizard">First run wizard</a> — interactive configuration setup</li>
  <li><a href="/configuration">Configure</a> — customize config.toml as needed</li>
  <li><a href="/service-install">Install as service</a> — run on boot with systemd/launchd</li>
</ol>
`
  },
  {
    slug: '/getting-started/build',
    section: 'Getting Started',
    title: 'Build from Source',
    description: 'Install aidaemon via Homebrew, cargo install, cargo binstall, or build from source. Supports Linux, macOS, and Windows.',
    content: () => `
<h1>Install</h1>
<p class="lead">Install via one-line script, Homebrew, Cargo, or build from source.</p>

<h2>One-line Install (Recommended)</h2>
<p>Works on any Linux VPS or macOS machine. Downloads the latest binary and verifies its SHA256 checksum:</p>
${codeBlock(`curl -sSfL https://get.aidaemon.ai | bash`, 'bash')}
${callout('success', 'Batteries Included', 'Pre-built binaries include all channel integrations (Telegram, Slack, Discord) and the browser tool. Just enable what you need in <code>config.toml</code> &mdash; no compilation required.')}

<h2>Install via Homebrew</h2>
<p>The easiest way to install on macOS or Linux:</p>
${codeBlock(`brew install davo20019/tap/aidaemon`, 'bash')}

<h2>Install via Cargo</h2>
<p>For Rust developers. Note: <code>cargo install</code> builds from source with default features only (Telegram). To include all channels, add feature flags:</p>
${codeBlock(`cargo install aidaemon --features "browser,slack,discord"
# Or for pre-built binaries:
cargo binstall aidaemon`, 'bash')}

<h2>Clone &amp; Build from Source</h2>
<p>For contributors and developers:</p>
${codeBlock(`git clone https://github.com/davo20019/aidaemon.git
cd aidaemon
cargo build --release --features "browser,slack,discord"`, 'bash')}

<p>The compiled binary will be at <code>./target/release/aidaemon</code>.</p>

<h2>Feature Flags (Build from Source Only)</h2>
<p>If you installed via the one-line script or Homebrew, all features are already included. These flags are only relevant when building from source:</p>

<h3>Browser</h3>
<p>Enable Chrome automation with persistent login sessions:</p>
${codeBlock(`cargo build --release --features browser`, 'bash')}
<p>After building, run <code>aidaemon browser login</code> to open Chrome and log into your services. See the <a href="/tools/browser">Browser Tool</a> docs for details.</p>
${callout('info', 'Note', 'Requires a Chromium-based browser installed on the system (Chrome, Chromium, Brave, or Edge).')}

<h3>Slack</h3>
<p>Enable the Slack channel integration (Socket Mode):</p>
${codeBlock(`cargo build --release --features slack`, 'bash')}

<h3>Discord</h3>
<p>Enable the Discord bot integration:</p>
${codeBlock(`cargo build --release --features discord`, 'bash')}

<h3>Multiple Features</h3>
<p>Combine features as needed:</p>
${codeBlock(`cargo build --release --features "browser,slack,discord"`, 'bash')}

<h2>Verify</h2>
${codeBlock(`./target/release/aidaemon --help`, 'bash')}

<p>If no <code>config.toml</code> exists, running the binary will automatically launch the <a href="/getting-started/wizard">setup wizard</a>.</p>
`
  },
  {
    slug: '/getting-started/wizard',
    section: 'Getting Started',
    title: 'First Run Wizard',
    description: 'On first launch, aidaemon runs an interactive setup wizard to configure your LLM provider and channel tokens.',
    content: () => `
<h1>First Run Wizard</h1>
<p class="lead">On first launch (no config.toml found), aidaemon runs an interactive setup wizard.</p>

<h2>Provider Selection</h2>
<p>The wizard offers these presets:</p>

<table class="config-table">
<thead><tr><th>Provider</th><th>Base URL</th><th>Default Models</th></tr></thead>
<tbody>
<tr><td><strong>Google AI Studio (Native)</strong></td><td>Native API</td><td>gemini-3-flash-preview / gemini-2.5-flash-lite / gemini-3-pro-preview</td></tr>
<tr><td>OpenAI</td><td><code>https://api.openai.com/v1</code></td><td>gpt-4o / gpt-4o-mini / gpt-4o</td></tr>
<tr><td>Anthropic (Native)</td><td>Native API</td><td>claude-sonnet-4 / claude-haiku-4 / claude-opus-4</td></tr>
<tr><td>Anthropic (OpenRouter)</td><td><code>https://openrouter.ai/api/v1</code></td><td>anthropic/claude-* variants</td></tr>
<tr><td>OpenRouter</td><td><code>https://openrouter.ai/api/v1</code></td><td>Mixed providers</td></tr>
<tr><td>Cloudflare AI Gateway</td><td><code>https://gateway.ai.cloudflare.com/v1/&lt;ACCOUNT_ID&gt;/&lt;GATEWAY_ID&gt;/compat</code></td><td>Provider-dependent (for example: gpt-4o-mini / gpt-4o-mini / gpt-4o)</td></tr>
<tr><td>Ollama (local)</td><td><code>http://localhost:11434/v1</code></td><td>Auto-discovered from local instance</td></tr>
<tr><td>Custom</td><td>User-specified</td><td>User-specified</td></tr>
</tbody>
</table>

<h2>Wizard Steps</h2>
<ol>
  <li><strong>Select provider</strong> — choose from presets or enter custom</li>
  <li><strong>Enter API key</strong> — skipped for Ollama (no auth needed)</li>
  <li><strong>Optional gateway token</strong> — Cloudflare preset can add <code>cf-aig-authorization</code> for Authenticated Gateway mode</li>
  <li><strong>Model selection</strong> — auto-populated from preset, or auto-discovered for Ollama</li>
  <li><strong>Telegram setup</strong> — enter bot token and your numeric user ID</li>
  <li><strong>Browser setup</strong> (if compiled with <code>browser</code> feature) — auto-detects Chrome profiles</li>
  <li><strong>Generate config.toml</strong> — written to current directory</li>
</ol>

${callout('info', 'Ollama Auto-Discovery', 'When selecting Ollama, the wizard queries <code>http://localhost:11434/api/tags</code> to list all locally available models and lets you pick.')}

<h2>Chrome Profile Detection</h2>
<p>The wizard auto-detects Chrome/Chromium profiles for browser session reuse:</p>
<ul>
  <li><strong>macOS:</strong> <code>~/Library/Application Support/Google/Chrome</code></li>
  <li><strong>Linux:</strong> <code>~/.config/google-chrome</code> or <code>~/.config/chromium</code></li>
</ul>
<p>Reusing a profile inherits cookies and sessions, so the agent can access authenticated sites.</p>
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
  ['kind', 'string', '"google_genai"', 'Provider type: <code>google_genai</code>, <code>openai_compatible</code>, or <code>anthropic</code>'],
  ['api_key', 'string', '—', 'API key for the provider (required)'],
  ['gateway_token', 'string', 'null', 'Optional Cloudflare AI Gateway token used as <code>cf-aig-authorization</code>'],
  ['base_url', 'string', '—', 'API base URL (required for <code>openai_compatible</code>, not used for native providers)'],
])}

<h2>[provider.models]</h2>
${configTable([
  ['primary', 'string', '(provider default)', 'Default model for general queries'],
  ['fast', 'string', '(same as primary)', 'Model for simple/quick queries'],
  ['smart', 'string', '(same as primary)', 'Model for complex reasoning tasks'],
])}

${callout('info', 'Model Defaults', 'Provider-aware defaults: <strong>google_genai</strong> → primary=gemini-3-flash-preview, fast=gemini-2.5-flash-lite, smart=gemini-3-pro-preview. <strong>openai_compatible</strong> → all tiers default to openai/gpt-4o. <strong>anthropic</strong> → all tiers default to claude-sonnet-4-20250514. When all three tiers resolve to the same model, auto-routing is disabled. See <a href="/router">Model Routing</a>.')}

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
  ['daily_token_budget', 'integer', 'null', 'Max total tokens (input+output) per day. Null = unlimited. Resets at midnight UTC.'],
  ['encryption_key', 'string', 'null', 'SQLCipher encryption key (requires <code>encryption</code> feature). AES-256 at rest.'],
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
<p>Sensitive config values support two resolution methods beyond plain text:</p>

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
    description: 'Configure LLM providers for aidaemon: OpenAI-compatible, Anthropic native, or Google Generative AI backends.',
    content: () => `
<h1>Provider Setup</h1>
<p class="lead">aidaemon supports three provider types, all configured in the <code>[provider]</code> section.</p>

<h2>Provider Kinds</h2>

<h3>google_genai (recommended)</h3>
<p>Native Google Generative AI API. The recommended provider — Gemini models offer excellent tool-use capabilities, fast response times, and generous free-tier API access via <a href="https://aistudio.google.com/" target="_blank" rel="noopener">Google AI Studio</a>.</p>
${codeBlock(`[provider]
kind = "google_genai"
api_key = "AIza..."

[provider.models]
primary = "gemini-3-flash-preview"
fast = "gemini-2.5-flash-lite"
smart = "gemini-3-pro-preview"`, 'toml')}

${callout('info', 'Recommended Setup', 'Google AI Studio provides a free API key with generous rate limits. Gemini models have native tool-calling support, web grounding, and work well with aidaemon&rsquo;s agentic loop.')}

<h3>Gemini Web Grounding</h3>
<p>When using <code>google_genai</code>, aidaemon automatically enables Google Search grounding. This allows Gemini models to search the web as part of their responses. Models that don&rsquo;t support grounding with function calling are detected automatically and fall back gracefully.</p>

<h3>openai_compatible</h3>
<p>Works with any API that implements the OpenAI chat completions format. This includes OpenAI, OpenRouter, Cloudflare AI Gateway, Ollama, and many others.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "sk-..."
base_url = "https://api.openai.com/v1"

[provider.models]
primary = "gpt-4o"
fast = "gpt-4o-mini"
smart = "o1-preview"`, 'toml')}

<h3>anthropic</h3>
<p>Native Anthropic API (Messages API format). Use this for direct Anthropic access without going through an OpenAI-compatible proxy.</p>
${codeBlock(`[provider]
kind = "anthropic"
api_key = "sk-ant-..."

[provider.models]
primary = "claude-sonnet-4-20250514"
fast = "claude-haiku-4-20250414"
smart = "claude-opus-4-20250414"`, 'toml')}

<h2>OpenRouter</h2>
<p>OpenRouter provides access to models from multiple providers through a single API key and the OpenAI-compatible format.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "sk-or-..."
base_url = "https://openrouter.ai/api/v1"

[provider.models]
primary = "anthropic/claude-sonnet-4"
fast = "anthropic/claude-haiku-4"
smart = "anthropic/claude-opus-4"`, 'toml')}

<h2>Cloudflare AI Gateway</h2>
<p>Cloudflare AI Gateway sits in front of upstream providers and exposes an OpenAI-compatible endpoint. Use this when you want centralized logging, caching, controls, or rate limiting across providers.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "sk-..." # Upstream provider key
gateway_token = "cf-gw-..." # Optional: Authenticated Gateway mode
base_url = "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/compat"

[provider.models]
primary = "gpt-4o-mini"
fast = "gpt-4o-mini"
smart = "gpt-4o"`, 'toml')}

${callout('info', 'Cloudflare Auth Modes', 'You can run with just <code>api_key</code> (basic mode), or add <code>gateway_token</code> to send <code>cf-aig-authorization</code> for Authenticated Gateway mode.')}

<h2>Ollama (Local)</h2>
<p>Run models locally with Ollama. No API key required.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "ollama"
base_url = "http://localhost:11434/v1"

[provider.models]
primary = "llama3.1"
fast = "llama3.1"
smart = "llama3.1"`, 'toml')}

${callout('info', 'Ollama Discovery', 'The setup wizard auto-discovers available Ollama models by querying <code>http://localhost:11434/api/tags</code>.')}
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
    description: 'Delegate tasks to Claude Code, Gemini CLI, Codex, Copilot, or Aider from within the aidaemon agent loop.',
    content: () => `
<h1>CLI Agent Delegation</h1>
<p class="lead">Delegate tasks to external CLI coding tools like Claude Code, Gemini CLI, Codex, Copilot, or Aider.</p>

<h2>Tool Name</h2>
<p><code>cli_agent</code></p>

<h2>Parameters</h2>
${configTable([
  ['tool', 'string', '—', 'Name of the CLI tool to invoke (e.g., "claude", "gemini")'],
  ['prompt', 'string', '—', 'The prompt/task to send to the CLI tool'],
  ['working_dir', 'string', 'null', 'Working directory for command execution'],
])}

<h2>Default Tools</h2>
<p>When <code>cli_agents.enabled = true</code> with no explicit tool configs, these defaults are registered (if the command exists on the system):</p>

<table class="config-table">
<thead><tr><th>Name</th><th>Command</th><th>Default Args</th></tr></thead>
<tbody>
<tr><td>claude</td><td><code>claude</code></td><td><code>-p --output-format json</code></td></tr>
<tr><td>gemini</td><td><code>gemini</code></td><td><code>-p --output-format json --sandbox=false</code></td></tr>
<tr><td>codex</td><td><code>codex</code></td><td><code>exec --json --full-auto</code></td></tr>
<tr><td>copilot</td><td><code>copilot</code></td><td><code>-p</code></td></tr>
<tr><td>aider</td><td><code>aider</code></td><td><code>--yes --message</code></td></tr>
</tbody>
</table>

${callout('info', 'Discovery', 'Only tools whose commands are found via <code>which</code> are registered. Missing tools are silently skipped.')}

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
<tr><td><strong>Fast</strong></td><td>Simple greetings, yes/no, short lookups</td><td>gemini-2.5-flash-lite, gpt-4o-mini, claude-haiku-4</td></tr>
<tr><td><strong>Primary</strong></td><td>General conversation, moderate tasks</td><td>gemini-3-flash-preview, gpt-4o, claude-sonnet-4</td></tr>
<tr><td><strong>Smart</strong></td><td>Complex reasoning, code generation, analysis</td><td>gemini-3-pro-preview, o1-preview, claude-opus-4</td></tr>
</tbody>
</table>

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
    title: 'systemd & launchd Setup',
    description: 'Install aidaemon as a systemd or launchd service that starts on boot and runs continuously.',
    content: () => `
<h1>Service Installation</h1>
<p class="lead">Install aidaemon as a system service that starts on boot and runs forever.</p>

<h2>Install Command</h2>
${codeBlock(`./aidaemon install-service`, 'bash')}

<p>This auto-detects the platform and generates the appropriate service configuration.</p>

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

${callout('warn', 'Homebrew Users', 'If installed via Homebrew, use <code>brew upgrade aidaemon</code> instead, or set <code>mode = "disable"</code>.')}
`
  },
];

export default pages;
