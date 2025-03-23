import { cookies } from 'next/headers';
import { serverApi } from 'src/web/src/client/trpc';
import { ProjectForm } from './ProjectForm';

export default async function Index({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await serverApi(
    await cookies()
  ).projectRouter.getProject.query({ id: params.projectId });

  return <div>{project && <ProjectForm {...project} />}</div>;
}
