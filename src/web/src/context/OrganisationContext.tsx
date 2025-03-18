'use client';

import { Account, Organisation } from '@prisma/client';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../client/trpc';
import { useAuthState } from './AuthContext';

const OrganisationContext = createContext<{
  selectedOrganisation?: Organisation;
  setSelectedOrganisation?: (org: Organisation) => void;
  members?: Account[];
  reload?: () => Promise<void>;
}>({});

export const OrganisationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { setAuthData } = useAuthState();
  const [selectedOrganisation, _setSelectedOrganisation] =
    useState<Organisation>();
  const [members, setMembers] = useState<Account[]>([]);

  const setSelectedOrganisation = (org: Organisation) => {
    api.organisationRouter.setOrganisation
      .query({ code: org.code })
      .then(reload);
  };

  const reload = async () => {
    try {
      const [data, members] = await Promise.all([
        api.accountRouter.getInfo.query(),
        api.organisationRouter.getMembers.query(),
      ]);

      if (data.currentOrganisation) {
        _setSelectedOrganisation(data.currentOrganisation);
        setAuthData(data);
      }

      setMembers(members.map((member) => member.account));
    } catch (error) {
      console.error('Error reloading data:', error);
    }
  };

  useEffect(() => {
    api.accountRouter.getInfo.query().then((data) => {
      if (data.currentOrganisation) {
        setAuthData(data);
        setSelectedOrganisation(data.currentOrganisation);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OrganisationContext.Provider
      value={{
        selectedOrganisation,
        setSelectedOrganisation,
        members,
        reload,
      }}
    >
      {children}
    </OrganisationContext.Provider>
  );
};

export const useOrganisationState = () => {
  const organisationState = useContext(OrganisationContext);
  return organisationState;
};
