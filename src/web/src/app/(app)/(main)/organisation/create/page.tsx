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
      return router.push('/');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        'h-full flex flex-col items-center',
        'justify-center text-center'
      )}
    >
      <div>New Organisation</div>
      <input
        {...register('name')}
        type="text"
        placeholder="Organisation Name"
      />
      <button type="submit">Create</button>
    </form>
  );
}
