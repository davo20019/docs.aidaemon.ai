import { codeBlock, callout, configTable } from '../helpers.js';

const pages = [
  {
    slug: '/',
    section: null,
    title: 'AIDaemon Dokumentation — Persönlicher KI-Agent-Daemon',
    description: 'Dokumentation für aidaemon, einen quelloffenen persönlichen KI-Agent-Daemon. Chatte über Telegram, Slack oder Discord, erweitere ihn mit MCP und nutze jedes beliebige LLM.',
    content: () => `
<h1><span class="ai">AID</span>aemon</h1>
<p class="lead">Ein persönlicher KI-Agent, der als Daemon läuft. Immer aktiv, lernt ständig dazu. Chatte über die AIDaemon-App oder über Telegram, Slack und Discord, erweitere ihn mit MCP, angetrieben von jedem beliebigen LLM.</p>

${callout('success', 'Neu hier?', 'Starte mit der <a href="/getting-started/build">Installation</a>: Lade die App für macOS, Windows oder Linux herunter und öffne sie. Aktuelle Version: <strong>0.21.0</strong>.')}

<p>aidaemon ist ein selbst gehosteter KI-Agent, geschrieben in Rust, der als Hintergrunddienst auf deinem Rechner läuft. Er verbindet sich mit ChatGPT, Anthropic, Gemini, xAI oder jedem OpenAI-kompatiblen LLM-Anbieter, kommuniziert über seine eigene App (Desktop, Web und Terminal) sowie über Telegram, Slack oder Discord und kann Tools ausführen, seine eigene Konfiguration verwalten, Fakten merken, im Web browsen und Sub-Agenten starten — alles autonom.</p>

<h2>Hauptmerkmale</h2>
<ul>
  <li><strong>Die AIDaemon-App</strong> — eine App für Desktop, Web und Terminal: gestreamte Antworten, Read aloud (Vorlesen), Genehmigungen, Settings (Einstellungen) und Nutzung. Siehe <a href="/app">Die AIDaemon-App</a></li>
  <li><strong>Live-Ansichten</strong> — sieh dem Browser des Agenten bei der Arbeit zu und übernimm, wenn eine Anmeldung nötig ist</li>
  <li><strong>Coding-Agenten</strong> — Claude Code, Codex, Antigravity und jeder Agent Client Protocol Agent, in einem Berechtigungsmodus deiner Wahl</li>
  <li><strong>Daemon-Architektur</strong> — läuft als systemd-/launchd-Dienst, immer verfügbar</li>
  <li><strong>Multi-Channel</strong> — chatte über Telegram, Slack oder Discord, Zugriffskontrolle für mehrere Benutzer</li>
  <li><strong>Agentische Tool-Nutzung</strong> — autonomes mehrstufiges Reasoning mit Genehmigungen für Seiteneffekte</li>
  <li><strong>MCP-Integration</strong> — erweitere ihn mit jedem Model-Context-Protocol-Server</li>
  <li><strong>Persistenter Speicher</strong> — SQLite-gestützter Verlauf mit semantischer Suche über Embeddings</li>
  <li><strong>Multi-Modell-Routing</strong> — automatische Auswahl der Stufen Fast/Primary/Smart</li>
  <li><strong>E-Mail-Trigger</strong> — IMAP-IDLE-Überwachung für Posteingangsbenachrichtigungen</li>
  <li><strong>Befehlsgenehmigung</strong> — genehmige Shell-Befehle und andere Seiteneffekte in der App oder in jedem verbundenen Chat (Telegram, Slack, Discord)</li>
  <li><strong>Skills-System</strong> — dynamische Prompt-Erweiterung über Markdown-Dateien</li>
  <li><strong>Selbstwartung</strong> — liest, aktualisiert, validiert und stellt die eigene Konfiguration wieder her</li>
  <li><strong>Browser-Automatisierung</strong> — Chrome mit persistenten Anmeldesitzungen, Screenshots und Formularausfüllung</li>
  <li><strong>Webrecherche</strong> — eingebaute Websuche (DuckDuckGo, Brave oder dein eigenes SearxNG, parallel abgefragt) und URL-Abruf</li>
  <li><strong>Sub-Agent-Erzeugung</strong> — rekursive Agenten-Delegierung für komplexe Aufgaben</li>
  <li><strong>CLI-Agent-Delegierung</strong> — delegiere an Claude Code, Codex, Antigravity, Gemini, Copilot, Aider oder jeden ACP-Agenten</li>
  <li><strong>Geplante Aufgaben</strong> — cron-artige wiederkehrende Aufgaben mit Analyse natürlicher Sprache</li>
  <li><strong>Dateiübertragung</strong> — sende und empfange Dateien über Telegram mit Pfadsicherheit</li>
  <li><strong>Secrets-Verwaltung</strong> — Unterstützung für OS-Schlüsselbund und Umgebungsvariablen</li>
  <li><strong>Token-Kostenerfassung</strong> — Nutzungsstatistiken pro Modell, der Befehl /cost, Tariflimits und Guthaben in Settings</li>
  <li><strong>Event Sourcing</strong> — unveränderliches Ereignisprotokoll mit täglicher Konsolidierung zu Fakten und Prozeduren</li>
  <li><strong>Ziele + Aufgaben</strong> — teile größere Arbeit in nachverfolgbare Aufgaben auf und halte den Fortschritt in Gang</li>
  <li><strong>Gesundheitsüberwachung</strong> — HTTP-, TCP-, Befehls- und Datei-Probes mit Alarmierung</li>
  <li><strong>Dynamische Skills</strong> — installiere aus Registries oder befördere wiederholte Prozeduren automatisch</li>
  <li><strong>Selbst-Updater</strong> — Auto-Update von GitHub-Releases mit konfigurierbaren Modi</li>
  <li><strong>Discord-Integration</strong> — Slash-Befehle, interaktive Genehmigungsschaltflächen, Multi-Bot-Unterstützung</li>
  <li><strong>Befehlsgenehmigungen</strong> — eine Sicherheitsprüfung dessen, was jeder Befehl tut, entscheidet, ob du gefragt wirst; Karten werden als Safe, Medium, High oder Critical eingestuft</li>
  <li><strong>Personen-Intelligenz</strong> — ein persönliches Kontaktbuch, das Geburtstage, Vorlieben und Beziehungen für dich merkt</li>
</ul>

<h2>Architektur auf einen Blick</h2>
${codeBlock(`AIDaemon app ──┐  (desktop, web, terminal: Client Gateway, port 8788)
Telegram     ──┤
Slack        ──┼──> Turn runner ──> Turn engine ──> Kernel (aidaemon-core)
Discord      ──┘                                    │
                                                    ├──> Model providers (failover chain)
                                                    ├──> Tools (+ MCP)
                                                    │      every call: approval + safety hooks
                                                    ├──> Receipts ──> Run ledger ──> done?
                                                    └──> Events (SQLite, encrypted)

Background (heartbeat): schedules, automations, memory learning, retention
Triggers: email (IMAP IDLE), treated as untrusted
Health: GET /health`, 'text', 'architecture')}

<h2>Schnellzugriff</h2>
<ul>
  <li><a href="/getting-started/build">Installation</a> — lade die App für macOS, Windows oder Linux herunter</li>
  <li><a href="/app">Die AIDaemon-App</a> — Chat, Genehmigungen, Live-Ansichten, Settings</li>
  <li><a href="/configuration">Konfigurationsreferenz</a> — die vollständige config.toml-Dokumentation</li>
  <li><a href="/tools">Tools</a> — das eingebaute und erweiterbare Tool-System</li>
  <li><a href="/telegram">Telegram</a> — Bot-Einrichtung, Befehle, Genehmigungsablauf</li>
  <li><a href="/slack">Slack</a> — Workspace-Integration über Socket Mode</li>
  <li><a href="/discord">Discord</a> — Bot-Einrichtung, Slash-Befehle, Genehmigungsschaltflächen</li>
  <li><a href="/architecture">So funktioniert AIDaemon</a> — von der Nachricht zur Antwort: Kernel, Hooks, Limits, Abschluss</li>
  <li><a href="/event-sourcing">Event Sourcing</a> — das nur anhängbare Ereignisprotokoll und was daraus entsteht</li>
  <li><a href="/plans">Pläne &amp; Checklisten</a> — wie eine Anfrage deklariert und als erledigt beurteilt wird</li>
  <li><a href="/health-monitoring">Gesundheitsüberwachung</a> — der /health-Endpunkt, Watchdogs und Dienst-Probes</li>
</ul>
`
  },
  {
    slug: '/getting-started',
    section: 'Getting Started',
    title: 'Überblick',
    description: 'Bring AIDaemon auf deinem Computer zum Laufen: App herunterladen, öffnen, ein Modell verbinden und loschatten.',
    content: () => `
<h1>Erste Schritte</h1>
<p class="lead">Lade die AIDaemon-App herunter, öffne sie, verbinde ein Modell und chatte los. Unter macOS und Windows brauchst du kein Terminal.</p>

<p>Die aktuelle Version ist <strong>0.21.0</strong>.</p>

<h2>Was du brauchst</h2>
<ul>
  <li><strong>Einen Computer</strong> &mdash; einen Mac (Apple Silicon oder Intel), einen Windows-PC oder Linux (x86_64 oder ARM64).</li>
  <li><strong>Ein Modell</strong> &mdash; einen ChatGPT-Tarif, bei dem du dich anmeldest, oder einen API-Schlüssel eines Anbieters wie Anthropic, Google Gemini, OpenAI oder OpenRouter, oder ein Modell, das auf deinem eigenen Rechner läuft (Ollama, llama.cpp). Die App findet eines, das schon auf deinem Computer ist, wenn sie kann.</li>
  <li><strong>Optional:</strong> ein Telegram-, Slack- oder Discord-Bot, falls du mit deinem Agenten auch über die Chat-Apps auf deinem Handy sprechen möchtest. Das kannst du später hinzufügen.</li>
</ul>

<h2>Schritte</h2>
<ol>
  <li><a href="/getting-started/build">Installieren</a> &mdash; lade die App für deinen Computer herunter und öffne sie</li>
  <li><a href="/getting-started/wizard">Erster Start</a> &mdash; die App startet den Assistenten und verbindet ein Modell</li>
  <li><a href="/app">Die App benutzen</a> &mdash; Chat, Genehmigungen, Live-Ansichten, Settings</li>
  <li><a href="/configuration">Konfigurieren</a> &mdash; jede Einstellung steht auch in <code>config.toml</code> und auf der Settings-Seite der App</li>
</ol>
`
  },
  {
    slug: '/getting-started/build',
    section: 'Getting Started',
    title: 'Installation',
    description: 'AIDaemon unter macOS, Windows oder Linux Schritt für Schritt herunterladen und installieren. Fortgeschrittene Optionen: Homebrew, Cargo, Build aus dem Quellcode, Server.',
    content: () => `
<h1>AIDaemon installieren</h1>
<p class="lead">Wähle unten deinen Computer und folge den Schritten. Es dauert ein paar Minuten, und unter macOS und Windows brauchst du nie ein Terminal.</p>

<p>Alle Downloads findest du auf der <a href="https://github.com/davo20019/aidaemon/releases/latest" target="_blank" rel="noopener">Seite des neuesten Releases</a>. Die aktuelle Version ist <strong>0.21.0</strong>.</p>

<h2>macOS</h2>
<p><strong>Prüfe zuerst, welchen Mac du hast:</strong> Klicke auf das Apple-Menü (das Apple-Logo oben links auf dem Bildschirm) &rarr; <strong>Über diesen Mac</strong>. Wenn in der Zeile <strong>Chip</strong> <em>Apple M&hellip;</em> steht, hast du Apple Silicon. Wenn eine Zeile <strong>Prozessor</strong> mit <em>Intel</em> erscheint, hast du einen Intel-Mac.</p>
<ol>
  <li>Lade die App für deinen Mac herunter:
    <ul>
      <li>Apple Silicon (M1, M2, M3 und neuer): <a href="https://github.com/davo20019/aidaemon/releases/latest/download/AIdaemon-macos-aarch64.dmg"><code>AIdaemon-macos-aarch64.dmg</code></a></li>
      <li>Intel: <a href="https://github.com/davo20019/aidaemon/releases/latest/download/AIdaemon-macos-x86_64.dmg"><code>AIdaemon-macos-x86_64.dmg</code></a></li>
    </ul>
  </li>
  <li>Öffne die heruntergeladene <code>.dmg</code>-Datei.</li>
  <li>Ziehe <strong>AIDaemon</strong> in den Ordner <strong>Programme</strong>.</li>
  <li>Öffne AIDaemon aus Programme (oder dem Launchpad).</li>
</ol>
${callout('info', 'Wenn macOS es beim ersten Mal blockiert', 'Öffne <strong>Systemeinstellungen &rarr; Datenschutz &amp; Sicherheit</strong>, scrolle zur Meldung über AIDaemon und klicke auf <strong>Trotzdem öffnen</strong>. Das musst du nur einmal tun.')}

<h2>Windows</h2>
<ol>
  <li>Lade <a href="https://github.com/davo20019/aidaemon/releases/latest/download/aidaemon-windows-x86_64.zip"><code>aidaemon-windows-x86_64.zip</code></a> herunter.</li>
  <li>Klicke mit der rechten Maustaste auf die Zip-Datei und wähle <strong>Alle extrahieren&hellip;</strong>. Extrahiere sie in einen Ordner, den du behältst (zum Beispiel <code>%LOCALAPPDATA%\\AIDaemon</code>), nicht in deinen Downloads-Ordner.</li>
  <li>Öffne den extrahierten Ordner und doppelklicke auf <code>aidaemon-app.exe</code>.</li>
</ol>
${callout('info', 'Wenn Windows SmartScreen warnt', 'Klicke auf <strong>Weitere Informationen</strong> und dann auf <strong>Trotzdem ausführen</strong>.')}

<h2>Linux</h2>
<p>Öffne ein Terminal und führe den Installer aus. Er lädt den passenden Build für deine Maschine herunter (x86_64 oder ARM64), prüft ihn und installiert auch die App (ihr Web-Build landet in <code>~/.aidaemon/app-web</code>):</p>
${codeBlock(`curl -sSfL https://get.aidaemon.ai | bash`, 'bash')}
<p>Oder lade ein Release-Archiv selbst herunter und entpacke es:</p>
<ul>
  <li>x86_64: <a href="https://github.com/davo20019/aidaemon/releases/latest/download/aidaemon-linux-x86_64.tar.gz"><code>aidaemon-linux-x86_64.tar.gz</code></a></li>
  <li>ARM64 (aarch64): <a href="https://github.com/davo20019/aidaemon/releases/latest/download/aidaemon-linux-aarch64.tar.gz"><code>aidaemon-linux-aarch64.tar.gz</code></a></li>
</ul>
<p>Öffne die App dann mit <code>aidaemon-app</code> (ein Fenster) oder <code>aidaemon-app --tui</code> (im Terminal). Beim ersten Mal bietet sie <strong>Run it here</strong> an, was den Assistenten sofort und bei jeder Anmeldung startet. Danach funktionieren auch <code>aidaemon app</code> und <code>aidaemon tui</code>, wenn du sie aus <code>~/.aidaemon</code>, dem Ordner des Assistenten, startest.</p>

<h2>Homebrew (macOS oder Linux)</h2>
${codeBlock(`brew install davo20019/tap/aidaemon`, 'bash')}
<p>Führe dann <code>aidaemon-app</code> aus.</p>

<h2>Wie es danach weitergeht</h2>
<p>Beim ersten Öffnen startet die App den Assistenten auf diesem Computer (jetzt und bei jeder Anmeldung, ohne Administratorpasswort) und hilft dir, ein Modell zu verbinden. Siehe <a href="/getting-started/wizard">Erster Start</a>.</p>

<h2>Fortgeschritten</h2>

<h3>Cargo</h3>
<p>Für Rust-Entwickler:</p>
${codeBlock(`cargo install --locked aidaemon`, 'bash')}
<p>Das installiert nur den Daemon, gebaut aus den AIDaemon-SDK-Crates auf crates.io. Baue die App aus <code>clients/app</code> in einem Checkout.</p>

<h3>Build aus dem Quellcode</h3>
${codeBlock(`git clone https://github.com/davo20019/aidaemon.git
cd aidaemon
cargo build --release`, 'bash')}
<p>Die Binärdatei liegt unter <code>./target/release/aidaemon</code>. Die Standard-Features sind <code>discord</code>, <code>slack</code>, <code>encryption</code>, <code>browser</code>, <code>terminal-bridge</code>, <code>otel</code> und <code>execution-docker</code>. Optionale Features sind unter anderem <code>computer_use</code> und <code>computer_use-macos</code> (native macOS-Apps bedienen) sowie <code>sdk-memory</code>. Die App selbst liegt in <code>clients/app</code> und wird separat gebaut.</p>

<h3>Auf einem Server betreiben</h3>
<p>Führe auf einem Server <code>aidaemon</code> ohne Konfiguration aus, und zwar in dem Ordner, der seine Konfiguration enthalten wird: <code>~/.aidaemon</code>, der Ordner, den <code>aidaemon service install</code> verwendet. Er gibt einen Link und einen Einmalcode aus. Erreiche den Port <code>8788</code> der Maschine über einen SSH-Tunnel oder deinen eigenen HTTPS-Tunnel, öffne den Link auf deinem Laptop oder Handy und schließe die Einrichtung dort ab (der Code koppelt nur das erste Gerät):</p>
${codeBlock(`# on the server
mkdir -p ~/.aidaemon && cd ~/.aidaemon && aidaemon

# on your laptop
ssh -L 8788:127.0.0.1:8788 you@your-server
# then open the printed link in your browser`, 'bash')}
<p>Lieber im Terminal? Führe <code>aidaemon setup</code> in diesem Ordner aus, um das Modell direkt dort zu verbinden. Damit der Daemon weiterläuft, siehe <a href="/service-install">Als Dienst betreiben</a>. Um die App ohne SSH von anderen Geräten zu erreichen, siehe <a href="/app/gateway">Client Gateway &amp; Kopplung</a>.</p>

<h3>Einen Download prüfen</h3>
<p>Jede Release-Datei hat auf der Release-Seite eine passende <code>.sha256</code>-Datei. Der Einzeiler-Installer prüft sie für dich.</p>
`
  },
  {
    slug: '/getting-started/wizard',
    section: 'Getting Started',
    title: 'Erster Start',
    description: 'Was beim ersten Öffnen von AIDaemon passiert: Der Assistent startet auf deinem Computer, findet oder verbindet ein Modell und öffnet deine erste Unterhaltung.',
    content: () => `
<h1>Erster Start</h1>
<p class="lead">Beim ersten Öffnen der AIDaemon-App startet sie den Assistenten auf deinem Computer und hilft dir, ein Modell zu verbinden. Nichts wird gespeichert, bevor ein Testaufruf an das Modell beantwortet wurde.</p>

<h2>1. Wo der Assistent läuft</h2>
<p>Die Desktop-App startet den Assistenten (den Daemon) sofort auf diesem Computer, jetzt und bei jeder Anmeldung, ohne Administratorpasswort. Das ist <strong>Run it here</strong>, dasselbe wie <code>aidaemon service install</code>. Um ihn stattdessen auf einem Server zu betreiben, wähle <strong>Run it on another machine instead</strong> und füge den Link ein, den dieser Server ausgegeben hat (siehe <a href="/getting-started/build">Installation &rarr; Auf einem Server betreiben</a>).</p>

<h2>2. Ein Modell verbinden</h2>
<p>Die App sucht nach einem Modell, das schon auf deinem Computer vorhanden ist &mdash; eine ChatGPT-Anmeldung, ein Anbieter-Schlüssel in der Umgebung (etwa <code>OPENAI_API_KEY</code> oder <code>ANTHROPIC_API_KEY</code>) oder lokal laufendes Ollama bzw. llama.cpp &mdash; und bietet es mit einem Klick an. Oder wähle selbst einen Anbieter:</p>
<ul>
  <li><strong>ChatGPT-Abo</strong> &mdash; melde dich in der App an. Auf einem anderen Gerät fügst du die Adresse ein, auf der der Browser landet.</li>
  <li><strong>Ein Anbieter-Schlüssel</strong> &mdash; zuerst wird der Schlüssel geprüft, dann wählst du ein Modell aus der Liste deines eigenen Kontos (das übliche ist vorausgewählt).</li>
  <li><strong>Selbst gehostet</strong> &mdash; <strong>Ollama (local)</strong>, <strong>llama.cpp (local)</strong> oder <strong>Another OpenAI-compatible service</strong> mit der Adresse deines Servers (LM Studio, vLLM) und leer gelassenem Schlüssel.</li>
</ul>
<p>Jeder Anbieter sagt, ob er deinen Tarif nutzt, pro Token abrechnet oder auf deinem eigenen Rechner läuft. Ein Testaufruf muss beantwortet werden, bevor etwas gespeichert wird.</p>

<table class="config-table">
<thead><tr><th>Anbieter</th><th>Schlüsselvariable</th><th>Startmodelle (primary / fast / smart)</th><th>Abrechnung</th></tr></thead>
<tbody>
<tr><td>OpenAI (ChatGPT-Abo)</td><td>Anmeldung</td><td>gpt-6-sol / gpt-6-luna / gpt-6-sol</td><td>Dein Tarif</td></tr>
<tr><td>Anthropic</td><td><code>ANTHROPIC_API_KEY</code></td><td>claude-sonnet-5-5 / claude-haiku-5-5 / claude-opus-5-5</td><td>Pro Token</td></tr>
<tr><td>OpenAI</td><td><code>OPENAI_API_KEY</code></td><td>gpt-5</td><td>Pro Token</td></tr>
<tr><td>Google Gemini</td><td><code>GEMINI_API_KEY</code> oder <code>GOOGLE_API_KEY</code></td><td>gemini-4-hydrogen / gemini-3.5-flash-lite / gemini-4-argon</td><td>Pro Token</td></tr>
<tr><td>OpenRouter</td><td><code>OPENROUTER_API_KEY</code></td><td>moonshotai/kimi-k2.5</td><td>Pro Token</td></tr>
<tr><td>xAI (Grok)</td><td><code>XAI_API_KEY</code></td><td>grok-4</td><td>Pro Token</td></tr>
<tr><td>DeepSeek</td><td><code>DEEPSEEK_API_KEY</code></td><td>deepseek-chat / deepseek-chat / deepseek-reasoner</td><td>Pro Token</td></tr>
<tr><td>Moonshot AI (Kimi)</td><td><code>MOONSHOT_API_KEY</code></td><td>kimi-k2.5 / kimi-k2.5 / kimi-k2-thinking</td><td>Pro Token</td></tr>
<tr><td>MiniMax</td><td><code>MINIMAX_API_KEY</code></td><td>MiniMax-M2.5 / MiniMax-M2.5-highspeed / MiniMax-M2.5</td><td>Pro Token</td></tr>
<tr><td>Another OpenAI-compatible service</td><td>&mdash;</td><td>Deine Wahl</td><td>Pro Token</td></tr>
<tr><td>Ollama, llama.cpp</td><td>keine</td><td>Aus deinem Server aufgelistet</td><td>Lokal</td></tr>
</tbody>
</table>
<p>Cloudflare AI Gateway wird beim ersten Start nicht angeboten; füge es danach in Settings oder in <code>config.toml</code> hinzu (siehe <a href="/providers">Anbieter</a>).</p>
<p>Das sind nur die Startvorschläge; die App bietet an, was dein Konto tatsächlich auflistet. Siehe <a href="/providers">Anbieter</a> für die Konfiguration, die jeder schreibt.</p>
${callout('info', 'llama.cpp und Port 8080', '<code>llama-server</code> und der Health-Check des Daemons verwenden beide standardmäßig Port 8080. Starte einen von beiden auf einem anderen Port (<code>llama-server --port 8081</code> oder <code>[daemon] health_port</code>) und gib die Adresse von llama.cpp in dessen Formular an.')}

<h2>3. Deine erste Unterhaltung</h2>
<p>Als Nächstes folgt ein optionaler Schritt, <strong>Reach it from your phone</strong>: Verbinde einen Telegram-, Slack- oder Discord-Bot über sein Token (der Schritt ist erledigt, sobald deine erste Nachricht dort beantwortet wurde), oder drücke <strong>Not now</strong>. Dann öffnet sich deine erste Unterhaltung. Ihre Begrüßung sagt, was der Agent von sich aus tut, wonach er dich zuerst fragt, und bietet Prompts zum Antippen an. Um später von Telegram, Slack oder Discord aus mit deinem Agenten zu sprechen, nutze <strong>Settings &rarr; Reach it from your phone</strong>: Verbinde einen Bot über sein Token, und dieser Schritt ist erledigt, sobald deine erste Nachricht dort beantwortet wurde.</p>

<h2>Einrichtung über ein Terminal</h2>
<p>Ohne <code>config.toml</code> in seinem Ordner (dem Ordner, aus dem er gestartet wird) läuft <code>aidaemon</code> im <em>Setup-Modus</em>: das Client Gateway auf seiner üblichen Loopback-Adresse (Port 8788) ohne Agent dahinter, dazu ein Einmal-Link und ein Code für ein Gerät an anderer Stelle. Das erste Gerät, das ihn einlöst, wird zum Owner-Gerät. <code>aidaemon setup</code> übernimmt den Modellschritt stattdessen im Terminal. Der alte interaktive Einrichtungsassistent ist entfernt; <code>aidaemon setup low-latency</code> ist unverändert. Ein zweiter Daemon auf derselben Maschine kann mit <code>AIDAEMON_GATEWAY_PORT</code> einen anderen Setup-Port verwenden.</p>
`
  },
  {
    slug: '/app',
    section: 'App',
    title: 'Die AIDaemon-App',
    description: 'Die AIDaemon-App für Desktop, Web und Terminal: Chat, Genehmigungen, Live-Ansichten des Browsers des Agenten, Projektdateien, Read aloud, Settings und Nutzung.',
    content: () => `
<h1>Die AIDaemon-App</h1>
<p class="lead">Eine App für Desktop, Web und Terminal: chatte mit deinem Agenten, beantworte seine Genehmigungsanfragen, sieh ihm bei der Arbeit zu und ändere seine Einstellungen.</p>

<h2>Öffnen</h2>
<table class="config-table">
<thead><tr><th>Wo</th><th>Wie</th></tr></thead>
<tbody>
<tr><td>Desktop-Fenster</td><td>Öffne AIDaemon (macOS, Windows) oder führe <code>aidaemon-app</code> aus (Linux). Nach der Einrichtung funktioniert auch <code>aidaemon app</code>, in <code>~/.aidaemon</code> ausgeführt.</td></tr>
<tr><td>Terminal</td><td><code>aidaemon-app --tui</code> oder <code>aidaemon tui</code>, in <code>~/.aidaemon</code> ausgeführt</td></tr>
<tr><td>Browser auf diesem Rechner</td><td><code>aidaemon web</code> (in <code>~/.aidaemon</code> ausführen) öffnet den Web-Build und koppelt ihn (im Terminal bestätigen)</td></tr>
<tr><td>Handy oder anderer Computer</td><td>Koppeln, dann die Adresse des Gateways öffnen. Siehe <a href="/app/gateway">Client Gateway &amp; Kopplung</a>.</td></tr>
</tbody>
</table>
<p>Die App spricht mit dem Daemon über das <a href="/app/gateway">Client Gateway</a>. Die Downloads und der Installer richten es für dich ein; bei ausgeschaltetem Gateway sagt dir die App, wie du es einschaltest.</p>

<h2>Chatten</h2>
<ul>
  <li><strong>Antworten werden gestreamt</strong>, während das Modell sie schreibt (Web und Desktop).</li>
  <li><strong>Read aloud</strong> &mdash; unter einer Antwort, neben Copy, liest Read aloud (Vorlesen) sie mit der Systemstimme vor: der Sprachausgabe des Browsers in der Web-App, <code>say</code> unter macOS, den eingebauten Stimmen von Windows und <code>spd-say</code> oder <code>espeak-ng</code> (oder <code>espeak</code>) unter Linux. Ist unter Linux keines davon installiert, gibt es die Schaltfläche nicht. Codeblöcke werden als "(code)" gesprochen, Links als ihr Text.</li>
  <li><strong>Diktieren</strong> &mdash; in der Web-App über die Spracherkennung des Browsers, in der macOS-App über die Spracherkennung des Systems. Mit Send endet das Diktieren.</li>
  <li><strong>Welches Modell geantwortet hat</strong> &mdash; unter jeder Antwort, nach Uhrzeit und Copy, stehen Anbieter und Modell, die sie tatsächlich geschrieben haben (ein Failover wird genannt, wenn er geantwortet hat).</li>
  <li><strong>Edit and Send again</strong> &mdash; jede Nachricht, die du gesendet hast, hat Copy, Edit und Send again. Beides fügt am Ende eine neue Nachricht hinzu, sodass nichts darüber verloren geht.</li>
  <li><strong>Archive</strong> &mdash; archiviere eine Unterhaltung oder hole sie über ihr Menü zurück. Archivierte findest du im Filter der Seitenleiste unter Archived, und die Suche durchsucht sie ebenfalls. Schreibst du in einem archivierten Chat, kommt er zurück.</li>
  <li><strong>Zum Aktualisieren ziehen</strong> &mdash; ziehe eine Liste über ihren oberen Rand hinaus nach unten, oder drücke auf dem Desktop Cmd/Strg+R. Kehrst du nach 30 Sekunden oder mehr zurück, holt die App von selbst auf.</li>
  <li><strong>Schritte überstehen eine Wiederverbindung</strong> &mdash; verbindest du dich während eines Durchgangs neu, siehst du, was jeder Schritt bekommen und zurückgegeben hat.</li>
</ul>

<h2>Tastatur</h2>
<p>Die App ist auf die Tastatur ausgelegt: <kbd>Esc</kbd> stoppt die Arbeit der Sitzung, <kbd>y</kbd>/<kbd>s</kbd>/<kbd>a</kbd>/<kbd>n</kbd> beantworten eine Genehmigungskarte, sobald sie lange genug zum Lesen auf dem Bildschirm war, und eine Palette (<kbd>Ctrl/Cmd+K</kbd>) enthält Sitzungen und Befehle. Die Statuszeile sagt immer, ob der Daemon verbunden ist, sich neu verbindet, nicht läuft oder das Gerät abgemeldet hat.</p>

<h2>Genehmigungen</h2>
<p>Jede Genehmigungskarte aus jedem Chat kann in der App beantwortet werden; die erste Antwort gilt, und die Karte im Chat nennt dann, wer geantwortet hat. Die erste Karte auf jedem Gerät erklärt, wonach der Agent fragt und was jede Antwort bewirkt.</p>

<h2>Live-Ansichten: zuschauen und übernehmen</h2>
<p>Der Kopf einer Unterhaltung öffnet eine Live-Ansicht des Browsers des Agenten: sieh ihm bei der Arbeit zu, übernimm die Kontrolle und gib sie zurück. Auf dem Handy funktioniert sie wie ein Browser (tippen zum Klicken, ziehen zum Scrollen, zoomen mit zwei Fingern, tippen mit der Handytastatur); mit Maus und Tastatur funktioniert sie wie ein Remote-Desktop-Fenster. Braucht der Agent dich (eine Anmeldung, ein Captcha), übergibt er dir den Tab mit einer Übernahmekarte in jedem Channel (Open the live view, Done, Not now). Die Anmeldung tippst du selbst ein; der Agent sieht sie nie.</p>
<p>Mit <code>[surfaces] desktop = true</code> (standardmäßig aus, macOS mit Computer Use) können die Bildschirme dieses Computers auf dieselbe Weise beobachtet und gesteuert werden, und <code>aidaemon share-screen</code> koppelt einmalig einen anderen Computer und gibt seinen Hauptbildschirm frei. Siehe <a href="/configuration">Konfiguration &rarr; [surfaces]</a>.</p>

<h2>Projekte und Dateien</h2>
<p>Der Detailbereich einer Coding-Unterhaltung hat einen Tab <strong>Files</strong>, und die Seite eines Projekts öffnet seinen Ordner: schreibgeschützt, Git-Änderungen markiert, ignorierte Dateien auf Wunsch, Secrets nur dem Namen nach. Bilder und PDFs haben eine Vorschau. Projekte können über ihr Menü angeheftet, sortiert und gelöscht werden (das Löschen eines Projekts lässt seinen Ordner auf der Festplatte unberührt).</p>
<p>Eine Unterhaltung in einem Projekt hält, was sie lernt, in den eigenen Notizen dieses Projekts unter <code>~/.aidaemon/projects/&lt;project-id&gt;/memory/</code> fest, getrennt von deinem persönlichen Speicher. Sie bekommt außerdem die eigenen Skills des Repositorys (<code>.agents/skills</code>, <code>.claude/skills</code>) und kann die MCP-Server starten, die seine <code>.mcp.json</code> deklariert, jeden erst, nachdem du seinen genauen Befehl genehmigt hast. Deine eigene <code>~/.aidaemon/AGENTS.md</code> wird als breiteste Anweisungsdatei jedes Projekts geladen.</p>

<h2>Coding-Agenten</h2>
<p>Jeder Coding-Agent läuft in einem Berechtigungsmodus, den du pro Agent in Settings wählst, und Settings zeigt, ob jeder gerade arbeiten kann. Siehe <a href="/tools/cli-agents">CLI-Agent-Delegierung</a>.</p>

<h2>Settings</h2>
<p>Die Seite Settings (Desktop, Web und Terminal) zeigt jede Einstellung, die <code>config.toml</code> enthält oder dokumentiert, nach Tabelle sortiert, mit ihrem Wert oder Standard, ob eine Änderung vorher nachfragt und ob sie bei einem Neuladen oder einem Neustart wirksam wird. Bearbeite Einstellungen direkt, speichere Secrets im Schlüsselbund, wechsle Anbieter und füge Failovers hinzu, verwalte MCP-Server und Bots und lade neu oder starte neu. Sicherheitsrelevante Änderungen (Secrets, <code>base_url</code>, erlaubte Benutzer, das Gateway, MCP- und CLI-Agent-Befehle) warten wie jede Karte auf deine Genehmigung.</p>
<p>Settings zeigt außerdem, <strong>was jedes Konto verbraucht hat und was noch übrig ist</strong>: die 5-Stunden- und Wochenlimits eines ChatGPT-Tarifs und das Guthaben eines OpenRouter-Schlüssels, jeweils mit Anzeige und Zeitpunkt des Zurücksetzens.</p>

<h2>Automatisierungen</h2>
<p>Zeitpläne dürfen eine IANA-Zeitzone nennen ("jeden Werktag um 8 Uhr Europe/Madrid") und folgen deren Sommerzeit. Automatisierungskarten zeigen die Zone des Zeitplans und die Läufe in deiner Zeit; ein Lauf, der verpasst wurde, während der Daemon aus war, wird als Missed aufgeführt. Siehe <a href="/scheduler">Geplante Aufgaben</a>.</p>
`
  },
  {
    slug: '/app/gateway',
    section: 'App',
    title: 'Client Gateway & Kopplung',
    description: 'Das Client Gateway bedient die AIDaemon-App und gekoppelte Geräte: Konfigurationsschlüssel, Befehle, Kopplung, Tunnel und das Client-Protokoll.',
    content: () => `
<h1>Client Gateway &amp; Kopplung</h1>
<p class="lead">Das Client Gateway stellt das AIDaemon Client Protocol für deine eigenen Apps und gekoppelte Geräte bereit. Es lauscht nur auf Loopback; andere Geräte erreichen es über einen Tunnel.</p>

<h2>Einschalten</h2>
<p>Die Downloads für macOS und Windows und die Ersteinrichtung schalten es für dich ein. Von Hand:</p>
${codeBlock(`[client_gateway]
enabled = true
# bind = "127.0.0.1"
# port = 8788
# public_url = "https://aidaemon.example.ts.net"   # your HTTPS tunnel, for pairing links`, 'toml', 'config.toml')}
<p>Oder bitte den Agenten, "das Client Gateway zu aktivieren": <code>manage_config</code> erledigt das in einem genehmigten Schritt und startet dann neu. Jede Änderung an einem <code>client_gateway</code>-Schlüssel braucht die Genehmigung des Owners.</p>

${configTable([
  ['enabled', 'bool', 'false', 'Das Client Gateway bereitstellen'],
  ['bind', 'string', '"127.0.0.1"', 'Lauschadresse. Muss Loopback sein: ein Bind auf eine Nicht-Loopback-Adresse wird abgelehnt.'],
  ['port', 'integer', '8788', 'Lauschport'],
  ['token_file', 'string', 'null', 'Wo der Hash des lokalen Tokens gespeichert wird. Leer: <code>~/.aidaemon/client-gateway-token.sha256</code>.'],
  ['retention_days', 'integer', '7', 'Fenster zum Fortsetzen. Ein Client, der weiter zurückliegt, bekommt einen Snapshot.'],
  ['max_events', 'integer', '100000', 'Höchstzahl an Ereignissen, die das Fortsetzungsprotokoll behält'],
  ['watch_risk_ceiling', 'string', '"medium"', 'Höchstes Risiko, das eine gekoppelte Smartwatch genehmigen darf; darüber darf eine Smartwatch nur ablehnen'],
  ['public_url', 'string', 'null', 'Die HTTPS-Adresse, die gekoppelte Geräte verwenden; sie kommt in Kopplungslinks'],
  ['app_dir', 'string', 'null', 'Verzeichnis des Web-Builds der App, bereitgestellt unter <code>/client/v1/next/</code>. Der Installer legt ihn in <code>~/.aidaemon/app-web</code> ab. Leer: dieser installierte Build wird bereitgestellt, wenn vorhanden.'],
])}

<h2>Endpunkte</h2>
<ul>
  <li><code>/client/v1/ws</code> &mdash; WebSocket</li>
  <li><code>POST /client/v1/commands</code> und Long-Poll <code>GET /client/v1/events</code></li>
  <li><code>/client/v1/next/</code> &mdash; die Web-App (<code>/client/v1/app</code> leitet dorthin weiter)</li>
</ul>
<p>Das aktuelle Client-Protokoll ist <strong>1.39</strong>. Clients setzen ohne Verluste oder Duplikate ab ihrem letzten Ereignis fort.</p>

<h2>Das lokale Token</h2>
<p>Apps auf derselben Maschine melden sich mit dem lokalen Token an, das unter <code>~/.aidaemon/client-token</code> gespeichert ist (nur für den Owner lesbar) und beim ersten Gebrauch erzeugt wird. <code>aidaemon client-token</code> erzeugt ein neues und speichert es dort (das alte Token funktioniert sofort nicht mehr); mit <code>--print</code> gibst du es für Skripte aus. Führe <code>aidaemon client-token</code>, <code>aidaemon pair</code> und <code>aidaemon web</code> in <code>~/.aidaemon</code> aus, dem Ordner des Daemons.</p>

<h2>Handys und Browser koppeln</h2>
<ol>
  <li>Sende <code>/pair_device</code> in einem Chat oder führe <code>aidaemon pair</code> in einem Terminal aus <code>~/.aidaemon</code> aus (es zeigt einen QR-Code). Das erzeugt einen Einmalcode, der zehn Minuten gültig ist.</li>
  <li>Öffne den Link auf dem Gerät. Es löst den Code mit seinem eigenen Schlüssel ein.</li>
  <li>Bestätige in diesem Chat oder Terminal.</li>
</ol>
<p>Jedes gekoppelte Gerät erhält kurzlebige Tokens mit seinen Scopes (observe, chat, approve und control für Live-Ansichten). <code>/devices</code> listet Geräte auf, und <code>/revoke_device &lt;id&gt;</code> beendet sofort die Tokens und offenen Verbindungen eines Geräts.</p>

<h2>Von anderen Geräten erreichen</h2>
<p>Das Gateway lauscht nur auf Loopback. Lass den Daemon den Tunnel selbst betreiben:</p>
${codeBlock(`[exposure.client_gateway]
adapter = "tailscale"        # private to your tailnet; mode = "funnel" makes it public`, 'toml', 'config.toml')}
<p>Adapter: <code>tailscale</code> (<code>serve</code> oder <code>funnel</code>), <code>cloudflare</code> (<code>named</code> oder <code>quick</code> für eine Wegwerfadresse), <code>manual</code> (die <code>url</code> eines Reverse-Proxys, den du betreibst) und <code>command</code>. <code>cloudflared</code> oder <code>tailscale</code> muss im <code>PATH</code> liegen oder mit <code>binary = "..."</code> benannt sein. Änderungen gelten nach einem Neustart; <code>/exposure</code> zeigt den Zustand jedes Tunnels. Ein SSH-Tunnel zu Port 8788 funktioniert ebenfalls.</p>
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
  ['kind', 'string', '"openai_compatible"', 'Anbietertyp: <code>openai_compatible</code>, <code>openai_chatgpt</code>, <code>anthropic</code>, <code>google_genai</code> oder <code>xai_native</code>. Siehe <a href="/providers">Anbieter</a>.'],
  ['api_key', 'string', '—', 'API-Schlüssel für den Anbieter (erforderlich)'],
  ['gateway_token', 'string', 'null', 'Optionales Cloudflare-AI-Gateway-Token, verwendet als <code>cf-aig-authorization</code>'],
  ['base_url', 'string', '"https://api.openai.com/v1"', 'Basis-URL der API (für jeden <code>openai_compatible</code>-Dienst außer OpenAI setzen; optional für <code>anthropic</code>, mit oder ohne <code>/v1</code>)'],
  ['reasoning_effort', 'string', 'null', 'Erweitertes Denken, z. B. <code>low</code>, <code>medium</code>, <code>high</code>, <code>off</code>'],
  ['max_tokens', 'integer', 'null', 'Ausgabelimit pro Aufruf'],
  ['extra_headers', 'table', 'null', 'Zusätzliche HTTP-Header, die mit jedem Aufruf gesendet werden (Werte dürfen <code>"keychain"</code> sein)'],
  ['auto_upgrade', 'bool', 'true', 'Das verwendete Modell auf die neueste Version seiner Linie umstellen, sobald der Anbieter sie auflistet (täglich geprüft, zuvor mit einem Tool-Aufruf bewährt). Anbieter mit Abrechnung pro Token werden nur benachrichtigt. Siehe <a href="/providers">Anbieter</a>.'],
])}

<h2>[[provider.fallbacks]]</h2>
<p>Geordnete Fallbacks über Anbietergrenzen hinweg, jeder mit denselben Schlüsseln wie <code>[provider]</code> und seinem eigenen <code>[provider.fallbacks.models]</code>. Ein Anbieter, dessen Kontingent, Guthaben oder Schlüssel versagt, wird bis zu seinem genannten Reset übersprungen.</p>

<h2>[provider.models]</h2>
${configTable([
  ['primary', 'string', '(provider default)', 'Standardmodell für allgemeine Anfragen'],
  ['fast', 'string', '(provider default)', 'Modell mit niedriger Latenz für einfache Durchgänge (bevorzuge Instruct-Modelle ohne Reasoning)'],
  ['smart', 'string', '(provider default)', 'Modell für komplexe Ausführungsdurchgänge (kann dasselbe wie primary sein)'],
  ['default', 'string', '—', 'Das Modell für normale Anfragen (<code>primary</code> ist der ältere Name dafür)'],
  ['fallback', 'array', '[]', 'Geordnete Modelle, die bei fehlschlagenden Aufrufen probiert werden'],
])}

${callout('info', 'Modell-Standardwerte', 'Anbieterspezifische Standardwerte werden bei der Ersteinrichtung automatisch eingetragen (aus dem Anbieterkatalog) und können sich mit den Releases ändern, wenn sich die Anbieterkataloge weiterentwickeln. Lege für den Produktivbetrieb explizite Modell-IDs in <code>[provider.models]</code> fest. Lösen sich alle drei Stufen auf dasselbe Modell auf, ist das automatische Routing deaktiviert. Siehe <a href="/router">Modell-Routing</a>.')}
${callout('warn', 'Hinweis zur Fast-Stufe', 'Setze <code>provider.models.fast</code> auf ein günstiges Instruktionsmodell ohne Reasoning für das Routing. Vermeide Reasoning-/Thinking-Modelle in <code>fast</code>, da sie meist Token-Verbrauch und Latenz erhöhen, ohne einen Routing-Vorteil zu bringen.')}

<h2>[telegram]</h2>
${configTable([
  ['bot_token', 'string', '—', 'Telegram-Bot-Token von @BotFather (erforderlich)'],
  ['allowed_user_ids', 'array', '[]', 'Numerische Telegram-Benutzer-IDs, die chatten dürfen. Leer: Wer dem Bot als Erstes direkt schreibt, wird sein Owner, und sonst darf niemand.'],
])}

<h2>[slack]</h2>
<p>Erfordert das Feature-Flag <code>slack</code> beim Kompilieren. Die vollständige Einrichtungsanleitung findest du unter <a href="/slack">Slack</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Den Slack-Channel aktivieren'],
  ['app_token', 'string', '—', 'Slack App-Level Token für Socket Mode (<code>xapp-...</code>)'],
  ['bot_token', 'string', '—', 'Slack Bot Token für die Web API (<code>xoxb-...</code>)'],
  ['allowed_user_ids', 'array', '[]', 'Slack-Benutzer-IDs, die interagieren dürfen. Leer: Wer dem Bot als Erstes direkt schreibt, wird sein Owner, und sonst darf niemand.'],
  ['use_threads', 'bool', 'true', 'Standardmäßig in Threads antworten'],
])}

<h2>[discord]</h2>
<p>Erfordert das Feature-Flag <code>discord</code> beim Kompilieren. Die vollständige Einrichtungsanleitung findest du unter <a href="/discord">Discord</a>.</p>
${configTable([
  ['bot_token', 'string', '&mdash;', 'Discord-Bot-Token aus dem Developer Portal'],
  ['allowed_user_ids', 'array', '[]', 'Discord-Benutzer-IDs, die interagieren dürfen. Leer: Wer dem Bot als Erstes direkt schreibt, wird sein Owner, und sonst darf niemand.'],
  ['guild_id', 'integer', 'null', 'Optionale Guild-/Server-ID, um den Bot auf einen einzelnen Server zu beschränken'],
])}

<p>Für mehr als einen Bot verwende <code>[[telegram_bots]]</code>, <code>[[slack_bots]]</code> oder <code>[[discord_bots]]</code>: ein Eintrag pro Bot, mit denselben Token- und Benutzerschlüsseln.</p>

<h2>[state]</h2>
${configTable([
  ['db_path', 'string', '"aidaemon.db"', 'Pfad zur SQLite-Datenbankdatei'],
  ['working_memory_cap', 'integer', '50', 'Maximale Anzahl Nachrichten pro Sitzung, die im Speicher gehalten werden'],
  ['consolidation_interval_hours', 'integer', '6', 'Stunden zwischen Konsolidierungsläufen des Speichers'],
  ['max_facts', 'integer', '20', 'Maximale Anzahl Fakten, die in den System-Prompt eingefügt werden'],
  ['daily_token_budget', 'integer', 'null', 'Seit 0.20.0 ignoriert (einmal beim Start protokolliert). Begrenze die Ausgaben mit einem Ausgabenlimit beim Anbieter; Budgets pro Ziel und <code>subagents.task_token_budget</code> gelten weiterhin.'],
  ['encryption_key', 'string', 'null', 'SQLCipher-Verschlüsselungsschlüssel (erfordert das Feature <code>encryption</code>). AES-256 im Ruhezustand.'],
  ['upgrade_backups', 'integer', '2', 'Snapshots, die in <code>backups/</code> neben der Datenbank aufbewahrt werden; einer wird geschrieben, wenn eine neue aidaemon-Version sie zum ersten Mal startet. <code>0</code> schaltet das ab.'],
])}

<h3>[state.retention]</h3>
<p>Automatische Bereinigung alter Daten, in Tagen. <code>0</code> schaltet die Bereinigung für diese Art aus.</p>
${configTable([
  ['messages_days', 'integer', '90', 'Konsolidierte Nachrichten'],
  ['diagnostic_events_days', 'integer', '7', 'Konsolidierte Diagnose- und Tool-Ereignisse'],
  ['superseded_facts_days', 'integer', '90', 'Ältere Versionen von Fakten'],
  ['token_usage_aggregate_days', 'integer', '30', 'Roher Token-Verbrauch wird danach zu Tagessummen zusammengefasst'],
  ['episodes_days', 'integer', '365', 'Episoden, die nie abgerufen wurden'],
  ['goals_days', 'integer', '180', 'Abgeschlossene oder aufgegebene Ziele'],
])}

<h2>[memory]</h2>
${configTable([
  ['backend', 'string', '"daemon"', '<code>daemon</code> (eingebauter Speicher) oder <code>sdk</code> (das Crate aidaemon-memory; mit <code>--features sdk-memory</code> bauen)'],
  ['path', 'string', '"aidaemon-memory.db"', 'SQLite-Datei für das <code>sdk</code>-Backend'],
  ['embedding_model', 'string', '"AllMiniLML6V2Q"', 'Lokales fastembed-Modell, z. B. <code>AllMiniLML6V2</code>, <code>BGESmallENV15</code>, <code>BGEBaseENV15</code>, <code>ParaphraseMLMiniLML12V2</code>. Eine Änderung bettet den gespeicherten Speicher einmalig im Hintergrund neu ein.'],
  ['project_memory', 'bool', 'true', 'Eine Unterhaltung in einem Projekt hält, was sie lernt, in den eigenen Notizen dieses Projekts fest'],
  ['projects_dir', 'string', '"~/.aidaemon/projects"', 'Wo die Projektnotizen liegen (ein Verzeichnis pro Projekt-ID)'],
])}

<h2>[terminal]</h2>
${configTable([
  ['allowed_prefixes', 'array', '(see below)', 'Befehlspräfixe, die ohne Bestätigung des Benutzers automatisch genehmigt werden'],
  ['initial_timeout_secs', 'integer', '30', 'Timeout in Sekunden für die erste Befehlsausführung'],
  ['max_output_chars', 'integer', '4000', 'Befehlsausgabe über dieser Länge abschneiden'],
  ['permission_mode', 'string', '"default"', 'Risiko-Berechtigungsmodus: <code>default</code>, <code>cautious</code> oder <code>yolo</code>. Siehe <a href="/tools/command-risk">Befehlsrisiko</a>.'],
  ['confinement', 'string', '"host"', '<code>host</code> führt Befehle als du aus; <code>sandbox</code> führt jeden in der Sandbox des Betriebssystems aus (seatbelt unter macOS, bubblewrap oder die Codex-Sandbox unter Linux) mit aufgabenbezogenem Datei- und Netzwerkzugriff'],
])}

<p>Standardmäßig erlaubte Präfixe:</p>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

${callout('warn', 'Shell-Operatoren', 'Ein verketteter Befehl (<code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code>) läuft nur dann ohne Nachfrage, wenn jeder Teil mit einem Programm aus <code>allowed_prefixes</code> beginnt. Befehle mit <code>$()</code> oder Backticks, Umleitungen in Dateien oder über ein anderes Programm gestartete Programme fragen immer nach.')}

<h2>[daemon]</h2>
${configTable([
  ['health_port', 'integer', '8080', 'Port für den HTTP-Endpunkt des Health-Checks'],
  ['health_bind', 'string', '"127.0.0.1"', 'Bind-Adresse. Verwende "0.0.0.0" für externen Zugriff.'],
  ['dashboard_enabled', 'bool', 'true', 'Auf dem Health-Port auch den OAuth-Callback und den Mandate-Wake-Webhook bereitstellen'],
])}

<h2>[triggers.email]</h2>
${configTable([
  ['host', 'string', '—', 'Hostname des IMAP-Servers (z. B. imap.gmail.com)'],
  ['port', 'integer', '—', 'IMAP-Port (typischerweise 993 für TLS)'],
  ['username', 'string', '—', 'Benutzername des E-Mail-Kontos'],
  ['password', 'string', '—', 'Passwort des E-Mail-Kontos oder app-spezifisches Passwort'],
  ['folder', 'string', '"INBOX"', 'Zu überwachender IMAP-Ordner'],
])}

<h2>[mcp.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Pfad oder Name der ausführbaren Datei des MCP-Servers'],
  ['args', 'array', '[]', 'Kommandozeilenargumente'],
  ['env', 'table', '{}', 'Umgebungsvariablen für den Server'],
  ['read_only_tools', 'array', '[]', 'Tools dieses Servers, die du als schreibgeschützt deklarierst; bei ihren Aufrufen wird nicht vorher gefragt'],
])}

<h2>[browser]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Das Browser-Automatisierungs-Tool aktivieren'],
  ['headless', 'bool', 'true', 'Chrome ohne sichtbares Fenster ausführen'],
  ['screenshot_width', 'integer', '1280', 'Breite des Browser-Viewports in Pixeln'],
  ['screenshot_height', 'integer', '720', 'Höhe des Browser-Viewports in Pixeln'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Chrome-Profilverzeichnis für persistente Sitzungen'],
  ['profile', 'string', 'Default', 'Name des Chrome-Profils innerhalb von user_data_dir'],
  ['remote_debugging_port', 'integer', 'null', 'Mit einem vorhandenen Chrome auf diesem Port verbinden (fortgeschritten)'],
  ['keep_sign_ins', 'bool', 'true', 'Anmeldungen im eigenen Browserprofil des Agenten behalten, sodass du dich bei einer Seite nur einmal anmeldest'],
])}

<h2>[skills]</h2>
${configTable([
  ['dir', 'string', '"skills"', 'Verzeichnis mit den Skill-Markdown-Dateien'],
  ['enabled', 'bool', 'true', 'Das Skills-System aktivieren'],
  ['registries', 'array', '[]', 'URLs von JSON-Manifesten der Skill-Registries zum Durchsuchen und Installieren von Skills'],
])}

<h2>[subagents]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Dem Agenten erlauben, Sub-Agenten zu starten'],
  ['max_depth', 'integer', '3', 'Maximale Verschachtelungstiefe der Sub-Agent-Rekursion'],
  ['max_iterations', 'integer', '10', 'Veraltet. Sub-Agenten haben standardmäßig kein Schrittlimit; wird dies (oder <code>max_iterations_cap</code>, Standard 25) gesetzt, gilt ein hartes Limit.'],
  ['max_response_chars', 'integer', '8000', 'Antworten von Sub-Agenten über dieser Länge abschneiden'],
  ['timeout_secs', 'integer', '300', 'Sekunden, die ein Sub-Agent ohne Fortschritt (kein Tool-Aufruf, keine Modellantwort) bleiben darf, bevor er gestoppt wird. Die Gesamtlaufzeit wird nie begrenzt.'],
])}

<h2>[client_gateway]</h2>
<p>Bedient die <a href="/app">AIDaemon-App</a> und gekoppelte Geräte. Vollständige Referenz: <a href="/app/gateway">Client Gateway &amp; Kopplung</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Das Client Gateway bereitstellen'],
  ['bind', 'string', '"127.0.0.1"', 'Nur Loopback'],
  ['port', 'integer', '8788', 'Lauschport'],
  ['public_url', 'string', 'null', 'Adresse des HTTPS-Tunnels für Kopplungslinks'],
])}

<h2>[surfaces]</h2>
<p>Live-Ansichten: den Browser des Agenten von einer gekoppelten App aus beobachten und übernehmen.</p>
${configTable([
  ['enabled', 'bool', 'true', 'Live-Ansichten anbieten'],
  ['allow_control', 'bool', 'true', 'Das Übernehmen der Kontrolle erlauben, nicht nur das Zuschauen'],
  ['control_anytime', 'bool', 'true', 'Die Kontrolle übernehmen, ohne dass der Agent fragt; <code>false</code>: nur während einer Übergabe'],
  ['desktop', 'bool', 'false', 'macOS mit <code>[computer_use]</code>: auch die Bildschirme dieses Computers beobachten und steuern'],
  ['max_live_sessions', 'integer', '8', 'Gleichzeitig offene Live-Ansichten'],
  ['max_fps', 'integer', '20', 'Höchste Bildrate pro Sekunde, die eine Ansicht bekommt'],
  ['max_width', 'integer', '1280', 'Breitestes Bild, das eine Ansicht bekommt'],
  ['disconnect_grace_secs', 'integer', '30', 'Die Kontrolle geht so lange, nachdem dein Gerät nicht mehr zuschaut, an den Agenten zurück'],
  ['idle_release_secs', 'integer', '900', 'Die Kontrolle geht nach so langer Zeit ohne Eingabe an den Agenten zurück'],
])}

<h2>[cli_agents]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Das Tool zur CLI-Agent-Delegierung aktivieren'],
  ['timeout_secs', 'integer', '600', 'Nach dieser Zeit läuft ein CLI-Agent im Hintergrund weiter, und sein Ergebnis wird zugestellt, wenn er fertig ist'],
  ['max_output_chars', 'integer', '16000', 'Globale maximale Ausgabelänge von CLI-Agenten'],
])}

<h2>[cli_agents.tools.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Auszuführender Befehl'],
  ['args', 'array', '[]', 'Standardargumente, die an den Befehl übergeben werden'],
  ['description', 'string', '—', 'Tool-Beschreibung, die dem LLM angezeigt wird'],
  ['timeout_secs', 'integer', 'null', 'Globales Timeout für dieses Tool überschreiben'],
  ['max_output_chars', 'integer', 'null', 'Globale maximale Ausgabe für dieses Tool überschreiben'],
  ['protocol', 'string', 'null', '<code>"acp"</code> hostet einen Agenten, der das Agent Client Protocol spricht; jede Aktion, die er ausführt, wird vorher erfragt'],
])}

<h2>[search]</h2>
${configTable([
  ['backend', 'string', '"duckduckgo"', 'Such-Backend: <code>duckduckgo</code> (kein Schlüssel nötig), <code>brave</code> oder <code>searxng</code>'],
  ['api_key', 'string', '""', 'API-Schlüssel für die Brave-Suche (unterstützt <code>"keychain"</code>)'],
  ['searxng_url', 'string', '""', 'Adresse deiner eigenen SearxNG-Instanz'],
  ['parallel', 'bool', 'true', 'Jedes konfigurierte Backend gleichzeitig abfragen und die Ergebnisse zusammenführen'],
])}

<h2>[heartbeat]</h2>
<p>Führt geplante Aufgaben und Hintergrundarbeit aus. Zeitpläne entstehen, indem du den Agenten im Chat oder in der App fragst, nicht in dieser Datei; ein alter Abschnitt <code>[scheduler]</code> wird ignoriert. Siehe <a href="/scheduler">Geplante Aufgaben</a>.</p>
${configTable([
  ['enabled', 'bool', 'true', 'Geplante Arbeit und Hintergrundarbeit ausführen'],
  ['tick_interval_secs', 'integer', '30', 'Wie oft fällige Arbeit geprüft wird'],
  ['max_concurrent_llm_tasks', 'integer', '3', 'Höchstzahl gleichzeitig laufender modellgestützter Aufgaben'],
])}

<h2>[files]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Die Dateiübertragungs-Tools (Senden/Empfangen) aktivieren'],
  ['inbox_dir', 'string', '"~/.aidaemon/files/inbox"', 'Verzeichnis für von Telegram empfangene Dateien'],
  ['outbox_dirs', 'array', '["~"]', 'Verzeichnisse, aus denen der Agent Dateien senden darf'],
  ['max_file_size_mb', 'integer', '10', 'Maximale Dateigröße für Übertragungen in MB'],
  ['retention_hours', 'integer', '24', 'Stunden, die empfangene Dateien bis zur Bereinigung aufbewahrt werden'],
])}

<h2>[agent]</h2>
${configTable([
  ['name', 'string', '"aidaemon"', 'Der Name des Assistenten'],
  ['persona_file', 'string', 'null', 'Markdown-Persona-Datei (relative Pfade werden neben <code>config.toml</code> aufgelöst)'],
])}

<h2>[execution]</h2>
<p>Wo die Befehle und Datei-Tools des Agenten laufen.</p>
${configTable([
  ['backend', 'string', '"local"', '<code>local</code>, <code>docker</code> (Einstellungen in <code>[execution.docker]</code>) oder <code>ssh</code> (Einstellungen in <code>[execution.ssh]</code>)'],
  ['workspace_root', 'string', 'null', 'Arbeitsverzeichnis für relative Pfade. Lokaler Standard: der Ordner des Daemons.'],
  ['allow_outside_workspace', 'bool', 'true (local)', 'Pfadbasierten Tools erlauben, außerhalb von <code>workspace_root</code> zuzugreifen. Bei Remote-Backends standardmäßig false.'],
])}

<h2>[checkpoints]</h2>
<p>Beta: ein Shadow-Git-Snapshot des Workspace vor der ersten Dateiänderung in jedem Durchgang. Standardmäßig <code>enabled = false</code>.</p>

<h2>[computer_use]</h2>
<p>Native macOS-Apps bedienen (mit <code>--features computer_use-macos</code> bauen). Standardmäßig <code>enabled = false</code>.</p>

<h2>[exposure.client_gateway]</h2>
<p>Ein Tunnel, den der Daemon betreibt, damit andere Geräte die App erreichen können. Siehe <a href="/app/gateway">Client Gateway &amp; Kopplung</a>.</p>

<h2>Secrets-Verwaltung</h2>
<p>Sensible Konfigurationswerte unterstützen neben Klartext zwei Auflösungsmethoden sowie einen optionalen reinen Env-Speichermodus:</p>

<h3>OS-Schlüsselbund</h3>
<p>Setze ein beliebiges Secret-Feld auf <code>"keychain"</code>, damit es aus dem Schlüsselbund des Betriebssystems aufgelöst wird (macOS Keychain, Windows Credential Manager, Linux secret-service):</p>
${codeBlock(`[provider]
api_key = "keychain"    # Resolved from keychain entry "api_key"

[telegram]
bot_token = "keychain"  # Resolved from keychain entry "bot_token"`, 'toml')}

<p>Speichere Werte vor dem ersten Start mit dem CLI-Befehl <code>keychain</code>:</p>
${codeBlock(`# Store a secret (prompts interactively)
aidaemon keychain set api_key
aidaemon keychain set bot_token

# Verify a stored secret (shows masked value)
aidaemon keychain get api_key

# Remove a secret
aidaemon keychain delete api_key`, 'bash')}

${callout('tip', 'Sicherheit', 'Der Befehl <code>set</code> fragt den Wert interaktiv mit Bestätigung ab, sodass Secrets nicht in deiner Shell-Historie landen.')}

<h3>Umgebungsvariablen</h3>
<p>Verwende die Syntax <code>\${VAR_NAME}</code> an beliebiger Stelle in Konfigurationswerten:</p>
${codeBlock(`[provider]
api_key = "\${GOOGLE_API_KEY}"

[telegram]
bot_token = "\${TELEGRAM_BOT_TOKEN}"`, 'toml')}

<h3>Reiner Env-Modus (ohne Schlüsselbund)</h3>
<p>Wenn du den Schlüsselbund des Betriebssystems nicht nutzen möchtest, setze diese Laufzeit-Umgebungsvariablen:</p>
${codeBlock(`# Disable OS keychain storage and use env file-backed secrets
export AIDAEMON_NO_KEYCHAIN=1

# Optional: choose a specific env file path (default: ./.env)
export AIDAEMON_ENV_FILE=/absolute/path/to/.env`, 'bash')}

<p>In diesem Modus liest aidaemon Secrets aus der gewählten Env-Datei (oder aus der Prozessumgebung, wenn keine Env-Datei existiert) und schreibt Secret-Aktualisierungen zurück in diese Env-Datei &mdash; einschließlich der Rotation von OAuth-Access- und Refresh-Tokens.</p>

${callout('warning', 'Sicherheit im Env-Modus', 'Halte die Env-Datei privat (<code>chmod 600</code>) und aus der Versionskontrolle heraus.')}

${callout('info', 'Unterstützte Schlüsselbund-Felder', 'Felder, die <code>"keychain"</code> unterstützen: <code>provider.api_key</code>, <code>provider.gateway_token</code>, <code>telegram.bot_token</code>, <code>slack.app_token</code>, <code>slack.bot_token</code>, <code>discord.bot_token</code>, <code>triggers.email.password</code>, <code>state.encryption_key</code>, <code>search.api_key</code> und die Profilfelder von <code>http_auth.*</code>.')}

<p>Der Schlüsselbund-Eintrag, den jedes Feld liest (der Name, den du <code>aidaemon keychain set</code> gibst):</p>
<ul>
  <li><code>provider.api_key</code> &rarr; <code>api_key</code>; der erste Eintrag in <code>[[provider.fallbacks]]</code> &rarr; <code>provider_fallback_0_api_key</code></li>
  <li><code>provider.gateway_token</code> &rarr; <code>gateway_token</code></li>
  <li><code>telegram.bot_token</code> &rarr; <code>bot_token</code></li>
  <li><code>slack.app_token</code> / <code>slack.bot_token</code> &rarr; <code>slack_app_token</code> / <code>slack_bot_token</code></li>
  <li><code>discord.bot_token</code> &rarr; <code>discord_bot_token</code></li>
  <li><code>triggers.email.password</code> &rarr; <code>email_password</code></li>
  <li><code>state.encryption_key</code> &rarr; <code>encryption_key</code></li>
  <li><code>search.api_key</code> &rarr; <code>search_api_key</code></li>
</ul>

<h2>[health]</h2>
<p>Gesundheitsüberwachungssystem. Siehe <a href="/health-monitoring">Gesundheitsüberwachung</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Das Gesundheitsüberwachungssystem aktivieren'],
  ['tick_interval_secs', 'integer', '30', 'Wie oft nach fälligen Probes gesucht wird'],
  ['result_retention_days', 'integer', '7', 'Tage, die Ergebnisse von Health-Checks aufbewahrt werden'],
])}

<h2>[[health.probes]]</h2>
${configTable([
  ['name', 'string', '&mdash;', 'Name der Probe'],
  ['type', 'string', '&mdash;', 'Probe-Typ: <code>http</code>, <code>command</code>, <code>file</code> oder <code>port</code> (<code>tcp</code>)'],
  ['target', 'string', '&mdash;', 'Ziel-URL, Befehl, Dateipfad oder Host:Port'],
  ['schedule', 'string', '&mdash;', 'Cron-Ausdruck oder Intervall'],
  ['consecutive_failures_alert', 'integer', '3', 'Nach N aufeinanderfolgenden Fehlschlägen alarmieren'],
  ['alert_session_ids', 'array', '[]', 'Sitzungs-IDs, die bei einem Alarm benachrichtigt werden'],
])}

<h2>[updates]</h2>
<p>Selbstaktualisierungssystem. Siehe <a href="/updates">Selbst-Updater</a>.</p>
${configTable([
  ['mode', 'string', '"check_only"', 'Update-Modus: enable, check_only oder disable'],
  ['check_interval_hours', 'integer', '24', 'Stunden zwischen Update-Prüfungen'],
  ['check_at_utc_hour', 'integer', 'null', 'Bestimmte UTC-Stunde (0-23) für die tägliche Prüfung'],
  ['confirmation_timeout_mins', 'integer', '60', 'Minuten, die auf die Genehmigung des Benutzers gewartet wird'],
])}

<h2>[people]</h2>
<p>Personen-Intelligenz — ein persönliches Kontaktbuch, das von deinem Assistenten gepflegt wird. Siehe <a href="/tools/people">Personen-Intelligenz</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Anfangszustand der Personen-Intelligenz (zur Laufzeit per Chat umschaltbar)'],
  ['fact_retention_days', 'integer', '180', 'Tage, bevor unbestätigte automatisch extrahierte Fakten entfernt werden'],
  ['reconnect_reminder_days', 'integer', '30', 'Tage der Inaktivität, bevor eine Wiederaufnahme des Kontakts vorgeschlagen wird'],
])}

<h2>Beispielkonfiguration</h2>
${codeBlock(`[provider]
kind = "google_genai"
api_key = "AIza..."

[provider.models]
primary = "gemini-4-hydrogen"
fast = "gemini-3.5-flash-lite"
smart = "gemini-4-argon"

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
args = ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]

[browser]
enabled = true
headless = true

[skills]
dir = "skills"
enabled = true

[search]
backend = "duckduckgo"

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
type = "http"
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
    description: 'LLM-Anbieter für aidaemon konfigurieren: ChatGPT-Abo, Anthropic, Google Gemini, OpenAI-kompatible APIs, xAI, lokale Modelle, Fallbacks und Modell-Upgrades.',
    content: () => `
<h1>Anbieter-Einrichtung</h1>
<p class="lead">Die Ersteinrichtung der App und die Seite Settings schreiben den Abschnitt <code>[provider]</code> für dich. Diese Seite zeigt, was sie schreiben, damit du es von Hand bearbeiten kannst.</p>

<h2>Anbietertypen</h2>
<table class="config-table">
<thead><tr><th>kind</th><th>Verwendet für</th></tr></thead>
<tbody>
<tr><td><code>openai_chatgpt</code></td><td>Ein ChatGPT-Tarif per Anmeldung (kein API-Schlüssel)</td></tr>
<tr><td><code>anthropic</code></td><td>Die native Messages API von Anthropic</td></tr>
<tr><td><code>google_genai</code></td><td>Die native API von Google Gemini</td></tr>
<tr><td><code>xai_native</code></td><td>xAI (Grok)</td></tr>
<tr><td><code>openai_compatible</code> (Standard; <code>base_url</code> ist standardmäßig <code>https://api.openai.com/v1</code>)</td><td>OpenAI, OpenRouter, DeepSeek, Moonshot, MiniMax, Cloudflare AI Gateway, Ollama, llama.cpp und jede OpenAI-kompatible API</td></tr>
</tbody>
</table>
<p><code>api_key = "keychain"</code> liest den Schlüssel aus dem Schlüsselbund des Betriebssystems; <code>api_key = "\${ENV_VAR}"</code> liest ihn aus der Umgebung. Siehe <a href="/configuration">Secrets-Verwaltung</a>.</p>

<h2>ChatGPT-Abo</h2>
<p>Läuft über einen ChatGPT-Tarif statt über nutzungsabhängige API-Abrechnung. Melde dich in der App an oder in einem Terminal:</p>
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
<p>Ist das Nutzungslimit des Tarifs erreicht, geht der Aufruf bis zum genannten Reset direkt an deine Fallback-Anbieter. Settings zeigt die 5-Stunden- und Wochenlimits des Tarifs.</p>

<h2>Anthropic</h2>
${codeBlock(`[provider]
kind = "anthropic"
api_key = "keychain"
# base_url = "https://api.anthropic.com/v1"   # optional; with or without /v1

[provider.models]
primary = "claude-sonnet-5-5"
fast = "claude-haiku-5-5"
smart = "claude-opus-5-5"`, 'toml')}
${callout('info', 'Basis-URL', 'Die API-Wurzel darf mit oder ohne abschließendes <code>/v1</code> angegeben werden (der Anbieterkatalog verwendet <code>https://api.anthropic.com/v1</code>); Anfragen gehen immer an <code>/v1/messages</code>. Vor 0.21.0 wurde eine Basis-URL, die auf <code>/v1</code> endet, an <code>/v1/v1/messages</code> gesendet, und jeder Aufruf scheiterte mit einem 404.')}
<h3>Prompt-Cache</h3>
<p>aidaemon nutzt den Prompt-Cache von Anthropic. Das feste Präfix (Tool-Definitionen und System-Prompt) wird eine Stunde lang gecacht, sodass eine Antwort nach einer Pause oder eine neue Unterhaltung innerhalb der Stunde es aus dem Cache liest. Das Ende der Unterhaltung behält den Fünf-Minuten-Cache. Zurückgestellte Tools werden vorab deklariert, sodass das Laden eines Tools mit <code>load_tools</code> den Cache nicht mehr neu schreibt. <code>reasoning_effort</code> (<code>low</code>, <code>medium</code>, <code>high</code>, <code>off</code>) entspricht dem erweiterten Denken.</p>

<h2>Google Gemini</h2>
<p>Native Google-Generative-AI-API, mit einem Schlüssel aus <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Google AI Studio</a>.</p>
${codeBlock(`[provider]
kind = "google_genai"
api_key = "keychain"

[provider.models]
primary = "gemini-4-hydrogen"
fast = "gemini-3.5-flash-lite"
smart = "gemini-4-argon"`, 'toml')}
<p>Wenn eine Anfrage keine Tools anbietet, kann Gemini seine Antwort mit der Google-Suche untermauern. Tool-Ergebnisse werden als Teile mit der Rolle user zurückgesendet, wie es aktuelle Gemini-Modelle verlangen (in 0.21.0 behoben: Zuvor fiel ein Durchgang mit einem Tool-Aufruf immer wieder zurück und antwortete nie). Ein aufgebrauchtes Tageskontingent leitet den Aufruf sofort an deine Fallback-Anbieter weiter.</p>

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
<p>Modelle vieler Anbieter über einen Schlüssel und das OpenAI-kompatible Format. Settings zeigt das Guthaben des Schlüssels. Die Anbieterliste enthält außerdem <strong>Anthropic (via OpenRouter)</strong> (<code>anthropic/claude-sonnet-4</code>, <code>anthropic/claude-haiku-4</code>, <code>anthropic/claude-opus-4</code> mit einem OpenRouter-Schlüssel), in Settings angeboten, aber nicht bei der Ersteinrichtung.</p>
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
<p>Sitzt vor den Upstream-Anbietern und stellt einen OpenAI-kompatiblen Endpunkt bereit.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "keychain"          # upstream provider key
gateway_token = "keychain"    # optional: Authenticated Gateway mode
base_url = "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/compat"

[provider.models]
primary = "your-model-id"`, 'toml')}
${callout('info', 'Cloudflare-Authentifizierungsmodi', 'Du kannst nur mit <code>api_key</code> arbeiten (Basismodus) oder zusätzlich <code>gateway_token</code> setzen, um <code>cf-aig-authorization</code> für den Modus Authenticated Gateway zu senden.')}

<h2>Ollama und llama.cpp (lokal)</h2>
<p>Selbst gehostete Modelle brauchen keinen Schlüssel. Die Ersteinrichtung listet die Modelle auf, die dein Server anbietet.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = ""
base_url = "http://localhost:11434/v1"   # Ollama
# base_url = "http://localhost:8080/v1"  # llama.cpp's llama-server

[provider.models]
primary = "your-model-id"`, 'toml')}
${callout('warn', 'Lokale Adressen', 'Verwende HTTPS für jeden Server, der nicht auf diesem Rechner läuft: Der Schlüssel wird mit jeder Anfrage gesendet. <code>llama-server</code> und der Health-Check des Daemons verwenden beide standardmäßig Port 8080: Verschiebe einen von beiden (<code>llama-server --port 8081</code> oder <code>[daemon] health_port</code>).')}

<h2>Fallback-Anbieter</h2>
<p>Einträge unter <code>[[provider.fallbacks]]</code> werden der Reihe nach probiert, nachdem die eigenen Modelle des Hauptanbieters an der Reihe waren. Ein Anbieter, dessen Konto nicht antworten kann (Nutzungslimit eines Tarifs, Tageskontingent, kein Guthaben, abgelehnter Schlüssel), wird sofort übersprungen und bleibt es bis zu seinem genannten Reset. Wechselst du den Hauptanbieter in Settings, bleibt der alte als Failover erhalten.</p>
${codeBlock(`[[provider.fallbacks]]
kind = "anthropic"
api_key = "keychain"
[provider.fallbacks.models]
default = "claude-sonnet-5-5"`, 'toml')}
<p><code>[provider.models]</code> nimmt entweder <code>primary</code> / <code>fast</code> / <code>smart</code> oder <code>default</code> plus eine geordnete Liste <code>fallback = [...]</code> von Modellen, die bei fehlschlagenden Aufrufen probiert werden.</p>

<h2>Modell-Upgrades</h2>
<p>Einmal am Tag prüft der Daemon die Modellliste jedes Anbieters und stellt ein Modell auf die neueste Version seiner eigenen Linie um (zum Beispiel <code>gpt-6-sol</code> auf <code>gpt-6.2-sol</code>; nie auf eine andere Größe, einen Snapshot oder eine Preview). Er bewährt das neue Modell zuerst mit einem Tool-Aufruf, behält das alte als ersten Fallback und sagt dir Bescheid. Bei einem Anbieter mit Abrechnung pro Token wirst du nur informiert. Schalte es so aus:</p>
${codeBlock(`[provider]
auto_upgrade = false`, 'toml')}
<p>Ein <code>/model</code>-Pin verschiebt das Upgrade.</p>
`
  },
  {
    slug: '/telegram',
    section: 'Telegram',
    title: 'Bot-Einrichtung',
    description: 'AIDaemon als Telegram-Bot einrichten: Bot mit BotFather erstellen, festlegen, wer ihn nutzen darf, und optional Webhooks verwenden.',
    content: () => `
<h1>Telegram-Bot-Einrichtung</h1>
<p class="lead">Telegram ist der Hauptkanal von AIDaemon. AIDaemon spricht direkt mit der Telegram Bot API, standardmäßig per Long Polling oder mit einem optionalen Webhook für geringere Latenz. Siehe auch <a href="/slack">Slack</a> für die Workspace-Integration.</p>

<h2>Einen Bot erstellen</h2>
<ol>
  <li>Schreibe <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a> auf Telegram an</li>
  <li>Sende <code>/newbot</code> und folge den Anweisungen</li>
  <li>Kopiere das Bot-Token (Format: <code>123456789:ABCdefGHIjklMNOpqrSTUvwxYZ</code>)</li>
</ol>

<h2>Deine Benutzer-ID herausfinden</h2>
<p>Deine numerische Telegram-Benutzer-ID wird für die Liste <code>allowed_user_ids</code> gebraucht. Du findest sie, indem du <a href="https://t.me/userinfobot" target="_blank" rel="noopener">@userinfobot</a> schreibst.</p>
<p>Oder schreibe einfach deinem Bot: Bist du noch nicht freigeschaltet, antwortet er mit deiner numerischen ID und der genauen Zeile <code>allowed_user_ids</code>, die du hinzufügen musst.</p>

<h2>Konfiguration</h2>
${codeBlock(`[telegram]
bot_token = "keychain"   # or the token itself, or "\${TELEGRAM_BOT_TOKEN}"
allowed_user_ids = [123456789]`, 'toml', 'config.toml')}

${callout('warn', 'Zugriffskontrolle', 'Ist <code>allowed_user_ids</code> leer, wird die <strong>erste Person, die dem Bot privat schreibt</strong>, sein Owner, und diese ID wird in config.toml gespeichert. Gruppennachrichten werden abgelehnt, bis ein Owner existiert. Setze <code>allowed_user_ids</code>, bevor du den Namen des Bots weitergibst.')}

<h2>Owner und Gäste</h2>
<p>Owner werden pro Plattform unter <code>[users] owner_ids</code> aufgeführt. Sind keine gesetzt, ist jeder erlaubte Benutzer ein Owner. Nur Owner können Genehmigungen beantworten und Befehle ausführen, die etwas ändern; andere erlaubte Benutzer sind Gäste.</p>
${codeBlock(`[users]
owner_ids = { telegram = ["123456789"] }`, 'toml', 'config.toml')}

<h2>Webhook-Modus</h2>
<p>Long Polling braucht keine Einrichtung. Für geringere Zustelllatenz kann ein Bot Updates stattdessen per Webhook empfangen:</p>
${codeBlock(`[telegram.webhook]
enabled = true
public_url = "https://bot.example.com"
listen_addr = "0.0.0.0:8443"

# Or give every bot a webhook automatically:
# [telegram_webhook_defaults]
# enabled = true
# base_domain = "bots.example.com"   # each bot gets <slug>.bots.example.com
# port_start = 8443`, 'toml', 'config.toml')}
<p>Aus dem Chat führt dich <code>/setup lowlatency</code> hindurch.</p>

<h2>Funktionen</h2>
<ul>
  <li><strong>Tippanzeige</strong> &mdash; wird etwa alle 3 Sekunden erneut gesendet, solange der Agent arbeitet</li>
  <li><strong>Markdown-Darstellung</strong> &mdash; Antworten des Agenten werden in Telegram-HTML umgewandelt</li>
  <li><strong>Aufteilung langer Nachrichten</strong> &mdash; Antworten über 4096 Zeichen werden an Absatz-/Zeilengrenzen aufgeteilt</li>
  <li><strong>Screenshot-Versand</strong> &mdash; Browser-Screenshots werden als Fotos mit Bildunterschrift gesendet</li>
  <li><strong>Dateiübertragung</strong> &mdash; Dokumente, Fotos, Audio und Video über Telegram senden und empfangen</li>
  <li><strong>Live-Aufgabenstatus</strong> &mdash; <code>/tasks</code> zeigt, was in diesem Chat läuft</li>
  <li><strong>Inline-Genehmigungsschaltflächen</strong> &mdash; Schaltflächen <strong>Allow</strong>, <strong>Always allow</strong> (oder <strong>Allow until restart</strong>) und <strong>Deny</strong> für Genehmigungen (siehe <a href="/telegram/approval">Genehmigungsablauf</a>)</li>
  <li><strong>Multi-Bot-Unterstützung</strong> &mdash; konfiguriere mehrere Telegram-Bots mit <code>[[telegram_bots]]</code>-Einträgen oder füge einen aus dem Chat mit <code>/connect</code> hinzu</li>
  <li><strong>Erweiterte Dateibehandlung</strong> &mdash; MIME-Typ-Erkennung, Größenlimits und Pfadsicherheitsprüfung</li>
</ul>

<h2>Wiederholungsverhalten</h2>
<p>Bricht die Verbindung des Bots ab, startet AIDaemon ihn mit exponentiellem Backoff neu:</p>
<ul>
  <li>Anfänglicher Backoff: 5 s</li>
  <li>Verdoppelt sich jedes Mal: 5 s &rarr; 10 s &rarr; 20 s &rarr; 40 s &rarr; 60 s (Maximum), mit etwas zufälligem Jitter</li>
  <li>Wird auf 5 s zurückgesetzt, wenn der Bot 60+ Sekunden stabil läuft</li>
</ul>
`
  },
  {
    slug: '/telegram/commands',
    section: 'Telegram',
    title: 'Befehle',
    description: 'Telegram-Befehle für AIDaemon: /clear, /tasks, /cancel, /status, /model, /cost, /mode und mehr.',
    content: () => `
<h1>Telegram-Befehle</h1>
<p class="lead">Eingebaute Slash-Befehle, um den Agenten von Telegram aus zu steuern. Sie erscheinen im <code>/</code>-Menü von Telegram. Du brauchst sie selten: Frag einfach in normalen Worten, und der Agent wählt die passenden Tools.</p>

<p><code>/help</code> (oder <code>/start</code>) zeigt die alltäglichen Befehle; <code>/help all</code> listet jeden Befehl auf.</p>

<h2>Unterhaltung</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>/clear</code> (oder <code>/new</code>)</td><td>Eine frische Unterhaltung beginnen. Dein Verlauf bleibt erhalten, und in diesem Chat laufende Arbeit wird gestoppt.</td></tr>
<tr><td><code>/wipe</code></td><td>Diese Unterhaltung dauerhaft löschen. Das erste <code>/wipe</code> erklärt nur; sende es innerhalb weniger Minuten erneut, um sie zu löschen. Bereits im Speicher abgelegte Fakten bleiben erhalten.</td></tr>
<tr><td><code>/context</code></td><td>Zeigen, wie viel von der Unterhaltung der Agent sehen kann</td></tr>
<tr><td><code>/project [name|none]</code></td><td>Das Projekt anzeigen oder ändern, in dem dieser Chat arbeitet</td></tr>
<tr><td><code>/memory</code></td><td>Den Speicher des Projekts anzeigen, in dem dieser Chat arbeitet</td></tr>
</tbody>
</table>

<h2>Arbeit</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>/tasks</code></td><td>Auflisten, was in diesem Chat läuft, nummeriert</td></tr>
<tr><td><code>/cancel</code>, <code>/cancel all</code>, <code>/cancel &lt;number&gt;</code></td><td>Stoppen, was in diesem Chat läuft: alles aus einer Anfrage, alles oder einen einzelnen Eintrag (die Nummern stammen aus <code>/tasks</code>)</td></tr>
<tr><td><code>/status</code></td><td>Modus dieses Chats, was läuft und der nächste geplante Eintrag</td></tr>
<tr><td><code>/work [ready|running|blocked|show|comment|unblock|retry]</code></td><td>Längere Arbeit ansehen und verwalten, die wartet oder von selbst läuft</td></tr>
<tr><td><code>/cost</code></td><td>Token-Nutzung anzeigen (letzte 24 Std., letzte 7 Tage, Top-Modelle)</td></tr>
</tbody>
</table>

<h2>Modelle</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Das aktuelle Modell anzeigen</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Ein Modell für jeden Chat verwenden (schaltet die automatische Modellwahl aus)</td></tr>
<tr><td><code>/models</code></td><td>Die Modelle auflisten, die dein Anbieter anbietet (das aktive ist markiert)</td></tr>
<tr><td><code>/auto</code></td><td>Zur automatischen Modellwahl zurückkehren</td></tr>
</tbody>
</table>

<h2>Zugriff und Datenschutz</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>/mode [full|unrestricted|readonly]</code></td><td>Den Zugriffsmodus dieses Chats anzeigen oder ändern</td></tr>
<tr><td><code>/readonly</code></td><td>Diesen Chat für 4 Stunden schreibgeschützt machen</td></tr>
<tr><td><code>/private [off]</code></td><td>Dir deine nächste Nachricht nicht merken und nicht daraus lernen (<code>off</code> bricht es ab)</td></tr>
<tr><td><code>/trustall on|off</code></td><td>Jeden Terminal-Befehl ohne Nachfrage ausführen</td></tr>
</tbody>
</table>

<h2>Dateien</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>/checkpoints</code></td><td>Dateisystem-Checkpoints auflisten</td></tr>
<tr><td><code>/rollback [checkpoint-id|confirm TOKEN]</code></td><td>Einen Checkpoint-Rollback in der Vorschau zeigen und dann bestätigen</td></tr>
</tbody>
</table>

<h2>Geräte</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>/pair_device</code></td><td>Ein Handy oder einen Browser mit der App koppeln</td></tr>
<tr><td><code>/devices</code></td><td>Gekoppelte Geräte auflisten</td></tr>
<tr><td><code>/revoke_device &lt;id&gt;</code></td><td>Die Kopplung eines Geräts aufheben</td></tr>
<tr><td><code>/exposure</code></td><td>Die Tunnel anzeigen, die die Gateways veröffentlichen</td></tr>
</tbody>
</table>

<h2>Bot-Verwaltung</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>/reload</code></td><td>config.toml neu einlesen und Anbieter- und Modelländerungen anwenden (siehe unten)</td></tr>
<tr><td><code>/restart</code></td><td>Vollständiger Neustart: startet einen neuen Prozess, der eine neue Binärdatei, Konfiguration und MCP-Server übernimmt</td></tr>
<tr><td><code>/setkey</code></td><td>Den API-Schlüssel eines Anbieters ersetzen (funktioniert auch, wenn kein Modell verfügbar ist; nur im privaten Chat)</td></tr>
<tr><td><code>/connect &lt;platform&gt; &lt;token&gt;</code></td><td>Einen neuen Bot-Channel hinzufügen</td></tr>
<tr><td><code>/bots</code></td><td>Verbundene Bots auflisten</td></tr>
<tr><td><code>/setup [lowlatency]</code></td><td>Einrichtungsassistent (Webhooks, niedrige Latenz)</td></tr>
<tr><td><code>/agent [codex|claude|gemini|opencode] [dir]</code></td><td>CLI-Agent-Sitzungen starten oder verwalten</td></tr>
<tr><td><code>/terminal [lite|start|open]</code></td><td>Befehle der Terminal-Bridge</td></tr>
</tbody>
</table>

${callout('info', 'Wer Befehle nutzen darf', 'Die meisten Befehle sind nur für Owner. In einem gemeinsamen Chat können Gäste <code>/tasks</code>, <code>/private</code>, <code>/context</code>, <code>/readonly</code>, <code>/mode</code> und <code>/cancel</code> nutzen; die letzten vier sagen selbst, ob der Gast handeln darf.')}

<h2>Modellwechsel</h2>
${codeBlock(`/model claude-sonnet-5-5
# Uses claude-sonnet-5-5 in every chat and turns off automatic model choice

/auto
# Goes back to automatic model choice`, 'text')}

${callout('info', 'Modell-Override', 'Wenn du mit <code>/model</code> ein Modell festlegst, bleibt die automatische Modellwahl aus, bis du <code>/auto</code> sendest. Die Wahl mit <code>/model</code> gilt für jeden Chat. Ein Modell, das in der App für eine Unterhaltung gewählt wurde, hat Vorrang davor.')}

<h2>Konfiguration neu laden</h2>
<p><code>/reload</code> liest <code>config.toml</code> neu ein und wendet Anbieter- und Modelländerungen ohne Neustart an. Andere Änderungen brauchen <code>/restart</code>. Lässt sich die Datei nicht mehr laden, stellt <code>/reload</code> <code>config.toml.bak</code> wieder her.</p>
<p>Beim Start wird eine defekte Konfiguration automatisch wiederhergestellt, und zwar in dieser Reihenfolge:</p>
<ol>
  <li><code>.toml.lastgood</code> &mdash; die letzte Konfiguration, mit der ein Modellaufruf abgeschlossen wurde</li>
  <li><code>.toml.bak</code> &rarr; <code>.toml.bak.1</code> &rarr; <code>.toml.bak.2</code></li>
</ol>
`
  },
  {
    slug: '/telegram/approval',
    section: 'Telegram',
    title: 'Genehmigungsablauf',
    description: 'Genehmigung per Inline-Tastatur in Telegram für Befehle und Aktionen, die dein OK brauchen.',
    content: () => `
<h1>Ablauf der Befehlsgenehmigung</h1>
<p class="lead">Interaktive Genehmigung per Inline-Tastatur für Befehle und Aktionen, die dein OK brauchen.</p>

<h2>So funktioniert es</h2>
<ol>
  <li>Der Agent will einen Terminal-Befehl ausführen (oder eine andere Aktion vornehmen), der deine Genehmigung braucht. Ein Befehl läuft ohne Nachfrage, wenn du ihn bereits erlaubt hast oder wenn er auf der Safe-Liste steht und eingegrenzt laufen kann. Andernfalls entscheidet eine schnelle Risikoprüfung, ob er gefährlich genug ist, dich zu fragen.</li>
  <li>Die Genehmigungskarte wird in dem Chat gepostet, in dem die Arbeit läuft. Nur ein Owner kann sie beantworten; ein Gast, der den Chat teilt, sieht die Karte, kann aber nicht entscheiden.</li>
  <li>Die Karte zeigt den Befehl, sein Risiko und etwaige Warnungen, mit diesen Schaltflächen:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Genehmigung erforderlich:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Always allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Genehmigungsoptionen</h2>
<table class="config-table">
<thead><tr><th>Option</th><th>Verhalten</th></tr></thead>
<tbody>
<tr><td><strong>Allow</strong></td><td>Nur dieses Mal ausführen</td></tr>
<tr><td><strong>Always allow</strong></td><td>Ausführen und das Programm in der Datenbank merken (pro Ausführungsziel), sodass du nicht erneut gefragt wirst, auch nach einem Neustart. config.toml wird nicht geändert.</td></tr>
<tr><td><strong>Allow until restart</strong></td><td>Wird statt <strong>Always allow</strong> für kritische Befehle angezeigt, oder für alles, wenn <code>terminal.permission_mode = "cautious"</code> gilt. Die Erlaubnis gilt, bis der Daemon neu startet.</td></tr>
<tr><td><strong>Deny</strong></td><td>Ablehnen &mdash; dem Agenten wird gesagt, dass es abgelehnt wurde</td></tr>
</tbody>
</table>
<p>Manche Aktionen bieten nur <strong>Allow</strong> und <strong>Deny</strong> an. Karten decken außerdem mehr als Terminal-Befehle ab, etwa Browser-Aktionen und die Bestätigung neu geplanter Arbeit (<strong>Approve &amp; activate</strong> / <strong>Cancel</strong>).</p>

${callout('info', 'Ablauf', 'Eine unbeantwortete Karte läuft nach 5 Minuten ab, mit einer Erinnerung kurz davor, und zählt als <strong>Deny</strong>.')}

<h2>Was immer nachfragt</h2>
<ul>
  <li>Befehle aus nicht vertrauenswürdigen Triggern, etwa <a href="/triggers">E-Mail</a></li>
  <li>Befehle, die Fähigkeiten über die Aufgabe hinaus verlangen</li>
  <li>Befehle, die geschützte Zugangsdaten-Pfade berühren, auch wenn sie zuvor erlaubt waren</li>
  <li>Neue Befehle, die im Hintergrund weiterlaufen würden (detached)</li>
</ul>

${callout('warn', 'Verkettete Befehle', 'Ein verketteter Befehl (<code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code>) gilt nur dann als erlaubt, wenn das Programm jedes Teils auf deiner dauerhaften Erlaubnisliste steht. Eine Erlaubnis, die du für eine Sitzung gegeben hast, schaltet nie eine Kette frei. Befehlssubstitution (<code>$()</code>, Backticks) wird nie von einer Erlaubnis abgedeckt.')}

${callout('danger', 'Nicht vertrauenswürdige Quellen', 'Von Triggern (wie E-Mail) gestartete Sitzungen sind nicht vertrauenswürdig. Jeder Terminal-Befehl darin erfordert eine Genehmigung, was auch immer du zuvor erlaubt hast.')}
`
  },
  {
    slug: '/slack',
    section: 'Slack',
    title: 'Workspace-Einrichtung',
    description: 'AIDaemon über Socket Mode mit Slack verbinden. Eine Slack-App erstellen, Scopes und Events hinzufügen und festlegen, wer sie nutzen darf.',
    content: () => `
<h1>Slack-Integration</h1>
<p class="lead">Verbinde AIDaemon über Socket Mode mit deinem Slack-Workspace für Nachrichten in Echtzeit.</p>

${callout('success', 'Vorkompilierte Binärdateien', 'Hast du über das Einzeiler-Skript oder Homebrew installiert, ist Slack-Unterstützung bereits enthalten. Konfiguriere einfach unten <code>config.toml</code>. Das Feature-Flag wird nur beim <a href="/getting-started/build">Bauen aus dem Quellcode</a> gebraucht.')}

<h2>Eine Slack-App erstellen</h2>
<ol>
  <li>Gehe zu <a href="https://api.slack.com/apps" target="_blank" rel="noopener">api.slack.com/apps</a> und klicke auf <strong>Create New App</strong></li>
  <li>Wähle <strong>From scratch</strong>, gib ihr einen Namen (z. B. "AIDaemon") und wähle deinen Workspace</li>
  <li>Aktiviere unter <strong>Socket Mode</strong> den Modus und erzeuge ein <strong>App-Level Token</strong> mit dem Scope <code>connections:write</code> &mdash; das ist dein <code>app_token</code> (<code>xapp-...</code>)</li>
  <li>Füge unter <strong>OAuth &amp; Permissions</strong> diese <strong>Bot Token Scopes</strong> hinzu:
    <ul>
      <li><code>app_mentions:read</code> &mdash; Nachrichten sehen, die den Bot per @ erwähnen</li>
      <li><code>channels:history</code> &mdash; Nachrichten und Threads in öffentlichen Channels lesen (wird auch vom Tool <code>read_channel_history</code> verwendet)</li>
      <li><code>channels:read</code> &mdash; Mitglieder in öffentlichen Channels auflisten</li>
      <li><code>chat:write</code> &mdash; Nachrichten senden</li>
      <li><code>files:read</code> &mdash; von Benutzern gesendete Dateien herunterladen</li>
      <li><code>files:write</code> &mdash; Dateien zu Slack hochladen</li>
      <li><code>groups:history</code> &mdash; Nachrichten und Threads in privaten Channels lesen</li>
      <li><code>groups:read</code> &mdash; Mitglieder in privaten Channels auflisten (nötig, um Benutzernamen in privaten Channels aufzulösen)</li>
      <li><code>im:history</code> &mdash; Direktnachrichten lesen</li>
      <li><code>im:read</code> &mdash; DM-Metadaten lesen (erforderlich für Dateiübertragungen in Direktnachrichten)</li>
      <li><code>reactions:write</code> &mdash; Status-Reaktionen hinzufügen (Sanduhr während der Verarbeitung)</li>
      <li><code>users:read</code> &mdash; Benutzerinformationen auflösen</li>
    </ul>
  </li>
  <li>Aktiviere unter <strong>Event Subscriptions</strong> die Events und abonniere diese Bot-Events:
    <ul>
      <li><code>app_mention</code> &mdash; Nachrichten, die den Bot per @ erwähnen</li>
      <li><code>message.channels</code> &mdash; Nachrichten in öffentlichen Channels</li>
      <li><code>message.groups</code> &mdash; Nachrichten in privaten Channels</li>
      <li><code>message.im</code> &mdash; Direktnachrichten</li>
    </ul>
  </li>
  <li>Scrolle unter <strong>App Home</strong> zu <strong>Show Tabs</strong> und aktiviere den <strong>Messages Tab</strong>. Setze den Haken bei <strong>"Allow users to send Slash commands and messages from the messages tab"</strong> &mdash; ohne das können Benutzer dem Bot keine DMs schreiben.</li>
  <li>Installiere die App in deinem Workspace &mdash; kopiere das <strong>Bot User OAuth Token</strong> (<code>xoxb-...</code>)</li>
</ol>

<h2>Konfiguration</h2>
${codeBlock(`[slack]
app_token = "xapp-1-..."
bot_token = "xoxb-..."
allowed_user_ids = ["U123456789"]
use_threads = true

[users]
owner_ids = { slack = ["U123456789"] }`, 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'Für ältere Konfigurationen beibehalten; der Bot startet, sobald beide Tokens gesetzt sind.'],
  ['app_token', 'string', '&mdash;', 'App-Level Token für Socket Mode (<code>xapp-...</code>). Unterstützt <code>"keychain"</code> und <code>$&#123;ENV&#125;</code>.'],
  ['bot_token', 'string', '&mdash;', 'Bot User OAuth Token (<code>xoxb-...</code>). Unterstützt <code>"keychain"</code> und <code>$&#123;ENV&#125;</code>.'],
  ['allowed_user_ids', 'array', '[]', 'Slack-Benutzer-IDs, die den Bot nutzen dürfen. Ist die Liste leer und sind keine Owner gesetzt, übernimmt ihn die erste Person, die ihm eine DM schreibt.'],
  ['use_threads', 'bool', 'true', 'Standardmäßig in Threads antworten. Jeder Thread bekommt seinen eigenen Sitzungskontext.'],
])}

<p>Owner werden unter <code>[users] owner_ids</code> festgelegt; sind keine gesetzt, ist jeder auf der Allowlist ein Owner. Für mehr als einen Slack-Bot verwende <code>[[slack_bots]]</code>-Einträge mit denselben Schlüsseln.</p>

<h2>Deine Slack-Benutzer-ID herausfinden</h2>
<p>Klicke in Slack auf dein Profil, dann auf <strong>More</strong> &rarr; <strong>Copy member ID</strong>. Das Format ist <code>U</code> gefolgt von alphanumerischen Zeichen (z. B. <code>U0123ABCDEF</code>).</p>

<h2>Funktionen</h2>
<ul>
  <li><strong>Socket Mode</strong> &mdash; WebSocket-Verbindung in Echtzeit, keine öffentliche URL erforderlich</li>
  <li><strong>Antworten in Threads</strong> &mdash; konfigurierbare Thread-Unterhaltungen mit Sitzungskontext pro Thread</li>
  <li><strong>Dateiübertragung</strong> &mdash; Dateien über Slack senden und empfangen</li>
  <li><strong>Block-Kit-Genehmigungen</strong> &mdash; interaktive Schaltflächen für Genehmigungen (siehe <a href="/slack/approval">Genehmigungsablauf</a>)</li>
  <li><strong>Befehle</strong> &mdash; die gemeinsamen Befehle, eingegeben als <code>!command</code> (zum Beispiel <code>!cost</code>, <code>!model</code>, <code>!tasks</code>), plus <code>!workspace</code> und <code>!restart</code> (siehe <a href="/slack/commands">Befehle</a>)</li>
  <li><strong>Status-Reaktionen</strong> &mdash; Sanduhr-Emoji während der Verarbeitung, nach Abschluss entfernt</li>
  <li><strong>Markdown-Umwandlung</strong> &mdash; Standard-Markdown wird automatisch in das Slack-mrkdwn-Format umgewandelt</li>
  <li><strong>Nachrichtenaufteilung</strong> &mdash; lange Antworten werden aufgeteilt, um die Nachrichtenlimits von Slack einzuhalten</li>
  <li><strong>Automatische Wiederverbindung</strong> &mdash; exponentieller Backoff bei Verbindungsfehlern (5 s &rarr; maximal 60 s)</li>
  <li><strong>Multi-Bot-Unterstützung</strong> &mdash; betreibe mehrere Slack-Bots mit <code>[[slack_bots]]</code></li>
</ul>

<h2>Sitzungsmodell</h2>
<p>Slack-Sitzungen werden durch Channel und Thread identifiziert:</p>
<ul>
  <li><strong>Channel-Nachricht:</strong> <code>slack:{channel_id}</code></li>
  <li><strong>Thread-Nachricht:</strong> <code>slack:{channel_id}:{thread_ts}</code> (wenn <code>use_threads</code> aktiviert ist)</li>
</ul>
<p>Mit aktiviertem <code>use_threads</code> beantwortet der Bot eine Nachricht auf oberster Ebene eines Channels in einem neuen Thread, sodass diese Unterhaltung ihre eigene Sitzung bekommt. Sitzungs-IDs tragen den Namen des Bots als Präfix, sodass mehrere Bots nie eine Sitzung teilen.</p>
<p>Jede Sitzung führt ihren eigenen Gesprächsverlauf, Arbeitsspeicher und Faktenkontext.</p>

${callout('warn', 'Zugriffskontrolle', 'Sind sowohl <code>allowed_user_ids</code> als auch die Slack-Owner-Liste leer, wird die erste Person, die dem Bot eine DM schreibt, sein Owner und in der Konfiguration gespeichert. Personen, die nicht auf der Liste stehen und den Bot per @ erwähnen, erhalten eine eingeschränkte öffentliche Rolle, die keine Befehle ausführen kann. Setze <code>allowed_user_ids</code> im Produktivbetrieb.')}
`
  },
  {
    slug: '/slack/commands',
    section: 'Slack',
    title: 'Befehle',
    description: 'Befehle für AIDaemon in Slack, eingegeben als !command: !clear, !tasks, !cancel, !model, !cost, !workspace und mehr.',
    content: () => `
<h1>Slack-Befehle</h1>
<p class="lead">In Slack verfügbare Befehle: die gemeinsamen Befehle, ohne die Bot-Verwaltungs- und Terminal-Befehle von Telegram. Gib sie als <code>!command</code> ein, weil Slack <code>/</code> für seine eigenen Slash-Befehle reserviert; <code>/command</code> wird akzeptiert, wenn Slack es durchreicht.</p>

<p><code>!help</code> (oder <code>!start</code>) zeigt die alltäglichen Befehle mit den Schaltflächen Restart, Reload, Clear und Cost; <code>!help all</code> listet jeden Befehl auf.</p>

<h2>Unterhaltung</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>!clear</code> (oder <code>!new</code>)</td><td>Eine frische Unterhaltung beginnen. Dein Verlauf bleibt erhalten, und in diesem Chat laufende Arbeit wird gestoppt.</td></tr>
<tr><td><code>!wipe</code></td><td>Diese Unterhaltung dauerhaft löschen. Das erste <code>!wipe</code> erklärt nur; sende es innerhalb weniger Minuten erneut, um sie zu löschen. Bereits im Speicher abgelegte Fakten bleiben erhalten.</td></tr>
<tr><td><code>!context</code></td><td>Zeigen, wie viel von der Unterhaltung der Agent sehen kann</td></tr>
<tr><td><code>!project [name|none]</code></td><td>Das Projekt anzeigen oder ändern, in dem dieser Chat arbeitet</td></tr>
<tr><td><code>!memory</code></td><td>Den Speicher des Projekts anzeigen, in dem dieser Chat arbeitet</td></tr>
</tbody>
</table>

<h2>Arbeit</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>!tasks</code></td><td>Auflisten, was in diesem Chat läuft, nummeriert</td></tr>
<tr><td><code>!cancel</code>, <code>!cancel all</code>, <code>!cancel &lt;number&gt;</code></td><td>Stoppen, was in diesem Chat läuft: alles aus einer Anfrage, alles oder einen einzelnen Eintrag (die Nummern stammen aus <code>!tasks</code>)</td></tr>
<tr><td><code>!status</code></td><td>Modus dieses Chats, was läuft und der nächste geplante Eintrag</td></tr>
<tr><td><code>!work [ready|running|blocked|show|comment|unblock|retry]</code></td><td>Längere Arbeit ansehen und verwalten, die wartet oder von selbst läuft</td></tr>
<tr><td><code>!cost</code></td><td>Token-Nutzung anzeigen (letzte 24 Std., letzte 7 Tage, Top-Modelle)</td></tr>
</tbody>
</table>

<h2>Modelle</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>!model</code></td><td>Das aktuelle Modell anzeigen</td></tr>
<tr><td><code>!model &lt;name&gt;</code></td><td>Ein Modell für jeden Chat verwenden (schaltet die automatische Modellwahl aus)</td></tr>
<tr><td><code>!models</code></td><td>Die Modelle auflisten, die dein Anbieter anbietet (das aktive ist markiert)</td></tr>
<tr><td><code>!auto</code></td><td>Zur automatischen Modellwahl zurückkehren</td></tr>
</tbody>
</table>

<h2>Zugriff und Datenschutz</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>!mode [full|unrestricted|readonly]</code></td><td>Den Zugriffsmodus dieses Chats anzeigen oder ändern</td></tr>
<tr><td><code>!readonly</code></td><td>Diesen Chat für 4 Stunden schreibgeschützt machen</td></tr>
<tr><td><code>!private [off]</code></td><td>Dir deine nächste Nachricht nicht merken und nicht daraus lernen (<code>off</code> bricht es ab)</td></tr>
<tr><td><code>!trustall on|off</code></td><td>Jeden Terminal-Befehl ohne Nachfrage ausführen</td></tr>
</tbody>
</table>

<h2>Dateien</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>!checkpoints</code></td><td>Dateisystem-Checkpoints auflisten</td></tr>
<tr><td><code>!rollback [checkpoint-id|confirm TOKEN]</code></td><td>Einen Checkpoint-Rollback in der Vorschau zeigen und dann bestätigen</td></tr>
</tbody>
</table>

<h2>Geräte</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>!pair_device</code></td><td>Ein Handy oder einen Browser mit der App koppeln</td></tr>
<tr><td><code>!devices</code></td><td>Gekoppelte Geräte auflisten</td></tr>
<tr><td><code>!revoke_device &lt;id&gt;</code></td><td>Die Kopplung eines Geräts aufheben</td></tr>
<tr><td><code>!exposure</code></td><td>Die Tunnel anzeigen, die die Gateways veröffentlichen</td></tr>
</tbody>
</table>

<h2>Bot-Verwaltung</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>!reload</code></td><td>config.toml neu einlesen und Anbieter- und Modelländerungen anwenden (andere Änderungen brauchen <code>!restart</code>)</td></tr>
<tr><td><code>!restart</code></td><td>Vollständiger Neustart: startet einen neuen Prozess, der eine neue Binärdatei, Konfiguration und MCP-Server übernimmt (nur Owner)</td></tr>
<tr><td><code>!workspace grant &lt;@user&gt; &lt;read|edit&gt; &lt;project-path&gt; [hours]</code></td><td>Jemandem ablaufenden Zugriff auf ein Projekt geben (bis zu 168 Stunden). Sende es in der privaten Slack-Gruppe, in der die Freigabe gelten soll. Nur Owner.</td></tr>
<tr><td><code>!workspace revoke &lt;@user&gt;</code> / <code>!workspace list</code></td><td>Eine Freigabe entziehen oder die aktuellen Freigaben auflisten</td></tr>
</tbody>
</table>

${callout('info', 'Wer Befehle nutzen darf', 'Die meisten Befehle sind nur für Owner. Gäste können <code>!tasks</code>, <code>!private</code>, <code>!context</code>, <code>!readonly</code>, <code>!mode</code> und <code>!cancel</code> nutzen; Personen mit nur der öffentlichen Rolle (sie haben den Bot per @ erwähnt, stehen aber nicht auf der Allowlist) können keine Befehle ausführen.')}

${callout('info', 'Slash vs. Klartext', 'Diese Befehle werden als normale Nachrichten in einer DM oder einem Channel mit dem Bot gesendet. Sie sind nicht als Slack-Slash-Befehle im App-Manifest registriert. Fügst du der App selbst native Slash-Befehle hinzu, verarbeitet der Bot sie, aber nur für Owner.')}
`
  },
  {
    slug: '/slack/approval',
    section: 'Slack',
    title: 'Genehmigungsablauf',
    description: 'Interaktive Block-Kit-Schaltflächen zum Genehmigen von Befehlen und Aktionen in Slack.',
    content: () => `
<h1>Slack-Genehmigungsablauf</h1>
<p class="lead">Interaktive Block-Kit-Schaltflächen zum Genehmigen von Befehlen und Aktionen in Slack.</p>

<h2>So funktioniert es</h2>
<ol>
  <li>Der Agent will einen Terminal-Befehl ausführen (oder eine andere Aktion vornehmen), der deine Genehmigung braucht. Ein Befehl läuft ohne Nachfrage, wenn du ihn bereits erlaubt hast oder wenn er auf der Safe-Liste steht und eingegrenzt laufen kann. Andernfalls entscheidet eine schnelle Risikoprüfung, ob er gefährlich genug ist, dich zu fragen.</li>
  <li>Die Genehmigungskarte wird in dem Slack-Channel oder -Thread gepostet, in dem die Arbeit läuft. Nur ein Owner kann sie beantworten.</li>
  <li>Die Karte zeigt den Befehl, sein Risiko und etwaige Warnungen, mit diesen Schaltflächen:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Genehmigung erforderlich:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Always allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Genehmigungsoptionen</h2>
<table class="config-table">
<thead><tr><th>Option</th><th>Verhalten</th></tr></thead>
<tbody>
<tr><td><strong>Allow</strong></td><td>Nur dieses Mal ausführen</td></tr>
<tr><td><strong>Always allow</strong></td><td>Ausführen und das Programm in der Datenbank merken (pro Ausführungsziel), sodass du nicht erneut gefragt wirst, auch nach einem Neustart. config.toml wird nicht geändert.</td></tr>
<tr><td><strong>Allow until restart</strong></td><td>Wird statt <strong>Always allow</strong> für kritische Befehle angezeigt, oder für alles, wenn <code>terminal.permission_mode = "cautious"</code> gilt. Die Erlaubnis gilt, bis der Daemon neu startet.</td></tr>
<tr><td><strong>Deny</strong></td><td>Ablehnen &mdash; dem Agenten wird gesagt, dass es abgelehnt wurde</td></tr>
</tbody>
</table>
<p>Manche Aktionen bieten nur <strong>Allow</strong> und <strong>Deny</strong> an. Karten decken außerdem mehr als Terminal-Befehle ab, etwa Browser-Aktionen und die Bestätigung neu geplanter Arbeit (<strong>Approve &amp; activate</strong> / <strong>Cancel</strong>).</p>

${callout('info', 'Ablauf', 'Eine unbeantwortete Karte läuft nach 5 Minuten ab, mit einer Erinnerung kurz davor, und zählt als <strong>Deny</strong>.')}

<h2>Was immer nachfragt</h2>
<ul>
  <li>Befehle aus nicht vertrauenswürdigen Triggern, etwa <a href="/triggers">E-Mail</a></li>
  <li>Befehle, die Fähigkeiten über die Aufgabe hinaus verlangen</li>
  <li>Befehle, die geschützte Zugangsdaten-Pfade berühren, auch wenn sie zuvor erlaubt waren</li>
  <li>Neue Befehle, die im Hintergrund weiterlaufen würden (detached)</li>
</ul>

${callout('warn', 'Verkettete Befehle', 'Ein verketteter Befehl (<code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code>) gilt nur dann als erlaubt, wenn das Programm jedes Teils auf deiner dauerhaften Erlaubnisliste steht. Eine Erlaubnis, die du für eine Sitzung gegeben hast, schaltet nie eine Kette frei. Befehlssubstitution (<code>$()</code>, Backticks) wird nie von einer Erlaubnis abgedeckt.')}

${callout('danger', 'Nicht vertrauenswürdige Quellen', 'Von Triggern (wie E-Mail) gestartete Sitzungen sind nicht vertrauenswürdig. Jeder Terminal-Befehl darin erfordert eine Genehmigung, was auch immer du zuvor erlaubt hast.')}
`
  },
{
    slug: '/discord',
    section: 'Discord',
    title: 'Bot-Einrichtung',
    description: 'AIDaemon mit Discord verbinden. Eine Discord-Anwendung erstellen, Message Content aktivieren und festlegen, wer sie nutzen darf.',
    content: () => `
<h1>Discord-Bot-Einrichtung</h1>
<p class="lead">Verbinde AIDaemon über eine direkte Verbindung zum Discord Gateway und zur REST API mit Discord.</p>

${callout('success', 'Vorkompilierte Binärdateien', 'Hast du über das Einzeiler-Skript oder Homebrew installiert, ist Discord-Unterstützung bereits enthalten. Konfiguriere einfach unten <code>config.toml</code>. Das Feature-Flag wird nur beim <a href="/getting-started/build">Bauen aus dem Quellcode</a> gebraucht.')}

<h2>Eine Discord-Anwendung erstellen</h2>
<ol>
  <li>Gehe zum <a href="https://discord.com/developers/applications" target="_blank" rel="noopener">Discord Developer Portal</a></li>
  <li>Klicke auf <strong>New Application</strong> und gib ihr einen Namen (z. B. &bdquo;AIDaemon&ldquo;)</li>
  <li>Klicke unter <strong>Bot</strong> auf <strong>Add Bot</strong></li>
  <li>Kopiere das <strong>Bot Token</strong> &mdash; das ist dein <code>bot_token</code></li>
  <li>Aktiviere den <strong>Message Content Intent</strong> unter <strong>Privileged Gateway Intents</strong> &mdash; der Bot braucht ihn, um den Nachrichtentext zu lesen. Kein anderer privilegierter Intent ist nötig.</li>
  <li>Wähle unter <strong>OAuth2 &rarr; URL Generator</strong> die Scopes <code>bot</code> und <code>applications.commands</code> und dann die Berechtigungen: View Channels, Send Messages, Read Message History, Attach Files, Use Slash Commands</li>
  <li>Nutze die erzeugte URL, um den Bot auf deinen Server einzuladen</li>
</ol>

<h2>Konfiguration</h2>
${codeBlock(`[discord]
bot_token = "keychain"   # or the token itself
allowed_user_ids = [123456789012345678]
guild_id = 987654321098765432

[users]
owner_ids = { discord = ["123456789012345678"] }`, 'toml', 'config.toml')}

${configTable([
  ['bot_token', 'string', '&mdash;', 'Discord-Bot-Token aus dem Developer Portal. Unterstützt <code>"keychain"</code>.'],
  ['allowed_user_ids', 'array', '[]', 'Discord-Benutzer-IDs (Ganzzahlen), die dem Bot eine DM schreiben dürfen. Ist die Liste leer und sind keine Owner gesetzt, übernimmt ihn die erste Person, die ihm eine DM schreibt.'],
  ['guild_id', 'integer', 'null', 'Optionale Server-ID. Slash-Befehle werden auf diesem Server registriert, wo sie sofort erscheinen, statt global, was bis zu einer Stunde dauern kann. Sie begrenzt nicht, wo der Bot antwortet.'],
])}

<p>Owner werden unter <code>[users] owner_ids</code> festgelegt; sind keine gesetzt, bilden die Benutzer der Allowlist die Owner. Für mehr als einen Discord-Bot verwende <code>[[discord_bots]]</code>-Einträge mit denselben Schlüsseln.</p>

<h2>Deine Discord-Benutzer-ID herausfinden</h2>
<p>Aktiviere den <strong>Developer Mode</strong> in den Discord-Einstellungen (Appearance &rarr; Advanced), klicke dann mit der rechten Maustaste auf deinen Benutzernamen und wähle <strong>Copy User ID</strong>.</p>

<h2>Funktionen</h2>
<ul>
  <li><strong>Gateway-Verbindung</strong> &mdash; eine direkte Verbindung zum Discord Gateway (v10) und zur REST API</li>
  <li><strong>Slash-Befehle</strong> &mdash; registrierte Anwendungsbefehle (siehe <a href="/discord/commands">Befehle</a>)</li>
  <li><strong>Interaktive Schaltflächen</strong> &mdash; Genehmigungsablauf mit anklickbaren Schaltflächen (siehe <a href="/discord/approval">Genehmigungsablauf</a>)</li>
  <li><strong>Dateiübertragung</strong> &mdash; Dateien als Discord-Anhänge senden und empfangen (vom Bot gesendete Dateien sind auf 10 MB begrenzt)</li>
  <li><strong>Nachrichtenaufteilung</strong> &mdash; lange Antworten werden aufgeteilt, um das Limit von 2000 Zeichen pro Discord-Nachricht einzuhalten</li>
  <li><strong>Automatische Wiederverbindung</strong> &mdash; exponentieller Backoff bei Verbindungsfehlern (5 s &rarr; maximal 60 s)</li>
  <li><strong>Benutzer-Allowlist</strong> &mdash; Zugriffskontrolle pro Bot-Token</li>
  <li><strong>Multi-Bot-Unterstützung</strong> &mdash; betreibe mehrere Discord-Bots mit getrennten Konfigurationen (<code>[[discord_bots]]</code>)</li>
</ul>

<h2>Sitzungsmodell</h2>
<p>Discord-Sitzungen werden dadurch identifiziert, wo die Unterhaltung stattfindet:</p>
<ul>
  <li><strong>Server-Channel:</strong> <code>discord:ch:{channel_id}</code></li>
  <li><strong>Direktnachricht:</strong> <code>discord:dm:{user_id}</code></li>
</ul>
<p>Sitzungs-IDs tragen den Namen des Bots als Präfix, sodass mehrere Bots nie eine Sitzung teilen. Jede Sitzung führt ihren eigenen Gesprächsverlauf, Arbeitsspeicher und Faktenkontext.</p>

${callout('warn', 'Zugriffskontrolle', 'Servermitglieder, die nicht auf der Liste stehen, können als Gäste mit dem Bot sprechen, aber nur, wenn sie ihn erwähnen oder ihm antworten. Ihre Dateien werden nicht gespeichert, und sie können keine Genehmigungen beantworten oder Owner-Befehle ausführen. DMs brauchen die Allowlist. Setze im Produktivbetrieb immer <code>allowed_user_ids</code>.')}
`
  },
  {
    slug: '/discord/commands',
    section: 'Discord',
    title: 'Slash-Befehle',
    description: 'Discord-Befehle für AIDaemon: /model, /clear, /tasks, /cancel, /cost, /status und mehr.',
    content: () => `
<h1>Discord-Slash-Befehle</h1>
<p class="lead">In Discord verfügbare Befehle. Die am häufigsten genutzten sind als Anwendungsbefehle registriert, sodass sie erscheinen, wenn du <code>/</code> tippst; die übrigen funktionieren, wenn du sie als Nachricht sendest.</p>

<p><code>/help</code> (oder <code>/start</code>) zeigt die alltäglichen Befehle; <code>/help all</code> listet jeden Befehl auf.</p>

${callout('info', 'Im Slash-Menü', 'Das Menü listet <code>/model</code>, <code>/models</code>, <code>/auto</code>, <code>/reload</code>, <code>/tasks</code>, <code>/cancel</code>, <code>/clear</code>, <code>/wipe</code>, <code>/cost</code>, <code>/context</code> und <code>/help</code>. Jeder nimmt einen optionalen Text <code>args</code> entgegen, zum Beispiel <code>/model args:claude-sonnet-5-5</code>. Jeder andere Befehl unten funktioniert, wenn du ihn als normale Nachricht eingibst, etwa <code>/status</code> oder <code>/mode readonly</code>.')}

<h2>Unterhaltung</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>/clear</code> (oder <code>/new</code>)</td><td>Eine frische Unterhaltung beginnen. Dein Verlauf bleibt erhalten (mit <code>/wipe</code> löschst du ihn), und in diesem Chat laufende Arbeit wird gestoppt.</td></tr>
<tr><td><code>/wipe</code></td><td>Diese Unterhaltung dauerhaft löschen. Das erste <code>/wipe</code> erklärt nur; sende es innerhalb weniger Minuten erneut, um sie zu löschen. Bereits im Speicher abgelegte Fakten bleiben erhalten.</td></tr>
<tr><td><code>/context</code></td><td>Zeigen, wie viel von der Unterhaltung der Agent sehen kann</td></tr>
<tr><td><code>/project [name|none]</code></td><td>Das Projekt anzeigen oder ändern, in dem dieser Chat arbeitet</td></tr>
<tr><td><code>/memory</code></td><td>Den Speicher des Projekts anzeigen, in dem dieser Chat arbeitet</td></tr>
</tbody>
</table>

<h2>Arbeit</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>/tasks</code></td><td>Auflisten, was in diesem Chat läuft, nummeriert</td></tr>
<tr><td><code>/cancel</code>, <code>/cancel all</code>, <code>/cancel &lt;number&gt;</code></td><td>Stoppen, was in diesem Chat läuft: alles aus einer Anfrage, alles oder einen einzelnen Eintrag (die Nummern stammen aus <code>/tasks</code>)</td></tr>
<tr><td><code>/status</code></td><td>Modus dieses Chats, was läuft und der nächste geplante Eintrag</td></tr>
<tr><td><code>/work [ready|running|blocked|show|comment|unblock|retry]</code></td><td>Längere Arbeit ansehen und verwalten, die wartet oder von selbst läuft</td></tr>
<tr><td><code>/cost</code></td><td>Token-Nutzung anzeigen (letzte 24 Std., letzte 7 Tage, Top-Modelle)</td></tr>
</tbody>
</table>

<h2>Modelle</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Das aktuelle Modell anzeigen</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Ein Modell für jeden Chat verwenden (schaltet die automatische Modellwahl aus)</td></tr>
<tr><td><code>/models</code></td><td>Die Modelle auflisten, die dein Anbieter anbietet (das aktive ist markiert)</td></tr>
<tr><td><code>/auto</code></td><td>Zur automatischen Modellwahl zurückkehren</td></tr>
</tbody>
</table>

<h2>Zugriff und Datenschutz</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>/mode [full|unrestricted|readonly]</code></td><td>Den Zugriffsmodus dieses Chats anzeigen oder ändern</td></tr>
<tr><td><code>/readonly</code></td><td>Diesen Chat für 4 Stunden schreibgeschützt machen</td></tr>
<tr><td><code>/private [off]</code></td><td>Dir deine nächste Nachricht nicht merken und nicht daraus lernen (<code>off</code> bricht es ab)</td></tr>
<tr><td><code>/trustall on|off</code></td><td>Jeden Terminal-Befehl ohne Nachfrage ausführen</td></tr>
</tbody>
</table>

<h2>Dateien</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>/checkpoints</code></td><td>Dateisystem-Checkpoints auflisten</td></tr>
<tr><td><code>/rollback [checkpoint-id|confirm TOKEN]</code></td><td>Einen Checkpoint-Rollback in der Vorschau zeigen und dann bestätigen</td></tr>
</tbody>
</table>

<h2>Geräte</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>/pair_device</code></td><td>Ein Handy oder einen Browser mit der App koppeln</td></tr>
<tr><td><code>/devices</code></td><td>Gekoppelte Geräte auflisten</td></tr>
<tr><td><code>/revoke_device &lt;id&gt;</code></td><td>Die Kopplung eines Geräts aufheben</td></tr>
<tr><td><code>/exposure</code></td><td>Die Tunnel anzeigen, die die Gateways veröffentlichen</td></tr>
</tbody>
</table>

<h2>Bot-Verwaltung</h2>
<table class="config-table">
<thead><tr><th>Befehl</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>/reload</code></td><td>config.toml neu einlesen und Anbieter- und Modelländerungen anwenden</td></tr>
</tbody>
</table>

${callout('info', 'Wer Befehle nutzen darf', 'Die meisten Befehle sind nur für Owner. Gäste können <code>/tasks</code>, <code>/private</code>, <code>/context</code>, <code>/readonly</code>, <code>/mode</code> und <code>/cancel</code> nutzen; die letzten vier sagen selbst, ob der Gast handeln darf.')}

<h2>Normale Nachrichten</h2>
<p>Neben Befehlen kannst du mit dem Bot in einer Direktnachricht sprechen oder in einem Server-Channel, indem du ihn erwähnst oder ihm antwortest. Diese werden als normale Unterhaltungsnachrichten behandelt.</p>

${callout('info', 'Registrierung der Befehle', 'Befehle werden bei jeder Verbindung des Bots registriert: auf dem Server, der in <code>guild_id</code> genannt ist, wo sie sofort erscheinen, oder global, was bis zu einer Stunde dauern kann, bis sie erscheinen.')}
`
  },
  {
    slug: '/discord/approval',
    section: 'Discord',
    title: 'Genehmigungsablauf',
    description: 'Interaktive Nachrichtenschaltflächen zum Genehmigen von Befehlen und Aktionen in Discord.',
    content: () => `
<h1>Discord-Genehmigungsablauf</h1>
<p class="lead">Interaktive Nachrichtenschaltflächen zum Genehmigen von Befehlen und Aktionen in Discord.</p>

<h2>So funktioniert es</h2>
<ol>
  <li>Der Agent will einen Terminal-Befehl ausführen (oder eine andere Aktion vornehmen), der deine Genehmigung braucht. Ein Befehl läuft ohne Nachfrage, wenn du ihn bereits erlaubt hast oder wenn er auf der Safe-Liste steht und eingegrenzt laufen kann. Andernfalls entscheidet eine schnelle Risikoprüfung, ob er gefährlich genug ist, dich zu fragen.</li>
  <li>Die Genehmigungskarte wird in dem Discord-Channel gepostet, in dem die Arbeit läuft, mit Discord-Nachrichtenschaltflächen. Nur ein Owner kann sie drücken.</li>
  <li>Die Karte zeigt den Befehl, sein Risiko und etwaige Warnungen, mit diesen Schaltflächen:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Genehmigung erforderlich:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Always allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Genehmigungsoptionen</h2>
<table class="config-table">
<thead><tr><th>Option</th><th>Verhalten</th></tr></thead>
<tbody>
<tr><td><strong>Allow</strong></td><td>Nur dieses Mal ausführen</td></tr>
<tr><td><strong>Always allow</strong></td><td>Ausführen und das Programm in der Datenbank merken (pro Ausführungsziel), sodass du nicht erneut gefragt wirst, auch nach einem Neustart. config.toml wird nicht geändert.</td></tr>
<tr><td><strong>Allow until restart</strong></td><td>Wird statt <strong>Always allow</strong> für kritische Befehle angezeigt, oder für alles, wenn <code>terminal.permission_mode = "cautious"</code> gilt. Die Erlaubnis gilt, bis der Daemon neu startet.</td></tr>
<tr><td><strong>Deny</strong></td><td>Ablehnen &mdash; dem Agenten wird gesagt, dass es abgelehnt wurde</td></tr>
</tbody>
</table>
<p>Manche Aktionen bieten nur <strong>Allow</strong> und <strong>Deny</strong> an. Karten decken außerdem mehr als Terminal-Befehle ab, etwa Browser-Aktionen und die Bestätigung neu geplanter Arbeit (<strong>Approve &amp; activate</strong> / <strong>Cancel</strong>).</p>

${callout('info', 'Ablauf', 'Eine unbeantwortete Karte läuft nach 5 Minuten ab, mit einer Erinnerung kurz davor, und zählt als <strong>Deny</strong>.')}

<h2>Was immer nachfragt</h2>
<ul>
  <li>Befehle aus nicht vertrauenswürdigen Triggern, etwa <a href="/triggers">E-Mail</a></li>
  <li>Befehle, die Fähigkeiten über die Aufgabe hinaus verlangen</li>
  <li>Befehle, die geschützte Zugangsdaten-Pfade berühren, auch wenn sie zuvor erlaubt waren</li>
  <li>Neue Befehle, die im Hintergrund weiterlaufen würden (detached)</li>
</ul>

${callout('warn', 'Verkettete Befehle', 'Ein verketteter Befehl (<code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code>) gilt nur dann als erlaubt, wenn das Programm jedes Teils auf deiner dauerhaften Erlaubnisliste steht. Eine Erlaubnis, die du für eine Sitzung gegeben hast, schaltet nie eine Kette frei. Befehlssubstitution (<code>$()</code>, Backticks) wird nie von einer Erlaubnis abgedeckt.')}

${callout('danger', 'Nicht vertrauenswürdige Quellen', 'Von Triggern (wie E-Mail) gestartete Sitzungen sind nicht vertrauenswürdig. Jeder Terminal-Befehl darin erfordert eine Genehmigung, was auch immer du zuvor erlaubt hast.')}
`
  },
    {
    slug: '/tools',
    section: 'Tools',
    title: 'Tools-Überblick',
    description: 'Überblick über die eingebauten Tools, die der AIDaemon-Agent aufrufen kann: Terminal, Dateien, Speicher, Browser, Websuche, Sub-Agenten, MCP und mehr.',
    content: () => `
<h1>Tools</h1>
<p class="lead">AIDaemon stellt eine Reihe eingebauter Tools bereit, die das Modell von sich aus aufrufen kann, während es an einer Anfrage arbeitet.</p>

<h2>Das Tool-Trait</h2>
<p>Alle Tools implementieren dieselbe Schnittstelle:</p>
${codeBlock(`trait Tool {
    fn name(&self) -> &str;
    fn description(&self) -> &str;
    fn schema(&self) -> Value;   // full function object: name, description, parameters
    async fn execute(&self, arguments: &str, facts: &ToolCallContext) -> Result<ToolCallOutcome>;
    fn call_effects(&self, arguments: &str) -> CallEffects; // what a call does, judged by the approval hooks
}`, 'rust')}
<p>Ein Tool fragt nie selbst den Owner. Es deklariert, was jeder Aufruf bewirkt (seine Effekte), und die Genehmigungs-Hooks des Agent-Kernels entscheiden, ob es ausgeführt wird, ob du gefragt wirst oder ob es abgelehnt wird.</p>

<h2>Eingebaute Tools</h2>
<table class="config-table">
<thead><tr><th>Tool</th><th>Beschreibung</th><th>Konfiguration</th></tr></thead>
<tbody>
<tr><td><a href="/tools/terminal"><code>terminal</code></a></td><td>Shell-Befehle mit Genehmigungsablauf ausführen (siehe <a href="/tools/command-risk">Befehlsrisiko</a>)</td><td>[terminal]</td></tr>
<tr><td><a href="/tools/system-info"><code>system_info</code></a></td><td>Hostname, Betriebssystem, Uptime und Speicher abfragen</td><td>Immer aktiviert</td></tr>
<tr><td><code>read_file</code>, <code>write_file</code>, <code>edit_file</code>, <code>search_files</code></td><td>Dateien im Workspace lesen, schreiben, bearbeiten und durchsuchen</td><td>Immer aktiviert</td></tr>
<tr><td><code>check_environment</code></td><td>Prüfen, welche Programme und Tools installiert sind</td><td>Immer aktiviert</td></tr>
<tr><td><a href="/tools/memory"><code>remember_fact</code></a></td><td>Fakten über dich speichern oder vergessen (durchsuche sie mit <code>manage_memories</code>)</td><td>Immer aktiviert</td></tr>
<tr><td><a href="/tools/memory"><code>manage_memories</code></a></td><td>Gespeicherte Fakten durchsuchen, auflisten und vergessen, vergangene Chats durchsuchen, persönliche Ziele verfolgen</td><td>Immer aktiviert</td></tr>
<tr><td><code>search_history</code></td><td>Die genauen Nachrichten vergangener Unterhaltungen durchsuchen</td><td>Immer aktiviert</td></tr>
<tr><td><a href="/tools/config-manager"><code>manage_config</code></a></td><td>config.toml lesen und ändern, Anbieter wechseln, Failover verwalten (Secrets verborgen)</td><td>Immer aktiviert</td></tr>
<tr><td><a href="/tools/web-search"><code>web_search</code></a></td><td>Das Web durchsuchen (DuckDuckGo, Brave oder SearxNG, zusammengeführt)</td><td>[search]</td></tr>
<tr><td><a href="/tools/web-fetch"><code>web_fetch</code></a></td><td>Lesbare Inhalte von URLs abrufen und extrahieren</td><td>Immer aktiviert</td></tr>
<tr><td><code>http_request</code></td><td>REST-/JSON-APIs aufrufen, mit gespeicherten Authentifizierungsprofilen</td><td>Immer aktiviert</td></tr>
<tr><td><code>manage_auth</code>, <code>manage_api</code></td><td>Dienste verbinden (API-Schlüssel, OAuth) und ihre APIs kennenlernen</td><td>Immer aktiviert</td></tr>
<tr><td><code>set_reminder</code></td><td>Eine Erinnerung setzen</td><td>Immer aktiviert</td></tr>
<tr><td><a href="/scheduler"><code>schedule_task</code></a></td><td>Eine geplante Aufgabe erstellen</td><td>Immer aktiviert</td></tr>
<tr><td><a href="/scheduler"><code>manage_automations</code></a></td><td>Geplante Aufgaben und Erinnerungen auflisten, ändern und ausführen</td><td>Immer aktiviert</td></tr>
<tr><td><code>manage_mandates</code></td><td>Dauerhafte Ziele, an denen der Agent über längere Zeit arbeitet</td><td>Immer aktiviert</td></tr>
<tr><td><code>track_requirements</code></td><td>Eine Checkliste dessen führen, was eine Anfrage verlangt hat</td><td>Immer aktiviert</td></tr>
<tr><td><a href="/tools/browser"><code>browser</code></a></td><td>Chrome-Automatisierung mit persistenten Anmeldesitzungen</td><td>[browser] enabled=true</td></tr>
<tr><td><code>hand_over</code></td><td>Den Browser an dich übergeben (zum Beispiel zum Anmelden)</td><td>[browser] + [surfaces]</td></tr>
<tr><td><code>computer_use</code></td><td>Den Desktop dieses Computers anhand von Screenshots steuern</td><td>[computer_use]</td></tr>
<tr><td><a href="/tools/send-file"><code>send_file</code></a></td><td>Eine Datei im aktuellen Chat an den Benutzer senden (Telegram, Slack, Discord oder die App)</td><td>[files] (standardmäßig an)</td></tr>
<tr><td><code>generate_image</code></td><td>Ein Bild erzeugen</td><td>[files]</td></tr>
<tr><td><a href="/tools/sub-agents"><code>spawn_agent</code></a></td><td>Arbeit an Sub-Agenten und Spezialisten delegieren</td><td>[subagents] (standardmäßig an)</td></tr>
<tr><td><a href="/tools/cli-agents"><code>cli_agent</code></a></td><td>An installierte Coding-Agenten delegieren (auch <code>manage_cli_agents</code>)</td><td>[cli_agents] enabled = true</td></tr>
<tr><td><a href="/health-monitoring"><code>health_probe</code></a></td><td>Health-Probes verwalten und ausführen</td><td>[health]</td></tr>
<tr><td><a href="/skills"><code>use_skill</code>, <code>skill_resources</code>, <code>manage_skills</code></a></td><td>Skills verwenden, durchsuchen und installieren</td><td>[skills]</td></tr>
<tr><td><a href="/tools/people"><code>manage_people</code></a></td><td>Persönliches Kontaktbuch mit Geburtstagen, Vorlieben und Beziehungen</td><td>Immer registriert</td></tr>
<tr><td><a href="/mcp"><code>manage_mcp</code></a></td><td>MCP-Server zur Laufzeit hinzufügen, entfernen und neu starten</td><td>Immer aktiviert</td></tr>
<tr><td><a href="/mcp">MCP-Tools</a></td><td>Dynamisch über MCP-Server entdeckt</td><td>[mcp.*]</td></tr>
</tbody>
</table>

<p>Fünfzehn Kern-Tools werden bei jedem Aufruf angeboten (Terminal, Speicher, Erinnerungen und Planung, Verlaufssuche, Web, Dateien, <code>spawn_agent</code>, <code>track_requirements</code>). Die übrigen werden angeboten, wenn eine Anfrage sie braucht. Die Arbeit wird durch Fortschritts- und Token-Budgets begrenzt, nicht durch eine feste Anzahl an Schritten.</p>

<h2>Welche Tools registriert sind</h2>
<p>Tools werden beim Start in drei Gruppen registriert:</p>
<ul>
  <li><strong>Immer registriert</strong> (sofern nicht in <code>[tools] disabled</code> aufgeführt): system_info, terminal, remember_fact, manage_memories, set_reminder, schedule_task, manage_mandates, manage_automations, search_history, manage_config, web_fetch, web_search, read_file, write_file, edit_file, search_files, check_environment, manage_mcp, manage_people, http_request, manage_auth, manage_api.</li>
  <li><strong>Registriert, wenn aktiviert</strong>: spawn_agent ([subagents]); browser und hand_over mit [surfaces] ([browser]); computer_use ([computer_use]); send_file und generate_image ([files]); cli_agent und manage_cli_agents ([cli_agents]); health_probe ([health]); use_skill, skill_resources und manage_skills ([skills]); self_diagnose, goal_trace und policy_metrics ([diagnostics]); Node-Tools ([nodes]); client_view und request_feature ([client_gateway]); read_channel_history (Slack, Opt-in).</li>
  <li><strong>MCP-Tools</strong> von konfigurierten Servern.</li>
</ul>
${codeBlock(`[tools]
disabled = ["generate_image"]   # leave a built-in tool out at startup (needs /restart)`, 'toml', 'config.toml')}
`
  },
  {
    slug: '/tools/terminal',
    section: 'Tools',
    title: 'Terminal-Tool',
    description: 'Shell-Befehle auf dem Host, in einem Docker-Container oder auf einem SSH-Host über AIDaemon ausführen, mit Owner-Genehmigungen für alles Riskante.',
    content: () => `
<h1>Terminal-Tool</h1>
<p class="lead">Shell-Befehle ausführen. Befehle laufen mit <code>sh -c</code> (unter Windows PowerShell) im konfigurierten Workspace: auf diesem Computer, in einem Docker-Container oder auf einem SSH-Host.</p>

<h2>Parameter</h2>
${configTable([
  ['action', 'string', '—', 'Eines von: run, check, kill (erforderlich)'],
  ['command', 'string', '—', 'Der auszuführende Shell-Befehl (für action="run")'],
  ['script', 'string', '—', 'Ein mehrstufiges Shell-Skript, ausgeführt mit /bin/sh -eu, sodass ein fehlgeschlagener Schritt den Rest stoppt. Anstelle von command verwenden.'],
  ['working_dir', 'string', '—', 'Verzeichnis, in dem der Befehl läuft'],
  ['background', 'bool', 'false', 'Endliche Arbeit im Hintergrund ausführen; das Ergebnis wird dir gesendet, wenn sie fertig ist'],
  ['detach', 'bool', 'false', 'Einen langlebigen Prozess (Server, Watcher) starten, der bis zum Beenden weiterläuft'],
  ['network', 'bool', 'false', 'Netzwerk für einen eingegrenzten (Sandbox-)Lauf erlauben; fragt zuerst, sofern nicht bereits gewährt'],
  ['read_paths / read_roots / write_paths / write_roots', 'array', '—', 'Zusätzliche Pfade, die ein eingegrenzter Lauf lesen oder schreiben darf; Pfade außerhalb des Aufgabenbereichs fragen zuerst'],
  ['description', 'string', '—', 'Ein paar Worte, die dir angezeigt werden, während er läuft'],
  ['pid', 'integer', '—', 'Prozess-ID, erforderlich für check/kill'],
])}
<p>Der Trust-All-Modus ist der Befehl <code>/trustall</code> des Owners, nie eine Tool-Aktion.</p>

<h2>Genehmigungslogik</h2>
<p>Ein Befehl läuft ohne Nachfrage, wenn eine dieser Bedingungen zutrifft:</p>
<ol>
  <li>Sein Programm steht in <code>terminal.allowed_prefixes</code> oder wurde früher erlaubt. Bei einer Kette (<code>&amp;&amp;</code>, <code>||</code>, <code>;</code>, <code>|</code>) muss das Programm jedes Segments erlaubt sein.</li>
  <li>Er ist ein Build-, Lint- oder schreibgeschützter Git-Befehl auf der Liste eingegrenzter Befehle; er läuft dann in der Sandbox.</li>
  <li>Die Sicherheitsprüfung des Modells für den vollständigen Befehl findet nichts, das dich braucht.</li>
</ol>
<p>Ein erlaubtes Programm deckt keinen Befehl ab, der per Umleitung eine Datei schreibt, mit einer Variablenzuweisung beginnt oder ein anderes Programm startet (<code>env sh -c</code>, <code>xargs</code>, <code>find -exec</code>). Ein Befehl, der einen Zugangsdaten-Pfad berührt, fragt immer. Ist die Sicherheitsprüfung nicht verfügbar, fragt der Befehl (fail closed). Siehe <a href="/tools/command-risk">Befehlsrisikobewertung</a>.</p>

<h3>Standardmäßig erlaubte Präfixe</h3>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

<h2>Ausgabe</h2>
<p>Gibt zuerst stdout zurück, dann stderr (falls vorhanden). Die Ausgabe wird auf <code>terminal.max_output_chars</code> gekürzt (Standard 4000 Zeichen).</p>

<h2>Hintergrundbefehle</h2>
<p>Überschreitet ein Befehl das anfängliche Timeout, wechselt er in den Hintergrund und gibt eine PID zurück.</p>
<ul>
  <li><code>action="check"</code> + <code>pid</code> zeigt die Teil-/Endausgabe</li>
  <li><code>action="kill"</code> + <code>pid</code> stoppt einen laufenden Hintergrundbefehl</li>
  <li>Die zuletzt abgeschlossene Ausgabe wird kurz aufbewahrt, sodass Folgeprüfungen weiter funktionieren</li>
  <li>Daemonisierende Befehle (<code>nohup</code>, <code>setsid</code>, <code>&amp; disown</code>&hellip;) brauchen <code>detach=true</code> und die Genehmigung eines Owners</li>
</ul>

<h2>Harte Sperren</h2>
<p>Manche Befehle werden vor jeder Genehmigung abgelehnt und können nicht erlaubt werden: rekursives <code>rm</code>/<code>chmod</code>/<code>chown</code> auf Root-, Home- oder Systemverzeichnisse, <code>mkfs</code>, <code>dd</code>/<code>shred</code>/<code>wipefs</code> auf ein Rohgerät sowie rekursives Löschen (<code>rm -r</code>, <code>find -delete</code>) von allem außerhalb des Workspace.</p>

<h2>Konfiguration</h2>
${codeBlock(`[terminal]
allowed_prefixes = ["ls", "cat", "head", "tail", "echo", "date"]
initial_timeout_secs = 30
max_output_chars = 4000
permission_mode = "default"
confinement = "host"   # or "sandbox"`, 'toml', 'config.toml')}
<p><code>confinement = "host"</code> (Standard) führt Befehle auf dieser Maschine mit deiner Umgebung und deinen Zugangsdaten aus. <code>"sandbox"</code> führt jeden Befehl in der Sandbox des Betriebssystems aus (seatbelt unter macOS, bubblewrap oder die Codex-Sandbox unter Linux), ohne Netzwerk und nur mit den Dateien der Aufgabe, sofern nichts gewährt wird.</p>

<h2>Immer erlauben (persistent)</h2>
<p>Genehmigungskarten bieten Allow Once, Allow Session (bis zum Neustart) oder Allow Always sowie Deny an, in jedem Channel oder in der App. Der Cautious-Modus und kritische Befehle im Standardmodus bieten Allow Session statt Allow Always an. Wenn du "Allow Always" wählst:</p>
<ol>
  <li>Das Programm des Befehls (sein erstes Wort oder das Programm jedes Segments bei einer Kette) wird zum erlaubten Präfix</li>
  <li>Das Präfix wird der Erlaubnisliste im Speicher hinzugefügt</li>
  <li>Das Präfix wird in der Datenbank für den aktuellen Workspace gespeichert (<code>terminal_backend_allowed_prefixes</code>), sodass jedes Ausführungsziel seine eigenen Genehmigungen behält</li>
  <li>Beim Neustart werden die persistierten Präfixe mit den Präfixen aus der Konfiguration zusammengeführt</li>
</ol>
<p>Das heißt, "Allow Always"-Genehmigungen überstehen Daemon-Neustarts, ohne config.toml zu ändern.</p>

${callout('danger', 'Nicht vertrauenswürdige Sitzungen', 'Sitzungen aus Triggern (E-Mail usw.) werden als nicht vertrauenswürdig markiert. <strong>Alle</strong> Befehle in nicht vertrauenswürdigen Sitzungen erfordern eine Genehmigung, unabhängig von der Whitelist.')}
`
  },
{
    slug: '/tools/command-risk',
    section: 'Tools',
    title: 'Befehlsrisikobewertung',
    description: 'Wie AIDaemon entscheidet, wann ein Terminal-Befehl deine Genehmigung braucht, und wie riskant die Karte ihn einstuft.',
    content: () => `
<h1>Befehlsrisikobewertung</h1>
<p class="lead">Ein Befehl, den du nicht bereits erlaubt hast, wird vom Modell geprüft, das einstuft, was der gesamte Befehl tatsächlich tut (Lesen, lokale Änderungen, Netzwerk, Deployments, Löschen, Secrets&hellip;). Befehle, die dich brauchen, bekommen eine Genehmigungskarte mit der Einstufung Safe, Medium, High oder Critical.</p>

<h2>Risikostufen</h2>
<table class="config-table">
<thead><tr><th>Stufe</th><th>Die Karte zeigt</th></tr></thead>
<tbody>
<tr><td><strong>Safe</strong></td><td>New command</td></tr>
<tr><td><strong>Medium</strong></td><td>Approval needed</td></tr>
<tr><td><strong>High</strong></td><td>Review carefully</td></tr>
<tr><td><strong>Critical</strong></td><td>Dangerous action. Auch für daemonisierende Befehle und immer dann verwendet, wenn die Sicherheitsprüfung nicht verfügbar ist.</td></tr>
</tbody>
</table>
<p>Die Stufe stammt aus der Sicherheitsprüfung, nicht aus einer festen Liste. Deployments, Pushes, Sendevorgänge, Löschungen, Systemänderungen, Rechteausweitung, das Ausführen heruntergeladenen Codes und alles, was sie nicht bestimmen kann, brauchen eine Genehmigung. Builds, Tests und Änderungen innerhalb des Workspace sowie lesender Netzwerkzugriff nicht.</p>

<h2>Berechtigungsmodi</h2>
${configTable([
  ['default', '—', '—', 'Karten bieten Allow Always an, außer kritische, die Allow Session (bis zum Neustart) anbieten.'],
  ['cautious', '—', '—', 'Alle Genehmigungen gelten nur pro Sitzung.'],
  ['yolo', '—', '—', 'Jeder Befehl läuft ohne Nachfrage (Zugangsdaten-Pfade und nicht vertrauenswürdige Sitzungen fragen weiterhin), und jede Genehmigung bleibt bestehen, auch kritische.'],
])}

<h2>Was ein erlaubtes Programm nicht abdeckt</h2>
<p>Ein Programm zu erlauben deckt das Ausführen dieses Programms ab, nicht mehr. Eine Kette braucht das Programm jedes Segments erlaubt. Eine Umleitung in eine Datei, eine vorangestellte Variablenzuweisung oder das Starten eines anderen Programms darüber (<code>env</code>, <code>xargs</code>, <code>find -exec</code>/<code>-delete</code>, <code>sh -c</code>) wird wie jeder neue Befehl beurteilt.</p>

<h2>Erkennung sensibler Pfade</h2>
<p>Befehle, die diese Pfade referenzieren, fragen immer, auch wenn das Programm erlaubt ist:</p>
<ul>
  <li><code>.ssh</code>, <code>.env</code> (nicht <code>.env.example</code>), SSH-Schlüssel <code>id_rsa</code>, <code>id_ed25519</code>, <code>id_dsa</code>, <code>id_ecdsa</code></li>
  <li>System-Authentifizierung: <code>shadow</code>, <code>sudoers</code></li>
  <li>Zugangsdaten: <code>credentials</code> (z. B. <code>.aws/credentials</code>), <code>secrets</code>, <code>master.key</code>, <code>.netrc</code>, <code>.pgpass</code>, <code>.npmrc</code>, <code>.pypirc</code></li>
</ul>

<h2>Harte Sperren</h2>
<p>Manche Befehle werden vor jeder Genehmigung abgelehnt und können nicht erlaubt werden: rekursives <code>rm</code>/<code>chmod</code>/<code>chown</code> auf Root-, Home- oder Systemverzeichnisse, <code>mkfs</code>, <code>dd</code>/<code>shred</code>/<code>wipefs</code> auf ein Rohgerät sowie rekursives Löschen (<code>rm -r</code>, <code>find -delete</code>) von allem außerhalb des Workspace.</p>

<h2>Genehmigungen sind Kernel-Hooks</h2>
<p>Das Terminal fragt nie von sich aus. Jeder Aufruf deklariert seine Effekte; die Genehmigungsrichtlinie des Agent-Kernels (harte Sperren, dann die Regeln des Terminals, dann deine Freigaben) entscheidet, ob er ausgeführt wird, ob du gefragt wirst oder ob er abgelehnt wird. Eine Ablehnung blockiert auch andere Aufrufe im selben Lauf, die dasselbe tun würden.</p>

${callout('info', 'Konfiguration', 'Setze <code>terminal.permission_mode</code> in config.toml. Der Standard ist <code>"default"</code>.')}
`
},
    {
    slug: '/tools/system-info',
    section: 'Tools',
    title: 'System-Info-Tool',
    description: 'Betriebssystem, Hostname, Uptime und Speicher der konfigurierten Ausführungsumgebung über das System-Info-Tool abfragen.',
    content: () => `
<h1>System-Info-Tool</h1>
<p class="lead">Grundlegende Informationen über die konfigurierte Ausführungsumgebung abfragen (diese Maschine, ein Docker-Container oder ein SSH-Host). Immer aktiviert, ohne Parameter.</p>

<h2>Parameter</h2>
<p>Keine — dieses Tool nimmt keine Argumente entgegen.</p>

<h2>Ausgabe</h2>
<p>Gibt einen Textbericht zurück mit:</p>
<ul>
  <li><strong>Hostname</strong></li>
  <li><strong>Betriebssystem</strong></li>
  <li><strong>Uptime</strong></li>
  <li><strong>Speicherauslastung</strong></li>
</ul>

<p>Der Speicher wird plattformspezifisch erhoben:</p>
<ul>
  <li><strong>Linux:</strong> aus <code>free -h</code> geparst</li>
  <li><strong>macOS:</strong> aus <code>vm_stat</code> geparst</li>
</ul>
`
  },
  {
    slug: '/tools/memory',
    section: 'Tools',
    title: 'Speicher-/Fakten-Tool',
    description: 'Langzeitfakten speichern, durchsuchen und vergessen, die über Sitzungen hinweg erhalten bleiben; die relevantesten werden in jedem Durchgang abgerufen.',
    content: () => `
<h1>Speicher-/Fakten-Tool</h1>
<p class="lead">Langzeitfakten speichern und abrufen, die über Sitzungen hinweg erhalten bleiben. Die für jede Nachricht relevanten Fakten werden in den Prompt abgerufen.</p>

<h2>Tool-Name</h2>
<p><code>remember_fact</code></p>

<h2>Parameter</h2>
${configTable([
  ['category', 'string', '—', 'Gruppierungskategorie (z. B. "user", "preference", "project")'],
  ['key', 'string', '—', 'Eindeutiger Bezeichner innerhalb der Kategorie'],
  ['value', 'string', '—', 'Der zu speichernde Faktentext'],
  ['delete', 'bool', 'false', 'category/key vergessen, statt zu speichern'],
  ['evidence', 'string', '—', 'Deine eigenen Worte, die den Fakt aussprechen, zitiert'],
  ['scope', 'string', 'project', 'In einer Projekt-Unterhaltung: project hält ihn in den Projektnotizen, personal hält ihn für dich'],
  ['facts', 'array', '—', 'Mehrere Fakten in einem Aufruf, jeder mit denselben Feldern'],
])}

<h2>Speicherung</h2>
<p>Fakten werden in der Tabelle <code>facts</code> in SQLite gespeichert. Das Speichern eines neuen Werts für dieselbe Kategorie und denselben Schlüssel ersetzt ihn. Der alte Wert bleibt als überholter Verlauf erhalten, und fast doppelte Schlüssel (zum Beispiel <code>editor</code> und <code>preferred_editor</code>) werden zusammengeführt.</p>

<h2>Abruf</h2>
<p>Fakten werden nicht alle eingefügt. In jedem Durchgang erscheinen die für deine Nachricht relevantesten Fakten (höchstens 8 und nie mehr als <code>state.max_facts</code>, Standard 20) unter <code>## Relevant Memory</code>, jeweils mit dem Datum ihrer Aufzeichnung. Dein Name und die Identität des Agenten sind separat angeheftet. Alles andere schlägt der Agent mit <code>manage_memories</code> nach.</p>

${codeBlock(`## Relevant Memory
- Fact [12] (recorded 2026-10-02) user/timezone = US/Pacific
- Fact [31] (recorded 2026-09-14) project/language = Rust`, 'text', 'system prompt')}

<h2>Erinnerungen finden und verwalten</h2>
<p><code>manage_memories</code> durchsucht gespeicherte Fakten (<code>search</code>), listet sie auf, durchsucht Zusammenfassungen vergangener Chats (<code>search_episodes</code>), vergisst einen Fakt, legt fest, wer einen sehen darf (<code>set_privacy</code>: global, channel oder private) und verfolgt persönliche Ziele. Für die genauen Nachrichten vergangener Chats nutze <code>search_history</code>.</p>

<h2>Schema der Fakten-Tabelle</h2>
${configTable([
  ['id', 'integer', 'auto', 'Automatisch hochzählender Primärschlüssel'],
  ['category', 'string', '—', 'Gruppierungskategorie'],
  ['key', 'string', '—', 'Fakten-Schlüssel (eindeutig pro Kategorie unter den aktuellen Fakten)'],
  ['value', 'string', '—', 'Faktentext'],
  ['source', 'string', '""', 'Wer ihn gespeichert hat, z. B. "agent"'],
  ['privacy', 'string', 'global', 'Wer ihn sehen darf: global, channel oder private'],
  ['channel_id', 'string', '—', 'Channel, in dem er gelernt wurde'],
  ['superseded_at', 'timestamp', '—', 'Wird gesetzt, wenn ein neuerer Wert ihn ersetzt hat'],
  ['created_at', 'timestamp', 'now', 'Wann der Fakt erstellt wurde'],
  ['updated_at', 'timestamp', 'now', 'Wann der Fakt zuletzt aktualisiert wurde'],
])}
`
  },
  {
    slug: '/tools/config-manager',
    section: 'Tools',
    title: 'Config-Manager-Tool',
    description: 'Der AIDaemon-Agent kann seine eigene Konfigurationsdatei lesen, aktualisieren, validieren und wiederherstellen sowie Anbieter wechseln.',
    content: () => `
<h1>Config-Manager-Tool</h1>
<p class="lead">Der Agent kann seine eigene Konfigurationsdatei lesen, aktualisieren, validieren und wiederherstellen.</p>

<h2>Tool-Name</h2>
<p><code>manage_config</code></p>

<h2>Aktionen</h2>

<h3>read</h3>
<p>Gibt den vollständigen Inhalt von config.toml zurück, mit geschwärzten sensiblen Feldern:</p>
${codeBlock(`api_key = "***REDACTED***"
bot_token = "***REDACTED***"
password = "***REDACTED***"`, 'toml')}

<h3>get</h3>
<p>Einen bestimmten TOML-Schlüsselpfad lesen:</p>
${codeBlock(`action: "get"
key: "provider.models.default"
# Returns: "gemini-3-flash-preview"`, 'text')}

<h3>set</h3>
<p>Einen bestimmten Schlüssel mit einem neuen Wert aktualisieren (TOML-Literalformat):</p>
${codeBlock(`action: "set"
key: "state.working_memory_cap"
value: "100"`, 'text')}

<p>Vor dem Schreiben:</p>
<ol>
  <li>Erstellt ein Backup (Ringrotation mit 3 Stufen: <code>.bak</code> → <code>.bak.1</code> → <code>.bak.2</code>)</li>
  <li>Validiert die neue Konfiguration (TOML-Syntax + vollständige Deserialisierung)</li>
  <li>Setzt unter Unix die Dateiberechtigungen auf 0600 (nur Owner)</li>
</ol>

<h3>unset</h3>
<p>Einen Schlüssel entfernen.</p>

<h3>restore</h3>
<p>Auf das neueste Backup zurückrollen (<code>.bak</code>, dann <code>.bak.1</code>, <code>.bak.2</code>). Führe <code>/reload</code> aus, um es anzuwenden.</p>

<h3>Anbieter-Aktionen</h3>
<p><code>list_provider_presets</code> und <code>switch_provider</code> ändern den Modellanbieter; <code>list_failover_providers</code>, <code>add_failover_provider</code>, <code>remove_failover_provider</code> und <code>move_failover_provider</code> verwalten das Failover.</p>

<h3>Einrichtungsaktionen</h3>
<p><code>enable_stt</code>, <code>enable_client_gateway</code>, <code>enable_exposure</code>.</p>

${callout('warn', 'Secrets', 'API-Schlüssel und Tokens sind nie Tool-Argumente. Speichere sie selbst mit <code>aidaemon keychain set &lt;key&gt;</code>; die Einstellung enthält dann den Wert <code>keychain</code>.')}

${callout('info', 'Letzter bekannt guter Stand', 'Nach jedem erfolgreichen LLM-Aufruf wird die aktuelle Konfiguration als <code>.toml.lastgood</code> abgestempelt. Das ist die erste Datei, die probiert wird, wenn die Konfiguration beim Start nicht geladen werden kann.')}

<h2>Reihenfolge der Wiederherstellung beim Start</h2>
<ol>
  <li><code>config.toml.lastgood</code> — erwiesenermaßen funktionierende Konfiguration</li>
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
    description: 'Chrome-Automatisierung mit persistenten Anmeldesitzungen für Web-Browsing, Formularausfüllung, Screenshots und PDFs.',
    content: () => `
<h1>Browser-Tool</h1>
<p class="lead">Chrome-Automatisierung mit persistenten Anmeldesitzungen. Melde dich einmal an, und der Agent kann in deinem Namen angemeldete Seiten besuchen.</p>

${callout('success', 'Vorkompilierte Binärdateien', 'Hast du über das Einzeiler-Skript oder Homebrew installiert, ist das Browser-Tool bereits enthalten. Aktiviere es einfach unten in <code>config.toml</code>. Es ist auch Teil des Standard-Builds aus dem Quellcode.')}

<h2>Schnellstart</h2>
<p>Zwei Schritte, damit der Agent mit deinen Anmeldesitzungen browst:</p>

<h3>1. Bei deinen Diensten anmelden</h3>
${codeBlock(`aidaemon browser login`, 'bash')}
<p>Chrome öffnet sich mit einem eigenen Profil. Melde dich bei den Diensten an, auf die der Agent zugreifen soll (Gmail, GitHub, AWS Console, Jira usw.), und schließe dann Chrome. Deine Sitzungen werden in <code>~/.aidaemon/chrome-profile/</code> gespeichert und bleiben über Neustarts hinweg erhalten.</p>

<h3>2. Das Browser-Tool aktivieren</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}

<p>Das war's. Der Agent kann jetzt mit deinen gespeicherten Sitzungen angemeldete Seiten besuchen.</p>

${callout('info', 'Probier es aus', 'Sende dem Agenten eine Nachricht wie <em>"Go to https://mail.google.com and take a screenshot"</em> — er sollte deinen Posteingang zeigen, bereits angemeldet.')}

<h2>Konfiguration</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Das Browser-Tool aktivieren'],
  ['headless', 'bool', 'true', 'Chrome ohne sichtbares Fenster ausführen'],
  ['screenshot_width', 'int', '1280', 'Breite des Browser-Viewports in Pixeln'],
  ['screenshot_height', 'int', '720', 'Höhe des Browser-Viewports in Pixeln'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Chrome-Profilverzeichnis für persistente Sitzungen'],
  ['profile', 'string', 'Default', 'Name des Chrome-Profils innerhalb von user_data_dir'],
  ['keep_sign_ins', 'bool', 'true', 'Anmeldungen in ~/.aidaemon/chrome-profile behalten; aus = jedes Mal ein frisches Profil'],
  ['session_isolation', 'string', 'auto', 'Wie Sitzungen isoliert werden: browser_context oder page'],
  ['nav_timeout_secs', 'int', '30', 'Wartezeit beim Laden einer Seite'],
  ['element_timeout_secs', 'int', '10', 'Standardwartezeit für die Aktion wait'],
  ['action_timeout_secs', 'int', '30', 'Obergrenze pro Aktion'],
  ['remote_debugging_port', 'int', 'null', 'Mit einer bestehenden Chrome-Instanz auf diesem Port verbinden (fortgeschritten)'],
])}

<h3>Minimale Konfiguration</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}
<p>Alles andere hat sinnvolle Standardwerte. Sitzungen werden automatisch in <code>~/.aidaemon/chrome-profile/</code> gespeichert.</p>

<h2>Aktionen</h2>

<table class="config-table">
<thead><tr><th>Aktion</th><th>Parameter</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>navigate</code></td><td><code>url</code></td><td>Eine URL öffnen und warten, bis die Seite geladen ist (bis zu <code>nav_timeout_secs</code>, Standard 30 s)</td></tr>
<tr><td><code>screenshot</code></td><td><code>selector?, full_page?, deliver?</code></td><td>PNG des sichtbaren Viewports, eines Elements oder der ganzen Seite</td></tr>
<tr><td><code>render_pdf</code></td><td><code>source_path, output_filename?</code></td><td>Eine lokale HTML-Datei als PDF rendern</td></tr>
<tr><td><code>click</code></td><td><code>selector</code></td><td>Ein Element per CSS-Selektor anklicken</td></tr>
<tr><td><code>fill</code></td><td><code>selector, value</code></td><td>Text in ein Formularfeld tippen</td></tr>
<tr><td><code>get_text</code></td><td><code>selector?</code></td><td>Textinhalt eines Elements oder der ganzen Seite extrahieren</td></tr>
<tr><td><code>inspect_page</code></td><td>—</td><td>Die Struktur der Seite und ihre interaktiven Elemente beschreiben</td></tr>
<tr><td><code>scroll</code></td><td><code>direction?, amount?</code></td><td>Nach oben oder unten scrollen (Standard 700 px)</td></tr>
<tr><td><code>execute_js</code></td><td><code>script</code></td><td>JavaScript ausführen und das Ergebnis zurückgeben (fragt immer zuerst)</td></tr>
<tr><td><code>wait</code></td><td><code>selector, condition?, text?, timeout_secs?</code></td><td>Warten, bis ein Element vorhanden, sichtbar, aktiviert, verborgen ist oder Text enthält (Standard <code>element_timeout_secs</code>, 10 s)</td></tr>
<tr><td><code>list_tabs</code>, <code>new_tab</code>, <code>switch_tab</code>, <code>close_tab</code></td><td><code>url?</code> / <code>tab_id</code></td><td>Mit mehreren Tabs arbeiten</td></tr>
<tr><td><code>get_console_logs</code>, <code>get_network_errors</code></td><td><code>tab_id?</code></td><td>Die Konsole der Seite und fehlgeschlagene Anfragen lesen</td></tr>
<tr><td><code>set_mode</code></td><td><code>value</code></td><td>Zwischen sichtbar und headless umschalten</td></tr>
<tr><td><code>close</code></td><td>—</td><td>Die Browser-Sitzung schließen</td></tr>
</tbody>
</table>

<h2>Genehmigungen</h2>
<p>Öffentliche Navigation und das Lesen von Seiten brauchen keine Genehmigung. Das Öffnen einer Seite auf diesem Computer fragt einmal pro Seite, Seitenänderungen können fragen, und <code>execute_js</code> fragt immer.</p>

<h2>Sitzungspersistenz</h2>
<p>Das Browser-Tool nutzt ein eigenes Chrome-Profil unter <code>~/.aidaemon/chrome-profile/</code>, das Cookies, Local Storage und Anmeldesitzungen speichert. Das bedeutet:</p>
<ul>
  <li>Melde dich einmal über <code>aidaemon browser login</code> an, Sitzungen bleiben unbegrenzt erhalten</li>
  <li>Der Agent startet Chrome headless mit diesem Profil — bereits authentifiziert</li>
  <li>Sitzungen überstehen Neustarts von AIDaemon und des Systems</li>
  <li>Führe <code>aidaemon browser login</code> jederzeit erneut aus, um neue Dienste hinzuzufügen oder abgelaufene Sitzungen zu erneuern</li>
</ul>

${callout('warn', 'Getrennt von deinem persönlichen Chrome', 'Der Agent verwendet sein eigenes Chrome-Profil, vollständig getrennt von deinem persönlichen Browser. Deine persönlichen Lesezeichen, Erweiterungen und Sitzungen werden nie angetastet.')}

<h2>Bereitstellungsmodi</h2>

<h3>Isolierte Instanz (empfohlen)</h3>
<p>Läuft AIDaemon auf einem dedizierten Server oder einer VM, läuft kein anderes Chrome. Der Agent startet Chrome direkt und besitzt es.</p>
${codeBlock(`# SSH into your instance
ssh user@my-server

# One-time: log into services
aidaemon browser login

# Config
# [browser]
# enabled = true

# Done — agent handles Chrome automatically from here`, 'bash')}
<p>Für Headless-Server verwende für die erste Anmeldung SSH mit X-Forwarding (<code>ssh -X</code>) oder VNC.</p>

<h3>Persönlicher Computer</h3>
<p>Läuft AIDaemon neben deinem persönlichen Chrome, startet der Agent eine separate Chrome-Instanz mit eigenem Profil. Beide laufen nebeneinander ohne Konflikt.</p>
${codeBlock(`# Same setup — separate Chrome instance, no conflict
aidaemon browser login

# Your personal Chrome (47 tabs, extensions, bookmarks) → untouched
# AIDaemon's Chrome (~/.aidaemon/chrome-profile/) → isolated`, 'bash')}

<h3>Fortgeschritten: Mit vorhandenem Chrome verbinden</h3>
<p>Für Power-User, die sich mit einer Chrome-Instanz verbinden möchten, die bereits mit einem Remote-Debugging-Port läuft:</p>
${codeBlock(`[browser]
enabled = true
remote_debugging_port = 9222`, 'toml', 'config.toml')}
<p>Starte Chrome mit <code>--remote-debugging-port=9222</code>, und der Agent verbindet sich direkt damit. Dadurch werden die Sitzungen dieser Chrome-Instanz geteilt, aber Chrome muss mit dem Debugging-Flag gestartet worden sein.</p>

<h2>Screenshots</h2>
<p>Screenshots werden gespeichert, damit der Agent sie ansehen kann. Einer wird dir gesendet, wenn der Agent ihn als das von dir verlangte Ergebnis markiert (<code>deliver: true</code>).</p>

<h2>Zuschauen und Übernehmen</h2>
<p>Mit aktiviertem <code>[surfaces]</code> (Standard) kannst du den Browser des Agenten von einer gekoppelten App aus beobachten und übernehmen, und der Agent kann ihn dir zum Anmelden übergeben (<code>hand_over</code>).</p>

<h2>Anwendungsfälle</h2>
<ul>
  <li><strong>Monitoring</strong> — Dashboards prüfen (Grafana, Vercel, AWS Console), Screenshots vom Deployment-Status machen</li>
  <li><strong>Datenextraktion</strong> — JS-gerenderte Seiten scrapen, Berichte aus Admin-Panels ziehen</li>
  <li><strong>Workflow-Automatisierung</strong> — Formulare ausfüllen, mehrstufige Abläufe in internen Tools durchlaufen</li>
  <li><strong>Testing</strong> — deine bereitgestellte App durchlaufen, die UI prüfen, responsive Layouts kontrollieren</li>
  <li><strong>Angemeldetes Browsen</strong> — mit jedem Dienst interagieren, bei dem du angemeldet bist, ohne API-Schlüssel</li>
</ul>

<h2>Aus dem Quellcode bauen</h2>
<p>Das Feature <code>browser</code> ist standardmäßig aktiv, daher enthält ein einfaches <code>cargo build --release</code> es. Builds mit <code>--no-default-features</code> müssen <code>--features browser</code> hinzufügen.</p>
<p>Erfordert einen installierten Chromium-basierten Browser (Chrome, Chromium, Brave oder Edge).</p>
`
  },
  {
    slug: '/tools/sub-agents',
    section: 'Tools',
    title: 'Sub-Agent-Erzeugung',
    description: 'Fokussierte Arbeit an Sub-Agenten und benannte Spezialisten delegieren, einzeln oder mehrere parallel.',
    content: () => `
<h1>Sub-Agent-Erzeugung</h1>
<p class="lead">Der Agent kann fokussierte Arbeit an frische Sub-Agenten und benannte Spezialisten delegieren, einzeln oder mehrere parallel.</p>

<h2>Tool-Name</h2>
<p><code>spawn_agent</code></p>

<h2>Parameter</h2>
${configTable([
  ['task', 'string', '—', 'Was der Sub-Agent tun soll'],
  ['mission', 'string', 'title', 'Optionales weiteres Ziel für seinen Kontext'],
  ['title', 'string', '—', 'Ein paar Worte, die auf seiner Karte angezeigt werden'],
  ['specialist', 'string', 'executor', 'code, research, review, browser_verifier, artifact_writer, comms_draft, executor oder generic'],
  ['tasks', 'array', '—', 'Mehrere Sub-Agenten in einem Aufruf (bis zu 6, 3 gleichzeitig)'],
  ['background', 'bool', 'false', 'Im Hintergrund ausführen; das Ergebnis geht in deinen Chat'],
  ['tools', 'array', '—', 'Einschränken, welche Tools er verwenden darf'],
  ['access', 'string', '—', 'read_only, um nur zu beobachten'],
  ['scope', 'array', '—', 'Dateien oder Ordner, die er ändern darf'],
  ['model_tier', 'string', 'same', 'fast, primary oder smart'],
])}

<h2>Verhalten</h2>
<ul>
  <li>Der Kind-Agent läuft mit <code>parent_depth + 1</code></li>
  <li>Erbt die Tools und den Zugriff des Eltern-Agenten (nie mehr) und dessen Modell, sofern <code>model_tier</code> nicht gesetzt ist</li>
  <li>Erhält einen fokussierten System-Prompt: Basisanweisungen + Missionskontext</li>
  <li>Führt eine vollständige agentische Schleife in einer isolierten Sitzung aus</li>
  <li>Gibt die endgültige Textantwort an den Eltern-Agenten zurück (gekürzt auf <code>max_response_chars</code>)</li>
  <li>Wenn <code>child_depth &lt; max_depth</code>, erhält das Kind ebenfalls das Tool <code>spawn_agent</code>; ein benannter Spezialist delegiert nur weiter, wenn seine Tools <code>spawn_agent</code> enthalten</li>
</ul>

<h2>Spezialisten</h2>
<p>Ein Sub-Agent kann als benannter Spezialist mit eigenen Anweisungen und Tools laufen. Überschreibe einen, indem du <code>&lt;kind&gt;.md</code> in <code>~/.aidaemon/specialists/</code> ablegst.</p>

<h2>Konfiguration</h2>
${codeBlock(`[subagents]
enabled = true
max_depth = 3
max_response_chars = 8000
timeout_secs = 300        # stopped after this long with no progress
max_concurrent = 4
max_per_request = 12
task_token_budget = 500000`, 'toml', 'config.toml')}
<p><code>max_iterations</code> ist ein veralteter Schlüssel. Standardmäßig gibt es kein Schrittlimit.</p>

${callout('info', 'Rekursionslimit', 'Sub-Agenten können ihrerseits Sub-Agenten starten, bis zu <code>max_depth</code> Ebenen tief. Bei maximaler Tiefe wird das Tool spawn_agent nicht bereitgestellt.')}

${callout('info', 'Kein Wanduhr-Limit', 'Ein Sub-Agent wird erst nach <code>timeout_secs</code> ohne Fortschritt gestoppt (kein Tool läuft, keine Modellantwort). Lange Arbeit, die weiter Fortschritte macht, läuft bis zum Ende, begrenzt durch ihr Token-Budget.')}
`
  },
  {
    slug: '/tools/cli-agents',
    section: 'Tools',
    title: 'CLI-Agent-Delegierung',
    description: 'Coding-Arbeit an Claude Code, Codex, Antigravity CLI, Gemini CLI, Copilot, Aider oder jeden Agent-Client-Protocol-Agenten delegieren, in einem Berechtigungsmodus deiner Wahl.',
    content: () => `
<h1>CLI-Agent-Delegierung</h1>
<p class="lead">Delegiere Aufgaben an externe Coding-Agenten (Claude Code, Codex, Antigravity CLI, Gemini CLI, Copilot, Aider) oder an jeden Agenten, der das Agent Client Protocol spricht, jeweils in einem Berechtigungsmodus deiner Wahl.</p>

<h2>Tool-Name</h2>
<p><code>cli_agent</code></p>

<h2>Parameter</h2>
${configTable([
  ['action', 'string', '—', 'run, check, cancel oder list (erforderlich)'],
  ['tool', 'string', '—', 'Agentenname, z. B. claude, codex, agy'],
  ['prompt', 'string', '—', 'Die Aufgabe'],
  ['title', 'string', '—', 'Ein paar Worte, die auf der Lauf-Karte angezeigt werden'],
  ['working_dir', 'string', '—', 'Absolutes Verzeichnis; lesbar, aber nicht von sich aus beschreibbar'],
  ['workspace_mode', 'string', '—', 'read_only oder read_write'],
  ['write_paths', 'array', '—', 'Dateien/Ordner, die ein read_write-Lauf ändern darf (erforderlich für read_write)'],
  ['read_paths', 'array', '—', 'Zusätzliche lesbare Pfade'],
  ['scope', 'array', '—', 'Dateien oder Ordner, die der Lauf ändern wird'],
  ['new_folders', 'array', '—', 'Für den Lauf neu angelegte Ordner'],
  ['async_mode', 'bool', 'false', 'Im Hintergrund ausführen'],
  ['system_instruction', 'string', '—', 'Den Agenten zu einem Spezialisten formen'],
])}
<p><code>manage_cli_agents</code> fügt Agenten zur Laufzeit hinzu, entfernt, listet, aktiviert und deaktiviert sie und zeigt den Laufverlauf, ohne Neustart.</p>

<h2>Entdeckte Agenten</h2>
<p>Ist <code>cli_agents.enabled = true</code> ohne explizite Tool-Konfigurationen gesetzt, werden diese registriert, wenn ihr Befehl installiert ist:</p>

<table class="config-table">
<thead><tr><th>Name</th><th>Agent</th><th>Befehl</th></tr></thead>
<tbody>
<tr><td>claude</td><td>Claude Code</td><td><code>claude -p --output-format stream-json --verbose</code></td></tr>
<tr><td>codex</td><td>Codex</td><td><code>codex exec --json</code></td></tr>
<tr><td>agy</td><td>Antigravity CLI (Agent Client Protocol)</td><td><code>agy acp</code></td></tr>
<tr><td>gemini</td><td>Gemini CLI (Agent Client Protocol)</td><td><code>gemini --acp</code></td></tr>
<tr><td>copilot</td><td>Copilot CLI</td><td><code>copilot -p</code></td></tr>
<tr><td>aider</td><td>Aider</td><td><code>aider --message</code></td></tr>
</tbody>
</table>

<p>Nennt ein Aufruf kein Tool, wird der erste verfügbare von <code>claude</code>, <code>codex</code>, <code>agy</code>, <code>copilot</code>, <code>aider</code> verwendet. Gemini CLI steht nicht in dieser Reihenfolge (Google stellt es jetzt nur noch Enterprise-Lizenzen und bezahlten API-Schlüsseln bereit); es wird verwendet, wenn es genannt wird, und seine Bereitschaftsprüfung meldet eine abgelehnte persönliche Anmeldung.</p>

<h2>Berechtigungsmodi</h2>
<p>Jeder Coding-Agent läuft in einem von drei Modi, pro Agent auf der Seite Settings der App festgelegt:</p>
<table class="config-table">
<thead><tr><th>Modus</th><th>Verhalten</th></tr></thead>
<tbody>
<tr><td><strong>Checked by AIDaemon</strong> (Standard)</td><td>Durch die eigene Sandbox des Agenten auf den Projektordner beschränkt; alles darüber hinaus wird zuerst erfragt und nach deinen eigenen Regeln beurteilt</td></tr>
<tr><td><strong>Every command checked</strong></td><td>Läuft auf der Maschine selbst, wobei jeder Befehl und jede Dateiänderung (außer der eigenen kurzen Liste schreibgeschützter Befehle des Agenten) zuerst erfragt wird</td></tr>
<tr><td><strong>Full access</strong></td><td>Läuft auf der Maschine, ohne dass etwas erfragt wird. Die Wahl fragt dich zuerst.</td></tr>
</tbody>
</table>
<p>Claude Code und Codex fragen AIDaemon, statt von sich aus abzulehnen, sodass deine Freigaben beantworten, was sie abdecken, und eine Karte den Rest erfragt. Settings zeigt außerdem, ob jeder Agent gerade arbeiten kann (<strong>Ready</strong> oder <strong>Not usable</strong> mit Grund und Lösung sowie <strong>Check again</strong>); Arbeit wird nie an einen Agenten geleitet, der nicht laufen kann.</p>

<h2>Jeder Agent-Client-Protocol-Agent</h2>
<p>Ein Agent, der das <a href="https://agentclientprotocol.com" target="_blank" rel="noopener">Agent Client Protocol</a> spricht, kann unter <code>[cli_agents.tools.&lt;name&gt;]</code> mit <code>protocol = "acp"</code> hinzugefügt werden. AIDaemon hostet ihn über das Protokoll, und jede Aktion, die er ausführt, wird zuerst erfragt, sodass jede einzelne beurteilt werden kann.</p>
${codeBlock(`[cli_agents.tools.my-acp-agent]
command = "my-acp-agent"
args = ["--acp"]            # whatever starts its protocol server
protocol = "acp"
description = "An ACP coding agent"`, 'toml', 'config.toml')}

<h2>Eigene Konfiguration</h2>
${codeBlock(`[cli_agents]
enabled = true
timeout_secs = 600
max_output_chars = 16000

[cli_agents.tools.claude]
command = "claude"
args = ["-p", "--output-format", "stream-json", "--verbose"]
description = "Claude Code for coding tasks"

[cli_agents.tools.custom-tool]
command = "/usr/local/bin/my-ai-tool"
args = ["--json"]
description = "My custom AI tool"
timeout_secs = 120`, 'toml', 'config.toml')}
<p>Jeder gesetzte Eintrag <code>[cli_agents.tools.*]</code> ersetzt die entdeckte Liste. Ein gespeicherter Start kann nicht erweitern, was ein bekannter Agent darf: Argumente, die seine Sandbox oder Genehmigungen umgehen würden, werden abgelehnt.</p>

<h2>Ausgabeextraktion</h2>
<p>Das Tool versucht, strukturierte Ausgabe zu extrahieren:</p>
<ul>
  <li><strong>JSON:</strong> sucht nach den Feldern <code>result</code>, <code>output</code>, <code>content</code> oder <code>message</code></li>
  <li><strong>JSONL:</strong> nimmt die letzte Zeile, die Inhalt enthält</li>
  <li><strong>Fallback:</strong> gibt die Rohausgabe zurück, gekürzt auf <code>max_output_chars</code></li>
</ul>
`
  },
  {
    slug: '/tools/web-search',
    section: 'Tools',
    title: 'Websuche-Tool',
    description: 'Das Web über DuckDuckGo, Brave oder SearxNG parallel durchsuchen und zusammengeführte Titel, URLs und Snippets zurückgeben.',
    content: () => `
<h1>Websuche-Tool</h1>
<p class="lead">Das Web durchsuchen und Titel, URLs und Snippets zurückgeben. Unterstützt DuckDuckGo (Standard, kein Schlüssel nötig), Brave und ein selbst gehostetes SearxNG. Standardmäßig wird jedes konfigurierte Backend parallel durchsucht, und die Ergebnisse werden zusammengeführt und dedupliziert.</p>

<h2>Tool-Name</h2>
<p><code>web_search</code></p>

<h2>Parameter</h2>
${configTable([
  ['query', 'string', '—', 'Die Suchanfrage (erforderlich)'],
  ['max_results', 'integer', '8', 'Maximale Anzahl zusammengeführter Ergebnisse (max. 20)'],
  ['freshness', 'string', '—', 'Nur Ergebnisse vom letzten Tag, der letzten Woche, dem letzten Monat oder Jahr'],
])}

<h2>Backends</h2>
<table class="config-table">
<thead><tr><th>Backend</th><th>API-Schlüssel</th><th>Funktionsweise</th></tr></thead>
<tbody>
<tr><td><strong>DuckDuckGo</strong> (Standard)</td><td>Nicht erforderlich</td><td>Ruft <code>https://lite.duckduckgo.com/lite/</code> ab und parst HTML-Ergebnisse</td></tr>
<tr><td><strong>Brave</strong></td><td>Erforderlich</td><td>Ruft die JSON-API <code>https://api.search.brave.com/res/v1/web/search</code> auf</td></tr>
<tr><td><strong>SearxNG</strong></td><td>Nicht erforderlich</td><td>Deine eigene Instanz unter <code>search.searxng_url</code></td></tr>
</tbody>
</table>

<h2>Konfiguration</h2>
${codeBlock(`[search]
backend = "duckduckgo"   # or "brave", "searxng"
api_key = "keychain"     # Brave only; store it with: aidaemon keychain set search_api_key
searxng_url = ""         # e.g. "http://localhost:8080"
parallel = true          # search every configured backend and merge`, 'toml', 'config.toml')}

<h2>Ausgabeformat</h2>
<p>Gibt nummerierte Markdown-Ergebnisse zurück. Alter und Quellen erscheinen, wenn sie bekannt sind oder wenn mehrere Backends geantwortet haben:</p>
${codeBlock(`1. [Page Title](https://example.com/page)
   A brief snippet describing the page content...
   2 days ago · via brave, duckduckgo

2. [Another Result](https://example.com/other)
   Another snippet...`, 'text')}
`
  },
  {
    slug: '/tools/web-fetch',
    section: 'Tools',
    title: 'Web-Fetch-Tool',
    description: 'Jede URL abrufen und lesbare Inhalte extrahieren. Unterstützt HTML-zu-Text-Umwandlung mit konfigurierbaren Limits.',
    content: () => `
<h1>Web-Fetch-Tool</h1>
<p class="lead">Eine URL abrufen und ihren lesbaren Inhalt extrahieren. Immer aktiviert, keine Konfiguration erforderlich.</p>

<h2>Tool-Name</h2>
<p><code>web_fetch</code></p>

<h2>Parameter</h2>
${configTable([
  ['url', 'string', '—', 'Die abzurufende URL (erforderlich)'],
  ['max_chars', 'integer', '20000', 'Maximal zurückzugebende Zeichen (max. 50000)'],
  ['offset', 'integer', '0', 'Zu überspringende Zeichen, um über eine gekürzte Antwort hinaus zu lesen'],
])}

<h2>Verhalten</h2>
<ol>
  <li>Lehnt Adressen aus privaten Netzwerken, Loopback- und Cloud-Metadaten-Adressen ab, auch nach Weiterleitungen. Verwende <code>http_request</code> für APIs.</li>
  <li>Ruft die URL mit browserähnlichen Headern ab (Firefox-User-Agent, Standard-Accept-Header)</li>
  <li>Versucht eine Readability-Extraktion, um sauberen Artikeltext zu erhalten</li>
  <li>Fällt auf eine vollständige HTML-zu-Markdown-Umwandlung zurück</li>
  <li>Kürzt auf <code>max_chars</code> an einer sicheren UTF-8-Grenze</li>
</ol>

${callout('info', 'Ergänzt das Browser-Tool', 'Verwende <code>web_fetch</code> für eine schnelle Inhaltsextraktion, ohne Chrome hochzufahren. Verwende das <a href="/tools/browser">Browser-Tool</a> für interaktive Seiten, die JavaScript, Formularausfüllung oder Screenshots erfordern.')}
`
  },
  {
    slug: '/tools/send-file',
    section: 'Tools',
    title: 'Dateiübertragung',
    description: 'Dateien über Telegram, Slack, Discord oder die App senden und empfangen. Pfadvalidierung und Sperrung sensibler Dateien sind eingebaut.',
    content: () => `
<h1>Dateiübertragung</h1>
<p class="lead">Sende Dateien im aktuellen Chat an den Benutzer (Telegram, Slack, Discord oder die App) und empfange Dateien vom Benutzer. Validiert Pfade und blockiert sensible Dateien.</p>

<h2>Tool-Name</h2>
<p><code>send_file</code> (ausgehend)</p>

<h2>Parameter</h2>
${configTable([
  ['resource_id', 'string', '—', 'Handle (res_…) eines Anhangs oder einer von einem Tool erzeugten Datei; bevorzugt'],
  ['file_path', 'string', '—', 'Exakter absoluter Pfad, wenn es keine resource_id gibt'],
  ['caption', 'string', 'null', 'Optionale Bildunterschrift für die Datei'],
])}

<h2>Konfiguration</h2>
${codeBlock(`[files]
enabled = true        # on by default
inbox_dir = "~/.aidaemon/files/inbox"
outbox_dirs = ["~"]
max_file_size_mb = 10
retention_hours = 24`, 'toml', 'config.toml')}

<h2>Sicherheit</h2>
<p>Das Tool erzwingt Pfadbeschränkungen, um ein versehentliches Preisgeben von Secrets zu verhindern:</p>
<ul>
  <li><strong>Erlaubte Pfade:</strong> Nur Dateien innerhalb von <code>outbox_dirs</code> oder <code>inbox_dir</code></li>
  <li><strong>Symlink-Auflösung:</strong> Kanonisiert Pfade, um Directory Traversal zu verhindern</li>
  <li><strong>Gesperrte Muster:</strong> <code>.ssh</code>, <code>.gnupg</code>, <code>.env</code>, <code>credentials</code>, <code>.key</code>, <code>.pem</code>, <code>.aws/credentials</code>, <code>.netrc</code>, <code>.docker/config.json</code>, <code>config.toml</code></li>
</ul>

<h2>Eingehende Dateien</h2>
<p>Benutzer können dem Bot in jedem verbundenen Channel Dateien senden. AIDaemon lädt sie nach <code>inbox_dir</code> herunter und stellt sie dem Agenten zur Verfügung. Unterstützt werden Dokumente, Fotos, Audio, Video und Sprachnachrichten, bis zu <code>max_file_size_mb</code>.</p>

${callout('warn', 'Outbox-Verzeichnisse', 'Die Liste <code>outbox_dirs</code> steuert, aus welchen Verzeichnissen der Agent Dateien senden darf. Halte sie im Produktivbetrieb so schmal wie möglich.')}
`
  },
  {
    slug: '/tools/people',
    section: 'Tools',
    title: 'Personen-Intelligenz',
    description: 'Ein persönliches Kontaktbuch, das von deinem KI-Assistenten gepflegt wird. Merkt sich Geburtstage, Vorlieben und Beziehungen — alles lokal auf deinem Rechner gespeichert.',
    content: () => `
<h1>Personen-Intelligenz</h1>
<p class="lead">Stell es dir als Kontaktbuch vor, aber mit einem persönlichen Assistenten, der sich die Details für dich merkt. Geburtstage, Vorlieben, Kommunikationsstile, woher du jemanden kennst &mdash; AIDaemon hält alles geordnet und erinnert dich, wenn es darauf ankommt. Alles liegt auf deinem Computer oder Server und wird nie an Dritte gesendet.</p>

${callout('info', 'Umschalten zur Laufzeit', 'Personen-Intelligenz kann jederzeit über den Chat aktiviert oder deaktiviert werden. Sag einfach <strong>"enable people intelligence"</strong> oder nutze das Tool <code>manage_people</code> mit der Aktion <code>enable</code>/<code>disable</code>. Kein Neustart erforderlich.')}

<h2>So funktioniert es</h2>
<ol>
  <li><strong>Kontakte hinzufügen</strong> &mdash; füge Personen manuell hinzu oder lass AIDaemon sie aus Unterhaltungen kennenlernen</li>
  <li><strong>Details merken</strong> &mdash; Geburtstage, Vorlieben, Interessen, Berufliches und mehr</li>
  <li><strong>Identitäten verknüpfen</strong> &mdash; verbinde eine Person mit ihrer Telegram-, Slack- oder Discord-Identität</li>
  <li><strong>Erinnerungen auf Anfrage</strong> &mdash; frag nach anstehenden Geburtstagen und Personen, bei denen du dich wieder melden solltest</li>
  <li><strong>Kontextanpassung</strong> &mdash; schreibt eine bekannte Person, passt AIDaemon seinen Kommunikationsstil an</li>
</ol>

<h2>Tool-Name</h2>
<p><code>manage_people</code></p>

<h2>Aktionen</h2>
<table class="config-table">
<thead><tr><th>Aktion</th><th>Beschreibung</th><th>Erforderliche Parameter</th></tr></thead>
<tbody>
<tr><td><code>remember</code></td><td>Personen, Namen, Aliasse, Familie und Orte im persönlichen Speicher ablegen. Immer verfügbar, auch bei ausgeschalteter Personen-Intelligenz.</td><td>personal_memory</td></tr>
<tr><td><code>enable</code></td><td>Personen-Intelligenz einschalten (bleibt über Neustarts erhalten)</td><td>&mdash;</td></tr>
<tr><td><code>disable</code></td><td>Personen-Intelligenz ausschalten (Daten bleiben erhalten)</td><td>&mdash;</td></tr>
<tr><td><code>status</code></td><td>Den Zustand aktiviert/deaktiviert und die Zahl der Kontakte zeigen</td><td>&mdash;</td></tr>
<tr><td><code>add</code></td><td>Eine neue Person hinzufügen</td><td>name</td></tr>
<tr><td><code>list</code></td><td>Alle Kontakte auflisten (nach Beziehung filtern)</td><td>&mdash;</td></tr>
<tr><td><code>view</code></td><td>Details einer Person und alle Fakten ansehen</td><td>name or id</td></tr>
<tr><td><code>brief</code></td><td>Ein kurzes Briefing zu einer Person</td><td>name, person_name or id</td></tr>
<tr><td><code>upcoming</code></td><td>Anstehende Geburtstage und wichtige Termine</td><td>&mdash; (within_days)</td></tr>
<tr><td><code>reconnect</code></td><td>Personen, mit denen du nicht in Kontakt warst</td><td>&mdash; (inactive_days)</td></tr>
<tr><td><code>update</code></td><td>Felder einer Person aktualisieren (Beziehung, Notizen, Stil)</td><td>name or id</td></tr>
<tr><td><code>remove</code></td><td>Eine Person und alle ihre Fakten löschen</td><td>name or id</td></tr>
<tr><td><code>add_fact</code></td><td>Einen Fakt über jemanden speichern (Geburtstag, Vorliebe usw.)</td><td>person_name, category, key, value</td></tr>
<tr><td><code>remove_fact</code></td><td>Einen bestimmten Fakt per ID löschen</td><td>fact_id</td></tr>
<tr><td><code>link</code></td><td>Eine Plattformidentität mit einer Person verknüpfen</td><td>person_name, platform_id</td></tr>
<tr><td><code>export</code></td><td>Alle Daten einer Person als JSON exportieren</td><td>person_name or name</td></tr>
<tr><td><code>purge</code></td><td>Vollständiges Kaskadenlöschen (Person + Fakten + Verknüpfungen)</td><td>person_name or name</td></tr>
<tr><td><code>audit</code></td><td>Unbestätigte Fakten prüfen</td><td>&mdash; (or person_name)</td></tr>
<tr><td><code>confirm</code></td><td>Einen unbestätigten Fakt verifizieren (Konfidenz auf 100 % setzen)</td><td>fact_id</td></tr>
</tbody>
</table>

<h2>Parameter</h2>
${configTable([
  ['action', 'string', '&mdash;', 'Auszuführende Aktion (erforderlich)'],
  ['name', 'string', 'null', "Name der Person (für add, view, brief, update, remove)"],
  ['id', 'integer', 'null', "Datenbank-ID der Person (für view, update, remove)"],
  ['relationship', 'string', 'null', 'Beziehungstyp: spouse, family, friend, coworker, acquaintance'],
  ['notes', 'string', 'null', 'Freie Notizen über die Person'],
  ['communication_style', 'string', 'null', 'Wie kommuniziert werden soll: casual, formal, warm usw.'],
  ['language', 'string', 'null', 'Bevorzugte Sprache für die Interaktion'],
  ['person_name', 'string', 'null', "Name der Person (für add_fact, link; export, purge und audit akzeptieren auch name)"],
  ['category', 'string', 'null', 'Fakten-Kategorie: birthday, preference, interest, work, family, important_date, personality, gift_idea'],
  ['key', 'string', 'null', "Fakten-Schlüssel (z. B. 'birthday', 'favorite_food')"],
  ['value', 'string', 'null', 'Fakten-Wert. Für birthday oder important_date ein ISO-Datum (YYYY-MM-DD oder --MM-DD ohne Jahr)'],
  ['platform_id', 'string', 'null', "Plattformqualifizierte ID (z. B. 'slack:U123', 'telegram:456')"],
  ['display_name', 'string', 'null', 'Anzeigename für die Plattformidentität'],
  ['fact_id', 'integer', 'null', 'Fakten-ID (für remove_fact, confirm)'],
  ['personal_memory', 'object', 'null', 'remember: Personen, Aliasse, Fakten und Beziehungen'],
  ['within_days', 'integer', 'null', 'upcoming: Tage im Voraus'],
  ['inactive_days', 'integer', 'null', 'reconnect: Tage ohne Kontakt'],
])}

<h2>Aktivieren</h2>
<p>Es gibt zwei Wege, Personen-Intelligenz zu aktivieren:</p>

<h3>Option 1: Über den Chat (empfohlen)</h3>
<p>Sag deinem Bot einfach, dass er sie aktivieren soll. Die Einstellung wird in der Datenbank gespeichert und bleibt über Neustarts erhalten.</p>
${codeBlock('You: "Enable people intelligence"\naidaemon: "People Intelligence enabled. I\'ll now remember contacts..."', 'text', 'chat')}

<h3>Option 2: Über config.toml</h3>
<p>Lege den Anfangszustand in deiner Konfigurationsdatei fest. Dieser Wert wird beim ersten Start zum Befüllen der Datenbank verwendet; danach hat die Laufzeiteinstellung Vorrang.</p>
${codeBlock('[people]\nenabled = true', 'toml', 'config.toml')}

<h2>Organisches Lernen</h2>
<p>Bei der Speicherkonsolidierung zeichnet AIDaemon die Personen auf, die du erwähnst (Namen, Spitznamen, Geburtstage, Familie und Wohnorte), im persönlichen Speicher, demselben Speicher, in den <code>remember</code> schreibt. Fakten des Kontaktbuchs werden mit <code>add_fact</code> hinzugefügt; <code>audit</code> und <code>confirm</code> prüfen unbestätigte.</p>

${callout('warn', 'Sensible Angaben', 'Gesundheits- und Finanzangaben werden nicht als Kontaktfakten gespeichert.')}

<h2>Hintergrundaufgaben</h2>
<p>Wenn aktiviert, führt AIDaemon tägliche Hintergrundprüfungen aus:</p>
<ul>
  <li><strong>Bereinigung veralteter Fakten</strong> &mdash; entfernt unbestätigte Fakten, die älter als <code>fact_retention_days</code> sind (Standard 180)</li>
  <li><strong>Anstehende Termine und Wiederaufnahmen</strong> &mdash; täglich geprüft und protokolliert; frag jederzeit mit den Aktionen <code>upcoming</code> und <code>reconnect</code> danach (reconnect nutzt <code>reconnect_reminder_days</code>, Standard 30)</li>
</ul>

<h2>Datenschutzmodell</h2>
<table class="config-table">
<thead><tr><th>Kontext</th><th>Verhalten</th></tr></thead>
<tbody>
<tr><td>Owner-DMs</td><td>Der vollständige Personengraph wird in den System-Prompt eingefügt (Namen, Fakten, Beziehungen)</td></tr>
<tr><td>Nicht-Owner (verknüpft)</td><td>Nur Anpassung des Kommunikationsstils (keine Faktenweitergabe an andere Benutzer)</td></tr>
<tr><td>Öffentliche Channels</td><td>Keine persönlichen Fakten eingefügt</td></tr>
</tbody>
</table>

<h2>Konfiguration</h2>
${codeBlock('[people]\nenabled = true\nfact_retention_days = 180\nreconnect_reminder_days = 30', 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'Anfangszustand (zur Laufzeit per Chat umschaltbar)'],
  ['fact_retention_days', 'integer', '180', 'Tage, bevor unbestätigte Fakten entfernt werden'],
  ['reconnect_reminder_days', 'integer', '30', 'Tage der Inaktivität, bevor eine Wiederaufnahme des Kontakts vorgeschlagen wird'],
  ['auto_extract, auto_extract_categories, restricted_categories', '—', '—', 'Akzeptiert, aber nicht verwendet'],
])}
`
  },
  {
    slug: '/mcp',
    section: 'MCP',
    title: 'MCP-Überblick',
    description: 'AIDaemon mit Model-Context-Protocol-Servern um Dateisystemzugriff, Datenbanken, APIs und mehr erweitern.',
    content: () => `
<h1>MCP-Integration</h1>
<p class="lead">Erweitere AIDaemon mit jedem <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener">Model-Context-Protocol</a>-Server um Dateisystemzugriff, Datenbanken, APIs und mehr.</p>

<h2>So funktioniert es</h2>
<ol>
  <li>AIDaemon startet jeden konfigurierten MCP-Server als Subprozess</li>
  <li>Kommuniziert über JSON-RPC 2.0 via stdin/stdout</li>
  <li>Ruft <code>tools/list</code> auf, um die verfügbaren Tools zu entdecken</li>
  <li>Jedes entdeckte Tool wird als <code>&lt;server&gt;__&lt;tool&gt;</code> angeboten (z. B. <code>github__create_issue</code>)</li>
  <li>Das Modell kann MCP-Tools genauso aufrufen wie eingebaute Tools</li>
</ol>

<h2>Protokolldetails</h2>
<ul>
  <li><strong>Protokollversion:</strong> fordert 2025-06-18 an; akzeptiert 2025-03-26 und 2024-11-05</li>
  <li><strong>Client-Info:</strong> name="aidaemon", version = die Version des Daemons</li>
  <li><strong>Transport:</strong> zeilenbegrenztes JSON über stdin/stdout</li>
  <li><strong>Initialisierung:</strong> <code>initialize</code>-Anfrage → <code>notifications/initialized</code></li>
</ul>

<h2>Sicherheit</h2>
<ul>
  <li>Nur sichere Variablen (PATH, HOME, LANG&hellip;) gelangen aus der Umgebung des Daemons an einen Server; alles andere muss explizit gesetzt werden.</li>
  <li>MCP-Ausgabe gilt als nicht vertrauenswürdig, und Aufrufe werden im schlimmsten Fall beurteilt (es kann eine Genehmigung verlangt werden), sofern du das Tool nicht in <code>read_only_tools</code> aufführst.</li>
</ul>

<h2>Beispiel</h2>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/documents"]

[mcp.sqlite]
command = "uvx"
args = ["mcp-server-sqlite", "--db-path", "my-database.db"]

[mcp.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]`, 'toml', 'config.toml')}

<h2>Server zur Laufzeit hinzufügen</h2>
<p>Das Tool <code>manage_mcp</code> fügt Server hinzu, listet, entfernt, startet neu, aktiviert und deaktiviert sie ohne Neustart. Hinzugefügte Server werden gespeichert und beim Start neu geladen. Befehle sind auf <code>npx</code>, <code>uvx</code>, <code>node</code>, <code>python</code> und <code>python3</code> beschränkt. Eine Secret-Variable wird mit <code>set_env</code> an einen Schlüsselbund-Eintrag namens <code>mcp_&lt;server&gt;_&lt;KEY&gt;</code> gebunden, den du mit <code>aidaemon keychain set</code> speicherst. In einer Projekt-Unterhaltung starten <code>project_list</code>, <code>project_start</code> und <code>project_stop</code> Server aus der <code>.mcp.json</code> des Projekts, nur für dieses Projekt.</p>

${callout('info', 'Fehlerbehandlung', 'Schlägt der Start eines MCP-Servers oder das Auflisten seiner Tools fehl, wird der Fehler protokolliert, aber andere Server und eingebaute Tools arbeiten weiter.')}
`
  },
  {
    slug: '/mcp/configuration',
    section: 'MCP',
    title: 'MCP-Server-Konfiguration',
    description: 'MCP-Server in der AIDaemon-config.toml konfigurieren: stdio-Server, Umgebungsvariablen und schreibgeschützte Tools.',
    content: () => `
<h1>MCP-Server-Konfiguration</h1>
<p class="lead">Jeder MCP-Server wird als benannter Abschnitt unter <code>[mcp]</code> in config.toml definiert.</p>

<h2>Konfigurationsformat</h2>
${codeBlock(`[mcp.<server-name>]
command = "<executable>"
args = ["arg1", "arg2", ...]
env = { KEY = "value" }
read_only_tools = ["search"]`, 'toml')}

${configTable([
  ['command', 'string', '—', 'Ausführbare Datei oder Skript, mit dem der MCP-Server gestartet wird'],
  ['args', 'array', '[]', 'An den Befehl übergebene Argumente'],
  ['env', 'table', '{}', 'Umgebungsvariablen für den Server (sonst werden nur sichere geerbt)'],
  ['read_only_tools', 'array', '[]', 'Tools, die du als schreibgeschützt deklarierst, nach ihrem Namen in tools/list; ihre Aufrufe brauchen keine Genehmigung'],
])}

<h2>Entdeckungsprozess</h2>
<ol>
  <li>Starte für jeden Abschnitt <code>[mcp.*]</code> den Prozess mit dem konfigurierten Befehl und den Argumenten</li>
  <li>Initialisiere die JSON-RPC-Verbindung (Protokoll-Handshake)</li>
  <li>Rufe <code>tools/list</code> auf, um die verfügbaren Tools aufzuzählen</li>
  <li>Biete jedes Tool dem Modell als <code>&lt;server&gt;__&lt;tool&gt;</code> mit der Beschreibung und dem Eingabeschema des Servers an</li>
  <li>Protokolliere Fehler pro Server, ohne global zu scheitern</li>
</ol>
<p>Server können auch hinzugefügt werden, während AIDaemon läuft, mit dem Tool <code>manage_mcp</code>. Siehe <a href="/mcp">MCP-Überblick</a>.</p>

<h2>Beispiele</h2>

<h3>Dateisystemzugriff</h3>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]`, 'toml')}

<h3>Websuche</h3>
${codeBlock(`[mcp.brave-search]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-brave-search"]
env = { BRAVE_API_KEY = "…" }`, 'toml')}
<p>Um den Schlüssel aus config.toml herauszuhalten, binde ihn mit <code>manage_mcp</code> <code>set_env</code> an einen Schlüsselbund-Wert (ein Schlüsselbund-Eintrag namens <code>mcp_&lt;server&gt;_&lt;KEY&gt;</code>, den du mit <code>aidaemon keychain set</code> speicherst).</p>

<h3>Eigener Python-Server</h3>
${codeBlock(`[mcp.my-server]
command = "python3"
args = ["/path/to/my_mcp_server.py"]`, 'toml')}

${callout('info', 'Stderr-Protokollierung', 'Die stderr-Ausgabe von MCP-Servern wird von AIDaemon zum Debuggen erfasst und protokolliert. Prüfe die Daemon-Logs, wenn ein Server nicht funktioniert.')}

<h2>Bedrohungserkennung</h2>
<p>AIDaemon führt eine reine Audit-Bedrohungserkennung für MCP-Tool-Aufrufe durch. Verdächtige Muster werden protokolliert, <strong>blockieren die Ausführung aber nicht</strong>. Davon getrennt durchläuft jeder MCP-Aufruf die normale Genehmigungsrichtlinie, und seine Ausgabe gilt als nicht vertrauenswürdig.</p>

<h3>Verdächtige Argumentmuster</h3>
<ul>
  <li><strong>Dateizugriff:</strong> <code>/etc/passwd</code>, <code>/etc/shadow</code>, <code>.ssh/</code>, <code>.env</code></li>
  <li><strong>Konfiguration/Secrets:</strong> <code>config.toml</code>, <code>aidaemon.db</code>, <code>api_key</code>, <code>bot_token</code>, <code>encryption_key</code></li>
  <li><strong>Netzwerk:</strong> <code>curl</code>, <code>wget</code>, <code>nc</code>, <code>base64</code></li>
  <li><strong>Codeausführung:</strong> <code>eval(</code>, <code>exec(</code>, <code>| sh</code>, <code>| bash</code></li>
  <li><strong>Destruktiv:</strong> <code>; rm </code>, <code>chmod 777</code></li>
</ul>

<h3>Verdächtige Ausgabemuster</h3>
<ul>
  <li>Mögliche API-Schlüssel: Präfixe <code>sk-</code>, <code>ghp_</code></li>
  <li>Private Schlüssel: <code>-----BEGIN</code>, <code>PRIVATE KEY</code></li>
  <li>Sensible Begriffe: <code>password</code>, <code>bot_token</code></li>
</ul>

${callout('warn', 'Nur Audit', 'Die Bedrohungserkennung ist informativ — sie protokolliert Warnungen, blockiert aber keine Tool-Ausführung. Prüfe deine Daemon-Logs auf markierte Muster.')}
`
  },
  {
    slug: '/triggers',
    section: 'Triggers',
    title: 'E-Mail-Trigger',
    description: 'E-Mail-Postfächer mit IMAP IDLE überwachen und den AIDaemon-Agenten bei neuen Nachrichten automatisch auslösen.',
    content: () => `
<h1>E-Mail-Trigger</h1>
<p class="lead">Überwache deinen Posteingang mit IMAP IDLE und löse den Agenten bei neuen E-Mails aus.</p>

<h2>So funktioniert es</h2>
<ol>
  <li>AIDaemon verbindet sich per TLS mit dem konfigurierten IMAP-Server</li>
  <li>Wählt den konfigurierten Ordner (Standard: INBOX)</li>
  <li>Wechselt in den IMAP-IDLE-Modus — eine dauerhafte Verbindung, die auf neue Nachrichten wartet</li>
  <li>Trifft eine neue E-Mail ein, ruft er den Umschlag ab (Betreff, Absender)</li>
  <li>Erstellt ein Event und sendet es über den internen Event-Bus. Der Mailtext wird bereinigt und in einen Hinweis eingewickelt, der den Agenten anweist, nicht ohne deine Genehmigung darauf zu handeln.</li>
  <li>Der Agent behandelt das Event als nicht vertrauenswürdige Nachricht und sendet seine Antwort an die Chats der Owner: die erlaubten Benutzer deiner ersten Telegram-, Discord- und Slack-Bots.</li>
</ol>

<h2>Konfiguration</h2>
${codeBlock(`[triggers.email]
host = "imap.gmail.com"
port = 993
username = "you@gmail.com"
password = "keychain"   # or "\${AIDAEMON_EMAIL_PASSWORD}"
folder = "INBOX"`, 'toml', 'config.toml')}

${configTable([
  ['host', 'string', '&mdash;', 'Hostname des IMAP-Servers'],
  ['port', 'integer', '&mdash;', 'IMAP-Port (normalerweise 993)'],
  ['username', 'string', '&mdash;', 'Benutzername des Postfachs'],
  ['password', 'string', '&mdash;', 'Passwort des Postfachs. Unterstützt <code>"keychain"</code> und <code>$&#123;ENV&#125;</code>.'],
  ['folder', 'string', 'INBOX', 'Zu überwachender Ordner'],
])}

${callout('warn', 'Gmail-App-Passwörter', 'Erzeuge für Gmail mit 2FA ein app-spezifisches Passwort unter <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener">myaccount.google.com/apppasswords</a>.')}

<h2>Event-Format</h2>
${codeBlock(`Event {
    source: "email",
    session_id: "email_trigger",
    content: "New email from sender@example.com: Subject line here"
}`, 'rust')}

<h2>Event-Bus</h2>
<p>Trigger nutzen einen Tokio-Broadcast-Channel, um Events zuzustellen. Der Agent lauscht am Empfängerende und verarbeitet jedes Event als neue Nachricht in einer eigenen Sitzung. Unter hoher Last können nicht vertrauenswürdige Trigger-Events verworfen werden, statt unbegrenzt in eine Warteschlange zu kommen.</p>

${callout('danger', 'Nicht vertrauenswürdige Sitzungen', 'E-Mail-Trigger-Sitzungen werden als <strong>nicht vertrauenswürdig</strong> markiert. Jeder Terminal-Befehl in diesen Sitzungen erfordert deine Genehmigung, was auch immer du zuvor erlaubt hast.')}

<h2>Wiederverbindung</h2>
<p>Bricht die IMAP-Verbindung ab, wartet AIDaemon 30 Sekunden und verbindet sich automatisch neu.</p>
`
  },
  {
    slug: '/skills',
    section: 'Skills',
    title: 'Skills-System',
    description: 'Skills sind Markdown-Anweisungen, die der Agent mit use_skill lädt, wenn eine Aufgabe sie braucht oder wenn du einen nennst.',
    content: () => `
<h1>Skills-System</h1>
<p class="lead">Skills sind Markdown-Dateien mit Anweisungen für eine Art von Aufgabe. Der Agent sieht eine Liste verfügbarer Skills und lädt den, den eine Aufgabe braucht, mit dem Tool <code>use_skill</code>. Du kannst auch einen Skill beim Namen verlangen.</p>

<h2>Konfiguration</h2>
${codeBlock(`[skills]
enabled = true
dir = "skills"      # relative to config.toml's folder
registries = []     # URLs of skill registry manifests for browse/install`, 'toml', 'config.toml')}

<h2>Wo Skills liegen</h2>
<ul>
  <li><strong>Deine Skills</strong> &mdash; das Skills-Verzeichnis (<code>skills/</code> neben config.toml), als <code>&lt;name&gt;.md</code> oder als Ordner <code>&lt;name&gt;/SKILL.md</code> mit zusätzlichen Dateien, die der Agent mit <code>skill_resources</code> liest</li>
  <li><strong>Projekt-Skills</strong> &mdash; bis zu 50 Skills aus <code>.agents/skills/&lt;name&gt;/SKILL.md</code> und <code>.claude/skills/&lt;name&gt;/SKILL.md</code> des Projekts. Sie leiten nur die Arbeit in diesem Projekt an und gewähren keine zusätzlichen Rechte. Bei einem Namenskonflikt gewinnt dein eigener Skill.</li>
</ul>

<h2>Format der Skill-Datei</h2>
<p>Skills sind Markdown-Dateien mit YAML-ähnlichem Frontmatter:</p>
${codeBlock(`---
name: Code Review
description: Provides code review guidelines
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
  ['description', 'string', '—', 'Kurzbeschreibung (wird in der Liste Available Skills angezeigt, damit der Agent weiß, wann der Skill passt)'],
  ['triggers', 'string', '—', 'Optional. Für ältere Skills beibehalten; wird nicht mehr verwendet, um einen Skill zu aktivieren.'],
])}

<h2>Wie Skills aktiviert werden</h2>
<p>Ein Skill wird nur dann vorab geladen, wenn du ihn in deiner Nachricht nennst:</p>
<ul>
  <li><code>$skill-name</code></li>
  <li><code>skill:skill-name</code></li>
  <li><code>use skill skill-name</code></li>
  <li>&bdquo;the skill-name skill&ldquo;</li>
</ul>
<p>Andernfalls wählt das Modell aus der Liste Available Skills und ruft <code>use_skill</code> auf, wenn ein Skill eindeutig zur Aufgabe passt. Schlüsselwörter in deiner Nachricht aktivieren keine Skills.</p>

<h2>Im Prompt</h2>
<ol>
  <li><strong>Available Skills</strong> — der Name und die Beschreibung jedes Skills, Teil des festen Kern-Prompts des Agenten</li>
  <li><strong>Geladene Skills</strong> — der vollständige Text jedes verwendeten Skills, dem Kontext dieses Durchgangs hinzugefügt. Der Skill-Text wird zuvor bereinigt.</li>
</ol>
<p>Der Speicher (Fakten, Episoden und so weiter) hat einen eigenen Abschnitt und gehört nicht zum Skills-Block.</p>

<h2>Dynamische Skills</h2>
<p>Über selbst geschriebene Skill-Dateien hinaus unterstützt AIDaemon die Skill-Verwaltung zur Laufzeit über das Tool <code>manage_skills</code> und optionale Registries.</p>

<h3>Aktionen des Tools manage_skills</h3>
<table class="config-table">
<thead><tr><th>Aktion</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>add</code></td><td>Einen Skill von einer URL abrufen</td></tr>
<tr><td><code>add_inline</code></td><td>Rohen Markdown-Inhalt als Skill parsen</td></tr>
<tr><td><code>list</code></td><td>Alle geladenen Skills mit Metadaten zeigen</td></tr>
<tr><td><code>remove</code></td><td>Einen Skill per Namen löschen</td></tr>
<tr><td><code>remove_all</code></td><td>Mehrere Skills per Namen löschen</td></tr>
<tr><td><code>enable</code> / <code>disable</code></td><td>Einen Skill aktivieren oder deaktivieren</td></tr>
<tr><td><code>browse</code></td><td>Über die konfigurierten Registries hinweg suchen</td></tr>
<tr><td><code>install</code></td><td>Aus einer Registry installieren</td></tr>
<tr><td><code>update</code></td><td>Den Skill von der Quell-URL neu abrufen</td></tr>
<tr><td><code>review</code></td><td>Automatisch beförderte Skill-Entwürfe genehmigen oder verwerfen</td></tr>
</tbody>
</table>

<h3>Automatische Beförderung</h3>
<p>Eine Hintergrundaufgabe läuft alle 12 Stunden und macht aus Prozeduren, die viele Male funktioniert haben, Skill-Entwürfe. Entwürfe bleiben inaktiv, bis du sie mit <code>manage_skills</code> <code>review</code> genehmigst.</p>
`
  },
  {
    slug: '/scheduler',
    section: 'Scheduler',
    title: 'Geplante Aufgaben',
    description: 'Erinnerungen und geplante Arbeit in AIDaemon: set_reminder, schedule_task, manage_automations, Zeitpläne und Zeitzonen.',
    content: () => `
<h1>Geplante Aufgaben</h1>
<p class="lead">Erstelle wiederkehrende und einmalige Automatisierungen in normalen Worten oder mit Cron-Ausdrücken: Erinnerungen, die dir nur eine Nachricht schicken, und geplante Arbeit, die der Agent selbstständig erledigt.</p>

${callout('info', 'Automatisierungen und Zeitzonen', 'Frag in normalen Worten, und der Agent richtet es ein: <code>set_reminder</code> (eine <code>message</code> und ein <code>when</code>) für einfache Erinnerungen, die dir nur eine Nachricht schicken, und <code>schedule_task</code> für geplante Arbeit. Eine Uhrzeit oder ein wiederkehrender Zeitplan darf eine IANA-Zone nennen (&bdquo;jeden Werktag um 8 Uhr Europe/Madrid&ldquo;, &bdquo;2030-07-15 09:00 Asia/Tokyo&ldquo;) und folgt deren Sommerzeit; andernfalls gelten Zeiten in deiner eigenen Zone. Abkürzungen wie &bdquo;EST&ldquo; werden mit der Bitte um den IANA-Namen abgelehnt. Ein Lauf, der verpasst wurde, während der Daemon aus war, wird als Missed aufgezeichnet und zählt nie als Fehlschlag.')}

<h2>Tools</h2>
<table class="config-table">
<thead><tr><th>Tool</th><th>Zweck</th></tr></thead>
<tbody>
<tr><td><code>schedule_task</code></td><td>Geplante Arbeit: <code>task</code> (was jeder Lauf tut), <code>when</code> und ein optionales <code>name</code>. Du bestätigst sie auf einer <strong>Approve &amp; activate</strong>-Karte, bevor sie startet.</td></tr>
<tr><td><code>set_reminder</code></td><td>Nur eine Nachricht: <code>message</code>, <code>when</code> und ein optionales <code>name</code>. Wenn sie auslöst, läuft nichts anderes.</td></tr>
<tr><td><code>manage_automations</code></td><td>Automatisierungen ansehen, ändern oder stoppen (unten)</td></tr>
</tbody>
</table>
<p>Im Chat zeigt <code>/work</code> außerdem längere Arbeit, die wartet oder von selbst läuft, und <code>/status</code> zeigt den nächsten geplanten Eintrag.</p>

<h2>Aktionen von manage_automations</h2>
<table class="config-table">
<thead><tr><th>Aktion</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>list</code> / <code>show</code></td><td>Automatisierungen auflisten (geplant, beobachtend, Health-Checks) oder eine per Namen zeigen</td></tr>
<tr><td><code>history</code></td><td>Vergangene Läufe, einschließlich verpasster</td></tr>
<tr><td><code>edit</code></td><td><code>when</code>, <code>new_name</code>, <code>snooze_until</code> (nur den nächsten Lauf verschieben) oder <code>tell_me</code> ändern</td></tr>
<tr><td><code>pause</code> / <code>resume</code> / <code>cancel</code></td><td>Das Auslösen stoppen, wieder starten oder entfernen (eine oder mehrere)</td></tr>
<tr><td><code>run_now</code></td><td>Geplante Arbeit sofort ausführen</td></tr>
<tr><td><code>last_failure</code></td><td>Warum der letzte Lauf fehlgeschlagen ist</td></tr>
<tr><td><code>set_budget</code></td><td>Token-Budget pro Lauf (<code>budget_per_check</code>) und pro Tag (<code>budget_daily</code>)</td></tr>
<tr><td><code>update_instructions</code></td><td>Ändern, was spätere Läufe tun</td></tr>
<tr><td><code>bind_workspace</code></td><td>Das Projektverzeichnis festlegen, in dem seine Läufe arbeiten</td></tr>
</tbody>
</table>
<p><code>tell_me</code> legt fest, was dir geplante Arbeit mitteilt: <code>every_run</code>, nur <code>changes</code> oder nur <code>problems</code>.</p>

<h2>Zeitpläne in natürlicher Sprache</h2>
<p>Der Scheduler parst gängige Muster zu Cron-Ausdrücken:</p>

<table class="config-table">
<thead><tr><th>Eingabe</th><th>Cron</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td><code>hourly</code></td><td><code>0 * * * *</code></td><td>Jede Stunde um :00</td></tr>
<tr><td><code>daily</code></td><td><code>0 0 * * *</code></td><td>Jeden Tag um Mitternacht</td></tr>
<tr><td><code>weekly</code></td><td><code>0 0 * * 0</code></td><td>Jeden Sonntag um Mitternacht</td></tr>
<tr><td><code>monthly</code></td><td><code>0 0 1 * *</code></td><td>Am Ersten des Monats</td></tr>
<tr><td><code>every 5m</code></td><td><code>*/5 * * * *</code></td><td>Alle 5 Minuten (1&ndash;59)</td></tr>
<tr><td><code>every 2h</code></td><td><code>0 */2 * * *</code></td><td>Alle 2 Stunden (1&ndash;23)</td></tr>
<tr><td><code>daily at 9am</code></td><td><code>0 9 * * *</code></td><td>Jeden Tag um 9:00 Uhr</td></tr>
<tr><td><code>daily at 6am, 12pm, 6pm</code></td><td><code>0 6,12,18 * * *</code></td><td>Mehrmals am Tag (dieselbe Minute)</td></tr>
<tr><td><code>daily at 14:30</code></td><td><code>30 14 * * *</code></td><td>Jeden Tag um 14:30 Uhr</td></tr>
<tr><td><code>weekdays at 8:30</code></td><td><code>30 8 * * 1-5</code></td><td>Mo&ndash;Fr um 8:30 Uhr</td></tr>
<tr><td><code>weekends at 10am</code></td><td><code>0 10 * * 0,6</code></td><td>Sa&ndash;So um 10:00 Uhr</td></tr>
<tr><td><code>Monday and Friday at 9am</code></td><td><code>0 9 * * 1,5</code></td><td>Benannte Tage</td></tr>
<tr><td><code>in 2h</code>, <code>in 30m</code></td><td>(absolut berechnet)</td><td>Einmalig, löst einmal nach der Verzögerung aus</td></tr>
<tr><td><code>today at 6pm</code>, <code>tomorrow at 9am</code></td><td>(absolut berechnet)</td><td>Einmalig, zu dieser Zeit</td></tr>
<tr><td><code>2026-03-14 09:30</code></td><td>(absolut berechnet)</td><td>Einmalig, zu einem genauen Datum und einer genauen Uhrzeit (RFC 3339 funktioniert ebenfalls)</td></tr>
</tbody>
</table>

<p>Standardmäßige Cron-Ausdrücke mit 5 Feldern werden ebenfalls direkt akzeptiert (z. B. <code>0 9 * * 1-5</code>).</p>

<h2>Konfiguration</h2>
<p>Automatisierungen werden erstellt, indem du im Chat (oder in der App) fragst, und in der Datenbank gespeichert. Es gibt dafür keinen Abschnitt in config.toml; ein alter Abschnitt <code>[scheduler]</code> wird ignoriert. Der Scheduler prüft auf fällige Läufe im Heartbeat, alle <code>[heartbeat] tick_interval_secs</code> (Standard 30).</p>

<h2>Aufgabenspeicherung</h2>
<p>Automatisierungen werden in der Datenbank als Ziele mit Zeitplänen gespeichert. Zeilen aus der älteren Tabelle <code>scheduled_tasks</code> werden automatisch migriert.</p>

<h2>Verpasste Läufe</h2>
<p>Ein wiederkehrender Lauf, der fällig war, während der Daemon aus war, und für den es jetzt zu spät ist, wird übersprungen. Er wird in History als Missed aufgezeichnet, du erhältst einen Hinweis, und der Zeitplan geht zu seinem nächsten Lauf über. Ein einmaliger Eintrag läuft trotzdem verspätet.</p>

${callout('warn', 'Zugriff geplanter Arbeit', 'Geplante Arbeit läuft mit deinem Zugriff, sobald du sie auf der Bestätigungskarte genehmigst. Terminal-Befehle in diesen Läufen fragen nicht erneut, aber Befehle, die im Hintergrund weiterlaufen würden (detached), sind darin nie erlaubt.')}
`
  },
  {
    slug: '/router',
    section: 'Router',
    title: 'Modell-Routing',
    description: 'Wie AIDaemon ein Modell auswählt: Standard-, Smart- und Fast-Modelle, Fallbacks und /model-Overrides.',
    content: () => `
<h1>Modell-Routing</h1>
<p class="lead">Wie AIDaemon für jeden Durchgang ein Modell auswählt: dein Standardmodell für normale Arbeit, ein Smart-Modell, wenn ein Durchgang mehr braucht, ein Fast-Modell für Nebenaufgaben und Fallbacks, wenn ein Aufruf fehlschlägt.</p>

<h2>Modelleinstellungen</h2>
${codeBlock(`[provider.models]
default = "claude-sonnet-5-5"
fallback = ["claude-opus-5-5", "claude-haiku-5-5"]

# Older keys still work:
# primary = "claude-sonnet-5-5"   # read as default
# smart = "claude-opus-5-5"
# fast = "claude-haiku-5-5"`, 'toml', 'config.toml')}

${configTable([
  ['default', 'string', 'catalog', 'Das Hauptmodell, verwendet für normale Anfragen'],
  ['fallback', 'array', '[]', 'Modelle, die der Reihe nach probiert werden, wenn ein Aufruf fehlschlägt. Ist nichts gesetzt, werden smart und fast zu den Fallbacks.'],
  ['primary', 'string', '&mdash;', 'Älterer Name für <code>default</code>'],
  ['smart', 'string', 'catalog', 'Das stärkere Modell für Durchgänge, die mehr brauchen'],
  ['fast', 'string', 'catalog', 'Das schnelle, günstige Modell für Nebenaufgaben'],
])}
<p>Bei einem Anbieter, den AIDaemon kennt, wird jedes Modell, das du weglässt, aus seinem Katalog ergänzt, sodass ein API-Schlüssel allein dir ein Default-, ein Fast- und ein Smart-Modell gibt.</p>

<h2>Stufen</h2>
<table class="config-table">
<thead><tr><th>Stufe</th><th>Anwendungsfall</th><th>Katalogmodelle</th></tr></thead>
<tbody>
<tr><td><strong>Fast</strong></td><td>Speicherarbeit im Hintergrund und Helfer, die mit <code>model_tier: "fast"</code> gestartet werden</td><td>gpt-6-luna, claude-haiku-5-5, gemini-3.5-flash-lite</td></tr>
<tr><td><strong>Primary (default)</strong></td><td>Normale Unterhaltung und der Großteil der Arbeit mit Tools</td><td>gpt-6-sol, claude-sonnet-5-5, gemini-4-hydrogen</td></tr>
<tr><td><strong>Smart</strong></td><td>Durchgänge, die mehr brauchen: riskante Tools im Spiel oder ein erneuter Versuch nach einem fehlgeschlagenen</td><td>gpt-6-sol, claude-opus-5-5, gemini-4-argon</td></tr>
</tbody>
</table>
<p>Die obigen Katalogmodelle gelten für das ChatGPT-Abo, Anthropic und Google Gemini. Andere Anbieter (OpenAI-API, OpenRouter, xAI, DeepSeek, Moonshot) verwenden ein Modell für alle Stufen, sofern du nichts setzt; DeepSeek nutzt <code>deepseek-reasoner</code> als sein Smart-Modell.</p>

<h2>Wie ein Modell gewählt wird</h2>
<ol>
  <li>Ein in der App für diese Unterhaltung gewähltes Modell gewinnt.</li>
  <li>Dann ein mit <code>/model</code> gesetztes Modell.</li>
  <li>Ist dein Standardmodell ein Frontier-Modell (Claude, GPT-4 und neuer, Gemini 2.5 und neuer, Grok 3 und neuer oder die o-Serie von OpenAI), nutzt jeder Durchgang es. Überschreibe das mit <code>[policy] trust_tier = "guided"</code> oder <code>"autonomous"</code>.</li>
  <li>Andernfalls nutzt jeder Durchgang das Standardmodell und wechselt zum Smart-Modell, wenn die Tools im Spiel ein hohes Risiko tragen oder der letzte Versuch sofort fehlgeschlagen ist.</li>
</ol>
<p>Formulierung, Länge oder Schlüsselwörter deiner Nachricht spielen bei der Wahl keine Rolle. Das Fast-Modell wird nie vor deine Nachrichten gesetzt; es führt Nebenaufgaben wie die Speicherextraktion aus sowie Helfer, die der Agent mit <code>model_tier: "fast"</code> startet. Die Fallback-Modelle werden der Reihe nach probiert, wenn ein Aufruf fehlschlägt.</p>

<h2>Auto-Routing deaktivieren</h2>
<ul>
  <li>Sind alle Modelle gleich, wird das Routing automatisch deaktiviert</li>
  <li>Das Senden von <code>/model &lt;name&gt;</code> in einem beliebigen Chat (Telegram, Slack, Discord) legt ein Modell für alle Chats fest und schaltet das Routing aus</li>
  <li>Das Senden von <code>/auto</code> aktiviert das automatische Routing wieder</li>
</ul>
`
  },
  {
    slug: '/cost-tracking',
    section: 'Cost Tracking',
    title: 'Token-Nutzung & Budgets',
    description: 'Token-Nutzung pro Modell und Sitzung verfolgen, Token-Budgets pro Anfrage und pro Automatisierung festlegen und Statistiken mit /cost prüfen.',
    content: () => `
<h1>Token-Nutzung &amp; Kostenerfassung</h1>
<p class="lead">Verfolge den Token-Verbrauch pro Modell und Sitzung und halte die Ausgaben mit Token-Budgets pro Anfrage und pro Automatisierung im Rahmen. Prüfe Statistiken aus jedem Chat mit <code>/cost</code>.</p>

<h2>So funktioniert es</h2>
<ol>
  <li>Jeder Modellaufruf zeichnet Eingabe- und Ausgabe-Tokens in der SQLite-Tabelle <code>token_usage</code> auf</li>
  <li>Jeder Datensatz enthält: Modellname, Sitzungs-ID, Token-Anzahlen (einschließlich gecachter Eingabe) und Zeitstempel</li>
  <li>Es gibt kein globales Tageslimit. Jede Anfrage hat ein Token-Budget, das sich der Durchgang und jeder von ihm gestartete Helfer teilen</li>
  <li>Automatisierungen können auch eigene Budgets pro Lauf und pro Tag haben</li>
</ol>

<h2>Konfiguration</h2>
${configTable([
  ['subagents.task_token_budget', 'integer', '500000', 'Tokens, die eine Anfrage über den Durchgang und seine Helfer hinweg verbrauchen darf. <code>0</code> = unbegrenzt.'],
  ['state.daily_token_budget', 'integer', 'null', 'Ignoriert. Beibehalten, damit ältere Konfigurationen noch laden; das Setzen protokolliert eine Warnung.'],
])}

${codeBlock(`[subagents]
task_token_budget = 500000   # per request; 0 = unlimited`, 'toml', 'config.toml')}

<p>Bei 80 % des Budgets erhältst du eine Warnung. Ein Lauf, der noch Fortschritte macht, kann sein Budget bis zu 3 Mal erweitern, nie über 2.000.000 Tokens hinaus; andernfalls fasst der Agent zusammen und stoppt.</p>

<h2>Budgets für Automatisierungen</h2>
<p>Geplante Arbeit kann eigene Budgets haben, gesetzt mit <code>manage_automations</code> <code>set_budget</code>: <code>budget_per_check</code> (Tokens pro Lauf) und <code>budget_daily</code> (Tokens pro Tag). Tageszähler werden alle 24 Stunden zurückgesetzt. Hat ein Lauf ein eigenes Budget, gilt das Budget pro Anfrage nicht zusätzlich dazu.</p>

${callout('info', 'Gesamtausgaben begrenzen', 'AIDaemon erzwingt kein globales tägliches Token-Limit. Um die Gesamtausgaben zu begrenzen, lege bei deinem Anbieter ein Limit fest. Die Seite Providers in Settings der App zeigt, was jedes Konto verbraucht hat und was noch übrig ist, wo der Anbieter es meldet: die rollierenden Limits eines ChatGPT-Tarifs, das Guthaben eines OpenRouter-Schlüssels.')}

<h2>Der Befehl /cost</h2>
<p>Sende <code>/cost</code> in einem beliebigen Chat (<code>!cost</code> in Slack), um Nutzungsstatistiken anzusehen. Er ist nur für Owner.</p>
${codeBlock(`Token usage (last 24h):
  Input:  12,450 tokens
  Output: 8,230 tokens

Token usage (last 7d):
  Input:  87,320 tokens
  Output: 52,180 tokens

Top models (7d):
  claude-sonnet-5-5: 98,400 tokens
  claude-haiku-5-5: 41,100 tokens`, 'text')}
<p>Die fünf häufigsten Modelle der letzten 7 Tage werden aufgelistet.</p>

<h2>Datenbankschema</h2>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Automatisch hochzählender Primärschlüssel'],
  ['session_id', 'TEXT', '—', 'Welche Benutzer-/Chat-Sitzung den Aufruf gemacht hat'],
  ['model', 'TEXT', '—', 'Welches LLM-Modell verwendet wurde'],
  ['input_tokens', 'INTEGER', '—', 'An das Modell gesendete Tokens'],
  ['output_tokens', 'INTEGER', '—', 'Vom Modell erzeugte Tokens'],
  ['cached_input_tokens', 'INTEGER', 'null', 'Eingabe-Tokens, die aus dem Prompt-Cache des Anbieters bedient wurden'],
  ['cache_creation_input_tokens', 'INTEGER', 'null', 'In den Prompt-Cache geschriebene Eingabe-Tokens'],
  ['call_id', 'TEXT', 'null', 'Der Modellaufruf, zu dem dieser Datensatz gehört'],
  ['created_at', 'TEXT', 'now', 'UTC-Zeitstempel des Aufrufs'],
])}

<h2>Was erfasst wird</h2>
<ul>
  <li>Eingabe-Tokens (Kontext + Benutzernachricht) pro Modellaufruf und wie viele aus dem Prompt-Cache kamen</li>
  <li>Ausgabe-Tokens (Modellantwort) pro Modellaufruf</li>
  <li>Modellname für Aufschlüsselungen pro Modell</li>
  <li>Sitzungs-ID für die Erfassung pro Benutzer</li>
  <li>Zeitstempel für zeitfensterbezogene Abfragen (24 Std., 7 Tage)</li>
</ul>
`
  },
  {
    slug: '/architecture',
    section: 'Architecture',
    title: 'So funktioniert AIDaemon',
    description: 'Wie aus einer Nachricht eine Antwort wird: Channels, die Turn-Engine auf dem aidaemon-core-Kernel, die Hook-Kette, Modell-Failover, Receipts und Abschluss.',
    content: () => `
<h1>So funktioniert AIDaemon</h1>
<p class="lead">Eine Nachricht trifft in einem Channel ein, wird zu einem <em>Turn</em> (Durchgang), läuft auf einem kleinen Agent-Kernel, bis die Arbeit erledigt ist oder ein Limit sie stoppt, und die Antwort geht dorthin zurück, woher sie kam. Diese Seite folgt diesem Weg.</p>

<h2>Die Bausteine</h2>
<table class="config-table">
<thead><tr><th>Baustein</th><th>Code</th><th>Was er tut</th></tr></thead>
<tbody>
<tr><td><strong>Channels</strong></td><td><code>crates/aidaemon-channel-telegram</code>, <code>-slack</code>, <code>-discord</code>, <code>crates/aidaemon-client-gateway</code> (die App)</td><td>Nachrichten empfangen, prüfen, wer sprechen darf, Status, Genehmigungen und Antworten anzeigen</td></tr>
<tr><td><strong>Turn-Runner</strong></td><td><code>crates/aidaemon-channels</code></td><td>Eine Warteschlange pro Sitzung: Abbruchwörter, Deduplizierung, der Inaktivitäts-Watchdog, Live-Status und Antwortzustellung, auf jeder Plattform gleich</td></tr>
<tr><td><strong>Agent und Turn-Engine</strong></td><td><code>crates/aidaemon-runtime</code> (<code>agent/</code>, <code>turn/</code>, <code>engine/</code>)</td><td>Bereitet einen Turn vor, führt ihn auf dem Kernel aus, beurteilt, ob er erledigt ist</td></tr>
<tr><td><strong>Kernel</strong></td><td><code>crates/aidaemon-core</code></td><td>Die Schleife selbst: Modellaufruf, Tool-Aufrufe, Hooks, Receipts, Limits, Erkennung von Festhängern, Unterbrechen und Fortsetzen</td></tr>
<tr><td><strong>Anbieter</strong></td><td><code>crates/aidaemon-providers</code></td><td>OpenAI-kompatible, Anthropic-, Gemini- und ChatGPT-Abo-Backends, Modell-Routing</td></tr>
<tr><td><strong>Tools</strong></td><td><code>src/tools</code>, <code>crates/aidaemon-tools</code> und weitere</td><td>Was das Modell aufrufen kann; jedes deklariert seine Effekte und wie weit seiner Ausgabe zu trauen ist</td></tr>
<tr><td><strong>Event-Store</strong></td><td><code>crates/aidaemon-events</code></td><td>Nur anhängbarer Verlauf jedes Turns und das daraus gebaute Run-Ledger (siehe <a href="/event-sourcing">Event Sourcing</a>)</td></tr>
<tr><td><strong>Work</strong></td><td><code>crates/aidaemon-work</code></td><td>Ziele, Aufgaben, Zeitpläne, Automatisierungen, Checklisten, Health-Probes</td></tr>
<tr><td><strong>Speicher</strong></td><td><code>crates/aidaemon-memory</code></td><td>Fakten, Episoden, Prozeduren, Personen, Projektnotizen</td></tr>
<tr><td><strong>Heartbeat</strong></td><td><code>crates/aidaemon-runtime</code> (<code>heartbeat</code>)</td><td>Führt die Hintergrundjobs aus: geplante Ziele, Speicher-Lernen, Aufbewahrung, Bereinigung</td></tr>
</tbody>
</table>

<h2>Von der Nachricht zur Antwort</h2>
<ol>
  <li><strong>Empfangen.</strong> Der Channel autorisiert den Absender und versieht die Nachricht mit dessen Rolle (Owner, Gast oder öffentlich) und der Sichtbarkeit des Channels (privater Chat, intern oder öffentlich).</li>
  <li><strong>Einreihen.</strong> Der Turn-Runner reiht sie hinter einem bereits laufenden Turn in dieser Sitzung ein und zeigt eine Arbeitsanzeige.</li>
  <li><strong>Den Turn vorbereiten.</strong>
    <ul>
      <li>Die Benutzernachricht wird als Event gespeichert; ihre ID ist die Turn-ID.</li>
      <li>Eine Aufgabe startet.</li>
      <li>AIDaemon ermittelt allein aus expliziten Fakten, was dieser Turn tun darf: Rolle des Absenders, Channel, Sitzungsmodus (zum Beispiel <code>/readonly</code>), Konfiguration und jede Workspace-Freigabe. Danach bietet er nur die Tools an, die das erlaubt.</li>
      <li>Er wählt das Modell.</li>
      <li>Er baut den System-Prompt: Identität und Persona, passende Skills, bekannte Fakten, Projektanweisungen (<code>AGENTS.md</code> / <code>CLAUDE.md</code>) und was die Sitzung gerade tut.</li>
    </ul>
  </li>
  <li><strong>Auf dem Kernel ausführen.</strong> Der Kernel ruft das Modell auf. Verlangt das Modell Tools, führt er sie aus und ruft das Modell erneut auf. Tut es das nicht, fragt der Kernel die Stop-Hooks, ob die Antwort bestehen kann.</li>
  <li><strong>Abschließen.</strong> Das Run-Ledger prüft die Receipts des Turns gegen das, was die Anfrage brauchte, und prüft die Form der Antwort. Die Aufgabe endet als <code>succeeded</code>, <code>partial</code> oder <code>failed</code>.</li>
  <li><strong>Zustellen.</strong> Die Antwort geht an den Channel zurück, und ihre Zustellung wird aufgezeichnet. Das Lernen aus dem Turn geschieht später im Hintergrund.</li>
</ol>

<h2>Die Kernel-Schleife</h2>
<p>Jeder Durchlauf baut die Anfrage, ruft das Modell auf und führt die verlangten Tool-Aufrufe aus. Lesende Aufrufe laufen nebeneinander; Aufrufe, die etwas ändern, laufen nacheinander. Jeder Aufruf endet mit einem <strong>Receipt</strong>: <code>succeeded</code>, <code>failed</code>, <code>denied</code>, <code>timed_out</code>, <code>cancelled</code>, <code>skipped</code>, <code>unknown_tool</code>, <code>invalid_arguments</code>, <code>indeterminate</code> (der Prozess stoppte mitten im Aufruf) oder <code>answered</code> (ein Hook antwortete für das Tool). Receipts, nicht die Worte des Modells, zählen als erledigte Arbeit.</p>
<p>Für die eigenen Turns des Owners werden mit jedem Modellaufruf nur Kern-Tools gesendet. Die übrigen werden namentlich aufgelistet und geladen, wenn das Modell sie mit <code>load_tools</code> anfordert.</p>

<h2>Eine Hook-Kette beurteilt jeden Tool-Aufruf</h2>
<p>Jede Schutzvorkehrung ist ein Kernel-Hook, der die deklarierten Effekte eines Aufrufs beurteilt. Tools fragen nie den Owner und lehnen nie von sich aus aus Richtliniengründen ab. Die Reihenfolge ist fest:</p>
<ol>
  <li>Kanonische Form des Aufrufs (damit jeder spätere Hook den Aufruf beurteilt, der tatsächlich läuft)</li>
  <li>Autorität: Sind dieses Tool, dieser Pfad und diese Zugriffsstufe für diesen Turn erlaubt?</li>
  <li>Wächter gegen Wiederholung desselben Tools, Stopp durch das Run-Ledger, Token-Budget, Festhänger-Hinweis</li>
  <li>Speicher-Hooks</li>
  <li>Geschützte Pfade, Netzwerkwächter, Scan auf ausgehende Secrets</li>
  <li>Nicht vertrauenswürdiger Inhalt: Hat der Turn etwas gelesen, das der Owner nicht geschrieben hat, durchlaufen Aufrufe, die Daten nach außen senden, eine separate Prüfung</li>
  <li>Owner-Genehmigung (zuletzt, damit der Owner nur zu Aufrufen gefragt wird, die alles andere zulässt)</li>
  <li>Dispatch und Koordination mit den anderen Agenten, die an derselben Anfrage arbeiten</li>
</ol>

<h2>Limits</h2>
<p>Arbeit wird durch Fortschritt und Kosten begrenzt, nie durch ihre Dauer.</p>
<table class="config-table">
<thead><tr><th>Limit</th><th>Standard</th><th>Hinweise</th></tr></thead>
<tbody>
<tr><td>Modell-Durchgänge pro Lauf</td><td>150</td><td>Eine Absicherung; die harte Obergrenze des Kernels ist 1.000</td></tr>
<tr><td>Token-Budget pro Anfrage</td><td>500.000</td><td><code>[subagents] task_token_budget</code>, geteilt von der Anfrage und jedem von ihr gestarteten Sub-Agenten. Solange die Arbeit weiter gelingt, wächst es von selbst bis zu 3 Mal, nie über 2.000.000 hinaus; danach entscheidet der Owner. <code>0</code> schaltet es aus</td></tr>
<tr><td>Dasselbe Tool hintereinander</td><td>8</td><td>16 für Allzweck-Tools, 40 für schrittweise Tools wie Computer Use</td></tr>
<tr><td>Erkennung von Festhängern</td><td>3 Wiederholungen</td><td>Derselbe Aufruf mit demselben Ergebnis 3 Mal, dasselbe Tool 3 Mal fehlschlagend oder A/B/A/B-Ping-Pong über 6 Aufrufe. Das Modell bekommt einen Anstoß; nach 2 Anstößen stoppt der Lauf</td></tr>
<tr><td>Inaktivität</td><td>300 s</td><td><code>[daemon.watchdog]</code>: Ein Turn, der keinen Fortschritt mehr macht, wird abgebrochen. Jeder Modellaufruf hat sein eigenes Timeout von 300 s</td></tr>
</tbody>
</table>

<h2>Das Modell wählen und sich von Fehlern erholen</h2>
<p>Das angeheftete Modell einer Unterhaltung gewinnt, dann ein daemonweites <code>/model</code>. Ein Sub-Agent behält das Modell, mit dem er gestartet wurde. Andernfalls nutzt der Turn das Primary-Modell; der Router wählt nur für Modelle, denen autonomes Arbeiten nicht zugetraut wird, eine Stufe.</p>
<p>Jeder Modellaufruf durchläuft eine Failover-Kette: das gewählte Modell, dann die anderen Modelle des Routers, dann die Modelle jedes konfigurierten Failover-Anbieters.</p>
<table class="config-table">
<thead><tr><th>Fehler</th><th>Was passiert</th></tr></thead>
<tbody>
<tr><td><strong>Rate-Limit, Timeout, Netzwerk, Serverfehler</strong></td><td>Wiederholt mit Backoff (unter Beachtung von <code>retry_after</code>), dann das nächste Modell</td></tr>
<tr><td><strong>Fehlerhafte Anfrage</strong></td><td>Einmal ohne Medien wiederholen, einmal mit Standardoptionen, dann das nächste Modell</td></tr>
<tr><td><strong>Abrechnung</strong></td><td>Einmal mit kleinerem Ausgabelimit wiederholen, dann dieses Modell für 10 Minuten überspringen</td></tr>
<tr><td><strong>Authentifizierung oder aufgebrauchtes Kontingent</strong></td><td>Zum nächsten Anbieter wechseln; gemeldet werden das Kontingent und sein Reset-Zeitpunkt, falls alles fehlschlägt</td></tr>
<tr><td><strong>Modell nicht gefunden, unbekannter Fehler</strong></td><td>Nächstes Modell</td></tr>
<tr><td><strong>Kontext zu lang</strong></td><td>Die Kette stoppen; der Turn verdichtet seinen Verlauf und ruft erneut auf</td></tr>
</tbody>
</table>

${callout('info', 'Letzter bekannt guter Stand', 'Nach jedem erfolgreichen Modellaufruf wird die aktuelle Konfiguration nach <code>config.toml.lastgood</code> kopiert. Lässt sich <code>config.toml</code> später nicht laden, probiert AIDaemon <code>.lastgood</code>, dann <code>.bak</code>, <code>.bak.1</code> und <code>.bak.2</code>.')}

<h2>Wann ist ein Turn erledigt?</h2>
<p><strong>Evidenz schlägt Vertrag.</strong></p>
<ul>
  <li>Bevor es etwas ändert oder sendet, deklariert das Modell mit <code>track_requirements</code>, was die Anfrage braucht (siehe <a href="/plans">Pläne &amp; Checklisten</a>).</li>
  <li>Jeder Punkt wird nur durch ein passendes Receipt geschlossen. Solange ein Punkt offen ist und ein erlaubtes Tool ihn noch erledigen könnte, kann das Run-Ledger das Modell zu weiterer Arbeit zurückschicken, höchstens 2 zusätzliche Durchgänge.</li>
  <li>Ein Lauf, dessen Receipts alle erfolgreich waren, schließt als <code>succeeded</code>, selbst wenn der Plan die Arbeit nicht beschreiben konnte.</li>
  <li>Ein Punkt, den das Modell zurückstellt, überspringt oder fallen lässt, lässt den Lauf stoppen, aber die Aufgabe endet <code>partial</code>, nie <code>succeeded</code>. Dasselbe gilt für ein Modell, das <code>partial</code> oder <code>blocked</code> meldet, und für eine Anfrage, die eine Richtlinie abgelehnt hat.</li>
</ul>
<p>Einige weitere Prüfungen können ebenfalls einen zusätzlichen Durchgang verlangen, jede mit eigenem Budget:</p>
<ul>
  <li>Die Antwort ist leer, interner Text oder eingefügte Tool-Ausgabe.</li>
  <li>Der Lauf hat Code geändert und keinen Build und keinen Test ausgeführt.</li>
  <li>Mehrere Agenten haben Dateien geändert, und niemand hat das Ergebnis geprüft.</li>
  <li>Ein GUI-Klick wurde nie verifiziert.</li>
  <li>Eine Mandate-Entscheidung wurde nicht aufgezeichnet.</li>
</ul>

<h2>Korrektur der Nachrichtenreihenfolge</h2>
<p>Vor jedem Modellaufruf wird der Verlauf so korrigiert, dass ihn jeder Anbieter akzeptiert:</p>
<ol>
  <li>Aufeinanderfolgende Nachrichten derselben Rolle zusammenführen.</li>
  <li>Tool-Ergebnisse ohne passenden Tool-Aufruf und Tool-Aufrufe ohne Ergebnis entfernen.</li>
  <li>Erneut zusammenführen.</li>
  <li>Sicherstellen, dass der Verlauf mit einer Benutzer- oder Systemnachricht beginnt.</li>
</ol>
<p>Ein Lauf, der das Kontextfenster des Modells sprengt, wird verdichtet.</p>

<h2>Sitzungen</h2>
<table class="config-table">
<thead><tr><th>Quelle</th><th>Sitzungs-ID</th></tr></thead>
<tbody>
<tr><td>Telegram</td><td><code>{bot}:{chat_id}</code></td></tr>
<tr><td>Slack</td><td><code>slack:{channel_id}</code> oder <code>slack:{channel_id}:{thread_ts}</code></td></tr>
<tr><td>Discord</td><td><code>discord:ch:{channel_id}</code> oder <code>discord:dm:{user_id}</code>, bei einem benannten Bot mit dem Präfix <code>{bot}:</code></td></tr>
<tr><td>E-Mail-Trigger</td><td><code>email_trigger</code></td></tr>
<tr><td>Sub-Agent</td><td>Von der Eltern-Sitzung abgeleitet</td></tr>
</tbody>
</table>
<p>Vertrauen kommt nicht aus der Sitzungs-ID. Es kommt aus der Rolle des Absenders, der Sichtbarkeit des Channels und dem, was der Turn gelesen hat: Inhalt, den der Owner nicht geschrieben hat (Webseiten, Trigger-Eingaben, Nachrichten anderer Personen, MCP-Ergebnisse), markiert den Turn als nicht vertrauenswürdig.</p>

<h2>Neustarts</h2>
<p>Der Kernel legt jeden Lauf in derselben Datenbank als Checkpoint ab (<code>run_events</code>, <code>run_states</code>). Stoppt AIDaemon mitten in einem Chat-Turn, bekommt dieser Turn nach dem Neustart eine Fortsetzung. Ihm wird gesagt, welche Aufrufe liefen und möglicherweise Wirkung hatten oder nicht, und keiner davon wird erneut ausgeführt. Sub-Agenten im Hintergrund überstehen einen Neustart nicht; ihre Chats werden informiert.</p>
`
  },
  {
    slug: '/architecture/state',
    section: 'Architecture',
    title: 'Speicherung & Zustand',
    description: 'Eine SQLite-Datenbank, standardmäßig verschlüsselt: welches Crate welche Tabellen besitzt, der Arbeitsspeicher-Cache, Langzeitspeicher, Aufbewahrung und Backups.',
    content: () => `
<h1>Speicherung &amp; Zustand</h1>
<p class="lead">Alles, was AIDaemon behält, liegt in einer SQLite-Datei, standardmäßig im Ruhezustand verschlüsselt. Jedes Domain-Crate besitzt in dieser Datei seine eigenen Tabellen.</p>

<h2>Die Datenbank</h2>
<ul>
  <li><strong>Datei:</strong> <code>[state] db_path</code> (Standard <code>aidaemon.db</code>).</li>
  <li><strong>Verschlüsselung:</strong> SQLCipher, standardmäßig eingebaut. Existiert kein Schlüssel, wird einer in <code>.env</code> erzeugt, und eine vorhandene unverschlüsselte Datenbank wird automatisch migriert. <code>AIDAEMON_ALLOW_PLAINTEXT_DB=1</code> ist eine Notumgehung.</li>
  <li><strong>Modus:</strong> WAL-Journal und ein Pool aus 10 Verbindungen, die sich einen Seiten-Cache teilen (<code>[state] sqlite_cache_mib</code>, Standard 64).</li>
  <li><strong>Backups beim Upgrade:</strong> Startet eine neue Version auf einer bestehenden Datenbank, schreibt sie zuerst eine konsistente Kopie nach <code>backups/</code> daneben und behält die neuesten <code>[state] upgrade_backups</code> (Standard 2; <code>0</code> schaltet das aus).</li>
</ul>

<h2>Wem welche Tabellen gehören</h2>
<table class="config-table">
<thead><tr><th>Bereich</th><th>Haupttabellen</th><th>Besitzer</th></tr></thead>
<tbody>
<tr><td>Unterhaltungs- und Aufgabenverlauf</td><td><code>events</code>, <code>task_lifecycle</code>, <code>session_context_boundaries</code>, <code>history_message_index</code> / <code>history_message_fts</code> (Suche)</td><td><code>aidaemon-events</code>, <code>aidaemon-runtime</code></td></tr>
<tr><td>Kernel-Lauf-Checkpoints</td><td><code>run_events</code>, <code>run_states</code></td><td><code>aidaemon-store-sqlite</code></td></tr>
<tr><td>Ziele, Aufgaben, Zeitpläne, Mandate, Checklisten</td><td><code>goals</code>, <code>tasks</code>, <code>goal_schedules</code>, <code>goal_runs</code>, <code>mandates</code>, <code>task_plans</code>, <code>notification_queue</code></td><td><code>aidaemon-work</code></td></tr>
<tr><td>Langzeitspeicher</td><td><code>facts</code>, <code>episodes</code>, <code>procedures</code>, <code>error_solutions</code>, <code>people</code>, <code>person_facts</code>, <code>memory_*</code></td><td><code>aidaemon-memory</code></td></tr>
<tr><td>Health-Probes</td><td><code>health_probes</code>, <code>probe_results</code>, <code>probe_alerts</code></td><td><code>aidaemon-work</code> (nur mit <code>[health] enabled</code>)</td></tr>
<tr><td>Terminal-Genehmigungen</td><td><code>terminal_backend_allowed_prefixes</code>, <code>terminal_capability_grants</code></td><td><code>aidaemon-runtime</code></td></tr>
<tr><td>Token-Nutzung</td><td><code>token_usage</code>, <code>token_usage_daily</code></td><td><code>aidaemon-runtime</code></td></tr>
<tr><td>Laufzeitkonfiguration</td><td><code>settings</code>, <code>dynamic_bots</code>, <code>dynamic_mcp_servers</code>, <code>dynamic_skills</code>, <code>oauth_connections</code></td><td><code>aidaemon-runtime</code></td></tr>
<tr><td>App-Clients</td><td><code>client_events</code>, <code>client_devices</code>, <code>client_pairing</code></td><td><code>aidaemon-store-sqlite</code></td></tr>
</tbody>
</table>
<p>Ältere Datenbanken werden beim Start aktualisiert: Die alte Tabelle <code>messages</code> wandert in <code>events</code>, und die alte Tabelle <code>scheduled_tasks</code> wandert in Ziele und Ziel-Zeitpläne. Beide alten Tabellen werden danach gelöscht.</p>

<h2>Unterhaltungsverlauf</h2>
<p>Die Tabelle <code>events</code> ist die einzige Aufzeichnung einer Unterhaltung (siehe <a href="/event-sourcing">Event Sourcing</a>). Die jüngsten Nachrichten jeder Sitzung werden zusätzlich im Speicher gecacht, begrenzt auf <code>[state] working_memory_cap</code> (Standard 50), und nach einem Neustart aus den Events neu gefüllt. <code>/clear</code> zeichnet eine Grenze auf, sodass spätere Turns frisch beginnen, ohne etwas zu löschen; <code>/wipe</code> löscht den Verlauf der Sitzung wirklich.</p>

<h2>Langzeitspeicher</h2>
<p>Mit dem Standard <code>[memory] backend = "daemon"</code> liegt der Speicher in derselben Datenbank:</p>
<ul>
  <li>Fakten, bei denen ältere Versionen ersetzt statt überschrieben werden.</li>
  <li>Episoden, die vergangene Sitzungen zusammenfassen.</li>
  <li>Prozeduren und Fehlerlösungen, die aus abgeschlossener Arbeit gelernt wurden.</li>
  <li>Personen.</li>
</ul>
<p>Der Abruf sortiert nach Bedeutung, Wörtern, Aktualität, Konfidenz und Quelle. Die jüngsten Fakten, bis zu <code>[state] max_facts</code> (Standard 20), gehen in den System-Prompt. Embeddings werden lokal mit fastembed berechnet (<code>[memory] embedding_model</code>, Standard <code>AllMiniLML6V2Q</code>); ein Modellwechsel bettet den Speicher im Hintergrund neu ein. Notizen aus Unterhaltungen in einem Projekt werden als Dateien unter <code>~/.aidaemon/projects</code> abgelegt, getrennt vom persönlichen Speicher. Hintergrund-Speicherjobs laufen alle <code>[state] consolidation_interval_hours</code> (Standard 6). Siehe <a href="/tools/memory">Speicher</a>.</p>

<h2>Aufbewahrung</h2>
<p>Ein täglicher Job entfernt alte Zeilen gemäß <code>[state.retention]</code>. Jeder Wert ist in Tagen; <code>0</code> behält Zeilen für immer. Es wird nur Verlauf gelöscht, aus dem der Speicher bereits gelernt hat.</p>
${configTable([
  ['messages_days', 'integer', '90', 'Unterhaltungs-Events (Aufgabenstart/-ende, Benutzer- und Assistentennachrichten)'],
  ['diagnostic_events_days', 'integer', '7', 'Tool-, Modellaufruf- und andere Diagnose-Events'],
  ['superseded_facts_days', 'integer', '90', 'Alte Versionen von Fakten'],
  ['token_usage_aggregate_days', 'integer', '30', 'Rohe Token-Zeilen, zuvor zu Tagessummen zusammengefasst'],
  ['episodes_days', 'integer', '365', 'Episoden, die nie abgerufen wurden'],
  ['behavior_patterns_days', 'integer', '90', 'Muster an der Konfidenz-Untergrenze'],
  ['goals_days', 'integer', '180', 'Abgeschlossene oder aufgegebene Ziele'],
  ['procedures_days', 'integer', '180', 'Prozeduren, die nie erfolgreich waren'],
  ['error_solutions_days', 'integer', '90', 'Fehlerlösungen, die mehr geschadet als genützt haben'],
])}
`
  },
  {
    slug: '/service-install',
    section: 'Service',
    title: 'Als Dienst betreiben',
    description: 'aidaemon bei der Anmeldung mit aidaemon service install ausführen (launchd, systemd-Benutzereinheit, Windows-Anmeldeaufgabe) oder als systemweiten Dienst.',
    content: () => `
<h1>Dienstinstallation</h1>
<p class="lead">Lass aidaemon im Hintergrund laufen, gestartet bei der Anmeldung.</p>

<h2>Für diesen Benutzer (empfohlen)</h2>
${codeBlock(`aidaemon service install      # this user, at login, from ~/.aidaemon (--dir to change); starts it now
aidaemon service uninstall`, 'bash')}
<p>Es sind keine Administratorrechte nötig. Das ist es, was <strong>Run it here</strong> der App beim ersten Start tut: ein launchd-Agent unter macOS, eine systemd-Benutzereinheit unter Linux (Lingering wird eingeschaltet, damit sie deine Anmeldesitzung überlebt) und eine Anmeldeaufgabe unter Windows. Der macOS-App-Download führt den Daemon stattdessen aus dem Inneren von <code>AIdaemon.app</code> aus.</p>

<h2>Systemweit (Legacy)</h2>
${codeBlock(`./aidaemon install-service`, 'bash')}

<p><code>install-service</code> schreibt unter Linux weiterhin die systemweite Unit (braucht sudo) oder unter macOS den Launch Agent und gibt die Befehle zum Starten aus; selbst startet es nichts. Unter Windows ist es nicht verfügbar: Verwende <code>aidaemon service install</code>. Es erkennt die Plattform automatisch:</p>

<h2>Linux (systemd)</h2>
<p>Erstellt <code>/etc/systemd/system/aidaemon.service</code>:</p>
${codeBlock(`[Unit]
Description=aidaemon - AI personal daemon
After=network.target

[Service]
Type=simple
ExecStart=/full/path/to/aidaemon
WorkingDirectory=/path/to/config/dir
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target`, 'ini', 'aidaemon.service')}

<p>Es gibt die Befehle zum Aktivieren und Starten aus; führe sie selbst aus:</p>
${codeBlock(`sudo systemctl daemon-reload
sudo systemctl enable --now aidaemon`, 'bash')}

<h2>macOS (launchd)</h2>
<p>Kopiert die Binärdatei in eine signierte <code>~/Applications/aidaemon.app</code> (damit macOS-Berechtigungen Rebuilds überstehen; der App-Download nutzt stattdessen seinen eigenen signierten Helper) und erstellt <code>$HOME/Library/LaunchAgents/ai.aidaemon.plist</code>:</p>
${codeBlock(`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>ai.aidaemon</string>
    <key>ProgramArguments</key>
    <array>
        <string>/Users/you/Applications/aidaemon.app/Contents/MacOS/aidaemon</string>
    </array>
    <key>WorkingDirectory</key>
    <string>/path/to/config/dir</string>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/dev/null</string>
    <key>StandardErrorPath</key>
    <string>/Users/you/Library/Logs/aidaemon/stderr.log</string>
</dict>
</plist>`, 'xml', 'ai.aidaemon.plist')}

<p>Lade sie dann und gewähre aidaemon Bedienungshilfen und Bildschirmaufnahme, wenn du Computer Use verwendest:</p>
${codeBlock(`launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/ai.aidaemon.plist`, 'bash')}

${callout('info', 'macOS-Ruhezustand', 'Unter macOS hält der Daemon den Mac im Betrieb vom Ruhezustand ab (er startet dafür selbst <code>caffeinate -i</code>). Verpacke die Binärdatei in der plist nicht in <code>caffeinate</code>: Das zerstört die Berechtigungen, die Computer Use braucht.')}

<h2>Logs</h2>
<p>Ein im Hintergrund laufender Daemon schreibt ein größenrotiertes, nur für den Owner lesbares Log nach <code>~/Library/Logs/aidaemon/stdout.log</code> unter macOS und <code>~/.local/state/aidaemon/stdout.log</code> anderswo (unter <code>$XDG_STATE_HOME</code>, wenn gesetzt). Setze <code>AIDAEMON_LOG_DIR</code>, um den Ordner zu ändern. Unter Linux zeigt <code>journalctl --user -u aidaemon</code>, warum der Dienst gestoppt wurde.</p>

<h2>Health-Check</h2>
<p>Sobald er als Dienst läuft, prüfe das mit:</p>
${codeBlock(`curl http://127.0.0.1:8080/health
# {"status": "ok", "components": {"database": {...}, "provider": {...}}}`, 'bash')}

<p>Der Health-Endpunkt wird auf <code>[daemon] health_bind</code>:<code>health_port</code> bereitgestellt (Standard <code>127.0.0.1:8080</code>). Er antwortet mit <code>200</code> und <code>"ok"</code> oder mit <code>503</code> und <code>"degraded"</code>, wenn die Datenbank nicht antwortet oder der Modellanbieter nicht verfügbar ist. Die vollständige Antwort findest du unter <a href="/health-monitoring">Gesundheitsüberwachung</a>.</p>
`
  },
  {
    slug: '/event-sourcing',
    section: 'Event Sourcing',
    title: 'Event-System',
    description: 'Die nur anhängbare Tabelle events: was AIDaemon aufzeichnet, das daraus gebaute Run-Ledger und wie Lernen und Aufbewahrung sie nutzen.',
    content: () => `
<h1>Event Sourcing</h1>
<p class="lead">Jeder Turn wird als nur anhängbare Folge von Events in der Tabelle <code>events</code> aufgezeichnet. Der Unterhaltungsverlauf, das Ergebnis der Aufgabe und das Ledger, das beurteilt, ob Arbeit erledigt wurde, werden alle aus diesen Events gelesen.</p>

<h2>Was aufgezeichnet wird</h2>
<table class="config-table">
<thead><tr><th>Gruppe</th><th>Event-Typen</th></tr></thead>
<tbody>
<tr><td><strong>Unterhaltung</strong></td><td><code>user_message</code>, <code>assistant_response</code>, <code>response_delivery</code> (der Fortschritt der Antwort durch den Channel)</td></tr>
<tr><td><strong>Aufgaben</strong></td><td><code>task_start</code>, <code>task_end</code> (Status und Ergebnis)</td></tr>
<tr><td><strong>Tools</strong></td><td><code>tool_call</code>, <code>tool_result</code></td></tr>
<tr><td><strong>Modellaufrufe</strong></td><td><code>llm_call</code> (Latenz- und Token-Telemetrie)</td></tr>
<tr><td><strong>Abschluss</strong></td><td><code>task_contract_compiled</code>, <code>executor_expectations_declared</code> (die Checkliste des Modells), <code>background_continuation_linked</code></td></tr>
<tr><td><strong>Richtlinien und Diagnose</strong></td><td><code>policy_decision</code>, <code>decision_point</code>, <code>policy_metrics_snapshot</code>, <code>memory_policy_compiled</code>, <code>user_constraint_violation</code>, <code>thinking_start</code>, <code>error</code></td></tr>
<tr><td><strong>Warten auf eine Person</strong></td><td><code>interaction_requested</code>, <code>interaction_resolved</code>, <code>approval_requested</code>, <code>approval_granted</code>, <code>approval_denied</code></td></tr>
<tr><td><strong>Ressourcen</strong></td><td><code>resource_registered</code>, <code>resource_invalidated</code></td></tr>
<tr><td><strong>Datei-Checkpoints</strong></td><td><code>checkpoint_created</code>, <code>checkpoint_finalized</code>, <code>checkpoint_skipped</code>, <code>rollback_started</code>, <code>rollback_completed</code>, <code>rollback_failed</code></td></tr>
<tr><td><strong>Sub-Agenten</strong></td><td><code>sub_agent_spawn</code>, <code>sub_agent_complete</code></td></tr>
<tr><td><strong>Sitzungen</strong></td><td><code>session_start</code>, <code>session_end</code></td></tr>
</tbody>
</table>

<h2>Event-Struktur</h2>
${codeBlock(`CREATE TABLE events (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id      TEXT NOT NULL,
    event_type      TEXT NOT NULL,  -- snake_case, e.g. "tool_result"
    data            TEXT NOT NULL,  -- JSON payload for that type
    created_at      TEXT NOT NULL,
    consolidated_at TEXT,           -- set once learning has used it
    task_id         TEXT,           -- the request this event belongs to
    tool_name       TEXT,           -- for tool events
    turn_id         TEXT            -- id of the user message that opened the turn
)`, 'sql')}

<h2>Was aus Events gebaut wird</h2>
<ul>
  <li><strong>Unterhaltungsverlauf.</strong> Die Nachrichten, die ein Modell sieht, werden aus Events gelesen, nach Turn gruppiert. Ein Volltextindex (<code>history_message_fts</code>) lässt den Agenten vergangene Unterhaltungen durchsuchen; ein stündlicher Job repariert ihn.</li>
  <li><strong>Aufgaben-Lebenszyklus.</strong> <code>task_lifecycle</code> hält eine Zeile pro Aufgabe (laufend oder abgeschlossen) und wird im selben Schreibvorgang wie das Event aktualisiert. So kann eine Aufgabe nur einmal enden, selbst wenn ein Watchdog, ein Abbruch und der normale Abschluss um die Wette laufen. Ein Job jede Minute schließt Aufgaben, die begonnen und nie geendet haben.</li>
  <li><strong>Das Run-Ledger.</strong> Das Run-Aggregat wird aus den Events einer Aufgabe neu aufgebaut: ihre Obligationen, ihre Receipts und ihr Urteil (<code>succeeded</code>, durch Evidenz erfolgreich, durch eine Richtlinienablehnung geschlossen, <code>failed</code> oder ausstehend). Es aus denselben Events neu aufzubauen, ergibt immer dieselbe Antwort.</li>
  <li><strong>Sitzungskontext.</strong> Eine Zusammenfassung dessen, was die Sitzung tut (laufende Aufgabe, jüngste Tools, Fehler, Genehmigungen, Sub-Agenten), geht in den System-Prompt.</li>
</ul>
<p>Der Kernel führt außerdem sein eigenes Journal pro Lauf (<code>run_events</code>, <code>run_states</code>), damit ein unterbrochener Lauf nach einem Neustart abgeschlossen werden kann.</p>

<h2>Aus Events lernen</h2>
<p>Alle <code>[state] consolidation_interval_hours</code> (Standard 6) lernen die Speicherjobs aus den Events abgeschlossener Sitzungen: Prozeduren aus Tool-Folgen, die funktioniert haben, Fehlerlösungen, Expertise und Fehlermuster. Ein täglicher Durchlauf tut dasselbe für jede Sitzung mit ungelernten Events, die älter als 7 Tage sind. Sitzungen, die isoliert sind, oder Aufgaben, deren Richtlinie automatischen Speicher verbietet, werden als behandelt markiert, ohne aus ihnen zu lernen. In beiden Fällen bekommen die Events eine Zeit <code>consolidated_at</code>, die sie für die Aufbewahrung zulässig macht.</p>

<h2>Aufbewahrung</h2>
<p>Nur der tägliche Aufbewahrungsjob löscht Events, und nur Events, die bereits mit <code>consolidated_at</code> markiert sind. Unterhaltungs-Events (Aufgabenstart/-ende, Benutzer- und Assistentennachrichten) werden 90 Tage aufbewahrt (<code>[state.retention] messages_days</code>). Tool-, Modellaufruf- und Diagnose-Events werden 7 Tage aufbewahrt (<code>diagnostic_events_days</code>). <code>0</code> behält sie für immer. <code>/wipe</code> löscht die Events einer Sitzung sofort.</p>

${callout('info', 'Nur anhängbar', 'Events werden nie umgeschrieben, außer <code>consolidated_at</code> und Annotationen, die einer Benutzernachricht hinzugefügt werden. Aufbewahrung und <code>/wipe</code> sind die einzigen Löschvorgänge.')}
`
  },
  {
    slug: '/plans',
    section: 'Plans',
    title: 'Pläne & Checklisten',
    description: 'Wie AIDaemon mit track_requirements deklariert, was eine Anfrage braucht, wie Receipts jeden Punkt schließen und wie die Checkliste entscheidet, ob eine Aufgabe erfolgreich war.',
    content: () => `
<h1>Pläne &amp; Checklisten</h1>
<p class="lead">Bevor er etwas ändert oder sendet, schreibt der Agent als Checkliste auf, was die Anfrage braucht. Jeder Punkt wird nur durch das Ergebnis eines echten Tool-Aufrufs abgehakt, und die Checkliste entscheidet, ob die Anfrage als erledigt gilt.</p>

<h2>Das Checklisten-Tool</h2>
<p>Das Modell ruft <code>track_requirements</code> vor seiner ersten Operation auf, wann immer eine Anfrage:</p>
<ul>
  <li>eine Datei, ein entferntes System, ein Deployment, einen Zeitplan oder eine Einstellung ändert, oder</li>
  <li>etwas sendet oder veröffentlicht.</li>
</ul>
<p>Eine Anfrage mit mehreren Operationen oder Zielen bekommt für jede einen Punkt. Jeder Aufruf übergibt die vollständige Liste, die die vorherige ersetzt. Änderst oder streichst du mitten im Lauf einen Teil der Arbeit, übergibt der Agent eine überarbeitete Liste.</p>
<table class="config-table">
<thead><tr><th>Punktfeld</th><th>Bedeutung</th></tr></thead>
<tbody>
<tr><td><code>text</code></td><td>Die Anforderung, so geschrieben, dass du sie lesen kannst (nennt zum Beispiel den Ordner, den sie anlegt)</td></tr>
<tr><td><code>status</code></td><td><code>pending</code>, <code>in_progress</code>, <code>completed</code>, <code>skipped</code>, <code>failed</code>, <code>deferred</code> oder <code>background</code> (ein Hintergrundjob wird ihn erledigen)</td></tr>
<tr><td><code>depends_on</code></td><td>Indizes von Punkten, die zuerst kommen müssen</td></tr>
<tr><td><code>owner_units</code></td><td>Welche nummerierten Teile deiner Anfrage dieser Punkt ausführt</td></tr>
<tr><td><code>mutation_effects</code></td><td>Welche Art von Änderung ihn belegt, etwa <code>local_workspace_write</code>, <code>repository_write</code>, <code>remote_deploy</code> oder <code>external_delivery</code></td></tr>
<tr><td><code>requires_observation</code></td><td>Ein Lesen oder eine Verifizierung belegt ihn</td></tr>
<tr><td><code>targets</code></td><td>Die genauen beteiligten Pfade, URLs oder Ressourcen-IDs</td></tr>
</tbody>
</table>
<p>Der Aufruf kann auch das Urteil des Modells tragen, <code>outcome</code>: <code>done</code>, <code>partial</code>, <code>blocked</code>, <code>needs_owner</code> (die Arbeit wartet auf deine Antwort) oder <code>nothing_new</code> (ein geplanter Lauf hat keine Änderung gefunden). Bei <code>partial</code> oder <code>blocked</code> kann <code>short_of</code> sagen, welche Maschinenressource ausgegangen ist (Speicherplatz, Docker-Speicherplatz oder Arbeitsspeicher).</p>

<h2>Wie Punkte geschlossen werden</h2>
<ul>
  <li>Ein Punkt mit Effekten, Zielen oder einer Beobachtung wird durch das Receipt des Tool-Aufrufs geschlossen, der ihn ausgeführt hat, nie dadurch, dass das Modell ihn abhakt.</li>
  <li>Nur Punkte ohne all das werden von Hand als <code>completed</code> markiert.</li>
  <li>Solange ein erreichbarer Punkt offen ist, kann der Lauf zu weiterer Arbeit zurückgeschickt werden.</li>
  <li>Ein als <code>skipped</code>, <code>failed</code> oder <code>deferred</code> markierter oder aus der Liste gestrichener Punkt lässt den Lauf stoppen, wird aber als nicht erledigt gemeldet. Die Aufgabe endet dann <code>partial</code>, nie <code>succeeded</code>.</li>
  <li>Ein Modellurteil <code>partial</code> oder <code>blocked</code> begrenzt die Aufgabe auf <code>partial</code>. Receipts können ein behauptetes <code>done</code> herabstufen; nichts stuft die anderen beiden herauf.</li>
</ul>
<p>Das Bearbeiten der Checkliste macht aus Arbeit, die nicht stattfand, nie Arbeit, die stattfand.</p>

<h2>Wo sie angezeigt und wo sie aufbewahrt wird</h2>
<ul>
  <li><strong>Statuskarte.</strong> Die Checkliste erscheint auf der Live-Statuskarte in deinem Chat und in der App, einschließlich Hintergrundpunkten, die noch laufen.</li>
  <li><strong>Speicherung.</strong> Sie wird in der Tabelle <code>task_plans</code> gespeichert, sodass die Checkliste einer Aufgabe einen Neustart übersteht.</li>
  <li><strong>Lernen.</strong> Abgeschlossene Checklisten des letzten Tages fließen in das Prozedurlernen des Speichers ein.</li>
</ul>

<h2>Ziele, Zeitpläne und Automatisierungen</h2>
<p>Langlebigere Arbeit (Ziele mit Aufgaben, geplante Läufe, Mandate, die ein Ziel beobachten) lebt in <code>aidaemon-work</code>. Siehe <a href="/scheduler">Geplante Aufgaben</a> und <a href="/tools/sub-agents">Sub-Agenten</a>.</p>
`
  },
  {
    slug: '/health-monitoring',
    section: 'Health Monitoring',
    title: 'Gesundheitsüberwachung',
    description: 'Der /health-Endpunkt von AIDaemon, seine Watchdogs sowie HTTP-, TCP-, Befehls- und Datei-Probes für deine Dienste mit Ausfall-, Wiederherstellungs- und Latenzalarmen.',
    content: () => `
<h1>Gesundheitsüberwachung</h1>
<p class="lead">AIDaemon meldet seine eigene Gesundheit an einem lokalen Endpunkt und kann deine Dienste mit Health-Probes beobachten, die dich alarmieren, wenn etwas kaputtgeht.</p>

<h2>Die eigene Gesundheit von AIDaemon</h2>
${codeBlock(`curl http://127.0.0.1:8080/health`, 'bash')}
${codeBlock(`{
  "status": "ok",
  "components": {
    "database": { "status": "ready" },
    "provider": {
      "status": "ready",
      "last_call_at": "2026-11-19T15:02:11Z",
      "consecutive_failures": 0,
      "failure_kind": null,
      "provider_status": null
    }
  }
}`, 'json')}
<ul>
  <li><strong>Antwortcodes:</strong> <code>200</code> mit <code>"ok"</code>, wenn die Datenbank antwortet und der Modellanbieter nicht ausgefallen ist; andernfalls <code>503</code> mit <code>"degraded"</code>.</li>
  <li><strong>Kein Modellaufruf:</strong> Der Anbieterstatus wird aus jüngsten Modellaufrufen gelesen, nicht aus einer neuen Anfrage. <code>provider.status</code> ist <code>ready</code>, <code>recovering</code> (der letzte Aufruf schlug fehl), <code>stale</code> (kein Aufruf in 15 Minuten), <code>unknown</code> (noch keine Aufrufe) oder <code>unavailable</code>.</li>
  <li><strong>Wann er als nicht verfügbar gilt:</strong> Der jüngste Aufruf innerhalb von 15 Minuten schlug bei Authentifizierung, Abrechnung oder einem aufgebrauchten Kontingent fehl, oder 3 oder mehr Aufrufe in Folge schlugen fehl.</li>
  <li><strong>Adresse:</strong> bereitgestellt auf <code>[daemon] health_bind</code>:<code>health_port</code> (Standard <code>127.0.0.1:8080</code>). Mit <code>[daemon] dashboard_enabled</code> (dem Standard) bearbeitet derselbe Server auch OAuth-Callbacks.</li>
</ul>

<h2>Watchdogs</h2>
${configTable([
  ['stale_threshold_secs', 'integer', '300', 'Ein Turn, dessen Schleife so lange nicht mehr tickt, wird als hängend abgebrochen'],
  ['task_inactivity_timeout_secs', 'integer', '300', 'Eine Aufgabe ohne Tool- oder Modellaktivität in dieser Zeit gilt als hängend'],
  ['llm_call_timeout_secs', 'integer', '300', 'Timeout für einen Modellaufruf'],
  ['background_stall_secs', 'integer', '120', 'Ein Hintergrundbefehl ohne Fortschritt (CPU, I/O, Ausgabe) in dieser Zeit darf gestoppt werden'],
  ['background_max_runtime_secs', 'integer', '0', 'Optionale Obergrenze für einen Hintergrundbefehl; 0 bedeutet keine'],
])}
<p>Diese liegen unter <code>[daemon.watchdog]</code>. Nichts wird allein durch verstrichene Zeit begrenzt; Arbeit, die weiter Fortschritte macht, läuft weiter.</p>

<h2>Dienst-Probes</h2>
<p>Probes sind standardmäßig aus. Schalte sie mit <code>[health] enabled = true</code> ein.</p>
<table class="config-table">
<thead><tr><th>Typ</th><th>Ziel</th><th>Gesund, wenn</th></tr></thead>
<tbody>
<tr><td><code>http</code></td><td>URL</td><td>Der Status entspricht <code>expected_status</code> (Standard 200) und der Body enthält <code>expected_body</code>, falls gesetzt; die Latenz wird aufgezeichnet</td></tr>
<tr><td><code>port</code></td><td><code>host:port</code></td><td>Eine TCP-Verbindung wird geöffnet</td></tr>
<tr><td><code>command</code></td><td>Shell-Befehl (ausgeführt mit <code>sh -c</code>)</td><td>Der Exit-Code entspricht <code>expected_exit_code</code> (Standard 0)</td></tr>
<tr><td><code>file</code></td><td>Dateipfad</td><td>Die Datei existiert und ist neuer als <code>max_age_secs</code>, falls gesetzt</td></tr>
</tbody>
</table>

<h2>Konfiguration</h2>
${codeBlock(`[health]
enabled = true
tick_interval_secs = 30
result_retention_days = 7

[[health.probes]]
name = "API Server"
type = "http"
target = "https://api.example.com/health"
schedule = "every 5m"
consecutive_failures_alert = 3
latency_threshold_ms = 2000
config = { expected_status = 200, timeout_secs = 10 }

[[health.probes]]
name = "Database"
type = "port"
target = "localhost:5432"
schedule = "every 1m"`, 'toml', 'config.toml')}
<p><code>schedule</code> nimmt dieselben Formen wie geplante Aufgaben (<code>every 5m</code>, <code>daily at 9am</code> oder ein Cron mit 5 Feldern). Probes aus der Konfiguration werden per Namen synchron gehalten: Entfernst du eine aus der Datei, wird sie aus der Datenbank entfernt.</p>

<h3>Probe-Optionen (<code>config</code>)</h3>
${configTable([
  ['timeout_secs', 'integer', '10', 'Timeout in Sekunden'],
  ['expected_status', 'integer', '200', 'HTTP: erwarteter Statuscode'],
  ['expected_body', 'string', 'null', 'HTTP: Text, den der Body enthalten muss'],
  ['method', 'string', '"GET"', 'HTTP: Methode'],
  ['headers', 'table', '{}', 'HTTP: zusätzliche Header'],
  ['expected_exit_code', 'integer', '0', 'Befehl: erwarteter Exit-Code'],
  ['max_age_secs', 'integer', 'null', 'Datei: maximales Alter'],
])}

<h2>Alarme</h2>
<ul>
  <li><strong>Ausgefallen:</strong> nach <code>consecutive_failures_alert</code> Fehlschlägen in Folge (Standard 3).</li>
  <li><strong>Wiederhergestellt:</strong> wenn eine Probe, die ausgefallen war, wieder besteht.</li>
  <li><strong>Langsam:</strong> wenn die Latenz über <code>latency_threshold_ms</code> liegt, höchstens einmal alle 5 Minuten.</li>
</ul>
<p>Alarme gehen an <code>alert_session_ids</code> oder, wenn leer, an deine eigenen Chats. Eine Telegram-Sitzungs-ID sieht aus wie <code>mybot:123456789</code>.</p>

<h2>Hintergrundaufgaben</h2>
<ul>
  <li><strong>Tick-Schleife:</strong> führt alle <code>tick_interval_secs</code> (Standard 30) die fälligen Probes aus.</li>
  <li><strong>Bereinigung:</strong> täglich um 3:40 Uhr UTC, entfernt Ergebnisse, die älter als <code>result_retention_days</code> sind.</li>
</ul>

${callout('info', 'Probes zur Laufzeit', 'Bei eingeschalteten Probes kann der Agent Probes mit dem Tool <code>health_probe</code> erstellen, auflisten, ausführen und prüfen (Aktionen <code>create</code>, <code>list</code>, <code>run_now</code>, <code>status</code>). Probes erscheinen außerdem als Automatisierungen in <code>manage_automations</code>, wo sie pausiert oder abgebrochen werden können, und im Bereich System der App mit Hintergrundjobs und Warteschlangen.')}
`
  },
  {
    slug: '/updates',
    section: 'Updates',
    title: 'Selbst-Updater',
    description: 'aidaemon automatisch aus GitHub-Releases aktualisieren. Drei Modi: enable (automatisch installieren), check_only (vorher fragen) und disable.',
    content: () => `
<h1>Selbst-Updater</h1>
<p class="lead">aidaemon kann auf GitHub nach neuen Releases suchen und sich automatisch aktualisieren.</p>

<h2>Highlights aktueller Releases</h2>
<ul>
  <li><strong>v0.21.0</strong> &mdash; Read aloud in der App, Antworten, die gestreamt werden, während sie geschrieben werden, der einstündige Prompt-Cache von Anthropic bleibt über das Laden zurückgestellter Tools hinweg erhalten, und Korrekturen für Anthropic-Basis-URLs, die auf <code>/v1</code> enden, sowie für Gemini-Tool-Aufrufe</li>
  <li><strong>v0.20.0</strong> &mdash; die AIDaemon-App für Desktop, Web und Terminal; Downloads für macOS, Windows und ARM64-Linux; Ersteinrichtung aus der App; Live-Ansichten des Browsers des Agenten; Berechtigungsmodi für Coding-Agenten; Projektdateien und Projektspeicher; automatische Modell-Upgrades; Nutzungsanzeigen; Zeitpläne in jeder Zeitzone</li>
  <li><strong>v0.12.9</strong> &mdash; Speicher-Korrekturen: geplante Läufe schreiben ihre Anweisungen nicht mehr in deinen Speicher, automatische Extraktoren können nicht überschreiben, was du gesagt hast, und umformulierte Duplikate werden zusammengeführt</li>
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
  ['confirmation_timeout_mins', 'integer', '60', 'Minuten, die auf die Genehmigung des Benutzers gewartet wird'],
])}

<h2>Update-Ablauf</h2>
<ol>
  <li><strong>Prüfen</strong> &mdash; fragt die GitHub-Releases-API ab</li>
  <li><strong>Vergleichen</strong> &mdash; Semver-Vergleich</li>
  <li><strong>Benachrichtigen</strong> &mdash; sendet Release Notes an die Channels</li>
  <li><strong>Genehmigen</strong> (check_only) &mdash; Genehmigungsanfrage mit Timeout</li>
  <li><strong>Herunterladen</strong> &mdash; plattformspezifische Binärdatei</li>
  <li><strong>Ersetzen</strong> &mdash; überschreibt die aktuelle Binärdatei</li>
  <li><strong>Neustarten</strong> &mdash; beendet sich mit Code 75, um einen Neustart des Dienstes auszulösen</li>
</ol>

<p>Prüfe von Hand mit <code>aidaemon check-update</code>.</p>

<h2>Plattformunterstützung</h2>
<table class="config-table">
<thead><tr><th>Plattform</th><th>Architektur</th></tr></thead>
<tbody>
<tr><td>Linux</td><td>x86_64, aarch64</td></tr>
<tr><td>macOS</td><td>x86_64, aarch64</td></tr>
<tr><td>Windows</td><td>Kein Selbst-Update: lade die neue Zip-Datei herunter</td></tr>
</tbody>
</table>

${callout('info', 'macOS-App-Download', 'Der Daemon in <code>AIdaemon.app</code> ersetzt sich nicht selbst: Er sagt, wenn eine neue Version erschienen ist, und du installierst die neue <code>.dmg</code> aus dem <a href="https://github.com/davo20019/aidaemon/releases/latest">neuesten Release</a>, um beide zu aktualisieren.')}
${callout('warn', 'Homebrew-Nutzer', 'Hast du über Homebrew installiert, verwende stattdessen <code>brew upgrade aidaemon</code> oder setze <code>mode = "disable"</code>.')}
`
  },
  {
    slug: '/terminal/self-hosting',
    section: 'Terminal',
    title: 'Den Terminal-Broker selbst hosten',
    description: 'Deinen eigenen Terminal-Broker auf Cloudflare Workers bereitstellen, für volle Kontrolle über die Relay-Infrastruktur zwischen Telegram und deinem lokalen Rechner.',
    content: () => `
<h1>Den Terminal-Broker selbst hosten</h1>
<p class="lead">Die Terminal-Funktion lässt dich CLI-Agenten (Codex, Claude, Gemini, OpenCode) direkt aus Telegram ausführen. Standardmäßig nutzt sie den gemeinsamen gehosteten Broker unter <code>terminal.aidaemon.ai</code>. Selbst zu hosten gibt dir volle Kontrolle über die Relay-Infrastruktur.</p>

<h2>Architektur</h2>
<p>Das Terminal-System hat drei Komponenten:</p>
<ul>
  <li><strong>aidaemon-Daemon</strong> (Rust) &mdash; läuft auf deinem Rechner, startet PTY-Sitzungen und überbrückt per WebSocket zum Broker</li>
  <li><strong>Broker</strong> (Cloudflare Worker) &mdash; WebSocket-Relay zwischen der Mini App und dem Daemon. Übernimmt Authentifizierung, Rate Limiting und Sitzungsverwaltung</li>
  <li><strong>Mini App</strong> (im Broker eingebettet) &mdash; Telegram-Mini-App-Frontend mit dem Terminalemulator xterm.js</li>
</ul>

${codeBlock(`Telegram ──> Mini App (browser) <──WSS──> Broker (CF Worker) <──WSS──> aidaemon daemon ──> local PTY

                                        ┌───────────────────┐
  ┌──────────┐    ┌──────────────────┐   │  Cloudflare        │   ┌────────────────┐   ┌───────────┐
  │ Telegram │───>│ Mini App         │<─>│  Worker (Broker)   │<─>│ aidaemon       │──>│ local PTY │
  │          │    │ (xterm.js)       │   │  - auth            │   │ (terminal      │   │ (bash,    │
  │          │    │                  │   │  - rate limiting   │   │  bridge)       │   │  zsh...)  │
  └──────────┘    └──────────────────┘   │  - session mgmt   │   └────────────────┘   └───────────┘
                         WSS             └───────────────────┘          WSS`, 'text', 'architecture')}

${callout('info', 'Ende-zu-Ende-Verschlüsselung', 'Der Broker ist ein transparentes Relay &mdash; er sieht nie den tatsächlichen Terminalinhalt. Die gesamte Terminal-Ein-/Ausgabe wird zwischen der Mini App und deinem Daemon verschlüsselt.')}

<h2>Voraussetzungen</h2>
<ul>
  <li><strong>Cloudflare-Konto</strong> &mdash; der kostenlose Tarif genügt für die persönliche Nutzung</li>
  <li><strong>Ein Telegram-Bot</strong> &mdash; erstellt über <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a></li>
  <li><strong>aidaemon installiert und laufend</strong> &mdash; mit konfiguriertem Telegram-Channel (<a href="/telegram">Telegram-Einrichtungsanleitung</a>)</li>
  <li><strong>Node.js 20+</strong> und <strong>npm</strong> &mdash; für die <a href="https://developers.cloudflare.com/workers/wrangler/" target="_blank" rel="noopener">wrangler-CLI</a></li>
</ul>

<h2>Schritt 1 &mdash; Den Broker klonen</h2>
<p>Der Broker ist ein eigenständiges Cloudflare-Worker-Projekt. Klone es und installiere die Abhängigkeiten:</p>
${codeBlock(`git clone https://github.com/davo20019/terminal.aidaemon.ai.git
cd terminal.aidaemon.ai
npm install`, 'bash')}

<h2>Schritt 2 &mdash; Das Deployment konfigurieren</h2>
<p>Öffne <code>wrangler.toml</code> und wähle, wie du bereitstellen möchtest:</p>

<h3>Option A: workers.dev-Subdomain (am einfachsten)</h3>
<p>Hast du keine eigene Domain, nutze die kostenlose Subdomain <code>*.workers.dev</code> von Cloudflare. Kommentiere den Block <code>routes</code> aus oder entferne ihn:</p>
${codeBlock(`name = "terminal-broker"
main = "src/worker.js"
compatibility_date = "2026-03-01"
workers_dev = true

# No routes block = uses your-name.workers.dev
# Your broker URL will be: https://terminal-broker.<your-subdomain>.workers.dev

[[durable_objects.bindings]]
name = "SESSION_STORE"
class_name = "UserSessionStore"

[[migrations]]
tag = "v1"
new_sqlite_classes = ["UserSessionStore"]`, 'toml', 'wrangler.toml (workers.dev)')}

<h3>Option B: Eigene Domain</h3>
<p>Hast du eine Domain bei Cloudflare DNS, richte eine Route dorthin ein:</p>
${codeBlock(`name = "terminal-broker"
main = "src/worker.js"
compatibility_date = "2026-03-01"

routes = [
  { pattern = "terminal.example.com", zone_name = "example.com", custom_domain = true }
]

[[durable_objects.bindings]]
name = "SESSION_STORE"
class_name = "UserSessionStore"

[[migrations]]
tag = "v1"
new_sqlite_classes = ["UserSessionStore"]`, 'toml', 'wrangler.toml (custom domain)')}

${callout('info', 'Cloudflare DNS erforderlich', 'Eigene Domains müssen von Cloudflare DNS verwaltet werden (orange Wolke, proxied). Liegt deine Domain bei einem anderen Registrar, kannst du sie entweder transferieren oder als <a href="https://developers.cloudflare.com/dns/zone-setups/" target="_blank" rel="noopener">Cloudflare-Zone</a> hinzufügen.')}

<h2>Schritt 3 &mdash; Secrets setzen</h2>
<p>Der Broker braucht einige Secrets, um zu funktionieren. Setze sie mit der wrangler-CLI:</p>

${codeBlock(`# Required: signs all authentication tokens
npx wrangler secret put SESSION_SIGNING_KEY
# paste output of: openssl rand -base64 32

# Required: validates Telegram user identity
npx wrangler secret put TELEGRAM_BOT_TOKEN
# paste your bot token from @BotFather

# Optional: protects admin API endpoints
npx wrangler secret put ADMIN_API_KEY
# paste a strong random string`, 'bash')}

${callout('danger', 'Schütze deinen Signaturschlüssel', 'Der <code>SESSION_SIGNING_KEY</code> signiert alle Authentifizierungs-Tokens. Wird er kompromittiert, könnte ein Angreifer Sitzungen fälschen. Erzeuge einen starken Zufallswert und speichere ihn sicher. Rotiere ihn sofort, wenn du ein Leck vermutest.')}

<p>Vollständige Liste der verfügbaren Secrets:</p>
${configTable([
  ['SESSION_SIGNING_KEY', 'string', '&mdash;', 'Erforderlich. Signiert Authentifizierungs-Tokens. Erzeugen mit <code>openssl rand -base64 32</code>'],
  ['TELEGRAM_BOT_TOKEN', 'string', '&mdash;', 'Erforderlich. Bot-Token von @BotFather. Muss mit dem Token in deiner aidaemon-Konfiguration übereinstimmen'],
  ['ADMIN_API_KEY', 'string', '&mdash;', 'Optional. Schützt Admin-Endpunkte (Benutzerverwaltung, Kontingent-Overrides)'],
  ['BILLING_WEBHOOK_SECRET', 'string', '&mdash;', 'Optional. HMAC-Secret zur Signaturprüfung des Billing-Webhooks'],
])}

<h2>Schritt 4 &mdash; Bereitstellen</h2>
<p>Stelle den Broker auf Cloudflare Workers bereit:</p>
${codeBlock(`npx wrangler deploy   # or: npm run deploy`, 'bash')}

<p>Du solltest eine Ausgabe wie diese sehen:</p>
${codeBlock(`Uploaded terminal-broker (3.45 sec)
Published terminal-broker (0.35 sec)
  https://terminal-broker.your-subdomain.workers.dev
Current Deployment ID: abc12345-...`, 'text', 'deploy output')}

${callout('info', 'Durable-Object-Migration', 'Das erste Deployment legt die Durable-Object-Migration für <code>UserSessionStore</code> automatisch an. Es sind keine manuellen Migrationsschritte nötig.')}

<h2>Schritt 5 &mdash; aidaemon konfigurieren</h2>
<p>Richte deinen aidaemon-Daemon auf deinen selbst gehosteten Broker aus. Aktualisiere deine <code>config.toml</code>:</p>

${codeBlock(`[terminal]
web_app_url = "https://terminal.example.com"
daemon_ws_url = "wss://terminal.example.com/v1/ws/daemon"`, 'toml', 'config.toml')}

<p>Oder verwende Umgebungsvariablen:</p>
${codeBlock(`export AIDAEMON_TERMINAL_WEB_APP_URL="https://terminal.example.com"
export AIDAEMON_TERMINAL_BROKER_URL="wss://terminal.example.com/v1/ws/daemon"`, 'bash')}

<p>Weitere Overrides, die der Daemon liest: <code>AIDAEMON_TERMINAL_BRIDGE_ENABLED</code> (oder <code>[terminal] bridge_enabled</code>, Standard true), <code>AIDAEMON_TERMINAL_DAEMON_TOKEN</code>, <code>AIDAEMON_TERMINAL_USER_ID</code>, <code>AIDAEMON_TERMINAL_DEVICE_ID</code> und <code>AIDAEMON_TERMINAL_SHELL</code>.</p>

<p>Starte aidaemon nach dem Ändern der Konfiguration neu, damit die neuen Werte wirksam werden.</p>

<h2>Schritt 6 &mdash; Telegram konfigurieren</h2>
<p>Wie du Telegram konfigurierst, hängt davon ab, wie du das Terminal startest:</p>

<h3>Über den Befehl /terminal (Inline-Schaltflächen)</h3>
<p>Wenn du den Befehl <code>/terminal</code> in deinem Bot-Chat verwendest, stammt die Mini-App-URL aus <code>web_app_url</code> in deiner <code>config.toml</code>. Es sind keine Änderungen bei BotFather nötig &mdash; die URL der Inline-Schaltfläche wird von aidaemon automatisch gesetzt.</p>

<h3>Über die Menüschaltfläche</h3>
<p>Wenn du das Terminal als dauerhafte Menüschaltfläche in deinem Bot erreichbar haben möchtest:</p>
<ol>
  <li>Öffne <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a> auf Telegram</li>
  <li>Sende <code>/mybots</code> und wähle deinen Bot</li>
  <li>Gehe zu <strong>Bot Settings</strong> &rarr; <strong>Menu Button</strong></li>
  <li>Setze die URL auf deinen Broker (z. B. <code>https://terminal-broker.your-subdomain.workers.dev</code>)</li>
</ol>

${callout('warn', 'HTTPS erforderlich', 'Telegram verlangt, dass die Mini-App-URL HTTPS verwendet. Sowohl <code>workers.dev</code>-Subdomains als auch über Cloudflare geproxyte eigene Domains stellen HTTPS automatisch bereit.')}

<h2>Überprüfung</h2>
<p>Bestätige, dass alles funktioniert:</p>

<h3>1. Health-Check</h3>
${codeBlock(`curl https://terminal.example.com/health`, 'bash')}
<p>Erwartete Antwort:</p>
${codeBlock(`{
  "ok": true,
  "service": "terminal.example.com",
  "mode": "broker-e2ee-bridge",
  "timestamp": "2026-03-01T12:00:00.000Z"
}`, 'json', 'health response')}

<h3>2. Die Mini App testen</h3>
<p>Sende <code>/terminal</code> an deinen Bot in Telegram. Die Mini App sollte sich öffnen und die Terminal-Oberfläche anzeigen.</p>

<h3>3. aidaemon-Logs prüfen</h3>
<p>Suche in deinen aidaemon-Logs nach der Verbindung der Terminal-Bridge (<code>~/Library/Logs/aidaemon/stdout.log</code> unter macOS, <code>~/.local/state/aidaemon/stdout.log</code> anderswo):</p>
${codeBlock(`INFO Connecting terminal bridge to broker
INFO Terminal bridge connected`, 'text', 'aidaemon logs')}

${callout('success', 'Alles bereit', 'Gibt der Health-Check <code>"ok": true</code> zurück, öffnet sich die Mini App in Telegram und zeigen die aidaemon-Logs die Broker-Verbindung &mdash; ist dein selbst gehostetes Terminal voll einsatzbereit.')}

<h2>Kontingent-Konfiguration</h2>
<p>Der Broker erzwingt monatliche Kontingente pro Benutzer, um Missbrauch zu verhindern. Er erfasst Sitzungsstarts, aktive Minuten, übertragene Bytes und WebSocket-Frames. Die Limits des Standardtarifs "free" sind großzügig und für die persönliche Nutzung mehr als ausreichend.</p>

<p>Um die Tariflimits anzupassen, setze die Umgebungsvariable <code>PLAN_LIMITS_JSON</code> in deiner <code>wrangler.toml</code>:</p>
${codeBlock(`[vars]
PLAN_LIMITS_JSON = '{"free":{"monthly_session_starts":500,"monthly_ws_frames":500000}}'`, 'toml', 'wrangler.toml')}

<p>Weitere Tarifeinstellungen: <code>DEFAULT_TENANT_PLAN</code> (der Tarif, den neue Benutzer erhalten, Standard <code>free</code>) und <code>TENANT_PLAN_OVERRIDES_JSON</code> (Benutzer-ID zu Tarif). <code>ADMIN_API_KEYS</code> nimmt mehrere Admin-Schlüssel entgegen, getrennt durch Kommas oder Zeilenumbrüche.</p>

<p>Um einen bestimmten Benutzer auf den Tarif "pro" (oder einen beliebigen eigenen Tarif) zu setzen, verwende die Admin-API:</p>
${codeBlock(`curl -X POST https://terminal.example.com/v1/admin/plan \\
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"user_id": "TELEGRAM_USER_ID", "plan": "pro"}'`, 'bash')}

<p>Verfügbare Schlüssel für Tariflimits:</p>
${configTable([
  ['monthly_session_starts', 'integer', '350', 'Terminal-Sitzungen, die ein Benutzer pro Monat starten kann'],
  ['monthly_session_minutes', 'integer', '2400', 'Aktive Terminal-Minuten pro Monat'],
  ['monthly_client_bytes', 'integer', '536870912', 'Bytes von der Mini App pro Monat (512 MiB)'],
  ['monthly_daemon_bytes', 'integer', '1073741824', 'Bytes vom Daemon pro Monat (1 GiB)'],
  ['monthly_ws_frames', 'integer', '300000', 'WebSocket-Frames pro Monat'],
  ['max_active_scoped_sessions', 'integer', '4', 'Sitzungen, die ein Benutzer gleichzeitig offen haben darf'],
])}

<h2>Fehlerbehebung</h2>
<table class="config-table">
<thead><tr><th>Symptom</th><th>Ursache</th><th>Lösung</th></tr></thead>
<tbody>
<tr><td>"Terminal bridge disabled" in den aidaemon-Logs</td><td><code>daemon_ws_url</code> ist falsch konfiguriert</td><td>Muss <code>wss://</code> verwenden (nicht <code>ws://</code>). Cloudflare Workers erfordern TLS.</td></tr>
<tr><td>Die Mini App zeigt "invalid session"</td><td>Token stimmt nicht überein</td><td><code>TELEGRAM_BOT_TOKEN</code> im Broker muss exakt mit dem Bot-Token in deiner aidaemon-<code>config.toml</code> übereinstimmen</td></tr>
<tr><td>"Token signature mismatch"</td><td>Signaturschlüssel fehlt oder ist falsch</td><td>Stelle sicher, dass <code>SESSION_SIGNING_KEY</code> über <code>npx wrangler secret put</code> gesetzt ist</td></tr>
<tr><td>WebSocket-Verbindung bricht ab</td><td>Worker-Fehler oder Timeout</td><td>Prüfe im Cloudflare-Dashboard &rarr; Workers &amp; Pages &rarr; dein Worker &rarr; Logs auf Fehler</td></tr>
<tr><td>"daemon_auth_rate_limited"</td><td>Zu viele fehlgeschlagene Verbindungsversuche</td><td>Warte 60 Sekunden, behebe dann das zugrunde liegende Authentifizierungsproblem und verbinde dich neu</td></tr>
</tbody>
</table>

<h2>Sicherheitshinweise</h2>
<ul>
  <li>Der Broker ist ein <strong>transparentes Relay</strong> &mdash; der Terminalinhalt ist zwischen der Mini App und deinem Daemon Ende-zu-Ende-verschlüsselt</li>
  <li>Der Broker sieht: Benutzer-IDs, Sitzungsmetadaten und verschlüsselte Frame-Größen &mdash; aber <strong>nie</strong> den tatsächlichen Terminalinhalt</li>
  <li>Der <code>SESSION_SIGNING_KEY</code> ist das kritischste Secret &mdash; rotiere ihn sofort, wenn er kompromittiert wurde</li>
  <li>Alle Verbindungen nutzen TLS (WSS) &mdash; Cloudflare Workers erzwingen HTTPS standardmäßig</li>
</ul>

${callout('info', 'Vollständiges Bedrohungsmodell', 'Eine detaillierte Sicherheitsanalyse findest du in der <a href="https://github.com/davo20019/terminal.aidaemon.ai/blob/main/SECURITY.md" target="_blank" rel="noopener">SECURITY.md</a> im Broker-Repository.')}
`
  },
];

export default pages;
