'use client';

import { Dropdown, } from 'src/web/src/components/Dropdown';
import { useAuthState, } from 'src/web/src/context/AuthContext';

export default function Index() {
  const { authData, } = useAuthState();

  return (
    <div>
      <div className="mb-2">My Organisations</div>
      <table>
        <thead>
          <tr>
            <th className="text-start border px-3">Code</th>
            <th className="text-start border px-3">Name</th>
            <th className="text-start border px-3"/>
          </tr>
        </thead>
        <tbody>
          { authData.account.organisationMember.map((orgmem) => (
            <tr key={ `${orgmem.accountId}-${orgmem.organisationId}` }>
              <td className="text-start border px-3">
                { orgmem.organisation.code }
              </td>
              <td className="text-start border px-3">
                { orgmem.organisation.name }
              </td>
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
                  ] }
                >
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
