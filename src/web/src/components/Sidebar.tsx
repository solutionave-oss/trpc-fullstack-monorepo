import clsx from 'clsx';
import Link from 'next/link';
import { FC } from 'react';

export const Sidebar: FC = () => {
  const itemStyle = clsx(
    'border py-1 rounded-md px-3',
    'hover:text-neutral-700 hover:bg-neutral-200'
  );

  return (
    <div className={clsx('min-w-[250pt] border-r p-3', 'flex flex-col gap-2')}>
      <div className="text-sm text-neutral-400 font-medium px-1">Contacts</div>

      <Link href={'/contacts'} className={itemStyle}>
        Contacts
      </Link>
      <Link href={'/contacts/create'} className={itemStyle}>
        Create Contact
      </Link>
    </div>
  );
};
