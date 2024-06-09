import { useModal } from "@/context/ModalContext";
import { Button } from "./ui/button";
import CastModal from "./CastModal";
import Feed from "./Feed";

const FeedLayout = ({ children }: { children: React.ReactNode }) => {
  const { castModal } = useModal();
  return (
    <>
      <div className="flex flex-row mx-auto w-full gap-2 max-w-7xl items-start px-2 py-2 sm:py-4 relative">
        <aside className="sticky top-8 hidden sm:block grow shrink-0 lg:block">
          <Button
            className="w-full"
            onClick={() => {
              castModal.set(true);
            }}
          >
            Cast
          </Button>
        </aside>
        <main className="w-full sm:w-2/5">
          <Feed />
        </main>
        <aside className="sticky top-8 hidden w-2/5 shrink-0 sm:block">
          {children}
        </aside>
      </div>
      <CastModal />
    </>
  );
};

export default FeedLayout;
