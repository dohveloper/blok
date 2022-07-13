import React, { useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
interface IImageCropProps {
  image: string;
  closeModal: () => void;
}

function ImageCrop({ image }: IImageCropProps) {
  const [crop, setCrop] = useState<Crop>({
    x: 0,
    y: 0,
    width: 504,
    height: 118,
    unit: 'px',
  });
  const [completedCrop, setCompletedCrop] = useState<Crop>({
    x: 0,
    y: 0,
    width: 504,
    height: 118,
    unit: 'px',
  });

  return (
    <>
      <ReactCrop
        aspect={300 / 300}
        children={image}
        crop={crop}
        onChange={(crop) => setCrop(crop)}
        onComplete={(crop) => setCompletedCrop(crop)}
      />
    </>
  );
}

export default ImageCrop;
