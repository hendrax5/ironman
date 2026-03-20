#!/usr/bin/env node

const fs   = require('fs');
const path = require('path');
const os   = require('os');

const SKILL_NAME = 'ironman';
const SKILL_FILE = path.join(__dirname, '..', 'SKILL.md');

// Target directories per tool
const targets = {
  antigravity: path.join(os.homedir(), '.gemini', 'antigravity', 'skills', SKILL_NAME),
  claude:      path.join(os.homedir(), '.claude', 'skills', SKILL_NAME),
  agents:      path.join(process.cwd(), '.agents', 'skills', SKILL_NAME),
};

function install(dest) {
  fs.mkdirSync(dest, { recursive: true });
  fs.copyFileSync(SKILL_FILE, path.join(dest, 'SKILL.md'));
}

function run() {
  console.log('\n🦾 Ironman Skill Installer v5.0\n');

  const installed = [];
  const failed    = [];

  for (const [tool, dest] of Object.entries(targets)) {
    try {
      install(dest);
      installed.push({ tool, dest });
      console.log(`  ✅ ${tool.padEnd(12)} → ${dest}`);
    } catch (err) {
      failed.push({ tool, err: err.message });
      console.log(`  ⚠️  ${tool.padEnd(12)} → skipped (${err.message})`);
    }
  }

  console.log('\n' + '─'.repeat(60));

  if (installed.length > 0) {
    console.log(`\n✨ ${installed.length} location(s) installed successfully!`);
    console.log('\nHow to use:');
    console.log('  • Antigravity → just call the agent, skill is auto-detected');
    console.log('  • Claude Code → skill auto-loads from ~/.claude/skills/');
    console.log('  • Project     → commit .agents/skills/ironman/ to your repo\n');
  }

  if (failed.length > 0) {
    console.log(`ℹ️  ${failed.length} location(s) skipped (not all tools need to be present)\n`);
  }
}

run();
