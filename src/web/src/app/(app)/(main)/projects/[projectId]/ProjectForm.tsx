'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { api } from 'src/web/src/client/trpc';

export const ProjectForm = (
  project: Awaited<ReturnType<typeof api.projectRouter.getProject.query>>
) => {
  const [activateTab, setActivateTab] = useState<
    'Project' | 'Boards' | 'Stakeholder' | 'Tickets'
  >('Project');

  const TabSwitcher = () => {
    return (
      <div className="flex flex-row items-center gap-2 mb-3">
        <button
          className={clsx(
            'border px-3 py-0.5 text-neutral-500',
            activateTab === 'Project' && 'border-black text-black'
          )}
          onClick={() => setActivateTab('Project')}
        >
          Project
        </button>
        <button
          className={clsx(
            'border px-3 py-0.5 text-neutral-500',
            activateTab === 'Boards' && 'border-black text-black'
          )}
          onClick={() => setActivateTab('Boards')}
        >
          Boards
        </button>
        <button
          className={clsx(
            'border px-3 py-0.5 text-neutral-500',
            activateTab === 'Stakeholder' && 'border-black text-black'
          )}
          onClick={() => setActivateTab('Stakeholder')}
        >
          Stakeholders
        </button>
        <button
          className={clsx(
            'border px-3 py-0.5 text-neutral-500',
            activateTab === 'Tickets' && 'border-black text-black'
          )}
          onClick={() => setActivateTab('Tickets')}
        >
          Tickets
        </button>
      </div>
    );
  };

  const TabView = ({ tab }: { tab: typeof activateTab }) => {
    switch (tab) {
      case 'Project':
        return <div>Project Information</div>;
      case 'Stakeholder':
        return <div>Stake holders</div>;
      case 'Boards':
        return <div>Boards</div>;
      case 'Tickets':
        return <div>Tickets</div>;
    }
  };

  return (
    <div>
      <div className="px-2">
        <div className="capitalize">{project?.name}</div>
        <div className="text-xs">Started on {project?.startDate}</div>
      </div>
      <hr className="my-2" />
      <TabSwitcher />
      <TabView tab={activateTab} />
    </div>
  );
};
