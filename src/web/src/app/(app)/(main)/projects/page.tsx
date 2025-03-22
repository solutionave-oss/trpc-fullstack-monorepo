'use client';

import { useEffect, useState } from 'react';
import { api } from 'src/web/src/client/trpc';

export default function Index() {
  const [projects, setProjects] =
    useState<Awaited<ReturnType<typeof api.projectRouter.getProjects.query>>>();

  useEffect(() => {
    api.projectRouter.getProjects.query().then((value) => {
      if (value) {
        setProjects(value);
      }
    });
  }, []);

  return (
    <div>
      <div>Projects</div>
      <pre>{JSON.stringify(projects, null, 2)}</pre>
    </div>
  );
}
