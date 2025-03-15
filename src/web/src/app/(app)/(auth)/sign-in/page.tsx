'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { api } from 'src/web/src/client/trpc';
import { useAuthState } from 'src/web/src/context/AuthContext';
import { notify } from 'src/web/src/utils/notifier';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});

type schemaType = z.infer<typeof schema>;

export default function SignIn() {
  const router = useRouter();
  const { setAuthData } = useAuthState();
  const { handleSubmit, register } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'abubakar@gmail.com',
      password: 'asdf1234',
    },
  });

  const onSubmit = async (data: schemaType) => {
    try {
      const result = await api.accountRouter.signIn.mutate(data);

      const account = await api.accountRouter.getInfo.query();
      setAuthData(account);

      if (result.token) {
        router.push('/');
      }
    } catch (_error) {
      const error = _error as { message: string };
      notify(error.message ?? 'Something went wrong');
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 min-w-[250pt]"
      >
        <input {...register('email')} type="email" />
        <input {...register('password')} type="text" />
        <button>Sign In</button>
      </form>
    </div>
  );
}
