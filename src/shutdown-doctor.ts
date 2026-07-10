import pc from 'picocolors';

export function setupGracefulShutdown(cleanupFn?: () => Promise<void>) {
  const shutdown = async (signal: string) => {
    console.log(pc.cyan(`\n[SHUTDOWN DOCTOR] Received ${signal}. Starting graceful shutdown...`));
    
    if (cleanupFn) {
      try {
        await cleanupFn();
        console.log(pc.green(`[SHUTDOWN DOCTOR]                 Cleanup complete.`));
      } catch (err) {
        console.error(pc.red(`[SHUTDOWN DOCTOR]                 Cleanup failed: ${(err as Error).message}`));
      }
    }
    
    console.log(pc.cyan(`Goodbye!`));
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  console.log(pc.green(`[SHUTDOWN DOCTOR]                 Graceful shutdown listeners active.`));
}
