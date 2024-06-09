import { CornerDownLeft, Paperclip, Smile } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ExternalEd25519Signer,
  HubRestAPIClient,
} from "@standard-crypto/farcaster-js";
import { useExperimentalFarcasterSigner, usePrivy } from "@privy-io/react-auth";
import Modal from "./Modal";
import { useModal } from "@/context/ModalContext";

function CastModal() {
  const { castModal } = useModal();

  const { user } = usePrivy();
  const { signFarcasterMessage, getFarcasterSignerPublicKey } =
    useExperimentalFarcasterSigner();

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
    <Modal
      title="Cast something"
      description=""
      isOpen={castModal.show}
      closeModal={() => {
        castModal.set(false);
      }}
      confirm={{
        label: "Cast",
        onClick: () => {},
        loading: false,
        disabled: false,
      }}
      noActions
    >
      <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled variant="ghost" size="icon">
                <Paperclip className="size-4" />
                <span className="sr-only">Attach file</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Attach File</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled variant="ghost" size="icon">
                <Smile className="size-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Use Microphone</TooltipContent>
          </Tooltip>
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CastModal;
