'use client';

import { useRouter, } from 'next/navigation';
import { useEffect, } from 'react';

import { useAuthState, } from '../context/AuthContext';

export const AuthRedirector = () => {
  const { authData, } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (!authData.account?.id) {
      router.push('/sign-in');
    } else if (!authData.account?.organisationMember.length) {
      router.push('/organisations/create');
    }
  }, [ authData, router, ]);

  return <></>;
};
