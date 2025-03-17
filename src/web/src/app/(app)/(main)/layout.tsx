'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useAuthState } from 'src/web/src/context/AuthContext';

export default function Index({ children }: { children: ReactNode }) {
  const { authData } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (!authData?.id) {
      return router.push('/sign-in');
    }
    if (!authData?.organisationMember.length) {
      return router.push('/organisation/create');
    }
  }, [authData, router]);

  return <div className="w-screen h-screen">{children}</div>;
}
