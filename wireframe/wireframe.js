/* =========================================================
   Rabbit Hole — clickable wireframe
   1. Example discoveries (placeholder content)
   2. Switching screens
   3. Filling in the Discovery screen
   4. Click handling
   ========================================================= */


/* ---------- 1. Example discoveries ----------
   Wireframe content only. `parent` is the discovery one level up
   (null = directly under the question). `deeper` is where "Go Deeper" leads. */

const SUITS = { spade: '♠', heart: '♥', diamond: '♦', club: '♣', joker: '✦' };

const NPC_QUESTION = 'Why do NPCs behave strangely?';

const discoveries = {
  'behavior-trees': {
    title: 'Behavior Trees', category: 'Technology', suit: 'spade', depth: 1,
    hole: NPC_QUESTION, parent: null, deeper: 'game-ai',
    summary: 'A way of organizing a character’s decisions as a branching tree of small tasks: check something, choose a branch, act. When a branch fails in a way nobody planned for, the NPC does something odd, like staring at a wall.',
    source: 'Example source: a game developer conference talk on how Halo 2’s enemy AI was organized.',
    related: ['game-ai', 'uncanny-valley'],
  },
  'game-ai': {
    title: 'Game AI', category: 'Games', suit: 'club', depth: 2,
    hole: NPC_QUESTION, parent: 'behavior-trees', deeper: 'pathfinding',
    summary: 'Game AI isn’t trying to be intelligent. It’s trying to seem intelligent and be fun. It’s closer to stage acting than to research AI, which is why the seams show the moment the illusion slips.',
    source: 'Example source: an article on why enemies in shooters shout out their plans.',
    related: ['pathfinding', 'procedural-generation'],
  },
  'pathfinding': {
    title: 'Pathfinding', category: 'Technology', suit: 'spade', depth: 3,
    hole: NPC_QUESTION, parent: 'game-ai', deeper: 'a-star',
    summary: 'How a character figures out a route from here to there without walking through walls. When an NPC runs in circles or gets stuck on a rock, pathfinding is usually the culprit.',
    source: 'Example source: a video breaking down how game characters “see” a level.',
    related: ['a-star', 'navigation-meshes'],
  },
  'a-star': {
    title: 'A* Algorithm', category: 'Science', suit: 'diamond', depth: 4,
    hole: NPC_QUESTION, parent: 'pathfinding', deeper: 'dijkstra',
    summary: 'A search method that explores the most promising paths first by guessing how far is left to go. It’s fast and simple, and it has been the default choice for decades.',
    source: 'Example source: first published in 1968 by Hart, Nilsson and Raphael for Shakey, one of the first mobile robots.',
    related: ['dijkstra', 'navigation-meshes', 'pathfinding'],
  },
  'dijkstra': {
    title: 'Dijkstra’s Algorithm', category: 'History', suit: 'spade', depth: 5,
    hole: NPC_QUESTION, parent: 'a-star', deeper: null,
    summary: 'The ancestor of A*: a way to find the shortest path between two points on a map of connections. It still quietly powers route-finding in networks today.',
    source: 'Example source: Edsger Dijkstra said he designed it in about twenty minutes at a café in 1956.',
    related: ['a-star', 'navigation-meshes'],
  },
  'navigation-meshes': {
    title: 'Navigation Meshes', category: 'Technology', suit: 'spade', depth: 4,
    hole: NPC_QUESTION, parent: 'pathfinding', deeper: null,
    summary: 'A simplified map of every surface a character can walk on. Gaps in the mesh are why characters sometimes refuse to cross a perfectly normal doorway.',
    source: 'Example source: game engine documentation on generating walkable areas.',
    related: ['a-star', 'pathfinding'],
  },
  'procedural-generation': {
    title: 'Procedural Generation', category: 'Technology', suit: 'spade', depth: 3,
    hole: NPC_QUESTION, parent: 'game-ai', deeper: 'perlin-noise',
    summary: 'Letting rules and randomness build content instead of placing it by hand. The same idea that builds worlds can build behavior too, and sometimes builds something nobody expected.',
    source: 'Example source: how every Minecraft world grows from a single number called a seed.',
    related: ['perlin-noise', 'game-ai'],
  },
  'perlin-noise': {
    title: 'Perlin Noise', category: 'Technology', suit: 'spade', depth: 4,
    hole: NPC_QUESTION, parent: 'procedural-generation', deeper: null,
    summary: 'A kind of “smooth randomness” that looks natural: rolling hills, clouds, marble. It’s the reason generated landscapes don’t look like TV static.',
    source: 'Example source: Ken Perlin created it after working on the film Tron (1982).',
    related: ['procedural-generation'],
  },
  'uncanny-valley': {
    title: 'The Uncanny Valley', category: 'Design', suit: 'heart', depth: 1,
    hole: NPC_QUESTION, parent: null, deeper: null,
    summary: 'The closer something gets to looking human, the creepier small mistakes feel. A cartoon NPC that glitches is funny; a realistic one is unsettling.',
    source: 'Example source: roboticist Masahiro Mori’s 1970 essay that named the idea.',
    related: ['game-ai', 'behavior-trees'],
  },
  'reminiscence-bump': {
    title: 'The Reminiscence Bump', category: 'Science', suit: 'diamond', depth: 1,
    hole: 'How does music affect memory?', parent: null, deeper: 'nostalgia',
    summary: 'People remember the years between roughly 10 and 30 more vividly than any other time. That’s why the songs from your teenage years stick so hard.',
    source: 'Example source: research on how memories cluster across a lifetime.',
    related: ['nostalgia', 'zeigarnik-effect'],
  },
  'nostalgia': {
    title: 'Nostalgia', category: 'History', suit: 'spade', depth: 2,
    hole: 'How does music affect memory?', parent: 'reminiscence-bump', deeper: null,
    summary: 'Today it’s a warm, bittersweet feeling. It began as a medical diagnosis: a homesickness so strong it was thought to make people physically ill.',
    source: 'Example source: the word was coined in 1688 by a Swiss medical student.',
    related: ['reminiscence-bump'],
  },
  'zeigarnik-effect': {
    title: 'The Zeigarnik Effect', category: 'Random', suit: 'joker', depth: 2,
    hole: 'How does music affect memory?', parent: 'reminiscence-bump', deeper: null,
    summary: 'Unfinished things stick in the mind better than finished ones. An open question nags at you until it’s answered, which may be why curiosity feels so hard to put down.',
    source: 'Example source: Bluma Zeigarnik’s 1920s study, inspired by waiters remembering unpaid orders.',
    related: ['reminiscence-bump'],
  },
  'rem-sleep': {
    title: 'REM Sleep', category: 'Science', suit: 'diamond', depth: 1,
    hole: 'Why do we dream?', parent: null, deeper: 'lucid-dreaming',
    summary: 'The stage of sleep where your eyes dart around, your body is nearly still, and your most vivid dreams happen.',
    source: 'Example source: discovered in 1953 by researchers watching sleepers’ eyes move under closed lids.',
    related: ['lucid-dreaming'],
  },
  'lucid-dreaming': {
    title: 'Lucid Dreaming', category: 'Science', suit: 'diamond', depth: 2,
    hole: 'Why do we dream?', parent: 'rem-sleep', deeper: null,
    summary: 'Knowing you’re dreaming while you’re still inside the dream. Some people can even steer what happens next.',
    source: 'Example source: sleep-lab experiments where dreamers signaled with eye movements.',
    related: ['rem-sleep'],
  },
  'clothoid-loops': {
    title: 'Clothoid Loops', category: 'Design', suit: 'heart', depth: 1,
    hole: 'How do roller coasters stay on the track?', parent: null, deeper: null,
    summary: 'Roller coaster loops aren’t circles. They’re teardrops. A tighter curve at the top and a wider one at the bottom keeps the forces gentle enough for riders.',
    source: 'Example source: the history of early circular loops that gave riders sore necks.',
    related: [],
  },
};


/* ---------- 2. Switching screens ----------
   Every screen is a <section id="screen-NAME">. Only one has the class "is-active". */

const navbar = document.getElementById('navbar');

function showScreen(name, falling = false) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach((screen) => screen.classList.remove('is-active', 'is-falling'));

  const target = document.getElementById('screen-' + name);
  void target.offsetWidth; // forces the browser to restart the enter animation
  target.classList.add('is-active');
  if (falling) target.classList.add('is-falling');

  // Hide the nav on the Welcome screen, and highlight the current link
  navbar.hidden = name === 'welcome';
  const navName = name === 'hole' || name === 'discovery' ? 'home' : name;
  document.querySelectorAll('[data-nav]').forEach((link) => {
    link.classList.toggle('is-active', link.dataset.nav === navName);
  });

  window.scrollTo(0, 0);
}


/* ---------- 3. Filling in the Discovery screen ---------- */

function setText(id, text) {
  document.getElementById(id).textContent = text;
}

function openDiscovery(id, falling) {
  const discovery = discoveries[id];
  const suit = SUITS[discovery.suit];
  const isRed = discovery.suit === 'heart' || discovery.suit === 'diamond';

  setText('detail-title', discovery.title);
  setText('detail-category', discovery.category);
  setText('detail-summary', discovery.summary);
  setText('detail-source', discovery.source);
  setText('detail-stamp', 'Level ' + discovery.depth);
  setText('detail-rank-top', discovery.depth);
  setText('detail-rank-bottom', discovery.depth);
  ['detail-suit-top', 'detail-suit-bottom', 'detail-big-suit'].forEach((suitId) => {
    const el = document.getElementById(suitId);
    el.textContent = suit;
    el.classList.toggle('suit--red', isRed);
    el.classList.toggle('suit--gold', discovery.suit === 'joker');
  });

  // Trail: the question, then each discovery that led here
  let trail = '';
  let step = discovery.parent;
  while (step) {
    trail = `<span aria-hidden="true">↓</span><button class="link" data-discovery="${step}">${discoveries[step].title}</button>` + trail;
    step = discoveries[step].parent;
  }
  document.getElementById('detail-trail').innerHTML =
    `<button class="link" data-go="hole">${discovery.hole}</button>${trail}<span aria-hidden="true">↓</span><strong>${discovery.title}</strong>`;

  // "Go Deeper" leads to the next discovery down, if there is one
  const deeperButton = document.getElementById('go-deeper');
  deeperButton.disabled = !discovery.deeper;
  deeperButton.dataset.discovery = discovery.deeper || '';
  setText('detail-note', discovery.deeper
    ? 'Branch Off starts a new Rabbit Hole from this discovery.'
    : 'This path ends here… for now. Another path?');

  // Related discoveries, drawn as small cards
  const tilts = [-1.4, 1.1, -0.6];
  document.getElementById('detail-related').innerHTML = discovery.related.map((relatedId, i) => {
    const related = discoveries[relatedId];
    const relatedRed = related.suit === 'heart' || related.suit === 'diamond';
    return `
      <button class="card related-card" style="--tilt: ${tilts[i % 3]}deg" data-discovery="${relatedId}" data-fall>
        <span class="card__corner card__corner--top">${related.depth}<span class="suit ${relatedRed ? 'suit--red' : ''}">${SUITS[related.suit]}</span></span>
        <span class="card__category">${related.category}</span>
        <span class="card__title">${related.title}</span>
        <span class="related-card__go">Where does this lead? ↓</span>
      </button>`;
  }).join('') || '<p class="detail__note">No other paths yet.</p>';

  // Remember the title so "Branch Off" can pre-fill the Start screen
  document.getElementById('curiosity').value = '';
  document.getElementById('curiosity').dataset.branchFrom = discovery.title;

  showScreen('discovery', falling);
}


/* ---------- 4. Click handling ----------
   One listener for the whole page:
   data-go="NAME"          → show that screen
   data-discovery="ID"     → open that discovery (data-fall = "falling deeper" animation) */

document.addEventListener('click', (event) => {
  const goButton = event.target.closest('[data-go]');
  if (goButton) {
    // Branch Off: start a new hole that begins from this discovery
    if (goButton.id === 'branch-off') {
      const input = document.getElementById('curiosity');
      input.value = 'Where does ' + input.dataset.branchFrom + ' lead?';
    }
    showScreen(goButton.dataset.go);
    return;
  }

  const discoveryButton = event.target.closest('[data-discovery]');
  if (discoveryButton && discoveryButton.dataset.discovery) {
    openDiscovery(discoveryButton.dataset.discovery, discoveryButton.hasAttribute('data-fall'));
  }
});

// Start screen: any question drops you into the example Rabbit Hole
document.getElementById('start-form').addEventListener('submit', (event) => {
  event.preventDefault();
  showScreen('hole', true);
});

// Enter submits the question (Shift+Enter adds a new line)
document.getElementById('curiosity').addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    document.getElementById('start-form').requestSubmit();
  }
});
