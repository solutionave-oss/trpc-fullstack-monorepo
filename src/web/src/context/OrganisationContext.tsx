'use client';

import { Organisation } from '@prisma/client';
import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { api } from '../client/trpc';
import { useAuthState } from './AuthContext';

const OrganisationContext = createContext<{
  selectedOrganisation?: Organisation;
  setSelectedOrganisation?: (org: Organisation) => void;
}>({});

export const OrganisationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { setAuthData } = useAuthState();
  const [selectedOrganisation, _setSelectedOrganisation] =
    useState<Organisation>();

  const setSelectedOrganisation = (org: Organisation) => {
    api.organisationRouter.setOrganisation
      .query({ code: org.code })
      .then(() => {
        api.accountRouter.getInfo.query().then((data) => {
          if (data.currentOrganisation) {
            _setSelectedOrganisation(data.currentOrganisation);
            setAuthData(data);
          }
        });
      });
  };

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
