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

  return (
    <>
      <div className="flex flex-row mx-auto w-full gap-4 max-w-7xl items-start relative">
        <aside className="sticky top-0 hidden sm:flex grow shrink-0 h-screen py-4 flex-col justify-between">
          <div>
            <Link href="/">
              <p className="font-bold text-3xl">AdCaster</p>
            </Link>
          </div>
          {fcUser ? (
            <div className="flex flex-col gap-2">
              <Link href="/profile">
                <div className="flex items-center justify-between p-2 rounded-md shadow-md bg-white">
                  <div className="flex items-center">
                    {fcUser?.pfp && (
                      <img
                        alt="Profile picture"
                        className="rounded-full"
                        height="40"
                        src={fcUser?.pfp}
                        style={{
                          aspectRatio: "40/40",
                          objectFit: "cover",
                        }}
                        width="40"
                      />
                    )}
                    <div className="ml-2 sm:ml-4">
                      <div className="tracking-wide text-sm text-black dark:text-white font-semibold">
                        {fcUser?.displayName}
                      </div>
                      <div className="text-gray-400 dark:text-gray-300">
                        @{fcUser?.username}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
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
        <main className="w-full sm:w-2/5 py-4">
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
