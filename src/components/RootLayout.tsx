import { usePrivy } from "@privy-io/react-auth";
import { BellIcon } from "lucide-react";
import Link from "next/link";

const RootLayoutComponent = ({ children }: { children: React.ReactNode }) => {
  const { user } = usePrivy();

  return (
    <div className="flex min-h-full flex-col">
      <header className="shrink-0 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <p className="font-bold text-2xl">AdCaster</p>
          </Link>
          <div className="flex items-center gap-x-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <Link href="/profile" className="-m-1.5 p-1.5">
              <span className="sr-only">Your profile</span>
              {user?.farcaster?.pfp && (
                <img
                  className="h-8 w-8 rounded-full bg-gray-800"
                  src={user?.farcaster?.pfp}
                  alt=""
                />
              )}
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default RootLayoutComponent;
