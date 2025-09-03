import { CONFIG } from 'src/config-global';

import { UserView } from 'src/sections/sign-up/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Users - ${CONFIG.appName}`}</title>

      <UserView />
    </>
  );
}
