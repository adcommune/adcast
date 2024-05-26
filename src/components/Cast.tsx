/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZXXB7Tv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card } from "@/components/ui/card";
import { CastWithInteractions } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { format } from "date-fns";

export default function Cast({
  text,
  reactions,
  replies,
  author,
  timestamp,
  frames,
}: CastWithInteractions) {
  const { recasts_count, likes_count } = reactions;
  const { count: reply_count } = replies;
  const { pfp_url, username, display_name } = author;
  console.log(frames);
  return (
    <Card
      key="1"
      className="max-w-[500px] w-full mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-3xl"
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <span className="object-cover md:w-48 rounded-md bg-muted w-[192px] h-[192px]" />
        </div>
        <div className="p-8 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                alt="Profile picture"
                className="rounded-full"
                height="40"
                src={pfp_url}
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
              <div className="ml-4">
                <div className="uppercase tracking-wide text-sm text-black dark:text-white font-semibold">
                  {display_name}
                </div>
                <div className="text-gray-400 dark:text-gray-300">
                  @{username}
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-gray-500 dark:text-gray-300">{text}</p>
          <div className="flex mt-6 justify-between items-center">
            <div className="flex space-x-4 text-gray-400 dark:text-gray-300">
              <div className="flex items-center">
                <HeartIcon className="h-4 w-4" />
                <span className="ml-1">{likes_count}</span>
              </div>
              <div className="flex items-center">
                <MessageCircleIcon className="h-4 w-4" />
                <span className="ml-1">{reply_count}</span>
              </div>
              <div className="flex items-center">
                <RepeatIcon className="h-4 w-4" />
                <span className="ml-1">{recasts_count}</span>
              </div>
            </div>
            <div className="text-gray-400 dark:text-gray-300">
              {format(timestamp, "MMM d, yyyy")}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MessageCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function RepeatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  );
}
