import { codeBlock, callout, configTable } from '../helpers.js';

const pages = [
  {
    slug: '/',
    section: null,
    title: 'Documentation aidaemon — Agent IA Personnel en Daemon',
    description: 'Documentation pour aidaemon, un agent IA personnel open-source fonctionnant en daemon. Discutez via Telegram, Slack ou Discord. Extensible avec MCP, compatible avec tout LLM.',
    content: () => `
<h1><span class="ai">AI</span>daemon</h1>
<p class="lead">Un agent IA personnel qui fonctionne en daemon. Toujours actif, toujours en apprentissage. Discutez depuis Telegram, étendez avec MCP, propulsé par n'importe quel LLM.</p>

<p>aidaemon est un agent IA auto-hébergé écrit en Rust qui fonctionne comme un service en arrière-plan sur votre machine. Il se connecte à n'importe quel fournisseur LLM compatible OpenAI, communique via Telegram, Slack ou Discord, et peut exécuter des outils, gérer sa propre configuration, mémoriser des faits, naviguer sur le web et lancer des sous-agents — le tout de manière autonome.</p>

<h2>Fonctionnalités Clés</h2>
<ul>
  <li><strong>Architecture daemon</strong> — fonctionne comme service systemd/launchd, toujours disponible</li>
  <li><strong>Multi-canal</strong> — discutez via Telegram, Slack ou Discord, contrôle d'accès multi-utilisateur</li>
  <li><strong>Utilisation agentique des outils</strong> — raisonnement autonome multi-étapes avec jusqu'à 10 itérations</li>
  <li><strong>Intégration MCP</strong> — extensible avec n'importe quel serveur Model Context Protocol</li>
  <li><strong>Mémoire persistante</strong> — historique sauvegardé en SQLite avec recherche sémantique via embeddings</li>
  <li><strong>Routage multi-modèle</strong> — sélection automatique des niveaux Fast/Primary/Smart</li>
  <li><strong>Déclencheurs email</strong> — surveillance IMAP IDLE pour les notifications de boîte de réception</li>
  <li><strong>Approbation de commandes</strong> — approbation interactive via Telegram pour les commandes shell</li>
  <li><strong>Système de compétences</strong> — amélioration dynamique des prompts via des fichiers markdown</li>
  <li><strong>Auto-maintenance</strong> — lit, met à jour, valide et restaure sa propre configuration</li>
  <li><strong>Automatisation du navigateur</strong> — Chrome avec sessions de connexion persistantes, captures d'écran et remplissage de formulaires</li>
  <li><strong>Recherche web</strong> — recherche web intégrée (DuckDuckGo/Brave) et récupération d'URL</li>
  <li><strong>Lancement de sous-agents</strong> — délégation récursive d'agents pour les tâches complexes</li>
  <li><strong>Délégation d'agents CLI</strong> — déléguez à Claude, Gemini, Codex, Aider, etc.</li>
  <li><strong>Tâches planifiées</strong> — tâches récurrentes de type cron avec analyse en langage naturel</li>
  <li><strong>Transfert de fichiers</strong> — envoi et réception de fichiers via Telegram avec sécurité des chemins</li>
  <li><strong>Gestion des secrets</strong> — support du trousseau de clés du système d'exploitation et des variables d'environnement</li>
  <li><strong>Suivi des coûts en tokens</strong> — statistiques d'utilisation par modèle, budgets quotidiens, commande /cost</li>
  <li><strong>Event sourcing</strong> — journal d'événements immuable avec consolidation quotidienne en faits et procédures</li>
  <li><strong>Objectifs + tâches</strong> — découpe le travail en tâches et garde l'avancement</li>
  <li><strong>Surveillance de santé</strong> — sondes HTTP, TCP, commande et fichier avec alertes</li>
  <li><strong>Compétences dynamiques</strong> — installation depuis des registres ou promotion automatique des procédures répétées</li>
  <li><strong>Mise à jour automatique</strong> — auto-mise à jour depuis les releases GitHub avec modes configurables</li>
  <li><strong>Intégration Discord</strong> — commandes slash, boutons d'approbation interactifs, support multi-bot</li>
  <li><strong>Évaluation du risque des commandes</strong> — notation du risque à 4 niveaux (Safe/Medium/High/Critical) pour les commandes terminal</li>
  <li><strong>Intelligence relationnelle</strong> — un carnet de contacts personnel qui mémorise les anniversaires, préférences et relations pour vous</li>
</ul>

<h2>Architecture en un Coup d'Œil</h2>
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

<h2>Liens Rapides</h2>
<ul>
  <li><a href="/getting-started">Premiers Pas</a> — compiler et exécuter aidaemon</li>
  <li><a href="/configuration">Référence de Configuration</a> — documentation complète de config.toml</li>
  <li><a href="/tools">Outils</a> — système d'outils intégrés et extensibles</li>
  <li><a href="/telegram">Telegram</a> — configuration du bot, commandes, flux d'approbation</li>
  <li><a href="/slack">Slack</a> — intégration de l'espace de travail via Socket Mode</li>
  <li><a href="/discord">Discord</a> — configuration du bot, commandes slash, boutons d'approbation</li>
  <li><a href="/event-sourcing">Event Sourcing</a> — événements immuables et consolidation</li>
  <li><a href="/plans">Plans (Legacy)</a> — notes de l'ancien système de plans pour les anciennes installations</li>
  <li><a href="/health-monitoring">Surveillance de Santé</a> — sondes de service et alertes</li>
</ul>
`
  },
  {
    slug: '/getting-started',
    section: 'Getting Started',
    title: 'Vue d\'ensemble',
    description: 'Compilez aidaemon depuis les sources, lancez l\'assistant de configuration et ayez votre agent IA personnel opérationnel en quelques minutes.',
    content: () => `
<h1>Premiers Pas</h1>
<p class="lead">Compilez aidaemon depuis les sources, lancez l'assistant de configuration et ayez votre agent IA personnel opérationnel en quelques minutes.</p>

<h2>Prérequis</h2>
<ul>
  <li><strong>Chaîne d'outils Rust</strong> — installez via <a href="https://rustup.rs" target="_blank" rel="noopener">rustup.rs</a></li>
  <li><strong>SQLite</strong> — généralement pré-installé sur macOS/Linux</li>
  <li><strong>Token de bot Telegram</strong> — créez via <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a></li>
  <li><strong>Clé API LLM</strong> — depuis Google AI Studio, OpenAI, Anthropic, OpenRouter, Moonshot, MiniMax, ou utilisez Ollama en local</li>
</ul>

<h2>Étapes</h2>
<ol>
  <li><a href="/getting-started/build">Compiler depuis les sources</a> — cloner et compiler</li>
  <li><a href="/getting-started/wizard">Assistant de premier lancement</a> — configuration interactive</li>
  <li><a href="/configuration">Configurer</a> — personnaliser config.toml selon vos besoins</li>
  <li><a href="/service-install">Installer comme service</a> — exécuter au démarrage avec systemd/launchd</li>
</ol>
`
  },
  {
    slug: '/getting-started/build',
    section: 'Getting Started',
    title: 'Compiler depuis les Sources',
    description: 'Installez aidaemon via Homebrew, cargo install, cargo binstall, ou compilez depuis les sources. Supporte Linux, macOS et Windows.',
    content: () => `
<h1>Installation</h1>
<p class="lead">Installez via un script en une ligne, Homebrew, Cargo, ou compilez depuis les sources.</p>

<h2>Installation en une Ligne (Recommandé)</h2>
<p>Fonctionne sur tout VPS Linux ou machine macOS. Télécharge le dernier binaire et vérifie sa somme de contrôle SHA256 :</p>
${codeBlock(`curl -sSfL https://get.aidaemon.ai | bash`, 'bash')}
${callout('success', 'Tout Inclus', 'Les binaires pré-compilés incluent toutes les intégrations de canaux (Telegram, Slack, Discord) et l\'outil navigateur. Activez simplement ce dont vous avez besoin dans <code>config.toml</code> &mdash; aucune compilation requise.')}

<h2>Installation via Homebrew</h2>
<p>Le moyen le plus simple d'installer sur macOS ou Linux :</p>
${codeBlock(`brew install davo20019/tap/aidaemon`, 'bash')}

<h2>Installation via Cargo</h2>
<p>Pour les développeurs Rust. Note : <code>cargo install</code> compile depuis les sources avec les fonctionnalités par défaut uniquement (Telegram). Pour inclure tous les canaux, ajoutez les feature flags :</p>
${codeBlock(`cargo install aidaemon --features "browser,slack,discord"
# Or for pre-built binaries:
cargo binstall aidaemon`, 'bash')}

<h2>Cloner &amp; Compiler depuis les Sources</h2>
<p>Pour les contributeurs et développeurs :</p>
${codeBlock(`git clone https://github.com/davo20019/aidaemon.git
cd aidaemon
cargo build --release --features "browser,slack,discord"`, 'bash')}

<p>Le binaire compilé sera à <code>./target/release/aidaemon</code>.</p>

<h2>Feature Flags (Compilation depuis les Sources Uniquement)</h2>
<p>Si vous avez installé via le script en une ligne ou Homebrew, toutes les fonctionnalités sont déjà incluses. Ces flags ne sont pertinents que lors de la compilation depuis les sources :</p>

<h3>Browser</h3>
<p>Activer l'automatisation Chrome avec des sessions de connexion persistantes :</p>
${codeBlock(`cargo build --release --features browser`, 'bash')}
<p>Après la compilation, exécutez <code>aidaemon browser login</code> pour ouvrir Chrome et vous connecter à vos services. Consultez la documentation de l'<a href="/tools/browser">Outil Navigateur</a> pour plus de détails.</p>
${callout('info', 'Note', 'Nécessite un navigateur basé sur Chromium installé sur le système (Chrome, Chromium, Brave ou Edge).')}

<h3>Slack</h3>
<p>Activer l'intégration du canal Slack (Socket Mode) :</p>
${codeBlock(`cargo build --release --features slack`, 'bash')}

<h3>Discord</h3>
<p>Activer l'intégration du bot Discord :</p>
${codeBlock(`cargo build --release --features discord`, 'bash')}

<h3>Fonctionnalités Multiples</h3>
<p>Combinez les fonctionnalités selon vos besoins :</p>
${codeBlock(`cargo build --release --features "browser,slack,discord"`, 'bash')}

<h2>Vérification</h2>
${codeBlock(`./target/release/aidaemon --help`, 'bash')}

<p>Si aucun <code>config.toml</code> n'existe, l'exécution du binaire lancera automatiquement l'<a href="/getting-started/wizard">assistant de configuration</a>.</p>
`
  },
  {
    slug: '/getting-started/wizard',
    section: 'Getting Started',
    title: 'Assistant de Premier Lancement',
    description: 'Au premier lancement, aidaemon exécute un assistant de configuration interactif pour configurer votre fournisseur LLM et les tokens de canaux.',
    content: () => `
<h1>Assistant de Premier Lancement</h1>
<p class="lead">Au premier lancement (aucun config.toml trouvé), aidaemon exécute un assistant de configuration interactif.</p>

<h2>Sélection du Fournisseur</h2>
<p>L'assistant propose ces préréglages :</p>

<table class="config-table">
<thead><tr><th>Fournisseur</th><th>URL de Base</th><th>Modèles par Défaut</th></tr></thead>
<tbody>
<tr><td><strong>Google AI Studio (Natif)</strong></td><td>API Native</td><td>gemini-3-flash-preview / gemini-2.5-flash-lite / gemini-3-pro-preview</td></tr>
<tr><td>OpenAI</td><td><code>https://api.openai.com/v1</code></td><td>gpt-4o / gpt-4o-mini / gpt-4o</td></tr>
<tr><td>Anthropic (Natif)</td><td>API Native</td><td>claude-sonnet-4 / claude-haiku-4 / claude-opus-4</td></tr>
<tr><td>Anthropic (OpenRouter)</td><td><code>https://openrouter.ai/api/v1</code></td><td>anthropic/claude-* variantes</td></tr>
<tr><td>OpenRouter</td><td><code>https://openrouter.ai/api/v1</code></td><td>Fournisseurs mixtes</td></tr>
<tr><td>Moonshot AI (Kimi)</td><td><code>https://api.moonshot.ai/v1</code></td><td>kimi-k2.5 / kimi-k2.5 / kimi-k2-thinking</td></tr>
<tr><td>MiniMax</td><td><code>https://api.minimax.io/v1</code></td><td>MiniMax-M2.5 / MiniMax-M2.5-highspeed / MiniMax-M2.5</td></tr>
<tr><td>Cloudflare AI Gateway</td><td><code>https://gateway.ai.cloudflare.com/v1/&lt;ACCOUNT_ID&gt;/&lt;GATEWAY_ID&gt;/compat</code></td><td>Dépend du fournisseur (par exemple : gpt-4o-mini / gpt-4o-mini / gpt-4o)</td></tr>
<tr><td>Ollama (local)</td><td><code>http://localhost:11434/v1</code></td><td>Découverte automatique depuis l'instance locale</td></tr>
<tr><td>Personnalisé</td><td>Spécifié par l'utilisateur</td><td>Spécifié par l'utilisateur</td></tr>
</tbody>
</table>

<h2>Étapes de l'Assistant</h2>
<ol>
  <li><strong>Sélectionner le fournisseur</strong> — choisir parmi les préréglages ou entrer un fournisseur personnalisé</li>
  <li><strong>Entrer la clé API</strong> — ignoré pour Ollama (pas d'authentification nécessaire)</li>
  <li><strong>Token gateway optionnel</strong> — le preset Cloudflare peut ajouter <code>cf-aig-authorization</code> pour le mode Authenticated Gateway</li>
  <li><strong>Sélection du modèle</strong> — pré-rempli depuis le préréglage, ou découverte automatique pour Ollama</li>
  <li><strong>Configuration Telegram</strong> — entrer le token du bot et votre identifiant utilisateur numérique</li>
  <li><strong>Configuration du navigateur</strong> (si compilé avec la fonctionnalité <code>browser</code>) — détection automatique des profils Chrome</li>
  <li><strong>Génération de config.toml</strong> — écrit dans le répertoire courant</li>
</ol>

${callout('info', 'Découverte Automatique Ollama', 'Lors de la sélection d\'Ollama, l\'assistant interroge <code>http://localhost:11434/api/tags</code> pour lister tous les modèles disponibles localement et vous permet de choisir.')}

<h2>Détection des Profils Chrome</h2>
<p>L'assistant détecte automatiquement les profils Chrome/Chromium pour la réutilisation de session du navigateur :</p>
<ul>
  <li><strong>macOS :</strong> <code>~/Library/Application Support/Google/Chrome</code></li>
  <li><strong>Linux :</strong> <code>~/.config/google-chrome</code> ou <code>~/.config/chromium</code></li>
</ul>
<p>Réutiliser un profil hérite des cookies et sessions, permettant à l'agent d'accéder aux sites authentifiés.</p>
`
  },
  {
    slug: '/configuration',
    section: 'Configuration',
    title: 'Référence Complète config.toml',
    description: 'Référence complète de config.toml pour aidaemon. Toutes les sections de configuration, clés, types et valeurs par défaut.',
    content: () => `
<h1>Configuration</h1>
<p class="lead">Référence complète de <code>config.toml</code>. Toutes les sections et leurs valeurs par défaut.</p>

<h2>[provider]</h2>
${configTable([
  ['kind', 'string', '"google_genai"', 'Type de fournisseur : <code>google_genai</code>, <code>openai_compatible</code>, ou <code>anthropic</code>'],
  ['api_key', 'string', '—', 'Clé API pour le fournisseur (obligatoire)'],
  ['gateway_token', 'string', 'null', 'Token optionnel Cloudflare AI Gateway envoyé comme <code>cf-aig-authorization</code>'],
  ['base_url', 'string', '—', 'URL de base de l\'API (obligatoire pour <code>openai_compatible</code>, non utilisé pour les fournisseurs natifs)'],
])}

<h2>[provider.models]</h2>
${configTable([
  ['primary', 'string', '(provider default)', 'Modèle par défaut pour les requêtes générales'],
  ['fast', 'string', '(same as primary)', 'Modèle pour les requêtes simples/rapides'],
  ['smart', 'string', '(same as primary)', 'Modèle pour les tâches de raisonnement complexes'],
])}

${callout('info', 'Valeurs par Défaut des Modèles', 'Valeurs par défaut selon le fournisseur : <strong>google_genai</strong> → primary=gemini-3-flash-preview, fast=gemini-2.5-flash-lite, smart=gemini-3-pro-preview. <strong>openai_compatible</strong> → tous les niveaux par défaut à openai/gpt-4o. <strong>anthropic</strong> → tous les niveaux par défaut à claude-sonnet-4-20250514. Lorsque les trois niveaux sont le même modèle, le routage automatique est désactivé. Voir <a href="/router">Routage des Modèles</a>.')}

<h2>[telegram]</h2>
${configTable([
  ['bot_token', 'string', '—', 'Token du bot Telegram depuis @BotFather (obligatoire)'],
  ['allowed_user_ids', 'array', '[]', 'Identifiants utilisateur Telegram numériques autorisés à discuter. Vide = aucune restriction.'],
])}

<h2>[slack]</h2>
<p>Nécessite le feature flag <code>slack</code> à la compilation. Voir <a href="/slack">Slack</a> pour le guide complet de configuration.</p>
${configTable([
  ['enabled', 'bool', 'false', 'Activer le canal Slack'],
  ['app_token', 'string', '—', 'Token de niveau application Slack pour Socket Mode (<code>xapp-...</code>)'],
  ['bot_token', 'string', '—', 'Token de bot Slack pour l\'API Web (<code>xoxb-...</code>)'],
  ['allowed_user_ids', 'array', '[]', 'Identifiants utilisateur Slack autorisés à interagir. Vide = aucune restriction.'],
  ['use_threads', 'bool', 'true', 'Répondre dans les fils de discussion par défaut'],
])}

<h2>[discord]</h2>
<p>Nécessite le feature flag <code>discord</code> à la compilation. Voir <a href="/discord">Discord</a> pour le guide complet de configuration.</p>
${configTable([
  ['bot_token', 'string', '&mdash;', 'Token du bot Discord depuis le portail développeur'],
  ['allowed_user_ids', 'array', '[]', 'Identifiants utilisateur Discord autorisés à interagir. Vide = aucune restriction.'],
  ['guild_id', 'integer', 'null', 'ID optionnel du guild/serveur pour restreindre le bot à un seul serveur'],
])}

<h2>[state]</h2>
${configTable([
  ['db_path', 'string', '"aidaemon.db"', 'Chemin vers le fichier de base de données SQLite'],
  ['working_memory_cap', 'integer', '50', 'Nombre maximum de messages par session conservés en mémoire'],
  ['consolidation_interval_hours', 'integer', '6', 'Heures entre les exécutions de consolidation de la mémoire'],
  ['max_facts', 'integer', '100', 'Nombre maximum de faits injectés dans le prompt système'],
  ['daily_token_budget', 'integer', 'null', 'Maximum de tokens totaux (entrée+sortie) par jour. Null = illimité. Réinitialisation à minuit UTC.'],
  ['encryption_key', 'string', 'null', 'Clé de chiffrement SQLCipher (nécessite la fonctionnalité <code>encryption</code>). AES-256 au repos.'],
])}

<h2>[terminal]</h2>
${configTable([
  ['allowed_prefixes', 'array', '(see below)', 'Préfixes de commande auto-approuvés sans confirmation de l\'utilisateur'],
  ['initial_timeout_secs', 'integer', '30', 'Délai d\'attente en secondes pour l\'exécution initiale de la commande'],
  ['max_output_chars', 'integer', '4000', 'Tronquer la sortie de commande au-delà de cette longueur'],
  ['permission_mode', 'string', '"default"', 'Mode de permission de risque : <code>default</code>, <code>cautious</code>, ou <code>yolo</code>. Voir <a href="/tools/command-risk">Risque des Commandes</a>.'],
])}

<p>Préfixes autorisés par défaut :</p>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

${callout('warn', 'Opérateurs Shell', 'Les commandes contenant <code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code> <code>$()</code> ou des backticks nécessitent <strong>toujours</strong> une approbation, même si le préfixe est dans la liste autorisée.')}

<h2>[daemon]</h2>
${configTable([
  ['health_port', 'integer', '8080', 'Port pour le point de terminaison HTTP de vérification de santé'],
  ['health_bind', 'string', '"127.0.0.1"', 'Adresse de liaison. Utilisez "0.0.0.0" pour un accès externe.'],
])}

<h2>[triggers.email]</h2>
${configTable([
  ['host', 'string', '—', 'Nom d\'hôte du serveur IMAP (ex. : imap.gmail.com)'],
  ['port', 'integer', '—', 'Port IMAP (généralement 993 pour TLS)'],
  ['username', 'string', '—', 'Nom d\'utilisateur du compte email'],
  ['password', 'string', '—', 'Mot de passe du compte email ou mot de passe spécifique à l\'application'],
  ['folder', 'string', '"INBOX"', 'Dossier IMAP à surveiller'],
])}

<h2>[mcp.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Chemin ou nom de l\'exécutable pour le serveur MCP'],
  ['args', 'array', '[]', 'Arguments en ligne de commande'],
])}

<h2>[browser]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Activer l\'outil d\'automatisation du navigateur'],
  ['headless', 'bool', 'true', 'Exécuter Chrome sans fenêtre visible'],
  ['screenshot_width', 'integer', '1280', 'Largeur de la fenêtre du navigateur en pixels'],
  ['screenshot_height', 'integer', '720', 'Hauteur de la fenêtre du navigateur en pixels'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Répertoire du profil Chrome pour les sessions persistantes'],
  ['profile', 'string', 'Default', 'Nom du profil Chrome dans user_data_dir'],
  ['remote_debugging_port', 'integer', 'null', 'Se connecter à un Chrome existant sur ce port (avancé)'],
])}

<h2>[skills]</h2>
${configTable([
  ['dir', 'string', '"skills"', 'Répertoire contenant les fichiers markdown de compétences'],
  ['enabled', 'bool', 'true', 'Activer le système de compétences'],
  ['registries', 'array', '[]', 'URLs des manifestes JSON de registres de compétences pour parcourir/installer des compétences'],
])}

<h2>[subagents]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Autoriser l\'agent à lancer des sous-agents'],
  ['max_depth', 'integer', '3', 'Niveau maximum d\'imbrication pour la récursion des sous-agents'],
  ['max_iterations', 'integer', '10', 'Nombre maximum d\'étapes de la boucle agentique par invocation de sous-agent'],
  ['max_response_chars', 'integer', '8000', 'Tronquer les réponses des sous-agents au-delà de cette longueur'],
  ['timeout_secs', 'integer', '300', 'Délai d\'attente d\'exécution des sous-agents en secondes'],
])}

<h2>[cli_agents]</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Activer l\'outil de délégation d\'agents CLI'],
  ['timeout_secs', 'integer', '600', 'Délai d\'attente global pour l\'exécution des agents CLI'],
  ['max_output_chars', 'integer', '16000', 'Longueur maximale globale de la sortie des agents CLI'],
])}

<h2>[cli_agents.tools.&lt;name&gt;]</h2>
${configTable([
  ['command', 'string', '—', 'Commande à exécuter'],
  ['args', 'array', '[]', 'Arguments par défaut passés à la commande'],
  ['description', 'string', '—', 'Description de l\'outil présentée au LLM'],
  ['timeout_secs', 'integer', 'null', 'Remplacer le délai d\'attente global pour cet outil'],
  ['max_output_chars', 'integer', 'null', 'Remplacer la sortie maximale globale pour cet outil'],
])}

<h2>[search]</h2>
${configTable([
  ['backend', 'string', '"duckduckgo"', 'Backend de recherche : <code>duckduckgo</code> (aucune clé requise) ou <code>brave</code>'],
  ['api_key', 'string', '""', 'Clé API pour la recherche Brave (supporte <code>"keychain"</code>)'],
])}

<h2>[scheduler]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Activer le système de tâches planifiées'],
  ['tick_interval_secs', 'integer', '30', 'Fréquence de vérification des tâches à exécuter par le planificateur'],
])}

<h2>[[scheduler.tasks]]</h2>
<p>Tâches planifiées prédéfinies chargées depuis la configuration au démarrage :</p>
${configTable([
  ['name', 'string', '—', 'Libellé lisible de la tâche'],
  ['schedule', 'string', '—', 'Expression en langage naturel ou cron (voir <a href="/scheduler">Planificateur</a>)'],
  ['prompt', 'string', '—', 'Ce que l\'agent doit faire lorsque la tâche se déclenche'],
  ['oneshot', 'bool', 'false', 'S\'exécuter une fois puis se supprimer automatiquement'],
  ['trusted', 'bool', 'false', 'Exécuter en autonomie complète (pas d\'approbation terminal nécessaire)'],
])}

<h2>[files]</h2>
${configTable([
  ['enabled', 'bool', 'true', 'Activer les outils de transfert de fichiers (envoi/réception)'],
  ['inbox_dir', 'string', '"~/.aidaemon/files/inbox"', 'Répertoire pour les fichiers reçus depuis Telegram'],
  ['outbox_dirs', 'array', '["~"]', 'Répertoires depuis lesquels l\'agent est autorisé à envoyer des fichiers'],
  ['max_file_size_mb', 'integer', '10', 'Taille maximale des fichiers pour les transferts en Mo'],
  ['retention_hours', 'integer', '24', 'Heures de conservation des fichiers reçus avant nettoyage'],
])}

<h2>Gestion des Secrets</h2>
<p>Les valeurs de configuration sensibles supportent deux méthodes de résolution en plus du texte brut :</p>

<h3>Trousseau du Système</h3>
<p>Définissez n'importe quel champ secret à <code>"keychain"</code> pour le résoudre depuis le trousseau du système (Trousseau macOS, secret-service Linux) :</p>
${codeBlock(`[provider]
api_key = "keychain"    # Resolved from keychain entry "api_key"

[telegram]
bot_token = "keychain"  # Resolved from keychain entry "bot_token"`, 'toml')}

<p>Stockez les valeurs avec la commande CLI <code>keychain</code> avant le premier lancement :</p>
${codeBlock(`# Store a secret (prompts interactively)
aidaemon keychain set api_key
aidaemon keychain set bot_token

# Verify a stored secret (shows masked value)
aidaemon keychain get api_key

# Remove a secret
aidaemon keychain delete api_key`, 'bash')}

${callout('tip', 'Sécurité', 'La commande <code>set</code> demande la valeur de manière interactive avec confirmation, gardant les secrets hors de l\'historique de votre shell.')}

<h3>Variables d'Environnement</h3>
<p>Utilisez la syntaxe <code>\${VAR_NAME}</code> n'importe où dans les valeurs de configuration :</p>
${codeBlock(`[provider]
api_key = "\${GOOGLE_API_KEY}"

[telegram]
bot_token = "\${TELEGRAM_BOT_TOKEN}"`, 'toml')}

${callout('info', 'Champs Supportés pour le Trousseau', 'Champs supportant <code>"keychain"</code> : <code>provider.api_key</code>, <code>provider.gateway_token</code>, <code>telegram.bot_token</code>, <code>slack.app_token</code>, <code>slack.bot_token</code>, <code>discord.bot_token</code>, <code>triggers.email.password</code>, <code>state.encryption_key</code>, <code>search.api_key</code>, et les champs de profils <code>http_auth.*</code>.')}

<h2>[health]</h2>
<p>Système de surveillance de santé. Voir <a href="/health-monitoring">Surveillance de Santé</a>.</p>
${configTable([
  ['enabled', 'bool', 'true', 'Activer le système de surveillance de santé'],
  ['tick_interval_secs', 'integer', '30', 'Fréquence de vérification des sondes à exécuter'],
  ['result_retention_days', 'integer', '7', 'Jours de conservation des résultats de vérification de santé'],
])}

<h2>[[health.probes]]</h2>
${configTable([
  ['name', 'string', '&mdash;', 'Nom de la sonde'],
  ['probe_type', 'string', '&mdash;', 'Type : http, command, file, ou port'],
  ['target', 'string', '&mdash;', 'URL cible, commande, chemin de fichier, ou host:port'],
  ['schedule', 'string', '&mdash;', 'Expression cron ou intervalle'],
  ['consecutive_failures_alert', 'integer', '3', 'Alerter après N échecs consécutifs'],
  ['alert_session_ids', 'array', '[]', 'Identifiants de session à notifier en cas d\'alerte'],
])}

<h2>[updates]</h2>
<p>Système de mise à jour automatique. Voir <a href="/updates">Mise à Jour Automatique</a>.</p>
${configTable([
  ['mode', 'string', '"check_only"', 'Mode de mise à jour : enable, check_only, ou disable'],
  ['check_interval_hours', 'integer', '24', 'Heures entre les vérifications de mise à jour'],
  ['check_at_utc_hour', 'integer', 'null', 'Heure UTC spécifique (0-23) pour la vérification quotidienne'],
  ['confirmation_timeout_mins', 'integer', '60', 'Minutes d\'attente pour l\'approbation de l\'utilisateur'],
])}

<h2>[people]</h2>
<p>Intelligence Relationnelle — un carnet de contacts personnel géré par votre assistant. Voir <a href="/tools/people">Intelligence Relationnelle</a>.</p>
${configTable([
  ['enabled', 'bool', 'false', 'État initial de l\'intelligence relationnelle (peut être activé en cours d\'exécution via le chat)'],
  ['auto_extract', 'bool', 'true', 'Apprendre automatiquement des faits sur les personnes à partir des conversations'],
  ['auto_extract_categories', 'string[]', '["birthday", "preference", "interest", "work", "family", "important_date"]', 'Catégories de faits pouvant être extraites automatiquement'],
  ['restricted_categories', 'string[]', '["health", "finance", "political", "religious"]', 'Catégories qui ne sont jamais extraites automatiquement'],
  ['fact_retention_days', 'integer', '180', 'Jours avant la suppression des faits auto-extraits non confirmés'],
  ['reconnect_reminder_days', 'integer', '30', 'Jours d\'inactivité avant de suggérer une reprise de contact'],
])}

<h2>Exemple de Configuration</h2>
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
    title: 'Configuration des Fournisseurs',
    description: 'Configurez les fournisseurs LLM pour aidaemon : backends compatibles OpenAI, Anthropic natif, ou Google Generative AI.',
    content: () => `
<h1>Configuration des Fournisseurs</h1>
<p class="lead">aidaemon supporte trois types de fournisseurs, tous configurés dans la section <code>[provider]</code>.</p>

<h2>Types de Fournisseurs</h2>

<h3>google_genai (recommandé)</h3>
<p>API native Google Generative AI. Le fournisseur recommandé — les modèles Gemini offrent d'excellentes capacités d'utilisation d'outils, des temps de réponse rapides et un accès API gratuit généreux via <a href="https://aistudio.google.com/" target="_blank" rel="noopener">Google AI Studio</a>.</p>
${codeBlock(`[provider]
kind = "google_genai"
api_key = "AIza..."

[provider.models]
primary = "gemini-3-flash-preview"
fast = "gemini-2.5-flash-lite"
smart = "gemini-3-pro-preview"`, 'toml')}

${callout('info', 'Configuration Recommandée', 'Google AI Studio fournit une clé API gratuite avec des limites de débit généreuses. Les modèles Gemini disposent d\'un support natif d\'appel d\'outils, du web grounding, et fonctionnent bien avec la boucle agentique d\'aidaemon.')}

<h3>Gemini Web Grounding</h3>
<p>Lors de l'utilisation de <code>google_genai</code>, aidaemon active automatiquement le grounding via Google Search. Cela permet aux modèles Gemini de rechercher sur le web dans le cadre de leurs réponses. Les modèles qui ne supportent pas le grounding avec l'appel de fonctions sont détectés automatiquement et se replient de manière élégante.</p>

<h3>openai_compatible</h3>
<p>Fonctionne avec toute API implémentant le format de complétion de chat OpenAI. Cela inclut OpenAI, OpenRouter, Moonshot, MiniMax, Cloudflare AI Gateway, Ollama, et bien d'autres.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "sk-..."
base_url = "https://api.openai.com/v1"

[provider.models]
primary = "gpt-4o"
fast = "gpt-4o-mini"
smart = "o1-preview"`, 'toml')}

<h3>anthropic</h3>
<p>API native Anthropic (format Messages API). Utilisez ceci pour un accès direct à Anthropic sans passer par un proxy compatible OpenAI.</p>
${codeBlock(`[provider]
kind = "anthropic"
api_key = "sk-ant-..."

[provider.models]
primary = "claude-sonnet-4-20250514"
fast = "claude-haiku-4-20250414"
smart = "claude-opus-4-20250414"`, 'toml')}

<h2>OpenRouter</h2>
<p>OpenRouter donne accès à des modèles de plusieurs fournisseurs via une seule clé API et le format compatible OpenAI.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "sk-or-..."
base_url = "https://openrouter.ai/api/v1"

[provider.models]
primary = "anthropic/claude-sonnet-4"
fast = "anthropic/claude-haiku-4"
smart = "anthropic/claude-opus-4"`, 'toml')}

<h2>Moonshot AI (Kimi)</h2>
<p>Moonshot propose des modèles Kimi via une API compatible OpenAI.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "YOUR_MOONSHOT_API_KEY"
base_url = "https://api.moonshot.ai/v1"

[provider.models]
primary = "kimi-k2.5"
fast = "kimi-k2.5"
smart = "kimi-k2-thinking"`, 'toml')}

<h2>MiniMax</h2>
<p>MiniMax propose un endpoint compatible OpenAI sur <code>https://api.minimax.io/v1</code>.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "YOUR_MINIMAX_API_KEY"
base_url = "https://api.minimax.io/v1"

[provider.models]
primary = "MiniMax-M2.5"
fast = "MiniMax-M2.5-highspeed"
smart = "MiniMax-M2.5"`, 'toml')}

<h2>Cloudflare AI Gateway</h2>
<p>Cloudflare AI Gateway se place devant les fournisseurs upstream et expose un endpoint compatible OpenAI. Utilisez-le pour centraliser les logs, le cache, les contrôles ou les limites de débit entre plusieurs fournisseurs.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "sk-..." # Cle du fournisseur upstream
gateway_token = "cf-gw-..." # Optionnel : mode Authenticated Gateway
base_url = "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/compat"

[provider.models]
primary = "gpt-4o-mini"
fast = "gpt-4o-mini"
smart = "gpt-4o"`, 'toml')}

${callout('info', 'Modes d Authentification Cloudflare', 'Vous pouvez fonctionner uniquement avec <code>api_key</code> (mode basique), ou ajouter <code>gateway_token</code> pour envoyer <code>cf-aig-authorization</code> en mode Authenticated Gateway.')}

<h2>Ollama (Local)</h2>
<p>Exécutez des modèles localement avec Ollama. Aucune clé API requise.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "ollama"
base_url = "http://localhost:11434/v1"

[provider.models]
primary = "llama3.1"
fast = "llama3.1"
smart = "llama3.1"`, 'toml')}

${callout('info', 'Découverte Ollama', 'L\'assistant de configuration découvre automatiquement les modèles Ollama disponibles en interrogeant <code>http://localhost:11434/api/tags</code>.')}

<h2>llama.cpp (Local)</h2>
<p>Vous pouvez aussi utiliser aidaemon avec <code>llama.cpp</code> via <code>llama-server</code> en mode compatible OpenAI.</p>
${codeBlock(`[provider]
kind = "openai_compatible"
api_key = "llama" # N importe quelle valeur si votre serveur local n impose pas d auth
base_url = "http://127.0.0.1:8080/v1"

[provider.models]
primary = "votre-modele-id"
fast = "votre-modele-id"
smart = "votre-modele-id"`, 'toml')}

${callout('warn', 'Exigences llama.cpp', '<code>/v1/chat/completions</code> est obligatoire. <code>/v1/models</code> est fortement recommande pour que la commande <code>/models</code> fonctionne. Pour la securite, aidaemon autorise HTTP uniquement vers des adresses localhost.')}
`
  },
  {
    slug: '/telegram',
    section: 'Telegram',
    title: 'Configuration du Bot',
    description: 'Configurez aidaemon comme bot Telegram. Créez un bot via BotFather, configurez les tokens et activez la messagerie.',
    content: () => `
<h1>Configuration du Bot Telegram</h1>
<p class="lead">Telegram est le canal principal d'aidaemon, construit sur le framework teloxide. Voir aussi <a href="/slack">Slack</a> pour l'intégration de l'espace de travail.</p>

<h2>Créer un Bot</h2>
<ol>
  <li>Envoyez un message à <a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a> sur Telegram</li>
  <li>Envoyez <code>/newbot</code> et suivez les instructions</li>
  <li>Copiez le token du bot (format : <code>123456789:ABCdefGHIjklMNOpqrSTUvwxYZ</code>)</li>
</ol>

<h2>Obtenir Votre Identifiant Utilisateur</h2>
<p>Votre identifiant utilisateur Telegram numérique est nécessaire pour la liste <code>allowed_user_ids</code>. Vous pouvez le trouver en envoyant un message à <a href="https://t.me/userinfobot" target="_blank" rel="noopener">@userinfobot</a>.</p>

<h2>Configuration</h2>
${codeBlock(`[telegram]
bot_token = "123456789:ABCdefGHIjklMNOpqrSTUvwxYZ"
allowed_user_ids = [123456789]`, 'toml', 'config.toml')}

${callout('warn', 'Contrôle d\'Accès', 'Si <code>allowed_user_ids</code> est vide, <strong>n\'importe qui</strong> trouvant votre bot peut discuter avec lui. Définissez toujours cette valeur en production.')}

<h2>Fonctionnalités</h2>
<ul>
  <li><strong>Indicateur de saisie</strong> — envoyé toutes les 4 secondes pendant le traitement de l'agent</li>
  <li><strong>Rendu Markdown</strong> — les réponses de l'agent sont converties en HTML Telegram</li>
  <li><strong>Découpage des longs messages</strong> — les réponses de plus de 4096 caractères sont découpées aux limites de paragraphe/ligne</li>
  <li><strong>Partage de captures d'écran</strong> — les captures du navigateur sont envoyées comme photos avec légendes</li>
  <li><strong>Transfert de fichiers</strong> — envoi et réception de documents, photos, audio, vidéo via Telegram</li>
  <li><strong>Statut des tâches en direct</strong> — <code>/tasks</code> affiche les tâches de l'agent en cours avec le temps écoulé</li>
  <li><strong>Boutons d'approbation en ligne</strong> — boutons Autoriser une fois / Toujours autoriser / Refuser pour l'approbation des commandes</li>
  <li><strong>Support multi-bot</strong> — configurez plusieurs bots Telegram via <code>[[telegram.bots]]</code></li>
  <li><strong>Gestion améliorée des fichiers</strong> — détection du type MIME, limites de taille et validation de sécurité des chemins</li>
</ul>

<h2>Comportement de Reconnexion</h2>
<p>Le dispatcher Telegram utilise un backoff exponentiel en cas de crash :</p>
<ul>
  <li>Backoff initial : 5s</li>
  <li>Double à chaque crash : 5s → 10s → 20s → 40s → 60s (max)</li>
  <li>Réinitialisé à 5s si le bot fonctionne de manière stable pendant plus de 60 secondes</li>
</ul>
`
  },
  {
    slug: '/telegram/commands',
    section: 'Telegram',
    title: 'Commandes',
    description: 'Commandes slash Telegram intégrées pour aidaemon : /model, /clear, /cost, /status, /help, et plus.',
    content: () => `
<h1>Commandes Telegram</h1>
<p class="lead">Commandes slash intégrées pour contrôler l'agent depuis Telegram.</p>

<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Afficher le modèle actif actuel</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Passer à un modèle spécifique (désactive le routage automatique)</td></tr>
<tr><td><code>/models</code></td><td>Lister tous les modèles disponibles du fournisseur (modèle actif marqué)</td></tr>
<tr><td><code>/auto</code></td><td>Réactiver le routage automatique des modèles basé sur la complexité de la requête</td></tr>
<tr><td><code>/reload</code></td><td>Recharger config.toml (avec restauration automatique depuis la sauvegarde en cas d'erreur)</td></tr>
<tr><td><code>/restart</code></td><td>Redémarrage complet — exécuter un nouveau processus (prend en compte le nouveau binaire, la config, les serveurs MCP)</td></tr>
<tr><td><code>/cost</code></td><td>Afficher les statistiques d'utilisation des tokens (dernières 24h, 7j, principaux modèles)</td></tr>
<tr><td><code>/tasks</code></td><td>Lister les tâches de l'agent en cours et récentes pour votre session</td></tr>
<tr><td><code>/cancel &lt;id&gt;</code></td><td>Annuler une tâche en cours par son ID</td></tr>
<tr><td><code>/help</code></td><td>Afficher la liste des commandes disponibles</td></tr>
<tr><td><code>/start</code></td><td>Identique à /help</td></tr>
</tbody>
</table>

<h2>Changement de Modèle</h2>
${codeBlock(`/model claude-3.5-sonnet
# Switches to claude-3.5-sonnet and disables auto-routing

/auto
# Re-enables automatic Fast/Primary/Smart routing`, 'text')}

${callout('info', 'Remplacement de Modèle', 'Lorsque vous définissez manuellement un modèle avec <code>/model</code>, le routage automatique est désactivé jusqu\'à ce que vous envoyiez <code>/auto</code>.')}

<h2>Rechargement de la Configuration</h2>
<p>La commande <code>/reload</code> recharge <code>config.toml</code> en cours d'exécution. Si la configuration est invalide, aidaemon restaure automatiquement depuis la sauvegarde :</p>
<ol>
  <li><code>.toml.lastgood</code> — dernière configuration ayant réussi un appel LLM</li>
  <li><code>.toml.bak</code> → <code>.toml.bak.1</code> → <code>.toml.bak.2</code> — rotation sur 3 niveaux</li>
</ol>
`
  },
  {
    slug: '/telegram/approval',
    section: 'Telegram',
    title: 'Flux d\'Approbation',
    description: 'Approbation interactive par clavier en ligne pour les commandes terminal restreintes dans Telegram.',
    content: () => `
<h1>Flux d'Approbation des Commandes</h1>
<p class="lead">Approbation interactive par clavier en ligne pour les commandes terminal restreintes.</p>

<h2>Comment Ça Marche</h2>
<ol>
  <li>L'agent demande une commande terminal qui n'est pas dans la liste des préfixes autorisés (ou qui contient des opérateurs shell)</li>
  <li>Une demande d'approbation est envoyée au premier utilisateur de <code>allowed_user_ids</code></li>
  <li>L'utilisateur voit un clavier en ligne avec trois boutons :</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">La commande nécessite une approbation :</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Autoriser une fois</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Toujours autoriser</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Refuser</span>
  </div>
</div>

<h2>Options d'Approbation</h2>
<table class="config-table">
<thead><tr><th>Option</th><th>Comportement</th></tr></thead>
<tbody>
<tr><td><strong>Autoriser une fois</strong></td><td>Exécuter la commande cette fois uniquement</td></tr>
<tr><td><strong>Toujours autoriser</strong></td><td>Exécuter et ajouter le préfixe de la commande à <code>terminal.allowed_prefixes</code> dans config.toml</td></tr>
<tr><td><strong>Refuser</strong></td><td>Rejeter la commande — l'agent reçoit un message de refus</td></tr>
</tbody>
</table>

${callout('warn', 'Opérateurs Shell', 'Les commandes contenant <code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code> <code>$()</code> ou des backticks nécessitent <strong>toujours</strong> une approbation, même si le préfixe est dans la liste autorisée. Cela empêche les attaques par injection.')}

${callout('danger', 'Sources Non Fiables', 'Les sessions provenant de déclencheurs (comme les emails) sont marquées comme non fiables. Toutes les commandes terminal dans les sessions non fiables nécessitent <strong>toujours</strong> une approbation, indépendamment des préfixes autorisés.')}
`
  },
  {
    slug: '/slack',
    section: 'Slack',
    title: 'Configuration de l\'Espace de Travail',
    description: 'Connectez aidaemon à Slack via Socket Mode. Créez une application Slack, configurez les scopes OAuth et activez la messagerie en temps réel.',
    content: () => `
<h1>Intégration Slack</h1>
<p class="lead">Connectez aidaemon à votre espace de travail Slack via Socket Mode pour la messagerie en temps réel.</p>

${callout('success', 'Binaires Pré-compilés', 'Si vous avez installé via le script en une ligne ou Homebrew, le support Slack est déjà inclus. Configurez simplement <code>config.toml</code> ci-dessous. Le feature flag n\'est nécessaire que lors de la <a href="/getting-started/build">compilation depuis les sources</a>.')}

<h2>Créer une Application Slack</h2>
<ol>
  <li>Allez sur <a href="https://api.slack.com/apps" target="_blank" rel="noopener">api.slack.com/apps</a> et cliquez sur <strong>Create New App</strong></li>
  <li>Choisissez <strong>From scratch</strong>, nommez-la (ex. : "aidaemon"), et sélectionnez votre espace de travail</li>
  <li>Sous <strong>Socket Mode</strong>, activez-le et générez un <strong>App-Level Token</strong> avec le scope <code>connections:write</code> &mdash; c'est votre <code>app_token</code> (<code>xapp-...</code>)</li>
  <li>Sous <strong>OAuth &amp; Permissions</strong>, ajoutez ces <strong>Bot Token Scopes</strong> :
    <ul>
      <li><code>channels:read</code> &mdash; lister les membres dans les canaux publics</li>
      <li><code>chat:write</code> &mdash; envoyer des messages</li>
      <li><code>files:read</code> &mdash; télécharger les fichiers envoyés par les utilisateurs</li>
      <li><code>files:write</code> &mdash; envoyer des fichiers vers Slack</li>
      <li><code>groups:read</code> &mdash; lister les membres dans les canaux privés (nécessaire pour résoudre les noms d'utilisateur dans les canaux privés)</li>
      <li><code>im:read</code> &mdash; lire les métadonnées des messages directs (requis pour les transferts de fichiers en messages directs)</li>
      <li><code>reactions:write</code> &mdash; ajouter des réactions de statut (sablier pendant le traitement)</li>
      <li><code>users:read</code> &mdash; résoudre les informations utilisateur</li>
    </ul>
  </li>
  <li>Sous <strong>Event Subscriptions</strong>, activez les événements et abonnez-vous à :
    <ul>
      <li><code>message.channels</code> &mdash; messages dans les canaux publics</li>
      <li><code>message.groups</code> &mdash; messages dans les canaux privés</li>
      <li><code>message.im</code> &mdash; messages directs</li>
    </ul>
  </li>
  <li>Sous <strong>App Home</strong>, descendez jusqu'à <strong>Show Tabs</strong> et activez l'onglet <strong>Messages Tab</strong>. Cochez <strong>"Allow users to send Slash commands and messages from the messages tab"</strong> &mdash; sans cela, les utilisateurs ne peuvent pas envoyer de messages directs au bot.</li>
  <li>Installez l'application dans votre espace de travail &mdash; copiez le <strong>Bot User OAuth Token</strong> (<code>xoxb-...</code>)</li>
</ol>

<h2>Configuration</h2>
${codeBlock(`[slack]
enabled = true
app_token = "xapp-1-..."
bot_token = "xoxb-..."
allowed_user_ids = ["U123456789"]
use_threads = true`, 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'Activer le canal Slack'],
  ['app_token', 'string', '&mdash;', 'Token de niveau application pour Socket Mode (<code>xapp-...</code>). Supporte <code>"keychain"</code> et <code>$&#123;ENV&#125;</code>.'],
  ['bot_token', 'string', '&mdash;', 'Token OAuth de Bot Utilisateur (<code>xoxb-...</code>). Supporte <code>"keychain"</code> et <code>$&#123;ENV&#125;</code>.'],
  ['allowed_user_ids', 'array', '[]', 'Identifiants utilisateur Slack autorisés à interagir. Vide = aucune restriction.'],
  ['use_threads', 'bool', 'true', 'Répondre dans les fils de discussion par défaut. Chaque fil obtient son propre contexte de session.'],
])}

<h2>Trouver Votre Identifiant Utilisateur Slack</h2>
<p>Cliquez sur votre profil dans Slack, puis cliquez sur <strong>More</strong> &rarr; <strong>Copy member ID</strong>. Le format est <code>U</code> suivi de caractères alphanumériques (ex. : <code>U0123ABCDEF</code>).</p>

<h2>Fonctionnalités</h2>
<ul>
  <li><strong>Socket Mode</strong> &mdash; connexion WebSocket en temps réel, aucune URL publique requise</li>
  <li><strong>Réponses en fils</strong> &mdash; conversations en fils configurables avec contexte de session par fil</li>
  <li><strong>Transfert de fichiers</strong> &mdash; envoi et réception de fichiers via Slack</li>
  <li><strong>Approbations Block Kit</strong> &mdash; boutons interactifs pour l'approbation des commandes terminal</li>
  <li><strong>Commandes slash</strong> &mdash; mêmes commandes que Telegram (<code>/cost</code>, <code>/model</code>, <code>/tasks</code>, etc.)</li>
  <li><strong>Réactions de statut</strong> &mdash; emoji sablier pendant le traitement, supprimé à la fin</li>
  <li><strong>Conversion Markdown</strong> &mdash; le markdown standard est automatiquement converti au format mrkdwn de Slack</li>
  <li><strong>Découpage des messages</strong> &mdash; les longues réponses sont découpées pour respecter la limite de 39 Ko de Slack</li>
  <li><strong>Reconnexion automatique</strong> &mdash; backoff exponentiel en cas d'échec de connexion (5s → 60s max)</li>
</ul>

<h2>Modèle de Session</h2>
<p>Les sessions Slack sont identifiées par canal et fil de discussion :</p>
<ul>
  <li><strong>Message de canal :</strong> <code>slack:{channel_id}</code></li>
  <li><strong>Message de fil :</strong> <code>slack:{channel_id}:{thread_ts}</code> (quand <code>use_threads</code> est activé)</li>
</ul>
<p>Chaque session maintient son propre historique de conversation, sa mémoire de travail et son contexte de faits.</p>

${callout('warn', 'Contrôle d\'Accès', 'Si <code>allowed_user_ids</code> est vide, <strong>n\'importe qui</strong> dans l\'espace de travail pouvant envoyer un message au bot peut interagir avec lui. Définissez toujours cette valeur en production.')}
`
  },
  {
    slug: '/slack/commands',
    section: 'Slack',
    title: 'Commandes',
    description: 'Commandes slash disponibles pour aidaemon dans Slack : /model, /clear, /cost, /status, et plus.',
    content: () => `
<h1>Commandes Slack</h1>
<p class="lead">Commandes slash disponibles dans Slack. Le même ensemble de commandes que Telegram.</p>

<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/model</code></td><td>Afficher le modèle actif actuel</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Passer à un modèle spécifique (désactive le routage automatique)</td></tr>
<tr><td><code>/models</code></td><td>Lister tous les modèles disponibles du fournisseur (modèle actif marqué)</td></tr>
<tr><td><code>/auto</code></td><td>Réactiver le routage automatique des modèles basé sur la complexité de la requête</td></tr>
<tr><td><code>/reload</code></td><td>Recharger config.toml (avec restauration automatique depuis la sauvegarde en cas d'erreur)</td></tr>
<tr><td><code>/restart</code></td><td>Redémarrage complet &mdash; exécuter un nouveau processus (prend en compte le nouveau binaire, la config, les serveurs MCP)</td></tr>
<tr><td><code>/cost</code></td><td>Afficher les statistiques d'utilisation des tokens (dernières 24h, 7j, principaux modèles)</td></tr>
<tr><td><code>/tasks</code></td><td>Lister les tâches de l'agent en cours et récentes pour votre session</td></tr>
<tr><td><code>/cancel &lt;id&gt;</code></td><td>Annuler une tâche en cours par son ID</td></tr>
<tr><td><code>/help</code></td><td>Afficher la liste des commandes disponibles</td></tr>
</tbody>
</table>

${callout('info', 'Slash vs. Texte Brut', 'Dans Slack, ces commandes sont envoyées comme des messages normaux commençant par <code>/</code> dans un message direct ou un canal avec le bot. Elles ne sont pas enregistrées comme commandes slash Slack dans le manifeste de l\'application.')}
`
  },
  {
    slug: '/slack/approval',
    section: 'Slack',
    title: 'Flux d\'Approbation',
    description: 'Boutons interactifs Block Kit pour approuver les commandes terminal restreintes dans Slack.',
    content: () => `
<h1>Flux d'Approbation Slack</h1>
<p class="lead">Boutons interactifs Block Kit pour approuver les commandes terminal restreintes dans Slack.</p>

<h2>Comment Ça Fonctionne</h2>
<ol>
  <li>L'agent demande une commande terminal qui n'est pas dans la liste des préfixes autorisés (ou qui contient des opérateurs shell)</li>
  <li>Un message d'approbation est envoyé au canal/fil Slack avec des boutons Block Kit</li>
  <li>L'utilisateur voit trois boutons interactifs :</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">La commande nécessite une approbation :</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow Once</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Allow Always</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Options d'Approbation</h2>
<table class="config-table">
<thead><tr><th>Option</th><th>Comportement</th></tr></thead>
<tbody>
<tr><td><strong>Allow Once</strong></td><td>Exécuter la commande cette fois uniquement</td></tr>
<tr><td><strong>Allow Always</strong></td><td>Exécuter et persister le préfixe de commande pour les approbations automatiques futures</td></tr>
<tr><td><strong>Deny</strong></td><td>Rejeter la commande &mdash; l'agent reçoit un message de refus</td></tr>
</tbody>
</table>

<p>Le flux d'approbation dans Slack fonctionne de manière identique à Telegram. &laquo; Allow Always &raquo; persiste le préfixe dans SQLite pour qu'il survive aux redémarrages du daemon.</p>

${callout('warn', 'Opérateurs Shell', 'Les commandes contenant <code>;</code> <code>|</code> <code>&amp;&amp;</code> <code>||</code> <code>$()</code> ou des backticks nécessitent <strong>toujours</strong> une approbation, même si le préfixe est en liste blanche.')}
`
  },
{
    slug: '/discord',
    section: 'Discord',
    title: 'Configuration du Bot',
    description: 'Connectez aidaemon à Discord. Créez une application Discord, configurez le bot et activez les commandes slash.',
    content: () => `
<h1>Configuration du Bot Discord</h1>
<p class="lead">Connectez aidaemon à Discord via l'API gateway.</p>

${callout('success', 'Binaires Pré-compilés', 'Si vous avez installé via le script en une ligne ou Homebrew, le support Discord est déjà inclus. Configurez simplement <code>config.toml</code> ci-dessous. Le feature flag n\'est nécessaire que lors de la <a href="/getting-started/build">compilation depuis les sources</a>.')}

<h2>Créer une Application Discord</h2>
<ol>
  <li>Rendez-vous sur le <a href="https://discord.com/developers/applications" target="_blank" rel="noopener">Portail Développeur Discord</a></li>
  <li>Cliquez sur <strong>New Application</strong> et nommez-la (ex. &laquo; aidaemon &raquo;)</li>
  <li>Sous <strong>Bot</strong>, cliquez sur <strong>Add Bot</strong></li>
  <li>Copiez le <strong>Bot Token</strong> &mdash; c'est votre <code>bot_token</code></li>
  <li>Activez ces <strong>Privileged Gateway Intents</strong> :
    <ul>
      <li><code>Message Content Intent</code> &mdash; lire le texte des messages</li>
      <li><code>Server Members Intent</code> &mdash; résoudre les informations utilisateur</li>
    </ul>
  </li>
  <li>Sous <strong>OAuth2 &rarr; URL Generator</strong>, sélectionnez les scopes <code>bot</code> et <code>applications.commands</code>, puis les permissions : Send Messages, Read Message History, Attach Files, Use Slash Commands</li>
  <li>Utilisez l'URL générée pour inviter le bot sur votre serveur</li>
</ol>

<h2>Configuration</h2>
${codeBlock(`[discord]
bot_token = "MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.AbCdEf.xxxxx"
allowed_user_ids = [123456789012345678]
guild_id = 987654321098765432`, 'toml', 'config.toml')}

${configTable([
  ['bot_token', 'string', '&mdash;', 'Token du bot Discord depuis le Portail Développeur. Supporte <code>"keychain"</code>.'],
  ['allowed_user_ids', 'array', '[]', 'IDs utilisateur Discord (entiers snowflake) autorisés à interagir. Vide = aucune restriction.'],
  ['guild_id', 'integer', 'null', 'ID optionnel du serveur/guild. Si défini, le bot ne répond que dans ce serveur.'],
])}

<h2>Obtenir Votre ID Utilisateur Discord</h2>
<p>Activez le <strong>Mode Développeur</strong> dans les paramètres Discord (Apparence &rarr; Avancé), puis faites un clic droit sur votre nom d'utilisateur et sélectionnez <strong>Copier l'identifiant</strong>.</p>

<h2>Fonctionnalités</h2>
<ul>
  <li><strong>Connexion Gateway</strong> &mdash; connexion WebSocket en temps réel via le framework serenity</li>
  <li><strong>Commandes slash</strong> &mdash; commandes d'application enregistrées (voir <a href="/discord/commands">Commandes</a>)</li>
  <li><strong>Boutons interactifs</strong> &mdash; flux d'approbation avec boutons cliquables (voir <a href="/discord/approval">Flux d'Approbation</a>)</li>
  <li><strong>Transfert de fichiers</strong> &mdash; envoyer et recevoir des fichiers en pièces jointes Discord</li>
  <li><strong>Découpage des messages</strong> &mdash; les réponses longues sont découpées pour respecter la limite de 2000 caractères de Discord</li>
  <li><strong>Reconnexion automatique</strong> &mdash; backoff exponentiel en cas d'échec de connexion (5s &rarr; 60s max)</li>
  <li><strong>Liste d'utilisateurs autorisés</strong> &mdash; contrôle d'accès par token de bot</li>
  <li><strong>Support multi-bots</strong> &mdash; exécuter plusieurs bots Discord avec des configurations séparées</li>
</ul>

<h2>Modèle de Session</h2>
<p>Les sessions Discord sont identifiées par canal :</p>
<ul>
  <li><strong>Message de canal :</strong> <code>discord:{channel_id}</code></li>
</ul>
<p>Chaque canal maintient son propre historique de conversation, sa mémoire de travail et son contexte de faits.</p>

${callout('warn', 'Contrôle d\'Accès', 'Si <code>allowed_user_ids</code> est vide, <strong>n\'importe qui</strong> pouvant envoyer un message au bot peut interagir avec lui. Définissez toujours ce paramètre en production.')}
`
  },
  {
    slug: '/discord/commands',
    section: 'Discord',
    title: 'Commandes Slash',
    description: 'Commandes d\'application Discord enregistrées pour aidaemon : /ask, /model, /clear, /status, et plus.',
    content: () => `
<h1>Commandes Slash Discord</h1>
<p class="lead">Commandes d'application enregistrées disponibles dans Discord. Accessibles via <code>/</code> dans la zone de saisie.</p>

<table class="config-table">
<thead><tr><th>Commande</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>/ask &lt;message&gt;</code></td><td>Envoyer un message à l'agent</td></tr>
<tr><td><code>/model</code></td><td>Afficher le modèle actif actuel</td></tr>
<tr><td><code>/model &lt;name&gt;</code></td><td>Basculer vers un modèle spécifique (désactive le routage automatique)</td></tr>
<tr><td><code>/models</code></td><td>Lister tous les modèles disponibles du fournisseur</td></tr>
<tr><td><code>/auto</code></td><td>Réactiver le routage automatique des modèles</td></tr>
<tr><td><code>/clear</code></td><td>Effacer l'historique de conversation de la session</td></tr>
<tr><td><code>/cost</code></td><td>Afficher les statistiques d'utilisation des tokens</td></tr>
<tr><td><code>/tasks</code></td><td>Lister les tâches de l'agent en cours et récentes</td></tr>
<tr><td><code>/cancel &lt;id&gt;</code></td><td>Annuler une tâche en cours par son ID</td></tr>
<tr><td><code>/status</code></td><td>Afficher le statut et le temps de fonctionnement du daemon</td></tr>
<tr><td><code>/help</code></td><td>Afficher la liste des commandes disponibles</td></tr>
</tbody>
</table>

<h2>Messages Réguliers</h2>
<p>En plus des commandes slash, les utilisateurs peuvent également interagir en mentionnant le bot ou en envoyant des messages directs. Le bot les traite comme des messages de conversation normaux.</p>

${callout('info', 'Enregistrement des Commandes', 'Les commandes slash sont automatiquement enregistrées auprès de Discord lorsque le bot se connecte. Si vous changez le guild_id, les commandes seront réenregistrées pour le nouveau périmètre.')}
`
  },
  {
    slug: '/discord/approval',
    section: 'Discord',
    title: 'Flux d\'Approbation',
    description: 'Composants de boutons interactifs pour approuver les commandes terminal restreintes dans Discord.',
    content: () => `
<h1>Flux d'Approbation Discord</h1>
<p class="lead">Composants de boutons interactifs pour approuver les commandes terminal restreintes dans Discord.</p>

<h2>Comment Ça Fonctionne</h2>
<ol>
  <li>L'agent demande une commande terminal qui n'est pas dans la liste des préfixes autorisés (ou qui contient des opérateurs shell)</li>
  <li>Un message d'approbation est envoyé au canal Discord avec des boutons interactifs</li>
  <li>L'utilisateur voit trois boutons cliquables :</li>
</ol>

<div style="margin: 1.5rem 0; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 6px;">
  <p style="margin-bottom: 0.75rem; color: var(--text-secondary); font-size: 0.85rem;">La commande nécessite une approbation :</p>
  <code style="display: block; margin-bottom: 1rem;">rm -rf /tmp/old-cache</code>
  <div style="display: flex; gap: 0.5rem;">
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--green); border-radius: 4px; font-size: 0.75rem; color: var(--green);">Allow Once</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--cyan); border-radius: 4px; font-size: 0.75rem; color: var(--cyan);">Allow Always</span>
    <span style="padding: 0.4rem 0.8rem; background: var(--bg-elevated); border: 1px solid var(--red); border-radius: 4px; font-size: 0.75rem; color: var(--red);">Deny</span>
  </div>
</div>

<h2>Options d'Approbation</h2>
<table class="config-table">
<thead><tr><th>Option</th><th>Comportement</th></tr></thead>
<tbody>
<tr><td><strong>Allow Once</strong></td><td>Exécuter la commande cette fois uniquement</td></tr>
<tr><td><strong>Allow Always</strong></td><td>Exécuter et persister le préfixe de commande pour les approbations automatiques futures</td></tr>
<tr><td><strong>Deny</strong></td><td>Rejeter la commande &mdash; l'agent reçoit un message de refus</td></tr>
</tbody>
</table>

<p>Le flux d'approbation dans Discord utilise l'API <code>ComponentInteraction</code> de serenity. &laquo; Allow Always &raquo; persiste le préfixe dans SQLite pour qu'il survive aux redémarrages du daemon.</p>

${callout('info', 'Expiration des Boutons', 'Les tokens d\'interaction Discord expirent après 15 minutes. Si aucune réponse n\'est reçue dans ce délai, la demande d\'approbation expire et la commande est refusée.')}
`
  },
    {
    slug: '/tools',
    section: 'Tools',
    title: 'Vue d\'Ensemble des Outils',
    description: 'Vue d\'ensemble de tous les outils intégrés que l\'agent LLM aidaemon peut appeler : terminal, mémoire, navigateur, recherche web, et plus.',
    content: () => `
<h1>Outils</h1>
<p class="lead">aidaemon fournit un ensemble d'outils intégrés que le LLM peut appeler de manière autonome pendant la boucle agentique.</p>

<h2>Trait Tool</h2>
<p>Tous les outils implémentent la même interface :</p>
${codeBlock(`trait Tool {
    fn name(&self) -> &str;
    fn description(&self) -> &str;
    fn schema(&self) -> Value;       // OpenAI function-calling format
    async fn call(&self, args: &str) -> Result<String>;
}`, 'rust')}

<h2>Outils Intégrés</h2>
<table class="config-table">
<thead><tr><th>Outil</th><th>Description</th><th>Config</th></tr></thead>
<tbody>
<tr><td><a href="/tools/terminal"><code>terminal</code></a></td><td>Exécuter des commandes shell avec flux d'approbation</td><td>[terminal]</td></tr>
<tr><td><a href="/tools/system-info"><code>system_info</code></a></td><td>Interroger le nom d'hôte, l'OS, le temps de fonctionnement, la mémoire</td><td>Toujours activé</td></tr>
<tr><td><a href="/tools/memory"><code>remember_fact</code></a></td><td>Stocker des faits à long terme dans SQLite</td><td>Toujours activé</td></tr>
<tr><td><a href="/tools/config-manager"><code>manage_config</code></a></td><td>Lire/mettre à jour/restaurer config.toml</td><td>Toujours activé</td></tr>
<tr><td><a href="/tools/web-search"><code>web_search</code></a></td><td>Rechercher sur le web (DuckDuckGo ou Brave)</td><td>[search]</td></tr>
<tr><td><a href="/tools/web-fetch"><code>web_fetch</code></a></td><td>Récupérer et extraire du contenu lisible depuis des URLs</td><td>Toujours activé</td></tr>
<tr><td><a href="/tools/browser"><code>browser</code></a></td><td>Automatisation Chrome avec sessions de connexion persistantes</td><td>[browser] enabled=true</td></tr>
<tr><td><a href="/tools/send-file"><code>send_file</code></a></td><td>Envoyer des fichiers à l'utilisateur via Telegram ou Slack</td><td>[files]</td></tr>
<tr><td><a href="/tools/sub-agents"><code>spawn_agent</code></a></td><td>Lancer des sous-agents récursifs</td><td>[subagents]</td></tr>
<tr><td><a href="/tools/cli-agents"><code>cli_agent</code></a></td><td>Déléguer à des outils CLI externes</td><td>[cli_agents]</td></tr>
<tr><td><a href="/scheduler"><code>scheduler</code></a></td><td>Créer, gérer et exécuter des tâches planifiées</td><td>[scheduler]</td></tr>
<tr><td><a href="/tools/command-risk"><code>command_risk</code></a></td><td>Évaluation de risque à 4 niveaux pour les commandes terminal</td><td>[terminal]</td></tr>
<tr><td><a href="/health-monitoring"><code>health_probe</code></a></td><td>Gérer et exécuter des sondes de santé</td><td>[health]</td></tr>
<tr><td><a href="/skills"><code>manage_skills</code></a></td><td>Ajouter, supprimer, parcourir, installer des compétences dynamiques</td><td>[skills]</td></tr>
<tr><td><a href="/tools/people"><code>manage_people</code></a></td><td>Carnet de contacts personnel avec anniversaires, préférences, relations</td><td>Toujours enregistré</td></tr>
<tr><td><a href="/mcp">Outils MCP</a></td><td>Découverts dynamiquement via les serveurs MCP</td><td>[mcp.*]</td></tr>
</tbody>
</table>

${callout('info', 'Budget Dynamique', 'L\'agent dispose également d\'un pseudo-outil intégré <code>request_more_iterations</code> qui étend le budget de la boucle agentique de 10 itérations (jusqu\'à un plafond maximum) lorsque le budget actuel est insuffisant pour terminer une tâche.')}

<h2>Ordre d'Enregistrement des Outils</h2>
<p>Les outils sont enregistrés lors de l'initialisation dans cet ordre :</p>
<ol>
  <li>SystemInfoTool</li>
  <li>TerminalTool (avec canal d'approbation)</li>
  <li>RememberFactTool</li>
  <li>ConfigManagerTool</li>
  <li>WebFetchTool</li>
  <li>WebSearchTool</li>
  <li>BrowserTool (si activé)</li>
  <li>SendFileTool (si files.enabled)</li>
  <li>CliAgentTool (si activé)</li>
  <li>SchedulerTool (si scheduler.enabled)</li>
  <li>HealthProbeTool (si health.enabled)</li>
  <li>ManageSkillsTool</li>
  <li>ManagePeopleTool (toujours enregistré, contrôlé en interne)</li>
  <li>Outils MCP (si configurés)</li>
</ol>
`
  },
  {
    slug: '/tools/terminal',
    section: 'Tools',
    title: 'Outil Terminal',
    description: 'Exécuter des commandes shell sur le système hôte via aidaemon. Les commandes sont exécutées via sh -c avec évaluation des risques.',
    content: () => `
<h1>Outil Terminal</h1>
<p class="lead">Exécuter des commandes shell sur le système hôte. Les commandes sont exécutées via <code>sh -c</code>.</p>

<h2>Paramètres</h2>
${configTable([
  ['command', 'string', '—', 'La commande shell à exécuter'],
  ['action', 'string', '"run"', 'Action : run, check, kill ou trust_all'],
  ['pid', 'integer', '—', 'PID requis pour check/kill'],
])}

<h2>Logique d'Approbation</h2>
<p>Une commande est approuvée automatiquement uniquement si les <strong>deux</strong> conditions sont remplies :</p>
<ol>
  <li>La commande commence par un préfixe dans <code>terminal.allowed_prefixes</code></li>
  <li>La commande ne contient <strong>aucun</strong> opérateur shell</li>
</ol>

<h3>Opérateurs Shell (nécessitent toujours une approbation)</h3>
${codeBlock(`; | && || $() \` (backticks)`, 'text')}

<h3>Préfixes Autorisés par Défaut</h3>
${codeBlock(`ls, cat, head, tail, echo, date, whoami, pwd, find, wc,
grep, tree, file, stat, uname, df, du, ps, which, env, printenv`, 'text')}

<h2>Sortie</h2>
<p>Retourne d'abord stdout, puis stderr (le cas échéant). La sortie est tronquée à <code>terminal.max_output_chars</code> (4000 caractères par défaut).</p>

<h2>Commandes en Arrière-plan (Nouveau)</h2>
<p>Si une commande dépasse le timeout initial, elle passe en arrière-plan et renvoie un PID.</p>
<ul>
  <li>Utilise <code>action="check"</code> + <code>pid</code> pour voir la progression/la sortie</li>
  <li>Utilise <code>action="kill"</code> + <code>pid</code> pour arrêter le processus</li>
  <li>La sortie finale récente est conservée un moment pour les vérifications suivantes</li>
</ul>

<h2>Blocages de Sécurité Stricts (Nouveau)</h2>
<p>Les motifs destructifs larges sont maintenant bloqués avant le flux d'approbation, y compris <code>rm -rf</code> et <code>find ... -delete</code> sur des chemins sensibles.</p>

<h2>Configuration</h2>
${codeBlock(`[terminal]
allowed_prefixes = ["ls", "cat", "head", "tail", "echo", "date"]
initial_timeout_secs = 30
max_output_chars = 4000
permission_mode = "default"`, 'toml', 'config.toml')}

<h2>Allow Always (Persistant)</h2>
<p>Lorsque l'utilisateur clique sur "Allow Always" dans Telegram :</p>
<ol>
  <li>Le premier mot de la commande est extrait comme préfixe</li>
  <li>Le préfixe est ajouté à la liste autorisée en mémoire</li>
  <li>Le préfixe est persisté dans SQLite (table <code>terminal_allowed_prefixes</code>)</li>
  <li>Au redémarrage, les préfixes persistés sont fusionnés avec les préfixes de configuration</li>
</ol>
<p>Cela signifie que les approbations "Allow Always" survivent aux redémarrages du daemon sans modifier config.toml.</p>

${callout('danger', 'Sessions Non Fiables', 'Les sessions provenant de déclencheurs (email, etc.) sont marquées comme non fiables. <strong>Toutes</strong> les commandes dans les sessions non fiables nécessitent une approbation, quelle que soit la liste blanche.')}
`
  },
{
    slug: '/tools/command-risk',
    section: 'Tools',
    title: 'Évaluation des Risques de Commande',
    description: 'Chaque commande terminal est évaluée avec un système de risque à 4 niveaux : Safe, Medium, High et Critical. Plus de 60 patterns.',
    content: () => `
<h1>Évaluation des Risques de Commande</h1>
<p class="lead">Chaque commande terminal est évaluée avec un système de risque à 4 niveaux avant exécution.</p>

<h2>Niveaux de Risque</h2>
<table class="config-table">
<thead><tr><th>Niveau</th><th>Approbation automatique ?</th><th>Exemples</th></tr></thead>
<tbody>
<tr><td><strong>Safe</strong></td><td>Oui (si préfixe en liste blanche)</td><td><code>ls</code>, <code>cat</code>, <code>date</code>, <code>echo</code></td></tr>
<tr><td><strong>Medium</strong></td><td>Après première approbation</td><td><code>curl</code>, <code>git push</code>, <code>npm install</code></td></tr>
<tr><td><strong>High</strong></td><td>Après première approbation</td><td><code>rm</code>, <code>mv</code>, <code>chmod</code>, <code>kill</code></td></tr>
<tr><td><strong>Critical</strong></td><td>Jamais persisté (par défaut)</td><td><code>sudo rm -rf</code>, <code>dd</code>, <code>mkfs</code></td></tr>
</tbody>
</table>

<h2>Modes de Permission</h2>
${configTable([
  ['default', '—', '—', 'Les approbations Safe/Medium/High persistent entre les redémarrages. Critical est par session uniquement.'],
  ['cautious', '—', '—', 'Toutes les approbations sont par session uniquement.'],
  ['yolo', '—', '—', 'Toutes les approbations persistent indéfiniment.'],
])}

<h2>Constructions Dangereuses</h2>
<p>Patterns qui élèvent toujours le risque :</p>
<ul>
  <li>Substitution de commande : <code>$(...)</code> et backticks</li>
  <li>Substitution de processus : <code>&gt;(...)</code>, <code>&lt;(...)</code></li>
  <li>Redirection : <code>&gt;</code>, <code>&gt;&gt;</code></li>
  <li>Commandes multiples : <code>;</code>, <code>&amp;&amp;</code>, <code>||</code></li>
  <li>Pipes vers des shells ou <code>sudo</code></li>
</ul>

<h2>Détection de Chemins Sensibles</h2>
<p>Les commandes référençant ces fichiers sont automatiquement élevées :</p>
<ul>
  <li><code>.env</code> &mdash; secrets d'environnement</li>
  <li>Clés SSH : <code>id_rsa</code>, <code>id_ed25519</code></li>
  <li>Configs cloud : <code>.aws</code>, <code>.kube</code>, <code>.docker</code></li>
  <li>Authentification système : <code>shadow</code>, <code>passwd</code>, <code>sudoers</code></li>
  <li>Identifiants : <code>master.key</code>, <code>.netrc</code>, <code>.pgpass</code></li>
</ul>

<h2>Blocages Stricts (Nouveau)</h2>
<p>Même avant le flux d'approbation, les motifs de suppression larges ou sensibles sont bloqués, y compris des cibles risquées avec <code>rm -rf</code> et <code>find ... -delete</code>.</p>

${callout('info', 'Configuration', 'Définissez <code>terminal.permission_mode</code> dans config.toml. La valeur par défaut est <code>"default"</code>.')}
`
},
    {
    slug: '/tools/system-info',
    section: 'Tools',
    title: 'Outil Informations Système',
    description: 'Interroger l\'OS, le nom d\'hôte, l\'architecture, le CPU, la mémoire, le disque, le temps de fonctionnement et les processus via l\'outil system info.',
    content: () => `
<h1>Outil Informations Système</h1>
<p class="lead">Interroger les informations système de base. Toujours activé, sans paramètres.</p>

<h2>Paramètres</h2>
<p>Aucun — cet outil ne prend aucun argument.</p>

<h2>Sortie</h2>
<p>Retourne un rapport textuel avec :</p>
<ul>
  <li><strong>Nom d'hôte</strong></li>
  <li><strong>Système d'exploitation</strong></li>
  <li><strong>Temps de fonctionnement</strong></li>
  <li><strong>Utilisation mémoire</strong></li>
</ul>

<p>La mémoire est collectée de manière spécifique à la plateforme :</p>
<ul>
  <li><strong>Linux :</strong> analysée depuis <code>free -h</code></li>
  <li><strong>macOS :</strong> analysée depuis <code>vm_stat</code></li>
</ul>
`
  },
  {
    slug: '/tools/memory',
    section: 'Tools',
    title: 'Outil Mémoire / Faits',
    description: 'Stocker et récupérer des faits à long terme qui persistent entre les sessions et sont injectés dans le prompt système.',
    content: () => `
<h1>Outil Mémoire / Faits</h1>
<p class="lead">Stocker et récupérer des faits à long terme qui persistent entre les sessions et sont injectés dans le prompt système.</p>

<h2>Nom de l'Outil</h2>
<p><code>remember_fact</code></p>

<h2>Paramètres</h2>
${configTable([
  ['category', 'string', '—', 'Catégorie de regroupement (ex. "user", "preference", "project")'],
  ['key', 'string', '—', 'Identifiant unique au sein de la catégorie'],
  ['value', 'string', '—', 'Le contenu du fait à stocker'],
])}

<h2>Stockage</h2>
<p>Les faits sont insérés ou mis à jour (upsert) dans la table <code>facts</code> de SQLite. La paire <code>(category, key)</code> est unique — stocker un fait avec la même catégorie et la même clé écrase la valeur précédente.</p>

<h2>Injection dans le Prompt Système</h2>
<p>Jusqu'à <code>state.max_facts</code> (100 par défaut) faits sont injectés dans le prompt système sous une section <code>## Known Facts</code>, regroupés par catégorie et triés par date de dernière mise à jour. Cela signifie que l'agent a toujours accès à ses connaissances stockées.</p>

${codeBlock(`## Known Facts

### user
- name: David
- timezone: US/Pacific

### project
- language: Rust
- repo: /home/david/projects/myapp`, 'text', 'system prompt injection')}

<h2>Schéma de la Table Facts</h2>
${configTable([
  ['id', 'integer', 'auto', 'Clé primaire auto-incrémentée'],
  ['category', 'string', '—', 'Catégorie de regroupement'],
  ['key', 'string', '—', 'Clé du fait (unique par catégorie)'],
  ['value', 'string', '—', 'Contenu du fait'],
  ['source', 'string', '""', 'Qui l\'a stocké : "agent" ou "user"'],
  ['created_at', 'timestamp', 'now', 'Date de création du fait'],
  ['updated_at', 'timestamp', 'now', 'Date de dernière mise à jour du fait'],
])}
`
  },
  {
    slug: '/tools/config-manager',
    section: 'Tools',
    title: 'Outil Gestionnaire de Configuration',
    description: 'L\'agent aidaemon peut lire, mettre à jour, valider et restaurer son propre fichier de configuration de manière autonome.',
    content: () => `
<h1>Outil Gestionnaire de Configuration</h1>
<p class="lead">L'agent peut lire, mettre à jour, valider et restaurer son propre fichier de configuration.</p>

<h2>Nom de l'Outil</h2>
<p><code>manage_config</code></p>

<h2>Actions</h2>

<h3>read</h3>
<p>Retourne le contenu complet de config.toml avec les champs sensibles masqués :</p>
${codeBlock(`api_key = "***REDACTED***"
bot_token = "***REDACTED***"
password = "***REDACTED***"`, 'toml')}

<h3>get</h3>
<p>Lire un chemin de clé TOML spécifique :</p>
${codeBlock(`action: "get"
key: "provider.models.primary"
# Returns: "gemini-3-flash-preview"`, 'text')}

<h3>set</h3>
<p>Mettre à jour une clé spécifique avec une nouvelle valeur (format littéral TOML) :</p>
${codeBlock(`action: "set"
key: "state.working_memory_cap"
value: "100"`, 'text')}

<p>Avant l'écriture :</p>
<ol>
  <li>Crée une sauvegarde (rotation à 3 niveaux : <code>.bak</code> → <code>.bak.1</code> → <code>.bak.2</code>)</li>
  <li>Valide la nouvelle configuration (syntaxe TOML + désérialisation complète)</li>
  <li>Définit les permissions du fichier à 0600 (propriétaire uniquement) sur Unix</li>
</ol>

<h3>restore</h3>
<p>Restaurer depuis le fichier de sauvegarde le plus récent.</p>

${callout('info', 'Dernière Configuration Valide', 'Après chaque appel LLM réussi, la configuration actuelle est enregistrée comme <code>.toml.lastgood</code>. C\'est le premier fichier essayé lors de la récupération.')}

<h2>Priorité des Sauvegardes</h2>
<ol>
  <li><code>config.toml.lastgood</code> — configuration prouvée fonctionnelle</li>
  <li><code>config.toml.bak</code> — sauvegarde la plus récente</li>
  <li><code>config.toml.bak.1</code></li>
  <li><code>config.toml.bak.2</code></li>
</ol>
`
  },
  {
    slug: '/tools/browser',
    section: 'Tools',
    title: 'Outil Navigateur',
    description: 'Automatisation Chrome avec sessions de connexion persistantes pour la navigation web, le remplissage de formulaires et les captures d\'écran.',
    content: () => `
<h1>Outil Navigateur</h1>
<p class="lead">Automatisation Chrome avec sessions de connexion persistantes. Connectez-vous une fois, et l'agent peut naviguer sur les sites authentifiés en votre nom.</p>

${callout('success', 'Binaires Pré-compilés', 'Si vous avez installé via le script en une ligne ou Homebrew, l\'outil navigateur est déjà inclus. Activez-le simplement dans <code>config.toml</code> ci-dessous. Le feature flag n\'est nécessaire que lors de la <a href="/getting-started/build">compilation depuis les sources</a>.')}

<h2>Démarrage Rapide</h2>
<p>Deux étapes pour que l'agent navigue avec vos sessions de connexion :</p>

<h3>1. Connectez-vous à vos services</h3>
${codeBlock(`aidaemon browser login`, 'bash')}
<p>Chrome s'ouvre avec un profil dédié. Connectez-vous aux services auxquels vous souhaitez que l'agent accède (Gmail, GitHub, AWS Console, Jira, etc.), puis fermez Chrome. Vos sessions sont sauvegardées dans <code>~/.aidaemon/chrome-profile/</code> et persistent entre les redémarrages.</p>

<h3>2. Activez l'outil navigateur</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}

<p>C'est tout. L'agent peut maintenant naviguer sur les sites authentifiés en utilisant vos sessions sauvegardées.</p>

${callout('info', 'Essayez', 'Envoyez à l\'agent un message comme <em>"Va sur https://mail.google.com et prends une capture d\'écran"</em> — il devrait afficher votre boîte de réception, déjà connecté.')}

<h2>Configuration</h2>
${configTable([
  ['enabled', 'bool', 'false', 'Activer l\'outil navigateur'],
  ['headless', 'bool', 'true', 'Exécuter Chrome sans fenêtre visible'],
  ['screenshot_width', 'int', '1280', 'Largeur du viewport du navigateur en pixels'],
  ['screenshot_height', 'int', '720', 'Hauteur du viewport du navigateur en pixels'],
  ['user_data_dir', 'string', '~/.aidaemon/chrome-profile', 'Répertoire du profil Chrome pour les sessions persistantes'],
  ['profile', 'string', 'Default', 'Nom du profil Chrome dans user_data_dir'],
  ['remote_debugging_port', 'int', 'null', 'Se connecter à une instance Chrome existante sur ce port (avancé)'],
])}

<h3>Configuration minimale</h3>
${codeBlock(`[browser]
enabled = true`, 'toml', 'config.toml')}
<p>Tout le reste a des valeurs par défaut raisonnables. Les sessions sont automatiquement sauvegardées dans <code>~/.aidaemon/chrome-profile/</code>.</p>

<h2>Actions</h2>

<table class="config-table">
<thead><tr><th>Action</th><th>Paramètres</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>navigate</code></td><td><code>url</code></td><td>Naviguer vers l'URL, attendre 2s pour le chargement</td></tr>
<tr><td><code>screenshot</code></td><td><code>selector?</code></td><td>Capture PNG de la page complète ou d'un élément spécifique</td></tr>
<tr><td><code>click</code></td><td><code>selector</code></td><td>Cliquer sur un élément par sélecteur CSS</td></tr>
<tr><td><code>fill</code></td><td><code>selector, value</code></td><td>Saisir du texte dans un champ de formulaire</td></tr>
<tr><td><code>get_text</code></td><td><code>selector?</code></td><td>Extraire le contenu textuel d'un élément ou de la page entière</td></tr>
<tr><td><code>execute_js</code></td><td><code>script</code></td><td>Exécuter du JavaScript arbitraire et retourner le résultat</td></tr>
<tr><td><code>wait</code></td><td><code>selector, timeout_secs?</code></td><td>Attendre qu'un élément apparaisse (délai par défaut 10s)</td></tr>
<tr><td><code>close</code></td><td>—</td><td>Fermer la session du navigateur</td></tr>
</tbody>
</table>

<h2>Persistance des Sessions</h2>
<p>L'outil navigateur utilise un profil Chrome dédié dans <code>~/.aidaemon/chrome-profile/</code> qui stocke les cookies, le stockage local et les sessions de connexion. Cela signifie :</p>
<ul>
  <li>Connectez-vous une fois via <code>aidaemon browser login</code>, les sessions persistent indéfiniment</li>
  <li>L'agent lance Chrome en mode headless avec ce profil — déjà authentifié</li>
  <li>Les sessions survivent aux redémarrages d'aidaemon et aux redémarrages système</li>
  <li>Relancez <code>aidaemon browser login</code> à tout moment pour ajouter de nouveaux services ou rafraîchir les sessions expirées</li>
</ul>

${callout('warn', 'Isolé de Votre Chrome Personnel', 'L\'agent utilise son propre profil Chrome, complètement séparé de votre navigateur personnel. Vos favoris, extensions et sessions personnels ne sont jamais touchés.')}

<h2>Modes de Déploiement</h2>

<h3>Instance isolée (recommandé)</h3>
<p>Lorsque vous exécutez aidaemon sur un serveur ou une VM dédiée, aucun autre Chrome n'est en cours d'exécution. L'agent lance et contrôle Chrome directement.</p>
${codeBlock(`# SSH into your instance
ssh user@my-server

# One-time: log into services
aidaemon browser login

# Config
# [browser]
# enabled = true

# Done — agent handles Chrome automatically from here`, 'bash')}
<p>Pour les serveurs headless, utilisez SSH avec transfert X (<code>ssh -X</code>) ou VNC pour la connexion initiale.</p>

<h3>Ordinateur personnel</h3>
<p>Lorsque vous exécutez aidaemon aux côtés de votre Chrome personnel, l'agent lance une instance Chrome séparée avec son propre profil. Les deux fonctionnent côte à côte sans conflit.</p>
${codeBlock(`# Same setup — separate Chrome instance, no conflict
aidaemon browser login

# Your personal Chrome (47 tabs, extensions, bookmarks) → untouched
# Aidaemon's Chrome (~/.aidaemon/chrome-profile/) → isolated`, 'bash')}

<h3>Avancé : Se connecter à un Chrome existant</h3>
<p>Pour les utilisateurs avancés qui souhaitent se connecter à une instance Chrome déjà en cours d'exécution avec un port de débogage distant :</p>
${codeBlock(`[browser]
enabled = true
remote_debugging_port = 9222`, 'toml', 'config.toml')}
<p>Lancez Chrome avec <code>--remote-debugging-port=9222</code> et l'agent s'y connecte directement. Cela partage les sessions de l'instance Chrome mais nécessite que Chrome soit lancé avec le flag de débogage.</p>

<h2>Captures d'Écran</h2>
<p>Les captures d'écran sont réalisées en PNG et envoyées à l'utilisateur via le canal actif (photo Telegram, envoi de fichier Slack, etc.) avec des légendes décrivant l'URL de la page.</p>

<h2>Cas d'Utilisation</h2>
<ul>
  <li><strong>Surveillance</strong> — Vérifier les tableaux de bord (Grafana, Vercel, AWS Console), capturer le statut des déploiements</li>
  <li><strong>Extraction de données</strong> — Scraper des pages rendues en JS, extraire des rapports depuis des panneaux d'administration</li>
  <li><strong>Automatisation de workflows</strong> — Remplir des formulaires, naviguer dans des flux multi-étapes sur des outils internes</li>
  <li><strong>Tests</strong> — Naviguer sur votre application déployée, vérifier l'interface, contrôler les mises en page responsives</li>
  <li><strong>Navigation authentifiée</strong> — Interagir avec tout service auquel vous vous êtes connecté, sans clés API nécessaires</li>
</ul>

<h2>Compilation depuis les Sources</h2>
<p>L'outil navigateur nécessite le feature flag <code>browser</code> :</p>
${codeBlock(`cargo build --release --features browser`, 'bash')}
<p>Nécessite un navigateur basé sur Chromium installé (Chrome, Chromium, Brave ou Edge).</p>
`
  },
  {
    slug: '/tools/sub-agents',
    section: 'Tools',
    title: 'Création de sous-agents',
    description: 'Créez des agents enfants pour les tâches complexes avec délégation récursive. Chaque sous-agent dispose de son propre ensemble d\'outils.',
    content: () => `
<h1>Création de sous-agents</h1>
<p class="lead">L'agent peut créer des agents enfants pour les tâches complexes, permettant une délégation récursive.</p>

<h2>Nom de l'outil</h2>
<p><code>spawn_agent</code></p>

<h2>Paramètres</h2>
${configTable([
  ['mission', 'string', '—', 'Rôle/contexte de haut niveau pour le sous-agent'],
  ['task', 'string', '—', 'Question concrète ou travail à accomplir'],
])}

<h2>Comportement</h2>
<ul>
  <li>L'agent enfant s'exécute à <code>parent_depth + 1</code></li>
  <li>Hérite du fournisseur, du magasin d'état, du modèle et des outils (hors spawn) du parent</li>
  <li>Reçoit un prompt système ciblé : instructions de base + contexte de la mission</li>
  <li>Exécute une boucle agentique complète dans une session isolée (<code>sub-{depth}-{uuid}</code>)</li>
  <li>Renvoie la réponse texte finale au parent (tronquée à <code>max_response_chars</code>)</li>
  <li>Si <code>child_depth &lt; max_depth</code>, l'enfant dispose également de l'outil <code>spawn_agent</code></li>
</ul>

<h2>Configuration</h2>
${codeBlock(`[subagents]
enabled = true
max_depth = 3
max_iterations = 10
max_response_chars = 8000
timeout_secs = 300`, 'toml', 'config.toml')}

${callout('info', 'Limite de récursion', 'Les sous-agents peuvent créer leurs propres sous-agents jusqu\'à <code>max_depth</code> niveaux de profondeur. Au niveau maximum, l\'outil spawn_agent n\'est pas fourni.')}

${callout('warn', 'Délai d\'expiration', 'Chaque invocation de sous-agent a un délai d\'expiration strict (<code>timeout_secs</code>). Si un sous-agent prend trop de temps, le parent reçoit une erreur de délai d\'expiration.')}
`
  },
  {
    slug: '/tools/cli-agents',
    section: 'Tools',
    title: 'Délégation aux agents CLI',
    description: 'Déléguez des tâches à Claude Code, Gemini CLI, Codex, Copilot ou Aider depuis la boucle agentique d\'aidaemon.',
    content: () => `
<h1>Délégation aux agents CLI</h1>
<p class="lead">Déléguez des tâches à des outils CLI de codage externes comme Claude Code, Gemini CLI, Codex, Copilot ou Aider.</p>

<h2>Nom de l'outil</h2>
<p><code>cli_agent</code></p>

<h2>Paramètres</h2>
${configTable([
  ['tool', 'string', '—', 'Nom de l\'outil CLI à invoquer (ex. : "claude", "gemini")'],
  ['prompt', 'string', '—', 'Le prompt/la tâche à envoyer à l\'outil CLI'],
  ['working_dir', 'string', 'null', 'Répertoire de travail pour l\'exécution de la commande'],
])}

<h2>Outils par défaut</h2>
<p>Lorsque <code>cli_agents.enabled = true</code> sans configuration explicite des outils, ces valeurs par défaut sont enregistrées (si la commande existe sur le système) :</p>

<table class="config-table">
<thead><tr><th>Nom</th><th>Commande</th><th>Arguments par défaut</th></tr></thead>
<tbody>
<tr><td>claude</td><td><code>claude</code></td><td><code>-p --output-format json</code></td></tr>
<tr><td>gemini</td><td><code>gemini</code></td><td><code>-p --output-format json --sandbox=false</code></td></tr>
<tr><td>codex</td><td><code>codex</code></td><td><code>exec --json --full-auto</code></td></tr>
<tr><td>copilot</td><td><code>copilot</code></td><td><code>-p</code></td></tr>
<tr><td>aider</td><td><code>aider</code></td><td><code>--yes --message</code></td></tr>
</tbody>
</table>

${callout('info', 'Découverte', 'Seuls les outils dont les commandes sont trouvées via <code>which</code> sont enregistrés. Les outils manquants sont ignorés silencieusement.')}

<h2>Configuration personnalisée</h2>
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

<h2>Extraction de la sortie</h2>
<p>L'outil tente d'extraire une sortie structurée :</p>
<ul>
  <li><strong>JSON :</strong> recherche les champs <code>result</code>, <code>output</code>, <code>content</code> ou <code>message</code></li>
  <li><strong>JSONL :</strong> prend la dernière ligne contenant du contenu</li>
  <li><strong>Repli :</strong> renvoie la sortie brute, tronquée à <code>max_output_chars</code></li>
</ul>
`
  },
  {
    slug: '/tools/web-search',
    section: 'Tools',
    title: 'Outil de recherche web',
    description: 'Recherchez sur le web via DuckDuckGo ou Brave et renvoyez titres, URLs et extraits à l\'agent LLM.',
    content: () => `
<h1>Outil de recherche web</h1>
<p class="lead">Recherchez sur le web et obtenez des titres, URLs et extraits. Prend en charge DuckDuckGo (par défaut, aucune clé nécessaire) et Brave comme moteurs.</p>

<h2>Nom de l'outil</h2>
<p><code>web_search</code></p>

<h2>Paramètres</h2>
${configTable([
  ['query', 'string', '—', 'La requête de recherche (obligatoire)'],
  ['max_results', 'integer', '5', 'Nombre maximum de résultats à renvoyer'],
])}

<h2>Moteurs</h2>
<table class="config-table">
<thead><tr><th>Moteur</th><th>Clé API</th><th>Fonctionnement</th></tr></thead>
<tbody>
<tr><td><strong>DuckDuckGo</strong> (par défaut)</td><td>Non requise</td><td>Récupère <code>https://lite.duckduckgo.com/lite/</code> et analyse les résultats HTML</td></tr>
<tr><td><strong>Brave</strong></td><td>Requise</td><td>Appelle l'API JSON <code>https://api.search.brave.com/res/v1/web/search</code></td></tr>
</tbody>
</table>

<h2>Configuration</h2>
${codeBlock(`[search]
backend = "duckduckgo"  # or "brave"
api_key = ""            # Required only for Brave`, 'toml', 'config.toml')}

<h2>Format de sortie</h2>
<p>Renvoie des résultats numérotés en markdown :</p>
${codeBlock(`1. [Page Title](https://example.com/page)
   A brief snippet describing the page content...

2. [Another Result](https://example.com/other)
   Another snippet...`, 'text')}
`
  },
  {
    slug: '/tools/web-fetch',
    section: 'Tools',
    title: 'Outil de récupération web',
    description: 'Récupérez n\'importe quelle URL et extrayez le contenu lisible. Prend en charge la conversion HTML-vers-texte avec des limites configurables.',
    content: () => `
<h1>Outil de récupération web</h1>
<p class="lead">Récupérez une URL et extrayez son contenu lisible. Toujours activé, aucune configuration requise.</p>

<h2>Nom de l'outil</h2>
<p><code>web_fetch</code></p>

<h2>Paramètres</h2>
${configTable([
  ['url', 'string', '—', 'L\'URL à récupérer (obligatoire)'],
  ['max_chars', 'integer', '20000', 'Nombre maximum de caractères à renvoyer'],
])}

<h2>Comportement</h2>
<ol>
  <li>Récupère l'URL avec des en-têtes de type navigateur (user-agent Firefox, en-têtes Accept standard)</li>
  <li>Tente une extraction de lisibilité pour obtenir un texte d'article propre</li>
  <li>Se rabat sur une conversion complète HTML-vers-markdown</li>
  <li>Tronque à <code>max_chars</code> à une frontière UTF-8 sûre</li>
</ol>

${callout('info', 'Complément à l\'outil navigateur', 'Utilisez <code>web_fetch</code> pour une extraction rapide de contenu sans lancer Chrome. Utilisez l\'<a href="/tools/browser">outil navigateur</a> pour les pages interactives nécessitant JavaScript, le remplissage de formulaires ou des captures d\'écran.')}
`
  },
  {
    slug: '/tools/send-file',
    section: 'Tools',
    title: 'Transfert de fichiers',
    description: 'Envoyez et recevez des fichiers via Telegram ou Slack. Validation des chemins et blocage des fichiers sensibles intégrés.',
    content: () => `
<h1>Transfert de fichiers</h1>
<p class="lead">Envoyez des fichiers à l'utilisateur via Telegram ou Slack, et recevez des fichiers de l'utilisateur. Valide les chemins et bloque les fichiers sensibles.</p>

<h2>Nom de l'outil</h2>
<p><code>send_file</code> (sortant)</p>

<h2>Paramètres</h2>
${configTable([
  ['file_path', 'string', '—', 'Chemin absolu vers le fichier à envoyer (obligatoire)'],
  ['caption', 'string', 'null', 'Légende optionnelle pour le fichier'],
])}

<h2>Configuration</h2>
${codeBlock(`[files]
enabled = true
inbox_dir = "~/.aidaemon/files/inbox"
outbox_dirs = ["~"]
max_file_size_mb = 10
retention_hours = 24`, 'toml', 'config.toml')}

<h2>Sécurité</h2>
<p>L'outil applique des restrictions de chemin pour empêcher la fuite accidentelle de secrets :</p>
<ul>
  <li><strong>Chemins autorisés :</strong> Uniquement les fichiers dans <code>outbox_dirs</code> ou <code>inbox_dir</code></li>
  <li><strong>Résolution de liens symboliques :</strong> Canonicalise les chemins pour empêcher la traversée de répertoires</li>
  <li><strong>Motifs bloqués :</strong> <code>.ssh</code>, <code>.gnupg</code>, <code>.env</code>, <code>credentials</code>, <code>.key</code>, <code>.pem</code>, <code>.aws/credentials</code>, <code>.netrc</code>, <code>.docker/config.json</code>, <code>config.toml</code></li>
</ul>

<h2>Fichiers entrants</h2>
<p>Les utilisateurs peuvent envoyer des fichiers au bot dans Telegram ou Slack. aidaemon les télécharge dans <code>inbox_dir</code> et les met à disposition de l'agent. Prend en charge les documents, photos, fichiers audio, vidéo et messages vocaux, jusqu'à <code>max_file_size_mb</code>.</p>

${callout('warn', 'Répertoires de sortie', 'La liste <code>outbox_dirs</code> contrôle les répertoires depuis lesquels l\'agent peut envoyer des fichiers. Gardez-la aussi restreinte que possible en production.')}
`
  },
  {
    slug: '/tools/people',
    section: 'Tools',
    title: 'Intelligence relationnelle',
    description: 'Un carnet de contacts personnel géré par votre assistant IA. Mémorise les anniversaires, préférences et relations — le tout stocké localement sur votre machine.',
    content: () => `
<h1>Intelligence relationnelle</h1>
<p class="lead">Imaginez un carnet de contacts, mais avec un assistant personnel qui se souvient des détails pour vous. Anniversaires, préférences, styles de communication, comment vous connaissez quelqu'un &mdash; aidaemon organise tout et vous le rappelle quand c'est important. Tout reste sur votre ordinateur ou serveur, jamais envoyé à des tiers.</p>

${callout('info', 'Activation à la volée', 'L\'intelligence relationnelle peut être activée ou désactivée à tout moment via le chat. Dites simplement <strong>"enable people intelligence"</strong> ou utilisez l\'outil <code>manage_people</code> avec l\'action <code>enable</code>/<code>disable</code>. Aucun redémarrage nécessaire.')}

<h2>Comment ça fonctionne</h2>
<ol>
  <li><strong>Ajouter des contacts</strong> &mdash; ajoutez manuellement des personnes ou laissez aidaemon les découvrir à travers les conversations</li>
  <li><strong>Mémoriser les détails</strong> &mdash; anniversaires, préférences, centres d'intérêt, informations professionnelles et plus encore</li>
  <li><strong>Lier les identités</strong> &mdash; associez une personne à son identité Telegram, Slack ou Discord</li>
  <li><strong>Rappels proactifs</strong> &mdash; aidaemon mentionne naturellement les anniversaires à venir et suggère des reprises de contact</li>
  <li><strong>Adaptation du contexte</strong> &mdash; lorsqu'une personne connue envoie un message, aidaemon adapte son style de communication</li>
</ol>

<h2>Nom de l'outil</h2>
<p><code>manage_people</code></p>

<h2>Actions</h2>
<table class="config-table">
<thead><tr><th>Action</th><th>Description</th><th>Paramètres requis</th></tr></thead>
<tbody>
<tr><td><code>enable</code></td><td>Activer l'intelligence relationnelle (persiste entre les redémarrages)</td><td>&mdash;</td></tr>
<tr><td><code>disable</code></td><td>Désactiver l'intelligence relationnelle (les données sont préservées)</td><td>&mdash;</td></tr>
<tr><td><code>status</code></td><td>Afficher l'état activé/désactivé et le nombre de contacts</td><td>&mdash;</td></tr>
<tr><td><code>add</code></td><td>Ajouter une nouvelle personne</td><td>name</td></tr>
<tr><td><code>list</code></td><td>Lister tous les contacts (filtrer par relation)</td><td>&mdash;</td></tr>
<tr><td><code>view</code></td><td>Voir les détails d'une personne et tous ses faits</td><td>name ou id</td></tr>
<tr><td><code>update</code></td><td>Mettre à jour les champs d'une personne (relation, notes, style)</td><td>name ou id</td></tr>
<tr><td><code>remove</code></td><td>Supprimer une personne et tous ses faits</td><td>name ou id</td></tr>
<tr><td><code>add_fact</code></td><td>Stocker un fait sur quelqu'un (anniversaire, préférence, etc.)</td><td>person_name, category, key, value</td></tr>
<tr><td><code>remove_fact</code></td><td>Supprimer un fait spécifique par ID</td><td>fact_id</td></tr>
<tr><td><code>link</code></td><td>Lier une identité de plateforme à une personne</td><td>person_name, platform_id</td></tr>
<tr><td><code>export</code></td><td>Exporter toutes les données d'une personne en JSON</td><td>person_name</td></tr>
<tr><td><code>purge</code></td><td>Suppression en cascade complète (personne + faits + liens)</td><td>person_name</td></tr>
<tr><td><code>audit</code></td><td>Vérifier les faits auto-extraits (non vérifiés)</td><td>&mdash; (ou person_name)</td></tr>
<tr><td><code>confirm</code></td><td>Valider un fait auto-extrait (confiance à 100%)</td><td>fact_id</td></tr>
</tbody>
</table>

<h2>Paramètres</h2>
${configTable([
  ['action', 'string', '&mdash;', 'Action à effectuer (obligatoire)'],
  ['name', 'string', 'null', 'Nom de la personne (pour add, view, update, remove)'],
  ['id', 'integer', 'null', 'ID en base de données de la personne (pour update, remove)'],
  ['relationship', 'string', 'null', 'Type de relation : spouse, family, friend, coworker, acquaintance'],
  ['notes', 'string', 'null', 'Notes libres sur la personne'],
  ['communication_style', 'string', 'null', 'Style de communication : casual, formal, warm, etc.'],
  ['language', 'string', 'null', 'Langue préférée pour l\'interaction'],
  ['person_name', 'string', 'null', 'Nom de la personne (pour add_fact, link, export, purge, audit)'],
  ['category', 'string', 'null', 'Catégorie du fait : birthday, preference, interest, work, family, important_date, personality, gift_idea'],
  ['key', 'string', 'null', "Clé du fait (ex. : 'birthday', 'favorite_food')"],
  ['value', 'string', 'null', 'Valeur du fait'],
  ['platform_id', 'string', 'null', "ID qualifié par plateforme (ex. : 'slack:U123', 'telegram:456')"],
  ['display_name', 'string', 'null', 'Nom d\'affichage pour l\'identité de plateforme'],
  ['fact_id', 'integer', 'null', 'ID du fait (pour remove_fact, confirm)'],
])}

<h2>Activation</h2>
<p>Il existe deux façons d'activer l'intelligence relationnelle :</p>

<h3>Option 1 : Via le chat (recommandé)</h3>
<p>Dites simplement à votre bot de l'activer. Le paramètre est stocké en base de données et persiste entre les redémarrages.</p>
${codeBlock('You: "Enable people intelligence"\naidaemon: "People Intelligence enabled. I\'ll now remember contacts..."', 'text', 'chat')}

<h3>Option 2 : Via config.toml</h3>
<p>Définissez l'état initial dans votre fichier de configuration. Cette valeur est utilisée pour initialiser la base de données au premier lancement ; ensuite, le paramètre à l'exécution prend le dessus.</p>
${codeBlock('[people]\nenabled = true', 'toml', 'config.toml')}

<h2>Apprentissage organique</h2>
<p>Lorsque <code>auto_extract</code> est activé (par défaut), aidaemon apprend automatiquement des informations sur les personnes à partir des conversations lors de son cycle régulier de consolidation de la mémoire :</p>
<ul>
  <li>Détecte les mentions de personnes, leurs préférences, anniversaires et relations</li>
  <li>Crée des enregistrements de personnes et stocke les faits avec une confiance de 70 % (auto-extraits)</li>
  <li>Le propriétaire peut vérifier et confirmer les faits via les actions <code>audit</code> et <code>confirm</code></li>
</ul>

${callout('warn', 'Catégories restreintes', 'Les informations de santé, les détails financiers, les opinions politiques et les croyances religieuses ne sont <strong>jamais</strong> auto-extraits, même s\'ils sont mentionnés en conversation. Ceci est imposé par <code>restricted_categories</code>.')}

<h2>Tâches en arrière-plan</h2>
<p>Lorsqu'il est activé, aidaemon exécute des vérifications quotidiennes en arrière-plan :</p>
<ul>
  <li><strong>Élagage des faits obsolètes</strong> &mdash; supprime les faits auto-extraits non confirmés plus anciens que <code>fact_retention_days</code> (par défaut 180)</li>
  <li><strong>Rappels de dates à venir</strong> &mdash; détecte les anniversaires et dates importantes dans les 14 prochains jours</li>
  <li><strong>Suggestions de reprise de contact</strong> &mdash; signale les personnes non contactées depuis <code>reconnect_reminder_days</code> (par défaut 30)</li>
</ul>

<h2>Modèle de confidentialité</h2>
<table class="config-table">
<thead><tr><th>Contexte</th><th>Comportement</th></tr></thead>
<tbody>
<tr><td>DMs du propriétaire</td><td>Graphe complet des personnes injecté dans le prompt système (noms, faits, relations)</td></tr>
<tr><td>Non-propriétaire (lié)</td><td>Adaptation du style de communication uniquement (pas d'injection de faits vers d'autres utilisateurs)</td></tr>
<tr><td>Canaux publics</td><td>Aucun fait personnel injecté</td></tr>
</tbody>
</table>

<h2>Configuration</h2>
${codeBlock('[people]\nenabled = true\nauto_extract = true\nauto_extract_categories = ["birthday", "preference", "interest", "work", "family", "important_date"]\nrestricted_categories = ["health", "finance", "political", "religious"]\nfact_retention_days = 180\nreconnect_reminder_days = 30', 'toml', 'config.toml')}

${configTable([
  ['enabled', 'bool', 'false', 'État initial (peut être basculé à l\'exécution via le chat)'],
  ['auto_extract', 'bool', 'true', 'Apprendre automatiquement des faits sur les personnes à partir des conversations'],
  ['auto_extract_categories', 'string[]', '[...]', 'Catégories pouvant être auto-extraites'],
  ['restricted_categories', 'string[]', '[...]', 'Catégories jamais auto-extraites'],
  ['fact_retention_days', 'integer', '180', 'Jours avant l\'élagage des faits non confirmés'],
  ['reconnect_reminder_days', 'integer', '30', 'Jours d\'inactivité avant de suggérer une reprise de contact'],
])}
`
  },
  {
    slug: '/mcp',
    section: 'MCP',
    title: 'Présentation de MCP',
    description: 'Étendez aidaemon avec des serveurs Model Context Protocol pour l\'accès au système de fichiers, aux bases de données, aux APIs et plus encore.',
    content: () => `
<h1>Intégration MCP</h1>
<p class="lead">Étendez aidaemon avec n'importe quel serveur <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener">Model Context Protocol</a> pour ajouter l'accès au système de fichiers, aux bases de données, aux APIs et plus encore.</p>

<h2>Comment ça fonctionne</h2>
<ol>
  <li>aidaemon lance chaque serveur MCP configuré en tant que sous-processus</li>
  <li>Communique via JSON-RPC 2.0 sur stdin/stdout</li>
  <li>Appelle <code>tools/list</code> pour découvrir les outils disponibles</li>
  <li>Chaque outil découvert est encapsulé en tant qu'outil natif aidaemon (<code>Tool</code>)</li>
  <li>Le LLM peut appeler les outils MCP de la même manière que les outils intégrés</li>
</ol>

<h2>Détails du protocole</h2>
<ul>
  <li><strong>Version du protocole :</strong> 2024-11-05</li>
  <li><strong>Info client :</strong> name="aidaemon", version="0.1.0"</li>
  <li><strong>Transport :</strong> JSON délimité par lignes sur stdin/stdout</li>
  <li><strong>Initialisation :</strong> requête <code>initialize</code> → <code>notifications/initialized</code></li>
</ul>

<h2>Exemple</h2>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@anthropic/mcp-filesystem", "/home/user/documents"]

[mcp.sqlite]
command = "npx"
args = ["-y", "@anthropic/mcp-sqlite", "my-database.db"]

[mcp.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]`, 'toml', 'config.toml')}

${callout('info', 'Gestion des erreurs', 'Si un serveur MCP échoue au démarrage ou à l\'énumération des outils, l\'erreur est journalisée mais les autres serveurs et outils intégrés continuent de fonctionner.')}
`
  },
  {
    slug: '/mcp/configuration',
    section: 'MCP',
    title: 'Configuration des serveurs MCP',
    description: 'Configurez les serveurs MCP dans le fichier config.toml d\'aidaemon. Transport Stdio et SSE, variables d\'environnement et délais d\'expiration.',
    content: () => `
<h1>Configuration des serveurs MCP</h1>
<p class="lead">Chaque serveur MCP est défini comme une section nommée sous <code>[mcp]</code> dans config.toml.</p>

<h2>Format de configuration</h2>
${codeBlock(`[mcp.<server-name>]
command = "<executable>"
args = ["arg1", "arg2", ...]`, 'toml')}

${configTable([
  ['command', 'string', '—', 'Exécutable ou script pour lancer le serveur MCP'],
  ['args', 'array', '[]', 'Arguments passés à la commande'],
])}

<h2>Processus de découverte</h2>
<ol>
  <li>Pour chaque section <code>[mcp.*]</code>, lance le processus avec la commande et les arguments configurés</li>
  <li>Initialise la connexion JSON-RPC (handshake du protocole)</li>
  <li>Appelle <code>tools/list</code> pour énumérer les outils disponibles</li>
  <li>Encapsule le nom, la description et le schéma d'entrée de chaque outil en tant qu'outil natif (Tool)</li>
  <li>Journalise les erreurs par serveur sans échec global</li>
</ol>

<h2>Exemples</h2>

<h3>Accès au système de fichiers</h3>
${codeBlock(`[mcp.filesystem]
command = "npx"
args = ["-y", "@anthropic/mcp-filesystem", "/home/user/projects"]`, 'toml')}

<h3>Recherche web</h3>
${codeBlock(`[mcp.brave-search]
command = "npx"
args = ["-y", "@anthropic/mcp-brave-search"]`, 'toml')}

<h3>Serveur Python personnalisé</h3>
${codeBlock(`[mcp.my-server]
command = "python3"
args = ["/path/to/my_mcp_server.py"]`, 'toml')}

${callout('info', 'Journalisation Stderr', 'La sortie stderr du serveur MCP est capturée et journalisée par aidaemon pour le débogage. Consultez les journaux du démon si un serveur ne fonctionne pas.')}

<h2>Détection de menaces</h2>
<p>aidaemon effectue une détection de menaces en mode audit sur les appels d'outils MCP. Les motifs suspects sont journalisés mais <strong>ne bloquent pas l'exécution</strong>.</p>

<h3>Motifs d'arguments suspects</h3>
<ul>
  <li><strong>Accès fichiers :</strong> <code>/etc/passwd</code>, <code>/etc/shadow</code>, <code>.ssh/</code>, <code>.env</code></li>
  <li><strong>Configuration/secrets :</strong> <code>config.toml</code>, <code>aidaemon.db</code>, <code>api_key</code>, <code>bot_token</code>, <code>encryption_key</code></li>
  <li><strong>Réseau :</strong> <code>curl</code>, <code>wget</code>, <code>nc</code>, <code>base64</code></li>
  <li><strong>Exécution de code :</strong> <code>eval(</code>, <code>exec(</code>, <code>| sh</code>, <code>| bash</code></li>
  <li><strong>Destructif :</strong> <code>; rm </code>, <code>chmod 777</code></li>
</ul>

<h3>Motifs de sortie suspects</h3>
<ul>
  <li>Clés API potentielles : préfixes <code>sk-</code>, <code>ghp_</code></li>
  <li>Clés privées : <code>-----BEGIN</code>, <code>PRIVATE KEY</code></li>
  <li>Termes sensibles : <code>password</code>, <code>bot_token</code></li>
</ul>

${callout('warn', 'Audit uniquement', 'La détection de menaces est informative — elle journalise des avertissements mais ne bloque pas l\'exécution des outils. Consultez les journaux de votre démon pour tout motif signalé.')}
`
  },
  {
    slug: '/triggers',
    section: 'Triggers',
    title: 'Déclencheurs email',
    description: 'Surveillez les boîtes de réception email avec IMAP IDLE et déclenchez automatiquement l\'agent aidaemon sur les nouveaux messages.',
    content: () => `
<h1>Déclencheurs email</h1>
<p class="lead">Surveillez votre boîte de réception avec IMAP IDLE et déclenchez l'agent à la réception de nouveaux emails.</p>

<h2>Comment ça fonctionne</h2>
<ol>
  <li>aidaemon se connecte au serveur IMAP configuré avec TLS</li>
  <li>Sélectionne le dossier configuré (par défaut : INBOX)</li>
  <li>Passe en mode IMAP IDLE — une connexion persistante qui attend les nouveaux messages</li>
  <li>Lorsqu'un nouvel email arrive, récupère l'enveloppe (sujet, expéditeur)</li>
  <li>Crée un Event et le diffuse via le bus d'événements interne</li>
  <li>L'agent traite l'événement et envoie une notification via Telegram</li>
</ol>

<h2>Configuration</h2>
${codeBlock(`[triggers.email]
host = "imap.gmail.com"
port = 993
username = "you@gmail.com"
password = "your-app-password"
folder = "INBOX"`, 'toml', 'config.toml')}

${callout('warn', 'Mots de passe d\'application Gmail', 'Pour Gmail avec la 2FA, générez un mot de passe spécifique à l\'application sur <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener">myaccount.google.com/apppasswords</a>.')}

<h2>Format de l'événement</h2>
${codeBlock(`Event {
    source: "email",
    session_id: "email_trigger",
    content: "New email from sender@example.com: Subject line here"
}`, 'rust')}

<h2>Bus d'événements</h2>
<p>Les déclencheurs utilisent un canal broadcast Tokio pour transmettre les événements. L'agent écoute côté récepteur et traite chaque événement comme un nouveau message dans sa propre session.</p>

${callout('danger', 'Sessions non fiables', 'Les sessions de déclencheurs email sont marquées comme <strong>non fiables</strong>. Toutes les commandes terminal dans ces sessions nécessitent une approbation explicite, quelle que soit la liste blanche allowed_prefixes.')}

<h2>Reconnexion</h2>
<p>Si la connexion IMAP est interrompue, aidaemon attend 30 secondes et se reconnecte automatiquement.</p>
`
  },
  {
    slug: '/skills',
    section: 'Skills',
    title: 'Système de compétences',
    description: 'Enrichissement dynamique des prompts via des fichiers markdown. Les compétences injectent des instructions contextuelles basées sur des déclencheurs par mots-clés.',
    content: () => `
<h1>Système de compétences</h1>
<p class="lead">Enrichissement dynamique des prompts via des fichiers markdown. Les compétences injectent des instructions contextuelles lorsqu'elles sont déclenchées par des mots-clés dans les messages de l'utilisateur.</p>

<h2>Configuration</h2>
${codeBlock(`[skills]
dir = "skills"
enabled = true`, 'toml', 'config.toml')}

<h2>Format des fichiers de compétences</h2>
<p>Les compétences sont des fichiers markdown avec un frontmatter de type YAML, stockés dans le répertoire des compétences :</p>
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

<h2>Champs du frontmatter</h2>
${configTable([
  ['name', 'string', '—', 'Nom d\'affichage de la compétence'],
  ['description', 'string', '—', 'Brève description (affichée dans la liste "Available Skills")'],
  ['triggers', 'string', '—', 'Mots-clés séparés par des virgules qui activent la compétence'],
])}

<h2>Correspondance hybride</h2>
<p>L'activation des compétences utilise un processus en deux étapes :</p>
<ol>
  <li><strong>Correspondance par motifs</strong> — recherche de mots-clés en mots entiers, insensible à la casse. Si un déclencheur apparaît comme mot complet dans le message de l'utilisateur, la compétence est candidate.</li>
  <li><strong>Confirmation par LLM</strong> — le modèle rapide vérifie si chaque compétence candidate est réellement pertinente par rapport à l'intention de l'utilisateur. Cela empêche les activations erronées dues à des correspondances de mots-clés fortuites.</li>
</ol>
<p>L'étape de confirmation est <strong>permissive en cas d'échec</strong> : si l'appel au LLM échoue ou expire, toutes les compétences candidates par correspondance de motifs sont activées.</p>

<h2>Injection dans le prompt système</h2>
<p>Lorsque les compétences sont chargées, le prompt système est enrichi avec :</p>
<ol>
  <li><strong>Compétences disponibles</strong> — liste tous les noms et descriptions des compétences</li>
  <li><strong>Compétences actives</strong> — corps complet de chaque compétence correspondante</li>
  <li><strong>Faits connus</strong> — faits stockés (injectés sous les compétences)</li>
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

<h2>Compétences dynamiques</h2>
<p>Au-delà des compétences statiques du système de fichiers, aidaemon prend en charge la gestion des compétences à l'exécution via l'outil <code>manage_skills</code> et des registres optionnels.</p>

<h3>Actions de l'outil manage_skills</h3>
<table class="config-table">
<thead><tr><th>Action</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>add</code></td><td>Récupérer une compétence depuis une URL</td></tr>
<tr><td><code>add_inline</code></td><td>Analyser du contenu markdown brut comme compétence</td></tr>
<tr><td><code>list</code></td><td>Afficher toutes les compétences chargées avec leurs métadonnées</td></tr>
<tr><td><code>remove</code></td><td>Supprimer une compétence par nom</td></tr>
<tr><td><code>enable</code> / <code>disable</code></td><td>Activer ou désactiver une compétence</td></tr>
<tr><td><code>browse</code></td><td>Rechercher dans les registres configurés</td></tr>
<tr><td><code>install</code></td><td>Installer depuis un registre</td></tr>
<tr><td><code>update</code></td><td>Re-récupérer la compétence depuis l'URL source</td></tr>
</tbody>
</table>

<h3>Promotion automatique</h3>
<p>Une tâche en arrière-plan s'exécute toutes les 12 heures, évaluant les procédures fréquemment utilisées pour une promotion automatique en compétences réutilisables.</p>
`
  },
  {
    slug: '/scheduler',
    section: 'Scheduler',
    title: 'Tâches Planifiées',
    description: 'Créez des tâches planifiées récurrentes ou ponctuelles avec du langage naturel ou des expressions cron dans aidaemon.',
    content: () => `
<h1>Tâches Planifiées</h1>
<p class="lead">Créez des tâches récurrentes ou ponctuelles avec du langage naturel ou des expressions cron. L'agent exécute le prompt de la tâche selon le planning.</p>

<h2>Nom de l'Outil</h2>
<p><code>scheduler</code></p>

<h2>Actions</h2>
<table class="config-table">
<thead><tr><th>Action</th><th>Paramètres Requis</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>create</code></td><td>name, schedule, prompt</td><td>Créer une nouvelle tâche planifiée</td></tr>
<tr><td><code>list</code></td><td>—</td><td>Lister toutes les tâches avec statut et prochaine exécution</td></tr>
<tr><td><code>delete</code></td><td>id</td><td>Supprimer une tâche par UUID</td></tr>
<tr><td><code>pause</code></td><td>id</td><td>Mettre en pause une tâche (arrête le déclenchement)</td></tr>
<tr><td><code>resume</code></td><td>id</td><td>Reprendre une tâche en pause (recalcule la prochaine exécution)</td></tr>
</tbody>
</table>

<h2>Paramètres de Création</h2>
${configTable([
  ['name', 'string', '—', 'Libellé lisible de la tâche'],
  ['schedule', 'string', '—', 'Langage naturel ou expression cron à 5 champs'],
  ['prompt', 'string', '—', 'Ce que l\'agent doit faire lorsque la tâche se déclenche'],
  ['oneshot', 'bool', 'false', 'Se déclenche une fois puis suppression automatique'],
  ['trusted', 'bool', 'false', 'Exécuter avec autonomie complète (pas d\'approbation terminal nécessaire)'],
])}

<h2>Plannings en Langage Naturel</h2>
<p>Le planificateur analyse les modèles courants en expressions cron :</p>

<table class="config-table">
<thead><tr><th>Entrée</th><th>Cron</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>hourly</code></td><td><code>0 * * * *</code></td><td>Toutes les heures à :00</td></tr>
<tr><td><code>daily</code></td><td><code>0 0 * * *</code></td><td>Tous les jours à minuit</td></tr>
<tr><td><code>weekly</code></td><td><code>0 0 * * 0</code></td><td>Tous les dimanches à minuit</td></tr>
<tr><td><code>monthly</code></td><td><code>0 0 1 * *</code></td><td>Le premier du mois</td></tr>
<tr><td><code>every 5m</code></td><td><code>*/5 * * * *</code></td><td>Toutes les 5 minutes</td></tr>
<tr><td><code>every 2h</code></td><td><code>0 */2 * * *</code></td><td>Toutes les 2 heures</td></tr>
<tr><td><code>daily at 9am</code></td><td><code>0 9 * * *</code></td><td>Tous les jours à 9h00</td></tr>
<tr><td><code>daily at 14:30</code></td><td><code>30 14 * * *</code></td><td>Tous les jours à 14h30</td></tr>
<tr><td><code>weekdays at 8:30</code></td><td><code>30 8 * * 1-5</code></td><td>Lun-Ven à 8h30</td></tr>
<tr><td><code>weekends at 10am</code></td><td><code>0 10 * * 0,6</code></td><td>Sam-Dim à 10h00</td></tr>
<tr><td><code>in 2h</code></td><td>(absolu calculé)</td><td>Ponctuel, se déclenche une fois dans 2 heures</td></tr>
<tr><td><code>in 30m</code></td><td>(absolu calculé)</td><td>Ponctuel, se déclenche une fois dans 30 minutes</td></tr>
</tbody>
</table>

<p>Les expressions cron standard à 5 champs sont également acceptées directement (par ex., <code>0 9 * * 1-5</code>).</p>

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

<h2>Stockage des Tâches</h2>
<p>Les tâches sont persistées dans SQLite (table <code>scheduled_tasks</code>). Les tâches définies dans la configuration sont synchronisées au démarrage — les tâches supprimées sont nettoyées automatiquement. Les tâches créées via l'outil persistent indéfiniment.</p>

<h2>Tâches Manquées</h2>
<p>Au démarrage, le planificateur vérifie les tâches qui auraient dû se déclencher pendant que le daemon était arrêté. Les tâches manquées sont déclenchées immédiatement lors de la récupération.</p>

${callout('warn', 'Trusted vs Untrusted', 'Les tâches trusted s\'exécutent avec un accès terminal complet (pas d\'approbation nécessaire). Les tâches untrusted (par défaut) nécessitent une approbation pour toute commande terminal, comme les sessions déclenchées par email.')}
`
  },
  {
    slug: '/router',
    section: 'Router',
    title: 'Routage de Modèles',
    description: 'Routage automatique par niveau de modèle : Fast, Primary ou Smart. Heuristiques par mots-clés et classification par longueur de message.',
    content: () => `
<h1>Routage de Modèles</h1>
<p class="lead">La sélection automatique de modèle par niveau route chaque requête vers le modèle le plus approprié : Fast, Primary ou Smart.</p>

<h2>Niveaux</h2>
<table class="config-table">
<thead><tr><th>Niveau</th><th>Cas d'utilisation</th><th>Modèle Typique</th></tr></thead>
<tbody>
<tr><td><strong>Fast</strong></td><td>Salutations simples, oui/non, recherches courtes</td><td>gemini-2.5-flash-lite, gpt-4o-mini, claude-haiku-4</td></tr>
<tr><td><strong>Primary</strong></td><td>Conversation générale, tâches modérées</td><td>gemini-3-flash-preview, gpt-4o, claude-sonnet-4</td></tr>
<tr><td><strong>Smart</strong></td><td>Raisonnement complexe, génération de code, analyse</td><td>gemini-3-pro-preview, o1-preview, claude-opus-4</td></tr>
</tbody>
</table>

<h2>Règles de Classification</h2>

<h3>Niveau Smart (tâches complexes)</h3>
<p>Une requête est classée Smart si l'une de ces conditions est vraie :</p>
<ul>
  <li>Contient un bloc de code (<code>\`\`\`</code>)</li>
  <li>Longueur du message &gt; 500 caractères</li>
  <li>Contient 3+ points d'interrogation</li>
  <li>Contient des mots-clés : <em>implement, refactor, debug, analyze, step by step, write code, architecture, optimize, algorithm, explain how, write a, build a, create a function, design, compare and contrast, walk me through, troubleshoot, review this, fix this, rewrite</em></li>
</ul>

<h3>Niveau Fast (requêtes simples)</h3>
<p>Une requête est classée Fast si l'une de ces conditions est vraie :</p>
<ul>
  <li>Correspondance exacte de salutations/accusés de réception : <em>hi, hello, hey, thanks, ok, yes, no, sure, bye, goodbye, ty, cool, nice, great, awesome, lol, haha, wow</em> (insensible à la casse)</li>
  <li>Message d'un seul mot</li>
  <li>Message court : &lt;20 caractères ET &le;3 mots</li>
  <li>Préfixe de recherche simple (<em>what is, who is, define, when is, where is</em>) + &le;6 mots au total</li>
</ul>

<h3>Niveau Primary (par défaut)</h3>
<p>Tout le reste est dirigé vers le niveau Primary.</p>

<h2>Désactiver le Routage Automatique</h2>
<ul>
  <li>Si les trois niveaux de modèle sont identiques, le routage est automatiquement désactivé</li>
  <li>Envoyer <code>/model &lt;name&gt;</code> dans Telegram désactive le routage (forçage manuel)</li>
  <li>Envoyer <code>/auto</code> réactive le routage automatique</li>
</ul>
`
  },
  {
    slug: '/cost-tracking',
    section: 'Cost Tracking',
    title: 'Utilisation des Tokens et Budgets',
    description: 'Suivez la consommation de tokens par modèle et session. Définissez des budgets quotidiens et consultez les statistiques via la commande /cost.',
    content: () => `
<h1>Utilisation des Tokens &amp; Suivi des Coûts</h1>
<p class="lead">Suivez la consommation de tokens par modèle et session. Définissez des budgets quotidiens pour contrôler les dépenses. Consultez les statistiques depuis Telegram avec <code>/cost</code>.</p>

<h2>Comment Ça Fonctionne</h2>
<ol>
  <li>Chaque appel LLM enregistre les tokens d'entrée et de sortie dans la table SQLite <code>token_usage</code></li>
  <li>Chaque enregistrement inclut : nom du modèle, ID de session, nombres de tokens et horodatage</li>
  <li>Optionnellement, définissez un budget quotidien de tokens qui bloque les appels LLM une fois dépassé</li>
  <li>Le budget se réinitialise automatiquement à minuit UTC</li>
</ol>

<h2>Configuration</h2>
${configTable([
  ['daily_token_budget', 'integer', 'null', 'Nombre maximum total de tokens (entrée + sortie) par jour. Null = illimité.'],
])}

${codeBlock(`[state]
daily_token_budget = 1000000  # 1M tokens per day`, 'toml', 'config.toml')}

${callout('info', 'Portée du Budget', 'Le budget quotidien est global — il compte tous les tokens de toutes les sessions et tous les modèles. Lorsqu\'il est dépassé, les appels LLM retournent une erreur jusqu\'à minuit UTC.')}

<h2>Commande Telegram /cost</h2>
<p>Envoyez <code>/cost</code> dans Telegram pour voir les statistiques d'utilisation :</p>
${codeBlock(`Token usage (last 24h):
  Input:  12,450 tokens
  Output: 8,230 tokens

Token usage (last 7d):
  Input:  87,320 tokens
  Output: 52,180 tokens

Top models (7d):
  gemini-3-flash-preview: 98,400 tokens
  gemini-3-pro-preview: 41,100 tokens`, 'text')}

<h2>Schéma de la Base de Données</h2>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Clé primaire auto-incrémentée'],
  ['session_id', 'TEXT', '—', 'Quelle session utilisateur/chat a effectué l\'appel'],
  ['model', 'TEXT', '—', 'Quel modèle LLM a été utilisé'],
  ['input_tokens', 'INTEGER', '—', 'Tokens envoyés au modèle'],
  ['output_tokens', 'INTEGER', '—', 'Tokens générés par le modèle'],
  ['created_at', 'TEXT', 'now', 'Horodatage UTC de l\'appel'],
])}

<h2>Ce Qui Est Suivi</h2>
<ul>
  <li>Tokens d'entrée (contexte + message utilisateur) par appel LLM</li>
  <li>Tokens de sortie (réponse du modèle) par appel LLM</li>
  <li>Nom du modèle pour les répartitions par modèle</li>
  <li>ID de session pour le suivi par utilisateur</li>
  <li>Horodatage pour les requêtes par fenêtre temporelle (24h, 7j)</li>
</ul>
`
  },
  {
    slug: '/architecture',
    section: 'Architecture',
    title: 'Boucle Agent et Récupération d\'Erreurs',
    description: 'La boucle agentique aidaemon : gestion des messages, appels LLM, exécution des outils, détection de blocage et récupération d\'erreurs.',
    content: () => `
<h1>Boucle Agent &amp; Récupération d'Erreurs</h1>
<p class="lead">La boucle agentique principale : recevoir un message, appeler le LLM, exécuter les outils, itérer, répondre.</p>

<h2>Flux de la Boucle Agent</h2>
<ol>
  <li><strong>Persister le message utilisateur</strong> — stocké avec un score d'importance</li>
  <li><strong>Auto-router le modèle</strong> — classifier la complexité de la requête (si non forcé manuellement)</li>
  <li><strong>Construire le prompt système</strong> — prompt de base + compétences correspondantes + faits connus</li>
  <li><strong>Récupérer le contexte</strong> — récupération tri-hybride de la mémoire</li>
  <li><strong>Itérer</strong> (jusqu'à <code>max_iterations</code>) :
    <ul>
      <li>Collecter les anciens souvenirs épinglés + messages récents (dédupliqués)</li>
      <li>Construire la liste de messages au format OpenAI</li>
      <li>Appeler le LLM avec récupération d'erreur classifiée</li>
      <li>Si appels d'outils → exécuter chacun, persister les résultats, continuer la boucle</li>
      <li>Si pas d'appels d'outils OU dernière itération → retourner la réponse texte</li>
    </ul>
  </li>
  <li><strong>Nombre max d'itérations atteint</strong> → retourner un message de timeout</li>
</ol>

<h2>Budget d'Itérations Dynamique</h2>
<p>L'agent dispose d'un outil intégré <code>request_more_iterations</code> qui étend le budget de la boucle lorsque la limite actuelle est insuffisante :</p>
<ul>
  <li>Étend le budget de <strong>10 itérations</strong> par appel</li>
  <li>Un plafond strict empêche l'extension illimitée (typiquement 25 au total)</li>
  <li>Nécessite un paramètre <code>reason</code> expliquant ce qui reste à faire</li>
  <li>Utilisé lorsque l'agent a un plan clair mais manquerait d'itérations en cours de tâche</li>
</ul>

<h2>Stratégie de Récupération d'Erreurs</h2>
<p>La méthode <code>call_llm_with_recovery</code> classifie les erreurs et réagit en conséquence :</p>

<table class="config-table">
<thead><tr><th>Type d'Erreur</th><th>Stratégie</th></tr></thead>
<tbody>
<tr><td><strong>Auth / Billing</strong></td><td>Retourner immédiatement à l'utilisateur — pas de nouvelle tentative</td></tr>
<tr><td><strong>Rate Limit</strong></td><td>Attendre <code>retry_after_secs</code> (plafonné à 60s), réessayer une fois</td></tr>
<tr><td><strong>Timeout / Network / Server Error</strong></td><td>Attendre 2s, réessayer une fois ; en cas d'échec, basculer vers le modèle précédent</td></tr>
<tr><td><strong>Not Found (bad model)</strong></td><td>Basculer immédiatement vers le modèle de secours</td></tr>
<tr><td><strong>Unknown</strong></td><td>Propager comme erreur</td></tr>
</tbody>
</table>

${callout('info', 'Last Known Good', 'Après chaque appel LLM réussi, la configuration actuelle est sauvegardée en tant que <code>config.toml.lastgood</code>. Cela permet la récupération automatique après des changements de configuration incorrects.')}

<h2>Correction de l'Ordre des Messages</h2>
<p>Pour satisfaire les contraintes des fournisseurs Gemini, Anthropic et OpenAI, aidaemon exécute une correction en trois passes sur l'historique des messages avant chaque appel LLM :</p>
<ol>
  <li><strong>Passe 1 :</strong> Fusionner les messages consécutifs du même rôle (combine les tableaux tool_calls)</li>
  <li><strong>Passe 2 :</strong> Supprimer les résultats d'outils orphelins (pas de tool_call assistant correspondant) et retirer les tool_calls orphelins (pas de résultat d'outil correspondant)</li>
  <li><strong>Passe 3 :</strong> Fusionner à nouveau après que la suppression des orphelins peut créer de nouveaux messages consécutifs du même rôle</li>
</ol>

<h2>Exécution des Outils</h2>
<p>Pendant la boucle, chaque appel d'outil reçoit :</p>
<ul>
  <li><code>_session_id</code> — injecté automatiquement pour le suivi de session</li>
  <li><code>_untrusted_source</code> — indicateur défini pour les sessions provenant de déclencheurs</li>
</ul>

<h2>Détection de Blocage &amp; Répétition</h2>
<p>La boucle agent inclut des protections contre les blocages :</p>
<ul>
  <li><strong>Détection de blocage</strong> &mdash; si le même outil est appelé 3+ fois consécutivement avec des arguments similaires, la boucle s'interrompt</li>
  <li><strong>Détection de répétition</strong> &mdash; détecte le texte de réponse répété et force une interruption</li>
  <li><strong>Limite stricte d'itérations</strong> &mdash; par défaut 10, extensible à 25 via <code>request_more_iterations</code></li>
</ul>

<h2>Types de Sessions</h2>
<table class="config-table">
<thead><tr><th>Type de Session</th><th>Format</th><th>Trusted</th></tr></thead>
<tbody>
<tr><td>Chat Telegram</td><td>ID du chat en chaîne</td><td>Oui</td></tr>
<tr><td>Canal Slack</td><td><code>slack:{channel_id}</code> ou <code>slack:{channel_id}:{thread_ts}</code></td><td>Oui</td></tr>
<tr><td>Canal Discord</td><td><code>discord:{channel_id}</code></td><td>Oui</td></tr>
<tr><td>Déclencheur email</td><td><code>email_trigger</code></td><td>Non</td></tr>
<tr><td>Déclencheur d'événement</td><td><code>event_{uuid}</code></td><td>Non</td></tr>
<tr><td>Sous-agent</td><td><code>sub-{depth}-{uuid}</code></td><td>Hérité</td></tr>
</tbody>
</table>
`
  },
  {
    slug: '/architecture/state',
    section: 'Architecture',
    title: 'Gestion d\'État et Mémoire',
    description: 'Persistance sauvegardée en SQLite avec recherche sémantique via embeddings, récupération tri-hybride et couches de mémoire.',
    content: () => `
<h1>Gestion d'État &amp; Mémoire</h1>
<p class="lead">Persistance sauvegardée en SQLite avec mémoire de travail en mémoire vive, recherche sémantique via embeddings et récupération tri-hybride.</p>

${callout('info', 'Mise à jour v0.9.x', 'La persistance principale des conversations utilise maintenant la table <code>events</code>. Les anciennes données de <code>messages</code> sont migrées vers events pendant la mise à jour.')}

<h2>Schéma de la Base de Données</h2>

<h3>Table messages</h3>
${configTable([
  ['id', 'TEXT PK', '—', 'Clé primaire UUID'],
  ['session_id', 'TEXT', '—', 'Identifiant de session (indexé)'],
  ['role', 'TEXT', '—', 'user, assistant ou tool'],
  ['content', 'TEXT', 'null', 'Contenu texte du message'],
  ['tool_call_id', 'TEXT', 'null', 'ID pour les messages de résultat d\'outil'],
  ['tool_name', 'TEXT', 'null', 'Nom de l\'outil pour les messages d\'outil'],
  ['tool_calls_json', 'TEXT', 'null', 'Tableau JSON des appels d\'outil'],
  ['created_at', 'TEXT', '—', 'Horodatage RFC3339'],
  ['importance', 'REAL', '0.5', 'Score d\'importance (0.0–1.0)'],
  ['embedding', 'BLOB', 'null', 'Embedding encodé en JSON Vec&lt;f32&gt;'],
  ['embedding_error', 'TEXT', 'null', 'Message d\'erreur si l\'embedding a échoué'],
  ['consolidated_at', 'TEXT', 'null', 'Horodatage de consolidation de la mémoire'],
])}

<h3>Table facts</h3>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Clé primaire auto-incrémentée'],
  ['category', 'TEXT', '—', 'Catégorie de regroupement'],
  ['key', 'TEXT', '—', 'Clé du fait (unique par catégorie)'],
  ['value', 'TEXT', '—', 'Contenu du fait'],
  ['source', 'TEXT', '""', 'Qui l\'a stocké : "agent" ou "user"'],
  ['created_at', 'TEXT', '—', 'Horodatage RFC3339'],
  ['updated_at', 'TEXT', '—', 'Horodatage RFC3339'],
])}

<h3>Table macros</h3>
${configTable([
  ['id', 'INTEGER PK', 'auto', 'Clé primaire auto-incrémentée'],
  ['trigger_tool', 'TEXT', '&mdash;', 'Outil qui déclenche la macro'],
  ['trigger_args_pattern', 'TEXT', 'null', 'Modèle d\'arguments à correspondre'],
  ['next_tool', 'TEXT', '&mdash;', 'Outil à chaîner ensuite'],
  ['next_args', 'TEXT', '&mdash;', 'Arguments pour l\'outil chaîné'],
  ['confidence', 'REAL', '0.0', 'Score de confiance de la macro'],
  ['used_count', 'INTEGER', '0', 'Nombre de fois que la macro a été utilisée'],
  ['created_at', 'TEXT', '&mdash;', 'Horodatage RFC3339'],
  ['updated_at', 'TEXT', '&mdash;', 'Horodatage RFC3339'],
])}

<h3>Table scheduled_tasks</h3>
${configTable([
  ['id', 'TEXT PK', '—', 'Clé primaire UUID'],
  ['name', 'TEXT', '—', 'Libellé lisible de la tâche'],
  ['cron_expr', 'TEXT', '—', 'Expression cron à 5 champs calculée'],
  ['original_schedule', 'TEXT', '—', 'Entrée utilisateur (langage naturel ou cron)'],
  ['prompt', 'TEXT', '—', 'Prompt de l\'agent à exécuter selon le planning'],
  ['source', 'TEXT', '—', '"tool" (créé via l\'outil) ou "config" (depuis config.toml)'],
  ['is_oneshot', 'INTEGER', '0', 'Se déclenche une fois puis suppression automatique'],
  ['is_paused', 'INTEGER', '0', 'Les tâches en pause ne se déclenchent pas'],
  ['is_trusted', 'INTEGER', '0', 'Les tâches trusted passent l\'approbation terminal'],
  ['next_run_at', 'TEXT', '—', 'Horodatage RFC3339 de la prochaine exécution'],
  ['last_run_at', 'TEXT', 'null', 'Horodatage RFC3339 de la dernière exécution'],
  ['created_at', 'TEXT', '—', 'Horodatage RFC3339'],
  ['updated_at', 'TEXT', '—', 'Horodatage RFC3339'],
])}

<h3>Table terminal_allowed_prefixes</h3>
${configTable([
  ['prefix', 'TEXT PK', '—', 'Préfixe de commande persisté depuis les approbations "Allow Always"'],
])}

<h2>Mémoire de Travail</h2>
<p>Un <code>HashMap&lt;String, VecDeque&lt;Message&gt;&gt;</code> en mémoire par session, plafonné à <code>working_memory_cap</code> (par défaut 50). Évite les accès base de données pour l'historique de conversation récent.</p>

<h2>Récupération Tri-Hybride</h2>
<p>La méthode <code>get_context</code> combine trois stratégies de récupération :</p>

<table class="config-table">
<thead><tr><th>Stratégie</th><th>Source</th><th>Limite</th><th>Objectif</th></tr></thead>
<tbody>
<tr><td><strong>Récence</strong></td><td>N derniers messages</td><td>10</td><td>Continuité conversationnelle</td></tr>
<tr><td><strong>Saillance</strong></td><td>importance &ge; 0.8</td><td>5</td><td>Souvenirs critiques marqués</td></tr>
<tr><td><strong>Pertinence</strong></td><td>Similarité vectorielle &gt; 0.65</td><td>5</td><td>Recherche sémantique via embeddings</td></tr>
</tbody>
</table>

<p>Les résultats sont dédupliqués par ID de message avant d'être inclus dans le contexte.</p>

<h2>Service d'Embedding</h2>
<ul>
  <li><strong>Modèle :</strong> AllMiniLML6V2 (via fastembed)</li>
  <li>S'exécute en arrière-plan — génère les embeddings des nouveaux messages après leur ajout</li>
  <li>Active la branche pertinence de la récupération tri-hybride</li>
</ul>

<h2>Consolidation de la Mémoire</h2>
<p>Une tâche en arrière-plan s'exécute toutes les <code>consolidation_interval_hours</code> (par défaut 6). Elle compresse les anciennes conversations en résumés à l'aide du modèle fast, réduisant le stockage et l'utilisation de la fenêtre de contexte.</p>

<h2>Scoring d'Importance</h2>
<table class="config-table">
<thead><tr><th>Rôle</th><th>Score par Défaut</th></tr></thead>
<tbody>
<tr><td>Message utilisateur</td><td>0.5</td></tr>
<tr><td>Réponse assistant</td><td>0.5</td></tr>
<tr><td>Sortie d'outil</td><td>0.3</td></tr>
<tr><td>Message système</td><td>0.1</td></tr>
</tbody>
</table>

<h2>Pool de Connexions</h2>
<ul>
  <li>Pool SQLite : max 5 connexions</li>
  <li>Mode journal : WAL (Write-Ahead Logging) pour les lectures concurrentes</li>
  <li>Crée automatiquement la base de données et les tables si absentes</li>
</ul>
`
  },
  {
    slug: '/service-install',
    section: 'Service',
    title: 'Configuration systemd et launchd',
    description: 'Installez aidaemon en tant que service systemd ou launchd qui démarre au boot et s\'exécute en continu.',
    content: () => `
<h1>Installation en tant que Service</h1>
<p class="lead">Installez aidaemon en tant que service système qui démarre au boot et s'exécute en permanence.</p>

<h2>Commande d'Installation</h2>
${codeBlock(`./aidaemon install-service`, 'bash')}

<p>Cela détecte automatiquement la plateforme et génère la configuration de service appropriée.</p>

<h2>Linux (systemd)</h2>
<p>Crée <code>/etc/systemd/system/aidaemon.service</code> :</p>
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

<p>Puis active et démarre le service :</p>
${codeBlock(`sudo systemctl daemon-reload
sudo systemctl enable --now aidaemon`, 'bash')}

<h2>macOS (launchd)</h2>
<p>Crée <code>$HOME/Library/LaunchAgents/ai.aidaemon.plist</code> :</p>
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

<p>Puis charge le service :</p>
${codeBlock(`launchctl load ~/Library/LaunchAgents/ai.aidaemon.plist`, 'bash')}

${callout('warning', 'Empêcher la Mise en Veille macOS', 'macOS peut suspendre les processus en arrière-plan lorsque le système se met en veille. Pour garder aidaemon en fonctionnement continu, utilisez <code>caffeinate</code> :<br><br><code>caffeinate -s aidaemon</code><br><br>L\'option <code>-s</code> empêche la mise en veille tant que le processus est en cours. Vous pouvez aussi utiliser <code>caffeinate -i</code> pour empêcher la mise en veille d\'inactivité sans garder l\'écran allumé. Si vous exécutez en tant que service launchd, ajoutez <code>caffeinate -s</code> avant le chemin du binaire dans les <code>ProgramArguments</code> de votre plist.')}

<h2>Vérification de Santé</h2>
<p>Une fois en fonctionnement en tant que service, vérifiez avec :</p>
${codeBlock(`curl http://127.0.0.1:8080/health
# {"status": "ok"}`, 'bash')}

<p>Le endpoint de santé est servi par axum sur le <code>daemon.health_bind:daemon.health_port</code> configuré.</p>
`
  },
  {
    slug: '/event-sourcing',
    section: 'Event Sourcing',
    title: 'Système d\'Événements',
    description: 'Journal d\'événements immuable pour toutes les actions de l\'agent. Consolidation quotidienne en faits et procédures. Contexte de session.',
    content: () => `
<h1>Event Sourcing</h1>
<p class="lead">Chaque action de l'agent est enregistrée comme un événement immuable. Les événements sont la source unique de vérité pour ce qui s'est passé pendant une session.</p>

<h2>Types d'Événements</h2>
<p>Le système suit 16 types d'événements répartis en 6 catégories :</p>

<table class="config-table">
<thead><tr><th>Catégorie</th><th>Type d'Événement</th><th>Description</th></tr></thead>
<tbody>
<tr><td rowspan="2"><strong>Session</strong></td><td><code>SessionStart</code></td><td>Début d'une nouvelle session de conversation</td></tr>
<tr><td><code>SessionEnd</code></td><td>Session terminée</td></tr>
<tr><td rowspan="2"><strong>Conversation</strong></td><td><code>UserMessage</code></td><td>L'utilisateur envoie un message</td></tr>
<tr><td><code>AssistantResponse</code></td><td>L'agent envoie une réponse</td></tr>
<tr><td rowspan="2"><strong>Tools</strong></td><td><code>ToolCall</code></td><td>L'agent invoque un outil</td></tr>
<tr><td><code>ToolResult</code></td><td>L'exécution de l'outil se termine</td></tr>
<tr><td><strong>Thinking</strong></td><td><code>ThinkingStart</code></td><td>L'agent commence à raisonner</td></tr>
<tr><td rowspan="2"><strong>Tasks</strong></td><td><code>TaskStart</code></td><td>L'agent commence une tâche</td></tr>
<tr><td><code>TaskEnd</code></td><td>La tâche se termine (avec statut)</td></tr>
<tr><td><strong>Errors</strong></td><td><code>Error</code></td><td>Une erreur survient pendant le traitement</td></tr>
<tr><td rowspan="2"><strong>Sub-Agents</strong></td><td><code>SubAgentSpawn</code></td><td>Un sous-agent est créé</td></tr>
<tr><td><code>SubAgentComplete</code></td><td>Le sous-agent termine</td></tr>
<tr><td rowspan="3"><strong>Approvals</strong></td><td><code>ApprovalRequested</code></td><td>Demande d'approbation de commande envoyée</td></tr>
<tr><td><code>ApprovalGranted</code></td><td>L'utilisateur a approuvé une commande</td></tr>
<tr><td><code>ApprovalDenied</code></td><td>L'utilisateur a refusé une commande</td></tr>
</tbody>
</table>

<h2>Structure d'un Événement</h2>
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

<h2>Consolidation Quotidienne</h2>
<p>Une tâche en arrière-plan s'exécute à <strong>3h00 UTC</strong> quotidiennement et traite les événements non consolidés :</p>
<ol>
  <li><strong>Extraction de faits</strong> &mdash; le LLM analyse les séquences d'événements pour extraire des faits durables</li>
  <li><strong>Apprentissage de procédures</strong> &mdash; les modèles récurrents d'appels d'outils sont capturés en tant que procédures</li>
  <li><strong>Suivi des solutions d'erreurs</strong> &mdash; les erreurs et leurs résolutions sont appariées pour le débogage futur</li>
</ol>
<p>Après le traitement, les événements sont marqués avec un horodatage <code>consolidated_at</code>.</p>

<h2>Contexte de Session</h2>
<p>Le système d'événements fournit un résumé de session pour le contexte LLM qui inclut les outils utilisés, les erreurs rencontrées, les approbations accordées/refusées et l'activité des sous-agents.</p>

<h2>Élagage des Événements</h2>
<p>Une tâche en arrière-plan s'exécute à <strong>3h30 UTC</strong> et supprime les événements plus anciens que la période de rétention (par défaut 30 jours).</p>

${callout('info', 'Immuabilité', 'Les événements sont en ajout seul. Le champ <code>consolidated_at</code> est le seul champ mis à jour après la création.')}
`
  },
  {
    slug: '/plans',
    section: 'Plans',
    title: 'Plans (Legacy)',
    description: 'Référence legacy pour l\'exécution basée sur les plans. Les versions actuelles de aidaemon utilisent des objectifs et des tâches.',
    content: () => `
<h1>Plans (Legacy)</h1>
<p class="lead">Cette page est pour les anciennes installations. Les versions actuelles de aidaemon fonctionnent avec des objectifs et des tâches.</p>

${callout('warning', 'Mise à jour v0.9.x', 'Les plans ne sont plus le chemin principal d\'exécution. aidaemon découpe maintenant le travail en objectifs et en tâches.')}

<h2>Utilisez plutôt ces pages</h2>
<ul>
  <li><a href="/tools">Outils</a> — comment le travail est exécuté dans le système actuel</li>
  <li><a href="/scheduler">Tâches planifiées</a> — automatisation récurrente ou ponctuelle</li>
  <li><a href="/event-sourcing">Event Sourcing</a> — historique complet de ce qui s'est passé</li>
</ul>

<h2>Quand cette page est utile</h2>
<p>Si vous utilisez encore une ancienne version basée sur les plans, cette page reste disponible comme référence legacy.</p>
`
  },
  {
    slug: '/health-monitoring',
    section: 'Health Monitoring',
    title: 'Sondes de Service',
    description: 'Définissez des sondes de santé HTTP, TCP, commande et fichier pour vos services avec alertes et suivi de tendances.',
    content: () => `
<h1>Surveillance de Santé</h1>
<p class="lead">Définissez des sondes de santé pour vos services et soyez alerté lorsque quelque chose tombe en panne.</p>

<h2>Types de Sondes</h2>
<table class="config-table">
<thead><tr><th>Type</th><th>Format de la Cible</th><th>Ce Qui Est Vérifié</th></tr></thead>
<tbody>
<tr><td><code>http</code></td><td>URL</td><td>Code de statut HTTP, corps de la réponse, latence</td></tr>
<tr><td><code>port</code></td><td>host:port</td><td>Connectivité TCP</td></tr>
<tr><td><code>command</code></td><td>Commande shell</td><td>Le code de sortie correspond à l'attendu (par défaut : 0)</td></tr>
<tr><td><code>file</code></td><td>Chemin de fichier</td><td>Le fichier existe et n'est pas plus ancien que max_age_secs</td></tr>
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

<h2>Options de Sonde HTTP</h2>
${configTable([
  ['timeout_secs', 'integer', '10', 'Délai d\'expiration de la requête en secondes'],
  ['expected_status', 'integer', '200', 'Code de statut HTTP attendu'],
  ['expected_body', 'string', 'null', 'Sous-chaîne attendue dans le corps de la réponse'],
  ['method', 'string', '"GET"', 'Méthode HTTP'],
  ['headers', 'object', '{}', 'En-têtes HTTP personnalisés'],
])}

<h2>Alertes</h2>
<p>Lorsqu'une sonde échoue <code>consecutive_failures_alert</code> fois consécutivement, une alerte est envoyée à tous les ID de session dans <code>alert_session_ids</code>.</p>

<h2>Tâches en Arrière-plan</h2>
<ul>
  <li><strong>Boucle de tick</strong> &mdash; s'exécute toutes les <code>tick_interval_secs</code> (par défaut 30), exécute les sondes dues</li>
  <li><strong>Nettoyage</strong> &mdash; s'exécute à <strong>3h40 UTC</strong>, supprime les anciens résultats</li>
</ul>

${callout('info', 'Sondes Dynamiques', 'Les sondes peuvent aussi être créées au moment de l\'exécution par l\'agent via l\'outil <code>health_probe</code>.')}
`
  },
  {
    slug: '/updates',
    section: 'Updates',
    title: 'Mise à Jour Automatique',
    description: 'Mise à jour automatique d\'aidaemon depuis les releases GitHub. Trois modes : notifier, télécharger ou auto-installer.',
    content: () => `
<h1>Mise à Jour Automatique</h1>
<p class="lead">aidaemon peut vérifier les nouvelles versions sur GitHub et se mettre à jour automatiquement.</p>

<h2>Nouveautés Récentes</h2>
<ul>
  <li><strong>v0.9.2</strong> &mdash; meilleure fiabilité des outils, validations d'intention plus strictes, meilleur suivi des commandes en arrière-plan et alias de chemins</li>
  <li><strong>v0.9.1</strong> &mdash; meilleur contexte de suivi, limites de portée par projet et blocages stricts pour suppressions dangereuses</li>
  <li><strong>v0.9.0</strong> &mdash; arrivée du système consultant, grande refonte de l'agent et migration vers des événements canoniques</li>
</ul>

<h2>Modes de Mise à Jour</h2>
<table class="config-table">
<thead><tr><th>Mode</th><th>Comportement</th></tr></thead>
<tbody>
<tr><td><code>enable</code></td><td>Télécharger et appliquer automatiquement les mises à jour, puis redémarrer</td></tr>
<tr><td><code>check_only</code> (par défaut)</td><td>Notifier et attendre l'approbation avant d'appliquer</td></tr>
<tr><td><code>disable</code></td><td>Pas de vérification de mises à jour</td></tr>
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
  ['check_interval_hours', 'integer', '24', 'Heures entre les vérifications de mises à jour'],
  ['check_at_utc_hour', 'integer', 'null', 'Heure UTC spécifique (0-23) pour la vérification quotidienne'],
  ['confirmation_timeout_mins', 'integer', '60', 'Minutes d\'attente pour l\'approbation de l\'utilisateur'],
])}

<h2>Processus de Mise à Jour</h2>
<ol>
  <li><strong>Vérification</strong> &mdash; interroge l'API GitHub Releases</li>
  <li><strong>Comparaison</strong> &mdash; comparaison semver</li>
  <li><strong>Notification</strong> &mdash; envoie les notes de version aux canaux</li>
  <li><strong>Approbation</strong> (check_only) &mdash; demande d'approbation avec délai d'expiration</li>
  <li><strong>Téléchargement</strong> &mdash; binaire spécifique à la plateforme</li>
  <li><strong>Remplacement</strong> &mdash; écrase le binaire actuel</li>
  <li><strong>Redémarrage</strong> &mdash; se termine avec le code 75 pour déclencher le redémarrage du service</li>
</ol>

<h2>Support des Plateformes</h2>
<table class="config-table">
<thead><tr><th>Plateforme</th><th>Architecture</th></tr></thead>
<tbody>
<tr><td>Linux</td><td>x86_64, aarch64</td></tr>
<tr><td>macOS</td><td>x86_64, aarch64</td></tr>
</tbody>
</table>

${callout('warn', 'Utilisateurs Homebrew', 'Si installé via Homebrew, utilisez <code>brew upgrade aidaemon</code> à la place, ou définissez <code>mode = "disable"</code>.')}
`
  },
];

export default pages;
