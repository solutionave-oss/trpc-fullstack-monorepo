import { cookies } from 'next/headers';
import { serverApi } from '../client/trpc';

export default async function Index() {
  await serverApi(await cookies()).accountRouter.getInfo.query();

  return <div>Main</div>;
}
