/* eslint-disable react/jsx-filename-extension */
import Lightbox from 'react-lightbox-component';
import React from 'react';
import 'react-lightbox-component/build/css/index.css';

const ImageLightbox = (props) => {
  const propImages = [];

  for (let index = 0; index < props.images.split(',').length; index += 1) {
    propImages.push(
      {
        src: props.images.split(',')[index],
        description: `Image ${index + 1} of ${props.images.split(',').length}`,
      },
    );
  }

  return (
    <Lightbox
      images={propImages}
      showImageModifiers
      thumbnailWidth="150px"
      thumbnailHeight="150px"
    />
  );
};

export default ImageLightbox;
