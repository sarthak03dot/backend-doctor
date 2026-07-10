import pc from 'picocolors';
import dns from 'dns';

export async function checkDNS(): Promise<boolean> {
  return new Promise((resolve) => {
    // Attempt to resolve google.com to check basic outbound DNS
    dns.resolve('google.com', (err) => {
      if (err) {
        console.error(pc.red(`[DNS]                 FATAL: DNS Resolution failed. The server cannot resolve outbound domains. External APIs (Stripe, AWS) will fail. Error: ${err.message}`));
        resolve(false);
      } else {
        console.log(pc.green(`[DNS]                 Network and DNS resolution is working properly.`));
        resolve(true);
      }
    });
  });
}
