'use client';

import { Dropdown, } from 'src/web/src/components/Dropdown';
import { useOrganisationState, } from 'src/web/src/context/OrganisationContext';

export default function Index() {
  const { members, } = useOrganisationState();

  return (
    <div>
      <div className="mb-2">Your Contacts</div>
      <table>
        <thead>
          <tr>
            <th className="text-start border px-3">ID</th>
            <th className="text-start border px-3">Email</th>
            <th className="text-start border px-3">Role</th>
            <th className="text-start border px-3"/>
          </tr>
        </thead>
        <tbody>
          { members?.map((member) => (
            <tr key={ member.account.id }>
              <td className="border px-3 py-1">{ member.account.id }</td>
              <td className="border px-3 py-1">{ member.account.email }</td>
              <td className="border px-3 py-1 capitalize">{ member.role }</td>
              <td className="border px-3 py-1">
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
