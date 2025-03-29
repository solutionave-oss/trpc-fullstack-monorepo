import clsx from 'clsx';
import type { ReactNode, } from 'react';

export default function Layout({ children, }: { children: ReactNode }) {
  return (
    <div className={ clsx('flex flex-row h-screen') }>
      <div
        className={ clsx(
          'border-r border-neutral-200',
          'flex-[1] p-3',
          'flex flex-col justify-between items-center'
        ) }
      >
        <div/>
        <div className="text-xs text-center text-neutral-200">
          <div>
            Aiobisoft 2025 - { new Date().getFullYear() } © All Rights Reserved
          </div>
          <div>Design and developed by Solutionave</div>
        </div>
      </div>
      <div
        className={ clsx(
          'flex-[1.5] p-2 h-full',
          'flex items-center justify-center'
        ) }
      >
        { children }
      </div>
    </div>
  );
}
