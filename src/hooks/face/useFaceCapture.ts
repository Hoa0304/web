import { useState } from "react";
import * as faceapi from 'face-api.js';

// useFaceCapture.ts
export const useFaceCapture = (onFaceCapture: (imageData: string) => void, userId: string) => {
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
        await saveImageToJsonServer(imageDataUrl, userId);
  
        setCaptureCount(prevCount => prevCount + 1);
      }
    }
  };

  const saveImageToJsonServer = async (imageDataUrl: string, id: string) => {
    try {
      // Lấy dữ liệu người dùng từ API theo userId
      const userResponse = await fetch(`${api}users/${id}`);
      
      if (!userResponse.ok) {
        console.error('User not found or error fetching user:', userResponse.statusText);
        return; // Nếu không tìm thấy người dùng, thoát khỏi hàm
      }
      
      const user = await userResponse.json();
  
      // Kiểm tra nếu faceImage là một mảng, nếu không khởi tạo nó
      if (!Array.isArray(user.faceImage)) {
        user.faceImage = [];
      }
  
      // Thêm ảnh vào mảng faceImage
      user.faceImage.push(imageDataUrl);
  
      // Cập nhật lại thông tin người dùng với mảng faceImage mới
      const response = await fetch(`${api}users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user), // Gửi lại đối tượng người dùng đã được cập nhật
      });
  
      if (!response.ok) {
        console.error('Error saving image to server:', response.statusText);
      } else {
        console.log('Image saved successfully');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };
  
  return { captureImage, captureCount, isCapturing, setIsCapturing };
};
