import React from "react";

import Rater from "./Rater";

type HelpfulRaterProps = {
  active: boolean;
  count: number;
  onPressHandler: () => void;
};

export default function HelpfulRater({
  count,
  onPressHandler,
  active,
}: HelpfulRaterProps) {
  return (
    <Rater
      count={count}
      iconName="chevron-up"
      size={25}
      color={active ? "#54d40f" : "gray"}
      onPressHandler={onPressHandler}
    />
  );
}
