import React from "react";
import { Avatar } from "@mui/material";

interface params {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

const AvatarUser: React.FC<params> = (props) => {
    console.log(props);
    
  return (
    <>
      <Avatar className="p-2" sx={{ backgroundColor: "#00af1b" }}>
        {props.user.name
          .split(" ")
          .slice(0, 2)
          .map((word: string) => word[0]?.toUpperCase())
          .join("")}
      </Avatar>
    </>
  );
};

export default AvatarUser;
