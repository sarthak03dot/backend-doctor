import pc from 'picocolors';
import net from 'net';

/**
 * Parses a database URI to extract host and port.
 */
function parseDbUri(uri: string): { host: string; port: number } | null {
  try {
    const url = new URL(uri);
    const port = url.port ? parseInt(url.port) : (uri.startsWith('postgres') ? 5432 : 27017);
    return { host: url.hostname, port };
  } catch (e) {
    return null;
  }
}

export async function checkDatabase(uri: string): Promise<boolean> {
  if (!uri) {
    console.warn(pc.yellow(`[DATABASE]                 No database URI provided. Skipping check.`));
    return false;
  }

  const parsed = parseDbUri(uri);
  if (!parsed) {
    console.error(pc.red(`[DATABASE]                 FATAL: Invalid Database URI format: ${uri}`));
    return false;
  }

  return new Promise((resolve) => {
    const socket = new net.Socket();
    const timeoutMs = 5000;

    socket.setTimeout(timeoutMs);

    socket.on('connect', () => {
      socket.destroy();
      console.log(pc.green(`[DATABASE]                 Connection to ${parsed.host}:${parsed.port} is reachable.`));
      resolve(true);
    });

    socket.on('timeout', () => {
      socket.destroy();
      console.error(pc.red(`[DATABASE]                 FATAL: Connection to ${parsed.host}:${parsed.port} timed out after ${timeoutMs}ms. Check your firewall, IP whitelist, or VPN.`));
      resolve(false);
    });

    socket.on('error', (err) => {
      socket.destroy();
      console.error(pc.red(`[DATABASE]                 FATAL: Failed to connect to ${parsed.host}:${parsed.port}. Error: ${err.message}`));
      resolve(false);
    });

    socket.connect(parsed.port, parsed.host);
  });
}
