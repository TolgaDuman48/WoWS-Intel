import type { Metadata } from 'next';
import './globals.css';
import './catalog.css';

export const metadata: Metadata = {
  title: 'WoWS Intel',
  description: 'World of Warships technical tree, hidden stats, builds and ship comparison.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body>{children}</body></html>;
}
