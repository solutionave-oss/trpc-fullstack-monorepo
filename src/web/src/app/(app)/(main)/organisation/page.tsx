'use client';

import { useAuthState } from 'src/web/src/context/AuthContext';

export default function Index() {
  const { authData } = useAuthState();

  return (
    <div>
      {authData.account.organisationMember.map((organisation) => (
        <div key={`${organisation.accountId}-${organisation.organisationId}`}>
          {organisation.organisation.name}
        </div>
      ))}
    </div>
  );
}
