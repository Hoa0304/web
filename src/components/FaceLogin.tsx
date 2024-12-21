import React, { useEffect, useRef, useState } from 'react';
import { useVideoStream } from '../hooks/face/useVideoStream';
import { useFaceApi } from '../hooks/face/useFaceApi';
import { useFaceCapture } from '../hooks/face/useFaceCapture';

interface FaceLoginProps {
  onFaceCapture: (imageData: string) => void;
}

const FaceLogin: React.FC<FaceLoginProps> = ({ onFaceCapture }) => {
  const { videoRef } = useVideoStream();  // Lấy videoRef từ hook useVideoStream
  const canvasRef = useRef<HTMLCanvasElement>(null);  // Đối tượng canvas nếu cần
  const modelsLoaded = useFaceApi();
  const { captureImage, captureCount, isCapturing, setIsCapturing } = useFaceCapture(onFaceCapture);

  // State để hiển thị thông báo thành công khi đủ 10 tấm ảnh
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    if (tracks) {
      tracks.forEach(track => track.stop()); // Dừng tất cả các track trong stream
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (captureCount < 50 && modelsLoaded && !isCapturing) {
        setIsCapturing(true);
        // Truyền videoRef.current vào thay vì videoRef
        captureImage(videoRef.current, canvasRef, modelsLoaded).finally(() => setIsCapturing(false));
      } else if (captureCount >= 50) {
        clearInterval(interval);
        setShowSuccessMessage(true);
        stopCamera();
      }
    }, 600);

    return () => clearInterval(interval);
  }, [captureCount, modelsLoaded, isCapturing]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline width="400" height="300" />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      {/* Hiển thị thông báo khi đã chụp đủ 10 tấm ảnh */}
      {showSuccessMessage && (
        <div style={{ color: 'green', fontSize: '18px', marginTop: '20px' }}>
          Chụp ảnh thành công! Bạn đã hoàn thành.
        </div>
      )}
    </div>
  );
};

export default FaceLogin;
