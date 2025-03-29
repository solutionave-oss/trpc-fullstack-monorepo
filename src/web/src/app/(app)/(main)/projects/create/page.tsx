'use client';

import { zodResolver, } from '@hookform/resolvers/zod';
import { useRouter, } from 'next/navigation';
import { useForm, } from 'react-hook-form';
import { api, } from 'src/web/src/client/trpc';
import * as z from 'zod';

const schema = z.object({
  name: z.string(),
});

type formData = z.infer<typeof schema>;

export default function Index() {
  const router = useRouter();
  const { register, handleSubmit, } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (data: formData) => {
    api.projectRouter.createProject.mutate(data).then(() => {
      router.push('/projects');
    });
  };

  return (
    <div>
      <div>Create Project</div>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <input type="text" { ...register('name') } placeholder="Project Name"/>
      </form>
    </div>
  );
}
