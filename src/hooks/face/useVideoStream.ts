import { useEffect, useRef } from 'react';

export const useVideoStream = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startVideoStream = async () => {
      if (videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
        } catch (error) {
          console.error('Error starting video stream:', error);
        }
      }
    };

    startVideoStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return { videoRef } ;
};
