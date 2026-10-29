// Creates the backlog of backlog.mjs in GitHub: one milestone per sprint, the
// epics and stories as labelled issues, each story a sub-issue of its epic,
// and, with --project, a Projects board with Sprint, Estimate and Area fields.
// It can run again safely. Issues are matched by key ("P-14: …", "Epic C: …"),
// so an issue made by hand with the right key is adopted instead of duplicated,
// and a story whose title changed is renamed in place. Each story's pull request
// closes its issue ("Closes #N"), so the seed never closes one itself.
// --refresh also rewrites the bodies, labels and milestones of open issues and
// the sprint goals from the data. It leaves alone a body with a ticked box,
// because a teammate is working through it. Run sync-labels.mjs first.
// Usage: node scripts/github/seed-backlog.mjs [--project] [--refresh] [--dry-run]
import { EPICS, SPRINTS } from './backlog.mjs';
import { api, apiList, repository } from './gh.mjs';
import { sprintDates, sprintTitle } from './sprints.mjs';

const DRY_RUN = process.argv.includes('--dry-run');
const WITH_PROJECT = process.argv.includes('--project');
const REFRESH = process.argv.includes('--refresh');
const PROJECT_TITLE = 'OrderPilot delivery';
const repo = repository();

/** GitHub limits how fast content is created; a short pause keeps well under it. */
function pause(ms = 700) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

/** Makes one change in GitHub, or only reports it on a dry run. */
function act(description, call) {
  if (DRY_RUN) {
    console.log(`would ${description}`);
    return null;
  }
  const result = call();
  console.log(`did ${description}`);
  pause();
  return result;
}

// --- Milestones (sprints) ---------------------------------------------------
const milestones = new Map(
  apiList(`repos/${repo}/milestones?state=all&per_page=100`).map((milestone) => [
    milestone.title,
    milestone,
  ]),
);
for (const sprint of SPRINTS) {
  const title = sprintTitle(sprint.number);
  const { due, label } = sprintDates(sprint.number);
  const description = `${label}. Goal: ${sprint.goal}`;
  const existing = milestones.get(title);
  if (!existing) {
    const created = act(`create milestone ${title}`, () =>
      api(`repos/${repo}/milestones`, {
        method: 'POST',
        body: { title, due_on: due, description },
      }),
    );
    if (created) milestones.set(title, created);
  } else if (REFRESH && existing.description !== description) {
    act(`update the goal of ${title}`, () =>
      api(`repos/${repo}/milestones/${String(existing.number)}`, {
        method: 'PATCH',
        body: { description },
      }),
    );
  }
}

// --- Issues -----------------------------------------------------------------
/** The backlog key an issue title starts with ("P-14", "Epic C"), or null for any other issue. */
function keyOf(title) {
  return /^(Epic [A-Z]|[A-Z]-\d+): /.exec(title)?.[1] ?? null;
}

const issues = new Map();
for (const issue of apiList(`repos/${repo}/issues?state=all&per_page=100`).sort(
  (a, b) => a.number - b.number,
)) {
  const key = issue.pull_request ? null : keyOf(issue.title);
  if (!key) continue;
  if (issues.has(key)) {
    console.warn(
      `#${String(issue.number)} repeats the key ${key} of #${String(issues.get(key).number)}; the seed uses the older one`,
    );
  } else {
    issues.set(key, issue);
  }
}

const DONE = [
  'Acceptance criteria met and demonstrated',
  '`pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` pass; CI and security checks green',
  'Tests added: unit for domain logic, integration for endpoints, e2e for user journeys',
  'UI: every state, strings in the locale files (no second language), keyboard and reduced motion checked, screenshots in light and dark in the PR',
  'Writes audited, endpoints guarded by RBAC, input validated, synthetic data only',
  'Traceability matrix, ADRs and the AI usage log updated where relevant',
  'Reviewed and merged into main through a pull request',
];

function epicBody(epic) {
  return [
    `**Goal.** ${epic.goal}`,
    '',
    ...(epic.stories.length > 0
      ? [
          '**Stories** (sub-issues of this epic):',
          '',
          ...epic.stories.map(
            (story) =>
              `- ${story.key}: ${story.title} (sprint ${String(story.sprint)}, ${String(story.points)} points)`,
          ),
        ]
      : ['**Stories:** none yet.']),
    '',
    'Plan: [docs/agile/backlog.md](../blob/main/docs/agile/backlog.md). Definition of Done: [docs/agile/definition-of-ready-and-done.md](../blob/main/docs/agile/definition-of-ready-and-done.md).',
  ].join('\n');
}

function storyBody(story, epicNumber) {
  return [
    story.story,
    '',
    '### Acceptance criteria',
    '',
    ...story.acceptance.map((criterion) => `- [ ] ${criterion}`),
    '',
    `**Estimate:** ${String(story.points)} points · **Priority:** ${story.priority} · **Sprint:** ${sprintTitle(story.sprint)}${epicNumber ? ` · **Epic:** #${String(epicNumber)}` : ''}`,
    ...(story.branch ? ['', `**Branch:** \`${story.branch}\``] : []),
    '',
    '### Definition of Done',
    '',
    ...DONE.map((item) => `- [ ] ${item}`),
  ].join('\n');
}

/** Labels the seed sets; any other label on an issue (a status, a teammate's) is kept. */
const MANAGED_LABEL = /^(type: (epic|story|task)|area: |priority: |req: )/;

const epicLabels = (epic) => ['type: epic', epic.area, ...epic.labels];
const storyLabels = (story, epic) => [
  story.type ?? 'type: story',
  epic.area,
  `priority: ${story.priority}`,
  ...new Set([...epic.labels, ...(story.labels ?? [])]),
];

/**
 * Brings an existing issue in line with the data: always its title (the key
 * stays, so a renamed story keeps its issue and history), and with --refresh
 * the body, labels and milestone of an open issue.
 */
function update(issue, { title, body, labels, milestone }) {
  const changes = {};
  if (issue.title !== title) changes.title = title;
  if (REFRESH && issue.state === 'open') {
    const current = (issue.body ?? '').replace(/\r\n/g, '\n');
    if (/- \[x\]/i.test(current)) {
      console.log(`kept the body of #${String(issue.number)}: it has ticked boxes`);
    } else if (current !== body) {
      changes.body = body;
    }
    const names = issue.labels.map((label) => label.name);
    const wanted = [...new Set([...labels, ...names.filter((name) => !MANAGED_LABEL.test(name))])];
    if (wanted.length !== names.length || wanted.some((name) => !names.includes(name))) {
      changes.labels = wanted;
    }
    if (milestone !== undefined && issue.milestone?.number !== milestone) {
      changes.milestone = milestone;
    }
  }
  if (Object.keys(changes).length === 0) return issue;
  const updated = act(
    `update #${String(issue.number)} (${Object.keys(changes).join(', ')}): ${title}`,
    () => api(`repos/${repo}/issues/${String(issue.number)}`, { method: 'PATCH', body: changes }),
  );
  return updated ?? issue;
}

const created = { epics: new Map(), stories: [] };
for (const epic of EPICS) {
  const title = `Epic ${epic.key}: ${epic.title}`;
  const existingEpic = issues.get(`Epic ${epic.key}`);
  const epicIssue = existingEpic
    ? update(existingEpic, { title, body: epicBody(epic), labels: epicLabels(epic) })
    : act(`create epic "${title}"`, () =>
        api(`repos/${repo}/issues`, {
          method: 'POST',
          body: { title, body: epicBody(epic), labels: epicLabels(epic) },
        }),
      );
  created.epics.set(epic.key, epicIssue);
  const linked =
    epicIssue && !DRY_RUN
      ? new Set(
          apiList(`repos/${repo}/issues/${String(epicIssue.number)}/sub_issues?per_page=100`).map(
            (sub) => sub.id,
          ),
        )
      : new Set();

  for (const story of epic.stories) {
    const storyTitle = `${story.key}: ${story.title}`;
    const fields = {
      title: storyTitle,
      body: storyBody(story, epicIssue?.number),
      labels: storyLabels(story, epic),
      milestone: milestones.get(sprintTitle(story.sprint))?.number,
    };
    const existing = issues.get(story.key);
    const issue = existing
      ? update(existing, fields)
      : act(`create story "${storyTitle}"`, () =>
          api(`repos/${repo}/issues`, { method: 'POST', body: fields }),
        );
    if (!issue) continue;

    if (epicIssue && !linked.has(issue.id)) {
      act(`link ${story.key} under ${title}`, () =>
        api(`repos/${repo}/issues/${String(epicIssue.number)}/sub_issues`, {
          method: 'POST',
          body: { sub_issue_id: issue.id },
        }),
      );
    }
    created.stories.push({ story, issue, epic });
  }
}

if (WITH_PROJECT && !DRY_RUN) {
  const { setUpProject } = await import('./project-board.mjs');
  setUpProject({ repo, title: PROJECT_TITLE, epics: created.epics, stories: created.stories });
}
console.log(DRY_RUN ? 'dry run finished: nothing was changed' : 'backlog seeded');
