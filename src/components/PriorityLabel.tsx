import React from "react";

interface labelprops {
    priority: string;
    type?: number;
}

const PriorityLabel: React.FC<labelprops> = (props) => {
    const BgColor = (() => {
        switch (props.priority) {
          case "alta":
            return "bg-red-600";
          case "media":
            return "bg-yellow-400";
          case "baja":
            return "bg-green-600";
          default:
            return "bg-slate-400";
        }
      })();
  return (
    <>
      <div className={BgColor + " w-full h-full flex justify-center items-center"} >
        <div className="text-white text-sm py-1 capitalize flex" style={{alignItems: "center", justifyContent: "center"}} >
           {props.type&& <span>Prioridad: &nbsp;</span> } {props.priority}
        </div>
      </div>
    </>
  );
};

export default PriorityLabel;
