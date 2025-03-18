'use client';

import { useOrganisationState } from 'src/web/src/context/OrganisationContext';

export default function Index() {
  const { members } = useOrganisationState();

  return (
    <div>
      <div>
        <pre>{JSON.stringify(members, null, 2)}</pre>{' '}
      </div>
    </div>
  );
}
