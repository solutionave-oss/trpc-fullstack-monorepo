import clsx from 'clsx';
import { ReactNode } from 'react';
import { AuthRedirector } from 'src/web/src/components/AuthRedirector';
import { Header } from 'src/web/src/components/Header';
import { Sidebar } from 'src/web/src/components/Sidebar';

export default function Index({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen flex flex-col">
      <AuthRedirector />
      <Header />
      <div className={clsx('flex-1 flex flex-row')}>
        <Sidebar />
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}
