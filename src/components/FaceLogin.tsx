import React, { useEffect, useRef, useState } from 'react';
import { useVideoStream } from '../hooks/face/useVideoStream';
import { useFaceApi } from '../hooks/face/useFaceApi';
import { useFaceCapture } from '../hooks/face/useFaceCapture';

interface FaceLoginProps {
  onFaceCapture: (imageData: string) => void;
  userId: string;
}

const FaceLogin: React.FC<FaceLoginProps> = ({ onFaceCapture, userId }) => {
  const { videoRef } = useVideoStream();  // Lấy videoRef từ hook useVideoStream
  const canvasRef = useRef<HTMLCanvasElement>(null);  // Đối tượng canvas nếu cần
  const modelsLoaded = useFaceApi();
  
  // Truyền thêm userId vào useFaceCapture
  const { captureImage, captureCount, isCapturing, setIsCapturing } = useFaceCapture(onFaceCapture, userId);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isCapturingManually, setIsCapturingManually] = useState(false); // State for manual control

  // Dừng camera khi đã chụp đủ ảnh
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    if (tracks) {
      tracks.forEach(track => track.stop()); // Dừng tất cả các track trong stream
    }
  };

  const handleStartCapture = () => {
    setIsCapturingManually(true);
    setShowSuccessMessage(false);
  };

  const handleStopCapture = () => {
    setIsCapturingManually(false);
    stopCamera();
  };

  useEffect(() => {
    if (!isCapturingManually) return;

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
  }, [captureCount, modelsLoaded, isCapturing, isCapturingManually]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline width="400" height="300" />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      {showSuccessMessage && (
        <div style={{ color: 'green', fontSize: '18px', marginTop: '20px' }}>
          Chụp ảnh thành công! Bạn đã hoàn thành.
        </div>
      )}
      
      <div className='mt-10'>
        <button 
          onClick={handleStartCapture} 
          disabled={isCapturingManually || captureCount >= 50}
          className='rounded-full bg-gradientEnd text-primary p-3 mx-auto font-medium'
        >
          Start
        </button>
        
        <button 
          onClick={handleStopCapture} 
          disabled={!isCapturingManually}
          className='rounded-full bg-secondary text-primary p-3 font-medium mx-auto ml-5'
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default FaceLogin;
