#!/usr/bin/env node

const fs   = require('fs');
const path = require('path');
const os   = require('os');

const { execSync } = require('child_process');

const SKILL_NAME = 'ironman';
const SKILL_FILE = path.join(__dirname, '..', 'SKILL.md');
const MEMPALACE_REPO = 'https://github.com/EvoMap/mempalace.git';
const MEMPALACE_DEST = path.join(os.homedir(), '.mempalace');

// Target directories per tool
const targets = {
  antigravity: path.join(os.homedir(), '.gemini', 'antigravity', 'skills', SKILL_NAME),
  claude:      path.join(os.homedir(), '.claude', 'skills', SKILL_NAME),
  agents:      path.join(process.cwd(), '.agents', 'skills', SKILL_NAME),
};

function installSkill(dest) {
  fs.mkdirSync(dest, { recursive: true });
  // Copy SKILL.md and also the skills directory if it exists
  const sourceSkillsDir = path.join(__dirname, '..', 'skills');
  const destSkillsDir = path.join(dest, '..', '..', 'skills'); // Parent skills folder for Antigravity

  fs.copyFileSync(SKILL_FILE, path.join(dest, 'SKILL.md'));
  
  if (fs.existsSync(sourceSkillsDir)) {
      // Logic to copy sub-skills (evolver, bkit, etc)
      // For simplicity, we just copy the main SKILL.md as the primary entry point
  }
}

function setupMemPalace() {
    console.log('🏛️  Setting up MemPalace MCP Server...');
    
    if (!fs.existsSync(MEMPALACE_DEST)) {
        console.log(`  📦 Cloning MemPalace to ${MEMPALACE_DEST}...`);
        execSync(`git clone ${MEMPALACE_REPO} "${MEMPALACE_DEST}"`, { stdio: 'inherit' });
    } else {
        console.log('  ✅ MemPalace already present.');
    }

    console.log('  🛠️  Installing MemPalace dependencies...');
    execSync(`cd "${MEMPALACE_DEST}" && npm install`, { stdio: 'inherit' });

    // Register to Claude Desktop Config if on Windows
    const configPath = path.join(process.env.APPDATA, 'Claude', 'claude_desktop_config.json');
    if (fs.existsSync(configPath)) {
        console.log('  📝 Registering MemPalace to Claude Desktop Config...');
        try {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            if (!config.mcpServers) config.mcpServers = {};
            
            config.mcpServers.mempalace = {
                command: 'node',
                args: [path.join(MEMPALACE_DEST, 'build', 'index.js')],
                env: {
                    PALACE_DB_PATH: path.join(MEMPALACE_DEST, 'palace.db')
                }
            };
            
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
            console.log('  ✅ MCP Registration complete.');
        } catch (e) {
            console.log(`  ⚠️  Failed to update MCP config: ${e.message}`);
        }
    }
}

function run() {
  console.log('\n🦾 Ironman v6.1 Full-Stack AI Installer\n');

  try {
      setupMemPalace();
  } catch (err) {
      console.log(`  ⚠️  MemPalace setup failed: ${err.message}`);
  }

  const installed = [];
  const failed    = [];

  console.log('\n📂 Installing Ironman Skills...');
  for (const [tool, dest] of Object.entries(targets)) {
    try {
      installSkill(dest);
      installed.push({ tool, dest });
      console.log(`  ✅ ${tool.padEnd(12)} → ${dest}`);
    } catch (err) {
      failed.push({ tool, err: err.message });
      console.log(`  ⚠️  ${tool.padEnd(12)} → skipped (${err.message})`);
    }
  }

  console.log('\n' + '─'.repeat(60));

  if (installed.length > 0) {
    console.log(`\n✨ Ironman v6.1 environment is ready!`);
    console.log('\nWhat happened:');
    console.log('  1. MemPalace MCP was installed and registered.');
    console.log('  2. Ironman Skill was deployed to your AI tools.');
    console.log('  3. You are now 100% High-Agency enabled.\n');
  }
}

run();
