'use client';

import { api } from 'src/web/src/client/trpc';

export const Stakeholders = (
  project: Awaited<ReturnType<typeof api.projectRouter.getProject.query>>
) => {
  return <div>Stakeholders</div>;
};
