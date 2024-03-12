import type { NextPage } from "next";
import { signIn, signOut } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: session } = api.auth.getSession.useQuery();
  const { data: secretMessage } = api.auth.getSecretMessage.useQuery(
    undefined,
    {
      enabled: !!session?.user,
    },
  );

  return (
    <div>
      <p>home page</p>

      {session?.user && (
        <p>
          {session && <span>Logged in as {session?.user?.name}</span>}
          {secretMessage && <span> - {secretMessage}</span>}
        </p>
      )}
      <button onClick={session ? () => void signOut() : () => void signIn()}>
        {session ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default Home;
