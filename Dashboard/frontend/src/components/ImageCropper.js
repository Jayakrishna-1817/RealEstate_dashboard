import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './ImageCropper.css';

function ImageCropper({ onCropComplete, aspectRatio = 450 / 350 }) {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 80,
    height: 80,
    x: 10,
    y: 10,
    aspect: aspectRatio
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  const [fileName, setFileName] = useState('');

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      const file = e.target.files[0];
      setFileName(file.name);
      reader.addEventListener('load', () => {
        setSrc(reader.result);
        // Reset crop when new image is loaded
        setCrop({
          unit: '%',
          width: 80,
          height: 80,
          x: 10,
          y: 10,
          aspect: aspectRatio
        });
      });
      reader.readAsDataURL(file);
    }
  };

  const onImageLoaded = (image) => {
    imgRef.current = image.currentTarget;
    return false;
  };

  const getCroppedImg = () => {
    const image = imgRef.current;
    if (!completedCrop || !image || !completedCrop.width || !completedCrop.height) {
      console.log('Missing crop data or image:', { completedCrop, image });
      return;
    }

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    canvas.width = 450;
    canvas.height = 350;
    const ctx = canvas.getContext('2d');

    // Convert percentage to pixels if needed
    let cropX = completedCrop.x;
    let cropY = completedCrop.y;
    let cropWidth = completedCrop.width;
    let cropHeight = completedCrop.height;

    if (completedCrop.unit === '%') {
      cropX = (completedCrop.x / 100) * image.width;
      cropY = (completedCrop.y / 100) * image.height;
      cropWidth = (completedCrop.width / 100) * image.width;
      cropHeight = (completedCrop.height / 100) * image.height;
    }

    ctx.drawImage(
      image,
      cropX * scaleX,
      cropY * scaleY,
      cropWidth * scaleX,
      cropHeight * scaleY,
      0,
      0,
      450,
      350
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg', 0.95);
    });
  };

  const handleCropComplete = async () => {
    if (!completedCrop || !completedCrop.width || !completedCrop.height) {
      alert('Please adjust the crop area before proceeding');
      return;
    }
    
    const croppedImageBlob = await getCroppedImg();
    if (croppedImageBlob) {
      onCropComplete(croppedImageBlob, fileName);
      setSrc(null);
      setCompletedCrop(null);
    } else {
      alert('Failed to crop image. Please try again.');
    }
  };

  const handleCancel = () => {
    setSrc(null);
    setCompletedCrop(null);
  };

  return (
    <div className="image-cropper">
      <div className="form-group">
        <label>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="file-input"
        />
        <p className="help-text">Image will be cropped to 450 x 350 pixels</p>
      </div>

      {src && (
        <div className="crop-container">
          <ReactCrop
            crop={crop}
            ruleOfThirds
            onChange={(newCrop) => {
              if (newCrop.width && newCrop.height) {
                setCrop(newCrop);
              }
            }}
            onComplete={(c) => {
              if (c.width && c.height) {
                setCompletedCrop(c);
              }
            }}
            aspect={aspectRatio}
          >
            <img
              ref={imgRef}
              src={src}
              alt="Crop preview"
              onLoad={onImageLoaded}
              style={{ maxWidth: '100%' }}
            />
          </ReactCrop>
          <div className="crop-actions">
            <button type="button" onClick={handleCropComplete} className="btn btn-primary">
              Use This Image
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageCropper;
