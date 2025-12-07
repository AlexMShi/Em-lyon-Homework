import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { DebugPanel } from '@/components/debug/DebugPanel';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const showDebug = new URLSearchParams(window.location.search).get('debug') === '1';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {showDebug && <DebugPanel />}
    </div>
  );
}
