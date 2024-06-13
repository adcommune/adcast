import { Frame } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { Card, CardContent, CardFooter } from "./ui/card";
import classNames from "classnames";
import { Button } from "./ui/button";

const CastFrame = ({ frame }: { frame: Frame | undefined }) => {
  if (!frame) return null;

  return (
    <Card className="bg-gray-200">
      <CardContent className="p-2">
        <img
          src={frame.image}
          className={classNames("w-full rounded-md", {
            "aspect-square": frame.image_aspect_ratio === "1:1",
          })}
        />
      </CardContent>
      {frame.buttons?.length && (
        <CardFooter
          className={classNames("grid grid-cols-1 p-2 gap-1", {
            "grid-cols-2": frame.buttons?.length >= 2,
          })}
        >
          {frame.buttons?.map((button, i) => {
            return (
              <Button
                key={button.title + "-" + i}
                className="text-xs sm:text-sm"
                disabled
              >
                {button.title}
              </Button>
            );
          })}
        </CardFooter>
      )}
    </Card>
  );
};

export default CastFrame;
