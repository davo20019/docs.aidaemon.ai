import { codeBlock, callout, configTable } from '../helpers.js';

const pages = [
  {
    slug: '/',
    section: null,
    title: 'Documentacion de aidaemon — Agente IA Personal en Segundo Plano',
    description: 'Documentacion de aidaemon, un agente IA personal de codigo abierto que se ejecuta en segundo plano. Chatea via Telegram, Slack o Discord. Extiende con MCP, usa cualquier LLM.',
    content: () => `
<h1><span class="ai">AI</span>daemon</h1>
<p class="lead">Un agente IA personal que se ejecuta como daemon. Siempre activo, siempre aprendiendo. Chatea desde Telegram, extiende con MCP, impulsado por cualquier LLM.</p>

<p>aidaemon es un agente IA autoalojado escrito en Rust que se ejecuta como un servicio en segundo plano en tu maquina. Se conecta a cualquier proveedor LLM compatible con OpenAI, se comunica via Telegram, Slack o Discord, y puede ejecutar herramientas, gestionar su propia configuracion, recordar hechos, navegar por la web y crear sub-agentes — todo de forma autonoma.</p>

<h2>Caracteristicas Principales</h2>
<ul>
  <li><strong>Arquitectura daemon</strong> — se ejecuta como servicio systemd/launchd, siempre disponible</li>
  <li><strong>Multicanal</strong> — chatea via Telegram, Slack o Discord, control de acceso multiusuario</li>
  <li><strong>Uso agentico de herramientas</strong> — razonamiento autonomo de multiples pasos con hasta 10 iteraciones</li>
  <li><strong>Integracion MCP</strong> — extiende con cualquier servidor Model Context Protocol</li>
  <li><strong>Memoria persistente</strong> — historial respaldado por SQLite con busqueda semantica via embeddings</li>
  <li><strong>Enrutamiento multi-modelo</strong> — seleccion automatica de niveles Fast/Primary/Smart</li>
  <li><strong>Disparadores de email</strong> — monitoreo IMAP IDLE para notificaciones de bandeja de entrada</li>
  <li><strong>Aprobacion de comandos</strong> — aprobacion interactiva via Telegram para comandos de terminal</li>
  <li><strong>Sistema de skills</strong> — mejora dinamica del prompt mediante archivos markdown</li>
  <li><strong>Auto-mantenimiento</strong> — lee, actualiza, valida y restaura su propia configuracion</li>
  <li><strong>Automatizacion del navegador</strong> — Chrome con sesiones de login persistentes, capturas de pantalla y llenado de formularios</li>
  <li><strong>Investigacion web</strong> — busqueda web integrada (DuckDuckGo/Brave) y obtencion de URLs</li>
  <li><strong>Creacion de sub-agentes</strong> — delegacion recursiva de agentes para tareas complejas</li>
  <li><strong>Delegacion a agentes CLI</strong> — delega a Claude, Gemini, Codex, Aider, etc.</li>
  <li><strong>Tareas programadas</strong> — tareas recurrentes estilo cron con analisis de lenguaje natural</li>
  <li><strong>Transferencia de archivos</strong> — envia y recibe archivos via Telegram con seguridad de rutas</li>
  <li><strong>Gestion de secretos</strong> — soporte para llavero del SO y variables de entorno</li>
  <li><strong>Seguimiento de costos de tokens</strong> — estadisticas de uso por modelo, presupuestos diarios, comando /cost</li>
  <li><strong>Event sourcing</strong> — registro inmutable de eventos con consolidacion diaria en hechos y procedimientos</li>
  <li><strong>Objetivos + tareas</strong> — divide trabajo grande en tareas y mantiene el progreso</li>
  <li><strong>Monitoreo de salud</strong> — sondas HTTP, TCP, de comandos y de archivos con alertas</li>
  <li><strong>Skills dinamicos</strong> — instala desde registros o promueve automaticamente procedimientos repetidos</li>
  <li><strong>Auto-actualizacion</strong> — actualizacion automatica desde GitHub releases con modos configurables</li>
  <li><strong>Integracion Discord</strong> — comandos slash, botones de aprobacion interactivos, soporte multi-bot</li>
  <li><strong>Evaluacion de riesgo de comandos</strong> — puntuacion de riesgo en 4 niveles (Safe/Medium/High/Critical) para comandos de terminal</li>
  <li><strong>Inteligencia de personas</strong> — una libreta de contactos personal que recuerda cumpleanos, preferencias y relaciones por ti</li>
</ul>

<h2>Arquitectura General</h2>
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

<h2>Enlaces Rapidos</h2>
<ul>
  <li><a href="/getting-started">Primeros Pasos</a> — compila y ejecuta aidaemon</li>
  <li><a href="/configuration">Referencia de Configuracion</a> — documentacion completa de config.toml</li>
  <li><a href="/tools">Herramientas</a> — sistema de herramientas integradas y extensibles</li>
  <li><a href="/telegram">Telegram</a> — configuracion del bot, comandos, flujo de aprobacion</li>
  <li><a href="/slack">Slack</a> — integracion con workspace via Socket Mode</li>
  <li><a href="/discord">Discord</a> — configuracion del bot, comandos slash, botones de aprobacion</li>
  <li><a href="/event-sourcing">Event Sourcing</a> — eventos inmutables y consolidacion</li>
  <li><a href="/plans">Planes (Legacy)</a> — notas del sistema de planes para instalaciones antiguas</li>
  <li><a href="/health-monitoring">Monitoreo de Salud</a> — sondas de servicios y alertas</li>
</ul>
`
  },
  {
    slug: '/getting-started',
    section: 'Getting Started',
    title: 'Descripcion General',
    description: 'Compila aidaemon desde el codigo fuente, ejecuta el asistente de configuracion y ten tu agente IA personal funcionando en minutos.',
    content: () => `
<h1>Primeros Pasos</h1>
<p class="lead">Compila aidaemon desde el codigo fuente, ejecuta el asistente de configuracion y ten tu agente IA personal funcionando en minutos.</p>

<h2>Requisitos</h2>
<ul>
  <li><strong>Toolchain de Rust</strong> — instala via <a href="https://rustup.rs" target="_blank" rel="noopener">rustup.rs</a></li>
  <li><strong>SQLite</strong> — generalmente preinstalado en macOS/Linux</li>
  <li><strong>Token de bot de Telegram</strong> — crea uno via <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a></li>
  <li><strong>Clave API de LLM</strong> — de Google AI Studio, OpenAI, Anthropic, OpenRouter, o usa Ollama local</li>
</ul>

<h2>Pasos</h2>
<ol>
  <li><a href="/getting-started/build">Compilar desde el codigo fuente</a> — clonar y compilar</li>
  <li><a href="/getting-started/wizard">Asistente de primera ejecucion</a> — configuracion interactiva</li>
  <li><a href="/configuration">Configurar</a> — personaliza config.toml segun sea necesario</li>
  <li><a href="/service-install">Instalar como servicio</a> — ejecutar al inicio con systemd/launchd</li>
</ol>
`
  },
  {
    slug: '/getting-started/build',
    section: 'Getting Started',
    title: 'Compilar desde el Codigo Fuente',
    description: 'Instala aidaemon via Homebrew, cargo install, cargo binstall, o compila desde el codigo fuente. Compatible con Linux, macOS y Windows.',
    content: () => `
<h1>Instalar</h1>
<p class="lead">Instala via script de una linea, Homebrew, Cargo, o compila desde el codigo fuente.</p>

<h2>Instalacion en Una Linea (Recomendado)</h2>
<p>Funciona en cualquier VPS Linux o maquina macOS. Descarga el binario mas reciente y verifica su checksum SHA256:</p>
${codeBlock(`curl -sSfL https://get.aidaemon.ai | bash`, 'bash')}
${callout('success', 'Todo Incluido', 'Los binarios precompilados incluyen todas las integraciones de canales (Telegram, Slack, Discord) y la herramienta de navegador. Solo activa lo que necesites en <code>config.toml</code> &mdash; no se requiere compilacion.')}

<h2>Instalar via Homebrew</h2>
<p>La forma mas facil de instalar en macOS o Linux:</p>
${codeBlock(`brew install davo20019/tap/aidaemon`, 'bash')}

<h2>Instalar via Cargo</h2>
<p>Para desarrolladores de Rust. Nota: <code>cargo install</code> compila desde el codigo fuente solo con las caracteristicas por defecto (Telegram). Para incluir todos los canales, agrega flags de caracteristicas:</p>
${codeBlock(`cargo install aidaemon --features "browser,slack,discord"
# O para binarios precompilados:
cargo binstall aidaemon`, 'bash')}

<h2>Clonar y Compilar desde el Codigo Fuente</h2>
<p>Para colaboradores y desarrolladores:</p>
${codeBlock(`git clone https://github.com/davo20019/aidaemon.git
cd aidaemon
cargo build --release --features "browser,slack,discord"`, 'bash')}

<p>El binario compilado estara en <code>./target/release/aidaemon</code>.</p>

<h2>Feature Flags (Solo al Compilar desde el Codigo Fuente)</h2>
<p>Si instalaste via el script de una linea o Homebrew, todas las caracteristicas ya estan incluidas. Estos flags solo son relevantes al compilar desde el codigo fuente:</p>

<h3>Browser</h3>
<p>Habilita la automatizacion de Chrome con sesiones de login persistentes:</p>
${codeBlock(`cargo build --release --features browser`, 'bash')}
<p>Despues de compilar, ejecuta <code>aidaemon browser login</code> para abrir Chrome e iniciar sesion en tus servicios. Consulta la documentacion de la <a href="/tools/browser">Herramienta de Navegador</a> para mas detalles.</p>
${callout('info', 'Nota', 'Requiere un navegador basado en Chromium instalado en el sistema (Chrome, Chromium, Brave o Edge).')}

<h3>Slack</h3>
<p>Habilita la integracion del canal Slack (Socket Mode):</p>
${codeBlock(`cargo build --release --features slack`, 'bash')}

<h3>Discord</h3>
<p>Habilita la integracion del bot de Discord:</p>
${codeBlock(`cargo build --release --features discord`, 'bash')}

<h3>Multiples Caracteristicas</h3>
<p>Combina caracteristicas segun sea necesario:</p>
${codeBlock(`cargo build --release --features "browser,slack,discord"`, 'bash')}

<h2>Verificar</h2>
${codeBlock(`./target/release/aidaemon --help`, 'bash')}

<p>Si no existe un <code>config.toml</code>, ejecutar el binario lanzara automaticamente el <a href="/getting-started/wizard">asistente de configuracion</a>.</p>
`
  },
  {
    slug: '/getting-started/wizard',
    section: 'Getting Started',
    title: 'Asistente de Primera Ejecucion',
    description: 'En el primer inicio, aidaemon ejecuta un asistente de configuracion interactivo para configurar tu proveedor LLM y tokens de canal.',
    content: () => `
<h1>Asistente de Primera Ejecucion</h1>
<p class="lead">En el primer inicio (sin config.toml encontrado), aidaemon ejecuta un asistente de configuracion interactivo.</p>

<h2>Seleccion de Proveedor</h2>
<p>El asistente ofrece estos presets:</p>

<table class="config-table">
<thead><tr><th>Proveedor</th><th>URL Base</th><th>Modelos por Defecto</th></tr></thead>
<tbody>
<tr><td><strong>Google AI Studio (Nativo)</strong></td><td>API Nativa</td><td>gemini-3-flash-preview / gemini-2.5-flash-lite / gemini-3-pro-preview</td></tr>
<tr><td>OpenAI</td><td><code>https://api.openai.com/v1</code></td><td>gpt-4o / gpt-4o-mini / gpt-4o</td></tr>
<tr><td>Anthropic (Nativo)</td><td>API Nativa</td><td>claude-sonnet-4 / claude-haiku-4 / claude-opus-4</td></tr>
<tr><td>Anthropic (OpenRouter)</td><td><code>https://openrouter.ai/api/v1</code></td><td>anthropic/claude-* variantes</td></tr>
<tr><td>OpenRouter</td><td><code>https://openrouter.ai/api/v1</code></td><td>Proveedores mixtos</td></tr>
<tr><td>Cloudflare AI Gateway</td><td><code>https://gateway.ai.cloudflare.com/v1/&lt;ACCOUNT_ID&gt;/&lt;GATEWAY_ID&gt;/compat</code></td><td>Depende del proveedor (por ejemplo: gpt-4o-mini / gpt-4o-mini / gpt-4o)</td></tr>
<tr><td>Ollama (local)</td><td><code>http://localhost:11434/v1</code></td><td>Auto-descubiertos desde la instancia local</td></tr>
<tr><td>Personalizado</td><td>Especificado por el usuario</td><td>Especificado por el usuario</td></tr>
</tbody>
</table>

<h2>Pasos del Asistente</h2>
<ol>
  <li><strong>Seleccionar proveedor</strong> — elige entre los presets o ingresa uno personalizado</li>
  <li><strong>Ingresar clave API</strong> — se omite para Ollama (no requiere autenticacion)</li>
  <li><strong>Token de gateway opcional</strong> — el preset de Cloudflare puede agregar <code>cf-aig-authorization</code> para modo Authenticated Gateway</li>
  <li><strong>Seleccion de modelo</strong> — autocompletado desde el preset, o auto-descubierto para Ollama</li>
  <li><strong>Configuracion de Telegram</strong> — ingresa el token del bot y tu ID numerico de usuario</li>
  <li><strong>Configuracion del navegador</strong> (si se compilo con la caracteristica <code>browser</code>) — auto-detecta perfiles de Chrome</li>
  <li><strong>Generar config.toml</strong> — se escribe en el directorio actual</li>
</ol>

${callout('info', 'Auto-Descubrimiento de Ollama', 'Al seleccionar Ollama, el asistente consulta <code>http://localhost:11434/api/tags</code> para listar todos los modelos disponibles localmente y te permite elegir.')}

<h2>Deteccion de Perfiles de Chrome</h2>
<p>El asistente auto-detecta perfiles de Chrome/Chromium para reutilizar sesiones del navegador:</p>
<ul>
  <li><strong>macOS:</strong> <code>~/Library/Application Support/Google/Chrome</code></li>
  <li><strong>Linux:</strong> <code>~/.config/google-chrome</code> o <code>~/.config/chromium</code></li>
</ul>
<p>Reutilizar un perfil hereda cookies y sesiones, para que el agente pueda acceder a sitios autenticados.</p>
`
  },
  {
    slug: '/configuration',
    section: 'Configuration',
    title: 'Referencia Completa de config.toml',
    description: 'Referencia completa de config.toml para aidaemon. Todas las secciones de configuracion, claves, tipos y valores por defecto.',
    content: () => `
<h1>Configuracion</h1>
<p class="lead">Referencia completa de <code>config.toml</code>. Todas las secciones y sus valores por defecto.</p>

<h2>[provider]</h2>
${configTable([
  ['kind', 'string', '"google_genai"', 'Tipo de proveedor: <code>google_genai</code>, <code>openai_compatible</code> o <code>anthropic</code>'],
  ['api_key', 'string', '—', 'Clave API del proveedor (requerida)'],
  ['gateway_token', 'string', 'null', 'Token opcional de Cloudflare AI Gateway usado como <code>cf-aig-authorization</code>'],
  ['base_url', 'string', '—', 'URL base de la API (requerida para <code>openai_compatible</code>, no se usa para proveedores nativos)'],
])}

<h2>[provider.models]</h2>
${configTable([
  ['primary', 'string', '(provider default)', 'Modelo por defecto para consultas generales'],
  ['fast', 'string', '(same as primary)', 'Modelo para consultas simples/rapidas'],
  ['smart', 'string', '(same as primary)', 'Modelo para tareas de razonamiento complejo'],
])}

${callout('info', 'Valores por Defecto de Modelos', 'Valores por defecto segun el proveedor: <strong>google_genai</strong> → primary=gemini-3-flash-preview, fast=gemini-2.5-flash-lite, smart=gemini-3-pro-preview. <strong>openai_compatible</strong> → todos los niveles por defecto a openai/gpt-4o. <strong>anthropic</strong> → todos los niveles por defecto a claude-sonnet-4-20250514. Cuando los tres niveles se resuelven al mismo modelo, el enrutamiento automatico se desactiva. Ver <a href="/router">Enrutamiento de Modelos</a>.')}

<h2>[telegram]</h2>
${configTable([
  ['bot_token', 'string', '—', 'Token del bot de Telegram de @BotFather (requerido)'],
  ['allowed_user_ids', 'array', '[]', 'IDs numericos de usuarios de Telegram permitidos para chatear. Vacio = sin restriccion.'],
])}

<h2>[slack]</h2>
<p>Requiere el feature flag <code>slack</code> en tiempo de compilacion. Ver <a href="/slack">Slack</a> para la guia completa de configuracion.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Habilitar el canal de Slack'],
  ['app_token', 'string', '—', 'Token de nivel de aplicacion de Slack para Socket Mode (<code>xapp-...</code>)'],
  ['bot_token', 'string', '—', 'Token de bot de Slack para Web API (<code>xoxb-...</code>)'],
  ['allowed_user_ids', 'array', '[]', 'IDs de usuarios de Slack permitidos para interactuar. Vacio = sin restriccion.'],
  ['use_threads', 'bool', 'true', 'Responder en hilos por defecto'],
])}

<h2>[discord]</h2>
<p>Requiere el feature flag <code>discord</code> en tiempo de compilacion. Ver <a href="/discord">Discord</a> para la guia completa de configuracion.</p>
${configTable([
  ['bot_token', 'string', '&mdash;', 'Token del bot de Discord del Portal de Desarrolladores'],
  ['allowed_user_ids', 'array', '[]', 'IDs de usuarios de Discord permitidos para interactuar. Vacio = sin restriccion.'],
  ['guild_id', 'integer', 'null', 'ID opcional de guild/servidor para restringir el bot a un solo servidor'],
])}

<h2>[state]</h2>
${configTable([
  ['db_path', 'string', '"aidaemon.db"', 'Ruta al archivo de base de datos SQLite'],
  ['working_memory_cap', 'integer', '50', 'Maximo de mensajes por sesion mantenidos en memoria'],
  ['consolidation_interval_hours', 'integer', '6', 'Horas entre ejecuciones de consolidacion de memoria'],
  ['max_facts', 'integer', '100', 'Numero maximo de hechos inyectados en el prompt del sistema'],
  ['daily_token_budget', 'integer', 'null', 'Maximo de tokens totales (entrada+salida) por dia. Null = ilimitado. Se reinicia a medianoche UTC.'],
  ['encryption_key', 'string', 'null', 'Clave de cifrado SQLCipher (requiere la caracteristica <code>encryption</code>). AES-256 en reposo.'],
])}

<h2>[terminal]</h2>
${configTable([
  ['allowed_prefixes', 'array', '(see below)', 'Prefijos de comandos aprobados automaticamente sin confirmacion del usuario'],
  ['initial_timeout_secs', 'integer', '30', 'Tiempo de espera en segundos para la ejecucion inicial del comando'],
  ['max_output_chars', 'integer', '4000', 'Truncar la salida del comando mas alla de esta longitud'],
  ['permission_mode', 'string', '"default"', 'Modo de permisos de riesgo: <code>default</code>, <code>cautious</code> o <code>yolo</code>. Ver <a href="/tools/command-risk">Riesgo de Comandos</a>.'],
])}

<p>Prefijos permitidos por defecto:</p>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

${callout('warn', 'Operadores de Shell', 'Los comandos que contienen <code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code> <code>$()</code> o backticks <strong>siempre</strong> requieren aprobacion, incluso si el prefijo esta en la lista blanca.')}

<h2>[daemon]</h2>
${configTable([
  ['health_port', 'integer', '8080', 'Puerto para el endpoint HTTP de verificacion de salud'],
  ['health_bind', 'string', '"127.0.0.1"', 'Direccion de enlace. Usa "0.0.0.0" para acceso externo.'],
])}

<h2>[triggers.email]</h2>
${configTable([
  ['host', 'string', '—', 'Nombre del host del servidor IMAP (ej., imap.gmail.com)'],
  ['port', 'integer', '—', 'Puerto IMAP (tipicamente 993 para TLS)'],
  ['username', 'string', '—', 'Nombre de usuario de la cuenta de email'],
  ['password', 'string', '—', 'Contrasena de la cuenta de email o contrasena especifica de aplicacion'],
  ['folder', 'string', '"INBOX"', 'Carpeta IMAP a monitorear'],
])}

<h2>[mcp.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Ruta o nombre del ejecutable para el servidor MCP'],
  ['args', 'array', '[]', 'Argumentos de linea de comandos'],
])}

<h2>[browser]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Habilitar herramienta de automatizacion del navegador'],
  ['headless', 'bool', 'true', 'Ejecutar Chrome sin ventana visible'],
  ['screenshot_width', 'integer', '1280', 'Ancho del viewport del navegador en pixeles'],
  ['screenshot_height', 'integer', '720', 'Altura del viewport del navegador en pixeles'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Directorio de perfil de Chrome para sesiones persistentes'],
  ['profile', 'string', 'Default', 'Nombre del perfil de Chrome dentro de user_data_dir'],
  ['remote_debugging_port', 'integer', 'null', 'Conectarse a Chrome existente en este puerto (avanzado)'],
])}

<h2>[skills]</h2>
${configTable([
  ['dir', 'string', '"skills"', 'Directorio que contiene archivos markdown de skills'],
  ['enabled', 'bool', 'true', 'Habilitar el sistema de skills'],
  ['registries', 'array', '[]', 'URLs de manifiestos JSON de registros de skills para explorar/instalar skills'],
])}

<h2>[subagents]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Permitir al agente crear sub-agentes'],
  ['max_depth', 'integer', '3', 'Nivel maximo de anidamiento para recursion de sub-agentes'],
  ['max_iterations', 'integer', '10', 'Maximo de pasos del bucle agentico por invocacion de sub-agente'],
  ['max_response_chars', 'integer', '8000', 'Truncar respuestas de sub-agentes mas alla de esta longitud'],
  ['timeout_secs', 'integer', '300', 'Tiempo de espera de ejecucion de sub-agentes en segundos'],
])}

<h2>[cli_agents]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Habilitar herramienta de delegacion a agentes CLI'],
  ['timeout_secs', 'integer', '600', 'Tiempo de espera global para ejecucion de agentes CLI'],
  ['max_output_chars', 'integer', '16000', 'Longitud maxima global de salida de agentes CLI'],
])}

<h2>[cli_agents.tools.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Comando a ejecutar'],
  ['args', 'array', '[]', 'Argumentos por defecto pasados al comando'],
  ['description', 'string', '—', 'Descripcion de la herramienta mostrada al LLM'],
  ['timeout_secs', 'integer', 'null', 'Sobrescribir tiempo de espera global para esta herramienta'],
  ['max_output_chars', 'integer', 'null', 'Sobrescribir salida maxima global para esta herramienta'],
])}

<h2>[search]</h2>
${configTable([
  ['backend', 'string', '"duckduckgo"', 'Backend de busqueda: <code>duckduckgo</code> (sin clave necesaria) o <code>brave</code>'],
  ['api_key', 'string', '""', 'Clave API para busqueda Brave (soporta <code>"keychain"</code>)'],
])}

<h2>[scheduler]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Habilitar el sistema de tareas programadas'],
  ['tick_interval_secs', 'integer', '30', 'Con que frecuencia el programador verifica tareas pendientes'],
])}

<h2>[[scheduler.tasks]]</h2>
<p>Tareas programadas predefinidas cargadas desde la configuracion al inicio:</p>
${configTable([
  ['name', 'string', '—', 'Etiqueta legible de la tarea'],
  ['schedule', 'string', '—', 'Lenguaje natural o expresion cron (ver <a href="/scheduler">Programador</a>)'],
  ['prompt', 'string', '—', 'Lo que el agente debe hacer cuando se dispara la tarea'],
  ['oneshot', 'bool', 'false', 'Disparar una vez y luego auto-eliminar'],
  ['trusted', 'bool', 'false', 'Ejecutar con autonomia total (sin aprobacion de terminal necesaria)'],
])}

<h2>[files]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Habilitar herramientas de transferencia de archivos (enviar/recibir)'],
  ['inbox_dir', 'string', '"~/.aidaemon/files/inbox"', 'Directorio para archivos recibidos desde Telegram'],
  ['outbox_dirs', 'array', '["~"]', 'Directorios desde los cuales el agente puede enviar archivos'],
  ['max_file_size_mb', 'integer', '10', 'Tamano maximo de archivo para transferencias en MB'],
  ['retention_hours', 'integer', '24', 'Horas de retencion de archivos recibidos antes de la limpieza'],
])}

<h2>Gestion de Secretos</h2>
<p>Los valores sensibles de configuracion soportan dos metodos de resolucion ademas de texto plano:</p>

<h3>Llavero del SO</h3>
<p>Establece cualquier campo secreto a <code>"keychain"</code> para resolverlo desde el llavero del SO (macOS Keychain, Linux secret-service):</p>
${codeBlock(`[provider]
api_key = "keychain"    # Resolved from keychain entry "api_key"

[telegram]
bot_token = "keychain"  # Resolved from keychain entry "bot_token"`, 'toml')}

<p>Almacena los valores con el comando CLI <code>keychain</code> antes de la primera ejecucion:</p>
${codeBlock(`# Store a secret (prompts interactively)
aidaemon keychain set api_key
aidaemon keychain set bot_token

# Verify a stored secret (shows masked value)
aidaemon keychain get api_key

# Remove a secret
aidaemon keychain delete api_key`, 'bash')}

${callout('tip', 'Seguridad', 'El comando <code>set</code> solicita el valor de forma interactiva con confirmacion, manteniendo los secretos fuera del historial de tu shell.')}

<h3>Variables de Entorno</h3>
<p>Usa la sintaxis <code>\${VAR_NAME}</code> en cualquier lugar de los valores de configuracion:</p>
${codeBlock(`[provider]
api_key = "\${GOOGLE_API_KEY}"

[telegram]
bot_token = "\${TELEGRAM_BOT_TOKEN}"`, 'toml')}

${callout('info', 'Campos Compatibles con Keychain', 'Campos que soportan <code>"keychain"</code>: <code>provider.api_key</code>, <code>provider.gateway_token</code>, <code>telegram.bot_token</code>, <code>slack.app_token</code>, <code>slack.bot_token</code>, <code>discord.bot_token</code>, <code>triggers.email.password</code>, <code>state.encryption_key</code>, <code>search.api_key</code> y campos de perfil <code>http_auth.*</code>.')}

<h2>[health]</h2>
<p>Sistema de monitoreo de salud. Ver <a href="/health-monitoring">Monitoreo de Salud</a>.</p>
${configTable([
  ['enabled', 'bool', 'true', 'Habilitar el sistema de monitoreo de salud'],
  ['tick_interval_secs', 'integer', '30', 'Con que frecuencia verificar sondas pendientes'],
  ['result_retention_days', 'integer', '7', 'Dias de retencion de resultados de verificaciones de salud'],
])}

<h2>[[health.probes]]</h2>
${configTable([
  ['name', 'string', '&mdash;', 'Nombre de la sonda'],
  ['probe_type', 'string', '&mdash;', 'Tipo: http, command, file o port'],
  ['target', 'string', '&mdash;', 'URL objetivo, comando, ruta de archivo o host:port'],
  ['schedule', 'string', '&mdash;', 'Expresion cron o intervalo'],
  ['consecutive_failures_alert', 'integer', '3', 'Alertar despues de N fallos consecutivos'],
  ['alert_session_ids', 'array', '[]', 'IDs de sesion a notificar en caso de alerta'],
])}

<h2>[updates]</h2>
<p>Sistema de auto-actualizacion. Ver <a href="/updates">Auto-Actualizador</a>.</p>
${configTable([
  ['mode', 'string', '"check_only"', 'Modo de actualizacion: enable, check_only o disable'],
  ['check_interval_hours', 'integer', '24', 'Horas entre verificaciones de actualizaciones'],
  ['check_at_utc_hour', 'integer', 'null', 'Hora UTC especifica (0-23) para la verificacion diaria'],
  ['confirmation_timeout_mins', 'integer', '60', 'Minutos de espera para la aprobacion del usuario'],
])}

<h2>[people]</h2>
<p>Inteligencia de Personas — una libreta de contactos personal gestionada por tu asistente. Ver <a href="/tools/people">Inteligencia de Personas</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Estado inicial para inteligencia de personas (puede activarse en tiempo de ejecucion via chat)'],
  ['auto_extract', 'bool', 'true', 'Aprender automaticamente hechos sobre personas a partir de conversaciones'],
  ['auto_extract_categories', 'string[]', '["birthday", "preference", "interest", "work", "family", "important_date"]', 'Categorias de hechos que pueden auto-extraerse'],
  ['restricted_categories', 'string[]', '["health", "finance", "political", "religious"]', 'Categorias que nunca se auto-extraen'],
  ['fact_retention_days', 'integer', '180', 'Dias antes de que los hechos auto-extraidos no confirmados sean eliminados'],
  ['reconnect_reminder_days', 'integer', '30', 'Dias de inactividad antes de sugerir reconexion'],
])}

<h2>Ejemplo de Configuracion</h2>
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
    title: 'Configuracion de Proveedores',
    description: 'Configura proveedores LLM para aidaemon: backends compatibles con OpenAI, Anthropic nativo o Google Generative AI.',
    content: () => `
<h1>Configuracion de Proveedores</h1>
<p class="lead">aidaemon soporta tres tipos de proveedores, todos configurados en la seccion <code>[provider]</code>.</p>

<h2>Tipos de Proveedores</h2>

<h3>google_genai (recomendado)</h3>
<p>API nativa de Google Generative AI. El proveedor recomendado — los modelos Gemini ofrecen excelentes capacidades de uso de herramientas, tiempos de respuesta rapidos y acceso generoso al nivel gratuito de la API via <a href="https://aistudio.google.com/" target="_blank" rel="noopener">Google AI Studio</a>.</p>
${codeBlock(`[provider]
kind = "google_genai"
api_key = "AIza..."

[provider.models]
primary = "gemini-3-flash-preview"
fast = "gemini-2.5-flash-lite"
smart = "gemini-3-pro-preview"`, 'toml')}

${callout('info', 'Configuracion Recomendada', 'Google AI Studio proporciona una clave API gratuita con limites de uso generosos. Los modelos Gemini tienen soporte nativo de llamada a herramientas, web grounding, y funcionan bien con el bucle agentico de aidaemon.')}

<h3>Gemini Web Grounding</h3>
<p>Al usar <code>google_genai</code>, aidaemon habilita automaticamente Google Search grounding. Esto permite a los modelos Gemini buscar en la web como parte de sus respuestas. Los modelos que no soportan grounding con llamada a funciones se detectan automaticamente y recurren a un comportamiento alternativo de forma transparente.</p>

<h3>openai_compatible</h3>
<p>Funciona con cualquier API que implemente el formato de chat completions de OpenAI. Esto incluye OpenAI, OpenRouter, Cloudflare AI Gateway, Ollama y muchos otros.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "sk-..."
base_url = "https://api.openai.com/v1"

[provider.models]
primary = "gpt-4o"
fast = "gpt-4o-mini"
smart = "o1-preview"`, 'toml')}

<h3>anthropic</h3>
<p>API nativa de Anthropic (formato Messages API). Usa esto para acceso directo a Anthropic sin pasar por un proxy compatible con OpenAI.</p>
${codeBlock(`[provider]
kind = "anthropic"
api_key = "sk-ant-..."

[provider.models]
primary = "claude-sonnet-4-20250514"
fast = "claude-haiku-4-20250414"
smart = "claude-opus-4-20250414"`, 'toml')}

<h2>OpenRouter</h2>
<p>OpenRouter proporciona acceso a modelos de multiples proveedores a traves de una sola clave API y el formato compatible con OpenAI.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "sk-or-..."
base_url = "https://openrouter.ai/api/v1"

[provider.models]
primary = "anthropic/claude-sonnet-4"
fast = "anthropic/claude-haiku-4"
smart = "anthropic/claude-opus-4"`, 'toml')}

<h2>Cloudflare AI Gateway</h2>
<p>Cloudflare AI Gateway se coloca delante de proveedores upstream y expone un endpoint compatible con OpenAI. Usalo si quieres logs centralizados, cache, controles o limites de tasa entre multiples proveedores.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "sk-..." # Clave del proveedor upstream
gateway_token = "cf-gw-..." # Opcional: modo Authenticated Gateway
base_url = "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/compat"

[provider.models]
primary = "gpt-4o-mini"
fast = "gpt-4o-mini"
smart = "gpt-4o"`, 'toml')}

${callout('info', 'Modos de Autenticacion en Cloudflare', 'Puedes operar solo con <code>api_key</code> (modo basico), o agregar <code>gateway_token</code> para enviar <code>cf-aig-authorization</code> en modo Authenticated Gateway.')}

<h2>Ollama (Local)</h2>
<p>Ejecuta modelos localmente con Ollama. No se requiere clave API.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "ollama"
base_url = "http://localhost:11434/v1"

[provider.models]
primary = "llama3.1"
fast = "llama3.1"
smart = "llama3.1"`, 'toml')}

${callout('info', 'Descubrimiento de Ollama', 'El asistente de configuracion auto-descubre modelos disponibles de Ollama consultando <code>http://localhost:11434/api/tags</code>.')}
`
  },
  {
    slug: '/telegram',
    section: 'Telegram',
    title: 'Configuracion del Bot',
    description: 'Configura aidaemon como un bot de Telegram. Crea un bot via BotFather, configura tokens y habilita la mensajeria.',
    content: () => `
<h1>Configuracion del Bot de Telegram</h1>
<p class="lead">Telegram es el canal principal de aidaemon, construido sobre el framework teloxide. Consulta tambien <a href="/slack">Slack</a> para integracion con workspace.</p>

<h2>Crear un Bot</h2>
<ol>
  <li>Envia un mensaje a <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a> en Telegram</li>
  <li>Envia <code>/newbot</code> y sigue las instrucciones</li>
  <li>Copia el token del bot (formato: <code>123456789:ABCdefGHIjklMNOpqrSTUvwxYZ</code>)</li>
</ol>

<h2>Obtener tu ID de Usuario</h2>
<p>Tu ID numerico de usuario de Telegram es necesario para la lista <code>allowed_user_ids</code>. Puedes encontrarlo enviando un mensaje a <a href="https://t.me/userinfobot" target="_blank" rel="noopener">@userinfobot</a>.</p>

<h2>Configuracion</h2>
${codeBlock(`[telegram]
bot_token = "123456789:ABCdefGHIjklMNOpqrSTUvwxYZ"
allowed_user_ids = [123456789]`, 'toml', 'config.toml')}

${callout('warn', 'Control de Acceso', 'Si <code>allowed_user_ids</code> esta vacio, <strong>cualquier persona</strong> que encuentre tu bot puede chatear con el. Siempre configura esto en produccion.')}

<h2>Caracteristicas</h2>
<ul>
  <li><strong>Indicador de escritura</strong> — se envia cada 4 segundos durante el procesamiento del agente</li>
  <li><strong>Renderizado Markdown</strong> — las respuestas del agente se convierten a HTML de Telegram</li>
  <li><strong>Division de mensajes largos</strong> — las respuestas de mas de 4096 caracteres se dividen en los limites de parrafos/lineas</li>
  <li><strong>Compartir capturas de pantalla</strong> — las capturas del navegador se envian como fotos con subtitulos</li>
  <li><strong>Transferencia de archivos</strong> — envia y recibe documentos, fotos, audio y video via Telegram</li>
  <li><strong>Estado de tareas en vivo</strong> — <code>/tasks</code> muestra las tareas del agente en ejecucion con el tiempo transcurrido</li>
  <li><strong>Botones de aprobacion en linea</strong> — botones Allow Once / Allow Always / Deny para aprobacion de comandos</li>
  <li><strong>Soporte multi-bot</strong> — configura multiples bots de Telegram via <code>[[telegram.bots]]</code></li>
  <li><strong>Manejo mejorado de archivos</strong> — deteccion de tipo MIME, limites de tamano y validacion de seguridad de rutas</li>
</ul>

<h2>Comportamiento de Reintentos</h2>
<p>El dispatcher de Telegram usa backoff exponencial en caso de fallos:</p>
<ul>
  <li>Backoff inicial: 5s</li>
  <li>Se duplica en cada fallo: 5s → 10s → 20s → 40s → 60s (maximo)</li>
  <li>Se reinicia a 5s si el bot funciona estable durante mas de 60 segundos</li>
</ul>
`
  },
  {
    slug: '/telegram/commands',
    section: 'Telegram',
    title: 'Comandos',
    description: 'Comandos slash integrados de Telegram para aidaemon: /model, /clear, /cost, /status, /help y mas.',
    content: () => `
<h1>Comandos de Telegram</h1>
<p class="lead">Comandos slash integrados para controlar el agente desde Telegram.</p>

<table class="config-table">
<thead><tr><th>Comando</th><th>Descripcion</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Mostrar el modelo activo actual</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Cambiar a un modelo especifico (desactiva el enrutamiento automatico)</td></tr>
<tr><td><code>/models</code></td><td>Listar todos los modelos disponibles del proveedor (modelo activo marcado)</td></tr>
<tr><td><code>/auto</code></td><td>Reactivar el enrutamiento automatico de modelos segun la complejidad de la consulta</td></tr>
<tr><td><code>/reload</code></td><td>Recargar config.toml (con auto-restauracion desde backup si esta roto)</td></tr>
<tr><td><code>/restart</code></td><td>Reinicio completo — ejecuta nuevo proceso (recoge nuevo binario, config, servidores MCP)</td></tr>
<tr><td><code>/cost</code></td><td>Mostrar estadisticas de uso de tokens (ultimas 24h, 7d, modelos principales)</td></tr>
<tr><td><code>/tasks</code></td><td>Listar tareas del agente en ejecucion y recientes para tu sesion</td></tr>
<tr><td><code>/cancel &lt;id&gt;</code></td><td>Cancelar una tarea en ejecucion por ID</td></tr>
<tr><td><code>/help</code></td><td>Mostrar lista de comandos disponibles</td></tr>
<tr><td><code>/start</code></td><td>Igual que /help</td></tr>
</tbody>
</table>

<h2>Cambio de Modelo</h2>
${codeBlock(`/model claude-3.5-sonnet
# Switches to claude-3.5-sonnet and disables auto-routing

/auto
# Re-enables automatic Fast/Primary/Smart routing`, 'text')}

${callout('info', 'Sobrescritura de Modelo', 'Cuando estableces manualmente un modelo con <code>/model</code>, el enrutamiento automatico se desactiva hasta que envies <code>/auto</code>.')}

<h2>Recarga de Configuracion</h2>
<p>El comando <code>/reload</code> recarga <code>config.toml</code> en tiempo de ejecucion. Si la configuracion es invalida, aidaemon restaura automaticamente desde un backup:</p>
<ol>
  <li><code>.toml.lastgood</code> — ultima configuracion que completo exitosamente una llamada LLM</li>
  <li><code>.toml.bak</code> → <code>.toml.bak.1</code> → <code>.toml.bak.2</code> — rotacion de 3 niveles</li>
</ol>
`
  },
  {
    slug: '/telegram/approval',
    section: 'Telegram',
    title: 'Flujo de Aprobacion',
    description: 'Aprobacion interactiva con teclado en linea para comandos de terminal restringidos en Telegram.',
    content: () => `
<h1>Flujo de Aprobacion de Comandos</h1>
<p class="lead">Aprobacion interactiva con teclado en linea para comandos de terminal restringidos.</p>

<h2>Como Funciona</h2>
<ol>
  <li>El agente solicita un comando de terminal que no esta en la lista de prefijos permitidos (o contiene operadores de shell)</li>
  <li>Se envia una solicitud de aprobacion al primer usuario en <code>allowed_user_ids</code></li>
  <li>El usuario ve un teclado en linea con tres botones:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">El comando requiere aprobacion:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow Once</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Allow Always</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Opciones de Aprobacion</h2>
<table class="config-table">
<thead><tr><th>Opcion</th><th>Comportamiento</th></tr></thead>
<tbody>
<tr><td><strong>Allow Once</strong></td><td>Ejecutar el comando solo esta vez</td></tr>
<tr><td><strong>Allow Always</strong></td><td>Ejecutar y agregar el prefijo del comando a <code>terminal.allowed_prefixes</code> en config.toml</td></tr>
<tr><td><strong>Deny</strong></td><td>Rechazar el comando — el agente recibe un mensaje de denegacion</td></tr>
</tbody>
</table>

${callout('warn', 'Operadores de Shell', 'Los comandos que contienen <code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code> <code>$()</code> o backticks <strong>siempre</strong> requieren aprobacion, incluso si el prefijo esta en la lista blanca. Esto previene ataques de inyeccion.')}

${callout('danger', 'Fuentes No Confiables', 'Las sesiones originadas desde disparadores (como email) se marcan como no confiables. Todos los comandos de terminal en sesiones no confiables <strong>siempre</strong> requieren aprobacion, independientemente de los prefijos permitidos.')}
`
  },
  {
    slug: '/slack',
    section: 'Slack',
    title: 'Configuracion del Workspace',
    description: 'Conecta aidaemon a Slack via Socket Mode. Crea una aplicacion de Slack, configura los alcances OAuth y habilita la mensajeria en tiempo real.',
    content: () => `
<h1>Integracion con Slack</h1>
<p class="lead">Conecta aidaemon a tu workspace de Slack via Socket Mode para mensajeria en tiempo real.</p>

${callout('success', 'Binarios Precompilados', 'Si instalaste via el script de una linea o Homebrew, el soporte de Slack ya esta incluido. Solo configura <code>config.toml</code> a continuacion. El feature flag solo es necesario al <a href="/getting-started/build">compilar desde el codigo fuente</a>.')}

<h2>Crear una Aplicacion de Slack</h2>
<ol>
  <li>Ve a <a href="https://api.slack.com/apps" target="_blank" rel="noopener">api.slack.com/apps</a> y haz clic en <strong>Create New App</strong></li>
  <li>Elige <strong>From scratch</strong>, dale un nombre (ej., "aidaemon") y selecciona tu workspace</li>
  <li>En <strong>Socket Mode</strong>, habilitalo y genera un <strong>App-Level Token</strong> con el scope <code>connections:write</code> &mdash; este es tu <code>app_token</code> (<code>xapp-...</code>)</li>
  <li>En <strong>OAuth &amp; Permissions</strong>, agrega estos <strong>Bot Token Scopes</strong>:
    <ul>
      <li><code>channels:read</code> &mdash; listar miembros en canales publicos</li>
      <li><code>chat:write</code> &mdash; enviar mensajes</li>
      <li><code>files:read</code> &mdash; descargar archivos enviados por usuarios</li>
      <li><code>files:write</code> &mdash; subir archivos a Slack</li>
      <li><code>groups:read</code> &mdash; listar miembros en canales privados (necesario para resolver nombres de usuarios en canales privados)</li>
      <li><code>im:read</code> &mdash; leer metadatos de mensajes directos (requerido para transferencias de archivos en mensajes directos)</li>
      <li><code>reactions:write</code> &mdash; agregar reacciones de estado (reloj de arena durante el procesamiento)</li>
      <li><code>users:read</code> &mdash; resolver informacion de usuarios</li>
    </ul>
  </li>
  <li>En <strong>Event Subscriptions</strong>, habilita los eventos y suscribete a:
    <ul>
      <li><code>message.channels</code> &mdash; mensajes en canales publicos</li>
      <li><code>message.groups</code> &mdash; mensajes en canales privados</li>
      <li><code>message.im</code> &mdash; mensajes directos</li>
    </ul>
  </li>
  <li>En <strong>App Home</strong>, desplazate hasta <strong>Show Tabs</strong> y habilita el <strong>Messages Tab</strong>. Marca <strong>"Allow users to send Slash commands and messages from the messages tab"</strong> &mdash; sin esto, los usuarios no pueden enviar mensajes directos al bot.</li>
  <li>Instala la aplicacion en tu workspace &mdash; copia el <strong>Bot User OAuth Token</strong> (<code>xoxb-...</code>)</li>
</ol>

<h2>Configuracion</h2>
${codeBlock(`[slack]
enabled = true
app_token = "xapp-1-..."
bot_token = "xoxb-..."
allowed_user_ids = ["U123456789"]
use_threads = true`, 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'Habilitar el canal de Slack'],
  ['app_token', 'string', '&mdash;', 'Token de nivel de aplicacion para Socket Mode (<code>xapp-...</code>). Soporta <code>"keychain"</code> y <code>$&#123;ENV&#125;</code>.'],
  ['bot_token', 'string', '&mdash;', 'Token OAuth de usuario del bot (<code>xoxb-...</code>). Soporta <code>"keychain"</code> y <code>$&#123;ENV&#125;</code>.'],
  ['allowed_user_ids', 'array', '[]', 'IDs de usuarios de Slack permitidos para interactuar. Vacio = sin restriccion.'],
  ['use_threads', 'bool', 'true', 'Responder en hilos por defecto. Cada hilo obtiene su propio contexto de sesion.'],
])}

<h2>Encontrar tu ID de Usuario de Slack</h2>
<p>Haz clic en tu perfil en Slack, luego haz clic en <strong>More</strong> &rarr; <strong>Copy member ID</strong>. El formato es <code>U</code> seguido de caracteres alfanumericos (ej., <code>U0123ABCDEF</code>).</p>

<h2>Caracteristicas</h2>
<ul>
  <li><strong>Socket Mode</strong> &mdash; conexion WebSocket en tiempo real, no se requiere URL publica</li>
  <li><strong>Respuestas en hilos</strong> &mdash; conversaciones en hilos configurables con contexto de sesion por hilo</li>
  <li><strong>Transferencia de archivos</strong> &mdash; envia y recibe archivos a traves de Slack</li>
  <li><strong>Aprobaciones con Block Kit</strong> &mdash; botones interactivos para aprobacion de comandos de terminal</li>
  <li><strong>Comandos slash</strong> &mdash; mismos comandos que Telegram (<code>/cost</code>, <code>/model</code>, <code>/tasks</code>, etc.)</li>
  <li><strong>Reacciones de estado</strong> &mdash; emoji de reloj de arena mientras se procesa, se elimina al completar</li>
  <li><strong>Conversion de Markdown</strong> &mdash; markdown estandar convertido automaticamente al formato mrkdwn de Slack</li>
  <li><strong>Division de mensajes</strong> &mdash; respuestas largas divididas para respetar el limite de 39KB de mensajes de Slack</li>
  <li><strong>Auto-reconexion</strong> &mdash; backoff exponencial en caso de fallo de conexion (5s &rarr; 60s maximo)</li>
</ul>

<h2>Modelo de Sesiones</h2>
<p>Las sesiones de Slack se identifican por canal e hilo:</p>
<ul>
  <li><strong>Mensaje en canal:</strong> <code>slack:{channel_id}</code></li>
  <li><strong>Mensaje en hilo:</strong> <code>slack:{channel_id}:{thread_ts}</code> (cuando <code>use_threads</code> esta habilitado)</li>
</ul>
<p>Cada sesion mantiene su propio historial de conversacion, memoria de trabajo y contexto de hechos.</p>

${callout('warn', 'Control de Acceso', 'Si <code>allowed_user_ids</code> esta vacio, <strong>cualquier persona</strong> en el workspace que pueda enviar mensajes al bot puede interactuar con el. Siempre configura esto en produccion.')}
`
  },
  {
    slug: '/slack/commands',
    section: 'Slack',
    title: 'Comandos',
    description: 'Comandos slash disponibles para aidaemon en Slack: /model, /clear, /cost, /status y mas.',
    content: () => `
<h1>Comandos de Slack</h1>
<p class="lead">Comandos slash disponibles en Slack. El mismo conjunto de comandos que en Telegram.</p>

<table class="config-table">
<thead><tr><th>Comando</th><th>Descripcion</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Mostrar el modelo activo actual</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Cambiar a un modelo especifico (desactiva el enrutamiento automatico)</td></tr>
<tr><td><code>/models</code></td><td>Listar todos los modelos disponibles del proveedor (modelo activo marcado)</td></tr>
<tr><td><code>/auto</code></td><td>Reactivar el enrutamiento automatico de modelos segun la complejidad de la consulta</td></tr>
<tr><td><code>/reload</code></td><td>Recargar config.toml (con auto-restauracion desde backup si esta roto)</td></tr>
<tr><td><code>/restart</code></td><td>Reinicio completo &mdash; ejecuta nuevo proceso (recoge nuevo binario, config, servidores MCP)</td></tr>
<tr><td><code>/cost</code></td><td>Mostrar estadisticas de uso de tokens (ultimas 24h, 7d, modelos principales)</td></tr>
<tr><td><code>/tasks</code></td><td>Listar tareas del agente en ejecucion y recientes para tu sesion</td></tr>
<tr><td><code>/cancel &lt;id&gt;</code></td><td>Cancelar una tarea en ejecucion por ID</td></tr>
<tr><td><code>/help</code></td><td>Mostrar lista de comandos disponibles</td></tr>
</tbody>
</table>

${callout('info', 'Slash vs. Texto Plano', 'En Slack, estos comandos se envian como mensajes regulares que comienzan con <code>/</code> en un DM o canal con el bot. No estan registrados como comandos slash de Slack en el manifiesto de la aplicacion.')}
`
  },
  {
    slug: '/slack/approval',
    section: 'Slack',
    title: 'Flujo de Aprobacion',
    description: 'Botones interactivos de Block Kit para aprobar comandos de terminal restringidos en Slack.',
    content: () => `
<h1>Flujo de Aprobacion en Slack</h1>
<p class="lead">Botones interactivos de Block Kit para aprobar comandos de terminal restringidos en Slack.</p>

<h2>Como Funciona</h2>
<ol>
  <li>El agente solicita un comando de terminal que no esta en la lista de prefijos permitidos (o contiene operadores de shell)</li>
  <li>Se envia un mensaje de aprobacion al canal/hilo de Slack con botones de Block Kit</li>
  <li>El usuario ve tres botones interactivos:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">El comando requiere aprobacion:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow Once</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Allow Always</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Opciones de Aprobacion</h2>
<table class="config-table">
<thead><tr><th>Opcion</th><th>Comportamiento</th></tr></thead>
<tbody>
<tr><td><strong>Allow Once</strong></td><td>Ejecutar el comando solo esta vez</td></tr>
<tr><td><strong>Allow Always</strong></td><td>Ejecutar y persistir el prefijo del comando para auto-aprobacion futura</td></tr>
<tr><td><strong>Deny</strong></td><td>Rechazar el comando &mdash; el agente recibe un mensaje de denegacion</td></tr>
</tbody>
</table>

<p>El flujo de aprobacion en Slack funciona de manera identica a Telegram. &ldquo;Allow Always&rdquo; persiste el prefijo en SQLite para que sobreviva a los reinicios del daemon.</p>

${callout('warn', 'Operadores de Shell', 'Los comandos que contienen <code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code> <code>$()</code> o backticks <strong>siempre</strong> requieren aprobacion, incluso si el prefijo esta en la lista blanca.')}
`
  },
{
    slug: '/discord',
    section: 'Discord',
    title: 'Configuracion del Bot',
    description: 'Conecta aidaemon a Discord. Crea una aplicacion de Discord, configura el bot y habilita los comandos slash.',
    content: () => `
<h1>Configuracion del Bot de Discord</h1>
<p class="lead">Conecta aidaemon a Discord a traves de la API de gateway.</p>

${callout('success', 'Binarios Precompilados', 'Si instalaste mediante el script de una linea o Homebrew, el soporte para Discord ya esta incluido. Solo configura <code>config.toml</code> a continuacion. El feature flag solo es necesario al <a href="/getting-started/build">compilar desde el codigo fuente</a>.')}

<h2>Crear una Aplicacion de Discord</h2>
<ol>
  <li>Ve al <a href="https://discord.com/developers/applications" target="_blank" rel="noopener">Portal de Desarrolladores de Discord</a></li>
  <li>Haz clic en <strong>New Application</strong> y dale un nombre (por ejemplo, &ldquo;aidaemon&rdquo;)</li>
  <li>En <strong>Bot</strong>, haz clic en <strong>Add Bot</strong></li>
  <li>Copia el <strong>Bot Token</strong> &mdash; este es tu <code>bot_token</code></li>
  <li>Habilita estos <strong>Privileged Gateway Intents</strong>:
    <ul>
      <li><code>Message Content Intent</code> &mdash; leer el texto de los mensajes</li>
      <li><code>Server Members Intent</code> &mdash; resolver informacion de usuarios</li>
    </ul>
  </li>
  <li>En <strong>OAuth2 &rarr; URL Generator</strong>, selecciona los scopes <code>bot</code> y <code>applications.commands</code>, luego los permisos: Send Messages, Read Message History, Attach Files, Use Slash Commands</li>
  <li>Usa la URL generada para invitar al bot a tu servidor</li>
</ol>

<h2>Configuracion</h2>
${codeBlock(`[discord]
bot_token = "MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.AbCdEf.xxxxx"
allowed_user_ids = [123456789012345678]
guild_id = 987654321098765432`, 'toml', 'config.toml')}

${configTable([
  ['bot_token', 'string', '&mdash;', 'Token del bot de Discord desde el Portal de Desarrolladores. Soporta <code>"keychain"</code>.'],
  ['allowed_user_ids', 'array', '[]', 'IDs de usuario de Discord (enteros snowflake) permitidos para interactuar. Vacio = sin restriccion.'],
  ['guild_id', 'integer', 'null', 'ID opcional del servidor/guild. Si se establece, el bot solo responde en ese servidor.'],
])}

<h2>Obtener tu ID de Usuario de Discord</h2>
<p>Habilita el <strong>Modo Desarrollador</strong> en la configuracion de Discord (Apariencia &rarr; Avanzado), luego haz clic derecho en tu nombre de usuario y selecciona <strong>Copiar ID de Usuario</strong>.</p>

<h2>Caracteristicas</h2>
<ul>
  <li><strong>Conexion gateway</strong> &mdash; conexion WebSocket en tiempo real via el framework serenity</li>
  <li><strong>Comandos slash</strong> &mdash; comandos de aplicacion registrados (ver <a href="/discord/commands">Comandos</a>)</li>
  <li><strong>Botones interactivos</strong> &mdash; flujo de aprobacion con botones clicables (ver <a href="/discord/approval">Flujo de Aprobacion</a>)</li>
  <li><strong>Transferencia de archivos</strong> &mdash; enviar y recibir archivos como adjuntos de Discord</li>
  <li><strong>Division de mensajes</strong> &mdash; las respuestas largas se dividen para respetar el limite de 2000 caracteres de Discord</li>
  <li><strong>Auto-reconexion</strong> &mdash; backoff exponencial en caso de fallo de conexion (5s &rarr; 60s maximo)</li>
  <li><strong>Lista de usuarios permitidos</strong> &mdash; control de acceso por token de bot</li>
  <li><strong>Soporte multi-bot</strong> &mdash; ejecuta multiples bots de Discord con configuraciones separadas</li>
</ul>

<h2>Modelo de Sesion</h2>
<p>Las sesiones de Discord se identifican por canal:</p>
<ul>
  <li><strong>Mensaje de canal:</strong> <code>discord:{channel_id}</code></li>
</ul>
<p>Cada canal mantiene su propio historial de conversacion, memoria de trabajo y contexto de hechos.</p>

${callout('warn', 'Control de Acceso', 'Si <code>allowed_user_ids</code> esta vacio, <strong>cualquier persona</strong> que pueda enviar mensajes al bot puede interactuar con el. Siempre configura esto en produccion.')}
`
  },
  {
    slug: '/discord/commands',
    section: 'Discord',
    title: 'Comandos Slash',
    description: 'Comandos de aplicacion registrados de Discord para aidaemon: /ask, /model, /clear, /status y mas.',
    content: () => `
<h1>Comandos Slash de Discord</h1>
<p class="lead">Comandos de aplicacion registrados disponibles en Discord. Accesibles via <code>/</code> en el campo de entrada de mensajes.</p>

<table class="config-table">
<thead><tr><th>Comando</th><th>Descripcion</th></tr></thead>
<tbody>
<tr><td><code>/ask &lt;message&gt;</code></td><td>Enviar un mensaje al agente</td></tr>
<tr><td><code>/model</code></td><td>Mostrar el modelo activo actual</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Cambiar a un modelo especifico (desactiva el auto-enrutamiento)</td></tr>
<tr><td><code>/models</code></td><td>Listar todos los modelos disponibles del proveedor</td></tr>
<tr><td><code>/auto</code></td><td>Reactivar el enrutamiento automatico de modelos</td></tr>
<tr><td><code>/clear</code></td><td>Limpiar el historial de conversacion de la sesion</td></tr>
<tr><td><code>/cost</code></td><td>Mostrar estadisticas de uso de tokens</td></tr>
<tr><td><code>/tasks</code></td><td>Listar tareas del agente en ejecucion y recientes</td></tr>
<tr><td><code>/cancel &lt;id&gt;</code></td><td>Cancelar una tarea en ejecucion por ID</td></tr>
<tr><td><code>/status</code></td><td>Mostrar el estado del daemon y el tiempo de actividad</td></tr>
<tr><td><code>/help</code></td><td>Mostrar la lista de comandos disponibles</td></tr>
</tbody>
</table>

<h2>Mensajes Regulares</h2>
<p>Ademas de los comandos slash, los usuarios tambien pueden interactuar mencionando al bot o enviando mensajes directos. El bot procesa estos como mensajes de conversacion regulares.</p>

${callout('info', 'Registro de Comandos', 'Los comandos slash se registran automaticamente con Discord cuando el bot se conecta. Si cambias el guild_id, los comandos se re-registraran para el nuevo alcance.')}
`
  },
  {
    slug: '/discord/approval',
    section: 'Discord',
    title: 'Flujo de Aprobacion',
    description: 'Componentes de botones interactivos para aprobar comandos de terminal restringidos en Discord.',
    content: () => `
<h1>Flujo de Aprobacion en Discord</h1>
<p class="lead">Componentes de botones interactivos para aprobar comandos de terminal restringidos en Discord.</p>

<h2>Como Funciona</h2>
<ol>
  <li>El agente solicita un comando de terminal que no esta en la lista de prefijos permitidos (o contiene operadores de shell)</li>
  <li>Se envia un mensaje de aprobacion al canal de Discord con botones interactivos</li>
  <li>El usuario ve tres botones clicables:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">El comando requiere aprobacion:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow Once</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Allow Always</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Opciones de Aprobacion</h2>
<table class="config-table">
<thead><tr><th>Opcion</th><th>Comportamiento</th></tr></thead>
<tbody>
<tr><td><strong>Allow Once</strong></td><td>Ejecutar el comando solo esta vez</td></tr>
<tr><td><strong>Allow Always</strong></td><td>Ejecutar y persistir el prefijo del comando para auto-aprobacion futura</td></tr>
<tr><td><strong>Deny</strong></td><td>Rechazar el comando &mdash; el agente recibe un mensaje de denegacion</td></tr>
</tbody>
</table>

<p>El flujo de aprobacion en Discord utiliza la API <code>ComponentInteraction</code> de serenity. &ldquo;Allow Always&rdquo; persiste el prefijo en SQLite para que sobreviva a los reinicios del daemon.</p>

${callout('info', 'Expiracion de Botones', 'Los tokens de interaccion de Discord expiran despues de 15 minutos. Si no se recibe respuesta dentro de esa ventana, la solicitud de aprobacion expira y el comando es denegado.')}
`
  },
    {
    slug: '/tools',
    section: 'Tools',
    title: 'Vision General de Herramientas',
    description: 'Vision general de todas las herramientas integradas que el agente LLM de aidaemon puede invocar: terminal, memoria, navegador, busqueda web y mas.',
    content: () => `
<h1>Herramientas</h1>
<p class="lead">aidaemon proporciona un conjunto de herramientas integradas que el LLM puede invocar de forma autonoma durante el bucle agentico.</p>

<h2>Trait Tool</h2>
<p>Todas las herramientas implementan la misma interfaz:</p>
${codeBlock(`trait Tool {
    fn name(&self) -> &str;
    fn description(&self) -> &str;
    fn schema(&self) -> Value;       // OpenAI function-calling format
    async fn call(&self, args: &str) -> Result<String>;
}`, 'rust')}

<h2>Herramientas Integradas</h2>
<table class="config-table">
<thead><tr><th>Herramienta</th><th>Descripcion</th><th>Config</th></tr></thead>
<tbody>
<tr><td><a href="/tools/terminal"><code>terminal</code></a></td><td>Ejecutar comandos de shell con flujo de aprobacion</td><td>[terminal]</td></tr>
<tr><td><a href="/tools/system-info"><code>system_info</code></a></td><td>Consultar hostname, SO, uptime, memoria</td><td>Siempre habilitada</td></tr>
<tr><td><a href="/tools/memory"><code>remember_fact</code></a></td><td>Almacenar hechos a largo plazo en SQLite</td><td>Siempre habilitada</td></tr>
<tr><td><a href="/tools/config-manager"><code>manage_config</code></a></td><td>Leer/actualizar/restaurar config.toml</td><td>Siempre habilitada</td></tr>
<tr><td><a href="/tools/web-search"><code>web_search</code></a></td><td>Buscar en la web (DuckDuckGo o Brave)</td><td>[search]</td></tr>
<tr><td><a href="/tools/web-fetch"><code>web_fetch</code></a></td><td>Obtener y extraer contenido legible de URLs</td><td>Siempre habilitada</td></tr>
<tr><td><a href="/tools/browser"><code>browser</code></a></td><td>Automatizacion de Chrome con sesiones de login persistentes</td><td>[browser] enabled=true</td></tr>
<tr><td><a href="/tools/send-file"><code>send_file</code></a></td><td>Enviar archivos al usuario via Telegram o Slack</td><td>[files]</td></tr>
<tr><td><a href="/tools/sub-agents"><code>spawn_agent</code></a></td><td>Crear sub-agentes recursivos</td><td>[subagents]</td></tr>
<tr><td><a href="/tools/cli-agents"><code>cli_agent</code></a></td><td>Delegar a herramientas CLI externas</td><td>[cli_agents]</td></tr>
<tr><td><a href="/scheduler"><code>scheduler</code></a></td><td>Crear, gestionar y ejecutar tareas programadas</td><td>[scheduler]</td></tr>
<tr><td><a href="/tools/command-risk"><code>command_risk</code></a></td><td>Evaluacion de riesgo de 4 niveles para comandos de terminal</td><td>[terminal]</td></tr>
<tr><td><a href="/health-monitoring"><code>health_probe</code></a></td><td>Gestionar y ejecutar sondas de salud</td><td>[health]</td></tr>
<tr><td><a href="/skills"><code>manage_skills</code></a></td><td>Agregar, eliminar, explorar e instalar skills dinamicos</td><td>[skills]</td></tr>
<tr><td><a href="/tools/people"><code>manage_people</code></a></td><td>Agenda de contactos personal con cumpleanos, preferencias y relaciones</td><td>Siempre registrada</td></tr>
<tr><td><a href="/mcp">Herramientas MCP</a></td><td>Descubiertas dinamicamente via servidores MCP</td><td>[mcp.*]</td></tr>
</tbody>
</table>

${callout('info', 'Presupuesto Dinamico', 'El agente tambien tiene una pseudo-herramienta integrada <code>request_more_iterations</code> que extiende el presupuesto del bucle agentico en 10 iteraciones (hasta un limite maximo) cuando el presupuesto actual es insuficiente para completar una tarea.')}

<h2>Orden de Registro de Herramientas</h2>
<p>Las herramientas se registran durante la inicializacion en este orden:</p>
<ol>
  <li>SystemInfoTool</li>
  <li>TerminalTool (con canal de aprobacion)</li>
  <li>RememberFactTool</li>
  <li>ConfigManagerTool</li>
  <li>WebFetchTool</li>
  <li>WebSearchTool</li>
  <li>BrowserTool (si esta habilitado)</li>
  <li>SendFileTool (si files.enabled)</li>
  <li>CliAgentTool (si esta habilitado)</li>
  <li>SchedulerTool (si scheduler.enabled)</li>
  <li>HealthProbeTool (si health.enabled)</li>
  <li>ManageSkillsTool</li>
  <li>ManagePeopleTool (siempre registrada, controlada internamente)</li>
  <li>Herramientas MCP (si estan configuradas)</li>
</ol>
`
  },
  {
    slug: '/tools/terminal',
    section: 'Tools',
    title: 'Herramienta Terminal',
    description: 'Ejecuta comandos de shell en el sistema host a traves de aidaemon. Los comandos se ejecutan con sh -c con evaluacion de riesgo.',
    content: () => `
<h1>Herramienta Terminal</h1>
<p class="lead">Ejecuta comandos de shell en el sistema host. Los comandos se ejecutan via <code>sh -c</code>.</p>

<h2>Parametros</h2>
${configTable([
  ['command', 'string', '—', 'El comando de shell a ejecutar'],
  ['action', 'string', '"run"', 'Accion: run, check, kill o trust_all'],
  ['pid', 'integer', '—', 'PID requerido para acciones check/kill'],
])}

<h2>Logica de Aprobacion</h2>
<p>Un comando se auto-aprueba solo si se cumplen <strong>ambas</strong> condiciones:</p>
<ol>
  <li>El comando comienza con un prefijo en <code>terminal.allowed_prefixes</code></li>
  <li>El comando <strong>no</strong> contiene ningun operador de shell</li>
</ol>

<h3>Operadores de Shell (siempre requieren aprobacion)</h3>
${codeBlock(`; | && || $() \` (backticks)`, 'text')}

<h3>Prefijos Permitidos por Defecto</h3>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

<h2>Salida</h2>
<p>Devuelve primero stdout, luego stderr (si existe). La salida se trunca a <code>terminal.max_output_chars</code> (por defecto 4000 caracteres).</p>

<h2>Comandos en Segundo Plano (Nuevo)</h2>
<p>Si un comando supera el tiempo inicial, se mueve a segundo plano y devuelve un PID.</p>
<ul>
  <li>Usa <code>action="check"</code> + <code>pid</code> para ver progreso/salida</li>
  <li>Usa <code>action="kill"</code> + <code>pid</code> para detenerlo</li>
  <li>La salida final reciente se conserva por un tiempo para revisarla despues</li>
</ul>

<h2>Bloqueos de Seguridad Duros (Nuevo)</h2>
<p>Patrones destructivos amplios ahora se bloquean antes del flujo de aprobacion, incluyendo <code>rm -rf</code> y <code>find ... -delete</code> en rutas sensibles.</p>

<h2>Configuracion</h2>
${codeBlock(`[terminal]
allowed_prefixes = ["ls", "cat", "head", "tail", "echo", "date"]
initial_timeout_secs = 30
max_output_chars = 4000
permission_mode = "default"`, 'toml', 'config.toml')}

<h2>Allow Always (Persistente)</h2>
<p>Cuando el usuario hace clic en "Allow Always" en Telegram:</p>
<ol>
  <li>Se extrae la primera palabra del comando como prefijo</li>
  <li>El prefijo se agrega a la lista de permitidos en memoria</li>
  <li>El prefijo se persiste en SQLite (tabla <code>terminal_allowed_prefixes</code>)</li>
  <li>Al reiniciar, los prefijos persistidos se fusionan con los prefijos de configuracion</li>
</ol>
<p>Esto significa que las aprobaciones de "Allow Always" sobreviven a los reinicios del daemon sin modificar config.toml.</p>

${callout('danger', 'Sesiones No Confiables', 'Las sesiones provenientes de disparadores (email, etc.) se marcan como no confiables. <strong>Todos</strong> los comandos en sesiones no confiables requieren aprobacion independientemente de la lista blanca.')}
`
  },
{
    slug: '/tools/command-risk',
    section: 'Tools',
    title: 'Evaluacion de Riesgo de Comandos',
    description: 'Cada comando de terminal se evalua con un sistema de riesgo de 4 niveles: Seguro, Medio, Alto y Critico. Mas de 60 patrones.',
    content: () => `
<h1>Evaluacion de Riesgo de Comandos</h1>
<p class="lead">Cada comando de terminal se evalua con un sistema de riesgo de 4 niveles antes de su ejecucion.</p>

<h2>Niveles de Riesgo</h2>
<table class="config-table">
<thead><tr><th>Nivel</th><th>Auto-aprobado?</th><th>Ejemplos</th></tr></thead>
<tbody>
<tr><td><strong>Safe</strong></td><td>Si (si el prefijo esta en la lista blanca)</td><td><code>ls</code>, <code>cat</code>, <code>date</code>, <code>echo</code></td></tr>
<tr><td><strong>Medium</strong></td><td>Despues de la primera aprobacion</td><td><code>curl</code>, <code>git push</code>, <code>npm install</code></td></tr>
<tr><td><strong>High</strong></td><td>Despues de la primera aprobacion</td><td><code>rm</code>, <code>mv</code>, <code>chmod</code>, <code>kill</code></td></tr>
<tr><td><strong>Critical</strong></td><td>Nunca se persiste (por defecto)</td><td><code>sudo rm -rf</code>, <code>dd</code>, <code>mkfs</code></td></tr>
</tbody>
</table>

<h2>Modos de Permisos</h2>
${configTable([
  ['default', '—', '—', 'Las aprobaciones Safe/Medium/High persisten entre reinicios. Critical es solo por sesion.'],
  ['cautious', '—', '—', 'Todas las aprobaciones son solo por sesion.'],
  ['yolo', '—', '—', 'Todas las aprobaciones persisten para siempre.'],
])}

<h2>Construcciones Peligrosas</h2>
<p>Patrones que siempre elevan el riesgo:</p>
<ul>
  <li>Sustitucion de comandos: <code>$(...)</code> y backticks</li>
  <li>Sustitucion de procesos: <code>&gt;(...)</code>, <code>&lt;(...)</code></li>
  <li>Redireccion: <code>&gt;</code>, <code>&gt;&gt;</code></li>
  <li>Multiples comandos: <code>;</code>, <code>&amp;&amp;</code>, <code>||</code></li>
  <li>Pipes hacia shells o <code>sudo</code></li>
</ul>

<h2>Deteccion de Rutas Sensibles</h2>
<p>Los comandos que hacen referencia a estos archivos se elevan automaticamente:</p>
<ul>
  <li><code>.env</code> &mdash; secretos de entorno</li>
  <li>Claves SSH: <code>id_rsa</code>, <code>id_ed25519</code></li>
  <li>Configuraciones de la nube: <code>.aws</code>, <code>.kube</code>, <code>.docker</code></li>
  <li>Autenticacion del sistema: <code>shadow</code>, <code>passwd</code>, <code>sudoers</code></li>
  <li>Credenciales: <code>master.key</code>, <code>.netrc</code>, <code>.pgpass</code></li>
</ul>

<h2>Bloqueos Duros (Nuevo)</h2>
<p>Incluso antes del flujo de aprobacion, se bloquean patrones de borrado amplios o sensibles, incluyendo objetivos riesgosos con <code>rm -rf</code> y <code>find ... -delete</code>.</p>

${callout('info', 'Configuracion', 'Establece <code>terminal.permission_mode</code> en config.toml. El valor por defecto es <code>"default"</code>.')}
`
},
    {
    slug: '/tools/system-info',
    section: 'Tools',
    title: 'Herramienta de Informacion del Sistema',
    description: 'Consulta SO, hostname, arquitectura, CPU, memoria, disco, uptime e informacion de procesos a traves de la herramienta de informacion del sistema.',
    content: () => `
<h1>Herramienta de Informacion del Sistema</h1>
<p class="lead">Consulta informacion basica del sistema. Siempre habilitada, sin parametros.</p>

<h2>Parametros</h2>
<p>Ninguno — esta herramienta no requiere argumentos.</p>

<h2>Salida</h2>
<p>Devuelve un informe de texto con:</p>
<ul>
  <li><strong>Hostname</strong></li>
  <li><strong>Sistema operativo</strong></li>
  <li><strong>Uptime</strong></li>
  <li><strong>Uso de memoria</strong></li>
</ul>

<p>La memoria se recopila de forma especifica por plataforma:</p>
<ul>
  <li><strong>Linux:</strong> obtenida de <code>free -h</code></li>
  <li><strong>macOS:</strong> obtenida de <code>vm_stat</code></li>
</ul>
`
  },
  {
    slug: '/tools/memory',
    section: 'Tools',
    title: 'Herramienta de Memoria / Hechos',
    description: 'Almacena y recupera hechos a largo plazo que persisten entre sesiones y se inyectan en el prompt del sistema.',
    content: () => `
<h1>Herramienta de Memoria / Hechos</h1>
<p class="lead">Almacena y recupera hechos a largo plazo que persisten entre sesiones y se inyectan en el prompt del sistema.</p>

<h2>Nombre de la Herramienta</h2>
<p><code>remember_fact</code></p>

<h2>Parametros</h2>
${configTable([
  ['category', 'string', '—', 'Categoria de agrupacion (por ejemplo, "user", "preference", "project")'],
  ['key', 'string', '—', 'Identificador unico dentro de la categoria'],
  ['value', 'string', '—', 'El contenido del hecho a almacenar'],
])}

<h2>Almacenamiento</h2>
<p>Los hechos se insertan o actualizan (upsert) en la tabla <code>facts</code> en SQLite. El par <code>(category, key)</code> es unico — almacenar un hecho con la misma categoria y clave sobrescribe el valor anterior.</p>

<h2>Inyeccion en el Prompt del Sistema</h2>
<p>Hasta <code>state.max_facts</code> (por defecto 100) hechos se inyectan en el prompt del sistema bajo una seccion <code>## Known Facts</code>, agrupados por categoria y ordenados por actualizacion mas reciente. Esto significa que el agente siempre tiene acceso a su conocimiento almacenado.</p>

${codeBlock(`## Known Facts

### user
- name: David
- timezone: US/Pacific

### project
- language: Rust
- repo: /home/david/projects/myapp`, 'text', 'system prompt injection')}

<h2>Esquema de la Tabla de Hechos</h2>
${configTable([
  ['id', 'integer', 'auto', 'Clave primaria auto-incremental'],
  ['category', 'string', '—', 'Categoria de agrupacion'],
  ['key', 'string', '—', 'Clave del hecho (unica por categoria)'],
  ['value', 'string', '—', 'Contenido del hecho'],
  ['source', 'string', '""', 'Quien lo almaceno: "agent" o "user"'],
  ['created_at', 'timestamp', 'now', 'Cuando se creo el hecho'],
  ['updated_at', 'timestamp', 'now', 'Cuando se actualizo por ultima vez el hecho'],
])}
`
  },
  {
    slug: '/tools/config-manager',
    section: 'Tools',
    title: 'Herramienta de Gestion de Configuracion',
    description: 'El agente aidaemon puede leer, actualizar, validar y restaurar su propio archivo de configuracion de forma autonoma.',
    content: () => `
<h1>Herramienta de Gestion de Configuracion</h1>
<p class="lead">El agente puede leer, actualizar, validar y restaurar su propio archivo de configuracion.</p>

<h2>Nombre de la Herramienta</h2>
<p><code>manage_config</code></p>

<h2>Acciones</h2>

<h3>read</h3>
<p>Devuelve el contenido completo de config.toml con los campos sensibles redactados:</p>
${codeBlock(`api_key = "***REDACTED***"
bot_token = "***REDACTED***"
password = "***REDACTED***"`, 'toml')}

<h3>get</h3>
<p>Leer una clave TOML especifica por ruta:</p>
${codeBlock(`action: "get"
key: "provider.models.primary"
# Returns: "gemini-3-flash-preview"`, 'text')}

<h3>set</h3>
<p>Actualizar una clave especifica con un nuevo valor (formato literal TOML):</p>
${codeBlock(`action: "set"
key: "state.working_memory_cap"
value: "100"`, 'text')}

<p>Antes de escribir:</p>
<ol>
  <li>Crea un respaldo (rotacion de anillo de 3 niveles: <code>.bak</code> → <code>.bak.1</code> → <code>.bak.2</code>)</li>
  <li>Valida la nueva configuracion (sintaxis TOML + deserializacion completa)</li>
  <li>Establece permisos de archivo a 0600 (solo propietario) en Unix</li>
</ol>

<h3>restore</h3>
<p>Revertir al archivo de respaldo mas reciente.</p>

${callout('info', 'Ultima Configuracion Conocida', 'Despues de cada llamada exitosa al LLM, la configuracion actual se marca como <code>.toml.lastgood</code>. Este es el primer archivo que se intenta durante la recuperacion.')}

<h2>Prioridad de Respaldo</h2>
<ol>
  <li><code>config.toml.lastgood</code> — configuracion comprobada como funcional</li>
  <li><code>config.toml.bak</code> — respaldo mas reciente</li>
  <li><code>config.toml.bak.1</code></li>
  <li><code>config.toml.bak.2</code></li>
</ol>
`
  },
  {
    slug: '/tools/browser',
    section: 'Tools',
    title: 'Herramienta de Navegador',
    description: 'Automatizacion de Chrome con sesiones de login persistentes para navegacion web, llenado de formularios y capturas de pantalla.',
    content: () => `
<h1>Herramienta de Navegador</h1>
<p class="lead">Automatizacion de Chrome con sesiones de login persistentes. Inicia sesion una vez, y el agente puede navegar sitios autenticados en tu nombre.</p>

${callout('success', 'Binarios Precompilados', 'Si instalaste mediante el script de una linea o Homebrew, la herramienta de navegador ya esta incluida. Solo habilitala en <code>config.toml</code> a continuacion. El feature flag solo es necesario al <a href="/getting-started/build">compilar desde el codigo fuente</a>.')}

<h2>Inicio Rapido</h2>
<p>Dos pasos para que el agente navegue con tus sesiones de login:</p>

<h3>1. Inicia sesion en tus servicios</h3>
${codeBlock(`aidaemon browser login`, 'bash')}
<p>Chrome se abre con un perfil dedicado. Inicia sesion en los servicios a los que quieres que el agente acceda (Gmail, GitHub, AWS Console, Jira, etc.), luego cierra Chrome. Tus sesiones se guardan en <code>~/.aidaemon/chrome-profile/</code> y persisten entre reinicios.</p>

<h3>2. Habilita la herramienta de navegador</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}

<p>Eso es todo. El agente ahora puede navegar sitios autenticados usando tus sesiones guardadas.</p>

${callout('info', 'Pruebalo', 'Envia al agente un mensaje como <em>"Ve a https://mail.google.com y toma una captura de pantalla"</em> — deberia mostrar tu bandeja de entrada, ya con sesion iniciada.')}

<h2>Configuracion</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Habilitar la herramienta de navegador'],
  ['headless', 'bool', 'true', 'Ejecutar Chrome sin ventana visible'],
  ['screenshot_width', 'int', '1280', 'Ancho del viewport del navegador en pixeles'],
  ['screenshot_height', 'int', '720', 'Alto del viewport del navegador en pixeles'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Directorio del perfil de Chrome para sesiones persistentes'],
  ['profile', 'string', 'Default', 'Nombre del perfil de Chrome dentro de user_data_dir'],
  ['remote_debugging_port', 'int', 'null', 'Conectar a una instancia de Chrome existente en este puerto (avanzado)'],
])}

<h3>Configuracion minima</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}
<p>Todo lo demas tiene valores por defecto razonables. Las sesiones se guardan automaticamente en <code>~/.aidaemon/chrome-profile/</code>.</p>

<h2>Acciones</h2>

<table class="config-table">
<thead><tr><th>Accion</th><th>Parametros</th><th>Descripcion</th></tr></thead>
<tbody>
<tr><td><code>navigate</code></td><td><code>url</code></td><td>Navegar a una URL, esperar 2s para la carga de la pagina</td></tr>
<tr><td><code>screenshot</code></td><td><code>selector?</code></td><td>Captura PNG de la pagina completa o un elemento especifico</td></tr>
<tr><td><code>click</code></td><td><code>selector</code></td><td>Hacer clic en un elemento por selector CSS</td></tr>
<tr><td><code>fill</code></td><td><code>selector, value</code></td><td>Escribir texto en un campo de formulario</td></tr>
<tr><td><code>get_text</code></td><td><code>selector?</code></td><td>Extraer contenido de texto de un elemento o de la pagina completa</td></tr>
<tr><td><code>execute_js</code></td><td><code>script</code></td><td>Ejecutar JavaScript arbitrario y devolver el resultado</td></tr>
<tr><td><code>wait</code></td><td><code>selector, timeout_secs?</code></td><td>Esperar a que aparezca un elemento (timeout por defecto 10s)</td></tr>
<tr><td><code>close</code></td><td>—</td><td>Cerrar la sesion del navegador</td></tr>
</tbody>
</table>

<h2>Persistencia de Sesiones</h2>
<p>La herramienta de navegador utiliza un perfil de Chrome dedicado en <code>~/.aidaemon/chrome-profile/</code> que almacena cookies, almacenamiento local y sesiones de login. Esto significa:</p>
<ul>
  <li>Inicia sesion una vez via <code>aidaemon browser login</code>, las sesiones persisten indefinidamente</li>
  <li>El agente lanza Chrome en modo headless con este perfil — ya autenticado</li>
  <li>Las sesiones sobreviven a reinicios de aidaemon y del sistema</li>
  <li>Ejecuta <code>aidaemon browser login</code> en cualquier momento para agregar nuevos servicios o renovar sesiones expiradas</li>
</ul>

${callout('warn', 'Aislado de tu Chrome Personal', 'El agente usa su propio perfil de Chrome, completamente separado de tu navegador personal. Tus marcadores, extensiones y sesiones personales nunca se tocan.')}

<h2>Modos de Despliegue</h2>

<h3>Instancia aislada (recomendado)</h3>
<p>Cuando ejecutas aidaemon en un servidor dedicado o VM, ningun otro Chrome esta ejecutandose. El agente lanza y controla Chrome directamente.</p>
${codeBlock(`# SSH into your instance
ssh user@my-server

# One-time: log into services
aidaemon browser login

# Config
# [browser]
# enabled = true

# Done — agent handles Chrome automatically from here`, 'bash')}
<p>Para servidores headless, usa SSH con reenvio X (<code>ssh -X</code>) o VNC para el login inicial.</p>

<h3>Computadora personal</h3>
<p>Cuando ejecutas aidaemon junto a tu Chrome personal, el agente lanza una instancia de Chrome separada con su propio perfil. Ambos se ejecutan en paralelo sin conflictos.</p>
${codeBlock(`# Same setup — separate Chrome instance, no conflict
aidaemon browser login

# Your personal Chrome (47 tabs, extensions, bookmarks) → untouched
# Aidaemon's Chrome (~/.aidaemon/chrome-profile/) → isolated`, 'bash')}

<h3>Avanzado: Conectar a Chrome existente</h3>
<p>Para usuarios avanzados que quieren conectarse a una instancia de Chrome que ya esta ejecutandose con un puerto de depuracion remota:</p>
${codeBlock(`[browser]
enabled = true
remote_debugging_port = 9222`, 'toml', 'config.toml')}
<p>Inicia Chrome con <code>--remote-debugging-port=9222</code> y el agente se conecta directamente. Esto comparte las sesiones de la instancia de Chrome pero requiere que Chrome se inicie con la bandera de depuracion.</p>

<h2>Capturas de Pantalla</h2>
<p>Las capturas de pantalla se toman como PNG y se envian al usuario a traves del canal activo (foto en Telegram, carga de archivo en Slack, etc.) con descripciones que indican la URL de la pagina.</p>

<h2>Casos de Uso</h2>
<ul>
  <li><strong>Monitoreo</strong> — Revisar dashboards (Grafana, Vercel, AWS Console), capturar estado de despliegues</li>
  <li><strong>Extraccion de datos</strong> — Extraer datos de paginas renderizadas con JS, obtener reportes de paneles de administracion</li>
  <li><strong>Automatizacion de flujos de trabajo</strong> — Llenar formularios, navegar flujos de multiples pasos en herramientas internas</li>
  <li><strong>Pruebas</strong> — Navegar tu aplicacion desplegada, verificar la UI, comprobar layouts responsivos</li>
  <li><strong>Navegacion autenticada</strong> — Interactuar con cualquier servicio en el que hayas iniciado sesion, sin necesidad de API keys</li>
</ul>

<h2>Compilacion desde el Codigo Fuente</h2>
<p>La herramienta de navegador requiere el feature flag <code>browser</code>:</p>
${codeBlock(`cargo build --release --features browser`, 'bash')}
<p>Requiere un navegador basado en Chromium instalado (Chrome, Chromium, Brave o Edge).</p>
`
  },
  {
    slug: '/tools/sub-agents',
    section: 'Tools',
    title: 'Generacion de Sub-Agentes',
    description: 'Genera agentes hijos para tareas complejas con delegacion recursiva. Cada sub-agente obtiene su propio conjunto de herramientas.',
    content: () => `
<h1>Generacion de Sub-Agentes</h1>
<p class="lead">El agente puede generar agentes hijos para tareas complejas, habilitando la delegacion recursiva.</p>

<h2>Nombre de la Herramienta</h2>
<p><code>spawn_agent</code></p>

<h2>Parametros</h2>
${configTable([
  ['mission', 'string', '—', 'Rol/contexto de alto nivel para el sub-agente'],
  ['task', 'string', '—', 'Pregunta concreta o trabajo a realizar'],
])}

<h2>Comportamiento</h2>
<ul>
  <li>El agente hijo se ejecuta en <code>parent_depth + 1</code></li>
  <li>Hereda el proveedor, almacen de estado, modelo y herramientas no-spawn del padre</li>
  <li>Recibe un system prompt enfocado: instrucciones base + contexto de mision</li>
  <li>Ejecuta un bucle agentico completo en una sesion aislada (<code>sub-{depth}-{uuid}</code>)</li>
  <li>Retorna la respuesta de texto final al padre (truncada a <code>max_response_chars</code>)</li>
  <li>Si <code>child_depth &lt; max_depth</code>, el hijo tambien obtiene la herramienta <code>spawn_agent</code></li>
</ul>

<h2>Configuracion</h2>
${codeBlock(`[subagents]
enabled = true
max_depth = 3
max_iterations = 10
max_response_chars = 8000
timeout_secs = 300`, 'toml', 'config.toml')}

${callout('info', 'Limite de Recursion', 'Los sub-agentes pueden generar sus propios sub-agentes hasta <code>max_depth</code> niveles de profundidad. En la profundidad maxima, la herramienta spawn_agent no se proporciona.')}

${callout('warn', 'Timeout', 'Cada invocacion de sub-agente tiene un timeout estricto (<code>timeout_secs</code>). Si un sub-agente tarda demasiado, el padre recibe un error de timeout.')}
`
  },
  {
    slug: '/tools/cli-agents',
    section: 'Tools',
    title: 'Delegacion a Agentes CLI',
    description: 'Delega tareas a Claude Code, Gemini CLI, Codex, Copilot o Aider desde dentro del bucle de agente de aidaemon.',
    content: () => `
<h1>Delegacion a Agentes CLI</h1>
<p class="lead">Delega tareas a herramientas CLI externas de codificacion como Claude Code, Gemini CLI, Codex, Copilot o Aider.</p>

<h2>Nombre de la Herramienta</h2>
<p><code>cli_agent</code></p>

<h2>Parametros</h2>
${configTable([
  ['tool', 'string', '—', 'Nombre de la herramienta CLI a invocar (ej., "claude", "gemini")'],
  ['prompt', 'string', '—', 'El prompt/tarea a enviar a la herramienta CLI'],
  ['working_dir', 'string', 'null', 'Directorio de trabajo para la ejecucion del comando'],
])}

<h2>Herramientas por Defecto</h2>
<p>Cuando <code>cli_agents.enabled = true</code> sin configuraciones de herramientas explicitas, estos valores por defecto se registran (si el comando existe en el sistema):</p>

<table class="config-table">
<thead><tr><th>Nombre</th><th>Comando</th><th>Args por Defecto</th></tr></thead>
<tbody>
<tr><td>claude</td><td><code>claude</code></td><td><code>-p --output-format json</code></td></tr>
<tr><td>gemini</td><td><code>gemini</code></td><td><code>-p --output-format json --sandbox=false</code></td></tr>
<tr><td>codex</td><td><code>codex</code></td><td><code>exec --json --full-auto</code></td></tr>
<tr><td>copilot</td><td><code>copilot</code></td><td><code>-p</code></td></tr>
<tr><td>aider</td><td><code>aider</code></td><td><code>--yes --message</code></td></tr>
</tbody>
</table>

${callout('info', 'Descubrimiento', 'Solo se registran las herramientas cuyos comandos se encuentran via <code>which</code>. Las herramientas faltantes se omiten silenciosamente.')}

<h2>Configuracion Personalizada</h2>
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

<h2>Extraccion de Salida</h2>
<p>La herramienta intenta extraer la salida estructurada:</p>
<ul>
  <li><strong>JSON:</strong> busca campos <code>result</code>, <code>output</code>, <code>content</code> o <code>message</code></li>
  <li><strong>JSONL:</strong> toma la ultima linea que contiene contenido</li>
  <li><strong>Fallback:</strong> retorna la salida sin procesar, truncada a <code>max_output_chars</code></li>
</ul>
`
  },
  {
    slug: '/tools/web-search',
    section: 'Tools',
    title: 'Herramienta de Busqueda Web',
    description: 'Busca en la web via DuckDuckGo o Brave y retorna titulos, URLs y fragmentos al agente LLM.',
    content: () => `
<h1>Herramienta de Busqueda Web</h1>
<p class="lead">Busca en la web y retorna titulos, URLs y fragmentos. Soporta DuckDuckGo (por defecto, sin clave necesaria) y Brave como backends.</p>

<h2>Nombre de la Herramienta</h2>
<p><code>web_search</code></p>

<h2>Parametros</h2>
${configTable([
  ['query', 'string', '—', 'La consulta de busqueda (requerido)'],
  ['max_results', 'integer', '5', 'Numero maximo de resultados a retornar'],
])}

<h2>Backends</h2>
<table class="config-table">
<thead><tr><th>Backend</th><th>API Key</th><th>Como Funciona</th></tr></thead>
<tbody>
<tr><td><strong>DuckDuckGo</strong> (por defecto)</td><td>No requerida</td><td>Obtiene <code>https://lite.duckduckgo.com/lite/</code> y analiza los resultados HTML</td></tr>
<tr><td><strong>Brave</strong></td><td>Requerida</td><td>Llama a la API JSON <code>https://api.search.brave.com/res/v1/web/search</code></td></tr>
</tbody>
</table>

<h2>Configuracion</h2>
${codeBlock(`[search]
backend = "duckduckgo"  # or "brave"
api_key = ""            # Required only for Brave`, 'toml', 'config.toml')}

<h2>Formato de Salida</h2>
<p>Retorna resultados numerados en markdown:</p>
${codeBlock(`1. [Page Title](https://example.com/page)
   A brief snippet describing the page content...

2. [Another Result](https://example.com/other)
   Another snippet...`, 'text')}
`
  },
  {
    slug: '/tools/web-fetch',
    section: 'Tools',
    title: 'Herramienta Web Fetch',
    description: 'Obtiene cualquier URL y extrae contenido legible. Soporta conversion de HTML a texto con limites configurables.',
    content: () => `
<h1>Herramienta Web Fetch</h1>
<p class="lead">Obtiene una URL y extrae su contenido legible. Siempre habilitada, no requiere configuracion.</p>

<h2>Nombre de la Herramienta</h2>
<p><code>web_fetch</code></p>

<h2>Parametros</h2>
${configTable([
  ['url', 'string', '—', 'La URL a obtener (requerido)'],
  ['max_chars', 'integer', '20000', 'Maximo de caracteres a retornar'],
])}

<h2>Comportamiento</h2>
<ol>
  <li>Obtiene la URL con encabezados similares a un navegador (user-agent de Firefox, encabezados Accept estandar)</li>
  <li>Intenta la extraccion de legibilidad para obtener texto limpio del articulo</li>
  <li>Como alternativa, realiza conversion completa de HTML a markdown</li>
  <li>Trunca a <code>max_chars</code> en un limite seguro de UTF-8</li>
</ol>

${callout('info', 'Complementa la Herramienta de Navegador', 'Usa <code>web_fetch</code> para extraccion rapida de contenido sin iniciar Chrome. Usa la <a href="/tools/browser">Herramienta de Navegador</a> para paginas interactivas que requieren JavaScript, llenado de formularios o capturas de pantalla.')}
`
  },
  {
    slug: '/tools/send-file',
    section: 'Tools',
    title: 'Transferencia de Archivos',
    description: 'Envia y recibe archivos via Telegram o Slack. Validacion de rutas y bloqueo de archivos sensibles integrado.',
    content: () => `
<h1>Transferencia de Archivos</h1>
<p class="lead">Envia archivos al usuario via Telegram o Slack, y recibe archivos del usuario. Valida rutas y bloquea archivos sensibles.</p>

<h2>Nombre de la Herramienta</h2>
<p><code>send_file</code> (saliente)</p>

<h2>Parametros</h2>
${configTable([
  ['file_path', 'string', '—', 'Ruta absoluta al archivo a enviar (requerido)'],
  ['caption', 'string', 'null', 'Descripcion opcional para el archivo'],
])}

<h2>Configuracion</h2>
${codeBlock(`[files]
enabled = true
inbox_dir = "~/.aidaemon/files/inbox"
outbox_dirs = ["~"]
max_file_size_mb = 10
retention_hours = 24`, 'toml', 'config.toml')}

<h2>Seguridad</h2>
<p>La herramienta aplica restricciones de rutas para prevenir la filtracion accidental de secretos:</p>
<ul>
  <li><strong>Rutas permitidas:</strong> Solo archivos dentro de <code>outbox_dirs</code> o <code>inbox_dir</code></li>
  <li><strong>Resolucion de symlinks:</strong> Canonicaliza las rutas para prevenir el recorrido de directorios</li>
  <li><strong>Patrones bloqueados:</strong> <code>.ssh</code>, <code>.gnupg</code>, <code>.env</code>, <code>credentials</code>, <code>.key</code>, <code>.pem</code>, <code>.aws/credentials</code>, <code>.netrc</code>, <code>.docker/config.json</code>, <code>config.toml</code></li>
</ul>

<h2>Archivos Entrantes</h2>
<p>Los usuarios pueden enviar archivos al bot en Telegram o Slack. aidaemon los descarga en <code>inbox_dir</code> y los pone a disposicion del agente. Soporta documentos, fotos, audio, video y mensajes de voz, hasta <code>max_file_size_mb</code>.</p>

${callout('warn', 'Directorios de Salida', 'La lista <code>outbox_dirs</code> controla desde que directorios el agente puede enviar archivos. Mantenla lo mas restringida posible en produccion.')}
`
  },
  {
    slug: '/tools/people',
    section: 'Tools',
    title: 'Inteligencia de Personas',
    description: 'Una libreta de contactos personal gestionada por tu asistente IA. Recuerda cumpleanos, preferencias y relaciones — todo almacenado localmente en tu maquina.',
    content: () => `
<h1>Inteligencia de Personas</h1>
<p class="lead">Piensa en ello como una libreta de contactos, pero con un asistente personal que recuerda los detalles por ti. Cumpleanos, preferencias, estilos de comunicacion, como conoces a alguien &mdash; aidaemon lo mantiene todo organizado y te recuerda cuando importa. Todo vive en tu computadora o servidor, nunca se envia a terceros.</p>

${callout('info', 'Activacion en Tiempo de Ejecucion', 'La Inteligencia de Personas se puede habilitar o deshabilitar en cualquier momento via chat. Solo di <strong>"enable people intelligence"</strong> o usa la herramienta <code>manage_people</code> con la accion <code>enable</code>/<code>disable</code>. No se requiere reinicio.')}

<h2>Como Funciona</h2>
<ol>
  <li><strong>Agregar contactos</strong> &mdash; agrega personas manualmente o deja que aidaemon aprenda sobre ellas a partir de conversaciones</li>
  <li><strong>Recordar detalles</strong> &mdash; cumpleanos, preferencias, intereses, informacion laboral y mas</li>
  <li><strong>Vincular identidades</strong> &mdash; conecta una persona con su identidad de Telegram, Slack o Discord</li>
  <li><strong>Recordatorios proactivos</strong> &mdash; aidaemon menciona naturalmente los cumpleanos proximos y sugiere reconexiones</li>
  <li><strong>Adaptacion de contexto</strong> &mdash; cuando una persona conocida envia un mensaje, aidaemon adapta su estilo de comunicacion</li>
</ol>

<h2>Nombre de la Herramienta</h2>
<p><code>manage_people</code></p>

<h2>Acciones</h2>
<table class="config-table">
<thead><tr><th>Accion</th><th>Descripcion</th><th>Params Requeridos</th></tr></thead>
<tbody>
<tr><td><code>enable</code></td><td>Activar la Inteligencia de Personas (persiste entre reinicios)</td><td>&mdash;</td></tr>
<tr><td><code>disable</code></td><td>Desactivar la Inteligencia de Personas (los datos se preservan)</td><td>&mdash;</td></tr>
<tr><td><code>status</code></td><td>Mostrar estado habilitado/deshabilitado y cantidad de contactos</td><td>&mdash;</td></tr>
<tr><td><code>add</code></td><td>Agregar una nueva persona</td><td>name</td></tr>
<tr><td><code>list</code></td><td>Listar todos los contactos (filtrar por relacion)</td><td>&mdash;</td></tr>
<tr><td><code>view</code></td><td>Ver detalles de la persona y todos los hechos</td><td>name o id</td></tr>
<tr><td><code>update</code></td><td>Actualizar campos de la persona (relacion, notas, estilo)</td><td>name o id</td></tr>
<tr><td><code>remove</code></td><td>Eliminar una persona y todos sus hechos</td><td>name o id</td></tr>
<tr><td><code>add_fact</code></td><td>Almacenar un hecho sobre alguien (cumpleanos, preferencia, etc.)</td><td>person_name, category, key, value</td></tr>
<tr><td><code>remove_fact</code></td><td>Eliminar un hecho especifico por ID</td><td>fact_id</td></tr>
<tr><td><code>link</code></td><td>Vincular una identidad de plataforma a una persona</td><td>person_name, platform_id</td></tr>
<tr><td><code>export</code></td><td>Exportar todos los datos de una persona como JSON</td><td>person_name</td></tr>
<tr><td><code>purge</code></td><td>Eliminacion en cascada completa (persona + hechos + vinculos)</td><td>person_name</td></tr>
<tr><td><code>audit</code></td><td>Revisar hechos auto-extraidos (no verificados)</td><td>&mdash; (o person_name)</td></tr>
<tr><td><code>confirm</code></td><td>Verificar un hecho auto-extraido (establecer confianza al 100%)</td><td>fact_id</td></tr>
</tbody>
</table>

<h2>Parametros</h2>
${configTable([
  ['action', 'string', '&mdash;', 'Accion a realizar (requerido)'],
  ['name', 'string', 'null', "Nombre de la persona (para add, view, update, remove)"],
  ['id', 'integer', 'null', "ID de base de datos de la persona (para update, remove)"],
  ['relationship', 'string', 'null', 'Tipo de relacion: spouse, family, friend, coworker, acquaintance'],
  ['notes', 'string', 'null', 'Notas de texto libre sobre la persona'],
  ['communication_style', 'string', 'null', 'Como comunicarse: casual, formal, warm, etc.'],
  ['language', 'string', 'null', 'Idioma preferido para la interaccion'],
  ['person_name', 'string', 'null', "Nombre de la persona (para add_fact, link, export, purge, audit)"],
  ['category', 'string', 'null', 'Categoria del hecho: birthday, preference, interest, work, family, important_date, personality, gift_idea'],
  ['key', 'string', 'null', "Clave del hecho (ej., 'birthday', 'favorite_food')"],
  ['value', 'string', 'null', 'Valor del hecho'],
  ['platform_id', 'string', 'null', "ID calificado de plataforma (ej., 'slack:U123', 'telegram:456')"],
  ['display_name', 'string', 'null', 'Nombre de visualizacion para la identidad de plataforma'],
  ['fact_id', 'integer', 'null', 'ID del hecho (para remove_fact, confirm)'],
])}

<h2>Habilitacion</h2>
<p>Hay dos formas de habilitar la Inteligencia de Personas:</p>

<h3>Opcion 1: Via chat (recomendado)</h3>
<p>Simplemente dile a tu bot que la habilite. La configuracion se almacena en la base de datos y persiste entre reinicios.</p>
${codeBlock('You: "Enable people intelligence"\naidaemon: "People Intelligence enabled. I\'ll now remember contacts..."', 'text', 'chat')}

<h3>Opcion 2: Via config.toml</h3>
<p>Establece el estado inicial en tu archivo de configuracion. Este valor se usa para inicializar la base de datos en la primera ejecucion; despues de eso, la configuracion en tiempo de ejecucion tiene prioridad.</p>
${codeBlock('[people]\nenabled = true', 'toml', 'config.toml')}

<h2>Aprendizaje Organico</h2>
<p>Cuando <code>auto_extract</code> esta habilitado (por defecto), aidaemon aprende automaticamente sobre las personas a partir de conversaciones durante su ciclo regular de consolidacion de memoria:</p>
<ul>
  <li>Detecta menciones de personas, sus preferencias, cumpleanos y relaciones</li>
  <li>Crea registros de personas y almacena hechos con 70% de confianza (auto-extraidos)</li>
  <li>El propietario puede revisar y confirmar hechos via las acciones <code>audit</code> y <code>confirm</code></li>
</ul>

${callout('warn', 'Categorias Restringidas', 'La informacion de salud, detalles financieros, opiniones politicas y creencias religiosas <strong>nunca</strong> se auto-extraen, incluso si se mencionan en la conversacion. Esto se aplica mediante <code>restricted_categories</code>.')}

<h2>Tareas en Segundo Plano</h2>
<p>Cuando esta habilitado, aidaemon ejecuta verificaciones diarias en segundo plano:</p>
<ul>
  <li><strong>Limpieza de hechos obsoletos</strong> &mdash; elimina hechos auto-extraidos no confirmados con mas de <code>fact_retention_days</code> dias (por defecto 180)</li>
  <li><strong>Recordatorios de fechas proximas</strong> &mdash; detecta cumpleanos y fechas importantes dentro de 14 dias</li>
  <li><strong>Sugerencias de reconexion</strong> &mdash; marca personas que no han sido contactadas en <code>reconnect_reminder_days</code> dias (por defecto 30)</li>
</ul>

<h2>Modelo de Privacidad</h2>
<table class="config-table">
<thead><tr><th>Contexto</th><th>Comportamiento</th></tr></thead>
<tbody>
<tr><td>DMs del propietario</td><td>Grafo completo de personas inyectado en el system prompt (nombres, hechos, relaciones)</td></tr>
<tr><td>No-propietario (vinculado)</td><td>Solo adaptacion de estilo de comunicacion (sin inyeccion de hechos a otros usuarios)</td></tr>
<tr><td>Canales publicos</td><td>Sin inyeccion de hechos personales</td></tr>
</tbody>
</table>

<h2>Configuracion</h2>
${codeBlock('[people]\nenabled = true\nauto_extract = true\nauto_extract_categories = ["birthday", "preference", "interest", "work", "family", "important_date"]\nrestricted_categories = ["health", "finance", "political", "religious"]\nfact_retention_days = 180\nreconnect_reminder_days = 30', 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'Estado inicial (se puede alternar en tiempo de ejecucion via chat)'],
  ['auto_extract', 'bool', 'true', 'Aprender hechos sobre personas a partir de conversaciones automaticamente'],
  ['auto_extract_categories', 'string[]', '[...]', 'Categorias que se pueden auto-extraer'],
  ['restricted_categories', 'string[]', '[...]', 'Categorias que nunca se auto-extraen'],
  ['fact_retention_days', 'integer', '180', 'Dias antes de que los hechos no confirmados sean eliminados'],
  ['reconnect_reminder_days', 'integer', '30', 'Dias de inactividad antes de sugerir una reconexion'],
])}
`
  },
  {
    slug: '/mcp',
    section: 'MCP',
    title: 'Vision General de MCP',
    description: 'Extiende aidaemon con servidores Model Context Protocol para acceso al sistema de archivos, bases de datos, APIs y mas.',
    content: () => `
<h1>Integracion MCP</h1>
<p class="lead">Extiende aidaemon con cualquier servidor <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener">Model Context Protocol</a> para agregar acceso al sistema de archivos, bases de datos, APIs y mas.</p>

<h2>Como Funciona</h2>
<ol>
  <li>aidaemon genera cada servidor MCP configurado como un subproceso</li>
  <li>Se comunica via JSON-RPC 2.0 sobre stdin/stdout</li>
  <li>Llama a <code>tools/list</code> para descubrir las herramientas disponibles</li>
  <li>Cada herramienta descubierta se envuelve como un <code>Tool</code> nativo de aidaemon</li>
  <li>El LLM puede llamar a herramientas MCP de la misma forma que las herramientas integradas</li>
</ol>

<h2>Detalles del Protocolo</h2>
<ul>
  <li><strong>Version del protocolo:</strong> 2024-11-05</li>
  <li><strong>Informacion del cliente:</strong> name="aidaemon", version="0.1.0"</li>
  <li><strong>Transporte:</strong> JSON delimitado por lineas sobre stdin/stdout</li>
  <li><strong>Inicializacion:</strong> solicitud <code>initialize</code> → <code>notifications/initialized</code></li>
</ul>

<h2>Ejemplo</h2>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@anthropic/mcp-filesystem", "/home/user/documents"]

[mcp.sqlite]
command = "npx"
args = ["-y", "@anthropic/mcp-sqlite", "my-database.db"]

[mcp.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]`, 'toml', 'config.toml')}

${callout('info', 'Manejo de Errores', 'Si un servidor MCP falla al iniciar o listar herramientas, el error se registra pero los demas servidores y herramientas integradas continuan funcionando.')}
`
  },
  {
    slug: '/mcp/configuration',
    section: 'MCP',
    title: 'Configuracion del Servidor MCP',
    description: 'Configura servidores MCP en config.toml de aidaemon. Transporte Stdio y SSE, variables de entorno y timeouts.',
    content: () => `
<h1>Configuracion del Servidor MCP</h1>
<p class="lead">Cada servidor MCP se define como una seccion con nombre bajo <code>[mcp]</code> en config.toml.</p>

<h2>Formato de Configuracion</h2>
${codeBlock(`[mcp.<server-name>]
command = "<executable>"
args = ["arg1", "arg2", ...]`, 'toml')}

${configTable([
  ['command', 'string', '—', 'Ejecutable o script para lanzar el servidor MCP'],
  ['args', 'array', '[]', 'Argumentos pasados al comando'],
])}

<h2>Proceso de Descubrimiento</h2>
<ol>
  <li>Para cada seccion <code>[mcp.*]</code>, genera el proceso con el comando y argumentos configurados</li>
  <li>Inicializa la conexion JSON-RPC (handshake del protocolo)</li>
  <li>Llama a <code>tools/list</code> para enumerar las herramientas disponibles</li>
  <li>Envuelve el nombre, descripcion y esquema de entrada de cada herramienta como un Tool nativo</li>
  <li>Registra cualquier error por servidor sin fallar globalmente</li>
</ol>

<h2>Ejemplos</h2>

<h3>Acceso al Sistema de Archivos</h3>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@anthropic/mcp-filesystem", "/home/user/projects"]`, 'toml')}

<h3>Busqueda Web</h3>
${codeBlock(`[mcp.brave-search]
command = "npx"
args = ["-y", "@anthropic/mcp-brave-search"]`, 'toml')}

<h3>Servidor Python Personalizado</h3>
${codeBlock(`[mcp.my-server]
command = "python3"
args = ["/path/to/my_mcp_server.py"]`, 'toml')}

${callout('info', 'Registro de Stderr', 'La salida stderr del servidor MCP es capturada y registrada por aidaemon para depuracion. Revisa los logs del daemon si un servidor no esta funcionando.')}

<h2>Deteccion de Amenazas</h2>
<p>aidaemon realiza deteccion de amenazas solo de auditoria en las llamadas a herramientas MCP. Los patrones sospechosos se registran pero <strong>no bloquean la ejecucion</strong>.</p>

<h3>Patrones de Argumentos Sospechosos</h3>
<ul>
  <li><strong>Acceso a archivos:</strong> <code>/etc/passwd</code>, <code>/etc/shadow</code>, <code>.ssh/</code>, <code>.env</code></li>
  <li><strong>Configuracion/secretos:</strong> <code>config.toml</code>, <code>aidaemon.db</code>, <code>api_key</code>, <code>bot_token</code>, <code>encryption_key</code></li>
  <li><strong>Red:</strong> <code>curl</code>, <code>wget</code>, <code>nc</code>, <code>base64</code></li>
  <li><strong>Ejecucion de codigo:</strong> <code>eval(</code>, <code>exec(</code>, <code>| sh</code>, <code>| bash</code></li>
  <li><strong>Destructivo:</strong> <code>; rm </code>, <code>chmod 777</code></li>
</ul>

<h3>Patrones de Salida Sospechosos</h3>
<ul>
  <li>Posibles API keys: prefijos <code>sk-</code>, <code>ghp_</code></li>
  <li>Claves privadas: <code>-----BEGIN</code>, <code>PRIVATE KEY</code></li>
  <li>Terminos sensibles: <code>password</code>, <code>bot_token</code></li>
</ul>

${callout('warn', 'Solo Auditoria', 'La deteccion de amenazas es informativa — registra advertencias pero no bloquea la ejecucion de herramientas. Revisa los logs de tu daemon para cualquier patron marcado.')}
`
  },
  {
    slug: '/triggers',
    section: 'Triggers',
    title: 'Triggers de Email',
    description: 'Monitorea bandejas de entrada de correo con IMAP IDLE y activa el agente aidaemon en nuevos mensajes automaticamente.',
    content: () => `
<h1>Triggers de Email</h1>
<p class="lead">Monitorea tu bandeja de entrada con IMAP IDLE y activa el agente con nuevos correos electronicos.</p>

<h2>Como Funciona</h2>
<ol>
  <li>aidaemon se conecta al servidor IMAP configurado con TLS</li>
  <li>Selecciona la carpeta configurada (por defecto: INBOX)</li>
  <li>Entra en modo IMAP IDLE — una conexion persistente que espera nuevos mensajes</li>
  <li>Cuando llega un nuevo correo, obtiene el sobre (asunto, remitente)</li>
  <li>Crea un Event y lo transmite via el bus de eventos interno</li>
  <li>El agente procesa el evento y envia una notificacion via Telegram</li>
</ol>

<h2>Configuracion</h2>
${codeBlock(`[triggers.email]
host = "imap.gmail.com"
port = 993
username = "you@gmail.com"
password = "your-app-password"
folder = "INBOX"`, 'toml', 'config.toml')}

${callout('warn', 'Contrasenas de Aplicacion de Gmail', 'Para Gmail con 2FA, genera una contrasena especifica de aplicacion en <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener">myaccount.google.com/apppasswords</a>.')}

<h2>Formato del Evento</h2>
${codeBlock(`Event {
    source: "email",
    session_id: "email_trigger",
    content: "New email from sender@example.com: Subject line here"
}`, 'rust')}

<h2>Bus de Eventos</h2>
<p>Los triggers usan un canal broadcast de Tokio para entregar eventos. El agente escucha en el extremo receptor y procesa cada evento como un nuevo mensaje en su propia sesion.</p>

${callout('danger', 'Sesiones No Confiables', 'Las sesiones de triggers de email se marcan como <strong>no confiables</strong>. Todos los comandos de terminal en estas sesiones requieren aprobacion explicita, independientemente de la lista blanca de allowed_prefixes.')}

<h2>Reconexion</h2>
<p>Si la conexion IMAP se cae, aidaemon espera 30 segundos y se reconecta automaticamente.</p>
`
  },
  {
    slug: '/skills',
    section: 'Skills',
    title: 'Sistema de Skills',
    description: 'Mejora dinamica de prompts via archivos markdown. Los skills inyectan instrucciones especificas de contexto basadas en disparadores de palabras clave.',
    content: () => `
<h1>Sistema de Skills</h1>
<p class="lead">Mejora dinamica de prompts via archivos markdown. Los skills inyectan instrucciones especificas de contexto cuando se activan por palabras clave en los mensajes del usuario.</p>

<h2>Configuracion</h2>
${codeBlock(`[skills]
dir = "skills"
enabled = true`, 'toml', 'config.toml')}

<h2>Formato de Archivo de Skill</h2>
<p>Los skills son archivos markdown con frontmatter tipo YAML, almacenados en el directorio de skills:</p>
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

<h2>Campos del Frontmatter</h2>
${configTable([
  ['name', 'string', '—', 'Nombre de visualizacion del skill'],
  ['description', 'string', '—', 'Descripcion breve (mostrada en la lista de "Skills Disponibles")'],
  ['triggers', 'string', '—', 'Palabras clave separadas por comas que activan el skill'],
])}

<h2>Coincidencia Hibrida</h2>
<p>La activacion de skills usa un proceso de dos etapas:</p>
<ol>
  <li><strong>Coincidencia de patrones</strong> — busqueda de palabras clave completas, sin distincion de mayusculas/minusculas. Si algun disparador aparece como una palabra completa en el mensaje del usuario, el skill es un candidato.</li>
  <li><strong>Confirmacion LLM</strong> — el modelo rapido valida si cada skill candidato es realmente relevante para la intencion del usuario. Esto previene activaciones falsas por coincidencias accidentales de palabras clave.</li>
</ol>
<p>El paso de confirmacion es <strong>fail-open</strong>: si la llamada al LLM falla o expira, todos los candidatos por coincidencia de patrones se activan.</p>

<h2>Inyeccion en el System Prompt</h2>
<p>Cuando se cargan los skills, el system prompt se enriquece con:</p>
<ol>
  <li><strong>Skills Disponibles</strong> — lista todos los nombres y descripciones de skills</li>
  <li><strong>Skills Activos</strong> — cuerpo completo de cada skill coincidente</li>
  <li><strong>Hechos Conocidos</strong> — hechos almacenados (inyectados debajo de los skills)</li>
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

<h2>Skills Dinamicos</h2>
<p>Mas alla de los skills estaticos del sistema de archivos, aidaemon soporta la gestion de skills en tiempo de ejecucion a traves de la herramienta <code>manage_skills</code> y registros opcionales.</p>

<h3>Acciones de la Herramienta manage_skills</h3>
<table class="config-table">
<thead><tr><th>Accion</th><th>Descripcion</th></tr></thead>
<tbody>
<tr><td><code>add</code></td><td>Obtener un skill desde una URL</td></tr>
<tr><td><code>add_inline</code></td><td>Analizar contenido markdown sin procesar como un skill</td></tr>
<tr><td><code>list</code></td><td>Mostrar todos los skills cargados con metadatos</td></tr>
<tr><td><code>remove</code></td><td>Eliminar un skill por nombre</td></tr>
<tr><td><code>enable</code> / <code>disable</code></td><td>Activar o desactivar un skill</td></tr>
<tr><td><code>browse</code></td><td>Buscar en los registros configurados</td></tr>
<tr><td><code>install</code></td><td>Instalar desde un registro</td></tr>
<tr><td><code>update</code></td><td>Volver a obtener el skill desde la URL de origen</td></tr>
</tbody>
</table>

<h3>Auto-Promocion</h3>
<p>Una tarea en segundo plano se ejecuta cada 12 horas, evaluando procedimientos frecuentemente usados para la promocion automatica a skills reutilizables.</p>
`
  },
  {
    slug: '/scheduler',
    section: 'Scheduler',
    title: 'Tareas Programadas',
    description: 'Crea tareas programadas recurrentes y de ejecucion unica con lenguaje natural o expresiones cron en aidaemon.',
    content: () => `
<h1>Tareas Programadas</h1>
<p class="lead">Crea tareas recurrentes y de ejecucion unica con lenguaje natural o expresiones cron. El agente ejecuta el prompt de la tarea segun la programacion.</p>

<h2>Nombre de la Herramienta</h2>
<p><code>scheduler</code></p>

<h2>Acciones</h2>
<table class="config-table">
<thead><tr><th>Accion</th><th>Parametros Requeridos</th><th>Descripcion</th></tr></thead>
<tbody>
<tr><td><code>create</code></td><td>name, schedule, prompt</td><td>Crear una nueva tarea programada</td></tr>
<tr><td><code>list</code></td><td>—</td><td>Listar todas las tareas con estado y proxima ejecucion</td></tr>
<tr><td><code>delete</code></td><td>id</td><td>Eliminar una tarea por UUID</td></tr>
<tr><td><code>pause</code></td><td>id</td><td>Pausar una tarea (deja de ejecutarse)</td></tr>
<tr><td><code>resume</code></td><td>id</td><td>Reanudar una tarea pausada (recalcula la proxima ejecucion)</td></tr>
</tbody>
</table>

<h2>Parametros de Creacion</h2>
${configTable([
  ['name', 'string', '—', 'Etiqueta legible para la tarea'],
  ['schedule', 'string', '—', 'Lenguaje natural o expresion cron de 5 campos'],
  ['prompt', 'string', '—', 'Lo que el agente debe hacer cuando la tarea se ejecute'],
  ['oneshot', 'bool', 'false', 'Ejecutar una vez y luego auto-eliminar'],
  ['trusted', 'bool', 'false', 'Ejecutar con autonomia total (sin aprobacion de terminal necesaria)'],
])}

<h2>Programaciones en Lenguaje Natural</h2>
<p>El scheduler analiza patrones comunes y los convierte en expresiones cron:</p>

<table class="config-table">
<thead><tr><th>Entrada</th><th>Cron</th><th>Descripcion</th></tr></thead>
<tbody>
<tr><td><code>hourly</code></td><td><code>0 * * * *</code></td><td>Cada hora en :00</td></tr>
<tr><td><code>daily</code></td><td><code>0 0 * * *</code></td><td>Cada dia a medianoche</td></tr>
<tr><td><code>weekly</code></td><td><code>0 0 * * 0</code></td><td>Cada domingo a medianoche</td></tr>
<tr><td><code>monthly</code></td><td><code>0 0 1 * *</code></td><td>Primero de cada mes</td></tr>
<tr><td><code>every 5m</code></td><td><code>*/5 * * * *</code></td><td>Cada 5 minutos</td></tr>
<tr><td><code>every 2h</code></td><td><code>0 */2 * * *</code></td><td>Cada 2 horas</td></tr>
<tr><td><code>daily at 9am</code></td><td><code>0 9 * * *</code></td><td>Cada dia a las 9:00 AM</td></tr>
<tr><td><code>daily at 14:30</code></td><td><code>30 14 * * *</code></td><td>Cada dia a las 2:30 PM</td></tr>
<tr><td><code>weekdays at 8:30</code></td><td><code>30 8 * * 1-5</code></td><td>Lun-Vie a las 8:30 AM</td></tr>
<tr><td><code>weekends at 10am</code></td><td><code>0 10 * * 0,6</code></td><td>Sab-Dom a las 10:00 AM</td></tr>
<tr><td><code>in 2h</code></td><td>(absoluto calculado)</td><td>Ejecucion unica, se ejecuta una vez en 2 horas</td></tr>
<tr><td><code>in 30m</code></td><td>(absoluto calculado)</td><td>Ejecucion unica, se ejecuta una vez en 30 minutos</td></tr>
</tbody>
</table>

<p>Las expresiones cron estandar de 5 campos tambien se aceptan directamente (ej., <code>0 9 * * 1-5</code>).</p>

<h2>Configuracion</h2>
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

<h2>Almacenamiento de Tareas</h2>
<p>Las tareas se persisten en SQLite (tabla <code>scheduled_tasks</code>). Las tareas definidas en la configuracion se sincronizan al inicio — las tareas eliminadas se limpian automaticamente. Las tareas creadas via la herramienta persisten indefinidamente.</p>

<h2>Tareas Perdidas</h2>
<p>Al inicio, el scheduler verifica tareas que deberian haberse ejecutado mientras el daemon estaba inactivo. Las tareas perdidas se ejecutan inmediatamente durante la recuperacion.</p>

${callout('warn', 'Trusted vs Untrusted', 'Las tareas trusted se ejecutan con acceso completo a la terminal (sin aprobacion necesaria). Las tareas untrusted (por defecto) requieren aprobacion para cualquier comando de terminal, igual que las sesiones activadas por email.')}
`
  },
  {
    slug: '/router',
    section: 'Router',
    title: 'Enrutamiento de Modelos',
    description: 'Enrutamiento automatico por nivel de modelo: Fast, Primary o Smart. Heuristicas de palabras clave y clasificacion por longitud del mensaje.',
    content: () => `
<h1>Enrutamiento de Modelos</h1>
<p class="lead">Seleccion automatica de modelo basada en niveles que enruta cada consulta al modelo mas apropiado: Fast, Primary o Smart.</p>

<h2>Niveles</h2>
<table class="config-table">
<thead><tr><th>Nivel</th><th>Caso de Uso</th><th>Modelo Tipico</th></tr></thead>
<tbody>
<tr><td><strong>Fast</strong></td><td>Saludos simples, si/no, consultas cortas</td><td>gemini-2.5-flash-lite, gpt-4o-mini, claude-haiku-4</td></tr>
<tr><td><strong>Primary</strong></td><td>Conversacion general, tareas moderadas</td><td>gemini-3-flash-preview, gpt-4o, claude-sonnet-4</td></tr>
<tr><td><strong>Smart</strong></td><td>Razonamiento complejo, generacion de codigo, analisis</td><td>gemini-3-pro-preview, o1-preview, claude-opus-4</td></tr>
</tbody>
</table>

<h2>Reglas de Clasificacion</h2>

<h3>Nivel Smart (tareas complejas)</h3>
<p>Una consulta se clasifica como Smart si alguna de estas condiciones es verdadera:</p>
<ul>
  <li>Contiene un bloque de codigo (<code>\`\`\`</code>)</li>
  <li>Longitud del mensaje &gt; 500 caracteres</li>
  <li>Contiene 3+ signos de interrogacion</li>
  <li>Contiene palabras clave: <em>implement, refactor, debug, analyze, step by step, write code, architecture, optimize, algorithm, explain how, write a, build a, create a function, design, compare and contrast, walk me through, troubleshoot, review this, fix this, rewrite</em></li>
</ul>

<h3>Nivel Fast (consultas simples)</h3>
<p>Una consulta se clasifica como Fast si alguna de estas condiciones es verdadera:</p>
<ul>
  <li>Coincidencia exacta de saludos/confirmaciones: <em>hi, hello, hey, thanks, ok, yes, no, sure, bye, goodbye, ty, cool, nice, great, awesome, lol, haha, wow</em> (sin distincion de mayusculas/minusculas)</li>
  <li>Mensaje de una sola palabra</li>
  <li>Mensaje corto: &lt;20 caracteres Y &le;3 palabras</li>
  <li>Prefijo de consulta simple (<em>what is, who is, define, when is, where is</em>) + &le;6 palabras totales</li>
</ul>

<h3>Nivel Primary (por defecto)</h3>
<p>Todo lo demas se asigna al nivel Primary.</p>

<h2>Desactivar Auto-Enrutamiento</h2>
<ul>
  <li>Si los tres niveles de modelo son iguales, el enrutamiento se desactiva automaticamente</li>
  <li>Enviar <code>/model &lt;name&gt;</code> en Telegram desactiva el enrutamiento (anulacion manual)</li>
  <li>Enviar <code>/auto</code> reactiva el enrutamiento automatico</li>
</ul>
`
  },
  {
    slug: '/cost-tracking',
    section: 'Cost Tracking',
    title: 'Uso de Tokens y Presupuestos',
    description: 'Rastrea el consumo de tokens por modelo y sesion. Establece presupuestos diarios y consulta estadisticas via el comando /cost.',
    content: () => `
<h1>Uso de Tokens y Seguimiento de Costos</h1>
<p class="lead">Rastrea el consumo de tokens por modelo y sesion. Establece presupuestos diarios para controlar el gasto. Consulta estadisticas desde Telegram con <code>/cost</code>.</p>

<h2>Como Funciona</h2>
<ol>
  <li>Cada llamada al LLM registra tokens de entrada y salida en la tabla SQLite <code>token_usage</code></li>
  <li>Cada registro incluye: nombre del modelo, ID de sesion, conteos de tokens y marca de tiempo</li>
  <li>Opcionalmente, establece un presupuesto diario de tokens que bloquea llamadas al LLM una vez excedido</li>
  <li>El presupuesto se reinicia automaticamente a medianoche UTC</li>
</ol>

<h2>Configuracion</h2>
${configTable([
  ['daily_token_budget', 'integer', 'null', 'Maximo total de tokens (entrada + salida) por dia. Null = ilimitado.'],
])}

${codeBlock(`[state]
daily_token_budget = 1000000  # 1M tokens per day`, 'toml', 'config.toml')}

${callout('info', 'Alcance del Presupuesto', 'El presupuesto diario es global — cuenta todos los tokens en todas las sesiones y modelos. Cuando se excede, las llamadas al LLM devuelven un error hasta la medianoche UTC.')}

<h2>Comando /cost de Telegram</h2>
<p>Envia <code>/cost</code> en Telegram para ver las estadisticas de uso:</p>
${codeBlock(`Token usage (last 24h):
  Input:  12,450 tokens
  Output: 8,230 tokens

Token usage (last 7d):
  Input:  87,320 tokens
  Output: 52,180 tokens

Top models (7d):
  gemini-3-flash-preview: 98,400 tokens
  gemini-3-pro-preview: 41,100 tokens`, 'text')}

<h2>Esquema de Base de Datos</h2>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Clave primaria auto-incremental'],
  ['session_id', 'TEXT', '—', 'Que sesion de usuario/chat realizo la llamada'],
  ['model', 'TEXT', '—', 'Que modelo LLM se uso'],
  ['input_tokens', 'INTEGER', '—', 'Tokens enviados al modelo'],
  ['output_tokens', 'INTEGER', '—', 'Tokens generados por el modelo'],
  ['created_at', 'TEXT', 'now', 'Marca de tiempo UTC de la llamada'],
])}

<h2>Que se Rastrea</h2>
<ul>
  <li>Tokens de entrada (contexto + mensaje del usuario) por llamada al LLM</li>
  <li>Tokens de salida (respuesta del modelo) por llamada al LLM</li>
  <li>Nombre del modelo para desgloses por modelo</li>
  <li>ID de sesion para seguimiento por usuario</li>
  <li>Marca de tiempo para consultas por ventana temporal (24h, 7d)</li>
</ul>
`
  },
  {
    slug: '/architecture',
    section: 'Architecture',
    title: 'Bucle del Agente y Recuperacion de Errores',
    description: 'El bucle agentico de aidaemon: manejo de mensajes, llamadas al LLM, ejecucion de herramientas, deteccion de estancamiento y recuperacion de errores.',
    content: () => `
<h1>Bucle del Agente y Recuperacion de Errores</h1>
<p class="lead">El bucle agentico principal: recibir mensaje, llamar al LLM, ejecutar herramientas, iterar, responder.</p>

<h2>Flujo del Bucle del Agente</h2>
<ol>
  <li><strong>Persistir mensaje del usuario</strong> — almacenado con puntuacion de importancia</li>
  <li><strong>Auto-enrutar modelo</strong> — clasificar complejidad de la consulta (si no ha sido anulado)</li>
  <li><strong>Construir system prompt</strong> — prompt base + skills coincidentes + hechos conocidos</li>
  <li><strong>Recuperar contexto</strong> — recuperacion tri-hibrida de memoria</li>
  <li><strong>Iterar</strong> (hasta <code>max_iterations</code>):
    <ul>
      <li>Recopilar memorias antiguas fijadas + mensajes recientes (deduplicados)</li>
      <li>Construir lista de mensajes en formato OpenAI</li>
      <li>Llamar al LLM con recuperacion clasificada de errores</li>
      <li>Si hay llamadas a herramientas → ejecutar cada una, persistir resultados, continuar bucle</li>
      <li>Si no hay llamadas a herramientas O es la iteracion final → devolver respuesta de texto</li>
    </ul>
  </li>
  <li><strong>Maximo de iteraciones alcanzado</strong> → devolver mensaje de timeout</li>
</ol>

<h2>Presupuesto Dinamico de Iteraciones</h2>
<p>El agente tiene una herramienta integrada <code>request_more_iterations</code> que extiende el presupuesto del bucle cuando el limite actual es insuficiente:</p>
<ul>
  <li>Extiende el presupuesto en <strong>10 iteraciones</strong> por llamada</li>
  <li>Un limite maximo previene la extension ilimitada (tipicamente 25 en total)</li>
  <li>Requiere un parametro <code>reason</code> explicando lo que queda por hacer</li>
  <li>Se usa cuando el agente tiene un plan claro pero se quedaria sin iteraciones a mitad de tarea</li>
</ul>

<h2>Estrategia de Recuperacion de Errores</h2>
<p>El metodo <code>call_llm_with_recovery</code> clasifica errores y responde en consecuencia:</p>

<table class="config-table">
<thead><tr><th>Tipo de Error</th><th>Estrategia</th></tr></thead>
<tbody>
<tr><td><strong>Auth / Billing</strong></td><td>Devolver inmediatamente al usuario — sin reintento</td></tr>
<tr><td><strong>Rate Limit</strong></td><td>Esperar <code>retry_after_secs</code> (maximo 60s), reintentar una vez</td></tr>
<tr><td><strong>Timeout / Red / Error del Servidor</strong></td><td>Esperar 2s, reintentar una vez; si falla, recurrir al modelo anterior</td></tr>
<tr><td><strong>Not Found (modelo incorrecto)</strong></td><td>Cambiar inmediatamente al modelo de respaldo</td></tr>
<tr><td><strong>Desconocido</strong></td><td>Propagar como error</td></tr>
</tbody>
</table>

${callout('info', 'Ultimo Conocido Funcional', 'Despues de cada llamada exitosa al LLM, la configuracion actual se guarda como <code>config.toml.lastgood</code>. Esto permite la recuperacion automatica de cambios incorrectos en la configuracion.')}

<h2>Correccion del Orden de Mensajes</h2>
<p>Para satisfacer las restricciones de los proveedores Gemini, Anthropic y OpenAI, aidaemon ejecuta una correccion de tres pasadas en el historial de mensajes antes de cada llamada al LLM:</p>
<ol>
  <li><strong>Pasada 1:</strong> Fusionar mensajes consecutivos del mismo rol (combina arrays de tool_calls)</li>
  <li><strong>Pasada 2:</strong> Eliminar resultados de herramientas huerfanos (sin tool_call de asistente correspondiente) y eliminar tool_calls huerfanos (sin resultado de herramienta correspondiente)</li>
  <li><strong>Pasada 3:</strong> Fusionar nuevamente despues de que la eliminacion de huerfanos pueda crear nuevos mensajes consecutivos del mismo rol</li>
</ol>

<h2>Ejecucion de Herramientas</h2>
<p>Durante el bucle, cada llamada a herramienta recibe:</p>
<ul>
  <li><code>_session_id</code> — inyectado automaticamente para seguimiento de sesion</li>
  <li><code>_untrusted_source</code> — flag establecido para sesiones originadas por disparadores</li>
</ul>

<h2>Deteccion de Estancamiento y Repeticion</h2>
<p>El bucle del agente incluye salvaguardas contra quedarse atascado:</p>
<ul>
  <li><strong>Deteccion de estancamiento</strong> &mdash; si la misma herramienta se llama 3+ veces consecutivas con argumentos similares, el bucle se interrumpe</li>
  <li><strong>Deteccion de repeticion</strong> &mdash; detecta texto de respuesta repetido y fuerza una interrupcion</li>
  <li><strong>Limite maximo de iteraciones</strong> &mdash; 10 por defecto, extensible a 25 via <code>request_more_iterations</code></li>
</ul>

<h2>Tipos de Sesion</h2>
<table class="config-table">
<thead><tr><th>Tipo de Sesion</th><th>Formato</th><th>Trusted</th></tr></thead>
<tbody>
<tr><td>Chat de Telegram</td><td>Chat ID como string</td><td>Si</td></tr>
<tr><td>Canal de Slack</td><td><code>slack:{channel_id}</code> o <code>slack:{channel_id}:{thread_ts}</code></td><td>Si</td></tr>
<tr><td>Canal de Discord</td><td><code>discord:{channel_id}</code></td><td>Si</td></tr>
<tr><td>Disparador de email</td><td><code>email_trigger</code></td><td>No</td></tr>
<tr><td>Disparador de evento</td><td><code>event_{uuid}</code></td><td>No</td></tr>
<tr><td>Sub-agente</td><td><code>sub-{depth}-{uuid}</code></td><td>Heredado</td></tr>
</tbody>
</table>
`
  },
  {
    slug: '/architecture/state',
    section: 'Architecture',
    title: 'Gestion de Estado y Memoria',
    description: 'Persistencia respaldada por SQLite con busqueda semantica via embeddings, recuperacion tri-hibrida y capas de memoria.',
    content: () => `
<h1>Gestion de Estado y Memoria</h1>
<p class="lead">Persistencia respaldada por SQLite con memoria de trabajo en memoria, busqueda semantica via embeddings y recuperacion tri-hibrida.</p>

${callout('info', 'Actualización v0.9.x', 'La persistencia principal de conversaciones ahora usa la tabla <code>events</code>. Los datos antiguos de <code>messages</code> se migran a events durante la actualización.')}

<h2>Esquema de Base de Datos</h2>

<h3>Tabla messages</h3>
${configTable([
  ['id', 'TEXT PK', '—', 'Clave primaria UUID'],
  ['session_id', 'TEXT', '—', 'Identificador de sesion (indexado)'],
  ['role', 'TEXT', '—', 'user, assistant o tool'],
  ['content', 'TEXT', 'null', 'Contenido de texto del mensaje'],
  ['tool_call_id', 'TEXT', 'null', 'ID para mensajes de resultado de herramienta'],
  ['tool_name', 'TEXT', 'null', 'Nombre de herramienta para mensajes de herramienta'],
  ['tool_calls_json', 'TEXT', 'null', 'Array JSON de llamadas a herramientas'],
  ['created_at', 'TEXT', '—', 'Marca de tiempo RFC3339'],
  ['importance', 'REAL', '0.5', 'Puntuacion de importancia (0.0–1.0)'],
  ['embedding', 'BLOB', 'null', 'Embedding codificado en JSON Vec&lt;f32&gt;'],
  ['embedding_error', 'TEXT', 'null', 'Mensaje de error si el embedding fallo'],
  ['consolidated_at', 'TEXT', 'null', 'Marca de tiempo de consolidacion de memoria'],
])}

<h3>Tabla facts</h3>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Clave primaria auto-incremental'],
  ['category', 'TEXT', '—', 'Categoria de agrupacion'],
  ['key', 'TEXT', '—', 'Clave del hecho (unica por categoria)'],
  ['value', 'TEXT', '—', 'Contenido del hecho'],
  ['source', 'TEXT', '""', 'Quien lo almaceno: "agent" o "user"'],
  ['created_at', 'TEXT', '—', 'Marca de tiempo RFC3339'],
  ['updated_at', 'TEXT', '—', 'Marca de tiempo RFC3339'],
])}

<h3>Tabla macros</h3>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Clave primaria auto-incremental'],
  ['trigger_tool', 'TEXT', '&mdash;', 'Herramienta que activa la macro'],
  ['trigger_args_pattern', 'TEXT', 'null', 'Patron de argumentos a coincidir'],
  ['next_tool', 'TEXT', '&mdash;', 'Herramienta a encadenar a continuacion'],
  ['next_args', 'TEXT', '&mdash;', 'Argumentos para la herramienta encadenada'],
  ['confidence', 'REAL', '0.0', 'Puntuacion de confianza de la macro'],
  ['used_count', 'INTEGER', '0', 'Numero de veces que se ha usado la macro'],
  ['created_at', 'TEXT', '&mdash;', 'Marca de tiempo RFC3339'],
  ['updated_at', 'TEXT', '&mdash;', 'Marca de tiempo RFC3339'],
])}

<h3>Tabla scheduled_tasks</h3>
${configTable([
  ['id', 'TEXT PK', '—', 'Clave primaria UUID'],
  ['name', 'TEXT', '—', 'Etiqueta legible de la tarea'],
  ['cron_expr', 'TEXT', '—', 'Expresion cron de 5 campos calculada'],
  ['original_schedule', 'TEXT', '—', 'Entrada del usuario (lenguaje natural o cron)'],
  ['prompt', 'TEXT', '—', 'Prompt del agente a ejecutar segun programacion'],
  ['source', 'TEXT', '—', '"tool" (creada via herramienta) o "config" (desde config.toml)'],
  ['is_oneshot', 'INTEGER', '0', 'Ejecutar una vez y luego auto-eliminar'],
  ['is_paused', 'INTEGER', '0', 'Las tareas pausadas no se ejecutan'],
  ['is_trusted', 'INTEGER', '0', 'Las tareas trusted omiten la aprobacion de terminal'],
  ['next_run_at', 'TEXT', '—', 'Marca de tiempo RFC3339 de la proxima ejecucion programada'],
  ['last_run_at', 'TEXT', 'null', 'Marca de tiempo RFC3339 de la ultima ejecucion'],
  ['created_at', 'TEXT', '—', 'Marca de tiempo RFC3339'],
  ['updated_at', 'TEXT', '—', 'Marca de tiempo RFC3339'],
])}

<h3>Tabla terminal_allowed_prefixes</h3>
${configTable([
  ['prefix', 'TEXT PK', '—', 'Prefijo de comando persistido desde aprobaciones "Permitir Siempre"'],
])}

<h2>Memoria de Trabajo</h2>
<p>Un <code>HashMap&lt;String, VecDeque&lt;Message&gt;&gt;</code> en memoria por sesion, limitado a <code>working_memory_cap</code> (por defecto 50). Evita consultas a la base de datos para el historial de conversacion reciente.</p>

<h2>Recuperacion Tri-Hibrida</h2>
<p>El metodo <code>get_context</code> combina tres estrategias de recuperacion:</p>

<table class="config-table">
<thead><tr><th>Estrategia</th><th>Fuente</th><th>Limite</th><th>Proposito</th></tr></thead>
<tbody>
<tr><td><strong>Recencia</strong></td><td>Ultimos N mensajes</td><td>10</td><td>Continuidad conversacional</td></tr>
<tr><td><strong>Relevancia</strong></td><td>importance &ge; 0.8</td><td>5</td><td>Memorias criticas marcadas</td></tr>
<tr><td><strong>Similitud</strong></td><td>Similitud vectorial &gt; 0.65</td><td>5</td><td>Busqueda semantica via embeddings</td></tr>
</tbody>
</table>

<p>Los resultados se deduplican por ID de mensaje antes de incluirse en el contexto.</p>

<h2>Servicio de Embeddings</h2>
<ul>
  <li><strong>Modelo:</strong> AllMiniLML6V2 (via fastembed)</li>
  <li>Se ejecuta en segundo plano — genera embeddings de nuevos mensajes despues de agregarlos</li>
  <li>Habilita la rama de similitud de la recuperacion tri-hibrida</li>
</ul>

<h2>Consolidacion de Memoria</h2>
<p>Una tarea en segundo plano se ejecuta cada <code>consolidation_interval_hours</code> (por defecto 6). Comprime conversaciones antiguas en resumenes usando el modelo rapido, reduciendo almacenamiento y uso de ventana de contexto.</p>

<h2>Puntuacion de Importancia</h2>
<table class="config-table">
<thead><tr><th>Rol</th><th>Puntuacion por Defecto</th></tr></thead>
<tbody>
<tr><td>Mensaje de usuario</td><td>0.5</td></tr>
<tr><td>Respuesta del asistente</td><td>0.5</td></tr>
<tr><td>Salida de herramienta</td><td>0.3</td></tr>
<tr><td>Mensaje del sistema</td><td>0.1</td></tr>
</tbody>
</table>

<h2>Pool de Conexiones</h2>
<ul>
  <li>Pool SQLite: maximo 5 conexiones</li>
  <li>Modo de journal: WAL (Write-Ahead Logging) para lecturas concurrentes</li>
  <li>Crea automaticamente la base de datos y las tablas si no existen</li>
</ul>
`
  },
  {
    slug: '/service-install',
    section: 'Service',
    title: 'Configuracion de systemd y launchd',
    description: 'Instala aidaemon como un servicio systemd o launchd que inicia con el arranque del sistema y se ejecuta continuamente.',
    content: () => `
<h1>Instalacion como Servicio</h1>
<p class="lead">Instala aidaemon como un servicio del sistema que inicia con el arranque y se ejecuta permanentemente.</p>

<h2>Comando de Instalacion</h2>
${codeBlock(`./aidaemon install-service`, 'bash')}

<p>Esto auto-detecta la plataforma y genera la configuracion de servicio apropiada.</p>

<h2>Linux (systemd)</h2>
<p>Crea <code>/etc/systemd/system/aidaemon.service</code>:</p>
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

<p>Luego habilita e inicia el servicio:</p>
${codeBlock(`sudo systemctl daemon-reload
sudo systemctl enable --now aidaemon`, 'bash')}

<h2>macOS (launchd)</h2>
<p>Crea <code>$HOME/Library/LaunchAgents/ai.aidaemon.plist</code>:</p>
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

<p>Luego carga el servicio:</p>
${codeBlock(`launchctl load ~/Library/LaunchAgents/ai.aidaemon.plist`, 'bash')}

${callout('warning', 'Prevenir Suspension de macOS', 'macOS puede suspender procesos en segundo plano cuando el sistema entra en reposo. Para mantener aidaemon ejecutandose continuamente, usa <code>caffeinate</code>:<br><br><code>caffeinate -s aidaemon</code><br><br>El flag <code>-s</code> previene la suspension mientras el proceso esta en ejecucion. Tambien puedes usar <code>caffeinate -i</code> para prevenir la suspension por inactividad sin mantener la pantalla encendida. Si se ejecuta como servicio launchd, agrega <code>caffeinate -s</code> antes de la ruta del binario en los <code>ProgramArguments</code> de tu plist.')}

<h2>Verificacion de Salud</h2>
<p>Una vez ejecutandose como servicio, verifica con:</p>
${codeBlock(`curl http://127.0.0.1:8080/health
# {"status": "ok"}`, 'bash')}

<p>El endpoint de salud es servido por axum en el <code>daemon.health_bind:daemon.health_port</code> configurado.</p>
`
  },
  {
    slug: '/event-sourcing',
    section: 'Event Sourcing',
    title: 'Sistema de Eventos',
    description: 'Registro inmutable de eventos para todas las acciones del agente. Consolidacion diaria en hechos y procedimientos. Contexto de sesion.',
    content: () => `
<h1>Event Sourcing</h1>
<p class="lead">Cada accion del agente se registra como un evento inmutable. Los eventos son la unica fuente de verdad de lo que ocurrio durante una sesion.</p>

<h2>Tipos de Eventos</h2>
<p>El sistema rastrea 16 tipos de eventos en 6 categorias:</p>

<table class="config-table">
<thead><tr><th>Categoria</th><th>Tipo de Evento</th><th>Descripcion</th></tr></thead>
<tbody>
<tr><td rowspan="2"><strong>Sesion</strong></td><td><code>SessionStart</code></td><td>Comienza una nueva sesion de conversacion</td></tr>
<tr><td><code>SessionEnd</code></td><td>Sesion terminada</td></tr>
<tr><td rowspan="2"><strong>Conversacion</strong></td><td><code>UserMessage</code></td><td>El usuario envia un mensaje</td></tr>
<tr><td><code>AssistantResponse</code></td><td>El agente envia una respuesta</td></tr>
<tr><td rowspan="2"><strong>Herramientas</strong></td><td><code>ToolCall</code></td><td>El agente invoca una herramienta</td></tr>
<tr><td><code>ToolResult</code></td><td>La ejecucion de la herramienta se completa</td></tr>
<tr><td><strong>Razonamiento</strong></td><td><code>ThinkingStart</code></td><td>El agente comienza a razonar</td></tr>
<tr><td rowspan="2"><strong>Tareas</strong></td><td><code>TaskStart</code></td><td>El agente comienza una tarea</td></tr>
<tr><td><code>TaskEnd</code></td><td>La tarea se completa (con estado)</td></tr>
<tr><td><strong>Errores</strong></td><td><code>Error</code></td><td>Ocurre un error durante el procesamiento</td></tr>
<tr><td rowspan="2"><strong>Sub-Agentes</strong></td><td><code>SubAgentSpawn</code></td><td>Se genera un sub-agente</td></tr>
<tr><td><code>SubAgentComplete</code></td><td>El sub-agente finaliza</td></tr>
<tr><td rowspan="3"><strong>Aprobaciones</strong></td><td><code>ApprovalRequested</code></td><td>Se envia solicitud de aprobacion de comando</td></tr>
<tr><td><code>ApprovalGranted</code></td><td>El usuario aprobo un comando</td></tr>
<tr><td><code>ApprovalDenied</code></td><td>El usuario denego un comando</td></tr>
</tbody>
</table>

<h2>Estructura del Evento</h2>
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

<h2>Consolidacion Diaria</h2>
<p>Una tarea en segundo plano se ejecuta a las <strong>3:00 AM UTC</strong> diariamente y procesa eventos no consolidados:</p>
<ol>
  <li><strong>Extraccion de hechos</strong> &mdash; el LLM analiza secuencias de eventos para extraer hechos duraderos</li>
  <li><strong>Aprendizaje de procedimientos</strong> &mdash; los patrones repetidos de llamadas a herramientas se capturan como procedimientos</li>
  <li><strong>Seguimiento de soluciones de errores</strong> &mdash; los errores y sus resoluciones se emparejan para depuracion futura</li>
</ol>
<p>Despues del procesamiento, los eventos se marcan con una marca de tiempo <code>consolidated_at</code>.</p>

<h2>Contexto de Sesion</h2>
<p>El sistema de eventos proporciona un resumen de sesion para el contexto del LLM que incluye herramientas utilizadas, errores encontrados, aprobaciones concedidas/denegadas y actividad de sub-agentes.</p>

<h2>Limpieza de Eventos</h2>
<p>Una tarea en segundo plano se ejecuta a las <strong>3:30 AM UTC</strong> y elimina eventos mas antiguos que el periodo de retencion (por defecto 30 dias).</p>

${callout('info', 'Inmutabilidad', 'Los eventos son de solo escritura (append-only). El campo <code>consolidated_at</code> es el unico campo que se actualiza despues de la creacion.')}
`
  },
  {
    slug: '/plans',
    section: 'Plans',
    title: 'Planes (Legacy)',
    description: 'Referencia legacy para la ejecucion basada en planes. Las versiones actuales de aidaemon usan objetivos y tareas.',
    content: () => `
<h1>Planes (Legacy)</h1>
<p class="lead">Esta pagina es para instalaciones antiguas. Las versiones actuales de aidaemon trabajan con objetivos y tareas.</p>

${callout('warning', 'Actualizacion v0.9.x', 'Los planes ya no son la ruta principal de ejecucion. aidaemon ahora divide el trabajo en objetivos y tareas.')}

<h2>Usa estas paginas ahora</h2>
<ul>
  <li><a href="/tools">Herramientas</a> — como se ejecuta el trabajo en el sistema actual</li>
  <li><a href="/scheduler">Tareas Programadas</a> — automatizacion recurrente o de una sola vez</li>
  <li><a href="/event-sourcing">Event Sourcing</a> — historial completo de lo que paso</li>
</ul>

<h2>Cuando importa esta pagina</h2>
<p>Si aun usas una version antigua con planes, esta pagina queda como referencia legacy.</p>
`
  },
  {
    slug: '/health-monitoring',
    section: 'Health Monitoring',
    title: 'Sondas de Servicio',
    description: 'Define sondas de salud HTTP, TCP, de comandos y de archivos para tus servicios con alertas y seguimiento de tendencias.',
    content: () => `
<h1>Monitoreo de Salud</h1>
<p class="lead">Define sondas de salud para tus servicios y recibe alertas cuando algo falle.</p>

<h2>Tipos de Sondas</h2>
<table class="config-table">
<thead><tr><th>Tipo</th><th>Formato del Objetivo</th><th>Que Verifica</th></tr></thead>
<tbody>
<tr><td><code>http</code></td><td>URL</td><td>Codigo de estado HTTP, cuerpo de respuesta, latencia</td></tr>
<tr><td><code>port</code></td><td>host:port</td><td>Conectividad TCP</td></tr>
<tr><td><code>command</code></td><td>Comando shell</td><td>El codigo de salida coincide con el esperado (por defecto: 0)</td></tr>
<tr><td><code>file</code></td><td>Ruta de archivo</td><td>El archivo existe y no es mas antiguo que max_age_secs</td></tr>
</tbody>
</table>

<h2>Configuracion</h2>
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

<h2>Opciones de Sondas HTTP</h2>
${configTable([
  ['timeout_secs', 'integer', '10', 'Tiempo de espera de la solicitud en segundos'],
  ['expected_status', 'integer', '200', 'Codigo de estado HTTP esperado'],
  ['expected_body', 'string', 'null', 'Subcadena esperada en el cuerpo de la respuesta'],
  ['method', 'string', '"GET"', 'Metodo HTTP'],
  ['headers', 'object', '{}', 'Cabeceras HTTP personalizadas'],
])}

<h2>Alertas</h2>
<p>Cuando una sonda falla <code>consecutive_failures_alert</code> veces consecutivas, se envia una alerta a todos los IDs de sesion en <code>alert_session_ids</code>.</p>

<h2>Tareas en Segundo Plano</h2>
<ul>
  <li><strong>Bucle de verificacion</strong> &mdash; se ejecuta cada <code>tick_interval_secs</code> (por defecto 30), ejecuta las sondas pendientes</li>
  <li><strong>Limpieza</strong> &mdash; se ejecuta a las <strong>3:40 AM UTC</strong>, elimina resultados antiguos</li>
</ul>

${callout('info', 'Sondas Dinamicas', 'Las sondas tambien se pueden crear en tiempo de ejecucion por el agente via la herramienta <code>health_probe</code>.')}
`
  },
  {
    slug: '/updates',
    section: 'Updates',
    title: 'Auto-Actualizador',
    description: 'Auto-actualiza aidaemon desde releases de GitHub. Tres modos: notificar, descargar o auto-instalar.',
    content: () => `
<h1>Auto-Actualizador</h1>
<p class="lead">aidaemon puede verificar nuevas releases en GitHub y actualizarse automaticamente.</p>

<h2>Novedades Recientes</h2>
<ul>
  <li><strong>v0.9.2</strong> &mdash; mejor confiabilidad de herramientas, validaciones de intención más fuertes, mejor manejo de comandos en segundo plano y aliases de rutas</li>
  <li><strong>v0.9.1</strong> &mdash; mejor contexto de seguimiento, límites de alcance por proyecto y bloqueos duros para borrados peligrosos</li>
  <li><strong>v0.9.0</strong> &mdash; incorporación del sistema consultor, gran refactor del agente y migración a eventos canónicos</li>
</ul>

<h2>Modos de Actualizacion</h2>
<table class="config-table">
<thead><tr><th>Modo</th><th>Comportamiento</th></tr></thead>
<tbody>
<tr><td><code>enable</code></td><td>Descargar y aplicar actualizaciones automaticamente, luego reiniciar</td></tr>
<tr><td><code>check_only</code> (por defecto)</td><td>Notificar y esperar aprobacion antes de aplicar</td></tr>
<tr><td><code>disable</code></td><td>Sin verificacion de actualizaciones</td></tr>
</tbody>
</table>

<h2>Configuracion</h2>
${codeBlock(`[updates]
mode = "check_only"
check_interval_hours = 24
check_at_utc_hour = 6
confirmation_timeout_mins = 60`, 'toml', 'config.toml')}

${configTable([
  ['mode', 'string', '"check_only"', 'Modo de actualizacion: enable, check_only o disable'],
  ['check_interval_hours', 'integer', '24', 'Horas entre verificaciones de actualizacion'],
  ['check_at_utc_hour', 'integer', 'null', 'Hora UTC especifica (0-23) para la verificacion diaria'],
  ['confirmation_timeout_mins', 'integer', '60', 'Minutos de espera para la aprobacion del usuario'],
])}

<h2>Proceso de Actualizacion</h2>
<ol>
  <li><strong>Verificar</strong> &mdash; consulta la API de GitHub Releases</li>
  <li><strong>Comparar</strong> &mdash; comparacion semver</li>
  <li><strong>Notificar</strong> &mdash; envia notas de la release a los canales</li>
  <li><strong>Aprobar</strong> (check_only) &mdash; solicitud de aprobacion con tiempo limite</li>
  <li><strong>Descargar</strong> &mdash; binario especifico de la plataforma</li>
  <li><strong>Reemplazar</strong> &mdash; sobrescribe el binario actual</li>
  <li><strong>Reiniciar</strong> &mdash; sale con codigo 75 para activar el reinicio del servicio</li>
</ol>

<h2>Soporte de Plataformas</h2>
<table class="config-table">
<thead><tr><th>Plataforma</th><th>Arquitectura</th></tr></thead>
<tbody>
<tr><td>Linux</td><td>x86_64, aarch64</td></tr>
<tr><td>macOS</td><td>x86_64, aarch64</td></tr>
</tbody>
</table>

${callout('warn', 'Usuarios de Homebrew', 'Si se instalo via Homebrew, usa <code>brew upgrade aidaemon</code> en su lugar, o establece <code>mode = "disable"</code>.')}
`
  },
];

export default pages;
