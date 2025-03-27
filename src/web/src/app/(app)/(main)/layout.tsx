'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { AuthRedirector } from 'src/web/src/components/AuthRedirector';
import { Header } from 'src/web/src/components/Header';
import { Sidebar } from 'src/web/src/components/Sidebar';
import { useAuthState } from 'src/web/src/context/AuthContext';

export default function Index({ children }: { children: ReactNode }) {
  const { authData } = useAuthState();
  const pathname = usePathname();

  if (
    !authData.account.organisationMember.length &&
    pathname !== '/organisations/create'
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <AuthRedirector />
        <Link href={'/organisations/create'}>Create Organisations</Link>
      </div>
    );
  }

  if (
    pathname === '/organisations/create' &&
    !authData.account.organisationMember.length
  ) {
    return (
      <div className="flex flex-row h-screen">
        <AuthRedirector />
        <div className={clsx('flex-[1.5] border-r')}>{children}</div>
        <div className="flex-[1]">Banner</div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <AuthRedirector />
      <Header />
      <div className={clsx('flex-1 flex flex-row')}>
        <Sidebar />
        <div className="p-3 w-full">{children}</div>
      </div>
    </div>
  );
}
