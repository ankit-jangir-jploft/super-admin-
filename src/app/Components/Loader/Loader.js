import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loader = ({
  visible = true,
  height = 80,
  width = 80,
  color = "#FD6265",
  wrapperStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Transparent overlay
    zIndex: 9999,
  },
  wrapperClass = "",
}) => {
  if (!visible) return null;
  return (
    <div className={wrapperClass} style={wrapperStyle}>
      <TailSpin
        visible={visible}
        height={height}
        width={width}
        color={color}
        ariaLabel="tail-spin-loading"
        radius="1"
      />
    </div>
  );
};

export default Loader;
