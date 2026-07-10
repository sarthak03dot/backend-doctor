import pc from 'picocolors';
import net from 'net';

export interface SmtpOptions {
  host: string;
  port: number;
  auth?: {
    user: string;
    pass: string;
  };
}

export async function checkMailServer(options: SmtpOptions): Promise<boolean> {
  if (!options || !options.host || !options.port) {
    console.warn(pc.yellow(`[SMTP]                 Missing SMTP host or port. Skipping mail server check.`));
    return false;
  }

  return new Promise((resolve) => {
    const socket = new net.Socket();
    const timeoutMs = 5000;

    socket.setTimeout(timeoutMs);

    socket.on('connect', () => {
      socket.destroy();
      console.log(pc.green(`[SMTP]                 Mail server at ${options.host}:${options.port} is reachable.`));
      resolve(true);
    });

    socket.on('timeout', () => {
      socket.destroy();
      console.error(pc.red(`[SMTP]                 FATAL: Connection to mail server at ${options.host}:${options.port} timed out. Emails/OTPs will fail.`));
      resolve(false);
    });

    socket.on('error', (err) => {
      socket.destroy();
      console.error(pc.red(`[SMTP]                 FATAL: Failed to connect to mail server at ${options.host}:${options.port}. Error: ${err.message}`));
      resolve(false);
    });

    socket.connect(options.port, options.host);
  });
}
