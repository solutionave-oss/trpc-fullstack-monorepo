'use client';

import type { Organisation, } from '@prisma/client';
import type {
  FC,
  ReactNode,
} from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useAuthState, } from './AuthContext';
import { api, } from '../client/trpc';

const OrganisationContext = createContext<{
  selectedOrganisation?: Organisation;
  setSelectedOrganisation?: (org: Organisation) => void;
  members?: Awaited<ReturnType<typeof api.organisationRouter.getMembers.query>>;
  reload?: () => Promise<void>;
    }>({
      reload: async ()=>{
        return new Promise((resolve) => resolve());
      },
    });

export const OrganisationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { setAuthData, } = useAuthState();
  const [ selectedOrganisation, _setSelectedOrganisation, ] =
    useState<Organisation>();
  const [ members, setMembers, ] = useState<
    Awaited<ReturnType<typeof api.organisationRouter.getMembers.query>>
  >([]);

  const reload = useCallback(async () => {
    try {
      const [ data, _members, ] = await Promise.all([
        api.accountRouter.getInfo.query(),
        api.organisationRouter.getMembers.query(),
      ]);

      if (data.currentOrganisation) {
        _setSelectedOrganisation(data.currentOrganisation);
        setAuthData(data);
      }

      setMembers(_members);
    } catch (error) {
      console.error('Error reloading data:', error);
    }
  }, [ setAuthData, ]);

  const setSelectedOrganisation = useCallback((org: Organisation) => {
    api.organisationRouter.setOrganisation
      .query({
        code: org.code,
      })
      .then(reload);
  }, [ reload, ]);

  useEffect(() => {
    api.accountRouter.getInfo.query().then((data) => {
      if (data.currentOrganisation) {
        setAuthData(data);
        setSelectedOrganisation(data.currentOrganisation);
      }
    });
  }, [ setAuthData, setSelectedOrganisation, ]);

  return (
    <OrganisationContext.Provider
      value={ {
        selectedOrganisation,
        setSelectedOrganisation,
        members,
        reload,
      } }
    >
      { children }
    </OrganisationContext.Provider>
  );
};

export const useOrganisationState = () => {
  const organisationState = useContext(OrganisationContext);
  return organisationState;
};
