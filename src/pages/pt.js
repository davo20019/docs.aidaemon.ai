import { codeBlock, callout, configTable } from '../helpers.js';

const pages = [
  {
    slug: '/',
    section: null,
    title: 'Documentação do AIDaemon — Daemon de Agente de IA Pessoal',
    description: 'Documentação do aidaemon, um daemon de agente de IA pessoal de código aberto. Converse pelo Telegram, Slack ou Discord. Estenda com MCP e use qualquer LLM.',
    content: () => `
<h1><span class="ai">AID</span>aemon</h1>
<p class="lead">Um agente de IA pessoal que roda como daemon. Sempre ligado, sempre aprendendo. Converse pelo app do AIDaemon ou pelo Telegram, Slack e Discord, estenda com MCP e use o LLM que preferir.</p>

${callout('success', 'Novo por aqui?', 'Comece pela <a href="/getting-started/build">Instalação</a>: baixe o app para macOS, Windows ou Linux e abra-o. Versão atual: <strong>0.21.0</strong>.')}

<p>O aidaemon é um agente de IA auto-hospedado, escrito em Rust, que roda como serviço em segundo plano na sua máquina. Ele se conecta ao ChatGPT, Anthropic, Gemini, xAI ou a qualquer provedor de LLM compatível com a OpenAI, conversa por meio do seu próprio app (desktop, web e terminal) e pelo Telegram, Slack ou Discord, e pode executar ferramentas, gerenciar a própria configuração, lembrar de fatos, navegar na web e criar subagentes — tudo de forma autônoma.</p>

<h2>Principais Recursos</h2>
<ul>
  <li><strong>O app do AIDaemon</strong> — um único app para desktop, web e terminal: respostas em streaming, leitura em voz alta, aprovações, configurações e uso. Veja <a href="/app">O App do AIDaemon</a></li>
  <li><strong>Visualizações ao vivo</strong> — acompanhe o navegador do agente e assuma o controle quando ele precisar de um login</li>
  <li><strong>Agentes de código</strong> — Claude Code, Codex, Antigravity e qualquer agente do Agent Client Protocol, no modo de permissão que você escolher</li>
  <li><strong>Arquitetura de daemon</strong> — roda como serviço systemd/launchd, sempre disponível</li>
  <li><strong>Multicanal</strong> — converse pelo Telegram, Slack ou Discord, com controle de acesso para vários usuários</li>
  <li><strong>Uso agêntico de ferramentas</strong> — raciocínio autônomo em várias etapas, com aprovações para efeitos colaterais</li>
  <li><strong>Integração com MCP</strong> — estenda com qualquer servidor Model Context Protocol</li>
  <li><strong>Memória persistente</strong> — histórico em SQLite com busca semântica por embeddings</li>
  <li><strong>Roteamento multimodelo</strong> — seleção automática entre os níveis Fast/Primary/Smart</li>
  <li><strong>Gatilhos de e-mail</strong> — monitoramento por IMAP IDLE para notificações da caixa de entrada</li>
  <li><strong>Aprovação de comandos</strong> — aprove comandos de shell e outros efeitos colaterais pelo app ou por qualquer chat conectado (Telegram, Slack, Discord)</li>
  <li><strong>Sistema de skills</strong> — aprimoramento dinâmico do prompt por meio de arquivos markdown</li>
  <li><strong>Automanutenção</strong> — lê, atualiza, valida e restaura a própria configuração</li>
  <li><strong>Automação de navegador</strong> — Chrome com sessões de login persistentes, capturas de tela e preenchimento de formulários</li>
  <li><strong>Pesquisa na web</strong> — busca integrada (DuckDuckGo, Brave ou seu próprio SearxNG, consultados em paralelo) e leitura de URLs</li>
  <li><strong>Criação de subagentes</strong> — delegação recursiva de agentes para tarefas complexas</li>
  <li><strong>Delegação a agentes de CLI</strong> — delegue ao Claude Code, Codex, Antigravity, Gemini, Copilot, Aider ou qualquer agente ACP</li>
  <li><strong>Tarefas agendadas</strong> — tarefas recorrentes no estilo cron, com interpretação de linguagem natural</li>
  <li><strong>Transferência de arquivos</strong> — envie e receba arquivos pelo Telegram, com segurança de caminhos</li>
  <li><strong>Gerenciamento de segredos</strong> — suporte ao chaveiro do sistema e a variáveis de ambiente</li>
  <li><strong>Controle de custo de tokens</strong> — estatísticas de uso por modelo, comando /cost, limites de plano e saldos em Settings</li>
  <li><strong>Event sourcing</strong> — log de eventos imutável, com consolidação diária em fatos e procedimentos</li>
  <li><strong>Metas + tarefas</strong> — divida trabalhos maiores em tarefas rastreáveis e mantenha o progresso andando</li>
  <li><strong>Monitoramento de saúde</strong> — sondas HTTP, TCP, de comando e de arquivo, com alertas</li>
  <li><strong>Skills dinâmicas</strong> — instale a partir de registros ou promova automaticamente procedimentos repetidos</li>
  <li><strong>Autoatualizador</strong> — atualização automática a partir das versões do GitHub, com modos configuráveis</li>
  <li><strong>Integração com Discord</strong> — comandos de barra, botões de aprovação interativos, suporte a vários bots</li>
  <li><strong>Aprovações de comandos</strong> — uma checagem de segurança do que cada comando faz decide se pergunta a você; os cartões são classificados como Safe, Medium, High ou Critical</li>
  <li><strong>Inteligência de pessoas</strong> — uma agenda de contatos pessoal que lembra aniversários, preferências e relacionamentos por você</li>
</ul>

<h2>Arquitetura em Resumo</h2>
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

<h2>Links Rápidos</h2>
<ul>
  <li><a href="/getting-started/build">Instalação</a> — baixe o app para macOS, Windows ou Linux</li>
  <li><a href="/app">O App do AIDaemon</a> — chat, aprovações, visualizações ao vivo, configurações</li>
  <li><a href="/configuration">Referência de Configuração</a> — documentação completa do config.toml</li>
  <li><a href="/tools">Ferramentas</a> — sistema de ferramentas integradas e extensíveis</li>
  <li><a href="/telegram">Telegram</a> — configuração do bot, comandos, fluxo de aprovação</li>
  <li><a href="/slack">Slack</a> — integração com o workspace via Socket Mode</li>
  <li><a href="/discord">Discord</a> — configuração do bot, comandos de barra, botões de aprovação</li>
  <li><a href="/architecture">Como o AIDaemon Funciona</a> — da mensagem à resposta: kernel, hooks, limites, encerramento</li>
  <li><a href="/event-sourcing">Event Sourcing</a> — o log de eventos somente de acréscimo e o que é construído a partir dele</li>
  <li><a href="/plans">Planos &amp; Checklists</a> — como um pedido é declarado e julgado como concluído</li>
  <li><a href="/health-monitoring">Monitoramento de Saúde</a> — o endpoint /health, watchdogs e sondas de serviço</li>
</ul>
`
  },
  {
    slug: '/getting-started',
    section: 'Getting Started',
    title: 'Visão Geral',
    description: 'Coloque o AIDaemon para rodar no seu computador: baixe o app, abra, conecte um modelo e comece a conversar.',
    content: () => `
<h1>Primeiros Passos</h1>
<p class="lead">Baixe o app do AIDaemon, abra, conecte um modelo e comece a conversar. Não é preciso terminal no macOS nem no Windows.</p>

<p>A versão atual é <strong>0.21.0</strong>.</p>

<h2>O que você precisa</h2>
<ul>
  <li><strong>Um computador</strong> &mdash; um Mac (Apple silicon ou Intel), um PC com Windows ou Linux (x86_64 ou ARM64).</li>
  <li><strong>Um modelo</strong> &mdash; um plano do ChatGPT no qual você faz login, ou uma chave de API de um provedor como Anthropic, Google Gemini, OpenAI ou OpenRouter, ou um modelo rodando na sua própria máquina (Ollama, llama.cpp). O app encontra um que já esteja no seu computador, quando consegue.</li>
  <li><strong>Opcional:</strong> um bot do Telegram, Slack ou Discord, se você também quiser falar com seu agente pelos apps de chat do celular. Você pode adicioná-lo depois.</li>
</ul>

<h2>Passos</h2>
<ol>
  <li><a href="/getting-started/build">Instalar</a> &mdash; baixe e abra o app para o seu computador</li>
  <li><a href="/getting-started/wizard">Primeira execução</a> &mdash; o app inicia o assistente e conecta um modelo</li>
  <li><a href="/app">Usar o app</a> &mdash; chat, aprovações, visualizações ao vivo, configurações</li>
  <li><a href="/configuration">Configurar</a> &mdash; toda configuração também está no <code>config.toml</code> e na página Settings do app</li>
</ol>
`
  },
  {
    slug: '/getting-started/build',
    section: 'Getting Started',
    title: 'Instalação',
    description: 'Baixe e instale o AIDaemon no macOS, Windows ou Linux, passo a passo. Opções avançadas: Homebrew, Cargo, compilar a partir do código-fonte, servidores.',
    content: () => `
<h1>Instalar o AIDaemon</h1>
<p class="lead">Escolha seu computador abaixo e siga os passos. Leva poucos minutos e, no macOS e no Windows, você nunca precisa de um terminal.</p>

<p>Todos os downloads estão na <a href="https://github.com/davo20019/aidaemon/releases/latest" target="_blank" rel="noopener">página da última versão</a>. A versão atual é <strong>0.21.0</strong>.</p>

<h2>macOS</h2>
<p><strong>Primeiro, descubra qual Mac você tem:</strong> clique no menu Apple (o logotipo da maçã no canto superior esquerdo da tela) &rarr; <strong>Sobre Este Mac</strong>. Se a linha <strong>Chip</strong> disser <em>Apple M&hellip;</em>, você tem Apple silicon. Se aparecer uma linha <strong>Processador</strong> com <em>Intel</em>, você tem um Mac Intel.</p>
<ol>
  <li>Baixe o app para o seu Mac:
    <ul>
      <li>Apple silicon (M1, M2, M3 e posteriores): <a href="https://github.com/davo20019/aidaemon/releases/latest/download/AIdaemon-macos-aarch64.dmg"><code>AIdaemon-macos-aarch64.dmg</code></a></li>
      <li>Intel: <a href="https://github.com/davo20019/aidaemon/releases/latest/download/AIdaemon-macos-x86_64.dmg"><code>AIdaemon-macos-x86_64.dmg</code></a></li>
    </ul>
  </li>
  <li>Abra o arquivo <code>.dmg</code> baixado.</li>
  <li>Arraste o <strong>AIDaemon</strong> para a pasta <strong>Aplicativos</strong>.</li>
  <li>Abra o AIDaemon a partir de Aplicativos (ou do Launchpad).</li>
</ol>
${callout('info', 'Se o macOS bloquear na primeira vez', 'Abra <strong>Ajustes do Sistema &rarr; Privacidade e Segurança</strong>, role até a mensagem sobre o AIDaemon e clique em <strong>Abrir Mesmo Assim</strong>. Você só precisa fazer isso uma vez.')}

<h2>Windows</h2>
<ol>
  <li>Baixe o <a href="https://github.com/davo20019/aidaemon/releases/latest/download/aidaemon-windows-x86_64.zip"><code>aidaemon-windows-x86_64.zip</code></a>.</li>
  <li>Clique com o botão direito no arquivo zip e escolha <strong>Extrair Tudo&hellip;</strong>. Extraia para uma pasta que você vai manter (por exemplo <code>%LOCALAPPDATA%\\AIDaemon</code>), não para a pasta Downloads.</li>
  <li>Abra a pasta extraída e dê um clique duplo em <code>aidaemon-app.exe</code>.</li>
</ol>
${callout('info', 'Se o Windows SmartScreen avisar', 'Clique em <strong>Mais informações</strong> e depois em <strong>Executar assim mesmo</strong>.')}

<h2>Linux</h2>
<p>Abra um terminal e execute o instalador. Ele baixa a versão certa para a sua máquina (x86_64 ou ARM64), verifica o arquivo e instala o app também (a versão web dele vai para <code>~/.aidaemon/app-web</code>):</p>
${codeBlock(`curl -sSfL https://get.aidaemon.ai | bash`, 'bash')}
<p>Ou baixe um arquivo de versão por conta própria e extraia:</p>
<ul>
  <li>x86_64: <a href="https://github.com/davo20019/aidaemon/releases/latest/download/aidaemon-linux-x86_64.tar.gz"><code>aidaemon-linux-x86_64.tar.gz</code></a></li>
  <li>ARM64 (aarch64): <a href="https://github.com/davo20019/aidaemon/releases/latest/download/aidaemon-linux-aarch64.tar.gz"><code>aidaemon-linux-aarch64.tar.gz</code></a></li>
</ul>
<p>Depois abra o app com <code>aidaemon-app</code> (uma janela) ou <code>aidaemon-app --tui</code> (no terminal). Na primeira vez, ele oferece <strong>Run it here</strong>, que inicia o assistente agora e a cada login. Depois disso, <code>aidaemon app</code> e <code>aidaemon tui</code> também funcionam quando executados a partir de <code>~/.aidaemon</code>, a pasta do assistente.</p>

<h2>Homebrew (macOS ou Linux)</h2>
${codeBlock(`brew install davo20019/tap/aidaemon`, 'bash')}
<p>Depois execute <code>aidaemon-app</code>.</p>

<h2>O que acontece em seguida</h2>
<p>Na primeira vez que o app abre, ele inicia o assistente neste computador (agora e a cada login, sem precisar de senha de administrador) e ajuda você a conectar um modelo. Veja <a href="/getting-started/wizard">Primeira execução</a>.</p>

<h2>Avançado</h2>

<h3>Cargo</h3>
<p>Para desenvolvedores Rust:</p>
${codeBlock(`cargo install --locked aidaemon`, 'bash')}
<p>Isso instala apenas o daemon, compilado a partir dos crates do SDK do AIDaemon no crates.io. Compile o app a partir de <code>clients/app</code> em um checkout.</p>

<h3>Compilar a partir do código-fonte</h3>
${codeBlock(`git clone https://github.com/davo20019/aidaemon.git
cd aidaemon
cargo build --release`, 'bash')}
<p>O binário fica em <code>./target/release/aidaemon</code>. Os recursos padrão são <code>discord</code>, <code>slack</code>, <code>encryption</code>, <code>browser</code>, <code>terminal-bridge</code>, <code>otel</code> e <code>execution-docker</code>. Os recursos opcionais incluem <code>computer_use</code> e <code>computer_use-macos</code> (operam apps nativos do macOS) e <code>sdk-memory</code>. O próprio app fica em <code>clients/app</code> e é compilado separadamente.</p>

<h3>Rodando em um servidor</h3>
<p>Em um servidor, execute <code>aidaemon</code> sem configuração, na pasta que guardará a configuração: <code>~/.aidaemon</code>, a pasta que o <code>aidaemon service install</code> usa. Ele imprime um link e um código de uso único. Acesse a porta <code>8788</code> da máquina por um túnel SSH ou pelo seu próprio túnel HTTPS, abra o link no seu notebook ou celular e conclua a configuração por lá (o código pareia somente o primeiro dispositivo):</p>
${codeBlock(`# on the server
mkdir -p ~/.aidaemon && cd ~/.aidaemon && aidaemon

# on your laptop
ssh -L 8788:127.0.0.1:8788 you@your-server
# then open the printed link in your browser`, 'bash')}
<p>Prefere um terminal? Execute <code>aidaemon setup</code> nessa pasta para conectar o modelo ali mesmo. Para manter o daemon rodando, veja <a href="/service-install">Executar como serviço</a>. Para acessar o app de outros dispositivos sem SSH, veja <a href="/app/gateway">Client Gateway &amp; pareamento</a>.</p>

<h3>Verificar um download</h3>
<p>Todo arquivo de versão tem um arquivo <code>.sha256</code> correspondente na página da versão. O instalador de uma linha faz essa verificação por você.</p>
`
  },
  {
    slug: '/getting-started/wizard',
    section: 'Getting Started',
    title: 'Primeira Execução',
    description: 'O que acontece na primeira vez que você abre o AIDaemon: o assistente inicia no seu computador, encontra ou conecta um modelo e abre sua primeira conversa.',
    content: () => `
<h1>Primeira Execução</h1>
<p class="lead">Na primeira vez que você abre o app do AIDaemon, ele inicia o assistente no seu computador e ajuda você a conectar um modelo. Nada é salvo até que uma chamada de teste ao modelo seja respondida.</p>

<h2>1. Onde o assistente roda</h2>
<p>O app desktop inicia o assistente (o daemon) neste computador imediatamente, agora e a cada login, sem senha de administrador. Isso é <strong>Run it here</strong>, o mesmo que <code>aidaemon service install</code>. Para rodá-lo em um servidor, escolha <strong>Run it on another machine instead</strong> e cole o link que esse servidor imprimiu (veja <a href="/getting-started/build">Instalação &rarr; Rodando em um servidor</a>).</p>

<h2>2. Conecte um modelo</h2>
<p>O app procura um modelo que já esteja no seu computador &mdash; um login do ChatGPT, uma chave de provedor no ambiente (como <code>OPENAI_API_KEY</code> ou <code>ANTHROPIC_API_KEY</code>) ou Ollama ou llama.cpp rodando localmente &mdash; e o oferece com um clique. Ou escolha você mesmo um provedor:</p>
<ul>
  <li><strong>Assinatura do ChatGPT</strong> &mdash; faça login pelo app. Em outro dispositivo, cole o endereço em que o navegador termina.</li>
  <li><strong>Uma chave de provedor</strong> &mdash; a chave é verificada primeiro e depois você escolhe um modelo na lista da sua própria conta (o usual já vem pré-selecionado).</li>
  <li><strong>Auto-hospedado</strong> &mdash; <strong>Ollama (local)</strong>, <strong>llama.cpp (local)</strong> ou <strong>Outro serviço compatível com a OpenAI</strong>, com o endereço do seu servidor (LM Studio, vLLM) e a chave deixada em branco.</li>
</ul>
<p>Cada provedor informa se usa o seu plano, cobra por token ou roda na sua própria máquina. Uma chamada de teste precisa ser respondida antes que qualquer coisa seja salva.</p>

<table class="config-table">
<thead><tr><th>Provedor</th><th>Variável da chave</th><th>Modelos iniciais (primary / fast / smart)</th><th>Cobrança</th></tr></thead>
<tbody>
<tr><td>OpenAI (assinatura do ChatGPT)</td><td>login</td><td>gpt-6-sol / gpt-6-luna / gpt-6-sol</td><td>Seu plano</td></tr>
<tr><td>Anthropic</td><td><code>ANTHROPIC_API_KEY</code></td><td>claude-sonnet-5-5 / claude-haiku-5-5 / claude-opus-5-5</td><td>Por token</td></tr>
<tr><td>OpenAI</td><td><code>OPENAI_API_KEY</code></td><td>gpt-5</td><td>Por token</td></tr>
<tr><td>Google Gemini</td><td><code>GEMINI_API_KEY</code> ou <code>GOOGLE_API_KEY</code></td><td>gemini-4-hydrogen / gemini-3.5-flash-lite / gemini-4-argon</td><td>Por token</td></tr>
<tr><td>OpenRouter</td><td><code>OPENROUTER_API_KEY</code></td><td>moonshotai/kimi-k2.5</td><td>Por token</td></tr>
<tr><td>xAI (Grok)</td><td><code>XAI_API_KEY</code></td><td>grok-4</td><td>Por token</td></tr>
<tr><td>DeepSeek</td><td><code>DEEPSEEK_API_KEY</code></td><td>deepseek-chat / deepseek-chat / deepseek-reasoner</td><td>Por token</td></tr>
<tr><td>Moonshot AI (Kimi)</td><td><code>MOONSHOT_API_KEY</code></td><td>kimi-k2.5 / kimi-k2.5 / kimi-k2-thinking</td><td>Por token</td></tr>
<tr><td>MiniMax</td><td><code>MINIMAX_API_KEY</code></td><td>MiniMax-M2.5 / MiniMax-M2.5-highspeed / MiniMax-M2.5</td><td>Por token</td></tr>
<tr><td>Outro serviço compatível com a OpenAI</td><td>&mdash;</td><td>À sua escolha</td><td>Por token</td></tr>
<tr><td>Ollama, llama.cpp</td><td>nenhuma</td><td>Listados a partir do seu servidor</td><td>Local</td></tr>
</tbody>
</table>
<p>O Cloudflare AI Gateway não é oferecido na primeira execução; adicione-o depois em Settings ou no <code>config.toml</code> (veja <a href="/providers">Provedores</a>).</p>
<p>Estas são apenas as escolhas iniciais; o app oferece o que a sua conta realmente lista. Veja <a href="/providers">Provedores</a> para a configuração que cada um grava.</p>
${callout('info', 'llama.cpp e a porta 8080', 'O <code>llama-server</code> e a verificação de saúde do daemon usam a porta 8080 por padrão. Inicie um deles em outra porta (<code>llama-server --port 8081</code>, ou <code>[daemon] health_port</code>) e informe o endereço do llama.cpp no formulário dele.')}

<h2>3. Sua primeira conversa</h2>
<p>Em seguida vem uma etapa opcional, <strong>Reach it from your phone</strong>: conecte um bot do Telegram, Slack ou Discord pelo token dele (a etapa termina quando sua primeira mensagem ali for respondida), ou toque em <strong>Not now</strong>. Então sua primeira conversa se abre. A saudação diz o que o agente faz por conta própria, sobre o que ele pergunta primeiro e oferece prompts para tocar. Para falar com seu agente pelo Telegram, Slack ou Discord mais tarde, use <strong>Settings &rarr; Reach it from your phone</strong>: conecte um bot pelo token dele, e essa etapa termina quando sua primeira mensagem ali for respondida.</p>

<h2>Configuração pelo terminal</h2>
<p>Sem um <code>config.toml</code> na sua pasta (a pasta de onde é iniciado), o <code>aidaemon</code> roda em <em>modo de configuração</em>: o Client Gateway no endereço loopback de sempre (porta 8788), sem nenhum agente por trás, além de um link e um código de uso único para um dispositivo em outro lugar. O primeiro dispositivo a resgatá-lo se torna o dispositivo proprietário. O <code>aidaemon setup</code> faz a etapa do modelo no terminal. O antigo assistente de configuração interativo não existe mais; o <code>aidaemon setup low-latency</code> continua igual. Um segundo daemon na mesma máquina pode usar outra porta de configuração com <code>AIDAEMON_GATEWAY_PORT</code>.</p>
`
  },
  {
    slug: '/app',
    section: 'App',
    title: 'O App do AIDaemon',
    description: 'O app do AIDaemon para desktop, web e terminal: chat, aprovações, visualizações ao vivo do navegador do agente, arquivos de projeto, leitura em voz alta, configurações e uso.',
    content: () => `
<h1>O App do AIDaemon</h1>
<p class="lead">Um único app para desktop, web e terminal: converse com seu agente, responda às aprovações dele, acompanhe o trabalho e altere as configurações.</p>

<h2>Abrindo o app</h2>
<table class="config-table">
<thead><tr><th>Onde</th><th>Como</th></tr></thead>
<tbody>
<tr><td>Janela do desktop</td><td>Abra o AIDaemon (macOS, Windows) ou execute <code>aidaemon-app</code> (Linux). Depois de configurado, <code>aidaemon app</code> executado a partir de <code>~/.aidaemon</code> também funciona.</td></tr>
<tr><td>Terminal</td><td><code>aidaemon-app --tui</code>, ou <code>aidaemon tui</code> executado a partir de <code>~/.aidaemon</code></td></tr>
<tr><td>Navegador nesta máquina</td><td><code>aidaemon web</code> (executado a partir de <code>~/.aidaemon</code>) abre a versão web e a pareia (confirme no terminal)</td></tr>
<tr><td>Celular ou outro computador</td><td>Pareie-o e depois abra o endereço do gateway. Veja <a href="/app/gateway">Client Gateway &amp; pareamento</a>.</td></tr>
</tbody>
</table>
<p>O app conversa com o daemon por meio do <a href="/app/gateway">Client Gateway</a>. Os downloads e o instalador o configuram para você; com o gateway desligado, o app explica como ligá-lo.</p>

<h2>Conversando</h2>
<ul>
  <li><strong>As respostas chegam em streaming</strong> conforme o modelo as escreve (web e desktop).</li>
  <li><strong>Read aloud</strong> &mdash; abaixo de uma resposta, ao lado de Copy, Read aloud a fala com a voz do próprio sistema: a fala do navegador no app web, <code>say</code> no macOS, as vozes integradas do Windows e <code>spd-say</code> ou <code>espeak-ng</code> (ou <code>espeak</code>) no Linux. Sem nenhum desses instalados no Linux, não há botão. Blocos de código são lidos como "(código)" e links, como o texto deles.</li>
  <li><strong>Ditado</strong> &mdash; no app web pelo reconhecedor de fala do navegador e, no app do macOS, pelo reconhecedor do sistema. Pressionar Send encerra o ditado.</li>
  <li><strong>Qual modelo respondeu</strong> &mdash; abaixo de cada resposta, depois do horário e de Copy, o provedor e o modelo que de fato a escreveu (um failover é indicado quando ele respondeu).</li>
  <li><strong>Edit and Send again</strong> &mdash; toda mensagem que você enviou tem Copy, Edit e Send again. Ambos adicionam uma nova mensagem no final, então nada acima se perde.</li>
  <li><strong>Archive</strong> &mdash; arquive ou restaure uma conversa pelo menu dela. As arquivadas ficam em Archived, no filtro da barra lateral, e a busca também as procura. Escrever em um chat arquivado o restaura.</li>
  <li><strong>Pull to refresh</strong> &mdash; puxe uma lista para baixo além do topo ou, no desktop, pressione Cmd/Ctrl+R. Ao voltar depois de 30 segundos ou mais fora, o app se atualiza sozinho.</li>
  <li><strong>As etapas sobrevivem a uma reconexão</strong> &mdash; reconectar durante um turno mostra o que cada etapa recebeu e o que devolveu.</li>
</ul>

<h2>Teclado</h2>
<p>O app prioriza o teclado: <kbd>Esc</kbd> interrompe o trabalho da sessão, <kbd>y</kbd>/<kbd>s</kbd>/<kbd>a</kbd>/<kbd>n</kbd> respondem a um cartão de aprovação depois que ele ficou na tela tempo suficiente para ser lido, e uma única paleta (<kbd>Ctrl/Cmd+K</kbd>) reúne sessões e comandos. A linha de status sempre diz se o daemon está conectado, reconectando, parado ou se desconectou o dispositivo.</p>

<h2>Aprovações</h2>
<p>Todo cartão de aprovação de qualquer chat pode ser respondido pelo app; a primeira resposta vale, e o cartão no chat passa a dizer quem respondeu. O primeiro cartão em cada dispositivo explica sobre o que o agente pergunta e o que cada resposta faz.</p>

<h2>Visualizações ao vivo: acompanhe e assuma o controle</h2>
<p>O cabeçalho de uma conversa abre uma visualização ao vivo do navegador do agente: acompanhe o trabalho dele, assuma o controle e devolva-o. No celular funciona como um navegador (toque para clicar, arraste para rolar, pince para dar zoom, digite com o teclado do celular); com mouse e teclado funciona como uma janela de área de trabalho remota. Quando o agente precisa de você (um login, um captcha), ele passa a aba para você com um cartão de assumir controle em todos os canais (Open the live view, Done, Not now). Você mesmo digita o login; o agente nunca o vê.</p>
<p>Com <code>[surfaces] desktop = true</code> (desligado por padrão, macOS com computer use), as telas deste computador podem ser observadas e controladas da mesma forma, e o <code>aidaemon share-screen</code> pareia outro computador uma única vez e compartilha a tela principal dele. Veja <a href="/configuration">Configuração &rarr; [surfaces]</a>.</p>

<h2>Projetos e arquivos</h2>
<p>O painel de detalhes de uma conversa de código tem uma aba <strong>Files</strong>, e a página de um projeto abre a pasta dele: somente leitura, com as alterações do git marcadas, arquivos ignorados sob demanda e segredos mostrados apenas pelo nome. Imagens e PDFs têm pré-visualização. Os projetos podem ser fixados, ordenados e excluídos pelo menu deles (excluir um projeto não mexe na pasta dele no disco).</p>
<p>Uma conversa em um projeto guarda o que aprende nas notas do próprio projeto, em <code>~/.aidaemon/projects/&lt;project-id&gt;/memory/</code>, separadas da sua memória pessoal. Ela também recebe as skills do próprio repositório (<code>.agents/skills</code>, <code>.claude/skills</code>) e pode iniciar os servidores MCP que o <code>.mcp.json</code> dele declara, cada um somente depois que você aprova o comando exato. O seu <code>~/.aidaemon/AGENTS.md</code> é carregado como o arquivo de instruções mais abrangente de todo projeto.</p>

<h2>Agentes de código</h2>
<p>Cada agente de código roda em um modo de permissão que você escolhe por agente em Settings, e Settings mostra se cada um pode trabalhar agora. Veja <a href="/tools/cli-agents">Delegação a Agentes de CLI</a>.</p>

<h2>Settings</h2>
<p>A página Settings (desktop, web e terminal) mostra todas as configurações que o <code>config.toml</code> contém ou documenta, por tabela, com seu valor ou padrão, se alterá-la pede confirmação e se ela entra em vigor com um reload ou uma reinicialização. Edite as configurações no próprio lugar, guarde segredos no chaveiro, troque de provedor e adicione failovers, gerencie servidores MCP e bots, e use Reload ou Restart. Alterações sensíveis à segurança (segredos, <code>base_url</code>, usuários permitidos, o gateway, comandos de MCP e de agentes de CLI) aguardam sua aprovação como qualquer cartão.</p>
<p>Settings também mostra <strong>o que cada conta usou e o que ainda tem</strong>: os limites de 5 horas e semanais de um plano do ChatGPT e o saldo de uma chave do OpenRouter, cada um com um medidor e a sua renovação.</p>

<h2>Automações</h2>
<p>Os agendamentos podem nomear um fuso horário IANA ("todo dia útil às 8h Europe/Madrid") e seguem o horário de verão dele. Os cartões de automação mostram o fuso do agendamento e as execuções no seu horário; uma execução perdida enquanto o daemon estava desligado aparece como Missed. Veja <a href="/scheduler">Tarefas Agendadas</a>.</p>
`
  },
  {
    slug: '/app/gateway',
    section: 'App',
    title: 'Client Gateway & Pareamento',
    description: 'O Client Gateway atende o app do AIDaemon e os dispositivos pareados: chaves de configuração, comandos, pareamento, túneis e o protocolo do cliente.',
    content: () => `
<h1>Client Gateway &amp; Pareamento</h1>
<p class="lead">O Client Gateway serve o AIDaemon Client Protocol para seus próprios apps e dispositivos pareados. Ele escuta somente em loopback; os outros dispositivos o acessam por um túnel.</p>

<h2>Ligando</h2>
<p>Os downloads do macOS e do Windows e a configuração da primeira execução o ligam para você. Manualmente:</p>
${codeBlock(`[client_gateway]
enabled = true
# bind = "127.0.0.1"
# port = 8788
# public_url = "https://aidaemon.example.ts.net"   # your HTTPS tunnel, for pairing links`, 'toml', 'config.toml')}
<p>Ou peça ao agente para "ativar o client gateway": o <code>manage_config</code> faz isso em uma única etapa aprovada e depois reinicia. Qualquer alteração em uma chave de <code>client_gateway</code> precisa da aprovação do proprietário.</p>

${configTable([
  ['enabled', 'bool', 'false', 'Serve o Client Gateway'],
  ['bind', 'string', '"127.0.0.1"', 'Endereço de escuta. Deve ser loopback: um bind fora do loopback é recusado.'],
  ['port', 'integer', '8788', 'Porta de escuta'],
  ['token_file', 'string', 'null', 'Onde o hash do token local é guardado. Vazio: <code>~/.aidaemon/client-gateway-token.sha256</code>.'],
  ['retention_days', 'integer', '7', 'Janela de retomada. Um cliente mais atrasado recebe um snapshot.'],
  ['max_events', 'integer', '100000', 'Máximo de eventos que o log de retomada mantém'],
  ['watch_risk_ceiling', 'string', '"medium"', 'Maior risco que um smartwatch pareado pode aprovar; acima disso ele só pode negar'],
  ['public_url', 'string', 'null', 'O endereço HTTPS que os dispositivos pareados usam, colocado nos links de pareamento'],
  ['app_dir', 'string', 'null', 'Diretório da versão web do app, servido em <code>/client/v1/next/</code>. O instalador a coloca em <code>~/.aidaemon/app-web</code>. Vazio: essa versão instalada é servida quando presente.'],
])}

<h2>Endpoints</h2>
<ul>
  <li><code>/client/v1/ws</code> &mdash; WebSocket</li>
  <li><code>POST /client/v1/commands</code> e long-poll <code>GET /client/v1/events</code></li>
  <li><code>/client/v1/next/</code> &mdash; o app web (<code>/client/v1/app</code> redireciona para lá)</li>
</ul>
<p>O protocolo de cliente atual é o <strong>1.39</strong>. Os clientes retomam do último evento sem perdas nem duplicatas.</p>

<h2>O token local</h2>
<p>Os apps na mesma máquina fazem login com o token local salvo em <code>~/.aidaemon/client-token</code> (somente para o proprietário), gerado no primeiro uso. O <code>aidaemon client-token</code> gera um novo e o salva ali (o token antigo para de funcionar de imediato); adicione <code>--print</code> para imprimi-lo para scripts. Execute <code>aidaemon client-token</code>, <code>aidaemon pair</code> e <code>aidaemon web</code> a partir de <code>~/.aidaemon</code>, a pasta do daemon.</p>

<h2>Pareando celulares e navegadores</h2>
<ol>
  <li>Envie <code>/pair_device</code> em um chat, ou execute <code>aidaemon pair</code> em um terminal a partir de <code>~/.aidaemon</code> (ele mostra um QR code). Isso gera um código de uso único válido por dez minutos.</li>
  <li>Abra o link no dispositivo. Ele resgata o código com a própria chave.</li>
  <li>Confirme nesse chat ou terminal.</li>
</ol>
<p>Cada dispositivo pareado recebe tokens de curta duração com os seus escopos (observar, conversar, aprovar e controlar, para as visualizações ao vivo). <code>/devices</code> lista os dispositivos e <code>/revoke_device &lt;id&gt;</code> encerra de imediato os tokens e as conexões abertas de um dispositivo.</p>

<h2>Acessando de outros dispositivos</h2>
<p>O gateway escuta apenas em loopback. Deixe o próprio daemon rodar o túnel:</p>
${codeBlock(`[exposure.client_gateway]
adapter = "tailscale"        # private to your tailnet; mode = "funnel" makes it public`, 'toml', 'config.toml')}
<p>Adaptadores: <code>tailscale</code> (<code>serve</code> ou <code>funnel</code>), <code>cloudflare</code> (<code>named</code>, ou <code>quick</code> para um endereço descartável), <code>manual</code> (a <code>url</code> de um proxy reverso que você mantém) e <code>command</code>. O <code>cloudflared</code> ou o <code>tailscale</code> precisa estar no <code>PATH</code> ou ser indicado com <code>binary = "..."</code>. As alterações valem após uma reinicialização; <code>/exposure</code> mostra o estado de cada túnel. Um túnel SSH para a porta 8788 também funciona.</p>
`
  },
  {
    slug: '/configuration',
    section: 'Configuration',
    title: 'Referência Completa do config.toml',
    description: 'Referência completa do config.toml do aidaemon. Todas as seções de configuração, chaves, tipos e valores padrão.',
    content: () => `
<h1>Configuração</h1>
<p class="lead">Referência completa do <code>config.toml</code>. Todas as seções e seus valores padrão.</p>

<h2>[provider]</h2>
${configTable([
  ['kind', 'string', '"openai_compatible"', 'Tipo de provedor: <code>openai_compatible</code>, <code>openai_chatgpt</code>, <code>anthropic</code>, <code>google_genai</code> ou <code>xai_native</code>. Veja <a href="/providers">Provedores</a>.'],
  ['api_key', 'string', '—', 'Chave de API do provedor (obrigatória)'],
  ['gateway_token', 'string', 'null', 'Token opcional do Cloudflare AI Gateway, usado como <code>cf-aig-authorization</code>'],
  ['base_url', 'string', '"https://api.openai.com/v1"', 'URL base da API (defina para qualquer serviço <code>openai_compatible</code> que não seja a OpenAI; opcional para <code>anthropic</code>, com ou sem <code>/v1</code>)'],
  ['reasoning_effort', 'string', 'null', 'Raciocínio estendido, por exemplo <code>low</code>, <code>medium</code>, <code>high</code>, <code>off</code>'],
  ['max_tokens', 'integer', 'null', 'Limite de saída por chamada'],
  ['extra_headers', 'table', 'null', 'Cabeçalhos HTTP extras enviados em toda chamada (os valores podem ser <code>"keychain"</code>)'],
  ['auto_upgrade', 'bool', 'true', 'Move o modelo em uso para a versão mais nova da sua linha assim que o provedor a lista (verificado diariamente, comprovado antes com uma chamada de ferramenta). Nos provedores cobrados por token, apenas avisa. Veja <a href="/providers">Provedores</a>.'],
])}

<h2>[[provider.fallbacks]]</h2>
<p>Fallbacks entre provedores, em ordem, cada um com as mesmas chaves de <code>[provider]</code> e o seu próprio <code>[provider.fallbacks.models]</code>. Um provedor cuja cota, crédito ou chave falha é ignorado até a renovação informada.</p>

<h2>[provider.models]</h2>
${configTable([
  ['primary', 'string', '(provider default)', 'Modelo padrão para consultas gerais'],
  ['fast', 'string', '(provider default)', 'Modelo de baixa latência para turnos simples (prefira modelos instruct sem raciocínio)'],
  ['smart', 'string', '(provider default)', 'Modelo para turnos de execução complexos (pode ser o mesmo que primary)'],
  ['default', 'string', '—', 'O modelo para pedidos normais (<code>primary</code> é o nome antigo dele)'],
  ['fallback', 'array', '[]', 'Modelos tentados em ordem quando as chamadas falham'],
])}

${callout('info', 'Padrões de Modelo', 'Os padrões que levam o provedor em conta são preenchidos automaticamente pela configuração da primeira execução (a partir do catálogo de provedores) e podem mudar entre versões conforme os catálogos evoluem. Em produção, fixe IDs de modelo explícitos em <code>[provider.models]</code>. Se os três níveis resolverem para o mesmo modelo, o roteamento automático é desativado. Veja <a href="/router">Roteamento de Modelos</a>.')}
${callout('warn', 'Orientação para o Nível Fast', 'Defina <code>provider.models.fast</code> como um modelo de instruções barato e sem raciocínio para o roteamento. Evite modelos de raciocínio/thinking em <code>fast</code>, pois costumam aumentar o gasto de tokens e a latência sem nenhum benefício de roteamento.')}

<h2>[telegram]</h2>
${configTable([
  ['bot_token', 'string', '—', 'Token do bot do Telegram obtido com o @BotFather (obrigatório)'],
  ['allowed_user_ids', 'array', '[]', 'IDs numéricos de usuário do Telegram autorizados a conversar. Vazio: a primeira pessoa a enviar mensagem direta ao bot torna-se a proprietária, e mais ninguém é autorizado.'],
])}

<h2>[slack]</h2>
<p>Requer a flag de funcionalidade <code>slack</code> na compilação. Veja <a href="/slack">Slack</a> para o guia completo de configuração.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Ativa o canal do Slack'],
  ['app_token', 'string', '—', 'Token de nível de app do Slack para o Socket Mode (<code>xapp-...</code>)'],
  ['bot_token', 'string', '—', 'Token de bot do Slack para a Web API (<code>xoxb-...</code>)'],
  ['allowed_user_ids', 'array', '[]', 'IDs de usuário do Slack autorizados a interagir. Vazio: a primeira pessoa a enviar mensagem direta ao bot torna-se a proprietária, e mais ninguém é autorizado.'],
  ['use_threads', 'bool', 'true', 'Responde em threads por padrão'],
])}

<h2>[discord]</h2>
<p>Requer a flag de funcionalidade <code>discord</code> na compilação. Veja <a href="/discord">Discord</a> para o guia completo de configuração.</p>
${configTable([
  ['bot_token', 'string', '&mdash;', 'Token do bot do Discord obtido no Developer Portal'],
  ['allowed_user_ids', 'array', '[]', 'IDs de usuário do Discord autorizados a interagir. Vazio: a primeira pessoa a enviar mensagem direta ao bot torna-se a proprietária, e mais ninguém é autorizado.'],
  ['guild_id', 'integer', 'null', 'ID opcional de guild/servidor para restringir o bot a um único servidor'],
])}

<p>Para mais de um bot, use <code>[[telegram_bots]]</code>, <code>[[slack_bots]]</code> ou <code>[[discord_bots]]</code>: uma entrada por bot, com as mesmas chaves de token e de usuários.</p>

<h2>[state]</h2>
${configTable([
  ['db_path', 'string', '"aidaemon.db"', 'Caminho do arquivo do banco SQLite'],
  ['working_memory_cap', 'integer', '50', 'Máximo de mensagens por sessão mantidas na memória'],
  ['consolidation_interval_hours', 'integer', '6', 'Horas entre as execuções de consolidação da memória'],
  ['max_facts', 'integer', '20', 'Número máximo de fatos injetados no prompt do sistema'],
  ['daily_token_budget', 'integer', 'null', 'Ignorado desde a 0.20.0 (registrado uma vez na inicialização). Limite o gasto com um limite de gastos do provedor; os orçamentos por meta e o <code>subagents.task_token_budget</code> continuam valendo.'],
  ['encryption_key', 'string', 'null', 'Chave de criptografia do SQLCipher (requer o recurso <code>encryption</code>). AES-256 em repouso.'],
  ['upgrade_backups', 'integer', '2', 'Snapshots mantidos em <code>backups/</code>, ao lado do banco de dados, um gravado quando uma nova versão do aidaemon o inicia pela primeira vez. <code>0</code> desativa.'],
])}

<h3>[state.retention]</h3>
<p>Limpeza automática de dados antigos, em dias. <code>0</code> desativa a limpeza daquele tipo.</p>
${configTable([
  ['messages_days', 'integer', '90', 'Mensagens consolidadas'],
  ['diagnostic_events_days', 'integer', '7', 'Eventos de diagnóstico e de ferramentas consolidados'],
  ['superseded_facts_days', 'integer', '90', 'Versões mais antigas de fatos'],
  ['token_usage_aggregate_days', 'integer', '30', 'O uso bruto de tokens é agrupado em totais diários depois disso'],
  ['episodes_days', 'integer', '365', 'Episódios nunca recordados'],
  ['goals_days', 'integer', '180', 'Metas concluídas ou abandonadas'],
])}

<h2>[memory]</h2>
${configTable([
  ['backend', 'string', '"daemon"', '<code>daemon</code> (memória integrada) ou <code>sdk</code> (o crate aidaemon-memory; compile com <code>--features sdk-memory</code>)'],
  ['path', 'string', '"aidaemon-memory.db"', 'Arquivo SQLite do backend <code>sdk</code>'],
  ['embedding_model', 'string', '"AllMiniLML6V2Q"', 'Modelo fastembed local, por exemplo <code>AllMiniLML6V2</code>, <code>BGESmallENV15</code>, <code>BGEBaseENV15</code>, <code>ParaphraseMLMiniLML12V2</code>. Alterá-lo reincorpora a memória armazenada uma vez, em segundo plano.'],
  ['project_memory', 'bool', 'true', 'Uma conversa colocada em um projeto guarda o que aprende nas notas do próprio projeto'],
  ['projects_dir', 'string', '"~/.aidaemon/projects"', 'Onde ficam as notas dos projetos (um diretório por id de projeto)'],
])}

<h2>[terminal]</h2>
${configTable([
  ['allowed_prefixes', 'array', '(see below)', 'Prefixos de comando aprovados automaticamente, sem confirmação do usuário'],
  ['initial_timeout_secs', 'integer', '30', 'Tempo limite, em segundos, para a execução inicial do comando'],
  ['max_output_chars', 'integer', '4000', 'Trunca a saída do comando além deste tamanho'],
  ['permission_mode', 'string', '"default"', 'Modo de permissão de risco: <code>default</code>, <code>cautious</code> ou <code>yolo</code>. Veja <a href="/tools/command-risk">Risco de Comandos</a>.'],
  ['confinement', 'string', '"host"', '<code>host</code> executa os comandos como você; <code>sandbox</code> executa cada um no sandbox do sistema operacional (seatbelt no macOS, bubblewrap ou o sandbox do Codex no Linux) com acesso a arquivos e à rede restrito à tarefa'],
])}

<p>Prefixos permitidos por padrão:</p>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

${callout('warn', 'Operadores de Shell', 'Um comando encadeado (<code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code>) roda sem perguntar somente quando cada parte começa com um programa de <code>allowed_prefixes</code>. Comandos com <code>$()</code> ou crases, redirecionamentos para arquivos ou programas iniciados por meio de outro programa sempre perguntam.')}

<h2>[daemon]</h2>
${configTable([
  ['health_port', 'integer', '8080', 'Porta do endpoint HTTP de verificação de saúde'],
  ['health_bind', 'string', '"127.0.0.1"', 'Endereço de bind. Use "0.0.0.0" para acesso externo.'],
  ['dashboard_enabled', 'bool', 'true', 'Serve também o callback do OAuth e o webhook de despertar de mandatos na porta de saúde'],
])}

<h2>[triggers.email]</h2>
${configTable([
  ['host', 'string', '—', 'Hostname do servidor IMAP (por exemplo, imap.gmail.com)'],
  ['port', 'integer', '—', 'Porta IMAP (normalmente 993 para TLS)'],
  ['username', 'string', '—', 'Nome de usuário da conta de e-mail'],
  ['password', 'string', '—', 'Senha da conta de e-mail ou senha específica de app'],
  ['folder', 'string', '"INBOX"', 'Pasta IMAP a monitorar'],
])}

<h2>[mcp.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Caminho ou nome do executável do servidor MCP'],
  ['args', 'array', '[]', 'Argumentos de linha de comando'],
  ['env', 'table', '{}', 'Variáveis de ambiente do servidor'],
  ['read_only_tools', 'array', '[]', 'Ferramentas deste servidor que você declara como somente leitura; as chamadas delas não são perguntadas antes'],
])}

<h2>[browser]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Ativa a ferramenta de automação de navegador'],
  ['headless', 'bool', 'true', 'Executa o Chrome sem uma janela visível'],
  ['screenshot_width', 'integer', '1280', 'Largura da viewport do navegador, em pixels'],
  ['screenshot_height', 'integer', '720', 'Altura da viewport do navegador, em pixels'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Diretório do perfil do Chrome para sessões persistentes'],
  ['profile', 'string', 'Default', 'Nome do perfil do Chrome dentro de user_data_dir'],
  ['remote_debugging_port', 'integer', 'null', 'Conecta a um Chrome já existente nesta porta (avançado)'],
  ['keep_sign_ins', 'bool', 'true', 'Mantém os logins no perfil de navegador do próprio agente, para você entrar em um site uma só vez'],
])}

<h2>[skills]</h2>
${configTable([
  ['dir', 'string', '"skills"', 'Diretório com os arquivos markdown das skills'],
  ['enabled', 'bool', 'true', 'Ativa o sistema de skills'],
  ['registries', 'array', '[]', 'URLs dos manifestos JSON de registros de skills para navegar e instalar skills'],
])}

<h2>[subagents]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Permite que o agente crie subagentes'],
  ['max_depth', 'integer', '3', 'Nível máximo de aninhamento da recursão de subagentes'],
  ['max_iterations', 'integer', '10', 'Legado. Os subagentes não têm limite de passos por padrão; definir isto (ou <code>max_iterations_cap</code>, padrão 25) passa a um limite rígido.'],
  ['max_response_chars', 'integer', '8000', 'Trunca as respostas dos subagentes além deste tamanho'],
  ['timeout_secs', 'integer', '300', 'Segundos que um subagente pode ficar sem progresso (sem chamada de ferramenta nem resposta do modelo) antes de ser interrompido. Nunca limita o tempo total de execução.'],
])}

<h2>[client_gateway]</h2>
<p>Serve o <a href="/app">app do AIDaemon</a> e os dispositivos pareados. Referência completa: <a href="/app/gateway">Client Gateway &amp; Pareamento</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Serve o Client Gateway'],
  ['bind', 'string', '"127.0.0.1"', 'Somente loopback'],
  ['port', 'integer', '8788', 'Porta de escuta'],
  ['public_url', 'string', 'null', 'Endereço do túnel HTTPS para os links de pareamento'],
])}

<h2>[surfaces]</h2>
<p>Visualizações ao vivo: acompanhe e assuma o controle do navegador do agente a partir de um app pareado.</p>
${configTable([
  ['enabled', 'bool', 'true', 'Oferece visualizações ao vivo'],
  ['allow_control', 'bool', 'true', 'Permite assumir o controle, e não apenas acompanhar'],
  ['control_anytime', 'bool', 'true', 'Assume o controle sem o agente pedir; <code>false</code>: somente durante uma passagem de controle'],
  ['desktop', 'bool', 'false', 'macOS com <code>[computer_use]</code>: também acompanha e controla as telas deste computador'],
  ['max_live_sessions', 'integer', '8', 'Visualizações ao vivo abertas ao mesmo tempo'],
  ['max_fps', 'integer', '20', 'Máximo de quadros por segundo que uma visualização recebe'],
  ['max_width', 'integer', '1280', 'Quadro mais largo que uma visualização recebe'],
  ['disconnect_grace_secs', 'integer', '30', 'O controle volta ao agente depois deste tempo desde que seu dispositivo parou de acompanhar'],
  ['idle_release_secs', 'integer', '900', 'O controle volta ao agente depois deste tempo sem nenhuma entrada'],
])}

<h2>[cli_agents]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Ativa a ferramenta de delegação a agentes de CLI'],
  ['timeout_secs', 'integer', '600', 'Depois deste tempo, um agente de CLI continua rodando em segundo plano e seu resultado é entregue quando ele termina'],
  ['max_output_chars', 'integer', '16000', 'Tamanho máximo global da saída dos agentes de CLI'],
])}

<h2>[cli_agents.tools.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Comando a executar'],
  ['args', 'array', '[]', 'Argumentos padrão passados ao comando'],
  ['description', 'string', '—', 'Descrição da ferramenta mostrada ao LLM'],
  ['timeout_secs', 'integer', 'null', 'Substitui o tempo limite global para esta ferramenta'],
  ['max_output_chars', 'integer', 'null', 'Substitui a saída máxima global para esta ferramenta'],
  ['protocol', 'string', 'null', '<code>"acp"</code> hospeda um agente que fala o Agent Client Protocol; cada ação dele é perguntada antes'],
])}

<h2>[search]</h2>
${configTable([
  ['backend', 'string', '"duckduckgo"', 'Backend de busca: <code>duckduckgo</code> (sem chave), <code>brave</code> ou <code>searxng</code>'],
  ['api_key', 'string', '""', 'Chave de API da busca Brave (aceita <code>"keychain"</code>)'],
  ['searxng_url', 'string', '""', 'Endereço da sua própria instância do SearxNG'],
  ['parallel', 'bool', 'true', 'Consulta todos os backends configurados ao mesmo tempo e mescla os resultados'],
])}

<h2>[heartbeat]</h2>
<p>Executa as tarefas agendadas e o trabalho em segundo plano. Os agendamentos são criados pedindo ao agente no chat ou no app, não neste arquivo; uma seção <code>[scheduler]</code> antiga é ignorada. Veja <a href="/scheduler">Tarefas Agendadas</a>.</p>
${configTable([
  ['enabled', 'bool', 'true', 'Executa o trabalho agendado e em segundo plano'],
  ['tick_interval_secs', 'integer', '30', 'Com que frequência o trabalho pendente é verificado'],
  ['max_concurrent_llm_tasks', 'integer', '3', 'Máximo de tarefas com modelo rodando ao mesmo tempo'],
])}

<h2>[files]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Ativa as ferramentas de transferência de arquivos (enviar/receber)'],
  ['inbox_dir', 'string', '"~/.aidaemon/files/inbox"', 'Diretório dos arquivos recebidos do Telegram'],
  ['outbox_dirs', 'array', '["~"]', 'Diretórios de onde o agente pode enviar arquivos'],
  ['max_file_size_mb', 'integer', '10', 'Tamanho máximo de arquivo nas transferências, em MB'],
  ['retention_hours', 'integer', '24', 'Horas de retenção dos arquivos recebidos antes da limpeza'],
])}

<h2>[agent]</h2>
${configTable([
  ['name', 'string', '"aidaemon"', 'O nome do assistente'],
  ['persona_file', 'string', 'null', 'Arquivo markdown de persona (caminhos relativos são resolvidos ao lado do <code>config.toml</code>)'],
])}

<h2>[execution]</h2>
<p>Onde rodam os comandos e as ferramentas de arquivo do agente.</p>
${configTable([
  ['backend', 'string', '"local"', '<code>local</code>, <code>docker</code> (configurações em <code>[execution.docker]</code>) ou <code>ssh</code> (configurações em <code>[execution.ssh]</code>)'],
  ['workspace_root', 'string', 'null', 'Diretório de trabalho para caminhos relativos. Padrão local: a pasta do daemon.'],
  ['allow_outside_workspace', 'bool', 'true (local)', 'Deixa as ferramentas baseadas em caminho alcançarem fora de <code>workspace_root</code>. Padrão false para backends remotos.'],
])}

<h2>[checkpoints]</h2>
<p>Beta: um snapshot em shadow-Git do workspace antes da primeira alteração de arquivo em cada turno. <code>enabled = false</code> por padrão.</p>

<h2>[computer_use]</h2>
<p>Operação de apps nativos do macOS (compile com <code>--features computer_use-macos</code>). <code>enabled = false</code> por padrão.</p>

<h2>[exposure.client_gateway]</h2>
<p>Um túnel que o daemon executa para que outros dispositivos alcancem o app. Veja <a href="/app/gateway">Client Gateway &amp; Pareamento</a>.</p>

<h2>Gerenciamento de Segredos</h2>
<p>Os valores sensíveis da configuração aceitam dois métodos de resolução além do texto simples, mais um modo opcional de armazenamento somente em variáveis de ambiente:</p>

<h3>Chaveiro do Sistema</h3>
<p>Defina qualquer campo de segredo como <code>"keychain"</code> para resolvê-lo a partir do chaveiro do sistema operacional (Keychain do macOS, Credential Manager do Windows, secret-service do Linux):</p>
${codeBlock(`[provider]
api_key = "keychain"    # Resolved from keychain entry "api_key"

[telegram]
bot_token = "keychain"  # Resolved from keychain entry "bot_token"`, 'toml')}

<p>Armazene os valores com o comando de CLI <code>keychain</code> antes da primeira execução:</p>
${codeBlock(`# Store a secret (prompts interactively)
aidaemon keychain set api_key
aidaemon keychain set bot_token

# Verify a stored secret (shows masked value)
aidaemon keychain get api_key

# Remove a secret
aidaemon keychain delete api_key`, 'bash')}

${callout('tip', 'Segurança', 'O comando <code>set</code> pede o valor de forma interativa, com confirmação, mantendo os segredos fora do histórico do seu shell.')}

<h3>Variáveis de Ambiente</h3>
<p>Use a sintaxe <code>\${VAR_NAME}</code> em qualquer valor da configuração:</p>
${codeBlock(`[provider]
api_key = "\${GOOGLE_API_KEY}"

[telegram]
bot_token = "\${TELEGRAM_BOT_TOKEN}"`, 'toml')}

<h3>Modo Somente Env (Sem Keychain)</h3>
<p>Se você prefere não usar o chaveiro do sistema operacional, defina estas variáveis de ambiente de execução:</p>
${codeBlock(`# Disable OS keychain storage and use env file-backed secrets
export AIDAEMON_NO_KEYCHAIN=1

# Optional: choose a specific env file path (default: ./.env)
export AIDAEMON_ENV_FILE=/absolute/path/to/.env`, 'bash')}

<p>Nesse modo, o aidaemon lê os segredos do arquivo env selecionado (ou do ambiente do processo quando não há arquivo env) e grava as atualizações de segredos de volta nesse arquivo env &mdash; inclusive a rotação dos tokens de acesso/renovação do OAuth.</p>

${callout('warning', 'Segurança do Modo Somente Env', 'Mantenha o arquivo env privado (<code>chmod 600</code>) e fora do controle de versão.')}

${callout('info', 'Campos de Chaveiro Compatíveis', 'Campos que aceitam <code>"keychain"</code>: <code>provider.api_key</code>, <code>provider.gateway_token</code>, <code>telegram.bot_token</code>, <code>slack.app_token</code>, <code>slack.bot_token</code>, <code>discord.bot_token</code>, <code>triggers.email.password</code>, <code>state.encryption_key</code>, <code>search.api_key</code> e os campos de perfil <code>http_auth.*</code>.')}

<p>A entrada do chaveiro que cada campo lê (o nome a dar ao <code>aidaemon keychain set</code>):</p>
<ul>
  <li><code>provider.api_key</code> &rarr; <code>api_key</code>; a primeira entrada de <code>[[provider.fallbacks]]</code> &rarr; <code>provider_fallback_0_api_key</code></li>
  <li><code>provider.gateway_token</code> &rarr; <code>gateway_token</code></li>
  <li><code>telegram.bot_token</code> &rarr; <code>bot_token</code></li>
  <li><code>slack.app_token</code> / <code>slack.bot_token</code> &rarr; <code>slack_app_token</code> / <code>slack_bot_token</code></li>
  <li><code>discord.bot_token</code> &rarr; <code>discord_bot_token</code></li>
  <li><code>triggers.email.password</code> &rarr; <code>email_password</code></li>
  <li><code>state.encryption_key</code> &rarr; <code>encryption_key</code></li>
  <li><code>search.api_key</code> &rarr; <code>search_api_key</code></li>
</ul>

<h2>[health]</h2>
<p>Sistema de monitoramento de saúde. Veja <a href="/health-monitoring">Monitoramento de Saúde</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Ativa o sistema de monitoramento de saúde'],
  ['tick_interval_secs', 'integer', '30', 'Com que frequência verificar as sondas pendentes'],
  ['result_retention_days', 'integer', '7', 'Dias de retenção dos resultados das verificações de saúde'],
])}

<h2>[[health.probes]]</h2>
${configTable([
  ['name', 'string', '&mdash;', 'Nome da sonda'],
  ['type', 'string', '&mdash;', 'Tipo de sonda: <code>http</code>, <code>command</code>, <code>file</code> ou <code>port</code> (<code>tcp</code>)'],
  ['target', 'string', '&mdash;', 'URL, comando, caminho de arquivo ou host:porta de destino'],
  ['schedule', 'string', '&mdash;', 'Expressão cron ou intervalo'],
  ['consecutive_failures_alert', 'integer', '3', 'Alerta após N falhas consecutivas'],
  ['alert_session_ids', 'array', '[]', 'IDs de sessão a notificar no alerta'],
])}

<h2>[updates]</h2>
<p>Sistema de autoatualização. Veja <a href="/updates">Autoatualizador</a>.</p>
${configTable([
  ['mode', 'string', '"check_only"', 'Modo de atualização: enable, check_only ou disable'],
  ['check_interval_hours', 'integer', '24', 'Horas entre as verificações de atualização'],
  ['check_at_utc_hour', 'integer', 'null', 'Hora UTC específica (0-23) para a verificação diária'],
  ['confirmation_timeout_mins', 'integer', '60', 'Minutos de espera pela aprovação do usuário'],
])}

<h2>[people]</h2>
<p>Inteligência de Pessoas — uma agenda de contatos pessoal gerenciada pelo seu assistente. Veja <a href="/tools/people">Inteligência de Pessoas</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Estado inicial da inteligência de pessoas (pode ser alternado em tempo de execução pelo chat)'],
  ['fact_retention_days', 'integer', '180', 'Dias até que fatos extraídos automaticamente e não confirmados sejam removidos'],
  ['reconnect_reminder_days', 'integer', '30', 'Dias de inatividade antes de sugerir uma reconexão'],
])}

<h2>Exemplo de Configuração</h2>
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
    title: 'Configuração de Provedores',
    description: 'Configure provedores de LLM para o aidaemon: assinatura do ChatGPT, Anthropic, Google Gemini, APIs compatíveis com a OpenAI, xAI, modelos locais, fallbacks e atualizações de modelo.',
    content: () => `
<h1>Configuração de Provedores</h1>
<p class="lead">A configuração da primeira execução e a página Settings do app gravam a seção <code>[provider]</code> para você. Esta página mostra o que elas gravam, para edição manual.</p>

<h2>Tipos de Provedor</h2>
<table class="config-table">
<thead><tr><th>kind</th><th>Usado para</th></tr></thead>
<tbody>
<tr><td><code>openai_chatgpt</code></td><td>Um plano do ChatGPT por meio de login (sem chave de API)</td></tr>
<tr><td><code>anthropic</code></td><td>A API Messages nativa da Anthropic</td></tr>
<tr><td><code>google_genai</code></td><td>A API nativa do Google Gemini</td></tr>
<tr><td><code>xai_native</code></td><td>xAI (Grok)</td></tr>
<tr><td><code>openai_compatible</code> (padrão; o <code>base_url</code> tem como padrão <code>https://api.openai.com/v1</code>)</td><td>OpenAI, OpenRouter, DeepSeek, Moonshot, MiniMax, Cloudflare AI Gateway, Ollama, llama.cpp e qualquer API compatível com a OpenAI</td></tr>
</tbody>
</table>
<p><code>api_key = "keychain"</code> lê a chave do chaveiro do sistema; <code>api_key = "\${ENV_VAR}"</code> a lê do ambiente. Veja <a href="/configuration">Gerenciamento de Segredos</a>.</p>

<h2>Assinatura do ChatGPT</h2>
<p>Roda em um plano do ChatGPT em vez da cobrança medida da API. Faça login pelo app ou em um terminal:</p>
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
<p>Quando o limite de uso do plano é atingido, a chamada passa direto para os seus provedores de fallback até a renovação informada. Settings mostra os limites de 5 horas e semanais do plano.</p>

<h2>Anthropic</h2>
${codeBlock(`[provider]
kind = "anthropic"
api_key = "keychain"
# base_url = "https://api.anthropic.com/v1"   # optional; with or without /v1

[provider.models]
primary = "claude-sonnet-5-5"
fast = "claude-haiku-5-5"
smart = "claude-opus-5-5"`, 'toml')}
${callout('info', 'URL Base', 'A raiz da API pode ser informada com ou sem um <code>/v1</code> no final (o catálogo de provedores usa <code>https://api.anthropic.com/v1</code>); as requisições sempre vão para <code>/v1/messages</code>. Antes da 0.21.0, uma URL base terminada em <code>/v1</code> era enviada para <code>/v1/v1/messages</code> e toda chamada falhava com um 404.')}
<h3>Cache de prompt</h3>
<p>O aidaemon usa o cache de prompt da Anthropic. O prefixo fixo (definições de ferramentas e o prompt do sistema) fica em cache por uma hora, então uma resposta depois de uma pausa, ou uma nova conversa dentro dessa hora, o lê do cache. O final da conversa mantém o cache de cinco minutos. As ferramentas adiadas são declaradas de antemão, então carregar uma com <code>load_tools</code> não reescreve mais o cache. O <code>reasoning_effort</code> (<code>low</code>, <code>medium</code>, <code>high</code>, <code>off</code>) corresponde ao raciocínio estendido.</p>

<h2>Google Gemini</h2>
<p>API nativa do Google Generative AI, com uma chave do <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Google AI Studio</a>.</p>
${codeBlock(`[provider]
kind = "google_genai"
api_key = "keychain"

[provider.models]
primary = "gemini-4-hydrogen"
fast = "gemini-3.5-flash-lite"
smart = "gemini-4-argon"`, 'toml')}
<p>Quando uma requisição não oferece ferramentas, o Gemini pode fundamentar a resposta com o Google Search. Os resultados das ferramentas são devolvidos como partes com papel de usuário, como os modelos Gemini atuais exigem (corrigido na 0.21.0: antes, um turno com chamada de ferramenta caía em fallback repetidamente e nunca respondia). Uma cota diária esgotada move a chamada para os seus provedores de fallback na hora.</p>

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
<p>Modelos de vários provedores por meio de uma única chave e do formato compatível com a OpenAI. Settings mostra o saldo da chave. A lista de provedores também tem <strong>Anthropic (via OpenRouter)</strong> (<code>anthropic/claude-sonnet-4</code>, <code>anthropic/claude-haiku-4</code>, <code>anthropic/claude-opus-4</code> com uma chave do OpenRouter), oferecido em Settings, mas não na primeira execução.</p>
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
<p>Fica na frente dos provedores de origem e expõe um endpoint compatível com a OpenAI.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "keychain"          # upstream provider key
gateway_token = "keychain"    # optional: Authenticated Gateway mode
base_url = "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/compat"

[provider.models]
primary = "your-model-id"`, 'toml')}
${callout('info', 'Modos de Autenticação do Cloudflare', 'Você pode rodar apenas com <code>api_key</code> (modo básico) ou adicionar <code>gateway_token</code> para enviar <code>cf-aig-authorization</code> no modo Authenticated Gateway.')}

<h2>Ollama e llama.cpp (locais)</h2>
<p>Modelos auto-hospedados não precisam de chave. A configuração da primeira execução lista os modelos que o seu servidor oferece.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = ""
base_url = "http://localhost:11434/v1"   # Ollama
# base_url = "http://localhost:8080/v1"  # llama.cpp's llama-server

[provider.models]
primary = "your-model-id"`, 'toml')}
${callout('warn', 'Endereços locais', 'Use HTTPS em qualquer servidor que não esteja nesta máquina: a chave é enviada a cada requisição. O <code>llama-server</code> e a verificação de saúde do daemon usam a porta 8080 por padrão: mude um deles (<code>llama-server --port 8081</code>, ou <code>[daemon] health_port</code>).')}

<h2>Provedores de fallback</h2>
<p>As entradas em <code>[[provider.fallbacks]]</code> são tentadas em ordem, depois dos modelos do próprio provedor principal. Um provedor cuja conta não consegue responder (limite de uso de um plano, cota diária, falta de crédito, chave rejeitada) é ignorado de imediato e continua ignorado até a renovação informada. Trocar o provedor principal em Settings mantém o antigo como failover.</p>
${codeBlock(`[[provider.fallbacks]]
kind = "anthropic"
api_key = "keychain"
[provider.fallbacks.models]
default = "claude-sonnet-5-5"`, 'toml')}
<p>O <code>[provider.models]</code> aceita <code>primary</code> / <code>fast</code> / <code>smart</code> ou <code>default</code> mais uma lista ordenada <code>fallback = [...]</code> de modelos tentados quando as chamadas falham.</p>

<h2>Atualizações de modelo</h2>
<p>Uma vez por dia o daemon verifica a lista de modelos de cada provedor e move um modelo para a versão mais nova da sua própria linha (por exemplo, <code>gpt-6-sol</code> para <code>gpt-6.2-sol</code>; nunca outro tamanho, um snapshot ou uma prévia). Antes ele comprova o novo modelo com uma chamada de ferramenta, mantém o antigo como primeiro fallback e avisa você. Com um provedor cobrado por token, você apenas é avisado. Desative com:</p>
${codeBlock(`[provider]
auto_upgrade = false`, 'toml')}
<p>Um <code>/model</code> fixado adia a atualização.</p>
`
  },
  {
    slug: '/telegram',
    section: 'Telegram',
    title: 'Configuração do Bot',
    description: 'Configure o AIDaemon como um bot do Telegram: crie um bot com o BotFather, defina quem pode usá-lo e, opcionalmente, use webhooks.',
    content: () => `
<h1>Configuração do Bot do Telegram</h1>
<p class="lead">O Telegram é o canal principal do AIDaemon. O AIDaemon fala diretamente com a Bot API do Telegram, usando long polling por padrão ou um webhook opcional para menor latência. Veja também o <a href="/slack">Slack</a> para integração com workspaces.</p>

<h2>Crie um Bot</h2>
<ol>
  <li>Envie uma mensagem para o <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a> no Telegram</li>
  <li>Envie <code>/newbot</code> e siga as instruções</li>
  <li>Copie o token do bot (formato: <code>123456789:ABCdefGHIjklMNOpqrSTUvwxYZ</code>)</li>
</ol>

<h2>Descubra Seu ID de Usuário</h2>
<p>O seu ID numérico de usuário do Telegram é necessário para a lista <code>allowed_user_ids</code>. Você pode descobri-lo enviando uma mensagem para o <a href="https://t.me/userinfobot" target="_blank" rel="noopener">@userinfobot</a>.</p>
<p>Ou simplesmente envie uma mensagem ao seu bot: se você ainda não estiver autorizado, ele responde com o seu ID numérico e a linha exata de <code>allowed_user_ids</code> a adicionar.</p>

<h2>Configuração</h2>
${codeBlock(`[telegram]
bot_token = "keychain"   # or the token itself, or "\${TELEGRAM_BOT_TOKEN}"
allowed_user_ids = [123456789]`, 'toml', 'config.toml')}

${callout('warn', 'Controle de Acesso', 'Se <code>allowed_user_ids</code> estiver vazio, a <strong>primeira pessoa a enviar mensagem privada ao bot</strong> se torna a proprietária, e esse ID é salvo no config.toml. Mensagens de grupo são recusadas até existir um proprietário. Defina <code>allowed_user_ids</code> antes de compartilhar o nome do bot.')}

<h2>Proprietários e Convidados</h2>
<p>Os proprietários são listados por plataforma em <code>[users] owner_ids</code>. Se nenhum for definido, todo usuário autorizado é proprietário. Apenas os proprietários podem responder a aprovações e executar comandos que alteram coisas; os demais usuários autorizados são convidados.</p>
${codeBlock(`[users]
owner_ids = { telegram = ["123456789"] }`, 'toml', 'config.toml')}

<h2>Modo Webhook</h2>
<p>O long polling não exige configuração. Para menor latência de entrega, um bot pode receber atualizações por webhook:</p>
${codeBlock(`[telegram.webhook]
enabled = true
public_url = "https://bot.example.com"
listen_addr = "0.0.0.0:8443"

# Or give every bot a webhook automatically:
# [telegram_webhook_defaults]
# enabled = true
# base_domain = "bots.example.com"   # each bot gets <slug>.bots.example.com
# port_start = 8443`, 'toml', 'config.toml')}
<p>No chat, o <code>/setup lowlatency</code> guia você pelo processo.</p>

<h2>Recursos</h2>
<ul>
  <li><strong>Indicador de digitação</strong> &mdash; reenviado a cada 3 segundos, aproximadamente, enquanto o agente trabalha</li>
  <li><strong>Renderização de Markdown</strong> &mdash; as respostas do agente são convertidas em HTML do Telegram</li>
  <li><strong>Divisão de mensagens longas</strong> &mdash; respostas com mais de 4096 caracteres são divididas nos limites de parágrafo/linha</li>
  <li><strong>Compartilhamento de capturas de tela</strong> &mdash; capturas do navegador enviadas como fotos com legendas</li>
  <li><strong>Transferência de arquivos</strong> &mdash; envie e receba documentos, fotos, áudio e vídeo pelo Telegram</li>
  <li><strong>Status de tarefas ao vivo</strong> &mdash; <code>/tasks</code> mostra o que está rodando neste chat</li>
  <li><strong>Botões de aprovação inline</strong> &mdash; botões <strong>Allow</strong>, <strong>Always allow</strong> (ou <strong>Allow until restart</strong>) e <strong>Deny</strong> para as aprovações (veja <a href="/telegram/approval">Fluxo de Aprovação</a>)</li>
  <li><strong>Suporte a vários bots</strong> &mdash; configure vários bots do Telegram com entradas <code>[[telegram_bots]]</code> ou adicione um pelo chat com <code>/connect</code></li>
  <li><strong>Tratamento avançado de arquivos</strong> &mdash; detecção de tipo MIME, limites de tamanho e validação de segurança de caminhos</li>
</ul>

<h2>Comportamento de Nova Tentativa</h2>
<p>Se a conexão do bot cair, o AIDaemon o reinicia com backoff exponencial:</p>
<ul>
  <li>Backoff inicial: 5s</li>
  <li>Dobra a cada vez: 5s &rarr; 10s &rarr; 20s &rarr; 40s &rarr; 60s (máx.), com um pequeno jitter aleatório</li>
  <li>Volta a 5s se o bot ficar estável por mais de 60 segundos</li>
</ul>
`
  },
  {
    slug: '/telegram/commands',
    section: 'Telegram',
    title: 'Comandos',
    description: 'Comandos do Telegram para o AIDaemon: /clear, /tasks, /cancel, /status, /model, /cost, /mode e mais.',
    content: () => `
<h1>Comandos do Telegram</h1>
<p class="lead">Comandos de barra integrados para controlar o agente pelo Telegram. Eles aparecem no menu <code>/</code> do Telegram. Raramente você precisa deles: basta pedir em palavras simples que o agente escolhe as ferramentas certas.</p>

<p><code>/help</code> (ou <code>/start</code>) mostra os comandos do dia a dia; <code>/help all</code> lista todos os comandos.</p>

<h2>Conversa</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>/clear</code> (ou <code>/new</code>)</td><td>Inicia uma conversa nova. Seu histórico é mantido, e o trabalho em andamento neste chat é interrompido.</td></tr>
<tr><td><code>/wipe</code></td><td>Exclui esta conversa permanentemente. O primeiro <code>/wipe</code> apenas explica; envie-o de novo em alguns minutos para apagá-la. Os fatos já salvos na memória são mantidos.</td></tr>
<tr><td><code>/context</code></td><td>Mostra quanto da conversa o agente consegue ver</td></tr>
<tr><td><code>/project [name|none]</code></td><td>Mostra ou altera o projeto em que este chat trabalha</td></tr>
<tr><td><code>/memory</code></td><td>Mostra a memória do projeto em que este chat trabalha</td></tr>
</tbody>
</table>

<h2>Trabalho</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>/tasks</code></td><td>Lista, numerado, o que está rodando neste chat</td></tr>
<tr><td><code>/cancel</code>, <code>/cancel all</code>, <code>/cancel &lt;number&gt;</code></td><td>Interrompe o que está rodando neste chat: tudo de um pedido, tudo, ou um item (os números vêm de <code>/tasks</code>)</td></tr>
<tr><td><code>/status</code></td><td>O modo deste chat, o que está rodando e o próximo item agendado</td></tr>
<tr><td><code>/work [ready|running|blocked|show|comment|unblock|retry]</code></td><td>Veja e gerencie trabalhos mais longos que esperam ou rodam sozinhos</td></tr>
<tr><td><code>/cost</code></td><td>Mostra o uso de tokens (últimas 24h, últimos 7 dias, principais modelos)</td></tr>
</tbody>
</table>

<h2>Modelos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Mostra o modelo atual</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Usa um único modelo em todos os chats (desativa a escolha automática de modelo)</td></tr>
<tr><td><code>/models</code></td><td>Lista os modelos que o seu provedor oferece (o ativo é marcado)</td></tr>
<tr><td><code>/auto</code></td><td>Volta à escolha automática de modelo</td></tr>
</tbody>
</table>

<h2>Acesso e Privacidade</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>/mode [full|unrestricted|readonly]</code></td><td>Mostra ou altera o modo de acesso deste chat</td></tr>
<tr><td><code>/readonly</code></td><td>Deixa este chat somente leitura por 4 horas</td></tr>
<tr><td><code>/private [off]</code></td><td>Não lembra nem aprende com a sua próxima mensagem (<code>off</code> cancela)</td></tr>
<tr><td><code>/trustall on|off</code></td><td>Executa todo comando de terminal sem perguntar</td></tr>
</tbody>
</table>

<h2>Arquivos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>/checkpoints</code></td><td>Lista os checkpoints do sistema de arquivos</td></tr>
<tr><td><code>/rollback [checkpoint-id|confirm TOKEN]</code></td><td>Pré-visualiza a reversão de um checkpoint e depois a confirma</td></tr>
</tbody>
</table>

<h2>Dispositivos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>/pair_device</code></td><td>Pareia um celular ou navegador com o app</td></tr>
<tr><td><code>/devices</code></td><td>Lista os dispositivos pareados</td></tr>
<tr><td><code>/revoke_device &lt;id&gt;</code></td><td>Desfaz o pareamento de um dispositivo</td></tr>
<tr><td><code>/exposure</code></td><td>Mostra os túneis que publicam os gateways</td></tr>
</tbody>
</table>

<h2>Gerenciamento de Bots</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>/reload</code></td><td>Relê o config.toml e aplica as alterações de provedor e modelo (veja abaixo)</td></tr>
<tr><td><code>/restart</code></td><td>Reinicialização completa: inicia um novo processo, carregando um novo binário, configuração e servidores MCP</td></tr>
<tr><td><code>/setkey</code></td><td>Substitui a chave de API de um provedor (funciona mesmo sem nenhum modelo disponível; somente em chat privado)</td></tr>
<tr><td><code>/connect &lt;platform&gt; &lt;token&gt;</code></td><td>Adiciona um novo canal de bot</td></tr>
<tr><td><code>/bots</code></td><td>Lista os bots conectados</td></tr>
<tr><td><code>/setup [lowlatency]</code></td><td>Assistente de configuração (webhooks, baixa latência)</td></tr>
<tr><td><code>/agent [codex|claude|gemini|opencode] [dir]</code></td><td>Inicia ou gerencia sessões de agentes de CLI</td></tr>
<tr><td><code>/terminal [lite|start|open]</code></td><td>Comandos da ponte de terminal</td></tr>
</tbody>
</table>

${callout('info', 'Quem Pode Usar os Comandos', 'A maioria dos comandos é só para proprietários. Em um chat compartilhado, os convidados podem usar <code>/tasks</code>, <code>/private</code>, <code>/context</code>, <code>/readonly</code>, <code>/mode</code> e <code>/cancel</code>; os quatro últimos dizem por conta própria se o convidado pode agir.')}

<h2>Troca de Modelo</h2>
${codeBlock(`/model claude-sonnet-5-5
# Uses claude-sonnet-5-5 in every chat and turns off automatic model choice

/auto
# Goes back to automatic model choice`, 'text')}

${callout('info', 'Substituição de Modelo', 'Quando você define um modelo com <code>/model</code>, a escolha automática de modelo fica desativada até você enviar <code>/auto</code>. A escolha do <code>/model</code> vale para todos os chats. Um modelo escolhido para uma conversa no app tem precedência sobre ela.')}

<h2>Recarregamento da Configuração</h2>
<p><code>/reload</code> relê o <code>config.toml</code> e aplica as alterações de provedor e modelo sem reiniciar. Outras alterações exigem <code>/restart</code>. Se o arquivo deixar de carregar, o <code>/reload</code> restaura o <code>config.toml.bak</code>.</p>
<p>Na inicialização, uma configuração quebrada é restaurada automaticamente, tentando em ordem:</p>
<ol>
  <li><code>.toml.lastgood</code> &mdash; a última configuração que completou uma chamada de modelo</li>
  <li><code>.toml.bak</code> &rarr; <code>.toml.bak.1</code> &rarr; <code>.toml.bak.2</code></li>
</ol>
`
  },
  {
    slug: '/telegram/approval',
    section: 'Telegram',
    title: 'Fluxo de Aprovação',
    description: 'Aprovação por teclado inline no Telegram para comandos e ações que precisam do seu OK.',
    content: () => `
<h1>Fluxo de Aprovação de Comandos</h1>
<p class="lead">Aprovação interativa por teclado inline para comandos e ações que precisam do seu OK.</p>

<h2>Como Funciona</h2>
<ol>
  <li>O agente quer executar um comando de terminal (ou realizar outra ação) que precisa da sua aprovação. Um comando roda sem perguntar quando você já o permitiu ou quando está na lista segura e pode rodar confinado. Caso contrário, uma checagem rápida de risco decide se ele é perigoso o bastante para perguntar a você.</li>
  <li>O cartão de aprovação é publicado no chat onde o trabalho está rodando. Somente um proprietário pode respondê-lo; um convidado que compartilha o chat vê o cartão, mas não pode decidir.</li>
  <li>O cartão mostra o comando, o risco dele e quaisquer avisos, com estes botões:</li>
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

<h2>Opções de Aprovação</h2>
<table class="config-table">
<thead><tr><th>Opção</th><th>Comportamento</th></tr></thead>
<tbody>
<tr><td><strong>Allow</strong></td><td>Executa só desta vez</td></tr>
<tr><td><strong>Always allow</strong></td><td>Executa e lembra o programa no banco de dados (por destino de execução), para que você não seja perguntado de novo, mesmo após uma reinicialização. O config.toml não é alterado.</td></tr>
<tr><td><strong>Allow until restart</strong></td><td>Mostrado no lugar de <strong>Always allow</strong> para comandos críticos, ou para tudo quando <code>terminal.permission_mode = "cautious"</code>. A permissão dura até o daemon reiniciar.</td></tr>
<tr><td><strong>Deny</strong></td><td>Recusa &mdash; o agente é informado de que foi negado</td></tr>
</tbody>
</table>
<p>Algumas ações oferecem apenas <strong>Allow</strong> e <strong>Deny</strong>. Os cartões também cobrem mais do que comandos de terminal, como ações do navegador e a confirmação de novos trabalhos agendados (<strong>Approve &amp; activate</strong> / <strong>Cancel</strong>).</p>

${callout('info', 'Expiração', 'Um cartão sem resposta expira em 5 minutos, com um lembrete pouco antes, e conta como <strong>Deny</strong>.')}

<h2>O Que Sempre Pergunta</h2>
<ul>
  <li>Comandos de gatilhos não confiáveis, como o <a href="/triggers">e-mail</a></li>
  <li>Comandos que pedem capacidades além da tarefa</li>
  <li>Comandos que tocam caminhos protegidos de credenciais, mesmo que já permitidos antes</li>
  <li>Novos comandos que continuariam rodando em segundo plano (destacados)</li>
</ul>

${callout('warn', 'Comandos Encadeados', 'Um comando encadeado (<code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code>) só conta como permitido se o programa de cada parte estiver na sua lista de permissões permanente. Uma permissão que você deu para uma sessão nunca libera uma cadeia. A substituição de comandos (<code>$()</code>, crases) nunca é coberta por uma permissão.')}

${callout('danger', 'Fontes Não Confiáveis', 'As sessões iniciadas por gatilhos (como e-mail) não são confiáveis. Todo comando de terminal nelas exige aprovação, seja o que for que você permitiu antes.')}
`
  },
  {
    slug: '/slack',
    section: 'Slack',
    title: 'Configuração do Workspace',
    description: 'Conecte o AIDaemon ao Slack via Socket Mode. Crie um app do Slack, adicione escopos e eventos e defina quem pode usá-lo.',
    content: () => `
<h1>Integração com o Slack</h1>
<p class="lead">Conecte o AIDaemon ao seu workspace do Slack via Socket Mode para mensagens em tempo real.</p>

${callout('success', 'Binários Pré-compilados', 'Se você instalou pelo script de uma linha ou pelo Homebrew, o suporte ao Slack já está incluído. Basta configurar o <code>config.toml</code> abaixo. A flag de funcionalidade só é necessária ao <a href="/getting-started/build">compilar a partir do código-fonte</a>.')}

<h2>Crie um App do Slack</h2>
<ol>
  <li>Acesse <a href="https://api.slack.com/apps" target="_blank" rel="noopener">api.slack.com/apps</a> e clique em <strong>Create New App</strong></li>
  <li>Escolha <strong>From scratch</strong>, dê um nome (por exemplo, "AIDaemon") e selecione o seu workspace</li>
  <li>Em <strong>Socket Mode</strong>, ative-o e gere um <strong>App-Level Token</strong> com o escopo <code>connections:write</code> &mdash; esse é o seu <code>app_token</code> (<code>xapp-...</code>)</li>
  <li>Em <strong>OAuth &amp; Permissions</strong>, adicione estes <strong>Bot Token Scopes</strong>:
    <ul>
      <li><code>app_mentions:read</code> &mdash; ver as mensagens que mencionam o bot com @</li>
      <li><code>channels:history</code> &mdash; ler mensagens e threads em canais públicos (também usado pela ferramenta <code>read_channel_history</code>)</li>
      <li><code>channels:read</code> &mdash; listar os membros de canais públicos</li>
      <li><code>chat:write</code> &mdash; enviar mensagens</li>
      <li><code>files:read</code> &mdash; baixar arquivos enviados pelos usuários</li>
      <li><code>files:write</code> &mdash; enviar arquivos para o Slack</li>
      <li><code>groups:history</code> &mdash; ler mensagens e threads em canais privados</li>
      <li><code>groups:read</code> &mdash; listar os membros de canais privados (necessário para resolver nomes de usuários em canais privados)</li>
      <li><code>im:history</code> &mdash; ler mensagens diretas</li>
      <li><code>im:read</code> &mdash; ler os metadados de DMs (necessário para transferências de arquivos em mensagens diretas)</li>
      <li><code>reactions:write</code> &mdash; adicionar reações de status (ampulheta durante o processamento)</li>
      <li><code>users:read</code> &mdash; resolver informações de usuários</li>
    </ul>
  </li>
  <li>Em <strong>Event Subscriptions</strong>, ative os eventos e assine estes eventos do bot:
    <ul>
      <li><code>app_mention</code> &mdash; mensagens que mencionam o bot com @</li>
      <li><code>message.channels</code> &mdash; mensagens em canais públicos</li>
      <li><code>message.groups</code> &mdash; mensagens em canais privados</li>
      <li><code>message.im</code> &mdash; mensagens diretas</li>
    </ul>
  </li>
  <li>Em <strong>App Home</strong>, role até <strong>Show Tabs</strong> e ative a <strong>Messages Tab</strong>. Marque <strong>"Allow users to send Slash commands and messages from the messages tab"</strong> &mdash; sem isso, os usuários não conseguem enviar DMs ao bot.</li>
  <li>Instale o app no seu workspace &mdash; copie o <strong>Bot User OAuth Token</strong> (<code>xoxb-...</code>)</li>
</ol>

<h2>Configuração</h2>
${codeBlock(`[slack]
app_token = "xapp-1-..."
bot_token = "xoxb-..."
allowed_user_ids = ["U123456789"]
use_threads = true

[users]
owner_ids = { slack = ["U123456789"] }`, 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'Mantido para configurações antigas; o bot inicia sempre que os dois tokens estão definidos.'],
  ['app_token', 'string', '&mdash;', 'App-Level Token para o Socket Mode (<code>xapp-...</code>). Aceita <code>"keychain"</code> e <code>$&#123;ENV&#125;</code>.'],
  ['bot_token', 'string', '&mdash;', 'Bot User OAuth Token (<code>xoxb-...</code>). Aceita <code>"keychain"</code> e <code>$&#123;ENV&#125;</code>.'],
  ['allowed_user_ids', 'array', '[]', 'IDs de usuário do Slack autorizados a usar o bot. Se vazio e sem proprietários definidos, a primeira pessoa a enviar DM ao bot o reivindica.'],
  ['use_threads', 'bool', 'true', 'Responde em threads por padrão. Cada thread tem seu próprio contexto de sessão.'],
])}

<p>Os proprietários são definidos em <code>[users] owner_ids</code>; se nenhum for definido, todos da lista de permissão são proprietários. Para mais de um bot do Slack, use entradas <code>[[slack_bots]]</code> com as mesmas chaves.</p>

<h2>Descubra Seu ID de Usuário do Slack</h2>
<p>Clique no seu perfil no Slack e depois em <strong>More</strong> &rarr; <strong>Copy member ID</strong>. O formato é <code>U</code> seguido de caracteres alfanuméricos (por exemplo, <code>U0123ABCDEF</code>).</p>

<h2>Recursos</h2>
<ul>
  <li><strong>Socket Mode</strong> &mdash; conexão WebSocket em tempo real, sem URL pública</li>
  <li><strong>Respostas em threads</strong> &mdash; conversas em threads configuráveis, com contexto de sessão por thread</li>
  <li><strong>Transferência de arquivos</strong> &mdash; envie e receba arquivos pelo Slack</li>
  <li><strong>Aprovações com Block Kit</strong> &mdash; botões interativos para as aprovações (veja <a href="/slack/approval">Fluxo de Aprovação</a>)</li>
  <li><strong>Comandos</strong> &mdash; os comandos compartilhados, digitados como <code>!command</code> (por exemplo <code>!cost</code>, <code>!model</code>, <code>!tasks</code>), mais <code>!workspace</code> e <code>!restart</code> (veja <a href="/slack/commands">Comandos</a>)</li>
  <li><strong>Reações de status</strong> &mdash; emoji de ampulheta durante o processamento, removido ao concluir</li>
  <li><strong>Conversão de Markdown</strong> &mdash; o markdown padrão é convertido automaticamente para o formato mrkdwn do Slack</li>
  <li><strong>Divisão de mensagens</strong> &mdash; respostas longas divididas para respeitar os limites de mensagem do Slack</li>
  <li><strong>Reconexão automática</strong> &mdash; backoff exponencial em caso de falha de conexão (5s &rarr; 60s no máximo)</li>
  <li><strong>Suporte a vários bots</strong> &mdash; rode vários bots do Slack com <code>[[slack_bots]]</code></li>
</ul>

<h2>Modelo de Sessão</h2>
<p>As sessões do Slack são identificadas por canal e thread:</p>
<ul>
  <li><strong>Mensagem de canal:</strong> <code>slack:{channel_id}</code></li>
  <li><strong>Mensagem em thread:</strong> <code>slack:{channel_id}:{thread_ts}</code> (quando <code>use_threads</code> está ativado)</li>
</ul>
<p>Com <code>use_threads</code> ativado, o bot responde a uma mensagem de canal de nível superior em uma nova thread, de modo que essa conversa tenha sua própria sessão. Os IDs de sessão levam o nome do bot como prefixo, então vários bots nunca compartilham uma sessão.</p>
<p>Cada sessão mantém seu próprio histórico de conversa, memória de trabalho e contexto de fatos.</p>

${callout('warn', 'Controle de Acesso', 'Se <code>allowed_user_ids</code> e a lista de proprietários do Slack estiverem vazios, a primeira pessoa a enviar DM ao bot se torna a proprietária e é salva na configuração. Quem não está na lista e menciona o bot com @ recebe um papel público limitado, que não pode executar comandos. Defina <code>allowed_user_ids</code> em produção.')}
`
  },
  {
    slug: '/slack/commands',
    section: 'Slack',
    title: 'Comandos',
    description: 'Comandos do AIDaemon no Slack, digitados como !command: !clear, !tasks, !cancel, !model, !cost, !workspace e mais.',
    content: () => `
<h1>Comandos do Slack</h1>
<p class="lead">Comandos disponíveis no Slack: os comandos compartilhados, sem os comandos de gerenciamento de bots e de terminal do Telegram. Digite-os como <code>!command</code>, porque o Slack reserva o <code>/</code> para os próprios comandos de barra; o <code>/command</code> é aceito quando o Slack o repassa.</p>

<p><code>!help</code> (ou <code>!start</code>) mostra os comandos do dia a dia com os botões Restart, Reload, Clear e Cost; <code>!help all</code> lista todos os comandos.</p>

<h2>Conversa</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>!clear</code> (ou <code>!new</code>)</td><td>Inicia uma conversa nova. Seu histórico é mantido, e o trabalho em andamento neste chat é interrompido.</td></tr>
<tr><td><code>!wipe</code></td><td>Exclui esta conversa permanentemente. O primeiro <code>!wipe</code> apenas explica; envie-o de novo em alguns minutos para apagá-la. Os fatos já salvos na memória são mantidos.</td></tr>
<tr><td><code>!context</code></td><td>Mostra quanto da conversa o agente consegue ver</td></tr>
<tr><td><code>!project [name|none]</code></td><td>Mostra ou altera o projeto em que este chat trabalha</td></tr>
<tr><td><code>!memory</code></td><td>Mostra a memória do projeto em que este chat trabalha</td></tr>
</tbody>
</table>

<h2>Trabalho</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>!tasks</code></td><td>Lista, numerado, o que está rodando neste chat</td></tr>
<tr><td><code>!cancel</code>, <code>!cancel all</code>, <code>!cancel &lt;number&gt;</code></td><td>Interrompe o que está rodando neste chat: tudo de um pedido, tudo, ou um item (os números vêm de <code>!tasks</code>)</td></tr>
<tr><td><code>!status</code></td><td>O modo deste chat, o que está rodando e o próximo item agendado</td></tr>
<tr><td><code>!work [ready|running|blocked|show|comment|unblock|retry]</code></td><td>Veja e gerencie trabalhos mais longos que esperam ou rodam sozinhos</td></tr>
<tr><td><code>!cost</code></td><td>Mostra o uso de tokens (últimas 24h, últimos 7 dias, principais modelos)</td></tr>
</tbody>
</table>

<h2>Modelos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>!model</code></td><td>Mostra o modelo atual</td></tr>
<tr><td><code>!model &lt;name&gt;</code></td><td>Usa um único modelo em todos os chats (desativa a escolha automática de modelo)</td></tr>
<tr><td><code>!models</code></td><td>Lista os modelos que o seu provedor oferece (o ativo é marcado)</td></tr>
<tr><td><code>!auto</code></td><td>Volta à escolha automática de modelo</td></tr>
</tbody>
</table>

<h2>Acesso e Privacidade</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>!mode [full|unrestricted|readonly]</code></td><td>Mostra ou altera o modo de acesso deste chat</td></tr>
<tr><td><code>!readonly</code></td><td>Deixa este chat somente leitura por 4 horas</td></tr>
<tr><td><code>!private [off]</code></td><td>Não lembra nem aprende com a sua próxima mensagem (<code>off</code> cancela)</td></tr>
<tr><td><code>!trustall on|off</code></td><td>Executa todo comando de terminal sem perguntar</td></tr>
</tbody>
</table>

<h2>Arquivos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>!checkpoints</code></td><td>Lista os checkpoints do sistema de arquivos</td></tr>
<tr><td><code>!rollback [checkpoint-id|confirm TOKEN]</code></td><td>Pré-visualiza a reversão de um checkpoint e depois a confirma</td></tr>
</tbody>
</table>

<h2>Dispositivos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>!pair_device</code></td><td>Pareia um celular ou navegador com o app</td></tr>
<tr><td><code>!devices</code></td><td>Lista os dispositivos pareados</td></tr>
<tr><td><code>!revoke_device &lt;id&gt;</code></td><td>Desfaz o pareamento de um dispositivo</td></tr>
<tr><td><code>!exposure</code></td><td>Mostra os túneis que publicam os gateways</td></tr>
</tbody>
</table>

<h2>Gerenciamento de Bots</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>!reload</code></td><td>Relê o config.toml e aplica as alterações de provedor e modelo (outras alterações exigem <code>!restart</code>)</td></tr>
<tr><td><code>!restart</code></td><td>Reinicialização completa: inicia um novo processo, carregando um novo binário, configuração e servidores MCP (somente proprietário)</td></tr>
<tr><td><code>!workspace grant &lt;@user&gt; &lt;read|edit&gt; &lt;project-path&gt; [hours]</code></td><td>Dá a alguém acesso temporário a um projeto (até 168 horas). Envie-o no grupo privado do Slack em que a concessão deve valer. Somente proprietário.</td></tr>
<tr><td><code>!workspace revoke &lt;@user&gt;</code> / <code>!workspace list</code></td><td>Remove uma concessão ou lista as concessões atuais</td></tr>
</tbody>
</table>

${callout('info', 'Quem Pode Usar os Comandos', 'A maioria dos comandos é só para proprietários. Os convidados podem usar <code>!tasks</code>, <code>!private</code>, <code>!context</code>, <code>!readonly</code>, <code>!mode</code> e <code>!cancel</code>; quem tem apenas o papel público (mencionou o bot com @, mas não está na lista de permissão) não pode executar comandos.')}

${callout('info', 'Barra vs. Texto Simples', 'Estes comandos são enviados como mensagens normais em uma DM ou canal com o bot. Eles não são registrados como comandos de barra do Slack no manifesto do app. Se você mesmo adicionar comandos de barra nativos ao app, o bot os trata, somente para proprietários.')}
`
  },
  {
    slug: '/slack/approval',
    section: 'Slack',
    title: 'Fluxo de Aprovação',
    description: 'Botões interativos do Block Kit para aprovar comandos e ações no Slack.',
    content: () => `
<h1>Fluxo de Aprovação do Slack</h1>
<p class="lead">Botões interativos do Block Kit para aprovar comandos e ações no Slack.</p>

<h2>Como Funciona</h2>
<ol>
  <li>O agente quer executar um comando de terminal (ou realizar outra ação) que precisa da sua aprovação. Um comando roda sem perguntar quando você já o permitiu ou quando está na lista segura e pode rodar confinado. Caso contrário, uma checagem rápida de risco decide se ele é perigoso o bastante para perguntar a você.</li>
  <li>O cartão de aprovação é publicado no canal ou na thread do Slack onde o trabalho está rodando. Somente um proprietário pode respondê-lo.</li>
  <li>O cartão mostra o comando, o risco dele e quaisquer avisos, com estes botões:</li>
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

<h2>Opções de Aprovação</h2>
<table class="config-table">
<thead><tr><th>Opção</th><th>Comportamento</th></tr></thead>
<tbody>
<tr><td><strong>Allow</strong></td><td>Executa só desta vez</td></tr>
<tr><td><strong>Always allow</strong></td><td>Executa e lembra o programa no banco de dados (por destino de execução), para que você não seja perguntado de novo, mesmo após uma reinicialização. O config.toml não é alterado.</td></tr>
<tr><td><strong>Allow until restart</strong></td><td>Mostrado no lugar de <strong>Always allow</strong> para comandos críticos, ou para tudo quando <code>terminal.permission_mode = "cautious"</code>. A permissão dura até o daemon reiniciar.</td></tr>
<tr><td><strong>Deny</strong></td><td>Recusa &mdash; o agente é informado de que foi negado</td></tr>
</tbody>
</table>
<p>Algumas ações oferecem apenas <strong>Allow</strong> e <strong>Deny</strong>. Os cartões também cobrem mais do que comandos de terminal, como ações do navegador e a confirmação de novos trabalhos agendados (<strong>Approve &amp; activate</strong> / <strong>Cancel</strong>).</p>

${callout('info', 'Expiração', 'Um cartão sem resposta expira em 5 minutos, com um lembrete pouco antes, e conta como <strong>Deny</strong>.')}

<h2>O Que Sempre Pergunta</h2>
<ul>
  <li>Comandos de gatilhos não confiáveis, como o <a href="/triggers">e-mail</a></li>
  <li>Comandos que pedem capacidades além da tarefa</li>
  <li>Comandos que tocam caminhos protegidos de credenciais, mesmo que já permitidos antes</li>
  <li>Novos comandos que continuariam rodando em segundo plano (destacados)</li>
</ul>

${callout('warn', 'Comandos Encadeados', 'Um comando encadeado (<code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code>) só conta como permitido se o programa de cada parte estiver na sua lista de permissões permanente. Uma permissão que você deu para uma sessão nunca libera uma cadeia. A substituição de comandos (<code>$()</code>, crases) nunca é coberta por uma permissão.')}

${callout('danger', 'Fontes Não Confiáveis', 'As sessões iniciadas por gatilhos (como e-mail) não são confiáveis. Todo comando de terminal nelas exige aprovação, seja o que for que você permitiu antes.')}
`
  },
{
    slug: '/discord',
    section: 'Discord',
    title: 'Configuração do Bot',
    description: 'Conecte o AIDaemon ao Discord. Crie um aplicativo do Discord, ative o Message Content e defina quem pode usá-lo.',
    content: () => `
<h1>Configuração do Bot do Discord</h1>
<p class="lead">Conecte o AIDaemon ao Discord por uma conexão direta com o Discord Gateway e a API REST.</p>

${callout('success', 'Binários Pré-compilados', 'Se você instalou pelo script de uma linha ou pelo Homebrew, o suporte ao Discord já está incluído. Basta configurar o <code>config.toml</code> abaixo. A flag de funcionalidade só é necessária ao <a href="/getting-started/build">compilar a partir do código-fonte</a>.')}

<h2>Crie um Aplicativo do Discord</h2>
<ol>
  <li>Acesse o <a href="https://discord.com/developers/applications" target="_blank" rel="noopener">Discord Developer Portal</a></li>
  <li>Clique em <strong>New Application</strong> e dê um nome (por exemplo, &ldquo;AIDaemon&rdquo;)</li>
  <li>Em <strong>Bot</strong>, clique em <strong>Add Bot</strong></li>
  <li>Copie o <strong>Bot Token</strong> &mdash; esse é o seu <code>bot_token</code></li>
  <li>Ative o <strong>Message Content Intent</strong> em <strong>Privileged Gateway Intents</strong> &mdash; o bot precisa dele para ler o texto das mensagens. Nenhum outro intent privilegiado é necessário.</li>
  <li>Em <strong>OAuth2 &rarr; URL Generator</strong>, selecione os escopos <code>bot</code> e <code>applications.commands</code> e depois as permissões: View Channels, Send Messages, Read Message History, Attach Files, Use Slash Commands</li>
  <li>Use a URL gerada para convidar o bot ao seu servidor</li>
</ol>

<h2>Configuração</h2>
${codeBlock(`[discord]
bot_token = "keychain"   # or the token itself
allowed_user_ids = [123456789012345678]
guild_id = 987654321098765432

[users]
owner_ids = { discord = ["123456789012345678"] }`, 'toml', 'config.toml')}

${configTable([
  ['bot_token', 'string', '&mdash;', 'Token do bot do Discord obtido no Developer Portal. Aceita <code>"keychain"</code>.'],
  ['allowed_user_ids', 'array', '[]', 'IDs de usuário do Discord (inteiros) autorizados a enviar DM ao bot. Se vazio e sem proprietários definidos, a primeira pessoa a enviar DM ao bot o reivindica.'],
  ['guild_id', 'integer', 'null', 'ID opcional de servidor. Os comandos de barra são registrados nesse servidor, onde aparecem na hora, em vez de globalmente, o que pode levar até uma hora. Isso não limita onde o bot responde.'],
])}

<p>Os proprietários são definidos em <code>[users] owner_ids</code>; se nenhum for definido, a lista de permissão contém os proprietários. Para mais de um bot do Discord, use entradas <code>[[discord_bots]]</code> com as mesmas chaves.</p>

<h2>Descubra Seu ID de Usuário do Discord</h2>
<p>Ative o <strong>Developer Mode</strong> nas configurações do Discord (Appearance &rarr; Advanced), depois clique com o botão direito no seu nome de usuário e selecione <strong>Copy User ID</strong>.</p>

<h2>Recursos</h2>
<ul>
  <li><strong>Conexão com o Gateway</strong> &mdash; uma conexão direta com o Discord Gateway (v10) e a API REST</li>
  <li><strong>Comandos de barra</strong> &mdash; comandos de aplicativo registrados (veja <a href="/discord/commands">Comandos</a>)</li>
  <li><strong>Botões interativos</strong> &mdash; fluxo de aprovação com botões clicáveis (veja <a href="/discord/approval">Fluxo de Aprovação</a>)</li>
  <li><strong>Transferência de arquivos</strong> &mdash; envie e receba arquivos como anexos do Discord (os arquivos que o bot envia são limitados a 10 MB)</li>
  <li><strong>Divisão de mensagens</strong> &mdash; respostas longas divididas para respeitar o limite de 2000 caracteres por mensagem do Discord</li>
  <li><strong>Reconexão automática</strong> &mdash; backoff exponencial em caso de falha de conexão (5s &rarr; limite de 60s)</li>
  <li><strong>Lista de usuários permitidos</strong> &mdash; controle de acesso por token de bot</li>
  <li><strong>Suporte a vários bots</strong> &mdash; rode vários bots do Discord com configurações separadas (<code>[[discord_bots]]</code>)</li>
</ul>

<h2>Modelo de Sessão</h2>
<p>As sessões do Discord são identificadas pelo lugar onde a conversa acontece:</p>
<ul>
  <li><strong>Canal de servidor:</strong> <code>discord:ch:{channel_id}</code></li>
  <li><strong>Mensagem direta:</strong> <code>discord:dm:{user_id}</code></li>
</ul>
<p>Os IDs de sessão levam o nome do bot como prefixo, então vários bots nunca compartilham uma sessão. Cada sessão mantém seu próprio histórico de conversa, memória de trabalho e contexto de fatos.</p>

${callout('warn', 'Controle de Acesso', 'Os membros do servidor que não estão na lista podem conversar com o bot como convidados, mas somente quando o mencionam ou respondem a ele. Os arquivos deles não são salvos, e eles não podem responder a aprovações nem executar comandos de proprietário. As DMs exigem a lista de permissão. Sempre defina <code>allowed_user_ids</code> em produção.')}
`
  },
  {
    slug: '/discord/commands',
    section: 'Discord',
    title: 'Comandos de Barra',
    description: 'Comandos do Discord para o AIDaemon: /model, /clear, /tasks, /cancel, /cost, /status e mais.',
    content: () => `
<h1>Comandos de Barra do Discord</h1>
<p class="lead">Comandos disponíveis no Discord. Os mais usados são registrados como comandos de aplicativo, então aparecem quando você digita <code>/</code>; os demais funcionam quando você os envia como mensagem.</p>

<p><code>/help</code> (ou <code>/start</code>) mostra os comandos do dia a dia; <code>/help all</code> lista todos os comandos.</p>

${callout('info', 'No Menu de Barra', 'O menu lista <code>/model</code>, <code>/models</code>, <code>/auto</code>, <code>/reload</code>, <code>/tasks</code>, <code>/cancel</code>, <code>/clear</code>, <code>/wipe</code>, <code>/cost</code>, <code>/context</code> e <code>/help</code>. Cada um aceita um texto opcional <code>args</code>, por exemplo <code>/model args:claude-sonnet-5-5</code>. Todos os outros comandos abaixo funcionam quando digitados como uma mensagem normal, como <code>/status</code> ou <code>/mode readonly</code>.')}

<h2>Conversa</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>/clear</code> (ou <code>/new</code>)</td><td>Inicia uma conversa nova. Seu histórico é mantido (use <code>/wipe</code> para excluí-lo), e o trabalho em andamento neste chat é interrompido.</td></tr>
<tr><td><code>/wipe</code></td><td>Exclui esta conversa permanentemente. O primeiro <code>/wipe</code> apenas explica; envie-o de novo em alguns minutos para apagá-la. Os fatos já salvos na memória são mantidos.</td></tr>
<tr><td><code>/context</code></td><td>Mostra quanto da conversa o agente consegue ver</td></tr>
<tr><td><code>/project [name|none]</code></td><td>Mostra ou altera o projeto em que este chat trabalha</td></tr>
<tr><td><code>/memory</code></td><td>Mostra a memória do projeto em que este chat trabalha</td></tr>
</tbody>
</table>

<h2>Trabalho</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>/tasks</code></td><td>Lista, numerado, o que está rodando neste chat</td></tr>
<tr><td><code>/cancel</code>, <code>/cancel all</code>, <code>/cancel &lt;number&gt;</code></td><td>Interrompe o que está rodando neste chat: tudo de um pedido, tudo, ou um item (os números vêm de <code>/tasks</code>)</td></tr>
<tr><td><code>/status</code></td><td>O modo deste chat, o que está rodando e o próximo item agendado</td></tr>
<tr><td><code>/work [ready|running|blocked|show|comment|unblock|retry]</code></td><td>Veja e gerencie trabalhos mais longos que esperam ou rodam sozinhos</td></tr>
<tr><td><code>/cost</code></td><td>Mostra o uso de tokens (últimas 24h, últimos 7 dias, principais modelos)</td></tr>
</tbody>
</table>

<h2>Modelos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Mostra o modelo atual</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Usa um único modelo em todos os chats (desativa a escolha automática de modelo)</td></tr>
<tr><td><code>/models</code></td><td>Lista os modelos que o seu provedor oferece (o ativo é marcado)</td></tr>
<tr><td><code>/auto</code></td><td>Volta à escolha automática de modelo</td></tr>
</tbody>
</table>

<h2>Acesso e Privacidade</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>/mode [full|unrestricted|readonly]</code></td><td>Mostra ou altera o modo de acesso deste chat</td></tr>
<tr><td><code>/readonly</code></td><td>Deixa este chat somente leitura por 4 horas</td></tr>
<tr><td><code>/private [off]</code></td><td>Não lembra nem aprende com a sua próxima mensagem (<code>off</code> cancela)</td></tr>
<tr><td><code>/trustall on|off</code></td><td>Executa todo comando de terminal sem perguntar</td></tr>
</tbody>
</table>

<h2>Arquivos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>/checkpoints</code></td><td>Lista os checkpoints do sistema de arquivos</td></tr>
<tr><td><code>/rollback [checkpoint-id|confirm TOKEN]</code></td><td>Pré-visualiza a reversão de um checkpoint e depois a confirma</td></tr>
</tbody>
</table>

<h2>Dispositivos</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>/pair_device</code></td><td>Pareia um celular ou navegador com o app</td></tr>
<tr><td><code>/devices</code></td><td>Lista os dispositivos pareados</td></tr>
<tr><td><code>/revoke_device &lt;id&gt;</code></td><td>Desfaz o pareamento de um dispositivo</td></tr>
<tr><td><code>/exposure</code></td><td>Mostra os túneis que publicam os gateways</td></tr>
</tbody>
</table>

<h2>Gerenciamento de Bots</h2>
<table class="config-table">
<thead><tr><th>Comando</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>/reload</code></td><td>Relê o config.toml e aplica as alterações de provedor e modelo</td></tr>
</tbody>
</table>

${callout('info', 'Quem Pode Usar os Comandos', 'A maioria dos comandos é só para proprietários. Os convidados podem usar <code>/tasks</code>, <code>/private</code>, <code>/context</code>, <code>/readonly</code>, <code>/mode</code> e <code>/cancel</code>; os quatro últimos dizem por conta própria se o convidado pode agir.')}

<h2>Mensagens Comuns</h2>
<p>Além dos comandos, você pode conversar com o bot em uma mensagem direta ou, em um canal de servidor, mencionando-o ou respondendo a ele. Elas são tratadas como mensagens de conversa normais.</p>

${callout('info', 'Registro de Comandos', 'Os comandos são registrados cada vez que o bot se conecta: no servidor indicado por <code>guild_id</code>, onde aparecem na hora, ou globalmente, o que pode levar até uma hora para aparecer.')}
`
  },
  {
    slug: '/discord/approval',
    section: 'Discord',
    title: 'Fluxo de Aprovação',
    description: 'Botões interativos de mensagem para aprovar comandos e ações no Discord.',
    content: () => `
<h1>Fluxo de Aprovação do Discord</h1>
<p class="lead">Botões interativos de mensagem para aprovar comandos e ações no Discord.</p>

<h2>Como Funciona</h2>
<ol>
  <li>O agente quer executar um comando de terminal (ou realizar outra ação) que precisa da sua aprovação. Um comando roda sem perguntar quando você já o permitiu ou quando está na lista segura e pode rodar confinado. Caso contrário, uma checagem rápida de risco decide se ele é perigoso o bastante para perguntar a você.</li>
  <li>O cartão de aprovação é publicado no canal do Discord onde o trabalho está rodando, usando botões de mensagem do Discord. Somente um proprietário pode pressioná-los.</li>
  <li>O cartão mostra o comando, o risco dele e quaisquer avisos, com estes botões:</li>
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

<h2>Opções de Aprovação</h2>
<table class="config-table">
<thead><tr><th>Opção</th><th>Comportamento</th></tr></thead>
<tbody>
<tr><td><strong>Allow</strong></td><td>Executa só desta vez</td></tr>
<tr><td><strong>Always allow</strong></td><td>Executa e lembra o programa no banco de dados (por destino de execução), para que você não seja perguntado de novo, mesmo após uma reinicialização. O config.toml não é alterado.</td></tr>
<tr><td><strong>Allow until restart</strong></td><td>Mostrado no lugar de <strong>Always allow</strong> para comandos críticos, ou para tudo quando <code>terminal.permission_mode = "cautious"</code>. A permissão dura até o daemon reiniciar.</td></tr>
<tr><td><strong>Deny</strong></td><td>Recusa &mdash; o agente é informado de que foi negado</td></tr>
</tbody>
</table>
<p>Algumas ações oferecem apenas <strong>Allow</strong> e <strong>Deny</strong>. Os cartões também cobrem mais do que comandos de terminal, como ações do navegador e a confirmação de novos trabalhos agendados (<strong>Approve &amp; activate</strong> / <strong>Cancel</strong>).</p>

${callout('info', 'Expiração', 'Um cartão sem resposta expira em 5 minutos, com um lembrete pouco antes, e conta como <strong>Deny</strong>.')}

<h2>O Que Sempre Pergunta</h2>
<ul>
  <li>Comandos de gatilhos não confiáveis, como o <a href="/triggers">e-mail</a></li>
  <li>Comandos que pedem capacidades além da tarefa</li>
  <li>Comandos que tocam caminhos protegidos de credenciais, mesmo que já permitidos antes</li>
  <li>Novos comandos que continuariam rodando em segundo plano (destacados)</li>
</ul>

${callout('warn', 'Comandos Encadeados', 'Um comando encadeado (<code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code>) só conta como permitido se o programa de cada parte estiver na sua lista de permissões permanente. Uma permissão que você deu para uma sessão nunca libera uma cadeia. A substituição de comandos (<code>$()</code>, crases) nunca é coberta por uma permissão.')}

${callout('danger', 'Fontes Não Confiáveis', 'As sessões iniciadas por gatilhos (como e-mail) não são confiáveis. Todo comando de terminal nelas exige aprovação, seja o que for que você permitiu antes.')}
`
  },
    {
    slug: '/tools',
    section: 'Tools',
    title: 'Visão Geral das Ferramentas',
    description: 'Visão geral das ferramentas integradas que o agente do AIDaemon pode chamar: terminal, arquivos, memória, navegador, busca na web, subagentes, MCP e mais.',
    content: () => `
<h1>Ferramentas</h1>
<p class="lead">O AIDaemon oferece um conjunto de ferramentas integradas que o modelo pode chamar por conta própria enquanto trabalha em um pedido.</p>

<h2>Trait Tool</h2>
<p>Todas as ferramentas implementam a mesma interface:</p>
${codeBlock(`trait Tool {
    fn name(&self) -> &str;
    fn description(&self) -> &str;
    fn schema(&self) -> Value;   // full function object: name, description, parameters
    async fn execute(&self, arguments: &str, facts: &ToolCallContext) -> Result<ToolCallOutcome>;
    fn call_effects(&self, arguments: &str) -> CallEffects; // what a call does, judged by the approval hooks
}`, 'rust')}
<p>Uma ferramenta nunca pergunta ao proprietário por conta própria. Ela declara o que cada chamada faz (seus efeitos), e os hooks de aprovação do kernel do agente decidem se a executam, perguntam a você ou recusam.</p>

<h2>Ferramentas Integradas</h2>
<table class="config-table">
<thead><tr><th>Ferramenta</th><th>Descrição</th><th>Configuração</th></tr></thead>
<tbody>
<tr><td><a href="/tools/terminal"><code>terminal</code></a></td><td>Executa comandos de shell com fluxo de aprovação (veja <a href="/tools/command-risk">risco de comandos</a>)</td><td>[terminal]</td></tr>
<tr><td><a href="/tools/system-info"><code>system_info</code></a></td><td>Consulta hostname, SO, tempo ligado e memória</td><td>Sempre ativada</td></tr>
<tr><td><code>read_file</code>, <code>write_file</code>, <code>edit_file</code>, <code>search_files</code></td><td>Lê, escreve, edita e busca arquivos no workspace</td><td>Sempre ativada</td></tr>
<tr><td><code>check_environment</code></td><td>Verifica quais programas e ferramentas estão instalados</td><td>Sempre ativada</td></tr>
<tr><td><a href="/tools/memory"><code>remember_fact</code></a></td><td>Guarda ou esquece fatos sobre você (busque-os com <code>manage_memories</code>)</td><td>Sempre ativada</td></tr>
<tr><td><a href="/tools/memory"><code>manage_memories</code></a></td><td>Busca, lista e esquece fatos guardados, busca em chats passados e acompanha metas pessoais</td><td>Sempre ativada</td></tr>
<tr><td><code>search_history</code></td><td>Busca as mensagens exatas de conversas passadas</td><td>Sempre ativada</td></tr>
<tr><td><a href="/tools/config-manager"><code>manage_config</code></a></td><td>Lê e altera o config.toml, troca de provedor e gerencia failover (segredos ocultos)</td><td>Sempre ativada</td></tr>
<tr><td><a href="/tools/web-search"><code>web_search</code></a></td><td>Pesquisa na web (DuckDuckGo, Brave ou SearxNG, mesclados)</td><td>[search]</td></tr>
<tr><td><a href="/tools/web-fetch"><code>web_fetch</code></a></td><td>Busca e extrai conteúdo legível de URLs</td><td>Sempre ativada</td></tr>
<tr><td><code>http_request</code></td><td>Chama APIs REST/JSON, com perfis de autenticação salvos</td><td>Sempre ativada</td></tr>
<tr><td><code>manage_auth</code>, <code>manage_api</code></td><td>Conecta serviços (chaves de API, OAuth) e aprende as APIs deles</td><td>Sempre ativada</td></tr>
<tr><td><code>set_reminder</code></td><td>Define um lembrete</td><td>Sempre ativada</td></tr>
<tr><td><a href="/scheduler"><code>schedule_task</code></a></td><td>Cria uma tarefa agendada</td><td>Sempre ativada</td></tr>
<tr><td><a href="/scheduler"><code>manage_automations</code></a></td><td>Lista, altera e executa tarefas agendadas e lembretes</td><td>Sempre ativada</td></tr>
<tr><td><code>manage_mandates</code></td><td>Metas permanentes em que o agente trabalha ao longo do tempo</td><td>Sempre ativada</td></tr>
<tr><td><code>track_requirements</code></td><td>Mantém uma checklist do que um pedido solicitou</td><td>Sempre ativada</td></tr>
<tr><td><a href="/tools/browser"><code>browser</code></a></td><td>Automação do Chrome com sessões de login persistentes</td><td>[browser] enabled=true</td></tr>
<tr><td><code>hand_over</code></td><td>Entrega o navegador a você (por exemplo, para fazer login)</td><td>[browser] + [surfaces]</td></tr>
<tr><td><code>computer_use</code></td><td>Controla a área de trabalho deste computador a partir de capturas de tela</td><td>[computer_use]</td></tr>
<tr><td><a href="/tools/send-file"><code>send_file</code></a></td><td>Envia um arquivo ao usuário no chat atual (Telegram, Slack, Discord ou o app)</td><td>[files] (ativado por padrão)</td></tr>
<tr><td><code>generate_image</code></td><td>Gera uma imagem</td><td>[files]</td></tr>
<tr><td><a href="/tools/sub-agents"><code>spawn_agent</code></a></td><td>Delega trabalho a subagentes e especialistas</td><td>[subagents] (ativado por padrão)</td></tr>
<tr><td><a href="/tools/cli-agents"><code>cli_agent</code></a></td><td>Delega a agentes de código instalados (também <code>manage_cli_agents</code>)</td><td>[cli_agents] enabled = true</td></tr>
<tr><td><a href="/health-monitoring"><code>health_probe</code></a></td><td>Gerencia e executa sondas de saúde</td><td>[health]</td></tr>
<tr><td><a href="/skills"><code>use_skill</code>, <code>skill_resources</code>, <code>manage_skills</code></a></td><td>Usa, explora e instala skills</td><td>[skills]</td></tr>
<tr><td><a href="/tools/people"><code>manage_people</code></a></td><td>Agenda de contatos pessoal com aniversários, preferências e relacionamentos</td><td>Sempre registrada</td></tr>
<tr><td><a href="/mcp"><code>manage_mcp</code></a></td><td>Adiciona, remove e reinicia servidores MCP em tempo de execução</td><td>Sempre ativada</td></tr>
<tr><td><a href="/mcp">Ferramentas MCP</a></td><td>Descobertas dinamicamente por meio de servidores MCP</td><td>[mcp.*]</td></tr>
</tbody>
</table>

<p>Quinze ferramentas principais são oferecidas em toda chamada (terminal, memória, lembretes e agendamento, busca no histórico, web, arquivos, <code>spawn_agent</code>, <code>track_requirements</code>). As demais são oferecidas quando um pedido precisa delas. O trabalho é limitado por progresso e por orçamentos de tokens, não por um número fixo de passos.</p>

<h2>Quais Ferramentas Estão Registradas</h2>
<p>As ferramentas são registradas na inicialização, em três grupos:</p>
<ul>
  <li><strong>Sempre registradas</strong> (a menos que listadas em <code>[tools] disabled</code>): system_info, terminal, remember_fact, manage_memories, set_reminder, schedule_task, manage_mandates, manage_automations, search_history, manage_config, web_fetch, web_search, read_file, write_file, edit_file, search_files, check_environment, manage_mcp, manage_people, http_request, manage_auth, manage_api.</li>
  <li><strong>Registradas quando ativadas</strong>: spawn_agent ([subagents]); browser, e hand_over com [surfaces] ([browser]); computer_use ([computer_use]); send_file e generate_image ([files]); cli_agent e manage_cli_agents ([cli_agents]); health_probe ([health]); use_skill, skill_resources e manage_skills ([skills]); self_diagnose, goal_trace e policy_metrics ([diagnostics]); ferramentas de nós ([nodes]); client_view e request_feature ([client_gateway]); read_channel_history (Slack, opcional).</li>
  <li><strong>Ferramentas MCP</strong> dos servidores configurados.</li>
</ul>
${codeBlock(`[tools]
disabled = ["generate_image"]   # leave a built-in tool out at startup (needs /restart)`, 'toml', 'config.toml')}
`
  },
  {
    slug: '/tools/terminal',
    section: 'Tools',
    title: 'Ferramenta Terminal',
    description: 'Execute comandos de shell no host, em um contêiner Docker ou em um host SSH pelo AIDaemon, com aprovação do proprietário para tudo que for arriscado.',
    content: () => `
<h1>Ferramenta Terminal</h1>
<p class="lead">Executa comandos de shell. Os comandos rodam com <code>sh -c</code> (PowerShell no Windows), no workspace configurado: este computador, um contêiner Docker ou um host SSH.</p>

<h2>Parâmetros</h2>
${configTable([
  ['action', 'string', '—', 'Um de: run, check, kill (obrigatório)'],
  ['command', 'string', '—', 'O comando de shell a executar (para action="run")'],
  ['script', 'string', '—', 'Um script de shell com várias etapas, executado com /bin/sh -eu para que uma etapa que falha interrompa as demais. Use no lugar de command.'],
  ['working_dir', 'string', '—', 'Diretório em que o comando roda'],
  ['background', 'bool', 'false', 'Executa trabalho finito em segundo plano; o resultado é enviado a você quando terminar'],
  ['detach', 'bool', 'false', 'Inicia um processo de longa duração (servidor, watcher) que continua rodando até ser encerrado'],
  ['network', 'bool', 'false', 'Permite rede em uma execução confinada (sandbox); pergunta antes, a menos que já concedido'],
  ['read_paths / read_roots / write_paths / write_roots', 'array', '—', 'Caminhos extras que uma execução confinada pode ler ou gravar; caminhos fora do escopo da tarefa perguntam antes'],
  ['description', 'string', '—', 'Algumas palavras mostradas a você enquanto roda'],
  ['pid', 'integer', '—', 'ID do processo, obrigatório para check/kill'],
])}
<p>O modo de confiança total é o comando <code>/trustall</code> do proprietário, nunca uma ação da ferramenta.</p>

<h2>Lógica de Aprovação</h2>
<p>Um comando roda sem perguntar quando uma destas condições é verdadeira:</p>
<ol>
  <li>O programa dele está em <code>terminal.allowed_prefixes</code> ou foi permitido antes. Para uma cadeia (<code>&amp;&amp;</code>, <code>||</code>, <code>;</code>, <code>|</code>), o programa de cada segmento precisa estar permitido.</li>
  <li>É um comando de build, lint ou git somente leitura da lista de confinados; nesse caso ele roda no sandbox.</li>
  <li>A checagem de segurança do modelo sobre o comando inteiro não encontra nada que precise de você.</li>
</ol>
<p>Um programa permitido não cobre um comando que grava um arquivo por redirecionamento, começa com uma atribuição de variável ou inicia outro programa (<code>env sh -c</code>, <code>xargs</code>, <code>find -exec</code>). Um comando que toca um caminho de credenciais sempre pergunta. Se a checagem de segurança estiver indisponível, o comando pergunta (falha de forma fechada). Veja <a href="/tools/command-risk">Avaliação de Risco de Comandos</a>.</p>

<h3>Prefixos Permitidos por Padrão</h3>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

<h2>Saída</h2>
<p>Retorna primeiro o stdout, depois o stderr (se houver). A saída é truncada em <code>terminal.max_output_chars</code> (padrão de 4000 caracteres).</p>

<h2>Comandos em Segundo Plano</h2>
<p>Se um comando excede o tempo limite inicial, ele vai para segundo plano e retorna um PID.</p>
<ul>
  <li><code>action="check"</code> + <code>pid</code> mostra a saída parcial/final</li>
  <li><code>action="kill"</code> + <code>pid</code> interrompe um comando em segundo plano em execução</li>
  <li>A saída recente de comandos concluídos é retida por pouco tempo, para que verificações posteriores ainda funcionem</li>
  <li>Comandos que viram daemon (<code>nohup</code>, <code>setsid</code>, <code>&amp; disown</code>&hellip;) exigem <code>detach=true</code> e a aprovação de um proprietário</li>
</ul>

<h2>Bloqueios Rígidos</h2>
<p>Alguns comandos são recusados antes de qualquer aprovação e não podem ser permitidos: <code>rm</code>/<code>chmod</code>/<code>chown</code> recursivos da raiz, do home ou de diretórios do sistema, <code>mkfs</code>, <code>dd</code>/<code>shred</code>/<code>wipefs</code> em um dispositivo bruto e exclusões recursivas (<code>rm -r</code>, <code>find -delete</code>) de qualquer coisa fora do workspace.</p>

<h2>Configuração</h2>
${codeBlock(`[terminal]
allowed_prefixes = ["ls", "cat", "head", "tail", "echo", "date"]
initial_timeout_secs = 30
max_output_chars = 4000
permission_mode = "default"
confinement = "host"   # or "sandbox"`, 'toml', 'config.toml')}
<p><code>confinement = "host"</code> (padrão) executa os comandos nesta máquina, com o seu ambiente e as suas credenciais. <code>"sandbox"</code> executa cada comando no sandbox do sistema operacional (seatbelt no macOS, bubblewrap ou o sandbox do Codex no Linux), sem rede e apenas com os arquivos da tarefa, a menos que concedido.</p>

<h2>Allow Always (Persistente)</h2>
<p>Os cartões de aprovação oferecem Allow Once, Allow Session (até reiniciar) ou Allow Always, e Deny, em qualquer canal ou no app. O modo cauteloso, e os comandos Critical no modo padrão, oferecem Allow Session em vez de Allow Always. Quando você escolhe "Allow Always":</p>
<ol>
  <li>O programa do comando (a primeira palavra, ou o programa de cada segmento em um comando encadeado) passa a ser o prefixo permitido</li>
  <li>O prefixo é adicionado à lista de permitidos em memória</li>
  <li>O prefixo é salvo no banco de dados para o workspace atual (<code>terminal_backend_allowed_prefixes</code>), de modo que cada destino de execução mantém as próprias aprovações</li>
  <li>Na reinicialização, os prefixos persistidos são mesclados com os prefixos da configuração</li>
</ol>
<p>Isso significa que as aprovações "Allow Always" sobrevivem às reinicializações do daemon sem modificar o config.toml.</p>

${callout('danger', 'Sessões Não Confiáveis', 'As sessões de gatilhos (e-mail etc.) são marcadas como não confiáveis. <strong>Todos</strong> os comandos em sessões não confiáveis exigem aprovação, independentemente da lista de permissões.')}
`
  },
{
    slug: '/tools/command-risk',
    section: 'Tools',
    title: 'Avaliação de Risco de Comandos',
    description: 'Como o AIDaemon decide quando um comando de terminal precisa da sua aprovação e quão arriscado o cartão diz que ele é.',
    content: () => `
<h1>Avaliação de Risco de Comandos</h1>
<p class="lead">Um comando que você ainda não permitiu é verificado pelo modelo, que classifica o que o comando inteiro realmente faz (leituras, edições locais, rede, deploys, exclusões, segredos&hellip;). Os comandos que precisam de você recebem um cartão de aprovação classificado como Safe, Medium, High ou Critical.</p>

<h2>Níveis de Risco</h2>
<table class="config-table">
<thead><tr><th>Nível</th><th>O cartão mostra</th></tr></thead>
<tbody>
<tr><td><strong>Safe</strong></td><td>New command</td></tr>
<tr><td><strong>Medium</strong></td><td>Approval needed</td></tr>
<tr><td><strong>High</strong></td><td>Review carefully</td></tr>
<tr><td><strong>Critical</strong></td><td>Dangerous action. Também usado para comandos que viram daemon e sempre que a checagem de segurança está indisponível.</td></tr>
</tbody>
</table>
<p>O nível vem da checagem de segurança, não de uma lista fixa. Deploys, pushes, envios, exclusões, alterações de sistema, escalonamento de privilégios, execução de código baixado e tudo o que ela não consegue determinar precisam de aprovação. Builds, testes e edições dentro do workspace, e acesso de rede somente leitura, não precisam.</p>

<h2>Modos de Permissão</h2>
${configTable([
  ['default', '—', '—', 'Os cartões oferecem Allow Always, exceto os Critical, que oferecem Allow Session (até reiniciar).'],
  ['cautious', '—', '—', 'Todas as aprovações valem somente por sessão.'],
  ['yolo', '—', '—', 'Todo comando roda sem perguntar (caminhos de credenciais e sessões não confiáveis ainda perguntam), e toda aprovação persiste, inclusive as Critical.'],
])}

<h2>O que um programa permitido não cobre</h2>
<p>Permitir um programa cobre a execução desse programa, nada além. Uma cadeia exige que o programa de cada segmento esteja permitido. Redirecionar para um arquivo, uma atribuição de variável no início ou iniciar outro programa por meio dele (<code>env</code>, <code>xargs</code>, <code>find -exec</code>/<code>-delete</code>, <code>sh -c</code>) é julgado como qualquer comando novo.</p>

<h2>Detecção de Caminhos Sensíveis</h2>
<p>Comandos que referenciam estes caminhos sempre perguntam, mesmo quando o programa está permitido:</p>
<ul>
  <li><code>.ssh</code>, <code>.env</code> (não <code>.env.example</code>), chaves SSH <code>id_rsa</code>, <code>id_ed25519</code>, <code>id_dsa</code>, <code>id_ecdsa</code></li>
  <li>Autenticação do sistema: <code>shadow</code>, <code>sudoers</code></li>
  <li>Credenciais: <code>credentials</code> (por exemplo, <code>.aws/credentials</code>), <code>secrets</code>, <code>master.key</code>, <code>.netrc</code>, <code>.pgpass</code>, <code>.npmrc</code>, <code>.pypirc</code></li>
</ul>

<h2>Bloqueios Rígidos</h2>
<p>Alguns comandos são recusados antes de qualquer aprovação e não podem ser permitidos: <code>rm</code>/<code>chmod</code>/<code>chown</code> recursivos da raiz, do home ou de diretórios do sistema, <code>mkfs</code>, <code>dd</code>/<code>shred</code>/<code>wipefs</code> em um dispositivo bruto e exclusões recursivas (<code>rm -r</code>, <code>find -delete</code>) de qualquer coisa fora do workspace.</p>

<h2>As aprovações são hooks do kernel</h2>
<p>O terminal nunca pergunta por conta própria. Cada chamada declara os seus efeitos; a política de aprovação do kernel do agente (bloqueios rígidos, depois as regras do terminal, depois as suas concessões) decide se a executa, pergunta a você ou recusa. Uma negação também bloqueia outras chamadas da mesma execução que fariam a mesma coisa.</p>

${callout('info', 'Configuração', 'Defina <code>terminal.permission_mode</code> no config.toml. O padrão é <code>"default"</code>.')}
`
},
    {
    slug: '/tools/system-info',
    section: 'Tools',
    title: 'Ferramenta System Info',
    description: 'Consulte SO, hostname, tempo ligado e memória do ambiente de execução configurado pela ferramenta system info.',
    content: () => `
<h1>Ferramenta System Info</h1>
<p class="lead">Consulta informações básicas do ambiente de execução configurado (esta máquina, um contêiner Docker ou um host SSH). Sempre ativada, sem parâmetros.</p>

<h2>Parâmetros</h2>
<p>Nenhum — esta ferramenta não recebe argumentos.</p>

<h2>Saída</h2>
<p>Retorna um relatório em texto com:</p>
<ul>
  <li><strong>Hostname</strong></li>
  <li><strong>Sistema operacional</strong></li>
  <li><strong>Tempo ligado</strong></li>
  <li><strong>Uso de memória</strong></li>
</ul>

<p>A memória é coletada de forma específica para cada plataforma:</p>
<ul>
  <li><strong>Linux:</strong> lida de <code>free -h</code></li>
  <li><strong>macOS:</strong> lida de <code>vm_stat</code></li>
</ul>
`
  },
  {
    slug: '/tools/memory',
    section: 'Tools',
    title: 'Ferramenta de Memória / Fatos',
    description: 'Guarde, busque e esqueça fatos de longo prazo que persistem entre sessões; os mais relevantes são recordados a cada turno.',
    content: () => `
<h1>Ferramenta de Memória / Fatos</h1>
<p class="lead">Guarda e recupera fatos de longo prazo que persistem entre sessões. Os fatos relevantes para cada mensagem são recordados no prompt.</p>

<h2>Nome da Ferramenta</h2>
<p><code>remember_fact</code></p>

<h2>Parâmetros</h2>
${configTable([
  ['category', 'string', '—', 'Categoria de agrupamento (por exemplo, "user", "preference", "project")'],
  ['key', 'string', '—', 'Identificador único dentro da categoria'],
  ['value', 'string', '—', 'O conteúdo do fato a guardar'],
  ['delete', 'bool', 'false', 'Esquece categoria/chave em vez de guardar'],
  ['evidence', 'string', '—', 'Suas próprias palavras afirmando o fato, citadas'],
  ['scope', 'string', 'project', 'Em uma conversa de projeto: project o mantém nas notas do projeto, personal o mantém para você'],
  ['facts', 'array', '—', 'Vários fatos em uma chamada, cada um com os mesmos campos'],
])}

<h2>Armazenamento</h2>
<p>Os fatos são guardados na tabela <code>facts</code> do SQLite. Guardar um novo valor para a mesma categoria e chave o substitui. O valor antigo é mantido como histórico substituído, e chaves quase duplicadas (por exemplo <code>editor</code> e <code>preferred_editor</code>) são mescladas.</p>

<h2>Recordação</h2>
<p>Os fatos não são todos injetados. A cada turno, os fatos mais relevantes para a sua mensagem (no máximo 8, e nunca mais do que <code>state.max_facts</code>, padrão 20) aparecem em <code>## Relevant Memory</code>, cada um com a data em que foi registrado. O seu nome e a identidade do agente são fixados separadamente. O agente procura qualquer outra coisa com <code>manage_memories</code>.</p>

${codeBlock(`## Relevant Memory
- Fact [12] (recorded 2026-10-02) user/timezone = US/Pacific
- Fact [31] (recorded 2026-09-14) project/language = Rust`, 'text', 'system prompt')}

<h2>Encontrando e gerenciando memórias</h2>
<p>O <code>manage_memories</code> busca fatos guardados (<code>search</code>), lista-os, busca resumos de chats passados (<code>search_episodes</code>), esquece um fato, define quem pode vê-lo (<code>set_privacy</code>: global, channel ou private) e acompanha metas pessoais. Para as mensagens exatas de chats passados, use <code>search_history</code>.</p>

<h2>Esquema da Tabela de Fatos</h2>
${configTable([
  ['id', 'integer', 'auto', 'Chave primária autoincrementada'],
  ['category', 'string', '—', 'Categoria de agrupamento'],
  ['key', 'string', '—', 'Chave do fato (única por categoria entre os fatos atuais)'],
  ['value', 'string', '—', 'Conteúdo do fato'],
  ['source', 'string', '""', 'Quem o guardou, por exemplo "agent"'],
  ['privacy', 'string', 'global', 'Quem pode vê-lo: global, channel ou private'],
  ['channel_id', 'string', '—', 'Canal em que foi aprendido'],
  ['superseded_at', 'timestamp', '—', 'Definido quando um valor mais novo o substituiu'],
  ['created_at', 'timestamp', 'now', 'Quando o fato foi criado'],
  ['updated_at', 'timestamp', 'now', 'Quando o fato foi atualizado pela última vez'],
])}
`
  },
  {
    slug: '/tools/config-manager',
    section: 'Tools',
    title: 'Ferramenta Config Manager',
    description: 'O agente do AIDaemon pode ler, atualizar, validar e restaurar o próprio arquivo de configuração e trocar de provedor.',
    content: () => `
<h1>Ferramenta Config Manager</h1>
<p class="lead">O agente pode ler, atualizar, validar e restaurar o próprio arquivo de configuração.</p>

<h2>Nome da Ferramenta</h2>
<p><code>manage_config</code></p>

<h2>Ações</h2>

<h3>read</h3>
<p>Retorna o conteúdo completo do config.toml com os campos sensíveis ocultados:</p>
${codeBlock(`api_key = "***REDACTED***"
bot_token = "***REDACTED***"
password = "***REDACTED***"`, 'toml')}

<h3>get</h3>
<p>Lê um caminho de chave TOML específico:</p>
${codeBlock(`action: "get"
key: "provider.models.default"
# Returns: "gemini-3-flash-preview"`, 'text')}

<h3>set</h3>
<p>Atualiza uma chave específica com um novo valor (formato literal TOML):</p>
${codeBlock(`action: "set"
key: "state.working_memory_cap"
value: "100"`, 'text')}

<p>Antes de gravar:</p>
<ol>
  <li>Cria um backup (rotação em anel de 3 níveis: <code>.bak</code> → <code>.bak.1</code> → <code>.bak.2</code>)</li>
  <li>Valida a nova configuração (sintaxe TOML + desserialização completa)</li>
  <li>Define as permissões do arquivo como 0600 (somente o proprietário) no Unix</li>
</ol>

<h3>unset</h3>
<p>Remove uma chave.</p>

<h3>restore</h3>
<p>Reverte para o backup mais recente (<code>.bak</code>, depois <code>.bak.1</code>, <code>.bak.2</code>). Execute <code>/reload</code> para aplicar.</p>

<h3>Ações de provedor</h3>
<p><code>list_provider_presets</code> e <code>switch_provider</code> alteram o provedor de modelo; <code>list_failover_providers</code>, <code>add_failover_provider</code>, <code>remove_failover_provider</code> e <code>move_failover_provider</code> gerenciam o failover.</p>

<h3>Ações de configuração</h3>
<p><code>enable_stt</code>, <code>enable_client_gateway</code>, <code>enable_exposure</code>.</p>

${callout('warn', 'Segredos', 'Chaves de API e tokens nunca são argumentos de ferramentas. Guarde um você mesmo com <code>aidaemon keychain set &lt;key&gt;</code>; a configuração passa então a conter o valor <code>keychain</code>.')}

${callout('info', 'Última Versão Funcional', 'Após cada chamada de LLM bem-sucedida, a configuração atual é marcada como <code>.toml.lastgood</code>. Este é o primeiro arquivo tentado quando a configuração não carrega na inicialização.')}

<h2>Ordem de Recuperação na Inicialização</h2>
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
    title: 'Ferramenta Browser',
    description: 'Automação do Chrome com sessões de login persistentes para navegação na web, preenchimento de formulários, capturas de tela e PDFs.',
    content: () => `
<h1>Ferramenta Browser</h1>
<p class="lead">Automação do Chrome com sessões de login persistentes. Faça login uma vez e o agente pode navegar em sites autenticados em seu nome.</p>

${callout('success', 'Binários Pré-compilados', 'Se você instalou pelo script de uma linha ou pelo Homebrew, a ferramenta browser já está incluída. Basta ativá-la no <code>config.toml</code> abaixo. Ela também faz parte do build padrão a partir do código-fonte.')}

<h2>Início Rápido</h2>
<p>Dois passos para o agente navegar com as suas sessões de login:</p>

<h3>1. Entre nos seus serviços</h3>
${codeBlock(`aidaemon browser login`, 'bash')}
<p>O Chrome abre com um perfil dedicado. Entre nos serviços que você quer que o agente acesse (Gmail, GitHub, AWS Console, Jira etc.) e depois feche o Chrome. As suas sessões são salvas em <code>~/.aidaemon/chrome-profile/</code> e persistem entre reinicializações.</p>

<h3>2. Ative a ferramenta browser</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}

<p>Pronto. O agente já pode navegar em sites autenticados usando as suas sessões salvas.</p>

${callout('info', 'Experimente', 'Envie ao agente uma mensagem como <em>"Vá para https://mail.google.com e tire uma captura de tela"</em> — ele deve mostrar a sua caixa de entrada, já com login feito.')}

<h2>Configuração</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Ativa a ferramenta browser'],
  ['headless', 'bool', 'true', 'Executa o Chrome sem uma janela visível'],
  ['screenshot_width', 'int', '1280', 'Largura da viewport do navegador, em pixels'],
  ['screenshot_height', 'int', '720', 'Altura da viewport do navegador, em pixels'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Diretório do perfil do Chrome para sessões persistentes'],
  ['profile', 'string', 'Default', 'Nome do perfil do Chrome dentro de user_data_dir'],
  ['keep_sign_ins', 'bool', 'true', 'Mantém os logins em ~/.aidaemon/chrome-profile; desativado = um perfil novo a cada vez'],
  ['session_isolation', 'string', 'auto', 'Como as sessões são isoladas: browser_context ou page'],
  ['nav_timeout_secs', 'int', '30', 'Espera pelo carregamento da página'],
  ['element_timeout_secs', 'int', '10', 'Espera padrão para a ação wait'],
  ['action_timeout_secs', 'int', '30', 'Teto por ação'],
  ['remote_debugging_port', 'int', 'null', 'Conecta a uma instância existente do Chrome nesta porta (avançado)'],
])}

<h3>Configuração mínima</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}
<p>Todo o resto tem padrões sensatos. As sessões são salvas automaticamente em <code>~/.aidaemon/chrome-profile/</code>.</p>

<h2>Ações</h2>

<table class="config-table">
<thead><tr><th>Ação</th><th>Parâmetros</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>navigate</code></td><td><code>url</code></td><td>Abre uma URL e espera a página carregar (até <code>nav_timeout_secs</code>, padrão 30s)</td></tr>
<tr><td><code>screenshot</code></td><td><code>selector?, full_page?, deliver?</code></td><td>PNG da viewport visível, de um elemento ou da página inteira</td></tr>
<tr><td><code>render_pdf</code></td><td><code>source_path, output_filename?</code></td><td>Renderiza um arquivo HTML local em PDF</td></tr>
<tr><td><code>click</code></td><td><code>selector</code></td><td>Clica em um elemento por seletor CSS</td></tr>
<tr><td><code>fill</code></td><td><code>selector, value</code></td><td>Digita texto em um campo de formulário</td></tr>
<tr><td><code>get_text</code></td><td><code>selector?</code></td><td>Extrai o conteúdo de texto de um elemento ou da página inteira</td></tr>
<tr><td><code>inspect_page</code></td><td>—</td><td>Descreve a estrutura da página e os elementos interativos</td></tr>
<tr><td><code>scroll</code></td><td><code>direction?, amount?</code></td><td>Rola para cima ou para baixo (padrão 700 px)</td></tr>
<tr><td><code>execute_js</code></td><td><code>script</code></td><td>Executa JavaScript e retorna o resultado (sempre pergunta antes)</td></tr>
<tr><td><code>wait</code></td><td><code>selector, condition?, text?, timeout_secs?</code></td><td>Espera até que um elemento esteja presente, visível, habilitado, oculto ou contenha um texto (padrão <code>element_timeout_secs</code>, 10s)</td></tr>
<tr><td><code>list_tabs</code>, <code>new_tab</code>, <code>switch_tab</code>, <code>close_tab</code></td><td><code>url?</code> / <code>tab_id</code></td><td>Trabalha com várias abas</td></tr>
<tr><td><code>get_console_logs</code>, <code>get_network_errors</code></td><td><code>tab_id?</code></td><td>Lê o console da página e as requisições com falha</td></tr>
<tr><td><code>set_mode</code></td><td><code>value</code></td><td>Alterna entre visível e headless</td></tr>
<tr><td><code>close</code></td><td>—</td><td>Fecha a sessão do navegador</td></tr>
</tbody>
</table>

<h2>Aprovações</h2>
<p>A navegação pública e a leitura de páginas não precisam de aprovação. Abrir um site neste computador pergunta uma vez por site, alterações em páginas podem perguntar, e o <code>execute_js</code> sempre pergunta.</p>

<h2>Persistência de Sessão</h2>
<p>A ferramenta browser usa um perfil dedicado do Chrome em <code>~/.aidaemon/chrome-profile/</code>, que guarda cookies, armazenamento local e sessões de login. Isso significa que:</p>
<ul>
  <li>Faça login uma vez com <code>aidaemon browser login</code> e as sessões persistem indefinidamente</li>
  <li>O agente inicia o Chrome em modo headless com este perfil — já autenticado</li>
  <li>As sessões sobrevivem a reinicializações do AIDaemon e do sistema</li>
  <li>Execute <code>aidaemon browser login</code> novamente a qualquer momento para adicionar novos serviços ou renovar sessões expiradas</li>
</ul>

${callout('warn', 'Isolado do Chrome Pessoal', 'O agente usa o próprio perfil do Chrome, completamente separado do seu navegador pessoal. Seus favoritos, extensões e sessões pessoais nunca são tocados.')}

<h2>Modos de Implantação</h2>

<h3>Instância isolada (recomendado)</h3>
<p>Ao rodar o AIDaemon em um servidor ou VM dedicado, nenhum outro Chrome está em execução. O agente inicia e controla o Chrome diretamente.</p>
${codeBlock(`# SSH into your instance
ssh user@my-server

# One-time: log into services
aidaemon browser login

# Config
# [browser]
# enabled = true

# Done — agent handles Chrome automatically from here`, 'bash')}
<p>Em servidores headless, use SSH com X forwarding (<code>ssh -X</code>) ou VNC para o login inicial.</p>

<h3>Computador pessoal</h3>
<p>Ao rodar o AIDaemon junto com o seu Chrome pessoal, o agente inicia uma instância separada do Chrome, com perfil próprio. Os dois rodam lado a lado sem conflito.</p>
${codeBlock(`# Same setup — separate Chrome instance, no conflict
aidaemon browser login

# Your personal Chrome (47 tabs, extensions, bookmarks) → untouched
# AIDaemon's Chrome (~/.aidaemon/chrome-profile/) → isolated`, 'bash')}

<h3>Avançado: conectar a um Chrome existente</h3>
<p>Para usuários avançados que querem conectar a uma instância do Chrome já em execução com uma porta de depuração remota:</p>
${codeBlock(`[browser]
enabled = true
remote_debugging_port = 9222`, 'toml', 'config.toml')}
<p>Inicie o Chrome com <code>--remote-debugging-port=9222</code> e o agente se conecta a ele diretamente. Isso compartilha as sessões da instância do Chrome, mas exige que o Chrome seja iniciado com a flag de depuração.</p>

<h2>Capturas de Tela</h2>
<p>As capturas de tela são salvas para o agente olhar. Uma é enviada a você quando o agente a marca como o resultado que você pediu (<code>deliver: true</code>).</p>

<h2>Acompanhando e Assumindo o Controle</h2>
<p>Com <code>[surfaces]</code> ativado (padrão), você pode acompanhar e assumir o controle do navegador do agente a partir de um app pareado, e o agente pode entregá-lo a você para fazer login (<code>hand_over</code>).</p>

<h2>Casos de Uso</h2>
<ul>
  <li><strong>Monitoramento</strong> — Verifique painéis (Grafana, Vercel, AWS Console), capture o status de deploys</li>
  <li><strong>Extração de dados</strong> — Colete páginas renderizadas por JS, retire relatórios de painéis administrativos</li>
  <li><strong>Automação de fluxos</strong> — Preencha formulários, percorra fluxos de várias etapas em ferramentas internas</li>
  <li><strong>Testes</strong> — Navegue pelo seu app implantado, verifique a interface, confira layouts responsivos</li>
  <li><strong>Navegação autenticada</strong> — Interaja com qualquer serviço em que você tenha feito login, sem chaves de API</li>
</ul>

<h2>Compilando a Partir do Código-Fonte</h2>
<p>O recurso <code>browser</code> vem ativado por padrão, então um simples <code>cargo build --release</code> o inclui. Builds com <code>--no-default-features</code> precisam adicionar <code>--features browser</code>.</p>
<p>Requer um navegador baseado em Chromium instalado (Chrome, Chromium, Brave ou Edge).</p>
`
  },
  {
    slug: '/tools/sub-agents',
    section: 'Tools',
    title: 'Criação de Subagentes',
    description: 'Delegue trabalho focado a subagentes e especialistas nomeados, individualmente ou vários em paralelo.',
    content: () => `
<h1>Criação de Subagentes</h1>
<p class="lead">O agente pode delegar trabalho focado a subagentes novos e a especialistas nomeados, um de cada vez ou vários em paralelo.</p>

<h2>Nome da Ferramenta</h2>
<p><code>spawn_agent</code></p>

<h2>Parâmetros</h2>
${configTable([
  ['task', 'string', '—', 'O que o subagente deve fazer'],
  ['mission', 'string', 'title', 'Meta mais ampla opcional para o contexto dele'],
  ['title', 'string', '—', 'Algumas palavras mostradas no cartão dele'],
  ['specialist', 'string', 'executor', 'code, research, review, browser_verifier, artifact_writer, comms_draft, executor ou generic'],
  ['tasks', 'array', '—', 'Vários subagentes em uma chamada (até 6, 3 por vez)'],
  ['background', 'bool', 'false', 'Executa em segundo plano; o resultado vai para o seu chat'],
  ['tools', 'array', '—', 'Limita quais ferramentas ele pode usar'],
  ['access', 'string', '—', 'read_only para apenas observar'],
  ['scope', 'array', '—', 'Arquivos ou pastas que ele pode alterar'],
  ['model_tier', 'string', 'same', 'fast, primary ou smart'],
])}

<h2>Comportamento</h2>
<ul>
  <li>O agente filho roda em <code>parent_depth + 1</code></li>
  <li>Herda as ferramentas e o acesso do pai (nunca mais do que isso) e o modelo dele, a menos que <code>model_tier</code> esteja definido</li>
  <li>Recebe um prompt de sistema focado: instruções base + contexto da missão</li>
  <li>Executa um loop agêntico completo em uma sessão isolada</li>
  <li>Devolve a resposta final em texto ao pai (truncada em <code>max_response_chars</code>)</li>
  <li>Se <code>child_depth &lt; max_depth</code>, o filho também recebe a ferramenta <code>spawn_agent</code>; um especialista nomeado só delega adiante se as ferramentas dele incluírem <code>spawn_agent</code></li>
</ul>

<h2>Especialistas</h2>
<p>Um subagente pode rodar como um especialista nomeado, com instruções e ferramentas próprias. Substitua um colocando <code>&lt;kind&gt;.md</code> em <code>~/.aidaemon/specialists/</code>.</p>

<h2>Configuração</h2>
${codeBlock(`[subagents]
enabled = true
max_depth = 3
max_response_chars = 8000
timeout_secs = 300        # stopped after this long with no progress
max_concurrent = 4
max_per_request = 12
task_token_budget = 500000`, 'toml', 'config.toml')}
<p><code>max_iterations</code> é uma chave legada. Não há limite de passos por padrão.</p>

${callout('info', 'Limite de Recursão', 'Os subagentes podem criar os próprios subagentes até <code>max_depth</code> níveis de profundidade. Na profundidade máxima, a ferramenta spawn_agent não é fornecida.')}

${callout('info', 'Sem limite de tempo real', 'Um subagente só é interrompido depois de <code>timeout_secs</code> sem progresso (nenhuma ferramenta rodando, nenhuma resposta do modelo). O trabalho longo que continua progredindo vai até o fim, limitado pelo orçamento de tokens dele.')}
`
  },
  {
    slug: '/tools/cli-agents',
    section: 'Tools',
    title: 'Delegação a Agentes de CLI',
    description: 'Delegue trabalho de programação ao Claude Code, Codex, Antigravity CLI, Gemini CLI, Copilot, Aider ou a qualquer agente do Agent Client Protocol, em um modo de permissão que você escolher.',
    content: () => `
<h1>Delegação a Agentes de CLI</h1>
<p class="lead">Delegue tarefas a agentes de código externos (Claude Code, Codex, Antigravity CLI, Gemini CLI, Copilot, Aider) ou a qualquer agente que fale o Agent Client Protocol, cada um em um modo de permissão que você escolher.</p>

<h2>Nome da Ferramenta</h2>
<p><code>cli_agent</code></p>

<h2>Parâmetros</h2>
${configTable([
  ['action', 'string', '—', 'run, check, cancel ou list (obrigatório)'],
  ['tool', 'string', '—', 'Nome do agente, por exemplo claude, codex, agy'],
  ['prompt', 'string', '—', 'A tarefa'],
  ['title', 'string', '—', 'Algumas palavras mostradas no cartão da execução'],
  ['working_dir', 'string', '—', 'Diretório absoluto; legível, mas não gravável por si só'],
  ['workspace_mode', 'string', '—', 'read_only ou read_write'],
  ['write_paths', 'array', '—', 'Arquivos/pastas que uma execução read_write pode alterar (obrigatório para read_write)'],
  ['read_paths', 'array', '—', 'Caminhos legíveis extras'],
  ['scope', 'array', '—', 'Arquivos ou pastas que a execução vai alterar'],
  ['new_folders', 'array', '—', 'Novas pastas criadas para a execução'],
  ['async_mode', 'bool', 'false', 'Executa em segundo plano'],
  ['system_instruction', 'string', '—', 'Molda o agente em um especialista'],
])}
<p><code>manage_cli_agents</code> adiciona, remove, lista, ativa e desativa agentes em tempo de execução e mostra o histórico de execuções, sem reiniciar.</p>

<h2>Agentes Descobertos</h2>
<p>Quando <code>cli_agents.enabled = true</code> e não há configurações de ferramenta explícitas, estes são registrados se o comando deles estiver instalado:</p>

<table class="config-table">
<thead><tr><th>Nome</th><th>Agente</th><th>Comando</th></tr></thead>
<tbody>
<tr><td>claude</td><td>Claude Code</td><td><code>claude -p --output-format stream-json --verbose</code></td></tr>
<tr><td>codex</td><td>Codex</td><td><code>codex exec --json</code></td></tr>
<tr><td>agy</td><td>Antigravity CLI (Agent Client Protocol)</td><td><code>agy acp</code></td></tr>
<tr><td>gemini</td><td>Gemini CLI (Agent Client Protocol)</td><td><code>gemini --acp</code></td></tr>
<tr><td>copilot</td><td>Copilot CLI</td><td><code>copilot -p</code></td></tr>
<tr><td>aider</td><td>Aider</td><td><code>aider --message</code></td></tr>
</tbody>
</table>

<p>Quando uma chamada não indica nenhuma ferramenta, é usado o primeiro disponível entre <code>claude</code>, <code>codex</code>, <code>agy</code>, <code>copilot</code>, <code>aider</code>. O Gemini CLI não está nessa ordem (o Google agora o oferece apenas para licenças corporativas e chaves de API pagas); ele é usado quando indicado, e a verificação de prontidão dele informa um login pessoal recusado.</p>

<h2>Modos de Permissão</h2>
<p>Cada agente de código roda em um de três modos, definido por agente na página Settings do app:</p>
<table class="config-table">
<thead><tr><th>Modo</th><th>Comportamento</th></tr></thead>
<tbody>
<tr><td><strong>Checked by AIDaemon</strong> (padrão)</td><td>Confinado à pasta do projeto pelo sandbox do próprio agente; tudo além disso é perguntado antes e julgado pelas suas próprias regras</td></tr>
<tr><td><strong>Every command checked</strong></td><td>Roda na própria máquina, com todo comando e alteração de arquivo (exceto a curta lista de comandos somente leitura do próprio agente) perguntados antes</td></tr>
<tr><td><strong>Full access</strong></td><td>Roda na máquina sem perguntar nada. Escolhê-lo pergunta antes a você.</td></tr>
</tbody>
</table>
<p>O Claude Code e o Codex perguntam ao AIDaemon em vez de recusar por conta própria, então as suas concessões respondem ao que cobrem e um cartão pergunta o resto. Settings também mostra se cada agente pode trabalhar agora (<strong>Ready</strong>, ou <strong>Not usable</strong> com o motivo e a correção, e <strong>Check again</strong>); o trabalho nunca é encaminhado a um agente que não consegue rodar.</p>

<h2>Qualquer agente do Agent Client Protocol</h2>
<p>Um agente que fala o <a href="https://agentclientprotocol.com" target="_blank" rel="noopener">Agent Client Protocol</a> pode ser adicionado em <code>[cli_agents.tools.&lt;name&gt;]</code> com <code>protocol = "acp"</code>. O AIDaemon o hospeda por meio do protocolo, e cada ação dele é perguntada antes, de modo que todas possam ser julgadas.</p>
${codeBlock(`[cli_agents.tools.my-acp-agent]
command = "my-acp-agent"
args = ["--acp"]            # whatever starts its protocol server
protocol = "acp"
description = "An ACP coding agent"`, 'toml', 'config.toml')}

<h2>Configuração Personalizada</h2>
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
<p>Definir qualquer entrada <code>[cli_agents.tools.*]</code> substitui a lista descoberta. Uma execução guardada não pode ampliar o que um agente conhecido pode fazer: argumentos que contornariam o sandbox ou as aprovações dele são recusados.</p>

<h2>Extração da Saída</h2>
<p>A ferramenta tenta extrair uma saída estruturada:</p>
<ul>
  <li><strong>JSON:</strong> procura os campos <code>result</code>, <code>output</code>, <code>content</code> ou <code>message</code></li>
  <li><strong>JSONL:</strong> usa a última linha que contém conteúdo</li>
  <li><strong>Alternativa:</strong> retorna a saída bruta, truncada em <code>max_output_chars</code></li>
</ul>
`
  },
  {
    slug: '/tools/web-search',
    section: 'Tools',
    title: 'Ferramenta Web Search',
    description: 'Pesquise na web pelo DuckDuckGo, Brave ou SearxNG em paralelo e receba títulos, URLs e trechos mesclados.',
    content: () => `
<h1>Ferramenta Web Search</h1>
<p class="lead">Pesquisa na web e retorna títulos, URLs e trechos. Aceita o DuckDuckGo (padrão, sem chave), o Brave e um SearxNG auto-hospedado. Por padrão, todo backend configurado é pesquisado em paralelo e os resultados são mesclados e deduplicados.</p>

<h2>Nome da Ferramenta</h2>
<p><code>web_search</code></p>

<h2>Parâmetros</h2>
${configTable([
  ['query', 'string', '—', 'A consulta de busca (obrigatório)'],
  ['max_results', 'integer', '8', 'Máximo de resultados mesclados (máx. 20)'],
  ['freshness', 'string', '—', 'Somente resultados do último dia, semana, mês ou ano'],
])}

<h2>Backends</h2>
<table class="config-table">
<thead><tr><th>Backend</th><th>Chave de API</th><th>Como Funciona</th></tr></thead>
<tbody>
<tr><td><strong>DuckDuckGo</strong> (padrão)</td><td>Não necessária</td><td>Busca <code>https://lite.duckduckgo.com/lite/</code> e interpreta os resultados em HTML</td></tr>
<tr><td><strong>Brave</strong></td><td>Necessária</td><td>Chama a API JSON <code>https://api.search.brave.com/res/v1/web/search</code></td></tr>
<tr><td><strong>SearxNG</strong></td><td>Não necessária</td><td>A sua própria instância em <code>search.searxng_url</code></td></tr>
</tbody>
</table>

<h2>Configuração</h2>
${codeBlock(`[search]
backend = "duckduckgo"   # or "brave", "searxng"
api_key = "keychain"     # Brave only; store it with: aidaemon keychain set search_api_key
searxng_url = ""         # e.g. "http://localhost:8080"
parallel = true          # search every configured backend and merge`, 'toml', 'config.toml')}

<h2>Formato da Saída</h2>
<p>Retorna resultados em markdown numerados. A idade e as fontes aparecem quando conhecidas ou quando vários backends responderam:</p>
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
    title: 'Ferramenta Web Fetch',
    description: 'Busque qualquer URL e extraia o conteúdo legível. Aceita conversão de HTML em texto com limites configuráveis.',
    content: () => `
<h1>Ferramenta Web Fetch</h1>
<p class="lead">Busca uma URL e extrai o conteúdo legível. Sempre ativada, sem configuração necessária.</p>

<h2>Nome da Ferramenta</h2>
<p><code>web_fetch</code></p>

<h2>Parâmetros</h2>
${configTable([
  ['url', 'string', '—', 'A URL a buscar (obrigatório)'],
  ['max_chars', 'integer', '20000', 'Máximo de caracteres a retornar (máx. 50000)'],
  ['offset', 'integer', '0', 'Caracteres a pular, para ler além de uma resposta truncada'],
])}

<h2>Comportamento</h2>
<ol>
  <li>Recusa endereços de rede privada, loopback e de metadados de nuvem, inclusive após redirecionamentos. Use <code>http_request</code> para APIs.</li>
  <li>Busca a URL com cabeçalhos semelhantes aos de um navegador (user-agent do Firefox, cabeçalhos Accept padrão)</li>
  <li>Tenta a extração por legibilidade para obter um texto de artigo limpo</li>
  <li>Recorre à conversão completa de HTML em markdown</li>
  <li>Trunca em <code>max_chars</code> em um limite UTF-8 seguro</li>
</ol>

${callout('info', 'Complementa a Ferramenta Browser', 'Use <code>web_fetch</code> para uma extração rápida de conteúdo sem iniciar o Chrome. Use a <a href="/tools/browser">Ferramenta Browser</a> para páginas interativas que exigem JavaScript, preenchimento de formulários ou capturas de tela.')}
`
  },
  {
    slug: '/tools/send-file',
    section: 'Tools',
    title: 'Transferência de Arquivos',
    description: 'Envie e receba arquivos pelo Telegram, Slack, Discord ou pelo app. Validação de caminhos e bloqueio de arquivos sensíveis integrados.',
    content: () => `
<h1>Transferência de Arquivos</h1>
<p class="lead">Envia arquivos ao usuário no chat atual (Telegram, Slack, Discord ou o app) e recebe arquivos do usuário. Valida caminhos e bloqueia arquivos sensíveis.</p>

<h2>Nome da Ferramenta</h2>
<p><code>send_file</code> (saída)</p>

<h2>Parâmetros</h2>
${configTable([
  ['resource_id', 'string', '—', 'Identificador (res_…) de um anexo ou de um arquivo criado por uma ferramenta; preferido'],
  ['file_path', 'string', '—', 'Caminho absoluto exato, quando não há resource_id'],
  ['caption', 'string', 'null', 'Legenda opcional para o arquivo'],
])}

<h2>Configuração</h2>
${codeBlock(`[files]
enabled = true        # on by default
inbox_dir = "~/.aidaemon/files/inbox"
outbox_dirs = ["~"]
max_file_size_mb = 10
retention_hours = 24`, 'toml', 'config.toml')}

<h2>Segurança</h2>
<p>A ferramenta aplica restrições de caminho para evitar o vazamento acidental de segredos:</p>
<ul>
  <li><strong>Caminhos permitidos:</strong> somente arquivos dentro de <code>outbox_dirs</code> ou <code>inbox_dir</code></li>
  <li><strong>Resolução de links simbólicos:</strong> canonicaliza os caminhos para evitar a travessia de diretórios</li>
  <li><strong>Padrões bloqueados:</strong> <code>.ssh</code>, <code>.gnupg</code>, <code>.env</code>, <code>credentials</code>, <code>.key</code>, <code>.pem</code>, <code>.aws/credentials</code>, <code>.netrc</code>, <code>.docker/config.json</code>, <code>config.toml</code></li>
</ul>

<h2>Arquivos Recebidos</h2>
<p>Os usuários podem enviar arquivos ao bot em qualquer canal conectado. O AIDaemon os baixa para <code>inbox_dir</code> e os disponibiliza ao agente. Aceita documentos, fotos, áudio, vídeo e mensagens de voz, até <code>max_file_size_mb</code>.</p>

${callout('warn', 'Diretórios de Saída', 'A lista <code>outbox_dirs</code> controla de quais diretórios o agente pode enviar arquivos. Mantenha-a o mais restrita possível em produção.')}
`
  },
  {
    slug: '/tools/people',
    section: 'Tools',
    title: 'Inteligência de Pessoas',
    description: 'Uma agenda de contatos pessoal gerenciada pelo seu assistente de IA. Lembra aniversários, preferências e relacionamentos — tudo guardado localmente na sua máquina.',
    content: () => `
<h1>Inteligência de Pessoas</h1>
<p class="lead">Pense nela como uma agenda de contatos, mas com um assistente pessoal que lembra os detalhes por você. Aniversários, preferências, estilos de comunicação, como você conhece alguém &mdash; o AIDaemon mantém tudo organizado e avisa você quando importa. Tudo fica no seu computador ou servidor, nunca enviado a terceiros.</p>

${callout('info', 'Alternância em Tempo de Execução', 'A Inteligência de Pessoas pode ser ativada ou desativada a qualquer momento pelo chat. Basta dizer <strong>"ative a inteligência de pessoas"</strong> ou usar a ferramenta <code>manage_people</code> com a ação <code>enable</code>/<code>disable</code>. Sem precisar reiniciar.')}

<h2>Como Funciona</h2>
<ol>
  <li><strong>Adicione contatos</strong> &mdash; adicione pessoas manualmente ou deixe o AIDaemon aprender sobre elas nas conversas</li>
  <li><strong>Lembre detalhes</strong> &mdash; aniversários, preferências, interesses, informações de trabalho e mais</li>
  <li><strong>Vincule identidades</strong> &mdash; conecte uma pessoa à identidade dela no Telegram, Slack ou Discord</li>
  <li><strong>Lembretes sob demanda</strong> &mdash; peça os próximos aniversários e as pessoas com quem retomar contato</li>
  <li><strong>Adaptação ao contexto</strong> &mdash; quando uma pessoa conhecida escreve, o AIDaemon adapta o próprio estilo de comunicação</li>
</ol>

<h2>Nome da Ferramenta</h2>
<p><code>manage_people</code></p>

<h2>Ações</h2>
<table class="config-table">
<thead><tr><th>Ação</th><th>Descrição</th><th>Parâmetros Obrigatórios</th></tr></thead>
<tbody>
<tr><td><code>remember</code></td><td>Guarda pessoas, nomes, apelidos, família e lugares na memória pessoal. Sempre disponível, mesmo com a Inteligência de Pessoas desativada.</td><td>personal_memory</td></tr>
<tr><td><code>enable</code></td><td>Ativa a Inteligência de Pessoas (persiste entre reinicializações)</td><td>&mdash;</td></tr>
<tr><td><code>disable</code></td><td>Desativa a Inteligência de Pessoas (os dados são preservados)</td><td>&mdash;</td></tr>
<tr><td><code>status</code></td><td>Mostra o estado ativado/desativado e o número de contatos</td><td>&mdash;</td></tr>
<tr><td><code>add</code></td><td>Adiciona uma nova pessoa</td><td>name</td></tr>
<tr><td><code>list</code></td><td>Lista todos os contatos (filtra por relacionamento)</td><td>&mdash;</td></tr>
<tr><td><code>view</code></td><td>Mostra os detalhes de uma pessoa e todos os fatos</td><td>name ou id</td></tr>
<tr><td><code>brief</code></td><td>Um breve resumo sobre uma pessoa</td><td>name, person_name ou id</td></tr>
<tr><td><code>upcoming</code></td><td>Aniversários e datas importantes próximos</td><td>&mdash; (within_days)</td></tr>
<tr><td><code>reconnect</code></td><td>Pessoas com quem você não tem falado</td><td>&mdash; (inactive_days)</td></tr>
<tr><td><code>update</code></td><td>Atualiza campos da pessoa (relacionamento, notas, estilo)</td><td>name ou id</td></tr>
<tr><td><code>remove</code></td><td>Exclui uma pessoa e todos os fatos dela</td><td>name ou id</td></tr>
<tr><td><code>add_fact</code></td><td>Guarda um fato sobre alguém (aniversário, preferência etc.)</td><td>person_name, category, key, value</td></tr>
<tr><td><code>remove_fact</code></td><td>Exclui um fato específico pelo ID</td><td>fact_id</td></tr>
<tr><td><code>link</code></td><td>Vincula uma identidade de plataforma a uma pessoa</td><td>person_name, platform_id</td></tr>
<tr><td><code>export</code></td><td>Exporta todos os dados de uma pessoa como JSON</td><td>person_name ou name</td></tr>
<tr><td><code>purge</code></td><td>Exclusão completa em cascata (pessoa + fatos + vínculos)</td><td>person_name ou name</td></tr>
<tr><td><code>audit</code></td><td>Revisa os fatos não confirmados</td><td>&mdash; (ou person_name)</td></tr>
<tr><td><code>confirm</code></td><td>Verifica um fato não confirmado (define a confiança em 100%)</td><td>fact_id</td></tr>
</tbody>
</table>

<h2>Parâmetros</h2>
${configTable([
  ['action', 'string', '&mdash;', 'Ação a executar (obrigatório)'],
  ['name', 'string', 'null', "Nome da pessoa (para add, view, brief, update, remove)"],
  ['id', 'integer', 'null', "ID da pessoa no banco de dados (para view, update, remove)"],
  ['relationship', 'string', 'null', 'Tipo de relacionamento: spouse, family, friend, coworker, acquaintance'],
  ['notes', 'string', 'null', 'Notas livres sobre a pessoa'],
  ['communication_style', 'string', 'null', 'Como se comunicar: casual, formal, warm etc.'],
  ['language', 'string', 'null', 'Idioma preferido para a interação'],
  ['person_name', 'string', 'null', "Nome da pessoa (para add_fact, link; export, purge e audit também aceitam name)"],
  ['category', 'string', 'null', 'Categoria do fato: birthday, preference, interest, work, family, important_date, personality, gift_idea'],
  ['key', 'string', 'null', "Chave do fato (por exemplo, 'birthday', 'favorite_food')"],
  ['value', 'string', 'null', 'Valor do fato. Para birthday ou important_date, uma data ISO (YYYY-MM-DD, ou --MM-DD sem o ano)'],
  ['platform_id', 'string', 'null', "ID qualificado pela plataforma (por exemplo, 'slack:U123', 'telegram:456')"],
  ['display_name', 'string', 'null', 'Nome de exibição da identidade na plataforma'],
  ['fact_id', 'integer', 'null', 'ID do fato (para remove_fact, confirm)'],
  ['personal_memory', 'object', 'null', 'remember: pessoas, apelidos, fatos e relacionamentos'],
  ['within_days', 'integer', 'null', 'upcoming: dias à frente'],
  ['inactive_days', 'integer', 'null', 'reconnect: dias sem contato'],
])}

<h2>Ativação</h2>
<p>Há duas maneiras de ativar a Inteligência de Pessoas:</p>

<h3>Opção 1: pelo chat (recomendado)</h3>
<p>Basta pedir ao seu bot para ativá-la. A configuração é guardada no banco de dados e persiste entre reinicializações.</p>
${codeBlock('You: "Enable people intelligence"\naidaemon: "People Intelligence enabled. I\'ll now remember contacts..."', 'text', 'chat')}

<h3>Opção 2: pelo config.toml</h3>
<p>Defina o estado inicial no seu arquivo de configuração. Esse valor é usado para popular o banco de dados na primeira execução; depois disso, a configuração em tempo de execução tem precedência.</p>
${codeBlock('[people]\nenabled = true', 'toml', 'config.toml')}

<h2>Aprendizado Orgânico</h2>
<p>Durante a consolidação da memória, o AIDaemon registra as pessoas que você menciona (nomes, apelidos, aniversários, família e onde moram) na memória pessoal, o mesmo armazenamento em que o <code>remember</code> grava. Os fatos da agenda de contatos são adicionados com <code>add_fact</code>; <code>audit</code> e <code>confirm</code> revisam os que não foram confirmados.</p>

${callout('warn', 'Detalhes Sensíveis', 'Detalhes de saúde e financeiros não são guardados como fatos de contatos.')}

<h2>Tarefas em Segundo Plano</h2>
<p>Quando ativada, o AIDaemon executa verificações diárias em segundo plano:</p>
<ul>
  <li><strong>Remoção de fatos obsoletos</strong> &mdash; remove os fatos não confirmados mais antigos que <code>fact_retention_days</code> (padrão 180)</li>
  <li><strong>Datas próximas e reconexões</strong> &mdash; verificadas diariamente e registradas no log; peça-as a qualquer momento com as ações <code>upcoming</code> e <code>reconnect</code> (reconnect usa <code>reconnect_reminder_days</code>, padrão 30)</li>
</ul>

<h2>Modelo de Privacidade</h2>
<table class="config-table">
<thead><tr><th>Contexto</th><th>Comportamento</th></tr></thead>
<tbody>
<tr><td>DMs do proprietário</td><td>O grafo completo de pessoas é injetado no prompt do sistema (nomes, fatos, relacionamentos)</td></tr>
<tr><td>Não proprietário (vinculado)</td><td>Apenas adaptação do estilo de comunicação (nenhuma injeção de fatos para outros usuários)</td></tr>
<tr><td>Canais públicos</td><td>Nenhum fato pessoal é injetado</td></tr>
</tbody>
</table>

<h2>Configuração</h2>
${codeBlock('[people]\nenabled = true\nfact_retention_days = 180\nreconnect_reminder_days = 30', 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'Estado inicial (pode ser alternado em tempo de execução pelo chat)'],
  ['fact_retention_days', 'integer', '180', 'Dias até que fatos não confirmados sejam removidos'],
  ['reconnect_reminder_days', 'integer', '30', 'Dias de inatividade antes de sugerir uma reconexão'],
  ['auto_extract, auto_extract_categories, restricted_categories', '—', '—', 'Aceitas, mas não usadas'],
])}
`
  },
  {
    slug: '/mcp',
    section: 'MCP',
    title: 'Visão Geral do MCP',
    description: 'Estenda o AIDaemon com servidores Model Context Protocol para acesso ao sistema de arquivos, bancos de dados, APIs e mais.',
    content: () => `
<h1>Integração com MCP</h1>
<p class="lead">Estenda o AIDaemon com qualquer servidor <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener">Model Context Protocol</a> para adicionar acesso ao sistema de arquivos, bancos de dados, APIs e mais.</p>

<h2>Como Funciona</h2>
<ol>
  <li>O AIDaemon inicia cada servidor MCP configurado como um subprocesso</li>
  <li>Comunica-se por JSON-RPC 2.0 via stdin/stdout</li>
  <li>Chama <code>tools/list</code> para descobrir as ferramentas disponíveis</li>
  <li>Cada ferramenta descoberta é oferecida como <code>&lt;server&gt;__&lt;tool&gt;</code> (por exemplo, <code>github__create_issue</code>)</li>
  <li>O modelo pode chamar as ferramentas MCP da mesma forma que as ferramentas integradas</li>
</ol>

<h2>Detalhes do Protocolo</h2>
<ul>
  <li><strong>Versão do protocolo:</strong> pede 2025-06-18; aceita 2025-03-26 e 2024-11-05</li>
  <li><strong>Informações do cliente:</strong> name="aidaemon", version = a versão do daemon</li>
  <li><strong>Transporte:</strong> JSON delimitado por linhas via stdin/stdout</li>
  <li><strong>Inicialização:</strong> requisição <code>initialize</code> → <code>notifications/initialized</code></li>
</ul>

<h2>Segurança</h2>
<ul>
  <li>Somente variáveis seguras (PATH, HOME, LANG&hellip;) passam do ambiente do daemon para um servidor; qualquer outra precisa ser definida explicitamente.</li>
  <li>A saída de MCP é tratada como não confiável, e as chamadas são julgadas pelo pior caso (pode haver pedido de aprovação), a menos que você liste a ferramenta em <code>read_only_tools</code>.</li>
</ul>

<h2>Exemplo</h2>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/documents"]

[mcp.sqlite]
command = "uvx"
args = ["mcp-server-sqlite", "--db-path", "my-database.db"]

[mcp.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]`, 'toml', 'config.toml')}

<h2>Adicionando servidores em tempo de execução</h2>
<p>A ferramenta <code>manage_mcp</code> adiciona, lista, remove, reinicia, ativa e desativa servidores sem reiniciar. Os servidores adicionados são salvos e recarregados na inicialização. Os comandos se limitam a <code>npx</code>, <code>uvx</code>, <code>node</code>, <code>python</code> e <code>python3</code>. Uma variável secreta é vinculada com <code>set_env</code> a uma entrada do chaveiro chamada <code>mcp_&lt;server&gt;_&lt;KEY&gt;</code>, que você guarda com <code>aidaemon keychain set</code>. Em uma conversa de projeto, <code>project_list</code>, <code>project_start</code> e <code>project_stop</code> executam servidores do <code>.mcp.json</code> do projeto somente para esse projeto.</p>

${callout('info', 'Tratamento de Erros', 'Se um servidor MCP falhar ao iniciar ou ao listar as ferramentas, o erro é registrado no log, mas os outros servidores e as ferramentas integradas continuam funcionando.')}
`
  },
  {
    slug: '/mcp/configuration',
    section: 'MCP',
    title: 'Configuração de Servidores MCP',
    description: 'Configure servidores MCP no config.toml do AIDaemon: servidores stdio, variáveis de ambiente e ferramentas somente leitura.',
    content: () => `
<h1>Configuração de Servidores MCP</h1>
<p class="lead">Cada servidor MCP é definido como uma seção nomeada em <code>[mcp]</code> no config.toml.</p>

<h2>Formato da Configuração</h2>
${codeBlock(`[mcp.<server-name>]
command = "<executable>"
args = ["arg1", "arg2", ...]
env = { KEY = "value" }
read_only_tools = ["search"]`, 'toml')}

${configTable([
  ['command', 'string', '—', 'Executável ou script que inicia o servidor MCP'],
  ['args', 'array', '[]', 'Argumentos passados ao comando'],
  ['env', 'table', '{}', 'Variáveis de ambiente do servidor (caso contrário, só as seguras são herdadas)'],
  ['read_only_tools', 'array', '[]', 'Ferramentas que você declara como somente leitura, pelo nome em tools/list; as chamadas delas não precisam de aprovação'],
])}

<h2>Processo de Descoberta</h2>
<ol>
  <li>Para cada seção <code>[mcp.*]</code>, inicia o processo com o comando e os argumentos configurados</li>
  <li>Inicializa a conexão JSON-RPC (handshake do protocolo)</li>
  <li>Chama <code>tools/list</code> para enumerar as ferramentas disponíveis</li>
  <li>Oferece cada ferramenta ao modelo como <code>&lt;server&gt;__&lt;tool&gt;</code>, com a descrição e o esquema de entrada do servidor</li>
  <li>Registra os erros por servidor, sem falhar globalmente</li>
</ol>
<p>Os servidores também podem ser adicionados enquanto o AIDaemon roda, com a ferramenta <code>manage_mcp</code>. Veja <a href="/mcp">Visão Geral do MCP</a>.</p>

<h2>Exemplos</h2>

<h3>Acesso ao Sistema de Arquivos</h3>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]`, 'toml')}

<h3>Busca na Web</h3>
${codeBlock(`[mcp.brave-search]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-brave-search"]
env = { BRAVE_API_KEY = "…" }`, 'toml')}
<p>Para manter a chave fora do config.toml, vincule-a a um valor do chaveiro com <code>manage_mcp</code> <code>set_env</code> (uma entrada do chaveiro chamada <code>mcp_&lt;server&gt;_&lt;KEY&gt;</code>, que você guarda com <code>aidaemon keychain set</code>).</p>

<h3>Servidor Python Personalizado</h3>
${codeBlock(`[mcp.my-server]
command = "python3"
args = ["/path/to/my_mcp_server.py"]`, 'toml')}

${callout('info', 'Log do Stderr', 'A saída stderr dos servidores MCP é capturada e registrada pelo AIDaemon para depuração. Consulte os logs do daemon se um servidor não estiver funcionando.')}

<h2>Detecção de Ameaças</h2>
<p>O AIDaemon faz detecção de ameaças somente para auditoria nas chamadas de ferramentas MCP. Padrões suspeitos são registrados no log, mas <strong>não bloqueiam a execução</strong>. Separadamente, toda chamada MCP passa pela política de aprovação normal, e a saída dela é tratada como não confiável.</p>

<h3>Padrões Suspeitos em Argumentos</h3>
<ul>
  <li><strong>Acesso a arquivos:</strong> <code>/etc/passwd</code>, <code>/etc/shadow</code>, <code>.ssh/</code>, <code>.env</code></li>
  <li><strong>Configuração/segredos:</strong> <code>config.toml</code>, <code>aidaemon.db</code>, <code>api_key</code>, <code>bot_token</code>, <code>encryption_key</code></li>
  <li><strong>Rede:</strong> <code>curl</code>, <code>wget</code>, <code>nc</code>, <code>base64</code></li>
  <li><strong>Execução de código:</strong> <code>eval(</code>, <code>exec(</code>, <code>| sh</code>, <code>| bash</code></li>
  <li><strong>Destrutivos:</strong> <code>; rm </code>, <code>chmod 777</code></li>
</ul>

<h3>Padrões Suspeitos na Saída</h3>
<ul>
  <li>Possíveis chaves de API: prefixos <code>sk-</code>, <code>ghp_</code></li>
  <li>Chaves privadas: <code>-----BEGIN</code>, <code>PRIVATE KEY</code></li>
  <li>Termos sensíveis: <code>password</code>, <code>bot_token</code></li>
</ul>

${callout('warn', 'Somente Auditoria', 'A detecção de ameaças é informativa — ela registra avisos, mas não bloqueia a execução de ferramentas. Verifique os logs do daemon em busca de padrões sinalizados.')}
`
  },
  {
    slug: '/triggers',
    section: 'Triggers',
    title: 'Gatilhos de E-mail',
    description: 'Monitore caixas de entrada com IMAP IDLE e acione o agente do AIDaemon automaticamente a cada nova mensagem.',
    content: () => `
<h1>Gatilhos de E-mail</h1>
<p class="lead">Monitore sua caixa de entrada com IMAP IDLE e acione o agente a cada novo e-mail.</p>

<h2>Como Funciona</h2>
<ol>
  <li>O AIDaemon se conecta ao servidor IMAP configurado com TLS</li>
  <li>Seleciona a pasta configurada (padrão: INBOX)</li>
  <li>Entra no modo IMAP IDLE — uma conexão persistente que espera por novas mensagens</li>
  <li>Quando chega um novo e-mail, busca o envelope (assunto, remetente)</li>
  <li>Cria um Evento e o transmite pelo barramento de eventos interno. O texto do e-mail é limpo e envolvido em um aviso dizendo ao agente para não agir sobre ele sem a sua aprovação.</li>
  <li>O agente trata o evento como uma mensagem não confiável e envia a resposta para os chats dos proprietários: os usuários permitidos dos seus primeiros bots do Telegram, Discord e Slack.</li>
</ol>

<h2>Configuração</h2>
${codeBlock(`[triggers.email]
host = "imap.gmail.com"
port = 993
username = "you@gmail.com"
password = "keychain"   # or "\${AIDAEMON_EMAIL_PASSWORD}"
folder = "INBOX"`, 'toml', 'config.toml')}

${configTable([
  ['host', 'string', '&mdash;', 'Nome do host do servidor IMAP'],
  ['port', 'integer', '&mdash;', 'Porta IMAP (normalmente 993)'],
  ['username', 'string', '&mdash;', 'Nome de usuário da caixa de e-mail'],
  ['password', 'string', '&mdash;', 'Senha da caixa de e-mail. Aceita <code>"keychain"</code> e <code>$&#123;ENV&#125;</code>.'],
  ['folder', 'string', 'INBOX', 'Pasta a observar'],
])}

${callout('warn', 'Senhas de App do Gmail', 'Para o Gmail com verificação em duas etapas, gere uma senha específica de app em <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener">myaccount.google.com/apppasswords</a>.')}

<h2>Formato do Evento</h2>
${codeBlock(`Event {
    source: "email",
    session_id: "email_trigger",
    content: "New email from sender@example.com: Subject line here"
}`, 'rust')}

<h2>Barramento de Eventos</h2>
<p>Os gatilhos usam um canal de broadcast do Tokio para entregar os eventos. O agente escuta na ponta receptora e processa cada evento como uma nova mensagem na própria sessão. Sob carga pesada, eventos de gatilhos não confiáveis podem ser descartados em vez de enfileirados sem limite.</p>

${callout('danger', 'Sessões Não Confiáveis', 'As sessões de gatilhos de e-mail são marcadas como <strong>não confiáveis</strong>. Todo comando de terminal nessas sessões exige a sua aprovação, seja o que for que você permitiu antes.')}

<h2>Reconexão</h2>
<p>Se a conexão IMAP cair, o AIDaemon espera 30 segundos e reconecta automaticamente.</p>
`
  },
  {
    slug: '/skills',
    section: 'Skills',
    title: 'Sistema de Skills',
    description: 'Skills são instruções em markdown que o agente carrega com use_skill quando uma tarefa precisa delas ou quando você cita uma.',
    content: () => `
<h1>Sistema de Skills</h1>
<p class="lead">Skills são arquivos markdown com instruções para um tipo de tarefa. O agente vê uma lista de skills disponíveis e carrega a que uma tarefa precisa com a ferramenta <code>use_skill</code>. Você também pode pedir uma skill pelo nome.</p>

<h2>Configuração</h2>
${codeBlock(`[skills]
enabled = true
dir = "skills"      # relative to config.toml's folder
registries = []     # URLs of skill registry manifests for browse/install`, 'toml', 'config.toml')}

<h2>Onde as Skills Ficam</h2>
<ul>
  <li><strong>Suas skills</strong> &mdash; o diretório de skills (<code>skills/</code> ao lado do config.toml), como <code>&lt;name&gt;.md</code> ou como uma pasta <code>&lt;name&gt;/SKILL.md</code> com arquivos extras que o agente lê com <code>skill_resources</code></li>
  <li><strong>Skills de projeto</strong> &mdash; até 50 skills de <code>.agents/skills/&lt;name&gt;/SKILL.md</code> e <code>.claude/skills/&lt;name&gt;/SKILL.md</code> do projeto. Elas orientam somente o trabalho nesse projeto e não concedem autoridade extra. Se um nome colidir, a sua própria skill vence.</li>
</ul>

<h2>Formato do Arquivo de Skill</h2>
<p>Skills são arquivos markdown com um frontmatter semelhante a YAML:</p>
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

<h2>Campos do Frontmatter</h2>
${configTable([
  ['name', 'string', '—', 'Nome de exibição da skill'],
  ['description', 'string', '—', 'Descrição breve (mostrada na lista de Skills Disponíveis, para o agente saber quando a skill se encaixa)'],
  ['triggers', 'string', '—', 'Opcional. Mantido para skills antigas; não é mais usado para ativar uma skill.'],
])}

<h2>Como as Skills São Ativadas</h2>
<p>Uma skill só é carregada de antemão quando você a cita na sua mensagem:</p>
<ul>
  <li><code>$skill-name</code></li>
  <li><code>skill:skill-name</code></li>
  <li><code>use skill skill-name</code></li>
  <li>&ldquo;a skill nome-da-skill&rdquo;</li>
</ul>
<p>Caso contrário, o modelo escolhe da lista de Skills Disponíveis e chama <code>use_skill</code> quando uma skill claramente se encaixa na tarefa. Palavras-chave na sua mensagem não ativam skills.</p>

<h2>No Prompt</h2>
<ol>
  <li><strong>Skills Disponíveis</strong> — o nome e a descrição de cada skill, parte do prompt central fixo do agente</li>
  <li><strong>Skills carregadas</strong> — o corpo completo de cada skill em uso, adicionado ao contexto daquele turno. O texto da skill é higienizado antes.</li>
</ol>
<p>A memória (fatos, episódios e assim por diante) tem sua própria seção e não faz parte do bloco de skills.</p>

<h2>Skills Dinâmicas</h2>
<p>Além dos arquivos de skill que você mesmo escreve, o AIDaemon aceita o gerenciamento de skills em tempo de execução pela ferramenta <code>manage_skills</code> e por registros opcionais.</p>

<h3>Ações da Ferramenta manage_skills</h3>
<table class="config-table">
<thead><tr><th>Ação</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>add</code></td><td>Busca uma skill a partir de uma URL</td></tr>
<tr><td><code>add_inline</code></td><td>Interpreta conteúdo markdown bruto como uma skill</td></tr>
<tr><td><code>list</code></td><td>Mostra todas as skills carregadas, com metadados</td></tr>
<tr><td><code>remove</code></td><td>Exclui uma skill pelo nome</td></tr>
<tr><td><code>remove_all</code></td><td>Exclui várias skills pelo nome</td></tr>
<tr><td><code>enable</code> / <code>disable</code></td><td>Ativa ou desativa uma skill</td></tr>
<tr><td><code>browse</code></td><td>Pesquisa nos registros configurados</td></tr>
<tr><td><code>install</code></td><td>Instala a partir de um registro</td></tr>
<tr><td><code>update</code></td><td>Busca a skill de novo na URL de origem</td></tr>
<tr><td><code>review</code></td><td>Aprova ou descarta rascunhos de skills promovidas automaticamente</td></tr>
</tbody>
</table>

<h3>Promoção Automática</h3>
<p>Uma tarefa em segundo plano roda a cada 12 horas e transforma em rascunhos de skill os procedimentos que funcionaram muitas vezes. Os rascunhos ficam inativos até você aprová-los com <code>manage_skills</code> <code>review</code>.</p>
`
  },
  {
    slug: '/scheduler',
    section: 'Scheduler',
    title: 'Tarefas Agendadas',
    description: 'Lembretes e trabalho agendado no AIDaemon: set_reminder, schedule_task, manage_automations, agendamentos e fusos horários.',
    content: () => `
<h1>Tarefas Agendadas</h1>
<p class="lead">Crie automações recorrentes e únicas em palavras simples ou com expressões cron: lembretes que apenas enviam mensagem a você e trabalho agendado que o agente executa por conta própria.</p>

${callout('info', 'Automações e fusos horários', 'Peça em palavras simples e o agente configura: <code>set_reminder</code> (uma <code>message</code> e um <code>when</code>) para lembretes simples, que apenas enviam mensagem a você, e <code>schedule_task</code> para o trabalho agendado. Um horário ou agendamento recorrente pode nomear um fuso IANA (&ldquo;todo dia útil às 8h Europe/Madrid&rdquo;, &ldquo;2030-07-15 09:00 Asia/Tokyo&rdquo;) e segue o horário de verão dele; caso contrário, os horários ficam no seu próprio fuso. Abreviações como &ldquo;EST&rdquo; são recusadas com um pedido do nome IANA. Uma execução perdida enquanto o daemon estava desligado é registrada como Missed e nunca conta como falha.')}

<h2>Ferramentas</h2>
<table class="config-table">
<thead><tr><th>Ferramenta</th><th>Finalidade</th></tr></thead>
<tbody>
<tr><td><code>schedule_task</code></td><td>Trabalho agendado: <code>task</code> (o que cada execução faz), <code>when</code> e um <code>name</code> opcional. Você o confirma em um cartão <strong>Approve &amp; activate</strong> antes de ele começar.</td></tr>
<tr><td><code>set_reminder</code></td><td>Somente uma mensagem: <code>message</code>, <code>when</code> e um <code>name</code> opcional. Nada mais roda quando dispara.</td></tr>
<tr><td><code>manage_automations</code></td><td>Ver, alterar ou interromper automações (abaixo)</td></tr>
</tbody>
</table>
<p>No chat, <code>/work</code> também mostra trabalhos mais longos que esperam ou rodam sozinhos, e <code>/status</code> mostra o próximo item agendado.</p>

<h2>Ações do manage_automations</h2>
<table class="config-table">
<thead><tr><th>Ação</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>list</code> / <code>show</code></td><td>Lista as automações (agendadas, em observação, verificações de saúde) ou mostra uma pelo nome</td></tr>
<tr><td><code>history</code></td><td>Execuções passadas, inclusive as perdidas</td></tr>
<tr><td><code>edit</code></td><td>Altera <code>when</code>, <code>new_name</code>, <code>snooze_until</code> (adia apenas a próxima execução) ou <code>tell_me</code></td></tr>
<tr><td><code>pause</code> / <code>resume</code> / <code>cancel</code></td><td>Para de disparar, volta a disparar ou remove (uma ou várias)</td></tr>
<tr><td><code>run_now</code></td><td>Executa o trabalho agendado agora mesmo</td></tr>
<tr><td><code>last_failure</code></td><td>Por que a última execução falhou</td></tr>
<tr><td><code>set_budget</code></td><td>Orçamento de tokens por execução (<code>budget_per_check</code>) e por dia (<code>budget_daily</code>)</td></tr>
<tr><td><code>update_instructions</code></td><td>Altera o que as execuções seguintes fazem</td></tr>
<tr><td><code>bind_workspace</code></td><td>Define o diretório do projeto em que as execuções dela trabalham</td></tr>
</tbody>
</table>
<p><code>tell_me</code> escolhe o que o trabalho agendado informa a você: <code>every_run</code>, somente <code>changes</code> ou somente <code>problems</code>.</p>

<h2>Agendamentos em Linguagem Natural</h2>
<p>O agendador converte padrões comuns em expressões cron:</p>

<table class="config-table">
<thead><tr><th>Entrada</th><th>Cron</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td><code>hourly</code></td><td><code>0 * * * *</code></td><td>A cada hora, no minuto :00</td></tr>
<tr><td><code>daily</code></td><td><code>0 0 * * *</code></td><td>Todo dia à meia-noite</td></tr>
<tr><td><code>weekly</code></td><td><code>0 0 * * 0</code></td><td>Todo domingo à meia-noite</td></tr>
<tr><td><code>monthly</code></td><td><code>0 0 1 * *</code></td><td>Primeiro dia do mês</td></tr>
<tr><td><code>every 5m</code></td><td><code>*/5 * * * *</code></td><td>A cada 5 minutos (1&ndash;59)</td></tr>
<tr><td><code>every 2h</code></td><td><code>0 */2 * * *</code></td><td>A cada 2 horas (1&ndash;23)</td></tr>
<tr><td><code>daily at 9am</code></td><td><code>0 9 * * *</code></td><td>Todo dia às 9:00</td></tr>
<tr><td><code>daily at 6am, 12pm, 6pm</code></td><td><code>0 6,12,18 * * *</code></td><td>Várias vezes por dia (mesmo minuto)</td></tr>
<tr><td><code>daily at 14:30</code></td><td><code>30 14 * * *</code></td><td>Todo dia às 14:30</td></tr>
<tr><td><code>weekdays at 8:30</code></td><td><code>30 8 * * 1-5</code></td><td>Seg-Sex às 8:30</td></tr>
<tr><td><code>weekends at 10am</code></td><td><code>0 10 * * 0,6</code></td><td>Sáb-Dom às 10:00</td></tr>
<tr><td><code>Monday and Friday at 9am</code></td><td><code>0 9 * * 1,5</code></td><td>Dias nomeados</td></tr>
<tr><td><code>in 2h</code>, <code>in 30m</code></td><td>(absoluto calculado)</td><td>Única, dispara uma vez depois do intervalo</td></tr>
<tr><td><code>today at 6pm</code>, <code>tomorrow at 9am</code></td><td>(absoluto calculado)</td><td>Única, naquele horário</td></tr>
<tr><td><code>2026-03-14 09:30</code></td><td>(absoluto calculado)</td><td>Única, em uma data e hora exatas (RFC 3339 também funciona)</td></tr>
</tbody>
</table>

<p>Expressões cron padrão de 5 campos também são aceitas diretamente (por exemplo, <code>0 9 * * 1-5</code>).</p>

<h2>Configuração</h2>
<p>As automações são criadas pedindo no chat (ou no app) e ficam guardadas no banco de dados. Não há seção do config.toml para elas; uma seção <code>[scheduler]</code> antiga é ignorada. O agendador verifica as execuções pendentes no heartbeat, a cada <code>[heartbeat] tick_interval_secs</code> (padrão 30).</p>

<h2>Armazenamento de Tarefas</h2>
<p>As automações ficam no banco de dados como metas com agendamentos. As linhas da antiga tabela <code>scheduled_tasks</code> são migradas automaticamente.</p>

<h2>Execuções Perdidas</h2>
<p>Uma execução recorrente que estava pendente enquanto o daemon estava desligado, e agora é tarde demais para ser útil, é ignorada. Ela é registrada como Missed no History, você recebe um aviso e o agendamento segue para a próxima execução. Um item único ainda roda com atraso.</p>

${callout('warn', 'Acesso do Trabalho Agendado', 'O trabalho agendado roda com o seu acesso depois que você o aprova no cartão de confirmação. Os comandos de terminal nessas execuções não perguntam de novo, mas comandos que continuariam rodando em segundo plano (destacados) nunca são permitidos nelas.')}
`
  },
  {
    slug: '/router',
    section: 'Router',
    title: 'Roteamento de Modelos',
    description: 'Como o AIDaemon escolhe um modelo: modelos padrão, smart e fast, fallbacks e substituições com /model.',
    content: () => `
<h1>Roteamento de Modelos</h1>
<p class="lead">Como o AIDaemon escolhe um modelo para cada turno: o seu modelo padrão para o trabalho normal, um modelo smart quando um turno precisa de mais, um modelo fast para tarefas secundárias e fallbacks quando uma chamada falha.</p>

<h2>Configurações de Modelo</h2>
${codeBlock(`[provider.models]
default = "claude-sonnet-5-5"
fallback = ["claude-opus-5-5", "claude-haiku-5-5"]

# Older keys still work:
# primary = "claude-sonnet-5-5"   # read as default
# smart = "claude-opus-5-5"
# fast = "claude-haiku-5-5"`, 'toml', 'config.toml')}

${configTable([
  ['default', 'string', 'catalog', 'O modelo principal, usado nos pedidos normais'],
  ['fallback', 'array', '[]', 'Modelos tentados em ordem quando uma chamada falha. Se não definido, smart e fast viram os fallbacks.'],
  ['primary', 'string', '&mdash;', 'Nome antigo de <code>default</code>'],
  ['smart', 'string', 'catalog', 'O modelo mais forte para turnos que precisam de mais'],
  ['fast', 'string', 'catalog', 'O modelo rápido e barato para tarefas secundárias'],
])}
<p>Para um provedor que o AIDaemon conhece, qualquer modelo que você omitir é preenchido a partir do catálogo, então uma chave de API sozinha já dá a você um modelo default, um fast e um smart.</p>

<h2>Níveis</h2>
<table class="config-table">
<thead><tr><th>Nível</th><th>Caso de Uso</th><th>Modelos do Catálogo</th></tr></thead>
<tbody>
<tr><td><strong>Fast</strong></td><td>Trabalho de memória em segundo plano e ajudantes iniciados com <code>model_tier: "fast"</code></td><td>gpt-6-luna, claude-haiku-5-5, gemini-3.5-flash-lite</td></tr>
<tr><td><strong>Primary (default)</strong></td><td>Conversa normal e a maior parte do trabalho com ferramentas</td><td>gpt-6-sol, claude-sonnet-5-5, gemini-4-hydrogen</td></tr>
<tr><td><strong>Smart</strong></td><td>Turnos que precisam de mais: ferramentas de alto risco em jogo ou uma nova tentativa depois de uma tentativa que falhou</td><td>gpt-6-sol, claude-opus-5-5, gemini-4-argon</td></tr>
</tbody>
</table>
<p>Os modelos do catálogo acima são para a assinatura do ChatGPT, a Anthropic e o Google Gemini. Os outros provedores (API da OpenAI, OpenRouter, xAI, DeepSeek, Moonshot) usam um único modelo para todos os níveis, a menos que você os defina; o DeepSeek usa <code>deepseek-reasoner</code> como modelo smart.</p>

<h2>Como um Modelo É Escolhido</h2>
<ol>
  <li>Um modelo escolhido para esta conversa no app vence.</li>
  <li>Depois, um modelo definido com <code>/model</code>.</li>
  <li>Se o seu modelo padrão é um modelo de fronteira (Claude, GPT-4 e posteriores, Gemini 2.5 e posteriores, Grok 3 e posteriores, ou a série o da OpenAI), todo turno o usa. Substitua isso com <code>[policy] trust_tier = "guided"</code> ou <code>"autonomous"</code>.</li>
  <li>Caso contrário, cada turno usa o modelo padrão e passa para o modelo smart quando as ferramentas em jogo carregam risco alto ou a última tentativa falhou de imediato.</li>
</ol>
<p>A redação, o tamanho ou as palavras-chave da sua mensagem não influem na escolha. O modelo fast nunca é colocado diante das suas mensagens; ele roda tarefas secundárias, como a extração de memória, e os ajudantes que o agente inicia com <code>model_tier: "fast"</code>. Os modelos de fallback são tentados, em ordem, quando uma chamada falha.</p>

<h2>Desativando o Roteamento Automático</h2>
<ul>
  <li>Se todos os modelos forem iguais, o roteamento é desativado automaticamente</li>
  <li>Enviar <code>/model &lt;name&gt;</code> em qualquer chat (Telegram, Slack, Discord) define um modelo para todos os chats e desativa o roteamento</li>
  <li>Enviar <code>/auto</code> reativa o roteamento automático</li>
</ul>
`
  },
  {
    slug: '/cost-tracking',
    section: 'Cost Tracking',
    title: 'Uso de Tokens e Orçamentos',
    description: 'Acompanhe o uso de tokens por modelo e sessão, defina orçamentos de tokens por requisição e por automação e consulte as estatísticas com /cost.',
    content: () => `
<h1>Uso de Tokens e Controle de Custos</h1>
<p class="lead">Acompanhe o consumo de tokens por modelo e sessão e mantenha o gasto sob controle com orçamentos de tokens por requisição e por automação. Consulte as estatísticas de qualquer chat com <code>/cost</code>.</p>

<h2>Como Funciona</h2>
<ol>
  <li>Cada chamada de modelo registra os tokens de entrada e de saída na tabela SQLite <code>token_usage</code></li>
  <li>Cada registro inclui: nome do modelo, ID da sessão, contagem de tokens (inclusive a entrada em cache) e carimbo de data e hora</li>
  <li>Não há limite diário global. Cada requisição tem um orçamento de tokens, compartilhado pelo turno e por todo ajudante que ele inicia</li>
  <li>As automações também podem ter orçamentos próprios por execução e por dia</li>
</ol>

<h2>Configuração</h2>
${configTable([
  ['subagents.task_token_budget', 'integer', '500000', 'Tokens que uma requisição pode usar entre o turno e seus ajudantes. <code>0</code> = ilimitado.'],
  ['state.daily_token_budget', 'integer', 'null', 'Ignorado. Mantido para que configurações antigas ainda carreguem; defini-lo registra um aviso.'],
])}

${codeBlock(`[subagents]
task_token_budget = 500000   # per request; 0 = unlimited`, 'toml', 'config.toml')}

<p>Você recebe um aviso em 80% do orçamento. Uma execução que ainda está progredindo pode ampliar o orçamento até 3 vezes, nunca além de 2.000.000 de tokens; caso contrário, o agente resume e para.</p>

<h2>Orçamentos de Automações</h2>
<p>O trabalho agendado pode ter orçamentos próprios, definidos com <code>manage_automations</code> <code>set_budget</code>: <code>budget_per_check</code> (tokens por execução) e <code>budget_daily</code> (tokens por dia). Os contadores diários são zerados a cada 24 horas. Quando uma execução tem orçamento próprio, o orçamento por requisição não se aplica além dele.</p>

${callout('info', 'Limitando o Gasto Total', 'O AIDaemon não impõe um limite diário global de tokens. Para limitar o gasto total, defina um limite no seu provedor. A página Providers do Settings do app mostram o que cada conta usou e o que ainda tem, quando o provedor informa: os limites rotativos de um plano do ChatGPT, o saldo de uma chave do OpenRouter.')}

<h2>O Comando /cost</h2>
<p>Envie <code>/cost</code> em qualquer chat (<code>!cost</code> no Slack) para ver as estatísticas de uso. É exclusivo do proprietário.</p>
${codeBlock(`Token usage (last 24h):
  Input:  12,450 tokens
  Output: 8,230 tokens

Token usage (last 7d):
  Input:  87,320 tokens
  Output: 52,180 tokens

Top models (7d):
  claude-sonnet-5-5: 98,400 tokens
  claude-haiku-5-5: 41,100 tokens`, 'text')}
<p>Os cinco principais modelos dos últimos 7 dias são listados.</p>

<h2>Esquema do Banco de Dados</h2>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Chave primária autoincrementada'],
  ['session_id', 'TEXT', '—', 'Qual sessão de usuário/chat fez a chamada'],
  ['model', 'TEXT', '—', 'Qual modelo de LLM foi usado'],
  ['input_tokens', 'INTEGER', '—', 'Tokens enviados ao modelo'],
  ['output_tokens', 'INTEGER', '—', 'Tokens gerados pelo modelo'],
  ['cached_input_tokens', 'INTEGER', 'null', 'Tokens de entrada atendidos pelo cache de prompt do provedor'],
  ['cache_creation_input_tokens', 'INTEGER', 'null', 'Tokens de entrada gravados no cache de prompt'],
  ['call_id', 'TEXT', 'null', 'A chamada de modelo à qual este registro pertence'],
  ['created_at', 'TEXT', 'now', 'Carimbo de data e hora UTC da chamada'],
])}

<h2>O Que É Acompanhado</h2>
<ul>
  <li>Tokens de entrada (contexto + mensagem do usuário) por chamada de modelo, e quantos vieram do cache de prompt</li>
  <li>Tokens de saída (resposta do modelo) por chamada de modelo</li>
  <li>Nome do modelo, para detalhamento por modelo</li>
  <li>ID da sessão, para acompanhamento por usuário</li>
  <li>Carimbo de data e hora, para consultas por janela de tempo (24h, 7d)</li>
</ul>
`
  },
  {
    slug: '/architecture',
    section: 'Architecture',
    title: 'Como o AIDaemon Funciona',
    description: 'Como uma mensagem vira uma resposta: canais, o motor de turnos sobre o kernel aidaemon-core, a cadeia de hooks, failover de modelos, recibos e encerramento.',
    content: () => `
<h1>Como o AIDaemon Funciona</h1>
<p class="lead">Uma mensagem chega em um canal, vira um <em>turno</em>, roda em um pequeno kernel de agente até o trabalho terminar ou um limite o interromper, e a resposta volta para onde veio. Esta página acompanha esse caminho.</p>

<h2>As peças</h2>
<table class="config-table">
<thead><tr><th>Peça</th><th>Código</th><th>O que faz</th></tr></thead>
<tbody>
<tr><td><strong>Canais</strong></td><td><code>crates/aidaemon-channel-telegram</code>, <code>-slack</code>, <code>-discord</code>, <code>crates/aidaemon-client-gateway</code> (o app)</td><td>Recebem mensagens, verificam quem pode conversar, mostram status, aprovações e respostas</td></tr>
<tr><td><strong>Executor de turnos</strong></td><td><code>crates/aidaemon-channels</code></td><td>Uma fila por sessão: palavras de cancelamento, deduplicação, o watchdog de inatividade, status ao vivo e entrega de respostas, igual em todas as plataformas</td></tr>
<tr><td><strong>Agente e motor de turnos</strong></td><td><code>crates/aidaemon-runtime</code> (<code>agent/</code>, <code>turn/</code>, <code>engine/</code>)</td><td>Prepara um turno, o executa no kernel e julga se está concluído</td></tr>
<tr><td><strong>Kernel</strong></td><td><code>crates/aidaemon-core</code></td><td>O próprio loop: chamada de modelo, chamadas de ferramentas, hooks, recibos, limites, detecção de travamento, interrupção e retomada</td></tr>
<tr><td><strong>Provedores</strong></td><td><code>crates/aidaemon-providers</code></td><td>Backends compatíveis com a OpenAI, Anthropic, Gemini e assinatura do ChatGPT, roteamento de modelos</td></tr>
<tr><td><strong>Ferramentas</strong></td><td><code>src/tools</code>, <code>crates/aidaemon-tools</code> e outros</td><td>O que o modelo pode chamar; cada uma declara os seus efeitos e quanto confiar na saída dela</td></tr>
<tr><td><strong>Armazenamento de eventos</strong></td><td><code>crates/aidaemon-events</code></td><td>Histórico somente de acréscimo de cada turno e o registro de execuções construído a partir dele (veja <a href="/event-sourcing">Event Sourcing</a>)</td></tr>
<tr><td><strong>Trabalho</strong></td><td><code>crates/aidaemon-work</code></td><td>Metas, tarefas, agendamentos, automações, checklists, sondas de saúde</td></tr>
<tr><td><strong>Memória</strong></td><td><code>crates/aidaemon-memory</code></td><td>Fatos, episódios, procedimentos, pessoas, notas de projetos</td></tr>
<tr><td><strong>Heartbeat</strong></td><td><code>crates/aidaemon-runtime</code> (<code>heartbeat</code>)</td><td>Executa os trabalhos em segundo plano: metas agendadas, aprendizado da memória, retenção, limpeza</td></tr>
</tbody>
</table>

<h2>Da mensagem à resposta</h2>
<ol>
  <li><strong>Receber.</strong> O canal autoriza o remetente e marca a mensagem com o papel dele (proprietário, convidado ou público) e a visibilidade do canal (chat privado, interno ou público).</li>
  <li><strong>Enfileirar.</strong> O executor de turnos a coloca na fila atrás de qualquer turno já em execução nessa sessão e mostra um indicador de trabalho.</li>
  <li><strong>Preparar o turno.</strong>
    <ul>
      <li>A mensagem do usuário é salva como um evento; o id dela é o id do turno.</li>
      <li>Uma tarefa começa.</li>
      <li>O AIDaemon define o que este turno pode fazer somente a partir de fatos explícitos: o papel do remetente, o canal, o modo da sessão (por exemplo <code>/readonly</code>), a configuração e qualquer concessão de workspace. Depois oferece apenas as ferramentas que isso permite.</li>
      <li>Escolhe o modelo.</li>
      <li>Monta o prompt do sistema: identidade e persona, skills correspondentes, fatos conhecidos, instruções do projeto (<code>AGENTS.md</code> / <code>CLAUDE.md</code>) e o que a sessão está fazendo agora.</li>
    </ul>
  </li>
  <li><strong>Executar no kernel.</strong> O kernel chama o modelo. Se o modelo pede ferramentas, ele as executa e chama o modelo de novo. Se não pede, o kernel pergunta aos hooks de parada se a resposta pode valer.</li>
  <li><strong>Encerrar.</strong> O registro de execuções confere os recibos do turno com o que o pedido precisava e confere o formato da resposta. A tarefa termina como <code>succeeded</code>, <code>partial</code> ou <code>failed</code>.</li>
  <li><strong>Entregar.</strong> A resposta volta ao canal e a entrega é registrada. O aprendizado a partir do turno acontece depois, em segundo plano.</li>
</ol>

<h2>O loop do kernel</h2>
<p>Cada passada monta a requisição, chama o modelo e executa as chamadas de ferramentas que ele pediu. As chamadas somente leitura rodam lado a lado; as que alteram algo rodam uma de cada vez. Toda chamada termina com um <strong>recibo</strong>: <code>succeeded</code>, <code>failed</code>, <code>denied</code>, <code>timed_out</code>, <code>cancelled</code>, <code>skipped</code>, <code>unknown_tool</code>, <code>invalid_arguments</code>, <code>indeterminate</code> (o processo parou no meio da chamada) ou <code>answered</code> (um hook respondeu pela ferramenta). Os recibos, e não as palavras do modelo, é que contam como trabalho feito.</p>
<p>Nos turnos do próprio proprietário, apenas as ferramentas principais são enviadas a cada chamada de modelo. As demais são listadas pelo nome e carregadas quando o modelo as pede com <code>load_tools</code>.</p>

<h2>Uma cadeia de hooks julga cada chamada de ferramenta</h2>
<p>Cada salvaguarda é um hook do kernel que julga os efeitos declarados de uma chamada. As ferramentas nunca perguntam ao proprietário nem recusam por política por conta própria. A ordem é fixa:</p>
<ol>
  <li>Forma canônica da chamada (para que todo hook seguinte julgue a chamada que de fato vai rodar)</li>
  <li>Autoridade: esta ferramenta, este caminho e este nível de acesso são permitidos neste turno?</li>
  <li>Proteção contra sequência da mesma ferramenta, parada do registro de execuções, orçamento de tokens, aviso de travamento</li>
  <li>Hooks de memória</li>
  <li>Caminhos protegidos, proteção de rede, varredura de segredos na saída</li>
  <li>Conteúdo não confiável: depois que o turno leu algo que o proprietário não escreveu, as chamadas que enviam dados para fora passam por uma checagem separada</li>
  <li>Aprovação do proprietário (por último, para que o proprietário só seja consultado sobre chamadas que todo o resto permite)</li>
  <li>Despacho e coordenação com os outros agentes que trabalham no mesmo pedido</li>
</ol>

<h2>Limites</h2>
<p>O trabalho é limitado por progresso e custo, nunca pelo tempo que leva.</p>
<table class="config-table">
<thead><tr><th>Limite</th><th>Padrão</th><th>Observações</th></tr></thead>
<tbody>
<tr><td>Turnos de modelo por execução</td><td>150</td><td>Uma rede de segurança; o teto rígido do kernel é 1.000</td></tr>
<tr><td>Orçamento de tokens por requisição</td><td>500.000</td><td><code>[subagents] task_token_budget</code>, compartilhado pelo pedido e por todo subagente que ele inicia. Enquanto o trabalho continua dando certo, cresce sozinho até 3 vezes, nunca além de 2.000.000; depois disso o proprietário decide. <code>0</code> desativa</td></tr>
<tr><td>A mesma ferramenta em sequência</td><td>8</td><td>16 para ferramentas de uso geral, 40 para ferramentas passo a passo, como computer use</td></tr>
<tr><td>Detecção de travamento</td><td>3 repetições</td><td>A mesma chamada com o mesmo resultado 3 vezes, a mesma ferramenta falhando 3 vezes ou um vaivém A/B/A/B ao longo de 6 chamadas. O modelo recebe um aviso; depois de 2 avisos a execução para</td></tr>
<tr><td>Inatividade</td><td>300 s</td><td><code>[daemon.watchdog]</code>: um turno que para de progredir é cancelado. Cada chamada de modelo tem o próprio tempo limite de 300 s</td></tr>
</tbody>
</table>

<h2>Escolhendo o modelo e se recuperando de erros</h2>
<p>O modelo fixado de uma conversa vence, depois um <code>/model</code> válido para todo o daemon. Um subagente mantém o modelo com que foi criado. Caso contrário, o turno usa o modelo primary; o roteador escolhe um nível apenas para modelos em que não se confia para trabalhar de forma autônoma.</p>
<p>Cada chamada de modelo percorre uma cadeia de failover: o modelo escolhido, depois os outros modelos do roteador, depois os modelos de cada provedor de failover configurado.</p>
<table class="config-table">
<thead><tr><th>Erro</th><th>O que acontece</th></tr></thead>
<tbody>
<tr><td><strong>Limite de taxa, tempo esgotado, rede, erro do servidor</strong></td><td>Tenta de novo com backoff (respeitando <code>retry_after</code>) e depois passa para o próximo modelo</td></tr>
<tr><td><strong>Requisição inválida</strong></td><td>Tenta uma vez sem mídia, uma vez com as opções padrão e depois passa para o próximo modelo</td></tr>
<tr><td><strong>Cobrança</strong></td><td>Tenta uma vez com um limite de saída menor e depois ignora esse modelo por 10 minutos</td></tr>
<tr><td><strong>Autenticação ou cota esgotada</strong></td><td>Passa para o próximo provedor; a cota e o horário de renovação dela são o que é informado se tudo falhar</td></tr>
<tr><td><strong>Modelo não encontrado, erro desconhecido</strong></td><td>Próximo modelo</td></tr>
<tr><td><strong>Contexto longo demais</strong></td><td>Interrompe a cadeia; o turno compacta o histórico e chama de novo</td></tr>
</tbody>
</table>

${callout('info', 'Última Versão Funcional', 'Após cada chamada de modelo bem-sucedida, a configuração atual é copiada para <code>config.toml.lastgood</code>. Se o <code>config.toml</code> deixar de carregar mais tarde, o AIDaemon tenta o <code>.lastgood</code>, depois o <code>.bak</code>, o <code>.bak.1</code> e o <code>.bak.2</code>.')}

<h2>Quando um turno está concluído?</h2>
<p><strong>A evidência vale mais que o contrato.</strong></p>
<ul>
  <li>Antes de alterar ou enviar qualquer coisa, o modelo declara o que o pedido precisa com <code>track_requirements</code> (veja <a href="/plans">Planos &amp; Checklists</a>).</li>
  <li>Cada item só é fechado por um recibo correspondente. Enquanto um item está aberto e alguma ferramenta permitida ainda poderia fazê-lo, o registro de execuções pode mandar o modelo de volta para mais trabalho, no máximo 2 passadas extras.</li>
  <li>Uma execução cujos recibos todos tiveram sucesso é encerrada como <code>succeeded</code>, mesmo quando o plano não conseguiu descrever o trabalho.</li>
  <li>Um item que o modelo adia, pula ou descarta deixa a execução parar, mas a tarefa termina como <code>partial</code>, nunca <code>succeeded</code>. O mesmo vale para um modelo que informa <code>partial</code> ou <code>blocked</code> e para um pedido que uma política recusou.</li>
</ul>
<p>Algumas outras verificações também podem pedir mais uma passada, cada uma com o próprio orçamento:</p>
<ul>
  <li>A resposta está vazia, é texto interno ou é uma saída de ferramenta colada.</li>
  <li>A execução alterou código e não rodou build nem teste.</li>
  <li>Vários agentes alteraram arquivos e ninguém conferiu o resultado.</li>
  <li>Um clique de GUI nunca foi verificado.</li>
  <li>Uma decisão de mandato não foi registrada.</li>
</ul>

<h2>Ajuste da ordem das mensagens</h2>
<p>Antes de cada chamada de modelo, o histórico é ajustado para que todo provedor o aceite:</p>
<ol>
  <li>Mesclar mensagens consecutivas do mesmo papel.</li>
  <li>Descartar resultados de ferramentas sem a chamada correspondente e chamadas de ferramentas sem resultado.</li>
  <li>Mesclar de novo.</li>
  <li>Garantir que o histórico comece com uma mensagem de usuário ou de sistema.</li>
</ol>
<p>Uma execução que ultrapassa a janela de contexto do modelo é compactada.</p>

<h2>Sessões</h2>
<table class="config-table">
<thead><tr><th>Origem</th><th>ID da sessão</th></tr></thead>
<tbody>
<tr><td>Telegram</td><td><code>{bot}:{chat_id}</code></td></tr>
<tr><td>Slack</td><td><code>slack:{channel_id}</code> ou <code>slack:{channel_id}:{thread_ts}</code></td></tr>
<tr><td>Discord</td><td><code>discord:ch:{channel_id}</code> ou <code>discord:dm:{user_id}</code>, com o prefixo <code>{bot}:</code> para um bot nomeado</td></tr>
<tr><td>Gatilho de e-mail</td><td><code>email_trigger</code></td></tr>
<tr><td>Subagente</td><td>Derivado da sessão pai</td></tr>
</tbody>
</table>
<p>A confiança não vem do id da sessão. Ela vem do papel do remetente, da visibilidade do canal e do que o turno leu: conteúdo que o proprietário não escreveu (páginas da web, entrada de gatilhos, mensagens de outras pessoas, resultados de MCP) marca o turno como não confiável.</p>

<h2>Reinicializações</h2>
<p>O kernel cria checkpoints de cada execução no mesmo banco de dados (<code>run_events</code>, <code>run_states</code>). Se o AIDaemon parar no meio de um turno de chat, esse turno recebe uma continuação depois da reinicialização. Ele é informado de quais chamadas estavam rodando e podem ou não ter tido efeito, e nenhuma delas é executada de novo. Os subagentes em segundo plano não sobrevivem a uma reinicialização; os chats deles são avisados.</p>
`
  },
  {
    slug: '/architecture/state',
    section: 'Architecture',
    title: 'Armazenamento e Estado',
    description: 'Um único banco SQLite, criptografado por padrão: qual crate é dono de quais tabelas, o cache de memória de trabalho, a memória de longo prazo, retenção e backups.',
    content: () => `
<h1>Armazenamento &amp; Estado</h1>
<p class="lead">Tudo o que o AIDaemon guarda fica em um único arquivo SQLite, criptografado em repouso por padrão. Cada crate de domínio é dono das próprias tabelas nesse arquivo.</p>

<h2>O banco de dados</h2>
<ul>
  <li><strong>Arquivo:</strong> <code>[state] db_path</code> (padrão <code>aidaemon.db</code>).</li>
  <li><strong>Criptografia:</strong> SQLCipher, integrado por padrão. Se não existir chave, uma é gerada no <code>.env</code>, e um banco de dados em texto simples existente é migrado automaticamente. <code>AIDAEMON_ALLOW_PLAINTEXT_DB=1</code> é um desvio de emergência.</li>
  <li><strong>Modo:</strong> journal WAL e um pool de 10 conexões compartilhando um único cache de páginas (<code>[state] sqlite_cache_mib</code>, padrão 64).</li>
  <li><strong>Backups na atualização:</strong> quando uma nova versão inicia em um banco existente, ela primeiro grava uma cópia consistente em <code>backups/</code>, ao lado dele, e mantém as <code>[state] upgrade_backups</code> mais recentes (padrão 2; <code>0</code> desativa).</li>
</ul>

<h2>Quem é dono de quais tabelas</h2>
<table class="config-table">
<thead><tr><th>Área</th><th>Principais tabelas</th><th>Responsável</th></tr></thead>
<tbody>
<tr><td>Histórico de conversas e tarefas</td><td><code>events</code>, <code>task_lifecycle</code>, <code>session_context_boundaries</code>, <code>history_message_index</code> / <code>history_message_fts</code> (busca)</td><td><code>aidaemon-events</code>, <code>aidaemon-runtime</code></td></tr>
<tr><td>Checkpoints de execução do kernel</td><td><code>run_events</code>, <code>run_states</code></td><td><code>aidaemon-store-sqlite</code></td></tr>
<tr><td>Metas, tarefas, agendamentos, mandatos, checklists</td><td><code>goals</code>, <code>tasks</code>, <code>goal_schedules</code>, <code>goal_runs</code>, <code>mandates</code>, <code>task_plans</code>, <code>notification_queue</code></td><td><code>aidaemon-work</code></td></tr>
<tr><td>Memória de longo prazo</td><td><code>facts</code>, <code>episodes</code>, <code>procedures</code>, <code>error_solutions</code>, <code>people</code>, <code>person_facts</code>, <code>memory_*</code></td><td><code>aidaemon-memory</code></td></tr>
<tr><td>Sondas de saúde</td><td><code>health_probes</code>, <code>probe_results</code>, <code>probe_alerts</code></td><td><code>aidaemon-work</code> (somente com <code>[health] enabled</code>)</td></tr>
<tr><td>Aprovações de terminal</td><td><code>terminal_backend_allowed_prefixes</code>, <code>terminal_capability_grants</code></td><td><code>aidaemon-runtime</code></td></tr>
<tr><td>Uso de tokens</td><td><code>token_usage</code>, <code>token_usage_daily</code></td><td><code>aidaemon-runtime</code></td></tr>
<tr><td>Configuração em tempo de execução</td><td><code>settings</code>, <code>dynamic_bots</code>, <code>dynamic_mcp_servers</code>, <code>dynamic_skills</code>, <code>oauth_connections</code></td><td><code>aidaemon-runtime</code></td></tr>
<tr><td>Clientes do app</td><td><code>client_events</code>, <code>client_devices</code>, <code>client_pairing</code></td><td><code>aidaemon-store-sqlite</code></td></tr>
</tbody>
</table>
<p>Bancos de dados mais antigos são atualizados na inicialização: a antiga tabela <code>messages</code> passa para <code>events</code>, e a antiga tabela <code>scheduled_tasks</code> passa para metas e agendamentos de metas. As duas tabelas antigas são então removidas.</p>

<h2>Histórico de conversas</h2>
<p>A tabela <code>events</code> é o registro único de uma conversa (veja <a href="/event-sourcing">Event Sourcing</a>). As mensagens recentes de cada sessão também ficam em cache na memória, limitadas a <code>[state] working_memory_cap</code> (padrão 50) e reabastecidas a partir dos eventos após uma reinicialização. O <code>/clear</code> registra uma fronteira para que os turnos seguintes comecem do zero sem excluir nada; o <code>/wipe</code> realmente exclui o histórico da sessão.</p>

<h2>Memória de longo prazo</h2>
<p>Com o padrão <code>[memory] backend = "daemon"</code>, a memória fica no mesmo banco de dados:</p>
<ul>
  <li>Fatos, com versões mais antigas substituídas em vez de sobrescritas.</li>
  <li>Episódios que resumem sessões passadas.</li>
  <li>Procedimentos e soluções de erros aprendidos com trabalhos concluídos.</li>
  <li>Pessoas.</li>
</ul>
<p>A recordação classifica por significado, palavras, atualidade, confiança e fonte. Os fatos mais recentes, até <code>[state] max_facts</code> (padrão 20), vão para o prompt do sistema. Os embeddings são calculados localmente com o fastembed (<code>[memory] embedding_model</code>, padrão <code>AllMiniLML6V2Q</code>); trocar o modelo reincorpora a memória em segundo plano. As notas das conversas colocadas em um projeto são mantidas como arquivos em <code>~/.aidaemon/projects</code>, separadas da memória pessoal. Os trabalhos de memória em segundo plano rodam a cada <code>[state] consolidation_interval_hours</code> (padrão 6). Veja <a href="/tools/memory">Memória</a>.</p>

<h2>Retenção</h2>
<p>Um trabalho diário remove linhas antigas conforme <code>[state.retention]</code>. Cada valor é em dias; <code>0</code> mantém as linhas para sempre. Somente o histórico com o qual a memória já aprendeu é excluído.</p>
${configTable([
  ['messages_days', 'integer', '90', 'Eventos de conversa (início/fim de tarefas, mensagens do usuário e do assistente)'],
  ['diagnostic_events_days', 'integer', '7', 'Eventos de ferramentas, de chamadas de modelo e outros eventos de diagnóstico'],
  ['superseded_facts_days', 'integer', '90', 'Versões antigas de fatos'],
  ['token_usage_aggregate_days', 'integer', '30', 'Linhas brutas de tokens, antes consolidadas em totais diários'],
  ['episodes_days', 'integer', '365', 'Episódios nunca recordados'],
  ['behavior_patterns_days', 'integer', '90', 'Padrões no piso de confiança'],
  ['goals_days', 'integer', '180', 'Metas concluídas ou abandonadas'],
  ['procedures_days', 'integer', '180', 'Procedimentos que nunca tiveram sucesso'],
  ['error_solutions_days', 'integer', '90', 'Soluções de erros que fizeram mais mal do que bem'],
])}
`
  },
  {
    slug: '/service-install',
    section: 'Service',
    title: 'Executar como Serviço',
    description: 'Execute o aidaemon no login com aidaemon service install (launchd, unidade de usuário do systemd, tarefa de logon do Windows) ou como um serviço de todo o sistema.',
    content: () => `
<h1>Instalação como Serviço</h1>
<p class="lead">Mantenha o aidaemon rodando em segundo plano, iniciando no login.</p>

<h2>Para este usuário (recomendado)</h2>
${codeBlock(`aidaemon service install      # this user, at login, from ~/.aidaemon (--dir to change); starts it now
aidaemon service uninstall`, 'bash')}
<p>Não são necessários direitos de administrador. É isso que o <strong>Run it here</strong> do app faz na primeira execução: um agente launchd no macOS, uma unidade de usuário do systemd no Linux (o lingering é ativado para que ela sobreviva à sua sessão de login) e uma tarefa de logon no Windows. O download do app para macOS executa o daemon de dentro do <code>AIdaemon.app</code>.</p>

<h2>Em todo o sistema (legado)</h2>
${codeBlock(`./aidaemon install-service`, 'bash')}

<p>O <code>install-service</code> ainda grava a unidade de todo o sistema no Linux (precisa de sudo) ou o agente de inicialização no macOS e imprime os comandos para iniciá-lo; ele mesmo não inicia nada. No Windows ele não está disponível: use <code>aidaemon service install</code>. Ele detecta a plataforma automaticamente:</p>

<h2>Linux (systemd)</h2>
<p>Cria o <code>/etc/systemd/system/aidaemon.service</code>:</p>
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

<p>Ele imprime os comandos para ativá-lo e iniciá-lo; execute-os você mesmo:</p>
${codeBlock(`sudo systemctl daemon-reload
sudo systemctl enable --now aidaemon`, 'bash')}

<h2>macOS (launchd)</h2>
<p>Copia o binário para um <code>~/Applications/aidaemon.app</code> assinado (para que as concessões de permissão do macOS sobrevivam a recompilações; o download do app usa o próprio helper assinado) e cria o <code>$HOME/Library/LaunchAgents/ai.aidaemon.plist</code>:</p>
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

<p>Depois carregue-o e conceda Acessibilidade e Gravação de Tela ao aidaemon se você usa computer use:</p>
${codeBlock(`launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/ai.aidaemon.plist`, 'bash')}

${callout('info', 'Suspensão do macOS', 'No macOS, o daemon impede o Mac de entrar em suspensão por inatividade enquanto roda (ele inicia <code>caffeinate -i</code> para si mesmo). Não envolva o binário em <code>caffeinate</code> no plist: isso quebra as concessões de permissão de que o computer use precisa.')}

<h2>Logs</h2>
<p>Um daemon rodando em segundo plano grava um log com rotação por tamanho, somente do proprietário, em <code>~/Library/Logs/aidaemon/stdout.log</code> no macOS e em <code>~/.local/state/aidaemon/stdout.log</code> nos demais (sob <code>$XDG_STATE_HOME</code> quando definido). Defina <code>AIDAEMON_LOG_DIR</code> para mudar a pasta. No Linux, <code>journalctl --user -u aidaemon</code> mostra por que o serviço parou.</p>

<h2>Verificação de Saúde</h2>
<p>Com o serviço rodando, verifique com:</p>
${codeBlock(`curl http://127.0.0.1:8080/health
# {"status": "ok", "components": {"database": {...}, "provider": {...}}}`, 'bash')}

<p>O endpoint de saúde é servido em <code>[daemon] health_bind</code>:<code>health_port</code> (padrão <code>127.0.0.1:8080</code>). Ele responde <code>200</code> com <code>"ok"</code>, ou <code>503</code> com <code>"degraded"</code> quando o banco de dados não responde ou o provedor de modelo está indisponível. Veja <a href="/health-monitoring">Monitoramento de Saúde</a> para a resposta completa.</p>
`
  },
  {
    slug: '/event-sourcing',
    section: 'Event Sourcing',
    title: 'Sistema de Eventos',
    description: 'A tabela de eventos somente de acréscimo: o que o AIDaemon registra, o registro de execuções construído a partir dela e como o aprendizado e a retenção a usam.',
    content: () => `
<h1>Event Sourcing</h1>
<p class="lead">Cada turno é registrado como uma sequência de eventos somente de acréscimo na tabela <code>events</code>. O histórico da conversa, o resultado da tarefa e o registro que julga se o trabalho foi feito são todos lidos desses eventos.</p>

<h2>O que é registrado</h2>
<table class="config-table">
<thead><tr><th>Grupo</th><th>Tipos de evento</th></tr></thead>
<tbody>
<tr><td><strong>Conversa</strong></td><td><code>user_message</code>, <code>assistant_response</code>, <code>response_delivery</code> (o progresso da resposta pelo canal)</td></tr>
<tr><td><strong>Tarefas</strong></td><td><code>task_start</code>, <code>task_end</code> (status e resultado)</td></tr>
<tr><td><strong>Ferramentas</strong></td><td><code>tool_call</code>, <code>tool_result</code></td></tr>
<tr><td><strong>Chamadas de modelo</strong></td><td><code>llm_call</code> (telemetria de latência e de tokens)</td></tr>
<tr><td><strong>Conclusão</strong></td><td><code>task_contract_compiled</code>, <code>executor_expectations_declared</code> (a checklist do modelo), <code>background_continuation_linked</code></td></tr>
<tr><td><strong>Política e diagnósticos</strong></td><td><code>policy_decision</code>, <code>decision_point</code>, <code>policy_metrics_snapshot</code>, <code>memory_policy_compiled</code>, <code>user_constraint_violation</code>, <code>thinking_start</code>, <code>error</code></td></tr>
<tr><td><strong>Esperando uma pessoa</strong></td><td><code>interaction_requested</code>, <code>interaction_resolved</code>, <code>approval_requested</code>, <code>approval_granted</code>, <code>approval_denied</code></td></tr>
<tr><td><strong>Recursos</strong></td><td><code>resource_registered</code>, <code>resource_invalidated</code></td></tr>
<tr><td><strong>Checkpoints de arquivos</strong></td><td><code>checkpoint_created</code>, <code>checkpoint_finalized</code>, <code>checkpoint_skipped</code>, <code>rollback_started</code>, <code>rollback_completed</code>, <code>rollback_failed</code></td></tr>
<tr><td><strong>Subagentes</strong></td><td><code>sub_agent_spawn</code>, <code>sub_agent_complete</code></td></tr>
<tr><td><strong>Sessões</strong></td><td><code>session_start</code>, <code>session_end</code></td></tr>
</tbody>
</table>

<h2>Estrutura do evento</h2>
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

<h2>O que é construído a partir dos eventos</h2>
<ul>
  <li><strong>Histórico da conversa.</strong> As mensagens que um modelo vê são lidas dos eventos, agrupadas por turno. Um índice de texto completo (<code>history_message_fts</code>) permite ao agente pesquisar conversas passadas; um trabalho a cada hora o repara.</li>
  <li><strong>Ciclo de vida da tarefa.</strong> O <code>task_lifecycle</code> mantém uma linha por tarefa (em execução ou terminal) e é atualizado na mesma gravação do evento. Assim, uma tarefa só pode terminar uma vez, mesmo quando um watchdog, um cancelamento e o encerramento normal disputam entre si. Um trabalho a cada minuto encerra as tarefas que começaram e nunca terminaram.</li>
  <li><strong>O registro de execuções.</strong> O agregado da execução é reconstruído a partir dos eventos de uma tarefa: as obrigações, os recibos e o veredito dela (<code>succeeded</code>, concluída por evidência, encerrada por uma recusa de política, <code>failed</code> ou pendente). Reconstruí-lo a partir dos mesmos eventos sempre dá a mesma resposta.</li>
  <li><strong>Contexto da sessão.</strong> Um resumo do que a sessão está fazendo (tarefa em execução, ferramentas recentes, erros, aprovações, subagentes) vai para o prompt do sistema.</li>
</ul>
<p>O kernel também mantém o próprio diário por execução (<code>run_events</code>, <code>run_states</code>) para que uma execução interrompida possa ser resolvida depois de uma reinicialização.</p>

<h2>Aprendendo com os eventos</h2>
<p>A cada <code>[state] consolidation_interval_hours</code> (padrão 6), os trabalhos de memória aprendem com os eventos das sessões encerradas: procedimentos a partir de sequências de ferramentas que funcionaram, soluções de erros, especialização e padrões de falha. Uma passada diária faz o mesmo para qualquer sessão com eventos ainda não aprendidos com mais de 7 dias. As sessões isoladas, ou as tarefas cuja política proíbe a memória automática, são marcadas como tratadas sem que se aprenda com elas. De qualquer forma, os eventos recebem um horário <code>consolidated_at</code>, o que os torna elegíveis para retenção.</p>

<h2>Retenção</h2>
<p>Somente o trabalho diário de retenção exclui eventos, e apenas os já marcados com <code>consolidated_at</code>. Os eventos de conversa (início/fim de tarefas, mensagens do usuário e do assistente) são mantidos por 90 dias (<code>[state.retention] messages_days</code>). Os eventos de ferramentas, de chamadas de modelo e de diagnóstico são mantidos por 7 dias (<code>diagnostic_events_days</code>). <code>0</code> os mantém para sempre. O <code>/wipe</code> exclui os eventos de uma sessão imediatamente.</p>

${callout('info', 'Somente Acréscimo', 'Os eventos nunca são reescritos, exceto por <code>consolidated_at</code> e por anotações adicionadas a uma mensagem do usuário. A retenção e o <code>/wipe</code> são as únicas exclusões.')}
`
  },
  {
    slug: '/plans',
    section: 'Plans',
    title: 'Planos e Checklists',
    description: 'Como o AIDaemon declara o que um pedido precisa com track_requirements, como os recibos fecham cada item e como a checklist decide se uma tarefa teve sucesso.',
    content: () => `
<h1>Planos &amp; Checklists</h1>
<p class="lead">Antes de alterar ou enviar qualquer coisa, o agente anota o que o pedido precisa como uma checklist. Cada item só é marcado pelo resultado de uma chamada de ferramenta real, e a checklist decide se o pedido conta como concluído.</p>

<h2>A ferramenta de checklist</h2>
<p>O modelo chama <code>track_requirements</code> antes da sua primeira operação sempre que um pedido:</p>
<ul>
  <li>altera um arquivo, um sistema remoto, uma implantação, um agendamento ou uma configuração, ou</li>
  <li>envia ou publica algo.</li>
</ul>
<p>Um pedido com várias operações ou alvos recebe um item para cada um. Toda chamada passa a lista completa, que substitui a anterior. Se você alterar ou cancelar parte do trabalho no meio da execução, o agente passa uma lista revisada.</p>
<table class="config-table">
<thead><tr><th>Campo do item</th><th>Significado</th></tr></thead>
<tbody>
<tr><td><code>text</code></td><td>O requisito, escrito para você ler (por exemplo, indicando a pasta que ele cria)</td></tr>
<tr><td><code>status</code></td><td><code>pending</code>, <code>in_progress</code>, <code>completed</code>, <code>skipped</code>, <code>failed</code>, <code>deferred</code> ou <code>background</code> (um trabalho em segundo plano vai concluí-lo)</td></tr>
<tr><td><code>depends_on</code></td><td>Índices dos itens que devem vir antes</td></tr>
<tr><td><code>owner_units</code></td><td>Quais partes numeradas do seu pedido este item executa</td></tr>
<tr><td><code>mutation_effects</code></td><td>Que tipo de alteração o comprova, como <code>local_workspace_write</code>, <code>repository_write</code>, <code>remote_deploy</code> ou <code>external_delivery</code></td></tr>
<tr><td><code>requires_observation</code></td><td>Uma leitura ou verificação o comprova</td></tr>
<tr><td><code>targets</code></td><td>Os caminhos, URLs ou ids de recursos exatos envolvidos</td></tr>
</tbody>
</table>
<p>A chamada também pode levar o veredito do modelo, <code>outcome</code>: <code>done</code>, <code>partial</code>, <code>blocked</code>, <code>needs_owner</code> (o trabalho aguarda a sua resposta) ou <code>nothing_new</code> (uma execução agendada não encontrou nada alterado). Com <code>partial</code> ou <code>blocked</code>, <code>short_of</code> pode dizer qual recurso da máquina se esgotou (espaço em disco, espaço em disco do Docker ou memória).</p>

<h2>Como os itens são fechados</h2>
<ul>
  <li>Um item com efeitos, alvos ou uma observação é fechado pelo recibo da chamada de ferramenta que o fez, nunca pelo modelo que o marca.</li>
  <li>Somente os itens sem nada disso são marcados como <code>completed</code> à mão.</li>
  <li>Enquanto um item alcançável está aberto, a execução pode ser mandada de volta para mais trabalho.</li>
  <li>Um item marcado como <code>skipped</code>, <code>failed</code> ou <code>deferred</code>, ou retirado da lista, deixa a execução parar, mas é relatado como não feito. A tarefa então termina como <code>partial</code>, nunca <code>succeeded</code>.</li>
  <li>Um veredito do modelo de <code>partial</code> ou <code>blocked</code> limita a tarefa a <code>partial</code>. Os recibos podem rebaixar um <code>done</code> declarado; nada promove os outros dois.</li>
</ul>
<p>Editar a checklist nunca transforma um trabalho que não aconteceu em um trabalho que aconteceu.</p>

<h2>Onde aparece e onde é guardada</h2>
<ul>
  <li><strong>Cartão de status.</strong> A checklist aparece no cartão de status ao vivo no seu chat e no app, inclusive os itens em segundo plano que ainda estão rodando.</li>
  <li><strong>Armazenamento.</strong> Ela é salva na tabela <code>task_plans</code>, então a checklist de uma tarefa sobrevive a uma reinicialização.</li>
  <li><strong>Aprendizado.</strong> As checklists concluídas do último dia alimentam o aprendizado de procedimentos da memória.</li>
</ul>

<h2>Metas, agendamentos e automações</h2>
<p>O trabalho de mais longa duração (metas com tarefas, execuções agendadas, mandatos que observam um objetivo) fica em <code>aidaemon-work</code>. Veja <a href="/scheduler">Tarefas Agendadas</a> e <a href="/tools/sub-agents">Subagentes</a>.</p>
`
  },
  {
    slug: '/health-monitoring',
    section: 'Health Monitoring',
    title: 'Monitoramento de Saúde',
    description: 'O endpoint /health do AIDaemon, seus watchdogs e sondas HTTP, TCP, de comando e de arquivo para os seus serviços, com alertas de queda, recuperação e latência.',
    content: () => `
<h1>Monitoramento de Saúde</h1>
<p class="lead">O AIDaemon informa a própria saúde em um endpoint local e pode vigiar os seus serviços com sondas de saúde que alertam você quando algo quebra.</p>

<h2>A saúde do próprio AIDaemon</h2>
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
  <li><strong>Códigos de resposta:</strong> <code>200</code> com <code>"ok"</code> quando o banco de dados responde e o provedor de modelo não está indisponível; caso contrário, <code>503</code> com <code>"degraded"</code>.</li>
  <li><strong>Sem chamada de modelo:</strong> o status do provedor é lido das chamadas de modelo recentes, não de uma nova requisição. <code>provider.status</code> é <code>ready</code>, <code>recovering</code> (a última chamada falhou), <code>stale</code> (nenhuma chamada em 15 minutos), <code>unknown</code> (ainda sem chamadas) ou <code>unavailable</code>.</li>
  <li><strong>Quando conta como indisponível:</strong> a chamada mais recente nos últimos 15 minutos falhou por autenticação, cobrança ou cota esgotada, ou 3 ou mais chamadas seguidas falharam.</li>
  <li><strong>Endereço:</strong> servido em <code>[daemon] health_bind</code>:<code>health_port</code> (padrão <code>127.0.0.1:8080</code>). Com <code>[daemon] dashboard_enabled</code> (o padrão), o mesmo servidor também trata os callbacks do OAuth.</li>
</ul>

<h2>Watchdogs</h2>
${configTable([
  ['stale_threshold_secs', 'integer', '300', 'Um turno cujo loop para de pulsar por este tempo é cancelado como travado'],
  ['task_inactivity_timeout_secs', 'integer', '300', 'Uma tarefa sem atividade de ferramenta ou de modelo por este tempo é tratada como travada'],
  ['llm_call_timeout_secs', 'integer', '300', 'Tempo limite de uma chamada de modelo'],
  ['background_stall_secs', 'integer', '120', 'Um comando em segundo plano sem progresso (CPU, E/S, saída) por este tempo pode ser interrompido'],
  ['background_max_runtime_secs', 'integer', '0', 'Limite opcional para um comando em segundo plano; 0 significa nenhum'],
])}
<p>Eles ficam em <code>[daemon.watchdog]</code>. Nada é limitado apenas pelo tempo decorrido; o trabalho que continua progredindo continua rodando.</p>

<h2>Sondas de serviço</h2>
<p>As sondas vêm desativadas por padrão. Ative-as com <code>[health] enabled = true</code>.</p>
<table class="config-table">
<thead><tr><th>Tipo</th><th>Alvo</th><th>Saudável quando</th></tr></thead>
<tbody>
<tr><td><code>http</code></td><td>URL</td><td>O status corresponde a <code>expected_status</code> (padrão 200) e o corpo contém <code>expected_body</code>, se definido; a latência é registrada</td></tr>
<tr><td><code>port</code></td><td><code>host:port</code></td><td>Uma conexão TCP abre</td></tr>
<tr><td><code>command</code></td><td>Comando de shell (executado com <code>sh -c</code>)</td><td>O código de saída corresponde a <code>expected_exit_code</code> (padrão 0)</td></tr>
<tr><td><code>file</code></td><td>Caminho de arquivo</td><td>O arquivo existe e é mais novo que <code>max_age_secs</code>, se definido</td></tr>
</tbody>
</table>

<h2>Configuração</h2>
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
<p><code>schedule</code> aceita as mesmas formas das tarefas agendadas (<code>every 5m</code>, <code>daily at 9am</code> ou um cron de 5 campos). As sondas vindas da configuração são mantidas em sincronia pelo nome: remova uma do arquivo e ela é removida do banco de dados.</p>

<h3>Opções da sonda (<code>config</code>)</h3>
${configTable([
  ['timeout_secs', 'integer', '10', 'Tempo limite em segundos'],
  ['expected_status', 'integer', '200', 'HTTP: código de status esperado'],
  ['expected_body', 'string', 'null', 'HTTP: texto que o corpo deve conter'],
  ['method', 'string', '"GET"', 'HTTP: método'],
  ['headers', 'table', '{}', 'HTTP: cabeçalhos extras'],
  ['expected_exit_code', 'integer', '0', 'Comando: código de saída esperado'],
  ['max_age_secs', 'integer', 'null', 'Arquivo: idade máxima'],
])}

<h2>Alertas</h2>
<ul>
  <li><strong>Queda:</strong> após <code>consecutive_failures_alert</code> falhas seguidas (padrão 3).</li>
  <li><strong>Recuperada:</strong> quando uma sonda que estava fora volta a passar.</li>
  <li><strong>Lenta:</strong> quando a latência passa de <code>latency_threshold_ms</code>, no máximo uma vez a cada 5 minutos.</li>
</ul>
<p>Os alertas vão para <code>alert_session_ids</code> ou, se estiver vazio, para os seus próprios chats. Um id de sessão do Telegram tem este aspecto: <code>mybot:123456789</code>.</p>

<h2>Tarefas em segundo plano</h2>
<ul>
  <li><strong>Loop de tick:</strong> a cada <code>tick_interval_secs</code> (padrão 30), executa as sondas pendentes.</li>
  <li><strong>Limpeza:</strong> diariamente às 3:40 UTC, remove os resultados mais antigos que <code>result_retention_days</code>.</li>
</ul>

${callout('info', 'Sondas em tempo de execução', 'Com as sondas ativadas, o agente pode criar, listar, executar e verificar sondas com a ferramenta <code>health_probe</code> (ações <code>create</code>, <code>list</code>, <code>run_now</code>, <code>status</code>). As sondas também aparecem como automações em <code>manage_automations</code>, onde podem ser pausadas ou canceladas, e na área System do app, com os trabalhos e filas em segundo plano.')}
`
  },
  {
    slug: '/updates',
    section: 'Updates',
    title: 'Autoatualizador',
    description: 'Atualize o aidaemon automaticamente a partir das versões do GitHub. Três modos: enable (instala automaticamente), check_only (pergunta antes) e disable.',
    content: () => `
<h1>Autoatualizador</h1>
<p class="lead">O aidaemon pode verificar novas versões no GitHub e se atualizar sozinho.</p>

<h2>Destaques das Versões Recentes</h2>
<ul>
  <li><strong>v0.21.0</strong> &mdash; Read aloud no app, respostas que chegam em streaming conforme são escritas, o cache de prompt de uma hora da Anthropic mantido entre carregamentos de ferramentas adiadas e correções para URLs base da Anthropic terminadas em <code>/v1</code> e para chamadas de ferramentas do Gemini</li>
  <li><strong>v0.20.0</strong> &mdash; o app do AIDaemon para desktop, web e terminal; downloads para macOS, Windows e Linux ARM64; primeira execução pelo app; visualizações ao vivo do navegador do agente; modos de permissão dos agentes de código; arquivos e memória de projetos; atualizações automáticas de modelo; medidores de uso; agendamentos em qualquer fuso horário</li>
  <li><strong>v0.12.9</strong> &mdash; correções de memória: as execuções agendadas não gravam mais as instruções delas na sua memória, extratores automáticos não conseguem sobrescrever o que você disse e duplicatas parafraseadas são mescladas</li>
</ul>

<h2>Modos de Atualização</h2>
<table class="config-table">
<thead><tr><th>Modo</th><th>Comportamento</th></tr></thead>
<tbody>
<tr><td><code>enable</code></td><td>Baixa e aplica as atualizações automaticamente e depois reinicia</td></tr>
<tr><td><code>check_only</code> (padrão)</td><td>Avisa e espera a aprovação antes de aplicar</td></tr>
<tr><td><code>disable</code></td><td>Sem verificações de atualização</td></tr>
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
  ['check_interval_hours', 'integer', '24', 'Horas entre as verificações de atualização'],
  ['check_at_utc_hour', 'integer', 'null', 'Hora UTC específica (0-23) para a verificação diária'],
  ['confirmation_timeout_mins', 'integer', '60', 'Minutos de espera pela aprovação do usuário'],
])}

<h2>Processo de Atualização</h2>
<ol>
  <li><strong>Verificar</strong> &mdash; consulta a API de Releases do GitHub</li>
  <li><strong>Comparar</strong> &mdash; comparação semver</li>
  <li><strong>Avisar</strong> &mdash; envia as notas da versão aos canais</li>
  <li><strong>Aprovar</strong> (check_only) &mdash; pedido de aprovação com tempo limite</li>
  <li><strong>Baixar</strong> &mdash; binário específico da plataforma</li>
  <li><strong>Substituir</strong> &mdash; sobrescreve o binário atual</li>
  <li><strong>Reiniciar</strong> &mdash; sai com o código 75 para acionar a reinicialização do serviço</li>
</ol>

<p>Verifique manualmente com <code>aidaemon check-update</code>.</p>

<h2>Plataformas Compatíveis</h2>
<table class="config-table">
<thead><tr><th>Plataforma</th><th>Arquitetura</th></tr></thead>
<tbody>
<tr><td>Linux</td><td>x86_64, aarch64</td></tr>
<tr><td>macOS</td><td>x86_64, aarch64</td></tr>
<tr><td>Windows</td><td>Sem autoatualização: baixe o novo zip</td></tr>
</tbody>
</table>

${callout('info', 'Download do app para macOS', 'O daemon dentro do <code>AIdaemon.app</code> não se substitui: ele avisa quando há uma nova versão, e você instala o novo <code>.dmg</code> da <a href="https://github.com/davo20019/aidaemon/releases/latest">última versão</a> para atualizar os dois.')}
${callout('warn', 'Usuários do Homebrew', 'Se instalado pelo Homebrew, use <code>brew upgrade aidaemon</code>, ou defina <code>mode = "disable"</code>.')}
`
  },
  {
    slug: '/terminal/self-hosting',
    section: 'Terminal',
    title: 'Auto-hospedando o Broker de Terminal',
    description: 'Implante o seu próprio broker de terminal no Cloudflare Workers para ter controle total da infraestrutura de relay entre o Telegram e a sua máquina local.',
    content: () => `
<h1>Auto-hospedando o Broker de Terminal</h1>
<p class="lead">O recurso de terminal permite executar agentes de CLI (Codex, Claude, Gemini, OpenCode) diretamente do Telegram. Por padrão, ele usa o broker hospedado compartilhado em <code>terminal.aidaemon.ai</code>. Auto-hospedar dá a você controle total da infraestrutura de relay.</p>

<h2>Arquitetura</h2>
<p>O sistema de terminal tem três componentes:</p>
<ul>
  <li><strong>daemon do aidaemon</strong> (Rust) &mdash; roda na sua máquina, inicia sessões PTY e faz a ponte com o broker por WebSocket</li>
  <li><strong>Broker</strong> (Cloudflare Worker) &mdash; relay WebSocket entre o Mini App e o daemon. Cuida de autenticação, limitação de taxa e gerenciamento de sessões</li>
  <li><strong>Mini App</strong> (embutido no broker) &mdash; frontend do Mini App do Telegram com o emulador de terminal xterm.js</li>
</ul>

${codeBlock(`Telegram ──> Mini App (browser) <──WSS──> Broker (CF Worker) <──WSS──> aidaemon daemon ──> local PTY

                                        ┌───────────────────┐
  ┌──────────┐    ┌──────────────────┐   │  Cloudflare        │   ┌────────────────┐   ┌───────────┐
  │ Telegram │───>│ Mini App         │<─>│  Worker (Broker)   │<─>│ aidaemon       │──>│ local PTY │
  │          │    │ (xterm.js)       │   │  - auth            │   │ (terminal      │   │ (bash,    │
  │          │    │                  │   │  - rate limiting   │   │  bridge)       │   │  zsh...)  │
  └──────────┘    └──────────────────┘   │  - session mgmt   │   └────────────────┘   └───────────┘
                         WSS             └───────────────────┘          WSS`, 'text', 'architecture')}

${callout('info', 'Criptografia de Ponta a Ponta', 'O broker é um relay transparente &mdash; ele nunca vê o conteúdo real do terminal. Toda a E/S do terminal é criptografada entre o Mini App e o seu daemon.')}

<h2>Pré-requisitos</h2>
<ul>
  <li><strong>Conta na Cloudflare</strong> &mdash; o plano gratuito basta para uso pessoal</li>
  <li><strong>Um bot do Telegram</strong> &mdash; criado pelo <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a></li>
  <li><strong>aidaemon instalado e rodando</strong> &mdash; com o canal do Telegram configurado (<a href="/telegram">guia de configuração do Telegram</a>)</li>
  <li><strong>Node.js 20+</strong> e <strong>npm</strong> &mdash; para a <a href="https://developers.cloudflare.com/workers/wrangler/" target="_blank" rel="noopener">CLI wrangler</a></li>
</ul>

<h2>Passo 1 &mdash; Clone o Broker</h2>
<p>O broker é um projeto Cloudflare Worker independente. Clone-o e instale as dependências:</p>
${codeBlock(`git clone https://github.com/davo20019/terminal.aidaemon.ai.git
cd terminal.aidaemon.ai
npm install`, 'bash')}

<h2>Passo 2 &mdash; Configure a Implantação</h2>
<p>Abra o <code>wrangler.toml</code> e escolha como quer implantar:</p>

<h3>Opção A: Subdomínio workers.dev (Mais Simples)</h3>
<p>Se você não tem um domínio próprio, use o subdomínio gratuito <code>*.workers.dev</code> da Cloudflare. Comente ou remova o bloco <code>routes</code>:</p>
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

<h3>Opção B: Domínio Próprio</h3>
<p>Se você tem um domínio no DNS da Cloudflare, configure uma rota para ele:</p>
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

${callout('info', 'DNS da Cloudflare Necessário', 'Os domínios próprios precisam ser gerenciados pelo DNS da Cloudflare (com proxy, nuvem laranja). Se o seu domínio está em outro registrador, você pode transferi-lo ou adicioná-lo como uma <a href="https://developers.cloudflare.com/dns/zone-setups/" target="_blank" rel="noopener">zona da Cloudflare</a>.')}

<h2>Passo 3 &mdash; Defina os Segredos</h2>
<p>O broker precisa de alguns segredos para funcionar. Defina-os com a CLI wrangler:</p>

${codeBlock(`# Required: signs all authentication tokens
npx wrangler secret put SESSION_SIGNING_KEY
# paste output of: openssl rand -base64 32

# Required: validates Telegram user identity
npx wrangler secret put TELEGRAM_BOT_TOKEN
# paste your bot token from @BotFather

# Optional: protects admin API endpoints
npx wrangler secret put ADMIN_API_KEY
# paste a strong random string`, 'bash')}

${callout('danger', 'Proteja a Sua Chave de Assinatura', 'A <code>SESSION_SIGNING_KEY</code> assina todos os tokens de autenticação. Se ela for comprometida, um invasor poderia forjar sessões. Gere um valor aleatório forte e guarde-o com segurança. Troque-o imediatamente se suspeitar de um vazamento.')}

<p>Lista completa dos segredos disponíveis:</p>
${configTable([
  ['SESSION_SIGNING_KEY', 'string', '&mdash;', 'Obrigatório. Assina os tokens de autenticação. Gere com <code>openssl rand -base64 32</code>'],
  ['TELEGRAM_BOT_TOKEN', 'string', '&mdash;', 'Obrigatório. Token do bot obtido com o @BotFather. Deve corresponder ao token na sua configuração do aidaemon'],
  ['ADMIN_API_KEY', 'string', '&mdash;', 'Opcional. Protege os endpoints de administração (gerenciamento de usuários, substituição de cotas)'],
  ['BILLING_WEBHOOK_SECRET', 'string', '&mdash;', 'Opcional. Segredo HMAC para a verificação da assinatura do webhook de cobrança'],
])}

<h2>Passo 4 &mdash; Implante</h2>
<p>Implante o broker no Cloudflare Workers:</p>
${codeBlock(`npx wrangler deploy   # or: npm run deploy`, 'bash')}

<p>Você deve ver uma saída como esta:</p>
${codeBlock(`Uploaded terminal-broker (3.45 sec)
Published terminal-broker (0.35 sec)
  https://terminal-broker.your-subdomain.workers.dev
Current Deployment ID: abc12345-...`, 'text', 'deploy output')}

${callout('info', 'Migração do Durable Object', 'A primeira implantação cria automaticamente a migração do Durable Object para <code>UserSessionStore</code>. Não são necessárias etapas manuais de migração.')}

<h2>Passo 5 &mdash; Configure o aidaemon</h2>
<p>Aponte o seu daemon do aidaemon para o seu broker auto-hospedado. Atualize o seu <code>config.toml</code>:</p>

${codeBlock(`[terminal]
web_app_url = "https://terminal.example.com"
daemon_ws_url = "wss://terminal.example.com/v1/ws/daemon"`, 'toml', 'config.toml')}

<p>Ou use variáveis de ambiente:</p>
${codeBlock(`export AIDAEMON_TERMINAL_WEB_APP_URL="https://terminal.example.com"
export AIDAEMON_TERMINAL_BROKER_URL="wss://terminal.example.com/v1/ws/daemon"`, 'bash')}

<p>Outras substituições que o daemon lê: <code>AIDAEMON_TERMINAL_BRIDGE_ENABLED</code> (ou <code>[terminal] bridge_enabled</code>, padrão true), <code>AIDAEMON_TERMINAL_DAEMON_TOKEN</code>, <code>AIDAEMON_TERMINAL_USER_ID</code>, <code>AIDAEMON_TERMINAL_DEVICE_ID</code> e <code>AIDAEMON_TERMINAL_SHELL</code>.</p>

<p>Reinicie o aidaemon depois de alterar a configuração para que os novos valores entrem em vigor.</p>

<h2>Passo 6 &mdash; Configure o Telegram</h2>
<p>Como você configura o Telegram depende de como inicia o terminal:</p>

<h3>Pelo Comando /terminal (Botões Inline)</h3>
<p>Se você usa o comando <code>/terminal</code> no chat do seu bot, a URL do Mini App vem de <code>web_app_url</code> no seu <code>config.toml</code>. Nenhuma alteração no BotFather é necessária &mdash; a URL do botão inline é definida automaticamente pelo aidaemon.</p>

<h3>Pelo Botão de Menu</h3>
<p>Se você quer o terminal acessível como um botão de menu permanente no seu bot:</p>
<ol>
  <li>Abra o <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a> no Telegram</li>
  <li>Envie <code>/mybots</code> e selecione o seu bot</li>
  <li>Vá em <strong>Bot Settings</strong> &rarr; <strong>Menu Button</strong></li>
  <li>Defina a URL como o seu broker (por exemplo, <code>https://terminal-broker.your-subdomain.workers.dev</code>)</li>
</ol>

${callout('warn', 'HTTPS Obrigatório', 'O Telegram exige que a URL do Mini App use HTTPS. Tanto os subdomínios <code>workers.dev</code> quanto os domínios próprios com proxy da Cloudflare fornecem HTTPS automaticamente.')}

<h2>Verificação</h2>
<p>Confirme que tudo está funcionando:</p>

<h3>1. Verificação de Saúde</h3>
${codeBlock(`curl https://terminal.example.com/health`, 'bash')}
<p>Resposta esperada:</p>
${codeBlock(`{
  "ok": true,
  "service": "terminal.example.com",
  "mode": "broker-e2ee-bridge",
  "timestamp": "2026-03-01T12:00:00.000Z"
}`, 'json', 'health response')}

<h3>2. Teste o Mini App</h3>
<p>Envie <code>/terminal</code> ao seu bot no Telegram. O Mini App deve abrir e mostrar a interface do terminal.</p>

<h3>3. Verifique os Logs do aidaemon</h3>
<p>Procure a conexão da ponte de terminal nos logs do aidaemon (<code>~/Library/Logs/aidaemon/stdout.log</code> no macOS, <code>~/.local/state/aidaemon/stdout.log</code> nos demais):</p>
${codeBlock(`INFO Connecting terminal bridge to broker
INFO Terminal bridge connected`, 'text', 'aidaemon logs')}

${callout('success', 'Tudo Pronto', 'Se a verificação de saúde retornar <code>"ok": true</code>, o Mini App abrir no Telegram e os logs do aidaemon mostrarem a conexão com o broker &mdash; o seu terminal auto-hospedado está totalmente operacional.')}

<h2>Configuração de Cotas</h2>
<p>O broker impõe cotas mensais por usuário para evitar abusos. Ele acompanha inícios de sessão, minutos ativos, bytes transferidos e frames WebSocket. Os limites do plano "free" padrão são generosos e mais que suficientes para uso pessoal.</p>

<p>Para personalizar os limites do plano, defina a variável de ambiente <code>PLAN_LIMITS_JSON</code> no seu <code>wrangler.toml</code>:</p>
${codeBlock(`[vars]
PLAN_LIMITS_JSON = '{"free":{"monthly_session_starts":500,"monthly_ws_frames":500000}}'`, 'toml', 'wrangler.toml')}

<p>Outras configurações de plano: <code>DEFAULT_TENANT_PLAN</code> (o plano que os novos usuários recebem, padrão <code>free</code>) e <code>TENANT_PLAN_OVERRIDES_JSON</code> (id do usuário para o plano). <code>ADMIN_API_KEYS</code> aceita várias chaves de administração, separadas por vírgulas ou quebras de linha.</p>

<p>Para colocar um usuário específico no plano "pro" (ou em qualquer plano personalizado), use a API de administração:</p>
${codeBlock(`curl -X POST https://terminal.example.com/v1/admin/plan \\
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"user_id": "TELEGRAM_USER_ID", "plan": "pro"}'`, 'bash')}

<p>Chaves de limite de plano disponíveis:</p>
${configTable([
  ['monthly_session_starts', 'integer', '350', 'Sessões de terminal que um usuário pode iniciar por mês'],
  ['monthly_session_minutes', 'integer', '2400', 'Minutos ativos de terminal por mês'],
  ['monthly_client_bytes', 'integer', '536870912', 'Bytes vindos do Mini App por mês (512 MiB)'],
  ['monthly_daemon_bytes', 'integer', '1073741824', 'Bytes vindos do daemon por mês (1 GiB)'],
  ['monthly_ws_frames', 'integer', '300000', 'Frames WebSocket por mês'],
  ['max_active_scoped_sessions', 'integer', '4', 'Sessões que um usuário pode ter abertas ao mesmo tempo'],
])}

<h2>Solução de Problemas</h2>
<table class="config-table">
<thead><tr><th>Sintoma</th><th>Causa</th><th>Correção</th></tr></thead>
<tbody>
<tr><td>"Terminal bridge disabled" nos logs do aidaemon</td><td><code>daemon_ws_url</code> está mal configurado</td><td>Deve usar <code>wss://</code> (não <code>ws://</code>). O Cloudflare Workers exige TLS.</td></tr>
<tr><td>O Mini App mostra "invalid session"</td><td>Token não corresponde</td><td>O <code>TELEGRAM_BOT_TOKEN</code> no broker deve corresponder exatamente ao token do bot no <code>config.toml</code> do seu aidaemon</td></tr>
<tr><td>"Token signature mismatch"</td><td>Chave de assinatura ausente ou errada</td><td>Garanta que a <code>SESSION_SIGNING_KEY</code> esteja definida com <code>npx wrangler secret put</code></td></tr>
<tr><td>A conexão WebSocket cai</td><td>Erro ou tempo limite do Worker</td><td>Verifique o painel da Cloudflare &rarr; Workers &amp; Pages &rarr; seu worker &rarr; Logs em busca de erros</td></tr>
<tr><td>"daemon_auth_rate_limited"</td><td>Tentativas de conexão com falha demais</td><td>Espere 60 segundos, depois corrija o problema de autenticação e reconecte</td></tr>
</tbody>
</table>

<h2>Notas de Segurança</h2>
<ul>
  <li>O broker é um <strong>relay transparente</strong> &mdash; o conteúdo do terminal é criptografado de ponta a ponta entre o Mini App e o seu daemon</li>
  <li>O broker vê: IDs de usuário, metadados de sessão e tamanhos de frames criptografados &mdash; mas <strong>nunca</strong> o conteúdo real do terminal</li>
  <li>A <code>SESSION_SIGNING_KEY</code> é o segredo mais crítico &mdash; troque-a imediatamente se for comprometida</li>
  <li>Todas as conexões usam TLS (WSS) &mdash; o Cloudflare Workers impõe HTTPS por padrão</li>
</ul>

${callout('info', 'Modelo de Ameaças Completo', 'Para uma análise de segurança detalhada, veja o <a href="https://github.com/davo20019/terminal.aidaemon.ai/blob/main/SECURITY.md" target="_blank" rel="noopener">SECURITY.md</a> no repositório do broker.')}
`
  },
];

export default pages;
