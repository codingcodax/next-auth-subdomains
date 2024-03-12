import { useEffect, useState } from "react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [session, setSession] = useState<{
    user?: { name: string; email: string; image: string };
  }>();

  useEffect(() => {
    const getSession = async () => {
      const res = await fetch("http://localhost:3000/api/auth/session", {
        credentials: "include",
      });
      console.log("🚀 ~ res:", res);
      const sess = (await res.json()) as {
        user?: { name: string; email: string; image: string };
      };
      console.log("🚀 ~ sess:", sess);
      if (sess.user) setSession(sess);
    };

    async () => await getSession();
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
            href={`http://localhost:3000/api/auth/signout?callbackUrl=${encodeURIComponent(
              "http://localhost:3001",
            )}`}
          >
            Sign Out
          </a>
        </>
      ) : (
        <a
          href={`http://localhost:3000/api/auth/signin?callbackUrl=${encodeURIComponent(
            "http://localhost:3001",
          )}`}
        >
          Sign In
        </a>
      )}
    </>
  );
};

export default Home;
