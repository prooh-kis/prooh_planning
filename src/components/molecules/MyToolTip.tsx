import { Tooltip } from "antd";
import React from "react";

interface Props {
  label: string;
}

export const MyToolTip = ({ label }: Props) => {
  return (
    <Tooltip title={label || "Label"}>
      <i className="fi fi-br-info text-[#BCBCBC] text-[14px] flex items-center justify-center"></i>
    </Tooltip>
  );
};
