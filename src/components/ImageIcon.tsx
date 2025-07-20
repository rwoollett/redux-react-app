import React from 'react';
import { ImageData } from '../types/imageData';
import style from './ImageIcon.module.scss';
import { GoPlay } from "react-icons/go";

function ImageIcon({ image, onSelect }: {
  image: ImageData;
  onSelect: (image: ImageData) => void;
}
) {
  return (
    <div className={style.relPos}>
      <img className={style.imgShow}
        src={`${image.urls.raw}&fit=crop&w=120&h=120`}
        alt={image.alt_description}
      />
      <div className={style.overText}>
        <GoPlay
          onClick={() => onSelect(image)}
          className={style.larger}
        />
      </div>
    </div>
  );
}

export default ImageIcon;
