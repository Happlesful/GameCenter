import React, { useState, useEffect } from "react";
import { TZFEGameboard } from "./index";

const TwoZeroFourEight = () => {
  return (
    <div>
      <span className="flex translate-y-10">
        <TZFEGameboard size="4" />
      </span>
    </div>
  );
};

export default TwoZeroFourEight;
