import React from "react";

import Rater from "./Rater";

type UncertainRaterProps = {
  active: boolean;
  count: number;
  onPressHandler: () => void;
};

export default function UncertainRater({
  count,
  onPressHandler,
  active,
}: UncertainRaterProps) {
  return (
    <Rater
      count={count}
      iconName="dash"
      size={25}
      color={active ? "#f5cb0f" : "gray"}
      onPressHandler={onPressHandler}
    />
  );
}
