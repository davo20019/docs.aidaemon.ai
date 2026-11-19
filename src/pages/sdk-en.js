import { codeBlock, callout } from '../helpers.js';

// The SDK guide. Source: crates/sdk-guide in the aidaemon repository, updated
// for the preset, #[tool], typed output, SqliteApprovalStore and the current
// policy list. Locales without their own copy fall back to these pages.

const pages = [
  {
    slug: '/sdk',
    section: 'SDK',
    title: 'AIDaemon SDK for Rust',
    description: 'A general agent SDK for Rust: a small loop, tools as plain functions, behaviour as hooks, and runs you can pause, persist and resume.',
    content: () => `
<h1>aidaemon SDK for Rust</h1>
<p class="lead">A general agent SDK for Rust: a small loop you can read in an afternoon, tools written as plain functions, behaviour (policy, memory, tracing) added as hooks, and runs you can pause, persist and resume.</p>

<p>It also ships what production agents need and rarely get right: approvals, a receipt for every tool call, and handling of untrusted tool output. Those are features you turn on, not a framework you buy into.</p>

${callout('info', 'Status', 'Version 0.1.0 is <strong>not yet published to crates.io</strong>. Until it is, depend on the repository with a git dependency (see <a href="/sdk/install">Install</a>).')}

${codeBlock(`/// Today's weather for a city.
#[tool(read_only)]
async fn forecast(city: String) -> String {
    format!("{city}: 21°C and sunny")
}

let agent = aidaemon_sdk::preset("weather")
    .provider_from_env()
    .instructions("Answer weather questions in one sentence.")
    .tool(Forecast)
    .build()
    .await?;
let outcome = agent.run("cli:me", "Weather in Lisbon?").await?;`, 'rust', 'the whole idea')}

<h2>In this guide</h2>
<ul>
  <li><a href="/sdk/install">Install</a> &mdash; the git dependency, and the features each module sits behind</li>
  <li><a href="/sdk/quickstart">Quickstart</a> &mdash; an agent with one tool in about fifteen lines</li>
  <li><a href="/sdk/tools">Tools</a> &mdash; the <code>#[tool]</code> macro, and implementing <code>Tool</code> by hand</li>
  <li><a href="/sdk/hooks">Hooks and policies</a> &mdash; deny, rewrite or pause tool calls; the ready-made policies</li>
  <li><a href="/sdk/memory">Memory</a> &mdash; swap any <code>MemorySystem</code></li>
  <li><a href="/sdk/channels">Channels</a> &mdash; Telegram, Slack, Discord or your own</li>
  <li><a href="/sdk/typed-output">Typed output</a> &mdash; get your own Rust type back</li>
  <li><a href="/sdk/concepts">Concepts mapping</a> &mdash; coming from the Claude Agent SDK, Vercel AI SDK or LangGraph</li>
</ul>

<h2>Stability</h2>
<p>Two tiers, so you know what to lean on. The public contract (<code>aidaemon-core</code>, <code>aidaemon-sdk</code>, the <code>channel</code> module of <code>aidaemon-channels</code>, the <code>aidaemon-memory</code> traits) follows semver and is checked in CI. Everything else may change in any 0.x minor version.</p>

<h2>Examples</h2>
<p>Runnable examples live in <code>crates/aidaemon-sdk/examples/</code> of the repository. Each runs against a scripted model when no API key is set, so you can try them offline:</p>
<ul>
  <li><code>quickstart</code> &mdash; one <code>#[tool]</code> and the preset</li>
  <li><code>custom_tool</code> &mdash; typed arguments, doc-comment descriptions, annotations</li>
  <li><code>approvals</code> &mdash; a destructive call pauses until the owner answers; a decline is remembered</li>
  <li><code>resume_after_crash</code> &mdash; runs journaled in SQLite, finished after a process dies mid-tool</li>
  <li><code>sub_agent</code> &mdash; a child agent called like any other tool</li>
  <li><code>memory_swap</code> &mdash; the same agent on two memory systems</li>
  <li><code>channel_bot</code> &mdash; a chat bot on <code>ChannelRunner</code>, approvals as buttons</li>
  <li><code>sse_server</code> &mdash; a run streamed over Server-Sent Events from axum</li>
  <li><code>otel_traces</code> &mdash; OpenTelemetry spans per run, model call and tool call</li>
  <li><code>coding_agent</code> and <code>support_triage</code> &mdash; two complete agents built only from SDK crates</li>
</ul>
${codeBlock(`cargo run -p aidaemon-sdk --example quickstart --features testing`, 'bash')}

<h2>Results</h2>
<p>The <code>aidaemon-eval</code> crate runs YAML scenarios N times per configuration and reports pass rates. In its published results (<code>crates/aidaemon-eval/RESULTS.md</code>), a plain kernel sent a synthetic API key to an outside collector in 4 of 5 runs of <code>egress_register</code>; with <code>EgressGuard</code> it passed 5 of 5. <code>SameToolStreakGuard</code> took a polling loop that never finished on the plain kernel (0 of 5) to 5 of 5. Numbers are small-sample and model-specific; the file lists each scenario and the model used.</p>
`
  },
  {
    slug: '/sdk/install',
    section: 'SDK',
    title: 'Install',
    description: 'Add the aidaemon SDK to a Rust project: a git dependency for now, crates.io after the 0.1.0 release, and the feature flags for each module.',
    content: () => `
<h1>Install</h1>
<p class="lead">Requires Rust 1.88 or newer (edition 2021).</p>

${callout('warn', 'Not on crates.io yet', 'Version 0.1.0 is pending. Use the git dependency below for now.')}

<h2>Now: a git dependency</h2>
${codeBlock(`[dependencies]
aidaemon-sdk = { git = "https://github.com/davo20019/aidaemon" }
tokio = { version = "1", features = ["full"] }
serde_json = "1"`, 'toml', 'Cargo.toml')}

<h2>After release: crates.io</h2>
<p>Once 0.1.0 is published, this is the line to use instead:</p>
${codeBlock(`[dependencies]
aidaemon-sdk = "0.1"
tokio = { version = "1", features = ["full"] }
serde_json = "1"`, 'toml', 'Cargo.toml (after release)')}

<h2>Features</h2>
<p><code>aidaemon-sdk</code> re-exports the kernel (<code>aidaemon-core</code>) and adds modules behind features of the same name:</p>
<table class="config-table">
<thead><tr><th>Feature</th><th>Module</th><th>Adds</th></tr></thead>
<tbody>
<tr><td><code>providers</code> (default)</td><td><code>providers</code></td><td>Anthropic and OpenAI-compatible models, streaming</td></tr>
<tr><td><code>tools</code> (default)</td><td><code>tools</code></td><td>workspace file tools, search, sandboxed shell, web fetch</td></tr>
<tr><td><code>policies</code> (default)</td><td><code>policies</code></td><td>approvals, scope guard, redaction, memory injection, tracing</td></tr>
<tr><td><code>agents</code> (default)</td><td><code>agents</code></td><td>agents as tools</td></tr>
<tr><td><code>sqlite</code> (default)</td><td><code>store</code></td><td>durable runs on SQLite</td></tr>
<tr><td><code>macros</code> (default)</td><td><code>tool</code></td><td>the <code>#[tool]</code> attribute macro</td></tr>
<tr><td><code>mcp</code></td><td><code>mcp</code></td><td>MCP servers as tools</td></tr>
<tr><td><code>memory</code></td><td><code>memory</code></td><td>long-term memory</td></tr>
<tr><td><code>channels</code>, <code>telegram</code>, <code>slack</code>, <code>discord</code></td><td><code>channels</code></td><td>chat channels</td></tr>
<tr><td><code>otel</code></td><td><code>policies</code></td><td>OpenTelemetry tracing</td></tr>
<tr><td><code>eval</code></td><td><code>eval</code></td><td>YAML scenario evals</td></tr>
<tr><td><code>testing</code></td><td><code>testing</code></td><td>a scripted provider for tests and offline examples</td></tr>
</tbody>
</table>

<p>Take only the kernel with <code>aidaemon-core</code> if you want nothing else.</p>

<h2>Provider keys</h2>
<p>The preset reads <code>ANTHROPIC_API_KEY</code>, else <code>OPENAI_API_KEY</code> (with <code>OPENAI_BASE_URL</code> for any OpenAI-compatible server). With the lower-level builders, pass the key yourself: <code>providers::Anthropic::builder().api_key(..)</code>.</p>
`
  },
  {
    slug: '/sdk/quickstart',
    section: 'SDK',
    title: 'Quickstart',
    description: 'A working aidaemon agent in about fifteen lines of Rust: one #[tool] and the aidaemon_sdk::preset builder.',
    content: () => `
<h1>Quickstart</h1>
<p class="lead">An agent with one tool in about fifteen lines. It runs against a real model when <code>ANTHROPIC_API_KEY</code> or <code>OPENAI_API_KEY</code> is set, and against a scripted one otherwise.</p>

${codeBlock(`use aidaemon_sdk::prelude::*;
use aidaemon_sdk::testing::{call, text, tool_calls, ScriptedProvider};

/// Today's weather for a city.
#[tool(read_only)]
async fn forecast(city: String) -> String {
    format!("{city}: 21°C and sunny (synthetic data)")
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let agent = aidaemon_sdk::preset("weather")
        .provider_from_env_or(scripted())
        .instructions("Answer weather questions in one sentence. Use the forecast tool.")
        .tool(Forecast)
        .build()
        .await?;
    let outcome = agent.run("cli:me", "Weather in Lisbon?").await?;
    println!("{}", outcome.final_text.unwrap_or_default());
    Ok(())
}

// What the model says when no API key is set.
fn scripted() -> ScriptedProvider {
    let lookup = call("c1", "forecast", serde_json::json!({"city": "Lisbon"}));
    ScriptedProvider::new([tool_calls([lookup]), text("Lisbon is 21°C and sunny.")])
}`, 'rust', 'examples/quickstart.rs')}
${codeBlock(`cargo run -p aidaemon-sdk --example quickstart --features testing`, 'bash')}

<p>Everything above the <code>scripted()</code> helper is the real program; the helper only exists so the example runs without a key. Drop <code>provider_from_env_or</code> for <code>provider_from_env</code> in your own code.</p>

<h2>What the preset gives you</h2>
<p><code>aidaemon_sdk::preset(id)</code> starts from working defaults, and every part can be replaced:</p>
<table class="config-table">
<thead><tr><th>Part</th><th>Default</th><th>Change with</th></tr></thead>
<tbody>
<tr><td>Provider</td><td>none: name one</td><td><code>.provider(..)</code>, <code>.provider_from_env()</code>, <code>.provider_from_env_or(..)</code></td></tr>
<tr><td>Model</td><td><code>AIDAEMON_MODEL</code>, else the provider's default</td><td><code>.model(..)</code></td></tr>
<tr><td>Safeguards</td><td>authority, scope guard over the workspace, egress guard, approvals for destructive calls, redaction, untrusted-output marking</td><td><code>.authority(..)</code>, <code>.approvals(..)</code>, <code>.undeclared_writes(..)</code>, <code>.without_default_hooks()</code></td></tr>
<tr><td>Tools</td><td>none; with a workspace, the file, search and shell tools</td><td><code>.tool(..)</code>, <code>.workspace(dir)</code></td></tr>
<tr><td>Run store</td><td>in memory</td><td><code>.store(..)</code>, <code>.sqlite(path)</code></td></tr>
<tr><td>Memory</td><td>none</td><td><code>.memory(system, turn)</code>: any <code>MemorySystem</code></td></tr>
<tr><td>Anything else</td><td></td><td><code>.hook(..)</code>, <code>.configure(|builder| ..)</code> for the full <code>AgentBuilder</code></td></tr>
</tbody>
</table>

<p>A coding agent confined to the current directory, with runs kept in SQLite:</p>
${codeBlock(`let agent = aidaemon_sdk::preset("helper")
    .provider_from_env()
    .instructions("You maintain this repository. Verify changes with tests.")
    .workspace(".")      // the default file, search and shell tools, confined here
    .sqlite("runs.db")   // runs survive a crash or restart
    .build()
    .await?;`, 'rust')}

<h2>What you get back</h2>
<p><code>agent.run(session_id, message)</code> returns a <code>RunOutcome</code>:</p>
<ul>
  <li><code>outcome.status</code> &mdash; <code>RunStatus::Completed</code>, <code>Interrupted</code>, <code>LimitReached</code>, <code>Stopped</code>, <code>Stuck</code>, ...</li>
  <li><code>outcome.final_text</code> &mdash; the answer</li>
  <li><code>outcome.receipts()</code> &mdash; a receipt per tool call: what ran, with what arguments, how it ended</li>
  <li><code>outcome.usage()</code> &mdash; token usage</li>
  <li><code>outcome.state</code> &mdash; a serializable <code>RunState</code> you can store and resume</li>
</ul>
<p>The session id is yours to choose. With a run store attached (<code>.sqlite(..)</code> above), the same id continues the same conversation.</p>

<h2>Dropping down</h2>
<p>The preset is a convenience over <code>Agent::builder(id)</code>. If you want full control, build the agent yourself and add each hook explicitly; the <code>coding_agent</code> example does exactly that. Use <code>.allow_unguarded()</code> on the plain builder only when you deliberately want no hooks.</p>
`
  },
  {
    slug: '/sdk/tools',
    section: 'SDK',
    title: 'Tools (#[tool])',
    description: 'Write aidaemon agent tools with the #[tool] attribute macro: schema from the parameters, description from the doc comment, annotations declared in one place.',
    content: () => `
<h1>Tools (<code>#[tool]</code>)</h1>
<p class="lead">A tool is a function the model can call. Put <code>#[tool]</code> on a plain function and the macro writes the rest: the JSON Schema comes from the parameters, the description from the doc comment, and a type (named after the function in UpperCamelCase) that implements <code>Tool</code>.</p>

${codeBlock(`use aidaemon_sdk::prelude::*;

/// Read an order: customer, item, total and status.
#[tool(read_only)]
async fn lookup_order(
    /// The order id, like ORD-1001.
    order_id: String,
) -> Result<String, String> {
    match order_id.as_str() {
        "ORD-1001" => Ok("Alice Rivera, Acme Blender, $89.00, delivered".into()),
        _ => Err(format!("no order {order_id}")),
    }
}

// Register it by the generated type:
// preset("support").tool(LookupOrder)`, 'rust', 'examples/custom_tool.rs')}

<ul>
  <li>The function may be <code>async</code> or plain, and may return a <code>String</code>, a <code>ToolOutput</code>, a JSON <code>Value</code> or a <code>Result</code> of one of those with a string-like error. An error goes back to the model as the tool result and the receipt is marked failed.</li>
  <li>The function's doc comment is the tool description (required, or pass <code>description = "..."</code>). Parameter doc comments become the schema's field descriptions. <code>Option&lt;T&gt;</code> parameters are optional.</li>
  <li>Take <code>ctx: &amp;ToolContext</code> as a parameter to read the session id or watch <code>ctx.cancel</code>; it is not part of the schema.</li>
</ul>

<h2>Declare what the tool does</h2>
<p>The kernel needs to know what a tool does, because that drives parallelism, approvals and receipts. Pick one preset:</p>
<table class="config-table">
<thead><tr><th>Option</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td><code>#[tool(read_only)]</code></td><td>no side effects; calls may run concurrently</td></tr>
<tr><td><code>#[tool(write)]</code></td><td>changes state</td></tr>
<tr><td><code>#[tool(destructive)]</code></td><td>moves money, deletes, sends; the default approval policy pauses the run for the owner</td></tr>
<tr><td><code>#[tool]</code> with no preset</td><td>the conservative default: treated as destructive, like a hand-written tool that declares nothing</td></tr>
</tbody>
</table>
<p>Further options go beside the preset: <code>idempotent</code> (or <code>idempotent = false</code>), <code>egress = true</code> (the tool sends data out, so the egress guard screens its arguments), <code>trusted</code> (its output is your own data), <code>name = "..."</code>, <code>description = "..."</code>, <code>timeout_secs = N</code>, and <code>effects = path</code> / <code>access = path</code> naming functions that describe what a call will touch. A read-only tool that contacts another host must say <code>egress = true</code>.</p>
${codeBlock(`#[tool(write, idempotent, trusted, name = "tag-session", timeout_secs = 5)]
async fn tag(tag: String, ctx: &ToolContext) -> String {
    format!("{} tagged {tag}", ctx.session_id)
}`, 'rust')}

<h2>Structured arguments</h2>
<p>For several fields, take one struct marked <code>#[args]</code>. It needs <code>Deserialize</code> and <code>JsonSchema</code>, and its doc comments and <code>schemars</code> attributes shape the schema.</p>
${codeBlock(`use schemars::JsonSchema;
use serde::Deserialize;

/// A hand-off to a person.
#[derive(Deserialize, JsonSchema)]
struct Escalation {
    /// Why a person should look at it, in one sentence.
    reason: String,
    /// 1 (urgent) to 3 (whenever).
    #[schemars(range(min = 1, max = 3))]
    priority: u8,
}

/// Hand the ticket to a human agent.
#[tool(write, idempotent = false)]
async fn escalate(#[args] escalation: Escalation, ctx: &ToolContext) -> String {
    format!(
        "ticket for {} escalated at priority {}: {}",
        ctx.session_id, escalation.priority, escalation.reason
    )
}`, 'rust')}

<h2>Good to know</h2>
<ul>
  <li>Tool output is treated as <strong>untrusted</strong> by default, so policies can screen it. Mark a tool <code>trusted</code> only when its output is your own data.</li>
  <li>Arguments are checked against the derived schema before anything runs: a call with an undeclared key or the wrong types is refused.</li>
  <li>Test tools without a model using the <code>testing</code> feature and the conformance kit (<code>aidaemon_sdk::conformance::check_tool</code>); <code>tests/tool_macro.rs</code> in the SDK crate does this for macro-made tools.</li>
</ul>

<h2>Implementing <code>Tool</code> by hand</h2>
<p>Use the trait directly when a tool carries state or configuration, or needs per-call control that the macro does not express. Only <code>spec</code> and <code>call</code> are required.</p>
${codeBlock(`use aidaemon_sdk::prelude::*;
use aidaemon_sdk::{ToolContext, ToolResult, ToolSpec};
use async_trait::async_trait;
use serde_json::{json, Value};

struct OrderStatus {
    api_base: String,
}

#[async_trait]
impl Tool for OrderStatus {
    fn spec(&self) -> ToolSpec {
        ToolSpec {
            name: "order_status".into(),
            description: "Look up the status of an order by id".into(),
            parameters: json!({
                "type": "object",
                "properties": { "order_id": { "type": "string" } },
                "required": ["order_id"]
            }),
        }
    }

    fn annotations(&self) -> ToolAnnotations {
        ToolAnnotations::READ_ONLY
    }

    async fn call(&self, arguments: Value, ctx: &ToolContext) -> ToolResult {
        let id = arguments["order_id"].as_str().ok_or("order_id must be a string")?;
        let _ = &ctx.cancel; // cancelled when the run is; long tools should watch it
        Ok(ToolOutput::text(format!("order {id} at {}: shipped", self.api_base)))
    }
}`, 'rust')}
<p>Register with <code>.tool(OrderStatus { .. })</code> or <code>.tool_arc(Arc&lt;dyn Tool&gt;)</code>. For a one-off closure, <code>FnTool::new(spec, annotations, |args| async move { .. })</code> also works. <code>annotations_for(&amp;arguments)</code> can relax the annotations per call.</p>
`
  },
  {
    slug: '/sdk/hooks',
    section: 'SDK',
    title: 'Hooks and policies',
    description: 'Add behaviour to the aidaemon agent loop with hooks: deny, rewrite or pause tool calls, and use the ready-made policies.',
    content: () => `
<h1>Hooks and policies</h1>
<p class="lead">Hooks are how behaviour is added to the loop. The kernel stays small; policy, memory, logging and limits are all hooks.</p>

<p><code>Hook</code> has default no-op methods; implement the ones you need: <code>on_run_start</code>, <code>edit_transcript</code>, <code>before_model</code>, <code>after_model</code>, <code>before_tool</code>, <code>after_tool</code>, <code>on_stop</code>, <code>on_run_end</code>, among others.</p>

<p>A hook that blocks tool calls named in a deny list:</p>
${codeBlock(`use aidaemon_sdk::prelude::*;
use aidaemon_sdk::{ToolCall, ToolDecision, ToolInfo};
use async_trait::async_trait;

struct DenyTools(Vec<String>);

#[async_trait]
impl Hook for DenyTools {
    async fn before_tool(
        &self,
        _ctx: &HookContext<'_>,
        call: &ToolCall,
        _tool: &ToolInfo,
    ) -> ToolDecision {
        if self.0.contains(&call.name) {
            // The reason goes back to the model as the tool result.
            ToolDecision::Deny { reason: format!("\`{}\` is not allowed here", call.name) }
        } else {
            ToolDecision::Allow
        }
    }
}

// preset("helper").hook(DenyTools(vec!["delete_file".into()]))`, 'rust')}

<h2>Deny, rewrite, interrupt</h2>
<p><code>ToolDecision</code> also has <code>Rewrite { arguments }</code> (change the arguments) and <code>Interrupt { .. }</code> (pause the run, for example to ask a person). An interrupted run returns <code>RunStatus::Interrupted</code>; continue it, in this or another process, with <code>agent.resume(outcome.state, Resolution::Approve)</code> or <code>Resolution::Deny { reason }</code>.</p>
${codeBlock(`let mut outcome = agent.run("cli:me", "Clean up the build folder").await?;
while let RunStatus::Interrupted { interruption } = &outcome.status {
    println!("approve {}?", interruption.call.name);
    outcome = agent.resume(outcome.state, Resolution::Approve).await?;
}`, 'rust')}
<p>The state is serde-serializable, so it can sit in a database until someone answers. After a decline, the kernel refuses any call that would do the same thing again in that run. The <code>approvals</code> and <code>resume_after_crash</code> examples show the full round trips.</p>

<h2>Ready-made policies</h2>
<p>Hooks live in <code>aidaemon_sdk::policies</code> (feature <code>policies</code>). Every decision comes from typed state (annotations, access manifests, receipts, message origins) or structural parsing, never from matching words in model prose.</p>
<table class="config-table">
<thead><tr><th>Policy</th><th>What it does</th></tr></thead>
<tbody>
<tr><td><code>ApprovalPolicy</code> + <code>ApprovalMode</code></td><td>pauses a run for the owner before destructive (or all write) calls; <code>ApprovalRules</code> and <code>ApprovalGrants</code> remember decisions</td></tr>
<tr><td><code>ScopeGuard</code></td><td>keeps calls inside the directories you allow, from each call's access manifest</td></tr>
<tr><td><code>EgressGuard</code></td><td>blocks outbound arguments that contain secret shapes or literal secrets</td></tr>
<tr><td><code>Redactor</code></td><td>removes secrets from tool output</td></tr>
<tr><td><code>UntrustedOutput</code></td><td>marks tool output as data, not instructions</td></tr>
<tr><td><code>SameToolStreakGuard</code></td><td>stops a run that keeps polling the same tool without progress</td></tr>
<tr><td><code>ContextWindow</code></td><td>keeps requests inside a token budget by eliding old tool results in coarse steps, so the prompt prefix stays stable</td></tr>
<tr><td><code>ConversationCompaction</code></td><td>summarizes older turns</td></tr>
<tr><td><code>ProjectInstructions</code>, <code>NestedInstructions</code></td><td>load <code>AGENTS.md</code> files into the request</td></tr>
<tr><td><code>MemoryInjection</code></td><td>puts recalled memory into every model request (see <a href="/sdk/memory">Memory</a>)</td></tr>
<tr><td><code>TracingSink</code>, <code>OtelSink</code> (<code>otel</code>)</td><td>event stream to logs or OpenTelemetry</td></tr>
</tbody>
</table>

${callout('info', 'Order matters', 'Hooks run in registration order. Register request injectors (<code>ProjectInstructions</code>, <code>MemoryInjection</code>) before <code>ContextWindow</code>, and <code>Redactor</code> before <code>UntrustedOutput</code>. Before tools run the order is pinned: authority and scope, then egress, then untrusted handling, then approvals last, so the owner is only asked about calls everything else allows. The preset wires its defaults in this order.')}

<p>A check on what the agent actually did, rather than what it said, is a few lines of <code>on_stop</code> reading <code>outcome.receipts()</code>; there is no separate completion-check policy.</p>
`
  },
  {
    slug: '/sdk/memory',
    section: 'SDK',
    title: 'Memory',
    description: 'Long-term memory for aidaemon SDK agents: plug in any MemorySystem, use ScopedMemory, or swap the store and embedder underneath.',
    content: () => `
<h1>Memory</h1>
<p class="lead">Long-term memory is optional, and the rest of the SDK never depends on it. It plugs into an agent through a public trait, <code>MemorySystem</code>, so you can swap the whole system, or just the parts under it.</p>

<h2>Plug in a memory system</h2>
<p>A <code>MemorySystem</code> returns, for each turn, the hooks and tools it wants on that turn (recall injection, a <code>remember</code> tool, run-end learning), plus optional guidance text for the model. Hand it to the preset with a <code>MemoryTurn</code> that says which memory the turn uses and whether it may read and write:</p>
${codeBlock(`use aidaemon_sdk::policies::{MemorySystem, MemoryTurn};

let turn = MemoryTurn {
    session_id: "cli:me".into(),
    scope: "owner".into(),     // the memory this turn reads and writes
    read: true,
    write: true,
    explicit_writes_only: true, // only the remember tool writes
    learning: Default::default(),
};
let agent = aidaemon_sdk::preset("assistant")
    .provider_from_env()
    .memory(memory_system, turn) // Arc<dyn MemorySystem>
    .build()
    .await?;`, 'rust')}
<p>The <code>memory_swap</code> example runs one agent on two systems: <code>aidaemon-memory</code>, and a ten-line notebook written in the example. A vector database or a hosted memory service plugs in the same way.</p>

<h2>The aidaemon-memory system: <code>ScopedMemory</code></h2>
<p>The <code>aidaemon-memory</code> crate (SDK feature <code>memory</code>) is the facts-and-episodes memory with hybrid recall. <code>ScopedMemory</code> is that crate packaged as a whole <code>MemorySystem</code>:</p>
${codeBlock(`use aidaemon_sdk::memory::{HashEmbedder, InMemoryMemoryStore, Memory, ScopedMemory};
use std::sync::Arc;

let builder = Memory::builder(
    Arc::new(InMemoryMemoryStore::new()),
    Arc::new(HashEmbedder::default()),
);
let system = ScopedMemory::new(builder);`, 'rust')}
<p>It reads and writes the scope each session's latest turn was given, so your app can map many sessions to one memory (the owner's direct messages) and keep others apart (each group conversation). The host decides who may see what; the memory system only decides how to remember and recall within that scope. If you know how the aidaemon daemon remembers facts and episodes, this is the same model, available as a building block rather than as the daemon's built-in wiring.</p>

<h2>Swap the parts instead</h2>
<p>Under <code>Memory</code>, each part is a trait object and replaceable:</p>
<ul>
  <li><code>MemoryStore</code> &mdash; where facts and episodes live. SQLite is included; implement the trait for pgvector, Qdrant, a document database, and so on. Only row storage is required; other methods have safe defaults.</li>
  <li><code>Embedder</code> &mdash; turns text into vectors (<code>model_id</code>, <code>dimensions</code>, <code>embed</code>). <code>HashEmbedder</code> works offline; the <code>fastembed</code> feature adds local ONNX models.</li>
</ul>
<p>Implement <code>MemoryStore</code> and pass it to <code>Memory::builder</code> in place of the SQLite or in-memory store; nothing else changes. Run the conformance kit against your implementation (feature <code>conformance</code> of <code>aidaemon-memory</code>): <code>aidaemon_memory::conformance::check_store(|| async { /* a fresh store */ })</code> reports which behaviours it satisfies.</p>

<h2>Just recall</h2>
<p>If you only want recall injected into each request, implement the small <code>Recall</code> trait and add <code>MemoryInjection::new(your_recall)</code> as a hook. Writing is model-driven in <code>aidaemon-memory</code> (<code>FactExtractor</code>, <code>EpisodeSummarizer</code> ask any <code>Provider</code> for typed JSON), and <code>RememberTool</code> / <code>RecallTool</code> let the agent decide for itself what to store.</p>
`
  },
  {
    slug: '/sdk/channels',
    section: 'SDK',
    title: 'Channels',
    description: 'Connect an aidaemon SDK agent to Telegram, Slack, Discord or your own chat platform with ChannelRunner and the Channel trait.',
    content: () => `
<h1>Channels</h1>
<p class="lead">A channel connects a chat platform to an agent. The contract is the <code>Channel</code> trait in <code>aidaemon-channels</code> (SDK feature <code>channels</code>). Built-in adapters exist for Telegram, Slack and Discord (features <code>telegram</code>, <code>slack</code>, <code>discord</code>).</p>

<h2>Use a built-in adapter</h2>
${codeBlock(`use std::sync::Arc;
use aidaemon_sdk::channels::{AccessPolicy, ChannelRunner};
use aidaemon_sdk::channels::telegram::TelegramChannel;
use aidaemon_sdk::CancellationToken;

let channel = TelegramChannel::new(bot_token);
let runner = ChannelRunner::builder(agent)
    .channel(Arc::new(channel))
    .access(AccessPolicy::new().owner("telegram", owner_id))
    .build()?;
runner.run(CancellationToken::new()).await; // until cancelled`, 'rust')}
<p>The runner gives you one session per conversation, one run at a time per session, queueing, streamed progress, and approvals as buttons that resume interrupted runs (see <a href="/sdk/hooks">Hooks and policies</a>). The <code>channel_bot</code> example runs the whole flow against an in-process <code>TestChannel</code>, so it needs no bot token.</p>

<h2>Durable approvals</h2>
<p>By default, pending approvals are held in memory. To keep them across a restart, give the runner the SQLite approval store. It needs the <code>channels</code> feature of <code>aidaemon-store-sqlite</code>:</p>
${codeBlock(`[dependencies]
aidaemon-store-sqlite = { git = "https://github.com/davo20019/aidaemon", features = ["channels"] }`, 'toml', 'Cargo.toml')}
${codeBlock(`use aidaemon_store_sqlite::{SqliteApprovalStore, SqliteStore};

let store = SqliteStore::open("agent.db").await?;
let runner = ChannelRunner::builder(agent)
    .channel(Arc::new(channel))
    .approval_store(Arc::new(SqliteApprovalStore::new(&store)))
    .build()?;`, 'rust')}
<p>A button pressed after a restart still resumes the run, and a double click settles it once.</p>

<h2>Write your own channel</h2>
<p>Implement four required methods:</p>
${codeBlock(`use aidaemon_channels::{
    Channel, ChannelCapabilities, ChannelError, ChannelEvent, Conversation,
    MessageRef, OutboundMessage,
};
use async_trait::async_trait;
use tokio::sync::mpsc;
use tokio_util::sync::CancellationToken;

struct MyChat { /* client handles */ }

#[async_trait]
impl Channel for MyChat {
    fn name(&self) -> &str { "mychat" }

    fn capabilities(&self) -> ChannelCapabilities {
        ChannelCapabilities { max_message_len: 4000, ..Default::default() }
    }

    // Forward platform updates as ChannelEvent::Message(InboundMessage)
    // until \`shutdown\` is cancelled.
    async fn run(
        &self,
        events: mpsc::Sender<ChannelEvent>,
        shutdown: CancellationToken,
    ) -> Result<(), ChannelError> {
        todo!()
    }

    async fn send(
        &self,
        conversation: &Conversation,
        message: &OutboundMessage,
    ) -> Result<MessageRef, ChannelError> {
        todo!()
    }
}`, 'rust')}
<p><code>edit</code>, <code>ask</code> (buttons), <code>typing</code>, files and commands are optional; declare what you support in <code>ChannelCapabilities</code> and the runner adapts. Enable the crate's <code>conformance</code> feature to run the adapter conformance kit (<code>aidaemon_channels::conformance</code>) against your channel.</p>
`
  },
  {
    slug: '/sdk/typed-output',
    section: 'SDK',
    title: 'Typed output',
    description: 'Get a Rust type back from a model call or an agent run with complete_typed and run_typed, with one automatic repair attempt.',
    content: () => `
<h1>Typed output</h1>
<p class="lead">Return a model call, or an agent's final answer, as your own type. Derive <code>Deserialize</code> and <code>JsonSchema</code> and ask for it.</p>

<p>The request carries the schema of your type (derived with <code>schemars</code>), and the instructions repeat it for providers that do not enforce schemas. A reply that does not parse gets <strong>one repair attempt</strong>: the parse error goes back to the model, which answers again. A second failure is <code>StructuredError::Invalid</code>.</p>

${codeBlock(`use aidaemon_sdk::structured::{complete_typed, AgentStructuredExt};
use schemars::JsonSchema;
use serde::Deserialize;

/// How a support ticket should be handled.
#[derive(Deserialize, JsonSchema)]
struct Triage {
    /// 1 is the most urgent.
    priority: u8,
    refund: bool,
}

// One model call.
let triage = complete_typed::<Triage>(&provider, request).await?;
println!("{} {}", triage.value.priority, triage.value.refund);

// An agent's final answer. Tools still run as usual;
// only the final answer must match the type.
let typed = agent.run_typed::<Triage>("support:ticket-1", "Where is my order?").await?;
println!("{}", typed.value.priority);`, 'rust')}

<h2>What comes back</h2>
<ul>
  <li><code>complete_typed::&lt;T&gt;(&amp;provider, request)</code> returns <code>Typed&lt;T&gt;</code>: <code>value</code>, the <code>response</code> it was read from, the <code>usage</code> of every call made (the repair included) and <code>repaired</code>.</li>
  <li><code>agent.run_typed::&lt;T&gt;(session_id, input)</code> returns <code>TypedOutcome&lt;T&gt;</code>: <code>value</code>, the full <code>outcome</code> (receipts, usage, state) and <code>repaired</code>.</li>
  <li><code>run_typed_from</code> and <code>resume_typed</code> do the same for a saved state or an interrupted run. A run that pauses again for approval ends as <code>StructuredError::NotFinished</code>, so you can resume it.</li>
</ul>
<p>Both live in <code>aidaemon_sdk::structured</code> and need no extra feature. The <code>structured_output</code> test in the SDK crate runs them against the scripted provider.</p>
`
  },
  {
    slug: '/sdk/concepts',
    section: 'SDK',
    title: 'Concepts mapping',
    description: 'How aidaemon SDK concepts map to the Claude Agent SDK, the Vercel AI SDK and LangGraph.',
    content: () => `
<h1>Concepts mapping</h1>
<p class="lead">Coming from the Claude Agent SDK, the Vercel AI SDK or LangGraph? A rough map. The ideas line up closely; the differences are noted.</p>

<table class="config-table">
<thead><tr><th>You know</th><th>In aidaemon</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>Claude Agent SDK: <code>query()</code> / agent loop</td><td><code>Agent::run(session_id, message)</code></td><td>The loop is in <code>aidaemon-core</code>; model-agnostic (<code>Provider</code> trait).</td></tr>
<tr><td>Claude Agent SDK: custom tools, MCP servers</td><td><code>#[tool]</code> / <code>Tool</code> / <code>FnTool</code>; <code>aidaemon-mcp</code> (<code>McpServer::tools()</code>)</td><td>MCP tools become ordinary <code>Tool</code>s.</td></tr>
<tr><td>Claude Agent SDK: hooks (PreToolUse, PostToolUse, Stop)</td><td><code>Hook::before_tool</code>, <code>after_tool</code>, <code>on_stop</code></td><td>Hooks can <code>Deny</code>, <code>Rewrite</code> or <code>Interrupt</code>.</td></tr>
<tr><td>Claude Agent SDK: permission modes, <code>canUseTool</code></td><td><code>ApprovalPolicy</code> + <code>ApprovalMode</code>, or your own <code>before_tool</code></td><td>A paused run is a serializable <code>RunState</code>, resumed with <code>Agent::resume</code>.</td></tr>
<tr><td>Claude Agent SDK: subagents</td><td><code>aidaemon-agents</code> (agent as a tool)</td><td>Child budgets roll up into the parent.</td></tr>
<tr><td>Claude Agent SDK: sessions</td><td>session id passed to <code>run</code> + a <code>RunStore</code> (<code>.sqlite(..)</code>)</td><td></td></tr>
<tr><td>Vercel AI SDK: <code>generateText</code> / <code>streamText</code></td><td><code>Provider</code> (streaming) used by the loop</td><td>You normally call <code>Agent::run</code>, not the model directly.</td></tr>
<tr><td>Vercel AI SDK: <code>generateObject</code></td><td><code>complete_typed::&lt;T&gt;</code>, <code>run_typed::&lt;T&gt;</code></td><td>Schema from <code>schemars</code>, one repair attempt.</td></tr>
<tr><td>Vercel AI SDK: <code>tool({ description, parameters, execute })</code></td><td><code>#[tool]</code> on a function</td><td>Schema from the parameters, description from the doc comment.</td></tr>
<tr><td>Vercel AI SDK: <code>maxSteps</code>, <code>stopWhen</code></td><td><code>Limits</code> (<code>.limits(..)</code> via <code>configure</code>), <code>StopCondition</code></td><td>Also token budgets and stuck detection.</td></tr>
<tr><td>Vercel AI SDK: provider packages</td><td><code>aidaemon-providers</code> (<code>Anthropic</code>, <code>OpenAiCompatible</code>, ...)</td><td></td></tr>
<tr><td>LangGraph: graph of nodes and edges</td><td>the loop plus hooks</td><td>No graph DSL: control flow is the loop; add behaviour in hooks.</td></tr>
<tr><td>LangGraph: state, checkpointer</td><td><code>RunState</code> (serde) + <code>RunStore</code></td><td>Checkpoints are written as the run goes; crash recovery resumes in-flight tool batches.</td></tr>
<tr><td>LangGraph: <code>interrupt()</code> / human in the loop</td><td><code>ToolDecision::Interrupt</code> then <code>Agent::resume</code></td><td>Interrupts happen before a tool call.</td></tr>
<tr><td>LangGraph: long-term memory store</td><td><code>aidaemon-memory</code> (<code>MemorySystem</code>, <code>MemoryStore</code>, <code>Embedder</code>)</td><td>Swappable; plugs in through the preset.</td></tr>
<tr><td>LangSmith / tracing</td><td><code>Event</code> stream (<code>.event_sink</code>), <code>TracingSink</code> / <code>OtelSink</code> (<code>otel</code> feature)</td><td></td></tr>
<tr><td>Evals</td><td><code>aidaemon-eval</code>: YAML scenarios, N-of-M pass rates</td><td></td></tr>
</tbody>
</table>

<h2>Where aidaemon differs on purpose</h2>
<ul>
  <li><strong>Receipts.</strong> Every tool call produces a receipt (what ran, with what arguments, how it ended), so a stop hook can check what happened instead of trusting the model's prose.</li>
  <li><strong>Untrusted output.</strong> Tool output is treated as untrusted unless a tool says otherwise, so policies can screen it.</li>
  <li><strong>Pausable runs.</strong> A run is data: pause it, store it, and resume it in another process.</li>
</ul>
`
  },
];

export default pages;
