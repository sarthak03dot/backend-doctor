#!/usr/bin/env node

import { runDiagnostics } from './index';
import pc from 'picocolors';

async function main() {
  console.log(pc.magenta('[Start] Starting backend-doctor CLI check...\n'));
  await runDiagnostics({
    enableCrashDoctor: false, // Don't crash the CLI unexpectedly
  });
}

main().catch(err => {
  console.error(pc.red('CLI failed with error:'), err);
  process.exit(1);
});
