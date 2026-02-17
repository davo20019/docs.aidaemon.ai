import { codeBlock, callout, configTable } from '../helpers.js';

const pages = [
  {
    slug: '/',
    section: null,
    title: 'Documentação do aidaemon — Daemon de Agente de IA Pessoal',
    description: 'Documentação do aidaemon, um daemon de agente de IA pessoal de código aberto. Converse via Telegram, Slack ou Discord. Estenda com MCP, use qualquer LLM.',
    content: () => `
<h1><span class="ai">AI</span>daemon</h1>
<p class="lead">Um agente de IA pessoal que roda como daemon. Sempre ativo, sempre aprendendo. Converse pelo Telegram, estenda com MCP, alimentado por qualquer LLM.</p>

<p>aidaemon é um agente de IA auto-hospedado escrito em Rust que roda como um serviço em segundo plano na sua máquina. Ele se conecta a qualquer provedor de LLM compatível com OpenAI, comunica-se via Telegram, Slack ou Discord, e pode executar ferramentas, gerenciar sua própria configuração, lembrar fatos, navegar na web e criar sub-agentes — tudo de forma autônoma.</p>

<h2>Principais Funcionalidades</h2>
<ul>
  <li><strong>Arquitetura daemon</strong> — roda como serviço systemd/launchd, sempre disponível</li>
  <li><strong>Multicanal</strong> — converse via Telegram, Slack ou Discord, controle de acesso multiusuário</li>
  <li><strong>Uso agêntico de ferramentas</strong> — raciocínio autônomo em múltiplas etapas com até 10 iterações</li>
  <li><strong>Integração MCP</strong> — estenda com qualquer servidor Model Context Protocol</li>
  <li><strong>Memória persistente</strong> — histórico com SQLite e busca semântica via embeddings</li>
  <li><strong>Roteamento multi-modelo</strong> — seleção automática de camadas Fast/Primary/Smart</li>
  <li><strong>Gatilhos por e-mail</strong> — monitoramento IMAP IDLE para notificações de caixa de entrada</li>
  <li><strong>Aprovação de comandos</strong> — aprovação interativa pelo Telegram para comandos do terminal</li>
  <li><strong>Sistema de skills</strong> — aprimoramento dinâmico de prompts via arquivos markdown</li>
  <li><strong>Auto-manutenção</strong> — lê, atualiza, valida e restaura sua própria configuração</li>
  <li><strong>Automação de navegador</strong> — Chrome com sessões de login persistentes, capturas de tela e preenchimento de formulários</li>
  <li><strong>Pesquisa na web</strong> — busca web integrada (DuckDuckGo/Brave) e obtenção de URLs</li>
  <li><strong>Criação de sub-agentes</strong> — delegação recursiva de agentes para tarefas complexas</li>
  <li><strong>Delegação de agentes CLI</strong> — delegue para Claude, Gemini, Codex, Aider, etc.</li>
  <li><strong>Tarefas agendadas</strong> — tarefas recorrentes estilo cron com análise em linguagem natural</li>
  <li><strong>Transferência de arquivos</strong> — envie e receba arquivos via Telegram com segurança de caminho</li>
  <li><strong>Gerenciamento de segredos</strong> — suporte a chaveiro do SO e variáveis de ambiente</li>
  <li><strong>Rastreamento de custos de tokens</strong> — estatísticas de uso por modelo, orçamentos diários, comando /cost</li>
  <li><strong>Event sourcing</strong> — log de eventos imutável com consolidação diária em fatos e procedimentos</li>
  <li><strong>Objetivos + tarefas</strong> — divide trabalho maior em tarefas e mantém o progresso</li>
  <li><strong>Monitoramento de saúde</strong> — probes HTTP, TCP, de comando e de arquivo com alertas</li>
  <li><strong>Skills dinâmicas</strong> — instale de registros ou promova automaticamente procedimentos repetidos</li>
  <li><strong>Auto-atualizador</strong> — atualização automática via releases do GitHub com modos configuráveis</li>
  <li><strong>Integração Discord</strong> — comandos slash, botões de aprovação interativos, suporte multi-bot</li>
  <li><strong>Avaliação de risco de comandos</strong> — pontuação de risco em 4 níveis (Safe/Medium/High/Critical) para comandos do terminal</li>
  <li><strong>Inteligência de pessoas</strong> — um livro de contatos pessoal que lembra aniversários, preferências e relacionamentos para você</li>
</ul>

<h2>Visão Geral da Arquitetura</h2>
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

<h2>Links Rápidos</h2>
<ul>
  <li><a href="/getting-started">Primeiros Passos</a> — compile e execute o aidaemon</li>
  <li><a href="/configuration">Referência de Configuração</a> — documentação completa do config.toml</li>
  <li><a href="/tools">Ferramentas</a> — sistema de ferramentas integradas e extensíveis</li>
  <li><a href="/telegram">Telegram</a> — configuração do bot, comandos, fluxo de aprovação</li>
  <li><a href="/slack">Slack</a> — integração com workspace via Socket Mode</li>
  <li><a href="/discord">Discord</a> — configuração do bot, comandos slash, botões de aprovação</li>
  <li><a href="/event-sourcing">Event Sourcing</a> — eventos imutáveis e consolidação</li>
  <li><a href="/plans">Planos (Legacy)</a> — notas do sistema antigo de planos para instalações antigas</li>
  <li><a href="/health-monitoring">Monitoramento de Saúde</a> — probes de serviço e alertas</li>
</ul>
`
  },
  {
    slug: '/getting-started',
    section: 'Getting Started',
    title: 'Visão Geral',
    description: 'Compile o aidaemon a partir do código-fonte, execute o assistente de configuração e tenha seu agente de IA pessoal rodando em minutos.',
    content: () => `
<h1>Primeiros Passos</h1>
<p class="lead">Compile o aidaemon a partir do código-fonte, execute o assistente de configuração e tenha seu agente de IA pessoal rodando em minutos.</p>

<h2>Requisitos</h2>
<ul>
  <li><strong>Toolchain Rust</strong> — instale via <a href="https://rustup.rs" target="_blank" rel="noopener">rustup.rs</a></li>
  <li><strong>SQLite</strong> — normalmente pré-instalado no macOS/Linux</li>
  <li><strong>Token de bot do Telegram</strong> — crie via <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a></li>
  <li><strong>Chave de API de LLM</strong> — do Google AI Studio, OpenAI, Anthropic, OpenRouter, Moonshot, MiniMax, ou use o Ollama local</li>
</ul>

<h2>Etapas</h2>
<ol>
  <li><a href="/getting-started/build">Compilar a partir do código-fonte</a> — clone e compile</li>
  <li><a href="/getting-started/wizard">Assistente de primeira execução</a> — configuração interativa</li>
  <li><a href="/configuration">Configurar</a> — personalize o config.toml conforme necessário</li>
  <li><a href="/service-install">Instalar como serviço</a> — execute na inicialização com systemd/launchd</li>
</ol>
`
  },
  {
    slug: '/getting-started/build',
    section: 'Getting Started',
    title: 'Compilar a partir do Código-Fonte',
    description: 'Instale o aidaemon via Homebrew, cargo install, cargo binstall, ou compile a partir do código-fonte. Suporta Linux, macOS e Windows.',
    content: () => `
<h1>Instalação</h1>
<p class="lead">Instale via script de uma linha, Homebrew, Cargo, ou compile a partir do código-fonte.</p>

<h2>Instalação em Uma Linha (Recomendado)</h2>
<p>Funciona em qualquer VPS Linux ou máquina macOS. Baixa o binário mais recente e verifica o checksum SHA256:</p>
${codeBlock(`curl -sSfL https://get.aidaemon.ai | bash`, 'bash')}
${callout('success', 'Tudo Incluído', 'Binários pré-compilados incluem todas as integrações de canal (Telegram, Slack, Discord) e a ferramenta de navegador. Basta habilitar o que você precisa no <code>config.toml</code> &mdash; sem necessidade de compilação.')}

<h2>Instalação via Homebrew</h2>
<p>A maneira mais fácil de instalar no macOS ou Linux:</p>
${codeBlock(`brew install davo20019/tap/aidaemon`, 'bash')}

<h2>Instalação via Cargo</h2>
<p>Para desenvolvedores Rust. Nota: <code>cargo install</code> compila a partir do código-fonte apenas com recursos padrão (Telegram). Para incluir todos os canais, adicione flags de recursos:</p>
${codeBlock(`cargo install aidaemon --features "browser,slack,discord"
# Or for pre-built binaries:
cargo binstall aidaemon`, 'bash')}

<h2>Clonar &amp; Compilar a partir do Código-Fonte</h2>
<p>Para contribuidores e desenvolvedores:</p>
${codeBlock(`git clone https://github.com/davo20019/aidaemon.git
cd aidaemon
cargo build --release --features "browser,slack,discord"`, 'bash')}

<p>O binário compilado estará em <code>./target/release/aidaemon</code>.</p>

<h2>Feature Flags (Apenas para Compilação a partir do Código-Fonte)</h2>
<p>Se você instalou via script de uma linha ou Homebrew, todos os recursos já estão incluídos. Essas flags são relevantes apenas ao compilar a partir do código-fonte:</p>

<h3>Browser</h3>
<p>Habilite a automação do Chrome com sessões de login persistentes:</p>
${codeBlock(`cargo build --release --features browser`, 'bash')}
<p>Após compilar, execute <code>aidaemon browser login</code> para abrir o Chrome e fazer login nos seus serviços. Veja a documentação da <a href="/tools/browser">Ferramenta Browser</a> para detalhes.</p>
${callout('info', 'Nota', 'Requer um navegador baseado em Chromium instalado no sistema (Chrome, Chromium, Brave ou Edge).')}

<h3>Slack</h3>
<p>Habilite a integração do canal Slack (Socket Mode):</p>
${codeBlock(`cargo build --release --features slack`, 'bash')}

<h3>Discord</h3>
<p>Habilite a integração do bot Discord:</p>
${codeBlock(`cargo build --release --features discord`, 'bash')}

<h3>Múltiplos Recursos</h3>
<p>Combine recursos conforme necessário:</p>
${codeBlock(`cargo build --release --features "browser,slack,discord"`, 'bash')}

<h2>Verificação</h2>
${codeBlock(`./target/release/aidaemon --help`, 'bash')}

<p>Se nenhum <code>config.toml</code> existir, executar o binário iniciará automaticamente o <a href="/getting-started/wizard">assistente de configuração</a>.</p>
`
  },
  {
    slug: '/getting-started/wizard',
    section: 'Getting Started',
    title: 'Assistente de Primeira Execução',
    description: 'Na primeira execução, o aidaemon roda um assistente de configuração interativo para configurar seu provedor de LLM e tokens de canal.',
    content: () => `
<h1>Assistente de Primeira Execução</h1>
<p class="lead">Na primeira execução (sem config.toml encontrado), o aidaemon roda um assistente de configuração interativo.</p>

<h2>Seleção de Provedor</h2>
<p>O assistente oferece estes presets:</p>

<table class="config-table">
<thead><tr><th>Provedor</th><th>URL Base</th><th>Modelos Padrão</th></tr></thead>
<tbody>
<tr><td><strong>Google AI Studio (Nativo)</strong></td><td>API Nativa</td><td>gemini-3-flash-preview / gemini-2.5-flash-lite / gemini-3-pro-preview</td></tr>
<tr><td>OpenAI</td><td><code>https://api.openai.com/v1</code></td><td>gpt-4o / gpt-4o-mini / gpt-4o</td></tr>
<tr><td>Anthropic (Nativo)</td><td>API Nativa</td><td>claude-sonnet-4 / claude-haiku-4 / claude-opus-4</td></tr>
<tr><td>Anthropic (OpenRouter)</td><td><code>https://openrouter.ai/api/v1</code></td><td>anthropic/claude-* variantes</td></tr>
<tr><td>OpenRouter</td><td><code>https://openrouter.ai/api/v1</code></td><td>Provedores mistos</td></tr>
<tr><td>Moonshot AI (Kimi)</td><td><code>https://api.moonshot.ai/v1</code></td><td>kimi-k2.5 / kimi-k2.5 / kimi-k2-thinking</td></tr>
<tr><td>MiniMax</td><td><code>https://api.minimax.io/v1</code></td><td>MiniMax-M2.5 / MiniMax-M2.5-highspeed / MiniMax-M2.5</td></tr>
<tr><td>Cloudflare AI Gateway</td><td><code>https://gateway.ai.cloudflare.com/v1/&lt;ACCOUNT_ID&gt;/&lt;GATEWAY_ID&gt;/compat</code></td><td>Depende do provedor (por exemplo: gpt-4o-mini / gpt-4o-mini / gpt-4o)</td></tr>
<tr><td>Ollama (local)</td><td><code>http://localhost:11434/v1</code></td><td>Descoberto automaticamente da instância local</td></tr>
<tr><td>Personalizado</td><td>Especificado pelo usuário</td><td>Especificado pelo usuário</td></tr>
</tbody>
</table>

<h2>Etapas do Assistente</h2>
<ol>
  <li><strong>Selecionar provedor</strong> — escolha entre presets ou insira personalizado</li>
  <li><strong>Inserir chave de API</strong> — ignorado para Ollama (sem autenticação necessária)</li>
  <li><strong>Token de gateway opcional</strong> — o preset da Cloudflare pode adicionar <code>cf-aig-authorization</code> para o modo Authenticated Gateway</li>
  <li><strong>Seleção de modelo</strong> — preenchido automaticamente do preset, ou descoberto automaticamente para Ollama</li>
  <li><strong>Configuração do Telegram</strong> — insira o token do bot e seu ID numérico de usuário</li>
  <li><strong>Configuração do navegador</strong> (se compilado com o recurso <code>browser</code>) — detecta perfis do Chrome automaticamente</li>
  <li><strong>Gerar config.toml</strong> — gravado no diretório atual</li>
</ol>

${callout('info', 'Descoberta Automática do Ollama', 'Ao selecionar Ollama, o assistente consulta <code>http://localhost:11434/api/tags</code> para listar todos os modelos disponíveis localmente e permite que você escolha.')}

<h2>Detecção de Perfil do Chrome</h2>
<p>O assistente detecta automaticamente perfis do Chrome/Chromium para reutilização de sessão do navegador:</p>
<ul>
  <li><strong>macOS:</strong> <code>~/Library/Application Support/Google/Chrome</code></li>
  <li><strong>Linux:</strong> <code>~/.config/google-chrome</code> ou <code>~/.config/chromium</code></li>
</ul>
<p>Reutilizar um perfil herda cookies e sessões, para que o agente possa acessar sites autenticados.</p>
`
  },
  {
    slug: '/configuration',
    section: 'Configuration',
    title: 'Referência Completa do config.toml',
    description: 'Referência completa do config.toml para o aidaemon. Todas as seções de configuração, chaves, tipos e valores padrão.',
    content: () => `
<h1>Configuração</h1>
<p class="lead">Referência completa do <code>config.toml</code>. Todas as seções e seus valores padrão.</p>

<h2>[provider]</h2>
${configTable([
  ['kind', 'string', '"google_genai"', 'Tipo de provedor: <code>google_genai</code>, <code>openai_compatible</code> ou <code>anthropic</code>'],
  ['api_key', 'string', '—', 'Chave de API do provedor (obrigatório)'],
  ['gateway_token', 'string', 'null', 'Token opcional do Cloudflare AI Gateway enviado como <code>cf-aig-authorization</code>'],
  ['base_url', 'string', '—', 'URL base da API (obrigatório para <code>openai_compatible</code>, não usado para provedores nativos)'],
])}

<h2>[provider.models]</h2>
${configTable([
  ['primary', 'string', '(provider default)', 'Modelo padrão para consultas gerais'],
  ['fast', 'string', '(same as primary)', 'Modelo para consultas simples/rápidas'],
  ['smart', 'string', '(same as primary)', 'Modelo para tarefas de raciocínio complexo'],
])}

${callout('info', 'Padrões de Modelo', 'Padrões cientes do provedor: <strong>google_genai</strong> → primary=gemini-3-flash-preview, fast=gemini-2.5-flash-lite, smart=gemini-3-pro-preview. <strong>openai_compatible</strong> → todas as camadas padrão para openai/gpt-4o. <strong>anthropic</strong> → todas as camadas padrão para claude-sonnet-4-20250514. Quando todas as três camadas resolvem para o mesmo modelo, o roteamento automático é desabilitado. Veja <a href="/router">Roteamento de Modelos</a>.')}

<h2>[telegram]</h2>
${configTable([
  ['bot_token', 'string', '—', 'Token do bot Telegram do @BotFather (obrigatório)'],
  ['allowed_user_ids', 'array', '[]', 'IDs numéricos de usuários do Telegram permitidos para conversar. Vazio = sem restrição.'],
])}

<h2>[slack]</h2>
<p>Requer a feature flag <code>slack</code> no momento da compilação. Veja <a href="/slack">Slack</a> para o guia completo de configuração.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Habilitar o canal Slack'],
  ['app_token', 'string', '—', 'Token de Nível de App do Slack para Socket Mode (<code>xapp-...</code>)'],
  ['bot_token', 'string', '—', 'Token de Bot do Slack para Web API (<code>xoxb-...</code>)'],
  ['allowed_user_ids', 'array', '[]', 'IDs de usuários do Slack permitidos para interagir. Vazio = sem restrição.'],
  ['use_threads', 'bool', 'true', 'Responder em threads por padrão'],
])}

<h2>[discord]</h2>
<p>Requer a feature flag <code>discord</code> no momento da compilação. Veja <a href="/discord">Discord</a> para o guia completo de configuração.</p>
${configTable([
  ['bot_token', 'string', '&mdash;', 'Token do bot Discord do Portal de Desenvolvedores'],
  ['allowed_user_ids', 'array', '[]', 'IDs de usuários do Discord permitidos para interagir. Vazio = sem restrição.'],
  ['guild_id', 'integer', 'null', 'ID opcional de guild/servidor para restringir o bot a um único servidor'],
])}

<h2>[state]</h2>
${configTable([
  ['db_path', 'string', '"aidaemon.db"', 'Caminho para o arquivo de banco de dados SQLite'],
  ['working_memory_cap', 'integer', '50', 'Máximo de mensagens por sessão mantidas na memória'],
  ['consolidation_interval_hours', 'integer', '6', 'Horas entre execuções de consolidação de memória'],
  ['max_facts', 'integer', '100', 'Número máximo de fatos injetados no prompt do sistema'],
  ['daily_token_budget', 'integer', 'null', 'Máximo de tokens totais (entrada+saída) por dia. Null = ilimitado. Reseta à meia-noite UTC.'],
  ['encryption_key', 'string', 'null', 'Chave de criptografia SQLCipher (requer recurso <code>encryption</code>). AES-256 em repouso.'],
])}

<h2>[terminal]</h2>
${configTable([
  ['allowed_prefixes', 'array', '(see below)', 'Prefixos de comando aprovados automaticamente sem confirmação do usuário'],
  ['initial_timeout_secs', 'integer', '30', 'Timeout em segundos para execução inicial do comando'],
  ['max_output_chars', 'integer', '4000', 'Truncar saída do comando além deste comprimento'],
  ['permission_mode', 'string', '"default"', 'Modo de permissão de risco: <code>default</code>, <code>cautious</code> ou <code>yolo</code>. Veja <a href="/tools/command-risk">Risco de Comando</a>.'],
])}

<p>Prefixos permitidos padrão:</p>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

${callout('warn', 'Operadores Shell', 'Comandos contendo <code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code> <code>$()</code> ou crases <strong>sempre</strong> requerem aprovação, mesmo que o prefixo esteja na lista permitida.')}

<h2>[daemon]</h2>
${configTable([
  ['health_port', 'integer', '8080', 'Porta para o endpoint HTTP de verificação de saúde'],
  ['health_bind', 'string', '"127.0.0.1"', 'Endereço de bind. Use "0.0.0.0" para acesso externo.'],
])}

<h2>[triggers.email]</h2>
${configTable([
  ['host', 'string', '—', 'Hostname do servidor IMAP (ex.: imap.gmail.com)'],
  ['port', 'integer', '—', 'Porta IMAP (tipicamente 993 para TLS)'],
  ['username', 'string', '—', 'Nome de usuário da conta de e-mail'],
  ['password', 'string', '—', 'Senha da conta de e-mail ou senha específica de aplicativo'],
  ['folder', 'string', '"INBOX"', 'Pasta IMAP para monitorar'],
])}

<h2>[mcp.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Caminho ou nome do executável para o servidor MCP'],
  ['args', 'array', '[]', 'Argumentos de linha de comando'],
])}

<h2>[browser]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Habilitar ferramenta de automação de navegador'],
  ['headless', 'bool', 'true', 'Executar Chrome sem janela visível'],
  ['screenshot_width', 'integer', '1280', 'Largura do viewport do navegador em pixels'],
  ['screenshot_height', 'integer', '720', 'Altura do viewport do navegador em pixels'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Diretório do perfil Chrome para sessões persistentes'],
  ['profile', 'string', 'Default', 'Nome do perfil Chrome dentro do user_data_dir'],
  ['remote_debugging_port', 'integer', 'null', 'Conectar ao Chrome existente nesta porta (avançado)'],
])}

<h2>[skills]</h2>
${configTable([
  ['dir', 'string', '"skills"', 'Diretório contendo arquivos markdown de skills'],
  ['enabled', 'bool', 'true', 'Habilitar o sistema de skills'],
  ['registries', 'array', '[]', 'URLs de manifestos JSON de registro de skills para navegação/instalação de skills'],
])}

<h2>[subagents]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Permitir que o agente crie sub-agentes'],
  ['max_depth', 'integer', '3', 'Nível máximo de aninhamento para recursão de sub-agentes'],
  ['max_iterations', 'integer', '10', 'Máximo de passos do loop agêntico por invocação de sub-agente'],
  ['max_response_chars', 'integer', '8000', 'Truncar respostas de sub-agentes além deste comprimento'],
  ['timeout_secs', 'integer', '300', 'Timeout de execução de sub-agente em segundos'],
])}

<h2>[cli_agents]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Habilitar ferramenta de delegação de agente CLI'],
  ['timeout_secs', 'integer', '600', 'Timeout global para execução de agente CLI'],
  ['max_output_chars', 'integer', '16000', 'Comprimento máximo global de saída dos agentes CLI'],
])}

<h2>[cli_agents.tools.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Comando a executar'],
  ['args', 'array', '[]', 'Argumentos padrão passados ao comando'],
  ['description', 'string', '—', 'Descrição da ferramenta mostrada ao LLM'],
  ['timeout_secs', 'integer', 'null', 'Sobrescrever timeout global para esta ferramenta'],
  ['max_output_chars', 'integer', 'null', 'Sobrescrever saída máxima global para esta ferramenta'],
])}

<h2>[search]</h2>
${configTable([
  ['backend', 'string', '"duckduckgo"', 'Backend de busca: <code>duckduckgo</code> (sem chave necessária) ou <code>brave</code>'],
  ['api_key', 'string', '""', 'Chave de API para busca Brave (suporta <code>"keychain"</code>)'],
])}

<h2>[scheduler]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Habilitar o sistema de tarefas agendadas'],
  ['tick_interval_secs', 'integer', '30', 'Frequência com que o agendador verifica tarefas pendentes'],
])}

<h2>[[scheduler.tasks]]</h2>
<p>Tarefas agendadas pré-definidas carregadas da configuração na inicialização:</p>
${configTable([
  ['name', 'string', '—', 'Rótulo legível da tarefa'],
  ['schedule', 'string', '—', 'Linguagem natural ou expressão cron (veja <a href="/scheduler">Agendador</a>)'],
  ['prompt', 'string', '—', 'O que o agente deve fazer quando a tarefa disparar'],
  ['oneshot', 'bool', 'false', 'Disparar uma vez e depois auto-excluir'],
  ['trusted', 'bool', 'false', 'Executar com autonomia total (sem aprovação de terminal necessária)'],
])}

<h2>[files]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Habilitar ferramentas de transferência de arquivo (envio/recebimento)'],
  ['inbox_dir', 'string', '"~/.aidaemon/files/inbox"', 'Diretório para arquivos recebidos do Telegram'],
  ['outbox_dirs', 'array', '["~"]', 'Diretórios dos quais o agente tem permissão para enviar arquivos'],
  ['max_file_size_mb', 'integer', '10', 'Tamanho máximo de arquivo para transferências em MB'],
  ['retention_hours', 'integer', '24', 'Horas para reter arquivos recebidos antes da limpeza'],
])}

<h2>Gerenciamento de Segredos</h2>
<p>Valores sensíveis de configuração suportam dois métodos de resolução além de texto simples:</p>

<h3>Chaveiro do SO</h3>
<p>Defina qualquer campo secreto como <code>"keychain"</code> para resolvê-lo a partir do chaveiro do SO (macOS Keychain, Linux secret-service):</p>
${codeBlock(`[provider]
api_key = "keychain"    # Resolved from keychain entry "api_key"

[telegram]
bot_token = "keychain"  # Resolved from keychain entry "bot_token"`, 'toml')}

<p>Armazene valores com o comando CLI <code>keychain</code> antes da primeira execução:</p>
${codeBlock(`# Store a secret (prompts interactively)
aidaemon keychain set api_key
aidaemon keychain set bot_token

# Verify a stored secret (shows masked value)
aidaemon keychain get api_key

# Remove a secret
aidaemon keychain delete api_key`, 'bash')}

${callout('tip', 'Segurança', 'O comando <code>set</code> solicita o valor interativamente com confirmação, mantendo segredos fora do histórico do seu shell.')}

<h3>Variáveis de Ambiente</h3>
<p>Use a sintaxe <code>\${VAR_NAME}</code> em qualquer lugar nos valores de configuração:</p>
${codeBlock(`[provider]
api_key = "\${GOOGLE_API_KEY}"

[telegram]
bot_token = "\${TELEGRAM_BOT_TOKEN}"`, 'toml')}

${callout('info', 'Campos de Chaveiro Suportados', 'Campos que suportam <code>"keychain"</code>: <code>provider.api_key</code>, <code>provider.gateway_token</code>, <code>telegram.bot_token</code>, <code>slack.app_token</code>, <code>slack.bot_token</code>, <code>discord.bot_token</code>, <code>triggers.email.password</code>, <code>state.encryption_key</code>, <code>search.api_key</code> e campos de perfil <code>http_auth.*</code>.')}

<h2>[health]</h2>
<p>Sistema de monitoramento de saúde. Veja <a href="/health-monitoring">Monitoramento de Saúde</a>.</p>
${configTable([
  ['enabled', 'bool', 'true', 'Habilitar o sistema de monitoramento de saúde'],
  ['tick_interval_secs', 'integer', '30', 'Frequência com que verificar probes pendentes'],
  ['result_retention_days', 'integer', '7', 'Dias para reter resultados de verificação de saúde'],
])}

<h2>[[health.probes]]</h2>
${configTable([
  ['name', 'string', '&mdash;', 'Nome do probe'],
  ['probe_type', 'string', '&mdash;', 'Tipo: http, command, file ou port'],
  ['target', 'string', '&mdash;', 'URL alvo, comando, caminho de arquivo ou host:port'],
  ['schedule', 'string', '&mdash;', 'Expressão cron ou intervalo'],
  ['consecutive_failures_alert', 'integer', '3', 'Alertar após N falhas consecutivas'],
  ['alert_session_ids', 'array', '[]', 'IDs de sessão para notificar em caso de alerta'],
])}

<h2>[updates]</h2>
<p>Sistema de auto-atualização. Veja <a href="/updates">Auto-Atualizador</a>.</p>
${configTable([
  ['mode', 'string', '"check_only"', 'Modo de atualização: enable, check_only ou disable'],
  ['check_interval_hours', 'integer', '24', 'Horas entre verificações de atualização'],
  ['check_at_utc_hour', 'integer', 'null', 'Hora UTC específica (0-23) para verificação diária'],
  ['confirmation_timeout_mins', 'integer', '60', 'Minutos para aguardar aprovação do usuário'],
])}

<h2>[people]</h2>
<p>Inteligência de Pessoas — um livro de contatos pessoal gerenciado pelo seu assistente. Veja <a href="/tools/people">Inteligência de Pessoas</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Estado inicial para inteligência de pessoas (pode ser alternado em tempo de execução via chat)'],
  ['auto_extract', 'bool', 'true', 'Aprender automaticamente fatos sobre pessoas a partir de conversas'],
  ['auto_extract_categories', 'string[]', '["birthday", "preference", "interest", "work", "family", "important_date"]', 'Categorias de fatos que podem ser extraídas automaticamente'],
  ['restricted_categories', 'string[]', '["health", "finance", "political", "religious"]', 'Categorias que nunca são extraídas automaticamente'],
  ['fact_retention_days', 'integer', '180', 'Dias antes que fatos auto-extraídos não confirmados sejam removidos'],
  ['reconnect_reminder_days', 'integer', '30', 'Dias de inatividade antes de sugerir uma reconexão'],
])}

<h2>Exemplo de Configuração</h2>
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
    title: 'Configuração de Provedor',
    description: 'Configure provedores de LLM para o aidaemon: compatíveis com OpenAI, Anthropic nativo ou backends Google Generative AI.',
    content: () => `
<h1>Configuração de Provedor</h1>
<p class="lead">aidaemon suporta três tipos de provedor, todos configurados na seção <code>[provider]</code>.</p>

<h2>Tipos de Provedor</h2>

<h3>google_genai (recomendado)</h3>
<p>API nativa do Google Generative AI. O provedor recomendado — modelos Gemini oferecem excelentes capacidades de uso de ferramentas, tempos de resposta rápidos e acesso generoso ao nível gratuito da API via <a href="https://aistudio.google.com/" target="_blank" rel="noopener">Google AI Studio</a>.</p>
${codeBlock(`[provider]
kind = "google_genai"
api_key = "AIza..."

[provider.models]
primary = "gemini-3-flash-preview"
fast = "gemini-2.5-flash-lite"
smart = "gemini-3-pro-preview"`, 'toml')}

${callout('info', 'Configuração Recomendada', 'O Google AI Studio fornece uma chave de API gratuita com limites de taxa generosos. Modelos Gemini têm suporte nativo a chamadas de ferramentas, web grounding e funcionam bem com o loop agêntico do aidaemon.')}

<h3>Gemini Web Grounding</h3>
<p>Ao usar <code>google_genai</code>, o aidaemon habilita automaticamente o grounding do Google Search. Isso permite que modelos Gemini pesquisem na web como parte de suas respostas. Modelos que não suportam grounding com chamadas de função são detectados automaticamente e fazem fallback graciosamente.</p>

<h3>openai_compatible</h3>
<p>Funciona com qualquer API que implemente o formato de chat completions do OpenAI. Isso inclui OpenAI, OpenRouter, Moonshot, MiniMax, Cloudflare AI Gateway, Ollama e muitos outros.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "sk-..."
base_url = "https://api.openai.com/v1"

[provider.models]
primary = "gpt-4o"
fast = "gpt-4o-mini"
smart = "o1-preview"`, 'toml')}

<h3>anthropic</h3>
<p>API nativa da Anthropic (formato Messages API). Use para acesso direto à Anthropic sem passar por um proxy compatível com OpenAI.</p>
${codeBlock(`[provider]
kind = "anthropic"
api_key = "sk-ant-..."

[provider.models]
primary = "claude-sonnet-4-20250514"
fast = "claude-haiku-4-20250414"
smart = "claude-opus-4-20250414"`, 'toml')}

<h2>OpenRouter</h2>
<p>OpenRouter fornece acesso a modelos de múltiplos provedores através de uma única chave de API e o formato compatível com OpenAI.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "sk-or-..."
base_url = "https://openrouter.ai/api/v1"

[provider.models]
primary = "anthropic/claude-sonnet-4"
fast = "anthropic/claude-haiku-4"
smart = "anthropic/claude-opus-4"`, 'toml')}

<h2>Moonshot AI (Kimi)</h2>
<p>Moonshot oferece modelos Kimi por meio de uma API compatível com OpenAI.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "YOUR_MOONSHOT_API_KEY"
base_url = "https://api.moonshot.ai/v1"

[provider.models]
primary = "kimi-k2.5"
fast = "kimi-k2.5"
smart = "kimi-k2-thinking"`, 'toml')}

<h2>MiniMax</h2>
<p>MiniMax oferece um endpoint compatível com OpenAI em <code>https://api.minimax.io/v1</code>.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "YOUR_MINIMAX_API_KEY"
base_url = "https://api.minimax.io/v1"

[provider.models]
primary = "MiniMax-M2.5"
fast = "MiniMax-M2.5-highspeed"
smart = "MiniMax-M2.5"`, 'toml')}

<h2>Cloudflare AI Gateway</h2>
<p>Cloudflare AI Gateway fica na frente dos provedores upstream e expõe um endpoint compatível com OpenAI. Use isso para logs centralizados, cache, controles ou limites de taxa entre vários provedores.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "sk-..." # Chave do provedor upstream
gateway_token = "cf-gw-..." # Opcional: modo Authenticated Gateway
base_url = "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/compat"

[provider.models]
primary = "gpt-4o-mini"
fast = "gpt-4o-mini"
smart = "gpt-4o"`, 'toml')}

${callout('info', 'Modos de Autenticacao da Cloudflare', 'Voce pode operar apenas com <code>api_key</code> (modo basico), ou adicionar <code>gateway_token</code> para enviar <code>cf-aig-authorization</code> no modo Authenticated Gateway.')}

<h2>Ollama (Local)</h2>
<p>Execute modelos localmente com Ollama. Nenhuma chave de API necessária.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "ollama"
base_url = "http://localhost:11434/v1"

[provider.models]
primary = "llama3.1"
fast = "llama3.1"
smart = "llama3.1"`, 'toml')}

${callout('info', 'Descoberta do Ollama', 'O assistente de configuração descobre automaticamente os modelos Ollama disponíveis consultando <code>http://localhost:11434/api/tags</code>.')}

<h2>llama.cpp (Local)</h2>
<p>Voce tambem pode usar o aidaemon com <code>llama.cpp</code> via <code>llama-server</code> em modo compativel com OpenAI.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "llama" # Qualquer valor se seu servidor local nao exigir auth
base_url = "http://127.0.0.1:8080/v1"

[provider.models]
primary = "seu-modelo-id"
fast = "seu-modelo-id"
smart = "seu-modelo-id"`, 'toml')}

${callout('warn', 'Requisitos do llama.cpp', '<code>/v1/chat/completions</code> e obrigatorio. <code>/v1/models</code> e altamente recomendado para o comando <code>/models</code> funcionar. Por seguranca, o aidaemon so permite HTTP para enderecos localhost.')}
`
  },
  {
    slug: '/telegram',
    section: 'Telegram',
    title: 'Configuração do Bot',
    description: 'Configure o aidaemon como um bot do Telegram. Crie um bot via BotFather, configure tokens e habilite mensagens.',
    content: () => `
<h1>Configuração do Bot Telegram</h1>
<p class="lead">O Telegram é o canal principal do aidaemon, construído sobre o framework teloxide. Veja também <a href="/slack">Slack</a> para integração com workspace.</p>

<h2>Criar um Bot</h2>
<ol>
  <li>Envie uma mensagem para <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a> no Telegram</li>
  <li>Envie <code>/newbot</code> e siga as instruções</li>
  <li>Copie o token do bot (formato: <code>123456789:ABCdefGHIjklMNOpqrSTUvwxYZ</code>)</li>
</ol>

<h2>Obter Seu ID de Usuário</h2>
<p>Seu ID numérico de usuário do Telegram é necessário para a lista <code>allowed_user_ids</code>. Você pode encontrá-lo enviando uma mensagem para <a href="https://t.me/userinfobot" target="_blank" rel="noopener">@userinfobot</a>.</p>

<h2>Configuração</h2>
${codeBlock(`[telegram]
bot_token = "123456789:ABCdefGHIjklMNOpqrSTUvwxYZ"
allowed_user_ids = [123456789]`, 'toml', 'config.toml')}

${callout('warn', 'Controle de Acesso', 'Se <code>allowed_user_ids</code> estiver vazio, <strong>qualquer pessoa</strong> que encontrar seu bot pode conversar com ele. Sempre defina isso em produção.')}

<h2>Funcionalidades</h2>
<ul>
  <li><strong>Indicador de digitação</strong> — enviado a cada 4 segundos durante o processamento do agente</li>
  <li><strong>Renderização Markdown</strong> — respostas do agente são convertidas para HTML do Telegram</li>
  <li><strong>Divisão de mensagens longas</strong> — respostas acima de 4096 caracteres são divididas em limites de parágrafo/linha</li>
  <li><strong>Compartilhamento de capturas de tela</strong> — capturas de tela do navegador enviadas como fotos com legendas</li>
  <li><strong>Transferência de arquivos</strong> — envie e receba documentos, fotos, áudio e vídeo via Telegram</li>
  <li><strong>Status de tarefas em tempo real</strong> — <code>/tasks</code> mostra tarefas do agente em execução com tempo decorrido</li>
  <li><strong>Botões de aprovação inline</strong> — botões Allow Once / Allow Always / Deny para aprovação de comandos</li>
  <li><strong>Suporte multi-bot</strong> — configure múltiplos bots do Telegram via <code>[[telegram.bots]]</code></li>
  <li><strong>Tratamento aprimorado de arquivos</strong> — detecção de tipo MIME, limites de tamanho e validação de segurança de caminho</li>
</ul>

<h2>Comportamento de Retry</h2>
<p>O dispatcher do Telegram usa backoff exponencial em caso de falhas:</p>
<ul>
  <li>Backoff inicial: 5s</li>
  <li>Dobra a cada falha: 5s → 10s → 20s → 40s → 60s (máximo)</li>
  <li>Reseta para 5s se o bot rodar estável por mais de 60 segundos</li>
</ul>
`
  },
  {
    slug: '/telegram/commands',
    section: 'Telegram',
    title: 'Comandos',
    description: 'Comandos slash integrados do Telegram para o aidaemon: /model, /clear, /cost, /status, /help e mais.',
    content: () => `
<h1>Comandos do Telegram</h1>
<p class="lead">Comandos slash integrados para controlar o agente a partir do Telegram.</p>

<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Mostrar o modelo ativo atual</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Mudar para um modelo específico (desabilita roteamento automático)</td></tr>
<tr><td><code>/models</code></td><td>Listar todos os modelos disponíveis do provedor (modelo ativo marcado)</td></tr>
<tr><td><code>/auto</code></td><td>Reabilitar roteamento automático de modelos baseado na complexidade da consulta</td></tr>
<tr><td><code>/reload</code></td><td>Recarregar config.toml (com restauração automática de backup se inválido)</td></tr>
<tr><td><code>/restart</code></td><td>Reinicialização completa — executa novo processo (aplica novo binário, configuração, servidores MCP)</td></tr>
<tr><td><code>/cost</code></td><td>Mostrar estatísticas de uso de tokens (últimas 24h, 7d, modelos mais usados)</td></tr>
<tr><td><code>/tasks</code></td><td>Listar tarefas do agente em execução e recentes para sua sessão</td></tr>
<tr><td><code>/cancel &lt;id&gt;</code></td><td>Cancelar uma tarefa em execução por ID</td></tr>
<tr><td><code>/help</code></td><td>Mostrar lista de comandos disponíveis</td></tr>
<tr><td><code>/start</code></td><td>Mesmo que /help</td></tr>
</tbody>
</table>

<h2>Troca de Modelo</h2>
${codeBlock(`/model claude-3.5-sonnet
# Switches to claude-3.5-sonnet and disables auto-routing

/auto
# Re-enables automatic Fast/Primary/Smart routing`, 'text')}

${callout('info', 'Sobrescrita de Modelo', 'Quando você define manualmente um modelo com <code>/model</code>, o roteamento automático é desabilitado até que você envie <code>/auto</code>.')}

<h2>Recarga de Configuração</h2>
<p>O comando <code>/reload</code> recarrega o <code>config.toml</code> em tempo de execução. Se a configuração for inválida, o aidaemon restaura automaticamente a partir do backup:</p>
<ol>
  <li><code>.toml.lastgood</code> — última configuração que completou com sucesso uma chamada LLM</li>
  <li><code>.toml.bak</code> → <code>.toml.bak.1</code> → <code>.toml.bak.2</code> — rotação de 3 níveis</li>
</ol>
`
  },
  {
    slug: '/telegram/approval',
    section: 'Telegram',
    title: 'Fluxo de Aprovação',
    description: 'Aprovação interativa por teclado inline para comandos de terminal restritos no Telegram.',
    content: () => `
<h1>Fluxo de Aprovação de Comandos</h1>
<p class="lead">Aprovação interativa por teclado inline para comandos de terminal restritos.</p>

<h2>Como Funciona</h2>
<ol>
  <li>O agente solicita um comando de terminal que não está na lista de prefixos permitidos (ou contém operadores shell)</li>
  <li>Uma solicitação de aprovação é enviada ao primeiro usuário em <code>allowed_user_ids</code></li>
  <li>O usuário vê um teclado inline com três botões:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Comando requer aprovação:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow Once</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Allow Always</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Opções de Aprovação</h2>
<table class="config-table">
<thead><tr><th>Opção</th><th>Comportamento</th></tr></thead>
<tbody>
<tr><td><strong>Allow Once</strong></td><td>Executar o comando apenas desta vez</td></tr>
<tr><td><strong>Allow Always</strong></td><td>Executar e adicionar o prefixo do comando a <code>terminal.allowed_prefixes</code> no config.toml</td></tr>
<tr><td><strong>Deny</strong></td><td>Rejeitar o comando — o agente recebe uma mensagem de negação</td></tr>
</tbody>
</table>

${callout('warn', 'Operadores Shell', 'Comandos contendo <code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code> <code>$()</code> ou crases <strong>sempre</strong> requerem aprovação, mesmo que o prefixo esteja na lista permitida. Isso previne ataques de injeção.')}

${callout('danger', 'Fontes Não Confiáveis', 'Sessões originadas de gatilhos (como e-mail) são marcadas como não confiáveis. Todos os comandos de terminal em sessões não confiáveis <strong>sempre</strong> requerem aprovação, independentemente dos prefixos permitidos.')}
`
  },
  {
    slug: '/slack',
    section: 'Slack',
    title: 'Configuração do Workspace',
    description: 'Conecte o aidaemon ao Slack via Socket Mode. Crie um app Slack, configure escopos OAuth e habilite mensagens em tempo real.',
    content: () => `
<h1>Integração Slack</h1>
<p class="lead">Conecte o aidaemon ao seu workspace Slack via Socket Mode para mensagens em tempo real.</p>

${callout('success', 'Binários Pré-compilados', 'Se você instalou via script de uma linha ou Homebrew, o suporte ao Slack já está incluído. Basta configurar o <code>config.toml</code> abaixo. A feature flag é necessária apenas ao <a href="/getting-started/build">compilar a partir do código-fonte</a>.')}

<h2>Criar um App Slack</h2>
<ol>
  <li>Acesse <a href="https://api.slack.com/apps" target="_blank" rel="noopener">api.slack.com/apps</a> e clique em <strong>Create New App</strong></li>
  <li>Escolha <strong>From scratch</strong>, nomeie (ex.: "aidaemon") e selecione seu workspace</li>
  <li>Em <strong>Socket Mode</strong>, habilite e gere um <strong>App-Level Token</strong> com o escopo <code>connections:write</code> &mdash; este é seu <code>app_token</code> (<code>xapp-...</code>)</li>
  <li>Em <strong>OAuth &amp; Permissions</strong>, adicione estes <strong>Bot Token Scopes</strong>:
    <ul>
      <li><code>channels:read</code> &mdash; listar membros em canais públicos</li>
      <li><code>chat:write</code> &mdash; enviar mensagens</li>
      <li><code>files:read</code> &mdash; baixar arquivos enviados por usuários</li>
      <li><code>files:write</code> &mdash; enviar arquivos para o Slack</li>
      <li><code>groups:read</code> &mdash; listar membros em canais privados (necessário para resolver nomes de usuário em canais privados)</li>
      <li><code>im:read</code> &mdash; ler metadados de DM (necessário para transferências de arquivo em mensagens diretas)</li>
      <li><code>reactions:write</code> &mdash; adicionar reações de status (ampulheta durante processamento)</li>
      <li><code>users:read</code> &mdash; resolver informações de usuário</li>
    </ul>
  </li>
  <li>Em <strong>Event Subscriptions</strong>, habilite eventos e inscreva-se em:
    <ul>
      <li><code>message.channels</code> &mdash; mensagens em canais públicos</li>
      <li><code>message.groups</code> &mdash; mensagens em canais privados</li>
      <li><code>message.im</code> &mdash; mensagens diretas</li>
    </ul>
  </li>
  <li>Em <strong>App Home</strong>, role até <strong>Show Tabs</strong> e habilite a <strong>Messages Tab</strong>. Marque <strong>"Allow users to send Slash commands and messages from the messages tab"</strong> &mdash; sem isso, os usuários não podem enviar DM ao bot.</li>
  <li>Instale o app no seu workspace &mdash; copie o <strong>Bot User OAuth Token</strong> (<code>xoxb-...</code>)</li>
</ol>

<h2>Configuração</h2>
${codeBlock(`[slack]
enabled = true
app_token = "xapp-1-..."
bot_token = "xoxb-..."
allowed_user_ids = ["U123456789"]
use_threads = true`, 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'Habilitar o canal Slack'],
  ['app_token', 'string', '&mdash;', 'Token de Nível de App para Socket Mode (<code>xapp-...</code>). Suporta <code>"keychain"</code> e <code>$&#123;ENV&#125;</code>.'],
  ['bot_token', 'string', '&mdash;', 'Token OAuth de Usuário Bot (<code>xoxb-...</code>). Suporta <code>"keychain"</code> e <code>$&#123;ENV&#125;</code>.'],
  ['allowed_user_ids', 'array', '[]', 'IDs de usuários do Slack permitidos para interagir. Vazio = sem restrição.'],
  ['use_threads', 'bool', 'true', 'Responder em threads por padrão. Cada thread tem seu próprio contexto de sessão.'],
])}

<h2>Encontrar Seu ID de Usuário do Slack</h2>
<p>Clique no seu perfil no Slack, depois clique em <strong>More</strong> &rarr; <strong>Copy member ID</strong>. O formato é <code>U</code> seguido de caracteres alfanuméricos (ex.: <code>U0123ABCDEF</code>).</p>

<h2>Funcionalidades</h2>
<ul>
  <li><strong>Socket Mode</strong> &mdash; conexão WebSocket em tempo real, sem URL público necessário</li>
  <li><strong>Respostas em threads</strong> &mdash; conversas em threads configuráveis com contexto de sessão por thread</li>
  <li><strong>Transferência de arquivos</strong> &mdash; envie e receba arquivos pelo Slack</li>
  <li><strong>Aprovações Block Kit</strong> &mdash; botões interativos para aprovação de comandos de terminal</li>
  <li><strong>Comandos slash</strong> &mdash; mesmos comandos do Telegram (<code>/cost</code>, <code>/model</code>, <code>/tasks</code>, etc.)</li>
  <li><strong>Reações de status</strong> &mdash; emoji de ampulheta durante processamento, removido ao completar</li>
  <li><strong>Conversão Markdown</strong> &mdash; markdown padrão convertido automaticamente para formato mrkdwn do Slack</li>
  <li><strong>Fragmentação de mensagens</strong> &mdash; respostas longas divididas para respeitar o limite de 39KB do Slack</li>
  <li><strong>Reconexão automática</strong> &mdash; backoff exponencial em falha de conexão (5s &rarr; 60s máximo)</li>
</ul>

<h2>Modelo de Sessão</h2>
<p>Sessões do Slack são identificadas por canal e thread:</p>
<ul>
  <li><strong>Mensagem de canal:</strong> <code>slack:{channel_id}</code></li>
  <li><strong>Mensagem de thread:</strong> <code>slack:{channel_id}:{thread_ts}</code> (quando <code>use_threads</code> está habilitado)</li>
</ul>
<p>Cada sessão mantém seu próprio histórico de conversa, memória de trabalho e contexto de fatos.</p>

${callout('warn', 'Controle de Acesso', 'Se <code>allowed_user_ids</code> estiver vazio, <strong>qualquer pessoa</strong> no workspace que possa enviar mensagens ao bot pode interagir com ele. Sempre defina isso em produção.')}
`
  },
  {
    slug: '/slack/commands',
    section: 'Slack',
    title: 'Comandos',
    description: 'Comandos slash disponíveis para o aidaemon no Slack: /model, /clear, /cost, /status e mais.',
    content: () => `
<h1>Comandos do Slack</h1>
<p class="lead">Comandos slash disponíveis no Slack. O mesmo conjunto de comandos do Telegram.</p>

<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Mostrar o modelo ativo atual</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Mudar para um modelo específico (desabilita roteamento automático)</td></tr>
<tr><td><code>/models</code></td><td>Listar todos os modelos disponíveis do provedor (modelo ativo marcado)</td></tr>
<tr><td><code>/auto</code></td><td>Reabilitar roteamento automático de modelos baseado na complexidade da consulta</td></tr>
<tr><td><code>/reload</code></td><td>Recarregar config.toml (com restauração automática de backup se inválido)</td></tr>
<tr><td><code>/restart</code></td><td>Reinicialização completa &mdash; executa novo processo (aplica novo binário, configuração, servidores MCP)</td></tr>
<tr><td><code>/cost</code></td><td>Mostrar estatísticas de uso de tokens (últimas 24h, 7d, modelos mais usados)</td></tr>
<tr><td><code>/tasks</code></td><td>Listar tarefas do agente em execução e recentes para sua sessão</td></tr>
<tr><td><code>/cancel &lt;id&gt;</code></td><td>Cancelar uma tarefa em execução por ID</td></tr>
<tr><td><code>/help</code></td><td>Mostrar lista de comandos disponíveis</td></tr>
</tbody>
</table>

${callout('info', 'Slash vs. Texto Simples', 'No Slack, esses comandos são enviados como mensagens regulares começando com <code>/</code> em um DM ou canal com o bot. Eles não são registrados como comandos slash do Slack no manifesto do app.')}
`
  },
  {
    slug: '/slack/approval',
    section: 'Slack',
    title: 'Fluxo de Aprovação',
    description: 'Botões interativos do Block Kit para aprovar comandos restritos do terminal no Slack.',
    content: () => `
<h1>Fluxo de Aprovação do Slack</h1>
<p class="lead">Botões interativos do Block Kit para aprovar comandos restritos do terminal no Slack.</p>

<h2>Como Funciona</h2>
<ol>
  <li>O agente solicita um comando de terminal que não está na lista de prefixos permitidos (ou contém operadores de shell)</li>
  <li>Uma mensagem de aprovação é enviada ao canal/thread do Slack com botões do Block Kit</li>
  <li>O usuário vê três botões interativos:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Comando requer aprovação:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow Once</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Allow Always</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Opções de Aprovação</h2>
<table class="config-table">
<thead><tr><th>Opção</th><th>Comportamento</th></tr></thead>
<tbody>
<tr><td><strong>Allow Once</strong></td><td>Executar o comando apenas desta vez</td></tr>
<tr><td><strong>Allow Always</strong></td><td>Executar e persistir o prefixo do comando para auto-aprovação futura</td></tr>
<tr><td><strong>Deny</strong></td><td>Rejeitar o comando &mdash; o agente recebe mensagem de negação</td></tr>
</tbody>
</table>

<p>O fluxo de aprovação no Slack funciona de forma idêntica ao do Telegram. &ldquo;Allow Always&rdquo; persiste o prefixo no SQLite para que sobreviva a reinicializações do daemon.</p>

${callout('warn', 'Operadores de Shell', 'Comandos contendo <code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code> <code>$()</code> ou backticks <strong>sempre</strong> requerem aprovação, mesmo que o prefixo esteja na lista de permissões.')}
`
  },
{
    slug: '/discord',
    section: 'Discord',
    title: 'Configuração do Bot',
    description: 'Conecte o aidaemon ao Discord. Crie um aplicativo Discord, configure o bot e habilite slash commands.',
    content: () => `
<h1>Configuração do Bot Discord</h1>
<p class="lead">Conecte o aidaemon ao Discord via gateway API.</p>

${callout('success', 'Binários Pré-compilados', 'Se você instalou via script de uma linha ou Homebrew, o suporte ao Discord já está incluído. Basta configurar o <code>config.toml</code> abaixo. A feature flag só é necessária ao <a href="/getting-started/build">compilar a partir do código-fonte</a>.')}

<h2>Criar um Aplicativo Discord</h2>
<ol>
  <li>Acesse o <a href="https://discord.com/developers/applications" target="_blank" rel="noopener">Discord Developer Portal</a></li>
  <li>Clique em <strong>New Application</strong> e dê um nome (ex.: &ldquo;aidaemon&rdquo;)</li>
  <li>Em <strong>Bot</strong>, clique em <strong>Add Bot</strong></li>
  <li>Copie o <strong>Bot Token</strong> &mdash; este é o seu <code>bot_token</code></li>
  <li>Habilite estas <strong>Privileged Gateway Intents</strong>:
    <ul>
      <li><code>Message Content Intent</code> &mdash; ler texto das mensagens</li>
      <li><code>Server Members Intent</code> &mdash; resolver informações de usuários</li>
    </ul>
  </li>
  <li>Em <strong>OAuth2 &rarr; URL Generator</strong>, selecione os escopos <code>bot</code> e <code>applications.commands</code>, depois as permissões: Send Messages, Read Message History, Attach Files, Use Slash Commands</li>
  <li>Use a URL gerada para convidar o bot para o seu servidor</li>
</ol>

<h2>Configuração</h2>
${codeBlock(`[discord]
bot_token = "MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.AbCdEf.xxxxx"
allowed_user_ids = [123456789012345678]
guild_id = 987654321098765432`, 'toml', 'config.toml')}

${configTable([
  ['bot_token', 'string', '&mdash;', 'Token do bot Discord obtido no Developer Portal. Suporta <code>"keychain"</code>.'],
  ['allowed_user_ids', 'array', '[]', 'IDs de usuários Discord (inteiros snowflake) autorizados a interagir. Vazio = sem restrição.'],
  ['guild_id', 'integer', 'null', 'ID opcional do servidor/guild. Se definido, o bot só responde nesse servidor.'],
])}

<h2>Obter Seu ID de Usuário do Discord</h2>
<p>Habilite o <strong>Modo Desenvolvedor</strong> nas configurações do Discord (Aparência &rarr; Avançado), depois clique com o botão direito no seu nome de usuário e selecione <strong>Copiar ID do Usuário</strong>.</p>

<h2>Funcionalidades</h2>
<ul>
  <li><strong>Conexão via gateway</strong> &mdash; conexão WebSocket em tempo real via framework serenity</li>
  <li><strong>Slash commands</strong> &mdash; comandos de aplicativo registrados (veja <a href="/discord/commands">Comandos</a>)</li>
  <li><strong>Botões interativos</strong> &mdash; fluxo de aprovação com botões clicáveis (veja <a href="/discord/approval">Fluxo de Aprovação</a>)</li>
  <li><strong>Transferência de arquivos</strong> &mdash; enviar e receber arquivos como anexos do Discord</li>
  <li><strong>Divisão de mensagens</strong> &mdash; respostas longas são divididas para respeitar o limite de 2000 caracteres do Discord</li>
  <li><strong>Reconexão automática</strong> &mdash; backoff exponencial em falha de conexão (5s &rarr; 60s máx)</li>
  <li><strong>Lista de usuários permitidos</strong> &mdash; controle de acesso por token do bot</li>
  <li><strong>Suporte a múltiplos bots</strong> &mdash; execute vários bots Discord com configurações separadas</li>
</ul>

<h2>Modelo de Sessão</h2>
<p>As sessões do Discord são identificadas por canal:</p>
<ul>
  <li><strong>Mensagem no canal:</strong> <code>discord:{channel_id}</code></li>
</ul>
<p>Cada canal mantém seu próprio histórico de conversa, memória de trabalho e contexto de fatos.</p>

${callout('warn', 'Controle de Acesso', 'Se <code>allowed_user_ids</code> estiver vazio, <strong>qualquer pessoa</strong> que possa enviar mensagem ao bot pode interagir com ele. Sempre defina isso em produção.')}
`
  },
  {
    slug: '/discord/commands',
    section: 'Discord',
    title: 'Slash Commands',
    description: 'Comandos de aplicativo registrados no Discord para o aidaemon: /ask, /model, /clear, /status e mais.',
    content: () => `
<h1>Slash Commands do Discord</h1>
<p class="lead">Comandos de aplicativo registrados disponíveis no Discord. Acessíveis via <code>/</code> no campo de mensagem.</p>

<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>/ask &lt;message&gt;</code></td><td>Enviar uma mensagem ao agente</td></tr>
<tr><td><code>/model</code></td><td>Mostrar o modelo ativo atual</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Trocar para um modelo específico (desabilita roteamento automático)</td></tr>
<tr><td><code>/models</code></td><td>Listar todos os modelos disponíveis do provedor</td></tr>
<tr><td><code>/auto</code></td><td>Reabilitar roteamento automático de modelos</td></tr>
<tr><td><code>/clear</code></td><td>Limpar histórico de conversa da sessão</td></tr>
<tr><td><code>/cost</code></td><td>Mostrar estatísticas de uso de tokens</td></tr>
<tr><td><code>/tasks</code></td><td>Listar tarefas do agente em execução e recentes</td></tr>
<tr><td><code>/cancel &lt;id&gt;</code></td><td>Cancelar uma tarefa em execução por ID</td></tr>
<tr><td><code>/status</code></td><td>Mostrar status do daemon e tempo de atividade</td></tr>
<tr><td><code>/help</code></td><td>Mostrar lista de comandos disponíveis</td></tr>
</tbody>
</table>

<h2>Mensagens Regulares</h2>
<p>Além dos slash commands, os usuários também podem interagir mencionando o bot ou enviando mensagens diretas. O bot processa essas mensagens como mensagens de conversa regulares.</p>

${callout('info', 'Registro de Comandos', 'Os slash commands são registrados automaticamente no Discord quando o bot se conecta. Se você alterar o guild_id, os comandos serão re-registrados para o novo escopo.')}
`
  },
  {
    slug: '/discord/approval',
    section: 'Discord',
    title: 'Fluxo de Aprovação',
    description: 'Componentes de botões interativos para aprovar comandos restritos do terminal no Discord.',
    content: () => `
<h1>Fluxo de Aprovação do Discord</h1>
<p class="lead">Componentes de botões interativos para aprovar comandos restritos do terminal no Discord.</p>

<h2>Como Funciona</h2>
<ol>
  <li>O agente solicita um comando de terminal que não está na lista de prefixos permitidos (ou contém operadores de shell)</li>
  <li>Uma mensagem de aprovação é enviada ao canal do Discord com botões interativos</li>
  <li>O usuário vê três botões clicáveis:</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Comando requer aprovação:</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow Once</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Allow Always</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Opções de Aprovação</h2>
<table class="config-table">
<thead><tr><th>Opção</th><th>Comportamento</th></tr></thead>
<tbody>
<tr><td><strong>Allow Once</strong></td><td>Executar o comando apenas desta vez</td></tr>
<tr><td><strong>Allow Always</strong></td><td>Executar e persistir o prefixo do comando para auto-aprovação futura</td></tr>
<tr><td><strong>Deny</strong></td><td>Rejeitar o comando &mdash; o agente recebe mensagem de negação</td></tr>
</tbody>
</table>

<p>O fluxo de aprovação no Discord usa a API <code>ComponentInteraction</code> do serenity. &ldquo;Allow Always&rdquo; persiste o prefixo no SQLite para que sobreviva a reinicializações do daemon.</p>

${callout('info', 'Expiração dos Botões', 'Os tokens de interação do Discord expiram após 15 minutos. Se nenhuma resposta for recebida dentro desse período, a solicitação de aprovação expira e o comando é negado.')}
`
  },
    {
    slug: '/tools',
    section: 'Tools',
    title: 'Visão Geral das Ferramentas',
    description: 'Visão geral de todas as ferramentas integradas que o agente LLM aidaemon pode chamar: terminal, memória, navegador, busca web e mais.',
    content: () => `
<h1>Ferramentas</h1>
<p class="lead">O aidaemon fornece um conjunto de ferramentas integradas que o LLM pode chamar de forma autônoma durante o loop agêntico.</p>

<h2>Trait Tool</h2>
<p>Todas as ferramentas implementam a mesma interface:</p>
${codeBlock(`trait Tool {
    fn name(&self) -> &str;
    fn description(&self) -> &str;
    fn schema(&self) -> Value;       // OpenAI function-calling format
    async fn call(&self, args: &str) -> Result<String>;
}`, 'rust')}

<h2>Ferramentas Integradas</h2>
<table class="config-table">
<thead><tr><th>Ferramenta</th><th>Descrição</th><th>Config</th></tr></thead>
<tbody>
<tr><td><a href="/tools/terminal"><code>terminal</code></a></td><td>Executar comandos shell com fluxo de aprovação</td><td>[terminal]</td></tr>
<tr><td><a href="/tools/system-info"><code>system_info</code></a></td><td>Consultar hostname, SO, uptime, memória</td><td>Sempre habilitado</td></tr>
<tr><td><a href="/tools/memory"><code>remember_fact</code></a></td><td>Armazenar fatos de longo prazo no SQLite</td><td>Sempre habilitado</td></tr>
<tr><td><a href="/tools/config-manager"><code>manage_config</code></a></td><td>Ler/atualizar/restaurar config.toml</td><td>Sempre habilitado</td></tr>
<tr><td><a href="/tools/web-search"><code>web_search</code></a></td><td>Buscar na web (DuckDuckGo ou Brave)</td><td>[search]</td></tr>
<tr><td><a href="/tools/web-fetch"><code>web_fetch</code></a></td><td>Buscar e extrair conteúdo legível de URLs</td><td>Sempre habilitado</td></tr>
<tr><td><a href="/tools/browser"><code>browser</code></a></td><td>Automação Chrome com sessões de login persistentes</td><td>[browser] enabled=true</td></tr>
<tr><td><a href="/tools/send-file"><code>send_file</code></a></td><td>Enviar arquivos ao usuário via Telegram ou Slack</td><td>[files]</td></tr>
<tr><td><a href="/tools/sub-agents"><code>spawn_agent</code></a></td><td>Criar sub-agentes recursivos</td><td>[subagents]</td></tr>
<tr><td><a href="/tools/cli-agents"><code>cli_agent</code></a></td><td>Delegar para ferramentas CLI externas</td><td>[cli_agents]</td></tr>
<tr><td><a href="/scheduler"><code>scheduler</code></a></td><td>Criar, gerenciar e executar tarefas agendadas</td><td>[scheduler]</td></tr>
<tr><td><a href="/tools/command-risk"><code>command_risk</code></a></td><td>Avaliação de risco em 4 níveis para comandos do terminal</td><td>[terminal]</td></tr>
<tr><td><a href="/health-monitoring"><code>health_probe</code></a></td><td>Gerenciar e executar sondas de saúde</td><td>[health]</td></tr>
<tr><td><a href="/skills"><code>manage_skills</code></a></td><td>Adicionar, remover, navegar, instalar skills dinâmicas</td><td>[skills]</td></tr>
<tr><td><a href="/tools/people"><code>manage_people</code></a></td><td>Agenda de contatos pessoal com aniversários, preferências, relacionamentos</td><td>Sempre registrado</td></tr>
<tr><td><a href="/mcp">Ferramentas MCP</a></td><td>Descobertas dinamicamente via servidores MCP</td><td>[mcp.*]</td></tr>
</tbody>
</table>

${callout('info', 'Orçamento Dinâmico', 'O agente também possui uma pseudo-ferramenta integrada <code>request_more_iterations</code> que estende o orçamento do loop agêntico em 10 iterações (até um limite máximo) quando o orçamento atual é insuficiente para concluir uma tarefa.')}

<h2>Ordem de Registro das Ferramentas</h2>
<p>As ferramentas são registradas durante a inicialização nesta ordem:</p>
<ol>
  <li>SystemInfoTool</li>
  <li>TerminalTool (com canal de aprovação)</li>
  <li>RememberFactTool</li>
  <li>ConfigManagerTool</li>
  <li>WebFetchTool</li>
  <li>WebSearchTool</li>
  <li>BrowserTool (se habilitado)</li>
  <li>SendFileTool (se files.enabled)</li>
  <li>CliAgentTool (se habilitado)</li>
  <li>SchedulerTool (se scheduler.enabled)</li>
  <li>HealthProbeTool (se health.enabled)</li>
  <li>ManageSkillsTool</li>
  <li>ManagePeopleTool (sempre registrado, controlado internamente)</li>
  <li>Ferramentas MCP (se configuradas)</li>
</ol>
`
  },
  {
    slug: '/tools/terminal',
    section: 'Tools',
    title: 'Ferramenta Terminal',
    description: 'Execute comandos shell no sistema host via aidaemon. Os comandos são executados via sh -c com avaliação de risco.',
    content: () => `
<h1>Ferramenta Terminal</h1>
<p class="lead">Execute comandos shell no sistema host. Os comandos são executados via <code>sh -c</code>.</p>

<h2>Parâmetros</h2>
${configTable([
  ['command', 'string', '—', 'O comando shell a ser executado'],
  ['action', 'string', '"run"', 'Ação: run, check, kill ou trust_all'],
  ['pid', 'integer', '—', 'PID necessário para check/kill'],
])}

<h2>Lógica de Aprovação</h2>
<p>Um comando é auto-aprovado apenas se <strong>ambas</strong> as condições forem atendidas:</p>
<ol>
  <li>O comando começa com um prefixo em <code>terminal.allowed_prefixes</code></li>
  <li>O comando <strong>não</strong> contém nenhum operador de shell</li>
</ol>

<h3>Operadores de Shell (sempre requerem aprovação)</h3>
${codeBlock(`; | && || $() \` (backticks)`, 'text')}

<h3>Prefixos Permitidos Padrão</h3>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

<h2>Saída</h2>
<p>Retorna stdout primeiro, depois stderr (se houver). A saída é truncada em <code>terminal.max_output_chars</code> (padrão 4000 caracteres).</p>

<h2>Comandos em Segundo Plano (Novo)</h2>
<p>Se um comando passar do timeout inicial, ele vai para segundo plano e retorna um PID.</p>
<ul>
  <li>Use <code>action="check"</code> + <code>pid</code> para ver progresso/saída</li>
  <li>Use <code>action="kill"</code> + <code>pid</code> para interromper</li>
  <li>A saída final recente fica armazenada por um período curto para consultas posteriores</li>
</ul>

<h2>Bloqueios de Segurança Rígidos (Novo)</h2>
<p>Padrões destrutivos amplos agora são bloqueados antes do fluxo de aprovação, incluindo <code>rm -rf</code> e <code>find ... -delete</code> em caminhos sensíveis.</p>

<h2>Configuração</h2>
${codeBlock(`[terminal]
allowed_prefixes = ["ls", "cat", "head", "tail", "echo", "date"]
initial_timeout_secs = 30
max_output_chars = 4000
permission_mode = "default"`, 'toml', 'config.toml')}

<h2>Allow Always (Persistente)</h2>
<p>Quando o usuário clica em "Allow Always" no Telegram:</p>
<ol>
  <li>A primeira palavra do comando é extraída como o prefixo</li>
  <li>O prefixo é adicionado à lista de permitidos na memória</li>
  <li>O prefixo é persistido no SQLite (tabela <code>terminal_allowed_prefixes</code>)</li>
  <li>Na reinicialização, os prefixos persistidos são mesclados com os prefixos da configuração</li>
</ol>
<p>Isso significa que as aprovações "Allow Always" sobrevivem a reinicializações do daemon sem modificar o config.toml.</p>

${callout('danger', 'Sessões Não Confiáveis', 'Sessões originadas de gatilhos (e-mail, etc.) são marcadas como não confiáveis. <strong>Todos</strong> os comandos em sessões não confiáveis requerem aprovação, independentemente da lista de permissões.')}
`
  },
{
    slug: '/tools/command-risk',
    section: 'Tools',
    title: 'Avaliação de Risco de Comandos',
    description: 'Cada comando de terminal recebe uma pontuação com um sistema de risco em 4 níveis: Seguro, Médio, Alto e Crítico. Mais de 60 padrões.',
    content: () => `
<h1>Avaliação de Risco de Comandos</h1>
<p class="lead">Cada comando de terminal recebe uma pontuação com um sistema de risco em 4 níveis antes da execução.</p>

<h2>Níveis de Risco</h2>
<table class="config-table">
<thead><tr><th>Nível</th><th>Auto-Aprovado?</th><th>Exemplos</th></tr></thead>
<tbody>
<tr><td><strong>Safe</strong></td><td>Sim (se prefixo na lista de permissões)</td><td><code>ls</code>, <code>cat</code>, <code>date</code>, <code>echo</code></td></tr>
<tr><td><strong>Medium</strong></td><td>Após primeira aprovação</td><td><code>curl</code>, <code>git push</code>, <code>npm install</code></td></tr>
<tr><td><strong>High</strong></td><td>Após primeira aprovação</td><td><code>rm</code>, <code>mv</code>, <code>chmod</code>, <code>kill</code></td></tr>
<tr><td><strong>Critical</strong></td><td>Nunca persistido (padrão)</td><td><code>sudo rm -rf</code>, <code>dd</code>, <code>mkfs</code></td></tr>
</tbody>
</table>

<h2>Modos de Permissão</h2>
${configTable([
  ['default', '—', '—', 'Aprovações Safe/Medium/High persistem entre reinicializações. Critical é apenas por sessão.'],
  ['cautious', '—', '—', 'Todas as aprovações são apenas por sessão.'],
  ['yolo', '—', '—', 'Todas as aprovações persistem para sempre.'],
])}

<h2>Construções Perigosas</h2>
<p>Padrões que sempre elevam o risco:</p>
<ul>
  <li>Substituição de comando: <code>$(...)</code> e backticks</li>
  <li>Substituição de processo: <code>&gt;(...)</code>, <code>&lt;(...)</code></li>
  <li>Redirecionamento: <code>&gt;</code>, <code>&gt;&gt;</code></li>
  <li>Múltiplos comandos: <code>;</code>, <code>&amp;&amp;</code>, <code>||</code></li>
  <li>Pipes para shells ou <code>sudo</code></li>
</ul>

<h2>Detecção de Caminhos Sensíveis</h2>
<p>Comandos que referenciam esses arquivos são automaticamente elevados:</p>
<ul>
  <li><code>.env</code> &mdash; segredos de ambiente</li>
  <li>Chaves SSH: <code>id_rsa</code>, <code>id_ed25519</code></li>
  <li>Configs de nuvem: <code>.aws</code>, <code>.kube</code>, <code>.docker</code></li>
  <li>Autenticação do sistema: <code>shadow</code>, <code>passwd</code>, <code>sudoers</code></li>
  <li>Credenciais: <code>master.key</code>, <code>.netrc</code>, <code>.pgpass</code></li>
</ul>

<h2>Bloqueios Rígidos (Novo)</h2>
<p>Mesmo antes do fluxo de aprovação, padrões de exclusão amplos ou sensíveis são bloqueados, incluindo alvos arriscados com <code>rm -rf</code> e <code>find ... -delete</code>.</p>

${callout('info', 'Configuração', 'Defina <code>terminal.permission_mode</code> no config.toml. O padrão é <code>"default"</code>.')}
`
},
    {
    slug: '/tools/system-info',
    section: 'Tools',
    title: 'Ferramenta de Informações do Sistema',
    description: 'Consulte SO, hostname, arquitetura, CPU, memória, disco, uptime e informações de processos via ferramenta de informações do sistema.',
    content: () => `
<h1>Ferramenta de Informações do Sistema</h1>
<p class="lead">Consulte informações básicas do sistema. Sempre habilitada, sem parâmetros.</p>

<h2>Parâmetros</h2>
<p>Nenhum — esta ferramenta não aceita argumentos.</p>

<h2>Saída</h2>
<p>Retorna um relatório de texto com:</p>
<ul>
  <li><strong>Hostname</strong></li>
  <li><strong>Sistema operacional</strong></li>
  <li><strong>Uptime</strong></li>
  <li><strong>Uso de memória</strong></li>
</ul>

<p>A memória é coletada de forma específica para cada plataforma:</p>
<ul>
  <li><strong>Linux:</strong> extraída de <code>free -h</code></li>
  <li><strong>macOS:</strong> extraída de <code>vm_stat</code></li>
</ul>
`
  },
  {
    slug: '/tools/memory',
    section: 'Tools',
    title: 'Ferramenta de Memória / Fatos',
    description: 'Armazene e recupere fatos de longo prazo que persistem entre sessões e são injetados no prompt do sistema.',
    content: () => `
<h1>Ferramenta de Memória / Fatos</h1>
<p class="lead">Armazene e recupere fatos de longo prazo que persistem entre sessões e são injetados no prompt do sistema.</p>

<h2>Nome da Ferramenta</h2>
<p><code>remember_fact</code></p>

<h2>Parâmetros</h2>
${configTable([
  ['category', 'string', '—', 'Categoria de agrupamento (ex.: "user", "preference", "project")'],
  ['key', 'string', '—', 'Identificador único dentro da categoria'],
  ['value', 'string', '—', 'O conteúdo do fato a ser armazenado'],
])}

<h2>Armazenamento</h2>
<p>Os fatos são inseridos/atualizados na tabela <code>facts</code> no SQLite. O par <code>(category, key)</code> é único — armazenar um fato com a mesma categoria e chave sobrescreve o valor anterior.</p>

<h2>Injeção no Prompt do Sistema</h2>
<p>Até <code>state.max_facts</code> (padrão 100) fatos são injetados no prompt do sistema sob uma seção <code>## Known Facts</code>, agrupados por categoria e ordenados pelo mais recentemente atualizado. Isso significa que o agente sempre tem acesso ao seu conhecimento armazenado.</p>

${codeBlock(`## Known Facts

### user
- name: David
- timezone: US/Pacific

### project
- language: Rust
- repo: /home/david/projects/myapp`, 'text', 'system prompt injection')}

<h2>Schema da Tabela de Fatos</h2>
${configTable([
  ['id', 'integer', 'auto', 'Chave primária auto-incrementada'],
  ['category', 'string', '—', 'Categoria de agrupamento'],
  ['key', 'string', '—', 'Chave do fato (única por categoria)'],
  ['value', 'string', '—', 'Conteúdo do fato'],
  ['source', 'string', '""', 'Quem armazenou: "agent" ou "user"'],
  ['created_at', 'timestamp', 'now', 'Quando o fato foi criado'],
  ['updated_at', 'timestamp', 'now', 'Quando o fato foi atualizado pela última vez'],
])}
`
  },
  {
    slug: '/tools/config-manager',
    section: 'Tools',
    title: 'Ferramenta de Gerenciamento de Configuração',
    description: 'O agente aidaemon pode ler, atualizar, validar e restaurar seu próprio arquivo de configuração de forma autônoma.',
    content: () => `
<h1>Ferramenta de Gerenciamento de Configuração</h1>
<p class="lead">O agente pode ler, atualizar, validar e restaurar seu próprio arquivo de configuração.</p>

<h2>Nome da Ferramenta</h2>
<p><code>manage_config</code></p>

<h2>Ações</h2>

<h3>read</h3>
<p>Retorna o conteúdo completo do config.toml com campos sensíveis ocultados:</p>
${codeBlock(`api_key = "***REDACTED***"
bot_token = "***REDACTED***"
password = "***REDACTED***"`, 'toml')}

<h3>get</h3>
<p>Ler uma chave TOML específica pelo caminho:</p>
${codeBlock(`action: "get"
key: "provider.models.primary"
# Returns: "gemini-3-flash-preview"`, 'text')}

<h3>set</h3>
<p>Atualizar uma chave específica com um novo valor (formato literal TOML):</p>
${codeBlock(`action: "set"
key: "state.working_memory_cap"
value: "100"`, 'text')}

<p>Antes de gravar:</p>
<ol>
  <li>Cria backup (rotação em anel de 3 níveis: <code>.bak</code> → <code>.bak.1</code> → <code>.bak.2</code>)</li>
  <li>Valida a nova configuração (sintaxe TOML + desserialização completa)</li>
  <li>Define permissões do arquivo para 0600 (somente proprietário) no Unix</li>
</ol>

<h3>restore</h3>
<p>Reverter para o arquivo de backup mais recente.</p>

${callout('info', 'Última Configuração Válida', 'Após cada chamada LLM bem-sucedida, a configuração atual é salva como <code>.toml.lastgood</code>. Este é o primeiro arquivo tentado durante a recuperação.')}

<h2>Prioridade de Backup</h2>
<ol>
  <li><code>config.toml.lastgood</code> — configuração comprovadamente funcional</li>
  <li><code>config.toml.bak</code> — backup mais recente</li>
  <li><code>config.toml.bak.1</code></li>
  <li><code>config.toml.bak.2</code></li>
</ol>
`
  },
  {
    slug: '/tools/browser',
    section: 'Tools',
    title: 'Ferramenta de Navegador',
    description: 'Automação Chrome com sessões de login persistentes para navegação web, preenchimento de formulários e capturas de tela.',
    content: () => `
<h1>Ferramenta de Navegador</h1>
<p class="lead">Automação Chrome com sessões de login persistentes. Faça login uma vez e o agente pode navegar em sites autenticados em seu nome.</p>

${callout('success', 'Binários Pré-compilados', 'Se você instalou via script de uma linha ou Homebrew, a ferramenta de navegador já está incluída. Basta habilitá-la no <code>config.toml</code> abaixo. A feature flag só é necessária ao <a href="/getting-started/build">compilar a partir do código-fonte</a>.')}

<h2>Início Rápido</h2>
<p>Dois passos para o agente começar a navegar com suas sessões de login:</p>

<h3>1. Faça login nos seus serviços</h3>
${codeBlock(`aidaemon browser login`, 'bash')}
<p>O Chrome abre com um perfil dedicado. Faça login nos serviços que você quer que o agente acesse (Gmail, GitHub, AWS Console, Jira, etc.), depois feche o Chrome. Suas sessões são salvas em <code>~/.aidaemon/chrome-profile/</code> e persistem entre reinicializações.</p>

<h3>2. Habilite a ferramenta de navegador</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}

<p>Pronto. O agente agora pode navegar em sites autenticados usando suas sessões salvas.</p>

${callout('info', 'Experimente', 'Envie ao agente uma mensagem como <em>"Acesse https://mail.google.com e tire uma captura de tela"</em> — ele deve mostrar sua caixa de entrada, já conectado.')}

<h2>Configuração</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Habilitar a ferramenta de navegador'],
  ['headless', 'bool', 'true', 'Executar Chrome sem janela visível'],
  ['screenshot_width', 'int', '1280', 'Largura do viewport do navegador em pixels'],
  ['screenshot_height', 'int', '720', 'Altura do viewport do navegador em pixels'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Diretório do perfil Chrome para sessões persistentes'],
  ['profile', 'string', 'Default', 'Nome do perfil Chrome dentro do user_data_dir'],
  ['remote_debugging_port', 'int', 'null', 'Conectar a uma instância Chrome existente nesta porta (avançado)'],
])}

<h3>Configuração mínima</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}
<p>Todo o resto possui padrões sensatos. As sessões são automaticamente salvas em <code>~/.aidaemon/chrome-profile/</code>.</p>

<h2>Ações</h2>

<table class="config-table">
<thead><tr><th>Ação</th><th>Parâmetros</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>navigate</code></td><td><code>url</code></td><td>Navegar para URL, aguardar 2s para carregamento da página</td></tr>
<tr><td><code>screenshot</code></td><td><code>selector?</code></td><td>Captura de tela PNG da página inteira ou elemento específico</td></tr>
<tr><td><code>click</code></td><td><code>selector</code></td><td>Clicar em um elemento por seletor CSS</td></tr>
<tr><td><code>fill</code></td><td><code>selector, value</code></td><td>Digitar texto em um campo de formulário</td></tr>
<tr><td><code>get_text</code></td><td><code>selector?</code></td><td>Extrair conteúdo de texto de um elemento ou da página inteira</td></tr>
<tr><td><code>execute_js</code></td><td><code>script</code></td><td>Executar JavaScript arbitrário e retornar o resultado</td></tr>
<tr><td><code>wait</code></td><td><code>selector, timeout_secs?</code></td><td>Aguardar um elemento aparecer (timeout padrão 10s)</td></tr>
<tr><td><code>close</code></td><td>—</td><td>Fechar a sessão do navegador</td></tr>
</tbody>
</table>

<h2>Persistência de Sessão</h2>
<p>A ferramenta de navegador usa um perfil Chrome dedicado em <code>~/.aidaemon/chrome-profile/</code> que armazena cookies, local storage e sessões de login. Isso significa:</p>
<ul>
  <li>Faça login uma vez via <code>aidaemon browser login</code>, as sessões persistem indefinidamente</li>
  <li>O agente inicia o Chrome headless com este perfil — já autenticado</li>
  <li>As sessões sobrevivem a reinicializações do aidaemon e do sistema</li>
  <li>Execute <code>aidaemon browser login</code> novamente a qualquer momento para adicionar novos serviços ou renovar sessões expiradas</li>
</ul>

${callout('warn', 'Isolado do Chrome Pessoal', 'O agente usa seu próprio perfil Chrome, completamente separado do seu navegador pessoal. Seus favoritos, extensões e sessões pessoais nunca são tocados.')}

<h2>Modos de Implantação</h2>

<h3>Instância isolada (recomendado)</h3>
<p>Ao executar o aidaemon em um servidor ou VM dedicado, nenhum outro Chrome está em execução. O agente inicia e controla o Chrome diretamente.</p>
${codeBlock(`# SSH into your instance
ssh user@my-server

# One-time: log into services
aidaemon browser login

# Config
# [browser]
# enabled = true

# Done — agent handles Chrome automatically from here`, 'bash')}
<p>Para servidores headless, use SSH com encaminhamento X (<code>ssh -X</code>) ou VNC para o login inicial.</p>

<h3>Computador pessoal</h3>
<p>Ao executar o aidaemon junto com seu Chrome pessoal, o agente inicia uma instância Chrome separada com seu próprio perfil. Ambos funcionam lado a lado sem conflito.</p>
${codeBlock(`# Same setup — separate Chrome instance, no conflict
aidaemon browser login

# Your personal Chrome (47 tabs, extensions, bookmarks) → untouched
# Aidaemon's Chrome (~/.aidaemon/chrome-profile/) → isolated`, 'bash')}

<h3>Avançado: Conectar a um Chrome existente</h3>
<p>Para usuários avançados que desejam conectar a uma instância Chrome já em execução com uma porta de depuração remota:</p>
${codeBlock(`[browser]
enabled = true
remote_debugging_port = 9222`, 'toml', 'config.toml')}
<p>Inicie o Chrome com <code>--remote-debugging-port=9222</code> e o agente se conecta diretamente. Isso compartilha as sessões da instância Chrome, mas requer que o Chrome seja iniciado com a flag de depuração.</p>

<h2>Capturas de Tela</h2>
<p>As capturas de tela são capturadas como PNG e enviadas ao usuário pelo canal ativo (foto no Telegram, upload de arquivo no Slack, etc.) com legendas descrevendo a URL da página.</p>

<h2>Casos de Uso</h2>
<ul>
  <li><strong>Monitoramento</strong> — Verificar dashboards (Grafana, Vercel, AWS Console), capturar status de implantação</li>
  <li><strong>Extração de dados</strong> — Coletar dados de páginas renderizadas com JS, extrair relatórios de painéis administrativos</li>
  <li><strong>Automação de fluxos de trabalho</strong> — Preencher formulários, navegar fluxos de múltiplas etapas em ferramentas internas</li>
  <li><strong>Testes</strong> — Navegar pelo seu aplicativo implantado, verificar UI, checar layouts responsivos</li>
  <li><strong>Navegação autenticada</strong> — Interagir com qualquer serviço no qual você fez login, sem necessidade de chaves de API</li>
</ul>

<h2>Compilando a Partir do Código-Fonte</h2>
<p>A ferramenta de navegador requer a feature flag <code>browser</code>:</p>
${codeBlock(`cargo build --release --features browser`, 'bash')}
<p>Requer um navegador baseado em Chromium instalado (Chrome, Chromium, Brave ou Edge).</p>
`
  },
  {
    slug: '/tools/sub-agents',
    section: 'Tools',
    title: 'Criação de Sub-Agentes',
    description: 'Crie agentes filhos para tarefas complexas com delegação recursiva. Cada sub-agente recebe seu próprio conjunto de ferramentas.',
    content: () => `
<h1>Criação de Sub-Agentes</h1>
<p class="lead">O agente pode criar agentes filhos para tarefas complexas, possibilitando delegação recursiva.</p>

<h2>Nome da Ferramenta</h2>
<p><code>spawn_agent</code></p>

<h2>Parâmetros</h2>
${configTable([
  ['mission', 'string', '—', 'Papel/contexto de alto nível para o sub-agente'],
  ['task', 'string', '—', 'Pergunta concreta ou trabalho a ser realizado'],
])}

<h2>Comportamento</h2>
<ul>
  <li>O agente filho roda em <code>parent_depth + 1</code></li>
  <li>Herda o provedor, armazenamento de estado, modelo e ferramentas não-spawn do pai</li>
  <li>Recebe um prompt de sistema focado: instruções base + contexto da missão</li>
  <li>Executa um loop agêntico completo em uma sessão isolada (<code>sub-{depth}-{uuid}</code>)</li>
  <li>Retorna a resposta final em texto para o pai (truncada em <code>max_response_chars</code>)</li>
  <li>Se <code>child_depth &lt; max_depth</code>, o filho também recebe a ferramenta <code>spawn_agent</code></li>
</ul>

<h2>Configuração</h2>
${codeBlock(`[subagents]
enabled = true
max_depth = 3
max_iterations = 10
max_response_chars = 8000
timeout_secs = 300`, 'toml', 'config.toml')}

${callout('info', 'Limite de Recursão', 'Sub-agentes podem criar seus próprios sub-agentes até <code>max_depth</code> níveis de profundidade. Na profundidade máxima, a ferramenta spawn_agent não é disponibilizada.')}

${callout('warn', 'Timeout', 'Cada invocação de sub-agente tem um timeout fixo (<code>timeout_secs</code>). Se um sub-agente demorar demais, o pai recebe um erro de timeout.')}
`
  },
  {
    slug: '/tools/cli-agents',
    section: 'Tools',
    title: 'Delegação de Agentes CLI',
    description: 'Delegue tarefas para Claude Code, Gemini CLI, Codex, Copilot ou Aider de dentro do loop de agente do aidaemon.',
    content: () => `
<h1>Delegação de Agentes CLI</h1>
<p class="lead">Delegue tarefas para ferramentas CLI de codificação externas como Claude Code, Gemini CLI, Codex, Copilot ou Aider.</p>

<h2>Nome da Ferramenta</h2>
<p><code>cli_agent</code></p>

<h2>Parâmetros</h2>
${configTable([
  ['tool', 'string', '—', 'Nome da ferramenta CLI a invocar (ex.: "claude", "gemini")'],
  ['prompt', 'string', '—', 'O prompt/tarefa a enviar para a ferramenta CLI'],
  ['working_dir', 'string', 'null', 'Diretório de trabalho para execução do comando'],
])}

<h2>Ferramentas Padrão</h2>
<p>Quando <code>cli_agents.enabled = true</code> sem configurações explícitas de ferramentas, estes padrões são registrados (se o comando existir no sistema):</p>

<table class="config-table">
<thead><tr><th>Nome</th><th>Comando</th><th>Args Padrão</th></tr></thead>
<tbody>
<tr><td>claude</td><td><code>claude</code></td><td><code>-p --output-format json</code></td></tr>
<tr><td>gemini</td><td><code>gemini</code></td><td><code>-p --output-format json --sandbox=false</code></td></tr>
<tr><td>codex</td><td><code>codex</code></td><td><code>exec --json --full-auto</code></td></tr>
<tr><td>copilot</td><td><code>copilot</code></td><td><code>-p</code></td></tr>
<tr><td>aider</td><td><code>aider</code></td><td><code>--yes --message</code></td></tr>
</tbody>
</table>

${callout('info', 'Descoberta', 'Apenas ferramentas cujos comandos são encontrados via <code>which</code> são registradas. Ferramentas ausentes são silenciosamente ignoradas.')}

<h2>Configuração Personalizada</h2>
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

<h2>Extração de Saída</h2>
<p>A ferramenta tenta extrair saída estruturada:</p>
<ul>
  <li><strong>JSON:</strong> procura pelos campos <code>result</code>, <code>output</code>, <code>content</code> ou <code>message</code></li>
  <li><strong>JSONL:</strong> pega a última linha contendo conteúdo</li>
  <li><strong>Fallback:</strong> retorna a saída bruta, truncada em <code>max_output_chars</code></li>
</ul>
`
  },
  {
    slug: '/tools/web-search',
    section: 'Tools',
    title: 'Ferramenta de Pesquisa Web',
    description: 'Pesquise na web via DuckDuckGo ou Brave e retorne títulos, URLs e trechos para o agente LLM.',
    content: () => `
<h1>Ferramenta de Pesquisa Web</h1>
<p class="lead">Pesquise na web e retorne títulos, URLs e trechos. Suporta DuckDuckGo (padrão, sem necessidade de chave) e Brave como backends.</p>

<h2>Nome da Ferramenta</h2>
<p><code>web_search</code></p>

<h2>Parâmetros</h2>
${configTable([
  ['query', 'string', '—', 'A consulta de pesquisa (obrigatório)'],
  ['max_results', 'integer', '5', 'Número máximo de resultados a retornar'],
])}

<h2>Backends</h2>
<table class="config-table">
<thead><tr><th>Backend</th><th>Chave de API</th><th>Como Funciona</th></tr></thead>
<tbody>
<tr><td><strong>DuckDuckGo</strong> (padrão)</td><td>Não necessária</td><td>Busca em <code>https://lite.duckduckgo.com/lite/</code> e faz parsing dos resultados HTML</td></tr>
<tr><td><strong>Brave</strong></td><td>Obrigatória</td><td>Chama a API JSON <code>https://api.search.brave.com/res/v1/web/search</code></td></tr>
</tbody>
</table>

<h2>Configuração</h2>
${codeBlock(`[search]
backend = "duckduckgo"  # or "brave"
api_key = ""            # Required only for Brave`, 'toml', 'config.toml')}

<h2>Formato de Saída</h2>
<p>Retorna resultados numerados em markdown:</p>
${codeBlock(`1. [Page Title](https://example.com/page)
   A brief snippet describing the page content...

2. [Another Result](https://example.com/other)
   Another snippet...`, 'text')}
`
  },
  {
    slug: '/tools/web-fetch',
    section: 'Tools',
    title: 'Ferramenta de Busca Web',
    description: 'Busque qualquer URL e extraia conteúdo legível. Suporta conversão de HTML para texto com limites configuráveis.',
    content: () => `
<h1>Ferramenta de Busca Web</h1>
<p class="lead">Busque uma URL e extraia seu conteúdo legível. Sempre habilitada, sem necessidade de configuração.</p>

<h2>Nome da Ferramenta</h2>
<p><code>web_fetch</code></p>

<h2>Parâmetros</h2>
${configTable([
  ['url', 'string', '—', 'A URL a buscar (obrigatório)'],
  ['max_chars', 'integer', '20000', 'Máximo de caracteres a retornar'],
])}

<h2>Comportamento</h2>
<ol>
  <li>Busca a URL com cabeçalhos semelhantes aos de um navegador (user-agent Firefox, cabeçalhos Accept padrão)</li>
  <li>Tenta extração de legibilidade para obter texto limpo do artigo</li>
  <li>Faz fallback para conversão completa de HTML para markdown</li>
  <li>Trunca em <code>max_chars</code> em um limite seguro de UTF-8</li>
</ol>

${callout('info', 'Complementa a Ferramenta de Navegador', 'Use <code>web_fetch</code> para extração rápida de conteúdo sem iniciar o Chrome. Use a <a href="/tools/browser">Ferramenta de Navegador</a> para páginas interativas que requerem JavaScript, preenchimento de formulários ou capturas de tela.')}
`
  },
  {
    slug: '/tools/send-file',
    section: 'Tools',
    title: 'Transferência de Arquivos',
    description: 'Envie e receba arquivos via Telegram ou Slack. Validação de caminho e bloqueio de arquivos sensíveis integrados.',
    content: () => `
<h1>Transferência de Arquivos</h1>
<p class="lead">Envie arquivos para o usuário via Telegram ou Slack e receba arquivos do usuário. Valida caminhos e bloqueia arquivos sensíveis.</p>

<h2>Nome da Ferramenta</h2>
<p><code>send_file</code> (saída)</p>

<h2>Parâmetros</h2>
${configTable([
  ['file_path', 'string', '—', 'Caminho absoluto do arquivo a enviar (obrigatório)'],
  ['caption', 'string', 'null', 'Legenda opcional para o arquivo'],
])}

<h2>Configuração</h2>
${codeBlock(`[files]
enabled = true
inbox_dir = "~/.aidaemon/files/inbox"
outbox_dirs = ["~"]
max_file_size_mb = 10
retention_hours = 24`, 'toml', 'config.toml')}

<h2>Segurança</h2>
<p>A ferramenta aplica restrições de caminho para prevenir vazamento acidental de segredos:</p>
<ul>
  <li><strong>Caminhos permitidos:</strong> Apenas arquivos dentro de <code>outbox_dirs</code> ou <code>inbox_dir</code></li>
  <li><strong>Resolução de symlinks:</strong> Canonicaliza caminhos para prevenir travessia de diretórios</li>
  <li><strong>Padrões bloqueados:</strong> <code>.ssh</code>, <code>.gnupg</code>, <code>.env</code>, <code>credentials</code>, <code>.key</code>, <code>.pem</code>, <code>.aws/credentials</code>, <code>.netrc</code>, <code>.docker/config.json</code>, <code>config.toml</code></li>
</ul>

<h2>Arquivos de Entrada</h2>
<p>Usuários podem enviar arquivos para o bot no Telegram ou Slack. O aidaemon faz o download para o <code>inbox_dir</code> e os disponibiliza para o agente. Suporta documentos, fotos, áudio, vídeo e mensagens de voz, até <code>max_file_size_mb</code>.</p>

${callout('warn', 'Diretórios de Saída', 'A lista <code>outbox_dirs</code> controla de quais diretórios o agente pode enviar arquivos. Mantenha-a o mais restrita possível em produção.')}
`
  },
  {
    slug: '/tools/people',
    section: 'Tools',
    title: 'Inteligência de Pessoas',
    description: 'Uma agenda de contatos pessoal gerenciada pelo seu assistente de IA. Lembra aniversários, preferências e relacionamentos — tudo armazenado localmente na sua máquina.',
    content: () => `
<h1>Inteligência de Pessoas</h1>
<p class="lead">Pense nisso como uma agenda de contatos, mas com um assistente pessoal que lembra dos detalhes para você. Aniversários, preferências, estilos de comunicação, como você conhece alguém &mdash; o aidaemon mantém tudo organizado e te lembra quando importa. Tudo fica no seu computador ou servidor, nunca é enviado a terceiros.</p>

${callout('info', 'Ativação em Tempo de Execução', 'A Inteligência de Pessoas pode ser habilitada ou desabilitada a qualquer momento via chat. Basta dizer <strong>"enable people intelligence"</strong> ou usar a ferramenta <code>manage_people</code> com a ação <code>enable</code>/<code>disable</code>. Não é necessário reiniciar.')}

<h2>Como Funciona</h2>
<ol>
  <li><strong>Adicione contatos</strong> &mdash; adicione pessoas manualmente ou deixe o aidaemon aprender sobre elas nas conversas</li>
  <li><strong>Lembre detalhes</strong> &mdash; aniversários, preferências, interesses, informações de trabalho e mais</li>
  <li><strong>Vincule identidades</strong> &mdash; conecte uma pessoa à sua identidade no Telegram, Slack ou Discord</li>
  <li><strong>Lembretes proativos</strong> &mdash; o aidaemon naturalmente menciona aniversários próximos e sugere reconexões</li>
  <li><strong>Adaptação de contexto</strong> &mdash; quando uma pessoa conhecida envia mensagem, o aidaemon adapta seu estilo de comunicação</li>
</ol>

<h2>Nome da Ferramenta</h2>
<p><code>manage_people</code></p>

<h2>Ações</h2>
<table class="config-table">
<thead><tr><th>Ação</th><th>Descrição</th><th>Parâmetros Obrigatórios</th></tr></thead>
<tbody>
<tr><td><code>enable</code></td><td>Ativar a Inteligência de Pessoas (persiste entre reinicializações)</td><td>&mdash;</td></tr>
<tr><td><code>disable</code></td><td>Desativar a Inteligência de Pessoas (dados são preservados)</td><td>&mdash;</td></tr>
<tr><td><code>status</code></td><td>Mostrar estado habilitado/desabilitado e contagem de contatos</td><td>&mdash;</td></tr>
<tr><td><code>add</code></td><td>Adicionar uma nova pessoa</td><td>name</td></tr>
<tr><td><code>list</code></td><td>Listar todos os contatos (filtrar por relacionamento)</td><td>&mdash;</td></tr>
<tr><td><code>view</code></td><td>Visualizar detalhes da pessoa e todos os fatos</td><td>name ou id</td></tr>
<tr><td><code>update</code></td><td>Atualizar campos da pessoa (relacionamento, notas, estilo)</td><td>name ou id</td></tr>
<tr><td><code>remove</code></td><td>Excluir uma pessoa e todos os seus fatos</td><td>name ou id</td></tr>
<tr><td><code>add_fact</code></td><td>Armazenar um fato sobre alguém (aniversário, preferência, etc.)</td><td>person_name, category, key, value</td></tr>
<tr><td><code>remove_fact</code></td><td>Excluir um fato específico por ID</td><td>fact_id</td></tr>
<tr><td><code>link</code></td><td>Vincular uma identidade de plataforma a uma pessoa</td><td>person_name, platform_id</td></tr>
<tr><td><code>export</code></td><td>Exportar todos os dados de uma pessoa como JSON</td><td>person_name</td></tr>
<tr><td><code>purge</code></td><td>Exclusão em cascata completa (pessoa + fatos + vínculos)</td><td>person_name</td></tr>
<tr><td><code>audit</code></td><td>Revisar fatos extraídos automaticamente (não verificados)</td><td>&mdash; (ou person_name)</td></tr>
<tr><td><code>confirm</code></td><td>Verificar um fato extraído automaticamente (define confiança em 100%)</td><td>fact_id</td></tr>
</tbody>
</table>

<h2>Parâmetros</h2>
${configTable([
  ['action', 'string', '&mdash;', 'Ação a executar (obrigatório)'],
  ['name', 'string', 'null', "Nome da pessoa (para add, view, update, remove)"],
  ['id', 'integer', 'null', "ID da pessoa no banco de dados (para update, remove)"],
  ['relationship', 'string', 'null', 'Tipo de relacionamento: spouse, family, friend, coworker, acquaintance'],
  ['notes', 'string', 'null', 'Notas de texto livre sobre a pessoa'],
  ['communication_style', 'string', 'null', 'Como se comunicar: casual, formal, warm, etc.'],
  ['language', 'string', 'null', 'Idioma preferido para interação'],
  ['person_name', 'string', 'null', "Nome da pessoa (para add_fact, link, export, purge, audit)"],
  ['category', 'string', 'null', 'Categoria do fato: birthday, preference, interest, work, family, important_date, personality, gift_idea'],
  ['key', 'string', 'null', "Chave do fato (ex.: 'birthday', 'favorite_food')"],
  ['value', 'string', 'null', 'Valor do fato'],
  ['platform_id', 'string', 'null', "ID qualificado da plataforma (ex.: 'slack:U123', 'telegram:456')"],
  ['display_name', 'string', 'null', 'Nome de exibição para a identidade da plataforma'],
  ['fact_id', 'integer', 'null', 'ID do fato (para remove_fact, confirm)'],
])}

<h2>Habilitando</h2>
<p>Existem duas formas de habilitar a Inteligência de Pessoas:</p>

<h3>Opção 1: Via chat (recomendado)</h3>
<p>Basta dizer ao seu bot para habilitar. A configuração é armazenada no banco de dados e persiste entre reinicializações.</p>
${codeBlock('You: "Enable people intelligence"\naidaemon: "People Intelligence enabled. I\'ll now remember contacts..."', 'text', 'chat')}

<h3>Opção 2: Via config.toml</h3>
<p>Defina o estado inicial no seu arquivo de configuração. Este valor é usado para inicializar o banco de dados na primeira execução; depois disso, a configuração em tempo de execução tem precedência.</p>
${codeBlock('[people]\nenabled = true', 'toml', 'config.toml')}

<h2>Aprendizado Orgânico</h2>
<p>Quando <code>auto_extract</code> está habilitado (padrão), o aidaemon aprende automaticamente sobre pessoas a partir das conversas durante seu ciclo regular de consolidação de memória:</p>
<ul>
  <li>Detecta menções a pessoas, suas preferências, aniversários e relacionamentos</li>
  <li>Cria registros de pessoas e armazena fatos com 70% de confiança (extraídos automaticamente)</li>
  <li>O proprietário pode revisar e confirmar fatos via as ações <code>audit</code> e <code>confirm</code></li>
</ul>

${callout('warn', 'Categorias Restritas', 'Informações de saúde, detalhes financeiros, opiniões políticas e crenças religiosas <strong>nunca</strong> são extraídas automaticamente, mesmo se mencionadas na conversa. Isso é aplicado por <code>restricted_categories</code>.')}

<h2>Tarefas em Segundo Plano</h2>
<p>Quando habilitado, o aidaemon executa verificações diárias em segundo plano:</p>
<ul>
  <li><strong>Limpeza de fatos obsoletos</strong> &mdash; remove fatos extraídos automaticamente não confirmados com mais de <code>fact_retention_days</code> dias (padrão 180)</li>
  <li><strong>Lembretes de datas próximas</strong> &mdash; detecta aniversários e datas importantes dentro de 14 dias</li>
  <li><strong>Sugestões de reconexão</strong> &mdash; sinaliza pessoas que não foram contatadas em <code>reconnect_reminder_days</code> dias (padrão 30)</li>
</ul>

<h2>Modelo de Privacidade</h2>
<table class="config-table">
<thead><tr><th>Contexto</th><th>Comportamento</th></tr></thead>
<tbody>
<tr><td>DMs do proprietário</td><td>Grafo completo de pessoas injetado no prompt do sistema (nomes, fatos, relacionamentos)</td></tr>
<tr><td>Não-proprietário (vinculado)</td><td>Apenas adaptação de estilo de comunicação (sem injeção de fatos para outros usuários)</td></tr>
<tr><td>Canais públicos</td><td>Nenhum fato pessoal injetado</td></tr>
</tbody>
</table>

<h2>Configuração</h2>
${codeBlock('[people]\nenabled = true\nauto_extract = true\nauto_extract_categories = ["birthday", "preference", "interest", "work", "family", "important_date"]\nrestricted_categories = ["health", "finance", "political", "religious"]\nfact_retention_days = 180\nreconnect_reminder_days = 30', 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'Estado inicial (pode ser alternado em tempo de execução via chat)'],
  ['auto_extract', 'bool', 'true', 'Aprender fatos sobre pessoas a partir das conversas automaticamente'],
  ['auto_extract_categories', 'string[]', '[...]', 'Categorias que podem ser extraídas automaticamente'],
  ['restricted_categories', 'string[]', '[...]', 'Categorias que nunca são extraídas automaticamente'],
  ['fact_retention_days', 'integer', '180', 'Dias antes de fatos não confirmados serem removidos'],
  ['reconnect_reminder_days', 'integer', '30', 'Dias de inatividade antes de sugerir uma reconexão'],
])}
`
  },
  {
    slug: '/mcp',
    section: 'MCP',
    title: 'Visão Geral do MCP',
    description: 'Estenda o aidaemon com servidores Model Context Protocol para acesso ao sistema de arquivos, bancos de dados, APIs e mais.',
    content: () => `
<h1>Integração MCP</h1>
<p class="lead">Estenda o aidaemon com qualquer servidor <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener">Model Context Protocol</a> para adicionar acesso ao sistema de arquivos, bancos de dados, APIs e mais.</p>

<h2>Como Funciona</h2>
<ol>
  <li>O aidaemon inicia cada servidor MCP configurado como um subprocesso</li>
  <li>Comunica-se via JSON-RPC 2.0 sobre stdin/stdout</li>
  <li>Chama <code>tools/list</code> para descobrir as ferramentas disponíveis</li>
  <li>Cada ferramenta descoberta é encapsulada como um <code>Tool</code> nativo do aidaemon</li>
  <li>O LLM pode chamar ferramentas MCP da mesma forma que as ferramentas integradas</li>
</ol>

<h2>Detalhes do Protocolo</h2>
<ul>
  <li><strong>Versão do protocolo:</strong> 2024-11-05</li>
  <li><strong>Informações do cliente:</strong> name="aidaemon", version="0.1.0"</li>
  <li><strong>Transporte:</strong> JSON delimitado por linha sobre stdin/stdout</li>
  <li><strong>Inicialização:</strong> requisição <code>initialize</code> → <code>notifications/initialized</code></li>
</ul>

<h2>Exemplo</h2>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@anthropic/mcp-filesystem", "/home/user/documents"]

[mcp.sqlite]
command = "npx"
args = ["-y", "@anthropic/mcp-sqlite", "my-database.db"]

[mcp.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]`, 'toml', 'config.toml')}

${callout('info', 'Tratamento de Erros', 'Se um servidor MCP falhar ao iniciar ou listar ferramentas, o erro é registrado no log, mas outros servidores e ferramentas integradas continuam funcionando.')}
`
  },
  {
    slug: '/mcp/configuration',
    section: 'MCP',
    title: 'Configuração de Servidor MCP',
    description: 'Configure servidores MCP no config.toml do aidaemon. Transporte Stdio e SSE, variáveis de ambiente e timeouts.',
    content: () => `
<h1>Configuração de Servidor MCP</h1>
<p class="lead">Cada servidor MCP é definido como uma seção nomeada sob <code>[mcp]</code> no config.toml.</p>

<h2>Formato de Configuração</h2>
${codeBlock(`[mcp.<server-name>]
command = "<executable>"
args = ["arg1", "arg2", ...]`, 'toml')}

${configTable([
  ['command', 'string', '—', 'Executável ou script para iniciar o servidor MCP'],
  ['args', 'array', '[]', 'Argumentos passados ao comando'],
])}

<h2>Processo de Descoberta</h2>
<ol>
  <li>Para cada seção <code>[mcp.*]</code>, inicia o processo com o comando e argumentos configurados</li>
  <li>Inicializa a conexão JSON-RPC (handshake do protocolo)</li>
  <li>Chama <code>tools/list</code> para enumerar as ferramentas disponíveis</li>
  <li>Encapsula o nome, descrição e schema de entrada de cada ferramenta como um Tool nativo</li>
  <li>Registra quaisquer erros por servidor sem falhar globalmente</li>
</ol>

<h2>Exemplos</h2>

<h3>Acesso ao Sistema de Arquivos</h3>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@anthropic/mcp-filesystem", "/home/user/projects"]`, 'toml')}

<h3>Pesquisa Web</h3>
${codeBlock(`[mcp.brave-search]
command = "npx"
args = ["-y", "@anthropic/mcp-brave-search"]`, 'toml')}

<h3>Servidor Python Personalizado</h3>
${codeBlock(`[mcp.my-server]
command = "python3"
args = ["/path/to/my_mcp_server.py"]`, 'toml')}

${callout('info', 'Logging de Stderr', 'A saída stderr do servidor MCP é capturada e registrada pelo aidaemon para depuração. Verifique os logs do daemon se um servidor não estiver funcionando.')}

<h2>Detecção de Ameaças</h2>
<p>O aidaemon realiza detecção de ameaças apenas para auditoria nas chamadas de ferramentas MCP. Padrões suspeitos são registrados no log, mas <strong>não bloqueiam a execução</strong>.</p>

<h3>Padrões de Argumentos Suspeitos</h3>
<ul>
  <li><strong>Acesso a arquivos:</strong> <code>/etc/passwd</code>, <code>/etc/shadow</code>, <code>.ssh/</code>, <code>.env</code></li>
  <li><strong>Configuração/segredos:</strong> <code>config.toml</code>, <code>aidaemon.db</code>, <code>api_key</code>, <code>bot_token</code>, <code>encryption_key</code></li>
  <li><strong>Rede:</strong> <code>curl</code>, <code>wget</code>, <code>nc</code>, <code>base64</code></li>
  <li><strong>Execução de código:</strong> <code>eval(</code>, <code>exec(</code>, <code>| sh</code>, <code>| bash</code></li>
  <li><strong>Destrutivos:</strong> <code>; rm </code>, <code>chmod 777</code></li>
</ul>

<h3>Padrões de Saída Suspeitos</h3>
<ul>
  <li>Potenciais chaves de API: prefixos <code>sk-</code>, <code>ghp_</code></li>
  <li>Chaves privadas: <code>-----BEGIN</code>, <code>PRIVATE KEY</code></li>
  <li>Termos sensíveis: <code>password</code>, <code>bot_token</code></li>
</ul>

${callout('warn', 'Apenas Auditoria', 'A detecção de ameaças é informativa — registra avisos no log, mas não bloqueia a execução de ferramentas. Verifique os logs do seu daemon para quaisquer padrões sinalizados.')}
`
  },
  {
    slug: '/triggers',
    section: 'Triggers',
    title: 'Gatilhos por E-mail',
    description: 'Monitore caixas de entrada de e-mail com IMAP IDLE e acione o agente aidaemon automaticamente em novas mensagens.',
    content: () => `
<h1>Gatilhos por E-mail</h1>
<p class="lead">Monitore sua caixa de entrada com IMAP IDLE e acione o agente em novos e-mails.</p>

<h2>Como Funciona</h2>
<ol>
  <li>O aidaemon se conecta ao servidor IMAP configurado com TLS</li>
  <li>Seleciona a pasta configurada (padrão: INBOX)</li>
  <li>Entra no modo IMAP IDLE — uma conexão persistente que aguarda novas mensagens</li>
  <li>Quando um novo e-mail chega, busca o envelope (assunto, remetente)</li>
  <li>Cria um Event e o transmite via o barramento de eventos interno</li>
  <li>O agente processa o evento e envia uma notificação via Telegram</li>
</ol>

<h2>Configuração</h2>
${codeBlock(`[triggers.email]
host = "imap.gmail.com"
port = 993
username = "you@gmail.com"
password = "your-app-password"
folder = "INBOX"`, 'toml', 'config.toml')}

${callout('warn', 'Senhas de Aplicativo do Gmail', 'Para Gmail com 2FA, gere uma senha específica de aplicativo em <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener">myaccount.google.com/apppasswords</a>.')}

<h2>Formato do Evento</h2>
${codeBlock(`Event {
    source: "email",
    session_id: "email_trigger",
    content: "New email from sender@example.com: Subject line here"
}`, 'rust')}

<h2>Barramento de Eventos</h2>
<p>Gatilhos usam um canal broadcast do Tokio para entregar eventos. O agente escuta na extremidade receptora e processa cada evento como uma nova mensagem em sua própria sessão.</p>

${callout('danger', 'Sessões Não Confiáveis', 'Sessões de gatilho por e-mail são marcadas como <strong>não confiáveis</strong>. Todos os comandos de terminal nessas sessões requerem aprovação explícita, independentemente da whitelist de allowed_prefixes.')}

<h2>Reconexão</h2>
<p>Se a conexão IMAP cair, o aidaemon aguarda 30 segundos e reconecta automaticamente.</p>
`
  },
  {
    slug: '/skills',
    section: 'Skills',
    title: 'Sistema de Skills',
    description: 'Aprimoramento dinâmico de prompts via arquivos markdown. Skills injetam instruções específicas de contexto baseadas em gatilhos de palavras-chave.',
    content: () => `
<h1>Sistema de Skills</h1>
<p class="lead">Aprimoramento dinâmico de prompts via arquivos markdown. Skills injetam instruções específicas de contexto quando acionadas por palavras-chave nas mensagens do usuário.</p>

<h2>Configuração</h2>
${codeBlock(`[skills]
dir = "skills"
enabled = true`, 'toml', 'config.toml')}

<h2>Formato do Arquivo de Skill</h2>
<p>Skills são arquivos markdown com frontmatter similar ao YAML, armazenados no diretório de skills:</p>
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

<h2>Campos do Frontmatter</h2>
${configTable([
  ['name', 'string', '—', 'Nome de exibição da skill'],
  ['description', 'string', '—', 'Descrição breve (exibida na lista "Available Skills")'],
  ['triggers', 'string', '—', 'Palavras-chave separadas por vírgula que ativam a skill'],
])}

<h2>Correspondência Híbrida</h2>
<p>A ativação de skills usa um processo em duas etapas:</p>
<ol>
  <li><strong>Correspondência de padrões</strong> — busca de palavras-chave inteiras, insensível a maiúsculas/minúsculas. Se qualquer gatilho aparecer como uma palavra completa na mensagem do usuário, a skill é uma candidata.</li>
  <li><strong>Confirmação por LLM</strong> — o modelo rápido valida se cada skill candidata é realmente relevante para a intenção do usuário. Isso previne ativações falsas por correspondências acidentais de palavras-chave.</li>
</ol>
<p>A etapa de confirmação é <strong>fail-open</strong>: se a chamada ao LLM falhar ou expirar, todas as candidatas correspondidas por padrão são ativadas.</p>

<h2>Injeção no Prompt do Sistema</h2>
<p>Quando skills são carregadas, o prompt do sistema é aprimorado com:</p>
<ol>
  <li><strong>Available Skills</strong> — lista todos os nomes e descrições de skills</li>
  <li><strong>Active Skills</strong> — corpo completo de cada skill correspondida</li>
  <li><strong>Known Facts</strong> — fatos armazenados (injetados abaixo das skills)</li>
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

<h2>Skills Dinâmicas</h2>
<p>Além de skills estáticas do sistema de arquivos, o aidaemon suporta gerenciamento de skills em tempo de execução através da ferramenta <code>manage_skills</code> e registros opcionais.</p>

<h3>Ações da Ferramenta manage_skills</h3>
<table class="config-table">
<thead><tr><th>Ação</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>add</code></td><td>Buscar uma skill a partir de uma URL</td></tr>
<tr><td><code>add_inline</code></td><td>Processar conteúdo markdown bruto como uma skill</td></tr>
<tr><td><code>list</code></td><td>Mostrar todas as skills carregadas com metadados</td></tr>
<tr><td><code>remove</code></td><td>Excluir uma skill pelo nome</td></tr>
<tr><td><code>enable</code> / <code>disable</code></td><td>Ativar ou desativar uma skill</td></tr>
<tr><td><code>browse</code></td><td>Pesquisar nos registros configurados</td></tr>
<tr><td><code>install</code></td><td>Instalar a partir de um registro</td></tr>
<tr><td><code>update</code></td><td>Rebuscar skill a partir da URL de origem</td></tr>
</tbody>
</table>

<h3>Auto-Promoção</h3>
<p>Uma tarefa em segundo plano roda a cada 12 horas, avaliando procedimentos frequentemente usados para promoção automática em skills reutilizáveis.</p>
`
  },
  {
    slug: '/scheduler',
    section: 'Scheduler',
    title: 'Tarefas Agendadas',
    description: 'Crie tarefas agendadas recorrentes e únicas com linguagem natural ou expressões cron no aidaemon.',
    content: () => `
<h1>Tarefas Agendadas</h1>
<p class="lead">Crie tarefas recorrentes e únicas com linguagem natural ou expressões cron. O agente executa o prompt da tarefa no horário agendado.</p>

<h2>Nome da Ferramenta</h2>
<p><code>scheduler</code></p>

<h2>Ações</h2>
<table class="config-table">
<thead><tr><th>Ação</th><th>Parâmetros Obrigatórios</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>create</code></td><td>name, schedule, prompt</td><td>Criar uma nova tarefa agendada</td></tr>
<tr><td><code>list</code></td><td>—</td><td>Listar todas as tarefas com status e próxima execução</td></tr>
<tr><td><code>delete</code></td><td>id</td><td>Excluir uma tarefa por UUID</td></tr>
<tr><td><code>pause</code></td><td>id</td><td>Pausar uma tarefa (para de disparar)</td></tr>
<tr><td><code>resume</code></td><td>id</td><td>Retomar uma tarefa pausada (recalcula próxima execução)</td></tr>
</tbody>
</table>

<h2>Parâmetros de Criação</h2>
${configTable([
  ['name', 'string', '—', 'Rótulo legível para a tarefa'],
  ['schedule', 'string', '—', 'Linguagem natural ou expressão cron de 5 campos'],
  ['prompt', 'string', '—', 'O que o agente deve fazer quando a tarefa disparar'],
  ['oneshot', 'bool', 'false', 'Disparar uma vez e depois auto-excluir'],
  ['trusted', 'bool', 'false', 'Executar com autonomia total (sem aprovação do terminal)'],
])}

<h2>Agendamentos em Linguagem Natural</h2>
<p>O scheduler analisa padrões comuns e os converte em expressões cron:</p>

<table class="config-table">
<thead><tr><th>Entrada</th><th>Cron</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>hourly</code></td><td><code>0 * * * *</code></td><td>A cada hora em :00</td></tr>
<tr><td><code>daily</code></td><td><code>0 0 * * *</code></td><td>Todo dia à meia-noite</td></tr>
<tr><td><code>weekly</code></td><td><code>0 0 * * 0</code></td><td>Todo domingo à meia-noite</td></tr>
<tr><td><code>monthly</code></td><td><code>0 0 1 * *</code></td><td>Primeiro dia do mês</td></tr>
<tr><td><code>every 5m</code></td><td><code>*/5 * * * *</code></td><td>A cada 5 minutos</td></tr>
<tr><td><code>every 2h</code></td><td><code>0 */2 * * *</code></td><td>A cada 2 horas</td></tr>
<tr><td><code>daily at 9am</code></td><td><code>0 9 * * *</code></td><td>Todo dia às 9:00</td></tr>
<tr><td><code>daily at 14:30</code></td><td><code>30 14 * * *</code></td><td>Todo dia às 14:30</td></tr>
<tr><td><code>weekdays at 8:30</code></td><td><code>30 8 * * 1-5</code></td><td>Seg-Sex às 8:30</td></tr>
<tr><td><code>weekends at 10am</code></td><td><code>0 10 * * 0,6</code></td><td>Sáb-Dom às 10:00</td></tr>
<tr><td><code>in 2h</code></td><td>(absoluto calculado)</td><td>Disparo único, executa uma vez em 2 horas</td></tr>
<tr><td><code>in 30m</code></td><td>(absoluto calculado)</td><td>Disparo único, executa uma vez em 30 minutos</td></tr>
</tbody>
</table>

<p>Expressões cron padrão de 5 campos também são aceitas diretamente (ex: <code>0 9 * * 1-5</code>).</p>

<h2>Configuração</h2>
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

<h2>Armazenamento de Tarefas</h2>
<p>As tarefas são persistidas no SQLite (tabela <code>scheduled_tasks</code>). Tarefas definidas na configuração são sincronizadas na inicialização — tarefas removidas são limpas automaticamente. Tarefas criadas via ferramenta persistem indefinidamente.</p>

<h2>Tarefas Perdidas</h2>
<p>Na inicialização, o scheduler verifica tarefas que deveriam ter sido executadas enquanto o daemon estava inativo. Tarefas perdidas são executadas imediatamente durante a recuperação.</p>

${callout('warn', 'Trusted vs Untrusted', 'Tarefas trusted rodam com acesso total ao terminal (sem necessidade de aprovação). Tarefas untrusted (padrão) requerem aprovação para qualquer comando de terminal, assim como sessões de trigger por email.')}
`
  },
  {
    slug: '/router',
    section: 'Router',
    title: 'Roteamento de Modelos',
    description: 'Roteamento automático por nível de modelo: Fast, Primary ou Smart. Heurísticas por palavras-chave e classificação por tamanho da mensagem.',
    content: () => `
<h1>Roteamento de Modelos</h1>
<p class="lead">Seleção automática de modelo baseada em níveis roteia cada consulta para o modelo mais apropriado: Fast, Primary ou Smart.</p>

<h2>Níveis</h2>
<table class="config-table">
<thead><tr><th>Nível</th><th>Caso de Uso</th><th>Modelo Típico</th></tr></thead>
<tbody>
<tr><td><strong>Fast</strong></td><td>Saudações simples, sim/não, consultas curtas</td><td>gemini-2.5-flash-lite, gpt-4o-mini, claude-haiku-4</td></tr>
<tr><td><strong>Primary</strong></td><td>Conversas gerais, tarefas moderadas</td><td>gemini-3-flash-preview, gpt-4o, claude-sonnet-4</td></tr>
<tr><td><strong>Smart</strong></td><td>Raciocínio complexo, geração de código, análise</td><td>gemini-3-pro-preview, o1-preview, claude-opus-4</td></tr>
</tbody>
</table>

<h2>Regras de Classificação</h2>

<h3>Nível Smart (tarefas complexas)</h3>
<p>Uma consulta é classificada como Smart se qualquer uma destas condições for verdadeira:</p>
<ul>
  <li>Contém um bloco de código (<code>\`\`\`</code>)</li>
  <li>Comprimento da mensagem &gt; 500 caracteres</li>
  <li>Contém 3+ pontos de interrogação</li>
  <li>Contém palavras-chave: <em>implement, refactor, debug, analyze, step by step, write code, architecture, optimize, algorithm, explain how, write a, build a, create a function, design, compare and contrast, walk me through, troubleshoot, review this, fix this, rewrite</em></li>
</ul>

<h3>Nível Fast (consultas simples)</h3>
<p>Uma consulta é classificada como Fast se qualquer uma destas condições for verdadeira:</p>
<ul>
  <li>Correspondência exata de saudações/confirmações: <em>hi, hello, hey, thanks, ok, yes, no, sure, bye, goodbye, ty, cool, nice, great, awesome, lol, haha, wow</em> (sem distinção de maiúsculas/minúsculas)</li>
  <li>Mensagem de uma única palavra</li>
  <li>Mensagem curta: &lt;20 caracteres E &le;3 palavras</li>
  <li>Prefixo de consulta simples (<em>what is, who is, define, when is, where is</em>) + &le;6 palavras no total</li>
</ul>

<h3>Nível Primary (padrão)</h3>
<p>Todo o resto é direcionado ao nível Primary.</p>

<h2>Desativando o Roteamento Automático</h2>
<ul>
  <li>Se todos os três níveis de modelo forem iguais, o roteamento é automaticamente desativado</li>
  <li>Enviar <code>/model &lt;nome&gt;</code> no Telegram desativa o roteamento (substituição manual)</li>
  <li>Enviar <code>/auto</code> reativa o roteamento automático</li>
</ul>
`
  },
  {
    slug: '/cost-tracking',
    section: 'Cost Tracking',
    title: 'Uso de Tokens & Orçamentos',
    description: 'Acompanhe o consumo de tokens por modelo e sessão. Defina orçamentos diários e verifique estatísticas via comando /cost.',
    content: () => `
<h1>Uso de Tokens &amp; Rastreamento de Custos</h1>
<p class="lead">Acompanhe o consumo de tokens por modelo e sessão. Defina orçamentos diários para controlar gastos. Verifique estatísticas pelo Telegram com <code>/cost</code>.</p>

<h2>Como Funciona</h2>
<ol>
  <li>Cada chamada ao LLM registra tokens de entrada e saída na tabela SQLite <code>token_usage</code></li>
  <li>Cada registro inclui: nome do modelo, ID da sessão, contagem de tokens e timestamp</li>
  <li>Opcionalmente, defina um orçamento diário de tokens que bloqueia chamadas ao LLM quando excedido</li>
  <li>O orçamento é resetado automaticamente à meia-noite UTC</li>
</ol>

<h2>Configuração</h2>
${configTable([
  ['daily_token_budget', 'integer', 'null', 'Máximo total de tokens (entrada + saída) por dia. Null = ilimitado.'],
])}

${codeBlock(`[state]
daily_token_budget = 1000000  # 1M tokens per day`, 'toml', 'config.toml')}

${callout('info', 'Escopo do Orçamento', 'O orçamento diário é global — ele conta todos os tokens de todas as sessões e modelos. Quando excedido, chamadas ao LLM retornam um erro até a meia-noite UTC.')}

<h2>Comando /cost do Telegram</h2>
<p>Envie <code>/cost</code> no Telegram para ver estatísticas de uso:</p>
${codeBlock(`Token usage (last 24h):
  Input:  12,450 tokens
  Output: 8,230 tokens

Token usage (last 7d):
  Input:  87,320 tokens
  Output: 52,180 tokens

Top models (7d):
  gemini-3-flash-preview: 98,400 tokens
  gemini-3-pro-preview: 41,100 tokens`, 'text')}

<h2>Esquema do Banco de Dados</h2>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Chave primária auto-incrementável'],
  ['session_id', 'TEXT', '—', 'Qual sessão de usuário/chat fez a chamada'],
  ['model', 'TEXT', '—', 'Qual modelo LLM foi usado'],
  ['input_tokens', 'INTEGER', '—', 'Tokens enviados ao modelo'],
  ['output_tokens', 'INTEGER', '—', 'Tokens gerados pelo modelo'],
  ['created_at', 'TEXT', 'now', 'Timestamp UTC da chamada'],
])}

<h2>O Que é Rastreado</h2>
<ul>
  <li>Tokens de entrada (contexto + mensagem do usuário) por chamada ao LLM</li>
  <li>Tokens de saída (resposta do modelo) por chamada ao LLM</li>
  <li>Nome do modelo para detalhamento por modelo</li>
  <li>ID da sessão para rastreamento por usuário</li>
  <li>Timestamp para consultas por janela de tempo (24h, 7d)</li>
</ul>
`
  },
  {
    slug: '/architecture',
    section: 'Architecture',
    title: 'Loop do Agente & Recuperação de Erros',
    description: 'O loop agêntico do aidaemon: tratamento de mensagens, chamadas ao LLM, execução de ferramentas, detecção de travamento e recuperação de erros.',
    content: () => `
<h1>Loop do Agente &amp; Recuperação de Erros</h1>
<p class="lead">O loop agêntico central: receber mensagem, chamar LLM, executar ferramentas, iterar, responder.</p>

<h2>Fluxo do Loop do Agente</h2>
<ol>
  <li><strong>Persistir mensagem do usuário</strong> — armazenada com pontuação de importância</li>
  <li><strong>Auto-rotear modelo</strong> — classificar complexidade da consulta (se não substituído manualmente)</li>
  <li><strong>Construir prompt do sistema</strong> — prompt base + skills correspondentes + fatos conhecidos</li>
  <li><strong>Recuperar contexto</strong> — recuperação de memória tri-híbrida</li>
  <li><strong>Iterar</strong> (até <code>max_iterations</code>):
    <ul>
      <li>Coletar memórias antigas fixadas + mensagens recentes (deduplicadas)</li>
      <li>Construir lista de mensagens no formato OpenAI</li>
      <li>Chamar LLM com recuperação classificada por erro</li>
      <li>Se houver chamadas de ferramentas → executar cada uma, persistir resultados, continuar loop</li>
      <li>Se não houver chamadas de ferramentas OU iteração final → retornar resposta em texto</li>
    </ul>
  </li>
  <li><strong>Máximo de iterações atingido</strong> → retornar mensagem de timeout</li>
</ol>

<h2>Orçamento Dinâmico de Iterações</h2>
<p>O agente possui uma ferramenta integrada <code>request_more_iterations</code> que estende o orçamento do loop quando o limite atual é insuficiente:</p>
<ul>
  <li>Estende o orçamento em <strong>10 iterações</strong> por chamada</li>
  <li>Limite rígido impede extensão ilimitada (tipicamente 25 no total)</li>
  <li>Requer um parâmetro <code>reason</code> explicando o que resta a ser feito</li>
  <li>Usado quando o agente tem um plano claro mas ficaria sem iterações no meio da tarefa</li>
</ul>

<h2>Estratégia de Recuperação de Erros</h2>
<p>O método <code>call_llm_with_recovery</code> classifica erros e responde de acordo:</p>

<table class="config-table">
<thead><tr><th>Tipo de Erro</th><th>Estratégia</th></tr></thead>
<tbody>
<tr><td><strong>Auth / Billing</strong></td><td>Retornar imediatamente ao usuário — sem retry</td></tr>
<tr><td><strong>Rate Limit</strong></td><td>Aguardar <code>retry_after_secs</code> (limitado a 60s), tentar novamente uma vez</td></tr>
<tr><td><strong>Timeout / Network / Server Error</strong></td><td>Aguardar 2s, tentar novamente uma vez; em caso de falha, voltar ao modelo anterior</td></tr>
<tr><td><strong>Not Found (modelo inválido)</strong></td><td>Alternar imediatamente para modelo de fallback</td></tr>
<tr><td><strong>Unknown</strong></td><td>Propagar como erro</td></tr>
</tbody>
</table>

${callout('info', 'Last Known Good', 'Após cada chamada bem-sucedida ao LLM, a configuração atual é salva como <code>config.toml.lastgood</code>. Isso permite a recuperação automática de alterações ruins na configuração.')}

<h2>Correção de Ordenação de Mensagens</h2>
<p>Para satisfazer restrições entre provedores Gemini, Anthropic e OpenAI, o aidaemon executa uma correção de três passagens no histórico de mensagens antes de cada chamada ao LLM:</p>
<ol>
  <li><strong>Passagem 1:</strong> Mesclar mensagens consecutivas do mesmo papel (combina arrays de tool_calls)</li>
  <li><strong>Passagem 2:</strong> Descartar resultados de ferramentas órfãos (sem tool_call correspondente do assistente) e remover tool_calls órfãos (sem resultado de ferramenta correspondente)</li>
  <li><strong>Passagem 3:</strong> Mesclar novamente após a remoção de órfãos, que pode criar novas mensagens consecutivas do mesmo papel</li>
</ol>

<h2>Execução de Ferramentas</h2>
<p>Durante o loop, cada chamada de ferramenta recebe:</p>
<ul>
  <li><code>_session_id</code> — injetado automaticamente para rastreamento de sessão</li>
  <li><code>_untrusted_source</code> — flag definida para sessões originadas por triggers</li>
</ul>

<h2>Detecção de Travamento &amp; Repetição</h2>
<p>O loop do agente inclui proteções contra travamentos:</p>
<ul>
  <li><strong>Detecção de travamento</strong> &mdash; se a mesma ferramenta for chamada 3+ vezes consecutivas com argumentos similares, o loop é interrompido</li>
  <li><strong>Detecção de repetição</strong> &mdash; detecta texto de resposta repetido e força uma interrupção</li>
  <li><strong>Limite rígido de iterações</strong> &mdash; padrão 10, extensível até 25 via <code>request_more_iterations</code></li>
</ul>

<h2>Tipos de Sessão</h2>
<table class="config-table">
<thead><tr><th>Tipo de Sessão</th><th>Formato</th><th>Trusted</th></tr></thead>
<tbody>
<tr><td>Chat do Telegram</td><td>Chat ID como string</td><td>Sim</td></tr>
<tr><td>Canal do Slack</td><td><code>slack:{channel_id}</code> ou <code>slack:{channel_id}:{thread_ts}</code></td><td>Sim</td></tr>
<tr><td>Canal do Discord</td><td><code>discord:{channel_id}</code></td><td>Sim</td></tr>
<tr><td>Trigger de email</td><td><code>email_trigger</code></td><td>Não</td></tr>
<tr><td>Trigger de evento</td><td><code>event_{uuid}</code></td><td>Não</td></tr>
<tr><td>Sub-agente</td><td><code>sub-{depth}-{uuid}</code></td><td>Herdado</td></tr>
</tbody>
</table>
`
  },
  {
    slug: '/architecture/state',
    section: 'Architecture',
    title: 'Gerenciamento de Estado & Memória',
    description: 'Persistência em SQLite com busca semântica via embeddings, recuperação tri-híbrida e camadas de memória.',
    content: () => `
<h1>Gerenciamento de Estado &amp; Memória</h1>
<p class="lead">Persistência em SQLite com memória de trabalho em memória, busca semântica via embeddings e recuperação tri-híbrida.</p>

${callout('info', 'Atualização v0.9.x', 'A persistência principal das conversas agora usa a tabela <code>events</code>. Os dados antigos de <code>messages</code> são migrados para events durante a atualização.')}

<h2>Esquema do Banco de Dados</h2>

<h3>Tabela messages</h3>
${configTable([
  ['id', 'TEXT PK', '—', 'Chave primária UUID'],
  ['session_id', 'TEXT', '—', 'Identificador da sessão (indexado)'],
  ['role', 'TEXT', '—', 'user, assistant ou tool'],
  ['content', 'TEXT', 'null', 'Conteúdo textual da mensagem'],
  ['tool_call_id', 'TEXT', 'null', 'ID para mensagens de resultado de ferramenta'],
  ['tool_name', 'TEXT', 'null', 'Nome da ferramenta para mensagens de ferramenta'],
  ['tool_calls_json', 'TEXT', 'null', 'Array JSON de chamadas de ferramentas'],
  ['created_at', 'TEXT', '—', 'Timestamp RFC3339'],
  ['importance', 'REAL', '0.5', 'Pontuação de importância (0.0–1.0)'],
  ['embedding', 'BLOB', 'null', 'Embedding codificado em JSON Vec<f32>'],
  ['embedding_error', 'TEXT', 'null', 'Mensagem de erro se o embedding falhou'],
  ['consolidated_at', 'TEXT', 'null', 'Timestamp de consolidação de memória'],
])}

<h3>Tabela facts</h3>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Chave primária auto-incrementável'],
  ['category', 'TEXT', '—', 'Categoria de agrupamento'],
  ['key', 'TEXT', '—', 'Chave do fato (única por categoria)'],
  ['value', 'TEXT', '—', 'Conteúdo do fato'],
  ['source', 'TEXT', '""', 'Quem armazenou: "agent" ou "user"'],
  ['created_at', 'TEXT', '—', 'Timestamp RFC3339'],
  ['updated_at', 'TEXT', '—', 'Timestamp RFC3339'],
])}

<h3>Tabela macros</h3>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Chave primária auto-incrementável'],
  ['trigger_tool', 'TEXT', '&mdash;', 'Ferramenta que aciona a macro'],
  ['trigger_args_pattern', 'TEXT', 'null', 'Padrão de argumentos para correspondência'],
  ['next_tool', 'TEXT', '&mdash;', 'Ferramenta a encadear em seguida'],
  ['next_args', 'TEXT', '&mdash;', 'Argumentos para a ferramenta encadeada'],
  ['confidence', 'REAL', '0.0', 'Pontuação de confiança da macro'],
  ['used_count', 'INTEGER', '0', 'Número de vezes que a macro foi usada'],
  ['created_at', 'TEXT', '&mdash;', 'Timestamp RFC3339'],
  ['updated_at', 'TEXT', '&mdash;', 'Timestamp RFC3339'],
])}

<h3>Tabela scheduled_tasks</h3>
${configTable([
  ['id', 'TEXT PK', '—', 'Chave primária UUID'],
  ['name', 'TEXT', '—', 'Rótulo legível da tarefa'],
  ['cron_expr', 'TEXT', '—', 'Expressão cron de 5 campos calculada'],
  ['original_schedule', 'TEXT', '—', 'Entrada do usuário (linguagem natural ou cron)'],
  ['prompt', 'TEXT', '—', 'Prompt do agente para executar no agendamento'],
  ['source', 'TEXT', '—', '"tool" (criada via ferramenta) ou "config" (do config.toml)'],
  ['is_oneshot', 'INTEGER', '0', 'Disparar uma vez e depois auto-excluir'],
  ['is_paused', 'INTEGER', '0', 'Tarefas pausadas não disparam'],
  ['is_trusted', 'INTEGER', '0', 'Tarefas trusted ignoram aprovação do terminal'],
  ['next_run_at', 'TEXT', '—', 'Timestamp RFC3339 da próxima execução agendada'],
  ['last_run_at', 'TEXT', 'null', 'Timestamp RFC3339 da última execução'],
  ['created_at', 'TEXT', '—', 'Timestamp RFC3339'],
  ['updated_at', 'TEXT', '—', 'Timestamp RFC3339'],
])}

<h3>Tabela terminal_allowed_prefixes</h3>
${configTable([
  ['prefix', 'TEXT PK', '—', 'Prefixo de comando persistido a partir de aprovações "Permitir Sempre"'],
])}

<h2>Memória de Trabalho</h2>
<p>Um <code>HashMap<String, VecDeque<Message>></code> em memória por sessão, limitado a <code>working_memory_cap</code> (padrão 50). Evita acessos ao banco de dados para o histórico recente da conversa.</p>

<h2>Recuperação Tri-Híbrida</h2>
<p>O método <code>get_context</code> combina três estratégias de recuperação:</p>

<table class="config-table">
<thead><tr><th>Estratégia</th><th>Fonte</th><th>Limite</th><th>Propósito</th></tr></thead>
<tbody>
<tr><td><strong>Recência</strong></td><td>Últimas N mensagens</td><td>10</td><td>Continuidade conversacional</td></tr>
<tr><td><strong>Saliência</strong></td><td>importance &ge; 0.8</td><td>5</td><td>Memórias críticas sinalizadas</td></tr>
<tr><td><strong>Relevância</strong></td><td>Similaridade vetorial &gt; 0.65</td><td>5</td><td>Busca semântica via embeddings</td></tr>
</tbody>
</table>

<p>Os resultados são deduplicados por ID da mensagem antes de serem incluídos no contexto.</p>

<h2>Serviço de Embedding</h2>
<ul>
  <li><strong>Modelo:</strong> AllMiniLML6V2 (via fastembed)</li>
  <li>Roda em segundo plano — gera embeddings de novas mensagens após serem adicionadas</li>
  <li>Habilita a etapa de relevância da recuperação tri-híbrida</li>
</ul>

<h2>Consolidação de Memória</h2>
<p>Uma tarefa em segundo plano roda a cada <code>consolidation_interval_hours</code> (padrão 6). Ela comprime conversas antigas em resumos usando o modelo fast, reduzindo armazenamento e uso da janela de contexto.</p>

<h2>Pontuação de Importância</h2>
<table class="config-table">
<thead><tr><th>Papel</th><th>Pontuação Padrão</th></tr></thead>
<tbody>
<tr><td>Mensagem do usuário</td><td>0.5</td></tr>
<tr><td>Resposta do assistente</td><td>0.5</td></tr>
<tr><td>Saída de ferramenta</td><td>0.3</td></tr>
<tr><td>Mensagem do sistema</td><td>0.1</td></tr>
</tbody>
</table>

<h2>Pool de Conexões</h2>
<ul>
  <li>Pool SQLite: máximo de 5 conexões</li>
  <li>Modo de journal: WAL (Write-Ahead Logging) para leituras concorrentes</li>
  <li>Cria automaticamente o banco de dados e tabelas se ausentes</li>
</ul>
`
  },
  {
    slug: '/service-install',
    section: 'Service',
    title: 'Configuração systemd & launchd',
    description: 'Instale o aidaemon como um serviço systemd ou launchd que inicia na inicialização e roda continuamente.',
    content: () => `
<h1>Instalação como Serviço</h1>
<p class="lead">Instale o aidaemon como um serviço do sistema que inicia na inicialização e roda indefinidamente.</p>

<h2>Comando de Instalação</h2>
${codeBlock(`./aidaemon install-service`, 'bash')}

<p>Isso detecta automaticamente a plataforma e gera a configuração de serviço apropriada.</p>

<h2>Linux (systemd)</h2>
<p>Cria <code>/etc/systemd/system/aidaemon.service</code>:</p>
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

<p>Depois habilita e inicia o serviço:</p>
${codeBlock(`sudo systemctl daemon-reload
sudo systemctl enable --now aidaemon`, 'bash')}

<h2>macOS (launchd)</h2>
<p>Cria <code>$HOME/Library/LaunchAgents/ai.aidaemon.plist</code>:</p>
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

<p>Depois carrega o serviço:</p>
${codeBlock(`launchctl load ~/Library/LaunchAgents/ai.aidaemon.plist`, 'bash')}

${callout('warning', 'Prevenir Suspensão do macOS', 'O macOS pode suspender processos em segundo plano quando o sistema entra em suspensão. Para manter o aidaemon rodando continuamente, use <code>caffeinate</code>:<br><br><code>caffeinate -s aidaemon</code><br><br>A flag <code>-s</code> impede a suspensão enquanto o processo está rodando. Você também pode usar <code>caffeinate -i</code> para impedir a suspensão por inatividade sem manter a tela ligada. Se estiver rodando como serviço launchd, adicione <code>caffeinate -s</code> antes do caminho do binário nos <code>ProgramArguments</code> do seu plist.')}

<h2>Verificação de Saúde</h2>
<p>Uma vez rodando como serviço, verifique com:</p>
${codeBlock(`curl http://127.0.0.1:8080/health
# {"status": "ok"}`, 'bash')}

<p>O endpoint de saúde é servido pelo axum no <code>daemon.health_bind:daemon.health_port</code> configurado.</p>
`
  },
  {
    slug: '/event-sourcing',
    section: 'Event Sourcing',
    title: 'Sistema de Eventos',
    description: 'Log de eventos imutável para todas as ações do agente. Consolidação diária em fatos e procedimentos. Contexto de sessão.',
    content: () => `
<h1>Event Sourcing</h1>
<p class="lead">Cada ação do agente é registrada como um evento imutável. Eventos são a única fonte de verdade para o que aconteceu durante uma sessão.</p>

<h2>Tipos de Evento</h2>
<p>O sistema rastreia 16 tipos de eventos em 6 categorias:</p>

<table class="config-table">
<thead><tr><th>Categoria</th><th>Tipo de Evento</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td rowspan="2"><strong>Sessão</strong></td><td><code>SessionStart</code></td><td>Nova sessão de conversa inicia</td></tr>
<tr><td><code>SessionEnd</code></td><td>Sessão encerrada</td></tr>
<tr><td rowspan="2"><strong>Conversa</strong></td><td><code>UserMessage</code></td><td>Usuário envia uma mensagem</td></tr>
<tr><td><code>AssistantResponse</code></td><td>Agente envia uma resposta</td></tr>
<tr><td rowspan="2"><strong>Ferramentas</strong></td><td><code>ToolCall</code></td><td>Agente invoca uma ferramenta</td></tr>
<tr><td><code>ToolResult</code></td><td>Execução da ferramenta concluída</td></tr>
<tr><td><strong>Raciocínio</strong></td><td><code>ThinkingStart</code></td><td>Agente começa a raciocinar</td></tr>
<tr><td rowspan="2"><strong>Tarefas</strong></td><td><code>TaskStart</code></td><td>Agente inicia uma tarefa</td></tr>
<tr><td><code>TaskEnd</code></td><td>Tarefa concluída (com status)</td></tr>
<tr><td><strong>Erros</strong></td><td><code>Error</code></td><td>Erro ocorre durante o processamento</td></tr>
<tr><td rowspan="2"><strong>Sub-Agentes</strong></td><td><code>SubAgentSpawn</code></td><td>Sub-agente é iniciado</td></tr>
<tr><td><code>SubAgentComplete</code></td><td>Sub-agente finaliza</td></tr>
<tr><td rowspan="3"><strong>Aprovações</strong></td><td><code>ApprovalRequested</code></td><td>Solicitação de aprovação de comando enviada</td></tr>
<tr><td><code>ApprovalGranted</code></td><td>Usuário aprovou um comando</td></tr>
<tr><td><code>ApprovalDenied</code></td><td>Usuário negou um comando</td></tr>
</tbody>
</table>

<h2>Estrutura do Evento</h2>
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

<h2>Consolidação Diária</h2>
<p>Uma tarefa em segundo plano roda às <strong>3:00 AM UTC</strong> diariamente e processa eventos não consolidados:</p>
<ol>
  <li><strong>Extração de fatos</strong> &mdash; o LLM analisa sequências de eventos para extrair fatos duráveis</li>
  <li><strong>Aprendizado de procedimentos</strong> &mdash; padrões repetidos de chamadas de ferramentas são capturados como procedimentos</li>
  <li><strong>Rastreamento de soluções de erros</strong> &mdash; erros e suas resoluções são pareados para depuração futura</li>
</ol>
<p>Após o processamento, os eventos são marcados com um timestamp <code>consolidated_at</code>.</p>

<h2>Contexto da Sessão</h2>
<p>O sistema de eventos fornece um resumo da sessão para o contexto do LLM que inclui ferramentas usadas, erros encontrados, aprovações concedidas/negadas e atividade de sub-agentes.</p>

<h2>Remoção de Eventos</h2>
<p>Uma tarefa em segundo plano roda às <strong>3:30 AM UTC</strong> e remove eventos mais antigos que o período de retenção (padrão 30 dias).</p>

${callout('info', 'Imutabilidade', 'Eventos são somente de adição (append-only). O campo <code>consolidated_at</code> é o único campo atualizado após a criação.')}
`
  },
  {
    slug: '/plans',
    section: 'Plans',
    title: 'Planos (Legacy)',
    description: 'Referência legacy para execução baseada em planos. As versões atuais do aidaemon usam objetivos e tarefas.',
    content: () => `
<h1>Planos (Legacy)</h1>
<p class="lead">Esta página é para instalações antigas. As versões atuais do aidaemon trabalham com objetivos e tarefas.</p>

${callout('warning', 'Atualização v0.9.x', 'Planos não são mais o caminho principal de execução. Agora o aidaemon divide o trabalho em objetivos e tarefas.')}

<h2>Use estas páginas agora</h2>
<ul>
  <li><a href="/tools">Ferramentas</a> — como o trabalho roda no sistema atual</li>
  <li><a href="/scheduler">Tarefas agendadas</a> — automação recorrente ou pontual</li>
  <li><a href="/event-sourcing">Event Sourcing</a> — histórico completo do que aconteceu</li>
</ul>

<h2>Quando esta página importa</h2>
<p>Se você ainda usa uma versão antiga com planos, esta página fica como referência legacy.</p>
`
  },
  {
    slug: '/health-monitoring',
    section: 'Health Monitoring',
    title: 'Sondas de Serviço',
    description: 'Defina sondas de saúde HTTP, TCP, comando e arquivo para seus serviços com alertas e rastreamento de tendências.',
    content: () => `
<h1>Monitoramento de Saúde</h1>
<p class="lead">Defina sondas de saúde para seus serviços e receba alertas quando algo falhar.</p>

<h2>Tipos de Sonda</h2>
<table class="config-table">
<thead><tr><th>Tipo</th><th>Formato do Alvo</th><th>O Que Verifica</th></tr></thead>
<tbody>
<tr><td><code>http</code></td><td>URL</td><td>Código de status HTTP, corpo da resposta, latência</td></tr>
<tr><td><code>port</code></td><td>host:port</td><td>Conectividade TCP</td></tr>
<tr><td><code>command</code></td><td>Comando shell</td><td>Código de saída corresponde ao esperado (padrão: 0)</td></tr>
<tr><td><code>file</code></td><td>Caminho do arquivo</td><td>Arquivo existe e não é mais antigo que max_age_secs</td></tr>
</tbody>
</table>

<h2>Configuração</h2>
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

<h2>Opções de Sonda HTTP</h2>
${configTable([
  ['timeout_secs', 'integer', '10', 'Timeout da requisição em segundos'],
  ['expected_status', 'integer', '200', 'Código de status HTTP esperado'],
  ['expected_body', 'string', 'null', 'Substring esperada no corpo da resposta'],
  ['method', 'string', '"GET"', 'Método HTTP'],
  ['headers', 'object', '{}', 'Cabeçalhos HTTP personalizados'],
])}

<h2>Alertas</h2>
<p>Quando uma sonda falha <code>consecutive_failures_alert</code> vezes consecutivas, um alerta é enviado para todos os IDs de sessão em <code>alert_session_ids</code>.</p>

<h2>Tarefas em Segundo Plano</h2>
<ul>
  <li><strong>Loop de tick</strong> &mdash; roda a cada <code>tick_interval_secs</code> (padrão 30), executa sondas pendentes</li>
  <li><strong>Limpeza</strong> &mdash; roda às <strong>3:40 AM UTC</strong>, remove resultados antigos</li>
</ul>

${callout('info', 'Sondas Dinâmicas', 'Sondas também podem ser criadas em tempo de execução pelo agente via a ferramenta <code>health_probe</code>.')}
`
  },
  {
    slug: '/updates',
    section: 'Updates',
    title: 'Auto-Atualizador',
    description: 'Auto-atualização do aidaemon a partir de releases do GitHub. Três modos: notificar, baixar ou auto-instalar.',
    content: () => `
<h1>Auto-Atualizador</h1>
<p class="lead">O aidaemon pode verificar novas releases no GitHub e se atualizar automaticamente.</p>

<h2>Destaques Recentes</h2>
<ul>
  <li><strong>v0.9.2</strong> &mdash; mais confiabilidade nas ferramentas, validações de intenção mais fortes, melhor tratamento de comandos em segundo plano e aliases de caminho</li>
  <li><strong>v0.9.1</strong> &mdash; melhor contexto de follow-up, limites de escopo por projeto e bloqueios rígidos para exclusões perigosas</li>
  <li><strong>v0.9.0</strong> &mdash; chegada do sistema consultor, grande refatoração do agente e migração para eventos canônicos</li>
</ul>

<h2>Modos de Atualização</h2>
<table class="config-table">
<thead><tr><th>Modo</th><th>Comportamento</th></tr></thead>
<tbody>
<tr><td><code>enable</code></td><td>Baixar e aplicar atualizações automaticamente, depois reiniciar</td></tr>
<tr><td><code>check_only</code> (padrão)</td><td>Notificar e aguardar aprovação antes de aplicar</td></tr>
<tr><td><code>disable</code></td><td>Sem verificação de atualizações</td></tr>
</tbody>
</table>

<h2>Configuração</h2>
${codeBlock(`[updates]
mode = "check_only"
check_interval_hours = 24
check_at_utc_hour = 6
confirmation_timeout_mins = 60`, 'toml', 'config.toml')}

${configTable([
  ['mode', 'string', '"check_only"', 'Modo de atualização: enable, check_only ou disable'],
  ['check_interval_hours', 'integer', '24', 'Horas entre verificações de atualização'],
  ['check_at_utc_hour', 'integer', 'null', 'Hora UTC específica (0-23) para verificação diária'],
  ['confirmation_timeout_mins', 'integer', '60', 'Minutos para aguardar aprovação do usuário'],
])}

<h2>Processo de Atualização</h2>
<ol>
  <li><strong>Verificar</strong> &mdash; consulta a API de Releases do GitHub</li>
  <li><strong>Comparar</strong> &mdash; comparação por semver</li>
  <li><strong>Notificar</strong> &mdash; envia notas de release para os canais</li>
  <li><strong>Aprovar</strong> (check_only) &mdash; solicitação de aprovação com timeout</li>
  <li><strong>Baixar</strong> &mdash; binário específico da plataforma</li>
  <li><strong>Substituir</strong> &mdash; sobrescreve o binário atual</li>
  <li><strong>Reiniciar</strong> &mdash; sai com código 75 para acionar reinicialização do serviço</li>
</ol>

<h2>Suporte a Plataformas</h2>
<table class="config-table">
<thead><tr><th>Plataforma</th><th>Arquitetura</th></tr></thead>
<tbody>
<tr><td>Linux</td><td>x86_64, aarch64</td></tr>
<tr><td>macOS</td><td>x86_64, aarch64</td></tr>
</tbody>
</table>

${callout('warn', 'Usuários do Homebrew', 'Se instalado via Homebrew, use <code>brew upgrade aidaemon</code> em vez disso, ou defina <code>mode = "disable"</code>.')}
`
  },
];

export default pages;
