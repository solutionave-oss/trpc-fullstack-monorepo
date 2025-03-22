'use client';

import { FC, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import clsx from 'clsx';

type OptionType<T extends string> = { label: string; value: T };

export const Dropdown = <T extends string>({
  children,
  options,
  onClick,
}: {
  children: string;
  options: OptionType<T>[];
  onClick: (data: OptionType<T>) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-1 px-3 py-0.5 bg-white border rounded-lg',
          'shadow-sm hover:bg-gray-50 transition text-sm'
        )}
      >
        {children}
        <FiChevronDown size={16} color="black" />
      </button>

      {isOpen && (
        <div
          className={clsx(
            'absolute left-0 mt-1 w-40 bg-white border rounded-lg shadow-md',
            'flex flex-col py-0.5 z-10'
          )}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              className={clsx(
                'px-4 py-0.5 hover:bg-gray-100 text-left transition',
                'capitalize text-sm'
              )}
              onClick={() => {
                onClick(opt);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
