import React from "react";

import Rater from "./Rater";

type HarmfulRaterProps = {
  active: boolean;
  count: number;
  onPressHandler: () => void;
};

export default function HarmfulRater({
  count,
  onPressHandler,
  active,
}: HarmfulRaterProps) {
  return (
    <Rater
      count={count}
      iconName="chevron-down"
      size={25}
      color={active ? "#db1f1f" : "gray"}
      onPressHandler={onPressHandler}
    />
  );
}
