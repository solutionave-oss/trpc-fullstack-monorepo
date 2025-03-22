import clsx from 'clsx';
import Link from 'next/link';
import { FC } from 'react';

const SIDEBAR: {
  section: string;
  links: {
    href: string;
    label: string;
  }[];
}[] = [
  {
    section: 'Contacts',
    links: [
      {
        label: 'Contacts',
        href: '/contacts',
      },
      {
        label: 'Create Contact',
        href: '/contacts/create',
      },
    ],
  },
  {
    section: 'Organisation',
    links: [
      { label: 'My Organisations', href: '/organisations' },
      { label: 'Create Organisations', href: '/organisations/create' },
    ],
  },
  {
    section: 'Projects',
    links: [
      {
        label: 'Projects',
        href: '/projects',
      },
      {
        label: 'Create Project',
        href: '/projects/create',
      },
    ],
  },
];

export const Sidebar: FC = () => {
  const itemStyle = clsx(
    'border py-1 rounded-md px-3',
    'hover:text-neutral-700 hover:bg-neutral-200'
  );

  return (
    <div className={clsx('min-w-[250pt] border-r p-3', 'flex flex-col gap-2')}>
      {SIDEBAR.map((item) => (
        <div key={item.section} className="flex flex-col gap-2">
          <div className="text-sm text-neutral-400 font-medium px-1">
            {item.section}
          </div>
          {item.links.map((link) => (
            <Link
              className={itemStyle}
              key={`${link.label}_${link.href}`}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};
