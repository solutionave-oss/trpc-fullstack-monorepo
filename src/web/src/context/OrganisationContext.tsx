'use client';

import { Organisation } from '@prisma/client';
import { createContext, FC, ReactNode, useContext, useState } from 'react';

const OrganisationContext = createContext<{
  selectedOrganisation?: Organisation;
  setSelectedOrganisation?: (org: Organisation) => void;
}>({});

export const OrganisationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedOrganisation, _setSelectedOrganisation] =
    useState<Organisation>();

  const setSelectedOrganisation = (org: Organisation) =>
    _setSelectedOrganisation(org);

  return (
    <OrganisationContext.Provider
      value={{ selectedOrganisation, setSelectedOrganisation }}
    >
      {children}
    </OrganisationContext.Provider>
  );
};

export const useOrganisationState = () => {
  const organisationState = useContext(OrganisationContext);
  return organisationState;
};
