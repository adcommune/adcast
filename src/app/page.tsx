"use client";

import { usePrivy, useExperimentalFarcasterSigner } from "@privy-io/react-auth";
import {
  ExternalEd25519Signer,
  HubRestAPIClient,
} from "@standard-crypto/farcaster-js";

export default function Home() {
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

    const submitCastResponse = await client.submitCast(
      { text: "Hello world!" },
      farcasterAccount?.fid,
      privySigner
    );
  };

  return (
    <main>
      <p>Farcaster user: {user && user.farcaster?.displayName}</p>
      <p>Has signer: {user?.farcaster?.signerPublicKey ? "True" : "False"}</p>
      <div className="flex flex-col gap-2">
        <button
          className="border p-2 rounded-md border-gray-500"
          onClick={login}
        >
          Link your Farcaster
        </button>
        <button
          className="border p-2 rounded-md border-gray-500"
          onClick={() => requestFarcasterSignerFromWarpcast()}
          // Prevent requesting a Farcaster signer if a user has not already linked a Farcaster account
          // or if they have already requested a signer
          disabled={
            !farcasterAccount || Boolean(farcasterAccount.signerPublicKey)
          }
        >
          Authorize my Farcaster signer from Warpcast
        </button>
        <button
          className="border p-2 rounded-md border-gray-500"
          onClick={cast}
        >
          Cast a message
        </button>
      </div>
    </main>
  );
}
