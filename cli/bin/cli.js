#!/usr/bin/env node

/**
 * ultimate-anim CLI
 *
 * Install the Ultimate Animation Skill Pack into any AI coding assistant.
 *
 * Usage:
 *   npx ultimate-anim init --ai claude
 *   npx ultimate-anim init --ai cursor
 *   npx ultimate-anim init --ai all
 *   npx ultimate-anim init --ai claude --global
 *   npx ultimate-anim uninstall
 *   npx ultimate-anim platforms
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// ── Config ────────────────────────────────────────────────────
const SKILL_NAME = 'ultimate-animations';
const VERSION = '2.0.0';

// Platform definitions: where each AI assistant looks for skills
const PLATFORMS = {
  claude: {
    name: 'Claude Code',
    local: `.claude/skills/${SKILL_NAME}`,
    global: path.join(os.homedir(), `.claude/skills/${SKILL_NAME}`),
    configFile: null, // Claude auto-discovers from .claude/skills/
  },
  cursor: {
    name: 'Cursor',
    local: `.cursor/skills/${SKILL_NAME}`,
    global: path.join(os.homedir(), `.cursor/skills/${SKILL_NAME}`),
    configFile: null,
  },
  windsurf: {
    name: 'Windsurf',
    local: `.windsurf/skills/${SKILL_NAME}`,
    global: path.join(os.homedir(), `.windsurf/skills/${SKILL_NAME}`),
    configFile: null,
  },
  antigravity: {
    name: 'Antigravity',
    local: `.antigravity/skills/${SKILL_NAME}`,
    global: null,
    configFile: null,
  },
  gemini: {
    name: 'Gemini CLI',
    local: `.gemini/skills/${SKILL_NAME}`,
    global: path.join(os.homedir(), `.gemini/skills/${SKILL_NAME}`),
    configFile: null,
  },
  opencode: {
    name: 'OpenCode',
    local: `.opencode/skills/${SKILL_NAME}`,
    global: null,
    configFile: null,
  },
  copilot: {
    name: 'GitHub Copilot',
    local: `.github/skills/${SKILL_NAME}`,
    global: null,
    configFile: null,
  },
  codex: {
    name: 'Codex CLI',
    local: `.codex/skills/${SKILL_NAME}`,
    global: null,
    configFile: null,
  },
  kiro: {
    name: 'Kiro',
    local: `.kiro/skills/${SKILL_NAME}`,
    global: null,
    configFile: null,
  },
  roocode: {
    name: 'Roo Code',
    local: `.roo/skills/${SKILL_NAME}`,
    global: null,
    configFile: null,
  },
  continue: {
    name: 'Continue',
    local: `.continue/skills/${SKILL_NAME}`,
    global: null,
    configFile: null,
  },
  trae: {
    name: 'Trae',
    local: `.trae/skills/${SKILL_NAME}`,
    global: null,
    configFile: null,
  },
};

// Files and folders to copy (relative to assets root)
const SKILL_ITEMS = [
  'SKILL.md',
  'README.md',
  'skill.json',
  'css',
  'gsap',
  'framer',
  'glass',
  'threejs',
  'theatre',
  'shaders',
  'particles',
  'scroll',
  'lottie-rive',
  'presets',
];

// ── Helpers ───────────────────────────────────────────────────

const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  white: '\x1b[37m',
  bgMagenta: '\x1b[45m',
};

function log(msg) { console.log(msg); }
function success(msg) { log(`${COLORS.green}✓${COLORS.reset} ${msg}`); }
function warn(msg) { log(`${COLORS.yellow}⚠${COLORS.reset} ${msg}`); }
function error(msg) { log(`${COLORS.red}✗${COLORS.reset} ${msg}`); }
function info(msg) { log(`${COLORS.cyan}ℹ${COLORS.reset} ${msg}`); }

function banner() {
  log('');
  log(`${COLORS.bgMagenta}${COLORS.white}${COLORS.bold}  ⚡ Ultimate Animation Skill Pack v${VERSION}  ${COLORS.reset}`);
  log(`${COLORS.dim}   Animation intelligence for AI coding assistants${COLORS.reset}`);
  log('');
}

/**
 * Resolve where the bundled assets live.
 * When installed via npm: cli/assets/
 * When run from repo: parent directory (the skill pack root)
 */
function getAssetsRoot() {
  // Check for bundled assets first (npm install)
  const bundled = path.join(__dirname, '..', 'assets');
  if (fs.existsSync(bundled) && fs.existsSync(path.join(bundled, 'SKILL.md'))) {
    return bundled;
  }

  // Fall back to repo root (running from source)
  const repoRoot = path.join(__dirname, '..', '..');
  if (fs.existsSync(path.join(repoRoot, 'SKILL.md'))) {
    return repoRoot;
  }

  return null;
}

/**
 * Recursively copy a directory or file.
 */
function copyRecursive(src, dest) {
  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      // Skip items that shouldn't be copied
      if (['reference_repo', 'cli', 'chibi-parts', 'node_modules', '.git',
           'dummy.html', 'wolf-demo.html', 'chibi.html', 'chibi-puppet.html',
           'puppet.html', 'wolf.png', 'chibi.png', 'references'].includes(entry)) {
        continue;
      }
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

/**
 * Count files in directory recursively.
 */
function countFiles(dir) {
  let count = 0;
  if (!fs.existsSync(dir)) return 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      count += countFiles(path.join(dir, entry.name));
    } else {
      count++;
    }
  }
  return count;
}

/**
 * Remove a directory recursively.
 */
function removeRecursive(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// ── Commands ──────────────────────────────────────────────────

function cmdInit(platform, isGlobal) {
  const assetsRoot = getAssetsRoot();
  if (!assetsRoot) {
    error('Could not find skill pack files. Make sure you are running from the repo or installed via npm.');
    process.exit(1);
  }

  const platforms = platform === 'all' ? Object.keys(PLATFORMS) : [platform];

  for (const p of platforms) {
    const config = PLATFORMS[p];
    if (!config) {
      error(`Unknown platform: ${p}`);
      log(`Run ${COLORS.cyan}ultimate-anim platforms${COLORS.reset} to see available platforms.`);
      continue;
    }

    const targetDir = isGlobal ? config.global : config.local;
    if (!targetDir) {
      warn(`${config.name} does not support ${isGlobal ? 'global' : 'local'} install. Skipping.`);
      continue;
    }

    // Resolve target (local is relative to cwd)
    const resolvedTarget = isGlobal ? targetDir : path.resolve(process.cwd(), targetDir);

    info(`Installing for ${COLORS.bold}${config.name}${COLORS.reset}...`);

    // Clean existing install
    if (fs.existsSync(resolvedTarget)) {
      removeRecursive(resolvedTarget);
    }

    // Copy skill pack files
    fs.mkdirSync(resolvedTarget, { recursive: true });

    for (const item of SKILL_ITEMS) {
      const src = path.join(assetsRoot, item);
      const dest = path.join(resolvedTarget, item);
      if (fs.existsSync(src)) {
        copyRecursive(src, dest);
      }
    }

    const fileCount = countFiles(resolvedTarget);
    success(`${config.name} — ${fileCount} files → ${COLORS.dim}${isGlobal ? targetDir : targetDir}${COLORS.reset}`);
  }

  log('');
  success(`${COLORS.bold}Installation complete!${COLORS.reset}`);
  log('');
  info(`The skill activates automatically when you ask your AI for animation work.`);
  info(`Try: ${COLORS.magenta}"Add a scroll-triggered reveal animation"${COLORS.reset}`);
  log('');
}

function cmdUninstall(platform, isGlobal) {
  const platforms = platform === 'all' ? Object.keys(PLATFORMS) : [platform || 'all'];

  // If no platform specified, try to auto-detect
  if (!platform) {
    info('Auto-detecting installed platforms...');
    let found = false;
    for (const [key, config] of Object.entries(PLATFORMS)) {
      const localPath = path.resolve(process.cwd(), config.local);
      const globalPath = config.global;

      if (fs.existsSync(localPath)) {
        removeRecursive(localPath);
        success(`Removed ${config.name} (local)`);
        found = true;
      }
      if (globalPath && fs.existsSync(globalPath)) {
        removeRecursive(globalPath);
        success(`Removed ${config.name} (global)`);
        found = true;
      }
    }
    if (!found) {
      warn('No installations found.');
    }
    return;
  }

  for (const p of platforms) {
    const config = PLATFORMS[p];
    if (!config) continue;

    const targetDir = isGlobal ? config.global : config.local;
    if (!targetDir) continue;

    const resolvedTarget = isGlobal ? targetDir : path.resolve(process.cwd(), targetDir);

    if (fs.existsSync(resolvedTarget)) {
      removeRecursive(resolvedTarget);
      success(`Removed ${config.name} ${isGlobal ? '(global)' : '(local)'}`);
    } else {
      warn(`${config.name} not installed ${isGlobal ? 'globally' : 'locally'}.`);
    }
  }
}

function cmdPlatforms() {
  log('');
  log(`${COLORS.bold}Supported Platforms:${COLORS.reset}`);
  log('');

  const maxName = Math.max(...Object.values(PLATFORMS).map(p => p.name.length));

  for (const [key, config] of Object.entries(PLATFORMS)) {
    const globalTag = config.global ? `${COLORS.green}✓ global${COLORS.reset}` : `${COLORS.dim}✗ local only${COLORS.reset}`;
    log(`  ${COLORS.cyan}${key.padEnd(14)}${COLORS.reset} ${config.name.padEnd(maxName + 2)} ${globalTag}`);
  }

  log('');
  log(`${COLORS.dim}Install: ${COLORS.reset}${COLORS.cyan}ultimate-anim init --ai <platform>${COLORS.reset}`);
  log(`${COLORS.dim}Global:  ${COLORS.reset}${COLORS.cyan}ultimate-anim init --ai <platform> --global${COLORS.reset}`);
  log(`${COLORS.dim}All:     ${COLORS.reset}${COLORS.cyan}ultimate-anim init --ai all${COLORS.reset}`);
  log('');
}

function cmdHelp() {
  log(`${COLORS.bold}USAGE${COLORS.reset}`);
  log('');
  log(`  ${COLORS.cyan}ultimate-anim init${COLORS.reset} --ai <platform>           Install to current project`);
  log(`  ${COLORS.cyan}ultimate-anim init${COLORS.reset} --ai <platform> --global   Install globally`);
  log(`  ${COLORS.cyan}ultimate-anim init${COLORS.reset} --ai all                   Install for all platforms`);
  log(`  ${COLORS.cyan}ultimate-anim uninstall${COLORS.reset}                        Auto-detect and remove`);
  log(`  ${COLORS.cyan}ultimate-anim uninstall${COLORS.reset} --ai <platform>        Remove specific platform`);
  log(`  ${COLORS.cyan}ultimate-anim platforms${COLORS.reset}                        List supported platforms`);
  log(`  ${COLORS.cyan}ultimate-anim version${COLORS.reset}                          Show version`);
  log(`  ${COLORS.cyan}ultimate-anim help${COLORS.reset}                             Show this help`);
  log('');
  log(`${COLORS.bold}EXAMPLES${COLORS.reset}`);
  log('');
  log(`  ${COLORS.dim}# Install for Claude Code in your project${COLORS.reset}`);
  log(`  ${COLORS.cyan}npx ultimate-anim init --ai claude${COLORS.reset}`);
  log('');
  log(`  ${COLORS.dim}# Install globally for Cursor (all projects)${COLORS.reset}`);
  log(`  ${COLORS.cyan}npx ultimate-anim init --ai cursor --global${COLORS.reset}`);
  log('');
  log(`  ${COLORS.dim}# Install for every supported platform at once${COLORS.reset}`);
  log(`  ${COLORS.cyan}npx ultimate-anim init --ai all${COLORS.reset}`);
  log('');
}

// ── Parse args & run ──────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  // Parse flags
  let platform = null;
  let isGlobal = false;

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--ai' && args[i + 1]) {
      platform = args[i + 1].toLowerCase();
      i++;
    } else if (args[i] === '--global') {
      isGlobal = true;
    }
  }

  banner();

  switch (command) {
    case 'init':
    case 'install':
      if (!platform) {
        error('Missing --ai flag. Example: ultimate-anim init --ai claude');
        log('');
        cmdPlatforms();
        process.exit(1);
      }
      cmdInit(platform, isGlobal);
      break;

    case 'uninstall':
    case 'remove':
      cmdUninstall(platform, isGlobal);
      break;

    case 'platforms':
    case 'list':
      cmdPlatforms();
      break;

    case 'version':
    case '-v':
    case '--version':
      log(`v${VERSION}`);
      break;

    case 'help':
    case '--help':
    case '-h':
    default:
      cmdHelp();
      break;
  }
}

main();
