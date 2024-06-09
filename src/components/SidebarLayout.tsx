import { usePrivy } from "@privy-io/react-auth";
import { BellIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import AdLandBrand from "./Brand";
import { Button } from "./ui/button";
import CastModal from "./CastModal";
import { useModal } from "@/context/ModalContext";

function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { user } = usePrivy();
  const { castModal } = useModal();

  return (
    <div className="flex min-h-full flex-col">
      <header className="shrink-0 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <AdLandBrand className="w-40" />
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

      <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-1 py-2 sm:py-4 sm:px-6 lg:px-8 relative">
        <aside className="sticky top-8 hidden w-44 shrink-0 lg:block"></aside>

        <main className="flex-1 w-full">{children}</main>

        <aside className="sticky top-8 hidden w-96 shrink-0 xl:block">
          <Button
            className="w-full"
            onClick={() => {
              castModal.set(true);
            }}
          >
            Cast
          </Button>
        </aside>
      </div>
      <CastModal />
    </div>
  );
}

export default SidebarLayout;
