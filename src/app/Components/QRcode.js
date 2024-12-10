import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = ({ url }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <QRCodeCanvas
        value={url}
        size={100}
        bgColor={"#fff"}
        fgColor={"#db4722"}
      />
    </div>
  );
};

export default QRCodeGenerator;
