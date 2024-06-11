import { FarcasterClientAPI } from "@/services/farcasterClient";
import { useQuery } from "@tanstack/react-query";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";

type HoverProfileProps = {
  fid: number;
  children: React.ReactNode;
};

const HoveredProfile = ({ fid, children }: HoverProfileProps) => {
  const { data } = useQuery({
    queryKey: ["profile-", fid],
    queryFn: async () => new FarcasterClientAPI().fetchProfile(fid),
    enabled: !!fid,
  });

  const user = data?.user;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent>
        <div>
          <div className="flex flex-col">
            <div className="flex flex-row w-full items-center justify-between">
              <img
                alt="User avatar"
                className="rounded-full h-10 w-10 object-cover"
                src={user?.pfp_url}
              />
              <Button className="" disabled size="sm" variant="outline">
                Follow
              </Button>
            </div>
            <div className="text-left mt-2">
              <h2 className="font-semibold text-md"> {user?.display_name}</h2>
              <h2 className="font-light text-sm mb-1">@{user?.username}</h2>
              <p className="text-gray-500 text-sm">{user?.profile.bio.text}</p>
            </div>{" "}
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row items-center">
                <h3 className="font-semibold text-md">
                  {user?.following_count}
                </h3>
                <p className="text-gray-500 ml-1 text-sm">Following</p>
              </div>
              <div className="flex flex-row items-center">
                <h3 className="font-semibold text-md">
                  {user?.follower_count}
                </h3>
                <p className="text-gray-500 ml-1 text-sm">Followers</p>
              </div>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoveredProfile;
