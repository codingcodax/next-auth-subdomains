import { useEffect, useState } from "react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [session, setSession] = useState<{
    user?: { name: string; email: string; image: string };
  }>();

  useEffect(() => {
    const getSession = async () => {
      const res = await fetch(
        "https://auth-app.codingcodax.dev/api/trpc/auth.getSession",
        {
          credentials: "include",
        },
      );
      console.log("🚀 ~ res:", res);
      const sess = (await res.json()) as {
        user?: { name: string; email: string; image: string };
      };
      console.log("🚀 ~ sess:", sess);
      if (sess.user) setSession(sess);
    };

    void getSession();
  }, []);

  return (
    <>
      {session?.user ? (
        <>
          <div>
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
          </div>
          <a
            href={`https://auth-app.codingcodax.dev/api/auth/signout?callbackUrl=${encodeURIComponent(
              "https://auth-www.codingcodax.dev",
            )}`}
          >
            Sign Out
          </a>
        </>
      ) : (
        <a
          href={`https://auth-app.codingcodax.dev/api/auth/signin?callbackUrl=${encodeURIComponent(
            "https://auth-www.codingcodax.dev",
          )}`}
        >
          Sign In
        </a>
      )}
    </>
  );
};

export default Home;
