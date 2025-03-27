import { zodResolver, } from '@hookform/resolvers/zod';
import { useForm, } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(3),
  startDate: z.date(),
  endDate: z.date().nullable(),
});

 type FormData = z.infer<typeof schema>

export default function Index() {
  const { register, handleSubmit, } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      endDate: null,
      name: '',
      startDate: new Date(),
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);

  };

  return <div>
    <form onSubmit={ handleSubmit(onSubmit) }>
      <input type="text" { ...register('name') } />
    </form>
  </div>;
}

/**
 * project:
 * name startDate endDate status
 */