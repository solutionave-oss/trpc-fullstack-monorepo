'use client';

import { api } from 'src/web/src/client/trpc';

export const ProjectInformation = (
  project: Awaited<ReturnType<typeof api.projectRouter.getProject.query>>
) => {
  return <div>Project Information</div>;
};
