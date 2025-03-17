'use client';

import { useEffect } from 'react';
import { useAuthState } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export const AuthRedirector = () => {
  const { authData } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (!authData?.id) {
      router.push('/sign-in');
    } else if (!authData?.organisationMember.length) {
      router.push('/organisation/create');
    }
  }, [authData, router]);

  return <></>;
};
