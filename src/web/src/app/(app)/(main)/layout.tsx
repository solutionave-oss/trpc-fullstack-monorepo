'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useAuthState } from 'src/web/src/context/AuthContext';

export default function Index({ children }: { children: ReactNode }) {
  const { authData } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (!authData?.id) {
      router.push('/sign-in');
    }
  }, [authData, router]);

  return children;
}
