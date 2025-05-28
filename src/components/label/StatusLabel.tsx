import React from "react";
import AlarmsIcon from "@mui/icons-material/AccessAlarmsOutlined";
import CheckIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PlayIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import PauseIcon from '@mui/icons-material/PauseCircleOutline';

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
            return "bg-slate-400";
        }
      })();

      const Icon = (() => {
        switch (type) {
          case "activo":
            return <PlayIcon/>;
          case "pausado":
            return <PauseIcon/>;
          case "completado":
            return <CheckIcon/>;
          default:
            return <AlarmsIcon/>;
        }
      })();

  return (
    <>
      <div className={BgColor + " w-full h-full flex justify-center items-center"} >
        <div className="text-white text-sm py-1 capitalize flex" style={{alignItems: "center", justifyContent: "center"}} >
           <span className="me-2">{Icon}</span> {type}
        </div>
      </div>
    </>
  );
};

export default StatusLabel;
