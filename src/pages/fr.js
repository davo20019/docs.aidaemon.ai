import { codeBlock, callout, configTable } from '../helpers.js';

const pages = [
  {
    slug: '/',
    section: null,
    title: 'Documentation AIDaemon — Agent IA personnel en daemon',
    description: 'Documentation d’aidaemon, un daemon d’agent IA personnel open source. Discutez via Telegram, Slack ou Discord. Extensible avec MCP, compatible avec n’importe quel LLM.',
    content: () => `
<h1><span class="ai">AID</span>aemon</h1>
<p class="lead">Un agent IA personnel qui fonctionne en daemon. Toujours actif, toujours en apprentissage. Discutez depuis l’application AIDaemon ou depuis Telegram, Slack et Discord, étendez-le avec MCP, propulsé par n’importe quel LLM.</p>

${callout('success', 'Nouveau ici ?', 'Commencez par <a href="/getting-started/build">Installation</a> : téléchargez l’application pour macOS, Windows ou Linux et ouvrez-la. Version actuelle : <strong>0.21.0</strong>.')}

<p>aidaemon est un agent IA auto-hébergé, écrit en Rust, qui fonctionne comme un service en arrière-plan sur votre machine. Il se connecte à ChatGPT, Anthropic, Gemini, xAI ou à tout fournisseur de LLM compatible OpenAI, communique via sa propre application (bureau, web et terminal) ainsi que via Telegram, Slack ou Discord, et peut exécuter des outils, gérer sa propre configuration, mémoriser des faits, naviguer sur le web et lancer des sous-agents — le tout de façon autonome.</p>

<h2>Fonctionnalités clés</h2>
<ul>
  <li><strong>L’application AIDaemon</strong> — une seule application pour le bureau, le web et le terminal : réponses en continu, Read aloud (lecture à voix haute), approbations, réglages et utilisation. Voir <a href="/app">L’application AIDaemon</a></li>
  <li><strong>Vues en direct</strong> — regardez le navigateur de l’agent et prenez la main quand il a besoin d’une connexion</li>
  <li><strong>Agents de code</strong> — Claude Code, Codex, Antigravity et tout agent Agent Client Protocol, dans le mode de permission de votre choix</li>
  <li><strong>Architecture daemon</strong> — fonctionne comme un service systemd/launchd, toujours disponible</li>
  <li><strong>Multi-canal</strong> — discutez via Telegram, Slack ou Discord, avec contrôle d’accès multi-utilisateur</li>
  <li><strong>Utilisation agentique des outils</strong> — raisonnement autonome en plusieurs étapes, avec approbation des effets de bord</li>
  <li><strong>Intégration MCP</strong> — extensible avec n’importe quel serveur Model Context Protocol</li>
  <li><strong>Mémoire persistante</strong> — historique stocké dans SQLite avec recherche sémantique par embeddings</li>
  <li><strong>Routage multi-modèle</strong> — sélection automatique du niveau Fast/Primary/Smart</li>
  <li><strong>Déclencheurs e-mail</strong> — surveillance IMAP IDLE pour les notifications de boîte de réception</li>
  <li><strong>Approbation des commandes</strong> — approuvez les commandes shell et autres effets de bord depuis l’application ou depuis n’importe quel chat connecté (Telegram, Slack, Discord)</li>
  <li><strong>Système de compétences</strong> — enrichissement dynamique du prompt via des fichiers markdown</li>
  <li><strong>Auto-maintenance</strong> — lit, met à jour, valide et restaure sa propre configuration</li>
  <li><strong>Automatisation du navigateur</strong> — Chrome avec sessions de connexion persistantes, captures d’écran et remplissage de formulaires</li>
  <li><strong>Recherche web</strong> — recherche web intégrée (DuckDuckGo, Brave ou votre propre SearxNG, interrogés en parallèle) et récupération d’URL</li>
  <li><strong>Lancement de sous-agents</strong> — délégation récursive à des agents pour les tâches complexes</li>
  <li><strong>Délégation à des agents CLI</strong> — déléguez à Claude Code, Codex, Antigravity, Gemini, Copilot, Aider ou n’importe quel agent ACP</li>
  <li><strong>Tâches planifiées</strong> — tâches récurrentes de type cron, avec analyse du langage naturel</li>
  <li><strong>Transfert de fichiers</strong> — envoi et réception de fichiers via Telegram, avec sécurité des chemins</li>
  <li><strong>Gestion des secrets</strong> — trousseau du système et variables d’environnement</li>
  <li><strong>Suivi du coût en tokens</strong> — statistiques d’utilisation par modèle, commande /cost, limites du forfait et soldes dans Settings</li>
  <li><strong>Event sourcing</strong> — journal d’événements immuable avec consolidation quotidienne en faits et procédures</li>
  <li><strong>Objectifs + tâches</strong> — découpez un travail plus vaste en tâches suivies et gardez l’avancement en mouvement</li>
  <li><strong>Surveillance de santé</strong> — sondes HTTP, TCP, commande et fichier avec alertes</li>
  <li><strong>Compétences dynamiques</strong> — installation depuis des registres ou promotion automatique des procédures répétées</li>
  <li><strong>Mise à jour automatique</strong> — mise à jour depuis les releases GitHub avec des modes configurables</li>
  <li><strong>Intégration Discord</strong> — commandes slash, boutons d’approbation interactifs, prise en charge multi-bot</li>
  <li><strong>Approbation des commandes</strong> — un contrôle de sécurité de ce que fait chaque commande décide si l’on vous demande ; les cartes sont notées Safe, Medium, High ou Critical</li>
  <li><strong>Intelligence relationnelle</strong> — un carnet de contacts personnel qui retient pour vous les anniversaires, les préférences et les relations</li>
</ul>

<h2>L’architecture en un coup d’œil</h2>
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

<h2>Liens rapides</h2>
<ul>
  <li><a href="/getting-started/build">Installation</a> — téléchargez l’application pour macOS, Windows ou Linux</li>
  <li><a href="/app">L’application AIDaemon</a> — chat, approbations, vues en direct, réglages</li>
  <li><a href="/configuration">Référence de configuration</a> — documentation complète de config.toml</li>
  <li><a href="/tools">Outils</a> — le système d’outils intégré et extensible</li>
  <li><a href="/telegram">Telegram</a> — configuration du bot, commandes, flux d’approbation</li>
  <li><a href="/slack">Slack</a> — intégration à l’espace de travail via Socket Mode</li>
  <li><a href="/discord">Discord</a> — configuration du bot, commandes slash, boutons d’approbation</li>
  <li><a href="/architecture">Comment fonctionne AIDaemon</a> — du message à la réponse : noyau, hooks, limites, clôture</li>
  <li><a href="/event-sourcing">Event sourcing</a> — le journal d’événements en ajout seul et ce qu’on en construit</li>
  <li><a href="/plans">Plans et listes de contrôle</a> — comment une demande est déclarée puis jugée terminée</li>
  <li><a href="/health-monitoring">Surveillance de santé</a> — le point d’accès /health, les watchdogs et les sondes de service</li>
</ul>
`
  },
  {
    slug: '/getting-started',
    section: 'Getting Started',
    title: 'Aperçu',
    description: 'Faites tourner AIDaemon sur votre ordinateur : téléchargez l’application, ouvrez-la, connectez un modèle et commencez à discuter.',
    content: () => `
<h1>Premiers pas</h1>
<p class="lead">Téléchargez l’application AIDaemon, ouvrez-la, connectez un modèle et commencez à discuter. Aucun terminal n’est nécessaire sur macOS ou Windows.</p>

<p>La version actuelle est la <strong>0.21.0</strong>.</p>

<h2>Ce qu’il vous faut</h2>
<ul>
  <li><strong>Un ordinateur</strong> &mdash; un Mac (Apple silicon ou Intel), un PC Windows ou Linux (x86_64 ou ARM64).</li>
  <li><strong>Un modèle</strong> &mdash; un forfait ChatGPT auquel vous vous connectez, ou une clé d’API d’un fournisseur comme Anthropic, Google Gemini, OpenAI ou OpenRouter, ou un modèle qui tourne sur votre propre machine (Ollama, llama.cpp). L’application en trouve un déjà présent sur votre ordinateur quand elle le peut.</li>
  <li><strong>Facultatif :</strong> un bot Telegram, Slack ou Discord, si vous voulez aussi parler à votre agent depuis les applications de chat de votre téléphone. Vous pouvez l’ajouter plus tard.</li>
</ul>

<h2>Étapes</h2>
<ol>
  <li><a href="/getting-started/build">Installation</a> &mdash; téléchargez et ouvrez l’application pour votre ordinateur</li>
  <li><a href="/getting-started/wizard">Premier lancement</a> &mdash; l’application démarre l’assistant et connecte un modèle</li>
  <li><a href="/app">Utiliser l’application</a> &mdash; chat, approbations, vues en direct, réglages</li>
  <li><a href="/configuration">Configurer</a> &mdash; chaque réglage se trouve aussi dans <code>config.toml</code> et sur la page Settings de l’application</li>
</ol>
`
  },
  {
    slug: '/getting-started/build',
    section: 'Getting Started',
    title: 'Installation',
    description: 'Téléchargez et installez AIDaemon sur macOS, Windows ou Linux, pas à pas. Options avancées : Homebrew, Cargo, compilation depuis les sources, serveurs.',
    content: () => `
<h1>Installer AIDaemon</h1>
<p class="lead">Choisissez votre ordinateur ci-dessous et suivez les étapes. Cela prend quelques minutes, et sur macOS et Windows vous n’avez jamais besoin d’un terminal.</p>

<p>Tous les téléchargements se trouvent sur la <a href="https://github.com/davo20019/aidaemon/releases/latest" target="_blank" rel="noopener">page de la dernière release</a>. La version actuelle est la <strong>0.21.0</strong>.</p>

<h2>macOS</h2>
<p><strong>D’abord, vérifiez quel Mac vous avez :</strong> cliquez sur le menu Pomme (le logo Apple en haut à gauche de l’écran) &rarr; <strong>À propos de ce Mac</strong>. Si la ligne <strong>Puce</strong> indique <em>Apple M&hellip;</em>, vous avez Apple silicon. Si une ligne <strong>Processeur</strong> affiche <em>Intel</em>, vous avez un Mac Intel.</p>
<ol>
  <li>Téléchargez l’application pour votre Mac :
    <ul>
      <li>Apple silicon (M1, M2, M3 et suivants) : <a href="https://github.com/davo20019/aidaemon/releases/latest/download/AIdaemon-macos-aarch64.dmg"><code>AIdaemon-macos-aarch64.dmg</code></a></li>
      <li>Intel : <a href="https://github.com/davo20019/aidaemon/releases/latest/download/AIdaemon-macos-x86_64.dmg"><code>AIdaemon-macos-x86_64.dmg</code></a></li>
    </ul>
  </li>
  <li>Ouvrez le fichier <code>.dmg</code> téléchargé.</li>
  <li>Faites glisser <strong>AIDaemon</strong> dans le dossier <strong>Applications</strong>.</li>
  <li>Ouvrez AIDaemon depuis Applications (ou Launchpad).</li>
</ol>
${callout('info', 'Si macOS le bloque la première fois', 'Ouvrez <strong>Réglages Système &rarr; Confidentialité et sécurité</strong>, faites défiler jusqu’au message concernant AIDaemon et cliquez sur <strong>Ouvrir quand même</strong>. Vous n’avez à le faire qu’une seule fois.')}

<h2>Windows</h2>
<ol>
  <li>Téléchargez <a href="https://github.com/davo20019/aidaemon/releases/latest/download/aidaemon-windows-x86_64.zip"><code>aidaemon-windows-x86_64.zip</code></a>.</li>
  <li>Faites un clic droit sur le fichier zip et choisissez <strong>Extraire tout&hellip;</strong>. Extrayez-le dans un dossier que vous conserverez (par exemple <code>%LOCALAPPDATA%\\AIDaemon</code>), pas dans votre dossier Téléchargements.</li>
  <li>Ouvrez le dossier extrait et double-cliquez sur <code>aidaemon-app.exe</code>.</li>
</ol>
${callout('info', 'Si Windows SmartScreen vous avertit', 'Cliquez sur <strong>Informations complémentaires</strong>, puis sur <strong>Exécuter quand même</strong>.')}

<h2>Linux</h2>
<p>Ouvrez un terminal et lancez l’installateur. Il télécharge la bonne version pour votre machine (x86_64 ou ARM64), la vérifie et installe aussi l’application (sa version web va dans <code>~/.aidaemon/app-web</code>) :</p>
${codeBlock(`curl -sSfL https://get.aidaemon.ai | bash`, 'bash')}
<p>Ou téléchargez vous-même une archive de release et extrayez-la :</p>
<ul>
  <li>x86_64 : <a href="https://github.com/davo20019/aidaemon/releases/latest/download/aidaemon-linux-x86_64.tar.gz"><code>aidaemon-linux-x86_64.tar.gz</code></a></li>
  <li>ARM64 (aarch64) : <a href="https://github.com/davo20019/aidaemon/releases/latest/download/aidaemon-linux-aarch64.tar.gz"><code>aidaemon-linux-aarch64.tar.gz</code></a></li>
</ul>
<p>Ouvrez ensuite l’application avec <code>aidaemon-app</code> (une fenêtre) ou <code>aidaemon-app --tui</code> (dans le terminal). La première fois, elle propose <strong>Run it here</strong>, qui démarre l’assistant tout de suite et à chaque ouverture de session. Ensuite, <code>aidaemon app</code> et <code>aidaemon tui</code> fonctionnent aussi lorsque vous les lancez depuis <code>~/.aidaemon</code>, le dossier de l’assistant.</p>

<h2>Homebrew (macOS ou Linux)</h2>
${codeBlock(`brew install davo20019/tap/aidaemon`, 'bash')}
<p>Lancez ensuite <code>aidaemon-app</code>.</p>

<h2>Et ensuite</h2>
<p>La première fois que l’application s’ouvre, elle démarre l’assistant sur cet ordinateur (maintenant et à chaque ouverture de session, sans mot de passe administrateur) et vous aide à connecter un modèle. Voir <a href="/getting-started/wizard">Premier lancement</a>.</p>

<h2>Avancé</h2>

<h3>Cargo</h3>
<p>Pour les développeurs Rust :</p>
${codeBlock(`cargo install --locked aidaemon`, 'bash')}
<p>Cela n’installe que le daemon, compilé à partir des crates du SDK AIDaemon sur crates.io. Compilez l’application depuis <code>clients/app</code> dans un checkout.</p>

<h3>Compiler depuis les sources</h3>
${codeBlock(`git clone https://github.com/davo20019/aidaemon.git
cd aidaemon
cargo build --release`, 'bash')}
<p>Le binaire se trouve dans <code>./target/release/aidaemon</code>. Les fonctionnalités par défaut sont <code>discord</code>, <code>slack</code>, <code>encryption</code>, <code>browser</code>, <code>terminal-bridge</code>, <code>otel</code> et <code>execution-docker</code>. Les fonctionnalités optionnelles incluent <code>computer_use</code> et <code>computer_use-macos</code> (piloter des applications macOS natives) et <code>sdk-memory</code>. L’application elle-même se trouve dans <code>clients/app</code> et se compile séparément.</p>

<h3>Exécution sur un serveur</h3>
<p>Sur un serveur, lancez <code>aidaemon</code> sans configuration, depuis le dossier qui contiendra sa configuration : <code>~/.aidaemon</code>, le dossier qu’utilise <code>aidaemon service install</code>. Il affiche un lien et un code à usage unique. Joignez le port <code>8788</code> de la machine par un tunnel SSH ou votre propre tunnel HTTPS, ouvrez le lien sur votre ordinateur portable ou votre téléphone, et terminez la configuration là-bas (le code n’appaire que le premier appareil) :</p>
${codeBlock(`# on the server
mkdir -p ~/.aidaemon && cd ~/.aidaemon && aidaemon

# on your laptop
ssh -L 8788:127.0.0.1:8788 you@your-server
# then open the printed link in your browser`, 'bash')}
<p>Vous préférez un terminal ? Lancez <code>aidaemon setup</code> dans ce dossier pour connecter le modèle directement là. Pour garder le daemon en marche, voir <a href="/service-install">Exécuter comme service</a>. Pour joindre l’application depuis d’autres appareils sans SSH, voir <a href="/app/gateway">Client Gateway et appairage</a>.</p>

<h3>Vérifier un téléchargement</h3>
<p>Chaque fichier de release a un fichier <code>.sha256</code> correspondant sur la page de la release. L’installateur en une ligne le vérifie pour vous.</p>
`
  },
  {
    slug: '/getting-started/wizard',
    section: 'Getting Started',
    title: 'Premier lancement',
    description: 'Ce qui se passe la première fois que vous ouvrez AIDaemon : l’assistant démarre sur votre ordinateur, trouve ou connecte un modèle et ouvre votre première conversation.',
    content: () => `
<h1>Premier lancement</h1>
<p class="lead">La première fois que vous ouvrez l’application AIDaemon, elle démarre l’assistant sur votre ordinateur et vous aide à connecter un modèle. Rien n’est enregistré tant qu’un appel de test au modèle n’a pas reçu de réponse.</p>

<h2>1. Où tourne l’assistant</h2>
<p>L’application de bureau démarre aussitôt l’assistant (le daemon) sur cet ordinateur, maintenant et à chaque ouverture de session, sans mot de passe administrateur. C’est <strong>Run it here</strong>, équivalent à <code>aidaemon service install</code>. Pour le faire tourner sur un serveur à la place, choisissez <strong>Run it on another machine instead</strong> et collez le lien que ce serveur a affiché (voir <a href="/getting-started/build">Installation &rarr; Exécution sur un serveur</a>).</p>

<h2>2. Connecter un modèle</h2>
<p>L’application cherche un modèle déjà présent sur votre ordinateur &mdash; une connexion ChatGPT, une clé de fournisseur dans l’environnement (comme <code>OPENAI_API_KEY</code> ou <code>ANTHROPIC_API_KEY</code>), ou Ollama ou llama.cpp en local &mdash; et vous le propose en un clic. Ou choisissez vous-même un fournisseur :</p>
<ul>
  <li><strong>Abonnement ChatGPT</strong> &mdash; connectez-vous depuis l’application. Sur un autre appareil, collez l’adresse sur laquelle le navigateur aboutit.</li>
  <li><strong>Une clé de fournisseur</strong> &mdash; la clé est d’abord vérifiée, puis vous choisissez un modèle dans la liste propre à votre compte (le modèle habituel est présélectionné).</li>
  <li><strong>Auto-hébergé</strong> &mdash; <strong>Ollama (local)</strong>, <strong>llama.cpp (local)</strong> ou <strong>Another OpenAI-compatible service</strong> avec l’adresse de votre serveur (LM Studio, vLLM) et la clé laissée vide.</li>
</ul>
<p>Chaque fournisseur indique s’il utilise votre forfait, facture au token ou tourne sur votre propre machine. Un appel de test doit recevoir une réponse avant que quoi que ce soit soit enregistré.</p>

<table class="config-table">
<thead><tr><th>Fournisseur</th><th>Variable de clé</th><th>Modèles de départ (primary / fast / smart)</th><th>Facturation</th></tr></thead>
<tbody>
<tr><td>OpenAI (ChatGPT subscription)</td><td>connexion</td><td>gpt-6-sol / gpt-6-luna / gpt-6-sol</td><td>Votre forfait</td></tr>
<tr><td>Anthropic</td><td><code>ANTHROPIC_API_KEY</code></td><td>claude-sonnet-5-5 / claude-haiku-5-5 / claude-opus-5-5</td><td>Au token</td></tr>
<tr><td>OpenAI</td><td><code>OPENAI_API_KEY</code></td><td>gpt-5</td><td>Au token</td></tr>
<tr><td>Google Gemini</td><td><code>GEMINI_API_KEY</code> ou <code>GOOGLE_API_KEY</code></td><td>gemini-4-hydrogen / gemini-3.5-flash-lite / gemini-4-argon</td><td>Au token</td></tr>
<tr><td>OpenRouter</td><td><code>OPENROUTER_API_KEY</code></td><td>moonshotai/kimi-k2.5</td><td>Au token</td></tr>
<tr><td>xAI (Grok)</td><td><code>XAI_API_KEY</code></td><td>grok-4</td><td>Au token</td></tr>
<tr><td>DeepSeek</td><td><code>DEEPSEEK_API_KEY</code></td><td>deepseek-chat / deepseek-chat / deepseek-reasoner</td><td>Au token</td></tr>
<tr><td>Moonshot AI (Kimi)</td><td><code>MOONSHOT_API_KEY</code></td><td>kimi-k2.5 / kimi-k2.5 / kimi-k2-thinking</td><td>Au token</td></tr>
<tr><td>MiniMax</td><td><code>MINIMAX_API_KEY</code></td><td>MiniMax-M2.5 / MiniMax-M2.5-highspeed / MiniMax-M2.5</td><td>Au token</td></tr>
<tr><td>Another OpenAI-compatible service</td><td>&mdash;</td><td>Votre choix</td><td>Au token</td></tr>
<tr><td>Ollama, llama.cpp</td><td>aucune</td><td>Listés depuis votre serveur</td><td>Local</td></tr>
</tbody>
</table>
<p>Cloudflare AI Gateway n’est pas proposé au premier lancement ; ajoutez-le ensuite dans Settings ou dans <code>config.toml</code> (voir <a href="/providers">Fournisseurs</a>).</p>
<p>Ce ne sont que des choix de départ ; l’application propose ce que votre compte liste réellement. Voir <a href="/providers">Fournisseurs</a> pour la configuration que chacun écrit.</p>
${callout('info', 'llama.cpp et le port 8080', '<code>llama-server</code> et la vérification de santé du daemon utilisent tous deux le port 8080 par défaut. Démarrez l’un des deux ailleurs (<code>llama-server --port 8081</code>, ou <code>[daemon] health_port</code>) et indiquez l’adresse de llama.cpp dans son formulaire.')}

<h2>3. Votre première conversation</h2>
<p>Vient ensuite une étape facultative, <strong>Reach it from your phone</strong> : connectez un bot Telegram, Slack ou Discord avec son token (l’étape est terminée une fois que votre premier message y a reçu une réponse), ou appuyez sur <strong>Not now</strong>. Puis votre première conversation s’ouvre. Son message d’accueil explique ce que l’agent fait de lui-même, ce qu’il vous demande en premier, et propose des invites sur lesquelles appuyer. Pour parler plus tard à votre agent depuis Telegram, Slack ou Discord, utilisez <strong>Settings &rarr; Reach it from your phone</strong> : connectez un bot avec son token, et cette étape est terminée une fois que votre premier message y a reçu une réponse.</p>

<h2>Configuration depuis un terminal</h2>
<p>Sans <code>config.toml</code> dans son dossier (le dossier depuis lequel il est lancé), <code>aidaemon</code> exécute le <em>mode de configuration</em> : le Client Gateway sur son adresse de bouclage habituelle (port 8788) sans aucun agent derrière, plus un lien et un code à usage unique pour un appareil situé ailleurs. Le premier appareil à l’utiliser devient l’appareil propriétaire. <code>aidaemon setup</code> prend plutôt l’étape du modèle dans le terminal. L’ancien assistant de configuration interactif a disparu ; <code>aidaemon setup low-latency</code> est inchangé. Un second daemon sur la même machine peut utiliser un autre port de configuration avec <code>AIDAEMON_GATEWAY_PORT</code>.</p>
`
  },
  {
    slug: '/app',
    section: 'App',
    title: 'L’application AIDaemon',
    description: 'L’application AIDaemon pour le bureau, le web et le terminal : chat, approbations, vues en direct du navigateur de l’agent, fichiers de projet, Read aloud (lecture à voix haute), réglages et utilisation.',
    content: () => `
<h1>L’application AIDaemon</h1>
<p class="lead">Une seule application pour le bureau, le web et le terminal : discutez avec votre agent, répondez à ses demandes d’approbation, regardez son travail et modifiez ses réglages.</p>

<h2>L’ouvrir</h2>
<table class="config-table">
<thead><tr><th>Où</th><th>Comment</th></tr></thead>
<tbody>
<tr><td>Fenêtre de bureau</td><td>Ouvrez AIDaemon (macOS, Windows), ou lancez <code>aidaemon-app</code> (Linux). Une fois configurée, <code>aidaemon app</code> lancé depuis <code>~/.aidaemon</code> fonctionne aussi.</td></tr>
<tr><td>Terminal</td><td><code>aidaemon-app --tui</code>, ou <code>aidaemon tui</code> lancé depuis <code>~/.aidaemon</code></td></tr>
<tr><td>Navigateur sur cette machine</td><td><code>aidaemon web</code> (lancé depuis <code>~/.aidaemon</code>) ouvre la version web et l’appaire (confirmez dans le terminal)</td></tr>
<tr><td>Téléphone ou autre ordinateur</td><td>Appairez-le, puis ouvrez l’adresse de la passerelle. Voir <a href="/app/gateway">Client Gateway et appairage</a>.</td></tr>
</tbody>
</table>
<p>L’application communique avec le daemon via le <a href="/app/gateway">Client Gateway</a>. Les téléchargements et l’installateur le configurent pour vous ; si la passerelle est désactivée, l’application explique comment l’activer.</p>

<h2>Discuter</h2>
<ul>
  <li><strong>Les réponses arrivent en continu</strong> au fur et à mesure que le modèle les écrit (web et bureau).</li>
  <li><strong>Read aloud</strong> (lecture à voix haute) &mdash; sous une réponse, à côté de Copy, Read aloud la dit avec la voix propre au système : la synthèse vocale du navigateur dans l’application web, <code>say</code> sur macOS, les voix intégrées de Windows, et <code>spd-say</code> ou <code>espeak-ng</code> (ou <code>espeak</code>) sur Linux. Si aucun de ceux-ci n’est installé sur Linux, il n’y a pas de bouton. Les blocs de code sont dits « (code) » et les liens par leur texte.</li>
  <li><strong>Dictation</strong> (dictée) &mdash; dans l’application web grâce à la reconnaissance vocale du navigateur, et dans l’application macOS grâce à celle du système. Appuyer sur Send met fin à la dictée.</li>
  <li><strong>Quel modèle a répondu</strong> &mdash; sous chaque réponse, après son heure et Copy, le fournisseur et le modèle qui l’ont réellement écrite (un basculement de secours est nommé quand il a répondu).</li>
  <li><strong>Edit et Send again</strong> (modifier et renvoyer) &mdash; chaque message que vous avez envoyé propose Copy, Edit et Send again. Les deux ajoutent un nouveau message à la fin, donc rien de ce qui précède n’est perdu.</li>
  <li><strong>Archive</strong> &mdash; archivez ou restaurez une conversation depuis son menu. Les conversations archivées se trouvent sous Archived (archivées) dans le filtre de la barre latérale, et la recherche les parcourt aussi. Écrire dans un chat archivé le ramène.</li>
  <li><strong>Tirer pour actualiser</strong> &mdash; tirez une liste vers le bas au-delà de son début, ou sur ordinateur appuyez sur Cmd/Ctrl+R. De retour après 30 secondes ou plus d’absence, l’application se remet à jour toute seule.</li>
  <li><strong>Les étapes survivent à une reconnexion</strong> &mdash; se reconnecter pendant un tour montre ce que chaque étape a reçu et ce qu’elle a rendu.</li>
</ul>

<h2>Clavier</h2>
<p>L’application est pensée pour le clavier : <kbd>Esc</kbd> arrête le travail de la session, <kbd>y</kbd>/<kbd>s</kbd>/<kbd>a</kbd>/<kbd>n</kbd> répondent à une carte d’approbation une fois qu’elle est restée assez longtemps à l’écran pour être lue, et une seule palette (<kbd>Ctrl/Cmd+K</kbd>) contient les sessions et les commandes. La ligne d’état indique toujours si le daemon est connecté, en reconnexion, arrêté, ou s’il a déconnecté l’appareil.</p>

<h2>Approbations</h2>
<p>Chaque carte d’approbation de chaque chat peut recevoir sa réponse depuis l’application ; la première réponse l’emporte, et la carte du chat indique ensuite qui a répondu. La première carte sur chaque appareil explique ce que l’agent demande et ce que fait chaque réponse.</p>

<h2>Vues en direct : regarder et prendre la main</h2>
<p>L’en-tête d’une conversation ouvre une vue en direct du navigateur de l’agent : regardez-le travailler, prenez le contrôle, puis rendez-le. Sur téléphone, cela fonctionne comme un navigateur (toucher pour cliquer, glisser pour faire défiler, pincer pour zoomer, saisir avec le clavier du téléphone) ; avec une souris et un clavier, cela fonctionne comme une fenêtre de bureau à distance. Quand l’agent a besoin de vous (une connexion, un captcha), il vous passe l’onglet avec une carte de prise en main sur chaque canal (Open the live view, Done, Not now). Vous saisissez vous-même l’identifiant ; l’agent ne le voit jamais.</p>
<p>Avec <code>[surfaces] desktop = true</code> (désactivé par défaut, macOS avec computer use), les écrans de cet ordinateur peuvent être regardés et pilotés de la même façon, et <code>aidaemon share-screen</code> appaire une seule fois un autre ordinateur et partage son écran principal. Voir <a href="/configuration">Configuration &rarr; [surfaces]</a>.</p>

<h2>Projets et fichiers</h2>
<p>Le volet de détails d’une conversation de code a un onglet <strong>Files</strong>, et la page d’un projet ouvre son dossier : en lecture seule, avec les changements de git signalés, les fichiers ignorés sur demande, et les secrets affichés par leur nom seulement. Les images et les PDF s’affichent en aperçu. Les projets peuvent être épinglés, triés et supprimés depuis leur menu (supprimer un projet laisse son dossier intact sur le disque).</p>
<p>Une conversation dans un projet conserve ce qu’elle apprend dans les notes propres à ce projet, sous <code>~/.aidaemon/projects/&lt;project-id&gt;/memory/</code>, à part de votre mémoire personnelle. Elle reçoit aussi les compétences du dépôt lui-même (<code>.agents/skills</code>, <code>.claude/skills</code>) et peut démarrer les serveurs MCP que déclare son <code>.mcp.json</code>, chacun seulement après que vous avez approuvé sa commande exacte. Votre propre <code>~/.aidaemon/AGENTS.md</code> est chargé comme fichier d’instructions le plus général de chaque projet.</p>

<h2>Agents de code</h2>
<p>Chaque agent de code s’exécute dans un mode de permission que vous choisissez par agent dans Settings, et Settings montre si chacun peut travailler maintenant. Voir <a href="/tools/cli-agents">Délégation à des agents CLI</a>.</p>

<h2>Settings</h2>
<p>La page Settings (bureau, web et terminal) montre chaque réglage que <code>config.toml</code> contient ou documente, par table, avec sa valeur ou sa valeur par défaut, si le modifier demande d’abord confirmation, et s’il prend effet après un rechargement ou un redémarrage. Modifiez les réglages sur place, stockez les secrets dans le trousseau, changez de fournisseur et ajoutez des fournisseurs de secours, gérez les serveurs MCP et les bots, puis Reload ou Restart. Les changements sensibles pour la sécurité (secrets, <code>base_url</code>, utilisateurs autorisés, la passerelle, commandes MCP et d’agents CLI) attendent votre approbation comme n’importe quelle carte.</p>
<p>Settings montre aussi <strong>ce que chaque compte a utilisé et ce qu’il lui reste</strong> : les limites sur 5 heures et hebdomadaires d’un forfait ChatGPT et le solde d’une clé OpenRouter, chacun avec une jauge et sa réinitialisation.</p>

<h2>Automatisations</h2>
<p>Les planifications peuvent nommer un fuseau horaire IANA (« chaque jour de semaine à 8h Europe/Madrid ») et suivre son heure d’été. Les cartes d’automatisation montrent le fuseau de la planification et les exécutions à votre heure ; une exécution manquée pendant que le daemon était arrêté est listée comme Missed. Voir <a href="/scheduler">Tâches planifiées</a>.</p>
`
  },
  {
    slug: '/app/gateway',
    section: 'App',
    title: 'Client Gateway et appairage',
    description: 'Le Client Gateway sert l’application AIDaemon et les appareils appairés : clés de configuration, commandes, appairage, tunnels et protocole client.',
    content: () => `
<h1>Client Gateway et appairage</h1>
<p class="lead">Le Client Gateway sert le protocole client AIDaemon à vos propres applications et aux appareils appairés. Il n’écoute que sur la boucle locale ; les autres appareils le joignent par un tunnel.</p>

<h2>L’activer</h2>
<p>Les téléchargements macOS et Windows et la configuration du premier lancement l’activent pour vous. À la main :</p>
${codeBlock(`[client_gateway]
enabled = true
# bind = "127.0.0.1"
# port = 8788
# public_url = "https://aidaemon.example.ts.net"   # your HTTPS tunnel, for pairing links`, 'toml', 'config.toml')}
<p>Ou demandez à l’agent d’« activer le client gateway » : <code>manage_config</code> le fait en une seule étape approuvée, puis redémarre. Tout changement d’une clé <code>client_gateway</code> nécessite l’approbation du propriétaire.</p>

${configTable([
  ['enabled', 'bool', 'false', 'Sert le Client Gateway'],
  ['bind', 'string', '"127.0.0.1"', 'Adresse d’écoute. Doit être la boucle locale : une adresse qui n’est pas de bouclage est refusée.'],
  ['port', 'integer', '8788', 'Port d’écoute'],
  ['token_file', 'string', 'null', 'Où est conservé le hash du token local. Vide : <code>~/.aidaemon/client-gateway-token.sha256</code>.'],
  ['retention_days', 'integer', '7', 'Fenêtre de reprise. Un client plus en retard reçoit un instantané.'],
  ['max_events', 'integer', '100000', 'Nombre maximal d’événements que conserve le journal de reprise'],
  ['watch_risk_ceiling', 'string', '"medium"', 'Risque le plus élevé qu’une montre appairée peut approuver ; au-dessus, une montre ne peut que refuser'],
  ['public_url', 'string', 'null', 'L’adresse HTTPS que les appareils appairés utilisent, placée dans les liens d’appairage'],
  ['app_dir', 'string', 'null', 'Répertoire de la version web de l’application, servie à <code>/client/v1/next/</code>. L’installateur la place dans <code>~/.aidaemon/app-web</code>. Vide : cette version installée est servie lorsqu’elle est présente.'],
])}

<h2>Points d’accès</h2>
<ul>
  <li><code>/client/v1/ws</code> &mdash; WebSocket</li>
  <li><code>POST /client/v1/commands</code> et long-poll <code>GET /client/v1/events</code></li>
  <li><code>/client/v1/next/</code> &mdash; l’application web (<code>/client/v1/app</code> y redirige)</li>
</ul>
<p>Le protocole client actuel est la <strong>1.39</strong>. Les clients reprennent à leur dernier événement sans perte ni doublon.</p>

<h2>Le token local</h2>
<p>Les applications sur la même machine se connectent avec le token local enregistré dans <code>~/.aidaemon/client-token</code> (réservé au propriétaire), créé à la première utilisation. <code>aidaemon client-token</code> en crée un nouveau et l’y enregistre (l’ancien token cesse aussitôt de fonctionner) ; ajoutez <code>--print</code> pour l’afficher pour des scripts. Lancez <code>aidaemon client-token</code>, <code>aidaemon pair</code> et <code>aidaemon web</code> depuis <code>~/.aidaemon</code>, le dossier du daemon.</p>

<h2>Appairer des téléphones et des navigateurs</h2>
<ol>
  <li>Envoyez <code>/pair_device</code> dans un chat, ou lancez <code>aidaemon pair</code> dans un terminal depuis <code>~/.aidaemon</code> (il affiche un QR code). Cela crée un code à usage unique valable dix minutes.</li>
  <li>Ouvrez le lien sur l’appareil. Il échange le code avec sa propre clé.</li>
  <li>Confirmez dans ce chat ou ce terminal.</li>
</ol>
<p>Chaque appareil appairé reçoit des tokens de courte durée qui portent ses portées (observe, chat, approve, et control pour les vues en direct). <code>/devices</code> liste les appareils et <code>/revoke_device &lt;id&gt;</code> met fin aussitôt aux tokens et aux connexions ouvertes d’un appareil.</p>

<h2>Le joindre depuis d’autres appareils</h2>
<p>La passerelle n’écoute que sur la boucle locale. Laissez le daemon gérer lui-même le tunnel :</p>
${codeBlock(`[exposure.client_gateway]
adapter = "tailscale"        # private to your tailnet; mode = "funnel" makes it public`, 'toml', 'config.toml')}
<p>Adaptateurs : <code>tailscale</code> (<code>serve</code> ou <code>funnel</code>), <code>cloudflare</code> (<code>named</code>, ou <code>quick</code> pour une adresse jetable), <code>manual</code> (l’<code>url</code> d’un reverse proxy que vous gérez) et <code>command</code>. <code>cloudflared</code> ou <code>tailscale</code> doit se trouver dans le <code>PATH</code>, ou être nommé avec <code>binary = "..."</code>. Les changements s’appliquent après un redémarrage ; <code>/exposure</code> montre l’état de chaque tunnel. Un tunnel SSH vers le port 8788 fonctionne aussi.</p>
`
  },
  {
    slug: '/configuration',
    section: 'Configuration',
    title: 'Référence complète de config.toml',
    description: 'Référence complète de config.toml pour aidaemon. Toutes les sections de configuration, clés, types et valeurs par défaut.',
    content: () => `
<h1>Configuration</h1>
<p class="lead">Référence complète de <code>config.toml</code>. Toutes les sections et leurs valeurs par défaut.</p>

<h2>[provider]</h2>
${configTable([
  ['kind', 'string', '"openai_compatible"', 'Type de fournisseur : <code>openai_compatible</code>, <code>openai_chatgpt</code>, <code>anthropic</code>, <code>google_genai</code> ou <code>xai_native</code>. Voir <a href="/providers">Fournisseurs</a>.'],
  ['api_key', 'string', '—', 'Clé d’API du fournisseur (obligatoire)'],
  ['gateway_token', 'string', 'null', 'Token Cloudflare AI Gateway facultatif, utilisé comme <code>cf-aig-authorization</code>'],
  ['base_url', 'string', '"https://api.openai.com/v1"', 'URL de base de l’API (à définir pour tout service <code>openai_compatible</code> autre qu’OpenAI ; facultatif pour <code>anthropic</code>, avec ou sans <code>/v1</code>)'],
  ['reasoning_effort', 'string', 'null', 'Réflexion étendue, par ex. <code>low</code>, <code>medium</code>, <code>high</code>, <code>off</code>'],
  ['max_tokens', 'integer', 'null', 'Plafond de sortie par appel'],
  ['extra_headers', 'table', 'null', 'En-têtes HTTP supplémentaires envoyés à chaque appel (les valeurs peuvent être <code>"keychain"</code>)'],
  ['auto_upgrade', 'bool', 'true', 'Fait passer le modèle utilisé à la version la plus récente de sa lignée dès que le fournisseur la liste (vérifié chaque jour, validé d’abord par un appel d’outil). Les fournisseurs facturés au token sont seulement prévenus. Voir <a href="/providers">Fournisseurs</a>.'],
])}

<h2>[[provider.fallbacks]]</h2>
<p>Fournisseurs de secours ordonnés, entre fournisseurs différents, chacun avec les mêmes clés que <code>[provider]</code> et son propre <code>[provider.fallbacks.models]</code>. Un fournisseur dont le quota, le crédit ou la clé échoue est ignoré jusqu’à sa réinitialisation annoncée.</p>

<h2>[provider.models]</h2>
${configTable([
  ['primary', 'string', '(provider default)', 'Modèle par défaut pour les requêtes générales'],
  ['fast', 'string', '(provider default)', 'Modèle à faible latence pour les tours simples (préférez les modèles instruct sans raisonnement)'],
  ['smart', 'string', '(provider default)', 'Modèle pour les tours d’exécution complexes (peut être le même que primary)'],
  ['default', 'string', '—', 'Le modèle des requêtes normales (<code>primary</code> en est l’ancien nom)'],
  ['fallback', 'array', '[]', 'Modèles de secours essayés dans l’ordre lorsque des appels échouent'],
])}

${callout('info', 'Modèles par défaut', 'Les valeurs par défaut adaptées au fournisseur sont renseignées automatiquement par la configuration du premier lancement (à partir du catalogue du fournisseur) et peuvent changer d’une version à l’autre à mesure que les catalogues évoluent. En production, fixez des identifiants de modèle explicites dans <code>[provider.models]</code>. Si les trois niveaux désignent le même modèle, le routage automatique est désactivé. Voir <a href="/router">Routage de modèles</a>.')}
${callout('warn', 'Conseil pour le niveau Fast', 'Définissez <code>provider.models.fast</code> sur un modèle d’instruction bon marché et sans raisonnement pour le routage. Évitez les modèles de raisonnement/réflexion dans <code>fast</code> : ils augmentent généralement la consommation de tokens et la latence sans bénéfice pour le routage.')}

<h2>[telegram]</h2>
${configTable([
  ['bot_token', 'string', '—', 'Token du bot Telegram obtenu auprès de @BotFather (obligatoire)'],
  ['allowed_user_ids', 'array', '[]', 'Identifiants numériques d’utilisateurs Telegram autorisés à discuter. Vide : la première personne qui écrit directement au bot en devient le propriétaire, et personne d’autre n’est autorisé.'],
])}

<h2>[slack]</h2>
<p>Nécessite l’indicateur de fonctionnalité <code>slack</code> à la compilation. Voir <a href="/slack">Slack</a> pour le guide de configuration complet.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Active le canal Slack'],
  ['app_token', 'string', '—', 'Token au niveau de l’application Slack pour Socket Mode (<code>xapp-...</code>)'],
  ['bot_token', 'string', '—', 'Token de bot Slack pour l’API Web (<code>xoxb-...</code>)'],
  ['allowed_user_ids', 'array', '[]', 'Identifiants d’utilisateurs Slack autorisés à interagir. Vide : la première personne qui écrit directement au bot en devient le propriétaire, et personne d’autre n’est autorisé.'],
  ['use_threads', 'bool', 'true', 'Répond dans des fils par défaut'],
])}

<h2>[discord]</h2>
<p>Nécessite l’indicateur de fonctionnalité <code>discord</code> à la compilation. Voir <a href="/discord">Discord</a> pour le guide de configuration complet.</p>
${configTable([
  ['bot_token', 'string', '&mdash;', 'Token du bot Discord obtenu dans le Developer Portal'],
  ['allowed_user_ids', 'array', '[]', 'Identifiants d’utilisateurs Discord autorisés à interagir. Vide : la première personne qui écrit directement au bot en devient le propriétaire, et personne d’autre n’est autorisé.'],
  ['guild_id', 'integer', 'null', 'Identifiant facultatif de guilde/serveur pour limiter le bot à un seul serveur'],
])}

<p>Pour plus d’un bot, utilisez <code>[[telegram_bots]]</code>, <code>[[slack_bots]]</code> ou <code>[[discord_bots]]</code> : une entrée par bot, avec les mêmes clés de token et d’utilisateurs.</p>

<h2>[state]</h2>
${configTable([
  ['db_path', 'string', '"aidaemon.db"', 'Chemin du fichier de base SQLite'],
  ['working_memory_cap', 'integer', '50', 'Nombre maximal de messages par session conservés en mémoire'],
  ['consolidation_interval_hours', 'integer', '6', 'Heures entre deux consolidations de la mémoire'],
  ['max_facts', 'integer', '20', 'Nombre maximal de faits injectés dans le prompt système'],
  ['daily_token_budget', 'integer', 'null', 'Ignoré depuis la 0.20.0 (consigné une fois au démarrage). Plafonnez la dépense avec une limite de dépense du fournisseur ; les budgets par objectif et <code>subagents.task_token_budget</code> s’appliquent toujours.'],
  ['encryption_key', 'string', 'null', 'Clé de chiffrement SQLCipher (nécessite la fonctionnalité <code>encryption</code>). AES-256 au repos.'],
  ['upgrade_backups', 'integer', '2', 'Instantanés conservés dans <code>backups/</code> à côté de la base, un écrit lorsqu’une nouvelle version d’aidaemon démarre dessus pour la première fois. <code>0</code> le désactive.'],
])}

<h3>[state.retention]</h3>
<p>Nettoyage automatique des anciennes données, en jours. <code>0</code> désactive le nettoyage pour ce type.</p>
${configTable([
  ['messages_days', 'integer', '90', 'Messages consolidés'],
  ['diagnostic_events_days', 'integer', '7', 'Événements de diagnostic et d’outils consolidés'],
  ['superseded_facts_days', 'integer', '90', 'Anciennes versions des faits'],
  ['token_usage_aggregate_days', 'integer', '30', 'L’utilisation brute de tokens est regroupée en totaux quotidiens après ce délai'],
  ['episodes_days', 'integer', '365', 'Épisodes jamais rappelés'],
  ['goals_days', 'integer', '180', 'Objectifs terminés ou abandonnés'],
])}

<h2>[memory]</h2>
${configTable([
  ['backend', 'string', '"daemon"', '<code>daemon</code> (mémoire intégrée) ou <code>sdk</code> (la crate aidaemon-memory ; compilez avec <code>--features sdk-memory</code>)'],
  ['path', 'string', '"aidaemon-memory.db"', 'Fichier SQLite du backend <code>sdk</code>'],
  ['embedding_model', 'string', '"AllMiniLML6V2Q"', 'Modèle fastembed local, par ex. <code>AllMiniLML6V2</code>, <code>BGESmallENV15</code>, <code>BGEBaseENV15</code>, <code>ParaphraseMLMiniLML12V2</code>. Le changer recalcule une fois les embeddings de la mémoire stockée, en arrière-plan.'],
  ['project_memory', 'bool', 'true', 'Une conversation placée dans un projet conserve ce qu’elle apprend dans les notes propres à ce projet'],
  ['projects_dir', 'string', '"~/.aidaemon/projects"', 'Où se trouvent les notes de projet (un répertoire par identifiant de projet)'],
])}

<h2>[terminal]</h2>
${configTable([
  ['allowed_prefixes', 'array', '(see below)', 'Préfixes de commande approuvés automatiquement sans confirmation de l’utilisateur'],
  ['initial_timeout_secs', 'integer', '30', 'Délai d’attente, en secondes, pour l’exécution initiale d’une commande'],
  ['max_output_chars', 'integer', '4000', 'Tronque la sortie des commandes au-delà de cette longueur'],
  ['permission_mode', 'string', '"default"', 'Mode de permission selon le risque : <code>default</code>, <code>cautious</code> ou <code>yolo</code>. Voir <a href="/tools/command-risk">Risque des commandes</a>.'],
  ['confinement', 'string', '"host"', '<code>host</code> exécute les commandes sous votre identité ; <code>sandbox</code> exécute chacune dans le bac à sable du système (seatbelt sur macOS, bubblewrap ou le bac à sable de Codex sur Linux) avec un accès aux fichiers et au réseau limité à la tâche'],
])}

<p>Préfixes autorisés par défaut :</p>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

${callout('warn', 'Opérateurs du shell', 'Une commande enchaînée (<code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code>) s’exécute sans demander uniquement si chaque partie commence par un programme présent dans <code>allowed_prefixes</code>. Les commandes avec <code>$()</code> ou des backticks, les redirections vers des fichiers, ou les programmes lancés par un autre programme demandent toujours.')}

<h2>[daemon]</h2>
${configTable([
  ['health_port', 'integer', '8080', 'Port du point d’accès HTTP de vérification de santé'],
  ['health_bind', 'string', '"127.0.0.1"', 'Adresse d’écoute. Utilisez "0.0.0.0" pour un accès externe.'],
  ['dashboard_enabled', 'bool', 'true', 'Sert aussi le rappel OAuth et le webhook de réveil des mandats sur le port de santé'],
])}

<h2>[triggers.email]</h2>
${configTable([
  ['host', 'string', '—', 'Nom d’hôte du serveur IMAP (par ex. imap.gmail.com)'],
  ['port', 'integer', '—', 'Port IMAP (généralement 993 pour TLS)'],
  ['username', 'string', '—', 'Nom d’utilisateur du compte e-mail'],
  ['password', 'string', '—', 'Mot de passe du compte e-mail ou mot de passe d’application'],
  ['folder', 'string', '"INBOX"', 'Dossier IMAP à surveiller'],
])}

<h2>[mcp.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Chemin ou nom de l’exécutable du serveur MCP'],
  ['args', 'array', '[]', 'Arguments de ligne de commande'],
  ['env', 'table', '{}', 'Variables d’environnement du serveur'],
  ['read_only_tools', 'array', '[]', 'Outils de ce serveur que vous déclarez en lecture seule ; leurs appels ne demandent pas d’abord'],
])}

<h2>[browser]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Active l’outil d’automatisation du navigateur'],
  ['headless', 'bool', 'true', 'Exécute Chrome sans fenêtre visible'],
  ['screenshot_width', 'integer', '1280', 'Largeur de la zone d’affichage du navigateur en pixels'],
  ['screenshot_height', 'integer', '720', 'Hauteur de la zone d’affichage du navigateur en pixels'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Répertoire du profil Chrome pour les sessions persistantes'],
  ['profile', 'string', 'Default', 'Nom du profil Chrome dans user_data_dir'],
  ['remote_debugging_port', 'integer', 'null', 'Se connecte à un Chrome existant sur ce port (avancé)'],
  ['keep_sign_ins', 'bool', 'true', 'Conserve les connexions dans le profil de navigateur propre à l’agent, pour que vous ne vous connectiez qu’une fois à un site'],
])}

<h2>[skills]</h2>
${configTable([
  ['dir', 'string', '"skills"', 'Répertoire contenant les fichiers markdown des compétences'],
  ['enabled', 'bool', 'true', 'Active le système de compétences'],
  ['registries', 'array', '[]', 'URL de manifestes JSON de registres de compétences pour parcourir et installer des compétences'],
])}

<h2>[subagents]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Autorise l’agent à lancer des sous-agents'],
  ['max_depth', 'integer', '3', 'Niveau d’imbrication maximal de la récursion des sous-agents'],
  ['max_iterations', 'integer', '10', 'Hérité. Les sous-agents n’ont pas de limite d’étapes par défaut ; la définir (ou <code>max_iterations_cap</code>, 25 par défaut) passe à une limite stricte.'],
  ['max_response_chars', 'integer', '8000', 'Tronque les réponses des sous-agents au-delà de cette longueur'],
  ['timeout_secs', 'integer', '300', 'Secondes pendant lesquelles un sous-agent peut rester sans progresser (aucun appel d’outil, aucune réponse du modèle) avant d’être arrêté. Cela ne limite jamais la durée totale d’exécution.'],
])}

<h2>[client_gateway]</h2>
<p>Sert l’<a href="/app">application AIDaemon</a> et les appareils appairés. Référence complète : <a href="/app/gateway">Client Gateway et appairage</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Sert le Client Gateway'],
  ['bind', 'string', '"127.0.0.1"', 'Boucle locale uniquement'],
  ['port', 'integer', '8788', 'Port d’écoute'],
  ['public_url', 'string', 'null', 'Adresse du tunnel HTTPS pour les liens d’appairage'],
])}

<h2>[surfaces]</h2>
<p>Vues en direct : regardez le navigateur de l’agent et prenez la main depuis une application appairée.</p>
${configTable([
  ['enabled', 'bool', 'true', 'Propose les vues en direct'],
  ['allow_control', 'bool', 'true', 'Autorise la prise de contrôle, pas seulement l’observation'],
  ['control_anytime', 'bool', 'true', 'Prend le contrôle sans que l’agent le demande ; <code>false</code> : seulement pendant une passation'],
  ['desktop', 'bool', 'false', 'macOS avec <code>[computer_use]</code> : regarde et pilote aussi les écrans de cet ordinateur'],
  ['max_live_sessions', 'integer', '8', 'Nombre de vues en direct ouvertes en même temps'],
  ['max_fps', 'integer', '20', 'Nombre maximal d’images par seconde que reçoit une vue'],
  ['max_width', 'integer', '1280', 'Largeur maximale d’image que reçoit une vue'],
  ['disconnect_grace_secs', 'integer', '30', 'Le contrôle revient à l’agent ce délai après que votre appareil cesse de regarder'],
  ['idle_release_secs', 'integer', '900', 'Le contrôle revient à l’agent après ce délai sans aucune saisie'],
])}

<h2>[cli_agents]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Active l’outil de délégation à des agents CLI'],
  ['timeout_secs', 'integer', '600', 'Passé ce délai, un agent CLI continue de s’exécuter en arrière-plan et son résultat est remis lorsqu’il se termine'],
  ['max_output_chars', 'integer', '16000', 'Longueur maximale globale de la sortie des agents CLI'],
])}

<h2>[cli_agents.tools.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Commande à exécuter'],
  ['args', 'array', '[]', 'Arguments par défaut passés à la commande'],
  ['description', 'string', '—', 'Description de l’outil montrée au LLM'],
  ['timeout_secs', 'integer', 'null', 'Remplace le délai global pour cet outil'],
  ['max_output_chars', 'integer', 'null', 'Remplace la sortie maximale globale pour cet outil'],
  ['protocol', 'string', 'null', '<code>"acp"</code> héberge un agent qui parle l’Agent Client Protocol ; chaque action qu’il entreprend demande d’abord'],
])}

<h2>[search]</h2>
${configTable([
  ['backend', 'string', '"duckduckgo"', 'Moteur de recherche : <code>duckduckgo</code> (aucune clé nécessaire), <code>brave</code> ou <code>searxng</code>'],
  ['api_key', 'string', '""', 'Clé d’API pour la recherche Brave (prend en charge <code>"keychain"</code>)'],
  ['searxng_url', 'string', '""', 'Adresse de votre propre instance SearxNG'],
  ['parallel', 'bool', 'true', 'Interroge tous les moteurs configurés en même temps et fusionne les résultats'],
])}

<h2>[heartbeat]</h2>
<p>Exécute les tâches planifiées et le travail en arrière-plan. Les planifications se créent en le demandant à l’agent dans le chat ou dans l’application, pas dans ce fichier ; une ancienne section <code>[scheduler]</code> est ignorée. Voir <a href="/scheduler">Tâches planifiées</a>.</p>
${configTable([
  ['enabled', 'bool', 'true', 'Exécute le travail planifié et d’arrière-plan'],
  ['tick_interval_secs', 'integer', '30', 'Fréquence de vérification du travail à effectuer'],
  ['max_concurrent_llm_tasks', 'integer', '3', 'Nombre maximal de tâches s’appuyant sur un modèle exécutées en même temps'],
])}

<h2>[files]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Active les outils de transfert de fichiers (envoi/réception)'],
  ['inbox_dir', 'string', '"~/.aidaemon/files/inbox"', 'Répertoire des fichiers reçus depuis Telegram'],
  ['outbox_dirs', 'array', '["~"]', 'Répertoires depuis lesquels l’agent a le droit d’envoyer des fichiers'],
  ['max_file_size_mb', 'integer', '10', 'Taille maximale de fichier pour les transferts, en Mo'],
  ['retention_hours', 'integer', '24', 'Heures de conservation des fichiers reçus avant nettoyage'],
])}

<h2>[agent]</h2>
${configTable([
  ['name', 'string', '"aidaemon"', 'Le nom de l’assistant'],
  ['persona_file', 'string', 'null', 'Fichier markdown de persona (les chemins relatifs se résolvent à côté de <code>config.toml</code>)'],
])}

<h2>[execution]</h2>
<p>Où s’exécutent les commandes et les outils de fichiers de l’agent.</p>
${configTable([
  ['backend', 'string', '"local"', '<code>local</code>, <code>docker</code> (réglages dans <code>[execution.docker]</code>) ou <code>ssh</code> (réglages dans <code>[execution.ssh]</code>)'],
  ['workspace_root', 'string', 'null', 'Répertoire de travail pour les chemins relatifs. Valeur locale par défaut : le dossier du daemon.'],
  ['allow_outside_workspace', 'bool', 'true (local)', 'Laisse les outils fondés sur des chemins sortir de <code>workspace_root</code>. Faux par défaut pour les backends distants.'],
])}

<h2>[checkpoints]</h2>
<p>Bêta : un instantané Git fantôme de l’espace de travail avant la première modification de fichier de chaque tour. <code>enabled = false</code> par défaut.</p>

<h2>[computer_use]</h2>
<p>Pilotage d’applications macOS natives (compilez avec <code>--features computer_use-macos</code>). <code>enabled = false</code> par défaut.</p>

<h2>[exposure.client_gateway]</h2>
<p>Un tunnel que le daemon gère pour que d’autres appareils puissent joindre l’application. Voir <a href="/app/gateway">Client Gateway et appairage</a>.</p>

<h2>Gestion des secrets</h2>
<p>Les valeurs de configuration sensibles prennent en charge deux méthodes de résolution en plus du texte brut, ainsi qu’un mode de stockage facultatif réservé aux variables d’environnement :</p>

<h3>Trousseau du système</h3>
<p>Définissez n’importe quel champ secret à <code>"keychain"</code> pour le résoudre depuis le trousseau du système (macOS Keychain, Windows Credential Manager, Linux secret-service) :</p>
${codeBlock(`[provider]
api_key = "keychain"    # Resolved from keychain entry "api_key"

[telegram]
bot_token = "keychain"  # Resolved from keychain entry "bot_token"`, 'toml')}

<p>Enregistrez les valeurs avec la commande <code>keychain</code> avant le premier lancement :</p>
${codeBlock(`# Store a secret (prompts interactively)
aidaemon keychain set api_key
aidaemon keychain set bot_token

# Verify a stored secret (shows masked value)
aidaemon keychain get api_key

# Remove a secret
aidaemon keychain delete api_key`, 'bash')}

${callout('tip', 'Sécurité', 'La commande <code>set</code> demande la valeur de façon interactive avec confirmation, ce qui garde les secrets hors de l’historique de votre shell.')}

<h3>Variables d’environnement</h3>
<p>Utilisez la syntaxe <code>\${VAR_NAME}</code> n’importe où dans les valeurs de configuration :</p>
${codeBlock(`[provider]
api_key = "\${GOOGLE_API_KEY}"

[telegram]
bot_token = "\${TELEGRAM_BOT_TOKEN}"`, 'toml')}

<h3>Mode variables d’environnement seules (sans trousseau)</h3>
<p>Si vous préférez ne pas utiliser le trousseau du système, définissez ces variables d’environnement d’exécution :</p>
${codeBlock(`# Disable OS keychain storage and use env file-backed secrets
export AIDAEMON_NO_KEYCHAIN=1

# Optional: choose a specific env file path (default: ./.env)
export AIDAEMON_ENV_FILE=/absolute/path/to/.env`, 'bash')}

<p>Dans ce mode, aidaemon lit les secrets dans le fichier d’environnement choisi (ou dans l’environnement du processus lorsqu’il n’y a pas de fichier d’environnement) et réécrit les mises à jour de secrets dans ce fichier &mdash; y compris la rotation des tokens d’accès et d’actualisation OAuth.</p>

${callout('warning', 'Sécurité du mode environnement seul', 'Gardez le fichier d’environnement privé (<code>chmod 600</code>) et hors du contrôle de version.')}

${callout('info', 'Champs compatibles avec le trousseau', 'Champs qui prennent en charge <code>"keychain"</code> : <code>provider.api_key</code>, <code>provider.gateway_token</code>, <code>telegram.bot_token</code>, <code>slack.app_token</code>, <code>slack.bot_token</code>, <code>discord.bot_token</code>, <code>triggers.email.password</code>, <code>state.encryption_key</code>, <code>search.api_key</code> et les champs de profil <code>http_auth.*</code>.')}

<p>L’entrée du trousseau que lit chaque champ (le nom à donner à <code>aidaemon keychain set</code>) :</p>
<ul>
  <li><code>provider.api_key</code> &rarr; <code>api_key</code> ; la première entrée <code>[[provider.fallbacks]]</code> &rarr; <code>provider_fallback_0_api_key</code></li>
  <li><code>provider.gateway_token</code> &rarr; <code>gateway_token</code></li>
  <li><code>telegram.bot_token</code> &rarr; <code>bot_token</code></li>
  <li><code>slack.app_token</code> / <code>slack.bot_token</code> &rarr; <code>slack_app_token</code> / <code>slack_bot_token</code></li>
  <li><code>discord.bot_token</code> &rarr; <code>discord_bot_token</code></li>
  <li><code>triggers.email.password</code> &rarr; <code>email_password</code></li>
  <li><code>state.encryption_key</code> &rarr; <code>encryption_key</code></li>
  <li><code>search.api_key</code> &rarr; <code>search_api_key</code></li>
</ul>

<h2>[health]</h2>
<p>Système de surveillance de santé. Voir <a href="/health-monitoring">Surveillance de santé</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Active le système de surveillance de santé'],
  ['tick_interval_secs', 'integer', '30', 'Fréquence de vérification des sondes à exécuter'],
  ['result_retention_days', 'integer', '7', 'Jours de conservation des résultats des vérifications de santé'],
])}

<h2>[[health.probes]]</h2>
${configTable([
  ['name', 'string', '&mdash;', 'Nom de la sonde'],
  ['type', 'string', '&mdash;', 'Type de sonde : <code>http</code>, <code>command</code>, <code>file</code> ou <code>port</code> (<code>tcp</code>)'],
  ['target', 'string', '&mdash;', 'URL cible, commande, chemin de fichier ou hôte:port'],
  ['schedule', 'string', '&mdash;', 'Expression cron ou intervalle'],
  ['consecutive_failures_alert', 'integer', '3', 'Alerte après N échecs consécutifs'],
  ['alert_session_ids', 'array', '[]', 'Identifiants de session à notifier en cas d’alerte'],
])}

<h2>[updates]</h2>
<p>Système de mise à jour automatique. Voir <a href="/updates">Mise à jour automatique</a>.</p>
${configTable([
  ['mode', 'string', '"check_only"', 'Mode de mise à jour : enable, check_only ou disable'],
  ['check_interval_hours', 'integer', '24', 'Heures entre deux vérifications de mise à jour'],
  ['check_at_utc_hour', 'integer', 'null', 'Heure UTC précise (0-23) pour la vérification quotidienne'],
  ['confirmation_timeout_mins', 'integer', '60', 'Minutes d’attente de l’approbation de l’utilisateur'],
])}

<h2>[people]</h2>
<p>Intelligence relationnelle — un carnet de contacts personnel géré par votre assistant. Voir <a href="/tools/people">Intelligence relationnelle</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'État initial de l’intelligence relationnelle (modifiable à l’exécution via le chat)'],
  ['fact_retention_days', 'integer', '180', 'Jours avant que les faits extraits automatiquement et non confirmés soient élagués'],
  ['reconnect_reminder_days', 'integer', '30', 'Jours d’inactivité avant de suggérer de reprendre contact'],
])}

<h2>Exemple de configuration</h2>
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
    title: 'Configuration des fournisseurs',
    description: 'Configurez les fournisseurs de LLM pour aidaemon : abonnement ChatGPT, Anthropic, Google Gemini, API compatibles OpenAI, xAI, modèles locaux, fournisseurs de secours et mises à niveau de modèles.',
    content: () => `
<h1>Configuration des fournisseurs</h1>
<p class="lead">La configuration du premier lancement de l’application et sa page Settings écrivent pour vous la section <code>[provider]</code>. Cette page montre ce qu’elles écrivent, pour une modification à la main.</p>

<h2>Types de fournisseur</h2>
<table class="config-table">
<thead><tr><th>kind</th><th>Utilisé pour</th></tr></thead>
<tbody>
<tr><td><code>openai_chatgpt</code></td><td>Un forfait ChatGPT par connexion (sans clé d’API)</td></tr>
<tr><td><code>anthropic</code></td><td>L’API Messages native d’Anthropic</td></tr>
<tr><td><code>google_genai</code></td><td>L’API native de Google Gemini</td></tr>
<tr><td><code>xai_native</code></td><td>xAI (Grok)</td></tr>
<tr><td><code>openai_compatible</code> (par défaut ; <code>base_url</code> vaut par défaut <code>https://api.openai.com/v1</code>)</td><td>OpenAI, OpenRouter, DeepSeek, Moonshot, MiniMax, Cloudflare AI Gateway, Ollama, llama.cpp et toute API compatible OpenAI</td></tr>
</tbody>
</table>
<p><code>api_key = "keychain"</code> lit la clé dans le trousseau du système ; <code>api_key = "\${ENV_VAR}"</code> la lit dans l’environnement. Voir <a href="/configuration">Gestion des secrets</a>.</p>

<h2>Abonnement ChatGPT</h2>
<p>Fonctionne avec un forfait ChatGPT au lieu d’une facturation à l’usage de l’API. Connectez-vous depuis l’application, ou dans un terminal :</p>
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
<p>Lorsque la limite d’utilisation du forfait est atteinte, l’appel passe directement à vos fournisseurs de secours jusqu’à la réinitialisation annoncée. Settings montre les limites du forfait sur 5 heures et hebdomadaires.</p>

<h2>Anthropic</h2>
${codeBlock(`[provider]
kind = "anthropic"
api_key = "keychain"
# base_url = "https://api.anthropic.com/v1"   # optional; with or without /v1

[provider.models]
primary = "claude-sonnet-5-5"
fast = "claude-haiku-5-5"
smart = "claude-opus-5-5"`, 'toml')}
${callout('info', 'URL de base', 'La racine de l’API peut être donnée avec ou sans <code>/v1</code> final (le catalogue des fournisseurs utilise <code>https://api.anthropic.com/v1</code>) ; les requêtes vont toujours vers <code>/v1/messages</code>. Avant la 0.21.0, une URL de base se terminant par <code>/v1</code> était envoyée vers <code>/v1/v1/messages</code> et chaque appel échouait avec une erreur 404.')}
<h3>Cache de prompt</h3>
<p>aidaemon utilise le cache de prompt d’Anthropic. Le préfixe fixe (définitions des outils et prompt système) est mis en cache pendant une heure, de sorte qu’une réponse après une pause, ou une nouvelle conversation dans l’heure, le lit depuis le cache. La fin de la conversation garde le cache de cinq minutes. Les outils différés sont déclarés dès le départ, donc en charger un avec <code>load_tools</code> ne réécrit plus le cache. <code>reasoning_effort</code> (<code>low</code>, <code>medium</code>, <code>high</code>, <code>off</code>) correspond à la réflexion étendue.</p>

<h2>Google Gemini</h2>
<p>API native Google Generative AI, avec une clé de <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Google AI Studio</a>.</p>
${codeBlock(`[provider]
kind = "google_genai"
api_key = "keychain"

[provider.models]
primary = "gemini-4-hydrogen"
fast = "gemini-3.5-flash-lite"
smart = "gemini-4-argon"`, 'toml')}
<p>Lorsqu’une requête n’offre aucun outil, Gemini peut ancrer sa réponse avec Google Search. Les résultats d’outils sont renvoyés sous forme de parties de rôle utilisateur, comme l’exigent les modèles Gemini actuels (corrigé dans la 0.21.0 : auparavant, un tour avec un appel d’outil basculait sans cesse sur un secours et ne répondait jamais). Un quota quotidien épuisé fait passer aussitôt l’appel à vos fournisseurs de secours.</p>

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
<p>Des modèles de nombreux fournisseurs avec une seule clé et le format compatible OpenAI. Settings montre le solde de la clé. La liste des fournisseurs comprend aussi <strong>Anthropic (via OpenRouter)</strong> (<code>anthropic/claude-sonnet-4</code>, <code>anthropic/claude-haiku-4</code>, <code>anthropic/claude-opus-4</code> avec une clé OpenRouter), proposé dans Settings mais pas au premier lancement.</p>
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
<p>Se place devant les fournisseurs en amont et expose un point d’accès compatible OpenAI.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "keychain"          # upstream provider key
gateway_token = "keychain"    # optional: Authenticated Gateway mode
base_url = "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/compat"

[provider.models]
primary = "your-model-id"`, 'toml')}
${callout('info', 'Modes d’authentification Cloudflare', 'Vous pouvez fonctionner avec la seule <code>api_key</code> (mode de base), ou ajouter <code>gateway_token</code> pour envoyer <code>cf-aig-authorization</code> en mode Authenticated Gateway.')}

<h2>Ollama et llama.cpp (local)</h2>
<p>Les modèles auto-hébergés n’ont pas besoin de clé. La configuration du premier lancement liste les modèles que propose votre serveur.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = ""
base_url = "http://localhost:11434/v1"   # Ollama
# base_url = "http://localhost:8080/v1"  # llama.cpp's llama-server

[provider.models]
primary = "your-model-id"`, 'toml')}
${callout('warn', 'Adresses locales', 'Utilisez HTTPS pour tout serveur qui ne se trouve pas sur cette machine : la clé est envoyée avec chaque requête. <code>llama-server</code> et la vérification de santé du daemon utilisent tous deux le port 8080 par défaut : déplacez l’un des deux (<code>llama-server --port 8081</code>, ou <code>[daemon] health_port</code>).')}

<h2>Fournisseurs de secours</h2>
<p>Les entrées de <code>[[provider.fallbacks]]</code> sont essayées dans l’ordre après les propres modèles du fournisseur principal. Un fournisseur dont le compte ne peut pas répondre (limite d’utilisation d’un forfait, quota quotidien, plus de crédit, clé rejetée) est ignoré aussitôt et le reste jusqu’à sa réinitialisation annoncée. Changer le fournisseur principal dans Settings conserve l’ancien comme secours.</p>
${codeBlock(`[[provider.fallbacks]]
kind = "anthropic"
api_key = "keychain"
[provider.fallbacks.models]
default = "claude-sonnet-5-5"`, 'toml')}
<p><code>[provider.models]</code> accepte soit <code>primary</code> / <code>fast</code> / <code>smart</code>, soit <code>default</code> plus une liste ordonnée <code>fallback = [...]</code> de modèles essayés lorsque des appels échouent.</p>

<h2>Mises à niveau de modèles</h2>
<p>Une fois par jour, le daemon vérifie la liste de modèles de chaque fournisseur et fait passer un modèle à la version la plus récente de sa propre lignée (par exemple <code>gpt-6-sol</code> vers <code>gpt-6.2-sol</code> ; jamais une autre taille, un instantané ou une préversion). Il valide d’abord le nouveau modèle par un appel d’outil, garde l’ancien comme premier secours et vous prévient. Avec un fournisseur facturé au token, vous êtes seulement prévenu. Désactivez-le avec :</p>
${codeBlock(`[provider]
auto_upgrade = false`, 'toml')}
<p>Un choix fixé avec <code>/model</code> reporte la mise à niveau.</p>
`
  },
  {
    slug: '/telegram',
    section: 'Telegram',
    title: 'Configuration du bot',
    description: 'Configurez AIDaemon comme bot Telegram : créez un bot avec BotFather, définissez qui peut l’utiliser et utilisez éventuellement des webhooks.',
    content: () => `
<h1>Configuration du bot Telegram</h1>
<p class="lead">Telegram est le canal principal d’AIDaemon. AIDaemon parle directement à l’API Bot de Telegram, par long polling par défaut ou par un webhook facultatif pour une latence plus faible. Voir aussi <a href="/slack">Slack</a> pour l’intégration à un espace de travail.</p>

<h2>Créer un bot</h2>
<ol>
  <li>Écrivez à <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a> sur Telegram</li>
  <li>Envoyez <code>/newbot</code> et suivez les instructions</li>
  <li>Copiez le token du bot (format : <code>123456789:ABCdefGHIjklMNOpqrSTUvwxYZ</code>)</li>
</ol>

<h2>Obtenir votre identifiant d’utilisateur</h2>
<p>Votre identifiant numérique d’utilisateur Telegram est nécessaire pour la liste <code>allowed_user_ids</code>. Vous pouvez le trouver en écrivant à <a href="https://t.me/userinfobot" target="_blank" rel="noopener">@userinfobot</a>.</p>
<p>Ou écrivez simplement à votre bot : si vous n’êtes pas encore autorisé, il répond avec votre identifiant numérique et la ligne <code>allowed_user_ids</code> exacte à ajouter.</p>

<h2>Configuration</h2>
${codeBlock(`[telegram]
bot_token = "keychain"   # or the token itself, or "\${TELEGRAM_BOT_TOKEN}"
allowed_user_ids = [123456789]`, 'toml', 'config.toml')}

${callout('warn', 'Contrôle d’accès', 'Si <code>allowed_user_ids</code> est vide, la <strong>première personne qui écrit au bot en privé</strong> en devient le propriétaire, et cet identifiant est enregistré dans config.toml. Les messages de groupe sont refusés tant qu’il n’existe pas de propriétaire. Renseignez <code>allowed_user_ids</code> avant de partager le nom du bot.')}

<h2>Propriétaires et invités</h2>
<p>Les propriétaires sont listés par plateforme sous <code>[users] owner_ids</code>. Si aucun n’est défini, chaque utilisateur autorisé est propriétaire. Seuls les propriétaires peuvent répondre aux approbations et lancer les commandes qui modifient des choses ; les autres utilisateurs autorisés sont des invités.</p>
${codeBlock(`[users]
owner_ids = { telegram = ["123456789"] }`, 'toml', 'config.toml')}

<h2>Mode webhook</h2>
<p>Le long polling ne demande aucune configuration. Pour une latence de livraison plus faible, un bot peut recevoir ses mises à jour par webhook :</p>
${codeBlock(`[telegram.webhook]
enabled = true
public_url = "https://bot.example.com"
listen_addr = "0.0.0.0:8443"

# Or give every bot a webhook automatically:
# [telegram_webhook_defaults]
# enabled = true
# base_domain = "bots.example.com"   # each bot gets <slug>.bots.example.com
# port_start = 8443`, 'toml', 'config.toml')}
<p>Depuis le chat, <code>/setup lowlatency</code> vous guide pas à pas.</p>

<h2>Fonctionnalités</h2>
<ul>
  <li><strong>Indicateur de saisie</strong> &mdash; renvoyé environ toutes les 3 secondes pendant que l’agent travaille</li>
  <li><strong>Rendu Markdown</strong> &mdash; les réponses de l’agent sont converties en HTML Telegram</li>
  <li><strong>Découpage des longs messages</strong> &mdash; les réponses de plus de 4096 caractères sont coupées aux limites de paragraphe ou de ligne</li>
  <li><strong>Partage de captures d’écran</strong> &mdash; les captures d’écran du navigateur sont envoyées comme photos avec légende</li>
  <li><strong>Transfert de fichiers</strong> &mdash; envoyez et recevez documents, photos, audio et vidéo via Telegram</li>
  <li><strong>État des tâches en direct</strong> &mdash; <code>/tasks</code> montre ce qui tourne dans ce chat</li>
  <li><strong>Boutons d’approbation intégrés</strong> &mdash; boutons <strong>Allow</strong>, <strong>Always allow</strong> (ou <strong>Allow until restart</strong>) et <strong>Deny</strong> pour les approbations (voir <a href="/telegram/approval">Flux d’approbation</a>)</li>
  <li><strong>Prise en charge multi-bot</strong> &mdash; configurez plusieurs bots Telegram avec des entrées <code>[[telegram_bots]]</code>, ou ajoutez-en un depuis le chat avec <code>/connect</code></li>
  <li><strong>Gestion de fichiers améliorée</strong> &mdash; détection du type MIME, limites de taille et validation de la sécurité des chemins</li>
</ul>

<h2>Comportement de reconnexion</h2>
<p>Si la connexion du bot s’interrompt, AIDaemon la relance avec un délai exponentiel :</p>
<ul>
  <li>Délai initial : 5 s</li>
  <li>Double à chaque fois : 5 s &rarr; 10 s &rarr; 20 s &rarr; 40 s &rarr; 60 s (maximum), avec une petite gigue aléatoire</li>
  <li>Revient à 5 s si le bot reste stable pendant plus de 60 secondes</li>
</ul>
`
  },
  {
    slug: '/telegram/commands',
    section: 'Telegram',
    title: 'Commandes',
    description: 'Commandes Telegram pour AIDaemon : /clear, /tasks, /cancel, /status, /model, /cost, /mode et plus encore.',
    content: () => `
<h1>Commandes Telegram</h1>
<p class="lead">Commandes slash intégrées pour contrôler l’agent depuis Telegram. Elles apparaissent dans le menu <code>/</code> de Telegram. Vous en aurez rarement besoin : demandez simplement en langage courant et l’agent choisit les bons outils.</p>

<p><code>/help</code> (ou <code>/start</code>) affiche les commandes courantes ; <code>/help all</code> liste toutes les commandes.</p>

<h2>Conversation</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/clear</code> (ou <code>/new</code>)</td><td>Démarre une nouvelle conversation. Votre historique est conservé, et le travail en cours dans ce chat s’arrête.</td></tr>
<tr><td><code>/wipe</code></td><td>Supprime définitivement cette conversation. Le premier <code>/wipe</code> ne fait qu’expliquer ; envoyez-le de nouveau dans les quelques minutes pour l’effacer. Les faits déjà enregistrés en mémoire sont conservés.</td></tr>
<tr><td><code>/context</code></td><td>Montre quelle part de la conversation l’agent peut voir</td></tr>
<tr><td><code>/project [name|none]</code></td><td>Affiche ou change le projet dans lequel travaille ce chat</td></tr>
<tr><td><code>/memory</code></td><td>Affiche la mémoire du projet dans lequel travaille ce chat</td></tr>
</tbody>
</table>

<h2>Travail</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/tasks</code></td><td>Liste, numérotée, ce qui tourne dans ce chat</td></tr>
<tr><td><code>/cancel</code>, <code>/cancel all</code>, <code>/cancel &lt;number&gt;</code></td><td>Arrête ce qui tourne dans ce chat : tout ce qui vient d’une demande, tout, ou un seul élément (les numéros viennent de <code>/tasks</code>)</td></tr>
<tr><td><code>/status</code></td><td>Le mode de ce chat, ce qui tourne et le prochain élément planifié</td></tr>
<tr><td><code>/work [ready|running|blocked|show|comment|unblock|retry]</code></td><td>Voir et gérer le travail plus long qui attend ou s’exécute de lui-même</td></tr>
<tr><td><code>/cost</code></td><td>Affiche l’utilisation de tokens (dernières 24 h, 7 derniers jours, modèles les plus utilisés)</td></tr>
</tbody>
</table>

<h2>Modèles</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Affiche le modèle actuel</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Utilise un seul modèle pour tous les chats (désactive le choix automatique du modèle)</td></tr>
<tr><td><code>/models</code></td><td>Liste les modèles que propose votre fournisseur (le modèle actif est marqué)</td></tr>
<tr><td><code>/auto</code></td><td>Revient au choix automatique du modèle</td></tr>
</tbody>
</table>

<h2>Accès et confidentialité</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/mode [full|unrestricted|readonly]</code></td><td>Affiche ou change le mode d’accès de ce chat</td></tr>
<tr><td><code>/readonly</code></td><td>Met ce chat en lecture seule pendant 4 heures</td></tr>
<tr><td><code>/private [off]</code></td><td>Ne retient pas votre prochain message et n’en apprend rien (<code>off</code> l’annule)</td></tr>
<tr><td><code>/trustall on|off</code></td><td>Exécute chaque commande de terminal sans demander</td></tr>
</tbody>
</table>

<h2>Fichiers</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/checkpoints</code></td><td>Liste les points de contrôle du système de fichiers</td></tr>
<tr><td><code>/rollback [checkpoint-id|confirm TOKEN]</code></td><td>Prévisualise un retour à un point de contrôle, puis le confirme</td></tr>
</tbody>
</table>

<h2>Appareils</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/pair_device</code></td><td>Appaire un téléphone ou un navigateur avec l’application</td></tr>
<tr><td><code>/devices</code></td><td>Liste les appareils appairés</td></tr>
<tr><td><code>/revoke_device &lt;id&gt;</code></td><td>Désappaire un appareil</td></tr>
<tr><td><code>/exposure</code></td><td>Affiche les tunnels qui publient les passerelles</td></tr>
</tbody>
</table>

<h2>Gestion des bots</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/reload</code></td><td>Relit config.toml et applique les changements de fournisseur et de modèle (voir ci-dessous)</td></tr>
<tr><td><code>/restart</code></td><td>Redémarrage complet : lance un nouveau processus, qui prend en compte un nouveau binaire, la configuration et les serveurs MCP</td></tr>
<tr><td><code>/setkey</code></td><td>Remplace la clé d’API d’un fournisseur (fonctionne même quand aucun modèle n’est disponible ; chat privé uniquement)</td></tr>
<tr><td><code>/connect &lt;platform&gt; &lt;token&gt;</code></td><td>Ajoute un nouveau canal de bot</td></tr>
<tr><td><code>/bots</code></td><td>Liste les bots connectés</td></tr>
<tr><td><code>/setup [lowlatency]</code></td><td>Assistant de configuration (webhooks, faible latence)</td></tr>
<tr><td><code>/agent [codex|claude|gemini|opencode] [dir]</code></td><td>Démarre ou gère des sessions d’agents CLI</td></tr>
<tr><td><code>/terminal [lite|start|open]</code></td><td>Commandes du pont de terminal</td></tr>
</tbody>
</table>

${callout('info', 'Qui peut utiliser les commandes', 'La plupart des commandes sont réservées au propriétaire. Dans un chat partagé, les invités peuvent utiliser <code>/tasks</code>, <code>/private</code>, <code>/context</code>, <code>/readonly</code>, <code>/mode</code> et <code>/cancel</code> ; les quatre dernières indiquent elles-mêmes si l’invité peut agir.')}

<h2>Changement de modèle</h2>
${codeBlock(`/model claude-sonnet-5-5
# Uses claude-sonnet-5-5 in every chat and turns off automatic model choice

/auto
# Goes back to automatic model choice`, 'text')}

${callout('info', 'Modèle imposé', 'Lorsque vous définissez un modèle avec <code>/model</code>, le choix automatique du modèle reste désactivé jusqu’à ce que vous envoyiez <code>/auto</code>. Le choix fait avec <code>/model</code> s’applique à tous les chats. Un modèle choisi pour une conversation dans l’application a priorité sur lui.')}

<h2>Rechargement de la configuration</h2>
<p><code>/reload</code> relit <code>config.toml</code> et applique les changements de fournisseur et de modèle sans redémarrage. Les autres changements demandent <code>/restart</code>. Si le fichier ne se charge plus, <code>/reload</code> remet en place <code>config.toml.bak</code>.</p>
<p>Au démarrage, une configuration cassée est restaurée automatiquement, en essayant dans l’ordre :</p>
<ol>
  <li><code>.toml.lastgood</code> &mdash; la dernière configuration qui a mené un appel de modèle à son terme</li>
  <li><code>.toml.bak</code> &rarr; <code>.toml.bak.1</code> &rarr; <code>.toml.bak.2</code></li>
</ol>
`
  },
  {
    slug: '/telegram/approval',
    section: 'Telegram',
    title: 'Flux d’approbation',
    description: 'Approbation par clavier intégré dans Telegram pour les commandes et actions qui ont besoin de votre accord.',
    content: () => `
<h1>Flux d’approbation des commandes</h1>
<p class="lead">Approbation interactive par clavier intégré pour les commandes et actions qui ont besoin de votre accord.</p>

<h2>Comment ça fonctionne</h2>
<ol>
  <li>L’agent veut exécuter une commande de terminal (ou entreprendre une autre action) qui a besoin de votre approbation. Une commande s’exécute sans demander lorsque vous l’avez déjà autorisée, ou lorsqu’elle figure sur la liste sûre et peut s’exécuter confinée. Sinon, un contrôle rapide du risque décide si elle est assez dangereuse pour vous la soumettre.</li>
  <li>La carte d’approbation est publiée dans le chat où le travail s’exécute. Seul un propriétaire peut y répondre ; un invité qui partage le chat voit la carte mais ne peut pas trancher.</li>
  <li>La carte montre la commande, son risque et les éventuels avertissements, avec ces boutons :</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Approbation requise :</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Always allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Options d’approbation</h2>
<table class="config-table">
<thead><tr><th>Option</th><th>Comportement</th></tr></thead>
<tbody>
<tr><td><strong>Allow</strong></td><td>L’exécute cette fois seulement</td></tr>
<tr><td><strong>Always allow</strong></td><td>L’exécute et mémorise le programme dans la base de données (par cible d’exécution), pour qu’on ne vous le redemande plus, même après un redémarrage. config.toml n’est pas modifié.</td></tr>
<tr><td><strong>Allow until restart</strong></td><td>Affiché à la place de <strong>Always allow</strong> pour les commandes critiques, ou pour toutes lorsque <code>terminal.permission_mode = "cautious"</code>. L’autorisation dure jusqu’au redémarrage du daemon.</td></tr>
<tr><td><strong>Deny</strong></td><td>Refuse &mdash; l’agent est informé du refus</td></tr>
</tbody>
</table>
<p>Certaines actions ne proposent que <strong>Allow</strong> et <strong>Deny</strong>. Les cartes couvrent aussi plus que les commandes de terminal, par exemple les actions du navigateur et la confirmation d’un nouveau travail planifié (<strong>Approve &amp; activate</strong> / <strong>Cancel</strong>).</p>

${callout('info', 'Expiration', 'Une carte sans réponse expire au bout de 5 minutes, avec un rappel peu avant, et compte comme <strong>Deny</strong>.')}

<h2>Ce qui demande toujours</h2>
<ul>
  <li>Les commandes issues de déclencheurs non fiables, comme l’<a href="/triggers">e-mail</a></li>
  <li>Les commandes qui demandent des capacités au-delà de la tâche</li>
  <li>Les commandes qui touchent des chemins d’identifiants protégés, même autorisées auparavant</li>
  <li>Les nouvelles commandes qui continueraient de tourner en arrière-plan (détachées)</li>
</ul>

${callout('warn', 'Commandes enchaînées', 'Une commande enchaînée (<code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code>) n’est considérée comme autorisée que si le programme de chaque partie figure sur votre liste d’autorisations permanente. Une autorisation donnée pour une session ne débloque jamais un enchaînement. La substitution de commande (<code>$()</code>, backticks) n’est jamais couverte par une autorisation.')}

${callout('danger', 'Sources non fiables', 'Les sessions démarrées par des déclencheurs (comme l’e-mail) ne sont pas fiables. Chaque commande de terminal y demande une approbation, quoi que vous ayez autorisé auparavant.')}
`
  },
  {
    slug: '/slack',
    section: 'Slack',
    title: 'Configuration de l’espace de travail',
    description: 'Connectez AIDaemon à Slack via Socket Mode. Créez une application Slack, ajoutez les scopes et les événements, et définissez qui peut l’utiliser.',
    content: () => `
<h1>Intégration Slack</h1>
<p class="lead">Connectez AIDaemon à votre espace de travail Slack via Socket Mode pour une messagerie en temps réel.</p>

${callout('success', 'Binaires précompilés', 'Si vous avez installé via le script en une ligne ou Homebrew, la prise en charge de Slack est déjà incluse. Configurez simplement <code>config.toml</code> ci-dessous. L’indicateur de fonctionnalité n’est nécessaire que lorsque vous <a href="/getting-started/build">compilez depuis les sources</a>.')}

<h2>Créer une application Slack</h2>
<ol>
  <li>Allez sur <a href="https://api.slack.com/apps" target="_blank" rel="noopener">api.slack.com/apps</a> et cliquez sur <strong>Create New App</strong></li>
  <li>Choisissez <strong>From scratch</strong>, donnez-lui un nom (par ex. « AIDaemon ») et sélectionnez votre espace de travail</li>
  <li>Sous <strong>Socket Mode</strong>, activez-le et générez un <strong>App-Level Token</strong> avec le scope <code>connections:write</code> &mdash; c’est votre <code>app_token</code> (<code>xapp-...</code>)</li>
  <li>Sous <strong>OAuth &amp; Permissions</strong>, ajoutez ces <strong>Bot Token Scopes</strong> :
    <ul>
      <li><code>app_mentions:read</code> &mdash; voir les messages qui mentionnent le bot avec @</li>
      <li><code>channels:history</code> &mdash; lire les messages et les fils dans les canaux publics (utilisé aussi par l’outil <code>read_channel_history</code>)</li>
      <li><code>channels:read</code> &mdash; lister les membres des canaux publics</li>
      <li><code>chat:write</code> &mdash; envoyer des messages</li>
      <li><code>files:read</code> &mdash; télécharger les fichiers envoyés par les utilisateurs</li>
      <li><code>files:write</code> &mdash; téléverser des fichiers dans Slack</li>
      <li><code>groups:history</code> &mdash; lire les messages et les fils dans les canaux privés</li>
      <li><code>groups:read</code> &mdash; lister les membres des canaux privés (nécessaire pour résoudre les noms d’utilisateur dans les canaux privés)</li>
      <li><code>im:history</code> &mdash; lire les messages directs</li>
      <li><code>im:read</code> &mdash; lire les métadonnées des messages directs (requis pour les transferts de fichiers en message direct)</li>
      <li><code>reactions:write</code> &mdash; ajouter des réactions d’état (un sablier pendant le traitement)</li>
      <li><code>users:read</code> &mdash; résoudre les informations d’utilisateur</li>
    </ul>
  </li>
  <li>Sous <strong>Event Subscriptions</strong>, activez les événements et abonnez-vous à ces événements de bot :
    <ul>
      <li><code>app_mention</code> &mdash; messages qui mentionnent le bot avec @</li>
      <li><code>message.channels</code> &mdash; messages dans les canaux publics</li>
      <li><code>message.groups</code> &mdash; messages dans les canaux privés</li>
      <li><code>message.im</code> &mdash; messages directs</li>
    </ul>
  </li>
  <li>Sous <strong>App Home</strong>, faites défiler jusqu’à <strong>Show Tabs</strong> et activez le <strong>Messages Tab</strong>. Cochez <strong>« Allow users to send Slash commands and messages from the messages tab »</strong> &mdash; sans cela, les utilisateurs ne peuvent pas écrire en message direct au bot.</li>
  <li>Installez l’application dans votre espace de travail &mdash; copiez le <strong>Bot User OAuth Token</strong> (<code>xoxb-...</code>)</li>
</ol>

<h2>Configuration</h2>
${codeBlock(`[slack]
app_token = "xapp-1-..."
bot_token = "xoxb-..."
allowed_user_ids = ["U123456789"]
use_threads = true

[users]
owner_ids = { slack = ["U123456789"] }`, 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'Conservé pour les anciennes configurations ; le bot démarre dès que les deux tokens sont définis.'],
  ['app_token', 'string', '&mdash;', 'App-Level Token pour Socket Mode (<code>xapp-...</code>). Prend en charge <code>"keychain"</code> et <code>$&#123;ENV&#125;</code>.'],
  ['bot_token', 'string', '&mdash;', 'Bot User OAuth Token (<code>xoxb-...</code>). Prend en charge <code>"keychain"</code> et <code>$&#123;ENV&#125;</code>.'],
  ['allowed_user_ids', 'array', '[]', 'Identifiants d’utilisateurs Slack autorisés à utiliser le bot. Si la liste est vide et qu’aucun propriétaire n’est défini, la première personne à écrire en message direct au bot le revendique.'],
  ['use_threads', 'bool', 'true', 'Répond dans des fils par défaut. Chaque fil a son propre contexte de session.'],
])}

<p>Les propriétaires se définissent sous <code>[users] owner_ids</code> ; si aucun n’est défini, toutes les personnes de la liste d’autorisation sont propriétaires. Pour plus d’un bot Slack, utilisez des entrées <code>[[slack_bots]]</code> avec les mêmes clés.</p>

<h2>Trouver votre identifiant d’utilisateur Slack</h2>
<p>Cliquez sur votre profil dans Slack, puis sur <strong>More</strong> &rarr; <strong>Copy member ID</strong>. Le format est <code>U</code> suivi de caractères alphanumériques (par ex. <code>U0123ABCDEF</code>).</p>

<h2>Fonctionnalités</h2>
<ul>
  <li><strong>Socket Mode</strong> &mdash; connexion WebSocket en temps réel, aucune URL publique requise</li>
  <li><strong>Réponses en fil</strong> &mdash; conversations en fil configurables, avec un contexte de session par fil</li>
  <li><strong>Transfert de fichiers</strong> &mdash; envoyez et recevez des fichiers via Slack</li>
  <li><strong>Approbations Block Kit</strong> &mdash; boutons interactifs pour les approbations (voir <a href="/slack/approval">Flux d’approbation</a>)</li>
  <li><strong>Commandes</strong> &mdash; les commandes communes, saisies sous la forme <code>!command</code> (par exemple <code>!cost</code>, <code>!model</code>, <code>!tasks</code>), plus <code>!workspace</code> et <code>!restart</code> (voir <a href="/slack/commands">Commandes</a>)</li>
  <li><strong>Réactions d’état</strong> &mdash; émoji sablier pendant le traitement, retiré à la fin</li>
  <li><strong>Conversion Markdown</strong> &mdash; le markdown standard est converti automatiquement au format mrkdwn de Slack</li>
  <li><strong>Découpage des messages</strong> &mdash; les longues réponses sont découpées pour respecter les limites de message de Slack</li>
  <li><strong>Reconnexion automatique</strong> &mdash; délai exponentiel en cas d’échec de connexion (de 5 s à 60 s au maximum)</li>
  <li><strong>Prise en charge multi-bot</strong> &mdash; exécutez plusieurs bots Slack avec <code>[[slack_bots]]</code></li>
</ul>

<h2>Modèle de session</h2>
<p>Les sessions Slack sont identifiées par le canal et le fil :</p>
<ul>
  <li><strong>Message de canal :</strong> <code>slack:{channel_id}</code></li>
  <li><strong>Message de fil :</strong> <code>slack:{channel_id}:{thread_ts}</code> (lorsque <code>use_threads</code> est activé)</li>
</ul>
<p>Avec <code>use_threads</code> activé, le bot répond à un message de canal de premier niveau dans un nouveau fil, de sorte que cette conversation a sa propre session. Les identifiants de session sont préfixés par le nom du bot, donc plusieurs bots ne partagent jamais une session.</p>
<p>Chaque session conserve son propre historique de conversation, sa mémoire de travail et son contexte de faits.</p>

${callout('warn', 'Contrôle d’accès', 'Si <code>allowed_user_ids</code> et la liste des propriétaires Slack sont tous deux vides, la première personne à écrire en message direct au bot en devient le propriétaire et est enregistrée dans la configuration. Les personnes qui ne figurent pas sur la liste et mentionnent le bot avec @ reçoivent un rôle public limité, qui ne peut pas exécuter de commandes. Définissez <code>allowed_user_ids</code> en production.')}
`
  },
  {
    slug: '/slack/commands',
    section: 'Slack',
    title: 'Commandes',
    description: 'Commandes d’AIDaemon dans Slack, saisies sous la forme !command : !clear, !tasks, !cancel, !model, !cost, !workspace et plus encore.',
    content: () => `
<h1>Commandes Slack</h1>
<p class="lead">Commandes disponibles dans Slack : les commandes communes, sans les commandes de gestion de bot et de terminal de Telegram. Saisissez-les sous la forme <code>!command</code>, car Slack réserve <code>/</code> à ses propres commandes slash ; <code>/command</code> est accepté lorsque Slack le transmet.</p>

<p><code>!help</code> (ou <code>!start</code>) affiche les commandes courantes avec les boutons Restart, Reload, Clear et Cost ; <code>!help all</code> liste toutes les commandes.</p>

<h2>Conversation</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>!clear</code> (ou <code>!new</code>)</td><td>Démarre une nouvelle conversation. Votre historique est conservé, et le travail en cours dans ce chat s’arrête.</td></tr>
<tr><td><code>!wipe</code></td><td>Supprime définitivement cette conversation. Le premier <code>!wipe</code> ne fait qu’expliquer ; envoyez-le de nouveau dans les quelques minutes pour l’effacer. Les faits déjà enregistrés en mémoire sont conservés.</td></tr>
<tr><td><code>!context</code></td><td>Montre quelle part de la conversation l’agent peut voir</td></tr>
<tr><td><code>!project [name|none]</code></td><td>Affiche ou change le projet dans lequel travaille ce chat</td></tr>
<tr><td><code>!memory</code></td><td>Affiche la mémoire du projet dans lequel travaille ce chat</td></tr>
</tbody>
</table>

<h2>Travail</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>!tasks</code></td><td>Liste, numérotée, ce qui tourne dans ce chat</td></tr>
<tr><td><code>!cancel</code>, <code>!cancel all</code>, <code>!cancel &lt;number&gt;</code></td><td>Arrête ce qui tourne dans ce chat : tout ce qui vient d’une demande, tout, ou un seul élément (les numéros viennent de <code>!tasks</code>)</td></tr>
<tr><td><code>!status</code></td><td>Le mode de ce chat, ce qui tourne et le prochain élément planifié</td></tr>
<tr><td><code>!work [ready|running|blocked|show|comment|unblock|retry]</code></td><td>Voir et gérer le travail plus long qui attend ou s’exécute de lui-même</td></tr>
<tr><td><code>!cost</code></td><td>Affiche l’utilisation de tokens (dernières 24 h, 7 derniers jours, modèles les plus utilisés)</td></tr>
</tbody>
</table>

<h2>Modèles</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>!model</code></td><td>Affiche le modèle actuel</td></tr>
<tr><td><code>!model &lt;name&gt;</code></td><td>Utilise un seul modèle pour tous les chats (désactive le choix automatique du modèle)</td></tr>
<tr><td><code>!models</code></td><td>Liste les modèles que propose votre fournisseur (le modèle actif est marqué)</td></tr>
<tr><td><code>!auto</code></td><td>Revient au choix automatique du modèle</td></tr>
</tbody>
</table>

<h2>Accès et confidentialité</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>!mode [full|unrestricted|readonly]</code></td><td>Affiche ou change le mode d’accès de ce chat</td></tr>
<tr><td><code>!readonly</code></td><td>Met ce chat en lecture seule pendant 4 heures</td></tr>
<tr><td><code>!private [off]</code></td><td>Ne retient pas votre prochain message et n’en apprend rien (<code>off</code> l’annule)</td></tr>
<tr><td><code>!trustall on|off</code></td><td>Exécute chaque commande de terminal sans demander</td></tr>
</tbody>
</table>

<h2>Fichiers</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>!checkpoints</code></td><td>Liste les points de contrôle du système de fichiers</td></tr>
<tr><td><code>!rollback [checkpoint-id|confirm TOKEN]</code></td><td>Prévisualise un retour à un point de contrôle, puis le confirme</td></tr>
</tbody>
</table>

<h2>Appareils</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>!pair_device</code></td><td>Appaire un téléphone ou un navigateur avec l’application</td></tr>
<tr><td><code>!devices</code></td><td>Liste les appareils appairés</td></tr>
<tr><td><code>!revoke_device &lt;id&gt;</code></td><td>Désappaire un appareil</td></tr>
<tr><td><code>!exposure</code></td><td>Affiche les tunnels qui publient les passerelles</td></tr>
</tbody>
</table>

<h2>Gestion des bots</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>!reload</code></td><td>Relit config.toml et applique les changements de fournisseur et de modèle (les autres changements demandent <code>!restart</code>)</td></tr>
<tr><td><code>!restart</code></td><td>Redémarrage complet : lance un nouveau processus, qui prend en compte un nouveau binaire, la configuration et les serveurs MCP (propriétaire uniquement)</td></tr>
<tr><td><code>!workspace grant &lt;@user&gt; &lt;read|edit&gt; &lt;project-path&gt; [hours]</code></td><td>Donne à quelqu’un un accès temporaire à un projet (jusqu’à 168 heures). Envoyez-la dans le groupe Slack privé où l’autorisation doit s’appliquer. Propriétaire uniquement.</td></tr>
<tr><td><code>!workspace revoke &lt;@user&gt;</code> / <code>!workspace list</code></td><td>Retire une autorisation, ou liste les autorisations en cours</td></tr>
</tbody>
</table>

${callout('info', 'Qui peut utiliser les commandes', 'La plupart des commandes sont réservées au propriétaire. Les invités peuvent utiliser <code>!tasks</code>, <code>!private</code>, <code>!context</code>, <code>!readonly</code>, <code>!mode</code> et <code>!cancel</code> ; les personnes qui n’ont que le rôle public (elles ont mentionné le bot avec @ mais ne figurent pas sur la liste d’autorisation) ne peuvent exécuter aucune commande.')}

${callout('info', 'Commande slash ou texte simple', 'Ces commandes sont envoyées comme des messages ordinaires dans un message direct ou un canal avec le bot. Elles ne sont pas enregistrées comme commandes slash Slack dans le manifeste de l’application. Si vous ajoutez vous-même des commandes slash natives à l’application, le bot les gère, pour les propriétaires uniquement.')}
`
  },
  {
    slug: '/slack/approval',
    section: 'Slack',
    title: 'Flux d’approbation',
    description: 'Boutons Block Kit interactifs pour approuver les commandes et les actions dans Slack.',
    content: () => `
<h1>Flux d’approbation Slack</h1>
<p class="lead">Boutons Block Kit interactifs pour approuver les commandes et les actions dans Slack.</p>

<h2>Comment ça fonctionne</h2>
<ol>
  <li>L’agent veut exécuter une commande de terminal (ou entreprendre une autre action) qui a besoin de votre approbation. Une commande s’exécute sans demander lorsque vous l’avez déjà autorisée, ou lorsqu’elle figure sur la liste sûre et peut s’exécuter confinée. Sinon, un contrôle rapide du risque décide si elle est assez dangereuse pour vous la soumettre.</li>
  <li>La carte d’approbation est publiée dans le canal ou le fil Slack où le travail s’exécute. Seul un propriétaire peut y répondre.</li>
  <li>La carte montre la commande, son risque et les éventuels avertissements, avec ces boutons :</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Approbation requise :</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Always allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Options d’approbation</h2>
<table class="config-table">
<thead><tr><th>Option</th><th>Comportement</th></tr></thead>
<tbody>
<tr><td><strong>Allow</strong></td><td>L’exécute cette fois seulement</td></tr>
<tr><td><strong>Always allow</strong></td><td>L’exécute et mémorise le programme dans la base de données (par cible d’exécution), pour qu’on ne vous le redemande plus, même après un redémarrage. config.toml n’est pas modifié.</td></tr>
<tr><td><strong>Allow until restart</strong></td><td>Affiché à la place de <strong>Always allow</strong> pour les commandes critiques, ou pour toutes lorsque <code>terminal.permission_mode = "cautious"</code>. L’autorisation dure jusqu’au redémarrage du daemon.</td></tr>
<tr><td><strong>Deny</strong></td><td>Refuse &mdash; l’agent est informé du refus</td></tr>
</tbody>
</table>
<p>Certaines actions ne proposent que <strong>Allow</strong> et <strong>Deny</strong>. Les cartes couvrent aussi plus que les commandes de terminal, par exemple les actions du navigateur et la confirmation d’un nouveau travail planifié (<strong>Approve &amp; activate</strong> / <strong>Cancel</strong>).</p>

${callout('info', 'Expiration', 'Une carte sans réponse expire au bout de 5 minutes, avec un rappel peu avant, et compte comme <strong>Deny</strong>.')}

<h2>Ce qui demande toujours</h2>
<ul>
  <li>Les commandes issues de déclencheurs non fiables, comme l’<a href="/triggers">e-mail</a></li>
  <li>Les commandes qui demandent des capacités au-delà de la tâche</li>
  <li>Les commandes qui touchent des chemins d’identifiants protégés, même autorisées auparavant</li>
  <li>Les nouvelles commandes qui continueraient de tourner en arrière-plan (détachées)</li>
</ul>

${callout('warn', 'Commandes enchaînées', 'Une commande enchaînée (<code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code>) n’est considérée comme autorisée que si le programme de chaque partie figure sur votre liste d’autorisations permanente. Une autorisation donnée pour une session ne débloque jamais un enchaînement. La substitution de commande (<code>$()</code>, backticks) n’est jamais couverte par une autorisation.')}

${callout('danger', 'Sources non fiables', 'Les sessions démarrées par des déclencheurs (comme l’e-mail) ne sont pas fiables. Chaque commande de terminal y demande une approbation, quoi que vous ayez autorisé auparavant.')}
`
  },
  {
    slug: '/discord',
    section: 'Discord',
    title: 'Configuration du bot',
    description: 'Connectez AIDaemon à Discord. Créez une application Discord, activez Message Content et définissez qui peut l’utiliser.',
    content: () => `
<h1>Configuration du bot Discord</h1>
<p class="lead">Connectez AIDaemon à Discord par une connexion directe au Discord Gateway et à l’API REST.</p>

${callout('success', 'Binaires précompilés', 'Si vous avez installé via le script en une ligne ou Homebrew, la prise en charge de Discord est déjà incluse. Configurez simplement <code>config.toml</code> ci-dessous. L’indicateur de fonctionnalité n’est nécessaire que lorsque vous <a href="/getting-started/build">compilez depuis les sources</a>.')}

<h2>Créer une application Discord</h2>
<ol>
  <li>Allez sur le <a href="https://discord.com/developers/applications" target="_blank" rel="noopener">Discord Developer Portal</a></li>
  <li>Cliquez sur <strong>New Application</strong> et donnez-lui un nom (par ex. &laquo;&nbsp;AIDaemon&nbsp;&raquo;)</li>
  <li>Sous <strong>Bot</strong>, cliquez sur <strong>Add Bot</strong></li>
  <li>Copiez le <strong>Bot Token</strong> &mdash; c’est votre <code>bot_token</code></li>
  <li>Activez le <strong>Message Content Intent</strong> sous <strong>Privileged Gateway Intents</strong> &mdash; le bot en a besoin pour lire le texte des messages. Aucun autre intent privilégié n’est nécessaire.</li>
  <li>Sous <strong>OAuth2 &rarr; URL Generator</strong>, sélectionnez les scopes <code>bot</code> et <code>applications.commands</code>, puis les permissions : View Channels, Send Messages, Read Message History, Attach Files, Use Slash Commands</li>
  <li>Utilisez l’URL générée pour inviter le bot sur votre serveur</li>
</ol>

<h2>Configuration</h2>
${codeBlock(`[discord]
bot_token = "keychain"   # or the token itself
allowed_user_ids = [123456789012345678]
guild_id = 987654321098765432

[users]
owner_ids = { discord = ["123456789012345678"] }`, 'toml', 'config.toml')}

${configTable([
  ['bot_token', 'string', '&mdash;', 'Token du bot Discord obtenu dans le Developer Portal. Prend en charge <code>"keychain"</code>.'],
  ['allowed_user_ids', 'array', '[]', 'Identifiants d’utilisateurs Discord (entiers) autorisés à écrire en message direct au bot. Si la liste est vide et qu’aucun propriétaire n’est défini, la première personne à écrire en message direct au bot le revendique.'],
  ['guild_id', 'integer', 'null', 'Identifiant de serveur facultatif. Les commandes slash sont enregistrées dans ce serveur, où elles apparaissent aussitôt, au lieu de l’être globalement, ce qui peut prendre jusqu’à une heure. Cela ne limite pas les endroits où le bot répond.'],
])}

<p>Les propriétaires se définissent sous <code>[users] owner_ids</code> ; si aucun n’est défini, la liste d’autorisation contient les propriétaires. Pour plus d’un bot Discord, utilisez des entrées <code>[[discord_bots]]</code> avec les mêmes clés.</p>

<h2>Obtenir votre identifiant d’utilisateur Discord</h2>
<p>Activez le <strong>Developer Mode</strong> dans les paramètres de Discord (Appearance &rarr; Advanced), puis faites un clic droit sur votre nom d’utilisateur et sélectionnez <strong>Copy User ID</strong>.</p>

<h2>Fonctionnalités</h2>
<ul>
  <li><strong>Connexion Gateway</strong> &mdash; une connexion directe au Discord Gateway (v10) et à l’API REST</li>
  <li><strong>Commandes slash</strong> &mdash; commandes d’application enregistrées (voir <a href="/discord/commands">Commandes</a>)</li>
  <li><strong>Boutons interactifs</strong> &mdash; flux d’approbation avec boutons cliquables (voir <a href="/discord/approval">Flux d’approbation</a>)</li>
  <li><strong>Transfert de fichiers</strong> &mdash; envoyez et recevez des fichiers comme pièces jointes Discord (les fichiers que le bot envoie sont limités à 10 Mo)</li>
  <li><strong>Découpage des messages</strong> &mdash; les longues réponses sont découpées pour respecter la limite de 2000 caractères par message de Discord</li>
  <li><strong>Reconnexion automatique</strong> &mdash; délai exponentiel en cas d’échec de connexion (de 5 s à 60 s au maximum)</li>
  <li><strong>Liste d’utilisateurs autorisés</strong> &mdash; contrôle d’accès par token de bot</li>
  <li><strong>Prise en charge multi-bot</strong> &mdash; exécutez plusieurs bots Discord avec des configurations séparées (<code>[[discord_bots]]</code>)</li>
</ul>

<h2>Modèle de session</h2>
<p>Les sessions Discord sont identifiées par l’endroit où la conversation a lieu :</p>
<ul>
  <li><strong>Canal de serveur :</strong> <code>discord:ch:{channel_id}</code></li>
  <li><strong>Message direct :</strong> <code>discord:dm:{user_id}</code></li>
</ul>
<p>Les identifiants de session sont préfixés par le nom du bot, donc plusieurs bots ne partagent jamais une session. Chaque session conserve son propre historique de conversation, sa mémoire de travail et son contexte de faits.</p>

${callout('warn', 'Contrôle d’accès', 'Les membres du serveur qui ne figurent pas sur la liste peuvent parler au bot en tant qu’invités, mais seulement lorsqu’ils le mentionnent ou lui répondent. Leurs fichiers ne sont pas enregistrés, et ils ne peuvent ni répondre aux approbations ni exécuter les commandes de propriétaire. Les messages directs exigent la liste d’autorisation. Définissez toujours <code>allowed_user_ids</code> en production.')}
`
  },
  {
    slug: '/discord/commands',
    section: 'Discord',
    title: 'Commandes slash',
    description: 'Commandes Discord pour AIDaemon : /model, /clear, /tasks, /cancel, /cost, /status et plus encore.',
    content: () => `
<h1>Commandes slash Discord</h1>
<p class="lead">Commandes disponibles dans Discord. Les plus utilisées sont enregistrées comme commandes d’application, elles apparaissent donc lorsque vous saisissez <code>/</code> ; les autres fonctionnent lorsque vous les envoyez comme message.</p>

<p><code>/help</code> (ou <code>/start</code>) affiche les commandes courantes ; <code>/help all</code> liste toutes les commandes.</p>

${callout('info', 'Dans le menu slash', 'Le menu liste <code>/model</code>, <code>/models</code>, <code>/auto</code>, <code>/reload</code>, <code>/tasks</code>, <code>/cancel</code>, <code>/clear</code>, <code>/wipe</code>, <code>/cost</code>, <code>/context</code> et <code>/help</code>. Chacune accepte un texte <code>args</code> facultatif, par exemple <code>/model args:claude-sonnet-5-5</code>. Toutes les autres commandes ci-dessous fonctionnent lorsqu’elles sont saisies comme un message normal, comme <code>/status</code> ou <code>/mode readonly</code>.')}

<h2>Conversation</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/clear</code> (ou <code>/new</code>)</td><td>Démarre une nouvelle conversation. Votre historique est conservé (utilisez <code>/wipe</code> pour le supprimer), et le travail en cours dans ce chat s’arrête.</td></tr>
<tr><td><code>/wipe</code></td><td>Supprime définitivement cette conversation. Le premier <code>/wipe</code> ne fait qu’expliquer ; envoyez-le de nouveau dans les quelques minutes pour l’effacer. Les faits déjà enregistrés en mémoire sont conservés.</td></tr>
<tr><td><code>/context</code></td><td>Montre quelle part de la conversation l’agent peut voir</td></tr>
<tr><td><code>/project [name|none]</code></td><td>Affiche ou change le projet dans lequel travaille ce chat</td></tr>
<tr><td><code>/memory</code></td><td>Affiche la mémoire du projet dans lequel travaille ce chat</td></tr>
</tbody>
</table>

<h2>Travail</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/tasks</code></td><td>Liste, numérotée, ce qui tourne dans ce chat</td></tr>
<tr><td><code>/cancel</code>, <code>/cancel all</code>, <code>/cancel &lt;number&gt;</code></td><td>Arrête ce qui tourne dans ce chat : tout ce qui vient d’une demande, tout, ou un seul élément (les numéros viennent de <code>/tasks</code>)</td></tr>
<tr><td><code>/status</code></td><td>Le mode de ce chat, ce qui tourne et le prochain élément planifié</td></tr>
<tr><td><code>/work [ready|running|blocked|show|comment|unblock|retry]</code></td><td>Voir et gérer le travail plus long qui attend ou s’exécute de lui-même</td></tr>
<tr><td><code>/cost</code></td><td>Affiche l’utilisation de tokens (dernières 24 h, 7 derniers jours, modèles les plus utilisés)</td></tr>
</tbody>
</table>

<h2>Modèles</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Affiche le modèle actuel</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Utilise un seul modèle pour tous les chats (désactive le choix automatique du modèle)</td></tr>
<tr><td><code>/models</code></td><td>Liste les modèles que propose votre fournisseur (le modèle actif est marqué)</td></tr>
<tr><td><code>/auto</code></td><td>Revient au choix automatique du modèle</td></tr>
</tbody>
</table>

<h2>Accès et confidentialité</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/mode [full|unrestricted|readonly]</code></td><td>Affiche ou change le mode d’accès de ce chat</td></tr>
<tr><td><code>/readonly</code></td><td>Met ce chat en lecture seule pendant 4 heures</td></tr>
<tr><td><code>/private [off]</code></td><td>Ne retient pas votre prochain message et n’en apprend rien (<code>off</code> l’annule)</td></tr>
<tr><td><code>/trustall on|off</code></td><td>Exécute chaque commande de terminal sans demander</td></tr>
</tbody>
</table>

<h2>Fichiers</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/checkpoints</code></td><td>Liste les points de contrôle du système de fichiers</td></tr>
<tr><td><code>/rollback [checkpoint-id|confirm TOKEN]</code></td><td>Prévisualise un retour à un point de contrôle, puis le confirme</td></tr>
</tbody>
</table>

<h2>Appareils</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/pair_device</code></td><td>Appaire un téléphone ou un navigateur avec l’application</td></tr>
<tr><td><code>/devices</code></td><td>Liste les appareils appairés</td></tr>
<tr><td><code>/revoke_device &lt;id&gt;</code></td><td>Désappaire un appareil</td></tr>
<tr><td><code>/exposure</code></td><td>Affiche les tunnels qui publient les passerelles</td></tr>
</tbody>
</table>

<h2>Gestion des bots</h2>
<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/reload</code></td><td>Relit config.toml et applique les changements de fournisseur et de modèle</td></tr>
</tbody>
</table>

${callout('info', 'Qui peut utiliser les commandes', 'La plupart des commandes sont réservées au propriétaire. Les invités peuvent utiliser <code>/tasks</code>, <code>/private</code>, <code>/context</code>, <code>/readonly</code>, <code>/mode</code> et <code>/cancel</code> ; les quatre dernières indiquent elles-mêmes si l’invité peut agir.')}

<h2>Messages ordinaires</h2>
<p>Outre les commandes, vous pouvez parler au bot en message direct, ou dans un canal de serveur en le mentionnant ou en lui répondant. Ces messages sont traités comme de simples messages de conversation.</p>

${callout('info', 'Enregistrement des commandes', 'Les commandes sont enregistrées à chaque connexion du bot : dans le serveur désigné par <code>guild_id</code>, où elles apparaissent aussitôt, ou globalement, ce qui peut prendre jusqu’à une heure.')}
`
  },
  {
    slug: '/discord/approval',
    section: 'Discord',
    title: 'Flux d’approbation',
    description: 'Boutons de message interactifs pour approuver les commandes et les actions dans Discord.',
    content: () => `
<h1>Flux d’approbation Discord</h1>
<p class="lead">Boutons de message interactifs pour approuver les commandes et les actions dans Discord.</p>

<h2>Comment ça fonctionne</h2>
<ol>
  <li>L’agent veut exécuter une commande de terminal (ou entreprendre une autre action) qui a besoin de votre approbation. Une commande s’exécute sans demander lorsque vous l’avez déjà autorisée, ou lorsqu’elle figure sur la liste sûre et peut s’exécuter confinée. Sinon, un contrôle rapide du risque décide si elle est assez dangereuse pour vous la soumettre.</li>
  <li>La carte d’approbation est publiée dans le canal Discord où le travail s’exécute, avec des boutons de message Discord. Seul un propriétaire peut les actionner.</li>
  <li>La carte montre la commande, son risque et les éventuels avertissements, avec ces boutons :</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">Approbation requise :</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Always allow</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Options d’approbation</h2>
<table class="config-table">
<thead><tr><th>Option</th><th>Comportement</th></tr></thead>
<tbody>
<tr><td><strong>Allow</strong></td><td>L’exécute cette fois seulement</td></tr>
<tr><td><strong>Always allow</strong></td><td>L’exécute et mémorise le programme dans la base de données (par cible d’exécution), pour qu’on ne vous le redemande plus, même après un redémarrage. config.toml n’est pas modifié.</td></tr>
<tr><td><strong>Allow until restart</strong></td><td>Affiché à la place de <strong>Always allow</strong> pour les commandes critiques, ou pour toutes lorsque <code>terminal.permission_mode = "cautious"</code>. L’autorisation dure jusqu’au redémarrage du daemon.</td></tr>
<tr><td><strong>Deny</strong></td><td>Refuse &mdash; l’agent est informé du refus</td></tr>
</tbody>
</table>
<p>Certaines actions ne proposent que <strong>Allow</strong> et <strong>Deny</strong>. Les cartes couvrent aussi plus que les commandes de terminal, par exemple les actions du navigateur et la confirmation d’un nouveau travail planifié (<strong>Approve &amp; activate</strong> / <strong>Cancel</strong>).</p>

${callout('info', 'Expiration', 'Une carte sans réponse expire au bout de 5 minutes, avec un rappel peu avant, et compte comme <strong>Deny</strong>.')}

<h2>Ce qui demande toujours</h2>
<ul>
  <li>Les commandes issues de déclencheurs non fiables, comme l’<a href="/triggers">e-mail</a></li>
  <li>Les commandes qui demandent des capacités au-delà de la tâche</li>
  <li>Les commandes qui touchent des chemins d’identifiants protégés, même autorisées auparavant</li>
  <li>Les nouvelles commandes qui continueraient de tourner en arrière-plan (détachées)</li>
</ul>

${callout('warn', 'Commandes enchaînées', 'Une commande enchaînée (<code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code>) n’est considérée comme autorisée que si le programme de chaque partie figure sur votre liste d’autorisations permanente. Une autorisation donnée pour une session ne débloque jamais un enchaînement. La substitution de commande (<code>$()</code>, backticks) n’est jamais couverte par une autorisation.')}

${callout('danger', 'Sources non fiables', 'Les sessions démarrées par des déclencheurs (comme l’e-mail) ne sont pas fiables. Chaque commande de terminal y demande une approbation, quoi que vous ayez autorisé auparavant.')}
`
  },
  {
    slug: '/tools',
    section: 'Tools',
    title: 'Aperçu des outils',
    description: 'Aperçu des outils intégrés que l’agent AIDaemon peut appeler : terminal, fichiers, mémoire, navigateur, recherche web, sous-agents, MCP et plus encore.',
    content: () => `
<h1>Outils</h1>
<p class="lead">AIDaemon fournit un ensemble d’outils intégrés que le modèle peut appeler de lui-même pendant qu’il traite une demande.</p>

<h2>Le trait Tool</h2>
<p>Tous les outils implémentent la même interface :</p>
${codeBlock(`trait Tool {
    fn name(&self) -> &str;
    fn description(&self) -> &str;
    fn schema(&self) -> Value;   // full function object: name, description, parameters
    async fn execute(&self, arguments: &str, facts: &ToolCallContext) -> Result<ToolCallOutcome>;
    fn call_effects(&self, arguments: &str) -> CallEffects; // what a call does, judged by the approval hooks
}`, 'rust')}
<p>Un outil ne sollicite jamais lui-même le propriétaire. Il déclare ce que fait chaque appel (ses effets), et ce sont les hooks d’approbation du noyau de l’agent qui décident de l’exécuter, de vous demander, ou de refuser.</p>

<h2>Outils intégrés</h2>
<table class="config-table">
<thead><tr><th>Outil</th><th>Description</th><th>Configuration</th></tr></thead>
<tbody>
<tr><td><a href="/tools/terminal"><code>terminal</code></a></td><td>Exécute des commandes shell avec le flux d’approbation (voir <a href="/tools/command-risk">risque des commandes</a>)</td><td>[terminal]</td></tr>
<tr><td><a href="/tools/system-info"><code>system_info</code></a></td><td>Interroge le nom d’hôte, le système, la durée de fonctionnement, la mémoire</td><td>Toujours activé</td></tr>
<tr><td><code>read_file</code>, <code>write_file</code>, <code>edit_file</code>, <code>search_files</code></td><td>Lit, écrit, modifie et recherche des fichiers dans l’espace de travail</td><td>Toujours activé</td></tr>
<tr><td><code>check_environment</code></td><td>Vérifie quels programmes et outils sont installés</td><td>Toujours activé</td></tr>
<tr><td><a href="/tools/memory"><code>remember_fact</code></a></td><td>Enregistre ou oublie des faits vous concernant (cherchez-les avec <code>manage_memories</code>)</td><td>Toujours activé</td></tr>
<tr><td><a href="/tools/memory"><code>manage_memories</code></a></td><td>Cherche, liste et oublie des faits enregistrés, cherche dans les conversations passées, suit les objectifs personnels</td><td>Toujours activé</td></tr>
<tr><td><code>search_history</code></td><td>Cherche les messages exacts des conversations passées</td><td>Toujours activé</td></tr>
<tr><td><a href="/tools/config-manager"><code>manage_config</code></a></td><td>Lit et modifie config.toml, change de fournisseur, gère le basculement de secours (secrets masqués)</td><td>Toujours activé</td></tr>
<tr><td><a href="/tools/web-search"><code>web_search</code></a></td><td>Recherche sur le web (DuckDuckGo, Brave ou SearxNG, fusionnés)</td><td>[search]</td></tr>
<tr><td><a href="/tools/web-fetch"><code>web_fetch</code></a></td><td>Récupère et extrait le contenu lisible d’URL</td><td>Toujours activé</td></tr>
<tr><td><code>http_request</code></td><td>Appelle des API REST/JSON, avec des profils d’authentification enregistrés</td><td>Toujours activé</td></tr>
<tr><td><code>manage_auth</code>, <code>manage_api</code></td><td>Connecte des services (clés d’API, OAuth) et apprend leurs API</td><td>Toujours activé</td></tr>
<tr><td><code>set_reminder</code></td><td>Définit un rappel</td><td>Toujours activé</td></tr>
<tr><td><a href="/scheduler"><code>schedule_task</code></a></td><td>Crée une tâche planifiée</td><td>Toujours activé</td></tr>
<tr><td><a href="/scheduler"><code>manage_automations</code></a></td><td>Liste, modifie et exécute les tâches planifiées et les rappels</td><td>Toujours activé</td></tr>
<tr><td><code>manage_mandates</code></td><td>Objectifs permanents sur lesquels l’agent travaille dans la durée</td><td>Toujours activé</td></tr>
<tr><td><code>track_requirements</code></td><td>Tient une liste de contrôle de ce qu’une demande réclamait</td><td>Toujours activé</td></tr>
<tr><td><a href="/tools/browser"><code>browser</code></a></td><td>Automatisation de Chrome avec sessions de connexion persistantes</td><td>[browser] enabled=true</td></tr>
<tr><td><code>hand_over</code></td><td>Vous passe le navigateur (par exemple pour vous connecter)</td><td>[browser] + [surfaces]</td></tr>
<tr><td><code>computer_use</code></td><td>Contrôle le bureau de cet ordinateur à partir de captures d’écran</td><td>[computer_use]</td></tr>
<tr><td><a href="/tools/send-file"><code>send_file</code></a></td><td>Envoie un fichier à l’utilisateur dans le chat en cours (Telegram, Slack, Discord ou l’application)</td><td>[files] (activé par défaut)</td></tr>
<tr><td><code>generate_image</code></td><td>Génère une image</td><td>[files]</td></tr>
<tr><td><a href="/tools/sub-agents"><code>spawn_agent</code></a></td><td>Délègue du travail à des sous-agents et à des spécialistes</td><td>[subagents] (activé par défaut)</td></tr>
<tr><td><a href="/tools/cli-agents"><code>cli_agent</code></a></td><td>Délègue à des agents de code installés (voir aussi <code>manage_cli_agents</code>)</td><td>[cli_agents] enabled = true</td></tr>
<tr><td><a href="/health-monitoring"><code>health_probe</code></a></td><td>Gère et exécute des sondes de santé</td><td>[health]</td></tr>
<tr><td><a href="/skills"><code>use_skill</code>, <code>skill_resources</code>, <code>manage_skills</code></a></td><td>Utilise, parcourt et installe des compétences</td><td>[skills]</td></tr>
<tr><td><a href="/tools/people"><code>manage_people</code></a></td><td>Carnet de contacts personnel avec anniversaires, préférences, relations</td><td>Toujours enregistré</td></tr>
<tr><td><a href="/mcp"><code>manage_mcp</code></a></td><td>Ajoute, retire et redémarre des serveurs MCP à l’exécution</td><td>Toujours activé</td></tr>
<tr><td><a href="/mcp">Outils MCP</a></td><td>Découverts dynamiquement via les serveurs MCP</td><td>[mcp.*]</td></tr>
</tbody>
</table>

<p>Quinze outils de base sont proposés à chaque appel (terminal, mémoire, rappels et planification, recherche dans l’historique, web, fichiers, <code>spawn_agent</code>, <code>track_requirements</code>). Les autres sont proposés lorsqu’une demande en a besoin. Le travail est borné par la progression et par des budgets de tokens, non par un nombre fixe d’étapes.</p>

<h2>Quels outils sont enregistrés</h2>
<p>Les outils sont enregistrés au démarrage en trois groupes :</p>
<ul>
  <li><strong>Toujours enregistrés</strong> (sauf s’ils figurent dans <code>[tools] disabled</code>) : system_info, terminal, remember_fact, manage_memories, set_reminder, schedule_task, manage_mandates, manage_automations, search_history, manage_config, web_fetch, web_search, read_file, write_file, edit_file, search_files, check_environment, manage_mcp, manage_people, http_request, manage_auth, manage_api.</li>
  <li><strong>Enregistrés lorsqu’ils sont activés</strong> : spawn_agent ([subagents]) ; browser, et hand_over avec [surfaces] ([browser]) ; computer_use ([computer_use]) ; send_file et generate_image ([files]) ; cli_agent et manage_cli_agents ([cli_agents]) ; health_probe ([health]) ; use_skill, skill_resources et manage_skills ([skills]) ; self_diagnose, goal_trace et policy_metrics ([diagnostics]) ; outils de nœuds ([nodes]) ; client_view et request_feature ([client_gateway]) ; read_channel_history (Slack, sur option).</li>
  <li><strong>Outils MCP</strong> des serveurs configurés.</li>
</ul>
${codeBlock(`[tools]
disabled = ["generate_image"]   # leave a built-in tool out at startup (needs /restart)`, 'toml', 'config.toml')}
`
  },
  {
    slug: '/tools/terminal',
    section: 'Tools',
    title: 'Outil terminal',
    description: 'Exécutez des commandes shell sur l’hôte, dans un conteneur Docker ou sur un hôte SSH via AIDaemon, avec l’approbation du propriétaire pour tout ce qui est risqué.',
    content: () => `
<h1>Outil terminal</h1>
<p class="lead">Exécute des commandes shell. Les commandes s’exécutent avec <code>sh -c</code> (PowerShell de Windows sous Windows), dans l’espace de travail configuré : cet ordinateur, un conteneur Docker ou un hôte SSH.</p>

<h2>Paramètres</h2>
${configTable([
  ['action', 'string', '—', 'L’un de : run, check, kill (obligatoire)'],
  ['command', 'string', '—', 'La commande shell à exécuter (pour action="run")'],
  ['script', 'string', '—', 'Un script shell en plusieurs étapes, exécuté avec /bin/sh -eu pour qu’une étape en échec arrête les suivantes. À utiliser à la place de command.'],
  ['working_dir', 'string', '—', 'Répertoire dans lequel la commande s’exécute'],
  ['background', 'bool', 'false', 'Exécute en arrière-plan un travail fini ; le résultat vous est envoyé lorsqu’il se termine'],
  ['detach', 'bool', 'false', 'Démarre un processus de longue durée (serveur, surveillance) qui continue de tourner jusqu’à ce qu’on l’arrête'],
  ['network', 'bool', 'false', 'Autorise le réseau pour une exécution confinée (en bac à sable) ; demande d’abord sauf s’il est déjà accordé'],
  ['read_paths / read_roots / write_paths / write_roots', 'array', '—', 'Chemins supplémentaires qu’une exécution confinée peut lire ou écrire ; les chemins hors de la portée de la tâche demandent d’abord'],
  ['description', 'string', '—', 'Quelques mots qui vous sont montrés pendant l’exécution'],
  ['pid', 'integer', '—', 'Identifiant de processus requis pour check/kill'],
])}
<p>Le mode « tout approuver » est la commande <code>/trustall</code> du propriétaire, jamais une action de l’outil.</p>

<h2>Logique d’approbation</h2>
<p>Une commande s’exécute sans demander lorsque l’une de ces conditions est remplie :</p>
<ol>
  <li>Son programme figure dans <code>terminal.allowed_prefixes</code> ou a été autorisé plus tôt. Pour un enchaînement (<code>&amp;&amp;</code>, <code>||</code>, <code>;</code>, <code>|</code>), le programme de chaque segment doit être autorisé.</li>
  <li>C’est une commande de compilation, de lint ou git en lecture seule figurant sur la liste confinée ; elle s’exécute alors dans le bac à sable.</li>
  <li>Le contrôle de sécurité de la commande entière par le modèle ne trouve rien qui ait besoin de vous.</li>
</ol>
<p>Un programme autorisé ne couvre pas une commande qui écrit un fichier par redirection, commence par une affectation de variable, ou lance un autre programme (<code>env sh -c</code>, <code>xargs</code>, <code>find -exec</code>). Une commande qui touche un chemin d’identifiants demande toujours. Si le contrôle de sécurité est indisponible, la commande demande (échec sûr). Voir <a href="/tools/command-risk">Évaluation du risque des commandes</a>.</p>

<h3>Préfixes autorisés par défaut</h3>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

<h2>Sortie</h2>
<p>Renvoie d’abord stdout, puis stderr (s’il y en a). La sortie est tronquée à <code>terminal.max_output_chars</code> (4000 caractères par défaut).</p>

<h2>Commandes en arrière-plan</h2>
<p>Si une commande dépasse le délai initial, elle passe en arrière-plan et renvoie un PID.</p>
<ul>
  <li><code>action="check"</code> + <code>pid</code> affiche la sortie partielle ou finale</li>
  <li><code>action="kill"</code> + <code>pid</code> arrête une commande en cours en arrière-plan</li>
  <li>La sortie récente des commandes terminées est conservée brièvement pour que les vérifications suivantes fonctionnent encore</li>
  <li>Les commandes qui se détachent en démon (<code>nohup</code>, <code>setsid</code>, <code>&amp; disown</code>&hellip;) demandent <code>detach=true</code> et l’approbation d’un propriétaire</li>
</ul>

<h2>Blocages stricts</h2>
<p>Certaines commandes sont refusées avant toute approbation et ne peuvent pas être autorisées : <code>rm</code>/<code>chmod</code>/<code>chown</code> récursifs sur la racine, le répertoire personnel ou les répertoires système, <code>mkfs</code>, <code>dd</code>/<code>shred</code>/<code>wipefs</code> sur un périphérique brut, et les suppressions récursives (<code>rm -r</code>, <code>find -delete</code>) de tout ce qui se trouve hors de l’espace de travail.</p>

<h2>Configuration</h2>
${codeBlock(`[terminal]
allowed_prefixes = ["ls", "cat", "head", "tail", "echo", "date"]
initial_timeout_secs = 30
max_output_chars = 4000
permission_mode = "default"
confinement = "host"   # or "sandbox"`, 'toml', 'config.toml')}
<p><code>confinement = "host"</code> (par défaut) exécute les commandes sur cette machine avec votre environnement et vos identifiants. <code>"sandbox"</code> exécute chaque commande dans le bac à sable du système (seatbelt sur macOS, bubblewrap ou le bac à sable de Codex sur Linux), sans réseau et avec seulement les fichiers de la tâche, sauf autorisation.</p>

<h2>Allow Always (persistant)</h2>
<p>Les cartes d’approbation proposent Allow Once, Allow Session (jusqu’au redémarrage) ou Allow Always, et Deny, dans n’importe quel canal ou dans l’application. Le mode prudent, et les commandes Critical en mode par défaut, proposent Allow Session au lieu de Allow Always. Lorsque vous choisissez « Allow Always » :</p>
<ol>
  <li>Le programme de la commande (son premier mot, ou le programme de chaque segment pour une commande enchaînée) devient le préfixe autorisé</li>
  <li>Le préfixe est ajouté à la liste autorisée en mémoire</li>
  <li>Le préfixe est enregistré dans la base de données pour l’espace de travail courant (<code>terminal_backend_allowed_prefixes</code>), de sorte que chaque cible d’exécution garde ses propres approbations</li>
  <li>Au redémarrage, les préfixes persistés sont fusionnés avec les préfixes de la configuration</li>
</ol>
<p>Cela signifie que les approbations « Allow Always » survivent aux redémarrages du daemon sans modifier config.toml.</p>

${callout('danger', 'Sessions non fiables', 'Les sessions issues de déclencheurs (e-mail, etc.) sont signalées comme non fiables. <strong>Toutes</strong> les commandes des sessions non fiables demandent une approbation, quelle que soit la liste d’autorisations.')}
`
  },
  {
    slug: '/tools/command-risk',
    section: 'Tools',
    title: 'Évaluation du risque des commandes',
    description: 'Comment AIDaemon décide quand une commande de terminal a besoin de votre approbation, et quel risque indique la carte.',
    content: () => `
<h1>Évaluation du risque des commandes</h1>
<p class="lead">Une commande que vous n’avez pas déjà autorisée est examinée par le modèle, qui classe ce que fait réellement la commande entière (lectures, modifications locales, réseau, déploiements, suppressions, secrets&hellip;). Les commandes qui ont besoin de vous reçoivent une carte d’approbation notée Safe, Medium, High ou Critical.</p>

<h2>Niveaux de risque</h2>
<table class="config-table">
<thead><tr><th>Niveau</th><th>La carte indique</th></tr></thead>
<tbody>
<tr><td><strong>Safe</strong></td><td>Nouvelle commande</td></tr>
<tr><td><strong>Medium</strong></td><td>Approbation requise</td></tr>
<tr><td><strong>High</strong></td><td>À examiner attentivement</td></tr>
<tr><td><strong>Critical</strong></td><td>Action dangereuse. Également utilisé pour les commandes qui se détachent en démon et chaque fois que le contrôle de sécurité est indisponible.</td></tr>
</tbody>
</table>
<p>Le niveau vient du contrôle de sécurité, pas d’une liste fixe. Les déploiements, les envois (push), les envois de messages, les suppressions, les changements système, l’élévation de privilèges, l’exécution de code téléchargé et tout ce qu’il ne peut pas déterminer demandent une approbation. Les compilations, les tests et les modifications dans l’espace de travail, ainsi que l’accès réseau en lecture seule, n’en demandent pas.</p>

<h2>Modes de permission</h2>
${configTable([
  ['default', '—', '—', 'Les cartes proposent Allow Always, sauf les cartes Critical, qui proposent Allow Session (jusqu’au redémarrage).'],
  ['cautious', '—', '—', 'Toutes les approbations ne valent que pour la session.'],
  ['yolo', '—', '—', 'Chaque commande s’exécute sans demander (les chemins d’identifiants et les sessions non fiables demandent toujours), et chaque approbation est persistante, y compris Critical.'],
])}

<h2>Ce qu’un programme autorisé ne couvre pas</h2>
<p>Autoriser un programme couvre l’exécution de ce programme, rien de plus. Un enchaînement exige que le programme de chaque segment soit autorisé. Une redirection vers un fichier, une affectation de variable en tête, ou le lancement d’un autre programme par son intermédiaire (<code>env</code>, <code>xargs</code>, <code>find -exec</code>/<code>-delete</code>, <code>sh -c</code>) est jugé comme n’importe quelle nouvelle commande.</p>

<h2>Détection des chemins sensibles</h2>
<p>Les commandes qui font référence à ces chemins demandent toujours, même lorsque le programme est autorisé :</p>
<ul>
  <li><code>.ssh</code>, <code>.env</code> (pas <code>.env.example</code>), clés SSH <code>id_rsa</code>, <code>id_ed25519</code>, <code>id_dsa</code>, <code>id_ecdsa</code></li>
  <li>Authentification système : <code>shadow</code>, <code>sudoers</code></li>
  <li>Identifiants : <code>credentials</code> (par ex. <code>.aws/credentials</code>), <code>secrets</code>, <code>master.key</code>, <code>.netrc</code>, <code>.pgpass</code>, <code>.npmrc</code>, <code>.pypirc</code></li>
</ul>

<h2>Blocages stricts</h2>
<p>Certaines commandes sont refusées avant toute approbation et ne peuvent pas être autorisées : <code>rm</code>/<code>chmod</code>/<code>chown</code> récursifs sur la racine, le répertoire personnel ou les répertoires système, <code>mkfs</code>, <code>dd</code>/<code>shred</code>/<code>wipefs</code> sur un périphérique brut, et les suppressions récursives (<code>rm -r</code>, <code>find -delete</code>) de tout ce qui se trouve hors de l’espace de travail.</p>

<h2>Les approbations sont des hooks du noyau</h2>
<p>Le terminal ne demande jamais rien de lui-même. Chaque appel déclare ses effets ; la politique d’approbation du noyau de l’agent (blocages stricts, puis les règles du terminal, puis vos autorisations) décide de l’exécuter, de vous demander, ou de refuser. Un refus bloque aussi les autres appels de la même exécution qui feraient la même chose.</p>

${callout('info', 'Configuration', 'Définissez <code>terminal.permission_mode</code> dans config.toml. La valeur par défaut est <code>"default"</code>.')}
`
  },
  {
    slug: '/tools/system-info',
    section: 'Tools',
    title: 'Outil d’informations système',
    description: 'Interrogez le système, le nom d’hôte, la durée de fonctionnement et la mémoire de l’environnement d’exécution configuré avec l’outil d’informations système.',
    content: () => `
<h1>Outil d’informations système</h1>
<p class="lead">Interroge les informations de base de l’environnement d’exécution configuré (cette machine, un conteneur Docker ou un hôte SSH). Toujours activé, sans paramètres.</p>

<h2>Paramètres</h2>
<p>Aucun — cet outil ne prend aucun argument.</p>

<h2>Sortie</h2>
<p>Renvoie un rapport texte avec :</p>
<ul>
  <li><strong>Nom d’hôte</strong></li>
  <li><strong>Système d’exploitation</strong></li>
  <li><strong>Durée de fonctionnement</strong></li>
  <li><strong>Utilisation de la mémoire</strong></li>
</ul>

<p>La mémoire est collectée de façon propre à chaque plateforme :</p>
<ul>
  <li><strong>Linux :</strong> analysée depuis <code>free -h</code></li>
  <li><strong>macOS :</strong> analysée depuis <code>vm_stat</code></li>
</ul>
`
  },
  {
    slug: '/tools/memory',
    section: 'Tools',
    title: 'Outil mémoire / faits',
    description: 'Enregistrez, cherchez et oubliez des faits à long terme qui persistent d’une session à l’autre ; les plus pertinents sont rappelés à chaque tour.',
    content: () => `
<h1>Outil mémoire / faits</h1>
<p class="lead">Enregistre et récupère des faits à long terme qui persistent d’une session à l’autre. Les faits pertinents pour chaque message sont rappelés dans le prompt.</p>

<h2>Nom de l’outil</h2>
<p><code>remember_fact</code></p>

<h2>Paramètres</h2>
${configTable([
  ['category', 'string', '—', 'Catégorie de regroupement (par ex. "user", "preference", "project")'],
  ['key', 'string', '—', 'Identifiant unique au sein de la catégorie'],
  ['value', 'string', '—', 'Le contenu du fait à enregistrer'],
  ['delete', 'bool', 'false', 'Oublie category/key au lieu d’enregistrer'],
  ['evidence', 'string', '—', 'Vos propres mots énonçant le fait, cités'],
  ['scope', 'string', 'project', 'Dans une conversation de projet : project le garde dans les notes du projet, personal le garde pour vous'],
  ['facts', 'array', '—', 'Plusieurs faits en un seul appel, chacun avec les mêmes champs'],
])}

<h2>Stockage</h2>
<p>Les faits sont stockés dans la table <code>facts</code> de SQLite. Enregistrer une nouvelle valeur pour la même catégorie et la même clé la remplace. L’ancienne valeur est conservée comme historique remplacé, et les clés quasi dupliquées (par exemple <code>editor</code> et <code>preferred_editor</code>) sont fusionnées.</p>

<h2>Rappel</h2>
<p>Les faits ne sont pas tous injectés. À chaque tour, les faits les plus pertinents pour votre message (au plus 8, et jamais plus que <code>state.max_facts</code>, 20 par défaut) apparaissent sous <code>## Relevant Memory</code>, chacun avec la date de son enregistrement. Votre nom et l’identité de l’agent sont épinglés à part. L’agent cherche tout le reste avec <code>manage_memories</code>.</p>

${codeBlock(`## Relevant Memory
- Fact [12] (recorded 2026-10-02) user/timezone = US/Pacific
- Fact [31] (recorded 2026-09-14) project/language = Rust`, 'text', 'system prompt')}

<h2>Trouver et gérer les souvenirs</h2>
<p><code>manage_memories</code> cherche dans les faits enregistrés (<code>search</code>), les liste, cherche dans les résumés des conversations passées (<code>search_episodes</code>), oublie un fait, définit qui peut en voir un (<code>set_privacy</code> : global, channel ou private), et suit les objectifs personnels. Pour les messages exacts des conversations passées, utilisez <code>search_history</code>.</p>

<h2>Schéma de la table des faits</h2>
${configTable([
  ['id', 'integer', 'auto', 'Clé primaire auto-incrémentée'],
  ['category', 'string', '—', 'Catégorie de regroupement'],
  ['key', 'string', '—', 'Clé du fait (unique par catégorie parmi les faits actuels)'],
  ['value', 'string', '—', 'Contenu du fait'],
  ['source', 'string', '""', 'Qui l’a enregistré, par ex. "agent"'],
  ['privacy', 'string', 'global', 'Qui peut le voir : global, channel ou private'],
  ['channel_id', 'string', '—', 'Canal dans lequel il a été appris'],
  ['superseded_at', 'timestamp', '—', 'Renseigné lorsqu’une valeur plus récente l’a remplacé'],
  ['created_at', 'timestamp', 'now', 'Quand le fait a été créé'],
  ['updated_at', 'timestamp', 'now', 'Quand le fait a été mis à jour pour la dernière fois'],
])}
`
  },
  {
    slug: '/tools/config-manager',
    section: 'Tools',
    title: 'Outil de gestion de la configuration',
    description: 'L’agent AIDaemon peut lire, mettre à jour, valider et restaurer son propre fichier de configuration, et changer de fournisseur.',
    content: () => `
<h1>Outil de gestion de la configuration</h1>
<p class="lead">L’agent peut lire, mettre à jour, valider et restaurer son propre fichier de configuration.</p>

<h2>Nom de l’outil</h2>
<p><code>manage_config</code></p>

<h2>Actions</h2>

<h3>read</h3>
<p>Renvoie tout le contenu de config.toml avec les champs sensibles masqués :</p>
${codeBlock(`api_key = "***REDACTED***"
bot_token = "***REDACTED***"
password = "***REDACTED***"`, 'toml')}

<h3>get</h3>
<p>Lit un chemin de clé TOML précis :</p>
${codeBlock(`action: "get"
key: "provider.models.default"
# Returns: "gemini-3-flash-preview"`, 'text')}

<h3>set</h3>
<p>Met à jour une clé précise avec une nouvelle valeur (format littéral TOML) :</p>
${codeBlock(`action: "set"
key: "state.working_memory_cap"
value: "100"`, 'text')}

<p>Avant d’écrire :</p>
<ol>
  <li>Crée une sauvegarde (rotation en anneau sur 3 niveaux : <code>.bak</code> → <code>.bak.1</code> → <code>.bak.2</code>)</li>
  <li>Valide la nouvelle configuration (syntaxe TOML + désérialisation complète)</li>
  <li>Règle les permissions du fichier à 0600 (propriétaire seul) sous Unix</li>
</ol>

<h3>unset</h3>
<p>Supprime une clé.</p>

<h3>restore</h3>
<p>Revient à la sauvegarde la plus récente (<code>.bak</code>, puis <code>.bak.1</code>, <code>.bak.2</code>). Lancez <code>/reload</code> pour l’appliquer.</p>

<h3>Actions sur les fournisseurs</h3>
<p><code>list_provider_presets</code> et <code>switch_provider</code> changent le fournisseur de modèle ; <code>list_failover_providers</code>, <code>add_failover_provider</code>, <code>remove_failover_provider</code> et <code>move_failover_provider</code> gèrent les fournisseurs de secours.</p>

<h3>Actions de configuration</h3>
<p><code>enable_stt</code>, <code>enable_client_gateway</code>, <code>enable_exposure</code>.</p>

${callout('warn', 'Secrets', 'Les clés d’API et les tokens ne sont jamais des arguments d’outil. Enregistrez-en un vous-même avec <code>aidaemon keychain set &lt;key&gt;</code> ; le réglage contient alors la valeur <code>keychain</code>.')}

${callout('info', 'Dernière configuration valide', 'Après chaque appel LLM réussi, la configuration actuelle est estampillée <code>.toml.lastgood</code>. C’est le premier fichier essayé lorsque la configuration ne se charge pas au démarrage.')}

<h2>Ordre de récupération au démarrage</h2>
<ol>
  <li><code>config.toml.lastgood</code> — configuration dont le bon fonctionnement est prouvé</li>
  <li><code>config.toml.bak</code> — sauvegarde la plus récente</li>
  <li><code>config.toml.bak.1</code></li>
  <li><code>config.toml.bak.2</code></li>
</ol>
`
  },
  {
    slug: '/tools/browser',
    section: 'Tools',
    title: 'Outil navigateur',
    description: 'Automatisation de Chrome avec sessions de connexion persistantes pour la navigation web, le remplissage de formulaires, les captures d’écran et les PDF.',
    content: () => `
<h1>Outil navigateur</h1>
<p class="lead">Automatisation de Chrome avec sessions de connexion persistantes. Connectez-vous une fois, et l’agent peut parcourir en votre nom des sites authentifiés.</p>

${callout('success', 'Binaires précompilés', 'Si vous avez installé via le script en une ligne ou Homebrew, l’outil navigateur est déjà inclus. Activez-le simplement dans <code>config.toml</code> ci-dessous. Il fait aussi partie de la compilation par défaut depuis les sources.')}

<h2>Démarrage rapide</h2>
<p>Deux étapes pour que l’agent navigue avec vos sessions de connexion :</p>

<h3>1. Connectez-vous à vos services</h3>
${codeBlock(`aidaemon browser login`, 'bash')}
<p>Chrome s’ouvre avec un profil dédié. Connectez-vous aux services auxquels vous voulez que l’agent accède (Gmail, GitHub, AWS Console, Jira, etc.), puis fermez Chrome. Vos sessions sont enregistrées dans <code>~/.aidaemon/chrome-profile/</code> et persistent d’un redémarrage à l’autre.</p>

<h3>2. Activez l’outil navigateur</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}

<p>C’est tout. L’agent peut maintenant parcourir des sites authentifiés avec vos sessions enregistrées.</p>

${callout('info', 'Essayez', 'Envoyez à l’agent un message comme <em>« Va sur https://mail.google.com et fais une capture d’écran »</em> — il devrait montrer votre boîte de réception, déjà connectée.')}

<h2>Configuration</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Active l’outil navigateur'],
  ['headless', 'bool', 'true', 'Exécute Chrome sans fenêtre visible'],
  ['screenshot_width', 'int', '1280', 'Largeur de la zone d’affichage du navigateur en pixels'],
  ['screenshot_height', 'int', '720', 'Hauteur de la zone d’affichage du navigateur en pixels'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Répertoire du profil Chrome pour les sessions persistantes'],
  ['profile', 'string', 'Default', 'Nom du profil Chrome dans user_data_dir'],
  ['keep_sign_ins', 'bool', 'true', 'Conserve les connexions dans ~/.aidaemon/chrome-profile ; désactivé = un profil neuf à chaque fois'],
  ['session_isolation', 'string', 'auto', 'Comment les sessions sont isolées : browser_context ou page'],
  ['nav_timeout_secs', 'int', '30', 'Attente du chargement de la page'],
  ['element_timeout_secs', 'int', '10', 'Attente par défaut de l’action wait'],
  ['action_timeout_secs', 'int', '30', 'Plafond par action'],
  ['remote_debugging_port', 'int', 'null', 'Se connecte à une instance Chrome existante sur ce port (avancé)'],
])}

<h3>Configuration minimale</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}
<p>Tout le reste a des valeurs par défaut raisonnables. Les sessions sont enregistrées automatiquement dans <code>~/.aidaemon/chrome-profile/</code>.</p>

<h2>Actions</h2>

<table class="config-table">
<thead><tr><th>Action</th><th>Paramètres</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>navigate</code></td><td><code>url</code></td><td>Ouvre une URL et attend le chargement de la page (jusqu’à <code>nav_timeout_secs</code>, 30 s par défaut)</td></tr>
<tr><td><code>screenshot</code></td><td><code>selector?, full_page?, deliver?</code></td><td>PNG de la zone visible, d’un élément ou de la page entière</td></tr>
<tr><td><code>render_pdf</code></td><td><code>source_path, output_filename?</code></td><td>Convertit un fichier HTML local en PDF</td></tr>
<tr><td><code>click</code></td><td><code>selector</code></td><td>Clique sur un élément par sélecteur CSS</td></tr>
<tr><td><code>fill</code></td><td><code>selector, value</code></td><td>Saisit du texte dans un champ de formulaire</td></tr>
<tr><td><code>get_text</code></td><td><code>selector?</code></td><td>Extrait le contenu texte d’un élément ou de la page entière</td></tr>
<tr><td><code>inspect_page</code></td><td>—</td><td>Décrit la structure de la page et ses éléments interactifs</td></tr>
<tr><td><code>scroll</code></td><td><code>direction?, amount?</code></td><td>Fait défiler vers le haut ou le bas (700 px par défaut)</td></tr>
<tr><td><code>execute_js</code></td><td><code>script</code></td><td>Exécute du JavaScript et renvoie le résultat (demande toujours d’abord)</td></tr>
<tr><td><code>wait</code></td><td><code>selector, condition?, text?, timeout_secs?</code></td><td>Attend qu’un élément soit présent, visible, activé, masqué ou contienne du texte (par défaut <code>element_timeout_secs</code>, 10 s)</td></tr>
<tr><td><code>list_tabs</code>, <code>new_tab</code>, <code>switch_tab</code>, <code>close_tab</code></td><td><code>url?</code> / <code>tab_id</code></td><td>Travaille avec plusieurs onglets</td></tr>
<tr><td><code>get_console_logs</code>, <code>get_network_errors</code></td><td><code>tab_id?</code></td><td>Lit la console de la page et les requêtes en échec</td></tr>
<tr><td><code>set_mode</code></td><td><code>value</code></td><td>Bascule entre visible et headless</td></tr>
<tr><td><code>close</code></td><td>—</td><td>Ferme la session de navigateur</td></tr>
</tbody>
</table>

<h2>Approbations</h2>
<p>La navigation publique et la lecture de pages ne demandent aucune approbation. Ouvrir un site sur cet ordinateur demande une fois par site, les modifications de page peuvent demander, et <code>execute_js</code> demande toujours.</p>

<h2>Persistance des sessions</h2>
<p>L’outil navigateur utilise un profil Chrome dédié dans <code>~/.aidaemon/chrome-profile/</code>, qui stocke les cookies, le stockage local et les sessions de connexion. Cela signifie que :</p>
<ul>
  <li>Une fois connecté via <code>aidaemon browser login</code>, les sessions persistent indéfiniment</li>
  <li>L’agent lance Chrome en mode headless avec ce profil — déjà authentifié</li>
  <li>Les sessions survivent aux redémarrages d’AIDaemon et du système</li>
  <li>Relancez <code>aidaemon browser login</code> à tout moment pour ajouter de nouveaux services ou rafraîchir des sessions expirées</li>
</ul>

${callout('warn', 'Isolé de votre Chrome personnel', 'L’agent utilise son propre profil Chrome, complètement séparé de votre navigateur personnel. Vos favoris, extensions et sessions personnels ne sont jamais touchés.')}

<h2>Modes de déploiement</h2>

<h3>Instance isolée (recommandé)</h3>
<p>Lorsque AIDaemon tourne sur un serveur ou une VM dédiés, aucun autre Chrome n’est en cours d’exécution. L’agent lance Chrome et en reste directement propriétaire.</p>
${codeBlock(`# SSH into your instance
ssh user@my-server

# One-time: log into services
aidaemon browser login

# Config
# [browser]
# enabled = true

# Done — agent handles Chrome automatically from here`, 'bash')}
<p>Pour les serveurs headless, utilisez SSH avec redirection X (<code>ssh -X</code>) ou VNC pour la première connexion.</p>

<h3>Ordinateur personnel</h3>
<p>Lorsque AIDaemon tourne à côté de votre Chrome personnel, l’agent lance une instance Chrome distincte avec son propre profil. Les deux fonctionnent côte à côte sans conflit.</p>
${codeBlock(`# Same setup — separate Chrome instance, no conflict
aidaemon browser login

# Your personal Chrome (47 tabs, extensions, bookmarks) → untouched
# AIDaemon's Chrome (~/.aidaemon/chrome-profile/) → isolated`, 'bash')}

<h3>Avancé : se connecter à un Chrome existant</h3>
<p>Pour les utilisateurs avancés qui veulent se connecter à une instance Chrome déjà lancée avec un port de débogage distant :</p>
${codeBlock(`[browser]
enabled = true
remote_debugging_port = 9222`, 'toml', 'config.toml')}
<p>Lancez Chrome avec <code>--remote-debugging-port=9222</code> et l’agent s’y connecte directement. Cela partage les sessions de l’instance Chrome mais exige que Chrome soit lancé avec l’option de débogage.</p>

<h2>Captures d’écran</h2>
<p>Les captures d’écran sont enregistrées pour que l’agent les regarde. Une vous est envoyée lorsque l’agent la désigne comme le livrable que vous avez demandé (<code>deliver: true</code>).</p>

<h2>Regarder et prendre la main</h2>
<p>Avec <code>[surfaces]</code> activé (par défaut), vous pouvez regarder le navigateur de l’agent et en prendre la main depuis une application appairée, et l’agent peut vous le passer pour vous connecter (<code>hand_over</code>).</p>

<h2>Cas d’usage</h2>
<ul>
  <li><strong>Supervision</strong> — consulter des tableaux de bord (Grafana, Vercel, AWS Console), capturer l’état d’un déploiement</li>
  <li><strong>Extraction de données</strong> — récupérer des pages rendues en JS, extraire des rapports de panneaux d’administration</li>
  <li><strong>Automatisation de workflows</strong> — remplir des formulaires, parcourir des parcours en plusieurs étapes sur des outils internes</li>
  <li><strong>Tests</strong> — parcourir votre application déployée, vérifier l’interface, contrôler les mises en page adaptatives</li>
  <li><strong>Navigation authentifiée</strong> — interagir avec tout service auquel vous êtes connecté, sans clé d’API</li>
</ul>

<h2>Compiler depuis les sources</h2>
<p>La fonctionnalité <code>browser</code> est activée par défaut, donc un simple <code>cargo build --release</code> l’inclut. Les compilations avec <code>--no-default-features</code> doivent ajouter <code>--features browser</code>.</p>
<p>Nécessite un navigateur basé sur Chromium installé (Chrome, Chromium, Brave ou Edge).</p>
`
  },
  {
    slug: '/tools/sub-agents',
    section: 'Tools',
    title: 'Lancement de sous-agents',
    description: 'Déléguez un travail ciblé à des sous-agents et à des spécialistes nommés, seuls ou plusieurs en parallèle.',
    content: () => `
<h1>Lancement de sous-agents</h1>
<p class="lead">L’agent peut déléguer un travail ciblé à de nouveaux sous-agents et à des spécialistes nommés, un à la fois ou plusieurs en parallèle.</p>

<h2>Nom de l’outil</h2>
<p><code>spawn_agent</code></p>

<h2>Paramètres</h2>
${configTable([
  ['task', 'string', '—', 'Ce que le sous-agent doit faire'],
  ['mission', 'string', 'title', 'Objectif plus large facultatif pour son contexte'],
  ['title', 'string', '—', 'Quelques mots affichés sur sa carte'],
  ['specialist', 'string', 'executor', 'code, research, review, browser_verifier, artifact_writer, comms_draft, executor ou generic'],
  ['tasks', 'array', '—', 'Plusieurs sous-agents en un seul appel (jusqu’à 6, 3 à la fois)'],
  ['background', 'bool', 'false', 'Exécute en arrière-plan ; le résultat est envoyé dans votre chat'],
  ['tools', 'array', '—', 'Limite les outils qu’il peut utiliser'],
  ['access', 'string', '—', 'read_only pour seulement observer'],
  ['scope', 'array', '—', 'Fichiers ou dossiers qu’il peut modifier'],
  ['model_tier', 'string', 'same', 'fast, primary ou smart'],
])}

<h2>Comportement</h2>
<ul>
  <li>L’agent enfant s’exécute à <code>parent_depth + 1</code></li>
  <li>Hérite des outils et de l’accès du parent (jamais plus), et de son modèle sauf si <code>model_tier</code> est défini</li>
  <li>Reçoit un prompt système ciblé : instructions de base + contexte de la mission</li>
  <li>Exécute une boucle agentique complète dans une session isolée</li>
  <li>Renvoie sa réponse textuelle finale au parent (tronquée à <code>max_response_chars</code>)</li>
  <li>Si <code>child_depth &lt; max_depth</code>, l’enfant reçoit aussi l’outil <code>spawn_agent</code> ; un spécialiste nommé ne délègue plus loin que si ses outils incluent <code>spawn_agent</code></li>
</ul>

<h2>Spécialistes</h2>
<p>Un sous-agent peut s’exécuter comme spécialiste nommé, avec ses propres instructions et outils. Remplacez-en un en plaçant <code>&lt;kind&gt;.md</code> dans <code>~/.aidaemon/specialists/</code>.</p>

<h2>Configuration</h2>
${codeBlock(`[subagents]
enabled = true
max_depth = 3
max_response_chars = 8000
timeout_secs = 300        # stopped after this long with no progress
max_concurrent = 4
max_per_request = 12
task_token_budget = 500000`, 'toml', 'config.toml')}
<p><code>max_iterations</code> est une clé héritée. Il n’y a pas de limite d’étapes par défaut.</p>

${callout('info', 'Limite de récursion', 'Les sous-agents peuvent lancer leurs propres sous-agents jusqu’à <code>max_depth</code> niveaux de profondeur. À la profondeur maximale, l’outil spawn_agent n’est pas fourni.')}

${callout('info', 'Pas de limite de temps réel', 'Un sous-agent n’est arrêté qu’après <code>timeout_secs</code> sans progression (aucun outil en cours, aucune réponse du modèle). Un long travail qui continue de progresser va jusqu’au bout, borné par son budget de tokens.')}
`
  },
  {
    slug: '/tools/cli-agents',
    section: 'Tools',
    title: 'Délégation à des agents CLI',
    description: 'Déléguez du travail de code à Claude Code, Codex, Antigravity CLI, Gemini CLI, Copilot, Aider ou à tout agent Agent Client Protocol, dans un mode de permission de votre choix.',
    content: () => `
<h1>Délégation à des agents CLI</h1>
<p class="lead">Délègue des tâches à des agents de code externes (Claude Code, Codex, Antigravity CLI, Gemini CLI, Copilot, Aider) ou à tout agent qui parle l’Agent Client Protocol, chacun dans un mode de permission de votre choix.</p>

<h2>Nom de l’outil</h2>
<p><code>cli_agent</code></p>

<h2>Paramètres</h2>
${configTable([
  ['action', 'string', '—', 'run, check, cancel ou list (obligatoire)'],
  ['tool', 'string', '—', 'Nom de l’agent, par ex. claude, codex, agy'],
  ['prompt', 'string', '—', 'La tâche'],
  ['title', 'string', '—', 'Quelques mots affichés sur la carte d’exécution'],
  ['working_dir', 'string', '—', 'Répertoire absolu ; lisible, non modifiable par lui-même'],
  ['workspace_mode', 'string', '—', 'read_only ou read_write'],
  ['write_paths', 'array', '—', 'Fichiers/dossiers qu’une exécution read_write peut modifier (obligatoire pour read_write)'],
  ['read_paths', 'array', '—', 'Chemins lisibles supplémentaires'],
  ['scope', 'array', '—', 'Fichiers ou dossiers que l’exécution modifiera'],
  ['new_folders', 'array', '—', 'Nouveaux dossiers créés pour l’exécution'],
  ['async_mode', 'bool', 'false', 'Exécute en arrière-plan'],
  ['system_instruction', 'string', '—', 'Façonne l’agent en spécialiste'],
])}
<p><code>manage_cli_agents</code> ajoute, retire, liste, active et désactive des agents à l’exécution et montre l’historique des exécutions, sans redémarrage.</p>

<h2>Agents découverts</h2>
<p>Lorsque <code>cli_agents.enabled = true</code> sans configuration explicite d’outils, ceux-ci sont enregistrés si leur commande est installée :</p>

<table class="config-table">
<thead><tr><th>Nom</th><th>Agent</th><th>Commande</th></tr></thead>
<tbody>
<tr><td>claude</td><td>Claude Code</td><td><code>claude -p --output-format stream-json --verbose</code></td></tr>
<tr><td>codex</td><td>Codex</td><td><code>codex exec --json</code></td></tr>
<tr><td>agy</td><td>Antigravity CLI (Agent Client Protocol)</td><td><code>agy acp</code></td></tr>
<tr><td>gemini</td><td>Gemini CLI (Agent Client Protocol)</td><td><code>gemini --acp</code></td></tr>
<tr><td>copilot</td><td>Copilot CLI</td><td><code>copilot -p</code></td></tr>
<tr><td>aider</td><td>Aider</td><td><code>aider --message</code></td></tr>
</tbody>
</table>

<p>Lorsqu’un appel ne nomme aucun outil, le premier disponible parmi <code>claude</code>, <code>codex</code>, <code>agy</code>, <code>copilot</code>, <code>aider</code> est utilisé. Gemini CLI ne figure pas dans cet ordre (Google ne le sert plus qu’aux licences entreprise et aux clés d’API payantes) ; il est utilisé lorsqu’on le nomme, et sa vérification de disponibilité signale une connexion personnelle refusée.</p>

<h2>Modes de permission</h2>
<p>Chaque agent de code s’exécute dans l’un des trois modes, défini par agent sur la page Settings de l’application :</p>
<table class="config-table">
<thead><tr><th>Mode</th><th>Comportement</th></tr></thead>
<tbody>
<tr><td><strong>Checked by AIDaemon</strong> (par défaut)</td><td>Confiné au dossier du projet par le bac à sable propre à l’agent ; tout ce qui dépasse est demandé d’abord et jugé selon vos propres règles</td></tr>
<tr><td><strong>Every command checked</strong></td><td>S’exécute sur la machine elle-même, chaque commande et chaque modification de fichier (sauf la courte liste de commandes en lecture seule propre à l’agent) étant demandée d’abord</td></tr>
<tr><td><strong>Full access</strong></td><td>S’exécute sur la machine sans rien demander. Le choisir vous demande d’abord confirmation.</td></tr>
</tbody>
</table>
<p>Claude Code et Codex interrogent AIDaemon au lieu de refuser eux-mêmes, de sorte que vos autorisations répondent à ce qu’elles couvrent et qu’une carte demande le reste. Settings montre aussi si chaque agent peut travailler maintenant (<strong>Ready</strong>, ou <strong>Not usable</strong> avec sa raison et sa solution, et <strong>Check again</strong>) ; le travail n’est jamais routé vers un agent qui ne peut pas s’exécuter.</p>

<h2>Tout agent Agent Client Protocol</h2>
<p>Un agent qui parle l’<a href="https://agentclientprotocol.com" target="_blank" rel="noopener">Agent Client Protocol</a> peut être ajouté sous <code>[cli_agents.tools.&lt;name&gt;]</code> avec <code>protocol = "acp"</code>. AIDaemon l’héberge via le protocole, et chaque action qu’il entreprend est demandée d’abord, de sorte que chacune peut être jugée.</p>
${codeBlock(`[cli_agents.tools.my-acp-agent]
command = "my-acp-agent"
args = ["--acp"]            # whatever starts its protocol server
protocol = "acp"
description = "An ACP coding agent"`, 'toml', 'config.toml')}

<h2>Configuration personnalisée</h2>
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
<p>Définir n’importe quelle entrée <code>[cli_agents.tools.*]</code> remplace la liste découverte. Un lancement enregistré ne peut pas élargir ce qu’un agent connu peut faire : les arguments qui contourneraient son bac à sable ou ses approbations sont refusés.</p>

<h2>Extraction de la sortie</h2>
<p>L’outil tente d’extraire une sortie structurée :</p>
<ul>
  <li><strong>JSON :</strong> cherche les champs <code>result</code>, <code>output</code>, <code>content</code> ou <code>message</code></li>
  <li><strong>JSONL :</strong> prend la dernière ligne contenant du contenu</li>
  <li><strong>Repli :</strong> renvoie la sortie brute, tronquée à <code>max_output_chars</code></li>
</ul>
`
  },
  {
    slug: '/tools/web-search',
    section: 'Tools',
    title: 'Outil de recherche web',
    description: 'Cherchez sur le web via DuckDuckGo, Brave ou SearxNG en parallèle et obtenez des titres, des URL et des extraits fusionnés.',
    content: () => `
<h1>Outil de recherche web</h1>
<p class="lead">Cherche sur le web et renvoie des titres, des URL et des extraits. Prend en charge DuckDuckGo (par défaut, aucune clé nécessaire), Brave et un SearxNG auto-hébergé. Par défaut, chaque moteur configuré est interrogé en parallèle, et les résultats sont fusionnés et dédoublonnés.</p>

<h2>Nom de l’outil</h2>
<p><code>web_search</code></p>

<h2>Paramètres</h2>
${configTable([
  ['query', 'string', '—', 'La requête de recherche (obligatoire)'],
  ['max_results', 'integer', '8', 'Nombre maximal de résultats fusionnés (20 au maximum)'],
  ['freshness', 'string', '—', 'Uniquement les résultats du dernier jour, de la dernière semaine, du dernier mois ou de la dernière année'],
])}

<h2>Moteurs</h2>
<table class="config-table">
<thead><tr><th>Moteur</th><th>Clé d’API</th><th>Fonctionnement</th></tr></thead>
<tbody>
<tr><td><strong>DuckDuckGo</strong> (par défaut)</td><td>Non requise</td><td>Récupère <code>https://lite.duckduckgo.com/lite/</code> et analyse les résultats HTML</td></tr>
<tr><td><strong>Brave</strong></td><td>Requise</td><td>Appelle l’API JSON <code>https://api.search.brave.com/res/v1/web/search</code></td></tr>
<tr><td><strong>SearxNG</strong></td><td>Non requise</td><td>Votre propre instance à <code>search.searxng_url</code></td></tr>
</tbody>
</table>

<h2>Configuration</h2>
${codeBlock(`[search]
backend = "duckduckgo"   # or "brave", "searxng"
api_key = "keychain"     # Brave only; store it with: aidaemon keychain set search_api_key
searxng_url = ""         # e.g. "http://localhost:8080"
parallel = true          # search every configured backend and merge`, 'toml', 'config.toml')}

<h2>Format de sortie</h2>
<p>Renvoie des résultats markdown numérotés. L’ancienneté et les sources apparaissent lorsqu’elles sont connues, ou lorsque plusieurs moteurs ont répondu :</p>
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
    title: 'Outil de récupération web',
    description: 'Récupérez n’importe quelle URL et extrayez son contenu lisible. Prend en charge la conversion HTML en texte avec des limites configurables.',
    content: () => `
<h1>Outil de récupération web</h1>
<p class="lead">Récupère une URL et extrait son contenu lisible. Toujours activé, aucune configuration requise.</p>

<h2>Nom de l’outil</h2>
<p><code>web_fetch</code></p>

<h2>Paramètres</h2>
${configTable([
  ['url', 'string', '—', 'L’URL à récupérer (obligatoire)'],
  ['max_chars', 'integer', '20000', 'Nombre maximal de caractères renvoyés (50000 au maximum)'],
  ['offset', 'integer', '0', 'Caractères à ignorer, pour lire au-delà d’une réponse tronquée'],
])}

<h2>Comportement</h2>
<ol>
  <li>Refuse les adresses de réseau privé, de bouclage et de métadonnées cloud, y compris après redirections. Utilisez <code>http_request</code> pour les API.</li>
  <li>Récupère l’URL avec des en-têtes semblables à ceux d’un navigateur (user-agent Firefox, en-têtes Accept standard)</li>
  <li>Tente une extraction de lisibilité pour obtenir un texte d’article propre</li>
  <li>Se replie sur une conversion complète du HTML en markdown</li>
  <li>Tronque à <code>max_chars</code> à une frontière UTF-8 sûre</li>
</ol>

${callout('info', 'Complète l’outil navigateur', 'Utilisez <code>web_fetch</code> pour une extraction rapide de contenu sans lancer Chrome. Utilisez l’<a href="/tools/browser">outil navigateur</a> pour les pages interactives qui demandent du JavaScript, le remplissage de formulaires ou des captures d’écran.')}
`
  },
  {
    slug: '/tools/send-file',
    section: 'Tools',
    title: 'Transfert de fichiers',
    description: 'Envoyez et recevez des fichiers via Telegram, Slack, Discord ou l’application. Validation des chemins et blocage des fichiers sensibles intégrés.',
    content: () => `
<h1>Transfert de fichiers</h1>
<p class="lead">Envoie des fichiers à l’utilisateur dans le chat en cours (Telegram, Slack, Discord ou l’application), et reçoit des fichiers de l’utilisateur. Valide les chemins et bloque les fichiers sensibles.</p>

<h2>Nom de l’outil</h2>
<p><code>send_file</code> (sortant)</p>

<h2>Paramètres</h2>
${configTable([
  ['resource_id', 'string', '—', 'Identifiant (res_…) d’une pièce jointe ou d’un fichier créé par un outil ; à privilégier'],
  ['file_path', 'string', '—', 'Chemin absolu exact, lorsqu’il n’y a pas de resource_id'],
  ['caption', 'string', 'null', 'Légende facultative du fichier'],
])}

<h2>Configuration</h2>
${codeBlock(`[files]
enabled = true        # on by default
inbox_dir = "~/.aidaemon/files/inbox"
outbox_dirs = ["~"]
max_file_size_mb = 10
retention_hours = 24`, 'toml', 'config.toml')}

<h2>Sécurité</h2>
<p>L’outil impose des restrictions de chemin pour éviter la fuite accidentelle de secrets :</p>
<ul>
  <li><strong>Chemins autorisés :</strong> uniquement les fichiers situés dans <code>outbox_dirs</code> ou <code>inbox_dir</code></li>
  <li><strong>Résolution des liens symboliques :</strong> canonicalise les chemins pour empêcher la traversée de répertoires</li>
  <li><strong>Motifs bloqués :</strong> <code>.ssh</code>, <code>.gnupg</code>, <code>.env</code>, <code>credentials</code>, <code>.key</code>, <code>.pem</code>, <code>.aws/credentials</code>, <code>.netrc</code>, <code>.docker/config.json</code>, <code>config.toml</code></li>
</ul>

<h2>Fichiers entrants</h2>
<p>Les utilisateurs peuvent envoyer des fichiers au bot dans n’importe quel canal connecté. AIDaemon les télécharge dans <code>inbox_dir</code> et les met à disposition de l’agent. Prend en charge les documents, photos, audio, vidéo et messages vocaux, jusqu’à <code>max_file_size_mb</code>.</p>

${callout('warn', 'Répertoires de sortie', 'La liste <code>outbox_dirs</code> contrôle les répertoires depuis lesquels l’agent peut envoyer des fichiers. Gardez-la aussi étroite que possible en production.')}
`
  },
  {
    slug: '/tools/people',
    section: 'Tools',
    title: 'Intelligence relationnelle',
    description: 'Un carnet de contacts personnel géré par votre assistant IA. Retient les anniversaires, les préférences et les relations — le tout stocké localement sur votre machine.',
    content: () => `
<h1>Intelligence relationnelle</h1>
<p class="lead">Voyez-la comme un carnet de contacts, mais avec un assistant personnel qui retient les détails pour vous. Anniversaires, préférences, styles de communication, comment vous connaissez quelqu’un &mdash; AIDaemon garde tout organisé et vous le rappelle quand c’est utile. Tout reste sur votre ordinateur ou votre serveur, jamais envoyé à des tiers.</p>

${callout('info', 'Activation à l’exécution', 'L’intelligence relationnelle peut être activée ou désactivée à tout moment via le chat. Dites simplement <strong>« active l’intelligence relationnelle »</strong> ou utilisez l’outil <code>manage_people</code> avec l’action <code>enable</code>/<code>disable</code>. Aucun redémarrage n’est nécessaire.')}

<h2>Comment ça fonctionne</h2>
<ol>
  <li><strong>Ajouter des contacts</strong> &mdash; ajoutez des personnes manuellement ou laissez AIDaemon les découvrir au fil des conversations</li>
  <li><strong>Retenir des détails</strong> &mdash; anniversaires, préférences, centres d’intérêt, informations professionnelles, et plus encore</li>
  <li><strong>Lier des identités</strong> &mdash; relier une personne à son identité Telegram, Slack ou Discord</li>
  <li><strong>Rappels sur demande</strong> &mdash; demandez les prochains anniversaires et les personnes avec qui reprendre contact</li>
  <li><strong>Adaptation au contexte</strong> &mdash; lorsqu’une personne connue écrit, AIDaemon adapte son style de communication</li>
</ol>

<h2>Nom de l’outil</h2>
<p><code>manage_people</code></p>

<h2>Actions</h2>
<table class="config-table">
<thead><tr><th>Action</th><th>Description</th><th>Paramètres requis</th></tr></thead>
<tbody>
<tr><td><code>remember</code></td><td>Enregistre personnes, noms, alias, famille et lieux dans la mémoire personnelle. Toujours disponible, même avec l’intelligence relationnelle désactivée.</td><td>personal_memory</td></tr>
<tr><td><code>enable</code></td><td>Active l’intelligence relationnelle (persiste d’un redémarrage à l’autre)</td><td>&mdash;</td></tr>
<tr><td><code>disable</code></td><td>Désactive l’intelligence relationnelle (les données sont conservées)</td><td>&mdash;</td></tr>
<tr><td><code>status</code></td><td>Affiche l’état activé/désactivé et le nombre de contacts</td><td>&mdash;</td></tr>
<tr><td><code>add</code></td><td>Ajoute une nouvelle personne</td><td>name</td></tr>
<tr><td><code>list</code></td><td>Liste tous les contacts (filtrable par relation)</td><td>&mdash;</td></tr>
<tr><td><code>view</code></td><td>Affiche les détails d’une personne et tous ses faits</td><td>name ou id</td></tr>
<tr><td><code>brief</code></td><td>Une courte fiche sur une personne</td><td>name, person_name ou id</td></tr>
<tr><td><code>upcoming</code></td><td>Anniversaires et dates importantes à venir</td><td>&mdash; (within_days)</td></tr>
<tr><td><code>reconnect</code></td><td>Les personnes avec qui vous n’êtes pas resté en contact</td><td>&mdash; (inactive_days)</td></tr>
<tr><td><code>update</code></td><td>Met à jour les champs d’une personne (relation, notes, style)</td><td>name ou id</td></tr>
<tr><td><code>remove</code></td><td>Supprime une personne et tous ses faits</td><td>name ou id</td></tr>
<tr><td><code>add_fact</code></td><td>Enregistre un fait sur quelqu’un (anniversaire, préférence, etc.)</td><td>person_name, category, key, value</td></tr>
<tr><td><code>remove_fact</code></td><td>Supprime un fait précis par identifiant</td><td>fact_id</td></tr>
<tr><td><code>link</code></td><td>Relie une identité de plateforme à une personne</td><td>person_name, platform_id</td></tr>
<tr><td><code>export</code></td><td>Exporte en JSON toutes les données d’une personne</td><td>person_name ou name</td></tr>
<tr><td><code>purge</code></td><td>Suppression en cascade complète (personne + faits + liens)</td><td>person_name ou name</td></tr>
<tr><td><code>audit</code></td><td>Passe en revue les faits non confirmés</td><td>&mdash; (ou person_name)</td></tr>
<tr><td><code>confirm</code></td><td>Vérifie un fait non confirmé (confiance à 100 %)</td><td>fact_id</td></tr>
</tbody>
</table>

<h2>Paramètres</h2>
${configTable([
  ['action', 'string', '&mdash;', 'Action à effectuer (obligatoire)'],
  ['name', 'string', 'null', 'Nom de la personne (pour add, view, brief, update, remove)'],
  ['id', 'integer', 'null', 'Identifiant en base de la personne (pour view, update, remove)'],
  ['relationship', 'string', 'null', 'Type de relation : spouse, family, friend, coworker, acquaintance'],
  ['notes', 'string', 'null', 'Notes libres sur la personne'],
  ['communication_style', 'string', 'null', 'Façon de communiquer : casual, formal, warm, etc.'],
  ['language', 'string', 'null', 'Langue préférée pour l’interaction'],
  ['person_name', 'string', 'null', 'Nom de la personne (pour add_fact, link ; export, purge et audit acceptent aussi name)'],
  ['category', 'string', 'null', 'Catégorie de fait : birthday, preference, interest, work, family, important_date, personality, gift_idea'],
  ['key', 'string', 'null', 'Clé du fait (par ex. « birthday », « favorite_food »)'],
  ['value', 'string', 'null', 'Valeur du fait. Pour birthday ou important_date, une date ISO (YYYY-MM-DD, ou --MM-DD sans année)'],
  ['platform_id', 'string', 'null', 'Identifiant qualifié par la plateforme (par ex. « slack:U123 », « telegram:456 »)'],
  ['display_name', 'string', 'null', 'Nom d’affichage de l’identité de plateforme'],
  ['fact_id', 'integer', 'null', 'Identifiant du fait (pour remove_fact, confirm)'],
  ['personal_memory', 'object', 'null', 'remember : personnes, alias, faits et relations'],
  ['within_days', 'integer', 'null', 'upcoming : nombre de jours à venir'],
  ['inactive_days', 'integer', 'null', 'reconnect : jours sans contact'],
])}

<h2>Activation</h2>
<p>Il y a deux façons d’activer l’intelligence relationnelle :</p>

<h3>Option 1 : par le chat (recommandé)</h3>
<p>Dites simplement à votre bot de l’activer. Le réglage est enregistré dans la base de données et persiste d’un redémarrage à l’autre.</p>
${codeBlock('You: "Enable people intelligence"\naidaemon: "People Intelligence enabled. I\'ll now remember contacts..."', 'text', 'chat')}

<h3>Option 2 : par config.toml</h3>
<p>Définissez l’état initial dans votre fichier de configuration. Cette valeur sert à initialiser la base de données au premier lancement ; ensuite, le réglage à l’exécution a priorité.</p>
${codeBlock('[people]\nenabled = true', 'toml', 'config.toml')}

<h2>Apprentissage organique</h2>
<p>Pendant la consolidation de la mémoire, AIDaemon enregistre les personnes que vous mentionnez (noms, surnoms, anniversaires, famille et lieu de vie) dans la mémoire personnelle, le même stockage que celui où écrit <code>remember</code>. Les faits du carnet de contacts s’ajoutent avec <code>add_fact</code> ; <code>audit</code> et <code>confirm</code> passent en revue ceux qui ne sont pas confirmés.</p>

${callout('warn', 'Détails sensibles', 'Les informations de santé et financières ne sont pas enregistrées comme faits de contact.')}

<h2>Tâches d’arrière-plan</h2>
<p>Lorsqu’elle est activée, AIDaemon exécute des vérifications quotidiennes en arrière-plan :</p>
<ul>
  <li><strong>Élagage des faits périmés</strong> &mdash; supprime les faits non confirmés plus anciens que <code>fact_retention_days</code> (180 par défaut)</li>
  <li><strong>Dates à venir et reprises de contact</strong> &mdash; vérifiées chaque jour et consignées ; demandez-les à tout moment avec les actions <code>upcoming</code> et <code>reconnect</code> (reconnect utilise <code>reconnect_reminder_days</code>, 30 par défaut)</li>
</ul>

<h2>Modèle de confidentialité</h2>
<table class="config-table">
<thead><tr><th>Contexte</th><th>Comportement</th></tr></thead>
<tbody>
<tr><td>Messages directs du propriétaire</td><td>Le graphe complet des personnes est injecté dans le prompt système (noms, faits, relations)</td></tr>
<tr><td>Non-propriétaire (lié)</td><td>Adaptation du style de communication uniquement (aucune injection de faits vers les autres utilisateurs)</td></tr>
<tr><td>Canaux publics</td><td>Aucun fait personnel injecté</td></tr>
</tbody>
</table>

<h2>Configuration</h2>
${codeBlock('[people]\nenabled = true\nfact_retention_days = 180\nreconnect_reminder_days = 30', 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'État initial (modifiable à l’exécution via le chat)'],
  ['fact_retention_days', 'integer', '180', 'Jours avant que les faits non confirmés soient élagués'],
  ['reconnect_reminder_days', 'integer', '30', 'Jours d’inactivité avant de suggérer de reprendre contact'],
  ['auto_extract, auto_extract_categories, restricted_categories', '—', '—', 'Acceptés mais non utilisés'],
])}
`
  },
  {
    slug: '/mcp',
    section: 'MCP',
    title: 'Aperçu de MCP',
    description: 'Étendez AIDaemon avec des serveurs Model Context Protocol pour l’accès au système de fichiers, aux bases de données, aux API et plus encore.',
    content: () => `
<h1>Intégration MCP</h1>
<p class="lead">Étendez AIDaemon avec n’importe quel serveur <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener">Model Context Protocol</a> pour ajouter l’accès au système de fichiers, aux bases de données, aux API et plus encore.</p>

<h2>Comment ça fonctionne</h2>
<ol>
  <li>AIDaemon lance chaque serveur MCP configuré comme sous-processus</li>
  <li>Communique en JSON-RPC 2.0 via stdin/stdout</li>
  <li>Appelle <code>tools/list</code> pour découvrir les outils disponibles</li>
  <li>Chaque outil découvert est proposé sous la forme <code>&lt;server&gt;__&lt;tool&gt;</code> (par ex. <code>github__create_issue</code>)</li>
  <li>Le modèle peut appeler les outils MCP comme les outils intégrés</li>
</ol>

<h2>Détails du protocole</h2>
<ul>
  <li><strong>Version du protocole :</strong> demande 2025-06-18 ; accepte 2025-03-26 et 2024-11-05</li>
  <li><strong>Informations client :</strong> name="aidaemon", version = la version du daemon</li>
  <li><strong>Transport :</strong> JSON délimité par lignes sur stdin/stdout</li>
  <li><strong>Initialisation :</strong> requête <code>initialize</code> → <code>notifications/initialized</code></li>
</ul>

<h2>Sécurité</h2>
<ul>
  <li>Seules les variables sûres (PATH, HOME, LANG&hellip;) passent de l’environnement du daemon à un serveur ; tout le reste doit être défini explicitement.</li>
  <li>La sortie MCP est traitée comme non fiable, et les appels sont jugés au pire cas (une approbation peut être demandée) sauf si vous listez l’outil dans <code>read_only_tools</code>.</li>
</ul>

<h2>Exemple</h2>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/documents"]

[mcp.sqlite]
command = "uvx"
args = ["mcp-server-sqlite", "--db-path", "my-database.db"]

[mcp.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]`, 'toml', 'config.toml')}

<h2>Ajouter des serveurs à l’exécution</h2>
<p>L’outil <code>manage_mcp</code> ajoute, liste, retire, redémarre, active et désactive des serveurs sans redémarrage. Les serveurs ajoutés sont enregistrés et rechargés au démarrage. Les commandes sont limitées à <code>npx</code>, <code>uvx</code>, <code>node</code>, <code>python</code> et <code>python3</code>. Une variable secrète est liée avec <code>set_env</code> à une entrée du trousseau nommée <code>mcp_&lt;server&gt;_&lt;KEY&gt;</code>, que vous enregistrez avec <code>aidaemon keychain set</code>. Dans une conversation de projet, <code>project_list</code>, <code>project_start</code> et <code>project_stop</code> exécutent les serveurs du <code>.mcp.json</code> du projet pour ce projet seulement.</p>

${callout('info', 'Gestion des erreurs', 'Si un serveur MCP ne démarre pas ou ne parvient pas à lister ses outils, l’erreur est consignée mais les autres serveurs et les outils intégrés continuent de fonctionner.')}
`
  },
  {
    slug: '/mcp/configuration',
    section: 'MCP',
    title: 'Configuration d’un serveur MCP',
    description: 'Configurez des serveurs MCP dans le config.toml d’AIDaemon : serveurs stdio, variables d’environnement et outils en lecture seule.',
    content: () => `
<h1>Configuration d’un serveur MCP</h1>
<p class="lead">Chaque serveur MCP est défini comme une section nommée sous <code>[mcp]</code> dans config.toml.</p>

<h2>Format de configuration</h2>
${codeBlock(`[mcp.<server-name>]
command = "<executable>"
args = ["arg1", "arg2", ...]
env = { KEY = "value" }
read_only_tools = ["search"]`, 'toml')}

${configTable([
  ['command', 'string', '—', 'Exécutable ou script qui lance le serveur MCP'],
  ['args', 'array', '[]', 'Arguments passés à la commande'],
  ['env', 'table', '{}', 'Variables d’environnement du serveur (sinon, seules les variables sûres sont héritées)'],
  ['read_only_tools', 'array', '[]', 'Outils que vous déclarez en lecture seule, par leur nom dans tools/list ; leurs appels n’ont besoin d’aucune approbation'],
])}

<h2>Processus de découverte</h2>
<ol>
  <li>Pour chaque section <code>[mcp.*]</code>, lance le processus avec la commande et les arguments configurés</li>
  <li>Initialise la connexion JSON-RPC (négociation du protocole)</li>
  <li>Appelle <code>tools/list</code> pour énumérer les outils disponibles</li>
  <li>Propose chaque outil au modèle sous la forme <code>&lt;server&gt;__&lt;tool&gt;</code> avec la description et le schéma d’entrée du serveur</li>
  <li>Consigne chaque erreur par serveur sans échouer globalement</li>
</ol>
<p>Des serveurs peuvent aussi être ajoutés pendant l’exécution d’AIDaemon, avec l’outil <code>manage_mcp</code>. Voir <a href="/mcp">Aperçu de MCP</a>.</p>

<h2>Exemples</h2>

<h3>Accès au système de fichiers</h3>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]`, 'toml')}

<h3>Recherche web</h3>
${codeBlock(`[mcp.brave-search]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-brave-search"]
env = { BRAVE_API_KEY = "…" }`, 'toml')}
<p>Pour garder la clé hors de config.toml, liez-la à une valeur du trousseau avec <code>manage_mcp</code> <code>set_env</code> (une entrée du trousseau nommée <code>mcp_&lt;server&gt;_&lt;KEY&gt;</code>, que vous enregistrez avec <code>aidaemon keychain set</code>).</p>

<h3>Serveur Python personnalisé</h3>
${codeBlock(`[mcp.my-server]
command = "python3"
args = ["/path/to/my_mcp_server.py"]`, 'toml')}

${callout('info', 'Journalisation de stderr', 'La sortie stderr des serveurs MCP est capturée et consignée par AIDaemon pour le débogage. Consultez les journaux du daemon si un serveur ne fonctionne pas.')}

<h2>Détection des menaces</h2>
<p>AIDaemon effectue une détection de menaces en audit seul sur les appels d’outils MCP. Les motifs suspects sont consignés mais <strong>ne bloquent pas l’exécution</strong>. Par ailleurs, chaque appel MCP passe par la politique d’approbation normale, et sa sortie est traitée comme non fiable.</p>

<h3>Motifs d’arguments suspects</h3>
<ul>
  <li><strong>Accès aux fichiers :</strong> <code>/etc/passwd</code>, <code>/etc/shadow</code>, <code>.ssh/</code>, <code>.env</code></li>
  <li><strong>Configuration/secrets :</strong> <code>config.toml</code>, <code>aidaemon.db</code>, <code>api_key</code>, <code>bot_token</code>, <code>encryption_key</code></li>
  <li><strong>Réseau :</strong> <code>curl</code>, <code>wget</code>, <code>nc</code>, <code>base64</code></li>
  <li><strong>Exécution de code :</strong> <code>eval(</code>, <code>exec(</code>, <code>| sh</code>, <code>| bash</code></li>
  <li><strong>Destructeur :</strong> <code>; rm </code>, <code>chmod 777</code></li>
</ul>

<h3>Motifs de sortie suspects</h3>
<ul>
  <li>Clés d’API potentielles : préfixes <code>sk-</code>, <code>ghp_</code></li>
  <li>Clés privées : <code>-----BEGIN</code>, <code>PRIVATE KEY</code></li>
  <li>Termes sensibles : <code>password</code>, <code>bot_token</code></li>
</ul>

${callout('warn', 'Audit seul', 'La détection de menaces est informative — elle consigne des avertissements mais ne bloque pas l’exécution des outils. Consultez les journaux de votre daemon pour repérer les motifs signalés.')}
`
  },
  {
    slug: '/triggers',
    section: 'Triggers',
    title: 'Déclencheurs e-mail',
    description: 'Surveillez des boîtes de réception avec IMAP IDLE et déclenchez automatiquement l’agent AIDaemon à l’arrivée de nouveaux messages.',
    content: () => `
<h1>Déclencheurs e-mail</h1>
<p class="lead">Surveillez votre boîte de réception avec IMAP IDLE et déclenchez l’agent à l’arrivée de nouveaux e-mails.</p>

<h2>Comment ça fonctionne</h2>
<ol>
  <li>AIDaemon se connecte au serveur IMAP configuré en TLS</li>
  <li>Sélectionne le dossier configuré (par défaut : INBOX)</li>
  <li>Passe en mode IMAP IDLE — une connexion persistante qui attend de nouveaux messages</li>
  <li>Lorsqu’un nouvel e-mail arrive, récupère l’enveloppe (objet, expéditeur)</li>
  <li>Crée un Event et le diffuse via le bus d’événements interne. Le texte du courrier est nettoyé et enveloppé dans un avis qui dit à l’agent de ne pas agir dessus sans votre approbation.</li>
  <li>L’agent traite l’événement comme un message non fiable et envoie sa réponse aux chats des propriétaires : les utilisateurs autorisés de vos premiers bots Telegram, Discord et Slack.</li>
</ol>

<h2>Configuration</h2>
${codeBlock(`[triggers.email]
host = "imap.gmail.com"
port = 993
username = "you@gmail.com"
password = "keychain"   # or "\${AIDAEMON_EMAIL_PASSWORD}"
folder = "INBOX"`, 'toml', 'config.toml')}

${configTable([
  ['host', 'string', '&mdash;', 'Nom d’hôte du serveur IMAP'],
  ['port', 'integer', '&mdash;', 'Port IMAP (généralement 993)'],
  ['username', 'string', '&mdash;', 'Nom d’utilisateur de la boîte aux lettres'],
  ['password', 'string', '&mdash;', 'Mot de passe de la boîte aux lettres. Prend en charge <code>"keychain"</code> et <code>$&#123;ENV&#125;</code>.'],
  ['folder', 'string', 'INBOX', 'Dossier à surveiller'],
])}

${callout('warn', 'Mots de passe d’application Gmail', 'Pour Gmail avec l’authentification à deux facteurs, générez un mot de passe d’application sur <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener">myaccount.google.com/apppasswords</a>.')}

<h2>Format de l’événement</h2>
${codeBlock(`Event {
    source: "email",
    session_id: "email_trigger",
    content: "New email from sender@example.com: Subject line here"
}`, 'rust')}

<h2>Bus d’événements</h2>
<p>Les déclencheurs utilisent un canal de diffusion Tokio pour livrer les événements. L’agent écoute côté récepteur et traite chaque événement comme un nouveau message dans sa propre session. Sous forte charge, des événements de déclencheurs non fiables peuvent être abandonnés plutôt que mis en file sans limite.</p>

${callout('danger', 'Sessions non fiables', 'Les sessions de déclencheurs e-mail sont marquées comme <strong>non fiables</strong>. Chaque commande de terminal dans ces sessions demande votre approbation, quoi que vous ayez autorisé auparavant.')}

<h2>Reconnexion</h2>
<p>Si la connexion IMAP tombe, AIDaemon attend 30 secondes et se reconnecte automatiquement.</p>
`
  },
  {
    slug: '/skills',
    section: 'Skills',
    title: 'Système de compétences',
    description: 'Les compétences sont des instructions markdown que l’agent charge avec use_skill lorsqu’une tâche en a besoin, ou lorsque vous en nommez une.',
    content: () => `
<h1>Système de compétences</h1>
<p class="lead">Les compétences sont des fichiers markdown contenant des instructions pour un type de tâche. L’agent voit la liste des compétences disponibles et charge celle dont une tâche a besoin avec l’outil <code>use_skill</code>. Vous pouvez aussi demander une compétence par son nom.</p>

<h2>Configuration</h2>
${codeBlock(`[skills]
enabled = true
dir = "skills"      # relative to config.toml's folder
registries = []     # URLs of skill registry manifests for browse/install`, 'toml', 'config.toml')}

<h2>Où se trouvent les compétences</h2>
<ul>
  <li><strong>Vos compétences</strong> &mdash; le répertoire des compétences (<code>skills/</code> à côté de config.toml), sous la forme <code>&lt;name&gt;.md</code>, ou d’un dossier <code>&lt;name&gt;/SKILL.md</code> avec des fichiers supplémentaires que l’agent lit avec <code>skill_resources</code></li>
  <li><strong>Compétences de projet</strong> &mdash; jusqu’à 50 compétences issues de <code>.agents/skills/&lt;name&gt;/SKILL.md</code> et <code>.claude/skills/&lt;name&gt;/SKILL.md</code> du projet. Elles ne guident que le travail dans ce projet et n’accordent aucune autorité supplémentaire. Si un nom entre en conflit, votre propre compétence l’emporte.</li>
</ul>

<h2>Format d’un fichier de compétence</h2>
<p>Les compétences sont des fichiers markdown avec un frontmatter de type YAML :</p>
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

<h2>Champs du frontmatter</h2>
${configTable([
  ['name', 'string', '—', 'Nom d’affichage de la compétence'],
  ['description', 'string', '—', 'Brève description (affichée dans la liste Available Skills, pour que l’agent sache quand la compétence convient)'],
  ['triggers', 'string', '—', 'Facultatif. Conservé pour les anciennes compétences ; n’est plus utilisé pour activer une compétence.'],
])}

<h2>Comment les compétences s’activent</h2>
<p>Une compétence n’est chargée d’emblée que si vous la nommez dans votre message :</p>
<ul>
  <li><code>$skill-name</code></li>
  <li><code>skill:skill-name</code></li>
  <li><code>use skill skill-name</code></li>
  <li>&laquo;&nbsp;the skill-name skill&nbsp;&raquo;</li>
</ul>
<p>Sinon, le modèle choisit dans la liste Available Skills et appelle <code>use_skill</code> lorsqu’une compétence convient clairement à la tâche. Les mots-clés de votre message n’activent pas les compétences.</p>

<h2>Dans le prompt</h2>
<ol>
  <li><strong>Available Skills</strong> — le nom et la description de chaque compétence, qui fait partie du prompt de base fixe de l’agent</li>
  <li><strong>Loaded skills</strong> — le corps complet de chaque compétence en cours d’utilisation, ajouté au contexte de ce tour. Le texte de la compétence est d’abord assaini.</li>
</ol>
<p>La mémoire (faits, épisodes, etc.) a sa propre section et ne fait pas partie du bloc des compétences.</p>

<h2>Compétences dynamiques</h2>
<p>Au-delà des fichiers de compétences que vous écrivez vous-même, AIDaemon prend en charge la gestion des compétences à l’exécution via l’outil <code>manage_skills</code> et des registres facultatifs.</p>

<h3>Actions de l’outil manage_skills</h3>
<table class="config-table">
<thead><tr><th>Action</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>add</code></td><td>Récupère une compétence depuis une URL</td></tr>
<tr><td><code>add_inline</code></td><td>Analyse un contenu markdown brut comme une compétence</td></tr>
<tr><td><code>list</code></td><td>Affiche toutes les compétences chargées avec leurs métadonnées</td></tr>
<tr><td><code>remove</code></td><td>Supprime une compétence par son nom</td></tr>
<tr><td><code>remove_all</code></td><td>Supprime plusieurs compétences par leur nom</td></tr>
<tr><td><code>enable</code> / <code>disable</code></td><td>Active ou désactive une compétence</td></tr>
<tr><td><code>browse</code></td><td>Cherche dans les registres configurés</td></tr>
<tr><td><code>install</code></td><td>Installe depuis un registre</td></tr>
<tr><td><code>update</code></td><td>Récupère de nouveau la compétence depuis son URL source</td></tr>
<tr><td><code>review</code></td><td>Approuve ou écarte les brouillons de compétences promus automatiquement</td></tr>
</tbody>
</table>

<h3>Promotion automatique</h3>
<p>Une tâche d’arrière-plan s’exécute toutes les 12 heures et transforme en brouillons de compétences les procédures qui ont fonctionné de nombreuses fois. Les brouillons restent inactifs tant que vous ne les approuvez pas avec <code>manage_skills</code> <code>review</code>.</p>
`
  },
  {
    slug: '/scheduler',
    section: 'Scheduler',
    title: 'Tâches planifiées',
    description: 'Rappels et travail planifié dans AIDaemon : set_reminder, schedule_task, manage_automations, planifications et fuseaux horaires.',
    content: () => `
<h1>Tâches planifiées</h1>
<p class="lead">Créez des automatisations récurrentes et ponctuelles en langage courant ou avec des expressions cron : des rappels qui ne font que vous envoyer un message, et du travail planifié que l’agent effectue de lui-même.</p>

${callout('info', 'Automatisations et fuseaux horaires', 'Demandez en langage courant et l’agent s’en occupe : <code>set_reminder</code> (un <code>message</code> et un <code>when</code>) pour les rappels simples, qui ne font que vous envoyer un message, et <code>schedule_task</code> pour le travail planifié. Une heure ou une planification récurrente peut nommer un fuseau IANA (&laquo;&nbsp;chaque jour de semaine à 8h Europe/Madrid&nbsp;&raquo;, &laquo;&nbsp;2030-07-15 09:00 Asia/Tokyo&nbsp;&raquo;) et suit son heure d’été ; sinon, les heures sont dans votre propre fuseau. Les abréviations comme &laquo;&nbsp;EST&nbsp;&raquo; sont refusées, avec une demande du nom IANA. Une exécution manquée pendant que le daemon était arrêté est enregistrée comme Missed et ne compte jamais comme un échec.')}

<h2>Outils</h2>
<table class="config-table">
<thead><tr><th>Outil</th><th>Rôle</th></tr></thead>
<tbody>
<tr><td><code>schedule_task</code></td><td>Travail planifié : <code>task</code> (ce que fait chaque exécution), <code>when</code>, et un <code>name</code> facultatif. Vous le confirmez sur une carte <strong>Approve &amp; activate</strong> avant qu’il démarre.</td></tr>
<tr><td><code>set_reminder</code></td><td>Un message seulement : <code>message</code>, <code>when</code>, et un <code>name</code> facultatif. Rien d’autre ne s’exécute au déclenchement.</td></tr>
<tr><td><code>manage_automations</code></td><td>Voir, modifier ou arrêter des automatisations (ci-dessous)</td></tr>
</tbody>
</table>
<p>Dans le chat, <code>/work</code> montre aussi le travail plus long qui attend ou s’exécute de lui-même, et <code>/status</code> montre le prochain élément planifié.</p>

<h2>Actions de manage_automations</h2>
<table class="config-table">
<thead><tr><th>Action</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>list</code> / <code>show</code></td><td>Liste les automatisations (planifiées, en surveillance, contrôles de santé) ou en affiche une par son nom</td></tr>
<tr><td><code>history</code></td><td>Exécutions passées, y compris celles qui ont été manquées</td></tr>
<tr><td><code>edit</code></td><td>Modifie <code>when</code>, <code>new_name</code>, <code>snooze_until</code> (décale seulement la prochaine exécution) ou <code>tell_me</code></td></tr>
<tr><td><code>pause</code> / <code>resume</code> / <code>cancel</code></td><td>Cesse de se déclencher, reprend, ou supprime (une ou plusieurs)</td></tr>
<tr><td><code>run_now</code></td><td>Exécute tout de suite un travail planifié</td></tr>
<tr><td><code>last_failure</code></td><td>Pourquoi la dernière exécution a échoué</td></tr>
<tr><td><code>set_budget</code></td><td>Budget de tokens par exécution (<code>budget_per_check</code>) et par jour (<code>budget_daily</code>)</td></tr>
<tr><td><code>update_instructions</code></td><td>Modifie ce que font les exécutions suivantes</td></tr>
<tr><td><code>bind_workspace</code></td><td>Définit le répertoire de projet dans lequel ses exécutions travaillent</td></tr>
</tbody>
</table>
<p><code>tell_me</code> choisit ce que le travail planifié vous dit : <code>every_run</code>, seulement <code>changes</code>, ou seulement <code>problems</code>.</p>

<h2>Planifications en langage naturel</h2>
<p>Le planificateur analyse les formulations courantes et les convertit en expressions cron :</p>

<table class="config-table">
<thead><tr><th>Saisie</th><th>Cron</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>hourly</code></td><td><code>0 * * * *</code></td><td>Toutes les heures à :00</td></tr>
<tr><td><code>daily</code></td><td><code>0 0 * * *</code></td><td>Tous les jours à minuit</td></tr>
<tr><td><code>weekly</code></td><td><code>0 0 * * 0</code></td><td>Tous les dimanches à minuit</td></tr>
<tr><td><code>monthly</code></td><td><code>0 0 1 * *</code></td><td>Le premier du mois</td></tr>
<tr><td><code>every 5m</code></td><td><code>*/5 * * * *</code></td><td>Toutes les 5 minutes (1&ndash;59)</td></tr>
<tr><td><code>every 2h</code></td><td><code>0 */2 * * *</code></td><td>Toutes les 2 heures (1&ndash;23)</td></tr>
<tr><td><code>daily at 9am</code></td><td><code>0 9 * * *</code></td><td>Tous les jours à 9 h 00</td></tr>
<tr><td><code>daily at 6am, 12pm, 6pm</code></td><td><code>0 6,12,18 * * *</code></td><td>Plusieurs fois par jour (à la même minute)</td></tr>
<tr><td><code>daily at 14:30</code></td><td><code>30 14 * * *</code></td><td>Tous les jours à 14 h 30</td></tr>
<tr><td><code>weekdays at 8:30</code></td><td><code>30 8 * * 1-5</code></td><td>Du lundi au vendredi à 8 h 30</td></tr>
<tr><td><code>weekends at 10am</code></td><td><code>0 10 * * 0,6</code></td><td>Samedi et dimanche à 10 h 00</td></tr>
<tr><td><code>Monday and Friday at 9am</code></td><td><code>0 9 * * 1,5</code></td><td>Jours nommés</td></tr>
<tr><td><code>in 2h</code>, <code>in 30m</code></td><td>(absolu calculé)</td><td>Ponctuel, se déclenche une fois après le délai</td></tr>
<tr><td><code>today at 6pm</code>, <code>tomorrow at 9am</code></td><td>(absolu calculé)</td><td>Ponctuel, à cette heure</td></tr>
<tr><td><code>2026-03-14 09:30</code></td><td>(absolu calculé)</td><td>Ponctuel, à une date et une heure exactes (RFC 3339 fonctionne aussi)</td></tr>
</tbody>
</table>

<p>Les expressions cron standard à 5 champs sont aussi acceptées directement (par ex. <code>0 9 * * 1-5</code>).</p>

<h2>Configuration</h2>
<p>Les automatisations se créent en le demandant dans le chat (ou dans l’application) et sont stockées dans la base de données. Il n’y a aucune section config.toml pour elles ; une ancienne section <code>[scheduler]</code> est ignorée. Le planificateur vérifie les exécutions dues au rythme du heartbeat, toutes les <code>[heartbeat] tick_interval_secs</code> (30 par défaut).</p>

<h2>Stockage des tâches</h2>
<p>Les automatisations sont stockées dans la base de données comme des objectifs avec des planifications. Les lignes de l’ancienne table <code>scheduled_tasks</code> sont migrées automatiquement.</p>

<h2>Exécutions manquées</h2>
<p>Une exécution récurrente qui était due pendant que le daemon était arrêté, et qui est maintenant trop tardive pour être utile, est ignorée. Elle est enregistrée comme Missed dans l’historique, vous recevez un avis, et la planification passe à son exécution suivante. Un élément ponctuel s’exécute quand même en retard.</p>

${callout('warn', 'Accès du travail planifié', 'Le travail planifié s’exécute avec votre accès une fois que vous l’avez approuvé sur la carte de confirmation. Les commandes de terminal de ces exécutions ne redemandent pas, mais les commandes qui continueraient de tourner en arrière-plan (détachées) n’y sont jamais autorisées.')}
`
  },
  {
    slug: '/router',
    section: 'Router',
    title: 'Routage de modèles',
    description: 'Comment AIDaemon choisit un modèle : modèles par défaut, smart et fast, modèles de secours et remplacements avec /model.',
    content: () => `
<h1>Routage de modèles</h1>
<p class="lead">Comment AIDaemon choisit un modèle pour chaque tour : votre modèle par défaut pour le travail normal, un modèle smart lorsqu’un tour demande plus, un modèle fast pour les tâches annexes, et des modèles de secours lorsqu’un appel échoue.</p>

<h2>Réglages des modèles</h2>
${codeBlock(`[provider.models]
default = "claude-sonnet-5-5"
fallback = ["claude-opus-5-5", "claude-haiku-5-5"]

# Older keys still work:
# primary = "claude-sonnet-5-5"   # read as default
# smart = "claude-opus-5-5"
# fast = "claude-haiku-5-5"`, 'toml', 'config.toml')}

${configTable([
  ['default', 'string', 'catalog', 'Le modèle principal, utilisé pour les requêtes normales'],
  ['fallback', 'array', '[]', 'Modèles essayés dans l’ordre lorsqu’un appel échoue. S’il n’est pas défini, smart et fast deviennent les modèles de secours.'],
  ['primary', 'string', '&mdash;', 'Ancien nom de <code>default</code>'],
  ['smart', 'string', 'catalog', 'Le modèle plus puissant pour les tours qui demandent plus'],
  ['fast', 'string', 'catalog', 'Le modèle rapide et peu coûteux pour les tâches annexes'],
])}
<p>Pour un fournisseur qu’AIDaemon connaît, tout modèle que vous omettez est complété depuis son catalogue : une simple clé d’API vous donne donc un modèle default, un fast et un smart.</p>

<h2>Niveaux</h2>
<table class="config-table">
<thead><tr><th>Niveau</th><th>Cas d’usage</th><th>Modèles du catalogue</th></tr></thead>
<tbody>
<tr><td><strong>Fast</strong></td><td>Travail de mémoire en arrière-plan, et assistants lancés avec <code>model_tier: "fast"</code></td><td>gpt-6-luna, claude-haiku-5-5, gemini-3.5-flash-lite</td></tr>
<tr><td><strong>Primary (default)</strong></td><td>Conversation normale et la plupart du travail avec outils</td><td>gpt-6-sol, claude-sonnet-5-5, gemini-4-hydrogen</td></tr>
<tr><td><strong>Smart</strong></td><td>Tours qui demandent plus : outils à haut risque en jeu, ou nouvelle tentative après un essai échoué</td><td>gpt-6-sol, claude-opus-5-5, gemini-4-argon</td></tr>
</tbody>
</table>
<p>Les modèles du catalogue ci-dessus concernent l’abonnement ChatGPT, Anthropic et Google Gemini. Les autres fournisseurs (API OpenAI, OpenRouter, xAI, DeepSeek, Moonshot) utilisent un seul modèle pour tous les niveaux, sauf si vous les définissez ; DeepSeek utilise <code>deepseek-reasoner</code> comme modèle smart.</p>

<h2>Comment un modèle est choisi</h2>
<ol>
  <li>Un modèle choisi pour cette conversation dans l’application l’emporte.</li>
  <li>Puis un modèle défini avec <code>/model</code>.</li>
  <li>Si votre modèle par défaut est un modèle de pointe (Claude, GPT-4 et suivants, Gemini 2.5 et suivants, Grok 3 et suivants, ou la série o d’OpenAI), chaque tour l’utilise. Remplacez ce comportement avec <code>[policy] trust_tier = "guided"</code> ou <code>"autonomous"</code>.</li>
  <li>Sinon, chaque tour utilise le modèle par défaut, et passe au modèle smart lorsque les outils en jeu présentent un risque élevé ou que la dernière tentative a échoué immédiatement.</li>
</ol>
<p>La formulation, la longueur ou les mots-clés de votre message ne jouent aucun rôle dans le choix. Le modèle fast n’est jamais placé devant vos messages ; il exécute des tâches annexes comme l’extraction de mémoire, et les assistants que l’agent lance avec <code>model_tier: "fast"</code>. Les modèles de secours sont essayés, dans l’ordre, lorsqu’un appel échoue.</p>

<h2>Désactiver le routage automatique</h2>
<ul>
  <li>Si tous les modèles sont identiques, le routage est automatiquement désactivé</li>
  <li>Envoyer <code>/model &lt;name&gt;</code> dans n’importe quel chat (Telegram, Slack, Discord) définit un seul modèle pour tous les chats et désactive le routage</li>
  <li>Envoyer <code>/auto</code> réactive le routage automatique</li>
</ul>
`
  },
  {
    slug: '/cost-tracking',
    section: 'Cost Tracking',
    title: 'Utilisation de tokens et budgets',
    description: 'Suivez l’utilisation de tokens par modèle et par session, définissez des budgets de tokens par requête et par automatisation, et consultez les statistiques avec /cost.',
    content: () => `
<h1>Utilisation de tokens et suivi des coûts</h1>
<p class="lead">Suivez la consommation de tokens par modèle et par session, et gardez les dépenses sous contrôle avec des budgets de tokens par requête et par automatisation. Consultez les statistiques depuis n’importe quel chat avec <code>/cost</code>.</p>

<h2>Comment ça fonctionne</h2>
<ol>
  <li>Chaque appel de modèle enregistre les tokens d’entrée et de sortie dans la table SQLite <code>token_usage</code></li>
  <li>Chaque enregistrement comprend : le nom du modèle, l’identifiant de session, le nombre de tokens (y compris l’entrée en cache) et l’horodatage</li>
  <li>Il n’y a pas de plafond quotidien global. Chaque requête a un budget de tokens, partagé par le tour et tous les assistants qu’il lance</li>
  <li>Les automatisations peuvent aussi avoir leurs propres budgets par exécution et par jour</li>
</ol>

<h2>Configuration</h2>
${configTable([
  ['subagents.task_token_budget', 'integer', '500000', 'Tokens qu’une requête peut utiliser sur l’ensemble du tour et de ses assistants. <code>0</code> = illimité.'],
  ['state.daily_token_budget', 'integer', 'null', 'Ignoré. Conservé pour que les anciennes configurations se chargent encore ; le définir consigne un avertissement.'],
])}

${codeBlock(`[subagents]
task_token_budget = 500000   # per request; 0 = unlimited`, 'toml', 'config.toml')}

<p>Vous recevez un avertissement à 80 % du budget. Une exécution qui progresse encore peut étendre son budget jusqu’à 3 fois, sans jamais dépasser 2 000 000 de tokens ; sinon, l’agent fait le point et s’arrête.</p>

<h2>Budgets d’automatisation</h2>
<p>Le travail planifié peut avoir ses propres budgets, définis avec <code>manage_automations</code> <code>set_budget</code> : <code>budget_per_check</code> (tokens par exécution) et <code>budget_daily</code> (tokens par jour). Les compteurs quotidiens se réinitialisent toutes les 24 heures. Lorsqu’une exécution a son propre budget, le budget par requête ne s’y ajoute pas.</p>

${callout('info', 'Plafonner la dépense totale', 'AIDaemon n’impose pas de plafond quotidien global de tokens. Pour plafonner la dépense totale, définissez une limite chez votre fournisseur. Les réglages Providers de l’application montrent ce que chaque compte a utilisé et ce qu’il lui reste lorsque le fournisseur le signale : les limites glissantes d’un forfait ChatGPT, le solde d’une clé OpenRouter.')}

<h2>La commande /cost</h2>
<p>Envoyez <code>/cost</code> dans n’importe quel chat (<code>!cost</code> dans Slack) pour voir les statistiques d’utilisation. Elle est réservée au propriétaire.</p>
${codeBlock(`Token usage (last 24h):
  Input:  12,450 tokens
  Output: 8,230 tokens

Token usage (last 7d):
  Input:  87,320 tokens
  Output: 52,180 tokens

Top models (7d):
  claude-sonnet-5-5: 98,400 tokens
  claude-haiku-5-5: 41,100 tokens`, 'text')}
<p>Les cinq modèles les plus utilisés des 7 derniers jours sont listés.</p>

<h2>Schéma de la base de données</h2>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Clé primaire auto-incrémentée'],
  ['session_id', 'TEXT', '—', 'Quelle session d’utilisateur/chat a fait l’appel'],
  ['model', 'TEXT', '—', 'Quel modèle LLM a été utilisé'],
  ['input_tokens', 'INTEGER', '—', 'Tokens envoyés au modèle'],
  ['output_tokens', 'INTEGER', '—', 'Tokens générés par le modèle'],
  ['cached_input_tokens', 'INTEGER', 'null', 'Tokens d’entrée servis depuis le cache de prompt du fournisseur'],
  ['cache_creation_input_tokens', 'INTEGER', 'null', 'Tokens d’entrée écrits dans le cache de prompt'],
  ['call_id', 'TEXT', 'null', 'L’appel de modèle auquel cet enregistrement appartient'],
  ['created_at', 'TEXT', 'now', 'Horodatage UTC de l’appel'],
])}

<h2>Ce qui est suivi</h2>
<ul>
  <li>Tokens d’entrée (contexte + message de l’utilisateur) par appel de modèle, et combien proviennent du cache de prompt</li>
  <li>Tokens de sortie (réponse du modèle) par appel de modèle</li>
  <li>Nom du modèle pour les répartitions par modèle</li>
  <li>Identifiant de session pour le suivi par utilisateur</li>
  <li>Horodatage pour les requêtes sur une fenêtre de temps (24 h, 7 j)</li>
</ul>
`
  },
  {
    slug: '/architecture',
    section: 'Architecture',
    title: 'Comment fonctionne AIDaemon',
    description: 'Comment un message devient une réponse : canaux, moteur de tours sur le noyau aidaemon-core, chaîne de hooks, basculement de modèles, reçus et clôture.',
    content: () => `
<h1>Comment fonctionne AIDaemon</h1>
<p class="lead">Un message arrive sur un canal, devient un <em>tour</em>, s’exécute sur un petit noyau d’agent jusqu’à ce que le travail soit fait ou qu’une limite l’arrête, et la réponse repart là d’où il venait. Cette page suit ce chemin.</p>

<h2>Les composants</h2>
<table class="config-table">
<thead><tr><th>Composant</th><th>Code</th><th>Ce qu’il fait</th></tr></thead>
<tbody>
<tr><td><strong>Canaux</strong></td><td><code>crates/aidaemon-channel-telegram</code>, <code>-slack</code>, <code>-discord</code>, <code>crates/aidaemon-client-gateway</code> (l’application)</td><td>Reçoivent les messages, vérifient qui a le droit de parler, affichent l’état, les approbations et les réponses</td></tr>
<tr><td><strong>Turn runner</strong></td><td><code>crates/aidaemon-channels</code></td><td>Une file par session : mots d’annulation, dédoublonnage, watchdog d’inactivité, état en direct et livraison des réponses, identiques sur chaque plateforme</td></tr>
<tr><td><strong>Agent et moteur de tours</strong></td><td><code>crates/aidaemon-runtime</code> (<code>agent/</code>, <code>turn/</code>, <code>engine/</code>)</td><td>Prépare un tour, l’exécute sur le noyau, juge s’il est terminé</td></tr>
<tr><td><strong>Noyau</strong></td><td><code>crates/aidaemon-core</code></td><td>La boucle elle-même : appel de modèle, appels d’outils, hooks, reçus, limites, détection de blocage, interruption et reprise</td></tr>
<tr><td><strong>Fournisseurs</strong></td><td><code>crates/aidaemon-providers</code></td><td>Backends compatibles OpenAI, Anthropic, Gemini et abonnement ChatGPT, routage de modèles</td></tr>
<tr><td><strong>Outils</strong></td><td><code>src/tools</code>, <code>crates/aidaemon-tools</code> et d’autres</td><td>Ce que le modèle peut appeler ; chacun déclare ses effets et jusqu’où faire confiance à sa sortie</td></tr>
<tr><td><strong>Magasin d’événements</strong></td><td><code>crates/aidaemon-events</code></td><td>Historique en ajout seul de chaque tour, et le registre d’exécution qui en est tiré (voir <a href="/event-sourcing">Event Sourcing</a>)</td></tr>
<tr><td><strong>Travail</strong></td><td><code>crates/aidaemon-work</code></td><td>Objectifs, tâches, planifications, automatisations, listes de contrôle, sondes de santé</td></tr>
<tr><td><strong>Mémoire</strong></td><td><code>crates/aidaemon-memory</code></td><td>Faits, épisodes, procédures, personnes, notes de projet</td></tr>
<tr><td><strong>Heartbeat</strong></td><td><code>crates/aidaemon-runtime</code> (<code>heartbeat</code>)</td><td>Exécute les tâches d’arrière-plan : objectifs planifiés, apprentissage de la mémoire, rétention, nettoyage</td></tr>
</tbody>
</table>

<h2>Du message à la réponse</h2>
<ol>
  <li><strong>Réception.</strong> Le canal autorise l’expéditeur et étiquette le message avec son rôle (propriétaire, invité ou public) et la visibilité du canal (chat privé, interne ou public).</li>
  <li><strong>File d’attente.</strong> Le turn runner le met en file derrière tout tour déjà en cours dans cette session et affiche un indicateur d’activité.</li>
  <li><strong>Préparation du tour.</strong>
    <ul>
      <li>Le message de l’utilisateur est enregistré comme un événement ; son identifiant est l’identifiant du tour.</li>
      <li>Une tâche démarre.</li>
      <li>AIDaemon détermine ce que ce tour peut faire à partir de faits explicites uniquement : le rôle de l’expéditeur, le canal, le mode de la session (par exemple <code>/readonly</code>), la configuration et toute autorisation d’espace de travail. Il ne propose alors que les outils que cela permet.</li>
      <li>Il choisit le modèle.</li>
      <li>Il construit le prompt système : identité et persona, compétences correspondantes, faits connus, instructions de projet (<code>AGENTS.md</code> / <code>CLAUDE.md</code>) et ce que la session fait en ce moment.</li>
    </ul>
  </li>
  <li><strong>Exécution sur le noyau.</strong> Le noyau appelle le modèle. Si le modèle demande des outils, il les exécute et rappelle le modèle. Sinon, le noyau demande aux hooks d’arrêt si la réponse peut tenir.</li>
  <li><strong>Clôture.</strong> Le registre d’exécution compare les reçus du tour à ce dont la demande avait besoin, et vérifie la forme de la réponse. La tâche se termine en <code>succeeded</code>, <code>partial</code> ou <code>failed</code>.</li>
  <li><strong>Livraison.</strong> La réponse repart vers le canal et sa livraison est enregistrée. L’apprentissage tiré du tour se fait plus tard, en arrière-plan.</li>
</ol>

<h2>La boucle du noyau</h2>
<p>Chaque passe construit la requête, appelle le modèle et exécute les appels d’outils qu’il a demandés. Les appels en lecture seule s’exécutent côte à côte ; ceux qui modifient quelque chose s’exécutent un par un. Chaque appel se termine par un <strong>reçu</strong> : <code>succeeded</code>, <code>failed</code>, <code>denied</code>, <code>timed_out</code>, <code>cancelled</code>, <code>skipped</code>, <code>unknown_tool</code>, <code>invalid_arguments</code>, <code>indeterminate</code> (le processus s’est arrêté en plein appel) ou <code>answered</code> (un hook a répondu à la place de l’outil). Ce sont les reçus, et non les mots du modèle, qui comptent comme travail effectué.</p>
<p>Pour les tours propres au propriétaire, seuls les outils de base sont envoyés à chaque appel de modèle. Les autres sont listés par leur nom et chargés lorsque le modèle les demande avec <code>load_tools</code>.</p>

<h2>Une seule chaîne de hooks juge chaque appel d’outil</h2>
<p>Chaque garde-fou est un hook du noyau qui juge les effets déclarés d’un appel. Les outils ne sollicitent jamais le propriétaire et ne refusent jamais sur la base d’une politique eux-mêmes. L’ordre est fixe :</p>
<ol>
  <li>Forme canonique de l’appel (pour que chaque hook suivant juge l’appel qui s’exécutera réellement)</li>
  <li>Autorité : cet outil, ce chemin et ce niveau d’accès sont-ils autorisés pour ce tour ?</li>
  <li>Garde contre une série du même outil, arrêt par le registre d’exécution, budget de tokens, avis de blocage</li>
  <li>Hooks de mémoire</li>
  <li>Chemins protégés, garde réseau, analyse des secrets sortants</li>
  <li>Contenu non fiable : une fois que le tour a lu quelque chose que le propriétaire n’a pas écrit, les appels qui envoient des données vers l’extérieur passent par un contrôle séparé</li>
  <li>Approbation du propriétaire (en dernier, pour qu’on ne lui demande que les appels que tout le reste autorise)</li>
  <li>Dispatch, et coordination avec les autres agents qui travaillent sur la même demande</li>
</ol>

<h2>Limites</h2>
<p>Le travail est borné par la progression et le coût, jamais par sa durée.</p>
<table class="config-table">
<thead><tr><th>Limite</th><th>Par défaut</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>Tours de modèle par exécution</td><td>150</td><td>Un filet de sécurité ; le plafond strict du noyau est de 1 000</td></tr>
<tr><td>Budget de tokens par requête</td><td>500 000</td><td><code>[subagents] task_token_budget</code>, partagé par la requête et chaque sous-agent qu’elle lance. Tant que le travail continue de réussir, il grandit tout seul jusqu’à 3 fois, sans jamais dépasser 2 000 000 ; ensuite, le propriétaire décide. <code>0</code> le désactive</td></tr>
<tr><td>Même outil à la suite</td><td>8</td><td>16 pour les outils généralistes, 40 pour les outils pas à pas comme computer use</td></tr>
<tr><td>Détection de blocage</td><td>3 répétitions</td><td>Le même appel avec le même résultat 3 fois, le même outil en échec 3 fois, ou un va-et-vient A/B/A/B sur 6 appels. Le modèle reçoit un coup de pouce ; après 2 coups de pouce, l’exécution s’arrête</td></tr>
<tr><td>Inactivité</td><td>300 s</td><td><code>[daemon.watchdog]</code> : un tour qui cesse de progresser est annulé. Chaque appel de modèle a son propre délai de 300 s</td></tr>
</tbody>
</table>

<h2>Choisir le modèle et se remettre des erreurs</h2>
<p>Le modèle épinglé d’une conversation l’emporte, puis un <code>/model</code> valable pour tout le daemon. Un sous-agent garde le modèle avec lequel il a été lancé. Sinon, le tour utilise le modèle principal ; le routeur ne choisit un niveau que pour les modèles à qui l’on ne fait pas confiance pour travailler de façon autonome.</p>
<p>Chaque appel de modèle parcourt une chaîne de basculement : le modèle choisi, puis les autres modèles du routeur, puis les modèles de chaque fournisseur de secours configuré.</p>
<table class="config-table">
<thead><tr><th>Erreur</th><th>Ce qui se passe</th></tr></thead>
<tbody>
<tr><td><strong>Limite de débit, délai dépassé, réseau, erreur serveur</strong></td><td>Nouvelle tentative avec temporisation (en respectant <code>retry_after</code>), puis le modèle suivant</td></tr>
<tr><td><strong>Mauvaise requête</strong></td><td>Une nouvelle tentative sans média, une avec les options par défaut, puis le modèle suivant</td></tr>
<tr><td><strong>Facturation</strong></td><td>Une nouvelle tentative avec un plafond de sortie plus petit, puis ce modèle est ignoré pendant 10 minutes</td></tr>
<tr><td><strong>Authentification ou quota épuisé</strong></td><td>Passage au fournisseur suivant ; le quota et son heure de réinitialisation sont ce qui est signalé si tout échoue</td></tr>
<tr><td><strong>Modèle introuvable, erreur inconnue</strong></td><td>Modèle suivant</td></tr>
<tr><td><strong>Contexte trop long</strong></td><td>La chaîne s’arrête ; le tour compacte son historique et rappelle</td></tr>
</tbody>
</table>

${callout('info', 'Dernière configuration valide', 'Après chaque appel de modèle réussi, la configuration actuelle est copiée dans <code>config.toml.lastgood</code>. Si <code>config.toml</code> ne se charge plus par la suite, AIDaemon essaie <code>.lastgood</code>, puis <code>.bak</code>, <code>.bak.1</code> et <code>.bak.2</code>.')}

<h2>Quand un tour est-il terminé ?</h2>
<p><strong>Les preuves l’emportent sur le contrat.</strong></p>
<ul>
  <li>Avant de modifier ou d’envoyer quoi que ce soit, le modèle déclare ce dont la demande a besoin avec <code>track_requirements</code> (voir <a href="/plans">Plans et listes de contrôle</a>).</li>
  <li>Chaque élément n’est clos que par un reçu correspondant. Tant qu’un élément est ouvert et qu’un outil autorisé pourrait encore le faire, le registre d’exécution peut renvoyer le modèle faire plus de travail, au plus 2 passes supplémentaires.</li>
  <li>Une exécution dont tous les reçus ont réussi se termine en <code>succeeded</code>, même si le plan n’a pas su décrire le travail.</li>
  <li>Un élément que le modèle reporte, saute ou abandonne laisse l’exécution s’arrêter, mais la tâche se termine en <code>partial</code>, jamais en <code>succeeded</code>. Il en va de même pour un modèle qui signale <code>partial</code> ou <code>blocked</code>, et pour une demande qu’une politique a refusée.</li>
</ul>
<p>Quelques autres contrôles peuvent aussi demander une passe de plus, chacun avec son propre budget :</p>
<ul>
  <li>La réponse est vide, du texte interne ou une sortie d’outil collée telle quelle.</li>
  <li>L’exécution a modifié du code sans lancer de compilation ni de test.</li>
  <li>Plusieurs agents ont modifié des fichiers et personne n’a vérifié le résultat.</li>
  <li>Un clic dans l’interface n’a jamais été vérifié.</li>
  <li>Une décision de mandat n’a pas été enregistrée.</li>
</ul>

<h2>Remise en ordre des messages</h2>
<p>Avant chaque appel de modèle, l’historique est remis en ordre pour que chaque fournisseur l’accepte :</p>
<ol>
  <li>Fusionner les messages consécutifs de même rôle.</li>
  <li>Supprimer les résultats d’outils sans appel d’outil correspondant, et les appels d’outils sans résultat.</li>
  <li>Fusionner de nouveau.</li>
  <li>S’assurer que l’historique commence par un message utilisateur ou système.</li>
</ol>
<p>Une exécution qui dépasse la fenêtre de contexte du modèle est compactée.</p>

<h2>Sessions</h2>
<table class="config-table">
<thead><tr><th>Source</th><th>Identifiant de session</th></tr></thead>
<tbody>
<tr><td>Telegram</td><td><code>{bot}:{chat_id}</code></td></tr>
<tr><td>Slack</td><td><code>slack:{channel_id}</code> ou <code>slack:{channel_id}:{thread_ts}</code></td></tr>
<tr><td>Discord</td><td><code>discord:ch:{channel_id}</code> ou <code>discord:dm:{user_id}</code>, préfixé par <code>{bot}:</code> pour un bot nommé</td></tr>
<tr><td>Déclencheur e-mail</td><td><code>email_trigger</code></td></tr>
<tr><td>Sous-agent</td><td>Dérivé de la session parente</td></tr>
</tbody>
</table>
<p>La confiance ne vient pas de l’identifiant de session. Elle vient du rôle de l’expéditeur, de la visibilité du canal et de ce que le tour a lu : un contenu que le propriétaire n’a pas écrit (pages web, entrée de déclencheur, messages d’autres personnes, résultats MCP) marque le tour comme non fiable.</p>

<h2>Redémarrages</h2>
<p>Le noyau enregistre un point de contrôle de chaque exécution dans la même base de données (<code>run_events</code>, <code>run_states</code>). Si AIDaemon s’arrête au milieu d’un tour de chat, ce tour reçoit une continuation après le redémarrage. On lui dit quels appels étaient en cours et ont pu avoir ou non un effet, et aucun n’est relancé. Les sous-agents d’arrière-plan ne survivent pas à un redémarrage ; leurs chats en sont informés.</p>
`
  },
  {
    slug: '/architecture/state',
    section: 'Architecture',
    title: 'Stockage et état',
    description: 'Une seule base SQLite, chiffrée par défaut : quelle crate possède quelles tables, le cache de mémoire de travail, la mémoire à long terme, la rétention et les sauvegardes.',
    content: () => `
<h1>Stockage et état</h1>
<p class="lead">Tout ce qu’AIDaemon conserve se trouve dans un seul fichier SQLite, chiffré au repos par défaut. Chaque crate de domaine possède ses propres tables dans ce fichier.</p>

<h2>La base de données</h2>
<ul>
  <li><strong>Fichier :</strong> <code>[state] db_path</code> (<code>aidaemon.db</code> par défaut).</li>
  <li><strong>Chiffrement :</strong> SQLCipher, intégré par défaut. Si aucune clé n’existe, une est générée dans <code>.env</code>, et une base en clair existante est migrée automatiquement. <code>AIDAEMON_ALLOW_PLAINTEXT_DB=1</code> est un contournement d’urgence.</li>
  <li><strong>Mode :</strong> journal WAL et un pool de 10 connexions partageant un même cache de pages (<code>[state] sqlite_cache_mib</code>, 64 par défaut).</li>
  <li><strong>Sauvegardes lors d’une mise à niveau :</strong> lorsqu’une nouvelle version démarre sur une base existante, elle écrit d’abord une copie cohérente dans <code>backups/</code> à côté et conserve les <code>[state] upgrade_backups</code> plus récentes (2 par défaut ; <code>0</code> le désactive).</li>
</ul>

<h2>Qui possède quelles tables</h2>
<table class="config-table">
<thead><tr><th>Domaine</th><th>Tables principales</th><th>Propriétaire</th></tr></thead>
<tbody>
<tr><td>Historique des conversations et des tâches</td><td><code>events</code>, <code>task_lifecycle</code>, <code>session_context_boundaries</code>, <code>history_message_index</code> / <code>history_message_fts</code> (recherche)</td><td><code>aidaemon-events</code>, <code>aidaemon-runtime</code></td></tr>
<tr><td>Points de contrôle d’exécution du noyau</td><td><code>run_events</code>, <code>run_states</code></td><td><code>aidaemon-store-sqlite</code></td></tr>
<tr><td>Objectifs, tâches, planifications, mandats, listes de contrôle</td><td><code>goals</code>, <code>tasks</code>, <code>goal_schedules</code>, <code>goal_runs</code>, <code>mandates</code>, <code>task_plans</code>, <code>notification_queue</code></td><td><code>aidaemon-work</code></td></tr>
<tr><td>Mémoire à long terme</td><td><code>facts</code>, <code>episodes</code>, <code>procedures</code>, <code>error_solutions</code>, <code>people</code>, <code>person_facts</code>, <code>memory_*</code></td><td><code>aidaemon-memory</code></td></tr>
<tr><td>Sondes de santé</td><td><code>health_probes</code>, <code>probe_results</code>, <code>probe_alerts</code></td><td><code>aidaemon-work</code> (uniquement avec <code>[health] enabled</code>)</td></tr>
<tr><td>Approbations du terminal</td><td><code>terminal_backend_allowed_prefixes</code>, <code>terminal_capability_grants</code></td><td><code>aidaemon-runtime</code></td></tr>
<tr><td>Utilisation de tokens</td><td><code>token_usage</code>, <code>token_usage_daily</code></td><td><code>aidaemon-runtime</code></td></tr>
<tr><td>Configuration à l’exécution</td><td><code>settings</code>, <code>dynamic_bots</code>, <code>dynamic_mcp_servers</code>, <code>dynamic_skills</code>, <code>oauth_connections</code></td><td><code>aidaemon-runtime</code></td></tr>
<tr><td>Clients de l’application</td><td><code>client_events</code>, <code>client_devices</code>, <code>client_pairing</code></td><td><code>aidaemon-store-sqlite</code></td></tr>
</tbody>
</table>
<p>Les anciennes bases sont mises à niveau au démarrage : l’ancienne table <code>messages</code> passe dans <code>events</code>, et l’ancienne table <code>scheduled_tasks</code> passe dans les objectifs et les planifications d’objectifs. Les deux anciennes tables sont ensuite supprimées.</p>

<h2>Historique des conversations</h2>
<p>La table <code>events</code> est l’unique trace d’une conversation (voir <a href="/event-sourcing">Event Sourcing</a>). Les messages récents de chaque session sont aussi mis en cache en mémoire, plafonnés à <code>[state] working_memory_cap</code> (50 par défaut) et réalimentés depuis les événements après un redémarrage. <code>/clear</code> enregistre une frontière pour que les tours suivants repartent de zéro sans rien supprimer ; <code>/wipe</code> supprime réellement l’historique de la session.</p>

<h2>Mémoire à long terme</h2>
<p>Avec le <code>[memory] backend = "daemon"</code> par défaut, la mémoire se trouve dans la même base de données :</p>
<ul>
  <li>Des faits, dont les anciennes versions sont remplacées plutôt qu’écrasées.</li>
  <li>Des épisodes qui résument les sessions passées.</li>
  <li>Des procédures et des solutions d’erreurs apprises à partir du travail terminé.</li>
  <li>Des personnes.</li>
</ul>
<p>Le rappel classe selon le sens, les mots, la fraîcheur, la confiance et la source. Les faits les plus récents, jusqu’à <code>[state] max_facts</code> (20 par défaut), vont dans le prompt système. Les embeddings sont calculés localement avec fastembed (<code>[memory] embedding_model</code>, <code>AllMiniLML6V2Q</code> par défaut) ; changer de modèle recalcule les embeddings de la mémoire en arrière-plan. Les notes des conversations placées dans un projet sont conservées sous forme de fichiers dans <code>~/.aidaemon/projects</code>, à part de la mémoire personnelle. Les tâches de mémoire d’arrière-plan s’exécutent toutes les <code>[state] consolidation_interval_hours</code> (6 par défaut). Voir <a href="/tools/memory">Mémoire</a>.</p>

<h2>Rétention</h2>
<p>Une tâche quotidienne supprime les anciennes lignes selon <code>[state.retention]</code>. Chaque valeur est en jours ; <code>0</code> garde les lignes indéfiniment. Seul l’historique dont la mémoire a déjà tiré des enseignements est jamais supprimé.</p>
${configTable([
  ['messages_days', 'integer', '90', 'Événements de conversation (début/fin de tâche, messages de l’utilisateur et de l’assistant)'],
  ['diagnostic_events_days', 'integer', '7', 'Événements d’outils, d’appels de modèle et autres événements de diagnostic'],
  ['superseded_facts_days', 'integer', '90', 'Anciennes versions des faits'],
  ['token_usage_aggregate_days', 'integer', '30', 'Lignes brutes de tokens, d’abord regroupées en totaux quotidiens'],
  ['episodes_days', 'integer', '365', 'Épisodes jamais rappelés'],
  ['behavior_patterns_days', 'integer', '90', 'Motifs au plancher de confiance'],
  ['goals_days', 'integer', '180', 'Objectifs terminés ou abandonnés'],
  ['procedures_days', 'integer', '180', 'Procédures qui n’ont jamais réussi'],
  ['error_solutions_days', 'integer', '90', 'Solutions d’erreurs qui ont fait plus de mal que de bien'],
])}
`
  },
  {
    slug: '/service-install',
    section: 'Service',
    title: 'Exécuter comme service',
    description: 'Lancez aidaemon à l’ouverture de session avec aidaemon service install (launchd, unité utilisateur systemd, tâche de connexion Windows), ou comme service pour tout le système.',
    content: () => `
<h1>Installation du service</h1>
<p class="lead">Gardez aidaemon en marche en arrière-plan, démarré à l’ouverture de session.</p>

<h2>Pour cet utilisateur (recommandé)</h2>
${codeBlock(`aidaemon service install      # this user, at login, from ~/.aidaemon (--dir to change); starts it now
aidaemon service uninstall`, 'bash')}
<p>Aucun droit d’administrateur n’est nécessaire. C’est ce que fait <strong>Run it here</strong> de l’application au premier lancement : un agent launchd sur macOS, une unité utilisateur systemd sur Linux (la persistance après déconnexion est activée pour qu’elle survive à votre session), et une tâche de connexion sur Windows. Le téléchargement de l’application macOS exécute plutôt le daemon depuis l’intérieur de <code>AIdaemon.app</code>.</p>

<h2>Pour tout le système (hérité)</h2>
${codeBlock(`./aidaemon install-service`, 'bash')}

<p><code>install-service</code> écrit toujours l’unité système sur Linux (nécessite sudo) ou l’agent de lancement sur macOS, et affiche les commandes pour le démarrer ; il ne démarre rien lui-même. Sur Windows, il n’est pas disponible : utilisez <code>aidaemon service install</code>. Il détecte automatiquement la plateforme :</p>

<h2>Linux (systemd)</h2>
<p>Crée <code>/etc/systemd/system/aidaemon.service</code> :</p>
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

<p>Il affiche les commandes pour l’activer et le démarrer ; lancez-les vous-même :</p>
${codeBlock(`sudo systemctl daemon-reload
sudo systemctl enable --now aidaemon`, 'bash')}

<h2>macOS (launchd)</h2>
<p>Copie le binaire dans un <code>~/Applications/aidaemon.app</code> signé (pour que les autorisations macOS survivent aux recompilations ; le téléchargement de l’application utilise plutôt son propre assistant signé) et crée <code>$HOME/Library/LaunchAgents/ai.aidaemon.plist</code> :</p>
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

<p>Chargez-le ensuite, et accordez Accessibilité et Enregistrement de l’écran à aidaemon si vous utilisez computer use :</p>
${codeBlock(`launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/ai.aidaemon.plist`, 'bash')}

${callout('info', 'Mise en veille de macOS', 'Sur macOS, le daemon empêche le Mac de se mettre en veille par inactivité pendant qu’il s’exécute (il lance <code>caffeinate -i</code> pour lui-même). N’enveloppez pas le binaire dans <code>caffeinate</code> dans le plist : cela casse les autorisations dont computer use a besoin.')}

<h2>Journaux</h2>
<p>Un daemon qui s’exécute en arrière-plan écrit un journal à rotation de taille, réservé au propriétaire, dans <code>~/Library/Logs/aidaemon/stdout.log</code> sur macOS et <code>~/.local/state/aidaemon/stdout.log</code> ailleurs (sous <code>$XDG_STATE_HOME</code> lorsqu’il est défini). Définissez <code>AIDAEMON_LOG_DIR</code> pour changer le dossier. Sur Linux, <code>journalctl --user -u aidaemon</code> montre pourquoi le service s’est arrêté.</p>

<h2>Vérification de santé</h2>
<p>Une fois lancé comme service, vérifiez avec :</p>
${codeBlock(`curl http://127.0.0.1:8080/health
# {"status": "ok", "components": {"database": {...}, "provider": {...}}}`, 'bash')}

<p>Le point d’accès de santé est servi sur <code>[daemon] health_bind</code>:<code>health_port</code> (<code>127.0.0.1:8080</code> par défaut). Il répond <code>200</code> avec <code>"ok"</code>, ou <code>503</code> avec <code>"degraded"</code> lorsque la base de données ne répond pas ou que le fournisseur de modèle est indisponible. Voir <a href="/health-monitoring">Surveillance de santé</a> pour la réponse complète.</p>
`
  },
  {
    slug: '/event-sourcing',
    section: 'Event Sourcing',
    title: 'Système d’événements',
    description: 'La table d’événements en ajout seul : ce qu’AIDaemon enregistre, le registre d’exécution qui en est tiré, et comment l’apprentissage et la rétention l’utilisent.',
    content: () => `
<h1>Event Sourcing</h1>
<p class="lead">Chaque tour est enregistré comme une séquence d’événements en ajout seul dans la table <code>events</code>. L’historique de la conversation, le résultat de la tâche et le registre qui juge si le travail a été fait sont tous lus à partir de ces événements.</p>

<h2>Ce qui est enregistré</h2>
<table class="config-table">
<thead><tr><th>Groupe</th><th>Types d’événements</th></tr></thead>
<tbody>
<tr><td><strong>Conversation</strong></td><td><code>user_message</code>, <code>assistant_response</code>, <code>response_delivery</code> (la progression de la réponse dans le canal)</td></tr>
<tr><td><strong>Tâches</strong></td><td><code>task_start</code>, <code>task_end</code> (statut et résultat)</td></tr>
<tr><td><strong>Outils</strong></td><td><code>tool_call</code>, <code>tool_result</code></td></tr>
<tr><td><strong>Appels de modèle</strong></td><td><code>llm_call</code> (télémétrie de latence et de tokens)</td></tr>
<tr><td><strong>Complétion</strong></td><td><code>task_contract_compiled</code>, <code>executor_expectations_declared</code> (la liste de contrôle du modèle), <code>background_continuation_linked</code></td></tr>
<tr><td><strong>Politique et diagnostics</strong></td><td><code>policy_decision</code>, <code>decision_point</code>, <code>policy_metrics_snapshot</code>, <code>memory_policy_compiled</code>, <code>user_constraint_violation</code>, <code>thinking_start</code>, <code>error</code></td></tr>
<tr><td><strong>Attente d’une personne</strong></td><td><code>interaction_requested</code>, <code>interaction_resolved</code>, <code>approval_requested</code>, <code>approval_granted</code>, <code>approval_denied</code></td></tr>
<tr><td><strong>Ressources</strong></td><td><code>resource_registered</code>, <code>resource_invalidated</code></td></tr>
<tr><td><strong>Points de contrôle de fichiers</strong></td><td><code>checkpoint_created</code>, <code>checkpoint_finalized</code>, <code>checkpoint_skipped</code>, <code>rollback_started</code>, <code>rollback_completed</code>, <code>rollback_failed</code></td></tr>
<tr><td><strong>Sous-agents</strong></td><td><code>sub_agent_spawn</code>, <code>sub_agent_complete</code></td></tr>
<tr><td><strong>Sessions</strong></td><td><code>session_start</code>, <code>session_end</code></td></tr>
</tbody>
</table>

<h2>Structure d’un événement</h2>
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

<h2>Ce qu’on construit à partir des événements</h2>
<ul>
  <li><strong>Historique de la conversation.</strong> Les messages qu’un modèle voit sont lus à partir des événements, regroupés par tour. Un index plein texte (<code>history_message_fts</code>) permet à l’agent de chercher dans les conversations passées ; une tâche horaire le répare.</li>
  <li><strong>Cycle de vie des tâches.</strong> <code>task_lifecycle</code> garde une ligne par tâche (en cours ou terminée) et est mise à jour dans la même écriture que l’événement. Ainsi, une tâche ne peut se terminer qu’une seule fois, même lorsqu’un watchdog, une annulation et la clôture normale se font concurrence. Une tâche exécutée chaque minute clôt les tâches qui ont démarré sans jamais se terminer.</li>
  <li><strong>Le registre d’exécution.</strong> L’agrégat d’exécution est reconstruit à partir des événements d’une tâche : ses obligations, ses reçus et son verdict (<code>succeeded</code>, réussi sur preuves, clos par un refus de politique, <code>failed</code> ou en attente). Le reconstruire à partir des mêmes événements donne toujours la même réponse.</li>
  <li><strong>Contexte de session.</strong> Un résumé de ce que fait la session (tâche en cours, outils récents, erreurs, approbations, sous-agents) est placé dans le prompt système.</li>
</ul>
<p>Le noyau tient aussi son propre journal par exécution (<code>run_events</code>, <code>run_states</code>) pour qu’une exécution interrompue puisse être réglée après un redémarrage.</p>

<h2>Apprendre à partir des événements</h2>
<p>Toutes les <code>[state] consolidation_interval_hours</code> (6 par défaut), les tâches de mémoire apprennent à partir des événements des sessions terminées : procédures issues de séquences d’outils qui ont fonctionné, solutions d’erreurs, expertise et motifs d’échec. Un passage quotidien fait de même pour toute session dont les événements non appris ont plus de 7 jours. Les sessions isolées, ou les tâches dont la politique interdit la mémoire automatique, sont marquées comme traitées sans que l’on en tire d’enseignements. Dans les deux cas, les événements reçoivent un horodatage <code>consolidated_at</code>, ce qui les rend éligibles à la rétention.</p>

<h2>Rétention</h2>
<p>Seule la tâche quotidienne de rétention supprime des événements, et uniquement ceux déjà marqués <code>consolidated_at</code>. Les événements de conversation (début/fin de tâche, messages de l’utilisateur et de l’assistant) sont conservés 90 jours (<code>[state.retention] messages_days</code>). Les événements d’outils, d’appels de modèle et de diagnostic sont conservés 7 jours (<code>diagnostic_events_days</code>). <code>0</code> les conserve indéfiniment. <code>/wipe</code> supprime immédiatement les événements d’une session.</p>

${callout('info', 'Ajout seul', 'Les événements ne sont jamais réécrits, sauf pour <code>consolidated_at</code> et les annotations ajoutées à un message de l’utilisateur. La rétention et <code>/wipe</code> sont les seules suppressions.')}
`
  },
  {
    slug: '/plans',
    section: 'Plans',
    title: 'Plans et listes de contrôle',
    description: 'Comment AIDaemon déclare ce dont une demande a besoin avec track_requirements, comment les reçus closent chaque élément, et comment la liste de contrôle décide si une tâche a réussi.',
    content: () => `
<h1>Plans et listes de contrôle</h1>
<p class="lead">Avant de modifier ou d’envoyer quoi que ce soit, l’agent note ce dont la demande a besoin sous forme de liste de contrôle. Chaque élément n’est coché que par le résultat d’un véritable appel d’outil, et la liste de contrôle décide si la demande compte comme terminée.</p>

<h2>L’outil de liste de contrôle</h2>
<p>Le modèle appelle <code>track_requirements</code> avant sa première opération chaque fois qu’une demande :</p>
<ul>
  <li>modifie un fichier, un système distant, un déploiement, une planification ou un réglage, ou</li>
  <li>envoie ou publie quelque chose.</li>
</ul>
<p>Une demande comportant plusieurs opérations ou cibles reçoit un élément pour chacune. Chaque appel transmet la liste complète, qui remplace la précédente. Si vous modifiez ou annulez une partie du travail en cours d’exécution, l’agent transmet une liste révisée.</p>
<table class="config-table">
<thead><tr><th>Champ d’un élément</th><th>Signification</th></tr></thead>
<tbody>
<tr><td><code>text</code></td><td>L’exigence, rédigée pour que vous la lisiez (par exemple en nommant le dossier qu’elle crée)</td></tr>
<tr><td><code>status</code></td><td><code>pending</code>, <code>in_progress</code>, <code>completed</code>, <code>skipped</code>, <code>failed</code>, <code>deferred</code> ou <code>background</code> (une tâche d’arrière-plan le terminera)</td></tr>
<tr><td><code>depends_on</code></td><td>Indices des éléments qui doivent passer en premier</td></tr>
<tr><td><code>owner_units</code></td><td>Quelles parties numérotées de votre demande cet élément réalise</td></tr>
<tr><td><code>mutation_effects</code></td><td>Quel type de modification le prouve, comme <code>local_workspace_write</code>, <code>repository_write</code>, <code>remote_deploy</code> ou <code>external_delivery</code></td></tr>
<tr><td><code>requires_observation</code></td><td>Une lecture ou une vérification le prouve</td></tr>
<tr><td><code>targets</code></td><td>Les chemins, URL ou identifiants de ressources exacts concernés</td></tr>
</tbody>
</table>
<p>L’appel peut aussi porter le verdict du modèle, <code>outcome</code> : <code>done</code>, <code>partial</code>, <code>blocked</code>, <code>needs_owner</code> (le travail attend votre réponse) ou <code>nothing_new</code> (une exécution planifiée n’a rien trouvé de changé). Avec <code>partial</code> ou <code>blocked</code>, <code>short_of</code> peut indiquer quelle ressource de la machine s’est épuisée (espace disque, espace disque de Docker ou mémoire).</p>

<h2>Comment les éléments sont clos</h2>
<ul>
  <li>Un élément avec des effets, des cibles ou une observation est clos par le reçu de l’appel d’outil qui l’a réalisé, jamais parce que le modèle le coche.</li>
  <li>Seuls les éléments qui n’ont rien de tout cela sont marqués <code>completed</code> à la main.</li>
  <li>Tant qu’un élément atteignable est ouvert, l’exécution peut être renvoyée faire plus de travail.</li>
  <li>Un élément marqué <code>skipped</code>, <code>failed</code> ou <code>deferred</code>, ou retiré de la liste, laisse l’exécution s’arrêter, mais il est signalé comme non fait. La tâche se termine alors en <code>partial</code>, jamais en <code>succeeded</code>.</li>
  <li>Un verdict du modèle de <code>partial</code> ou <code>blocked</code> plafonne la tâche à <code>partial</code>. Les reçus peuvent rétrograder un <code>done</code> déclaré ; rien ne promeut les deux autres.</li>
</ul>
<p>Modifier la liste de contrôle ne transforme jamais un travail qui n’a pas eu lieu en travail qui a eu lieu.</p>

<h2>Où elle s’affiche et où elle est conservée</h2>
<ul>
  <li><strong>Carte d’état.</strong> La liste de contrôle apparaît sur la carte d’état en direct dans votre chat et dans l’application, y compris les éléments d’arrière-plan encore en cours.</li>
  <li><strong>Stockage.</strong> Elle est enregistrée dans la table <code>task_plans</code>, de sorte que la liste de contrôle d’une tâche survit à un redémarrage.</li>
  <li><strong>Apprentissage.</strong> Les listes de contrôle terminées du dernier jour alimentent l’apprentissage de procédures de la mémoire.</li>
</ul>

<h2>Objectifs, planifications et automatisations</h2>
<p>Le travail de plus longue durée (objectifs avec tâches, exécutions planifiées, mandats qui surveillent un objectif) se trouve dans <code>aidaemon-work</code>. Voir <a href="/scheduler">Tâches planifiées</a> et <a href="/tools/sub-agents">Sous-agents</a>.</p>
`
  },
  {
    slug: '/health-monitoring',
    section: 'Health Monitoring',
    title: 'Surveillance de santé',
    description: 'Le point d’accès /health d’AIDaemon, ses watchdogs, et des sondes HTTP, TCP, commande et fichier pour vos services avec alertes de panne, de rétablissement et de latence.',
    content: () => `
<h1>Surveillance de santé</h1>
<p class="lead">AIDaemon signale sa propre santé sur un point d’accès local, et peut surveiller vos services avec des sondes de santé qui vous alertent lorsqu’ils tombent en panne.</p>

<h2>La santé d’AIDaemon lui-même</h2>
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
  <li><strong>Codes de réponse :</strong> <code>200</code> avec <code>"ok"</code> lorsque la base de données répond et que le fournisseur de modèle n’est pas indisponible ; sinon <code>503</code> avec <code>"degraded"</code>.</li>
  <li><strong>Aucun appel de modèle :</strong> l’état du fournisseur est lu à partir des appels de modèle récents, pas d’une nouvelle requête. <code>provider.status</code> vaut <code>ready</code>, <code>recovering</code> (le dernier appel a échoué), <code>stale</code> (aucun appel depuis 15 minutes), <code>unknown</code> (aucun appel pour l’instant) ou <code>unavailable</code>.</li>
  <li><strong>Quand il compte comme indisponible :</strong> le dernier appel dans les 15 minutes a échoué pour cause d’authentification, de facturation ou de quota épuisé, ou 3 appels consécutifs ou plus ont échoué.</li>
  <li><strong>Adresse :</strong> servi sur <code>[daemon] health_bind</code>:<code>health_port</code> (<code>127.0.0.1:8080</code> par défaut). Avec <code>[daemon] dashboard_enabled</code> (la valeur par défaut), le même serveur gère aussi les rappels OAuth.</li>
</ul>

<h2>Watchdogs</h2>
${configTable([
  ['stale_threshold_secs', 'integer', '300', 'Un tour dont la boucle cesse de battre pendant ce délai est annulé comme bloqué'],
  ['task_inactivity_timeout_secs', 'integer', '300', 'Une tâche sans activité d’outil ou de modèle pendant ce délai est considérée comme bloquée'],
  ['llm_call_timeout_secs', 'integer', '300', 'Délai d’attente d’un appel de modèle'],
  ['background_stall_secs', 'integer', '120', 'Une commande d’arrière-plan sans progression (CPU, E/S, sortie) pendant ce délai peut être arrêtée'],
  ['background_max_runtime_secs', 'integer', '0', 'Plafond facultatif pour une commande d’arrière-plan ; 0 signifie aucun'],
])}
<p>Ils se trouvent sous <code>[daemon.watchdog]</code>. Rien n’est limité par le seul temps écoulé ; un travail qui continue de progresser continue de s’exécuter.</p>

<h2>Sondes de service</h2>
<p>Les sondes sont désactivées par défaut. Activez-les avec <code>[health] enabled = true</code>.</p>
<table class="config-table">
<thead><tr><th>Type</th><th>Cible</th><th>Sain lorsque</th></tr></thead>
<tbody>
<tr><td><code>http</code></td><td>URL</td><td>Le statut correspond à <code>expected_status</code> (200 par défaut) et le corps contient <code>expected_body</code> s’il est défini ; la latence est enregistrée</td></tr>
<tr><td><code>port</code></td><td><code>host:port</code></td><td>Une connexion TCP s’ouvre</td></tr>
<tr><td><code>command</code></td><td>Commande shell (exécutée avec <code>sh -c</code>)</td><td>Le code de sortie correspond à <code>expected_exit_code</code> (0 par défaut)</td></tr>
<tr><td><code>file</code></td><td>Chemin de fichier</td><td>Le fichier existe et est plus récent que <code>max_age_secs</code> s’il est défini</td></tr>
</tbody>
</table>

<h2>Configuration</h2>
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
<p><code>schedule</code> accepte les mêmes formes que les tâches planifiées (<code>every 5m</code>, <code>daily at 9am</code>, ou un cron à 5 champs). Les sondes issues de la configuration sont synchronisées par nom : retirez-en une du fichier et elle est retirée de la base de données.</p>

<h3>Options des sondes (<code>config</code>)</h3>
${configTable([
  ['timeout_secs', 'integer', '10', 'Délai d’attente en secondes'],
  ['expected_status', 'integer', '200', 'HTTP : code de statut attendu'],
  ['expected_body', 'string', 'null', 'HTTP : texte que le corps doit contenir'],
  ['method', 'string', '"GET"', 'HTTP : méthode'],
  ['headers', 'table', '{}', 'HTTP : en-têtes supplémentaires'],
  ['expected_exit_code', 'integer', '0', 'Commande : code de sortie attendu'],
  ['max_age_secs', 'integer', 'null', 'Fichier : âge maximal'],
])}

<h2>Alertes</h2>
<ul>
  <li><strong>Panne :</strong> après <code>consecutive_failures_alert</code> échecs consécutifs (3 par défaut).</li>
  <li><strong>Rétablissement :</strong> lorsqu’une sonde qui était en panne réussit de nouveau.</li>
  <li><strong>Lenteur :</strong> lorsque la latence dépasse <code>latency_threshold_ms</code>, au plus une fois toutes les 5 minutes.</li>
</ul>
<p>Les alertes vont à <code>alert_session_ids</code>, ou à vos propres chats lorsque la liste est vide. Un identifiant de session Telegram ressemble à <code>mybot:123456789</code>.</p>

<h2>Tâches d’arrière-plan</h2>
<ul>
  <li><strong>Boucle de tick :</strong> toutes les <code>tick_interval_secs</code> (30 par défaut), exécute les sondes dues.</li>
  <li><strong>Nettoyage :</strong> chaque jour à 3 h 40 UTC, supprime les résultats plus anciens que <code>result_retention_days</code>.</li>
</ul>

${callout('info', 'Sondes à l’exécution', 'Avec les sondes activées, l’agent peut créer, lister, exécuter et vérifier des sondes avec l’outil <code>health_probe</code> (actions <code>create</code>, <code>list</code>, <code>run_now</code>, <code>status</code>). Les sondes apparaissent aussi comme des automatisations dans <code>manage_automations</code>, où elles peuvent être mises en pause ou annulées, et dans la zone System de l’application avec les tâches d’arrière-plan et les files.')}
`
  },
  {
    slug: '/updates',
    section: 'Updates',
    title: 'Mise à jour automatique',
    description: 'Mettez aidaemon à jour automatiquement depuis les releases GitHub. Trois modes : enable (installer automatiquement), check_only (demander d’abord) et disable.',
    content: () => `
<h1>Mise à jour automatique</h1>
<p class="lead">aidaemon peut vérifier la présence de nouvelles releases sur GitHub et se mettre à jour tout seul.</p>

<h2>Points marquants des dernières versions</h2>
<ul>
  <li><strong>v0.21.0</strong> &mdash; Read aloud (lecture à voix haute) dans l’application, réponses qui arrivent en continu au fur et à mesure qu’elles sont écrites, cache de prompt d’Anthropic d’une heure conservé entre les chargements d’outils différés, et correctifs pour les URL de base Anthropic se terminant par <code>/v1</code> et pour les appels d’outils Gemini</li>
  <li><strong>v0.20.0</strong> &mdash; l’application AIDaemon pour le bureau, le web et le terminal ; téléchargements pour macOS, Windows et Linux ARM64 ; premier lancement depuis l’application ; vues en direct du navigateur de l’agent ; modes de permission des agents de code ; fichiers de projet et mémoire de projet ; mises à niveau automatiques des modèles ; jauges d’utilisation ; planifications dans n’importe quel fuseau horaire</li>
  <li><strong>v0.12.9</strong> &mdash; correctifs de la mémoire : les exécutions planifiées n’écrivent plus leurs instructions dans votre mémoire, les extracteurs automatisés ne peuvent plus écraser ce que vous avez dit, et les doublons reformulés sont fusionnés</li>
</ul>

<h2>Modes de mise à jour</h2>
<table class="config-table">
<thead><tr><th>Mode</th><th>Comportement</th></tr></thead>
<tbody>
<tr><td><code>enable</code></td><td>Télécharge et applique automatiquement les mises à jour, puis redémarre</td></tr>
<tr><td><code>check_only</code> (par défaut)</td><td>Notifie et attend l’approbation avant d’appliquer</td></tr>
<tr><td><code>disable</code></td><td>Aucune vérification de mise à jour</td></tr>
</tbody>
</table>

<h2>Configuration</h2>
${codeBlock(`[updates]
mode = "check_only"
check_interval_hours = 24
check_at_utc_hour = 6
confirmation_timeout_mins = 60`, 'toml', 'config.toml')}

${configTable([
  ['mode', 'string', '"check_only"', 'Mode de mise à jour : enable, check_only ou disable'],
  ['check_interval_hours', 'integer', '24', 'Heures entre deux vérifications de mise à jour'],
  ['check_at_utc_hour', 'integer', 'null', 'Heure UTC précise (0-23) pour la vérification quotidienne'],
  ['confirmation_timeout_mins', 'integer', '60', 'Minutes d’attente de l’approbation de l’utilisateur'],
])}

<h2>Processus de mise à jour</h2>
<ol>
  <li><strong>Vérifier</strong> &mdash; interroge l’API GitHub Releases</li>
  <li><strong>Comparer</strong> &mdash; comparaison semver</li>
  <li><strong>Notifier</strong> &mdash; envoie les notes de version aux canaux</li>
  <li><strong>Approuver</strong> (check_only) &mdash; demande d’approbation avec délai</li>
  <li><strong>Télécharger</strong> &mdash; binaire propre à la plateforme</li>
  <li><strong>Remplacer</strong> &mdash; écrase le binaire actuel</li>
  <li><strong>Redémarrer</strong> &mdash; quitte avec le code 75 pour déclencher le redémarrage du service</li>
</ol>

<p>Vérifiez à la main avec <code>aidaemon check-update</code>.</p>

<h2>Plateformes prises en charge</h2>
<table class="config-table">
<thead><tr><th>Plateforme</th><th>Architecture</th></tr></thead>
<tbody>
<tr><td>Linux</td><td>x86_64, aarch64</td></tr>
<tr><td>macOS</td><td>x86_64, aarch64</td></tr>
<tr><td>Windows</td><td>Pas de mise à jour automatique : téléchargez le nouveau zip</td></tr>
</tbody>
</table>

${callout('info', 'Téléchargement de l’application macOS', 'Le daemon à l’intérieur de <code>AIdaemon.app</code> ne se remplace pas lui-même : il signale lorsqu’une nouvelle version est disponible, et vous installez le nouveau <code>.dmg</code> depuis la <a href="https://github.com/davo20019/aidaemon/releases/latest">dernière release</a> pour mettre les deux à jour.')}
${callout('warn', 'Utilisateurs de Homebrew', 'Si vous avez installé via Homebrew, utilisez plutôt <code>brew upgrade aidaemon</code>, ou définissez <code>mode = "disable"</code>.')}
`
  },
  {
    slug: '/terminal/self-hosting',
    section: 'Terminal',
    title: 'Auto-hébergement du broker de terminal',
    description: 'Déployez votre propre broker de terminal sur Cloudflare Workers pour garder le plein contrôle de l’infrastructure de relais entre Telegram et votre machine locale.',
    content: () => `
<h1>Auto-hébergement du broker de terminal</h1>
<p class="lead">La fonctionnalité de terminal vous permet de lancer des agents CLI (Codex, Claude, Gemini, OpenCode) directement depuis Telegram. Par défaut, elle utilise le broker hébergé partagé à <code>terminal.aidaemon.ai</code>. L’auto-hébergement vous donne le plein contrôle de l’infrastructure de relais.</p>

<h2>Architecture</h2>
<p>Le système de terminal comporte trois composants :</p>
<ul>
  <li><strong>Le daemon aidaemon</strong> (Rust) &mdash; s’exécute sur votre machine, lance des sessions PTY, fait le pont avec le broker par WebSocket</li>
  <li><strong>Le broker</strong> (Cloudflare Worker) &mdash; relais WebSocket entre la Mini App et le daemon. Gère l’authentification, la limitation de débit et les sessions</li>
  <li><strong>La Mini App</strong> (intégrée au broker) &mdash; interface de Mini App Telegram avec l’émulateur de terminal xterm.js</li>
</ul>

${codeBlock(`Telegram ──> Mini App (browser) <──WSS──> Broker (CF Worker) <──WSS──> aidaemon daemon ──> local PTY

                                        ┌───────────────────┐
  ┌──────────┐    ┌──────────────────┐   │  Cloudflare        │   ┌────────────────┐   ┌───────────┐
  │ Telegram │───>│ Mini App         │<─>│  Worker (Broker)   │<─>│ aidaemon       │──>│ local PTY │
  │          │    │ (xterm.js)       │   │  - auth            │   │ (terminal      │   │ (bash,    │
  │          │    │                  │   │  - rate limiting   │   │  bridge)       │   │  zsh...)  │
  └──────────┘    └──────────────────┘   │  - session mgmt   │   └────────────────┘   └───────────┘
                         WSS             └───────────────────┘          WSS`, 'text', 'architecture')}

${callout('info', 'Chiffrement de bout en bout', 'Le broker est un relais transparent &mdash; il ne voit jamais le contenu réel du terminal. Toutes les E/S du terminal sont chiffrées entre la Mini App et votre daemon.')}

<h2>Prérequis</h2>
<ul>
  <li><strong>Un compte Cloudflare</strong> &mdash; l’offre gratuite suffit pour un usage personnel</li>
  <li><strong>Un bot Telegram</strong> &mdash; créé via <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a></li>
  <li><strong>aidaemon installé et en cours d’exécution</strong> &mdash; avec le canal Telegram configuré (<a href="/telegram">guide de configuration de Telegram</a>)</li>
  <li><strong>Node.js 20+</strong> et <strong>npm</strong> &mdash; pour la <a href="https://developers.cloudflare.com/workers/wrangler/" target="_blank" rel="noopener">CLI wrangler</a></li>
</ul>

<h2>Étape 1 &mdash; Cloner le broker</h2>
<p>Le broker est un projet Cloudflare Worker autonome. Clonez-le et installez les dépendances :</p>
${codeBlock(`git clone https://github.com/davo20019/terminal.aidaemon.ai.git
cd terminal.aidaemon.ai
npm install`, 'bash')}

<h2>Étape 2 &mdash; Configurer le déploiement</h2>
<p>Ouvrez <code>wrangler.toml</code> et choisissez comment vous voulez déployer :</p>

<h3>Option A : sous-domaine workers.dev (le plus simple)</h3>
<p>Si vous n’avez pas de domaine personnalisé, utilisez le sous-domaine gratuit <code>*.workers.dev</code> de Cloudflare. Commentez ou supprimez le bloc <code>routes</code> :</p>
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

<h3>Option B : domaine personnalisé</h3>
<p>Si vous avez un domaine dans le DNS de Cloudflare, configurez une route vers lui :</p>
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

${callout('info', 'DNS Cloudflare requis', 'Les domaines personnalisés doivent être gérés par le DNS de Cloudflare (proxy nuage orange). Si votre domaine est chez un autre registraire, vous pouvez soit le transférer, soit l’ajouter comme <a href="https://developers.cloudflare.com/dns/zone-setups/" target="_blank" rel="noopener">zone Cloudflare</a>.')}

<h2>Étape 3 &mdash; Définir les secrets</h2>
<p>Le broker a besoin de quelques secrets pour fonctionner. Définissez-les avec la CLI wrangler :</p>

${codeBlock(`# Required: signs all authentication tokens
npx wrangler secret put SESSION_SIGNING_KEY
# paste output of: openssl rand -base64 32

# Required: validates Telegram user identity
npx wrangler secret put TELEGRAM_BOT_TOKEN
# paste your bot token from @BotFather

# Optional: protects admin API endpoints
npx wrangler secret put ADMIN_API_KEY
# paste a strong random string`, 'bash')}

${callout('danger', 'Protégez votre clé de signature', 'La <code>SESSION_SIGNING_KEY</code> signe tous les tokens d’authentification. Si elle est compromise, un attaquant pourrait forger des sessions. Générez une valeur aléatoire forte et conservez-la en lieu sûr. Renouvelez-la immédiatement si vous soupçonnez une fuite.')}

<p>Liste complète des secrets disponibles :</p>
${configTable([
  ['SESSION_SIGNING_KEY', 'string', '&mdash;', 'Obligatoire. Signe les tokens d’authentification. À générer avec <code>openssl rand -base64 32</code>'],
  ['TELEGRAM_BOT_TOKEN', 'string', '&mdash;', 'Obligatoire. Token du bot obtenu auprès de @BotFather. Doit correspondre au token de votre configuration aidaemon'],
  ['ADMIN_API_KEY', 'string', '&mdash;', 'Facultatif. Protège les points d’accès d’administration (gestion des utilisateurs, dérogations de quota)'],
  ['BILLING_WEBHOOK_SECRET', 'string', '&mdash;', 'Facultatif. Secret HMAC pour la vérification de signature du webhook de facturation'],
])}

<h2>Étape 4 &mdash; Déployer</h2>
<p>Déployez le broker sur Cloudflare Workers :</p>
${codeBlock(`npx wrangler deploy   # or: npm run deploy`, 'bash')}

<p>Vous devriez voir une sortie comme celle-ci :</p>
${codeBlock(`Uploaded terminal-broker (3.45 sec)
Published terminal-broker (0.35 sec)
  https://terminal-broker.your-subdomain.workers.dev
Current Deployment ID: abc12345-...`, 'text', 'deploy output')}

${callout('info', 'Migration de Durable Object', 'Le premier déploiement crée automatiquement la migration de Durable Object pour <code>UserSessionStore</code>. Aucune étape de migration manuelle n’est nécessaire.')}

<h2>Étape 5 &mdash; Configurer aidaemon</h2>
<p>Faites pointer votre daemon aidaemon vers votre broker auto-hébergé. Mettez à jour votre <code>config.toml</code> :</p>

${codeBlock(`[terminal]
web_app_url = "https://terminal.example.com"
daemon_ws_url = "wss://terminal.example.com/v1/ws/daemon"`, 'toml', 'config.toml')}

<p>Ou utilisez des variables d’environnement :</p>
${codeBlock(`export AIDAEMON_TERMINAL_WEB_APP_URL="https://terminal.example.com"
export AIDAEMON_TERMINAL_BROKER_URL="wss://terminal.example.com/v1/ws/daemon"`, 'bash')}

<p>Autres remplacements que lit le daemon : <code>AIDAEMON_TERMINAL_BRIDGE_ENABLED</code> (ou <code>[terminal] bridge_enabled</code>, vrai par défaut), <code>AIDAEMON_TERMINAL_DAEMON_TOKEN</code>, <code>AIDAEMON_TERMINAL_USER_ID</code>, <code>AIDAEMON_TERMINAL_DEVICE_ID</code> et <code>AIDAEMON_TERMINAL_SHELL</code>.</p>

<p>Redémarrez aidaemon après avoir modifié la configuration pour que les nouvelles valeurs prennent effet.</p>

<h2>Étape 6 &mdash; Configurer Telegram</h2>
<p>La façon de configurer Telegram dépend de la manière dont vous lancez le terminal :</p>

<h3>Via la commande /terminal (boutons intégrés)</h3>
<p>Si vous utilisez la commande <code>/terminal</code> dans le chat de votre bot, l’URL de la Mini App vient de <code>web_app_url</code> dans votre <code>config.toml</code>. Aucun changement dans BotFather n’est nécessaire &mdash; l’URL du bouton intégré est définie automatiquement par aidaemon.</p>

<h3>Via le bouton de menu</h3>
<p>Si vous voulez que le terminal soit accessible comme bouton de menu permanent dans votre bot :</p>
<ol>
  <li>Ouvrez <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a> sur Telegram</li>
  <li>Envoyez <code>/mybots</code> et sélectionnez votre bot</li>
  <li>Allez dans <strong>Bot Settings</strong> &rarr; <strong>Menu Button</strong></li>
  <li>Définissez l’URL sur votre broker (par ex. <code>https://terminal-broker.your-subdomain.workers.dev</code>)</li>
</ol>

${callout('warn', 'HTTPS requis', 'Telegram exige que l’URL de la Mini App utilise HTTPS. Les sous-domaines <code>workers.dev</code> comme les domaines personnalisés derrière le proxy Cloudflare fournissent HTTPS automatiquement.')}

<h2>Vérification</h2>
<p>Confirmez que tout fonctionne :</p>

<h3>1. Vérification de santé</h3>
${codeBlock(`curl https://terminal.example.com/health`, 'bash')}
<p>Réponse attendue :</p>
${codeBlock(`{
  "ok": true,
  "service": "terminal.example.com",
  "mode": "broker-e2ee-bridge",
  "timestamp": "2026-03-01T12:00:00.000Z"
}`, 'json', 'health response')}

<h3>2. Tester la Mini App</h3>
<p>Envoyez <code>/terminal</code> à votre bot dans Telegram. La Mini App devrait s’ouvrir et afficher l’interface du terminal.</p>

<h3>3. Consulter les journaux d’aidaemon</h3>
<p>Cherchez la connexion du pont de terminal dans vos journaux aidaemon (<code>~/Library/Logs/aidaemon/stdout.log</code> sur macOS, <code>~/.local/state/aidaemon/stdout.log</code> ailleurs) :</p>
${codeBlock(`INFO Connecting terminal bridge to broker
INFO Terminal bridge connected`, 'text', 'aidaemon logs')}

${callout('success', 'Tout est prêt', 'Si la vérification de santé renvoie <code>"ok": true</code>, que la Mini App s’ouvre dans Telegram et que les journaux d’aidaemon montrent la connexion au broker &mdash; votre terminal auto-hébergé est pleinement opérationnel.')}

<h2>Configuration des quotas</h2>
<p>Le broker applique des quotas mensuels par utilisateur pour prévenir les abus. Il suit les démarrages de session, les minutes actives, les octets transférés et les trames WebSocket. Les limites par défaut du forfait « free » sont généreuses et largement suffisantes pour un usage personnel.</p>

<p>Pour personnaliser les limites des forfaits, définissez la variable d’environnement <code>PLAN_LIMITS_JSON</code> dans votre <code>wrangler.toml</code> :</p>
${codeBlock(`[vars]
PLAN_LIMITS_JSON = '{"free":{"monthly_session_starts":500,"monthly_ws_frames":500000}}'`, 'toml', 'wrangler.toml')}

<p>Autres réglages de forfait : <code>DEFAULT_TENANT_PLAN</code> (le forfait que reçoivent les nouveaux utilisateurs, <code>free</code> par défaut) et <code>TENANT_PLAN_OVERRIDES_JSON</code> (identifiant d’utilisateur vers forfait). <code>ADMIN_API_KEYS</code> accepte plusieurs clés d’administration, séparées par des virgules ou des retours à la ligne.</p>

<p>Pour affecter un utilisateur précis au forfait « pro » (ou à tout forfait personnalisé), utilisez l’API d’administration :</p>
${codeBlock(`curl -X POST https://terminal.example.com/v1/admin/plan \\
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"user_id": "TELEGRAM_USER_ID", "plan": "pro"}'`, 'bash')}

<p>Clés de limites de forfait disponibles :</p>
${configTable([
  ['monthly_session_starts', 'integer', '350', 'Sessions de terminal qu’un utilisateur peut démarrer par mois'],
  ['monthly_session_minutes', 'integer', '2400', 'Minutes de terminal actives par mois'],
  ['monthly_client_bytes', 'integer', '536870912', 'Octets provenant de la Mini App par mois (512 Mio)'],
  ['monthly_daemon_bytes', 'integer', '1073741824', 'Octets provenant du daemon par mois (1 Gio)'],
  ['monthly_ws_frames', 'integer', '300000', 'Trames WebSocket par mois'],
  ['max_active_scoped_sessions', 'integer', '4', 'Sessions qu’un utilisateur peut avoir ouvertes en même temps'],
])}

<h2>Dépannage</h2>
<table class="config-table">
<thead><tr><th>Symptôme</th><th>Cause</th><th>Solution</th></tr></thead>
<tbody>
<tr><td>« Terminal bridge disabled » dans les journaux d’aidaemon</td><td><code>daemon_ws_url</code> est mal configuré</td><td>Doit utiliser <code>wss://</code> (pas <code>ws://</code>). Cloudflare Workers exige TLS.</td></tr>
<tr><td>La Mini App affiche « invalid session »</td><td>Token qui ne correspond pas</td><td><code>TELEGRAM_BOT_TOKEN</code> dans le broker doit correspondre exactement au token du bot dans votre <code>config.toml</code> aidaemon</td></tr>
<tr><td>« Token signature mismatch »</td><td>Clé de signature absente ou incorrecte</td><td>Vérifiez que <code>SESSION_SIGNING_KEY</code> est définie via <code>npx wrangler secret put</code></td></tr>
<tr><td>La connexion WebSocket tombe</td><td>Erreur ou délai dépassé du Worker</td><td>Consultez le tableau de bord Cloudflare &rarr; Workers &amp; Pages &rarr; votre worker &rarr; Logs pour les erreurs</td></tr>
<tr><td>« daemon_auth_rate_limited »</td><td>Trop de tentatives de connexion échouées</td><td>Attendez 60 secondes, puis corrigez le problème d’authentification sous-jacent et reconnectez-vous</td></tr>
</tbody>
</table>

<h2>Notes de sécurité</h2>
<ul>
  <li>Le broker est un <strong>relais transparent</strong> &mdash; le contenu du terminal est chiffré de bout en bout entre la Mini App et votre daemon</li>
  <li>Le broker voit : les identifiants d’utilisateur, les métadonnées de session et la taille des trames chiffrées &mdash; mais <strong>jamais</strong> le contenu réel du terminal</li>
  <li>La <code>SESSION_SIGNING_KEY</code> est le secret le plus critique &mdash; renouvelez-la immédiatement si elle est compromise</li>
  <li>Toutes les connexions utilisent TLS (WSS) &mdash; Cloudflare Workers impose HTTPS par défaut</li>
</ul>

${callout('info', 'Modèle de menaces complet', 'Pour une analyse de sécurité détaillée, consultez le fichier <a href="https://github.com/davo20019/terminal.aidaemon.ai/blob/main/SECURITY.md" target="_blank" rel="noopener">SECURITY.md</a> dans le dépôt du broker.')}
`
  },
];
export default pages;
