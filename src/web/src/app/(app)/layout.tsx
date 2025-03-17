import { cookies } from 'next/headers';
import { api, serverApi } from '../../client/trpc';
import { AuthProvider } from '../../context/AuthContext';
import { ReactNode } from 'react';
import { OrganisationProvider } from '../../context/OrganisationContext';

export default async function Layout({ children }: { children: ReactNode }) {
  let authData: Awaited<ReturnType<typeof api.accountRouter.getInfo.query>> = {
    email: '',
    id: '',
    organisationMember: [],
  };

  try {
    authData = await serverApi(await cookies()).accountRouter.getInfo.query();
  } catch {
    //
  }
  return (
    <AuthProvider authData={authData}>
      <OrganisationProvider>{children}</OrganisationProvider>
    </AuthProvider>
  );
}
