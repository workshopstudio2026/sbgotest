import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const wpThemeDir = path.resolve(rootDir, 'wordpress-theme', 'sb-go-theme');
const wpDistDir = path.resolve(wpThemeDir, 'dist');

console.log('📦 Building SB GO for WordPress Theme...');

// Clean up any old zip archives from public and dist so Vite doesn't duplicate them
const oldPublicZip = path.resolve(rootDir, 'public', 'sb-go-theme.zip');
const oldDistZip = path.resolve(rootDir, 'dist', 'sb-go-theme.zip');
if (fs.existsSync(oldPublicZip)) fs.unlinkSync(oldPublicZip);
if (fs.existsSync(oldDistZip)) fs.unlinkSync(oldDistZip);

// 1. Run Vite build with relative base
try {
  execSync('npx --no-install vite build', {
    cwd: rootDir,
    stdio: 'inherit',
    env: { ...process.env, VITE_WP_BUILD: 'true' }
  });
} catch (err) {
  console.error('Failed to run vite build:', err);
  process.exit(1);
}

// 2. Ensure theme dist folder exists
if (fs.existsSync(wpDistDir)) {
  fs.rmSync(wpDistDir, { recursive: true, force: true });
}
fs.mkdirSync(wpDistDir, { recursive: true });

// 3. Copy dist into wordpress-theme/sb-go-theme/dist
const distDir = path.resolve(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  fs.cpSync(distDir, wpDistDir, { recursive: true });
  console.log('✅ Copied compiled assets to wordpress-theme/sb-go-theme/dist');
}

// 4. Copy public static assets into theme dist as well
const publicDir = path.resolve(rootDir, 'public');
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, wpDistDir, { recursive: true, filter: (src) => !src.includes('node_modules') && !src.endsWith('.zip') });
  console.log('✅ Copied public assets into wordpress-theme/sb-go-theme/dist');
}

// 5. Generate ready-to-upload zip archives
try {
  execSync('python3 scripts/zip-theme.py', { cwd: rootDir, stdio: 'inherit' });
  console.log('✅ Created ready-to-upload theme zip at public/sb-go-theme.zip and wordpress-theme/sb-go-theme.zip');
} catch (e) {
  console.warn('Zip archive creation skipped:', e.message);
}

console.log('🎉 WordPress Theme is ready in: wordpress-theme/sb-go-theme/');
console.log('👉 To install on WordPress:');
console.log('   1. Copy the "sb-go-theme" folder to your WordPress "wp-content/themes/" directory');
console.log('   2. Go to WordPress Admin -> Appearance -> Themes');
console.log('   3. Activate "SB GO Stationery"');
