'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState, } from 'react';
import { api, } from 'src/web/src/client/trpc';
import { Dropdown, } from 'src/web/src/components/Dropdown';

export default function Index() {
  const [ projects, setProjects, ] =
    useState<Awaited<ReturnType<typeof api.projectRouter.getProjects.query>>>();

  useEffect(() => {
    api.projectRouter.getProjects.query().then((value) => {
      if (value) {
        setProjects(value);
      }
    });
  }, []);

  return (
    <div>
      <div className="mb-2">Projects</div>
      <table>
        <thead>
          <tr>
            <th className="text-start border px-3">Id</th>
            <th className="text-start border px-3">Name</th>
            <th className="text-start border px-3">Start Date</th>
            <th className="text-start border px-3">End Date</th>
            <th className="text-start border px-3">Status</th>
            <th className="text-start border px-3"/>
          </tr>
        </thead>
        <tbody>
          { projects?.map((project) => (
            <tr key={ project.id }>
              <td className="text-start border py-0.5 px-3">{ project.id }</td>
              <td className={ clsx('text-start border py-0.5 px-3 select-none') }>
                <Link
                  href={ `/projects/${project.id}` }
                  className="text-blue-600 hover:underline cursor-pointer active:text-indigo-600">
                  { project.name }
                </Link>
              </td>
              <td className="text-start border py-0.5 px-3">
                { project.startDate }
              </td>
              <td className="text-start border py-0.5 px-3">
                { project.endDate }
              </td>
              <td className="text-start border py-0.5 px-3 capitalize">
                { project.status?.replace(/_/g, ' ') }
              </td>
              <td className="text-start border py-0.5 px-3">
                <Dropdown
                  onClick={ (data) => {
                    switch (data.value) {
                      case '_delete':
                        alert('Delete');
                        break;
                      case '_update':
                        alert('Update');
                    }
                  } }
                  options={ [
                    {
                      value: '_update', label: 'Update',
                    },
                    {
                      value: '_delete', label: 'Delete',
                    },
                  ] }>
                  Actions
                </Dropdown>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}
