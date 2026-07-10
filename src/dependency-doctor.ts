import fs from 'fs';
import path from 'path';
import pc from 'picocolors';

export function checkDependencies(): boolean {
  console.log(pc.blue('Dependency Diagnostics:'));
  try {
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      console.warn(pc.yellow('  [Warning] No package.json found. Skipping dependency check.'));
      return false;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    let ok = true;
    
    // Check for some notorious old/deprecated packages just as an example
    const deprecated = ['request', 'moment'];
    
    for (const dep of deprecated) {
      if (deps[dep]) {
        console.warn(pc.red(`  [Error] Deprecated dependency found: ${dep}. Please consider migrating.`));
        ok = false;
      }
    }

    if (ok) {
      console.log(pc.green('  [OK] No known deprecated dependencies found.'));
    }
    return ok;
  } catch (error: any) {
    console.warn(pc.yellow(`  [Warning] Could not check dependencies: ${error.message}`));
    return false;
  }
}
