import { codeBlock, callout, configTable } from '../helpers.js';

const pages = [
  {
    slug: '/',
    section: null,
    title: 'Documentación de AIDaemon — Daemon de agente de IA personal',
    description: 'Documentación de aidaemon, un daemon de agente de IA personal de código abierto. Chatea por Telegram, Slack o Discord. Amplíalo con MCP y usa cualquier LLM.',
    content: () => `
<h1><span class="ai">AID</span>aemon</h1>
<p class="lead">Un agente de IA personal que se ejecuta como daemon. Siempre activo, siempre aprendiendo. Chatea desde la app de AIDaemon o desde Telegram, Slack y Discord, amplíalo con MCP, impulsado por cualquier LLM.</p>

${callout('success', '¿Eres nuevo aquí?', 'Empieza por <a href="/getting-started/build">Instalación</a>: descarga la app para macOS, Windows o Linux y ábrela. Versión actual: <strong>0.21.0</strong>.')}

<p>aidaemon es un agente de IA autoalojado, escrito en Rust, que se ejecuta como servicio en segundo plano en tu equipo. Se conecta a ChatGPT, Anthropic, Gemini, xAI o a cualquier proveedor de LLM compatible con OpenAI, se comunica a través de su propia app (de escritorio, web y de terminal) y por Telegram, Slack o Discord, y puede ejecutar herramientas, gestionar su propia configuración, recordar datos, navegar por la web y crear subagentes, todo de forma autónoma.</p>

<h2>Características principales</h2>
<ul>
  <li><strong>La app de AIDaemon</strong> — una sola app para escritorio, web y terminal: respuestas en streaming, Read aloud, aprobaciones, Settings y consumo. Consulta <a href="/app">La app de AIDaemon</a></li>
  <li><strong>Vistas en vivo</strong> — mira el navegador del agente y toma el control cuando necesite que inicies sesión</li>
  <li><strong>Agentes de programación</strong> — Claude Code, Codex, Antigravity y cualquier agente de Agent Client Protocol, en el modo de permisos que elijas</li>
  <li><strong>Arquitectura de daemon</strong> — se ejecuta como servicio de systemd/launchd, siempre disponible</li>
  <li><strong>Multicanal</strong> — chatea por Telegram, Slack o Discord, con control de acceso para varios usuarios</li>
  <li><strong>Uso agéntico de herramientas</strong> — razonamiento autónomo de varios pasos, con aprobaciones para los efectos secundarios</li>
  <li><strong>Integración con MCP</strong> — amplíalo con cualquier servidor de Model Context Protocol</li>
  <li><strong>Memoria persistente</strong> — historial respaldado por SQLite con búsqueda semántica mediante embeddings</li>
  <li><strong>Enrutamiento multimodelo</strong> — selección automática de nivel Fast/Primary/Smart</li>
  <li><strong>Disparadores de correo</strong> — monitoreo IMAP IDLE para notificaciones de la bandeja de entrada</li>
  <li><strong>Aprobación de comandos</strong> — aprueba comandos de shell y otros efectos secundarios desde la app o desde cualquier chat conectado (Telegram, Slack, Discord)</li>
  <li><strong>Sistema de skills</strong> — mejora dinámica del prompt mediante archivos markdown</li>
  <li><strong>Automantenimiento</strong> — lee, actualiza, valida y restaura su propia configuración</li>
  <li><strong>Automatización del navegador</strong> — Chrome con sesiones de inicio de sesión persistentes, capturas de pantalla y llenado de formularios</li>
  <li><strong>Investigación web</strong> — búsqueda web integrada (DuckDuckGo, Brave o tu propio SearxNG, consultados en paralelo) y descarga de URL</li>
  <li><strong>Creación de subagentes</strong> — delegación recursiva a agentes para tareas complejas</li>
  <li><strong>Delegación a agentes de CLI</strong> — delega en Claude Code, Codex, Antigravity, Gemini, Copilot, Aider o cualquier agente ACP</li>
  <li><strong>Tareas programadas</strong> — tareas recurrentes al estilo cron con interpretación de lenguaje natural</li>
  <li><strong>Transferencia de archivos</strong> — envía y recibe archivos por Telegram con seguridad de rutas</li>
  <li><strong>Gestión de secretos</strong> — compatibilidad con el llavero del sistema operativo y con variables de entorno</li>
  <li><strong>Seguimiento del costo de tokens</strong> — estadísticas de uso por modelo, el comando /cost, y límites del plan y saldos en Settings</li>
  <li><strong>Event sourcing</strong> — registro de eventos inmutable con consolidación diaria en hechos y procedimientos</li>
  <li><strong>Objetivos + tareas</strong> — divide el trabajo grande en tareas con seguimiento y mantén el avance en marcha</li>
  <li><strong>Monitoreo de salud</strong> — sondas HTTP, TCP, de comandos y de archivos con alertas</li>
  <li><strong>Skills dinámicas</strong> — instálalas desde registros o promueve automáticamente los procedimientos repetidos</li>
  <li><strong>Autoactualización</strong> — actualización automática desde los releases de GitHub con modos configurables</li>
  <li><strong>Integración con Discord</strong> — comandos slash, botones de aprobación interactivos, compatibilidad con varios bots</li>
  <li><strong>Calificación de comandos</strong> — una revisión de seguridad de lo que hace cada comando decide si te pregunta; las tarjetas se califican como Safe, Medium, High o Critical</li>
  <li><strong>Inteligencia de personas</strong> — una libreta de contactos personal que recuerda por ti cumpleaños, preferencias y relaciones</li>
</ul>

<h2>La arquitectura de un vistazo</h2>
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

<h2>Enlaces rápidos</h2>
<ul>
  <li><a href="/getting-started/build">Instalación</a> — descarga la app para macOS, Windows o Linux</li>
  <li><a href="/app">La app de AIDaemon</a> — chat, aprobaciones, vistas en vivo, ajustes</li>
  <li><a href="/configuration">Referencia de configuración</a> — documentación completa de config.toml</li>
  <li><a href="/tools">Herramientas</a> — el sistema de herramientas integradas y ampliables</li>
  <li><a href="/telegram">Telegram</a> — configuración del bot, comandos, flujo de aprobación</li>
  <li><a href="/slack">Slack</a> — integración con el workspace mediante Socket Mode</li>
  <li><a href="/discord">Discord</a> — configuración del bot, comandos slash, botones de aprobación</li>
  <li><a href="/architecture">Cómo funciona AIDaemon</a> — del mensaje a la respuesta: kernel, hooks, límites, cierre</li>
  <li><a href="/event-sourcing">Event sourcing</a> — el registro de eventos de solo anexado y lo que se construye con él</li>
  <li><a href="/plans">Planes y listas de verificación</a> — cómo se declara una solicitud y cómo se juzga que está terminada</li>
  <li><a href="/health-monitoring">Monitoreo de salud</a> — el endpoint /health, los watchdogs y las sondas de servicios</li>
</ul>
`
  },
  {
    slug: '/getting-started',
    section: 'Getting Started',
    title: 'Resumen',
    description: 'Pon AIDaemon en marcha en tu computadora: descarga la app, ábrela, conecta un modelo y empieza a chatear.',
    content: () => `
<h1>Primeros pasos</h1>
<p class="lead">Descarga la app de AIDaemon, ábrela, conecta un modelo y empieza a chatear. No necesitas terminal en macOS ni en Windows.</p>

<p>La versión actual es <strong>0.21.0</strong>.</p>

<h2>Qué necesitas</h2>
<ul>
  <li><strong>Una computadora</strong> &mdash; una Mac (Apple silicon o Intel), una PC con Windows o Linux (x86_64 o ARM64).</li>
  <li><strong>Un modelo</strong> &mdash; un plan de ChatGPT en el que inicias sesión, o una clave de API de un proveedor como Anthropic, Google Gemini, OpenAI u OpenRouter, o un modelo que corra en tu propio equipo (Ollama, llama.cpp). La app encuentra uno que ya esté en tu computadora cuando puede.</li>
  <li><strong>Opcional:</strong> un bot de Telegram, Slack o Discord, si también quieres hablar con tu agente desde las apps de chat de tu teléfono. Puedes añadirlo más tarde.</li>
</ul>

<h2>Pasos</h2>
<ol>
  <li><a href="/getting-started/build">Instalación</a> &mdash; descarga y abre la app para tu computadora</li>
  <li><a href="/getting-started/wizard">Primer arranque</a> &mdash; la app inicia el asistente y conecta un modelo</li>
  <li><a href="/app">Usa la app</a> &mdash; chat, aprobaciones, vistas en vivo, ajustes</li>
  <li><a href="/configuration">Configura</a> &mdash; todos los ajustes también están en <code>config.toml</code> y en la página Settings de la app</li>
</ol>
`
  },
  {
    slug: '/getting-started/build',
    section: 'Getting Started',
    title: 'Instalación',
    description: 'Descarga e instala AIDaemon en macOS, Windows o Linux, paso a paso. Opciones avanzadas: Homebrew, Cargo, compilar desde el código fuente, servidores.',
    content: () => `
<h1>Instalar AIDaemon</h1>
<p class="lead">Elige tu computadora abajo y sigue los pasos. Toma unos minutos y, en macOS y Windows, nunca necesitas una terminal.</p>

<p>Todas las descargas están en la <a href="https://github.com/davo20019/aidaemon/releases/latest" target="_blank" rel="noopener">página del último release</a>. La versión actual es <strong>0.21.0</strong>.</p>

<h2>macOS</h2>
<p><strong>Primero, comprueba qué Mac tienes:</strong> haz clic en el menú Apple (el logotipo de la manzana en la esquina superior izquierda de la pantalla) &rarr; <strong>Acerca de este Mac</strong>. Si la línea <strong>Chip</strong> dice <em>Apple M&hellip;</em>, tienes Apple silicon. Si aparece una línea <strong>Procesador</strong> con <em>Intel</em>, tienes una Mac Intel.</p>
<ol>
  <li>Descarga la app para tu Mac:
    <ul>
      <li>Apple silicon (M1, M2, M3 y posteriores): <a href="https://github.com/davo20019/aidaemon/releases/latest/download/AIdaemon-macos-aarch64.dmg"><code>AIdaemon-macos-aarch64.dmg</code></a></li>
      <li>Intel: <a href="https://github.com/davo20019/aidaemon/releases/latest/download/AIdaemon-macos-x86_64.dmg"><code>AIdaemon-macos-x86_64.dmg</code></a></li>
    </ul>
  </li>
  <li>Abre el archivo <code>.dmg</code> descargado.</li>
  <li>Arrastra <strong>AIDaemon</strong> a la carpeta <strong>Aplicaciones</strong>.</li>
  <li>Abre AIDaemon desde Aplicaciones (o desde Launchpad).</li>
</ol>
${callout('info', 'Si macOS lo bloquea la primera vez', 'Abre <strong>Ajustes del Sistema &rarr; Privacidad y seguridad</strong>, desplázate hasta el mensaje sobre AIDaemon y haz clic en <strong>Abrir de todos modos</strong>. Solo tienes que hacerlo una vez.')}

<h2>Windows</h2>
<ol>
  <li>Descarga <a href="https://github.com/davo20019/aidaemon/releases/latest/download/aidaemon-windows-x86_64.zip"><code>aidaemon-windows-x86_64.zip</code></a>.</li>
  <li>Haz clic derecho en el archivo zip y elige <strong>Extraer todo&hellip;</strong>. Extráelo en una carpeta que vayas a conservar (por ejemplo <code>%LOCALAPPDATA%\\AIDaemon</code>), no en tu carpeta de Descargas.</li>
  <li>Abre la carpeta extraída y haz doble clic en <code>aidaemon-app.exe</code>.</li>
</ol>
${callout('info', 'Si Windows SmartScreen te advierte', 'Haz clic en <strong>Más información</strong> y luego en <strong>Ejecutar de todas formas</strong>.')}

<h2>Linux</h2>
<p>Abre una terminal y ejecuta el instalador. Descarga la compilación adecuada para tu equipo (x86_64 o ARM64), la verifica e instala también la app (su compilación web va a <code>~/.aidaemon/app-web</code>):</p>
${codeBlock(`curl -sSfL https://get.aidaemon.ai | bash`, 'bash')}
<p>O descarga tú mismo un archivo del release y extráelo:</p>
<ul>
  <li>x86_64: <a href="https://github.com/davo20019/aidaemon/releases/latest/download/aidaemon-linux-x86_64.tar.gz"><code>aidaemon-linux-x86_64.tar.gz</code></a></li>
  <li>ARM64 (aarch64): <a href="https://github.com/davo20019/aidaemon/releases/latest/download/aidaemon-linux-aarch64.tar.gz"><code>aidaemon-linux-aarch64.tar.gz</code></a></li>
</ul>
<p>Después abre la app con <code>aidaemon-app</code> (una ventana) o <code>aidaemon-app --tui</code> (en la terminal). La primera vez ofrece <strong>Run it here</strong>, que inicia el asistente ahora y en cada inicio de sesión. Después de eso, <code>aidaemon app</code> y <code>aidaemon tui</code> también funcionan si los ejecutas desde <code>~/.aidaemon</code>, la carpeta del asistente.</p>

<h2>Homebrew (macOS o Linux)</h2>
${codeBlock(`brew install davo20019/tap/aidaemon`, 'bash')}
<p>Luego ejecuta <code>aidaemon-app</code>.</p>

<h2>Qué pasa después</h2>
<p>La primera vez que se abre, la app inicia el asistente en esta computadora (ahora y en cada inicio de sesión, sin necesidad de contraseña de administrador) y te ayuda a conectar un modelo. Consulta <a href="/getting-started/wizard">Primer arranque</a>.</p>

<h2>Avanzado</h2>

<h3>Cargo</h3>
<p>Para desarrolladores de Rust:</p>
${codeBlock(`cargo install --locked aidaemon`, 'bash')}
<p>Esto instala solo el daemon, compilado a partir de los crates del SDK de AIDaemon en crates.io. Compila la app desde <code>clients/app</code> en un checkout.</p>

<h3>Compilar desde el código fuente</h3>
${codeBlock(`git clone https://github.com/davo20019/aidaemon.git
cd aidaemon
cargo build --release`, 'bash')}
<p>El binario queda en <code>./target/release/aidaemon</code>. Las features por defecto son <code>discord</code>, <code>slack</code>, <code>encryption</code>, <code>browser</code>, <code>terminal-bridge</code>, <code>otel</code> y <code>execution-docker</code>. Entre las features opcionales están <code>computer_use</code> y <code>computer_use-macos</code> (operan apps nativas de macOS) y <code>sdk-memory</code>. La app en sí vive en <code>clients/app</code> y se compila por separado.</p>

<h3>Ejecutarlo en un servidor</h3>
<p>En un servidor, ejecuta <code>aidaemon</code> sin configuración, desde la carpeta que guardará su configuración: <code>~/.aidaemon</code>, la carpeta que usa <code>aidaemon service install</code>. Imprime un enlace y un código de un solo uso. Llega al puerto <code>8788</code> de la máquina mediante un túnel SSH o tu propio túnel HTTPS, abre el enlace en tu laptop o teléfono y termina la configuración desde ahí (el código empareja solo el primer dispositivo):</p>
${codeBlock(`# on the server
mkdir -p ~/.aidaemon && cd ~/.aidaemon && aidaemon

# on your laptop
ssh -L 8788:127.0.0.1:8788 you@your-server
# then open the printed link in your browser`, 'bash')}
<p>¿Prefieres una terminal? Ejecuta <code>aidaemon setup</code> en esa carpeta para conectar el modelo ahí mismo. Para mantener el daemon en marcha, consulta <a href="/service-install">Ejecutar como servicio</a>. Para llegar a la app desde otros dispositivos sin SSH, consulta <a href="/app/gateway">Client Gateway y emparejamiento</a>.</p>

<h3>Verificar una descarga</h3>
<p>Cada archivo del release tiene un archivo <code>.sha256</code> correspondiente en la página del release. El instalador de una línea lo comprueba por ti.</p>
`
  },
  {
    slug: '/getting-started/wizard',
    section: 'Getting Started',
    title: 'Primer arranque',
    description: 'Qué pasa la primera vez que abres AIDaemon: el asistente se inicia en tu computadora, encuentra o conecta un modelo y abre tu primera conversación.',
    content: () => `
<h1>Primer arranque</h1>
<p class="lead">La primera vez que abres la app de AIDaemon, inicia el asistente en tu computadora y te ayuda a conectar un modelo. No se guarda nada hasta que una llamada de prueba al modelo recibe respuesta.</p>

<h2>1. Dónde se ejecuta el asistente</h2>
<p>La app de escritorio inicia el asistente (el daemon) en esta computadora de inmediato, ahora y en cada inicio de sesión, sin contraseña de administrador. Esto es <strong>Run it here</strong>, lo mismo que <code>aidaemon service install</code>. Para ejecutarlo en un servidor, elige <strong>Run it on another machine instead</strong> y pega el enlace que imprimió ese servidor (consulta <a href="/getting-started/build">Instalación &rarr; Ejecutarlo en un servidor</a>).</p>

<h2>2. Conecta un modelo</h2>
<p>La app busca un modelo que ya esté en tu computadora &mdash; un inicio de sesión de ChatGPT, una clave de proveedor en el entorno (como <code>OPENAI_API_KEY</code> o <code>ANTHROPIC_API_KEY</code>), u Ollama o llama.cpp ejecutándose en local &mdash; y te lo ofrece con un clic. O elige tú mismo un proveedor:</p>
<ul>
  <li><strong>Suscripción a ChatGPT</strong> &mdash; inicia sesión desde la app. En otro dispositivo, pega la dirección en la que termina el navegador.</li>
  <li><strong>Una clave de proveedor</strong> &mdash; primero se comprueba la clave y luego eliges un modelo de la lista de tu propia cuenta (el habitual viene preseleccionado).</li>
  <li><strong>Autoalojado</strong> &mdash; <strong>Ollama (local)</strong>, <strong>llama.cpp (local)</strong> u <strong>Another OpenAI-compatible service</strong> con la dirección de tu servidor (LM Studio, vLLM) y la clave vacía.</li>
</ul>
<p>Cada proveedor indica si usa tu plan, cobra por token o se ejecuta en tu propio equipo. Una llamada de prueba debe recibir respuesta antes de que se guarde nada.</p>

<table class="config-table">
<thead><tr><th>Proveedor</th><th>Variable de la clave</th><th>Modelos iniciales (primary / fast / smart)</th><th>Facturación</th></tr></thead>
<tbody>
<tr><td>OpenAI (suscripción a ChatGPT)</td><td>inicio de sesión</td><td>gpt-6-sol / gpt-6-luna / gpt-6-sol</td><td>Tu plan</td></tr>
<tr><td>Anthropic</td><td><code>ANTHROPIC_API_KEY</code></td><td>claude-sonnet-5-5 / claude-haiku-5-5 / claude-opus-5-5</td><td>Por token</td></tr>
<tr><td>OpenAI</td><td><code>OPENAI_API_KEY</code></td><td>gpt-5</td><td>Por token</td></tr>
<tr><td>Google Gemini</td><td><code>GEMINI_API_KEY</code> o <code>GOOGLE_API_KEY</code></td><td>gemini-4-hydrogen / gemini-3.5-flash-lite / gemini-4-argon</td><td>Por token</td></tr>
<tr><td>OpenRouter</td><td><code>OPENROUTER_API_KEY</code></td><td>moonshotai/kimi-k2.5</td><td>Por token</td></tr>
<tr><td>xAI (Grok)</td><td><code>XAI_API_KEY</code></td><td>grok-4</td><td>Por token</td></tr>
<tr><td>DeepSeek</td><td><code>DEEPSEEK_API_KEY</code></td><td>deepseek-chat / deepseek-chat / deepseek-reasoner</td><td>Por token</td></tr>
<tr><td>Moonshot AI (Kimi)</td><td><code>MOONSHOT_API_KEY</code></td><td>kimi-k2.5 / kimi-k2.5 / kimi-k2-thinking</td><td>Por token</td></tr>
<tr><td>MiniMax</td><td><code>MINIMAX_API_KEY</code></td><td>MiniMax-M2.5 / MiniMax-M2.5-highspeed / MiniMax-M2.5</td><td>Por token</td></tr>
<tr><td>Another OpenAI-compatible service</td><td>&mdash;</td><td>A tu elección</td><td>Por token</td></tr>
<tr><td>Ollama, llama.cpp</td><td>ninguna</td><td>Listados desde tu servidor</td><td>Local</td></tr>
</tbody>
</table>
<p>Cloudflare AI Gateway no se ofrece en el primer arranque; añádelo después en Settings o en <code>config.toml</code> (consulta <a href="/providers">Proveedores</a>).</p>
<p>Estas son solo las opciones iniciales; la app ofrece lo que tu cuenta lista realmente. Consulta <a href="/providers">Proveedores</a> para ver la configuración que escribe cada uno.</p>
${callout('info', 'llama.cpp y el puerto 8080', '<code>llama-server</code> y la comprobación de salud del daemon usan por defecto el puerto 8080. Inicia uno de los dos en otro puerto (<code>llama-server --port 8081</code>, o <code>[daemon] health_port</code>) e indica la dirección de llama.cpp en su formulario.')}

<h2>3. Tu primera conversación</h2>
<p>A continuación viene un paso opcional, <strong>Reach it from your phone</strong>: conecta un bot de Telegram, Slack o Discord con su token (el paso queda completo cuando tu primer mensaje ahí recibe respuesta), o pulsa <strong>Not now</strong>. Luego se abre tu primera conversación. Su saludo cuenta qué hace el agente por su cuenta, sobre qué te preguntará primero y te ofrece prompts para pulsar. Para hablar con tu agente desde Telegram, Slack o Discord más adelante, usa <strong>Settings &rarr; Reach it from your phone</strong>: conecta un bot con su token, y ese paso queda completo cuando tu primer mensaje ahí recibe respuesta.</p>

<h2>Configuración desde una terminal</h2>
<p>Sin un <code>config.toml</code> en su carpeta (la carpeta desde la que se inicia), <code>aidaemon</code> se ejecuta en <em>modo de configuración</em>: el Client Gateway en su dirección de loopback habitual (puerto 8788) sin ningún agente detrás, más un enlace y un código de un solo uso para un dispositivo en otro lugar. El primer dispositivo que lo canjea se convierte en el dispositivo propietario. <code>aidaemon setup</code> hace el paso del modelo en la terminal. El antiguo asistente de configuración interactivo ya no existe; <code>aidaemon setup low-latency</code> no cambia. Un segundo daemon en la misma máquina puede usar otro puerto de configuración con <code>AIDAEMON_GATEWAY_PORT</code>.</p>
`
  },
  {
    slug: '/app',
    section: 'App',
    title: 'La app de AIDaemon',
    description: 'La app de AIDaemon para escritorio, web y terminal: chat, aprobaciones, vistas en vivo del navegador del agente, archivos de proyecto, lectura en voz alta, ajustes y consumo.',
    content: () => `
<h1>La app de AIDaemon</h1>
<p class="lead">Una sola app para escritorio, web y terminal: chatea con tu agente, responde sus aprobaciones, mira su trabajo y cambia sus ajustes.</p>

<h2>Cómo abrirla</h2>
<table class="config-table">
<thead><tr><th>Dónde</th><th>Cómo</th></tr></thead>
<tbody>
<tr><td>Ventana de escritorio</td><td>Abre AIDaemon (macOS, Windows) o ejecuta <code>aidaemon-app</code> (Linux). Una vez configurada, <code>aidaemon app</code> ejecutado desde <code>~/.aidaemon</code> también funciona.</td></tr>
<tr><td>Terminal</td><td><code>aidaemon-app --tui</code>, o <code>aidaemon tui</code> ejecutado desde <code>~/.aidaemon</code></td></tr>
<tr><td>Navegador en esta máquina</td><td><code>aidaemon web</code> (ejecutado desde <code>~/.aidaemon</code>) abre la compilación web y la empareja (confirma en la terminal)</td></tr>
<tr><td>Teléfono u otra computadora</td><td>Empareja el dispositivo y luego abre la dirección del gateway. Consulta <a href="/app/gateway">Client Gateway y emparejamiento</a>.</td></tr>
</tbody>
</table>
<p>La app habla con el daemon a través del <a href="/app/gateway">Client Gateway</a>. Las descargas y el instalador lo configuran por ti; con el gateway apagado, la app te dice cómo encenderlo.</p>

<h2>Chatear</h2>
<ul>
  <li><strong>Las respuestas llegan en streaming</strong> mientras el modelo las escribe (web y escritorio).</li>
  <li><strong>Read aloud</strong> &mdash; debajo de una respuesta, junto a Copy, Read aloud la dice con la propia voz del sistema: el reconocimiento de voz del navegador en la app web, <code>say</code> en macOS, las voces integradas de Windows, y <code>spd-say</code> o <code>espeak-ng</code> (o <code>espeak</code>) en Linux. Si en Linux no hay ninguno instalado, el botón no aparece. Los bloques de código se dicen como "(código)" y los enlaces, como su texto.</li>
  <li><strong>Dictado</strong> &mdash; en la app web mediante el reconocedor de voz del navegador, y en la app de macOS mediante el reconocedor del sistema. Al pulsar Send termina el dictado.</li>
  <li><strong>Qué modelo respondió</strong> &mdash; debajo de cada respuesta, después de su hora y de Copy, el proveedor y el modelo que realmente la escribió (si respondió un failover, se nombra).</li>
  <li><strong>Edit and Send again</strong> &mdash; cada mensaje que enviaste tiene Copy, Edit y Send again. Los dos añaden un mensaje nuevo al final, así que no se pierde nada de lo anterior.</li>
  <li><strong>Archive</strong> &mdash; archiva o recupera una conversación desde su menú. Las archivadas están en Archived, en el filtro de la barra lateral, y la búsqueda también las recorre. Escribir en un chat archivado lo recupera.</li>
  <li><strong>Deslizar para actualizar</strong> &mdash; desliza una lista hacia abajo pasando de su parte superior o, en escritorio, pulsa Cmd/Ctrl+R. Al volver tras 30 segundos o más de ausencia, la app se pone al día sola.</li>
  <li><strong>Los pasos sobreviven a una reconexión</strong> &mdash; si te reconectas durante un turno, se muestra lo que recibió cada paso y lo que devolvió.</li>
</ul>

<h2>Teclado</h2>
<p>La app está pensada primero para el teclado: <kbd>Esc</kbd> detiene el trabajo de la sesión, <kbd>y</kbd>/<kbd>s</kbd>/<kbd>a</kbd>/<kbd>n</kbd> responden una tarjeta de aprobación una vez que lleva en pantalla el tiempo suficiente para leerla, y una sola paleta (<kbd>Ctrl/Cmd+K</kbd>) contiene sesiones y comandos. La línea de estado siempre indica si el daemon está conectado, reconectando, no está en ejecución o ha cerrado la sesión del dispositivo.</p>

<h2>Aprobaciones</h2>
<p>Cada tarjeta de aprobación de cualquier chat se puede responder desde la app; gana la primera respuesta, y la tarjeta del chat indica entonces quién respondió. La primera tarjeta en cada dispositivo explica sobre qué pregunta el agente y qué hace cada respuesta.</p>

<h2>Vistas en vivo: mira y toma el control</h2>
<p>El encabezado de una conversación abre una vista en vivo del navegador del agente: míralo trabajar, toma el control y devuélvelo. En un teléfono funciona como un navegador (toca para hacer clic, arrastra para desplazarte, pellizca para acercar, escribe con el teclado del teléfono); con ratón y teclado funciona como una ventana de escritorio remoto. Cuando el agente te necesita (un inicio de sesión, un captcha), te entrega la pestaña con una tarjeta de toma de control en todos los canales (Open the live view, Done, Not now). Tú escribes el inicio de sesión; el agente nunca lo ve.</p>
<p>Con <code>[surfaces] desktop = true</code> (desactivado por defecto, macOS con computer use), las pantallas de esta computadora se pueden mirar y manejar de la misma manera, y <code>aidaemon share-screen</code> empareja otra computadora una vez y comparte su pantalla principal. Consulta <a href="/configuration">Configuración &rarr; [surfaces]</a>.</p>

<h2>Proyectos y archivos</h2>
<p>El panel de detalles de una conversación de programación tiene una pestaña <strong>Files</strong>, y la página de un proyecto abre su carpeta: de solo lectura, con los cambios de git marcados, los archivos ignorados a petición y los secretos mostrados solo por su nombre. Las imágenes y los PDF tienen vista previa. Los proyectos se pueden fijar, ordenar y eliminar desde su menú (eliminar un proyecto deja intacta su carpeta en el disco).</p>
<p>Una conversación dentro de un proyecto guarda lo que aprende en las notas propias de ese proyecto, en <code>~/.aidaemon/projects/&lt;project-id&gt;/memory/</code>, aparte de tu memoria personal. También recibe las skills propias del repositorio (<code>.agents/skills</code>, <code>.claude/skills</code>) y puede iniciar los servidores MCP que declara su <code>.mcp.json</code>, cada uno solo después de que apruebes su comando exacto. Tu propio <code>~/.aidaemon/AGENTS.md</code> se carga como el archivo de instrucciones más general de todos los proyectos.</p>

<h2>Agentes de programación</h2>
<p>Cada agente de programación se ejecuta en un modo de permisos que eliges por agente en Settings, y Settings muestra si cada uno puede trabajar ahora. Consulta <a href="/tools/cli-agents">Delegación a agentes de CLI</a>.</p>

<h2>Settings</h2>
<p>La página Settings (escritorio, web y terminal) muestra todos los ajustes que <code>config.toml</code> contiene o documenta, por tabla, con su valor o su valor por defecto, si cambiarlo pide confirmación antes y si surte efecto con una recarga o con un reinicio. Edita los ajustes en el lugar, guarda secretos en el llavero, cambia de proveedor y añade failovers, gestiona servidores MCP y bots, y Reload o Restart. Los cambios sensibles para la seguridad (secretos, <code>base_url</code>, usuarios permitidos, el gateway, los comandos de MCP y de agentes de CLI) esperan tu aprobación como cualquier tarjeta.</p>
<p>Settings también muestra <strong>lo que ha usado y lo que le queda a cada cuenta</strong>: los límites de 5 horas y semanales de un plan de ChatGPT y el saldo de una clave de OpenRouter, cada uno con un medidor y su reinicio.</p>

<h2>Automatizaciones</h2>
<p>Las programaciones pueden nombrar una zona horaria IANA ("cada día laborable a las 8am Europe/Madrid") y siguen su horario de verano. Las tarjetas de automatización muestran la zona de la programación y las ejecuciones en tu hora; una ejecución perdida mientras el daemon estaba apagado aparece como Missed. Consulta <a href="/scheduler">Tareas programadas</a>.</p>
`
  },
  {
    slug: '/app/gateway',
    section: 'App',
    title: 'Client Gateway y emparejamiento',
    description: 'El Client Gateway sirve a la app de AIDaemon y a los dispositivos emparejados: claves de configuración, comandos, emparejamiento, túneles y el protocolo de cliente.',
    content: () => `
<h1>Client Gateway y emparejamiento</h1>
<p class="lead">El Client Gateway sirve el AIDaemon Client Protocol a tus propias apps y a los dispositivos emparejados. Solo escucha en loopback; los demás dispositivos llegan a él mediante un túnel.</p>

<h2>Cómo activarlo</h2>
<p>Las descargas de macOS y Windows y la configuración del primer arranque lo activan por ti. A mano:</p>
${codeBlock(`[client_gateway]
enabled = true
# bind = "127.0.0.1"
# port = 8788
# public_url = "https://aidaemon.example.ts.net"   # your HTTPS tunnel, for pairing links`, 'toml', 'config.toml')}
<p>O pídele al agente que "active el client gateway": <code>manage_config</code> lo hace en un solo paso aprobado y luego se reinicia. Cualquier cambio en una clave de <code>client_gateway</code> necesita la aprobación del propietario.</p>

${configTable([
  ['enabled', 'bool', 'false', 'Sirve el Client Gateway'],
  ['bind', 'string', '"127.0.0.1"', 'Dirección de escucha. Debe ser loopback: se rechaza un bind que no sea de loopback.'],
  ['port', 'integer', '8788', 'Puerto de escucha'],
  ['token_file', 'string', 'null', 'Dónde se guarda el hash del token local. Vacío: <code>~/.aidaemon/client-gateway-token.sha256</code>.'],
  ['retention_days', 'integer', '7', 'Ventana de reanudación. Un cliente que va más atrasado recibe un snapshot.'],
  ['max_events', 'integer', '100000', 'Máximo de eventos que conserva el registro de reanudación'],
  ['watch_risk_ceiling', 'string', '"medium"', 'El riesgo más alto que un reloj inteligente emparejado puede aprobar; por encima, el reloj solo puede denegar'],
  ['public_url', 'string', 'null', 'La dirección HTTPS que usan los dispositivos emparejados, incluida en los enlaces de emparejamiento'],
  ['app_dir', 'string', 'null', 'Directorio de la compilación web de la app, servida en <code>/client/v1/next/</code>. El instalador la deja en <code>~/.aidaemon/app-web</code>. Vacío: se sirve esa compilación instalada cuando existe.'],
])}

<h2>Endpoints</h2>
<ul>
  <li><code>/client/v1/ws</code> &mdash; WebSocket</li>
  <li><code>POST /client/v1/commands</code> y long-poll <code>GET /client/v1/events</code></li>
  <li><code>/client/v1/next/</code> &mdash; la app web (<code>/client/v1/app</code> redirige ahí)</li>
</ul>
<p>El protocolo de cliente actual es <strong>1.39</strong>. Los clientes se reanudan desde su último evento sin pérdidas ni duplicados.</p>

<h2>El token local</h2>
<p>Las apps de la misma máquina inician sesión con el token local guardado en <code>~/.aidaemon/client-token</code> (solo para el propietario), que se genera en el primer uso. <code>aidaemon client-token</code> genera uno nuevo y lo guarda ahí (el anterior deja de funcionar de inmediato); añade <code>--print</code> para imprimirlo para scripts. Ejecuta <code>aidaemon client-token</code>, <code>aidaemon pair</code> y <code>aidaemon web</code> desde <code>~/.aidaemon</code>, la carpeta del daemon.</p>

<h2>Emparejar teléfonos y navegadores</h2>
<ol>
  <li>Envía <code>/pair_device</code> en un chat, o ejecuta <code>aidaemon pair</code> en una terminal desde <code>~/.aidaemon</code> (muestra un código QR). Esto genera un código de un solo uso válido durante diez minutos.</li>
  <li>Abre el enlace en el dispositivo. Este canjea el código con su propia clave.</li>
  <li>Confirma en ese chat o terminal.</li>
</ol>
<p>Cada dispositivo emparejado recibe tokens de corta duración con sus alcances (observe, chat, approve y control para las vistas en vivo). <code>/devices</code> lista los dispositivos y <code>/revoke_device &lt;id&gt;</code> termina de inmediato los tokens y las conexiones abiertas de un dispositivo.</p>

<h2>Cómo llegar desde otros dispositivos</h2>
<p>El gateway solo escucha en loopback. Deja que el propio daemon ejecute el túnel:</p>
${codeBlock(`[exposure.client_gateway]
adapter = "tailscale"        # private to your tailnet; mode = "funnel" makes it public`, 'toml', 'config.toml')}
<p>Adaptadores: <code>tailscale</code> (<code>serve</code> o <code>funnel</code>), <code>cloudflare</code> (<code>named</code>, o <code>quick</code> para una dirección desechable), <code>manual</code> (la <code>url</code> de un proxy inverso que ejecutas tú) y <code>command</code>. <code>cloudflared</code> o <code>tailscale</code> deben estar en el <code>PATH</code>, o indicarse con <code>binary = "..."</code>. Los cambios se aplican tras un reinicio; <code>/exposure</code> muestra el estado de cada túnel. Un túnel SSH al puerto 8788 también funciona.</p>
`
  },
  {
    slug: '/configuration',
    section: 'Configuration',
    title: 'Referencia completa de config.toml',
    description: 'Referencia completa de config.toml para aidaemon. Todas las secciones de configuración, claves, tipos y valores por defecto.',
    content: () => `
<h1>Configuración</h1>
<p class="lead">Referencia completa de <code>config.toml</code>. Todas las secciones y sus valores por defecto.</p>

<h2>[provider]</h2>
${configTable([
  ['kind', 'string', '"openai_compatible"', 'Tipo de proveedor: <code>openai_compatible</code>, <code>openai_chatgpt</code>, <code>anthropic</code>, <code>google_genai</code> o <code>xai_native</code>. Consulta <a href="/providers">Proveedores</a>.'],
  ['api_key', 'string', '—', 'Clave de API del proveedor (obligatoria)'],
  ['gateway_token', 'string', 'null', 'Token opcional de Cloudflare AI Gateway usado como <code>cf-aig-authorization</code>'],
  ['base_url', 'string', '"https://api.openai.com/v1"', 'URL base de la API (defínela para cualquier servicio <code>openai_compatible</code> distinto de OpenAI; opcional para <code>anthropic</code>, con o sin <code>/v1</code>)'],
  ['reasoning_effort', 'string', 'null', 'Pensamiento extendido, p. ej. <code>low</code>, <code>medium</code>, <code>high</code>, <code>off</code>'],
  ['max_tokens', 'integer', 'null', 'Tope de salida por llamada'],
  ['extra_headers', 'table', 'null', 'Encabezados HTTP adicionales enviados en cada llamada (los valores pueden ser <code>"keychain"</code>)'],
  ['auto_upgrade', 'bool', 'true', 'Cambia el modelo en uso a la versión más reciente de su línea cuando el proveedor la lista (se comprueba a diario y se prueba primero con una llamada a una herramienta). A los proveedores de pago por token solo se les avisa. Consulta <a href="/providers">Proveedores</a>.'],
])}

<h2>[[provider.fallbacks]]</h2>
<p>Respaldos entre proveedores, en orden, cada uno con las mismas claves que <code>[provider]</code> y su propio <code>[provider.fallbacks.models]</code>. Un proveedor cuya cuota, crédito o clave falla se omite hasta su reinicio indicado.</p>

<h2>[provider.models]</h2>
${configTable([
  ['primary', 'string', '(provider default)', 'Modelo por defecto para consultas generales'],
  ['fast', 'string', '(provider default)', 'Modelo de baja latencia para turnos simples (mejor modelos instruct sin razonamiento)'],
  ['smart', 'string', '(provider default)', 'Modelo para turnos de ejecución complejos (puede ser el mismo que primary)'],
  ['default', 'string', '—', 'El modelo para las solicitudes normales (<code>primary</code> es el nombre anterior)'],
  ['fallback', 'array', '[]', 'Modelos que se prueban, en orden, cuando fallan las llamadas'],
])}

${callout('info', 'Modelos por defecto', 'La configuración del primer arranque rellena automáticamente valores por defecto según el proveedor (a partir del catálogo del proveedor), y pueden cambiar entre versiones a medida que evolucionan los catálogos. En producción, fija IDs de modelo explícitos en <code>[provider.models]</code>. Si los tres niveles se resuelven al mismo modelo, el enrutamiento automático se desactiva. Consulta <a href="/router">Enrutamiento de modelos</a>.')}
${callout('warn', 'Recomendación para el nivel fast', 'Configura <code>provider.models.fast</code> con un modelo de instrucciones barato y sin razonamiento para el enrutamiento. Evita los modelos de razonamiento o pensamiento en <code>fast</code>, porque suelen aumentar el gasto de tokens y la latencia sin ningún beneficio para el enrutamiento.')}

<h2>[telegram]</h2>
${configTable([
  ['bot_token', 'string', '—', 'Token del bot de Telegram obtenido de @BotFather (obligatorio)'],
  ['allowed_user_ids', 'array', '[]', 'IDs numéricos de usuario de Telegram con permiso para chatear. Vacío: la primera persona que escribe directamente al bot se convierte en su propietaria, y nadie más tiene permiso.'],
])}

<h2>[slack]</h2>
<p>Requiere el feature flag <code>slack</code> en tiempo de compilación. Consulta <a href="/slack">Slack</a> para la guía de configuración completa.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Activa el canal de Slack'],
  ['app_token', 'string', '—', 'Token de nivel de app de Slack para Socket Mode (<code>xapp-...</code>)'],
  ['bot_token', 'string', '—', 'Token de bot de Slack para la Web API (<code>xoxb-...</code>)'],
  ['allowed_user_ids', 'array', '[]', 'IDs de usuario de Slack con permiso para interactuar. Vacío: la primera persona que escribe directamente al bot se convierte en su propietaria, y nadie más tiene permiso.'],
  ['use_threads', 'bool', 'true', 'Responde en hilos por defecto'],
])}

<h2>[discord]</h2>
<p>Requiere el feature flag <code>discord</code> en tiempo de compilación. Consulta <a href="/discord">Discord</a> para la guía de configuración completa.</p>
${configTable([
  ['bot_token', 'string', '&mdash;', 'Token del bot de Discord del Developer Portal'],
  ['allowed_user_ids', 'array', '[]', 'IDs de usuario de Discord con permiso para interactuar. Vacío: la primera persona que escribe directamente al bot se convierte en su propietaria, y nadie más tiene permiso.'],
  ['guild_id', 'integer', 'null', 'ID opcional de guild/servidor para restringir el bot a un solo servidor'],
])}

<p>Para más de un bot, usa <code>[[telegram_bots]]</code>, <code>[[slack_bots]]</code> o <code>[[discord_bots]]</code>: una entrada por bot, con las mismas claves de token y de usuarios.</p>

<h2>[state]</h2>
${configTable([
  ['db_path', 'string', '"aidaemon.db"', 'Ruta del archivo de base de datos SQLite'],
  ['working_memory_cap', 'integer', '50', 'Máximo de mensajes por sesión que se mantienen en memoria'],
  ['consolidation_interval_hours', 'integer', '6', 'Horas entre ejecuciones de consolidación de memoria'],
  ['max_facts', 'integer', '20', 'Número máximo de hechos inyectados en el prompt del sistema'],
  ['daily_token_budget', 'integer', 'null', 'Se ignora desde la 0.20.0 (se registra una vez al iniciar). Limita el gasto con un límite de gasto del proveedor; los presupuestos por objetivo y <code>subagents.task_token_budget</code> siguen aplicando.'],
  ['encryption_key', 'string', 'null', 'Clave de cifrado de SQLCipher (requiere la feature <code>encryption</code>). AES-256 en reposo.'],
  ['upgrade_backups', 'integer', '2', 'Snapshots que se conservan en <code>backups/</code>, junto a la base de datos; se escribe uno cuando una versión nueva de aidaemon la inicia por primera vez. <code>0</code> lo desactiva.'],
])}

<h3>[state.retention]</h3>
<p>Limpieza automática de datos antiguos, en días. <code>0</code> desactiva la limpieza de ese tipo.</p>
${configTable([
  ['messages_days', 'integer', '90', 'Mensajes consolidados'],
  ['diagnostic_events_days', 'integer', '7', 'Eventos de diagnóstico y de herramientas consolidados'],
  ['superseded_facts_days', 'integer', '90', 'Versiones anteriores de los hechos'],
  ['token_usage_aggregate_days', 'integer', '30', 'Pasado este tiempo, el uso de tokens en bruto se agrupa en totales diarios'],
  ['episodes_days', 'integer', '365', 'Episodios que nunca se recuperaron'],
  ['goals_days', 'integer', '180', 'Objetivos completados o abandonados'],
])}

<h2>[memory]</h2>
${configTable([
  ['backend', 'string', '"daemon"', '<code>daemon</code> (memoria integrada) o <code>sdk</code> (el crate aidaemon-memory; compila con <code>--features sdk-memory</code>)'],
  ['path', 'string', '"aidaemon-memory.db"', 'Archivo SQLite para el backend <code>sdk</code>'],
  ['embedding_model', 'string', '"AllMiniLML6V2Q"', 'Modelo local de fastembed, p. ej. <code>AllMiniLML6V2</code>, <code>BGESmallENV15</code>, <code>BGEBaseENV15</code>, <code>ParaphraseMLMiniLML12V2</code>. Cambiarlo vuelve a generar los embeddings de la memoria almacenada una vez, en segundo plano.'],
  ['project_memory', 'bool', 'true', 'Una conversación dentro de un proyecto guarda lo que aprende en las notas propias de ese proyecto'],
  ['projects_dir', 'string', '"~/.aidaemon/projects"', 'Dónde viven las notas de proyecto (un directorio por ID de proyecto)'],
])}

<h2>[terminal]</h2>
${configTable([
  ['allowed_prefixes', 'array', '(see below)', 'Prefijos de comando aprobados automáticamente, sin confirmación del usuario'],
  ['initial_timeout_secs', 'integer', '30', 'Tiempo de espera, en segundos, de la ejecución inicial de un comando'],
  ['max_output_chars', 'integer', '4000', 'Trunca la salida de los comandos más allá de esta longitud'],
  ['permission_mode', 'string', '"default"', 'Modo de permisos de riesgo: <code>default</code>, <code>cautious</code> o <code>yolo</code>. Consulta <a href="/tools/command-risk">Riesgo de comandos</a>.'],
  ['confinement', 'string', '"host"', '<code>host</code> ejecuta los comandos como tú; <code>sandbox</code> ejecuta cada uno en el sandbox del sistema operativo (seatbelt en macOS, bubblewrap o el sandbox de Codex en Linux) con acceso a archivos y a la red limitado a la tarea'],
])}

<p>Prefijos permitidos por defecto:</p>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

${callout('warn', 'Operadores de shell', 'Un comando encadenado (<code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code>) se ejecuta sin preguntar solo cuando cada parte empieza con un programa de <code>allowed_prefixes</code>. Los comandos con <code>$()</code> o comillas invertidas, las redirecciones a archivos o los programas lanzados a través de otro programa siempre preguntan.')}

<h2>[daemon]</h2>
${configTable([
  ['health_port', 'integer', '8080', 'Puerto del endpoint HTTP de comprobación de salud'],
  ['health_bind', 'string', '"127.0.0.1"', 'Dirección de enlace. Usa "0.0.0.0" para acceso externo.'],
  ['dashboard_enabled', 'bool', 'true', 'Sirve también el callback de OAuth y el webhook de activación de mandatos en el puerto de salud'],
])}

<h2>[triggers.email]</h2>
${configTable([
  ['host', 'string', '—', 'Nombre de host del servidor IMAP (p. ej., imap.gmail.com)'],
  ['port', 'integer', '—', 'Puerto IMAP (normalmente 993 para TLS)'],
  ['username', 'string', '—', 'Nombre de usuario de la cuenta de correo'],
  ['password', 'string', '—', 'Contraseña de la cuenta de correo o contraseña específica de aplicación'],
  ['folder', 'string', '"INBOX"', 'Carpeta IMAP a monitorear'],
])}

<h2>[mcp.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Ruta o nombre del ejecutable del servidor MCP'],
  ['args', 'array', '[]', 'Argumentos de línea de comandos'],
  ['env', 'table', '{}', 'Variables de entorno del servidor'],
  ['read_only_tools', 'array', '[]', 'Herramientas de este servidor que declaras de solo lectura; sus llamadas no se preguntan antes'],
])}

<h2>[browser]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Activa la herramienta de automatización del navegador'],
  ['headless', 'bool', 'true', 'Ejecuta Chrome sin una ventana visible'],
  ['screenshot_width', 'integer', '1280', 'Ancho del viewport del navegador en píxeles'],
  ['screenshot_height', 'integer', '720', 'Alto del viewport del navegador en píxeles'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Directorio del perfil de Chrome para sesiones persistentes'],
  ['profile', 'string', 'Default', 'Nombre del perfil de Chrome dentro de user_data_dir'],
  ['remote_debugging_port', 'integer', 'null', 'Se conecta a un Chrome existente en este puerto (avanzado)'],
  ['keep_sign_ins', 'bool', 'true', 'Conserva los inicios de sesión en el perfil de navegador propio del agente, para que inicies sesión en un sitio una sola vez'],
])}

<h2>[skills]</h2>
${configTable([
  ['dir', 'string', '"skills"', 'Directorio que contiene los archivos markdown de las skills'],
  ['enabled', 'bool', 'true', 'Activa el sistema de skills'],
  ['registries', 'array', '[]', 'URL de manifiestos JSON de registros de skills, para explorar e instalar skills'],
])}

<h2>[subagents]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Permite que el agente cree subagentes'],
  ['max_depth', 'integer', '3', 'Nivel máximo de anidamiento en la recursión de subagentes'],
  ['max_iterations', 'integer', '10', 'Heredado. Los subagentes no tienen un límite de pasos por defecto; definir esto (o <code>max_iterations_cap</code>, 25 por defecto) cambia a un límite estricto.'],
  ['max_response_chars', 'integer', '8000', 'Trunca las respuestas de los subagentes más allá de esta longitud'],
  ['timeout_secs', 'integer', '300', 'Segundos que un subagente puede pasar sin avanzar (sin llamar a una herramienta ni recibir respuesta del modelo) antes de detenerlo. Nunca limita el tiempo total de ejecución.'],
])}

<h2>[client_gateway]</h2>
<p>Sirve a la <a href="/app">app de AIDaemon</a> y a los dispositivos emparejados. Referencia completa: <a href="/app/gateway">Client Gateway y emparejamiento</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Sirve el Client Gateway'],
  ['bind', 'string', '"127.0.0.1"', 'Solo loopback'],
  ['port', 'integer', '8788', 'Puerto de escucha'],
  ['public_url', 'string', 'null', 'Dirección del túnel HTTPS para los enlaces de emparejamiento'],
])}

<h2>[surfaces]</h2>
<p>Vistas en vivo: mira el navegador del agente y toma el control desde una app emparejada.</p>
${configTable([
  ['enabled', 'bool', 'true', 'Ofrece vistas en vivo'],
  ['allow_control', 'bool', 'true', 'Permite tomar el control, no solo mirar'],
  ['control_anytime', 'bool', 'true', 'Toma el control sin que el agente lo pida; <code>false</code>: solo durante un traspaso'],
  ['desktop', 'bool', 'false', 'macOS con <code>[computer_use]</code>: también mira y maneja las pantallas de esta computadora'],
  ['max_live_sessions', 'integer', '8', 'Vistas en vivo abiertas a la vez'],
  ['max_fps', 'integer', '20', 'Máximo de fotogramas por segundo que recibe una vista'],
  ['max_width', 'integer', '1280', 'Fotograma más ancho que recibe una vista'],
  ['disconnect_grace_secs', 'integer', '30', 'El control vuelve al agente pasado este tiempo desde que tu dispositivo deja de mirar'],
  ['idle_release_secs', 'integer', '900', 'El control vuelve al agente tras este tiempo sin ninguna entrada'],
])}

<h2>[cli_agents]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Activa la herramienta de delegación a agentes de CLI'],
  ['timeout_secs', 'integer', '600', 'Pasado este tiempo, un agente de CLI sigue ejecutándose en segundo plano y su resultado se entrega cuando termina'],
  ['max_output_chars', 'integer', '16000', 'Longitud máxima global de la salida de los agentes de CLI'],
])}

<h2>[cli_agents.tools.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Comando a ejecutar'],
  ['args', 'array', '[]', 'Argumentos por defecto que se pasan al comando'],
  ['description', 'string', '—', 'Descripción de la herramienta que se muestra al LLM'],
  ['timeout_secs', 'integer', 'null', 'Reemplaza el tiempo de espera global para esta herramienta'],
  ['max_output_chars', 'integer', 'null', 'Reemplaza la salida máxima global para esta herramienta'],
  ['protocol', 'string', 'null', '<code>"acp"</code> aloja un agente que habla el Agent Client Protocol; cada acción que realiza se pregunta antes'],
])}

<h2>[search]</h2>
${configTable([
  ['backend', 'string', '"duckduckgo"', 'Backend de búsqueda: <code>duckduckgo</code> (no necesita clave), <code>brave</code> o <code>searxng</code>'],
  ['api_key', 'string', '""', 'Clave de API para la búsqueda de Brave (admite <code>"keychain"</code>)'],
  ['searxng_url', 'string', '""', 'Dirección de tu propia instancia de SearxNG'],
  ['parallel', 'bool', 'true', 'Consulta a la vez todos los backends configurados y combina los resultados'],
])}

<h2>[heartbeat]</h2>
<p>Ejecuta las tareas programadas y el trabajo en segundo plano. Las programaciones se crean pidiéndoselo al agente en el chat o en la app, no en este archivo; una sección <code>[scheduler]</code> antigua se ignora. Consulta <a href="/scheduler">Tareas programadas</a>.</p>
${configTable([
  ['enabled', 'bool', 'true', 'Ejecuta el trabajo programado y el de segundo plano'],
  ['tick_interval_secs', 'integer', '30', 'Con qué frecuencia se revisa el trabajo pendiente'],
  ['max_concurrent_llm_tasks', 'integer', '3', 'Máximo de tareas respaldadas por modelo que se ejecutan a la vez'],
])}

<h2>[files]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Activa las herramientas de transferencia de archivos (enviar/recibir)'],
  ['inbox_dir', 'string', '"~/.aidaemon/files/inbox"', 'Directorio de los archivos recibidos desde Telegram'],
  ['outbox_dirs', 'array', '["~"]', 'Directorios desde los que el agente puede enviar archivos'],
  ['max_file_size_mb', 'integer', '10', 'Tamaño máximo de archivo para las transferencias, en MB'],
  ['retention_hours', 'integer', '24', 'Horas que se conservan los archivos recibidos antes de limpiarlos'],
])}

<h2>[agent]</h2>
${configTable([
  ['name', 'string', '"aidaemon"', 'El nombre del asistente'],
  ['persona_file', 'string', 'null', 'Archivo markdown de persona (las rutas relativas se resuelven junto a <code>config.toml</code>)'],
])}

<h2>[execution]</h2>
<p>Dónde se ejecutan los comandos y las herramientas de archivos del agente.</p>
${configTable([
  ['backend', 'string', '"local"', '<code>local</code>, <code>docker</code> (ajustes en <code>[execution.docker]</code>) o <code>ssh</code> (ajustes en <code>[execution.ssh]</code>)'],
  ['workspace_root', 'string', 'null', 'Directorio de trabajo para las rutas relativas. Por defecto en local: la carpeta del daemon.'],
  ['allow_outside_workspace', 'bool', 'true (local)', 'Permite que las herramientas basadas en rutas lleguen fuera de <code>workspace_root</code>. Por defecto es false en los backends remotos.'],
])}

<h2>[checkpoints]</h2>
<p>Beta: un snapshot de Git en la sombra del espacio de trabajo antes del primer cambio de archivo de cada turno. <code>enabled = false</code> por defecto.</p>

<h2>[computer_use]</h2>
<p>Operar apps nativas de macOS (compila con <code>--features computer_use-macos</code>). <code>enabled = false</code> por defecto.</p>

<h2>[exposure.client_gateway]</h2>
<p>Un túnel que ejecuta el daemon para que otros dispositivos lleguen a la app. Consulta <a href="/app/gateway">Client Gateway y emparejamiento</a>.</p>

<h2>Gestión de secretos</h2>
<p>Los valores de configuración sensibles admiten dos métodos de resolución además del texto plano, más un modo de almacenamiento opcional solo con variables de entorno:</p>

<h3>Llavero del sistema operativo</h3>
<p>Define cualquier campo secreto como <code>"keychain"</code> para resolverlo desde el llavero del sistema operativo (Llavero de macOS, Administrador de credenciales de Windows, secret-service de Linux):</p>
${codeBlock(`[provider]
api_key = "keychain"    # Resolved from keychain entry "api_key"

[telegram]
bot_token = "keychain"  # Resolved from keychain entry "bot_token"`, 'toml')}

<p>Guarda los valores con el comando de CLI <code>keychain</code> antes del primer arranque:</p>
${codeBlock(`# Store a secret (prompts interactively)
aidaemon keychain set api_key
aidaemon keychain set bot_token

# Verify a stored secret (shows masked value)
aidaemon keychain get api_key

# Remove a secret
aidaemon keychain delete api_key`, 'bash')}

${callout('tip', 'Seguridad', 'El comando <code>set</code> pide el valor de forma interactiva y con confirmación, de modo que los secretos no queden en el historial de tu shell.')}

<h3>Variables de entorno</h3>
<p>Usa la sintaxis <code>\${VAR_NAME}</code> en cualquier valor de configuración:</p>
${codeBlock(`[provider]
api_key = "\${GOOGLE_API_KEY}"

[telegram]
bot_token = "\${TELEGRAM_BOT_TOKEN}"`, 'toml')}

<h3>Modo solo entorno (sin llavero)</h3>
<p>Si prefieres no usar el llavero del sistema operativo, define estas variables de entorno de ejecución:</p>
${codeBlock(`# Disable OS keychain storage and use env file-backed secrets
export AIDAEMON_NO_KEYCHAIN=1

# Optional: choose a specific env file path (default: ./.env)
export AIDAEMON_ENV_FILE=/absolute/path/to/.env`, 'bash')}

<p>En este modo, aidaemon lee los secretos del archivo env seleccionado (o del entorno del proceso cuando no existe un archivo env) y guarda de vuelta en ese archivo las actualizaciones de secretos &mdash; incluida la rotación de los tokens de acceso y de refresco de OAuth.</p>

${callout('warning', 'Seguridad del modo solo entorno', 'Mantén el archivo env privado (<code>chmod 600</code>) y fuera del control de versiones.')}

${callout('info', 'Campos de llavero admitidos', 'Campos que admiten <code>"keychain"</code>: <code>provider.api_key</code>, <code>provider.gateway_token</code>, <code>telegram.bot_token</code>, <code>slack.app_token</code>, <code>slack.bot_token</code>, <code>discord.bot_token</code>, <code>triggers.email.password</code>, <code>state.encryption_key</code>, <code>search.api_key</code> y los campos de perfil de <code>http_auth.*</code>.')}

<p>La entrada del llavero que lee cada campo (el nombre que debes dar a <code>aidaemon keychain set</code>):</p>
<ul>
  <li><code>provider.api_key</code> &rarr; <code>api_key</code>; la primera entrada de <code>[[provider.fallbacks]]</code> &rarr; <code>provider_fallback_0_api_key</code></li>
  <li><code>provider.gateway_token</code> &rarr; <code>gateway_token</code></li>
  <li><code>telegram.bot_token</code> &rarr; <code>bot_token</code></li>
  <li><code>slack.app_token</code> / <code>slack.bot_token</code> &rarr; <code>slack_app_token</code> / <code>slack_bot_token</code></li>
  <li><code>discord.bot_token</code> &rarr; <code>discord_bot_token</code></li>
  <li><code>triggers.email.password</code> &rarr; <code>email_password</code></li>
  <li><code>state.encryption_key</code> &rarr; <code>encryption_key</code></li>
  <li><code>search.api_key</code> &rarr; <code>search_api_key</code></li>
</ul>

<h2>[health]</h2>
<p>Sistema de monitoreo de salud. Consulta <a href="/health-monitoring">Monitoreo de salud</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Activa el sistema de monitoreo de salud'],
  ['tick_interval_secs', 'integer', '30', 'Con qué frecuencia se buscan sondas pendientes'],
  ['result_retention_days', 'integer', '7', 'Días que se conservan los resultados de las comprobaciones de salud'],
])}

<h2>[[health.probes]]</h2>
${configTable([
  ['name', 'string', '&mdash;', 'Nombre de la sonda'],
  ['type', 'string', '&mdash;', 'Tipo de sonda: <code>http</code>, <code>command</code>, <code>file</code> o <code>port</code> (<code>tcp</code>)'],
  ['target', 'string', '&mdash;', 'URL, comando, ruta de archivo o host:puerto de destino'],
  ['schedule', 'string', '&mdash;', 'Expresión cron o intervalo'],
  ['consecutive_failures_alert', 'integer', '3', 'Alerta tras N fallos consecutivos'],
  ['alert_session_ids', 'array', '[]', 'IDs de sesión a notificar en una alerta'],
])}

<h2>[updates]</h2>
<p>Sistema de autoactualización. Consulta <a href="/updates">Autoactualizador</a>.</p>
${configTable([
  ['mode', 'string', '"check_only"', 'Modo de actualización: enable, check_only o disable'],
  ['check_interval_hours', 'integer', '24', 'Horas entre comprobaciones de actualización'],
  ['check_at_utc_hour', 'integer', 'null', 'Hora UTC concreta (0-23) para la comprobación diaria'],
  ['confirmation_timeout_mins', 'integer', '60', 'Minutos de espera de la aprobación del usuario'],
])}

<h2>[people]</h2>
<p>Inteligencia de personas: una libreta de contactos personal gestionada por tu asistente. Consulta <a href="/tools/people">Inteligencia de personas</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Estado inicial de la inteligencia de personas (se puede alternar en tiempo de ejecución desde el chat)'],
  ['fact_retention_days', 'integer', '180', 'Días antes de depurar los hechos extraídos automáticamente que no se han confirmado'],
  ['reconnect_reminder_days', 'integer', '30', 'Días de inactividad antes de sugerir retomar el contacto'],
])}

<h2>Ejemplo de configuración</h2>
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
    title: 'Configuración de proveedores',
    description: 'Configura proveedores de LLM para aidaemon: suscripción a ChatGPT, Anthropic, Google Gemini, APIs compatibles con OpenAI, xAI, modelos locales, respaldos y actualizaciones de modelo.',
    content: () => `
<h1>Configuración de proveedores</h1>
<p class="lead">La configuración del primer arranque de la app y su página Settings escriben la sección <code>[provider]</code> por ti. Esta página muestra lo que escriben, para que puedas editarlo a mano.</p>

<h2>Tipos de proveedor</h2>
<table class="config-table">
<thead><tr><th>kind</th><th>Se usa para</th></tr></thead>
<tbody>
<tr><td><code>openai_chatgpt</code></td><td>Un plan de ChatGPT mediante inicio de sesión (sin clave de API)</td></tr>
<tr><td><code>anthropic</code></td><td>La Messages API nativa de Anthropic</td></tr>
<tr><td><code>google_genai</code></td><td>La API nativa de Google Gemini</td></tr>
<tr><td><code>xai_native</code></td><td>xAI (Grok)</td></tr>
<tr><td><code>openai_compatible</code> (por defecto; <code>base_url</code> vale por defecto <code>https://api.openai.com/v1</code>)</td><td>OpenAI, OpenRouter, DeepSeek, Moonshot, MiniMax, Cloudflare AI Gateway, Ollama, llama.cpp y cualquier API compatible con OpenAI</td></tr>
</tbody>
</table>
<p><code>api_key = "keychain"</code> lee la clave del llavero del sistema operativo; <code>api_key = "\${ENV_VAR}"</code> la lee del entorno. Consulta <a href="/configuration">Gestión de secretos</a>.</p>

<h2>Suscripción a ChatGPT</h2>
<p>Se ejecuta con un plan de ChatGPT en lugar de la facturación medida de la API. Inicia sesión desde la app, o en una terminal:</p>
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
<p>Cuando se alcanza el límite de uso del plan, la llamada pasa directamente a tus proveedores de respaldo hasta el reinicio indicado. Settings muestra los límites de 5 horas y semanales del plan.</p>

<h2>Anthropic</h2>
${codeBlock(`[provider]
kind = "anthropic"
api_key = "keychain"
# base_url = "https://api.anthropic.com/v1"   # optional; with or without /v1

[provider.models]
primary = "claude-sonnet-5-5"
fast = "claude-haiku-5-5"
smart = "claude-opus-5-5"`, 'toml')}
${callout('info', 'URL base', 'La raíz de la API puede indicarse con o sin un <code>/v1</code> final (el catálogo de proveedores usa <code>https://api.anthropic.com/v1</code>); las solicitudes siempre van a <code>/v1/messages</code>. Antes de la 0.21.0, una URL base que terminaba en <code>/v1</code> se enviaba a <code>/v1/v1/messages</code> y todas las llamadas fallaban con un 404.')}
<h3>Caché de prompts</h3>
<p>aidaemon usa la caché de prompts de Anthropic. El prefijo fijo (las definiciones de herramientas y el prompt del sistema) se guarda en caché durante una hora, de modo que una respuesta tras una pausa, o una conversación nueva dentro de esa hora, lo lee de la caché. La cola de la conversación conserva la caché de cinco minutos. Las herramientas diferidas se declaran desde el principio, así que cargar una con <code>load_tools</code> ya no reescribe la caché. <code>reasoning_effort</code> (<code>low</code>, <code>medium</code>, <code>high</code>, <code>off</code>) corresponde al pensamiento extendido.</p>

<h2>Google Gemini</h2>
<p>API nativa de Google Generative AI, con una clave de <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Google AI Studio</a>.</p>
${codeBlock(`[provider]
kind = "google_genai"
api_key = "keychain"

[provider.models]
primary = "gemini-4-hydrogen"
fast = "gemini-3.5-flash-lite"
smart = "gemini-4-argon"`, 'toml')}
<p>Cuando una solicitud no ofrece herramientas, Gemini puede fundamentar su respuesta con Google Search. Los resultados de las herramientas se devuelven como partes con rol de usuario, como exigen los modelos actuales de Gemini (corregido en la 0.21.0: antes, un turno con una llamada a una herramienta seguía recurriendo al respaldo y nunca respondía). Una cuota diaria agotada pasa la llamada a tus proveedores de respaldo de inmediato.</p>

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
<p>Modelos de muchos proveedores con una sola clave y el formato compatible con OpenAI. Settings muestra el saldo de la clave. La lista de proveedores también incluye <strong>Anthropic (vía OpenRouter)</strong> (<code>anthropic/claude-sonnet-4</code>, <code>anthropic/claude-haiku-4</code>, <code>anthropic/claude-opus-4</code> con una clave de OpenRouter), que se ofrece en Settings pero no en el primer arranque.</p>
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
<p>Se coloca delante de los proveedores de origen y expone un endpoint compatible con OpenAI.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "keychain"          # upstream provider key
gateway_token = "keychain"    # optional: Authenticated Gateway mode
base_url = "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/compat"

[provider.models]
primary = "your-model-id"`, 'toml')}
${callout('info', 'Modos de autenticación de Cloudflare', 'Puedes usar solo <code>api_key</code> (modo básico), o añadir <code>gateway_token</code> para enviar <code>cf-aig-authorization</code> en el modo Authenticated Gateway.')}

<h2>Ollama y llama.cpp (local)</h2>
<p>Los modelos autoalojados no necesitan clave. La configuración del primer arranque lista los modelos que ofrece tu servidor.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = ""
base_url = "http://localhost:11434/v1"   # Ollama
# base_url = "http://localhost:8080/v1"  # llama.cpp's llama-server

[provider.models]
primary = "your-model-id"`, 'toml')}
${callout('warn', 'Direcciones locales', 'Usa HTTPS para cualquier servidor que no esté en esta máquina: la clave se envía con cada solicitud. <code>llama-server</code> y la comprobación de salud del daemon usan por defecto el puerto 8080: mueve uno de los dos (<code>llama-server --port 8081</code>, o <code>[daemon] health_port</code>).')}

<h2>Proveedores de respaldo</h2>
<p>Las entradas de <code>[[provider.fallbacks]]</code> se prueban en orden después de los modelos propios del proveedor principal. Un proveedor cuya cuenta no puede responder (el límite de uso de un plan, una cuota diaria, falta de crédito, una clave rechazada) se omite de inmediato y sigue omitido hasta su reinicio indicado. Al cambiar el proveedor principal en Settings, el anterior se conserva como failover.</p>
${codeBlock(`[[provider.fallbacks]]
kind = "anthropic"
api_key = "keychain"
[provider.fallbacks.models]
default = "claude-sonnet-5-5"`, 'toml')}
<p><code>[provider.models]</code> acepta <code>primary</code> / <code>fast</code> / <code>smart</code> o bien <code>default</code> más una lista ordenada <code>fallback = [...]</code> de modelos que se prueban cuando fallan las llamadas.</p>

<h2>Actualizaciones de modelo</h2>
<p>Una vez al día, el daemon revisa la lista de modelos de cada proveedor y pasa un modelo a la versión más reciente de su propia línea (por ejemplo, <code>gpt-6-sol</code> a <code>gpt-6.2-sol</code>; nunca a otro tamaño, un snapshot o una versión preliminar). Primero prueba el modelo nuevo con una llamada a una herramienta, conserva el anterior como primer respaldo y te avisa. Con un proveedor de pago por token, solo se te avisa. Desactívalo con:</p>
${codeBlock(`[provider]
auto_upgrade = false`, 'toml')}
<p>Fijar un modelo con <code>/model</code> pospone la actualización.</p>
`
  },
  {
    slug: '/telegram',
    section: 'Telegram',
    title: 'Configuración del bot',
    description: 'Configura AIDaemon como un bot de Telegram: crea un bot con BotFather, define quién puede usarlo y, opcionalmente, usa webhooks.',
    content: () => `
<h1>Configuración del bot de Telegram</h1>
<p class="lead">Telegram es el canal principal de AIDaemon. AIDaemon habla directamente con la Bot API de Telegram, usando long polling por defecto o, de forma opcional, un webhook para menor latencia. Consulta también <a href="/slack">Slack</a> para la integración con un workspace.</p>

<h2>Crear un bot</h2>
<ol>
  <li>Escribe a <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a> en Telegram</li>
  <li>Envía <code>/newbot</code> y sigue las indicaciones</li>
  <li>Copia el token del bot (formato: <code>123456789:ABCdefGHIjklMNOpqrSTUvwxYZ</code>)</li>
</ol>

<h2>Obtén tu ID de usuario</h2>
<p>Tu ID numérico de usuario de Telegram es necesario para la lista <code>allowed_user_ids</code>. Puedes encontrarlo escribiendo a <a href="https://t.me/userinfobot" target="_blank" rel="noopener">@userinfobot</a>.</p>
<p>O simplemente escribe a tu bot: si todavía no tienes permiso, te responde con tu ID numérico y la línea exacta de <code>allowed_user_ids</code> que debes añadir.</p>

<h2>Configuración</h2>
${codeBlock(`[telegram]
bot_token = "keychain"   # or the token itself, or "\${TELEGRAM_BOT_TOKEN}"
allowed_user_ids = [123456789]`, 'toml', 'config.toml')}

${callout('warn', 'Control de acceso', 'Si <code>allowed_user_ids</code> está vacío, la <strong>primera persona que escriba al bot en privado</strong> se convierte en su propietaria, y ese ID se guarda en config.toml. Los mensajes de grupo se rechazan hasta que exista un propietario. Define <code>allowed_user_ids</code> antes de compartir el nombre del bot.')}

<h2>Propietarios e invitados</h2>
<p>Los propietarios se listan por plataforma en <code>[users] owner_ids</code>. Si no se define ninguno, todos los usuarios permitidos son propietarios. Solo los propietarios pueden responder aprobaciones y ejecutar comandos que cambian cosas; los demás usuarios permitidos son invitados.</p>
${codeBlock(`[users]
owner_ids = { telegram = ["123456789"] }`, 'toml', 'config.toml')}

<h2>Modo webhook</h2>
<p>Long polling no requiere configuración. Para una menor latencia de entrega, un bot puede recibir las actualizaciones por webhook:</p>
${codeBlock(`[telegram.webhook]
enabled = true
public_url = "https://bot.example.com"
listen_addr = "0.0.0.0:8443"

# Or give every bot a webhook automatically:
# [telegram_webhook_defaults]
# enabled = true
# base_domain = "bots.example.com"   # each bot gets <slug>.bots.example.com
# port_start = 8443`, 'toml', 'config.toml')}
<p>Desde el chat, <code>/setup lowlatency</code> te guía paso a paso.</p>

<h2>Funciones</h2>
<ul>
  <li><strong>Indicador de escritura</strong> &mdash; se reenvía cada 3 segundos aproximadamente mientras el agente trabaja</li>
  <li><strong>Renderizado de markdown</strong> &mdash; las respuestas del agente se convierten a HTML de Telegram</li>
  <li><strong>División de mensajes largos</strong> &mdash; las respuestas de más de 4096 caracteres se dividen en los límites de párrafo o de línea</li>
  <li><strong>Envío de capturas de pantalla</strong> &mdash; las capturas del navegador se envían como fotos con pie de foto</li>
  <li><strong>Transferencia de archivos</strong> &mdash; envía y recibe documentos, fotos, audio y video por Telegram</li>
  <li><strong>Estado de tareas en vivo</strong> &mdash; <code>/tasks</code> muestra lo que se está ejecutando en este chat</li>
  <li><strong>Botones de aprobación en línea</strong> &mdash; botones <strong>Allow</strong>, <strong>Always allow</strong> (o <strong>Allow until restart</strong>) y <strong>Deny</strong> para las aprobaciones (consulta <a href="/telegram/approval">Flujo de aprobación</a>)</li>
  <li><strong>Compatibilidad con varios bots</strong> &mdash; configura varios bots de Telegram con entradas <code>[[telegram_bots]]</code>, o añade uno desde el chat con <code>/connect</code></li>
  <li><strong>Manejo avanzado de archivos</strong> &mdash; detección de tipo MIME, límites de tamaño y validación de seguridad de rutas</li>
</ul>

<h2>Comportamiento de reintento</h2>
<p>Si la conexión del bot se detiene, AIDaemon la reinicia con retroceso exponencial:</p>
<ul>
  <li>Retroceso inicial: 5 s</li>
  <li>Se duplica cada vez: 5 s &rarr; 10 s &rarr; 20 s &rarr; 40 s &rarr; 60 s (máx.), con un poco de jitter aleatorio</li>
  <li>Vuelve a 5 s si el bot se mantiene estable durante más de 60 segundos</li>
</ul>
`
  },
  {
    slug: '/telegram/commands',
    section: 'Telegram',
    title: 'Comandos',
    description: 'Comandos de Telegram para AIDaemon: /clear, /tasks, /cancel, /status, /model, /cost, /mode y más.',
    content: () => `
<h1>Comandos de Telegram</h1>
<p class="lead">Comandos slash integrados para controlar al agente desde Telegram. Aparecen en el menú <code>/</code> de Telegram. Rara vez los necesitas: pide las cosas con tus propias palabras y el agente elige las herramientas adecuadas.</p>

<p><code>/help</code> (o <code>/start</code>) muestra los comandos de uso diario; <code>/help all</code> lista todos los comandos.</p>

<h2>Conversación</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>/clear</code> (o <code>/new</code>)</td><td>Inicia una conversación nueva. Tu historial se conserva y el trabajo que se ejecuta en este chat se detiene.</td></tr>
<tr><td><code>/wipe</code></td><td>Elimina esta conversación de forma permanente. El primer <code>/wipe</code> solo lo explica; envíalo de nuevo en unos minutos para borrarla. Los hechos ya guardados en la memoria se conservan.</td></tr>
<tr><td><code>/context</code></td><td>Muestra cuánto de la conversación puede ver el agente</td></tr>
<tr><td><code>/project [name|none]</code></td><td>Muestra o cambia el proyecto en el que trabaja este chat</td></tr>
<tr><td><code>/memory</code></td><td>Muestra la memoria del proyecto en el que trabaja este chat</td></tr>
</tbody>
</table>

<h2>Trabajo</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>/tasks</code></td><td>Lista, numerado, lo que se está ejecutando en este chat</td></tr>
<tr><td><code>/cancel</code>, <code>/cancel all</code>, <code>/cancel &lt;number&gt;</code></td><td>Detiene lo que se está ejecutando en este chat: todo lo de una solicitud, todo, o un elemento (los números salen de <code>/tasks</code>)</td></tr>
<tr><td><code>/status</code></td><td>El modo de este chat, lo que se está ejecutando y el siguiente elemento programado</td></tr>
<tr><td><code>/work [ready|running|blocked|show|comment|unblock|retry]</code></td><td>Consulta y gestiona el trabajo más largo que espera o se ejecuta por su cuenta</td></tr>
<tr><td><code>/cost</code></td><td>Muestra el uso de tokens (últimas 24 h, últimos 7 días, modelos principales)</td></tr>
</tbody>
</table>

<h2>Modelos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Muestra el modelo actual</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Usa un solo modelo en todos los chats (desactiva la elección automática de modelo)</td></tr>
<tr><td><code>/models</code></td><td>Lista los modelos que ofrece tu proveedor (el activo aparece marcado)</td></tr>
<tr><td><code>/auto</code></td><td>Vuelve a la elección automática de modelo</td></tr>
</tbody>
</table>

<h2>Acceso y privacidad</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>/mode [full|unrestricted|readonly]</code></td><td>Muestra o cambia el modo de acceso de este chat</td></tr>
<tr><td><code>/readonly</code></td><td>Deja este chat en solo lectura durante 4 horas</td></tr>
<tr><td><code>/private [off]</code></td><td>No recuerda ni aprende de tu próximo mensaje (<code>off</code> lo cancela)</td></tr>
<tr><td><code>/trustall on|off</code></td><td>Ejecuta todos los comandos de terminal sin preguntar</td></tr>
</tbody>
</table>

<h2>Archivos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>/checkpoints</code></td><td>Lista los checkpoints del sistema de archivos</td></tr>
<tr><td><code>/rollback [checkpoint-id|confirm TOKEN]</code></td><td>Previsualiza la restauración de un checkpoint y luego la confirma</td></tr>
</tbody>
</table>

<h2>Dispositivos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>/pair_device</code></td><td>Empareja un teléfono o navegador con la app</td></tr>
<tr><td><code>/devices</code></td><td>Lista los dispositivos emparejados</td></tr>
<tr><td><code>/revoke_device &lt;id&gt;</code></td><td>Desempareja un dispositivo</td></tr>
<tr><td><code>/exposure</code></td><td>Muestra los túneles que publican los gateways</td></tr>
</tbody>
</table>

<h2>Gestión de bots</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>/reload</code></td><td>Vuelve a leer config.toml y aplica los cambios de proveedor y de modelo (ver abajo)</td></tr>
<tr><td><code>/restart</code></td><td>Reinicio completo: inicia un proceso nuevo y toma un binario, una configuración y servidores MCP nuevos</td></tr>
<tr><td><code>/setkey</code></td><td>Reemplaza la clave de API de un proveedor (funciona incluso cuando no hay ningún modelo disponible; solo en chat privado)</td></tr>
<tr><td><code>/connect &lt;platform&gt; &lt;token&gt;</code></td><td>Añade un nuevo canal de bot</td></tr>
<tr><td><code>/bots</code></td><td>Lista los bots conectados</td></tr>
<tr><td><code>/setup [lowlatency]</code></td><td>Asistente de configuración (webhooks, baja latencia)</td></tr>
<tr><td><code>/agent [codex|claude|gemini|opencode] [dir]</code></td><td>Inicia o gestiona sesiones de agentes de CLI</td></tr>
<tr><td><code>/terminal [lite|start|open]</code></td><td>Comandos del puente de terminal</td></tr>
</tbody>
</table>

${callout('info', 'Quién puede usar los comandos', 'La mayoría de los comandos son solo para propietarios. En un chat compartido, los invitados pueden usar <code>/tasks</code>, <code>/private</code>, <code>/context</code>, <code>/readonly</code>, <code>/mode</code> y <code>/cancel</code>; los últimos cuatro indican por sí mismos si el invitado puede actuar.')}

<h2>Cambio de modelo</h2>
${codeBlock(`/model claude-sonnet-5-5
# Uses claude-sonnet-5-5 in every chat and turns off automatic model choice

/auto
# Goes back to automatic model choice`, 'text')}

${callout('info', 'Modelo fijado', 'Cuando defines un modelo con <code>/model</code>, la elección automática de modelo permanece desactivada hasta que envíes <code>/auto</code>. La elección de <code>/model</code> se aplica a todos los chats. Un modelo elegido para una conversación en la app tiene prioridad sobre ella.')}

<h2>Recarga de la configuración</h2>
<p><code>/reload</code> vuelve a leer <code>config.toml</code> y aplica los cambios de proveedor y de modelo sin reiniciar. Los demás cambios necesitan <code>/restart</code>. Si el archivo deja de cargarse, <code>/reload</code> restaura <code>config.toml.bak</code>.</p>
<p>Al iniciar, una configuración dañada se restaura automáticamente, probando en este orden:</p>
<ol>
  <li><code>.toml.lastgood</code> &mdash; la última configuración que completó una llamada al modelo</li>
  <li><code>.toml.bak</code> &rarr; <code>.toml.bak.1</code> &rarr; <code>.toml.bak.2</code></li>
</ol>
`
  },
  {
    slug: '/telegram/approval',
    section: 'Telegram',
    title: 'Flujo de aprobación',
    description: 'Aprobación con teclado en línea en Telegram para los comandos y acciones que necesitan tu visto bueno.',
    content: () => `
<h1>Flujo de aprobación de comandos</h1>
<p class="lead">Aprobación interactiva con teclado en línea para los comandos y acciones que necesitan tu visto bueno.</p>

<h2>Cómo funciona</h2>
<ol>
  <li>El agente quiere ejecutar un comando de terminal (o realizar otra acción) que necesita tu aprobación. Un comando se ejecuta sin preguntar cuando ya lo permitiste, o cuando está en la lista segura y puede ejecutarse confinado. En otro caso, una revisión rápida de riesgo decide si es lo bastante peligroso como para preguntarte.</li>
  <li>La tarjeta de aprobación se publica en el chat donde se ejecuta el trabajo. Solo un propietario puede responderla; un invitado que comparte el chat ve la tarjeta pero no puede decidirla.</li>
  <li>La tarjeta muestra el comando, su riesgo y cualquier advertencia, con estos botones:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Approval needed:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Always allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Opciones de aprobación</h2>
<table class="config-table">
<thead><tr><th>Opción</th><th>Comportamiento</th></tr></thead>
<tbody>
<tr><td><strong>Allow</strong></td><td>Lo ejecuta solo esta vez</td></tr>
<tr><td><strong>Always allow</strong></td><td>Lo ejecuta y recuerda el programa en la base de datos (por destino de ejecución), así que no se te vuelve a preguntar, ni siquiera tras un reinicio. config.toml no se modifica.</td></tr>
<tr><td><strong>Allow until restart</strong></td><td>Se muestra en lugar de <strong>Always allow</strong> para los comandos críticos, o para todo cuando <code>terminal.permission_mode = "cautious"</code>. El permiso dura hasta que el daemon se reinicia.</td></tr>
<tr><td><strong>Deny</strong></td><td>Lo rechaza &mdash; al agente se le informa de que se denegó</td></tr>
</tbody>
</table>
<p>Algunas acciones ofrecen solo <strong>Allow</strong> y <strong>Deny</strong>. Las tarjetas también cubren más que los comandos de terminal, como las acciones del navegador y la confirmación de nuevo trabajo programado (<strong>Approve &amp; activate</strong> / <strong>Cancel</strong>).</p>

${callout('info', 'Caducidad', 'Una tarjeta sin responder caduca a los 5 minutos, con un recordatorio poco antes, y cuenta como <strong>Deny</strong>.')}

<h2>Lo que siempre pregunta</h2>
<ul>
  <li>Comandos de disparadores no confiables, como el <a href="/triggers">correo</a></li>
  <li>Comandos que piden capacidades más allá de la tarea</li>
  <li>Comandos que tocan rutas protegidas de credenciales, aunque se hayan permitido antes</li>
  <li>Comandos nuevos que seguirían ejecutándose en segundo plano (desacoplados)</li>
</ul>

${callout('warn', 'Comandos encadenados', 'Un comando encadenado (<code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code>) cuenta como permitido solo si el programa de cada parte está en tu lista de permitidos permanente. Un permiso que diste para una sesión nunca desbloquea una cadena. La sustitución de comandos (<code>$()</code>, comillas invertidas) nunca queda cubierta por un permiso.')}

${callout('danger', 'Fuentes no confiables', 'Las sesiones iniciadas por disparadores (como el correo) no son confiables. Cada comando de terminal en ellas requiere aprobación, sin importar lo que hayas permitido antes.')}
`
  },
  {
    slug: '/slack',
    section: 'Slack',
    title: 'Configuración del workspace',
    description: 'Conecta AIDaemon a Slack mediante Socket Mode. Crea una app de Slack, añade permisos y eventos, y define quién puede usarla.',
    content: () => `
<h1>Integración con Slack</h1>
<p class="lead">Conecta AIDaemon a tu workspace de Slack mediante Socket Mode para mensajería en tiempo real.</p>

${callout('success', 'Binarios precompilados', 'Si instalaste con el script de una línea o con Homebrew, la compatibilidad con Slack ya está incluida. Solo configura <code>config.toml</code> como se indica abajo. El feature flag solo hace falta al <a href="/getting-started/build">compilar desde el código fuente</a>.')}

<h2>Crear una app de Slack</h2>
<ol>
  <li>Ve a <a href="https://api.slack.com/apps" target="_blank" rel="noopener">api.slack.com/apps</a> y haz clic en <strong>Create New App</strong></li>
  <li>Elige <strong>From scratch</strong>, ponle un nombre (p. ej., "AIDaemon") y selecciona tu workspace</li>
  <li>En <strong>Socket Mode</strong>, actívalo y genera un <strong>App-Level Token</strong> con el scope <code>connections:write</code> &mdash; este es tu <code>app_token</code> (<code>xapp-...</code>)</li>
  <li>En <strong>OAuth &amp; Permissions</strong>, añade estos <strong>Bot Token Scopes</strong>:
    <ul>
      <li><code>app_mentions:read</code> &mdash; ver los mensajes que mencionan con @ al bot</li>
      <li><code>channels:history</code> &mdash; leer mensajes e hilos en canales públicos (también lo usa la herramienta <code>read_channel_history</code>)</li>
      <li><code>channels:read</code> &mdash; listar los miembros de los canales públicos</li>
      <li><code>chat:write</code> &mdash; enviar mensajes</li>
      <li><code>files:read</code> &mdash; descargar los archivos que envían los usuarios</li>
      <li><code>files:write</code> &mdash; subir archivos a Slack</li>
      <li><code>groups:history</code> &mdash; leer mensajes e hilos en canales privados</li>
      <li><code>groups:read</code> &mdash; listar los miembros de los canales privados (necesario para resolver nombres de usuario en canales privados)</li>
      <li><code>im:history</code> &mdash; leer mensajes directos</li>
      <li><code>im:read</code> &mdash; leer los metadatos de los mensajes directos (necesario para transferir archivos en mensajes directos)</li>
      <li><code>reactions:write</code> &mdash; añadir reacciones de estado (un reloj de arena durante el procesamiento)</li>
      <li><code>users:read</code> &mdash; resolver la información de los usuarios</li>
    </ul>
  </li>
  <li>En <strong>Event Subscriptions</strong>, activa los eventos y suscríbete a estos eventos del bot:
    <ul>
      <li><code>app_mention</code> &mdash; mensajes que mencionan con @ al bot</li>
      <li><code>message.channels</code> &mdash; mensajes en canales públicos</li>
      <li><code>message.groups</code> &mdash; mensajes en canales privados</li>
      <li><code>message.im</code> &mdash; mensajes directos</li>
    </ul>
  </li>
  <li>En <strong>App Home</strong>, desplázate hasta <strong>Show Tabs</strong> y activa la <strong>Messages Tab</strong>. Marca <strong>"Allow users to send Slash commands and messages from the messages tab"</strong> &mdash; sin esto, los usuarios no pueden escribirle un mensaje directo al bot.</li>
  <li>Instala la app en tu workspace &mdash; copia el <strong>Bot User OAuth Token</strong> (<code>xoxb-...</code>)</li>
</ol>

<h2>Configuración</h2>
${codeBlock(`[slack]
app_token = "xapp-1-..."
bot_token = "xoxb-..."
allowed_user_ids = ["U123456789"]
use_threads = true

[users]
owner_ids = { slack = ["U123456789"] }`, 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'Se conserva para configuraciones antiguas; el bot se inicia siempre que estén definidos los dos tokens.'],
  ['app_token', 'string', '&mdash;', 'App-Level Token para Socket Mode (<code>xapp-...</code>). Admite <code>"keychain"</code> y <code>$&#123;ENV&#125;</code>.'],
  ['bot_token', 'string', '&mdash;', 'Bot User OAuth Token (<code>xoxb-...</code>). Admite <code>"keychain"</code> y <code>$&#123;ENV&#125;</code>.'],
  ['allowed_user_ids', 'array', '[]', 'IDs de usuario de Slack con permiso para usar el bot. Si está vacío y no hay propietarios definidos, la primera persona que le escriba un mensaje directo al bot lo reclama.'],
  ['use_threads', 'bool', 'true', 'Responde en hilos por defecto. Cada hilo tiene su propio contexto de sesión.'],
])}

<p>Los propietarios se definen en <code>[users] owner_ids</code>; si no hay ninguno, todos los de la lista de permitidos son propietarios. Para más de un bot de Slack, usa entradas <code>[[slack_bots]]</code> con las mismas claves.</p>

<h2>Encuentra tu ID de usuario de Slack</h2>
<p>Haz clic en tu perfil en Slack y luego en <strong>More</strong> &rarr; <strong>Copy member ID</strong>. El formato es <code>U</code> seguido de caracteres alfanuméricos (p. ej., <code>U0123ABCDEF</code>).</p>

<h2>Funciones</h2>
<ul>
  <li><strong>Socket Mode</strong> &mdash; conexión WebSocket en tiempo real, sin necesidad de una URL pública</li>
  <li><strong>Respuestas en hilos</strong> &mdash; conversaciones en hilos configurables, con contexto de sesión por hilo</li>
  <li><strong>Transferencia de archivos</strong> &mdash; envía y recibe archivos a través de Slack</li>
  <li><strong>Aprobaciones con Block Kit</strong> &mdash; botones interactivos para las aprobaciones (consulta <a href="/slack/approval">Flujo de aprobación</a>)</li>
  <li><strong>Comandos</strong> &mdash; los comandos compartidos, escritos como <code>!command</code> (por ejemplo <code>!cost</code>, <code>!model</code>, <code>!tasks</code>), más <code>!workspace</code> y <code>!restart</code> (consulta <a href="/slack/commands">Comandos</a>)</li>
  <li><strong>Reacciones de estado</strong> &mdash; emoji de reloj de arena mientras se procesa, que se quita al terminar</li>
  <li><strong>Conversión de markdown</strong> &mdash; el markdown estándar se convierte automáticamente al formato mrkdwn de Slack</li>
  <li><strong>División de mensajes</strong> &mdash; las respuestas largas se dividen para respetar los límites de mensaje de Slack</li>
  <li><strong>Reconexión automática</strong> &mdash; retroceso exponencial ante fallos de conexión (de 5 s hasta 60 s como máximo)</li>
  <li><strong>Compatibilidad con varios bots</strong> &mdash; ejecuta varios bots de Slack con <code>[[slack_bots]]</code></li>
</ul>

<h2>Modelo de sesión</h2>
<p>Las sesiones de Slack se identifican por canal e hilo:</p>
<ul>
  <li><strong>Mensaje de canal:</strong> <code>slack:{channel_id}</code></li>
  <li><strong>Mensaje de hilo:</strong> <code>slack:{channel_id}:{thread_ts}</code> (cuando <code>use_threads</code> está activado)</li>
</ul>
<p>Con <code>use_threads</code> activado, el bot responde a un mensaje de canal de nivel superior en un hilo nuevo, de modo que esa conversación tiene su propia sesión. Los IDs de sesión llevan como prefijo el nombre del bot, así que varios bots nunca comparten una sesión.</p>
<p>Cada sesión mantiene su propio historial de conversación, memoria de trabajo y contexto de hechos.</p>

${callout('warn', 'Control de acceso', 'Si tanto <code>allowed_user_ids</code> como la lista de propietarios de Slack están vacíos, la primera persona que le escriba un mensaje directo al bot se convierte en su propietaria y se guarda en la configuración. Las personas que no están en la lista y mencionan con @ al bot reciben un rol público limitado, que no puede ejecutar comandos. Define <code>allowed_user_ids</code> en producción.')}
`
  },
  {
    slug: '/slack/commands',
    section: 'Slack',
    title: 'Comandos',
    description: 'Comandos de AIDaemon en Slack, escritos como !command: !clear, !tasks, !cancel, !model, !cost, !workspace y más.',
    content: () => `
<h1>Comandos de Slack</h1>
<p class="lead">Comandos disponibles en Slack: los comandos compartidos, sin los comandos de gestión de bots ni de terminal de Telegram. Escríbelos como <code>!command</code>, porque Slack reserva <code>/</code> para sus propios comandos slash; <code>/command</code> se acepta cuando Slack lo deja pasar.</p>

<p><code>!help</code> (o <code>!start</code>) muestra los comandos de uso diario con botones de Restart, Reload, Clear y Cost; <code>!help all</code> lista todos los comandos.</p>

<h2>Conversación</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>!clear</code> (o <code>!new</code>)</td><td>Inicia una conversación nueva. Tu historial se conserva y el trabajo que se ejecuta en este chat se detiene.</td></tr>
<tr><td><code>!wipe</code></td><td>Elimina esta conversación de forma permanente. El primer <code>!wipe</code> solo lo explica; envíalo de nuevo en unos minutos para borrarla. Los hechos ya guardados en la memoria se conservan.</td></tr>
<tr><td><code>!context</code></td><td>Muestra cuánto de la conversación puede ver el agente</td></tr>
<tr><td><code>!project [name|none]</code></td><td>Muestra o cambia el proyecto en el que trabaja este chat</td></tr>
<tr><td><code>!memory</code></td><td>Muestra la memoria del proyecto en el que trabaja este chat</td></tr>
</tbody>
</table>

<h2>Trabajo</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>!tasks</code></td><td>Lista, numerado, lo que se está ejecutando en este chat</td></tr>
<tr><td><code>!cancel</code>, <code>!cancel all</code>, <code>!cancel &lt;number&gt;</code></td><td>Detiene lo que se está ejecutando en este chat: todo lo de una solicitud, todo, o un elemento (los números salen de <code>!tasks</code>)</td></tr>
<tr><td><code>!status</code></td><td>El modo de este chat, lo que se está ejecutando y el siguiente elemento programado</td></tr>
<tr><td><code>!work [ready|running|blocked|show|comment|unblock|retry]</code></td><td>Consulta y gestiona el trabajo más largo que espera o se ejecuta por su cuenta</td></tr>
<tr><td><code>!cost</code></td><td>Muestra el uso de tokens (últimas 24 h, últimos 7 días, modelos principales)</td></tr>
</tbody>
</table>

<h2>Modelos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>!model</code></td><td>Muestra el modelo actual</td></tr>
<tr><td><code>!model &lt;name&gt;</code></td><td>Usa un solo modelo en todos los chats (desactiva la elección automática de modelo)</td></tr>
<tr><td><code>!models</code></td><td>Lista los modelos que ofrece tu proveedor (el activo aparece marcado)</td></tr>
<tr><td><code>!auto</code></td><td>Vuelve a la elección automática de modelo</td></tr>
</tbody>
</table>

<h2>Acceso y privacidad</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>!mode [full|unrestricted|readonly]</code></td><td>Muestra o cambia el modo de acceso de este chat</td></tr>
<tr><td><code>!readonly</code></td><td>Deja este chat en solo lectura durante 4 horas</td></tr>
<tr><td><code>!private [off]</code></td><td>No recuerda ni aprende de tu próximo mensaje (<code>off</code> lo cancela)</td></tr>
<tr><td><code>!trustall on|off</code></td><td>Ejecuta todos los comandos de terminal sin preguntar</td></tr>
</tbody>
</table>

<h2>Archivos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>!checkpoints</code></td><td>Lista los checkpoints del sistema de archivos</td></tr>
<tr><td><code>!rollback [checkpoint-id|confirm TOKEN]</code></td><td>Previsualiza la restauración de un checkpoint y luego la confirma</td></tr>
</tbody>
</table>

<h2>Dispositivos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>!pair_device</code></td><td>Empareja un teléfono o navegador con la app</td></tr>
<tr><td><code>!devices</code></td><td>Lista los dispositivos emparejados</td></tr>
<tr><td><code>!revoke_device &lt;id&gt;</code></td><td>Desempareja un dispositivo</td></tr>
<tr><td><code>!exposure</code></td><td>Muestra los túneles que publican los gateways</td></tr>
</tbody>
</table>

<h2>Gestión de bots</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>!reload</code></td><td>Vuelve a leer config.toml y aplica los cambios de proveedor y de modelo (los demás cambios necesitan <code>!restart</code>)</td></tr>
<tr><td><code>!restart</code></td><td>Reinicio completo: inicia un proceso nuevo y toma un binario, una configuración y servidores MCP nuevos (solo propietario)</td></tr>
<tr><td><code>!workspace grant &lt;@user&gt; &lt;read|edit&gt; &lt;project-path&gt; [hours]</code></td><td>Da a alguien acceso temporal a un proyecto (hasta 168 horas). Envíalo en el grupo privado de Slack donde debe aplicarse el permiso. Solo propietario.</td></tr>
<tr><td><code>!workspace revoke &lt;@user&gt;</code> / <code>!workspace list</code></td><td>Quita un permiso, o lista los permisos vigentes</td></tr>
</tbody>
</table>

${callout('info', 'Quién puede usar los comandos', 'La mayoría de los comandos son solo para propietarios. Los invitados pueden usar <code>!tasks</code>, <code>!private</code>, <code>!context</code>, <code>!readonly</code>, <code>!mode</code> y <code>!cancel</code>; las personas con solo el rol público (mencionaron con @ al bot pero no están en la lista de permitidos) no pueden ejecutar comandos.')}

${callout('info', 'Slash o texto plano', 'Estos comandos se envían como mensajes normales en un mensaje directo o en un canal con el bot. No están registrados como comandos slash de Slack en el manifiesto de la app. Si añades tú mismo comandos slash nativos a la app, el bot los atiende, solo para propietarios.')}
`
  },
  {
    slug: '/slack/approval',
    section: 'Slack',
    title: 'Flujo de aprobación',
    description: 'Botones interactivos de Block Kit para aprobar comandos y acciones en Slack.',
    content: () => `
<h1>Flujo de aprobación en Slack</h1>
<p class="lead">Botones interactivos de Block Kit para aprobar comandos y acciones en Slack.</p>

<h2>Cómo funciona</h2>
<ol>
  <li>El agente quiere ejecutar un comando de terminal (o realizar otra acción) que necesita tu aprobación. Un comando se ejecuta sin preguntar cuando ya lo permitiste, o cuando está en la lista segura y puede ejecutarse confinado. En otro caso, una revisión rápida de riesgo decide si es lo bastante peligroso como para preguntarte.</li>
  <li>La tarjeta de aprobación se publica en el canal o hilo de Slack donde se ejecuta el trabajo. Solo un propietario puede responderla.</li>
  <li>La tarjeta muestra el comando, su riesgo y cualquier advertencia, con estos botones:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Approval needed:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Always allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Opciones de aprobación</h2>
<table class="config-table">
<thead><tr><th>Opción</th><th>Comportamiento</th></tr></thead>
<tbody>
<tr><td><strong>Allow</strong></td><td>Lo ejecuta solo esta vez</td></tr>
<tr><td><strong>Always allow</strong></td><td>Lo ejecuta y recuerda el programa en la base de datos (por destino de ejecución), así que no se te vuelve a preguntar, ni siquiera tras un reinicio. config.toml no se modifica.</td></tr>
<tr><td><strong>Allow until restart</strong></td><td>Se muestra en lugar de <strong>Always allow</strong> para los comandos críticos, o para todo cuando <code>terminal.permission_mode = "cautious"</code>. El permiso dura hasta que el daemon se reinicia.</td></tr>
<tr><td><strong>Deny</strong></td><td>Lo rechaza &mdash; al agente se le informa de que se denegó</td></tr>
</tbody>
</table>
<p>Algunas acciones ofrecen solo <strong>Allow</strong> y <strong>Deny</strong>. Las tarjetas también cubren más que los comandos de terminal, como las acciones del navegador y la confirmación de nuevo trabajo programado (<strong>Approve &amp; activate</strong> / <strong>Cancel</strong>).</p>

${callout('info', 'Caducidad', 'Una tarjeta sin responder caduca a los 5 minutos, con un recordatorio poco antes, y cuenta como <strong>Deny</strong>.')}

<h2>Lo que siempre pregunta</h2>
<ul>
  <li>Comandos de disparadores no confiables, como el <a href="/triggers">correo</a></li>
  <li>Comandos que piden capacidades más allá de la tarea</li>
  <li>Comandos que tocan rutas protegidas de credenciales, aunque se hayan permitido antes</li>
  <li>Comandos nuevos que seguirían ejecutándose en segundo plano (desacoplados)</li>
</ul>

${callout('warn', 'Comandos encadenados', 'Un comando encadenado (<code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code>) cuenta como permitido solo si el programa de cada parte está en tu lista de permitidos permanente. Un permiso que diste para una sesión nunca desbloquea una cadena. La sustitución de comandos (<code>$()</code>, comillas invertidas) nunca queda cubierta por un permiso.')}

${callout('danger', 'Fuentes no confiables', 'Las sesiones iniciadas por disparadores (como el correo) no son confiables. Cada comando de terminal en ellas requiere aprobación, sin importar lo que hayas permitido antes.')}
`
  },
  {
    slug: '/discord',
    section: 'Discord',
    title: 'Configuración del bot',
    description: 'Conecta AIDaemon a Discord. Crea una aplicación de Discord, activa Message Content y define quién puede usarla.',
    content: () => `
<h1>Configuración del bot de Discord</h1>
<p class="lead">Conecta AIDaemon a Discord mediante una conexión directa con el Gateway y la API REST de Discord.</p>

${callout('success', 'Binarios precompilados', 'Si instalaste con el script de una línea o con Homebrew, la compatibilidad con Discord ya está incluida. Solo configura <code>config.toml</code> como se indica abajo. El feature flag solo hace falta al <a href="/getting-started/build">compilar desde el código fuente</a>.')}

<h2>Crear una aplicación de Discord</h2>
<ol>
  <li>Ve al <a href="https://discord.com/developers/applications" target="_blank" rel="noopener">Discord Developer Portal</a></li>
  <li>Haz clic en <strong>New Application</strong> y ponle un nombre (p. ej., &ldquo;AIDaemon&rdquo;)</li>
  <li>En <strong>Bot</strong>, haz clic en <strong>Add Bot</strong></li>
  <li>Copia el <strong>Bot Token</strong> &mdash; este es tu <code>bot_token</code></li>
  <li>Activa el <strong>Message Content Intent</strong> en <strong>Privileged Gateway Intents</strong> &mdash; el bot lo necesita para leer el texto de los mensajes. No hace falta ningún otro intent privilegiado.</li>
  <li>En <strong>OAuth2 &rarr; URL Generator</strong>, selecciona los scopes <code>bot</code> y <code>applications.commands</code> y luego los permisos: View Channels, Send Messages, Read Message History, Attach Files, Use Slash Commands</li>
  <li>Usa la URL generada para invitar al bot a tu servidor</li>
</ol>

<h2>Configuración</h2>
${codeBlock(`[discord]
bot_token = "keychain"   # or the token itself
allowed_user_ids = [123456789012345678]
guild_id = 987654321098765432

[users]
owner_ids = { discord = ["123456789012345678"] }`, 'toml', 'config.toml')}

${configTable([
  ['bot_token', 'string', '&mdash;', 'Token del bot de Discord del Developer Portal. Admite <code>"keychain"</code>.'],
  ['allowed_user_ids', 'array', '[]', 'IDs de usuario de Discord (enteros) con permiso para escribirle mensajes directos al bot. Si está vacío y no hay propietarios definidos, la primera persona que le escriba un mensaje directo al bot lo reclama.'],
  ['guild_id', 'integer', 'null', 'ID de servidor opcional. Los comandos slash se registran en ese servidor, donde aparecen al instante, en lugar de globalmente, lo que puede tardar hasta una hora. No limita dónde responde el bot.'],
])}

<p>Los propietarios se definen en <code>[users] owner_ids</code>; si no hay ninguno, los propietarios son los de la lista de permitidos. Para más de un bot de Discord, usa entradas <code>[[discord_bots]]</code> con las mismas claves.</p>

<h2>Obtén tu ID de usuario de Discord</h2>
<p>Activa el <strong>Modo desarrollador</strong> en los ajustes de Discord (Apariencia &rarr; Avanzado), luego haz clic derecho en tu nombre de usuario y selecciona <strong>Copiar ID de usuario</strong>.</p>

<h2>Funciones</h2>
<ul>
  <li><strong>Conexión al Gateway</strong> &mdash; una conexión directa con el Gateway de Discord (v10) y la API REST</li>
  <li><strong>Comandos slash</strong> &mdash; comandos de aplicación registrados (consulta <a href="/discord/commands">Comandos</a>)</li>
  <li><strong>Botones interactivos</strong> &mdash; flujo de aprobación con botones en los que se puede hacer clic (consulta <a href="/discord/approval">Flujo de aprobación</a>)</li>
  <li><strong>Transferencia de archivos</strong> &mdash; envía y recibe archivos como adjuntos de Discord (los archivos que envía el bot están limitados a 10 MB)</li>
  <li><strong>División de mensajes</strong> &mdash; las respuestas largas se dividen para respetar el límite de 2000 caracteres por mensaje de Discord</li>
  <li><strong>Reconexión automática</strong> &mdash; retroceso exponencial ante fallos de conexión (de 5 s hasta un tope de 60 s)</li>
  <li><strong>Lista de usuarios permitidos</strong> &mdash; control de acceso por token de bot</li>
  <li><strong>Compatibilidad con varios bots</strong> &mdash; ejecuta varios bots de Discord con configuraciones separadas (<code>[[discord_bots]]</code>)</li>
</ul>

<h2>Modelo de sesión</h2>
<p>Las sesiones de Discord se identifican por el lugar donde ocurre la conversación:</p>
<ul>
  <li><strong>Canal de servidor:</strong> <code>discord:ch:{channel_id}</code></li>
  <li><strong>Mensaje directo:</strong> <code>discord:dm:{user_id}</code></li>
</ul>
<p>Los IDs de sesión llevan como prefijo el nombre del bot, así que varios bots nunca comparten una sesión. Cada sesión mantiene su propio historial de conversación, memoria de trabajo y contexto de hechos.</p>

${callout('warn', 'Control de acceso', 'Los miembros del servidor que no están en la lista pueden hablar con el bot como invitados, pero solo cuando lo mencionan o le responden. Sus archivos no se guardan y no pueden responder aprobaciones ni ejecutar comandos de propietario. Los mensajes directos requieren la lista de permitidos. Define siempre <code>allowed_user_ids</code> en producción.')}
`
  },
  {
    slug: '/discord/commands',
    section: 'Discord',
    title: 'Comandos slash',
    description: 'Comandos de Discord para AIDaemon: /model, /clear, /tasks, /cancel, /cost, /status y más.',
    content: () => `
<h1>Comandos slash de Discord</h1>
<p class="lead">Comandos disponibles en Discord. Los más usados están registrados como comandos de aplicación, por lo que aparecen al escribir <code>/</code>; el resto funciona cuando los envías como mensaje.</p>

<p><code>/help</code> (o <code>/start</code>) muestra los comandos de uso diario; <code>/help all</code> lista todos los comandos.</p>

${callout('info', 'En el menú slash', 'El menú lista <code>/model</code>, <code>/models</code>, <code>/auto</code>, <code>/reload</code>, <code>/tasks</code>, <code>/cancel</code>, <code>/clear</code>, <code>/wipe</code>, <code>/cost</code>, <code>/context</code> y <code>/help</code>. Cada uno admite un texto opcional <code>args</code>, por ejemplo <code>/model args:claude-sonnet-5-5</code>. Todos los demás comandos de abajo funcionan al escribirlos como un mensaje normal, como <code>/status</code> o <code>/mode readonly</code>.')}

<h2>Conversación</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>/clear</code> (o <code>/new</code>)</td><td>Inicia una conversación nueva. Tu historial se conserva (usa <code>/wipe</code> para eliminarlo) y el trabajo que se ejecuta en este chat se detiene.</td></tr>
<tr><td><code>/wipe</code></td><td>Elimina esta conversación de forma permanente. El primer <code>/wipe</code> solo lo explica; envíalo de nuevo en unos minutos para borrarla. Los hechos ya guardados en la memoria se conservan.</td></tr>
<tr><td><code>/context</code></td><td>Muestra cuánto de la conversación puede ver el agente</td></tr>
<tr><td><code>/project [name|none]</code></td><td>Muestra o cambia el proyecto en el que trabaja este chat</td></tr>
<tr><td><code>/memory</code></td><td>Muestra la memoria del proyecto en el que trabaja este chat</td></tr>
</tbody>
</table>

<h2>Trabajo</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>/tasks</code></td><td>Lista, numerado, lo que se está ejecutando en este chat</td></tr>
<tr><td><code>/cancel</code>, <code>/cancel all</code>, <code>/cancel &lt;number&gt;</code></td><td>Detiene lo que se está ejecutando en este chat: todo lo de una solicitud, todo, o un elemento (los números salen de <code>/tasks</code>)</td></tr>
<tr><td><code>/status</code></td><td>El modo de este chat, lo que se está ejecutando y el siguiente elemento programado</td></tr>
<tr><td><code>/work [ready|running|blocked|show|comment|unblock|retry]</code></td><td>Consulta y gestiona el trabajo más largo que espera o se ejecuta por su cuenta</td></tr>
<tr><td><code>/cost</code></td><td>Muestra el uso de tokens (últimas 24 h, últimos 7 días, modelos principales)</td></tr>
</tbody>
</table>

<h2>Modelos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Muestra el modelo actual</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Usa un solo modelo en todos los chats (desactiva la elección automática de modelo)</td></tr>
<tr><td><code>/models</code></td><td>Lista los modelos que ofrece tu proveedor (el activo aparece marcado)</td></tr>
<tr><td><code>/auto</code></td><td>Vuelve a la elección automática de modelo</td></tr>
</tbody>
</table>

<h2>Acceso y privacidad</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>/mode [full|unrestricted|readonly]</code></td><td>Muestra o cambia el modo de acceso de este chat</td></tr>
<tr><td><code>/readonly</code></td><td>Deja este chat en solo lectura durante 4 horas</td></tr>
<tr><td><code>/private [off]</code></td><td>No recuerda ni aprende de tu próximo mensaje (<code>off</code> lo cancela)</td></tr>
<tr><td><code>/trustall on|off</code></td><td>Ejecuta todos los comandos de terminal sin preguntar</td></tr>
</tbody>
</table>

<h2>Archivos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>/checkpoints</code></td><td>Lista los checkpoints del sistema de archivos</td></tr>
<tr><td><code>/rollback [checkpoint-id|confirm TOKEN]</code></td><td>Previsualiza la restauración de un checkpoint y luego la confirma</td></tr>
</tbody>
</table>

<h2>Dispositivos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>/pair_device</code></td><td>Empareja un teléfono o navegador con la app</td></tr>
<tr><td><code>/devices</code></td><td>Lista los dispositivos emparejados</td></tr>
<tr><td><code>/revoke_device &lt;id&gt;</code></td><td>Desempareja un dispositivo</td></tr>
<tr><td><code>/exposure</code></td><td>Muestra los túneles que publican los gateways</td></tr>
</tbody>
</table>

<h2>Gestión de bots</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>/reload</code></td><td>Vuelve a leer config.toml y aplica los cambios de proveedor y de modelo</td></tr>
</tbody>
</table>

${callout('info', 'Quién puede usar los comandos', 'La mayoría de los comandos son solo para propietarios. Los invitados pueden usar <code>/tasks</code>, <code>/private</code>, <code>/context</code>, <code>/readonly</code>, <code>/mode</code> y <code>/cancel</code>; los últimos cuatro indican por sí mismos si el invitado puede actuar.')}

<h2>Mensajes normales</h2>
<p>Además de los comandos, puedes hablar con el bot en un mensaje directo, o en un canal de servidor mencionándolo o respondiéndole. Estos se tratan como mensajes de conversación normales.</p>

${callout('info', 'Registro de comandos', 'Los comandos se registran cada vez que el bot se conecta: en el servidor indicado por <code>guild_id</code>, donde aparecen al instante, o globalmente, lo que puede tardar hasta una hora en aparecer.')}
`
  },
  {
    slug: '/discord/approval',
    section: 'Discord',
    title: 'Flujo de aprobación',
    description: 'Botones interactivos en mensajes para aprobar comandos y acciones en Discord.',
    content: () => `
<h1>Flujo de aprobación en Discord</h1>
<p class="lead">Botones interactivos en mensajes para aprobar comandos y acciones en Discord.</p>

<h2>Cómo funciona</h2>
<ol>
  <li>El agente quiere ejecutar un comando de terminal (o realizar otra acción) que necesita tu aprobación. Un comando se ejecuta sin preguntar cuando ya lo permitiste, o cuando está en la lista segura y puede ejecutarse confinado. En otro caso, una revisión rápida de riesgo decide si es lo bastante peligroso como para preguntarte.</li>
  <li>La tarjeta de aprobación se publica en el canal de Discord donde se ejecuta el trabajo, con botones de mensaje de Discord. Solo un propietario puede pulsarlos.</li>
  <li>La tarjeta muestra el comando, su riesgo y cualquier advertencia, con estos botones:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Approval needed:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Always allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Opciones de aprobación</h2>
<table class="config-table">
<thead><tr><th>Opción</th><th>Comportamiento</th></tr></thead>
<tbody>
<tr><td><strong>Allow</strong></td><td>Lo ejecuta solo esta vez</td></tr>
<tr><td><strong>Always allow</strong></td><td>Lo ejecuta y recuerda el programa en la base de datos (por destino de ejecución), así que no se te vuelve a preguntar, ni siquiera tras un reinicio. config.toml no se modifica.</td></tr>
<tr><td><strong>Allow until restart</strong></td><td>Se muestra en lugar de <strong>Always allow</strong> para los comandos críticos, o para todo cuando <code>terminal.permission_mode = "cautious"</code>. El permiso dura hasta que el daemon se reinicia.</td></tr>
<tr><td><strong>Deny</strong></td><td>Lo rechaza &mdash; al agente se le informa de que se denegó</td></tr>
</tbody>
</table>
<p>Algunas acciones ofrecen solo <strong>Allow</strong> y <strong>Deny</strong>. Las tarjetas también cubren más que los comandos de terminal, como las acciones del navegador y la confirmación de nuevo trabajo programado (<strong>Approve &amp; activate</strong> / <strong>Cancel</strong>).</p>

${callout('info', 'Caducidad', 'Una tarjeta sin responder caduca a los 5 minutos, con un recordatorio poco antes, y cuenta como <strong>Deny</strong>.')}

<h2>Lo que siempre pregunta</h2>
<ul>
  <li>Comandos de disparadores no confiables, como el <a href="/triggers">correo</a></li>
  <li>Comandos que piden capacidades más allá de la tarea</li>
  <li>Comandos que tocan rutas protegidas de credenciales, aunque se hayan permitido antes</li>
  <li>Comandos nuevos que seguirían ejecutándose en segundo plano (desacoplados)</li>
</ul>

${callout('warn', 'Comandos encadenados', 'Un comando encadenado (<code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code>) cuenta como permitido solo si el programa de cada parte está en tu lista de permitidos permanente. Un permiso que diste para una sesión nunca desbloquea una cadena. La sustitución de comandos (<code>$()</code>, comillas invertidas) nunca queda cubierta por un permiso.')}

${callout('danger', 'Fuentes no confiables', 'Las sesiones iniciadas por disparadores (como el correo) no son confiables. Cada comando de terminal en ellas requiere aprobación, sin importar lo que hayas permitido antes.')}
`
  },
  {
    slug: '/tools',
    section: 'Tools',
    title: 'Resumen de herramientas',
    description: 'Resumen de las herramientas integradas que el agente de AIDaemon puede llamar: terminal, archivos, memoria, navegador, búsqueda web, subagentes, MCP y más.',
    content: () => `
<h1>Herramientas</h1>
<p class="lead">AIDaemon ofrece un conjunto de herramientas integradas que el modelo puede llamar por sí mismo mientras trabaja en una solicitud.</p>

<h2>El trait Tool</h2>
<p>Todas las herramientas implementan la misma interfaz:</p>
${codeBlock(`trait Tool {
    fn name(&self) -> &str;
    fn description(&self) -> &str;
    fn schema(&self) -> Value;   // full function object: name, description, parameters
    async fn execute(&self, arguments: &str, facts: &ToolCallContext) -> Result<ToolCallOutcome>;
    fn call_effects(&self, arguments: &str) -> CallEffects; // what a call does, judged by the approval hooks
}`, 'rust')}
<p>Una herramienta nunca le pregunta al propietario por sí misma. Declara lo que hace cada llamada (sus efectos), y los hooks de aprobación del kernel del agente deciden si la ejecutan, te preguntan o la rechazan.</p>

<h2>Herramientas integradas</h2>
<table class="config-table">
<thead><tr><th>Herramienta</th><th>Descripción</th><th>Configuración</th></tr></thead>
<tbody>
<tr><td><a href="/tools/terminal"><code>terminal</code></a></td><td>Ejecuta comandos de shell con flujo de aprobación (consulta <a href="/tools/command-risk">riesgo de comandos</a>)</td><td>[terminal]</td></tr>
<tr><td><a href="/tools/system-info"><code>system_info</code></a></td><td>Consulta el nombre de host, el sistema operativo, el tiempo de actividad y la memoria</td><td>Siempre activada</td></tr>
<tr><td><code>read_file</code>, <code>write_file</code>, <code>edit_file</code>, <code>search_files</code></td><td>Leen, escriben, editan y buscan archivos en el espacio de trabajo</td><td>Siempre activada</td></tr>
<tr><td><code>check_environment</code></td><td>Comprueba qué programas y herramientas están instalados</td><td>Siempre activada</td></tr>
<tr><td><a href="/tools/memory"><code>remember_fact</code></a></td><td>Guarda o olvida hechos sobre ti (búscalos con <code>manage_memories</code>)</td><td>Siempre activada</td></tr>
<tr><td><a href="/tools/memory"><code>manage_memories</code></a></td><td>Busca, lista y olvida hechos guardados, busca en chats pasados y da seguimiento a objetivos personales</td><td>Siempre activada</td></tr>
<tr><td><code>search_history</code></td><td>Busca los mensajes exactos de conversaciones pasadas</td><td>Siempre activada</td></tr>
<tr><td><a href="/tools/config-manager"><code>manage_config</code></a></td><td>Lee y cambia config.toml, cambia de proveedor y gestiona el failover (secretos ocultos)</td><td>Siempre activada</td></tr>
<tr><td><a href="/tools/web-search"><code>web_search</code></a></td><td>Busca en la web (DuckDuckGo, Brave o SearxNG, combinados)</td><td>[search]</td></tr>
<tr><td><a href="/tools/web-fetch"><code>web_fetch</code></a></td><td>Descarga y extrae contenido legible de URL</td><td>Siempre activada</td></tr>
<tr><td><code>http_request</code></td><td>Llama a APIs REST/JSON, con perfiles de autenticación guardados</td><td>Siempre activada</td></tr>
<tr><td><code>manage_auth</code>, <code>manage_api</code></td><td>Conectan servicios (claves de API, OAuth) y aprenden sus APIs</td><td>Siempre activada</td></tr>
<tr><td><code>set_reminder</code></td><td>Crea un recordatorio</td><td>Siempre activada</td></tr>
<tr><td><a href="/scheduler"><code>schedule_task</code></a></td><td>Crea una tarea programada</td><td>Siempre activada</td></tr>
<tr><td><a href="/scheduler"><code>manage_automations</code></a></td><td>Lista, cambia y ejecuta tareas programadas y recordatorios</td><td>Siempre activada</td></tr>
<tr><td><code>manage_mandates</code></td><td>Objetivos permanentes en los que el agente trabaja con el tiempo</td><td>Siempre activada</td></tr>
<tr><td><code>track_requirements</code></td><td>Mantiene una lista de verificación de lo que pidió una solicitud</td><td>Siempre activada</td></tr>
<tr><td><a href="/tools/browser"><code>browser</code></a></td><td>Automatización de Chrome con sesiones de inicio de sesión persistentes</td><td>[browser] enabled=true</td></tr>
<tr><td><code>hand_over</code></td><td>Te entrega el navegador (por ejemplo, para iniciar sesión)</td><td>[browser] + [surfaces]</td></tr>
<tr><td><code>computer_use</code></td><td>Controla el escritorio de esta computadora a partir de capturas de pantalla</td><td>[computer_use]</td></tr>
<tr><td><a href="/tools/send-file"><code>send_file</code></a></td><td>Envía un archivo al usuario en el chat actual (Telegram, Slack, Discord o la app)</td><td>[files] (activada por defecto)</td></tr>
<tr><td><code>generate_image</code></td><td>Genera una imagen</td><td>[files]</td></tr>
<tr><td><a href="/tools/sub-agents"><code>spawn_agent</code></a></td><td>Delega trabajo en subagentes y especialistas</td><td>[subagents] (activada por defecto)</td></tr>
<tr><td><a href="/tools/cli-agents"><code>cli_agent</code></a></td><td>Delega en agentes de programación instalados (también <code>manage_cli_agents</code>)</td><td>[cli_agents] enabled = true</td></tr>
<tr><td><a href="/health-monitoring"><code>health_probe</code></a></td><td>Gestiona y ejecuta sondas de salud</td><td>[health]</td></tr>
<tr><td><a href="/skills"><code>use_skill</code>, <code>skill_resources</code>, <code>manage_skills</code></a></td><td>Usan, exploran e instalan skills</td><td>[skills]</td></tr>
<tr><td><a href="/tools/people"><code>manage_people</code></a></td><td>Libreta de contactos personal con cumpleaños, preferencias y relaciones</td><td>Siempre registrada</td></tr>
<tr><td><a href="/mcp"><code>manage_mcp</code></a></td><td>Añade, quita y reinicia servidores MCP en tiempo de ejecución</td><td>Siempre activada</td></tr>
<tr><td><a href="/mcp">Herramientas MCP</a></td><td>Descubiertas dinámicamente mediante servidores MCP</td><td>[mcp.*]</td></tr>
</tbody>
</table>

<p>Quince herramientas básicas se ofrecen en cada llamada (terminal, memoria, recordatorios y programación, búsqueda en el historial, web, archivos, <code>spawn_agent</code>, <code>track_requirements</code>). El resto se ofrece cuando una solicitud las necesita. El trabajo está acotado por presupuestos de progreso y de tokens, no por un número fijo de pasos.</p>

<h2>Qué herramientas se registran</h2>
<p>Las herramientas se registran al iniciar, en tres grupos:</p>
<ul>
  <li><strong>Siempre registradas</strong> (salvo que figuren en <code>[tools] disabled</code>): system_info, terminal, remember_fact, manage_memories, set_reminder, schedule_task, manage_mandates, manage_automations, search_history, manage_config, web_fetch, web_search, read_file, write_file, edit_file, search_files, check_environment, manage_mcp, manage_people, http_request, manage_auth, manage_api.</li>
  <li><strong>Registradas cuando están activadas</strong>: spawn_agent ([subagents]); browser, y hand_over con [surfaces] ([browser]); computer_use ([computer_use]); send_file y generate_image ([files]); cli_agent y manage_cli_agents ([cli_agents]); health_probe ([health]); use_skill, skill_resources y manage_skills ([skills]); self_diagnose, goal_trace y policy_metrics ([diagnostics]); herramientas de nodos ([nodes]); client_view y request_feature ([client_gateway]); read_channel_history (Slack, opcional).</li>
  <li><strong>Herramientas MCP</strong> de los servidores configurados.</li>
</ul>
${codeBlock(`[tools]
disabled = ["generate_image"]   # leave a built-in tool out at startup (needs /restart)`, 'toml', 'config.toml')}
`
  },
  {
    slug: '/tools/terminal',
    section: 'Tools',
    title: 'Herramienta terminal',
    description: 'Ejecuta comandos de shell en el host, en un contenedor Docker o en un host SSH mediante AIDaemon, con aprobaciones del propietario para cualquier cosa riesgosa.',
    content: () => `
<h1>Herramienta terminal</h1>
<p class="lead">Ejecuta comandos de shell. Los comandos se ejecutan con <code>sh -c</code> (PowerShell en Windows), en el espacio de trabajo configurado: esta computadora, un contenedor Docker o un host SSH.</p>

<h2>Parámetros</h2>
${configTable([
  ['action', 'string', '—', 'Uno de: run, check, kill (obligatorio)'],
  ['command', 'string', '—', 'El comando de shell a ejecutar (para action="run")'],
  ['script', 'string', '—', 'Un script de shell de varios pasos, ejecutado con /bin/sh -eu para que un paso fallido detenga el resto. Úsalo en lugar de command.'],
  ['working_dir', 'string', '—', 'Directorio en el que se ejecuta el comando'],
  ['background', 'bool', 'false', 'Ejecuta en segundo plano el trabajo finito; el resultado se te envía cuando termina'],
  ['detach', 'bool', 'false', 'Inicia un proceso de larga duración (servidor, watcher) que sigue ejecutándose hasta que se detenga'],
  ['network', 'bool', 'false', 'Permite la red en una ejecución confinada (en sandbox); pregunta antes salvo que ya esté concedido'],
  ['read_paths / read_roots / write_paths / write_roots', 'array', '—', 'Rutas adicionales que una ejecución confinada puede leer o escribir; las rutas fuera del alcance de la tarea preguntan antes'],
  ['description', 'string', '—', 'Unas pocas palabras que se te muestran mientras se ejecuta'],
  ['pid', 'integer', '—', 'ID de proceso requerido para check/kill'],
])}
<p>El modo de confianza total es el comando <code>/trustall</code> del propietario, nunca una acción de la herramienta.</p>

<h2>Lógica de aprobación</h2>
<p>Un comando se ejecuta sin preguntar cuando se cumple una de estas condiciones:</p>
<ol>
  <li>Su programa está en <code>terminal.allowed_prefixes</code> o se permitió antes. En una cadena (<code>&amp;&amp;</code>, <code>||</code>, <code>;</code>, <code>|</code>), el programa de cada segmento debe estar permitido.</li>
  <li>Es un comando de compilación, lint o git de solo lectura de la lista confinada; entonces se ejecuta en el sandbox.</li>
  <li>La revisión de seguridad que hace el modelo del comando completo no encuentra nada que te necesite.</li>
</ol>
<p>Un programa permitido no cubre un comando que escribe un archivo mediante redirección, empieza con una asignación de variable o lanza otro programa (<code>env sh -c</code>, <code>xargs</code>, <code>find -exec</code>). Un comando que toca una ruta de credenciales siempre pregunta. Si la revisión de seguridad no está disponible, el comando pregunta (falla de forma cerrada). Consulta <a href="/tools/command-risk">Evaluación de riesgo de comandos</a>.</p>

<h3>Prefijos permitidos por defecto</h3>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

<h2>Salida</h2>
<p>Devuelve primero stdout y luego stderr (si lo hay). La salida se trunca a <code>terminal.max_output_chars</code> (4000 caracteres por defecto).</p>

<h2>Comandos en segundo plano</h2>
<p>Si un comando supera el tiempo de espera inicial, pasa a segundo plano y devuelve un PID.</p>
<ul>
  <li><code>action="check"</code> + <code>pid</code> muestra la salida parcial o final</li>
  <li><code>action="kill"</code> + <code>pid</code> detiene un comando en segundo plano en ejecución</li>
  <li>La salida reciente de los comandos terminados se conserva un tiempo breve para que las comprobaciones posteriores sigan funcionando</li>
  <li>Los comandos que se demonizan (<code>nohup</code>, <code>setsid</code>, <code>&amp; disown</code>&hellip;) necesitan <code>detach=true</code> y la aprobación de un propietario</li>
</ul>

<h2>Bloqueos absolutos</h2>
<p>Algunos comandos se rechazan antes de cualquier aprobación y no se pueden permitir: <code>rm</code>/<code>chmod</code>/<code>chown</code> recursivos sobre la raíz, el directorio personal o directorios del sistema, <code>mkfs</code>, <code>dd</code>/<code>shred</code>/<code>wipefs</code> sobre un dispositivo en bruto, y los borrados recursivos (<code>rm -r</code>, <code>find -delete</code>) de cualquier cosa fuera del espacio de trabajo.</p>

<h2>Configuración</h2>
${codeBlock(`[terminal]
allowed_prefixes = ["ls", "cat", "head", "tail", "echo", "date"]
initial_timeout_secs = 30
max_output_chars = 4000
permission_mode = "default"
confinement = "host"   # or "sandbox"`, 'toml', 'config.toml')}
<p><code>confinement = "host"</code> (por defecto) ejecuta los comandos en esta máquina con tu entorno y tus credenciales. <code>"sandbox"</code> ejecuta cada comando en el sandbox del sistema operativo (seatbelt en macOS, bubblewrap o el sandbox de Codex en Linux), sin red y solo con los archivos de la tarea, salvo que se conceda más.</p>

<h2>Allow Always (persistente)</h2>
<p>Las tarjetas de aprobación ofrecen Allow Once, Allow Session (until restart) o Allow Always, y Deny, en cualquier canal o en la app. El modo cautious, y los comandos Critical en el modo default, ofrecen Allow Session en lugar de Allow Always. Cuando eliges "Allow Always":</p>
<ol>
  <li>El programa del comando (su primera palabra, o el programa de cada segmento en un comando encadenado) se convierte en el prefijo permitido</li>
  <li>El prefijo se añade a la lista de permitidos en memoria</li>
  <li>El prefijo se guarda en la base de datos para el espacio de trabajo actual (<code>terminal_backend_allowed_prefixes</code>), de modo que cada destino de ejecución conserva sus propias aprobaciones</li>
  <li>Al reiniciar, los prefijos persistidos se combinan con los prefijos de la configuración</li>
</ol>
<p>Esto significa que las aprobaciones de "Allow Always" sobreviven a los reinicios del daemon sin modificar config.toml.</p>

${callout('danger', 'Sesiones no confiables', 'Las sesiones de disparadores (correo, etc.) se marcan como no confiables. <strong>Todos</strong> los comandos en sesiones no confiables requieren aprobación, sin importar la lista de permitidos.')}
`
  },
  {
    slug: '/tools/command-risk',
    section: 'Tools',
    title: 'Evaluación de riesgo de comandos',
    description: 'Cómo decide AIDaemon cuándo un comando de terminal necesita tu aprobación y qué tan riesgoso indica la tarjeta que es.',
    content: () => `
<h1>Evaluación de riesgo de comandos</h1>
<p class="lead">Un comando que todavía no has permitido lo revisa el modelo, que clasifica lo que el comando completo hace en realidad (lecturas, ediciones locales, red, despliegues, borrados, secretos&hellip;). Los comandos que te necesitan reciben una tarjeta de aprobación calificada como Safe, Medium, High o Critical.</p>

<h2>Niveles de riesgo</h2>
<table class="config-table">
<thead><tr><th>Nivel</th><th>La tarjeta muestra</th></tr></thead>
<tbody>
<tr><td><strong>Safe</strong></td><td>New command</td></tr>
<tr><td><strong>Medium</strong></td><td>Approval needed</td></tr>
<tr><td><strong>High</strong></td><td>Review carefully</td></tr>
<tr><td><strong>Critical</strong></td><td>Dangerous action. También se usa para los comandos que se demonizan y siempre que la revisión de seguridad no está disponible.</td></tr>
</tbody>
</table>
<p>El nivel sale de la revisión de seguridad, no de una lista fija. Los despliegues, los push, los envíos, los borrados, los cambios del sistema, la escalada de privilegios, la ejecución de código descargado y todo lo que no pueda determinar necesitan aprobación. Las compilaciones, las pruebas y las ediciones dentro del espacio de trabajo, y el acceso de red de solo lectura, no.</p>

<h2>Modos de permisos</h2>
${configTable([
  ['default', '—', '—', 'Las tarjetas ofrecen Allow Always, salvo las Critical, que ofrecen Allow Session (until restart).'],
  ['cautious', '—', '—', 'Todas las aprobaciones valen solo para la sesión.'],
  ['yolo', '—', '—', 'Todos los comandos se ejecutan sin preguntar (las rutas de credenciales y las sesiones no confiables siguen preguntando), y toda aprobación persiste, incluidas las Critical.'],
])}

<h2>Lo que un programa permitido no cubre</h2>
<p>Permitir un programa cubre ejecutar ese programa, nada más. Una cadena necesita que el programa de cada segmento esté permitido. Redirigir a un archivo, una asignación de variable al inicio o lanzar otro programa a través de él (<code>env</code>, <code>xargs</code>, <code>find -exec</code>/<code>-delete</code>, <code>sh -c</code>) se juzga como cualquier comando nuevo.</p>

<h2>Detección de rutas sensibles</h2>
<p>Los comandos que hacen referencia a estas rutas siempre preguntan, incluso cuando el programa está permitido:</p>
<ul>
  <li><code>.ssh</code>, <code>.env</code> (no <code>.env.example</code>), claves SSH <code>id_rsa</code>, <code>id_ed25519</code>, <code>id_dsa</code>, <code>id_ecdsa</code></li>
  <li>Autenticación del sistema: <code>shadow</code>, <code>sudoers</code></li>
  <li>Credenciales: <code>credentials</code> (p. ej. <code>.aws/credentials</code>), <code>secrets</code>, <code>master.key</code>, <code>.netrc</code>, <code>.pgpass</code>, <code>.npmrc</code>, <code>.pypirc</code></li>
</ul>

<h2>Bloqueos absolutos</h2>
<p>Algunos comandos se rechazan antes de cualquier aprobación y no se pueden permitir: <code>rm</code>/<code>chmod</code>/<code>chown</code> recursivos sobre la raíz, el directorio personal o directorios del sistema, <code>mkfs</code>, <code>dd</code>/<code>shred</code>/<code>wipefs</code> sobre un dispositivo en bruto, y los borrados recursivos (<code>rm -r</code>, <code>find -delete</code>) de cualquier cosa fuera del espacio de trabajo.</p>

<h2>Las aprobaciones son hooks del kernel</h2>
<p>La terminal nunca pregunta por su cuenta. Cada llamada declara sus efectos; la política de aprobación del kernel del agente (bloqueos absolutos, luego las reglas de la terminal, luego tus permisos) decide si la ejecuta, te pregunta o la rechaza. Una denegación también bloquea otras llamadas de la misma ejecución que harían lo mismo.</p>

${callout('info', 'Configuración', 'Define <code>terminal.permission_mode</code> en config.toml. El valor por defecto es <code>"default"</code>.')}
`
  },
  {
    slug: '/tools/system-info',
    section: 'Tools',
    title: 'Herramienta de información del sistema',
    description: 'Consulta el sistema operativo, el nombre de host, el tiempo de actividad y la memoria del entorno de ejecución configurado con la herramienta de información del sistema.',
    content: () => `
<h1>Herramienta de información del sistema</h1>
<p class="lead">Consulta información básica del entorno de ejecución configurado (esta máquina, un contenedor Docker o un host SSH). Siempre activada, sin parámetros.</p>

<h2>Parámetros</h2>
<p>Ninguno: esta herramienta no recibe argumentos.</p>

<h2>Salida</h2>
<p>Devuelve un informe de texto con:</p>
<ul>
  <li><strong>Nombre de host</strong></li>
  <li><strong>Sistema operativo</strong></li>
  <li><strong>Tiempo de actividad</strong></li>
  <li><strong>Uso de memoria</strong></li>
</ul>

<p>La memoria se obtiene de forma específica para cada plataforma:</p>
<ul>
  <li><strong>Linux:</strong> se interpreta a partir de <code>free -h</code></li>
  <li><strong>macOS:</strong> se interpreta a partir de <code>vm_stat</code></li>
</ul>
`
  },
  {
    slug: '/tools/memory',
    section: 'Tools',
    title: 'Herramienta de memoria y hechos',
    description: 'Guarda, busca y olvida hechos a largo plazo que persisten entre sesiones; los más relevantes se recuperan en cada turno.',
    content: () => `
<h1>Herramienta de memoria y hechos</h1>
<p class="lead">Guarda y recupera hechos a largo plazo que persisten entre sesiones. Los hechos relevantes para cada mensaje se recuperan en el prompt.</p>

<h2>Nombre de la herramienta</h2>
<p><code>remember_fact</code></p>

<h2>Parámetros</h2>
${configTable([
  ['category', 'string', '—', 'Categoría de agrupación (p. ej., "user", "preference", "project")'],
  ['key', 'string', '—', 'Identificador único dentro de la categoría'],
  ['value', 'string', '—', 'El contenido del hecho a guardar'],
  ['delete', 'bool', 'false', 'Olvida category/key en lugar de guardarlo'],
  ['evidence', 'string', '—', 'Tus propias palabras que enuncian el hecho, citadas'],
  ['scope', 'string', 'project', 'En una conversación de proyecto: project lo guarda en las notas del proyecto, personal lo guarda para ti'],
  ['facts', 'array', '—', 'Varios hechos en una sola llamada, cada uno con los mismos campos'],
])}

<h2>Almacenamiento</h2>
<p>Los hechos se guardan en la tabla <code>facts</code> de SQLite. Guardar un valor nuevo para la misma categoría y clave lo reemplaza. El valor anterior se conserva como historial reemplazado, y las claves casi duplicadas (por ejemplo <code>editor</code> y <code>preferred_editor</code>) se combinan.</p>

<h2>Recuperación</h2>
<p>No se inyectan todos los hechos. En cada turno, los hechos más relevantes para tu mensaje (como máximo 8, y nunca más de <code>state.max_facts</code>, 20 por defecto) aparecen bajo <code>## Relevant Memory</code>, cada uno con la fecha en que se registró. Tu nombre y la identidad del agente se fijan aparte. El agente busca cualquier otra cosa con <code>manage_memories</code>.</p>

${codeBlock(`## Relevant Memory
- Fact [12] (recorded 2026-10-02) user/timezone = US/Pacific
- Fact [31] (recorded 2026-09-14) project/language = Rust`, 'text', 'system prompt')}

<h2>Cómo encontrar y gestionar los recuerdos</h2>
<p><code>manage_memories</code> busca hechos guardados (<code>search</code>), los lista, busca en resúmenes de chats pasados (<code>search_episodes</code>), olvida un hecho, define quién puede verlo (<code>set_privacy</code>: global, channel o private) y da seguimiento a objetivos personales. Para los mensajes exactos de chats pasados, usa <code>search_history</code>.</p>

<h2>Esquema de la tabla facts</h2>
${configTable([
  ['id', 'integer', 'auto', 'Clave primaria autoincremental'],
  ['category', 'string', '—', 'Categoría de agrupación'],
  ['key', 'string', '—', 'Clave del hecho (única por categoría entre los hechos vigentes)'],
  ['value', 'string', '—', 'Contenido del hecho'],
  ['source', 'string', '""', 'Quién lo guardó, p. ej. "agent"'],
  ['privacy', 'string', 'global', 'Quién puede verlo: global, channel o private'],
  ['channel_id', 'string', '—', 'Canal en el que se aprendió'],
  ['superseded_at', 'timestamp', '—', 'Se define cuando un valor más nuevo lo reemplazó'],
  ['created_at', 'timestamp', 'now', 'Cuándo se creó el hecho'],
  ['updated_at', 'timestamp', 'now', 'Cuándo se actualizó por última vez el hecho'],
])}
`
  },
  {
    slug: '/tools/config-manager',
    section: 'Tools',
    title: 'Herramienta de gestión de configuración',
    description: 'El agente de AIDaemon puede leer, actualizar, validar y restaurar su propio archivo de configuración, y cambiar de proveedor.',
    content: () => `
<h1>Herramienta de gestión de configuración</h1>
<p class="lead">El agente puede leer, actualizar, validar y restaurar su propio archivo de configuración.</p>

<h2>Nombre de la herramienta</h2>
<p><code>manage_config</code></p>

<h2>Acciones</h2>

<h3>read</h3>
<p>Devuelve el contenido completo de config.toml con los campos sensibles ocultos:</p>
${codeBlock(`api_key = "***REDACTED***"
bot_token = "***REDACTED***"
password = "***REDACTED***"`, 'toml')}

<h3>get</h3>
<p>Lee una ruta de clave TOML concreta:</p>
${codeBlock(`action: "get"
key: "provider.models.default"
# Returns: "gemini-3-flash-preview"`, 'text')}

<h3>set</h3>
<p>Actualiza una clave concreta con un valor nuevo (formato de literal TOML):</p>
${codeBlock(`action: "set"
key: "state.working_memory_cap"
value: "100"`, 'text')}

<p>Antes de escribir:</p>
<ol>
  <li>Crea una copia de seguridad (rotación de 3 niveles: <code>.bak</code> → <code>.bak.1</code> → <code>.bak.2</code>)</li>
  <li>Valida la configuración nueva (sintaxis TOML + deserialización completa)</li>
  <li>Establece los permisos del archivo en 0600 (solo propietario) en Unix</li>
</ol>

<h3>unset</h3>
<p>Elimina una clave.</p>

<h3>restore</h3>
<p>Vuelve a la copia de seguridad más reciente (<code>.bak</code>, luego <code>.bak.1</code>, <code>.bak.2</code>). Ejecuta <code>/reload</code> para aplicarla.</p>

<h3>Acciones de proveedor</h3>
<p><code>list_provider_presets</code> y <code>switch_provider</code> cambian el proveedor de modelo; <code>list_failover_providers</code>, <code>add_failover_provider</code>, <code>remove_failover_provider</code> y <code>move_failover_provider</code> gestionan el failover.</p>

<h3>Acciones de configuración</h3>
<p><code>enable_stt</code>, <code>enable_client_gateway</code>, <code>enable_exposure</code>.</p>

${callout('warn', 'Secretos', 'Las claves de API y los tokens nunca son argumentos de la herramienta. Guarda uno tú mismo con <code>aidaemon keychain set &lt;key&gt;</code>; el ajuste entonces contiene el valor <code>keychain</code>.')}

${callout('info', 'Última configuración buena conocida', 'Después de cada llamada exitosa al LLM, la configuración actual se marca como <code>.toml.lastgood</code>. Es el primer archivo que se prueba cuando la configuración no se carga al iniciar.')}

<h2>Orden de recuperación al iniciar</h2>
<ol>
  <li><code>config.toml.lastgood</code> — configuración que se sabe que funciona</li>
  <li><code>config.toml.bak</code> — la copia de seguridad más reciente</li>
  <li><code>config.toml.bak.1</code></li>
  <li><code>config.toml.bak.2</code></li>
</ol>
`
  },
  {
    slug: '/tools/browser',
    section: 'Tools',
    title: 'Herramienta de navegador',
    description: 'Automatización de Chrome con sesiones de inicio de sesión persistentes para navegar por la web, llenar formularios, tomar capturas de pantalla y generar PDF.',
    content: () => `
<h1>Herramienta de navegador</h1>
<p class="lead">Automatización de Chrome con sesiones de inicio de sesión persistentes. Inicia sesión una vez y el agente puede navegar por sitios autenticados en tu nombre.</p>

${callout('success', 'Binarios precompilados', 'Si instalaste con el script de una línea o con Homebrew, la herramienta de navegador ya está incluida. Solo actívala en <code>config.toml</code> como se indica abajo. También forma parte de la compilación por defecto desde el código fuente.')}

<h2>Inicio rápido</h2>
<p>Dos pasos para que el agente navegue con tus sesiones iniciadas:</p>

<h3>1. Inicia sesión en tus servicios</h3>
${codeBlock(`aidaemon browser login`, 'bash')}
<p>Chrome se abre con un perfil dedicado. Inicia sesión en los servicios a los que quieres que acceda el agente (Gmail, GitHub, AWS Console, Jira, etc.) y luego cierra Chrome. Tus sesiones se guardan en <code>~/.aidaemon/chrome-profile/</code> y persisten entre reinicios.</p>

<h3>2. Activa la herramienta de navegador</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}

<p>Eso es todo. El agente ya puede navegar por sitios autenticados usando tus sesiones guardadas.</p>

${callout('info', 'Pruébalo', 'Envíale al agente un mensaje como <em>"Ve a https://mail.google.com y toma una captura de pantalla"</em>: debería mostrar tu bandeja de entrada, con la sesión ya iniciada.')}

<h2>Configuración</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Activa la herramienta de navegador'],
  ['headless', 'bool', 'true', 'Ejecuta Chrome sin una ventana visible'],
  ['screenshot_width', 'int', '1280', 'Ancho del viewport del navegador en píxeles'],
  ['screenshot_height', 'int', '720', 'Alto del viewport del navegador en píxeles'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Directorio del perfil de Chrome para sesiones persistentes'],
  ['profile', 'string', 'Default', 'Nombre del perfil de Chrome dentro de user_data_dir'],
  ['keep_sign_ins', 'bool', 'true', 'Conserva los inicios de sesión en ~/.aidaemon/chrome-profile; desactivado = un perfil nuevo cada vez'],
  ['session_isolation', 'string', 'auto', 'Cómo se aíslan las sesiones: browser_context o page'],
  ['nav_timeout_secs', 'int', '30', 'Espera de carga de página'],
  ['element_timeout_secs', 'int', '10', 'Espera por defecto de la acción wait'],
  ['action_timeout_secs', 'int', '30', 'Límite por acción'],
  ['remote_debugging_port', 'int', 'null', 'Se conecta a una instancia de Chrome existente en este puerto (avanzado)'],
])}

<h3>Configuración mínima</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}
<p>Todo lo demás tiene valores por defecto razonables. Las sesiones se guardan automáticamente en <code>~/.aidaemon/chrome-profile/</code>.</p>

<h2>Acciones</h2>

<table class="config-table">
<thead><tr><th>Acción</th><th>Parámetros</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>navigate</code></td><td><code>url</code></td><td>Abre una URL y espera a que cargue la página (hasta <code>nav_timeout_secs</code>, 30 s por defecto)</td></tr>
<tr><td><code>screenshot</code></td><td><code>selector?, full_page?, deliver?</code></td><td>PNG del viewport visible, de un elemento o de la página completa</td></tr>
<tr><td><code>render_pdf</code></td><td><code>source_path, output_filename?</code></td><td>Convierte un archivo HTML local a PDF</td></tr>
<tr><td><code>click</code></td><td><code>selector</code></td><td>Hace clic en un elemento por selector CSS</td></tr>
<tr><td><code>fill</code></td><td><code>selector, value</code></td><td>Escribe texto en un campo de formulario</td></tr>
<tr><td><code>get_text</code></td><td><code>selector?</code></td><td>Extrae el contenido de texto de un elemento o de la página completa</td></tr>
<tr><td><code>inspect_page</code></td><td>—</td><td>Describe la estructura de la página y sus elementos interactivos</td></tr>
<tr><td><code>scroll</code></td><td><code>direction?, amount?</code></td><td>Se desplaza hacia arriba o hacia abajo (700 px por defecto)</td></tr>
<tr><td><code>execute_js</code></td><td><code>script</code></td><td>Ejecuta JavaScript y devuelve el resultado (siempre pregunta antes)</td></tr>
<tr><td><code>wait</code></td><td><code>selector, condition?, text?, timeout_secs?</code></td><td>Espera hasta que un elemento esté presente, visible, habilitado, oculto o contenga texto (por defecto <code>element_timeout_secs</code>, 10 s)</td></tr>
<tr><td><code>list_tabs</code>, <code>new_tab</code>, <code>switch_tab</code>, <code>close_tab</code></td><td><code>url?</code> / <code>tab_id</code></td><td>Trabajan con varias pestañas</td></tr>
<tr><td><code>get_console_logs</code>, <code>get_network_errors</code></td><td><code>tab_id?</code></td><td>Leen la consola de la página y las solicitudes fallidas</td></tr>
<tr><td><code>set_mode</code></td><td><code>value</code></td><td>Alterna entre visible y headless</td></tr>
<tr><td><code>close</code></td><td>—</td><td>Cierra la sesión del navegador</td></tr>
</tbody>
</table>

<h2>Aprobaciones</h2>
<p>La navegación pública y la lectura de páginas no necesitan aprobación. Abrir un sitio de esta computadora pregunta una vez por sitio, los cambios de página pueden preguntar y <code>execute_js</code> siempre pregunta.</p>

<h2>Persistencia de sesiones</h2>
<p>La herramienta de navegador usa un perfil de Chrome dedicado en <code>~/.aidaemon/chrome-profile/</code> que guarda cookies, almacenamiento local y sesiones iniciadas. Esto significa que:</p>
<ul>
  <li>Inicias sesión una vez con <code>aidaemon browser login</code> y las sesiones persisten indefinidamente</li>
  <li>El agente lanza Chrome en modo headless con este perfil, ya autenticado</li>
  <li>Las sesiones sobreviven a los reinicios de AIDaemon y del sistema</li>
  <li>Vuelve a ejecutar <code>aidaemon browser login</code> cuando quieras para añadir servicios nuevos o renovar sesiones caducadas</li>
</ul>

${callout('warn', 'Aislado de tu Chrome personal', 'El agente usa su propio perfil de Chrome, completamente separado de tu navegador personal. Tus marcadores, extensiones y sesiones personales nunca se tocan.')}

<h2>Modos de despliegue</h2>

<h3>Instancia aislada (recomendado)</h3>
<p>Cuando ejecutas AIDaemon en un servidor o una VM dedicados, no hay ningún otro Chrome en ejecución. El agente lanza Chrome directamente y es su dueño.</p>
${codeBlock(`# SSH into your instance
ssh user@my-server

# One-time: log into services
aidaemon browser login

# Config
# [browser]
# enabled = true

# Done — agent handles Chrome automatically from here`, 'bash')}
<p>En servidores sin pantalla, usa SSH con reenvío de X (<code>ssh -X</code>) o VNC para el primer inicio de sesión.</p>

<h3>Computadora personal</h3>
<p>Cuando ejecutas AIDaemon junto a tu Chrome personal, el agente lanza una instancia de Chrome aparte con su propio perfil. Ambas se ejecutan lado a lado sin conflicto.</p>
${codeBlock(`# Same setup — separate Chrome instance, no conflict
aidaemon browser login

# Your personal Chrome (47 tabs, extensions, bookmarks) → untouched
# AIDaemon's Chrome (~/.aidaemon/chrome-profile/) → isolated`, 'bash')}

<h3>Avanzado: conectarse a un Chrome existente</h3>
<p>Para usuarios avanzados que quieren conectarse a una instancia de Chrome que ya se ejecuta con un puerto de depuración remota:</p>
${codeBlock(`[browser]
enabled = true
remote_debugging_port = 9222`, 'toml', 'config.toml')}
<p>Inicia Chrome con <code>--remote-debugging-port=9222</code> y el agente se conecta directamente. Esto comparte las sesiones de esa instancia de Chrome, pero requiere que Chrome se lance con la bandera de depuración.</p>

<h2>Capturas de pantalla</h2>
<p>Las capturas se guardan para que el agente las mire. Se te envía una cuando el agente la marca como el entregable que pediste (<code>deliver: true</code>).</p>

<h2>Mirar y tomar el control</h2>
<p>Con <code>[surfaces]</code> activado (por defecto), puedes mirar el navegador del agente y tomar el control desde una app emparejada, y el agente puede entregártelo para que inicies sesión (<code>hand_over</code>).</p>

<h2>Casos de uso</h2>
<ul>
  <li><strong>Monitoreo</strong> — revisa paneles (Grafana, Vercel, AWS Console), captura el estado de los despliegues</li>
  <li><strong>Extracción de datos</strong> — extrae datos de páginas renderizadas con JS, obtén informes de paneles de administración</li>
  <li><strong>Automatización de flujos de trabajo</strong> — llena formularios y recorre flujos de varios pasos en herramientas internas</li>
  <li><strong>Pruebas</strong> — navega por tu app desplegada, verifica la interfaz y revisa diseños responsivos</li>
  <li><strong>Navegación autenticada</strong> — interactúa con cualquier servicio en el que hayas iniciado sesión, sin claves de API</li>
</ul>

<h2>Compilar desde el código fuente</h2>
<p>La feature <code>browser</code> viene activada por defecto, así que un simple <code>cargo build --release</code> la incluye. Las compilaciones con <code>--no-default-features</code> deben añadir <code>--features browser</code>.</p>
<p>Requiere un navegador basado en Chromium instalado (Chrome, Chromium, Brave o Edge).</p>
`
  },
  {
    slug: '/tools/sub-agents',
    section: 'Tools',
    title: 'Creación de subagentes',
    description: 'Delega trabajo concreto en subagentes y especialistas con nombre, de uno en uno o varios en paralelo.',
    content: () => `
<h1>Creación de subagentes</h1>
<p class="lead">El agente puede delegar trabajo concreto en subagentes nuevos y especialistas con nombre, de uno en uno o varios en paralelo.</p>

<h2>Nombre de la herramienta</h2>
<p><code>spawn_agent</code></p>

<h2>Parámetros</h2>
${configTable([
  ['task', 'string', '—', 'Lo que debe hacer el subagente'],
  ['mission', 'string', 'title', 'Objetivo más amplio opcional para su contexto'],
  ['title', 'string', '—', 'Unas pocas palabras que se muestran en su tarjeta'],
  ['specialist', 'string', 'executor', 'code, research, review, browser_verifier, artifact_writer, comms_draft, executor o generic'],
  ['tasks', 'array', '—', 'Varios subagentes en una sola llamada (hasta 6, 3 a la vez)'],
  ['background', 'bool', 'false', 'Se ejecuta en segundo plano; el resultado llega a tu chat'],
  ['tools', 'array', '—', 'Limita qué herramientas puede usar'],
  ['access', 'string', '—', 'read_only para que solo observe'],
  ['scope', 'array', '—', 'Archivos o carpetas que puede cambiar'],
  ['model_tier', 'string', 'same', 'fast, primary o smart'],
])}

<h2>Comportamiento</h2>
<ul>
  <li>El agente hijo se ejecuta en <code>parent_depth + 1</code></li>
  <li>Hereda las herramientas y el acceso del padre (nunca más), y su modelo salvo que se defina <code>model_tier</code></li>
  <li>Recibe un prompt del sistema acotado: instrucciones base + contexto de la misión</li>
  <li>Ejecuta un bucle agéntico completo en una sesión aislada</li>
  <li>Devuelve al padre la respuesta de texto final (truncada a <code>max_response_chars</code>)</li>
  <li>Si <code>child_depth &lt; max_depth</code>, el hijo también recibe la herramienta <code>spawn_agent</code>; un especialista con nombre delega más solo si sus herramientas incluyen <code>spawn_agent</code></li>
</ul>

<h2>Especialistas</h2>
<p>Un subagente puede ejecutarse como un especialista con nombre, con sus propias instrucciones y herramientas. Reemplaza uno colocando <code>&lt;kind&gt;.md</code> en <code>~/.aidaemon/specialists/</code>.</p>

<h2>Configuración</h2>
${codeBlock(`[subagents]
enabled = true
max_depth = 3
max_response_chars = 8000
timeout_secs = 300        # stopped after this long with no progress
max_concurrent = 4
max_per_request = 12
task_token_budget = 500000`, 'toml', 'config.toml')}
<p><code>max_iterations</code> es una clave heredada. Por defecto no hay un límite de pasos.</p>

${callout('info', 'Límite de recursión', 'Los subagentes pueden crear sus propios subagentes hasta <code>max_depth</code> niveles de profundidad. En la profundidad máxima, la herramienta spawn_agent no se proporciona.')}

${callout('info', 'Sin límite de tiempo de reloj', 'Un subagente solo se detiene tras <code>timeout_secs</code> sin avanzar (sin ninguna herramienta en ejecución ni respuesta del modelo). El trabajo largo que sigue avanzando llega hasta el final, acotado por su presupuesto de tokens.')}
`
  },
  {
    slug: '/tools/cli-agents',
    section: 'Tools',
    title: 'Delegación a agentes de CLI',
    description: 'Delega trabajo de programación en Claude Code, Codex, Antigravity CLI, Gemini CLI, Copilot, Aider o cualquier agente de Agent Client Protocol, en un modo de permisos que elijas.',
    content: () => `
<h1>Delegación a agentes de CLI</h1>
<p class="lead">Delega tareas en agentes de programación externos (Claude Code, Codex, Antigravity CLI, Gemini CLI, Copilot, Aider) o en cualquier agente que hable el Agent Client Protocol, cada uno en un modo de permisos que elijas.</p>

<h2>Nombre de la herramienta</h2>
<p><code>cli_agent</code></p>

<h2>Parámetros</h2>
${configTable([
  ['action', 'string', '—', 'run, check, cancel o list (obligatorio)'],
  ['tool', 'string', '—', 'Nombre del agente, p. ej. claude, codex, agy'],
  ['prompt', 'string', '—', 'La tarea'],
  ['title', 'string', '—', 'Unas pocas palabras que se muestran en la tarjeta de la ejecución'],
  ['working_dir', 'string', '—', 'Directorio absoluto; legible, pero no escribible por sí mismo'],
  ['workspace_mode', 'string', '—', 'read_only o read_write'],
  ['write_paths', 'array', '—', 'Archivos o carpetas que una ejecución read_write puede cambiar (obligatorio para read_write)'],
  ['read_paths', 'array', '—', 'Rutas legibles adicionales'],
  ['scope', 'array', '—', 'Archivos o carpetas que la ejecución cambiará'],
  ['new_folders', 'array', '—', 'Carpetas nuevas creadas para la ejecución'],
  ['async_mode', 'bool', 'false', 'Se ejecuta en segundo plano'],
  ['system_instruction', 'string', '—', 'Da forma al agente como un especialista'],
])}
<p><code>manage_cli_agents</code> añade, quita, lista, activa y desactiva agentes en tiempo de ejecución y muestra el historial de ejecuciones, sin reiniciar.</p>

<h2>Agentes descubiertos</h2>
<p>Cuando <code>cli_agents.enabled = true</code> y no hay configuraciones de herramientas explícitas, estos se registran si su comando está instalado:</p>

<table class="config-table">
<thead><tr><th>Nombre</th><th>Agente</th><th>Comando</th></tr></thead>
<tbody>
<tr><td>claude</td><td>Claude Code</td><td><code>claude -p --output-format stream-json --verbose</code></td></tr>
<tr><td>codex</td><td>Codex</td><td><code>codex exec --json</code></td></tr>
<tr><td>agy</td><td>Antigravity CLI (Agent Client Protocol)</td><td><code>agy acp</code></td></tr>
<tr><td>gemini</td><td>Gemini CLI (Agent Client Protocol)</td><td><code>gemini --acp</code></td></tr>
<tr><td>copilot</td><td>Copilot CLI</td><td><code>copilot -p</code></td></tr>
<tr><td>aider</td><td>Aider</td><td><code>aider --message</code></td></tr>
</tbody>
</table>

<p>Cuando una llamada no nombra ninguna herramienta, se usa la primera disponible entre <code>claude</code>, <code>codex</code>, <code>agy</code>, <code>copilot</code>, <code>aider</code>. Gemini CLI no está en ese orden (Google ahora solo lo ofrece con licencias empresariales y claves de API de pago); se usa cuando se nombra, y su comprobación de disponibilidad informa de un inicio de sesión personal rechazado.</p>

<h2>Modos de permisos</h2>
<p>Cada agente de programación se ejecuta en uno de tres modos, definidos por agente en la página Settings de la app:</p>
<table class="config-table">
<thead><tr><th>Modo</th><th>Comportamiento</th></tr></thead>
<tbody>
<tr><td><strong>Checked by AIDaemon</strong> (por defecto)</td><td>Confinado a la carpeta del proyecto por el propio sandbox del agente; todo lo que vaya más allá se pregunta antes y se juzga con tus propias reglas</td></tr>
<tr><td><strong>Every command checked</strong></td><td>Se ejecuta en la propia máquina, y cada comando y cada cambio de archivo (salvo la breve lista del propio agente de comandos de solo lectura) se pregunta antes</td></tr>
<tr><td><strong>Full access</strong></td><td>Se ejecuta en la máquina sin preguntar nada. Elegirlo te pregunta primero.</td></tr>
</tbody>
</table>
<p>Claude Code y Codex le preguntan a AIDaemon en lugar de rechazar por su cuenta, así que tus permisos responden lo que cubren y una tarjeta pregunta el resto. Settings también muestra si cada agente puede trabajar ahora (<strong>Ready</strong>, o <strong>Not usable</strong> con su motivo y su solución, y <strong>Check again</strong>); el trabajo nunca se enruta a un agente que no puede ejecutarse.</p>

<h2>Cualquier agente de Agent Client Protocol</h2>
<p>Un agente que hable el <a href="https://agentclientprotocol.com" target="_blank" rel="noopener">Agent Client Protocol</a> se puede añadir en <code>[cli_agents.tools.&lt;name&gt;]</code> con <code>protocol = "acp"</code>. AIDaemon lo aloja mediante el protocolo, y cada acción que realiza se pregunta antes, de modo que todas pueden juzgarse.</p>
${codeBlock(`[cli_agents.tools.my-acp-agent]
command = "my-acp-agent"
args = ["--acp"]            # whatever starts its protocol server
protocol = "acp"
description = "An ACP coding agent"`, 'toml', 'config.toml')}

<h2>Configuración personalizada</h2>
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
<p>Definir cualquier entrada <code>[cli_agents.tools.*]</code> reemplaza la lista descubierta. Un lanzamiento guardado no puede ampliar lo que un agente conocido puede hacer: se rechazan los argumentos que eludirían su sandbox o sus aprobaciones.</p>

<h2>Extracción de la salida</h2>
<p>La herramienta intenta extraer una salida estructurada:</p>
<ul>
  <li><strong>JSON:</strong> busca los campos <code>result</code>, <code>output</code>, <code>content</code> o <code>message</code></li>
  <li><strong>JSONL:</strong> toma la última línea que contenga contenido</li>
  <li><strong>Alternativa:</strong> devuelve la salida en bruto, truncada a <code>max_output_chars</code></li>
</ul>
`
  },
  {
    slug: '/tools/web-search',
    section: 'Tools',
    title: 'Herramienta de búsqueda web',
    description: 'Busca en la web con DuckDuckGo, Brave o SearxNG en paralelo y devuelve títulos, URL y fragmentos combinados.',
    content: () => `
<h1>Herramienta de búsqueda web</h1>
<p class="lead">Busca en la web y devuelve títulos, URL y fragmentos. Admite DuckDuckGo (por defecto, no necesita clave), Brave y un SearxNG autoalojado. Por defecto se busca en paralelo en todos los backends configurados, y los resultados se combinan y se deduplican.</p>

<h2>Nombre de la herramienta</h2>
<p><code>web_search</code></p>

<h2>Parámetros</h2>
${configTable([
  ['query', 'string', '—', 'La consulta de búsqueda (obligatoria)'],
  ['max_results', 'integer', '8', 'Máximo de resultados combinados (máx. 20)'],
  ['freshness', 'string', '—', 'Solo resultados del último día, semana, mes o año'],
])}

<h2>Backends</h2>
<table class="config-table">
<thead><tr><th>Backend</th><th>Clave de API</th><th>Cómo funciona</th></tr></thead>
<tbody>
<tr><td><strong>DuckDuckGo</strong> (por defecto)</td><td>No requerida</td><td>Descarga <code>https://lite.duckduckgo.com/lite/</code> e interpreta los resultados HTML</td></tr>
<tr><td><strong>Brave</strong></td><td>Requerida</td><td>Llama a la API JSON <code>https://api.search.brave.com/res/v1/web/search</code></td></tr>
<tr><td><strong>SearxNG</strong></td><td>No requerida</td><td>Tu propia instancia en <code>search.searxng_url</code></td></tr>
</tbody>
</table>

<h2>Configuración</h2>
${codeBlock(`[search]
backend = "duckduckgo"   # or "brave", "searxng"
api_key = "keychain"     # Brave only; store it with: aidaemon keychain set search_api_key
searxng_url = ""         # e.g. "http://localhost:8080"
parallel = true          # search every configured backend and merge`, 'toml', 'config.toml')}

<h2>Formato de salida</h2>
<p>Devuelve resultados numerados en markdown. La antigüedad y las fuentes aparecen cuando se conocen, o cuando respondieron varios backends:</p>
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
    title: 'Herramienta de descarga web',
    description: 'Descarga cualquier URL y extrae contenido legible. Admite conversión de HTML a texto con límites configurables.',
    content: () => `
<h1>Herramienta de descarga web</h1>
<p class="lead">Descarga una URL y extrae su contenido legible. Siempre activada, sin configuración necesaria.</p>

<h2>Nombre de la herramienta</h2>
<p><code>web_fetch</code></p>

<h2>Parámetros</h2>
${configTable([
  ['url', 'string', '—', 'La URL a descargar (obligatoria)'],
  ['max_chars', 'integer', '20000', 'Máximo de caracteres a devolver (máx. 50000)'],
  ['offset', 'integer', '0', 'Caracteres a omitir, para leer más allá de una respuesta truncada'],
])}

<h2>Comportamiento</h2>
<ol>
  <li>Rechaza direcciones de red privada, de loopback y de metadatos de la nube, también después de redirecciones. Usa <code>http_request</code> para las APIs.</li>
  <li>Descarga la URL con encabezados similares a los de un navegador (user-agent de Firefox, encabezados Accept estándar)</li>
  <li>Intenta la extracción de legibilidad para obtener un texto de artículo limpio</li>
  <li>Recurre a la conversión completa de HTML a markdown</li>
  <li>Trunca a <code>max_chars</code> en un límite seguro de UTF-8</li>
</ol>

${callout('info', 'Complementa la herramienta de navegador', 'Usa <code>web_fetch</code> para extraer contenido rápidamente sin iniciar Chrome. Usa la <a href="/tools/browser">herramienta de navegador</a> para páginas interactivas que requieren JavaScript, llenado de formularios o capturas de pantalla.')}
`
  },
  {
    slug: '/tools/send-file',
    section: 'Tools',
    title: 'Transferencia de archivos',
    description: 'Envía y recibe archivos por Telegram, Slack, Discord o la app. Incluye validación de rutas y bloqueo de archivos sensibles.',
    content: () => `
<h1>Transferencia de archivos</h1>
<p class="lead">Envía archivos al usuario en el chat actual (Telegram, Slack, Discord o la app) y recibe archivos del usuario. Valida las rutas y bloquea los archivos sensibles.</p>

<h2>Nombre de la herramienta</h2>
<p><code>send_file</code> (saliente)</p>

<h2>Parámetros</h2>
${configTable([
  ['resource_id', 'string', '—', 'Identificador (res_…) de un adjunto o de un archivo creado por una herramienta; preferido'],
  ['file_path', 'string', '—', 'Ruta absoluta exacta, cuando no hay resource_id'],
  ['caption', 'string', 'null', 'Pie de foto opcional para el archivo'],
])}

<h2>Configuración</h2>
${codeBlock(`[files]
enabled = true        # on by default
inbox_dir = "~/.aidaemon/files/inbox"
outbox_dirs = ["~"]
max_file_size_mb = 10
retention_hours = 24`, 'toml', 'config.toml')}

<h2>Seguridad</h2>
<p>La herramienta aplica restricciones de rutas para evitar filtrar secretos por accidente:</p>
<ul>
  <li><strong>Rutas permitidas:</strong> solo los archivos dentro de <code>outbox_dirs</code> o <code>inbox_dir</code></li>
  <li><strong>Resolución de enlaces simbólicos:</strong> canonicaliza las rutas para evitar el recorrido de directorios</li>
  <li><strong>Patrones bloqueados:</strong> <code>.ssh</code>, <code>.gnupg</code>, <code>.env</code>, <code>credentials</code>, <code>.key</code>, <code>.pem</code>, <code>.aws/credentials</code>, <code>.netrc</code>, <code>.docker/config.json</code>, <code>config.toml</code></li>
</ul>

<h2>Archivos entrantes</h2>
<p>Los usuarios pueden enviar archivos al bot en cualquier canal conectado. AIDaemon los descarga en <code>inbox_dir</code> y los pone a disposición del agente. Admite documentos, fotos, audio, video y mensajes de voz, hasta <code>max_file_size_mb</code>.</p>

${callout('warn', 'Directorios de salida', 'La lista <code>outbox_dirs</code> controla desde qué directorios puede enviar archivos el agente. Mantenla lo más acotada posible en producción.')}
`
  },
  {
    slug: '/tools/people',
    section: 'Tools',
    title: 'Inteligencia de personas',
    description: 'Una libreta de contactos personal gestionada por tu asistente de IA. Recuerda cumpleaños, preferencias y relaciones, todo guardado localmente en tu equipo.',
    content: () => `
<h1>Inteligencia de personas</h1>
<p class="lead">Piensa en ella como una libreta de contactos, pero con un asistente personal que recuerda los detalles por ti. Cumpleaños, preferencias, estilos de comunicación, de dónde conoces a alguien &mdash; AIDaemon lo mantiene todo organizado y te lo recuerda cuando importa. Todo vive en tu computadora o servidor y nunca se envía a terceros.</p>

${callout('info', 'Activación en tiempo de ejecución', 'La inteligencia de personas se puede activar o desactivar en cualquier momento desde el chat. Solo di <strong>"activa la inteligencia de personas"</strong> o usa la herramienta <code>manage_people</code> con la acción <code>enable</code>/<code>disable</code>. No requiere reinicio.')}

<h2>Cómo funciona</h2>
<ol>
  <li><strong>Añade contactos</strong> &mdash; añade personas manualmente o deja que AIDaemon aprenda sobre ellas a partir de las conversaciones</li>
  <li><strong>Recuerda detalles</strong> &mdash; cumpleaños, preferencias, intereses, datos del trabajo y más</li>
  <li><strong>Vincula identidades</strong> &mdash; conecta a una persona con su identidad de Telegram, Slack o Discord</li>
  <li><strong>Recordatorios a petición</strong> &mdash; pide los próximos cumpleaños y las personas con las que retomar el contacto</li>
  <li><strong>Adaptación al contexto</strong> &mdash; cuando escribe una persona conocida, AIDaemon adapta su estilo de comunicación</li>
</ol>

<h2>Nombre de la herramienta</h2>
<p><code>manage_people</code></p>

<h2>Acciones</h2>
<table class="config-table">
<thead><tr><th>Acción</th><th>Descripción</th><th>Parámetros obligatorios</th></tr></thead>
<tbody>
<tr><td><code>remember</code></td><td>Guarda personas, nombres, alias, familia y lugares en la memoria personal. Siempre disponible, incluso con la inteligencia de personas desactivada.</td><td>personal_memory</td></tr>
<tr><td><code>enable</code></td><td>Activa la inteligencia de personas (persiste entre reinicios)</td><td>&mdash;</td></tr>
<tr><td><code>disable</code></td><td>Desactiva la inteligencia de personas (los datos se conservan)</td><td>&mdash;</td></tr>
<tr><td><code>status</code></td><td>Muestra el estado activado/desactivado y la cantidad de contactos</td><td>&mdash;</td></tr>
<tr><td><code>add</code></td><td>Añade una persona nueva</td><td>name</td></tr>
<tr><td><code>list</code></td><td>Lista todos los contactos (con filtro por relación)</td><td>&mdash;</td></tr>
<tr><td><code>view</code></td><td>Muestra los detalles de una persona y todos sus hechos</td><td>name o id</td></tr>
<tr><td><code>brief</code></td><td>Un resumen breve de una persona</td><td>name, person_name o id</td></tr>
<tr><td><code>upcoming</code></td><td>Cumpleaños y fechas importantes próximos</td><td>&mdash; (within_days)</td></tr>
<tr><td><code>reconnect</code></td><td>Personas con las que no has estado en contacto</td><td>&mdash; (inactive_days)</td></tr>
<tr><td><code>update</code></td><td>Actualiza campos de una persona (relación, notas, estilo)</td><td>name o id</td></tr>
<tr><td><code>remove</code></td><td>Elimina a una persona y todos sus hechos</td><td>name o id</td></tr>
<tr><td><code>add_fact</code></td><td>Guarda un hecho sobre alguien (cumpleaños, preferencia, etc.)</td><td>person_name, category, key, value</td></tr>
<tr><td><code>remove_fact</code></td><td>Elimina un hecho concreto por ID</td><td>fact_id</td></tr>
<tr><td><code>link</code></td><td>Vincula una identidad de plataforma a una persona</td><td>person_name, platform_id</td></tr>
<tr><td><code>export</code></td><td>Exporta como JSON todos los datos de una persona</td><td>person_name o name</td></tr>
<tr><td><code>purge</code></td><td>Eliminación completa en cascada (persona + hechos + vínculos)</td><td>person_name o name</td></tr>
<tr><td><code>audit</code></td><td>Revisa los hechos sin confirmar</td><td>&mdash; (o person_name)</td></tr>
<tr><td><code>confirm</code></td><td>Verifica un hecho sin confirmar (fija la confianza en 100 %)</td><td>fact_id</td></tr>
</tbody>
</table>

<h2>Parámetros</h2>
${configTable([
  ['action', 'string', '&mdash;', 'Acción a realizar (obligatorio)'],
  ['name', 'string', 'null', "Nombre de la persona (para add, view, brief, update, remove)"],
  ['id', 'integer', 'null', "ID de la persona en la base de datos (para view, update, remove)"],
  ['relationship', 'string', 'null', 'Tipo de relación: spouse, family, friend, coworker, acquaintance'],
  ['notes', 'string', 'null', 'Notas libres sobre la persona'],
  ['communication_style', 'string', 'null', 'Cómo comunicarse: casual, formal, warm, etc.'],
  ['language', 'string', 'null', 'Idioma preferido para la interacción'],
  ['person_name', 'string', 'null', "Nombre de la persona (para add_fact, link; export, purge y audit también aceptan name)"],
  ['category', 'string', 'null', 'Categoría del hecho: birthday, preference, interest, work, family, important_date, personality, gift_idea'],
  ['key', 'string', 'null', "Clave del hecho (p. ej., 'birthday', 'favorite_food')"],
  ['value', 'string', 'null', 'Valor del hecho. Para birthday o important_date, una fecha ISO (YYYY-MM-DD, o --MM-DD sin año)'],
  ['platform_id', 'string', 'null', "ID calificado con la plataforma (p. ej., 'slack:U123', 'telegram:456')"],
  ['display_name', 'string', 'null', 'Nombre para mostrar de la identidad de plataforma'],
  ['fact_id', 'integer', 'null', 'ID del hecho (para remove_fact, confirm)'],
  ['personal_memory', 'object', 'null', 'remember: personas, alias, hechos y relaciones'],
  ['within_days', 'integer', 'null', 'upcoming: días hacia adelante'],
  ['inactive_days', 'integer', 'null', 'reconnect: días sin contacto'],
])}

<h2>Cómo activarla</h2>
<p>Hay dos formas de activar la inteligencia de personas:</p>

<h3>Opción 1: desde el chat (recomendada)</h3>
<p>Solo dile a tu bot que la active. El ajuste se guarda en la base de datos y persiste entre reinicios.</p>
${codeBlock('You: "Enable people intelligence"\naidaemon: "People Intelligence enabled. I\'ll now remember contacts..."', 'text', 'chat')}

<h3>Opción 2: desde config.toml</h3>
<p>Define el estado inicial en tu archivo de configuración. Este valor se usa para inicializar la base de datos en el primer arranque; después, el ajuste en tiempo de ejecución tiene prioridad.</p>
${codeBlock('[people]\nenabled = true', 'toml', 'config.toml')}

<h2>Aprendizaje orgánico</h2>
<p>Durante la consolidación de memoria, AIDaemon registra a las personas que mencionas (nombres, apodos, cumpleaños, familia y dónde viven) en la memoria personal, el mismo almacén en el que escribe <code>remember</code>. Los hechos de la libreta de contactos se añaden con <code>add_fact</code>; <code>audit</code> y <code>confirm</code> revisan los que no se han confirmado.</p>

${callout('warn', 'Detalles sensibles', 'Los datos de salud y financieros no se guardan como hechos de contacto.')}

<h2>Tareas en segundo plano</h2>
<p>Cuando está activada, AIDaemon ejecuta revisiones diarias en segundo plano:</p>
<ul>
  <li><strong>Depuración de hechos obsoletos</strong> &mdash; elimina los hechos sin confirmar con más antigüedad que <code>fact_retention_days</code> (180 por defecto)</li>
  <li><strong>Fechas próximas y retomar contactos</strong> &mdash; se revisan a diario y se registran; pídelos cuando quieras con las acciones <code>upcoming</code> y <code>reconnect</code> (reconnect usa <code>reconnect_reminder_days</code>, 30 por defecto)</li>
</ul>

<h2>Modelo de privacidad</h2>
<table class="config-table">
<thead><tr><th>Contexto</th><th>Comportamiento</th></tr></thead>
<tbody>
<tr><td>Mensajes directos del propietario</td><td>El grafo completo de personas se inyecta en el prompt del sistema (nombres, hechos, relaciones)</td></tr>
<tr><td>No propietario (vinculado)</td><td>Solo adaptación del estilo de comunicación (no se inyectan hechos a otros usuarios)</td></tr>
<tr><td>Canales públicos</td><td>No se inyectan hechos personales</td></tr>
</tbody>
</table>

<h2>Configuración</h2>
${codeBlock('[people]\nenabled = true\nfact_retention_days = 180\nreconnect_reminder_days = 30', 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'Estado inicial (se puede alternar en tiempo de ejecución desde el chat)'],
  ['fact_retention_days', 'integer', '180', 'Días antes de depurar los hechos sin confirmar'],
  ['reconnect_reminder_days', 'integer', '30', 'Días de inactividad antes de sugerir retomar el contacto'],
  ['auto_extract, auto_extract_categories, restricted_categories', '—', '—', 'Se aceptan pero no se usan'],
])}
`
  },
  {
    slug: '/mcp',
    section: 'MCP',
    title: 'Resumen de MCP',
    description: 'Amplía AIDaemon con servidores de Model Context Protocol para acceso al sistema de archivos, bases de datos, APIs y más.',
    content: () => `
<h1>Integración con MCP</h1>
<p class="lead">Amplía AIDaemon con cualquier servidor de <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener">Model Context Protocol</a> para añadir acceso al sistema de archivos, bases de datos, APIs y más.</p>

<h2>Cómo funciona</h2>
<ol>
  <li>AIDaemon lanza cada servidor MCP configurado como un subproceso</li>
  <li>Se comunica mediante JSON-RPC 2.0 sobre stdin/stdout</li>
  <li>Llama a <code>tools/list</code> para descubrir las herramientas disponibles</li>
  <li>Cada herramienta descubierta se ofrece como <code>&lt;server&gt;__&lt;tool&gt;</code> (p. ej. <code>github__create_issue</code>)</li>
  <li>El modelo puede llamar a las herramientas MCP igual que a las integradas</li>
</ol>

<h2>Detalles del protocolo</h2>
<ul>
  <li><strong>Versión del protocolo:</strong> solicita 2025-06-18; acepta 2025-03-26 y 2024-11-05</li>
  <li><strong>Información del cliente:</strong> name="aidaemon", version = la versión del daemon</li>
  <li><strong>Transporte:</strong> JSON delimitado por líneas sobre stdin/stdout</li>
  <li><strong>Inicialización:</strong> solicitud <code>initialize</code> → <code>notifications/initialized</code></li>
</ul>

<h2>Seguridad</h2>
<ul>
  <li>Solo las variables seguras (PATH, HOME, LANG&hellip;) pasan del entorno del daemon a un servidor; cualquier otra debe definirse explícitamente.</li>
  <li>La salida de MCP se trata como no confiable, y las llamadas se juzgan en su peor caso (puede pedirse aprobación) salvo que listes la herramienta en <code>read_only_tools</code>.</li>
</ul>

<h2>Ejemplo</h2>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/documents"]

[mcp.sqlite]
command = "uvx"
args = ["mcp-server-sqlite", "--db-path", "my-database.db"]

[mcp.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]`, 'toml', 'config.toml')}

<h2>Añadir servidores en tiempo de ejecución</h2>
<p>La herramienta <code>manage_mcp</code> añade, lista, quita, reinicia, activa y desactiva servidores sin reiniciar. Los servidores añadidos se guardan y se vuelven a cargar al iniciar. Los comandos están limitados a <code>npx</code>, <code>uvx</code>, <code>node</code>, <code>python</code> y <code>python3</code>. Una variable secreta se vincula con <code>set_env</code> a una entrada del llavero llamada <code>mcp_&lt;server&gt;_&lt;KEY&gt;</code>, que guardas con <code>aidaemon keychain set</code>. En una conversación de proyecto, <code>project_list</code>, <code>project_start</code> y <code>project_stop</code> ejecutan los servidores del <code>.mcp.json</code> del proyecto solo para ese proyecto.</p>

${callout('info', 'Manejo de errores', 'Si un servidor MCP no puede iniciarse o listar herramientas, el error se registra, pero los demás servidores y las herramientas integradas siguen funcionando.')}
`
  },
  {
    slug: '/mcp/configuration',
    section: 'MCP',
    title: 'Configuración de servidores MCP',
    description: 'Configura servidores MCP en el config.toml de AIDaemon: servidores stdio, variables de entorno y herramientas de solo lectura.',
    content: () => `
<h1>Configuración de servidores MCP</h1>
<p class="lead">Cada servidor MCP se define como una sección con nombre bajo <code>[mcp]</code> en config.toml.</p>

<h2>Formato de configuración</h2>
${codeBlock(`[mcp.<server-name>]
command = "<executable>"
args = ["arg1", "arg2", ...]
env = { KEY = "value" }
read_only_tools = ["search"]`, 'toml')}

${configTable([
  ['command', 'string', '—', 'Ejecutable o script que lanza el servidor MCP'],
  ['args', 'array', '[]', 'Argumentos que se pasan al comando'],
  ['env', 'table', '{}', 'Variables de entorno del servidor (en otro caso solo se heredan las seguras)'],
  ['read_only_tools', 'array', '[]', 'Herramientas que declaras de solo lectura, por su nombre en tools/list; sus llamadas no necesitan aprobación'],
])}

<h2>Proceso de descubrimiento</h2>
<ol>
  <li>Para cada sección <code>[mcp.*]</code>, lanza el proceso con el comando y los argumentos configurados</li>
  <li>Inicializa la conexión JSON-RPC (handshake del protocolo)</li>
  <li>Llama a <code>tools/list</code> para enumerar las herramientas disponibles</li>
  <li>Ofrece cada herramienta al modelo como <code>&lt;server&gt;__&lt;tool&gt;</code> con la descripción y el esquema de entrada del servidor</li>
  <li>Registra cualquier error por servidor sin fallar de forma global</li>
</ol>
<p>Los servidores también se pueden añadir mientras AIDaemon se ejecuta, con la herramienta <code>manage_mcp</code>. Consulta <a href="/mcp">Resumen de MCP</a>.</p>

<h2>Ejemplos</h2>

<h3>Acceso al sistema de archivos</h3>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]`, 'toml')}

<h3>Búsqueda web</h3>
${codeBlock(`[mcp.brave-search]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-brave-search"]
env = { BRAVE_API_KEY = "…" }`, 'toml')}
<p>Para mantener la clave fuera de config.toml, vincúlala a un valor del llavero con <code>manage_mcp</code> <code>set_env</code> (una entrada del llavero llamada <code>mcp_&lt;server&gt;_&lt;KEY&gt;</code>, que guardas con <code>aidaemon keychain set</code>).</p>

<h3>Servidor personalizado en Python</h3>
${codeBlock(`[mcp.my-server]
command = "python3"
args = ["/path/to/my_mcp_server.py"]`, 'toml')}

${callout('info', 'Registro de stderr', 'AIDaemon captura y registra la salida stderr de los servidores MCP para depuración. Revisa los logs del daemon si un servidor no funciona.')}

<h2>Detección de amenazas</h2>
<p>AIDaemon realiza una detección de amenazas solo de auditoría sobre las llamadas a herramientas MCP. Los patrones sospechosos se registran pero <strong>no bloquean la ejecución</strong>. Aparte, cada llamada MCP pasa por la política de aprobación normal y su salida se trata como no confiable.</p>

<h3>Patrones sospechosos en los argumentos</h3>
<ul>
  <li><strong>Acceso a archivos:</strong> <code>/etc/passwd</code>, <code>/etc/shadow</code>, <code>.ssh/</code>, <code>.env</code></li>
  <li><strong>Configuración/secretos:</strong> <code>config.toml</code>, <code>aidaemon.db</code>, <code>api_key</code>, <code>bot_token</code>, <code>encryption_key</code></li>
  <li><strong>Red:</strong> <code>curl</code>, <code>wget</code>, <code>nc</code>, <code>base64</code></li>
  <li><strong>Ejecución de código:</strong> <code>eval(</code>, <code>exec(</code>, <code>| sh</code>, <code>| bash</code></li>
  <li><strong>Destructivos:</strong> <code>; rm </code>, <code>chmod 777</code></li>
</ul>

<h3>Patrones sospechosos en la salida</h3>
<ul>
  <li>Posibles claves de API: prefijos <code>sk-</code>, <code>ghp_</code></li>
  <li>Claves privadas: <code>-----BEGIN</code>, <code>PRIVATE KEY</code></li>
  <li>Términos sensibles: <code>password</code>, <code>bot_token</code></li>
</ul>

${callout('warn', 'Solo auditoría', 'La detección de amenazas es informativa: registra advertencias, pero no bloquea la ejecución de herramientas. Revisa los logs de tu daemon por si hay patrones marcados.')}
`
  },
  {
    slug: '/triggers',
    section: 'Triggers',
    title: 'Disparadores de correo',
    description: 'Monitorea bandejas de entrada de correo con IMAP IDLE y activa automáticamente al agente de AIDaemon con los mensajes nuevos.',
    content: () => `
<h1>Disparadores de correo</h1>
<p class="lead">Monitorea tu bandeja de entrada con IMAP IDLE y activa al agente con los correos nuevos.</p>

<h2>Cómo funciona</h2>
<ol>
  <li>AIDaemon se conecta con TLS al servidor IMAP configurado</li>
  <li>Selecciona la carpeta configurada (por defecto: INBOX)</li>
  <li>Entra en el modo IMAP IDLE: una conexión persistente que espera mensajes nuevos</li>
  <li>Cuando llega un correo nuevo, obtiene el sobre (asunto, remitente)</li>
  <li>Crea un Event y lo difunde por el bus de eventos interno. El texto del correo se limpia y se envuelve en un aviso que le indica al agente que no actúe sobre él sin tu aprobación.</li>
  <li>El agente maneja el evento como un mensaje no confiable y envía su respuesta a los chats de los propietarios: los usuarios permitidos de tus primeros bots de Telegram, Discord y Slack.</li>
</ol>

<h2>Configuración</h2>
${codeBlock(`[triggers.email]
host = "imap.gmail.com"
port = 993
username = "you@gmail.com"
password = "keychain"   # or "\${AIDAEMON_EMAIL_PASSWORD}"
folder = "INBOX"`, 'toml', 'config.toml')}

${configTable([
  ['host', 'string', '&mdash;', 'Nombre de host del servidor IMAP'],
  ['port', 'integer', '&mdash;', 'Puerto IMAP (normalmente 993)'],
  ['username', 'string', '&mdash;', 'Nombre de usuario del buzón'],
  ['password', 'string', '&mdash;', 'Contraseña del buzón. Admite <code>"keychain"</code> y <code>$&#123;ENV&#125;</code>.'],
  ['folder', 'string', 'INBOX', 'Carpeta a vigilar'],
])}

${callout('warn', 'Contraseñas de aplicación de Gmail', 'Para Gmail con verificación en dos pasos, genera una contraseña específica de aplicación en <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener">myaccount.google.com/apppasswords</a>.')}

<h2>Formato del evento</h2>
${codeBlock(`Event {
    source: "email",
    session_id: "email_trigger",
    content: "New email from sender@example.com: Subject line here"
}`, 'rust')}

<h2>Bus de eventos</h2>
<p>Los disparadores usan un canal broadcast de Tokio para entregar eventos. El agente escucha en el extremo receptor y procesa cada evento como un mensaje nuevo en su propia sesión. Bajo una carga alta, los eventos de disparadores no confiables pueden descartarse en lugar de encolarse sin límite.</p>

${callout('danger', 'Sesiones no confiables', 'Las sesiones de los disparadores de correo se marcan como <strong>no confiables</strong>. Cada comando de terminal en estas sesiones requiere tu aprobación, sin importar lo que hayas permitido antes.')}

<h2>Reconexión</h2>
<p>Si la conexión IMAP se cae, AIDaemon espera 30 segundos y se reconecta automáticamente.</p>
`
  },
  {
    slug: '/skills',
    section: 'Skills',
    title: 'Sistema de skills',
    description: 'Las skills son instrucciones en markdown que el agente carga con use_skill cuando una tarea las necesita, o cuando nombras una.',
    content: () => `
<h1>Sistema de skills</h1>
<p class="lead">Las skills son archivos markdown con instrucciones para un tipo de tarea. El agente ve una lista de las skills disponibles y carga la que necesita una tarea con la herramienta <code>use_skill</code>. También puedes pedir una skill por su nombre.</p>

<h2>Configuración</h2>
${codeBlock(`[skills]
enabled = true
dir = "skills"      # relative to config.toml's folder
registries = []     # URLs of skill registry manifests for browse/install`, 'toml', 'config.toml')}

<h2>Dónde viven las skills</h2>
<ul>
  <li><strong>Tus skills</strong> &mdash; el directorio de skills (<code>skills/</code> junto a config.toml), como <code>&lt;name&gt;.md</code>, o como una carpeta <code>&lt;name&gt;/SKILL.md</code> con archivos adicionales que el agente lee con <code>skill_resources</code></li>
  <li><strong>Skills de proyecto</strong> &mdash; hasta 50 skills de <code>.agents/skills/&lt;name&gt;/SKILL.md</code> y <code>.claude/skills/&lt;name&gt;/SKILL.md</code> del proyecto. Solo guían el trabajo en ese proyecto y no conceden ninguna autoridad adicional. Si un nombre choca, gana tu propia skill.</li>
</ul>

<h2>Formato del archivo de skill</h2>
<p>Las skills son archivos markdown con un frontmatter de tipo YAML:</p>
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

<h2>Campos del frontmatter</h2>
${configTable([
  ['name', 'string', '—', 'Nombre para mostrar de la skill'],
  ['description', 'string', '—', 'Descripción breve (se muestra en la lista de skills disponibles, para que el agente sepa cuándo encaja la skill)'],
  ['triggers', 'string', '—', 'Opcional. Se conserva para skills antiguas; ya no se usa para activar una skill.'],
])}

<h2>Cómo se activan las skills</h2>
<p>Una skill se carga de antemano solo cuando la nombras en tu mensaje:</p>
<ul>
  <li><code>$skill-name</code></li>
  <li><code>skill:skill-name</code></li>
  <li><code>use skill skill-name</code></li>
  <li>&ldquo;la skill skill-name&rdquo;</li>
</ul>
<p>En otro caso, el modelo elige de la lista de skills disponibles y llama a <code>use_skill</code> cuando una skill encaja claramente con la tarea. Las palabras clave de tu mensaje no activan skills.</p>

<h2>En el prompt</h2>
<ol>
  <li><strong>Skills disponibles</strong> — el nombre y la descripción de cada skill, parte del prompt central fijo del agente</li>
  <li><strong>Skills cargadas</strong> — el cuerpo completo de cada skill en uso, añadido al contexto de ese turno. El texto de la skill se sanea primero.</li>
</ol>
<p>La memoria (hechos, episodios, etc.) tiene su propia sección y no forma parte del bloque de skills.</p>

<h2>Skills dinámicas</h2>
<p>Además de los archivos de skill que escribes tú mismo, AIDaemon admite la gestión de skills en tiempo de ejecución mediante la herramienta <code>manage_skills</code> y registros opcionales.</p>

<h3>Acciones de la herramienta manage_skills</h3>
<table class="config-table">
<thead><tr><th>Acción</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>add</code></td><td>Descarga una skill desde una URL</td></tr>
<tr><td><code>add_inline</code></td><td>Interpreta contenido markdown en bruto como una skill</td></tr>
<tr><td><code>list</code></td><td>Muestra todas las skills cargadas con sus metadatos</td></tr>
<tr><td><code>remove</code></td><td>Elimina una skill por nombre</td></tr>
<tr><td><code>remove_all</code></td><td>Elimina varias skills por nombre</td></tr>
<tr><td><code>enable</code> / <code>disable</code></td><td>Activa o desactiva una skill</td></tr>
<tr><td><code>browse</code></td><td>Busca en los registros configurados</td></tr>
<tr><td><code>install</code></td><td>Instala desde un registro</td></tr>
<tr><td><code>update</code></td><td>Vuelve a descargar la skill desde su URL de origen</td></tr>
<tr><td><code>review</code></td><td>Aprueba o descarta borradores de skills promovidas automáticamente</td></tr>
</tbody>
</table>

<h3>Promoción automática</h3>
<p>Una tarea en segundo plano se ejecuta cada 12 horas y convierte en borradores de skills los procedimientos que funcionaron muchas veces. Los borradores permanecen inactivos hasta que los apruebas con <code>manage_skills</code> <code>review</code>.</p>
`
  },
  {
    slug: '/scheduler',
    section: 'Scheduler',
    title: 'Tareas programadas',
    description: 'Recordatorios y trabajo programado en AIDaemon: set_reminder, schedule_task, manage_automations, programaciones y zonas horarias.',
    content: () => `
<h1>Tareas programadas</h1>
<p class="lead">Crea automatizaciones recurrentes y únicas con palabras sencillas o con expresiones cron: recordatorios que solo te envían un mensaje, y trabajo programado que el agente realiza por su cuenta.</p>

${callout('info', 'Automatizaciones y zonas horarias', 'Pídelo con palabras sencillas y el agente lo configura: <code>set_reminder</code> (un <code>message</code> y un <code>when</code>) para recordatorios simples, que solo te envían un mensaje, y <code>schedule_task</code> para el trabajo programado. Una hora o programación recurrente puede nombrar una zona IANA (&ldquo;cada día laborable a las 8am Europe/Madrid&rdquo;, &ldquo;2030-07-15 09:00 Asia/Tokyo&rdquo;) y sigue su horario de verano; en otro caso, las horas se interpretan en tu propia zona. Las abreviaturas como &ldquo;EST&rdquo; se rechazan y se pide el nombre IANA. Una ejecución perdida mientras el daemon estaba apagado se registra como Missed y nunca cuenta como un fallo.')}

<h2>Herramientas</h2>
<table class="config-table">
<thead><tr><th>Herramienta</th><th>Propósito</th></tr></thead>
<tbody>
<tr><td><code>schedule_task</code></td><td>Trabajo programado: <code>task</code> (lo que hace cada ejecución), <code>when</code> y un <code>name</code> opcional. Lo confirmas en una tarjeta <strong>Approve &amp; activate</strong> antes de que empiece.</td></tr>
<tr><td><code>set_reminder</code></td><td>Solo un mensaje: <code>message</code>, <code>when</code> y un <code>name</code> opcional. No se ejecuta nada más cuando se dispara.</td></tr>
<tr><td><code>manage_automations</code></td><td>Ver, cambiar o detener automatizaciones (abajo)</td></tr>
</tbody>
</table>
<p>En el chat, <code>/work</code> también muestra el trabajo más largo que espera o se ejecuta por su cuenta, y <code>/status</code> muestra el siguiente elemento programado.</p>

<h2>Acciones de manage_automations</h2>
<table class="config-table">
<thead><tr><th>Acción</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>list</code> / <code>show</code></td><td>Lista las automatizaciones (programadas, de vigilancia, comprobaciones de salud) o muestra una por nombre</td></tr>
<tr><td><code>history</code></td><td>Ejecuciones pasadas, incluidas las perdidas</td></tr>
<tr><td><code>edit</code></td><td>Cambia <code>when</code>, <code>new_name</code>, <code>snooze_until</code> (mueve solo la siguiente ejecución) o <code>tell_me</code></td></tr>
<tr><td><code>pause</code> / <code>resume</code> / <code>cancel</code></td><td>Dejar de dispararse, volver a empezar o quitar (una o varias)</td></tr>
<tr><td><code>run_now</code></td><td>Ejecuta el trabajo programado de inmediato</td></tr>
<tr><td><code>last_failure</code></td><td>Por qué falló la última ejecución</td></tr>
<tr><td><code>set_budget</code></td><td>Presupuesto de tokens por ejecución (<code>budget_per_check</code>) y por día (<code>budget_daily</code>)</td></tr>
<tr><td><code>update_instructions</code></td><td>Cambia lo que hacen las ejecuciones posteriores</td></tr>
<tr><td><code>bind_workspace</code></td><td>Define el directorio de proyecto en el que trabajan sus ejecuciones</td></tr>
</tbody>
</table>
<p><code>tell_me</code> elige lo que el trabajo programado te comunica: <code>every_run</code>, solo <code>changes</code> o solo <code>problems</code>.</p>

<h2>Programaciones en lenguaje natural</h2>
<p>El planificador convierte patrones comunes en expresiones cron:</p>

<table class="config-table">
<thead><tr><th>Entrada</th><th>Cron</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><code>hourly</code></td><td><code>0 * * * *</code></td><td>Cada hora en punto (:00)</td></tr>
<tr><td><code>daily</code></td><td><code>0 0 * * *</code></td><td>Todos los días a medianoche</td></tr>
<tr><td><code>weekly</code></td><td><code>0 0 * * 0</code></td><td>Todos los domingos a medianoche</td></tr>
<tr><td><code>monthly</code></td><td><code>0 0 1 * *</code></td><td>El primero de cada mes</td></tr>
<tr><td><code>every 5m</code></td><td><code>*/5 * * * *</code></td><td>Cada 5 minutos (1&ndash;59)</td></tr>
<tr><td><code>every 2h</code></td><td><code>0 */2 * * *</code></td><td>Cada 2 horas (1&ndash;23)</td></tr>
<tr><td><code>daily at 9am</code></td><td><code>0 9 * * *</code></td><td>Todos los días a las 9:00 AM</td></tr>
<tr><td><code>daily at 6am, 12pm, 6pm</code></td><td><code>0 6,12,18 * * *</code></td><td>Varias veces al día (mismo minuto)</td></tr>
<tr><td><code>daily at 14:30</code></td><td><code>30 14 * * *</code></td><td>Todos los días a las 2:30 PM</td></tr>
<tr><td><code>weekdays at 8:30</code></td><td><code>30 8 * * 1-5</code></td><td>De lunes a viernes a las 8:30 AM</td></tr>
<tr><td><code>weekends at 10am</code></td><td><code>0 10 * * 0,6</code></td><td>Sábado y domingo a las 10:00 AM</td></tr>
<tr><td><code>Monday and Friday at 9am</code></td><td><code>0 9 * * 1,5</code></td><td>Días con nombre</td></tr>
<tr><td><code>in 2h</code>, <code>in 30m</code></td><td>(absoluto calculado)</td><td>Una sola vez, se dispara una vez tras la espera</td></tr>
<tr><td><code>today at 6pm</code>, <code>tomorrow at 9am</code></td><td>(absoluto calculado)</td><td>Una sola vez, a esa hora</td></tr>
<tr><td><code>2026-03-14 09:30</code></td><td>(absoluto calculado)</td><td>Una sola vez, en una fecha y hora exactas (RFC 3339 también funciona)</td></tr>
</tbody>
</table>

<p>Las expresiones cron estándar de 5 campos también se aceptan directamente (p. ej., <code>0 9 * * 1-5</code>).</p>

<h2>Configuración</h2>
<p>Las automatizaciones se crean pidiéndolas en el chat (o en la app) y se guardan en la base de datos. No hay una sección de config.toml para ellas; una sección <code>[scheduler]</code> antigua se ignora. El planificador revisa las ejecuciones pendientes en el heartbeat, cada <code>[heartbeat] tick_interval_secs</code> (30 por defecto).</p>

<h2>Almacenamiento de tareas</h2>
<p>Las automatizaciones se guardan en la base de datos como objetivos con programaciones. Las filas de la antigua tabla <code>scheduled_tasks</code> se migran automáticamente.</p>

<h2>Ejecuciones perdidas</h2>
<p>Una ejecución recurrente que estaba pendiente mientras el daemon estaba apagado, y ahora llega demasiado tarde para ser útil, se omite. Se registra como Missed en History, recibes un aviso y la programación pasa a su siguiente ejecución. Un elemento de una sola vez sí se ejecuta tarde.</p>

${callout('warn', 'Acceso del trabajo programado', 'El trabajo programado se ejecuta con tu acceso una vez que lo apruebas en la tarjeta de confirmación. Los comandos de terminal de esas ejecuciones no vuelven a preguntar, pero los comandos que seguirían ejecutándose en segundo plano (desacoplados) nunca se permiten en ellas.')}
`
  },
  {
    slug: '/router',
    section: 'Router',
    title: 'Enrutamiento de modelos',
    description: 'Cómo elige AIDaemon un modelo: modelos default, smart y fast, respaldos y reemplazos con /model.',
    content: () => `
<h1>Enrutamiento de modelos</h1>
<p class="lead">Cómo elige AIDaemon un modelo para cada turno: tu modelo por defecto para el trabajo normal, un modelo smart cuando un turno necesita más, un modelo fast para trabajos auxiliares y respaldos cuando una llamada falla.</p>

<h2>Ajustes de modelo</h2>
${codeBlock(`[provider.models]
default = "claude-sonnet-5-5"
fallback = ["claude-opus-5-5", "claude-haiku-5-5"]

# Older keys still work:
# primary = "claude-sonnet-5-5"   # read as default
# smart = "claude-opus-5-5"
# fast = "claude-haiku-5-5"`, 'toml', 'config.toml')}

${configTable([
  ['default', 'string', 'catalog', 'El modelo principal, usado para las solicitudes normales'],
  ['fallback', 'array', '[]', 'Modelos que se prueban en orden cuando una llamada falla. Si no se define, smart y fast pasan a ser los respaldos.'],
  ['primary', 'string', '&mdash;', 'Nombre anterior de <code>default</code>'],
  ['smart', 'string', 'catalog', 'El modelo más potente para los turnos que necesitan más'],
  ['fast', 'string', 'catalog', 'El modelo rápido y barato para trabajos auxiliares'],
])}
<p>Para un proveedor que AIDaemon conoce, cualquier modelo que omitas se completa desde su catálogo, así que una clave de API por sí sola te da un modelo default, uno fast y uno smart.</p>

<h2>Niveles</h2>
<table class="config-table">
<thead><tr><th>Nivel</th><th>Caso de uso</th><th>Modelos del catálogo</th></tr></thead>
<tbody>
<tr><td><strong>Fast</strong></td><td>Trabajo de memoria en segundo plano y ayudantes iniciados con <code>model_tier: "fast"</code></td><td>gpt-6-luna, claude-haiku-5-5, gemini-3.5-flash-lite</td></tr>
<tr><td><strong>Primary (default)</strong></td><td>Conversación normal y la mayor parte del trabajo con herramientas</td><td>gpt-6-sol, claude-sonnet-5-5, gemini-4-hydrogen</td></tr>
<tr><td><strong>Smart</strong></td><td>Turnos que necesitan más: herramientas de alto riesgo en juego, o un reintento tras un intento fallido</td><td>gpt-6-sol, claude-opus-5-5, gemini-4-argon</td></tr>
</tbody>
</table>
<p>Los modelos del catálogo de arriba son para la suscripción a ChatGPT, Anthropic y Google Gemini. Los demás proveedores (API de OpenAI, OpenRouter, xAI, DeepSeek, Moonshot) usan un solo modelo para todos los niveles salvo que los definas; DeepSeek usa <code>deepseek-reasoner</code> como su modelo smart.</p>

<h2>Cómo se elige un modelo</h2>
<ol>
  <li>Gana un modelo elegido para esta conversación en la app.</li>
  <li>Luego, un modelo definido con <code>/model</code>.</li>
  <li>Si tu modelo por defecto es un modelo de frontera (Claude, GPT-4 y posteriores, Gemini 2.5 y posteriores, Grok 3 y posteriores, o la serie o de OpenAI), todos los turnos lo usan. Cámbialo con <code>[policy] trust_tier = "guided"</code> o <code>"autonomous"</code>.</li>
  <li>En otro caso, cada turno usa el modelo por defecto y cambia al modelo smart cuando las herramientas en juego conllevan un riesgo alto o el último intento falló de inmediato.</li>
</ol>
<p>La redacción, la longitud o las palabras clave de tu mensaje no influyen en la elección. El modelo fast nunca se pone frente a tus mensajes; ejecuta trabajos auxiliares como la extracción de memoria, y ayudantes que el agente inicia con <code>model_tier: "fast"</code>. Los modelos de respaldo se prueban, en orden, cuando una llamada falla.</p>

<h2>Desactivar el enrutamiento automático</h2>
<ul>
  <li>Si todos los modelos son el mismo, el enrutamiento se desactiva automáticamente</li>
  <li>Enviar <code>/model &lt;name&gt;</code> en cualquier chat (Telegram, Slack, Discord) fija un solo modelo para todos los chats y desactiva el enrutamiento</li>
  <li>Enviar <code>/auto</code> vuelve a activar el enrutamiento automático</li>
</ul>
`
  },
  {
    slug: '/cost-tracking',
    section: 'Cost Tracking',
    title: 'Uso de tokens y presupuestos',
    description: 'Haz seguimiento del uso de tokens por modelo y sesión, define presupuestos de tokens por solicitud y por automatización, y consulta las estadísticas con /cost.',
    content: () => `
<h1>Uso de tokens y seguimiento de costos</h1>
<p class="lead">Haz seguimiento del consumo de tokens por modelo y sesión, y mantén el gasto bajo control con presupuestos de tokens por solicitud y por automatización. Consulta las estadísticas desde cualquier chat con <code>/cost</code>.</p>

<h2>Cómo funciona</h2>
<ol>
  <li>Cada llamada al modelo registra los tokens de entrada y de salida en la tabla <code>token_usage</code> de SQLite</li>
  <li>Cada registro incluye: nombre del modelo, ID de sesión, conteo de tokens (incluida la entrada en caché) y marca de tiempo</li>
  <li>No hay un tope diario global. Cada solicitud tiene un presupuesto de tokens, compartido por el turno y todos los ayudantes que inicia</li>
  <li>Las automatizaciones también pueden tener sus propios presupuestos por ejecución y por día</li>
</ol>

<h2>Configuración</h2>
${configTable([
  ['subagents.task_token_budget', 'integer', '500000', 'Tokens que una solicitud puede usar entre el turno y sus ayudantes. <code>0</code> = ilimitado.'],
  ['state.daily_token_budget', 'integer', 'null', 'Se ignora. Se conserva para que las configuraciones antiguas sigan cargándose; definirlo registra una advertencia.'],
])}

${codeBlock(`[subagents]
task_token_budget = 500000   # per request; 0 = unlimited`, 'toml', 'config.toml')}

<p>Recibes una advertencia al llegar al 80 % del presupuesto. Una ejecución que sigue avanzando puede ampliar su presupuesto hasta 3 veces, sin pasar nunca de 2.000.000 de tokens; en otro caso, el agente resume y se detiene.</p>

<h2>Presupuestos de automatización</h2>
<p>El trabajo programado puede tener sus propios presupuestos, definidos con <code>manage_automations</code> <code>set_budget</code>: <code>budget_per_check</code> (tokens por ejecución) y <code>budget_daily</code> (tokens por día). Los contadores diarios se reinician cada 24 horas. Cuando una ejecución tiene su propio presupuesto, el presupuesto por solicitud no se aplica además.</p>

${callout('info', 'Limitar el gasto total', 'AIDaemon no aplica un tope diario global de tokens. Para limitar el gasto total, define un límite en tu proveedor. Los ajustes de Providers de la app muestran lo que ha usado y lo que le queda a cada cuenta cuando el proveedor lo informa: los límites móviles de un plan de ChatGPT, el saldo de una clave de OpenRouter.')}

<h2>El comando /cost</h2>
<p>Envía <code>/cost</code> en cualquier chat (<code>!cost</code> en Slack) para ver las estadísticas de uso. Es solo para propietarios.</p>
${codeBlock(`Token usage (last 24h):
  Input:  12,450 tokens
  Output: 8,230 tokens

Token usage (last 7d):
  Input:  87,320 tokens
  Output: 52,180 tokens

Top models (7d):
  claude-sonnet-5-5: 98,400 tokens
  claude-haiku-5-5: 41,100 tokens`, 'text')}
<p>Se listan los cinco modelos principales de los últimos 7 días.</p>

<h2>Esquema de la base de datos</h2>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Clave primaria autoincremental'],
  ['session_id', 'TEXT', '—', 'Qué sesión de usuario/chat hizo la llamada'],
  ['model', 'TEXT', '—', 'Qué modelo de LLM se usó'],
  ['input_tokens', 'INTEGER', '—', 'Tokens enviados al modelo'],
  ['output_tokens', 'INTEGER', '—', 'Tokens generados por el modelo'],
  ['cached_input_tokens', 'INTEGER', 'null', 'Tokens de entrada servidos desde la caché de prompts del proveedor'],
  ['cache_creation_input_tokens', 'INTEGER', 'null', 'Tokens de entrada escritos en la caché de prompts'],
  ['call_id', 'TEXT', 'null', 'La llamada al modelo a la que pertenece este registro'],
  ['created_at', 'TEXT', 'now', 'Marca de tiempo UTC de la llamada'],
])}

<h2>Qué se registra</h2>
<ul>
  <li>Tokens de entrada (contexto + mensaje del usuario) por llamada al modelo, y cuántos vinieron de la caché de prompts</li>
  <li>Tokens de salida (respuesta del modelo) por llamada al modelo</li>
  <li>Nombre del modelo para los desgloses por modelo</li>
  <li>ID de sesión para el seguimiento por usuario</li>
  <li>Marca de tiempo para consultas por ventanas de tiempo (24 h, 7 d)</li>
</ul>
`
  },
  {
    slug: '/architecture',
    section: 'Architecture',
    title: 'Cómo funciona AIDaemon',
    description: 'Cómo un mensaje se convierte en una respuesta: canales, el motor de turnos sobre el kernel aidaemon-core, la cadena de hooks, el failover de modelos, los recibos y el cierre.',
    content: () => `
<h1>Cómo funciona AIDaemon</h1>
<p class="lead">Un mensaje llega por un canal, se convierte en un <em>turno</em>, se ejecuta en un pequeño kernel de agente hasta que el trabajo termina o un límite lo detiene, y la respuesta vuelve al lugar de donde vino. Esta página sigue ese recorrido.</p>

<h2>Las piezas</h2>
<table class="config-table">
<thead><tr><th>Pieza</th><th>Código</th><th>Qué hace</th></tr></thead>
<tbody>
<tr><td><strong>Canales</strong></td><td><code>crates/aidaemon-channel-telegram</code>, <code>-slack</code>, <code>-discord</code>, <code>crates/aidaemon-client-gateway</code> (la app)</td><td>Reciben mensajes, comprueban quién tiene permiso para hablar, muestran estado, aprobaciones y respuestas</td></tr>
<tr><td><strong>Turn runner</strong></td><td><code>crates/aidaemon-channels</code></td><td>Una cola por sesión: palabras de cancelación, deduplicación, el watchdog de inactividad, estado en vivo y entrega de respuestas, igual en todas las plataformas</td></tr>
<tr><td><strong>Agente y motor de turnos</strong></td><td><code>crates/aidaemon-runtime</code> (<code>agent/</code>, <code>turn/</code>, <code>engine/</code>)</td><td>Prepara un turno, lo ejecuta en el kernel y juzga si está terminado</td></tr>
<tr><td><strong>Kernel</strong></td><td><code>crates/aidaemon-core</code></td><td>El bucle en sí: llamada al modelo, llamadas a herramientas, hooks, recibos, límites, detección de bloqueos, interrupción y reanudación</td></tr>
<tr><td><strong>Proveedores</strong></td><td><code>crates/aidaemon-providers</code></td><td>Backends compatibles con OpenAI, Anthropic, Gemini y suscripción a ChatGPT, enrutamiento de modelos</td></tr>
<tr><td><strong>Herramientas</strong></td><td><code>src/tools</code>, <code>crates/aidaemon-tools</code> y otros</td><td>Lo que el modelo puede llamar; cada una declara sus efectos y hasta qué punto confiar en su salida</td></tr>
<tr><td><strong>Almacén de eventos</strong></td><td><code>crates/aidaemon-events</code></td><td>Historial de solo anexado de cada turno, y el registro de ejecuciones construido a partir de él (consulta <a href="/event-sourcing">Event sourcing</a>)</td></tr>
<tr><td><strong>Trabajo</strong></td><td><code>crates/aidaemon-work</code></td><td>Objetivos, tareas, programaciones, automatizaciones, listas de verificación, sondas de salud</td></tr>
<tr><td><strong>Memoria</strong></td><td><code>crates/aidaemon-memory</code></td><td>Hechos, episodios, procedimientos, personas, notas de proyecto</td></tr>
<tr><td><strong>Heartbeat</strong></td><td><code>crates/aidaemon-runtime</code> (<code>heartbeat</code>)</td><td>Ejecuta los trabajos en segundo plano: objetivos programados, aprendizaje de memoria, retención, limpieza</td></tr>
</tbody>
</table>

<h2>Del mensaje a la respuesta</h2>
<ol>
  <li><strong>Recibir.</strong> El canal autoriza al remitente y etiqueta el mensaje con su rol (propietario, invitado o público) y la visibilidad del canal (chat privado, interno o público).</li>
  <li><strong>Encolar.</strong> El turn runner lo pone en cola detrás de cualquier turno que ya se esté ejecutando en esa sesión y muestra un indicador de trabajo.</li>
  <li><strong>Preparar el turno.</strong>
    <ul>
      <li>El mensaje del usuario se guarda como un evento; su id es el id del turno.</li>
      <li>Se inicia una tarea.</li>
      <li>AIDaemon determina qué puede hacer este turno solo a partir de hechos explícitos: el rol del remitente, el canal, el modo de la sesión (por ejemplo <code>/readonly</code>), la configuración y cualquier permiso de espacio de trabajo. Luego ofrece solo las herramientas que esto permite.</li>
      <li>Elige el modelo.</li>
      <li>Construye el prompt del sistema: identidad y persona, skills que coinciden, hechos conocidos, instrucciones del proyecto (<code>AGENTS.md</code> / <code>CLAUDE.md</code>) y lo que la sesión está haciendo en este momento.</li>
    </ul>
  </li>
  <li><strong>Ejecutar en el kernel.</strong> El kernel llama al modelo. Si el modelo pide herramientas, las ejecuta y vuelve a llamar al modelo. Si no, el kernel pregunta a los hooks de parada si la respuesta puede darse por buena.</li>
  <li><strong>Cerrar.</strong> El registro de ejecuciones compara los recibos del turno con lo que necesitaba la solicitud, y comprueba la forma de la respuesta. La tarea termina como <code>succeeded</code>, <code>partial</code> o <code>failed</code>.</li>
  <li><strong>Entregar.</strong> La respuesta vuelve al canal y su entrega se registra. El aprendizaje a partir del turno ocurre después, en segundo plano.</li>
</ol>

<h2>El bucle del kernel</h2>
<p>Cada pasada construye la solicitud, llama al modelo y ejecuta las llamadas a herramientas que pidió. Las llamadas de solo lectura se ejecutan en paralelo; las que cambian algo se ejecutan una a una. Cada llamada termina con un <strong>recibo</strong>: <code>succeeded</code>, <code>failed</code>, <code>denied</code>, <code>timed_out</code>, <code>cancelled</code>, <code>skipped</code>, <code>unknown_tool</code>, <code>invalid_arguments</code>, <code>indeterminate</code> (el proceso se detuvo a mitad de la llamada) o <code>answered</code> (un hook respondió por la herramienta). Lo que cuenta como trabajo hecho son los recibos, no las palabras del modelo.</p>
<p>En los turnos del propio propietario, solo se envían las herramientas básicas con cada llamada al modelo. El resto se lista por nombre y se carga cuando el modelo las pide con <code>load_tools</code>.</p>

<h2>Una sola cadena de hooks juzga cada llamada a una herramienta</h2>
<p>Cada salvaguarda es un hook del kernel que juzga los efectos declarados de una llamada. Las herramientas nunca le preguntan al propietario ni rechazan por política por sí mismas. El orden es fijo:</p>
<ol>
  <li>Forma canónica de la llamada (para que todos los hooks posteriores juzguen la llamada que realmente se ejecutará)</li>
  <li>Autoridad: ¿se permite esta herramienta, ruta y nivel de acceso en este turno?</li>
  <li>Guardia de racha de la misma herramienta, parada del registro de ejecuciones, presupuesto de tokens, aviso de bloqueo</li>
  <li>Hooks de memoria</li>
  <li>Rutas protegidas, guardia de red, escaneo de secretos salientes</li>
  <li>Contenido no confiable: después de que el turno haya leído algo que el propietario no escribió, las llamadas que envían datos hacia fuera pasan por una comprobación aparte</li>
  <li>Aprobación del propietario (la última, de modo que al propietario solo se le pregunta por las llamadas que todo lo demás permite)</li>
  <li>Despacho, y coordinación con los demás agentes que trabajan en la misma solicitud</li>
</ol>

<h2>Límites</h2>
<p>El trabajo está acotado por el progreso y el costo, nunca por cuánto tarda.</p>
<table class="config-table">
<thead><tr><th>Límite</th><th>Por defecto</th><th>Notas</th></tr></thead>
<tbody>
<tr><td>Turnos de modelo por ejecución</td><td>150</td><td>Un respaldo; el tope estricto del kernel es 1.000</td></tr>
<tr><td>Presupuesto de tokens por solicitud</td><td>500.000</td><td><code>[subagents] task_token_budget</code>, compartido por la solicitud y todos los subagentes que inicia. Mientras el trabajo siga teniendo éxito, crece solo hasta 3 veces, sin pasar nunca de 2.000.000; después decide el propietario. <code>0</code> lo desactiva</td></tr>
<tr><td>La misma herramienta seguida</td><td>8</td><td>16 para herramientas de propósito general, 40 para herramientas paso a paso como computer use</td></tr>
<tr><td>Detección de bloqueos</td><td>3 repeticiones</td><td>La misma llamada con el mismo resultado 3 veces, la misma herramienta fallando 3 veces, o un ping-pong A/B/A/B durante 6 llamadas. El modelo recibe un aviso; tras 2 avisos, la ejecución se detiene</td></tr>
<tr><td>Inactividad</td><td>300 s</td><td><code>[daemon.watchdog]</code>: un turno que deja de avanzar se cancela. Cada llamada al modelo tiene su propio tiempo de espera de 300 s</td></tr>
</tbody>
</table>

<h2>Elegir el modelo y recuperarse de errores</h2>
<p>Gana el modelo fijado de una conversación, luego un <code>/model</code> de todo el daemon. Un subagente conserva el modelo con el que se creó. En otro caso, el turno usa el modelo primary; el router elige un nivel solo para los modelos en los que no se confía para trabajar de forma autónoma.</p>
<p>Cada llamada al modelo ejecuta una cadena de failover: el modelo elegido, luego los demás modelos del router, luego los modelos de cada proveedor de failover configurado.</p>
<table class="config-table">
<thead><tr><th>Error</th><th>Qué pasa</th></tr></thead>
<tbody>
<tr><td><strong>Límite de tasa, tiempo de espera, red, error del servidor</strong></td><td>Reintenta con retroceso (respetando <code>retry_after</code>) y luego pasa al siguiente modelo</td></tr>
<tr><td><strong>Solicitud incorrecta</strong></td><td>Reintenta una vez sin medios, una vez con opciones por defecto y luego pasa al siguiente modelo</td></tr>
<tr><td><strong>Facturación</strong></td><td>Reintenta una vez con un tope de salida menor y luego omite ese modelo durante 10 minutos</td></tr>
<tr><td><strong>Autenticación o cuota agotada</strong></td><td>Pasa al siguiente proveedor; si todo falla, lo que se informa es la cuota y su hora de reinicio</td></tr>
<tr><td><strong>Modelo no encontrado, error desconocido</strong></td><td>Siguiente modelo</td></tr>
<tr><td><strong>Contexto demasiado largo</strong></td><td>Detiene la cadena; el turno compacta su historial y vuelve a llamar</td></tr>
</tbody>
</table>

${callout('info', 'Última configuración buena conocida', 'Después de cada llamada exitosa al modelo, la configuración actual se copia a <code>config.toml.lastgood</code>. Si <code>config.toml</code> deja de cargarse más adelante, AIDaemon prueba <code>.lastgood</code>, luego <code>.bak</code>, <code>.bak.1</code> y <code>.bak.2</code>.')}

<h2>¿Cuándo termina un turno?</h2>
<p><strong>La evidencia pesa más que el contrato.</strong></p>
<ul>
  <li>Antes de cambiar o enviar algo, el modelo declara lo que necesita la solicitud con <code>track_requirements</code> (consulta <a href="/plans">Planes y listas de verificación</a>).</li>
  <li>Cada elemento solo se cierra con un recibo que coincida. Mientras un elemento esté abierto y alguna herramienta permitida aún pueda hacerlo, el registro de ejecuciones puede mandar al modelo de vuelta a hacer más trabajo, como máximo 2 pasadas extra.</li>
  <li>Una ejecución cuyos recibos tuvieron todos éxito se cierra como <code>succeeded</code>, incluso cuando el plan no pudo describir el trabajo.</li>
  <li>Un elemento que el modelo aplaza, omite o descarta permite que la ejecución se detenga, pero la tarea termina <code>partial</code>, nunca <code>succeeded</code>. Lo mismo ocurre con un modelo que informa <code>partial</code> o <code>blocked</code>, y con una solicitud que una política rechazó.</li>
</ul>
<p>Otras comprobaciones también pueden pedir una pasada más, cada una con su propio presupuesto:</p>
<ul>
  <li>La respuesta está vacía, es texto interno o es salida de herramienta pegada.</li>
  <li>La ejecución cambió código y no ejecutó ninguna compilación ni prueba.</li>
  <li>Varios agentes cambiaron archivos y nadie ha comprobado el resultado.</li>
  <li>Un clic en una interfaz gráfica nunca se verificó.</li>
  <li>No se registró una decisión de un mandato.</li>
</ul>

<h2>Corrección del orden de los mensajes</h2>
<p>Antes de cada llamada al modelo, el historial se corrige para que todos los proveedores lo acepten:</p>
<ol>
  <li>Combina los mensajes consecutivos del mismo rol.</li>
  <li>Descarta los resultados de herramientas sin llamada correspondiente, y las llamadas a herramientas sin resultado.</li>
  <li>Vuelve a combinar.</li>
  <li>Se asegura de que el historial empiece con un mensaje de usuario o de sistema.</li>
</ol>
<p>Una ejecución que supera la ventana de contexto del modelo se compacta.</p>

<h2>Sesiones</h2>
<table class="config-table">
<thead><tr><th>Origen</th><th>ID de sesión</th></tr></thead>
<tbody>
<tr><td>Telegram</td><td><code>{bot}:{chat_id}</code></td></tr>
<tr><td>Slack</td><td><code>slack:{channel_id}</code> o <code>slack:{channel_id}:{thread_ts}</code></td></tr>
<tr><td>Discord</td><td><code>discord:ch:{channel_id}</code> o <code>discord:dm:{user_id}</code>, con el prefijo <code>{bot}:</code> para un bot con nombre</td></tr>
<tr><td>Disparador de correo</td><td><code>email_trigger</code></td></tr>
<tr><td>Subagente</td><td>Derivado de la sesión del padre</td></tr>
</tbody>
</table>
<p>La confianza no viene del ID de sesión. Viene del rol del remitente, la visibilidad del canal y lo que el turno ha leído: el contenido que el propietario no escribió (páginas web, entradas de disparadores, mensajes de otras personas, resultados de MCP) marca el turno como no confiable.</p>

<h2>Reinicios</h2>
<p>El kernel guarda un checkpoint de cada ejecución en la misma base de datos (<code>run_events</code>, <code>run_states</code>). Si AIDaemon se detiene a mitad de un turno de chat, ese turno recibe una continuación tras el reinicio. Se le informa de qué llamadas estaban en curso y pueden haber surtido efecto o no, y ninguna se vuelve a ejecutar. Los subagentes en segundo plano no sobreviven a un reinicio; a sus chats se les avisa.</p>
`
  },
  {
    slug: '/architecture/state',
    section: 'Architecture',
    title: 'Almacenamiento y estado',
    description: 'Una sola base de datos SQLite, cifrada por defecto: qué crate es dueño de qué tablas, la caché de memoria de trabajo, la memoria a largo plazo, la retención y las copias de seguridad.',
    content: () => `
<h1>Almacenamiento y estado</h1>
<p class="lead">Todo lo que AIDaemon guarda está en un solo archivo SQLite, cifrado en reposo por defecto. Cada crate de dominio es dueño de sus propias tablas en ese archivo.</p>

<h2>La base de datos</h2>
<ul>
  <li><strong>Archivo:</strong> <code>[state] db_path</code> (por defecto <code>aidaemon.db</code>).</li>
  <li><strong>Cifrado:</strong> SQLCipher, integrado por defecto. Si no existe una clave, se genera una en <code>.env</code>, y una base de datos en texto plano existente se migra automáticamente. <code>AIDAEMON_ALLOW_PLAINTEXT_DB=1</code> es una omisión de emergencia.</li>
  <li><strong>Modo:</strong> diario WAL y un pool de 10 conexiones que comparten una caché de páginas (<code>[state] sqlite_cache_mib</code>, 64 por defecto).</li>
  <li><strong>Copias de seguridad al actualizar:</strong> cuando una versión nueva se inicia sobre una base de datos existente, primero escribe una copia consistente en <code>backups/</code>, junto a ella, y conserva las más recientes según <code>[state] upgrade_backups</code> (2 por defecto; <code>0</code> lo desactiva).</li>
</ul>

<h2>Quién es dueño de qué tablas</h2>
<table class="config-table">
<thead><tr><th>Área</th><th>Tablas principales</th><th>Dueño</th></tr></thead>
<tbody>
<tr><td>Historial de conversaciones y tareas</td><td><code>events</code>, <code>task_lifecycle</code>, <code>session_context_boundaries</code>, <code>history_message_index</code> / <code>history_message_fts</code> (búsqueda)</td><td><code>aidaemon-events</code>, <code>aidaemon-runtime</code></td></tr>
<tr><td>Checkpoints de ejecución del kernel</td><td><code>run_events</code>, <code>run_states</code></td><td><code>aidaemon-store-sqlite</code></td></tr>
<tr><td>Objetivos, tareas, programaciones, mandatos, listas de verificación</td><td><code>goals</code>, <code>tasks</code>, <code>goal_schedules</code>, <code>goal_runs</code>, <code>mandates</code>, <code>task_plans</code>, <code>notification_queue</code></td><td><code>aidaemon-work</code></td></tr>
<tr><td>Memoria a largo plazo</td><td><code>facts</code>, <code>episodes</code>, <code>procedures</code>, <code>error_solutions</code>, <code>people</code>, <code>person_facts</code>, <code>memory_*</code></td><td><code>aidaemon-memory</code></td></tr>
<tr><td>Sondas de salud</td><td><code>health_probes</code>, <code>probe_results</code>, <code>probe_alerts</code></td><td><code>aidaemon-work</code> (solo con <code>[health] enabled</code>)</td></tr>
<tr><td>Aprobaciones de terminal</td><td><code>terminal_backend_allowed_prefixes</code>, <code>terminal_capability_grants</code></td><td><code>aidaemon-runtime</code></td></tr>
<tr><td>Uso de tokens</td><td><code>token_usage</code>, <code>token_usage_daily</code></td><td><code>aidaemon-runtime</code></td></tr>
<tr><td>Configuración en tiempo de ejecución</td><td><code>settings</code>, <code>dynamic_bots</code>, <code>dynamic_mcp_servers</code>, <code>dynamic_skills</code>, <code>oauth_connections</code></td><td><code>aidaemon-runtime</code></td></tr>
<tr><td>Clientes de la app</td><td><code>client_events</code>, <code>client_devices</code>, <code>client_pairing</code></td><td><code>aidaemon-store-sqlite</code></td></tr>
</tbody>
</table>
<p>Las bases de datos antiguas se actualizan al iniciar: la antigua tabla <code>messages</code> pasa a <code>events</code>, y la antigua tabla <code>scheduled_tasks</code> pasa a objetivos y programaciones de objetivos. Después se eliminan ambas tablas antiguas.</p>

<h2>Historial de conversaciones</h2>
<p>La tabla <code>events</code> es el único registro de una conversación (consulta <a href="/event-sourcing">Event sourcing</a>). Los mensajes recientes de cada sesión también se guardan en caché en memoria, con el tope <code>[state] working_memory_cap</code> (50 por defecto), y se rellenan desde los eventos tras un reinicio. <code>/clear</code> registra un límite para que los turnos siguientes empiecen de cero sin borrar nada; <code>/wipe</code> elimina de verdad el historial de la sesión.</p>

<h2>Memoria a largo plazo</h2>
<p>Con el valor por defecto <code>[memory] backend = "daemon"</code>, la memoria vive en la misma base de datos:</p>
<ul>
  <li>Hechos, con las versiones anteriores reemplazadas en lugar de sobrescritas.</li>
  <li>Episodios que resumen sesiones pasadas.</li>
  <li>Procedimientos y soluciones a errores aprendidos del trabajo terminado.</li>
  <li>Personas.</li>
</ul>
<p>La recuperación ordena por significado, palabras, frescura, confianza y fuente. Los hechos más recientes, hasta <code>[state] max_facts</code> (20 por defecto), van al prompt del sistema. Los embeddings se calculan en local con fastembed (<code>[memory] embedding_model</code>, <code>AllMiniLML6V2Q</code> por defecto); cambiar el modelo vuelve a generar los embeddings de la memoria en segundo plano. Las notas de las conversaciones situadas en un proyecto se guardan como archivos en <code>~/.aidaemon/projects</code>, aparte de la memoria personal. Los trabajos de memoria en segundo plano se ejecutan cada <code>[state] consolidation_interval_hours</code> (6 por defecto). Consulta <a href="/tools/memory">Memoria</a>.</p>

<h2>Retención</h2>
<p>Un trabajo diario elimina las filas antiguas según <code>[state.retention]</code>. Cada valor está en días; <code>0</code> conserva las filas para siempre. Solo se elimina el historial del que la memoria ya ha aprendido.</p>
${configTable([
  ['messages_days', 'integer', '90', 'Eventos de conversación (inicio/fin de tarea, mensajes del usuario y del asistente)'],
  ['diagnostic_events_days', 'integer', '7', 'Eventos de herramientas, de llamadas al modelo y otros eventos de diagnóstico'],
  ['superseded_facts_days', 'integer', '90', 'Versiones antiguas de los hechos'],
  ['token_usage_aggregate_days', 'integer', '30', 'Filas de tokens en bruto, agrupadas antes en totales diarios'],
  ['episodes_days', 'integer', '365', 'Episodios que nunca se recuperaron'],
  ['behavior_patterns_days', 'integer', '90', 'Patrones en el mínimo de confianza'],
  ['goals_days', 'integer', '180', 'Objetivos completados o abandonados'],
  ['procedures_days', 'integer', '180', 'Procedimientos que nunca tuvieron éxito'],
  ['error_solutions_days', 'integer', '90', 'Soluciones a errores que hicieron más daño que bien'],
])}
`
  },
  {
    slug: '/service-install',
    section: 'Service',
    title: 'Ejecutar como servicio',
    description: 'Ejecuta aidaemon al iniciar sesión con aidaemon service install (launchd, unidad de usuario de systemd, tarea de inicio de sesión de Windows), o como servicio de todo el sistema.',
    content: () => `
<h1>Instalación como servicio</h1>
<p class="lead">Mantén aidaemon ejecutándose en segundo plano, iniciándose al iniciar sesión.</p>

<h2>Para este usuario (recomendado)</h2>
${codeBlock(`aidaemon service install      # this user, at login, from ~/.aidaemon (--dir to change); starts it now
aidaemon service uninstall`, 'bash')}
<p>No se necesitan derechos de administrador. Esto es lo que hace <strong>Run it here</strong> de la app en el primer arranque: un agente de launchd en macOS, una unidad de usuario de systemd en Linux (se activa lingering para que sobreviva a tu sesión de inicio) y una tarea de inicio de sesión en Windows. La descarga de la app de macOS ejecuta el daemon desde dentro de <code>AIdaemon.app</code>.</p>

<h2>De todo el sistema (heredado)</h2>
${codeBlock(`./aidaemon install-service`, 'bash')}

<p><code>install-service</code> sigue escribiendo la unidad de todo el sistema en Linux (necesita sudo) o el launch agent en macOS, e imprime los comandos para iniciarlo; él no inicia nada. En Windows no está disponible: usa <code>aidaemon service install</code>. Detecta automáticamente la plataforma:</p>

<h2>Linux (systemd)</h2>
<p>Crea <code>/etc/systemd/system/aidaemon.service</code>:</p>
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

<p>Imprime los comandos para activarlo e iniciarlo; ejecútalos tú mismo:</p>
${codeBlock(`sudo systemctl daemon-reload
sudo systemctl enable --now aidaemon`, 'bash')}

<h2>macOS (launchd)</h2>
<p>Copia el binario en un <code>~/Applications/aidaemon.app</code> firmado (para que los permisos concedidos en macOS sobrevivan a las recompilaciones; la descarga de la app usa su propio ayudante firmado) y crea <code>$HOME/Library/LaunchAgents/ai.aidaemon.plist</code>:</p>
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

<p>Luego cárgalo y concede Accesibilidad y Grabación de pantalla a aidaemon si usas computer use:</p>
${codeBlock(`launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/ai.aidaemon.plist`, 'bash')}

${callout('info', 'Suspensión en macOS', 'En macOS el daemon evita que la Mac entre en reposo por inactividad mientras se ejecuta (inicia <code>caffeinate -i</code> por sí mismo). No envuelvas el binario en <code>caffeinate</code> en el plist: eso rompe los permisos que necesita computer use.')}

<h2>Logs</h2>
<p>Un daemon que se ejecuta en segundo plano escribe un log rotado por tamaño y solo para el propietario en <code>~/Library/Logs/aidaemon/stdout.log</code> en macOS y en <code>~/.local/state/aidaemon/stdout.log</code> en los demás sistemas (bajo <code>$XDG_STATE_HOME</code> cuando está definida). Define <code>AIDAEMON_LOG_DIR</code> para cambiar la carpeta. En Linux, <code>journalctl --user -u aidaemon</code> muestra por qué se detuvo el servicio.</p>

<h2>Comprobación de salud</h2>
<p>Una vez que se ejecuta como servicio, verifícalo con:</p>
${codeBlock(`curl http://127.0.0.1:8080/health
# {"status": "ok", "components": {"database": {...}, "provider": {...}}}`, 'bash')}

<p>El endpoint de salud se sirve en <code>[daemon] health_bind</code>:<code>health_port</code> (por defecto <code>127.0.0.1:8080</code>). Responde <code>200</code> con <code>"ok"</code>, o <code>503</code> con <code>"degraded"</code> cuando la base de datos no responde o el proveedor del modelo no está disponible. Consulta <a href="/health-monitoring">Monitoreo de salud</a> para ver la respuesta completa.</p>
`
  },
  {
    slug: '/event-sourcing',
    section: 'Event Sourcing',
    title: 'Sistema de eventos',
    description: 'La tabla de eventos de solo anexado: qué registra AIDaemon, el registro de ejecuciones construido a partir de ella y cómo la usan el aprendizaje y la retención.',
    content: () => `
<h1>Event sourcing</h1>
<p class="lead">Cada turno se registra como una secuencia de eventos de solo anexado en la tabla <code>events</code>. El historial de la conversación, el resultado de la tarea y el registro que juzga si el trabajo se hizo se leen todos a partir de estos eventos.</p>

<h2>Qué se registra</h2>
<table class="config-table">
<thead><tr><th>Grupo</th><th>Tipos de evento</th></tr></thead>
<tbody>
<tr><td><strong>Conversación</strong></td><td><code>user_message</code>, <code>assistant_response</code>, <code>response_delivery</code> (el avance de la respuesta por el canal)</td></tr>
<tr><td><strong>Tareas</strong></td><td><code>task_start</code>, <code>task_end</code> (estado y resultado)</td></tr>
<tr><td><strong>Herramientas</strong></td><td><code>tool_call</code>, <code>tool_result</code></td></tr>
<tr><td><strong>Llamadas al modelo</strong></td><td><code>llm_call</code> (telemetría de latencia y de tokens)</td></tr>
<tr><td><strong>Finalización</strong></td><td><code>task_contract_compiled</code>, <code>executor_expectations_declared</code> (la lista de verificación del modelo), <code>background_continuation_linked</code></td></tr>
<tr><td><strong>Políticas y diagnóstico</strong></td><td><code>policy_decision</code>, <code>decision_point</code>, <code>policy_metrics_snapshot</code>, <code>memory_policy_compiled</code>, <code>user_constraint_violation</code>, <code>thinking_start</code>, <code>error</code></td></tr>
<tr><td><strong>Espera de una persona</strong></td><td><code>interaction_requested</code>, <code>interaction_resolved</code>, <code>approval_requested</code>, <code>approval_granted</code>, <code>approval_denied</code></td></tr>
<tr><td><strong>Recursos</strong></td><td><code>resource_registered</code>, <code>resource_invalidated</code></td></tr>
<tr><td><strong>Checkpoints de archivos</strong></td><td><code>checkpoint_created</code>, <code>checkpoint_finalized</code>, <code>checkpoint_skipped</code>, <code>rollback_started</code>, <code>rollback_completed</code>, <code>rollback_failed</code></td></tr>
<tr><td><strong>Subagentes</strong></td><td><code>sub_agent_spawn</code>, <code>sub_agent_complete</code></td></tr>
<tr><td><strong>Sesiones</strong></td><td><code>session_start</code>, <code>session_end</code></td></tr>
</tbody>
</table>

<h2>Estructura de un evento</h2>
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

<h2>Qué se construye a partir de los eventos</h2>
<ul>
  <li><strong>Historial de la conversación.</strong> Los mensajes que ve un modelo se leen de los eventos, agrupados por turno. Un índice de texto completo (<code>history_message_fts</code>) permite al agente buscar en conversaciones pasadas; un trabajo cada hora lo repara.</li>
  <li><strong>Ciclo de vida de la tarea.</strong> <code>task_lifecycle</code> guarda una fila por tarea (en ejecución o terminal) y se actualiza en la misma escritura que el evento. Así una tarea solo puede terminar una vez, incluso cuando un watchdog, una cancelación y el cierre normal compiten entre sí. Un trabajo cada minuto cierra las tareas que empezaron y nunca terminaron.</li>
  <li><strong>El registro de ejecuciones.</strong> El agregado de la ejecución se reconstruye a partir de los eventos de una tarea: sus obligaciones, sus recibos y su veredicto (<code>succeeded</code>, éxito por evidencia, cerrada por un rechazo de política, <code>failed</code> o pendiente). Reconstruirlo a partir de los mismos eventos siempre da la misma respuesta.</li>
  <li><strong>Contexto de la sesión.</strong> Un resumen de lo que la sesión está haciendo (tarea en ejecución, herramientas recientes, errores, aprobaciones, subagentes) va al prompt del sistema.</li>
</ul>
<p>El kernel también mantiene su propio diario por ejecución (<code>run_events</code>, <code>run_states</code>) para que una ejecución interrumpida pueda resolverse tras un reinicio.</p>

<h2>Aprender de los eventos</h2>
<p>Cada <code>[state] consolidation_interval_hours</code> (6 por defecto), los trabajos de memoria aprenden de los eventos de las sesiones terminadas: procedimientos a partir de las secuencias de herramientas que funcionaron, soluciones a errores, experiencia y patrones de fallo. Una pasada diaria hace lo mismo con cualquier sesión que tenga eventos sin aprender con más de 7 días. Las sesiones aisladas, o las tareas cuya política prohíbe la memoria automática, se marcan como atendidas sin aprender de ellas. En cualquier caso, los eventos reciben una hora <code>consolidated_at</code>, que los hace aptos para la retención.</p>

<h2>Retención</h2>
<p>Solo el trabajo diario de retención elimina eventos, y solo los que ya tienen <code>consolidated_at</code>. Los eventos de conversación (inicio/fin de tarea, mensajes del usuario y del asistente) se conservan 90 días (<code>[state.retention] messages_days</code>). Los eventos de herramientas, de llamadas al modelo y de diagnóstico se conservan 7 días (<code>diagnostic_events_days</code>). <code>0</code> los conserva para siempre. <code>/wipe</code> elimina de inmediato los eventos de una sesión.</p>

${callout('info', 'Solo anexado', 'Los eventos nunca se reescriben, salvo <code>consolidated_at</code> y las anotaciones añadidas a un mensaje del usuario. La retención y <code>/wipe</code> son las únicas eliminaciones.')}
`
  },
  {
    slug: '/plans',
    section: 'Plans',
    title: 'Planes y listas de verificación',
    description: 'Cómo declara AIDaemon lo que necesita una solicitud con track_requirements, cómo los recibos cierran cada elemento y cómo la lista de verificación decide si una tarea tuvo éxito.',
    content: () => `
<h1>Planes y listas de verificación</h1>
<p class="lead">Antes de cambiar o enviar algo, el agente anota lo que necesita la solicitud como una lista de verificación. Cada elemento se marca solo con el resultado de una llamada real a una herramienta, y la lista de verificación decide si la solicitud cuenta como terminada.</p>

<h2>La herramienta de lista de verificación</h2>
<p>El modelo llama a <code>track_requirements</code> antes de su primera operación siempre que una solicitud:</p>
<ul>
  <li>cambia un archivo, un sistema remoto, un despliegue, una programación o un ajuste, o</li>
  <li>envía o publica algo.</li>
</ul>
<p>Una solicitud con varias operaciones o destinos recibe un elemento por cada uno. Cada llamada pasa la lista completa, que reemplaza a la anterior. Si cambias o cancelas parte del trabajo a mitad de la ejecución, el agente pasa una lista revisada.</p>
<table class="config-table">
<thead><tr><th>Campo del elemento</th><th>Significado</th></tr></thead>
<tbody>
<tr><td><code>text</code></td><td>El requisito, escrito para que lo leas (por ejemplo, nombrando la carpeta que crea)</td></tr>
<tr><td><code>status</code></td><td><code>pending</code>, <code>in_progress</code>, <code>completed</code>, <code>skipped</code>, <code>failed</code>, <code>deferred</code> o <code>background</code> (un trabajo en segundo plano lo terminará)</td></tr>
<tr><td><code>depends_on</code></td><td>Índices de los elementos que deben ir antes</td></tr>
<tr><td><code>owner_units</code></td><td>Qué partes numeradas de tu solicitud lleva a cabo este elemento</td></tr>
<tr><td><code>mutation_effects</code></td><td>Qué tipo de cambio lo demuestra, como <code>local_workspace_write</code>, <code>repository_write</code>, <code>remote_deploy</code> o <code>external_delivery</code></td></tr>
<tr><td><code>requires_observation</code></td><td>Lo demuestra una lectura o una verificación</td></tr>
<tr><td><code>targets</code></td><td>Las rutas, URL o IDs de recursos exactos involucrados</td></tr>
</tbody>
</table>
<p>La llamada también puede llevar el veredicto del modelo, <code>outcome</code>: <code>done</code>, <code>partial</code>, <code>blocked</code>, <code>needs_owner</code> (el trabajo espera tu respuesta) o <code>nothing_new</code> (una ejecución programada no encontró cambios). Con <code>partial</code> o <code>blocked</code>, <code>short_of</code> puede indicar qué recurso de la máquina se agotó (espacio en disco, espacio en disco de Docker o memoria).</p>

<h2>Cómo se cierran los elementos</h2>
<ul>
  <li>Un elemento con efectos, destinos o una observación se cierra con el recibo de la llamada a la herramienta que lo hizo, nunca porque el modelo lo marque.</li>
  <li>Solo los elementos que no tienen nada de eso se marcan como <code>completed</code> a mano.</li>
  <li>Mientras un elemento alcanzable esté abierto, la ejecución puede mandarse de vuelta a hacer más trabajo.</li>
  <li>Un elemento marcado como <code>skipped</code>, <code>failed</code> o <code>deferred</code>, o quitado de la lista, permite que la ejecución se detenga, pero se informa como no hecho. La tarea entonces termina <code>partial</code>, nunca <code>succeeded</code>.</li>
  <li>Un veredicto del modelo de <code>partial</code> o <code>blocked</code> limita la tarea a <code>partial</code>. Los recibos pueden rebajar un <code>done</code> declarado; nada sube los otros dos.</li>
</ul>
<p>Editar la lista de verificación nunca convierte en trabajo hecho un trabajo que no ocurrió.</p>

<h2>Dónde se muestra y dónde se guarda</h2>
<ul>
  <li><strong>Tarjeta de estado.</strong> La lista de verificación aparece en la tarjeta de estado en vivo de tu chat y en la app, incluidos los elementos en segundo plano que siguen ejecutándose.</li>
  <li><strong>Almacenamiento.</strong> Se guarda en la tabla <code>task_plans</code>, así que la lista de verificación de una tarea sobrevive a un reinicio.</li>
  <li><strong>Aprendizaje.</strong> Las listas de verificación terminadas del último día alimentan el aprendizaje de procedimientos de la memoria.</li>
</ul>

<h2>Objetivos, programaciones y automatizaciones</h2>
<p>El trabajo de mayor duración (objetivos con tareas, ejecuciones programadas, mandatos que vigilan un objetivo) vive en <code>aidaemon-work</code>. Consulta <a href="/scheduler">Tareas programadas</a> y <a href="/tools/sub-agents">Subagentes</a>.</p>
`
  },
  {
    slug: '/health-monitoring',
    section: 'Health Monitoring',
    title: 'Monitoreo de salud',
    description: 'El endpoint /health de AIDaemon, sus watchdogs y sondas HTTP, TCP, de comandos y de archivos para tus servicios, con alertas de caída, recuperación y latencia.',
    content: () => `
<h1>Monitoreo de salud</h1>
<p class="lead">AIDaemon informa de su propia salud en un endpoint local, y puede vigilar tus servicios con sondas de salud que te avisan cuando algo falla.</p>

<h2>La salud del propio AIDaemon</h2>
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
  <li><strong>Códigos de respuesta:</strong> <code>200</code> con <code>"ok"</code> cuando la base de datos responde y el proveedor del modelo no está no disponible; en otro caso <code>503</code> con <code>"degraded"</code>.</li>
  <li><strong>Sin llamada al modelo:</strong> el estado del proveedor se lee de las llamadas recientes al modelo, no de una solicitud nueva. <code>provider.status</code> es <code>ready</code>, <code>recovering</code> (la última llamada falló), <code>stale</code> (ninguna llamada en 15 minutos), <code>unknown</code> (todavía no hay llamadas) o <code>unavailable</code>.</li>
  <li><strong>Cuándo cuenta como no disponible:</strong> la última llamada de los últimos 15 minutos falló por autenticación, facturación o una cuota agotada, o fallaron 3 o más llamadas seguidas.</li>
  <li><strong>Dirección:</strong> se sirve en <code>[daemon] health_bind</code>:<code>health_port</code> (por defecto <code>127.0.0.1:8080</code>). Con <code>[daemon] dashboard_enabled</code> (el valor por defecto), el mismo servidor también atiende los callbacks de OAuth.</li>
</ul>

<h2>Watchdogs</h2>
${configTable([
  ['stale_threshold_secs', 'integer', '300', 'Un turno cuyo bucle deja de latir durante este tiempo se cancela por colgado'],
  ['task_inactivity_timeout_secs', 'integer', '300', 'Una tarea sin actividad de herramientas ni del modelo durante este tiempo se considera colgada'],
  ['llm_call_timeout_secs', 'integer', '300', 'Tiempo de espera de una llamada al modelo'],
  ['background_stall_secs', 'integer', '120', 'Un comando en segundo plano que no avanza (CPU, E/S, salida) durante este tiempo puede detenerse'],
  ['background_max_runtime_secs', 'integer', '0', 'Tope opcional para un comando en segundo plano; 0 significa ninguno'],
])}
<p>Estos viven en <code>[daemon.watchdog]</code>. Nada se limita solo por el tiempo transcurrido; el trabajo que sigue avanzando sigue ejecutándose.</p>

<h2>Sondas de servicios</h2>
<p>Las sondas están desactivadas por defecto. Actívalas con <code>[health] enabled = true</code>.</p>
<table class="config-table">
<thead><tr><th>Tipo</th><th>Destino</th><th>Está sano cuando</th></tr></thead>
<tbody>
<tr><td><code>http</code></td><td>URL</td><td>El estado coincide con <code>expected_status</code> (200 por defecto) y el cuerpo contiene <code>expected_body</code> si está definido; se registra la latencia</td></tr>
<tr><td><code>port</code></td><td><code>host:port</code></td><td>Se abre una conexión TCP</td></tr>
<tr><td><code>command</code></td><td>Comando de shell (se ejecuta con <code>sh -c</code>)</td><td>El código de salida coincide con <code>expected_exit_code</code> (0 por defecto)</td></tr>
<tr><td><code>file</code></td><td>Ruta de archivo</td><td>El archivo existe y es más reciente que <code>max_age_secs</code> si está definido</td></tr>
</tbody>
</table>

<h2>Configuración</h2>
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
<p><code>schedule</code> admite las mismas formas que las tareas programadas (<code>every 5m</code>, <code>daily at 9am</code> o un cron de 5 campos). Las sondas de la configuración se mantienen sincronizadas por nombre: quita una del archivo y se quita de la base de datos.</p>

<h3>Opciones de la sonda (<code>config</code>)</h3>
${configTable([
  ['timeout_secs', 'integer', '10', 'Tiempo de espera en segundos'],
  ['expected_status', 'integer', '200', 'HTTP: código de estado esperado'],
  ['expected_body', 'string', 'null', 'HTTP: texto que debe contener el cuerpo'],
  ['method', 'string', '"GET"', 'HTTP: método'],
  ['headers', 'table', '{}', 'HTTP: encabezados adicionales'],
  ['expected_exit_code', 'integer', '0', 'Comando: código de salida esperado'],
  ['max_age_secs', 'integer', 'null', 'Archivo: antigüedad máxima'],
])}

<h2>Alertas</h2>
<ul>
  <li><strong>Caída:</strong> tras <code>consecutive_failures_alert</code> fallos seguidos (3 por defecto).</li>
  <li><strong>Recuperada:</strong> cuando una sonda que estaba caída vuelve a pasar.</li>
  <li><strong>Lenta:</strong> cuando la latencia supera <code>latency_threshold_ms</code>, como máximo una vez cada 5 minutos.</li>
</ul>
<p>Las alertas van a <code>alert_session_ids</code>, o a tus propios chats cuando está vacío. Un ID de sesión de Telegram se ve como <code>mybot:123456789</code>.</p>

<h2>Tareas en segundo plano</h2>
<ul>
  <li><strong>Bucle de ticks:</strong> cada <code>tick_interval_secs</code> (30 por defecto), ejecuta las sondas que toca ejecutar.</li>
  <li><strong>Limpieza:</strong> a diario a las 3:40 AM UTC, elimina los resultados con más antigüedad que <code>result_retention_days</code>.</li>
</ul>

${callout('info', 'Sondas en tiempo de ejecución', 'Con las sondas activadas, el agente puede crear, listar, ejecutar y comprobar sondas con la herramienta <code>health_probe</code> (acciones <code>create</code>, <code>list</code>, <code>run_now</code>, <code>status</code>). Las sondas también aparecen como automatizaciones en <code>manage_automations</code>, donde se pueden pausar o cancelar, y en el área System de la app, junto con los trabajos y las colas en segundo plano.')}
`
  },
  {
    slug: '/updates',
    section: 'Updates',
    title: 'Autoactualizador',
    description: 'Actualiza aidaemon automáticamente desde los releases de GitHub. Tres modos: enable (instala automáticamente), check_only (pregunta antes) y disable.',
    content: () => `
<h1>Autoactualizador</h1>
<p class="lead">aidaemon puede buscar releases nuevos en GitHub y actualizarse solo.</p>

<h2>Aspectos destacados de los últimos releases</h2>
<ul>
  <li><strong>v0.21.0</strong> &mdash; Read aloud en la app, respuestas que llegan en streaming mientras se escriben, la caché de prompts de una hora de Anthropic conservada al cargar herramientas diferidas, y correcciones para las URL base de Anthropic que terminan en <code>/v1</code> y para las llamadas a herramientas de Gemini</li>
  <li><strong>v0.20.0</strong> &mdash; la app de AIDaemon para escritorio, web y terminal; descargas para macOS, Windows y Linux ARM64; primer arranque desde la app; vistas en vivo del navegador del agente; modos de permisos de los agentes de programación; archivos y memoria de proyecto; actualizaciones automáticas de modelo; medidores de uso; programaciones en cualquier zona horaria</li>
  <li><strong>v0.12.9</strong> &mdash; correcciones de memoria: las ejecuciones programadas ya no escriben sus instrucciones en tu memoria, los extractores automáticos no pueden sobrescribir lo que tú dijiste y los duplicados parafraseados se combinan</li>
</ul>

<h2>Modos de actualización</h2>
<table class="config-table">
<thead><tr><th>Modo</th><th>Comportamiento</th></tr></thead>
<tbody>
<tr><td><code>enable</code></td><td>Descarga y aplica las actualizaciones automáticamente, y luego reinicia</td></tr>
<tr><td><code>check_only</code> (por defecto)</td><td>Avisa y espera la aprobación antes de aplicar</td></tr>
<tr><td><code>disable</code></td><td>Sin comprobaciones de actualización</td></tr>
</tbody>
</table>

<h2>Configuración</h2>
${codeBlock(`[updates]
mode = "check_only"
check_interval_hours = 24
check_at_utc_hour = 6
confirmation_timeout_mins = 60`, 'toml', 'config.toml')}

${configTable([
  ['mode', 'string', '"check_only"', 'Modo de actualización: enable, check_only o disable'],
  ['check_interval_hours', 'integer', '24', 'Horas entre comprobaciones de actualización'],
  ['check_at_utc_hour', 'integer', 'null', 'Hora UTC concreta (0-23) para la comprobación diaria'],
  ['confirmation_timeout_mins', 'integer', '60', 'Minutos de espera de la aprobación del usuario'],
])}

<h2>Proceso de actualización</h2>
<ol>
  <li><strong>Comprobar</strong> &mdash; consulta la API de GitHub Releases</li>
  <li><strong>Comparar</strong> &mdash; comparación semver</li>
  <li><strong>Avisar</strong> &mdash; envía las notas del release a los canales</li>
  <li><strong>Aprobar</strong> (check_only) &mdash; solicitud de aprobación con tiempo de espera</li>
  <li><strong>Descargar</strong> &mdash; binario específico de la plataforma</li>
  <li><strong>Reemplazar</strong> &mdash; sobrescribe el binario actual</li>
  <li><strong>Reiniciar</strong> &mdash; termina con el código 75 para provocar el reinicio del servicio</li>
</ol>

<p>Comprueba a mano con <code>aidaemon check-update</code>.</p>

<h2>Plataformas compatibles</h2>
<table class="config-table">
<thead><tr><th>Plataforma</th><th>Arquitectura</th></tr></thead>
<tbody>
<tr><td>Linux</td><td>x86_64, aarch64</td></tr>
<tr><td>macOS</td><td>x86_64, aarch64</td></tr>
<tr><td>Windows</td><td>Sin autoactualización: descarga el zip nuevo</td></tr>
</tbody>
</table>

${callout('info', 'Descarga de la app de macOS', 'El daemon dentro de <code>AIdaemon.app</code> no se reemplaza a sí mismo: avisa cuando hay una versión nueva, y tú instalas el nuevo <code>.dmg</code> del <a href="https://github.com/davo20019/aidaemon/releases/latest">último release</a> para actualizar ambos.')}
${callout('warn', 'Usuarios de Homebrew', 'Si instalaste con Homebrew, usa <code>brew upgrade aidaemon</code> en su lugar, o define <code>mode = "disable"</code>.')}
`
  },
  {
    slug: '/terminal/self-hosting',
    section: 'Terminal',
    title: 'Autoalojar el broker de terminal',
    description: 'Despliega tu propio broker de terminal en Cloudflare Workers para tener control total de la infraestructura de relay entre Telegram y tu máquina local.',
    content: () => `
<h1>Autoalojar el broker de terminal</h1>
<p class="lead">La función de terminal te permite ejecutar agentes de CLI (Codex, Claude, Gemini, OpenCode) directamente desde Telegram. Por defecto usa el broker compartido alojado en <code>terminal.aidaemon.ai</code>. Autoalojarlo te da control total de la infraestructura de relay.</p>

<h2>Arquitectura</h2>
<p>El sistema de terminal tiene tres componentes:</p>
<ul>
  <li><strong>El daemon de aidaemon</strong> (Rust) &mdash; se ejecuta en tu máquina, lanza sesiones PTY y se conecta con el broker mediante WebSocket</li>
  <li><strong>Broker</strong> (Cloudflare Worker) &mdash; relay WebSocket entre la Mini App y el daemon. Se encarga de la autenticación, la limitación de tasa y la gestión de sesiones</li>
  <li><strong>Mini App</strong> (incrustada en el broker) &mdash; frontend de Telegram Mini App con el emulador de terminal xterm.js</li>
</ul>

${codeBlock(`Telegram ──> Mini App (browser) <──WSS──> Broker (CF Worker) <──WSS──> aidaemon daemon ──> local PTY

                                        ┌───────────────────┐
  ┌──────────┐    ┌──────────────────┐   │  Cloudflare        │   ┌────────────────┐   ┌───────────┐
  │ Telegram │───>│ Mini App         │<─>│  Worker (Broker)   │<─>│ aidaemon       │──>│ local PTY │
  │          │    │ (xterm.js)       │   │  - auth            │   │ (terminal      │   │ (bash,    │
  │          │    │                  │   │  - rate limiting   │   │  bridge)       │   │  zsh...)  │
  └──────────┘    └──────────────────┘   │  - session mgmt   │   └────────────────┘   └───────────┘
                         WSS             └───────────────────┘          WSS`, 'text', 'architecture')}

${callout('info', 'Cifrado de extremo a extremo', 'El broker es un relay transparente &mdash; nunca ve el contenido real de la terminal. Toda la E/S de la terminal está cifrada entre la Mini App y tu daemon.')}

<h2>Requisitos previos</h2>
<ul>
  <li><strong>Cuenta de Cloudflare</strong> &mdash; el plan gratuito basta para uso personal</li>
  <li><strong>Un bot de Telegram</strong> &mdash; creado con <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a></li>
  <li><strong>aidaemon instalado y en ejecución</strong> &mdash; con el canal de Telegram configurado (<a href="/telegram">guía de configuración de Telegram</a>)</li>
  <li><strong>Node.js 20+</strong> y <strong>npm</strong> &mdash; para la <a href="https://developers.cloudflare.com/workers/wrangler/" target="_blank" rel="noopener">CLI wrangler</a></li>
</ul>

<h2>Paso 1 &mdash; Clona el broker</h2>
<p>El broker es un proyecto independiente de Cloudflare Worker. Clónalo e instala las dependencias:</p>
${codeBlock(`git clone https://github.com/davo20019/terminal.aidaemon.ai.git
cd terminal.aidaemon.ai
npm install`, 'bash')}

<h2>Paso 2 &mdash; Configura el despliegue</h2>
<p>Abre <code>wrangler.toml</code> y elige cómo quieres desplegar:</p>

<h3>Opción A: subdominio workers.dev (la más sencilla)</h3>
<p>Si no tienes un dominio propio, usa el subdominio gratuito <code>*.workers.dev</code> de Cloudflare. Comenta o elimina el bloque <code>routes</code>:</p>
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

<h3>Opción B: dominio propio</h3>
<p>Si tienes un dominio en Cloudflare DNS, configura una ruta hacia él:</p>
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

${callout('info', 'Se requiere Cloudflare DNS', 'Los dominios propios deben estar gestionados por Cloudflare DNS (con proxy, nube naranja). Si tu dominio está en otro registrador, puedes transferirlo o añadirlo como una <a href="https://developers.cloudflare.com/dns/zone-setups/" target="_blank" rel="noopener">zona de Cloudflare</a>.')}

<h2>Paso 3 &mdash; Define los secretos</h2>
<p>El broker necesita algunos secretos para funcionar. Defínelos con la CLI wrangler:</p>

${codeBlock(`# Required: signs all authentication tokens
npx wrangler secret put SESSION_SIGNING_KEY
# paste output of: openssl rand -base64 32

# Required: validates Telegram user identity
npx wrangler secret put TELEGRAM_BOT_TOKEN
# paste your bot token from @BotFather

# Optional: protects admin API endpoints
npx wrangler secret put ADMIN_API_KEY
# paste a strong random string`, 'bash')}

${callout('danger', 'Protege tu clave de firma', '<code>SESSION_SIGNING_KEY</code> firma todos los tokens de autenticación. Si se compromete, un atacante podría falsificar sesiones. Genera un valor aleatorio fuerte y guárdalo de forma segura. Rótala de inmediato si sospechas una filtración.')}

<p>Lista completa de los secretos disponibles:</p>
${configTable([
  ['SESSION_SIGNING_KEY', 'string', '&mdash;', 'Obligatorio. Firma los tokens de autenticación. Genéralo con <code>openssl rand -base64 32</code>'],
  ['TELEGRAM_BOT_TOKEN', 'string', '&mdash;', 'Obligatorio. Token del bot de @BotFather. Debe coincidir con el token de tu configuración de aidaemon'],
  ['ADMIN_API_KEY', 'string', '&mdash;', 'Opcional. Protege los endpoints de administración (gestión de usuarios, cambios de cuota)'],
  ['BILLING_WEBHOOK_SECRET', 'string', '&mdash;', 'Opcional. Secreto HMAC para verificar la firma del webhook de facturación'],
])}

<h2>Paso 4 &mdash; Despliega</h2>
<p>Despliega el broker en Cloudflare Workers:</p>
${codeBlock(`npx wrangler deploy   # or: npm run deploy`, 'bash')}

<p>Deberías ver una salida como esta:</p>
${codeBlock(`Uploaded terminal-broker (3.45 sec)
Published terminal-broker (0.35 sec)
  https://terminal-broker.your-subdomain.workers.dev
Current Deployment ID: abc12345-...`, 'text', 'deploy output')}

${callout('info', 'Migración de Durable Object', 'El primer despliegue crea automáticamente la migración del Durable Object para <code>UserSessionStore</code>. No se necesitan pasos de migración manuales.')}

<h2>Paso 5 &mdash; Configura aidaemon</h2>
<p>Apunta tu daemon de aidaemon a tu broker autoalojado. Actualiza tu <code>config.toml</code>:</p>

${codeBlock(`[terminal]
web_app_url = "https://terminal.example.com"
daemon_ws_url = "wss://terminal.example.com/v1/ws/daemon"`, 'toml', 'config.toml')}

<p>O usa variables de entorno:</p>
${codeBlock(`export AIDAEMON_TERMINAL_WEB_APP_URL="https://terminal.example.com"
export AIDAEMON_TERMINAL_BROKER_URL="wss://terminal.example.com/v1/ws/daemon"`, 'bash')}

<p>Otros reemplazos que lee el daemon: <code>AIDAEMON_TERMINAL_BRIDGE_ENABLED</code> (o <code>[terminal] bridge_enabled</code>, true por defecto), <code>AIDAEMON_TERMINAL_DAEMON_TOKEN</code>, <code>AIDAEMON_TERMINAL_USER_ID</code>, <code>AIDAEMON_TERMINAL_DEVICE_ID</code> y <code>AIDAEMON_TERMINAL_SHELL</code>.</p>

<p>Reinicia aidaemon después de cambiar la configuración para que los valores nuevos surtan efecto.</p>

<h2>Paso 6 &mdash; Configura Telegram</h2>
<p>Cómo configures Telegram depende de cómo lances la terminal:</p>

<h3>Con el comando /terminal (botones en línea)</h3>
<p>Si usas el comando <code>/terminal</code> en el chat de tu bot, la URL de la Mini App sale de <code>web_app_url</code> en tu <code>config.toml</code>. No se necesitan cambios en BotFather &mdash; aidaemon define automáticamente la URL del botón en línea.</p>

<h3>Con el botón de menú</h3>
<p>Si quieres la terminal accesible como un botón de menú permanente en tu bot:</p>
<ol>
  <li>Abre <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a> en Telegram</li>
  <li>Envía <code>/mybots</code> y selecciona tu bot</li>
  <li>Ve a <strong>Bot Settings</strong> &rarr; <strong>Menu Button</strong></li>
  <li>Define la URL de tu broker (p. ej. <code>https://terminal-broker.your-subdomain.workers.dev</code>)</li>
</ol>

${callout('warn', 'Se requiere HTTPS', 'Telegram exige que la URL de la Mini App use HTTPS. Tanto los subdominios <code>workers.dev</code> como los dominios propios con proxy de Cloudflare ofrecen HTTPS automáticamente.')}

<h2>Verificación</h2>
<p>Confirma que todo funciona:</p>

<h3>1. Comprobación de salud</h3>
${codeBlock(`curl https://terminal.example.com/health`, 'bash')}
<p>Respuesta esperada:</p>
${codeBlock(`{
  "ok": true,
  "service": "terminal.example.com",
  "mode": "broker-e2ee-bridge",
  "timestamp": "2026-03-01T12:00:00.000Z"
}`, 'json', 'health response')}

<h3>2. Prueba la Mini App</h3>
<p>Envía <code>/terminal</code> a tu bot en Telegram. La Mini App debería abrirse y mostrar la interfaz de la terminal.</p>

<h3>3. Revisa los logs de aidaemon</h3>
<p>Busca la conexión del puente de terminal en los logs de aidaemon (<code>~/Library/Logs/aidaemon/stdout.log</code> en macOS, <code>~/.local/state/aidaemon/stdout.log</code> en los demás sistemas):</p>
${codeBlock(`INFO Connecting terminal bridge to broker
INFO Terminal bridge connected`, 'text', 'aidaemon logs')}

${callout('success', 'Todo listo', 'Si la comprobación de salud devuelve <code>"ok": true</code>, la Mini App se abre en Telegram y los logs de aidaemon muestran la conexión con el broker &mdash; tu terminal autoalojada está totalmente operativa.')}

<h2>Configuración de cuotas</h2>
<p>El broker aplica cuotas mensuales por usuario para evitar abusos. Registra los inicios de sesión, los minutos activos, los bytes transferidos y los fotogramas WebSocket. Los límites del plan "free" por defecto son generosos y más que suficientes para uso personal.</p>

<p>Para personalizar los límites del plan, define la variable de entorno <code>PLAN_LIMITS_JSON</code> en tu <code>wrangler.toml</code>:</p>
${codeBlock(`[vars]
PLAN_LIMITS_JSON = '{"free":{"monthly_session_starts":500,"monthly_ws_frames":500000}}'`, 'toml', 'wrangler.toml')}

<p>Otros ajustes de plan: <code>DEFAULT_TENANT_PLAN</code> (el plan que reciben los usuarios nuevos, <code>free</code> por defecto) y <code>TENANT_PLAN_OVERRIDES_JSON</code> (ID de usuario a plan). <code>ADMIN_API_KEYS</code> admite varias claves de administración, separadas por comas o por saltos de línea.</p>

<p>Para asignar un usuario concreto al plan "pro" (o a cualquier plan personalizado), usa la API de administración:</p>
${codeBlock(`curl -X POST https://terminal.example.com/v1/admin/plan \\
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"user_id": "TELEGRAM_USER_ID", "plan": "pro"}'`, 'bash')}

<p>Claves de límite de plan disponibles:</p>
${configTable([
  ['monthly_session_starts', 'integer', '350', 'Sesiones de terminal que un usuario puede iniciar al mes'],
  ['monthly_session_minutes', 'integer', '2400', 'Minutos activos de terminal al mes'],
  ['monthly_client_bytes', 'integer', '536870912', 'Bytes desde la Mini App al mes (512 MiB)'],
  ['monthly_daemon_bytes', 'integer', '1073741824', 'Bytes desde el daemon al mes (1 GiB)'],
  ['monthly_ws_frames', 'integer', '300000', 'Fotogramas WebSocket al mes'],
  ['max_active_scoped_sessions', 'integer', '4', 'Sesiones que un usuario puede tener abiertas a la vez'],
])}

<h2>Solución de problemas</h2>
<table class="config-table">
<thead><tr><th>Síntoma</th><th>Causa</th><th>Solución</th></tr></thead>
<tbody>
<tr><td>"Terminal bridge disabled" en los logs de aidaemon</td><td><code>daemon_ws_url</code> está mal configurado</td><td>Debe usar <code>wss://</code> (no <code>ws://</code>). Cloudflare Workers requiere TLS.</td></tr>
<tr><td>La Mini App muestra "invalid session"</td><td>Los tokens no coinciden</td><td><code>TELEGRAM_BOT_TOKEN</code> en el broker debe coincidir exactamente con el token del bot en el <code>config.toml</code> de tu aidaemon</td></tr>
<tr><td>"Token signature mismatch"</td><td>Falta la clave de firma o es incorrecta</td><td>Asegúrate de que <code>SESSION_SIGNING_KEY</code> esté definida con <code>npx wrangler secret put</code></td></tr>
<tr><td>La conexión WebSocket se cae</td><td>Error o tiempo de espera del Worker</td><td>Revisa en el panel de Cloudflare &rarr; Workers &amp; Pages &rarr; tu worker &rarr; Logs si hay errores</td></tr>
<tr><td>"daemon_auth_rate_limited"</td><td>Demasiados intentos de conexión fallidos</td><td>Espera 60 segundos, luego corrige el problema de autenticación de fondo y vuelve a conectar</td></tr>
</tbody>
</table>

<h2>Notas de seguridad</h2>
<ul>
  <li>El broker es un <strong>relay transparente</strong> &mdash; el contenido de la terminal está cifrado de extremo a extremo entre la Mini App y tu daemon</li>
  <li>El broker ve: IDs de usuario, metadatos de sesión y los tamaños de los fotogramas cifrados &mdash; pero <strong>nunca</strong> el contenido real de la terminal</li>
  <li><code>SESSION_SIGNING_KEY</code> es el secreto más crítico &mdash; rótalo de inmediato si se compromete</li>
  <li>Todas las conexiones usan TLS (WSS) &mdash; Cloudflare Workers exige HTTPS por defecto</li>
</ul>

${callout('info', 'Modelo de amenazas completo', 'Para un análisis de seguridad detallado, consulta <a href="https://github.com/davo20019/terminal.aidaemon.ai/blob/main/SECURITY.md" target="_blank" rel="noopener">SECURITY.md</a> en el repositorio del broker.')}
`
  },
];

export default pages;
