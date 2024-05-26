import Profile from "./Profile";
import AdLandBrand from "./Brand";
import { Badge } from "./ui/badge";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex gap-4 p-4">
      <div className="w-1/4">
        <div className="flex flex-row items-end gap-1">
          <AdLandBrand className="h-[30px] fill-neutral-500" />
          <Badge className="bg-green-500">Social</Badge>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll px-4">{children}</div>
      </div>
      <div className="w-1/4">
        <Profile />
      </div>
    </div>
  );
};

export { Layout };
