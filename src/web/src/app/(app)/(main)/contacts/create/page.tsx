'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { api } from 'src/web/src/client/trpc';
import { useOrganisationState } from 'src/web/src/context/OrganisationContext';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SchemaType = z.infer<typeof schema>;

export default function Index() {
  const { reload } = useOrganisationState();
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SchemaType) => {
    api.organisationRouter.addMember.mutate(data).then(() => {
      reload?.().then(() => router.push('/contacts'));
    });
  };

  return (
    <div>
      <div className="mb-4 font-semibold">Add Contacts</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-1 w-[250pt]"
      >
        <input {...register('email')} type="email" placeholder="Email" />
        <input {...register('password')} type="text" placeholder="Password" />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
