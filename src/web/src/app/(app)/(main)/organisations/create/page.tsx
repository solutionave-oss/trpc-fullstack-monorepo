'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { api } from 'src/web/src/client/trpc';
import { useAuthState } from 'src/web/src/context/AuthContext';
import * as z from 'zod';

const schema = z.object({
  name: z.string(),
});

type SchemaData = z.infer<typeof schema>;

export default function Index() {
  const router = useRouter();
  const { setAuthData } = useAuthState();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async ({ name }: SchemaData) => {
    const response = await api.organisationRouter.registerOrganisation.mutate({
      name,
    });
    if (response.id) {
      const authData = await api.accountRouter.getInfo.query();
      setAuthData(authData);
      router.push('/');
    }
  };

  return (
    <div className="flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx('flex flex-col gap-1')}
      >
        <div>New Organisation</div>
        <input
          {...register('name')}
          type="text"
          placeholder="Organisation Name"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
