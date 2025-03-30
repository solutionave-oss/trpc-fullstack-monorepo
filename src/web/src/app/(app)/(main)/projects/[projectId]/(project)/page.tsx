"use client";

import { zodResolver, } from '@hookform/resolvers/zod';
import { useParams, } from 'next/navigation';
import { useEffect, } from 'react';
import { useForm, } from 'react-hook-form';
import { api, } from 'src/web/src/client/trpc';
import { localToUTC, utcToLocal, } from 'src/web/src/utils/converters';
import { notify, } from 'src/web/src/utils/notifier';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(3),
  startDate: z.string(),
  endDate: z.string().nullable(),
});

type FormData = z.infer<typeof schema>;

export default function Index() {

  const { projectId, } = useParams<{ projectId: string }>();
  const { register, handleSubmit, formState: { errors, }, setValue, } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      startDate: '',
      endDate: '',
    },
  });

  useEffect(() => {
    api.projectRouter.getProject.query({
      id: projectId,
    }).then((value) => {
      if (value?.name) setValue("name", value.name);
      if (value?.startDate) setValue("startDate", utcToLocal(value.startDate));
      if (value?.endDate) setValue("endDate", utcToLocal(value.endDate));
    });
  }, [ projectId, setValue, ]);

  const onSubmit = async (data: FormData) => {
    await api.projectRouter.updateProject.mutate({
      id: projectId,
      name: data.name,
      startDate: localToUTC(data.startDate),
      endDate: localToUTC(data.endDate),
    }).catch(() => {
      notify("Cannot update the project");
    });
  };

  return (
    <div className='flex'>
      <form onSubmit={ handleSubmit(onSubmit) }
        className='flex flex-col gap-2'>
        <input type="text"
          { ...register('name') }
          placeholder='Project Name'
        />
        <input type="datetime-local"
          { ...register('startDate') }
        />
        <input type="datetime-local"
          { ...register('endDate') }
        />
        <div>{ errors.name?.message }</div>
        <div>{ errors.startDate?.message }</div>
        <div>{ errors.endDate?.message }</div>
        <button type='submit'>Save</button>

      </form>
    </div>
  );
}