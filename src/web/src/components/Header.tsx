'use client';

import clsx from 'clsx';
import { Dropdown } from './Dropdown';
import { useAuthState } from '../context/AuthContext';
import { useOrganisationState } from '../context/OrganisationContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const Header = () => {
  const router = useRouter();
  const { authData } = useAuthState();
  const { selectedOrganisation, setSelectedOrganisation } =
    useOrganisationState();

  useEffect(() => {
    const organisations = authData.account.organisationMember.map(
      (orgmem) => orgmem.organisation
    );

    const preSelectedOrg = organisations.find(
      (org) => org.code === authData.organisation?.code
    );

    if (preSelectedOrg) {
      setSelectedOrganisation?.(preSelectedOrg);
    }
  }, [
    authData.account.organisationMember,
    authData.organisation?.code,
    setSelectedOrganisation,
  ]);

  return (
    <div
      className={clsx(
        'py-1 px-2 bg-neutral-100',
        'flex flex-row items-center gap-2'
      )}
    >
      <div className="text-xl">Aiobisoft</div>
      <Dropdown
        onClick={(data) => {
          if (data.value === '_create_') {
            router.push('/organisation/create');
            return;
          }

          const existing = authData.account.organisationMember.find(
            (org) => org.organisation.code === data.value
          );
          if (existing?.organisation) {
            setSelectedOrganisation?.(existing?.organisation);
          }
        }}
        options={authData.account.organisationMember
          .map((orgmem) => ({
            label: orgmem.organisation.name,
            value: orgmem.organisation.code,
          }))
          .concat([{ label: 'Register New', value: '_create_' }])}
      >
        {selectedOrganisation?.name ?? 'Select Organisation'}
      </Dropdown>
    </div>
  );
};
