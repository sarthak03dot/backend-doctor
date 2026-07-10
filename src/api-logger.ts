import { UAParser } from 'ua-parser-js';
import pc from 'picocolors';

export interface ApiLoggerOptions {}

export function apiLogger(options?: ApiLoggerOptions) {
  return (req: any, res: any, next: any) => {
    const start = process.hrtime();
    
    // Attempt to extract country from common cloud provider headers
    const country = req.headers['cf-ipcountry'] 
      || req.headers['x-vercel-ip-country']
      || req.headers['cloudfront-viewer-country']
      || req.headers['x-appengine-country']
      || 'Unknown';

    // Attempt to extract IP
    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() || req.socket?.remoteAddress || req.ip || 'Unknown IP';

    // Parse User Agent
    const uaString = req.headers['user-agent'] || '';
    const parser = new UAParser(uaString);
    const browser = parser.getBrowser();
    const os = parser.getOS();
    
    const browserName = browser.name ? `${browser.name} ${browser.version || ''}`.trim() : 'Unknown Browser';
    const osName = os.name ? `${os.name} ${os.version || ''}`.trim() : 'Unknown OS';

    res.on('finish', () => {
      const diff = process.hrtime(start);
      const timeMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
      
      const method = req.method;
      const url = req.originalUrl || req.url;
      const status = res.statusCode;
      
      let statusColor = pc.green;
      if (status >= 400 && status < 500) statusColor = pc.yellow;
      if (status >= 500) statusColor = pc.red;

      const methodFormatted = pc.bold(method.padEnd(7));
      const urlFormatted = pc.blue(url);
      const statusFormatted = statusColor(status.toString());
      const timeFormatted = pc.magenta(`${timeMs}ms`);
      const geoFormatted = pc.gray(`[${ip} - ${country}]`);
      const sysFormatted = pc.gray(`[${osName}, ${browserName}]`);

      console.log(`${methodFormatted} ${urlFormatted} ${statusFormatted} ${timeFormatted} ${geoFormatted} ${sysFormatted}`);
    });

    next();
  };
}
