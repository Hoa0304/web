import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';
import { useFaceApi } from '../hooks/face/useFaceApi';
import { useVideoStream } from '../hooks/face/useVideoStream';
import { User } from '../types/auth.types';
import { toast } from 'react-toastify';

interface FaceSignInProps {
  onLoginSuccess: (user: User) => void;
}

const FaceSignIn: React.FC<FaceSignInProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [userDescriptors, setUserDescriptors] = useState<Map<string, faceapi.LabeledFaceDescriptors>>(new Map());
  const { videoRef } = useVideoStream();
  const modelsLoaded = useFaceApi();
  const api = import.meta.env.VITE_API_URL;

  // Dừng camera sau khi nhận diện thành công
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    if (tracks) {
      tracks.forEach(track => track.stop()); // Dừng tất cả các track trong stream
    }
  };

  const handleFaceDetection = async () => {
    if (videoRef.current && modelsLoaded && userDescriptors.size > 0) {
      const detections = await faceapi.detectAllFaces(videoRef.current).withFaceLandmarks().withFaceDescriptors();
      
      if (detections.length > 0) {
        const faceMatcher = new faceapi.FaceMatcher(Array.from(userDescriptors.values()), 0.6);
        const results = detections.map(d => faceMatcher.findBestMatch(d.descriptor));

        const bestMatch = results[0];

        // Nếu có đối tượng tìm thấy và không phải là "unknown"
        if (bestMatch.label !== 'unknown') {
          stopCamera();
          const userId = bestMatch.label;
          const response = await fetch(`${api}users/${userId}`);
          const user = await response.json();
          onLoginSuccess(user);
          toast.success("Login successful!");
          navigate('/home');
        }
      } else {
        console.log("No faces detected.");
        stopCamera();
        toast.error("No face detected, redirecting...");
        navigate('/');
      }
    } else {
      console.log("No descriptors found or models not loaded yet.");
    }
  };

  useEffect(() => {
    const loadDescriptors = async () => {
      try {
        const response = await fetch(`${api}users`);
        if (!response.ok) {
          console.error('Failed to fetch users:', response.statusText);
          return;
        }
        const users = await response.json();
        console.log('Users fetched:', users);  // Kiểm tra dữ liệu người dùng
    
        const descriptorsMap = new Map<string, faceapi.LabeledFaceDescriptors>();
    
        // Lặp qua danh sách người dùng và lấy ảnh khuôn mặt của họ
        for (const user of users) {
          if (user.faceImage && user.faceImage.length > 0) {
            const base64Image = user.faceImage[0];  // Giả sử ảnh khuôn mặt ở vị trí đầu tiên
            if (!base64Image.startsWith('data:image/jpeg;base64,')) {
              console.error('Invalid base64 string for user:', user.id);
              continue;  // Bỏ qua người dùng này nếu base64 không hợp lệ
            }
            const img = new Image();
            img.src = base64Image;

            // Thêm kiểm tra sự kiện onload và onerror cho img
            const imageLoaded = new Promise<void>((resolve, reject) => {
              img.onload = () => {
                resolve(); // Tải ảnh thành công
              };
              img.onerror = (error) => {
                reject(error); // Bắt lỗi nếu không thể tải hình ảnh
              };
            });

            // Đợi hình ảnh được tải và bắt lỗi nếu có
            try {
              await imageLoaded;

              // Nhận diện khuôn mặt từ ảnh đã tải
              const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

              // Kiểm tra nếu có nhận diện và descriptor
              if (detections && detections.descriptor) {
                const labeledDescriptor = new faceapi.LabeledFaceDescriptors(user.id, [detections.descriptor]);
                descriptorsMap.set(user.id, labeledDescriptor);
              } else {
                console.log(`No face descriptor for user ${user.id}`);
              }
            } catch (error) {
              console.error(`Failed to load face image for user ${user.id}:`, error);
            }
          } else {
            console.log(`User ${user.id} has no face image.`);
          }
        }
    
        setUserDescriptors(descriptorsMap);
      } catch (error) {
        console.error('Error loading descriptors:', error);
      }
    };
    

    loadDescriptors();
  }, [api]);

  useEffect(() => {
    if (userDescriptors.size > 0 && modelsLoaded) {
      const interval = setInterval(handleFaceDetection, 1000);  // Kiểm tra nhận diện mỗi giây
      return () => clearInterval(interval); // Dọn dẹp khi component unmount
    } else {
      console.log("Waiting for descriptors to load or models to be ready...");
    }
  }, [userDescriptors, modelsLoaded]);

  return <div><video ref={videoRef} autoPlay playsInline width="400" height="300" /></div>;
};

export default FaceSignIn;
