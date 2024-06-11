import { useModal } from "@/context/ModalContext";
import { Button } from "./ui/button";
import CastModal from "./CastModal";
import Feed from "./Feed";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";

const FeedLayout = ({ children }: { children: React.ReactNode }) => {
  const { castModal } = useModal();
  const { user, login } = usePrivy();

  const fcUser = user?.farcaster;

  const brand = (
    <div>
      <Link href="/">
        <p className="font-bold text-3xl">AdCaster</p>
      </Link>
    </div>
  );

  const profile_link = (
    <Link href="/profile">
      <div className="flex items-center justify-between border p-2 rounded-md shadow-sm bg-white">
        <div className="flex items-center">
          {fcUser?.pfp && (
            <img
              alt="Profile picture"
              className="rounded-full h-6 sm:h-10 aspect-square"
              src={fcUser?.pfp}
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
            />
          )}
          <div className="ml-2 sm:ml-4">
            <div className="tracking-wide text-sm text-black dark:text-white font-semibold">
              {fcUser?.displayName}
            </div>
            <div className="text-gray-400 hidden sm:flex dark:text-gray-300">
              @{fcUser?.username}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row mx-auto w-full  gap-2 sm:gap-4 max-w-7xl items-start relative">
        <nav className="w-full flex flex-row justify-between fixed sm:hidden right-0 left-0 px-2 py-2 bg-white">
          {brand}
          {user?.farcaster ? (
            profile_link
          ) : (
            <Button onClick={login} size={"sm"}>
              Login
            </Button>
          )}
        </nav>
        <aside className="sticky top-0 hidden sm:flex grow shrink-0 h-screen py-4 flex-col justify-between">
          {brand}
          {fcUser ? (
            <div className="flex flex-col gap-2">
              {profile_link}
              <Button
                className="w-full"
                onClick={() => {
                  castModal.set(true);
                }}
              >
                Cast
              </Button>
            </div>
          ) : (
            <Button onClick={login}>Login</Button>
          )}
        </aside>
        <main className="w-full sm:w-2/5 px-2 sm:px-0 pt-16">
          <Feed />
        </main>
        <aside className="sticky top-0 hidden w-2/5 shrink-0 sm:flex py-4 h-screen">
          {children}
        </aside>
      </div>
      <CastModal />
    </>
  );
};

export default FeedLayout;
