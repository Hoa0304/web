import cv from 'opencv.js';

export const processFaceImages = (capturedImages: string[], callback: (faces: cv.Mat[], labels: number[]) => void) => {
  const faceImages: cv.Mat[] = [];
  const labels: number[] = [];

  // Xử lý các ảnh đã thu thập
  capturedImages.forEach((imageBase64, index) => {
    const img = new Image();
    img.src = imageBase64;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Tiền xử lý ảnh và thêm vào danh sách
        const processedImage = preprocessImage(imageData);
        faceImages.push(processedImage);
        labels.push(index); // Gán nhãn cho ảnh (ở đây dùng chỉ số ảnh làm nhãn)

        // Nếu tất cả ảnh đã được xử lý, gọi callback
        if (faceImages.length === capturedImages.length) {
          callback(faceImages, labels);
        }
      }
    };
  });
};

export const trainFaceRecognitionModel = (faceImages: cv.Mat[], labels: number[], callback: () => void) => {
  const model = new cv.FaceRecognizer();
  model.train(faceImages, labels); // Huấn luyện mô hình với các ảnh và nhãn
  callback(); // Sau khi huấn luyện xong, gọi callback
};

export const recognizeFace = (imageBase64: string) => {
  const img = new Image();
  img.src = imageBase64;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const processedImage = preprocessImage(imageData);

      // Sử dụng mô hình đã huấn luyện để nhận diện khuôn mặt
      const model = new cv.FaceRecognizer(); // Sử dụng mô hình đã huấn luyện
      const prediction = model.predict(processedImage);
      console.log('Predicted label:', prediction);
    }
  };
};

const preprocessImage = (imageData: ImageData): cv.Mat => {
  let mat = cv.matFromImageData(imageData);
  cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY); // Chuyển sang grayscale
  cv.resize(mat, mat, new cv.Size(100, 100)); // Resize ảnh về kích thước chuẩn
  mat = mat.mul(1.0 / 255.0); // Chuẩn hóa ảnh
  return mat;
};
