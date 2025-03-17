import { ReactNode } from 'react';
import { AuthRedirector } from 'src/web/src/components/AuthRedirector';
import { Header } from 'src/web/src/components/Header';

export default function Index({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen flex flex-col">
      <AuthRedirector />
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );
}
