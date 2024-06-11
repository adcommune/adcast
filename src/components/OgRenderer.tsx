import { ContentType, fetchContentType, fetchMetaTags } from "@/services/og";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";

type OgRendererProps = { url: string };

const OgRenderer = ({ url }: OgRendererProps) => {
  const [contentType, setContentType] = useState<ContentType | null>(null);
  const [webMetaData, setWebMetaData] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const fetchContent = async () => {
    try {
      const { type } = await fetchContentType(url);

      if (type === "web") {
        const { title, description, ...rest } = await fetchMetaTags(url);

        setWebMetaData({ title, description });
      }

      setContentType(type);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [url]);

  if (contentType === null) return null;

  if (contentType === "web") {
    return (
      <Card className="p-2">
        <CardContent className="flex flex-row gap-2 p-0 overflow-hidden">
          <div className="aspect-square border h-14 rounded-md" />
          <div>
            <p className="text-md font-bold text-nowrap">
              {webMetaData?.title || "Title"}
            </p>
            <p className="text-xs text-gray-400  text-ellipsis">
              {webMetaData?.description.substring(0, 100) + "..." ||
                "Description"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <img
      src={url}
      className="w-full aspect-square rounded-md object-contain bg-slate-100"
    />
  );
};

export default OgRenderer;
