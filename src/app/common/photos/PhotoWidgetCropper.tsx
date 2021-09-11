import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import ReactCropper from "react-cropper";

const PhotoWidgetCropper = (props: any) => {
  const cropper = useRef<ReactCropper>(null);

  function cropImage() {
    if (typeof cropper.current?.getCroppedCanvas() === "undefined") {
      return;
    }
    cropper.current.getCroppedCanvas().toBlob((blob) => {
      props.setImage(blob);
    }, "image/jpeg");
  }

  return (
    <Cropper
      ref={cropper}
      src={props.imagePreview}
      style={{ height: 200, width: "100%" }}
      // Cropper.js options
      aspectRatio={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      dragMode="move"
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={cropImage}
    />
  );
};

export default PhotoWidgetCropper;
