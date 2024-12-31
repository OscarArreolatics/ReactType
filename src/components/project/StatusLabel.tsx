import React from "react";
import AlarmsIcon from "@mui/icons-material/AccessAlarmsOutlined";
import CheckIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PlayIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";

interface labelprops {
    type: string;
}

const StatusLabel: React.FC<labelprops> = ({type}) => {
    const BgColor = (() => {
        switch (type) {
          case "activo":
            return "bg-emerald-400";
          case "pausado":
            return "bg-orange-400";
          case "completado":
            return "bg-blue-400";
          default:
            return "";
        }
      })();

      const Icon = (() => {
        switch (type) {
          case "activo":
            return <PlayIcon/>;
          case "pausado":
            return <AlarmsIcon/>;
          case "completado":
            return <CheckIcon/>;
          default:
            return "";
        }
      })();

  return (
    <>
      <div className={BgColor}>
        <div className="text-white text-sm py-1 capitalize flex" style={{alignItems: "center", justifyContent: "center"}} >
           <span className="me-2">{Icon}</span> {type}
        </div>
      </div>
    </>
  );
};

export default StatusLabel;
