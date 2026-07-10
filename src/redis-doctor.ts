import pc from 'picocolors';
import net from 'net';

function parseRedisUri(uri: string): { host: string; port: number } | null {
  try {
    const url = new URL(uri);
    return { host: url.hostname, port: url.port ? parseInt(url.port) : 6379 };
  } catch (e) {
    return null;
  }
}

export async function checkRedis(uri: string): Promise<boolean> {
  if (!uri) return true;

  const parsed = parseRedisUri(uri);
  if (!parsed) {
    console.error(pc.red(`[REDIS]                 FATAL: Invalid Redis URI format: ${uri}`));
    return false;
  }

  return new Promise((resolve) => {
    const socket = new net.Socket();
    const timeoutMs = 3000;

    socket.setTimeout(timeoutMs);

    socket.on('connect', () => {
      socket.destroy();
      console.log(pc.green(`[REDIS]                 Cache server at ${parsed.host}:${parsed.port} is reachable.`));
      resolve(true);
    });

    socket.on('timeout', () => {
      socket.destroy();
      console.error(pc.red(`[REDIS]                 FATAL: Connection to cache at ${parsed.host}:${parsed.port} timed out after ${timeoutMs}ms.`));
      resolve(false);
    });

    socket.on('error', (err) => {
      socket.destroy();
      console.error(pc.red(`[REDIS]                 FATAL: Failed to connect to cache at ${parsed.host}:${parsed.port}. Error: ${err.message}`));
      resolve(false);
    });

    socket.connect(parsed.port, parsed.host);
  });
}
