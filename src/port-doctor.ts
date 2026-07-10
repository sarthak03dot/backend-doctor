import pc from 'picocolors';
import net from 'net';

export async function checkPort(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        console.error(pc.red(`[PORT]                 FATAL: Port ${port} is already in use. Your deployment will crash.`));
      } else if (err.code === 'EACCES') {
        console.error(pc.red(`[PORT]                 FATAL: You do not have permission to bind to port ${port}.`));
      } else {
        console.error(pc.red(`[PORT]                 FATAL: Could not bind to port ${port}. Error: ${err.message}`));
      }
      resolve(false);
    });

    server.once('listening', () => {
      server.close();
      console.log(pc.green(`[PORT]                 Port ${port} is available.`));
      resolve(true);
    });

    server.listen(port);
  });
}
