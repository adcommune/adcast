import { FarcasterClientAPI } from "@/services/farcasterClient";
import { useQuery } from "@tanstack/react-query";

const ProfileComponent = ({
  fid,
  children,
}: {
  fid?: number;
  children: React.ReactNode;
}) => {
  const { data } = useQuery({
    queryKey: ["profile-", fid],
    queryFn: async () => new FarcasterClientAPI().fetchProfile(fid),
    enabled: !!fid,
  });

  const user = data?.user;

  return (
    <div className="rounded-lg shadow-lg w-full bg-white pb-5">
      <div className="h-24 bg-gray-600 rounded-t-lg" />
      <div className="px-5">
        {user ? (
          <img
            alt="User avatar"
            className="rounded-full -mt-12 border-4 border-white mx-auto"
            src={user?.pfp_url}
            height="100"
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
            width="100"
          />
        ) : (
          <div
            style={{
              height: "100px",
              aspectRatio: "100/100",
              objectFit: "cover",
              width: "100px",
            }}
            className="rounded-full -mt-12 border-4 bg-gray-400 border-white mx-auto"
          />
        )}
        <div className="text-center mt-2">
          <h2 className="text-xl font-semibold"> {user?.display_name}</h2>
          <p className="text-gray-500">{user?.profile.bio.text}</p>
        </div>
        <div className="flex justify-around my-4">
          <div className="text-center">
            <h3 className="font-semibold text-md">{user?.following_count}</h3>
            <p className="text-gray-500">Following</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-md">{user?.follower_count}</h3>
            <p className="text-gray-500">Followers</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ProfileComponent;
