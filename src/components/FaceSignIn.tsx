import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';
import { useFaceApi } from '../hooks/face/useFaceApi';
import { useVideoStream } from '../hooks/face/useVideoStream';

interface FaceSignInProps {
  onLoginSuccess: () => void;
}

const FaceSignIn: React.FC<FaceSignInProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [userDescriptors, setUserDescriptors] = useState<Map<string, faceapi.LabeledFaceDescriptors>>(new Map());
  const { videoRef } = useVideoStream();
  const modelsLoaded = useFaceApi();

  const api = import.meta.env.VITE_API_URL;

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    if (tracks) {
      tracks.forEach(track => track.stop()); // Dừng tất cả các track trong stream
    }
  };

  const handleFaceDetection = async () => {
    if (videoRef.current && modelsLoaded) {
      const detections = await faceapi.detectAllFaces(videoRef.current).withFaceLandmarks().withFaceDescriptors();
      if (detections.length > 0) {
        const faceMatcher = new faceapi.FaceMatcher(Array.from(userDescriptors.values()), 0.6);
        const results = detections.map(d => faceMatcher.findBestMatch(d.descriptor));
        const bestMatch = results[0];
        if (bestMatch.label !== 'unknown') {
          stopCamera();
          onLoginSuccess();
          navigate('/home');
        }
      }
    }
  };

  useEffect(() => {
    const loadDescriptors = async () => {
      const response = await fetch(`${api}images`);
      const images = await response.json();
      const descriptorsMap = new Map<string, faceapi.LabeledFaceDescriptors>();
      for (const image of images) {
        const img = await faceapi.fetchImage(image.image);
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        if (detections && detections.descriptor) {
          const labeledDescriptor = new faceapi.LabeledFaceDescriptors(image.id.toString(), [detections.descriptor]);
          descriptorsMap.set(image.id.toString(), labeledDescriptor);
        }
      }
      setUserDescriptors(descriptorsMap);
    };

    loadDescriptors();
  }, []);

  useEffect(() => {
    const interval = setInterval(handleFaceDetection, 1000);
    return () => clearInterval(interval);
  }, [userDescriptors, modelsLoaded]);

  return <div><video ref={videoRef} autoPlay playsInline width="400" height="300" /></div>;
};

export default FaceSignIn;
