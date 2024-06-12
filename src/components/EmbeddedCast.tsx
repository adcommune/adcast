import { FarcasterClientAPI } from "@/services/farcasterClient";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "./ui/card";
import { formatDistance } from "date-fns";
import Link from "next/link";

const EmbeddedCast = ({ cast_id }: { cast_id: string }) => {
  const { data } = useQuery({
    queryKey: ["cast", cast_id],
    queryFn: async () => new FarcasterClientAPI().fetchCast(cast_id),
  });

  const cast = data?.cast;

  return (
    <Link prefetch={false} href={"/" + cast_id}>
      <Card className="p-0 hover:bg-gray-100">
        <CardHeader className="p-2">
          <div className="flex flex-row items-center">
            <img className="h-5 w-5 rounded-full" src={cast?.author.pfp_url} />
            <p className="text-sm font-bold mx-1">
              {cast?.author.display_name}
            </p>
            <p className="text-sm text-gray-400">@{cast?.author.username}</p>
            <p className="mx-2">•</p>
            <p className="text-xs">
              {cast?.timestamp &&
                formatDistance(new Date(cast?.timestamp), new Date(), {})}
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-2 text-sm overflow-hidden break-words">
          {cast?.text}
        </CardContent>
      </Card>
    </Link>
  );
};

export default EmbeddedCast;
