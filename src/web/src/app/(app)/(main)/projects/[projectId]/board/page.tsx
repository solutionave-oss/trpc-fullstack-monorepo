'use client';

import Link from 'next/link';
import { api } from 'src/web/src/client/trpc';

export const Boards = (
  project: Awaited<ReturnType<typeof api.projectRouter.getProject.query>>
) => {
  return (
    <div>
      <div>Boards</div>
      <Link href={`/projects/board/boardId`}>Board Id</Link>
    </div>
  );
};
