"use client";

import ProfileComponent from "@/components/ProfileComponent";
import { Button } from "@/components/ui/button";
import { useExperimentalFarcasterSigner, usePrivy } from "@privy-io/react-auth";

export default function Profile() {
  const { login, user: farcasterUser, logout, ready } = usePrivy();
  const { requestFarcasterSignerFromWarpcast } =
    useExperimentalFarcasterSigner();
  const farcasterAccount = farcasterUser?.farcaster;
  const fid = farcasterAccount?.fid || undefined;

  const connected = Boolean(farcasterAccount?.fid);

  const hasSigner = Boolean(farcasterAccount?.signerPublicKey);

  return (
    <ProfileComponent fid={fid}>
      <div className="px-6 py-4 flex flex-col gap-2">
        {!connected ||
          (!ready && (
            <Button className="w-full" onClick={login}>
              Login
            </Button>
          ))}
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
    </ProfileComponent>
  );
}
