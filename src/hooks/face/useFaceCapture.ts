import { useState } from "react";
import * as faceapi from 'face-api.js';

// useFaceCapture.ts
export const useFaceCapture = (onFaceCapture: (imageData: string) => void) => {
    const [captureCount, setCaptureCount] = useState(0);
    const [isCapturing, setIsCapturing] = useState(false);

    const api = import.meta.env.VITE_API_URL;
  
    const captureImage = async (videoElement: HTMLVideoElement | null, canvasRef: React.RefObject<HTMLCanvasElement>, modelsLoaded: boolean) => {
      if (videoElement && modelsLoaded && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          // Lấy kích thước video và vẽ lên canvas
          canvasRef.current.width = videoElement.videoWidth;
          canvasRef.current.height = videoElement.videoHeight;
          ctx.drawImage(videoElement, 0, 0, canvasRef.current.width, canvasRef.current.height);
  
          // Sử dụng face-api.js để nhận diện khuôn mặt
          const detections = await faceapi.detectAllFaces(videoElement)
            .withFaceLandmarks()
            .withFaceDescriptors();
  
          if (detections.length > 0) {
            faceapi.draw.drawDetections(canvasRef.current, detections);
            faceapi.draw.drawFaceLandmarks(canvasRef.current, detections);
          }
  
          // Chuyển canvas thành base64
          const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');
          onFaceCapture(imageDataUrl);
  
          // Lưu ảnh vào JSON Server
          await saveImageToJsonServer(imageDataUrl);
  
          setCaptureCount(prevCount => prevCount + 1);
        }
      }
    };
  
    const saveImageToJsonServer = async (imageDataUrl: string) => {
      try {
        const response = await fetch(`${api}images`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: Date.now(), // Sử dụng timestamp làm ID
            image: imageDataUrl,
          }),
        });
  
        if (!response.ok) {
          console.error('Error saving image to server:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };
  
    return { captureImage, captureCount, isCapturing, setIsCapturing };
  };
  