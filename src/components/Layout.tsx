import { useExperimentalFarcasterSigner, usePrivy } from "@privy-io/react-auth";
import { Button } from "./ui/button";
import {
  ExternalEd25519Signer,
  HubRestAPIClient,
} from "@standard-crypto/farcaster-js";
import Profile from "./Profile";
import AdLandBrand from "./Brand";
import { Badge } from "./ui/badge";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { login, user } = usePrivy();
  const {
    requestFarcasterSignerFromWarpcast,
    signFarcasterMessage,
    getFarcasterSignerPublicKey,
  } = useExperimentalFarcasterSigner();

  const farcasterAccount = user?.farcaster;

  const cast = async () => {
    const privySigner = new ExternalEd25519Signer(
      signFarcasterMessage,
      getFarcasterSignerPublicKey
    );

    const client = new HubRestAPIClient({
      hubUrl: "https://hub.farcaster.standardcrypto.vc:2281",
    });

    if (!farcasterAccount?.fid) {
      return console.error("Farcaster account not linked");
    }

    const submitCastResponse = await client.submitCast(
      { text: "Hello world!" },
      farcasterAccount?.fid,
      privySigner
    );
  };

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
        <Profile fid={user?.farcaster?.fid ?? undefined} />
      </div>
    </div>
  );
};

export { Layout };
