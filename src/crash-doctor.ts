import pc from 'picocolors';

export function setupCrashDoctor() {
  process.on('unhandledRejection', (reason, promise) => {
    console.error(pc.bgRed(pc.white('\n[CRASH DOCTOR]    UNHANDLED PROMISE REJECTION \n')));
    console.error(pc.red(`A promise failed but had no .catch() block to handle it.`));
    console.error(pc.yellow(`Reason:`), reason);
    console.error(pc.gray(`\nTo fix this, ensure all async functions are wrapped in try/catch or appended with .catch()\n`));
  });

  process.on('uncaughtException', (error) => {
    console.error(pc.bgRed(pc.white('\n[CRASH DOCTOR]    UNCAUGHT EXCEPTION \n')));
    console.error(pc.red(`A fatal error occurred outside of a request context.`));
    console.error(pc.yellow(`Error message: ${error.message}`));
    console.error(pc.gray(error.stack));
    console.error(pc.gray(`\nNode.js will now exit. Please fix the error above.\n`));
    process.exit(1);
  });

  console.log(pc.green(`[CRASH DOCTOR]                 Crash interceptors enabled.`));
}
