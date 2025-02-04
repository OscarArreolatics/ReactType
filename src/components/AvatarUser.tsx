import React from "react";
import { Avatar } from "@mui/material";

interface params {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

const AvatarUser: React.FC<params> = (props) => {
  
  const getColorFromText = (text: string): string => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hex = (hash & 0xffffff).toString(16).padStart(6, "0");
    return `#${hex}`;
  };

  return (
    <>
      <Avatar className="p-2" sx={{ backgroundColor: getColorFromText(props.user._id) }}>
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
