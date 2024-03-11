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
        <p className="text-center text-2xl text-white">
          {session && <span>Logged in as {session?.user?.name}</span>}
          {secretMessage && <span> - {secretMessage}</span>}
        </p>
      )}
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={session ? () => void signOut() : () => void signIn()}
      >
        {session ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default Home;
