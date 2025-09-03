import { CONFIG } from 'src/config-global';

import { SignUpView } from 'src/sections/sign-up/create';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Sign Up - ${CONFIG.appName}`}</title>

      <SignUpView />
    </>
  );
}