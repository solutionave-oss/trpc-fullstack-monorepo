'use client';

import { useAuthState } from '../../../context/AuthContext';

export default function Index() {
  const { authData } = useAuthState();

  return (
    <div>
      Main
      <div>
        <pre>{JSON.stringify(authData, null, 2)}</pre>
      </div>
    </div>
  );
}
