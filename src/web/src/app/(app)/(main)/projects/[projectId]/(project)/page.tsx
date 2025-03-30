"use client";

import { zodResolver, } from '@hookform/resolvers/zod';
import { ProjectStatus, } from '@prisma/client';
import { useParams, } from 'next/navigation';
import { useCallback, useEffect, } from 'react';
import { useForm, } from 'react-hook-form';
import { api, } from 'src/web/src/client/trpc';
import { ProjectStatusChanger, } from 'src/web/src/components/projects/ProjectStatusChanger';
import { localToUTC, utcToLocal, } from 'src/web/src/utils/converters';
import { notify, } from 'src/web/src/utils/notifier';
import * as z from 'zod';

const statuses = Object.values(ProjectStatus) as [keyof typeof ProjectStatus];

const schema = z.object({
  name: z.string().min(3),
  startDate: z.string(),
  endDate: z.string().nullable(),
  status: z.enum(statuses).nullable(),
});

type FormData = z.infer<typeof schema>;

export default function Index() {
  const { projectId, } = useParams<{ projectId: string }>();
  const { register, handleSubmit, setValue, watch, } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      startDate: '',
      endDate: '',
    },
  });
  const statusWatched = watch('status');

  const loadData = useCallback(() => {
    api.projectRouter.getProject.query({
      id: projectId,
    }).then((value) => {
      if (value?.name) setValue("name", value.name);
      if (value?.startDate) setValue("startDate", utcToLocal(value.startDate));
      if (value?.endDate) setValue("endDate", utcToLocal(value.endDate));
      if (value?.status) setValue('status', value.status);
    });
  }, [ projectId, setValue, ]);

  useEffect(loadData, [ loadData, ]);

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
    <div className='flex gap-6'>
      <div className='flex flex-row gap-3'>
        <div>Project Status</div>
        <ProjectStatusChanger loadData={ loadData }
          projectId={ projectId }>
          <span className='capitalize'>{ statusWatched?.replace(/_/g, ' ') ?? "Select Status" }</span>
        </ProjectStatusChanger>
      </div>
      <div>
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
          <button type='submit'>Save</button>
        </form>
      </div>
    </div>
  );
}