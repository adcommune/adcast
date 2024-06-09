"use client";

import Cast from "@/components/Cast";
import { FarcasterClientAPI } from "@/services/farcasterClient";
import { useQuery } from "@tanstack/react-query";

const CastPage = ({ params: { hash } }: { params: { hash: string } }) => {
  const { data } = useQuery({
    queryKey: ["cast-", hash],
    queryFn: async () => {
      return new FarcasterClientAPI().fetchCast(hash);
    },
  });

  return (
    <div className="overflow-y-scroll max-h-[90vh]">
      {data?.conversation.cast && <Cast {...data.conversation.cast} />}
      <div className="flex flex-col gap-2 m-2">
        {data?.conversation.cast.direct_replies?.map((cast) => {
          return <Cast key={cast.hash} {...cast} />;
        })}
      </div>
    </div>
  );
};

export default CastPage;
