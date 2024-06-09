"use client";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/YCXjMGmJSp5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { FarcasterClientAPI } from "@/services/farcasterClient";
import { useExperimentalFarcasterSigner, usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";

export default function Profile() {
  const { login, user: farcasterUser, logout } = usePrivy();
  const { requestFarcasterSignerFromWarpcast } =
    useExperimentalFarcasterSigner();
  const farcasterAccount = farcasterUser?.farcaster;
  const fid = farcasterAccount?.fid || undefined;

  const { data } = useQuery({
    queryKey: ["profile-", fid],
    queryFn: async () => new FarcasterClientAPI().fetchProfile(fid),
    enabled: !!fid,
  });

  const user = data?.user;

  const connected = Boolean(farcasterAccount?.fid);

  const hasSigner = Boolean(farcasterAccount?.signerPublicKey);

  return (
    <div className="rounded-lg shadow-lg w-full">
      <div className="h-24 bg-gray-600 rounded-t-lg" />
      <div className="px-5">
        {connected && (
          <>
            <img
              alt="User avatar"
              className="rounded-full -mt-12 border-4 border-white mx-auto"
              height="100"
              src={user?.pfp_url}
              style={{
                aspectRatio: "100/100",
                objectFit: "cover",
              }}
              width="100"
            />
            <div className="text-center mt-2">
              <h2 className="text-xl font-semibold">{user?.display_name}</h2>
              <p className="text-gray-500">{user?.profile.bio.text}</p>
            </div>
            <div className="flex justify-around my-4">
              <div className="text-center">
                <h3 className="font-semibold text-md">
                  {user?.following_count}
                </h3>
                <p className="text-gray-500">Following</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-md">
                  {user?.follower_count}
                </h3>
                <p className="text-gray-500">Followers</p>
              </div>
            </div>
          </>
        )}
        <div className="px-6 py-4 flex flex-col gap-2">
          {!connected && (
            <Button className="w-full" onClick={login}>
              Login
            </Button>
          )}
          {!hasSigner && connected && (
            <Button
              className="w-full"
              onClick={() => requestFarcasterSignerFromWarpcast()}
            >
              Authorize my Farcaster signer from Warpcast
            </Button>
          )}
          {connected && (
            <Button
              variant="destructive"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
