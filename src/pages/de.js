import { codeBlock, callout, configTable } from '../helpers.js';

const pages = [
  {
    slug: '/',
    section: null,
    title: 'aidaemon Dokumentation — Persönlicher KI-Agent-Daemon',
    description: 'Dokumentation für aidaemon, einen quelloffenen persönlichen KI-Agent-Daemon. Chatte über Telegram, Slack oder Discord. Erweitere mit MCP, nutze jedes LLM.',
    content: () => `
<h1><span class="ai">AI</span>daemon</h1>
<p class="lead">Ein persönlicher KI-Agent, der als Daemon läuft. Immer aktiv, lernt ständig dazu. Chatte über Telegram, erweitere mit MCP, angetrieben von jedem LLM.</p>

<p>aidaemon ist ein selbst gehosteter KI-Agent, geschrieben in Rust, der als Hintergrunddienst auf deinem Rechner läuft. Er verbindet sich mit jedem OpenAI-kompatiblen LLM-Anbieter, kommuniziert über Telegram, Slack oder Discord und kann Tools ausführen, seine eigene Konfiguration verwalten, Fakten merken, im Web browsen und Sub-Agenten starten — alles autonom.</p>

<h2>Hauptmerkmale</h2>
<ul>
  <li><strong>Daemon-Architektur</strong> — läuft als systemd/launchd-Dienst, immer verfügbar</li>
  <li><strong>Multi-Channel</strong> — chatte über Telegram, Slack oder Discord, Mehrbenutzerzugriffskontrolle</li>
  <li><strong>Agentische Tool-Nutzung</strong> — autonomes mehrstufiges Reasoning mit bis zu 10 Iterationen</li>
  <li><strong>MCP-Integration</strong> — erweitere mit jedem Model Context Protocol Server</li>
  <li><strong>Persistenter Speicher</strong> — SQLite-gestützter Verlauf mit semantischer Suche über Embeddings</li>
  <li><strong>Multi-Modell-Routing</strong> — automatische Fast/Primary/Smart-Stufenauswahl</li>
  <li><strong>E-Mail-Trigger</strong> — IMAP-IDLE-Überwachung für Posteingangsbenachrichtigungen</li>
  <li><strong>Befehlsgenehmigung</strong> — interaktive Telegram-Genehmigung für Shell-Befehle</li>
  <li><strong>Skills-System</strong> — dynamische Prompt-Erweiterung über Markdown-Dateien</li>
  <li><strong>Selbstwartung</strong> — liest, aktualisiert, validiert und stellt die eigene Konfiguration wieder her</li>
  <li><strong>Browser-Automatisierung</strong> — Chrome mit persistenten Anmeldesitzungen, Screenshots und Formularausfüllung</li>
  <li><strong>Webrecherche</strong> — eingebaute Websuche (DuckDuckGo/Brave) und URL-Abruf</li>
  <li><strong>Sub-Agent-Erzeugung</strong> — rekursive Agenten-Delegierung für komplexe Aufgaben</li>
  <li><strong>CLI-Agent-Delegierung</strong> — delegiere an Claude, Gemini, Codex, Aider usw.</li>
  <li><strong>Geplante Aufgaben</strong> — cron-artige wiederkehrende Aufgaben mit natürlichsprachlicher Analyse</li>
  <li><strong>Dateiübertragung</strong> — sende und empfange Dateien über Telegram mit Pfadsicherheit</li>
  <li><strong>Secrets-Verwaltung</strong> — Unterstützung für OS-Schlüsselbund und Umgebungsvariablen</li>
  <li><strong>Token-Kostenerfassung</strong> — Nutzungsstatistiken pro Modell, tägliche Budgets, /cost-Befehl</li>
  <li><strong>Event Sourcing</strong> — unveränderliches Ereignisprotokoll mit täglicher Konsolidierung zu Fakten und Prozeduren</li>
  <li><strong>Ziele + Aufgaben</strong> — größere Arbeit in Aufgaben aufteilen und Fortschritt halten</li>
  <li><strong>Gesundheitsüberwachung</strong> — HTTP-, TCP-, Befehls- und Datei-Probes mit Alarmierung</li>
  <li><strong>Dynamische Skills</strong> — installiere aus Registries oder befördere wiederholte Prozeduren automatisch</li>
  <li><strong>Selbst-Updater</strong> — Auto-Update von GitHub-Releases mit konfigurierbaren Modi</li>
  <li><strong>Discord-Integration</strong> — Slash-Befehle, interaktive Genehmigungsschaltflächen, Multi-Bot-Unterstützung</li>
  <li><strong>Befehlsrisikobewertung</strong> — 4-stufige Risikobewertung (Safe/Medium/High/Critical) für Terminal-Befehle</li>
  <li><strong>Personen-Intelligenz</strong> — ein persönliches Kontaktbuch, das Geburtstage, Vorlieben und Beziehungen für dich merkt</li>
</ul>

<h2>Architektur auf einen Blick</h2>
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

<h2>Schnelllinks</h2>
<ul>
  <li><a href="/getting-started">Erste Schritte</a> — aidaemon erstellen und ausführen</li>
  <li><a href="/configuration">Konfigurationsreferenz</a> — vollständige config.toml-Dokumentation</li>
  <li><a href="/tools">Tools</a> — eingebautes und erweiterbares Tool-System</li>
  <li><a href="/telegram">Telegram</a> — Bot-Einrichtung, Befehle, Genehmigungsablauf</li>
  <li><a href="/slack">Slack</a> — Workspace-Integration über Socket Mode</li>
  <li><a href="/discord">Discord</a> — Bot-Einrichtung, Slash-Befehle, Genehmigungsschaltflächen</li>
  <li><a href="/event-sourcing">Event Sourcing</a> — unveränderliche Ereignisse und Konsolidierung</li>
  <li><a href="/plans">Pläne (Legacy)</a> — Hinweise zum alten Planungssystem für ältere Installationen</li>
  <li><a href="/health-monitoring">Gesundheitsüberwachung</a> — Service-Probes und Alarmierung</li>
</ul>
`
  },
  {
    slug: '/getting-started',
    section: 'Getting Started',
    title: 'Übersicht',
    description: 'Erstelle aidaemon aus dem Quellcode, führe den Einrichtungsassistenten aus und habe deinen persönlichen KI-Agenten in wenigen Minuten am Laufen.',
    content: () => `
<h1>Erste Schritte</h1>
<p class="lead">Erstelle aidaemon aus dem Quellcode, führe den Einrichtungsassistenten aus und habe deinen persönlichen KI-Agenten in wenigen Minuten am Laufen.</p>

<h2>Voraussetzungen</h2>
<ul>
  <li><strong>Rust-Toolchain</strong> — installiere über <a href="https://rustup.rs" target="_blank" rel="noopener">rustup.rs</a></li>
  <li><strong>SQLite</strong> — auf macOS/Linux normalerweise vorinstalliert</li>
  <li><strong>Telegram-Bot-Token</strong> — erstelle über <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a></li>
  <li><strong>LLM-API-Schlüssel</strong> — von Google AI Studio, OpenAI, Anthropic, OpenRouter, Moonshot, MiniMax oder nutze lokales Ollama</li>
</ul>

<h2>Schritte</h2>
<ol>
  <li><a href="/getting-started/build">Aus dem Quellcode erstellen</a> — klonen und kompilieren</li>
  <li><a href="/getting-started/wizard">Erststart-Assistent</a> — interaktive Konfigurationseinrichtung</li>
  <li><a href="/configuration">Konfigurieren</a> — config.toml nach Bedarf anpassen</li>
  <li><a href="/service-install">Als Dienst installieren</a> — beim Booten mit systemd/launchd ausführen</li>
</ol>
`
  },
  {
    slug: '/getting-started/build',
    section: 'Getting Started',
    title: 'Aus dem Quellcode erstellen',
    description: 'Installiere aidaemon über Homebrew, cargo install, cargo binstall oder erstelle aus dem Quellcode. Unterstützt Linux, macOS und Windows.',
    content: () => `
<h1>Installation</h1>
<p class="lead">Installiere über ein Einzeiler-Skript, Homebrew, Cargo oder erstelle aus dem Quellcode.</p>

<h2>Einzeiler-Installation (Empfohlen)</h2>
<p>Funktioniert auf jedem Linux-VPS oder macOS-Rechner. Lädt die neueste Binärdatei herunter und überprüft deren SHA256-Prüfsumme:</p>
${codeBlock(`curl -sSfL https://get.aidaemon.ai | bash`, 'bash')}
${callout('success', 'Alles inklusive', 'Vorkompilierte Binärdateien enthalten alle Channel-Integrationen (Telegram, Slack, Discord) und das Browser-Tool. Aktiviere einfach, was du brauchst, in <code>config.toml</code> &mdash; keine Kompilierung erforderlich.')}

<h2>Installation über Homebrew</h2>
<p>Der einfachste Weg zur Installation auf macOS oder Linux:</p>
${codeBlock(`brew install davo20019/tap/aidaemon`, 'bash')}

<h2>Installation über Cargo</h2>
<p>Für Rust-Entwickler. Hinweis: <code>cargo install</code> kompiliert aus dem Quellcode nur mit Standard-Features (Telegram). Um alle Channels einzubinden, füge Feature-Flags hinzu:</p>
${codeBlock(`cargo install aidaemon --features "browser,slack,discord"
# Or for pre-built binaries:
cargo binstall aidaemon`, 'bash')}

<h2>Klonen &amp; aus dem Quellcode erstellen</h2>
<p>Für Mitwirkende und Entwickler:</p>
${codeBlock(`git clone https://github.com/davo20019/aidaemon.git
cd aidaemon
cargo build --release --features "browser,slack,discord"`, 'bash')}

<p>Die kompilierte Binärdatei befindet sich unter <code>./target/release/aidaemon</code>.</p>

<h2>Feature-Flags (nur beim Erstellen aus dem Quellcode)</h2>
<p>Wenn du über das Einzeiler-Skript oder Homebrew installiert hast, sind alle Features bereits enthalten. Diese Flags sind nur beim Erstellen aus dem Quellcode relevant:</p>

<h3>Browser</h3>
<p>Aktiviere Chrome-Automatisierung mit persistenten Anmeldesitzungen:</p>
${codeBlock(`cargo build --release --features browser`, 'bash')}
<p>Nach dem Erstellen führe <code>aidaemon browser login</code> aus, um Chrome zu öffnen und dich bei deinen Diensten anzumelden. Siehe die <a href="/tools/browser">Browser-Tool</a>-Dokumentation für Details.</p>
${callout('info', 'Hinweis', 'Erfordert einen installierten Chromium-basierten Browser auf dem System (Chrome, Chromium, Brave oder Edge).')}

<h3>Slack</h3>
<p>Aktiviere die Slack-Channel-Integration (Socket Mode):</p>
${codeBlock(`cargo build --release --features slack`, 'bash')}

<h3>Discord</h3>
<p>Aktiviere die Discord-Bot-Integration:</p>
${codeBlock(`cargo build --release --features discord`, 'bash')}

<h3>Mehrere Features</h3>
<p>Kombiniere Features nach Bedarf:</p>
${codeBlock(`cargo build --release --features "browser,slack,discord"`, 'bash')}

<h2>Überprüfung</h2>
${codeBlock(`./target/release/aidaemon --help`, 'bash')}

<p>Wenn keine <code>config.toml</code> existiert, startet das Ausführen der Binärdatei automatisch den <a href="/getting-started/wizard">Einrichtungsassistenten</a>.</p>
`
  },
  {
    slug: '/getting-started/wizard',
    section: 'Getting Started',
    title: 'Erststart-Assistent',
    description: 'Beim ersten Start führt aidaemon einen interaktiven Einrichtungsassistenten aus, um deinen LLM-Anbieter und Channel-Tokens zu konfigurieren.',
    content: () => `
<h1>Erststart-Assistent</h1>
<p class="lead">Beim ersten Start (keine config.toml gefunden) führt aidaemon einen interaktiven Einrichtungsassistenten aus.</p>

<h2>Anbieterauswahl</h2>
<p>Der Assistent bietet folgende Voreinstellungen:</p>

<table class="config-table">
<thead><tr><th>Anbieter</th><th>Base URL</th><th>Standard-Modelle</th></tr></thead>
<tbody>
<tr><td><strong>Google AI Studio (Native)</strong></td><td>Native API</td><td>gemini-3-flash-preview / gemini-2.5-flash-lite / gemini-3-pro-preview</td></tr>
<tr><td>OpenAI</td><td><code>https://api.openai.com/v1</code></td><td>gpt-4o / gpt-4o-mini / gpt-4o</td></tr>
<tr><td>Anthropic (Native)</td><td>Native API</td><td>claude-sonnet-4 / claude-haiku-4 / claude-opus-4</td></tr>
<tr><td>Anthropic (OpenRouter)</td><td><code>https://openrouter.ai/api/v1</code></td><td>anthropic/claude-*-Varianten</td></tr>
<tr><td>OpenRouter</td><td><code>https://openrouter.ai/api/v1</code></td><td>Gemischte Anbieter</td></tr>
<tr><td>Moonshot AI (Kimi)</td><td><code>https://api.moonshot.ai/v1</code></td><td>kimi-k2.5 / kimi-k2.5 / kimi-k2-thinking</td></tr>
<tr><td>MiniMax</td><td><code>https://api.minimax.io/v1</code></td><td>MiniMax-M2.5 / MiniMax-M2.5-highspeed / MiniMax-M2.5</td></tr>
<tr><td>Cloudflare AI Gateway</td><td><code>https://gateway.ai.cloudflare.com/v1/&lt;ACCOUNT_ID&gt;/&lt;GATEWAY_ID&gt;/compat</code></td><td>Anbieterabhaengig (zum Beispiel: gpt-4o-mini / gpt-4o-mini / gpt-4o)</td></tr>
<tr><td>Ollama (lokal)</td><td><code>http://localhost:11434/v1</code></td><td>Automatisch erkannt von lokaler Instanz</td></tr>
<tr><td>Benutzerdefiniert</td><td>Benutzerdefiniert</td><td>Benutzerdefiniert</td></tr>
</tbody>
</table>

<h2>Assistentenschritte</h2>
<ol>
  <li><strong>Anbieter auswählen</strong> — wähle aus Voreinstellungen oder gib benutzerdefinierte Werte ein</li>
  <li><strong>API-Schlüssel eingeben</strong> — wird für Ollama übersprungen (keine Authentifizierung nötig)</li>
  <li><strong>Optionales Gateway-Token</strong> — das Cloudflare-Preset kann <code>cf-aig-authorization</code> fuer den Authenticated-Gateway-Modus setzen</li>
  <li><strong>Modellauswahl</strong> — automatisch aus Voreinstellung befüllt oder für Ollama automatisch erkannt</li>
  <li><strong>Telegram-Einrichtung</strong> — Bot-Token und deine numerische Benutzer-ID eingeben</li>
  <li><strong>Browser-Einrichtung</strong> (wenn mit <code>browser</code>-Feature kompiliert) — erkennt Chrome-Profile automatisch</li>
  <li><strong>config.toml generieren</strong> — wird in das aktuelle Verzeichnis geschrieben</li>
</ol>

${callout('info', 'Ollama-Auto-Erkennung', 'Bei der Auswahl von Ollama fragt der Assistent <code>http://localhost:11434/api/tags</code> ab, um alle lokal verfügbaren Modelle aufzulisten und dich auswählen zu lassen.')}

<h2>Chrome-Profilerkennung</h2>
<p>Der Assistent erkennt automatisch Chrome/Chromium-Profile für die Wiederverwendung von Browser-Sitzungen:</p>
<ul>
  <li><strong>macOS:</strong> <code>~/Library/Application Support/Google/Chrome</code></li>
  <li><strong>Linux:</strong> <code>~/.config/google-chrome</code> oder <code>~/.config/chromium</code></li>
</ul>
<p>Die Wiederverwendung eines Profils übernimmt Cookies und Sitzungen, sodass der Agent auf authentifizierte Seiten zugreifen kann.</p>
`
  },
  {
    slug: '/configuration',
    section: 'Configuration',
    title: 'Vollständige config.toml-Referenz',
    description: 'Vollständige config.toml-Referenz für aidaemon. Alle Konfigurationsabschnitte, Schlüssel, Typen und Standardwerte.',
    content: () => `
<h1>Konfiguration</h1>
<p class="lead">Vollständige Referenz für <code>config.toml</code>. Alle Abschnitte und ihre Standardwerte.</p>

<h2>[provider]</h2>
${configTable([
  ['kind', 'string', '"google_genai"', 'Anbietertyp: <code>google_genai</code>, <code>openai_compatible</code> oder <code>anthropic</code>'],
  ['api_key', 'string', '—', 'API-Schlüssel für den Anbieter (erforderlich)'],
  ['gateway_token', 'string', 'null', 'Optionales Cloudflare-AI-Gateway-Token, gesendet als <code>cf-aig-authorization</code>'],
  ['base_url', 'string', '—', 'API-Basis-URL (erforderlich für <code>openai_compatible</code>, nicht verwendet für native Anbieter)'],
])}

<h2>[provider.models]</h2>
${configTable([
  ['primary', 'string', '(provider default)', 'Standardmodell für allgemeine Anfragen'],
  ['fast', 'string', '(same as primary)', 'Modell für einfache/schnelle Anfragen'],
  ['smart', 'string', '(same as primary)', 'Modell für komplexe Reasoning-Aufgaben'],
])}

${callout('info', 'Modell-Standardwerte', 'Anbieterbezogene Standardwerte: <strong>google_genai</strong> → primary=gemini-3-flash-preview, fast=gemini-2.5-flash-lite, smart=gemini-3-pro-preview. <strong>openai_compatible</strong> → alle Stufen standardmäßig openai/gpt-4o. <strong>anthropic</strong> → alle Stufen standardmäßig claude-sonnet-4-20250514. Wenn alle drei Stufen zum gleichen Modell aufgelöst werden, wird Auto-Routing deaktiviert. Siehe <a href="/router">Modell-Routing</a>.')}

<h2>[telegram]</h2>
${configTable([
  ['bot_token', 'string', '—', 'Telegram-Bot-Token von @BotFather (erforderlich)'],
  ['allowed_user_ids', 'array', '[]', 'Numerische Telegram-Benutzer-IDs, die chatten dürfen. Leer = keine Einschränkung.'],
])}

<h2>[slack]</h2>
<p>Erfordert das <code>slack</code>-Feature-Flag zur Kompilierzeit. Siehe <a href="/slack">Slack</a> für die vollständige Einrichtungsanleitung.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Slack-Channel aktivieren'],
  ['app_token', 'string', '—', 'Slack App-Level Token für Socket Mode (<code>xapp-...</code>)'],
  ['bot_token', 'string', '—', 'Slack Bot Token für Web API (<code>xoxb-...</code>)'],
  ['allowed_user_ids', 'array', '[]', 'Slack-Benutzer-IDs, die interagieren dürfen. Leer = keine Einschränkung.'],
  ['use_threads', 'bool', 'true', 'Standardmäßig in Threads antworten'],
])}

<h2>[discord]</h2>
<p>Erfordert das <code>discord</code>-Feature-Flag zur Kompilierzeit. Siehe <a href="/discord">Discord</a> für die vollständige Einrichtungsanleitung.</p>
${configTable([
  ['bot_token', 'string', '&mdash;', 'Discord-Bot-Token vom Developer Portal'],
  ['allowed_user_ids', 'array', '[]', 'Discord-Benutzer-IDs, die interagieren dürfen. Leer = keine Einschränkung.'],
  ['guild_id', 'integer', 'null', 'Optionale Guild/Server-ID, um den Bot auf einen einzelnen Server zu beschränken'],
])}

<h2>[state]</h2>
${configTable([
  ['db_path', 'string', '"aidaemon.db"', 'Pfad zur SQLite-Datenbankdatei'],
  ['working_memory_cap', 'integer', '50', 'Maximale Nachrichten pro Sitzung im Arbeitsspeicher'],
  ['consolidation_interval_hours', 'integer', '6', 'Stunden zwischen Speicherkonsolidierungsläufen'],
  ['max_facts', 'integer', '100', 'Maximale Anzahl von Fakten, die in den System-Prompt eingefügt werden'],
  ['daily_token_budget', 'integer', 'null', 'Maximale Tokens (Eingabe+Ausgabe) pro Tag. Null = unbegrenzt. Wird um Mitternacht UTC zurückgesetzt.'],
  ['encryption_key', 'string', 'null', 'SQLCipher-Verschlüsselungsschlüssel (erfordert <code>encryption</code>-Feature). AES-256 im Ruhezustand.'],
])}

<h2>[terminal]</h2>
${configTable([
  ['allowed_prefixes', 'array', '(see below)', 'Befehlspräfixe, die ohne Benutzerbestätigung automatisch genehmigt werden'],
  ['initial_timeout_secs', 'integer', '30', 'Zeitlimit in Sekunden für die initiale Befehlsausführung'],
  ['max_output_chars', 'integer', '4000', 'Befehlsausgabe über diese Länge hinaus abschneiden'],
  ['permission_mode', 'string', '"default"', 'Risiko-Berechtigungsmodus: <code>default</code>, <code>cautious</code> oder <code>yolo</code>. Siehe <a href="/tools/command-risk">Befehlsrisiko</a>.'],
])}

<p>Standardmäßig erlaubte Präfixe:</p>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

${callout('warn', 'Shell-Operatoren', 'Befehle, die <code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code> <code>$()</code> oder Backticks enthalten, erfordern <strong>immer</strong> eine Genehmigung, auch wenn das Präfix auf der Whitelist steht.')}

<h2>[daemon]</h2>
${configTable([
  ['health_port', 'integer', '8080', 'Port für den Health-Check-HTTP-Endpunkt'],
  ['health_bind', 'string', '"127.0.0.1"', 'Bind-Adresse. Verwende "0.0.0.0" für externen Zugriff.'],
])}

<h2>[triggers.email]</h2>
${configTable([
  ['host', 'string', '—', 'IMAP-Server-Hostname (z.B. imap.gmail.com)'],
  ['port', 'integer', '—', 'IMAP-Port (typischerweise 993 für TLS)'],
  ['username', 'string', '—', 'E-Mail-Konto-Benutzername'],
  ['password', 'string', '—', 'E-Mail-Konto-Passwort oder App-spezifisches Passwort'],
  ['folder', 'string', '"INBOX"', 'Zu überwachender IMAP-Ordner'],
])}

<h2>[mcp.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Pfad oder Name der ausführbaren Datei für den MCP-Server'],
  ['args', 'array', '[]', 'Kommandozeilenargumente'],
])}

<h2>[browser]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Browser-Automatisierungstool aktivieren'],
  ['headless', 'bool', 'true', 'Chrome ohne sichtbares Fenster ausführen'],
  ['screenshot_width', 'integer', '1280', 'Browser-Viewport-Breite in Pixeln'],
  ['screenshot_height', 'integer', '720', 'Browser-Viewport-Höhe in Pixeln'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Chrome-Profilverzeichnis für persistente Sitzungen'],
  ['profile', 'string', 'Default', 'Chrome-Profilname innerhalb von user_data_dir'],
  ['remote_debugging_port', 'integer', 'null', 'Mit bestehendem Chrome auf diesem Port verbinden (fortgeschritten)'],
])}

<h2>[skills]</h2>
${configTable([
  ['dir', 'string', '"skills"', 'Verzeichnis mit Skill-Markdown-Dateien'],
  ['enabled', 'bool', 'true', 'Skills-System aktivieren'],
  ['registries', 'array', '[]', 'URLs von Skill-Registry-JSON-Manifesten zum Durchsuchen/Installieren von Skills'],
])}

<h2>[subagents]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Dem Agenten erlauben, Sub-Agenten zu starten'],
  ['max_depth', 'integer', '3', 'Maximale Verschachtelungstiefe für Sub-Agent-Rekursion'],
  ['max_iterations', 'integer', '10', 'Maximale agentische Schleifenschritte pro Sub-Agent-Aufruf'],
  ['max_response_chars', 'integer', '8000', 'Sub-Agent-Antworten über diese Länge hinaus abschneiden'],
  ['timeout_secs', 'integer', '300', 'Sub-Agent-Ausführungs-Zeitlimit in Sekunden'],
])}

<h2>[cli_agents]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'CLI-Agent-Delegierungstool aktivieren'],
  ['timeout_secs', 'integer', '600', 'Globales Zeitlimit für CLI-Agent-Ausführung'],
  ['max_output_chars', 'integer', '16000', 'Globale maximale Ausgabelänge von CLI-Agenten'],
])}

<h2>[cli_agents.tools.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Auszuführender Befehl'],
  ['args', 'array', '[]', 'Standardargumente, die dem Befehl übergeben werden'],
  ['description', 'string', '—', 'Tool-Beschreibung, die dem LLM angezeigt wird'],
  ['timeout_secs', 'integer', 'null', 'Globales Zeitlimit für dieses Tool überschreiben'],
  ['max_output_chars', 'integer', 'null', 'Globale maximale Ausgabe für dieses Tool überschreiben'],
])}

<h2>[search]</h2>
${configTable([
  ['backend', 'string', '"duckduckgo"', 'Such-Backend: <code>duckduckgo</code> (kein Schlüssel nötig) oder <code>brave</code>'],
  ['api_key', 'string', '""', 'API-Schlüssel für Brave-Suche (unterstützt <code>"keychain"</code>)'],
])}

<h2>[scheduler]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'System für geplante Aufgaben aktivieren'],
  ['tick_interval_secs', 'integer', '30', 'Wie oft der Scheduler nach fälligen Aufgaben prüft'],
])}

<h2>[[scheduler.tasks]]</h2>
<p>Vordefinierte geplante Aufgaben, die beim Start aus der Konfiguration geladen werden:</p>
${configTable([
  ['name', 'string', '—', 'Menschenlesbares Aufgabenlabel'],
  ['schedule', 'string', '—', 'Natürlichsprachlicher oder Cron-Ausdruck (siehe <a href="/scheduler">Scheduler</a>)'],
  ['prompt', 'string', '—', 'Was der Agent tun soll, wenn die Aufgabe ausgelöst wird'],
  ['oneshot', 'bool', 'false', 'Einmal auslösen, dann automatisch löschen'],
  ['trusted', 'bool', 'false', 'Mit voller Autonomie ausführen (keine Terminal-Genehmigung nötig)'],
])}

<h2>[files]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Dateiübertragungs-Tools aktivieren (senden/empfangen)'],
  ['inbox_dir', 'string', '"~/.aidaemon/files/inbox"', 'Verzeichnis für empfangene Dateien von Telegram'],
  ['outbox_dirs', 'array', '["~"]', 'Verzeichnisse, aus denen der Agent Dateien senden darf'],
  ['max_file_size_mb', 'integer', '10', 'Maximale Dateigröße für Übertragungen in MB'],
  ['retention_hours', 'integer', '24', 'Stunden, die empfangene Dateien vor der Bereinigung aufbewahrt werden'],
])}

<h2>Secrets-Verwaltung</h2>
<p>Sensible Konfigurationswerte unterstützen neben Klartext zwei Auflösungsmethoden:</p>

<h3>OS-Schlüsselbund</h3>
<p>Setze jedes geheime Feld auf <code>"keychain"</code>, um es aus dem OS-Schlüsselbund aufzulösen (macOS Keychain, Linux secret-service):</p>
${codeBlock(`[provider]
api_key = "keychain"    # Resolved from keychain entry "api_key"

[telegram]
bot_token = "keychain"  # Resolved from keychain entry "bot_token"`, 'toml')}

<p>Speichere Werte mit dem <code>keychain</code>-CLI-Befehl vor dem ersten Start:</p>
${codeBlock(`# Store a secret (prompts interactively)
aidaemon keychain set api_key
aidaemon keychain set bot_token

# Verify a stored secret (shows masked value)
aidaemon keychain get api_key

# Remove a secret
aidaemon keychain delete api_key`, 'bash')}

${callout('tip', 'Sicherheit', 'Der <code>set</code>-Befehl fragt den Wert interaktiv mit Bestätigung ab und hält Geheimnisse aus deiner Shell-History heraus.')}

<h3>Umgebungsvariablen</h3>
<p>Verwende <code>\${VAR_NAME}</code>-Syntax überall in Konfigurationswerten:</p>
${codeBlock(`[provider]
api_key = "\${GOOGLE_API_KEY}"

[telegram]
bot_token = "\${TELEGRAM_BOT_TOKEN}"`, 'toml')}

${callout('info', 'Unterstützte Schlüsselbund-Felder', 'Felder, die <code>"keychain"</code> unterstützen: <code>provider.api_key</code>, <code>provider.gateway_token</code>, <code>telegram.bot_token</code>, <code>slack.app_token</code>, <code>slack.bot_token</code>, <code>discord.bot_token</code>, <code>triggers.email.password</code>, <code>state.encryption_key</code>, <code>search.api_key</code> und <code>http_auth.*</code>-Profilfelder.')}

<h2>[health]</h2>
<p>Gesundheitsüberwachungssystem. Siehe <a href="/health-monitoring">Gesundheitsüberwachung</a>.</p>
${configTable([
  ['enabled', 'bool', 'true', 'Gesundheitsüberwachungssystem aktivieren'],
  ['tick_interval_secs', 'integer', '30', 'Wie oft nach fälligen Probes geprüft wird'],
  ['result_retention_days', 'integer', '7', 'Tage, die Health-Check-Ergebnisse aufbewahrt werden'],
])}

<h2>[[health.probes]]</h2>
${configTable([
  ['name', 'string', '&mdash;', 'Probe-Name'],
  ['probe_type', 'string', '&mdash;', 'Typ: http, command, file oder port'],
  ['target', 'string', '&mdash;', 'Ziel-URL, Befehl, Dateipfad oder host:port'],
  ['schedule', 'string', '&mdash;', 'Cron-Ausdruck oder Intervall'],
  ['consecutive_failures_alert', 'integer', '3', 'Alarm nach N aufeinanderfolgenden Fehlschlägen'],
  ['alert_session_ids', 'array', '[]', 'Sitzungs-IDs, die bei Alarm benachrichtigt werden'],
])}

<h2>[updates]</h2>
<p>Selbst-Update-System. Siehe <a href="/updates">Selbst-Updater</a>.</p>
${configTable([
  ['mode', 'string', '"check_only"', 'Update-Modus: enable, check_only oder disable'],
  ['check_interval_hours', 'integer', '24', 'Stunden zwischen Update-Prüfungen'],
  ['check_at_utc_hour', 'integer', 'null', 'Bestimmte UTC-Stunde (0-23) für die tägliche Prüfung'],
  ['confirmation_timeout_mins', 'integer', '60', 'Minuten, die auf Benutzerbestätigung gewartet wird'],
])}

<h2>[people]</h2>
<p>Personen-Intelligenz — ein persönliches Kontaktbuch, das von deinem Assistenten verwaltet wird. Siehe <a href="/tools/people">Personen-Intelligenz</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Anfangsstatus für Personen-Intelligenz (kann zur Laufzeit per Chat umgeschaltet werden)'],
  ['auto_extract', 'bool', 'true', 'Automatisch Fakten über Personen aus Gesprächen lernen'],
  ['auto_extract_categories', 'string[]', '["birthday", "preference", "interest", "work", "family", "important_date"]', 'Faktenkategorien, die automatisch extrahiert werden können'],
  ['restricted_categories', 'string[]', '["health", "finance", "political", "religious"]', 'Kategorien, die niemals automatisch extrahiert werden'],
  ['fact_retention_days', 'integer', '180', 'Tage, bevor unbestätigte automatisch extrahierte Fakten bereinigt werden'],
  ['reconnect_reminder_days', 'integer', '30', 'Tage der Inaktivität, bevor eine Wiederverbindung vorgeschlagen wird'],
])}

<h2>Beispielkonfiguration</h2>
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
    title: 'Anbieter-Einrichtung',
    description: 'Konfiguriere LLM-Anbieter für aidaemon: OpenAI-kompatibel, Anthropic nativ oder Google Generative AI Backends.',
    content: () => `
<h1>Anbieter-Einrichtung</h1>
<p class="lead">aidaemon unterstützt drei Anbietertypen, alle im <code>[provider]</code>-Abschnitt konfiguriert.</p>

<h2>Anbieterarten</h2>

<h3>google_genai (empfohlen)</h3>
<p>Native Google Generative AI API. Der empfohlene Anbieter — Gemini-Modelle bieten hervorragende Tool-Use-Fähigkeiten, schnelle Antwortzeiten und großzügigen kostenlosen API-Zugang über <a href="https://aistudio.google.com/" target="_blank" rel="noopener">Google AI Studio</a>.</p>
${codeBlock(`[provider]
kind = "google_genai"
api_key = "AIza..."

[provider.models]
primary = "gemini-3-flash-preview"
fast = "gemini-2.5-flash-lite"
smart = "gemini-3-pro-preview"`, 'toml')}

${callout('info', 'Empfohlene Einrichtung', 'Google AI Studio bietet einen kostenlosen API-Schlüssel mit großzügigen Ratenlimits. Gemini-Modelle haben nativen Tool-Calling-Support, Web-Grounding und funktionieren gut mit aidaemons agentischer Schleife.')}

<h3>Gemini Web Grounding</h3>
<p>Bei Verwendung von <code>google_genai</code> aktiviert aidaemon automatisch Google Search Grounding. Dies ermöglicht es Gemini-Modellen, das Web als Teil ihrer Antworten zu durchsuchen. Modelle, die Grounding mit Function Calling nicht unterstützen, werden automatisch erkannt und fallen graceful zurück.</p>

<h3>openai_compatible</h3>
<p>Funktioniert mit jeder API, die das OpenAI Chat Completions-Format implementiert. Dazu gehören OpenAI, OpenRouter, Moonshot, MiniMax, Cloudflare AI Gateway, Ollama und viele andere.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "sk-..."
base_url = "https://api.openai.com/v1"

[provider.models]
primary = "gpt-4o"
fast = "gpt-4o-mini"
smart = "o1-preview"`, 'toml')}

<h3>anthropic</h3>
<p>Native Anthropic API (Messages API-Format). Verwende dies für direkten Anthropic-Zugang ohne einen OpenAI-kompatiblen Proxy.</p>
${codeBlock(`[provider]
kind = "anthropic"
api_key = "sk-ant-..."

[provider.models]
primary = "claude-sonnet-4-20250514"
fast = "claude-haiku-4-20250414"
smart = "claude-opus-4-20250414"`, 'toml')}

<h2>OpenRouter</h2>
<p>OpenRouter bietet Zugang zu Modellen von mehreren Anbietern über einen einzigen API-Schlüssel und das OpenAI-kompatible Format.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "sk-or-..."
base_url = "https://openrouter.ai/api/v1"

[provider.models]
primary = "anthropic/claude-sonnet-4"
fast = "anthropic/claude-haiku-4"
smart = "anthropic/claude-opus-4"`, 'toml')}

<h2>Moonshot AI (Kimi)</h2>
<p>Moonshot bietet Kimi-Modelle über eine OpenAI-kompatible API an.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "YOUR_MOONSHOT_API_KEY"
base_url = "https://api.moonshot.ai/v1"

[provider.models]
primary = "kimi-k2.5"
fast = "kimi-k2.5"
smart = "kimi-k2-thinking"`, 'toml')}

<h2>MiniMax</h2>
<p>MiniMax bietet einen OpenAI-kompatiblen Endpoint unter <code>https://api.minimax.io/v1</code>.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "YOUR_MINIMAX_API_KEY"
base_url = "https://api.minimax.io/v1"

[provider.models]
primary = "MiniMax-M2.5"
fast = "MiniMax-M2.5-highspeed"
smart = "MiniMax-M2.5"`, 'toml')}

<h2>Cloudflare AI Gateway</h2>
<p>Cloudflare AI Gateway sitzt vor Upstream-Anbietern und stellt einen OpenAI-kompatiblen Endpoint bereit. Nutze das fuer zentrale Logs, Caching, Kontrollen oder Rate-Limits ueber mehrere Anbieter.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "sk-..." # Schluessel des Upstream-Anbieters
gateway_token = "cf-gw-..." # Optional: Authenticated-Gateway-Modus
base_url = "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/compat"

[provider.models]
primary = "gpt-4o-mini"
fast = "gpt-4o-mini"
smart = "gpt-4o"`, 'toml')}

${callout('info', 'Cloudflare-Authentifizierungsmodi', 'Du kannst nur mit <code>api_key</code> arbeiten (Basis-Modus), oder zusaetzlich <code>gateway_token</code> setzen, um <code>cf-aig-authorization</code> fuer den Authenticated-Gateway-Modus zu senden.')}

<h2>Ollama (Lokal)</h2>
<p>Führe Modelle lokal mit Ollama aus. Kein API-Schlüssel erforderlich.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "ollama"
base_url = "http://localhost:11434/v1"

[provider.models]
primary = "llama3.1"
fast = "llama3.1"
smart = "llama3.1"`, 'toml')}

${callout('info', 'Ollama-Erkennung', 'Der Einrichtungsassistent erkennt verfügbare Ollama-Modelle automatisch durch Abfrage von <code>http://localhost:11434/api/tags</code>.')}

<h2>llama.cpp (Lokal)</h2>
<p>Du kannst aidaemon auch mit <code>llama.cpp</code> ueber <code>llama-server</code> im OpenAI-kompatiblen Modus betreiben.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "llama" # Beliebiger Wert, falls dein lokaler Server keine Auth erzwingt
base_url = "http://127.0.0.1:8080/v1"

[provider.models]
primary = "dein-modell-id"
fast = "dein-modell-id"
smart = "dein-modell-id"`, 'toml')}

${callout('warn', 'llama.cpp-Anforderungen', '<code>/v1/chat/completions</code> ist erforderlich. <code>/v1/models</code> wird dringend empfohlen, damit der Befehl <code>/models</code> funktioniert. Aus Sicherheitsgruenden erlaubt aidaemon HTTP nur zu localhost-Adressen.')}
`
  },
  {
    slug: '/telegram',
    section: 'Telegram',
    title: 'Bot-Einrichtung',
    description: 'Richte aidaemon als Telegram-Bot ein. Erstelle einen Bot über BotFather, konfiguriere Tokens und aktiviere Nachrichten.',
    content: () => `
<h1>Telegram-Bot-Einrichtung</h1>
<p class="lead">Telegram ist aidaemons primärer Channel, aufgebaut auf dem teloxide-Framework. Siehe auch <a href="/slack">Slack</a> für Workspace-Integration.</p>

<h2>Einen Bot erstellen</h2>
<ol>
  <li>Sende eine Nachricht an <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a> auf Telegram</li>
  <li>Sende <code>/newbot</code> und folge den Anweisungen</li>
  <li>Kopiere das Bot-Token (Format: <code>123456789:ABCdefGHIjklMNOpqrSTUvwxYZ</code>)</li>
</ol>

<h2>Deine Benutzer-ID ermitteln</h2>
<p>Deine numerische Telegram-Benutzer-ID wird für die <code>allowed_user_ids</code>-Liste benötigt. Du findest sie, indem du <a href="https://t.me/userinfobot" target="_blank" rel="noopener">@userinfobot</a> eine Nachricht sendest.</p>

<h2>Konfiguration</h2>
${codeBlock(`[telegram]
bot_token = "123456789:ABCdefGHIjklMNOpqrSTUvwxYZ"
allowed_user_ids = [123456789]`, 'toml', 'config.toml')}

${callout('warn', 'Zugriffskontrolle', 'Wenn <code>allowed_user_ids</code> leer ist, kann <strong>jeder</strong>, der deinen Bot findet, mit ihm chatten. Setze dies immer in der Produktion.')}

<h2>Funktionen</h2>
<ul>
  <li><strong>Tipp-Indikator</strong> — wird alle 4 Sekunden während der Agent-Verarbeitung gesendet</li>
  <li><strong>Markdown-Rendering</strong> — Agent-Antworten werden in Telegram-HTML konvertiert</li>
  <li><strong>Aufteilung langer Nachrichten</strong> — Antworten über 4096 Zeichen werden an Absatz-/Zeilengrenzen aufgeteilt</li>
  <li><strong>Screenshot-Freigabe</strong> — Browser-Screenshots werden als Fotos mit Bildunterschriften gesendet</li>
  <li><strong>Dateiübertragung</strong> — sende und empfange Dokumente, Fotos, Audio, Video über Telegram</li>
  <li><strong>Live-Aufgabenstatus</strong> — <code>/tasks</code> zeigt laufende Agent-Aufgaben mit verstrichener Zeit</li>
  <li><strong>Inline-Genehmigungsschaltflächen</strong> — Einmal erlauben / Immer erlauben / Ablehnen-Schaltflächen für Befehlsgenehmigung</li>
  <li><strong>Multi-Bot-Unterstützung</strong> — konfiguriere mehrere Telegram-Bots über <code>[[telegram.bots]]</code></li>
  <li><strong>Erweiterte Dateiverarbeitung</strong> — MIME-Typ-Erkennung, Größenbeschränkungen und Pfadsicherheitsvalidierung</li>
</ul>

<h2>Wiederholungsverhalten</h2>
<p>Der Telegram-Dispatcher verwendet exponentielles Backoff bei Abstürzen:</p>
<ul>
  <li>Initiales Backoff: 5s</li>
  <li>Verdoppelt sich bei jedem Absturz: 5s → 10s → 20s → 40s → 60s (max)</li>
  <li>Wird auf 5s zurückgesetzt, wenn der Bot 60+ Sekunden stabil läuft</li>
</ul>
`
  },
  {
    slug: '/telegram/commands',
    section: 'Telegram',
    title: 'Befehle',
    description: 'Integrierte Telegram-Slash-Befehle für aidaemon: /model, /clear, /cost, /status, /help und mehr.',
    content: () => `
<h1>Telegram-Befehle</h1>
<p class="lead">Integrierte Slash-Befehle zur Steuerung des Agenten über Telegram.</p>

<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Das aktuell aktive Modell anzeigen</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Zu einem bestimmten Modell wechseln (deaktiviert Auto-Routing)</td></tr>
<tr><td><code>/models</code></td><td>Alle verfügbaren Modelle des Anbieters auflisten (aktives Modell markiert)</td></tr>
<tr><td><code>/auto</code></td><td>Automatisches Modell-Routing basierend auf Abfragekomplexität wieder aktivieren</td></tr>
<tr><td><code>/reload</code></td><td>config.toml neu laden (mit automatischer Wiederherstellung aus Backup bei Fehler)</td></tr>
<tr><td><code>/restart</code></td><td>Vollständiger Neustart — neuen Prozess ausführen (übernimmt neue Binärdatei, Konfiguration, MCP-Server)</td></tr>
<tr><td><code>/cost</code></td><td>Token-Nutzungsstatistiken anzeigen (letzte 24h, 7d, Top-Modelle)</td></tr>
<tr><td><code>/tasks</code></td><td>Laufende und kürzliche Agent-Aufgaben für deine Sitzung auflisten</td></tr>
<tr><td><code>/cancel &lt;id&gt;</code></td><td>Eine laufende Aufgabe nach ID abbrechen</td></tr>
<tr><td><code>/help</code></td><td>Liste der verfügbaren Befehle anzeigen</td></tr>
<tr><td><code>/start</code></td><td>Gleich wie /help</td></tr>
</tbody>
</table>

<h2>Modellwechsel</h2>
${codeBlock(`/model claude-3.5-sonnet
# Switches to claude-3.5-sonnet and disables auto-routing

/auto
# Re-enables automatic Fast/Primary/Smart routing`, 'text')}

${callout('info', 'Modell-Override', 'Wenn du ein Modell manuell mit <code>/model</code> festlegst, wird Auto-Routing deaktiviert, bis du <code>/auto</code> sendest.')}

<h2>Konfiguration neu laden</h2>
<p>Der Befehl <code>/reload</code> lädt <code>config.toml</code> zur Laufzeit neu. Wenn die Konfiguration ungültig ist, stellt aidaemon automatisch aus einem Backup wieder her:</p>
<ol>
  <li><code>.toml.lastgood</code> — letzte Konfiguration, die erfolgreich einen LLM-Aufruf abgeschlossen hat</li>
  <li><code>.toml.bak</code> → <code>.toml.bak.1</code> → <code>.toml.bak.2</code> — 3-stufige Rotation</li>
</ol>
`
  },
  {
    slug: '/telegram/approval',
    section: 'Telegram',
    title: 'Genehmigungsablauf',
    description: 'Interaktive Inline-Tastatur-Genehmigung für eingeschränkte Terminal-Befehle in Telegram.',
    content: () => `
<h1>Befehlsgenehmigungsablauf</h1>
<p class="lead">Interaktive Inline-Tastatur-Genehmigung für eingeschränkte Terminal-Befehle.</p>

<h2>So funktioniert es</h2>
<ol>
  <li>Der Agent fordert einen Terminal-Befehl an, der nicht in der Liste der erlaubten Präfixe steht (oder Shell-Operatoren enthält)</li>
  <li>Eine Genehmigungsanfrage wird an den ersten Benutzer in <code>allowed_user_ids</code> gesendet</li>
  <li>Der Benutzer sieht eine Inline-Tastatur mit drei Schaltflächen:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Befehl erfordert Genehmigung:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Einmal erlauben</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Immer erlauben</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Ablehnen</span>
  </div>
</div>

<h2>Genehmigungsoptionen</h2>
<table class="config-table">
<thead><tr><th>Option</th><th>Verhalten</th></tr></thead>
<tbody>
<tr><td><strong>Einmal erlauben</strong></td><td>Den Befehl nur dieses Mal ausführen</td></tr>
<tr><td><strong>Immer erlauben</strong></td><td>Ausführen und das Befehlspräfix zu <code>terminal.allowed_prefixes</code> in config.toml hinzufügen</td></tr>
<tr><td><strong>Ablehnen</strong></td><td>Den Befehl ablehnen — Agent erhält Ablehnungsnachricht</td></tr>
</tbody>
</table>

${callout('warn', 'Shell-Operatoren', 'Befehle, die <code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code> <code>$()</code> oder Backticks enthalten, erfordern <strong>immer</strong> eine Genehmigung, auch wenn das Präfix auf der Whitelist steht. Dies verhindert Injection-Angriffe.')}

${callout('danger', 'Nicht vertrauenswürdige Quellen', 'Sitzungen, die von Triggern (wie E-Mail) stammen, werden als nicht vertrauenswürdig markiert. Alle Terminal-Befehle in nicht vertrauenswürdigen Sitzungen erfordern <strong>immer</strong> eine Genehmigung, unabhängig von erlaubten Präfixen.')}
`
  },
  {
    slug: '/slack',
    section: 'Slack',
    title: 'Workspace-Einrichtung',
    description: 'Verbinde aidaemon mit Slack über Socket Mode. Erstelle eine Slack-App, konfiguriere OAuth-Berechtigungen und aktiviere Echtzeit-Nachrichten.',
    content: () => `
<h1>Slack-Integration</h1>
<p class="lead">Verbinde aidaemon mit deinem Slack-Workspace über Socket Mode für Echtzeit-Nachrichten.</p>

${callout('success', 'Vorkompilierte Binärdateien', 'Wenn du über das Einzeiler-Skript oder Homebrew installiert hast, ist Slack-Unterstützung bereits enthalten. Konfiguriere einfach <code>config.toml</code> unten. Das Feature-Flag wird nur beim <a href="/getting-started/build">Erstellen aus dem Quellcode</a> benötigt.')}

<h2>Eine Slack-App erstellen</h2>
<ol>
  <li>Gehe zu <a href="https://api.slack.com/apps" target="_blank" rel="noopener">api.slack.com/apps</a> und klicke auf <strong>Create New App</strong></li>
  <li>Wähle <strong>From scratch</strong>, benenne sie (z.B. "aidaemon") und wähle deinen Workspace</li>
  <li>Unter <strong>Socket Mode</strong> aktiviere es und generiere ein <strong>App-Level Token</strong> mit dem <code>connections:write</code>-Scope &mdash; das ist dein <code>app_token</code> (<code>xapp-...</code>)</li>
  <li>Unter <strong>OAuth &amp; Permissions</strong> füge diese <strong>Bot Token Scopes</strong> hinzu:
    <ul>
      <li><code>channels:read</code> &mdash; Mitglieder in öffentlichen Channels auflisten</li>
      <li><code>chat:write</code> &mdash; Nachrichten senden</li>
      <li><code>files:read</code> &mdash; von Benutzern gesendete Dateien herunterladen</li>
      <li><code>files:write</code> &mdash; Dateien nach Slack hochladen</li>
      <li><code>groups:read</code> &mdash; Mitglieder in privaten Channels auflisten (benötigt zum Auflösen von Benutzernamen in privaten Channels)</li>
      <li><code>im:read</code> &mdash; DM-Metadaten lesen (erforderlich für Dateiübertragungen in Direktnachrichten)</li>
      <li><code>reactions:write</code> &mdash; Status-Reaktionen hinzufügen (Sanduhr während der Verarbeitung)</li>
      <li><code>users:read</code> &mdash; Benutzerinformationen auflösen</li>
    </ul>
  </li>
  <li>Unter <strong>Event Subscriptions</strong> aktiviere Events und abonniere:
    <ul>
      <li><code>message.channels</code> &mdash; Nachrichten in öffentlichen Channels</li>
      <li><code>message.groups</code> &mdash; Nachrichten in privaten Channels</li>
      <li><code>message.im</code> &mdash; Direktnachrichten</li>
    </ul>
  </li>
  <li>Unter <strong>App Home</strong> scrolle zu <strong>Show Tabs</strong> und aktiviere den <strong>Messages Tab</strong>. Aktiviere <strong>"Allow users to send Slash commands and messages from the messages tab"</strong> &mdash; ohne dies können Benutzer dem Bot keine DMs senden.</li>
  <li>Installiere die App in deinem Workspace &mdash; kopiere das <strong>Bot User OAuth Token</strong> (<code>xoxb-...</code>)</li>
</ol>

<h2>Konfiguration</h2>
${codeBlock(`[slack]
enabled = true
app_token = "xapp-1-..."
bot_token = "xoxb-..."
allowed_user_ids = ["U123456789"]
use_threads = true`, 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'Slack-Channel aktivieren'],
  ['app_token', 'string', '&mdash;', 'App-Level Token für Socket Mode (<code>xapp-...</code>). Unterstützt <code>"keychain"</code> und <code>$&#123;ENV&#125;</code>.'],
  ['bot_token', 'string', '&mdash;', 'Bot User OAuth Token (<code>xoxb-...</code>). Unterstützt <code>"keychain"</code> und <code>$&#123;ENV&#125;</code>.'],
  ['allowed_user_ids', 'array', '[]', 'Slack-Benutzer-IDs, die interagieren dürfen. Leer = keine Einschränkung.'],
  ['use_threads', 'bool', 'true', 'Standardmäßig in Threads antworten. Jeder Thread erhält seinen eigenen Sitzungskontext.'],
])}

<h2>Deine Slack-Benutzer-ID finden</h2>
<p>Klicke auf dein Profil in Slack, dann klicke auf <strong>Mehr</strong> &rarr; <strong>Mitglieds-ID kopieren</strong>. Das Format ist <code>U</code> gefolgt von alphanumerischen Zeichen (z.B. <code>U0123ABCDEF</code>).</p>

<h2>Funktionen</h2>
<ul>
  <li><strong>Socket Mode</strong> &mdash; Echtzeit-WebSocket-Verbindung, keine öffentliche URL erforderlich</li>
  <li><strong>Thread-Antworten</strong> &mdash; konfigurierbare Thread-Konversationen mit Sitzungskontext pro Thread</li>
  <li><strong>Dateiübertragung</strong> &mdash; sende und empfange Dateien über Slack</li>
  <li><strong>Block Kit-Genehmigungen</strong> &mdash; interaktive Schaltflächen für Terminal-Befehlsgenehmigung</li>
  <li><strong>Slash-Befehle</strong> &mdash; gleiche Befehle wie in Telegram (<code>/cost</code>, <code>/model</code>, <code>/tasks</code> usw.)</li>
  <li><strong>Status-Reaktionen</strong> &mdash; Sanduhr-Emoji während der Verarbeitung, wird bei Abschluss entfernt</li>
  <li><strong>Markdown-Konvertierung</strong> &mdash; Standard-Markdown wird automatisch in Slack-mrkdwn-Format konvertiert</li>
  <li><strong>Nachrichtenaufteilung</strong> &mdash; lange Antworten werden aufgeteilt, um Slacks 39KB-Nachrichtenlimit einzuhalten</li>
  <li><strong>Auto-Reconnect</strong> &mdash; exponentielles Backoff bei Verbindungsfehlern (5s &rarr; 60s max)</li>
</ul>

<h2>Sitzungsmodell</h2>
<p>Slack-Sitzungen werden durch Channel und Thread identifiziert:</p>
<ul>
  <li><strong>Channel-Nachricht:</strong> <code>slack:{channel_id}</code></li>
  <li><strong>Thread-Nachricht:</strong> <code>slack:{channel_id}:{thread_ts}</code> (wenn <code>use_threads</code> aktiviert ist)</li>
</ul>
<p>Jede Sitzung behält ihren eigenen Konversationsverlauf, Arbeitsspeicher und Faktenkontext.</p>

${callout('warn', 'Zugriffskontrolle', 'Wenn <code>allowed_user_ids</code> leer ist, kann <strong>jeder</strong> im Workspace, der dem Bot eine Nachricht senden kann, mit ihm interagieren. Setze dies immer in der Produktion.')}
`
  },
  {
    slug: '/slack/commands',
    section: 'Slack',
    title: 'Befehle',
    description: 'Slash-Befehle für aidaemon in Slack: /model, /clear, /cost, /status und mehr.',
    content: () => `
<h1>Slack-Befehle</h1>
<p class="lead">In Slack verfügbare Slash-Befehle. Die gleiche Befehlssammlung wie in Telegram.</p>

<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Das aktuell aktive Modell anzeigen</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Zu einem bestimmten Modell wechseln (deaktiviert Auto-Routing)</td></tr>
<tr><td><code>/models</code></td><td>Alle verfügbaren Modelle des Anbieters auflisten (aktives Modell markiert)</td></tr>
<tr><td><code>/auto</code></td><td>Automatisches Modell-Routing basierend auf Abfragekomplexität wieder aktivieren</td></tr>
<tr><td><code>/reload</code></td><td>config.toml neu laden (mit automatischer Wiederherstellung aus Backup bei Fehler)</td></tr>
<tr><td><code>/restart</code></td><td>Vollständiger Neustart &mdash; neuen Prozess ausführen (übernimmt neue Binärdatei, Konfiguration, MCP-Server)</td></tr>
<tr><td><code>/cost</code></td><td>Token-Nutzungsstatistiken anzeigen (letzte 24h, 7d, Top-Modelle)</td></tr>
<tr><td><code>/tasks</code></td><td>Laufende und kürzliche Agent-Aufgaben für deine Sitzung auflisten</td></tr>
<tr><td><code>/cancel &lt;id&gt;</code></td><td>Eine laufende Aufgabe nach ID abbrechen</td></tr>
<tr><td><code>/help</code></td><td>Liste der verfügbaren Befehle anzeigen</td></tr>
</tbody>
</table>

${callout('info', 'Slash vs. Klartext', 'In Slack werden diese Befehle als reguläre Nachrichten gesendet, die mit <code>/</code> in einer DM oder einem Channel mit dem Bot beginnen. Sie sind nicht als Slack-Slash-Befehle im App-Manifest registriert.')}
`
  },
  {
    slug: '/slack/approval',
    section: 'Slack',
    title: 'Genehmigungsablauf',
    description: 'Interaktive Block Kit-Buttons zur Genehmigung eingeschränkter Terminal-Befehle in Slack.',
    content: () => `
<h1>Slack-Genehmigungsablauf</h1>
<p class="lead">Interaktive Block Kit-Buttons zur Genehmigung eingeschränkter Terminal-Befehle in Slack.</p>

<h2>So funktioniert es</h2>
<ol>
  <li>Der Agent fordert einen Terminal-Befehl an, der nicht in der Liste der erlaubten Präfixe steht (oder Shell-Operatoren enthält)</li>
  <li>Eine Genehmigungsnachricht wird mit Block Kit-Buttons an den Slack-Channel/Thread gesendet</li>
  <li>Der Benutzer sieht drei interaktive Buttons:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Befehl erfordert Genehmigung:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow Once</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Allow Always</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Genehmigungsoptionen</h2>
<table class="config-table">
<thead><tr><th>Option</th><th>Verhalten</th></tr></thead>
<tbody>
<tr><td><strong>Allow Once</strong></td><td>Den Befehl nur dieses eine Mal ausführen</td></tr>
<tr><td><strong>Allow Always</strong></td><td>Ausführen und das Befehlspräfix für zukünftige automatische Genehmigung speichern</td></tr>
<tr><td><strong>Deny</strong></td><td>Den Befehl ablehnen &mdash; der Agent erhält eine Ablehnungsnachricht</td></tr>
</tbody>
</table>

<p>Der Genehmigungsablauf in Slack funktioniert identisch zu Telegram. &ldquo;Allow Always&rdquo; speichert das Präfix in SQLite, sodass es Daemon-Neustarts übersteht.</p>

${callout('warn', 'Shell-Operatoren', 'Befehle, die <code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code> <code>$()</code> oder Backticks enthalten, erfordern <strong>immer</strong> eine Genehmigung, selbst wenn das Präfix auf der Whitelist steht.')}
`
  },
{
    slug: '/discord',
    section: 'Discord',
    title: 'Bot-Einrichtung',
    description: 'Verbinde aidaemon mit Discord. Erstelle eine Discord-Anwendung, konfiguriere den Bot und aktiviere Slash-Befehle.',
    content: () => `
<h1>Discord Bot-Einrichtung</h1>
<p class="lead">Verbinde aidaemon mit Discord über die Gateway-API.</p>

${callout('success', 'Vorgefertigte Binärdateien', 'Wenn du über das Einzeiler-Skript oder Homebrew installiert hast, ist Discord-Unterstützung bereits enthalten. Konfiguriere einfach <code>config.toml</code> wie unten beschrieben. Das Feature-Flag wird nur beim <a href="/getting-started/build">Kompilieren aus dem Quellcode</a> benötigt.')}

<h2>Eine Discord-Anwendung erstellen</h2>
<ol>
  <li>Gehe zum <a href="https://discord.com/developers/applications" target="_blank" rel="noopener">Discord Developer Portal</a></li>
  <li>Klicke auf <strong>New Application</strong> und benenne sie (z.B. &ldquo;aidaemon&rdquo;)</li>
  <li>Unter <strong>Bot</strong> klicke auf <strong>Add Bot</strong></li>
  <li>Kopiere das <strong>Bot Token</strong> &mdash; dies ist dein <code>bot_token</code></li>
  <li>Aktiviere diese <strong>Privileged Gateway Intents</strong>:
    <ul>
      <li><code>Message Content Intent</code> &mdash; Nachrichtentext lesen</li>
      <li><code>Server Members Intent</code> &mdash; Benutzerinformationen auflösen</li>
    </ul>
  </li>
  <li>Unter <strong>OAuth2 &rarr; URL Generator</strong> wähle die Scopes <code>bot</code> und <code>applications.commands</code>, dann die Berechtigungen: Send Messages, Read Message History, Attach Files, Use Slash Commands</li>
  <li>Verwende die generierte URL, um den Bot auf deinen Server einzuladen</li>
</ol>

<h2>Konfiguration</h2>
${codeBlock(`[discord]
bot_token = "MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.AbCdEf.xxxxx"
allowed_user_ids = [123456789012345678]
guild_id = 987654321098765432`, 'toml', 'config.toml')}

${configTable([
  ['bot_token', 'string', '&mdash;', 'Discord Bot-Token aus dem Developer Portal. Unterstützt <code>"keychain"</code>.'],
  ['allowed_user_ids', 'array', '[]', 'Discord-Benutzer-IDs (Snowflake-Ganzzahlen), die interagieren dürfen. Leer = keine Einschränkung.'],
  ['guild_id', 'integer', 'null', 'Optionale Server-/Guild-ID. Wenn gesetzt, antwortet der Bot nur auf diesem Server.'],
])}

<h2>Deine Discord-Benutzer-ID ermitteln</h2>
<p>Aktiviere den <strong>Entwicklermodus</strong> in den Discord-Einstellungen (Darstellung &rarr; Erweitert), dann klicke mit der rechten Maustaste auf deinen Benutzernamen und wähle <strong>ID kopieren</strong>.</p>

<h2>Funktionen</h2>
<ul>
  <li><strong>Gateway-Verbindung</strong> &mdash; Echtzeit-WebSocket-Verbindung über das Serenity-Framework</li>
  <li><strong>Slash-Befehle</strong> &mdash; registrierte Anwendungsbefehle (siehe <a href="/discord/commands">Befehle</a>)</li>
  <li><strong>Interaktive Buttons</strong> &mdash; Genehmigungsablauf mit klickbaren Buttons (siehe <a href="/discord/approval">Genehmigungsablauf</a>)</li>
  <li><strong>Dateiübertragung</strong> &mdash; Dateien als Discord-Anhänge senden und empfangen</li>
  <li><strong>Nachrichtenaufteilung</strong> &mdash; lange Antworten werden aufgeteilt, um Discords 2000-Zeichen-Nachrichtenlimit einzuhalten</li>
  <li><strong>Automatische Wiederverbindung</strong> &mdash; exponentielles Backoff bei Verbindungsfehlern (5s &rarr; 60s Maximum)</li>
  <li><strong>Benutzer-Allowlist</strong> &mdash; Zugriffskontrolle pro Bot-Token</li>
  <li><strong>Multi-Bot-Unterstützung</strong> &mdash; mehrere Discord-Bots mit separaten Konfigurationen betreiben</li>
</ul>

<h2>Sitzungsmodell</h2>
<p>Discord-Sitzungen werden nach Channel identifiziert:</p>
<ul>
  <li><strong>Channel-Nachricht:</strong> <code>discord:{channel_id}</code></li>
</ul>
<p>Jeder Channel pflegt seinen eigenen Gesprächsverlauf, Arbeitsgedächtnis und Faktenkontext.</p>

${callout('warn', 'Zugriffskontrolle', 'Wenn <code>allowed_user_ids</code> leer ist, kann <strong>jeder</strong>, der dem Bot eine Nachricht senden kann, mit ihm interagieren. Setze dies immer im Produktivbetrieb.')}
`
  },
  {
    slug: '/discord/commands',
    section: 'Discord',
    title: 'Slash-Befehle',
    description: 'Registrierte Discord-Anwendungsbefehle für aidaemon: /ask, /model, /clear, /status und mehr.',
    content: () => `
<h1>Discord Slash-Befehle</h1>
<p class="lead">Registrierte Anwendungsbefehle, die in Discord verfügbar sind. Erreichbar über <code>/</code> in der Nachrichteneingabe.</p>

<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>/ask &lt;message&gt;</code></td><td>Eine Nachricht an den Agenten senden</td></tr>
<tr><td><code>/model</code></td><td>Das aktuelle aktive Modell anzeigen</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Zu einem bestimmten Modell wechseln (deaktiviert Auto-Routing)</td></tr>
<tr><td><code>/models</code></td><td>Alle verfügbaren Modelle des Anbieters auflisten</td></tr>
<tr><td><code>/auto</code></td><td>Automatisches Modell-Routing wieder aktivieren</td></tr>
<tr><td><code>/clear</code></td><td>Sitzungs-Gesprächsverlauf löschen</td></tr>
<tr><td><code>/cost</code></td><td>Token-Nutzungsstatistiken anzeigen</td></tr>
<tr><td><code>/tasks</code></td><td>Laufende und kürzliche Agent-Aufgaben auflisten</td></tr>
<tr><td><code>/cancel &lt;id&gt;</code></td><td>Eine laufende Aufgabe nach ID abbrechen</td></tr>
<tr><td><code>/status</code></td><td>Daemon-Status und Betriebszeit anzeigen</td></tr>
<tr><td><code>/help</code></td><td>Liste der verfügbaren Befehle anzeigen</td></tr>
</tbody>
</table>

<h2>Reguläre Nachrichten</h2>
<p>Zusätzlich zu Slash-Befehlen können Benutzer auch interagieren, indem sie den Bot erwähnen oder Direktnachrichten senden. Der Bot verarbeitet diese als reguläre Gesprächsnachrichten.</p>

${callout('info', 'Befehlsregistrierung', 'Slash-Befehle werden automatisch bei Discord registriert, wenn der Bot eine Verbindung herstellt. Wenn du die guild_id änderst, werden die Befehle für den neuen Geltungsbereich neu registriert.')}
`
  },
  {
    slug: '/discord/approval',
    section: 'Discord',
    title: 'Genehmigungsablauf',
    description: 'Interaktive Button-Komponenten zur Genehmigung eingeschränkter Terminal-Befehle in Discord.',
    content: () => `
<h1>Discord-Genehmigungsablauf</h1>
<p class="lead">Interaktive Button-Komponenten zur Genehmigung eingeschränkter Terminal-Befehle in Discord.</p>

<h2>So funktioniert es</h2>
<ol>
  <li>Der Agent fordert einen Terminal-Befehl an, der nicht in der Liste der erlaubten Präfixe steht (oder Shell-Operatoren enthält)</li>
  <li>Eine Genehmigungsnachricht wird mit interaktiven Buttons an den Discord-Channel gesendet</li>
  <li>Der Benutzer sieht drei klickbare Buttons:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Befehl erfordert Genehmigung:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow Once</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Allow Always</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Genehmigungsoptionen</h2>
<table class="config-table">
<thead><tr><th>Option</th><th>Verhalten</th></tr></thead>
<tbody>
<tr><td><strong>Allow Once</strong></td><td>Den Befehl nur dieses eine Mal ausführen</td></tr>
<tr><td><strong>Allow Always</strong></td><td>Ausführen und das Befehlspräfix für zukünftige automatische Genehmigung speichern</td></tr>
<tr><td><strong>Deny</strong></td><td>Den Befehl ablehnen &mdash; der Agent erhält eine Ablehnungsnachricht</td></tr>
</tbody>
</table>

<p>Der Genehmigungsablauf in Discord verwendet die <code>ComponentInteraction</code>-API von Serenity. &ldquo;Allow Always&rdquo; speichert das Präfix in SQLite, sodass es Daemon-Neustarts übersteht.</p>

${callout('info', 'Button-Ablauf', 'Discord-Interaction-Tokens laufen nach 15 Minuten ab. Wenn innerhalb dieses Zeitfensters keine Antwort erfolgt, läuft die Genehmigungsanfrage ab und der Befehl wird abgelehnt.')}
`
  },
    {
    slug: '/tools',
    section: 'Tools',
    title: 'Tools-Übersicht',
    description: 'Übersicht aller integrierten Tools, die der aidaemon LLM-Agent aufrufen kann: Terminal, Gedächtnis, Browser, Websuche und mehr.',
    content: () => `
<h1>Tools</h1>
<p class="lead">aidaemon stellt eine Reihe integrierter Tools bereit, die das LLM während der agentischen Schleife autonom aufrufen kann.</p>

<h2>Tool Trait</h2>
<p>Alle Tools implementieren die gleiche Schnittstelle:</p>
${codeBlock(`trait Tool {
    fn name(&self) -> &str;
    fn description(&self) -> &str;
    fn schema(&self) -> Value;       // OpenAI function-calling format
    async fn call(&self, args: &str) -> Result<String>;
}`, 'rust')}

<h2>Integrierte Tools</h2>
<table class="config-table">
<thead><tr><th>Tool</th><th>Beschreibung</th><th>Konfiguration</th></tr></thead>
<tbody>
<tr><td><a href="/tools/terminal"><code>terminal</code></a></td><td>Shell-Befehle mit Genehmigungsablauf ausführen</td><td>[terminal]</td></tr>
<tr><td><a href="/tools/system-info"><code>system_info</code></a></td><td>Hostname, Betriebssystem, Betriebszeit, Speicher abfragen</td><td>Immer aktiviert</td></tr>
<tr><td><a href="/tools/memory"><code>remember_fact</code></a></td><td>Langzeitfakten in SQLite speichern</td><td>Immer aktiviert</td></tr>
<tr><td><a href="/tools/config-manager"><code>manage_config</code></a></td><td>config.toml lesen/aktualisieren/wiederherstellen</td><td>Immer aktiviert</td></tr>
<tr><td><a href="/tools/web-search"><code>web_search</code></a></td><td>Im Web suchen (DuckDuckGo oder Brave)</td><td>[search]</td></tr>
<tr><td><a href="/tools/web-fetch"><code>web_fetch</code></a></td><td>Lesbaren Inhalt von URLs abrufen und extrahieren</td><td>Immer aktiviert</td></tr>
<tr><td><a href="/tools/browser"><code>browser</code></a></td><td>Chrome-Automatisierung mit persistenten Login-Sitzungen</td><td>[browser] enabled=true</td></tr>
<tr><td><a href="/tools/send-file"><code>send_file</code></a></td><td>Dateien über Telegram oder Slack an den Benutzer senden</td><td>[files]</td></tr>
<tr><td><a href="/tools/sub-agents"><code>spawn_agent</code></a></td><td>Rekursive Sub-Agenten starten</td><td>[subagents]</td></tr>
<tr><td><a href="/tools/cli-agents"><code>cli_agent</code></a></td><td>An externe CLI-Tools delegieren</td><td>[cli_agents]</td></tr>
<tr><td><a href="/scheduler"><code>scheduler</code></a></td><td>Geplante Aufgaben erstellen, verwalten und ausführen</td><td>[scheduler]</td></tr>
<tr><td><a href="/tools/command-risk"><code>command_risk</code></a></td><td>4-stufige Risikobewertung für Terminal-Befehle</td><td>[terminal]</td></tr>
<tr><td><a href="/health-monitoring"><code>health_probe</code></a></td><td>Health Probes verwalten und ausführen</td><td>[health]</td></tr>
<tr><td><a href="/skills"><code>manage_skills</code></a></td><td>Dynamische Skills hinzufügen, entfernen, durchsuchen, installieren</td><td>[skills]</td></tr>
<tr><td><a href="/tools/people"><code>manage_people</code></a></td><td>Persönliches Kontaktbuch mit Geburtstagen, Vorlieben, Beziehungen</td><td>Immer registriert</td></tr>
<tr><td><a href="/mcp">MCP-Tools</a></td><td>Dynamisch über MCP-Server entdeckt</td><td>[mcp.*]</td></tr>
</tbody>
</table>

${callout('info', 'Dynamisches Budget', 'Der Agent verfügt auch über ein eingebautes <code>request_more_iterations</code>-Pseudo-Tool, das das Budget der agentischen Schleife um 10 Iterationen erweitert (bis zu einer harten Obergrenze), wenn das aktuelle Budget nicht ausreicht, um eine Aufgabe abzuschließen.')}

<h2>Tool-Registrierungsreihenfolge</h2>
<p>Tools werden während der Initialisierung in dieser Reihenfolge registriert:</p>
<ol>
  <li>SystemInfoTool</li>
  <li>TerminalTool (mit Genehmigungskanal)</li>
  <li>RememberFactTool</li>
  <li>ConfigManagerTool</li>
  <li>WebFetchTool</li>
  <li>WebSearchTool</li>
  <li>BrowserTool (falls aktiviert)</li>
  <li>SendFileTool (falls files.enabled)</li>
  <li>CliAgentTool (falls aktiviert)</li>
  <li>SchedulerTool (falls scheduler.enabled)</li>
  <li>HealthProbeTool (falls health.enabled)</li>
  <li>ManageSkillsTool</li>
  <li>ManagePeopleTool (immer registriert, intern gesteuert)</li>
  <li>MCP-Tools (falls konfiguriert)</li>
</ol>
`
  },
  {
    slug: '/tools/terminal',
    section: 'Tools',
    title: 'Terminal-Tool',
    description: 'Shell-Befehle auf dem Hostsystem über aidaemon ausführen. Befehle werden über sh -c mit Risikobewertung ausgeführt.',
    content: () => `
<h1>Terminal-Tool</h1>
<p class="lead">Shell-Befehle auf dem Hostsystem ausführen. Befehle werden über <code>sh -c</code> ausgeführt.</p>

<h2>Parameter</h2>
${configTable([
  ['command', 'string', '—', 'Der auszuführende Shell-Befehl'],
  ['action', 'string', '"run"', 'Aktion: run, check, kill oder trust_all'],
  ['pid', 'integer', '—', 'PID für check/kill erforderlich'],
])}

<h2>Genehmigungslogik</h2>
<p>Ein Befehl wird nur dann automatisch genehmigt, wenn <strong>beide</strong> Bedingungen erfüllt sind:</p>
<ol>
  <li>Der Befehl beginnt mit einem Präfix aus <code>terminal.allowed_prefixes</code></li>
  <li>Der Befehl enthält <strong>keine</strong> Shell-Operatoren</li>
</ol>

<h3>Shell-Operatoren (erfordern immer Genehmigung)</h3>
${codeBlock(`; | && || $() \` (backticks)`, 'text')}

<h3>Standard-erlaubte Präfixe</h3>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

<h2>Ausgabe</h2>
<p>Gibt zuerst stdout zurück, dann stderr (falls vorhanden). Die Ausgabe wird auf <code>terminal.max_output_chars</code> (Standard 4000 Zeichen) gekürzt.</p>

<h2>Hintergrundbefehle (Neu)</h2>
<p>Wenn ein Befehl das Anfangs-Timeout überschreitet, läuft er im Hintergrund weiter und gibt eine PID zurück.</p>
<ul>
  <li>Nutze <code>action="check"</code> + <code>pid</code>, um Fortschritt/Ausgabe zu sehen</li>
  <li>Nutze <code>action="kill"</code> + <code>pid</code>, um den Prozess zu stoppen</li>
  <li>Abgeschlossene Ausgaben werden kurz zwischengespeichert, damit spätere Checks noch funktionieren</li>
</ul>

<h2>Harte Sicherheitsblöcke (Neu)</h2>
<p>Breite destruktive Muster werden jetzt vor dem Genehmigungsfluss blockiert, einschließlich <code>rm -rf</code> und <code>find ... -delete</code> auf sensiblen Pfaden.</p>

<h2>Konfiguration</h2>
${codeBlock(`[terminal]
allowed_prefixes = ["ls", "cat", "head", "tail", "echo", "date"]
initial_timeout_secs = 30
max_output_chars = 4000
permission_mode = "default"`, 'toml', 'config.toml')}

<h2>Immer erlauben (Persistent)</h2>
<p>Wenn der Benutzer in Telegram auf "Allow Always" klickt:</p>
<ol>
  <li>Das erste Wort des Befehls wird als Präfix extrahiert</li>
  <li>Das Präfix wird der erlaubten Liste im Arbeitsspeicher hinzugefügt</li>
  <li>Das Präfix wird in SQLite gespeichert (<code>terminal_allowed_prefixes</code>-Tabelle)</li>
  <li>Beim Neustart werden gespeicherte Präfixe mit den Konfigurations-Präfixen zusammengeführt</li>
</ol>
<p>Das bedeutet, dass "Allow Always"-Genehmigungen Daemon-Neustarts überstehen, ohne config.toml zu ändern.</p>

${callout('danger', 'Nicht vertrauenswürdige Sitzungen', 'Sitzungen von Triggern (E-Mail usw.) werden als nicht vertrauenswürdig markiert. <strong>Alle</strong> Befehle in nicht vertrauenswürdigen Sitzungen erfordern eine Genehmigung, unabhängig von der Whitelist.')}
`
  },
{
    slug: '/tools/command-risk',
    section: 'Tools',
    title: 'Befehlsrisikobewertung',
    description: 'Jeder Terminal-Befehl wird mit einem 4-stufigen Risikosystem bewertet: Safe, Medium, High und Critical. Über 60 Muster.',
    content: () => `
<h1>Befehlsrisikobewertung</h1>
<p class="lead">Jeder Terminal-Befehl wird vor der Ausführung mit einem 4-stufigen Risikosystem bewertet.</p>

<h2>Risikostufen</h2>
<table class="config-table">
<thead><tr><th>Stufe</th><th>Automatisch genehmigt?</th><th>Beispiele</th></tr></thead>
<tbody>
<tr><td><strong>Safe</strong></td><td>Ja (wenn Präfix auf der Whitelist)</td><td><code>ls</code>, <code>cat</code>, <code>date</code>, <code>echo</code></td></tr>
<tr><td><strong>Medium</strong></td><td>Nach erster Genehmigung</td><td><code>curl</code>, <code>git push</code>, <code>npm install</code></td></tr>
<tr><td><strong>High</strong></td><td>Nach erster Genehmigung</td><td><code>rm</code>, <code>mv</code>, <code>chmod</code>, <code>kill</code></td></tr>
<tr><td><strong>Critical</strong></td><td>Wird nie gespeichert (Standard)</td><td><code>sudo rm -rf</code>, <code>dd</code>, <code>mkfs</code></td></tr>
</tbody>
</table>

<h2>Berechtigungsmodi</h2>
${configTable([
  ['default', '—', '—', 'Safe/Medium/High-Genehmigungen bleiben über Neustarts erhalten. Critical gilt nur pro Sitzung.'],
  ['cautious', '—', '—', 'Alle Genehmigungen gelten nur pro Sitzung.'],
  ['yolo', '—', '—', 'Alle Genehmigungen werden dauerhaft gespeichert.'],
])}

<h2>Gefährliche Konstrukte</h2>
<p>Muster, die das Risiko immer erhöhen:</p>
<ul>
  <li>Befehlssubstitution: <code>$(...)</code> und Backticks</li>
  <li>Prozesssubstitution: <code>&gt;(...)</code>, <code>&lt;(...)</code></li>
  <li>Umleitung: <code>&gt;</code>, <code>&gt;&gt;</code></li>
  <li>Mehrere Befehle: <code>;</code>, <code>&amp;&amp;</code>, <code>||</code></li>
  <li>Pipes in Shells oder <code>sudo</code></li>
</ul>

<h2>Erkennung sensibler Pfade</h2>
<p>Befehle, die auf diese Dateien verweisen, werden automatisch hochgestuft:</p>
<ul>
  <li><code>.env</code> &mdash; Umgebungsgeheimnisse</li>
  <li>SSH-Schlüssel: <code>id_rsa</code>, <code>id_ed25519</code></li>
  <li>Cloud-Konfigurationen: <code>.aws</code>, <code>.kube</code>, <code>.docker</code></li>
  <li>Systemauthentifizierung: <code>shadow</code>, <code>passwd</code>, <code>sudoers</code></li>
  <li>Zugangsdaten: <code>master.key</code>, <code>.netrc</code>, <code>.pgpass</code></li>
</ul>

<h2>Harte Blöcke (Neu)</h2>
<p>Schon vor dem Genehmigungsfluss werden breite oder sensible Löschmuster blockiert, einschließlich riskanter Ziele mit <code>rm -rf</code> und <code>find ... -delete</code>.</p>

${callout('info', 'Konfiguration', 'Setze <code>terminal.permission_mode</code> in config.toml. Standard ist <code>"default"</code>.')}
`
},
    {
    slug: '/tools/system-info',
    section: 'Tools',
    title: 'Systeminformationen-Tool',
    description: 'Betriebssystem, Hostname, Architektur, CPU, Speicher, Festplatte, Betriebszeit und Prozessinformationen über das Systeminformationen-Tool abfragen.',
    content: () => `
<h1>Systeminformationen-Tool</h1>
<p class="lead">Grundlegende Systeminformationen abfragen. Immer aktiviert, keine Parameter.</p>

<h2>Parameter</h2>
<p>Keine — dieses Tool benötigt keine Argumente.</p>

<h2>Ausgabe</h2>
<p>Gibt einen Textbericht zurück mit:</p>
<ul>
  <li><strong>Hostname</strong></li>
  <li><strong>Betriebssystem</strong></li>
  <li><strong>Betriebszeit</strong></li>
  <li><strong>Speicherauslastung</strong></li>
</ul>

<p>Speicherinformationen werden plattformspezifisch erfasst:</p>
<ul>
  <li><strong>Linux:</strong> ausgelesen aus <code>free -h</code></li>
  <li><strong>macOS:</strong> ausgelesen aus <code>vm_stat</code></li>
</ul>
`
  },
  {
    slug: '/tools/memory',
    section: 'Tools',
    title: 'Gedächtnis / Fakten-Tool',
    description: 'Langzeitfakten speichern und abrufen, die über Sitzungen hinweg bestehen bleiben und in den Systemprompt eingefügt werden.',
    content: () => `
<h1>Gedächtnis / Fakten-Tool</h1>
<p class="lead">Langzeitfakten speichern und abrufen, die über Sitzungen hinweg bestehen bleiben und in den Systemprompt eingefügt werden.</p>

<h2>Tool-Name</h2>
<p><code>remember_fact</code></p>

<h2>Parameter</h2>
${configTable([
  ['category', 'string', '—', 'Gruppierungskategorie (z.B. "user", "preference", "project")'],
  ['key', 'string', '—', 'Eindeutiger Bezeichner innerhalb der Kategorie'],
  ['value', 'string', '—', 'Der zu speichernde Fakteninhalt'],
])}

<h2>Speicherung</h2>
<p>Fakten werden per Upsert in die <code>facts</code>-Tabelle in SQLite eingefügt. Das Paar <code>(category, key)</code> ist eindeutig — das Speichern eines Fakts mit derselben Kategorie und demselben Schlüssel überschreibt den vorherigen Wert.</p>

<h2>Systemprompt-Einspeisung</h2>
<p>Bis zu <code>state.max_facts</code> (Standard 100) Fakten werden in den Systemprompt unter einem <code>## Known Facts</code>-Abschnitt eingefügt, nach Kategorie gruppiert und nach zuletzt aktualisiert sortiert. Das bedeutet, der Agent hat immer Zugriff auf sein gespeichertes Wissen.</p>

${codeBlock(`## Known Facts

### user
- name: David
- timezone: US/Pacific

### project
- language: Rust
- repo: /home/david/projects/myapp`, 'text', 'system prompt injection')}

<h2>Fakten-Tabellenschema</h2>
${configTable([
  ['id', 'integer', 'auto', 'Automatisch inkrementierender Primärschlüssel'],
  ['category', 'string', '—', 'Gruppierungskategorie'],
  ['key', 'string', '—', 'Faktenschlüssel (eindeutig pro Kategorie)'],
  ['value', 'string', '—', 'Fakteninhalt'],
  ['source', 'string', '""', 'Wer es gespeichert hat: "agent" oder "user"'],
  ['created_at', 'timestamp', 'now', 'Wann der Fakt erstellt wurde'],
  ['updated_at', 'timestamp', 'now', 'Wann der Fakt zuletzt aktualisiert wurde'],
])}
`
  },
  {
    slug: '/tools/config-manager',
    section: 'Tools',
    title: 'Konfigurationsmanager-Tool',
    description: 'Der aidaemon-Agent kann seine eigene Konfigurationsdatei autonom lesen, aktualisieren, validieren und wiederherstellen.',
    content: () => `
<h1>Konfigurationsmanager-Tool</h1>
<p class="lead">Der Agent kann seine eigene Konfigurationsdatei lesen, aktualisieren, validieren und wiederherstellen.</p>

<h2>Tool-Name</h2>
<p><code>manage_config</code></p>

<h2>Aktionen</h2>

<h3>read</h3>
<p>Gibt den vollständigen Inhalt von config.toml zurück, wobei sensible Felder geschwärzt sind:</p>
${codeBlock(`api_key = "***REDACTED***"
bot_token = "***REDACTED***"
password = "***REDACTED***"`, 'toml')}

<h3>get</h3>
<p>Einen bestimmten TOML-Schlüsselpfad lesen:</p>
${codeBlock(`action: "get"
key: "provider.models.primary"
# Returns: "gemini-3-flash-preview"`, 'text')}

<h3>set</h3>
<p>Einen bestimmten Schlüssel mit einem neuen Wert aktualisieren (TOML-Literalformat):</p>
${codeBlock(`action: "set"
key: "state.working_memory_cap"
value: "100"`, 'text')}

<p>Vor dem Schreiben:</p>
<ol>
  <li>Erstellt ein Backup (3-tiefe Ringrotation: <code>.bak</code> → <code>.bak.1</code> → <code>.bak.2</code>)</li>
  <li>Validiert die neue Konfiguration (TOML-Syntax + vollständige Deserialisierung)</li>
  <li>Setzt Dateiberechtigungen auf 0600 (nur Besitzer) unter Unix</li>
</ol>

<h3>restore</h3>
<p>Auf die neueste Backup-Datei zurücksetzen.</p>

${callout('info', 'Letzte funktionierende Konfiguration', 'Nach jedem erfolgreichen LLM-Aufruf wird die aktuelle Konfiguration als <code>.toml.lastgood</code> gestempelt. Dies ist die erste Datei, die bei der Wiederherstellung versucht wird.')}

<h2>Backup-Priorität</h2>
<ol>
  <li><code>config.toml.lastgood</code> — nachweislich funktionierende Konfiguration</li>
  <li><code>config.toml.bak</code> — neuestes Backup</li>
  <li><code>config.toml.bak.1</code></li>
  <li><code>config.toml.bak.2</code></li>
</ol>
`
  },
  {
    slug: '/tools/browser',
    section: 'Tools',
    title: 'Browser-Tool',
    description: 'Chrome-Automatisierung mit persistenten Login-Sitzungen zum Browsen, Ausfüllen von Formularen und Erstellen von Screenshots.',
    content: () => `
<h1>Browser-Tool</h1>
<p class="lead">Chrome-Automatisierung mit persistenten Login-Sitzungen. Einmal einloggen, und der Agent kann authentifizierte Seiten in deinem Auftrag durchsuchen.</p>

${callout('success', 'Vorgefertigte Binärdateien', 'Wenn du über das Einzeiler-Skript oder Homebrew installiert hast, ist das Browser-Tool bereits enthalten. Aktiviere es einfach in <code>config.toml</code> wie unten beschrieben. Das Feature-Flag wird nur beim <a href="/getting-started/build">Kompilieren aus dem Quellcode</a> benötigt.')}

<h2>Schnellstart</h2>
<p>Zwei Schritte, damit der Agent mit deinen Login-Sitzungen browsen kann:</p>

<h3>1. In deine Dienste einloggen</h3>
${codeBlock(`aidaemon browser login`, 'bash')}
<p>Chrome öffnet sich mit einem dedizierten Profil. Logge dich in die Dienste ein, auf die der Agent zugreifen soll (Gmail, GitHub, AWS Console, Jira usw.), und schließe dann Chrome. Deine Sitzungen werden unter <code>~/.aidaemon/chrome-profile/</code> gespeichert und bleiben über Neustarts erhalten.</p>

<h3>2. Das Browser-Tool aktivieren</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}

<p>Das war's. Der Agent kann jetzt authentifizierte Seiten mit deinen gespeicherten Sitzungen durchsuchen.</p>

${callout('info', 'Ausprobieren', 'Sende dem Agenten eine Nachricht wie <em>"Gehe zu https://mail.google.com und mache einen Screenshot"</em> — es sollte dein Postfach anzeigen, bereits eingeloggt.')}

<h2>Konfiguration</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Das Browser-Tool aktivieren'],
  ['headless', 'bool', 'true', 'Chrome ohne sichtbares Fenster ausführen'],
  ['screenshot_width', 'int', '1280', 'Browser-Viewport-Breite in Pixeln'],
  ['screenshot_height', 'int', '720', 'Browser-Viewport-Höhe in Pixeln'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Chrome-Profilverzeichnis für persistente Sitzungen'],
  ['profile', 'string', 'Default', 'Chrome-Profilname innerhalb von user_data_dir'],
  ['remote_debugging_port', 'int', 'null', 'Verbindung zu einer bestehenden Chrome-Instanz auf diesem Port (fortgeschritten)'],
])}

<h3>Minimale Konfiguration</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}
<p>Alles andere hat sinnvolle Standardwerte. Sitzungen werden automatisch unter <code>~/.aidaemon/chrome-profile/</code> gespeichert.</p>

<h2>Aktionen</h2>

<table class="config-table">
<thead><tr><th>Aktion</th><th>Parameter</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>navigate</code></td><td><code>url</code></td><td>Zur URL navigieren, 2s auf Seitenladevorgang warten</td></tr>
<tr><td><code>screenshot</code></td><td><code>selector?</code></td><td>PNG-Screenshot der gesamten Seite oder eines bestimmten Elements</td></tr>
<tr><td><code>click</code></td><td><code>selector</code></td><td>Ein Element per CSS-Selektor anklicken</td></tr>
<tr><td><code>fill</code></td><td><code>selector, value</code></td><td>Text in ein Formulareingabefeld eingeben</td></tr>
<tr><td><code>get_text</code></td><td><code>selector?</code></td><td>Textinhalt eines Elements oder der gesamten Seite extrahieren</td></tr>
<tr><td><code>execute_js</code></td><td><code>script</code></td><td>Beliebiges JavaScript ausführen und das Ergebnis zurückgeben</td></tr>
<tr><td><code>wait</code></td><td><code>selector, timeout_secs?</code></td><td>Auf das Erscheinen eines Elements warten (Standard 10s Timeout)</td></tr>
<tr><td><code>close</code></td><td>—</td><td>Die Browser-Sitzung schließen</td></tr>
</tbody>
</table>

<h2>Sitzungspersistenz</h2>
<p>Das Browser-Tool verwendet ein dediziertes Chrome-Profil unter <code>~/.aidaemon/chrome-profile/</code>, das Cookies, Local Storage und Login-Sitzungen speichert. Das bedeutet:</p>
<ul>
  <li>Einmal über <code>aidaemon browser login</code> einloggen, Sitzungen bleiben unbegrenzt erhalten</li>
  <li>Der Agent startet Chrome im Headless-Modus mit diesem Profil — bereits authentifiziert</li>
  <li>Sitzungen überstehen aidaemon-Neustarts und Systemneustarts</li>
  <li>Führe <code>aidaemon browser login</code> jederzeit erneut aus, um neue Dienste hinzuzufügen oder abgelaufene Sitzungen zu erneuern</li>
</ul>

${callout('warn', 'Isoliert vom persönlichen Chrome', 'Der Agent verwendet sein eigenes Chrome-Profil, vollständig getrennt von deinem persönlichen Browser. Deine persönlichen Lesezeichen, Erweiterungen und Sitzungen werden niemals berührt.')}

<h2>Bereitstellungsmodi</h2>

<h3>Isolierte Instanz (empfohlen)</h3>
<p>Wenn aidaemon auf einem dedizierten Server oder einer VM läuft, ist kein anderes Chrome aktiv. Der Agent startet Chrome und besitzt es direkt.</p>
${codeBlock(`# SSH into your instance
ssh user@my-server

# One-time: log into services
aidaemon browser login

# Config
# [browser]
# enabled = true

# Done — agent handles Chrome automatically from here`, 'bash')}
<p>Für Headless-Server verwende SSH mit X-Forwarding (<code>ssh -X</code>) oder VNC für den initialen Login.</p>

<h3>Persönlicher Computer</h3>
<p>Wenn aidaemon neben deinem persönlichen Chrome läuft, startet der Agent eine separate Chrome-Instanz mit eigenem Profil. Beide laufen ohne Konflikte nebeneinander.</p>
${codeBlock(`# Same setup — separate Chrome instance, no conflict
aidaemon browser login

# Your personal Chrome (47 tabs, extensions, bookmarks) → untouched
# Aidaemon's Chrome (~/.aidaemon/chrome-profile/) → isolated`, 'bash')}

<h3>Fortgeschritten: Verbindung zu bestehendem Chrome</h3>
<p>Für erfahrene Benutzer, die sich mit einer Chrome-Instanz verbinden möchten, die bereits mit einem Remote-Debugging-Port läuft:</p>
${codeBlock(`[browser]
enabled = true
remote_debugging_port = 9222`, 'toml', 'config.toml')}
<p>Starte Chrome mit <code>--remote-debugging-port=9222</code> und der Agent verbindet sich direkt damit. Dies teilt die Sitzungen der Chrome-Instanz, erfordert aber, dass Chrome mit dem Debugging-Flag gestartet wird.</p>

<h2>Screenshots</h2>
<p>Screenshots werden als PNG aufgenommen und über den aktiven Kanal an den Benutzer gesendet (Telegram-Foto, Slack-Dateiupload usw.) mit Beschriftungen, die die Seiten-URL beschreiben.</p>

<h2>Anwendungsfälle</h2>
<ul>
  <li><strong>Überwachung</strong> — Dashboards prüfen (Grafana, Vercel, AWS Console), Bereitstellungsstatus als Screenshot festhalten</li>
  <li><strong>Datenextraktion</strong> — JS-gerenderte Seiten auslesen, Berichte aus Admin-Panels abrufen</li>
  <li><strong>Workflow-Automatisierung</strong> — Formulare ausfüllen, mehrstufige Abläufe in internen Tools navigieren</li>
  <li><strong>Testen</strong> — Deine bereitgestellte App navigieren, UI überprüfen, responsive Layouts kontrollieren</li>
  <li><strong>Authentifiziertes Browsen</strong> — Mit jedem Dienst interagieren, bei dem du eingeloggt bist, keine API-Schlüssel nötig</li>
</ul>

<h2>Aus Quellcode kompilieren</h2>
<p>Das Browser-Tool erfordert das <code>browser</code>-Feature-Flag:</p>
${codeBlock(`cargo build --release --features browser`, 'bash')}
<p>Erfordert einen installierten Chromium-basierten Browser (Chrome, Chromium, Brave oder Edge).</p>
`
  },
  {
    slug: '/tools/sub-agents',
    section: 'Tools',
    title: 'Sub-Agent-Erzeugung',
    description: 'Erzeuge Kind-Agenten für komplexe Aufgaben mit rekursiver Delegation. Jeder Sub-Agent erhält seinen eigenen Tool-Satz.',
    content: () => `
<h1>Sub-Agent-Erzeugung</h1>
<p class="lead">Der Agent kann Kind-Agenten für komplexe Aufgaben erzeugen und so rekursive Delegation ermöglichen.</p>

<h2>Tool-Name</h2>
<p><code>spawn_agent</code></p>

<h2>Parameter</h2>
${configTable([
  ['mission', 'string', '—', 'Übergeordnete Rolle/Kontext für den Sub-Agenten'],
  ['task', 'string', '—', 'Konkrete Frage oder auszuführende Arbeit'],
])}

<h2>Verhalten</h2>
<ul>
  <li>Kind-Agent läuft auf <code>parent_depth + 1</code></li>
  <li>Erbt Provider, State Store, Modell und Nicht-Spawn-Tools des Eltern-Agenten</li>
  <li>Erhält einen fokussierten System-Prompt: Basisanweisungen + Missionskontext</li>
  <li>Führt eine vollständige agentische Schleife in einer isolierten Sitzung aus (<code>sub-{depth}-{uuid}</code>)</li>
  <li>Gibt die finale Textantwort an den Eltern-Agenten zurück (gekürzt auf <code>max_response_chars</code>)</li>
  <li>Wenn <code>child_depth &lt; max_depth</code>, erhält der Kind-Agent ebenfalls das <code>spawn_agent</code>-Tool</li>
</ul>

<h2>Konfiguration</h2>
${codeBlock(`[subagents]
enabled = true
max_depth = 3
max_iterations = 10
max_response_chars = 8000
timeout_secs = 300`, 'toml', 'config.toml')}

${callout('info', 'Rekursionslimit', 'Sub-Agenten können eigene Sub-Agenten bis zu <code>max_depth</code> Ebenen tief erzeugen. Bei maximaler Tiefe wird das spawn_agent-Tool nicht bereitgestellt.')}

${callout('warn', 'Timeout', 'Jeder Sub-Agent-Aufruf hat ein hartes Timeout (<code>timeout_secs</code>). Wenn ein Sub-Agent zu lange braucht, erhält der Eltern-Agent einen Timeout-Fehler.')}
`
  },
  {
    slug: '/tools/cli-agents',
    section: 'Tools',
    title: 'CLI-Agent-Delegation',
    description: 'Delegiere Aufgaben an Claude Code, Gemini CLI, Codex, Copilot oder Aider aus der aidaemon-Agentenschleife heraus.',
    content: () => `
<h1>CLI-Agent-Delegation</h1>
<p class="lead">Delegiere Aufgaben an externe CLI-Coding-Tools wie Claude Code, Gemini CLI, Codex, Copilot oder Aider.</p>

<h2>Tool-Name</h2>
<p><code>cli_agent</code></p>

<h2>Parameter</h2>
${configTable([
  ['tool', 'string', '—', 'Name des aufzurufenden CLI-Tools (z.B. "claude", "gemini")'],
  ['prompt', 'string', '—', 'Der Prompt/die Aufgabe, die an das CLI-Tool gesendet wird'],
  ['working_dir', 'string', 'null', 'Arbeitsverzeichnis für die Befehlsausführung'],
])}

<h2>Standard-Tools</h2>
<p>Wenn <code>cli_agents.enabled = true</code> ohne explizite Tool-Konfigurationen gesetzt ist, werden diese Standardeinstellungen registriert (sofern der Befehl auf dem System vorhanden ist):</p>

<table class="config-table">
<thead><tr><th>Name</th><th>Befehl</th><th>Standard-Argumente</th></tr></thead>
<tbody>
<tr><td>claude</td><td><code>claude</code></td><td><code>-p --output-format json</code></td></tr>
<tr><td>gemini</td><td><code>gemini</code></td><td><code>-p --output-format json --sandbox=false</code></td></tr>
<tr><td>codex</td><td><code>codex</code></td><td><code>exec --json --full-auto</code></td></tr>
<tr><td>copilot</td><td><code>copilot</code></td><td><code>-p</code></td></tr>
<tr><td>aider</td><td><code>aider</code></td><td><code>--yes --message</code></td></tr>
</tbody>
</table>

${callout('info', 'Erkennung', 'Nur Tools, deren Befehle über <code>which</code> gefunden werden, werden registriert. Fehlende Tools werden stillschweigend übersprungen.')}

<h2>Benutzerdefinierte Konfiguration</h2>
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

<h2>Ausgabeextraktion</h2>
<p>Das Tool versucht, strukturierte Ausgaben zu extrahieren:</p>
<ul>
  <li><strong>JSON:</strong> sucht nach <code>result</code>-, <code>output</code>-, <code>content</code>- oder <code>message</code>-Feldern</li>
  <li><strong>JSONL:</strong> nimmt die letzte Zeile mit Inhalt</li>
  <li><strong>Fallback:</strong> gibt die Rohausgabe zurück, gekürzt auf <code>max_output_chars</code></li>
</ul>
`
  },
  {
    slug: '/tools/web-search',
    section: 'Tools',
    title: 'Websuche-Tool',
    description: 'Durchsuche das Web über DuckDuckGo oder Brave und gib Titel, URLs und Textausschnitte an den LLM-Agenten zurück.',
    content: () => `
<h1>Websuche-Tool</h1>
<p class="lead">Durchsuche das Web und erhalte Titel, URLs und Textausschnitte. Unterstützt DuckDuckGo (Standard, kein Schlüssel nötig) und Brave als Backends.</p>

<h2>Tool-Name</h2>
<p><code>web_search</code></p>

<h2>Parameter</h2>
${configTable([
  ['query', 'string', '—', 'Die Suchanfrage (erforderlich)'],
  ['max_results', 'integer', '5', 'Maximale Anzahl der zurückgegebenen Ergebnisse'],
])}

<h2>Backends</h2>
<table class="config-table">
<thead><tr><th>Backend</th><th>API-Schlüssel</th><th>Funktionsweise</th></tr></thead>
<tbody>
<tr><td><strong>DuckDuckGo</strong> (Standard)</td><td>Nicht erforderlich</td><td>Ruft <code>https://lite.duckduckgo.com/lite/</code> ab und parst HTML-Ergebnisse</td></tr>
<tr><td><strong>Brave</strong></td><td>Erforderlich</td><td>Ruft die <code>https://api.search.brave.com/res/v1/web/search</code> JSON-API auf</td></tr>
</tbody>
</table>

<h2>Konfiguration</h2>
${codeBlock(`[search]
backend = "duckduckgo"  # or "brave"
api_key = ""            # Required only for Brave`, 'toml', 'config.toml')}

<h2>Ausgabeformat</h2>
<p>Gibt nummerierte Markdown-Ergebnisse zurück:</p>
${codeBlock(`1. [Page Title](https://example.com/page)
   A brief snippet describing the page content...

2. [Another Result](https://example.com/other)
   Another snippet...`, 'text')}
`
  },
  {
    slug: '/tools/web-fetch',
    section: 'Tools',
    title: 'Web-Fetch-Tool',
    description: 'Rufe eine beliebige URL ab und extrahiere lesbaren Inhalt. Unterstützt HTML-zu-Text-Konvertierung mit konfigurierbaren Limits.',
    content: () => `
<h1>Web-Fetch-Tool</h1>
<p class="lead">Rufe eine URL ab und extrahiere deren lesbaren Inhalt. Immer aktiviert, keine Konfiguration erforderlich.</p>

<h2>Tool-Name</h2>
<p><code>web_fetch</code></p>

<h2>Parameter</h2>
${configTable([
  ['url', 'string', '—', 'Die abzurufende URL (erforderlich)'],
  ['max_chars', 'integer', '20000', 'Maximale Anzahl zurückgegebener Zeichen'],
])}

<h2>Verhalten</h2>
<ol>
  <li>Ruft die URL mit browserähnlichen Headern ab (Firefox User-Agent, Standard-Accept-Header)</li>
  <li>Versucht Readability-Extraktion für sauberen Artikeltext</li>
  <li>Fällt auf vollständige HTML-zu-Markdown-Konvertierung zurück</li>
  <li>Kürzt auf <code>max_chars</code> an einer sicheren UTF-8-Grenze</li>
</ol>

${callout('info', 'Ergänzung zum Browser-Tool', 'Verwende <code>web_fetch</code> für schnelle Inhaltsextraktion ohne Chrome zu starten. Verwende das <a href="/tools/browser">Browser-Tool</a> für interaktive Seiten, die JavaScript, Formularausfüllung oder Screenshots erfordern.')}
`
  },
  {
    slug: '/tools/send-file',
    section: 'Tools',
    title: 'Dateiübertragung',
    description: 'Sende und empfange Dateien über Telegram oder Slack. Pfadvalidierung und Blockierung sensibler Dateien integriert.',
    content: () => `
<h1>Dateiübertragung</h1>
<p class="lead">Sende Dateien an den Benutzer über Telegram oder Slack und empfange Dateien vom Benutzer. Validiert Pfade und blockiert sensible Dateien.</p>

<h2>Tool-Name</h2>
<p><code>send_file</code> (ausgehend)</p>

<h2>Parameter</h2>
${configTable([
  ['file_path', 'string', '—', 'Absoluter Pfad zur zu sendenden Datei (erforderlich)'],
  ['caption', 'string', 'null', 'Optionale Beschriftung für die Datei'],
])}

<h2>Konfiguration</h2>
${codeBlock(`[files]
enabled = true
inbox_dir = "~/.aidaemon/files/inbox"
outbox_dirs = ["~"]
max_file_size_mb = 10
retention_hours = 24`, 'toml', 'config.toml')}

<h2>Sicherheit</h2>
<p>Das Tool erzwingt Pfadbeschränkungen, um versehentliches Weitergeben von Geheimnissen zu verhindern:</p>
<ul>
  <li><strong>Erlaubte Pfade:</strong> Nur Dateien innerhalb von <code>outbox_dirs</code> oder <code>inbox_dir</code></li>
  <li><strong>Symlink-Auflösung:</strong> Kanonisiert Pfade, um Directory Traversal zu verhindern</li>
  <li><strong>Blockierte Muster:</strong> <code>.ssh</code>, <code>.gnupg</code>, <code>.env</code>, <code>credentials</code>, <code>.key</code>, <code>.pem</code>, <code>.aws/credentials</code>, <code>.netrc</code>, <code>.docker/config.json</code>, <code>config.toml</code></li>
</ul>

<h2>Eingehende Dateien</h2>
<p>Benutzer können Dateien an den Bot in Telegram oder Slack senden. aidaemon lädt sie in das <code>inbox_dir</code> herunter und stellt sie dem Agenten zur Verfügung. Unterstützt Dokumente, Fotos, Audio, Video und Sprachnachrichten, bis zu <code>max_file_size_mb</code>.</p>

${callout('warn', 'Outbox-Verzeichnisse', 'Die <code>outbox_dirs</code>-Liste steuert, aus welchen Verzeichnissen der Agent Dateien senden kann. Halte sie in Produktionsumgebungen so eng wie möglich.')}
`
  },
  {
    slug: '/tools/people',
    section: 'Tools',
    title: 'People Intelligence',
    description: 'Ein persönliches Kontaktbuch, verwaltet von deinem KI-Assistenten. Merkt sich Geburtstage, Vorlieben und Beziehungen — alles lokal auf deinem Rechner gespeichert.',
    content: () => `
<h1>People Intelligence</h1>
<p class="lead">Stell es dir wie ein Kontaktbuch vor, aber mit einem persönlichen Assistenten, der sich die Details für dich merkt. Geburtstage, Vorlieben, Kommunikationsstile, woher du jemanden kennst &mdash; aidaemon hält alles organisiert und erinnert dich, wenn es wichtig ist. Alles bleibt auf deinem Computer oder Server, wird niemals an Dritte gesendet.</p>

${callout('info', 'Laufzeit-Umschaltung', 'People Intelligence kann jederzeit per Chat aktiviert oder deaktiviert werden. Sag einfach <strong>"Enable people intelligence"</strong> oder verwende das <code>manage_people</code>-Tool mit der Aktion <code>enable</code>/<code>disable</code>. Kein Neustart erforderlich.')}

<h2>So funktioniert es</h2>
<ol>
  <li><strong>Kontakte hinzufügen</strong> &mdash; füge Personen manuell hinzu oder lass aidaemon sie aus Gesprächen lernen</li>
  <li><strong>Details merken</strong> &mdash; Geburtstage, Vorlieben, Interessen, Arbeitsinformationen und mehr</li>
  <li><strong>Identitäten verknüpfen</strong> &mdash; verbinde eine Person mit ihrer Telegram-, Slack- oder Discord-Identität</li>
  <li><strong>Proaktive Erinnerungen</strong> &mdash; aidaemon erwähnt bevorstehende Geburtstage und schlägt Wiederverbindungen vor</li>
  <li><strong>Kontextanpassung</strong> &mdash; wenn eine bekannte Person schreibt, passt aidaemon seinen Kommunikationsstil an</li>
</ol>

<h2>Tool-Name</h2>
<p><code>manage_people</code></p>

<h2>Aktionen</h2>
<table class="config-table">
<thead><tr><th>Aktion</th><th>Beschreibung</th><th>Erforderliche Parameter</th></tr></thead>
<tbody>
<tr><td><code>enable</code></td><td>People Intelligence einschalten (bleibt über Neustarts erhalten)</td><td>&mdash;</td></tr>
<tr><td><code>disable</code></td><td>People Intelligence ausschalten (Daten bleiben erhalten)</td><td>&mdash;</td></tr>
<tr><td><code>status</code></td><td>Aktiviert/Deaktiviert-Status und Kontaktanzahl anzeigen</td><td>&mdash;</td></tr>
<tr><td><code>add</code></td><td>Neue Person hinzufügen</td><td>name</td></tr>
<tr><td><code>list</code></td><td>Alle Kontakte auflisten (nach Beziehung filtern)</td><td>&mdash;</td></tr>
<tr><td><code>view</code></td><td>Personendetails und alle Fakten anzeigen</td><td>name oder id</td></tr>
<tr><td><code>update</code></td><td>Personenfelder aktualisieren (Beziehung, Notizen, Stil)</td><td>name oder id</td></tr>
<tr><td><code>remove</code></td><td>Person und alle zugehörigen Fakten löschen</td><td>name oder id</td></tr>
<tr><td><code>add_fact</code></td><td>Fakt über jemanden speichern (Geburtstag, Vorliebe usw.)</td><td>person_name, category, key, value</td></tr>
<tr><td><code>remove_fact</code></td><td>Bestimmten Fakt nach ID löschen</td><td>fact_id</td></tr>
<tr><td><code>link</code></td><td>Plattform-Identität mit einer Person verknüpfen</td><td>person_name, platform_id</td></tr>
<tr><td><code>export</code></td><td>Alle Daten einer Person als JSON exportieren</td><td>person_name</td></tr>
<tr><td><code>purge</code></td><td>Vollständige Kaskadenlöschung (Person + Fakten + Verknüpfungen)</td><td>person_name</td></tr>
<tr><td><code>audit</code></td><td>Automatisch extrahierte Fakten überprüfen (unbestätigt)</td><td>&mdash; (oder person_name)</td></tr>
<tr><td><code>confirm</code></td><td>Automatisch extrahierten Fakt bestätigen (Konfidenz auf 100% setzen)</td><td>fact_id</td></tr>
</tbody>
</table>

<h2>Parameter</h2>
${configTable([
  ['action', 'string', '&mdash;', 'Auszuführende Aktion (erforderlich)'],
  ['name', 'string', 'null', 'Name der Person (für add, view, update, remove)'],
  ['id', 'integer', 'null', 'Datenbank-ID der Person (für update, remove)'],
  ['relationship', 'string', 'null', 'Beziehungstyp: spouse, family, friend, coworker, acquaintance'],
  ['notes', 'string', 'null', 'Freitext-Notizen über die Person'],
  ['communication_style', 'string', 'null', 'Kommunikationsstil: casual, formal, warm usw.'],
  ['language', 'string', 'null', 'Bevorzugte Sprache für die Interaktion'],
  ['person_name', 'string', 'null', 'Name der Person (für add_fact, link, export, purge, audit)'],
  ['category', 'string', 'null', 'Faktkategorie: birthday, preference, interest, work, family, important_date, personality, gift_idea'],
  ['key', 'string', 'null', "Faktschlüssel (z.B. 'birthday', 'favorite_food')"],
  ['value', 'string', 'null', 'Faktwert'],
  ['platform_id', 'string', 'null', "Plattform-qualifizierte ID (z.B. 'slack:U123', 'telegram:456')"],
  ['display_name', 'string', 'null', 'Anzeigename für die Plattform-Identität'],
  ['fact_id', 'integer', 'null', 'Fakt-ID (für remove_fact, confirm)'],
])}

<h2>Aktivierung</h2>
<p>Es gibt zwei Möglichkeiten, People Intelligence zu aktivieren:</p>

<h3>Option 1: Per Chat (empfohlen)</h3>
<p>Sag deinem Bot einfach, es zu aktivieren. Die Einstellung wird in der Datenbank gespeichert und bleibt über Neustarts erhalten.</p>
${codeBlock('You: "Enable people intelligence"\naidaemon: "People Intelligence enabled. I\'ll now remember contacts..."', 'text', 'chat')}

<h3>Option 2: Über config.toml</h3>
<p>Setze den Anfangszustand in deiner Konfigurationsdatei. Dieser Wert wird beim ersten Start in die Datenbank übernommen; danach hat die Laufzeiteinstellung Vorrang.</p>
${codeBlock('[people]\nenabled = true', 'toml', 'config.toml')}

<h2>Organisches Lernen</h2>
<p>Wenn <code>auto_extract</code> aktiviert ist (Standard), lernt aidaemon automatisch über Personen aus Gesprächen während des regulären Gedächtniskonsolidierungszyklus:</p>
<ul>
  <li>Erkennt Erwähnungen von Personen, ihren Vorlieben, Geburtstagen und Beziehungen</li>
  <li>Erstellt Personeneinträge und speichert Fakten mit 70% Konfidenz (automatisch extrahiert)</li>
  <li>Der Besitzer kann Fakten über die Aktionen <code>audit</code> und <code>confirm</code> überprüfen und bestätigen</li>
</ul>

${callout('warn', 'Eingeschränkte Kategorien', 'Gesundheitsinformationen, finanzielle Details, politische Meinungen und religiöse Überzeugungen werden <strong>niemals</strong> automatisch extrahiert, auch wenn sie im Gespräch erwähnt werden. Dies wird durch <code>restricted_categories</code> erzwungen.')}

<h2>Hintergrundaufgaben</h2>
<p>Wenn aktiviert, führt aidaemon tägliche Hintergrundprüfungen durch:</p>
<ul>
  <li><strong>Bereinigung veralteter Fakten</strong> &mdash; entfernt unbestätigte automatisch extrahierte Fakten, die älter als <code>fact_retention_days</code> sind (Standard 180)</li>
  <li><strong>Erinnerungen an bevorstehende Termine</strong> &mdash; erkennt Geburtstage und wichtige Daten innerhalb von 14 Tagen</li>
  <li><strong>Wiederverbindungsvorschläge</strong> &mdash; markiert Personen, die seit <code>reconnect_reminder_days</code> nicht kontaktiert wurden (Standard 30)</li>
</ul>

<h2>Datenschutzmodell</h2>
<table class="config-table">
<thead><tr><th>Kontext</th><th>Verhalten</th></tr></thead>
<tbody>
<tr><td>Besitzer-DMs</td><td>Vollständiger Personengraph wird in den System-Prompt injiziert (Namen, Fakten, Beziehungen)</td></tr>
<tr><td>Nicht-Besitzer (verknüpft)</td><td>Nur Anpassung des Kommunikationsstils (keine Fakt-Injektion für andere Benutzer)</td></tr>
<tr><td>Öffentliche Kanäle</td><td>Keine persönlichen Fakten injiziert</td></tr>
</tbody>
</table>

<h2>Konfiguration</h2>
${codeBlock('[people]\nenabled = true\nauto_extract = true\nauto_extract_categories = ["birthday", "preference", "interest", "work", "family", "important_date"]\nrestricted_categories = ["health", "finance", "political", "religious"]\nfact_retention_days = 180\nreconnect_reminder_days = 30', 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'Anfangszustand (kann zur Laufzeit per Chat umgeschaltet werden)'],
  ['auto_extract', 'bool', 'true', 'Fakten über Personen automatisch aus Gesprächen lernen'],
  ['auto_extract_categories', 'string[]', '[...]', 'Kategorien, die automatisch extrahiert werden können'],
  ['restricted_categories', 'string[]', '[...]', 'Kategorien, die niemals automatisch extrahiert werden'],
  ['fact_retention_days', 'integer', '180', 'Tage bevor unbestätigte Fakten bereinigt werden'],
  ['reconnect_reminder_days', 'integer', '30', 'Tage der Inaktivität bevor eine Wiederverbindung vorgeschlagen wird'],
])}
`
  },
  {
    slug: '/mcp',
    section: 'MCP',
    title: 'MCP-Übersicht',
    description: 'Erweitere aidaemon mit Model Context Protocol Servern für Dateisystemzugriff, Datenbanken, APIs und mehr.',
    content: () => `
<h1>MCP-Integration</h1>
<p class="lead">Erweitere aidaemon mit jedem <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener">Model Context Protocol</a> Server, um Dateisystemzugriff, Datenbanken, APIs und mehr hinzuzufügen.</p>

<h2>So funktioniert es</h2>
<ol>
  <li>aidaemon startet jeden konfigurierten MCP-Server als Unterprozess</li>
  <li>Kommuniziert über JSON-RPC 2.0 über stdin/stdout</li>
  <li>Ruft <code>tools/list</code> auf, um verfügbare Tools zu entdecken</li>
  <li>Jedes entdeckte Tool wird als natives aidaemon-<code>Tool</code> eingebunden</li>
  <li>Das LLM kann MCP-Tools auf die gleiche Weise wie eingebaute Tools aufrufen</li>
</ol>

<h2>Protokolldetails</h2>
<ul>
  <li><strong>Protokollversion:</strong> 2024-11-05</li>
  <li><strong>Client-Info:</strong> name="aidaemon", version="0.1.0"</li>
  <li><strong>Transport:</strong> Zeilengetrenntes JSON über stdin/stdout</li>
  <li><strong>Initialisierung:</strong> <code>initialize</code>-Anfrage → <code>notifications/initialized</code></li>
</ul>

<h2>Beispiel</h2>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@anthropic/mcp-filesystem", "/home/user/documents"]

[mcp.sqlite]
command = "npx"
args = ["-y", "@anthropic/mcp-sqlite", "my-database.db"]

[mcp.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]`, 'toml', 'config.toml')}

${callout('info', 'Fehlerbehandlung', 'Wenn ein MCP-Server nicht gestartet werden kann oder die Tool-Auflistung fehlschlägt, wird der Fehler protokolliert, aber andere Server und eingebaute Tools funktionieren weiterhin.')}
`
  },
  {
    slug: '/mcp/configuration',
    section: 'MCP',
    title: 'MCP-Server-Konfiguration',
    description: 'Konfiguriere MCP-Server in der aidaemon config.toml. Stdio- und SSE-Transport, Umgebungsvariablen und Timeouts.',
    content: () => `
<h1>MCP-Server-Konfiguration</h1>
<p class="lead">Jeder MCP-Server wird als benannter Abschnitt unter <code>[mcp]</code> in der config.toml definiert.</p>

<h2>Konfigurationsformat</h2>
${codeBlock(`[mcp.<server-name>]
command = "<executable>"
args = ["arg1", "arg2", ...]`, 'toml')}

${configTable([
  ['command', 'string', '—', 'Ausführbare Datei oder Skript zum Starten des MCP-Servers'],
  ['args', 'array', '[]', 'An den Befehl übergebene Argumente'],
])}

<h2>Erkennungsprozess</h2>
<ol>
  <li>Für jeden <code>[mcp.*]</code>-Abschnitt den Prozess mit dem konfigurierten Befehl und den Argumenten starten</li>
  <li>Die JSON-RPC-Verbindung initialisieren (Protokoll-Handshake)</li>
  <li><code>tools/list</code> aufrufen, um verfügbare Tools aufzulisten</li>
  <li>Name, Beschreibung und Eingabeschema jedes Tools als natives Tool einbinden</li>
  <li>Fehler pro Server protokollieren, ohne global fehlzuschlagen</li>
</ol>

<h2>Beispiele</h2>

<h3>Dateisystemzugriff</h3>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@anthropic/mcp-filesystem", "/home/user/projects"]`, 'toml')}

<h3>Websuche</h3>
${codeBlock(`[mcp.brave-search]
command = "npx"
args = ["-y", "@anthropic/mcp-brave-search"]`, 'toml')}

<h3>Benutzerdefinierter Python-Server</h3>
${codeBlock(`[mcp.my-server]
command = "python3"
args = ["/path/to/my_mcp_server.py"]`, 'toml')}

${callout('info', 'Stderr-Protokollierung', 'Die Stderr-Ausgabe des MCP-Servers wird von aidaemon erfasst und zum Debuggen protokolliert. Überprüfe die Daemon-Logs, wenn ein Server nicht funktioniert.')}

<h2>Bedrohungserkennung</h2>
<p>aidaemon führt eine reine Audit-Bedrohungserkennung bei MCP-Tool-Aufrufen durch. Verdächtige Muster werden protokolliert, <strong>blockieren aber nicht die Ausführung</strong>.</p>

<h3>Verdächtige Argumentmuster</h3>
<ul>
  <li><strong>Dateizugriff:</strong> <code>/etc/passwd</code>, <code>/etc/shadow</code>, <code>.ssh/</code>, <code>.env</code></li>
  <li><strong>Konfiguration/Geheimnisse:</strong> <code>config.toml</code>, <code>aidaemon.db</code>, <code>api_key</code>, <code>bot_token</code>, <code>encryption_key</code></li>
  <li><strong>Netzwerk:</strong> <code>curl</code>, <code>wget</code>, <code>nc</code>, <code>base64</code></li>
  <li><strong>Code-Ausführung:</strong> <code>eval(</code>, <code>exec(</code>, <code>| sh</code>, <code>| bash</code></li>
  <li><strong>Destruktiv:</strong> <code>; rm </code>, <code>chmod 777</code></li>
</ul>

<h3>Verdächtige Ausgabemuster</h3>
<ul>
  <li>Potenzielle API-Schlüssel: <code>sk-</code>, <code>ghp_</code>-Präfixe</li>
  <li>Private Schlüssel: <code>-----BEGIN</code>, <code>PRIVATE KEY</code></li>
  <li>Sensible Begriffe: <code>password</code>, <code>bot_token</code></li>
</ul>

${callout('warn', 'Nur Audit', 'Die Bedrohungserkennung ist informativ — sie protokolliert Warnungen, blockiert aber nicht die Tool-Ausführung. Überprüfe deine Daemon-Logs auf markierte Muster.')}
`
  },
  {
    slug: '/triggers',
    section: 'Triggers',
    title: 'E-Mail-Trigger',
    description: 'Überwache E-Mail-Postfächer mit IMAP IDLE und löse den aidaemon-Agenten bei neuen Nachrichten automatisch aus.',
    content: () => `
<h1>E-Mail-Trigger</h1>
<p class="lead">Überwache dein Postfach mit IMAP IDLE und löse den Agenten bei neuen E-Mails aus.</p>

<h2>So funktioniert es</h2>
<ol>
  <li>aidaemon verbindet sich mit dem konfigurierten IMAP-Server über TLS</li>
  <li>Wählt den konfigurierten Ordner aus (Standard: INBOX)</li>
  <li>Wechselt in den IMAP IDLE-Modus — eine persistente Verbindung, die auf neue Nachrichten wartet</li>
  <li>Wenn eine neue E-Mail eintrifft, wird der Umschlag abgerufen (Betreff, Absender)</li>
  <li>Erstellt ein Event und sendet es über den internen Event-Bus</li>
  <li>Der Agent verarbeitet das Event und sendet eine Benachrichtigung über Telegram</li>
</ol>

<h2>Konfiguration</h2>
${codeBlock(`[triggers.email]
host = "imap.gmail.com"
port = 993
username = "you@gmail.com"
password = "your-app-password"
folder = "INBOX"`, 'toml', 'config.toml')}

${callout('warn', 'Gmail App-Passwörter', 'Für Gmail mit 2FA erstelle ein app-spezifisches Passwort unter <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener">myaccount.google.com/apppasswords</a>.')}

<h2>Event-Format</h2>
${codeBlock(`Event {
    source: "email",
    session_id: "email_trigger",
    content: "New email from sender@example.com: Subject line here"
}`, 'rust')}

<h2>Event-Bus</h2>
<p>Trigger verwenden einen Tokio-Broadcast-Kanal zur Zustellung von Events. Der Agent lauscht auf der Empfängerseite und verarbeitet jedes Event als neue Nachricht in einer eigenen Sitzung.</p>

${callout('danger', 'Nicht vertrauenswürdige Sitzungen', 'E-Mail-Trigger-Sitzungen werden als <strong>nicht vertrauenswürdig</strong> markiert. Alle Terminal-Befehle in diesen Sitzungen erfordern eine explizite Genehmigung, unabhängig von der allowed_prefixes-Whitelist.')}

<h2>Wiederverbindung</h2>
<p>Wenn die IMAP-Verbindung abbricht, wartet aidaemon 30 Sekunden und verbindet sich automatisch erneut.</p>
`
  },
  {
    slug: '/skills',
    section: 'Skills',
    title: 'Skills-System',
    description: 'Dynamische Prompt-Erweiterung über Markdown-Dateien. Skills injizieren kontextspezifische Anweisungen basierend auf Schlüsselwort-Triggern.',
    content: () => `
<h1>Skills-System</h1>
<p class="lead">Dynamische Prompt-Erweiterung über Markdown-Dateien. Skills injizieren kontextspezifische Anweisungen, wenn sie durch Schlüsselwörter in Benutzernachrichten ausgelöst werden.</p>

<h2>Konfiguration</h2>
${codeBlock(`[skills]
dir = "skills"
enabled = true`, 'toml', 'config.toml')}

<h2>Skill-Dateiformat</h2>
<p>Skills sind Markdown-Dateien mit YAML-ähnlichem Frontmatter, gespeichert im Skills-Verzeichnis:</p>
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

<h2>Frontmatter-Felder</h2>
${configTable([
  ['name', 'string', '—', 'Anzeigename des Skills'],
  ['description', 'string', '—', 'Kurzbeschreibung (wird in der Liste "Verfügbare Skills" angezeigt)'],
  ['triggers', 'string', '—', 'Kommagetrennte Schlüsselwörter, die den Skill aktivieren'],
])}

<h2>Hybride Zuordnung</h2>
<p>Die Skill-Aktivierung verwendet einen zweistufigen Prozess:</p>
<ol>
  <li><strong>Musterabgleich</strong> — Ganzwort-Suche ohne Groß-/Kleinschreibungsunterscheidung. Wenn ein Trigger als vollständiges Wort in der Nachricht des Benutzers vorkommt, ist der Skill ein Kandidat.</li>
  <li><strong>LLM-Bestätigung</strong> — das schnelle Modell prüft, ob jeder Kandidaten-Skill tatsächlich für die Absicht des Benutzers relevant ist. Dies verhindert falsche Aktivierungen durch zufällige Schlüsselwortübereinstimmungen.</li>
</ol>
<p>Der Bestätigungsschritt ist <strong>fail-open</strong>: Wenn der LLM-Aufruf fehlschlägt oder ein Timeout auftritt, werden alle musterabgeglichenen Kandidaten aktiviert.</p>

<h2>System-Prompt-Injektion</h2>
<p>Wenn Skills geladen werden, wird der System-Prompt erweitert mit:</p>
<ol>
  <li><strong>Verfügbare Skills</strong> — listet alle Skill-Namen und Beschreibungen auf</li>
  <li><strong>Aktive Skills</strong> — vollständiger Inhalt jedes zugeordneten Skills</li>
  <li><strong>Bekannte Fakten</strong> — gespeicherte Fakten (unterhalb der Skills injiziert)</li>
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

<h2>Dynamische Skills</h2>
<p>Über statische Dateisystem-Skills hinaus unterstützt aidaemon die Laufzeit-Skill-Verwaltung über das <code>manage_skills</code>-Tool und optionale Registries.</p>

<h3>manage_skills Tool-Aktionen</h3>
<table class="config-table">
<thead><tr><th>Aktion</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>add</code></td><td>Einen Skill von einer URL abrufen</td></tr>
<tr><td><code>add_inline</code></td><td>Rohen Markdown-Inhalt als Skill parsen</td></tr>
<tr><td><code>list</code></td><td>Alle geladenen Skills mit Metadaten anzeigen</td></tr>
<tr><td><code>remove</code></td><td>Einen Skill nach Name löschen</td></tr>
<tr><td><code>enable</code> / <code>disable</code></td><td>Einen Skill aktivieren oder deaktivieren</td></tr>
<tr><td><code>browse</code></td><td>Konfigurierte Registries durchsuchen</td></tr>
<tr><td><code>install</code></td><td>Aus einer Registry installieren</td></tr>
<tr><td><code>update</code></td><td>Skill von der Quell-URL erneut abrufen</td></tr>
</tbody>
</table>

<h3>Automatische Beförderung</h3>
<p>Eine Hintergrundaufgabe läuft alle 12 Stunden und bewertet häufig verwendete Prozeduren für die automatische Beförderung zu wiederverwendbaren Skills.</p>
`
  },
  {
    slug: '/scheduler',
    section: 'Scheduler',
    title: 'Geplante Aufgaben',
    description: 'Erstelle wiederkehrende und einmalige geplante Aufgaben mit natürlicher Sprache oder Cron-Ausdrücken in aidaemon.',
    content: () => `
<h1>Geplante Aufgaben</h1>
<p class="lead">Erstelle wiederkehrende und einmalige Aufgaben mit natürlicher Sprache oder Cron-Ausdrücken. Der Agent führt den Aufgaben-Prompt planmäßig aus.</p>

<h2>Tool-Name</h2>
<p><code>scheduler</code></p>

<h2>Aktionen</h2>
<table class="config-table">
<thead><tr><th>Aktion</th><th>Erforderliche Parameter</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>create</code></td><td>name, schedule, prompt</td><td>Neue geplante Aufgabe erstellen</td></tr>
<tr><td><code>list</code></td><td>—</td><td>Alle Aufgaben mit Status und nächster Ausführungszeit auflisten</td></tr>
<tr><td><code>delete</code></td><td>id</td><td>Aufgabe per UUID löschen</td></tr>
<tr><td><code>pause</code></td><td>id</td><td>Aufgabe pausieren (wird nicht mehr ausgelöst)</td></tr>
<tr><td><code>resume</code></td><td>id</td><td>Pausierte Aufgabe fortsetzen (nächste Ausführung wird neu berechnet)</td></tr>
</tbody>
</table>

<h2>Erstellungsparameter</h2>
${configTable([
  ['name', 'string', '—', 'Menschenlesbarer Name für die Aufgabe'],
  ['schedule', 'string', '—', 'Natürliche Sprache oder 5-Feld-Cron-Ausdruck'],
  ['prompt', 'string', '—', 'Was der Agent tun soll, wenn die Aufgabe ausgelöst wird'],
  ['oneshot', 'bool', 'false', 'Einmal auslösen, dann automatisch löschen'],
  ['trusted', 'bool', 'false', 'Mit voller Autonomie ausführen (keine Terminal-Genehmigung erforderlich)'],
])}

<h2>Zeitpläne in natürlicher Sprache</h2>
<p>Der Scheduler wandelt gängige Muster in Cron-Ausdrücke um:</p>

<table class="config-table">
<thead><tr><th>Eingabe</th><th>Cron</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>hourly</code></td><td><code>0 * * * *</code></td><td>Jede Stunde zur vollen Stunde</td></tr>
<tr><td><code>daily</code></td><td><code>0 0 * * *</code></td><td>Täglich um Mitternacht</td></tr>
<tr><td><code>weekly</code></td><td><code>0 0 * * 0</code></td><td>Jeden Sonntag um Mitternacht</td></tr>
<tr><td><code>monthly</code></td><td><code>0 0 1 * *</code></td><td>Am Ersten des Monats</td></tr>
<tr><td><code>every 5m</code></td><td><code>*/5 * * * *</code></td><td>Alle 5 Minuten</td></tr>
<tr><td><code>every 2h</code></td><td><code>0 */2 * * *</code></td><td>Alle 2 Stunden</td></tr>
<tr><td><code>daily at 9am</code></td><td><code>0 9 * * *</code></td><td>Täglich um 9:00 Uhr</td></tr>
<tr><td><code>daily at 14:30</code></td><td><code>30 14 * * *</code></td><td>Täglich um 14:30 Uhr</td></tr>
<tr><td><code>weekdays at 8:30</code></td><td><code>30 8 * * 1-5</code></td><td>Mo-Fr um 8:30 Uhr</td></tr>
<tr><td><code>weekends at 10am</code></td><td><code>0 10 * * 0,6</code></td><td>Sa-So um 10:00 Uhr</td></tr>
<tr><td><code>in 2h</code></td><td>(berechneter Zeitpunkt)</td><td>Einmalig, wird in 2 Stunden ausgelöst</td></tr>
<tr><td><code>in 30m</code></td><td>(berechneter Zeitpunkt)</td><td>Einmalig, wird in 30 Minuten ausgelöst</td></tr>
</tbody>
</table>

<p>Standard-5-Feld-Cron-Ausdrücke werden ebenfalls direkt akzeptiert (z.B. <code>0 9 * * 1-5</code>).</p>

<h2>Konfiguration</h2>
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

<h2>Aufgabenspeicherung</h2>
<p>Aufgaben werden in SQLite (Tabelle <code>scheduled_tasks</code>) gespeichert. In der Konfiguration definierte Aufgaben werden beim Start synchronisiert — entfernte Aufgaben werden automatisch bereinigt. Über das Tool erstellte Aufgaben bleiben dauerhaft bestehen.</p>

<h2>Verpasste Aufgaben</h2>
<p>Beim Start prüft der Scheduler, ob Aufgaben hätten ausgelöst werden sollen, während der Daemon nicht lief. Verpasste Aufgaben werden während der Wiederherstellung sofort ausgeführt.</p>

${callout('warn', 'Trusted vs Untrusted', 'Trusted-Aufgaben laufen mit vollem Terminal-Zugang (keine Genehmigung erforderlich). Untrusted-Aufgaben (Standard) erfordern eine Genehmigung für alle Terminal-Befehle, genau wie E-Mail-Trigger-Sitzungen.')}
`
  },
  {
    slug: '/router',
    section: 'Router',
    title: 'Modell-Routing',
    description: 'Automatisches Modell-Tier-Routing: Fast, Primary oder Smart. Keyword-Heuristik und Nachrichtenlängen-Klassifizierung.',
    content: () => `
<h1>Modell-Routing</h1>
<p class="lead">Automatische Tier-basierte Modellauswahl leitet jede Anfrage an das am besten geeignete Modell weiter: Fast, Primary oder Smart.</p>

<h2>Tiers</h2>
<table class="config-table">
<thead><tr><th>Tier</th><th>Anwendungsfall</th><th>Typisches Modell</th></tr></thead>
<tbody>
<tr><td><strong>Fast</strong></td><td>Einfache Begrüßungen, Ja/Nein, kurze Abfragen</td><td>gemini-2.5-flash-lite, gpt-4o-mini, claude-haiku-4</td></tr>
<tr><td><strong>Primary</strong></td><td>Allgemeine Konversation, mittlere Aufgaben</td><td>gemini-3-flash-preview, gpt-4o, claude-sonnet-4</td></tr>
<tr><td><strong>Smart</strong></td><td>Komplexes Reasoning, Code-Generierung, Analyse</td><td>gemini-3-pro-preview, o1-preview, claude-opus-4</td></tr>
</tbody>
</table>

<h2>Klassifizierungsregeln</h2>

<h3>Smart-Tier (komplexe Aufgaben)</h3>
<p>Eine Anfrage wird als Smart klassifiziert, wenn eine der folgenden Bedingungen zutrifft:</p>
<ul>
  <li>Enthält einen Code-Block (<code>\`\`\`</code>)</li>
  <li>Nachrichtenlänge &gt; 500 Zeichen</li>
  <li>Enthält 3+ Fragezeichen</li>
  <li>Enthält Schlüsselwörter: <em>implement, refactor, debug, analyze, step by step, write code, architecture, optimize, algorithm, explain how, write a, build a, create a function, design, compare and contrast, walk me through, troubleshoot, review this, fix this, rewrite</em></li>
</ul>

<h3>Fast-Tier (einfache Anfragen)</h3>
<p>Eine Anfrage wird als Fast klassifiziert, wenn eine der folgenden Bedingungen zutrifft:</p>
<ul>
  <li>Exakte Übereinstimmung mit Begrüßungen/Bestätigungen: <em>hi, hello, hey, thanks, ok, yes, no, sure, bye, goodbye, ty, cool, nice, great, awesome, lol, haha, wow</em> (Groß-/Kleinschreibung ignoriert)</li>
  <li>Einzelwort-Nachricht</li>
  <li>Kurze Nachricht: &lt;20 Zeichen UND &le;3 Wörter</li>
  <li>Einfacher Abfrage-Präfix (<em>what is, who is, define, when is, where is</em>) + &le;6 Wörter insgesamt</li>
</ul>

<h3>Primary-Tier (Standard)</h3>
<p>Alles andere fällt in den Primary-Tier.</p>

<h2>Auto-Routing deaktivieren</h2>
<ul>
  <li>Wenn alle drei Modell-Tiers identisch sind, wird das Routing automatisch deaktiviert</li>
  <li>Das Senden von <code>/model &lt;name&gt;</code> in Telegram deaktiviert das Routing (manuelle Überschreibung)</li>
  <li>Das Senden von <code>/auto</code> aktiviert das automatische Routing wieder</li>
</ul>
`
  },
  {
    slug: '/cost-tracking',
    section: 'Cost Tracking',
    title: 'Token-Nutzung & Budgets',
    description: 'Token-Verbrauch pro Modell und Sitzung verfolgen. Tägliche Budgets festlegen und Statistiken über den /cost-Befehl abrufen.',
    content: () => `
<h1>Token-Nutzung &amp; Kostenverfolgung</h1>
<p class="lead">Verfolge den Token-Verbrauch pro Modell und Sitzung. Lege tägliche Budgets zur Kostenkontrolle fest. Rufe Statistiken über <code>/cost</code> in Telegram ab.</p>

<h2>Funktionsweise</h2>
<ol>
  <li>Jeder LLM-Aufruf speichert Input- und Output-Tokens in der SQLite-Tabelle <code>token_usage</code></li>
  <li>Jeder Datensatz enthält: Modellname, Session-ID, Token-Anzahl und Zeitstempel</li>
  <li>Optional kann ein tägliches Token-Budget festgelegt werden, das LLM-Aufrufe blockiert, sobald es überschritten wird</li>
  <li>Das Budget wird automatisch um Mitternacht UTC zurückgesetzt</li>
</ol>

<h2>Konfiguration</h2>
${configTable([
  ['daily_token_budget', 'integer', 'null', 'Maximale Gesamttokens (Input + Output) pro Tag. Null = unbegrenzt.'],
])}

${codeBlock(`[state]
daily_token_budget = 1000000  # 1M tokens per day`, 'toml', 'config.toml')}

${callout('info', 'Budget-Geltungsbereich', 'Das tägliche Budget ist global — es zählt alle Tokens über alle Sitzungen und Modelle hinweg. Bei Überschreitung geben LLM-Aufrufe einen Fehler zurück, bis Mitternacht UTC.')}

<h2>Telegram /cost-Befehl</h2>
<p>Sende <code>/cost</code> in Telegram, um Nutzungsstatistiken anzuzeigen:</p>
${codeBlock(`Token usage (last 24h):
  Input:  12,450 tokens
  Output: 8,230 tokens

Token usage (last 7d):
  Input:  87,320 tokens
  Output: 52,180 tokens

Top models (7d):
  gemini-3-flash-preview: 98,400 tokens
  gemini-3-pro-preview: 41,100 tokens`, 'text')}

<h2>Datenbankschema</h2>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Automatisch inkrementierender Primärschlüssel'],
  ['session_id', 'TEXT', '—', 'Welche Benutzer-/Chat-Sitzung den Aufruf gemacht hat'],
  ['model', 'TEXT', '—', 'Welches LLM-Modell verwendet wurde'],
  ['input_tokens', 'INTEGER', '—', 'An das Modell gesendete Tokens'],
  ['output_tokens', 'INTEGER', '—', 'Vom Modell generierte Tokens'],
  ['created_at', 'TEXT', 'now', 'UTC-Zeitstempel des Aufrufs'],
])}

<h2>Was erfasst wird</h2>
<ul>
  <li>Input-Tokens (Kontext + Benutzernachricht) pro LLM-Aufruf</li>
  <li>Output-Tokens (Modellantwort) pro LLM-Aufruf</li>
  <li>Modellname für Aufschlüsselungen pro Modell</li>
  <li>Session-ID für Verfolgung pro Benutzer</li>
  <li>Zeitstempel für zeitfensterbasierte Abfragen (24h, 7d)</li>
</ul>
`
  },
  {
    slug: '/architecture',
    section: 'Architecture',
    title: 'Agent-Schleife & Fehlerbehebung',
    description: 'Die agentenbasierte Schleife von aidaemon: Nachrichtenverarbeitung, LLM-Aufrufe, Tool-Ausführung, Stall-Erkennung und Fehlerbehebung.',
    content: () => `
<h1>Agent-Schleife &amp; Fehlerbehebung</h1>
<p class="lead">Die zentrale agentenbasierte Schleife: Nachricht empfangen, LLM aufrufen, Tools ausführen, iterieren, antworten.</p>

<h2>Ablauf der Agent-Schleife</h2>
<ol>
  <li><strong>Benutzernachricht speichern</strong> — wird mit Wichtigkeitsbewertung gespeichert</li>
  <li><strong>Modell automatisch routen</strong> — Anfragekomplexität klassifizieren (falls nicht überschrieben)</li>
  <li><strong>System-Prompt erstellen</strong> — Basis-Prompt + passende Skills + bekannte Fakten</li>
  <li><strong>Kontext abrufen</strong> — Tri-Hybrid-Speicherabruf</li>
  <li><strong>Iterieren</strong> (bis zu <code>max_iterations</code>):
    <ul>
      <li>Angeheftete alte Erinnerungen + aktuelle Nachrichten sammeln (dedupliziert)</li>
      <li>OpenAI-Format-Nachrichtenliste erstellen</li>
      <li>LLM mit fehlerklassifizierter Wiederherstellung aufrufen</li>
      <li>Bei Tool-Aufrufen → jeden ausführen, Ergebnisse speichern, Schleife fortsetzen</li>
      <li>Bei keinen Tool-Aufrufen ODER letzter Iteration → Textantwort zurückgeben</li>
    </ul>
  </li>
  <li><strong>Maximale Iterationen erreicht</strong> → Timeout-Nachricht zurückgeben</li>
</ol>

<h2>Dynamisches Iterationsbudget</h2>
<p>Der Agent verfügt über ein eingebautes <code>request_more_iterations</code>-Tool, das das Schleifenbudget erweitert, wenn das aktuelle Limit nicht ausreicht:</p>
<ul>
  <li>Erweitert das Budget um <strong>10 Iterationen</strong> pro Aufruf</li>
  <li>Harte Obergrenze verhindert unbegrenzte Erweiterung (typischerweise 25 insgesamt)</li>
  <li>Erfordert einen <code>reason</code>-Parameter, der erklärt, was noch zu tun ist</li>
  <li>Wird verwendet, wenn der Agent einen klaren Plan hat, aber sonst mitten in der Aufgabe die Iterationen ausgehen würden</li>
</ul>

<h2>Strategie zur Fehlerbehebung</h2>
<p>Die Methode <code>call_llm_with_recovery</code> klassifiziert Fehler und reagiert entsprechend:</p>

<table class="config-table">
<thead><tr><th>Fehlertyp</th><th>Strategie</th></tr></thead>
<tbody>
<tr><td><strong>Auth / Billing</strong></td><td>Sofort an den Benutzer zurückgeben — kein Retry</td></tr>
<tr><td><strong>Rate Limit</strong></td><td><code>retry_after_secs</code> abwarten (max. 60s), einmal wiederholen</td></tr>
<tr><td><strong>Timeout / Netzwerk / Serverfehler</strong></td><td>2s warten, einmal wiederholen; bei Fehlschlag auf vorheriges Modell zurückfallen</td></tr>
<tr><td><strong>Not Found (falsches Modell)</strong></td><td>Sofort zum Fallback-Modell wechseln</td></tr>
<tr><td><strong>Unbekannt</strong></td><td>Als Fehler weiterleiten</td></tr>
</tbody>
</table>

${callout('info', 'Last Known Good', 'Nach jedem erfolgreichen LLM-Aufruf wird die aktuelle Konfiguration als <code>config.toml.lastgood</code> gespeichert. Dies ermöglicht eine automatische Wiederherstellung nach fehlerhaften Konfigurationsänderungen.')}

<h2>Korrektur der Nachrichtenreihenfolge</h2>
<p>Um Einschränkungen bei Gemini-, Anthropic- und OpenAI-Anbietern zu erfüllen, führt aidaemon vor jedem LLM-Aufruf eine dreistufige Korrektur der Nachrichtenhistorie durch:</p>
<ol>
  <li><strong>Durchlauf 1:</strong> Aufeinanderfolgende Nachrichten gleicher Rolle zusammenführen (tool_calls-Arrays kombinieren)</li>
  <li><strong>Durchlauf 2:</strong> Verwaiste Tool-Ergebnisse entfernen (kein passender assistant tool_call) und verwaiste tool_calls bereinigen (kein passendes Tool-Ergebnis)</li>
  <li><strong>Durchlauf 3:</strong> Erneut zusammenführen, da nach dem Entfernen verwaister Einträge neue aufeinanderfolgende Nachrichten gleicher Rolle entstehen können</li>
</ol>

<h2>Tool-Ausführung</h2>
<p>Während der Schleife erhält jeder Tool-Aufruf:</p>
<ul>
  <li><code>_session_id</code> — wird automatisch für die Sitzungsverfolgung injiziert</li>
  <li><code>_untrusted_source</code> — Flag, das für Trigger-basierte Sitzungen gesetzt wird</li>
</ul>

<h2>Stall- &amp; Wiederholungserkennung</h2>
<p>Die Agent-Schleife enthält Schutzmaßnahmen gegen Blockierungen:</p>
<ul>
  <li><strong>Stall-Erkennung</strong> &mdash; wenn dasselbe Tool 3+ Mal hintereinander mit ähnlichen Argumenten aufgerufen wird, wird die Schleife abgebrochen</li>
  <li><strong>Wiederholungserkennung</strong> &mdash; erkennt wiederholten Antworttext und erzwingt einen Abbruch</li>
  <li><strong>Harte Iterationsgrenze</strong> &mdash; Standard 10, erweiterbar auf 25 über <code>request_more_iterations</code></li>
</ul>

<h2>Sitzungstypen</h2>
<table class="config-table">
<thead><tr><th>Sitzungstyp</th><th>Format</th><th>Trusted</th></tr></thead>
<tbody>
<tr><td>Telegram-Chat</td><td>Chat-ID als String</td><td>Ja</td></tr>
<tr><td>Slack-Kanal</td><td><code>slack:{channel_id}</code> oder <code>slack:{channel_id}:{thread_ts}</code></td><td>Ja</td></tr>
<tr><td>Discord-Kanal</td><td><code>discord:{channel_id}</code></td><td>Ja</td></tr>
<tr><td>E-Mail-Trigger</td><td><code>email_trigger</code></td><td>Nein</td></tr>
<tr><td>Event-Trigger</td><td><code>event_{uuid}</code></td><td>Nein</td></tr>
<tr><td>Sub-Agent</td><td><code>sub-{depth}-{uuid}</code></td><td>Geerbt</td></tr>
</tbody>
</table>
`
  },
  {
    slug: '/architecture/state',
    section: 'Architecture',
    title: 'Zustandsverwaltung & Speicher',
    description: 'SQLite-basierte Persistenz mit semantischer Suche über Embeddings, Tri-Hybrid-Abruf und Speicherschichten.',
    content: () => `
<h1>Zustandsverwaltung &amp; Speicher</h1>
<p class="lead">SQLite-basierte Persistenz mit In-Memory-Arbeitsspeicher, semantischer Suche über Embeddings und Tri-Hybrid-Abruf.</p>

${callout('info', 'v0.9.x-Update', 'Die zentrale Gesprächsspeicherung läuft jetzt über die Tabelle <code>events</code>. Alte <code>messages</code>-Daten werden beim Upgrade in events migriert.')}

<h2>Datenbankschema</h2>

<h3>messages-Tabelle</h3>
${configTable([
  ['id', 'TEXT PK', '—', 'UUID-Primärschlüssel'],
  ['session_id', 'TEXT', '—', 'Sitzungskennung (indiziert)'],
  ['role', 'TEXT', '—', 'user, assistant oder tool'],
  ['content', 'TEXT', 'null', 'Nachrichtentextinhalt'],
  ['tool_call_id', 'TEXT', 'null', 'ID für Tool-Ergebnis-Nachrichten'],
  ['tool_name', 'TEXT', 'null', 'Tool-Name für Tool-Nachrichten'],
  ['tool_calls_json', 'TEXT', 'null', 'JSON-Array von Tool-Aufrufen'],
  ['created_at', 'TEXT', '—', 'RFC3339-Zeitstempel'],
  ['importance', 'REAL', '0.5', 'Wichtigkeitsbewertung (0.0–1.0)'],
  ['embedding', 'BLOB', 'null', 'JSON-kodierter Vec&lt;f32&gt;-Embedding'],
  ['embedding_error', 'TEXT', 'null', 'Fehlermeldung bei fehlgeschlagenem Embedding'],
  ['consolidated_at', 'TEXT', 'null', 'Zeitstempel der Speicherkonsolidierung'],
])}

<h3>facts-Tabelle</h3>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Automatisch inkrementierender Primärschlüssel'],
  ['category', 'TEXT', '—', 'Gruppierungskategorie'],
  ['key', 'TEXT', '—', 'Faktenschlüssel (eindeutig pro Kategorie)'],
  ['value', 'TEXT', '—', 'Fakteninhalt'],
  ['source', 'TEXT', '""', 'Wer ihn gespeichert hat: "agent" oder "user"'],
  ['created_at', 'TEXT', '—', 'RFC3339-Zeitstempel'],
  ['updated_at', 'TEXT', '—', 'RFC3339-Zeitstempel'],
])}

<h3>macros-Tabelle</h3>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Automatisch inkrementierender Primärschlüssel'],
  ['trigger_tool', 'TEXT', '&mdash;', 'Tool, das das Makro auslöst'],
  ['trigger_args_pattern', 'TEXT', 'null', 'Argumentmuster zum Abgleichen'],
  ['next_tool', 'TEXT', '&mdash;', 'Nächstes zu verkettendes Tool'],
  ['next_args', 'TEXT', '&mdash;', 'Argumente für das verkettete Tool'],
  ['confidence', 'REAL', '0.0', 'Konfidenzbewertung für das Makro'],
  ['used_count', 'INTEGER', '0', 'Anzahl der Verwendungen des Makros'],
  ['created_at', 'TEXT', '&mdash;', 'RFC3339-Zeitstempel'],
  ['updated_at', 'TEXT', '&mdash;', 'RFC3339-Zeitstempel'],
])}

<h3>scheduled_tasks-Tabelle</h3>
${configTable([
  ['id', 'TEXT PK', '—', 'UUID-Primärschlüssel'],
  ['name', 'TEXT', '—', 'Menschenlesbarer Aufgabenname'],
  ['cron_expr', 'TEXT', '—', 'Berechneter 5-Feld-Cron-Ausdruck'],
  ['original_schedule', 'TEXT', '—', 'Benutzereingabe (natürliche Sprache oder Cron)'],
  ['prompt', 'TEXT', '—', 'Agent-Prompt zur planmäßigen Ausführung'],
  ['source', 'TEXT', '—', '"tool" (über Tool erstellt) oder "config" (aus config.toml)'],
  ['is_oneshot', 'INTEGER', '0', 'Einmal auslösen, dann automatisch löschen'],
  ['is_paused', 'INTEGER', '0', 'Pausierte Aufgaben werden nicht ausgelöst'],
  ['is_trusted', 'INTEGER', '0', 'Trusted-Aufgaben überspringen die Terminal-Genehmigung'],
  ['next_run_at', 'TEXT', '—', 'RFC3339-Zeitstempel der nächsten geplanten Ausführung'],
  ['last_run_at', 'TEXT', 'null', 'RFC3339-Zeitstempel der letzten Ausführung'],
  ['created_at', 'TEXT', '—', 'RFC3339-Zeitstempel'],
  ['updated_at', 'TEXT', '—', 'RFC3339-Zeitstempel'],
])}

<h3>terminal_allowed_prefixes-Tabelle</h3>
${configTable([
  ['prefix', 'TEXT PK', '—', 'Befehlspräfix, gespeichert aus "Immer erlauben"-Genehmigungen'],
])}

<h2>Arbeitsspeicher</h2>
<p>Eine In-Memory-<code>HashMap&lt;String, VecDeque&lt;Message&gt;&gt;</code> pro Sitzung, begrenzt auf <code>working_memory_cap</code> (Standard 50). Vermeidet Datenbankzugriffe für den aktuellen Gesprächsverlauf.</p>

<h2>Tri-Hybrid-Abruf</h2>
<p>Die Methode <code>get_context</code> kombiniert drei Abrufstrategien:</p>

<table class="config-table">
<thead><tr><th>Strategie</th><th>Quelle</th><th>Limit</th><th>Zweck</th></tr></thead>
<tbody>
<tr><td><strong>Aktualität</strong></td><td>Letzte N Nachrichten</td><td>10</td><td>Gesprächskontinuität</td></tr>
<tr><td><strong>Relevanz (Wichtigkeit)</strong></td><td>importance &ge; 0.8</td><td>5</td><td>Kritisch markierte Erinnerungen</td></tr>
<tr><td><strong>Relevanz (Semantik)</strong></td><td>Vektorähnlichkeit &gt; 0.65</td><td>5</td><td>Semantische Suche über Embeddings</td></tr>
</tbody>
</table>

<p>Ergebnisse werden vor der Aufnahme in den Kontext nach Nachrichten-ID dedupliziert.</p>

<h2>Embedding-Service</h2>
<ul>
  <li><strong>Modell:</strong> AllMiniLML6V2 (via fastembed)</li>
  <li>Läuft im Hintergrund — bettet neue Nachrichten ein, nachdem sie angehängt wurden</li>
  <li>Ermöglicht den Relevanz-Zweig des Tri-Hybrid-Abrufs</li>
</ul>

<h2>Speicherkonsolidierung</h2>
<p>Eine Hintergrundaufgabe läuft alle <code>consolidation_interval_hours</code> (Standard 6). Sie komprimiert alte Gespräche zu Zusammenfassungen mit dem Fast-Modell und reduziert so Speicherplatz und Kontextfensternutzung.</p>

<h2>Wichtigkeitsbewertung</h2>
<table class="config-table">
<thead><tr><th>Rolle</th><th>Standardwert</th></tr></thead>
<tbody>
<tr><td>Benutzernachricht</td><td>0.5</td></tr>
<tr><td>Assistentenantwort</td><td>0.5</td></tr>
<tr><td>Tool-Ausgabe</td><td>0.3</td></tr>
<tr><td>Systemnachricht</td><td>0.1</td></tr>
</tbody>
</table>

<h2>Verbindungspool</h2>
<ul>
  <li>SQLite-Pool: maximal 5 Verbindungen</li>
  <li>Journal-Modus: WAL (Write-Ahead Logging) für gleichzeitige Lesezugriffe</li>
  <li>Erstellt Datenbank und Tabellen automatisch, falls nicht vorhanden</li>
</ul>
`
  },
  {
    slug: '/service-install',
    section: 'Service',
    title: 'systemd- & launchd-Einrichtung',
    description: 'Installiere aidaemon als systemd- oder launchd-Dienst, der beim Booten startet und dauerhaft läuft.',
    content: () => `
<h1>Dienstinstallation</h1>
<p class="lead">Installiere aidaemon als Systemdienst, der beim Booten startet und dauerhaft läuft.</p>

<h2>Installationsbefehl</h2>
${codeBlock(`./aidaemon install-service`, 'bash')}

<p>Dies erkennt automatisch die Plattform und generiert die entsprechende Dienstkonfiguration.</p>

<h2>Linux (systemd)</h2>
<p>Erstellt <code>/etc/systemd/system/aidaemon.service</code>:</p>
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

<p>Aktiviert und startet dann den Dienst:</p>
${codeBlock(`sudo systemctl daemon-reload
sudo systemctl enable --now aidaemon`, 'bash')}

<h2>macOS (launchd)</h2>
<p>Erstellt <code>$HOME/Library/LaunchAgents/ai.aidaemon.plist</code>:</p>
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

<p>Lädt dann den Dienst:</p>
${codeBlock(`launchctl load ~/Library/LaunchAgents/ai.aidaemon.plist`, 'bash')}

${callout('warning', 'macOS-Ruhezustand verhindern', 'macOS kann Hintergrundprozesse unterbrechen, wenn das System in den Ruhezustand wechselt. Um aidaemon dauerhaft laufen zu lassen, verwende <code>caffeinate</code>:<br><br><code>caffeinate -s aidaemon</code><br><br>Das Flag <code>-s</code> verhindert den Ruhezustand, solange der Prozess läuft. Du kannst auch <code>caffeinate -i</code> verwenden, um den Leerlauf-Ruhezustand zu verhindern, ohne das Display eingeschaltet zu lassen. Bei Ausführung als launchd-Dienst füge <code>caffeinate -s</code> vor dem Binärpfad in deiner plist unter <code>ProgramArguments</code> hinzu.')}

<h2>Zustandsprüfung</h2>
<p>Nach der Einrichtung als Dienst überprüfe mit:</p>
${codeBlock(`curl http://127.0.0.1:8080/health
# {"status": "ok"}`, 'bash')}

<p>Der Health-Endpunkt wird von axum auf dem konfigurierten <code>daemon.health_bind:daemon.health_port</code> bereitgestellt.</p>
`
  },
  {
    slug: '/event-sourcing',
    section: 'Event Sourcing',
    title: 'Event-System',
    description: 'Unveränderliches Event-Log für alle Agent-Aktionen. Tägliche Konsolidierung in Fakten und Prozeduren. Sitzungskontext.',
    content: () => `
<h1>Event Sourcing</h1>
<p class="lead">Jede Agent-Aktion wird als unveränderliches Event aufgezeichnet. Events sind die einzige Wahrheitsquelle dafür, was während einer Sitzung passiert ist.</p>

<h2>Event-Typen</h2>
<p>Das System verfolgt 16 Event-Typen in 6 Kategorien:</p>

<table class="config-table">
<thead><tr><th>Kategorie</th><th>Event-Typ</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td rowspan="2"><strong>Session</strong></td><td><code>SessionStart</code></td><td>Neue Gesprächssitzung beginnt</td></tr>
<tr><td><code>SessionEnd</code></td><td>Sitzung beendet</td></tr>
<tr><td rowspan="2"><strong>Conversation</strong></td><td><code>UserMessage</code></td><td>Benutzer sendet eine Nachricht</td></tr>
<tr><td><code>AssistantResponse</code></td><td>Agent sendet eine Antwort</td></tr>
<tr><td rowspan="2"><strong>Tools</strong></td><td><code>ToolCall</code></td><td>Agent ruft ein Tool auf</td></tr>
<tr><td><code>ToolResult</code></td><td>Tool-Ausführung abgeschlossen</td></tr>
<tr><td><strong>Thinking</strong></td><td><code>ThinkingStart</code></td><td>Agent beginnt zu denken</td></tr>
<tr><td rowspan="2"><strong>Tasks</strong></td><td><code>TaskStart</code></td><td>Agent beginnt eine Aufgabe</td></tr>
<tr><td><code>TaskEnd</code></td><td>Aufgabe abgeschlossen (mit Status)</td></tr>
<tr><td><strong>Errors</strong></td><td><code>Error</code></td><td>Fehler während der Verarbeitung</td></tr>
<tr><td rowspan="2"><strong>Sub-Agents</strong></td><td><code>SubAgentSpawn</code></td><td>Sub-Agent wird gestartet</td></tr>
<tr><td><code>SubAgentComplete</code></td><td>Sub-Agent ist fertig</td></tr>
<tr><td rowspan="3"><strong>Approvals</strong></td><td><code>ApprovalRequested</code></td><td>Anfrage zur Befehlsgenehmigung gesendet</td></tr>
<tr><td><code>ApprovalGranted</code></td><td>Benutzer hat einen Befehl genehmigt</td></tr>
<tr><td><code>ApprovalDenied</code></td><td>Benutzer hat einen Befehl abgelehnt</td></tr>
</tbody>
</table>

<h2>Event-Struktur</h2>
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

<h2>Tägliche Konsolidierung</h2>
<p>Eine Hintergrundaufgabe läuft täglich um <strong>3:00 Uhr UTC</strong> und verarbeitet nicht konsolidierte Events:</p>
<ol>
  <li><strong>Faktenextraktion</strong> &mdash; das LLM analysiert Event-Sequenzen, um dauerhafte Fakten zu extrahieren</li>
  <li><strong>Prozedurlernen</strong> &mdash; wiederholte Tool-Aufruf-Muster werden als Prozeduren erfasst</li>
  <li><strong>Fehlerlösungsverfolgung</strong> &mdash; Fehler und ihre Lösungen werden für zukünftiges Debugging gepaart</li>
</ol>
<p>Nach der Verarbeitung werden Events mit einem <code>consolidated_at</code>-Zeitstempel markiert.</p>

<h2>Sitzungskontext</h2>
<p>Das Event-System liefert eine Sitzungszusammenfassung für den LLM-Kontext, die verwendete Tools, aufgetretene Fehler, erteilte/verweigerte Genehmigungen und Sub-Agent-Aktivität umfasst.</p>

<h2>Event-Bereinigung</h2>
<p>Eine Hintergrundaufgabe läuft um <strong>3:30 Uhr UTC</strong> und entfernt Events, die älter als die Aufbewahrungsfrist sind (Standard 30 Tage).</p>

${callout('info', 'Unveränderlichkeit', 'Events sind nur zum Anhängen bestimmt (append-only). Das Feld <code>consolidated_at</code> ist das einzige Feld, das nach der Erstellung jemals aktualisiert wird.')}
`
  },
  {
    slug: '/plans',
    section: 'Plans',
    title: 'Pläne (Legacy)',
    description: 'Legacy-Referenz für planbasierte Ausführung. Aktuelle aidaemon-Versionen nutzen Ziele und Aufgaben.',
    content: () => `
<h1>Pläne (Legacy)</h1>
<p class="lead">Diese Seite ist für ältere Setups. Aktuelle aidaemon-Versionen arbeiten mit Zielen und Aufgaben.</p>

${callout('warning', 'v0.9.x-Update', 'Pläne sind nicht mehr der Hauptweg der Ausführung. aidaemon teilt Arbeit jetzt in Ziele und Aufgaben auf.')}

<h2>Diese Seiten jetzt nutzen</h2>
<ul>
  <li><a href="/tools">Tools</a> — so läuft Arbeit im aktuellen System</li>
  <li><a href="/scheduler">Geplante Aufgaben</a> — wiederkehrende oder einmalige Automatisierung</li>
  <li><a href="/event-sourcing">Event Sourcing</a> — vollständige Historie aller Abläufe</li>
</ul>

<h2>Wann diese Seite wichtig ist</h2>
<p>Wenn du noch eine ältere Version mit Plänen nutzt, bleibt diese Seite als Legacy-Referenz erhalten.</p>
`
  },
  {
    slug: '/health-monitoring',
    section: 'Health Monitoring',
    title: 'Dienst-Probes',
    description: 'Definiere HTTP-, TCP-, Befehls- und Datei-Health-Probes für deine Dienste mit Alarmierung und Trendverfolgung.',
    content: () => `
<h1>Health Monitoring</h1>
<p class="lead">Definiere Health-Probes für deine Dienste und werde benachrichtigt, wenn etwas ausfällt.</p>

<h2>Probe-Typen</h2>
<table class="config-table">
<thead><tr><th>Typ</th><th>Zielformat</th><th>Was geprüft wird</th></tr></thead>
<tbody>
<tr><td><code>http</code></td><td>URL</td><td>HTTP-Statuscode, Antwortinhalt, Latenz</td></tr>
<tr><td><code>port</code></td><td>host:port</td><td>TCP-Konnektivität</td></tr>
<tr><td><code>command</code></td><td>Shell-Befehl</td><td>Exit-Code stimmt mit erwartetem überein (Standard: 0)</td></tr>
<tr><td><code>file</code></td><td>Dateipfad</td><td>Datei existiert und ist nicht älter als max_age_secs</td></tr>
</tbody>
</table>

<h2>Konfiguration</h2>
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

<h2>HTTP-Probe-Optionen</h2>
${configTable([
  ['timeout_secs', 'integer', '10', 'Anfrage-Timeout in Sekunden'],
  ['expected_status', 'integer', '200', 'Erwarteter HTTP-Statuscode'],
  ['expected_body', 'string', 'null', 'Erwarteter Teilstring im Antwortinhalt'],
  ['method', 'string', '"GET"', 'HTTP-Methode'],
  ['headers', 'object', '{}', 'Benutzerdefinierte HTTP-Header'],
])}

<h2>Alarmierung</h2>
<p>Wenn ein Probe <code>consecutive_failures_alert</code> Mal hintereinander fehlschlägt, wird ein Alarm an alle Session-IDs in <code>alert_session_ids</code> gesendet.</p>

<h2>Hintergrundaufgaben</h2>
<ul>
  <li><strong>Tick-Schleife</strong> &mdash; läuft alle <code>tick_interval_secs</code> (Standard 30), führt fällige Probes aus</li>
  <li><strong>Bereinigung</strong> &mdash; läuft um <strong>3:40 Uhr UTC</strong>, entfernt alte Ergebnisse</li>
</ul>

${callout('info', 'Dynamische Probes', 'Probes können auch zur Laufzeit vom Agent über das <code>health_probe</code>-Tool erstellt werden.')}
`
  },
  {
    slug: '/updates',
    section: 'Updates',
    title: 'Selbst-Updater',
    description: 'Automatische Aktualisierung von aidaemon über GitHub-Releases. Drei Modi: Benachrichtigung, Download oder automatische Installation.',
    content: () => `
<h1>Selbst-Updater</h1>
<p class="lead">aidaemon kann auf GitHub nach neuen Releases suchen und sich automatisch aktualisieren.</p>

<h2>Neueste Highlights</h2>
<ul>
  <li><strong>v0.9.2</strong> &mdash; bessere Tool-Zuverlässigkeit, stärkere Intent-Prüfungen, robusteres Hintergrundkommando-Handling und Pfad-Aliase</li>
  <li><strong>v0.9.1</strong> &mdash; besserer Follow-up-Kontext, Projektbereichsgrenzen und harte Blöcke für gefährliche Löschbefehle</li>
  <li><strong>v0.9.0</strong> &mdash; Einführung des Consultant-Systems, großer Agent-Refactor und Migration auf kanonische Events</li>
</ul>

<h2>Update-Modi</h2>
<table class="config-table">
<thead><tr><th>Modus</th><th>Verhalten</th></tr></thead>
<tbody>
<tr><td><code>enable</code></td><td>Updates automatisch herunterladen und anwenden, dann neu starten</td></tr>
<tr><td><code>check_only</code> (Standard)</td><td>Benachrichtigen und vor dem Anwenden auf Genehmigung warten</td></tr>
<tr><td><code>disable</code></td><td>Keine Update-Prüfungen</td></tr>
</tbody>
</table>

<h2>Konfiguration</h2>
${codeBlock(`[updates]
mode = "check_only"
check_interval_hours = 24
check_at_utc_hour = 6
confirmation_timeout_mins = 60`, 'toml', 'config.toml')}

${configTable([
  ['mode', 'string', '"check_only"', 'Update-Modus: enable, check_only oder disable'],
  ['check_interval_hours', 'integer', '24', 'Stunden zwischen Update-Prüfungen'],
  ['check_at_utc_hour', 'integer', 'null', 'Bestimmte UTC-Stunde (0-23) für die tägliche Prüfung'],
  ['confirmation_timeout_mins', 'integer', '60', 'Minuten Wartezeit auf Benutzergenehmigung'],
])}

<h2>Update-Prozess</h2>
<ol>
  <li><strong>Prüfen</strong> &mdash; fragt die GitHub Releases API ab</li>
  <li><strong>Vergleichen</strong> &mdash; Semver-Vergleich</li>
  <li><strong>Benachrichtigen</strong> &mdash; sendet Release Notes an Kanäle</li>
  <li><strong>Genehmigen</strong> (check_only) &mdash; Genehmigungsanfrage mit Timeout</li>
  <li><strong>Herunterladen</strong> &mdash; plattformspezifische Binärdatei</li>
  <li><strong>Ersetzen</strong> &mdash; überschreibt die aktuelle Binärdatei</li>
  <li><strong>Neustarten</strong> &mdash; beendet mit Exit-Code 75, um einen Dienstneustart auszulösen</li>
</ol>

<h2>Plattformunterstützung</h2>
<table class="config-table">
<thead><tr><th>Plattform</th><th>Architektur</th></tr></thead>
<tbody>
<tr><td>Linux</td><td>x86_64, aarch64</td></tr>
<tr><td>macOS</td><td>x86_64, aarch64</td></tr>
</tbody>
</table>

${callout('warn', 'Homebrew-Benutzer', 'Wenn über Homebrew installiert, verwende stattdessen <code>brew upgrade aidaemon</code>, oder setze <code>mode = "disable"</code>.')}
`
  },
];

export default pages;
