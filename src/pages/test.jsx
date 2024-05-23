import React, { useState } from "react";
import { storage } from "../api/firebase";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = async () => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      // // 파일을 업로드합니다.
      await fileRef.put(file);
      console.log("File uploaded successfully!");

      // 파일의 다운로드 URL을 가져옵니다.
      const downloadURL = await fileRef.getDownloadURL();
      console.log("저장경로 확인 : " + downloadURL);

      // 상태를 업데이트합니다.
      setUrl(downloadURL);
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleUploadClick}>Upload</button>
      {url && <img src={url} alt="uploaded" />}
    </div>
  );
};

export default ImageUploader;
