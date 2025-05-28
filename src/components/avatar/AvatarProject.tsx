import React from "react";
import { Avatar } from "@mui/material";

interface params {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any;
}

const AvatarProject: React.FC<params> = (props) => {
  return (
    <>
      <Avatar className="p-2 text-white" sx={{ backgroundColor: props.project.color }}>
        {props.project.name
          .split(" ")
          .slice(0, 2)
          .map((word: string) => word[0]?.toUpperCase())
          .join("")}
      </Avatar>
    </>
  );
};

export default AvatarProject;
