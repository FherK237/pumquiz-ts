import type { ReactNode } from 'react';
import { NavBar } from './NavBar';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      {/* Bottom padding on mobile so the fixed bottom tab bar doesn't cover content */}
      <main className="pb-20 md:pb-0">{children}</main>
    </>
  );
}
