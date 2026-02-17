import React from "react";
import { Composition } from "remotion";

// Video compositions — will be imported as they're built
// Using lazy imports so the studio doesn't crash if a video isn't done yet
const ChooseYourClass = React.lazy(
  () => import("./videos/01-choose-your-class")
);
const BossBattle = React.lazy(() => import("./videos/02-boss-battle"));
const NewQuest = React.lazy(() => import("./videos/03-new-quest"));
const AngiCosts = React.lazy(() => import("./videos/04-angi-costs"));
const SpotsTaken = React.lazy(() => import("./videos/05-spots-taken"));
const CompetitorSignedUp = React.lazy(
  () => import("./videos/06-competitor-signed-up")
);
const RedFlags = React.lazy(() => import("./videos/07-red-flags"));

const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1920;

export const Root: React.FC = () => {
  return (
    <>
      {/* RPG Videos */}
      <Composition
        id="ChooseYourClass"
        component={ChooseYourClass}
        durationInFrames={FPS * 25}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
      />
      <Composition
        id="BossBattle"
        component={BossBattle}
        durationInFrames={FPS * 30}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
      />
      <Composition
        id="NewQuest"
        component={NewQuest}
        durationInFrames={FPS * 20}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
      />

      {/* Motion Graphics Videos */}
      <Composition
        id="AngiCosts"
        component={AngiCosts}
        durationInFrames={FPS * 25}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
      />
      <Composition
        id="SpotsTaken"
        component={SpotsTaken}
        durationInFrames={FPS * 20}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
      />
      <Composition
        id="CompetitorSignedUp"
        component={CompetitorSignedUp}
        durationInFrames={FPS * 20}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
      />
      <Composition
        id="RedFlags"
        component={RedFlags}
        durationInFrames={FPS * 20}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
      />
    </>
  );
};
