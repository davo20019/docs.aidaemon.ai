// aidaemon docs — single-file Cloudflare Worker documentation site
// All routing, layout, CSS, and content in one file

// ─── Helpers ───────────────────────────────────────────────────────────────────

function codeBlock(code, lang = '', filename = '') {
  const header = filename || lang;
  const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<div class="code-block"><div class="code-header"><span class="code-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="code-title">${header}</span></div><pre><code>${escaped}</code></pre></div>`;
}

function callout(type, title, body) {
  return `<div class="callout callout-${type}"><div class="callout-title">${title}</div><div class="callout-body">${body}</div></div>`;
}

function configTable(rows) {
  let html = '<table class="config-table"><thead><tr><th>Key</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody>';
  for (const r of rows) {
    html += `<tr><td><code>${r[0]}</code></td><td>${r[1]}</td><td><code>${r[2]}</code></td><td>${r[3]}</td></tr>`;
  }
  return html + '</tbody></table>';
}

// ─── Page Registry ─────────────────────────────────────────────────────────────

const pages = [
  {
    slug: '/',
    section: null,
    title: 'Introduction',
    content: () => `
<h1>aidaemon</h1>
<p class="lead">A personal AI agent that runs as a daemon. Always on, always learning. Chat from Telegram, extend with MCP, powered by any LLM.</p>

<p>aidaemon is a self-hosted AI agent written in Rust that runs as a background service on your machine. It connects to any OpenAI-compatible LLM provider, communicates via Telegram, and can execute tools, manage its own configuration, remember facts, browse the web, and spawn sub-agents — all autonomously.</p>

<h2>Key Features</h2>
<ul>
  <li><strong>Daemon architecture</strong> — runs as systemd/launchd service, always available</li>
  <li><strong>Telegram interface</strong> — chat from any device, multi-user access control</li>
  <li><strong>Agentic tool use</strong> — autonomous multi-step reasoning with up to 10 iterations</li>
  <li><strong>MCP integration</strong> — extend with any Model Context Protocol server</li>
  <li><strong>Persistent memory</strong> — SQLite-backed history with semantic search via embeddings</li>
  <li><strong>Multi-model routing</strong> — automatic Fast/Primary/Smart tier selection</li>
  <li><strong>Email triggers</strong> — IMAP IDLE monitoring for inbox notifications</li>
  <li><strong>Command approval</strong> — interactive Telegram approval for shell commands</li>
  <li><strong>Skills system</strong> — dynamic prompt enhancement via markdown files</li>
  <li><strong>Self-maintenance</strong> — reads, updates, validates, and restores its own config</li>
  <li><strong>Browser automation</strong> — headless Chrome with screenshot support</li>
  <li><strong>Sub-agent spawning</strong> — recursive agent delegation for complex tasks</li>
  <li><strong>CLI agent delegation</strong> — delegate to Claude, Gemini, Codex, Aider, etc.</li>
</ul>

<h2>Architecture at a Glance</h2>
${codeBlock(`Telegram ───> Agent ───> LLM Provider
              │
              ├──> Tools
              │    ├── terminal
              │    ├── system info
              │    ├── memory (facts)
              │    ├── config manager
              │    ├── browser (optional)
              │    ├── sub-agents
              │    ├── CLI agents
              │    └── MCP tools (dynamic)
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
</ul>
`
  },
  {
    slug: '/getting-started',
    section: 'Getting Started',
    title: 'Overview',
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
    content: () => `
<h1>Build from Source</h1>
<p class="lead">Clone the repository and compile with Cargo.</p>

<h2>Clone &amp; Build</h2>
${codeBlock(`git clone https://github.com/davo20019/aidaemon.git
cd aidaemon
cargo build --release`, 'bash')}

<p>The compiled binary will be at <code>./target/release/aidaemon</code>.</p>

<h2>Browser Feature (Optional)</h2>
<p>To enable the browser automation tool (headless Chrome), build with the <code>browser</code> feature flag:</p>
${codeBlock(`cargo build --release --features browser`, 'bash')}

${callout('info', 'Note', 'The browser feature requires a Chromium-based browser installed on the system. Chrome, Chromium, or Brave all work.')}

<h2>Verify</h2>
${codeBlock(`./target/release/aidaemon --help`, 'bash')}

<p>If no <code>config.toml</code> exists, running the binary will automatically launch the <a href="/getting-started/wizard">setup wizard</a>.</p>
`
  },
  {
    slug: '/getting-started/wizard',
    section: 'Getting Started',
    title: 'First Run Wizard',
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
<tr><td>Anthropic (Native)</td><td>Native API</td><td>claude-3.5-sonnet / claude-3-haiku / claude-3-opus</td></tr>
<tr><td>Anthropic (OpenRouter)</td><td><code>https://openrouter.ai/api/v1</code></td><td>anthropic/claude-* variants</td></tr>
<tr><td>OpenRouter</td><td><code>https://openrouter.ai/api/v1</code></td><td>Mixed providers</td></tr>
<tr><td>Ollama (local)</td><td><code>http://localhost:11434/v1</code></td><td>Auto-discovered from local instance</td></tr>
<tr><td>Custom</td><td>User-specified</td><td>User-specified</td></tr>
</tbody>
</table>

<h2>Wizard Steps</h2>
<ol>
  <li><strong>Select provider</strong> — choose from presets or enter custom</li>
  <li><strong>Enter API key</strong> — skipped for Ollama (no auth needed)</li>
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
    content: () => `
<h1>Configuration</h1>
<p class="lead">Complete reference for <code>config.toml</code>. All sections and their defaults.</p>

<h2>[provider]</h2>
${configTable([
  ['kind', 'string', '"google_genai"', 'Provider type: <code>google_genai</code>, <code>openai_compatible</code>, or <code>anthropic</code>'],
  ['api_key', 'string', '—', 'API key for the provider (required)'],
  ['base_url', 'string', '—', 'API base URL (required for <code>openai_compatible</code>, not used for native providers)'],
])}

<h2>[provider.models]</h2>
${configTable([
  ['primary', 'string', '"gemini-3-flash-preview"', 'Default model for general queries'],
  ['fast', 'string', '"gemini-2.5-flash-lite"', 'Model for simple/quick queries'],
  ['smart', 'string', '"gemini-3-pro-preview"', 'Model for complex reasoning tasks'],
])}

${callout('info', 'Model Routing', 'When all three tiers use the same model, auto-routing is disabled. See <a href="/router">Model Routing</a> for classification details.')}

<h2>[telegram]</h2>
${configTable([
  ['bot_token', 'string', '—', 'Telegram bot token from @BotFather (required)'],
  ['allowed_user_ids', 'array', '[]', 'Numeric Telegram user IDs allowed to chat. Empty = no restriction.'],
])}

<h2>[state]</h2>
${configTable([
  ['db_path', 'string', '"aidaemon.db"', 'Path to SQLite database file'],
  ['working_memory_cap', 'integer', '50', 'Max messages per session kept in memory'],
  ['consolidation_interval_hours', 'integer', '6', 'Hours between memory consolidation runs'],
])}

<h2>[terminal]</h2>
${configTable([
  ['allowed_prefixes', 'array', '(see below)', 'Command prefixes auto-approved without user confirmation'],
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
  ['headless', 'bool', 'true', 'Run Chrome in headless mode'],
  ['screenshot_width', 'integer', '1280', 'Screenshot viewport width in pixels'],
  ['screenshot_height', 'integer', '720', 'Screenshot viewport height in pixels'],
  ['user_data_dir', 'string', 'null', 'Chrome user data directory for session reuse'],
  ['profile', 'string', 'null', 'Chrome profile name (e.g., "Default", "Profile 1")'],
])}

<h2>[skills]</h2>
${configTable([
  ['dir', 'string', '"skills"', 'Directory containing skill markdown files'],
  ['enabled', 'bool', 'true', 'Enable the skills system'],
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

[state]
db_path = "aidaemon.db"
working_memory_cap = 50

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
enabled = true`, 'toml', 'config.toml')}
`
  },
  {
    slug: '/providers',
    section: 'Configuration',
    title: 'Provider Setup',
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

${callout('info', 'Recommended Setup', 'Google AI Studio provides a free API key with generous rate limits. Gemini models have native tool-calling support and work well with aidaemon&rsquo;s agentic loop.')}

<h3>openai_compatible</h3>
<p>Works with any API that implements the OpenAI chat completions format. This includes OpenAI, OpenRouter, Ollama, and many others.</p>
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
primary = "claude-3.5-sonnet"
fast = "claude-3-haiku"
smart = "claude-3-opus"`, 'toml')}

<h2>OpenRouter</h2>
<p>OpenRouter provides access to models from multiple providers through a single API key and the OpenAI-compatible format.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "sk-or-..."
base_url = "https://openrouter.ai/api/v1"

[provider.models]
primary = "anthropic/claude-3.5-sonnet"
fast = "anthropic/claude-3-haiku"
smart = "anthropic/claude-3-opus"`, 'toml')}

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
    content: () => `
<h1>Telegram Bot Setup</h1>
<p class="lead">aidaemon uses Telegram as its primary user interface via the teloxide framework.</p>

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
    slug: '/tools',
    section: 'Tools',
    title: 'Tools Overview',
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
<tr><td><a href="/tools/browser"><code>browser</code></a></td><td>Headless Chrome automation</td><td>[browser] enabled=true</td></tr>
<tr><td><a href="/tools/sub-agents"><code>spawn_agent</code></a></td><td>Spawn recursive sub-agents</td><td>[subagents]</td></tr>
<tr><td><a href="/tools/cli-agents"><code>cli_agent</code></a></td><td>Delegate to external CLI tools</td><td>[cli_agents]</td></tr>
<tr><td><a href="/mcp">MCP tools</a></td><td>Dynamically discovered via MCP servers</td><td>[mcp.*]</td></tr>
</tbody>
</table>

<h2>Tool Registration Order</h2>
<p>Tools are registered during initialization in this order:</p>
<ol>
  <li>SystemInfoTool</li>
  <li>TerminalTool (with approval channel)</li>
  <li>RememberFactTool</li>
  <li>ConfigManagerTool</li>
  <li>BrowserTool (if enabled)</li>
  <li>CliAgentTool (if enabled)</li>
  <li>MCP tools (if configured)</li>
  <li>SpawnAgentTool (if enabled)</li>
</ol>
`
  },
  {
    slug: '/tools/terminal',
    section: 'Tools',
    title: 'Terminal Tool',
    content: () => `
<h1>Terminal Tool</h1>
<p class="lead">Execute shell commands on the host system. Commands are run via <code>sh -c</code>.</p>

<h2>Parameters</h2>
${configTable([
  ['command', 'string', '—', 'The shell command to execute'],
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
<p>Returns stdout first, then stderr (if any). Output is truncated to 4000 characters.</p>

<h2>Allow Always</h2>
<p>When the user clicks "Allow Always" in Telegram, the command prefix is added to <code>terminal.allowed_prefixes</code> in config.toml. Future commands with the same prefix are auto-approved.</p>

${callout('danger', 'Untrusted Sessions', 'Sessions from triggers (email, etc.) are flagged as untrusted. <strong>All</strong> commands in untrusted sessions require approval regardless of the whitelist.')}
`
  },
  {
    slug: '/tools/system-info',
    section: 'Tools',
    title: 'System Info Tool',
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
<p>All facts are injected into the system prompt under a <code>## Known Facts</code> section, grouped by category. This means the agent always has access to its stored knowledge.</p>

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
    content: () => `
<h1>Browser Tool</h1>
<p class="lead">Headless Chrome automation for web browsing, form filling, and screenshots. Requires the <code>browser</code> feature.</p>

${callout('info', 'Feature Flag', 'Build with <code>cargo build --release --features browser</code> to enable this tool.')}

<h2>Configuration</h2>
${codeBlock(`[browser]
enabled = true
headless = true
screenshot_width = 1280
screenshot_height = 720
user_data_dir = "~/Library/Application Support/Google/Chrome"
profile = "Default"`, 'toml', 'config.toml')}

<h2>Methods</h2>

<table class="config-table">
<thead><tr><th>Method</th><th>Parameters</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>navigate</code></td><td><code>url</code></td><td>Navigate to URL, wait 2s for load</td></tr>
<tr><td><code>screenshot</code></td><td><code>selector?</code></td><td>PNG screenshot of page or element</td></tr>
<tr><td><code>click</code></td><td><code>selector</code></td><td>Click a page element</td></tr>
<tr><td><code>fill</code></td><td><code>selector, value</code></td><td>Fill an input field</td></tr>
<tr><td><code>get_text</code></td><td><code>selector?</code></td><td>Extract text content</td></tr>
<tr><td><code>get_attribute</code></td><td><code>selector, attr</code></td><td>Read an HTML attribute</td></tr>
<tr><td><code>wait_for_selector</code></td><td><code>selector, timeout_ms</code></td><td>Poll until element appears</td></tr>
</tbody>
</table>

<h2>Chrome Profile Reuse</h2>
<p>Setting <code>user_data_dir</code> and <code>profile</code> lets the browser inherit an existing Chrome session — cookies, login state, and extensions. This allows the agent to interact with authenticated sites.</p>

<h2>Screenshots</h2>
<p>Screenshots are captured as PNG and sent to the user via Telegram as photo messages with captions describing the page content.</p>
`
  },
  {
    slug: '/tools/sub-agents',
    section: 'Tools',
    title: 'Sub-Agent Spawning',
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
    slug: '/mcp',
    section: 'MCP',
    title: 'MCP Overview',
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
`
  },
  {
    slug: '/triggers',
    section: 'Triggers',
    title: 'Email Triggers',
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

<h2>Matching</h2>
<p>Trigger matching is case-insensitive substring matching. If any trigger keyword appears anywhere in the user's message, the skill activates.</p>

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
`
  },
  {
    slug: '/router',
    section: 'Router',
    title: 'Model Routing',
    content: () => `
<h1>Model Routing</h1>
<p class="lead">Automatic tier-based model selection routes each query to the most appropriate model: Fast, Primary, or Smart.</p>

<h2>Tiers</h2>
<table class="config-table">
<thead><tr><th>Tier</th><th>Use Case</th><th>Typical Model</th></tr></thead>
<tbody>
<tr><td><strong>Fast</strong></td><td>Simple greetings, yes/no, short lookups</td><td>gemini-2.5-flash-lite, gpt-4o-mini, claude-3-haiku</td></tr>
<tr><td><strong>Primary</strong></td><td>General conversation, moderate tasks</td><td>gemini-3-flash-preview, gpt-4o, claude-3.5-sonnet</td></tr>
<tr><td><strong>Smart</strong></td><td>Complex reasoning, code generation, analysis</td><td>gemini-3-pro-preview, o1-preview, claude-3-opus</td></tr>
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
    slug: '/architecture',
    section: 'Architecture',
    title: 'Agent Loop & Error Recovery',
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

<h2>Tool Execution</h2>
<p>During the loop, each tool call receives:</p>
<ul>
  <li><code>_session_id</code> — injected automatically for session tracking</li>
  <li><code>_untrusted_source</code> — flag set for trigger-originated sessions</li>
</ul>

<h2>Session Types</h2>
<table class="config-table">
<thead><tr><th>Session Type</th><th>Format</th><th>Trusted</th></tr></thead>
<tbody>
<tr><td>Telegram chat</td><td>Chat ID as string</td><td>Yes</td></tr>
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
    content: () => `
<h1>State Management &amp; Memory</h1>
<p class="lead">SQLite-backed persistence with in-memory working memory, semantic search via embeddings, and tri-hybrid retrieval.</p>

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

<h2>Health Check</h2>
<p>Once running as a service, verify with:</p>
${codeBlock(`curl http://127.0.0.1:8080/health
# {"status": "ok"}`, 'bash')}

<p>The health endpoint is served by axum on the configured <code>daemon.health_bind:daemon.health_port</code>.</p>
`
  },
];

// ─── Layout ────────────────────────────────────────────────────────────────────

function renderSidebar(currentSlug) {
  let html = '<nav class="sidebar" id="sidebar">';
  let currentSection = null;

  for (const page of pages) {
    if (page.section !== currentSection) {
      if (currentSection !== null) html += '</div>';
      currentSection = page.section;
      if (page.section === null) {
        const active = currentSlug === page.slug ? ' class="active"' : '';
        html += `<a href="${page.slug}"${active}>${page.title}</a>`;
        continue;
      }
      html += `<div class="sidebar-section"><div class="sidebar-label">${page.section}</div><div class="sidebar-group">`;
    }
    if (page.section !== null) {
      const active = currentSlug === page.slug ? ' class="active"' : '';
      html += `<a href="${page.slug}"${active}>${page.title}</a>`;
    }
  }
  if (currentSection !== null) html += '</div></div>';
  html += '</nav>';
  return html;
}

function buildSearchIndex() {
  return JSON.stringify(pages.map(p => {
    const raw = p.content().replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
    return { slug: p.slug, section: p.section || '', title: p.title, text: raw.slice(0, 1500) };
  }));
}

function renderPageNav(currentSlug) {
  const idx = pages.findIndex(p => p.slug === currentSlug);
  const prev = idx > 0 ? pages[idx - 1] : null;
  const next = idx < pages.length - 1 ? pages[idx + 1] : null;
  let html = '<div class="page-nav">';
  if (prev) html += `<a href="${prev.slug}" class="page-nav-prev"><span class="page-nav-label">Previous</span><span class="page-nav-title">${prev.title}</span></a>`;
  else html += '<div></div>';
  if (next) html += `<a href="${next.slug}" class="page-nav-next"><span class="page-nav-label">Next</span><span class="page-nav-title">${next.title}</span></a>`;
  else html += '<div></div>';
  html += '</div>';
  return html;
}

function layout(page) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.title} — aidaemon docs</title>
<meta name="description" content="Documentation for aidaemon — a personal AI agent that runs as a daemon.">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👁</text></svg>">
<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg-deep: #0a0a0c;
  --bg-surface: #0f1012;
  --bg-elevated: #161619;
  --bg-card: #1a1a1f;
  --border: #2a2a32;
  --border-bright: #3a3a45;
  --text-primary: #e8e8ed;
  --text-secondary: #8a8a96;
  --text-dim: #5a5a66;
  --green: #00ff9d;
  --green-dim: #00cc7d;
  --green-glow: rgba(0, 255, 157, 0.15);
  --cyan: #00d4ff;
  --cyan-dim: #00a8cc;
  --cyan-glow: rgba(0, 212, 255, 0.1);
  --amber: #ffb800;
  --red: #ff4757;
  --mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
  --sans: 'Space Grotesk', system-ui, sans-serif;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--mono);
  background: var(--bg-deep);
  color: var(--text-primary);
  line-height: 1.7;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
  pointer-events: none;
  z-index: 9999;
}

body::after {
  content: '';
  position: fixed;
  inset: 0;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9998;
}

::selection { background: var(--green); color: var(--bg-deep); }

a { color: var(--green); text-decoration: none; transition: all 0.2s; }
a:hover { color: var(--cyan); text-shadow: 0 0 8px var(--cyan-glow); }

/* ── HEADER ── */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(10, 10, 12, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-primary);
  text-decoration: none;
}
.header-logo:hover { color: var(--text-primary); text-shadow: none; }

.header-logo .tag {
  color: var(--cyan);
  font-size: 0.7rem;
  font-weight: 400;
  padding: 0.15rem 0.45rem;
  border: 1px solid var(--border);
  border-radius: 3px;
  background: var(--bg-elevated);
}

.header-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.header-links a {
  font-size: 0.8rem;
  color: var(--text-secondary);
  transition: color 0.2s;
}
.header-links a:hover { color: var(--green); text-shadow: none; }

.hamburger {
  display: none;
  background: none;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.4rem 0.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 1.2rem;
  line-height: 1;
}

/* ── DOCS LAYOUT ── */
.docs-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  padding-top: 53px;
}

/* ── SIDEBAR ── */
.sidebar {
  position: sticky;
  top: 53px;
  height: calc(100vh - 53px);
  overflow-y: auto;
  padding: 1.5rem 1rem;
  border-right: 1px solid var(--border);
  background: var(--bg-surface);
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}

.sidebar > a {
  display: block;
  padding: 0.4rem 0.75rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
  border-radius: 4px;
  border-left: 2px solid transparent;
  margin-bottom: 0.15rem;
  transition: all 0.15s;
}
.sidebar > a:hover { color: var(--text-primary); background: var(--bg-elevated); text-shadow: none; }
.sidebar > a.active { color: var(--green); border-left-color: var(--green); background: var(--green-glow); }

.sidebar-section {
  margin-bottom: 0.5rem;
}

.sidebar-label {
  padding: 0.5rem 0.75rem 0.3rem;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-dim);
}

.sidebar-group {
  padding-left: 0.25rem;
}

.sidebar-group a {
  display: block;
  padding: 0.35rem 0.75rem;
  font-size: 0.78rem;
  color: var(--text-secondary);
  border-radius: 4px;
  border-left: 2px solid transparent;
  margin-bottom: 0.1rem;
  transition: all 0.15s;
}
.sidebar-group a:hover { color: var(--text-primary); background: var(--bg-elevated); text-shadow: none; }
.sidebar-group a.active { color: var(--green); border-left-color: var(--green); background: var(--green-glow); }

/* ── OVERLAY (mobile) ── */
.sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 149;
  background: rgba(0,0,0,0.6);
}

/* ── CONTENT ── */
.docs-content {
  max-width: 820px;
  padding: 2.5rem 3rem 4rem;
}

.docs-content h1 {
  font-family: var(--mono);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.docs-content h2 {
  font-family: var(--mono);
  font-size: 1.3rem;
  font-weight: 600;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
  letter-spacing: -0.01em;
}

.docs-content h3 {
  font-family: var(--mono);
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1.75rem;
  margin-bottom: 0.5rem;
  color: var(--cyan);
}

.docs-content p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.8;
}

.docs-content .lead {
  font-size: 0.95rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-weight: 300;
  line-height: 1.8;
}

.docs-content ul, .docs-content ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.docs-content li {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 0.3rem;
}

.docs-content li strong { color: var(--text-primary); font-weight: 500; }

.docs-content code {
  background: var(--bg-elevated);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-size: 0.8rem;
  color: var(--cyan);
  border: 1px solid var(--border);
}

/* ── CODE BLOCK ── */
.code-block {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1.25rem;
}

.code-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.6rem 1rem;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
}

.code-dots {
  display: flex;
  gap: 5px;
}

.code-dots .dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.dot.r { background: #ff5f57; }
.dot.y { background: #febc2e; }
.dot.g { background: #28c840; }

.code-title {
  font-size: 0.7rem;
  color: var(--text-dim);
  margin-left: 0.25rem;
}

.code-block pre {
  padding: 1rem 1.25rem;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}

.code-block code {
  background: none;
  border: none;
  padding: 0;
  font-size: 0.78rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* ── CONFIG TABLE ── */
.config-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.25rem;
  font-size: 0.8rem;
}

.config-table thead th {
  text-align: left;
  padding: 0.6rem 0.75rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text-dim);
  font-weight: 600;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.config-table td {
  padding: 0.55rem 0.75rem;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  vertical-align: top;
}

.config-table code {
  font-size: 0.75rem;
}

.config-table tbody tr:hover {
  background: var(--bg-surface);
}

/* ── CALLOUT ── */
.callout {
  border-left: 3px solid;
  padding: 1rem 1.25rem;
  margin-bottom: 1.25rem;
  border-radius: 0 6px 6px 0;
  background: var(--bg-surface);
}

.callout-info { border-color: var(--green); }
.callout-warn { border-color: var(--amber); }
.callout-danger { border-color: var(--red); }

.callout-title {
  font-size: 0.78rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
}
.callout-info .callout-title { color: var(--green); }
.callout-warn .callout-title { color: var(--amber); }
.callout-danger .callout-title { color: var(--red); }

.callout-body {
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.callout-body code {
  font-size: 0.75rem;
}

/* ── PAGE NAV ── */
.page-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  gap: 1rem;
}

.page-nav a {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  transition: all 0.2s;
  max-width: 50%;
}
.page-nav a:hover { border-color: var(--green); text-shadow: none; background: var(--bg-surface); }

.page-nav-prev { align-items: flex-start; }
.page-nav-next { align-items: flex-end; }

.page-nav-label {
  font-size: 0.65rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.2rem;
}

.page-nav-title {
  font-size: 0.8rem;
  color: var(--green);
  font-weight: 500;
}

/* ── FOOTER ── */
.docs-footer {
  padding: 2rem 3rem;
  border-top: 1px solid var(--border);
  font-size: 0.72rem;
  color: var(--text-dim);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.docs-footer a {
  color: var(--text-dim);
  margin-left: 1.5rem;
}
.docs-footer a:hover { color: var(--green); text-shadow: none; }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .docs-layout { grid-template-columns: 1fr; }

  .sidebar {
    position: fixed;
    top: 53px;
    left: -280px;
    width: 270px;
    z-index: 150;
    transition: left 0.25s ease;
    border-right: 1px solid var(--border);
  }

  .sidebar.open { left: 0; }
  .sidebar-overlay.open { display: block; }

  .hamburger { display: block; }

  .docs-content { padding: 2rem 1.5rem 3rem; }
  .docs-footer { padding: 1.5rem 1.5rem; flex-direction: column; gap: 0.75rem; text-align: center; }
  .docs-footer a { margin-left: 0; margin: 0 0.75rem; }

  .page-nav { flex-direction: column; }
  .page-nav a { max-width: 100%; }
  .page-nav-next { align-items: flex-start; }
}

/* ── SEARCH (inline header) ── */
.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 320px;
  margin: 0 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  transition: border-color 0.2s;
}
.search-wrap:focus-within { border-color: var(--green-dim); }

.search-icon { flex-shrink: 0; color: var(--text-dim); opacity: 0.6; }

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--text-primary);
  padding: 0.1rem 0.5rem;
  min-width: 0;
}
.search-input::placeholder { color: var(--text-dim); }

.search-kbd {
  font-family: var(--mono);
  font-size: 0.6rem;
  padding: 0.1rem 0.35rem;
  background: var(--bg-deep);
  border: 1px solid var(--border);
  border-radius: 3px;
  color: var(--text-dim);
  flex-shrink: 0;
  pointer-events: none;
}

.search-dropdown {
  display: none;
  position: absolute;
  top: calc(100% + 6px);
  left: -1px;
  right: -1px;
  background: var(--bg-surface);
  border: 1px solid var(--border-bright);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  z-index: 250;
}
.search-dropdown.open { display: block; }

.search-results {
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}

.search-hint {
  padding: 1.5rem 1rem;
  text-align: center;
  font-size: 0.78rem;
  color: var(--text-dim);
}

.search-result {
  display: block;
  padding: 0.55rem 0.85rem;
  border-bottom: 1px solid var(--border);
  transition: background 0.1s;
  text-decoration: none;
}
.search-result:hover, .search-result.active { background: var(--bg-elevated); }
.search-result:last-child { border-bottom: none; }

.search-result-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.1rem;
}
.search-result:hover .search-result-title,
.search-result.active .search-result-title { color: var(--green); }

.search-result-section {
  font-size: 0.6rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.15rem;
}

.search-result-snippet {
  font-size: 0.7rem;
  color: var(--text-secondary);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.search-result-snippet mark {
  background: var(--green-glow);
  color: var(--green);
  border-radius: 2px;
  padding: 0 0.1rem;
}

@media (max-width: 480px) {
  .header { padding: 0.6rem 0.75rem; }
  .header-links { gap: 1rem; }
  .header-links a { font-size: 0.7rem; }
  .docs-content h1 { font-size: 1.5rem; }
  .docs-content { padding: 1.5rem 1rem 2.5rem; }
  .config-table { font-size: 0.72rem; }
  .config-table td, .config-table th { padding: 0.4rem 0.5rem; }
  .search-wrap { max-width: none; margin: 0 0.5rem; }
  .search-kbd { display: none; }
}
</style>
</head>
<body>

<header class="header">
  <a href="/" class="header-logo">
    <span>aidaemon</span>
    <span class="tag">docs</span>
  </a>
  <button class="hamburger" onclick="toggleSidebar()" aria-label="Toggle sidebar">☰</button>
  <div class="search-wrap" id="searchWrap">
    <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    <input type="text" class="search-input" id="searchInput" placeholder="Search..." autocomplete="off" />
    <kbd class="search-kbd" id="searchKbd">⌘K</kbd>
    <div class="search-dropdown" id="searchDropdown"></div>
  </div>
  <nav class="header-links">
    <a href="https://aidaemon.ai">home</a>
    <a href="/">docs</a>
    <a href="https://github.com/davo20019/aidaemon" target="_blank" rel="noopener">github</a>
  </nav>
</header>

<div class="docs-layout">
  ${renderSidebar(page.slug)}
  <div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>
  <main>
    <div class="docs-content">
      ${page.content()}
      ${renderPageNav(page.slug)}
    </div>
    <footer class="docs-footer">
      <span>aidaemon &middot; MIT License &middot; Built with Rust &amp; Tokio</span>
      <div>
        <a href="https://github.com/davo20019/aidaemon" target="_blank" rel="noopener">GitHub</a>
        <a href="https://github.com/davo20019/aidaemon/issues" target="_blank" rel="noopener">Issues</a>
      </div>
    </footer>
  </main>
</div>

<script>
var searchIndex = ${buildSearchIndex()};
var dd = document.getElementById('searchDropdown');
var si = document.getElementById('searchInput');

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

function openDropdown() { dd.classList.add('open'); }
function closeDropdown() { dd.classList.remove('open'); }

si.addEventListener('focus', function() {
  document.getElementById('searchKbd').style.display = 'none';
  if (si.value.trim()) openDropdown();
});
si.addEventListener('blur', function() {
  setTimeout(function() {
    closeDropdown();
    if (!si.value.trim()) document.getElementById('searchKbd').style.display = '';
  }, 150);
});

document.addEventListener('keydown', function(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    si.focus();
    si.select();
  }
  if (e.key === 'Escape' && document.activeElement === si) {
    si.blur();
  }
});

si.addEventListener('input', function() {
  renderResults(si.value);
  if (si.value.trim()) openDropdown();
  else closeDropdown();
});

si.addEventListener('keydown', function(e) {
  var items = dd.querySelectorAll('.search-result');
  var active = dd.querySelector('.search-result.active');
  var idx = Array.from(items).indexOf(active);
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (active) active.classList.remove('active');
    var next = items[idx + 1] || items[0];
    if (next) { next.classList.add('active'); next.scrollIntoView({block:'nearest'}); }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (active) active.classList.remove('active');
    var prev = items[idx - 1] || items[items.length - 1];
    if (prev) { prev.classList.add('active'); prev.scrollIntoView({block:'nearest'}); }
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (active) window.location.href = active.getAttribute('href');
  }
});

function renderResults(query) {
  if (!query.trim()) { dd.innerHTML = ''; return; }
  var q = query.toLowerCase().split(/\\s+/).filter(Boolean);
  var scored = searchIndex.map(function(page) {
    var title = page.title.toLowerCase();
    var section = page.section.toLowerCase();
    var text = page.text.toLowerCase();
    var score = 0;
    for (var i = 0; i < q.length; i++) {
      var w = q[i];
      if (title.includes(w)) score += 10;
      if (section.includes(w)) score += 5;
      if (text.includes(w)) score += 1;
    }
    return { page: page, score: score };
  }).filter(function(r) { return r.score > 0; }).sort(function(a, b) { return b.score - a.score; });

  if (!scored.length) {
    dd.innerHTML = '<div class="search-hint">No results found</div>';
    return;
  }

  dd.innerHTML = '<div class="search-results">' + scored.slice(0, 8).map(function(r, i) {
    var snippet = getSnippet(r.page.text, q);
    return '<a class="search-result' + (i === 0 ? ' active' : '') + '" href="' + r.page.slug + '">'
      + '<div class="search-result-title">' + r.page.title + '</div>'
      + (r.page.section ? '<div class="search-result-section">' + r.page.section + '</div>' : '')
      + '<div class="search-result-snippet">' + snippet + '</div>'
      + '</a>';
  }).join('') + '</div>';
}

function getSnippet(text, words) {
  var lower = text.toLowerCase();
  var bestPos = 0;
  for (var i = 0; i < words.length; i++) {
    var p = lower.indexOf(words[i]);
    if (p !== -1) { bestPos = p; break; }
  }
  var start = Math.max(0, bestPos - 40);
  var end = Math.min(text.length, bestPos + 120);
  var snip = (start > 0 ? '...' : '') + text.slice(start, end) + (end < text.length ? '...' : '');
  for (var j = 0; j < words.length; j++) {
    var escaped = words[j].replace(/[-\\/\\\\^$*+?.()|[\\]]/g, '\\\\$&');
    var re = new RegExp('(' + escaped + ')', 'gi');
    snip = snip.replace(re, '<mark>$1</mark>');
  }
  return snip;
}
</script>

</body>
</html>`;
}

// ─── Route Handler ─────────────────────────────────────────────────────────────

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname.replace(/\/+$/, '') || '/';

    const page = pages.find(p => p.slug === path);
    if (!page) {
      return new Response(layout({
        slug: path,
        title: 'Not Found',
        content: () => '<h1>404</h1><p class="lead">Page not found.</p><p><a href="/">Return to documentation</a></p>',
      }), {
        status: 404,
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }

    return new Response(layout(page), {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': 'public, max-age=60, s-maxage=300',
      },
    });
  },
};
