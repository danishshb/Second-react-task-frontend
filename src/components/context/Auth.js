import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

const AuthContext = createContext();

const AuthenticationContext = ({ children }) => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [attachments, setAttachments] = useState([]);
  // const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState([]);
  const [totalUploadedFiles, setTotalUploadedFiles] = useState(0);
  const [tuFiles, setTuFiles] = useState(0);
  const [totalUploadedFolder, setTotalUploadedFolder] = useState(0);
  const [tuFolder, setTuFolder] = useState(0);
  const token = localStorage.getItem('token');

  const MAX_ATTACHMENTS = 5;
  const MAX_FILE_SIZE_MB = 50;
  // const MAX_FOLDER_SIZE_GB = 50; 

  const handleAttachments = (files) => {
    if (files?.length > MAX_ATTACHMENTS) {
      message.error(`You can only attach up to ${MAX_ATTACHMENTS} files.`);
      return;
    }

    for (let i = 0; i < files?.length; i++) {
      if (files[i].size > MAX_FILE_SIZE_MB  *1024  *1024) {
        message.error(`File size should not exceed ${MAX_FILE_SIZE_MB} MB.`);
        return;
      }
    }

    setAttachments(files);
  };
  const clearAttachments = () => {
    setAttachments([]);
  };
  const uploadAttachments = async (token) => {
    try {
      if (attachments.length === 0) {
        message.error("Please attach files");
        return;
      }

      const formData = new FormData();

      for (let i = 0; i < attachments?.length; i++) {
        formData.append('attachments', attachments[i]);
      }

      await axios.put('http://localhost:8080/api/user/attachments', formData);
      message.success("Attachments uploaded successfully.");

      fetchUserInfo(token);
      clearAttachments(); 
    } catch (err) {
      message.error(err?.response?.data?.error);
    }
  };
  const handleDownloadAttachment = async (fn, fp) => {
    try {
      const filepath = fp?.replace(/^src\\data\\/, "");
      const url = `http://localhost:8080/api/user/download/${filepath}`;

      const res = await axios.get(url, { responseType: "blob" });
      if (res.status !== 200) {
        message.error(`Error downloading file: ${res.status}`);
        return;
      }

      const blob = new Blob([res.data], { type: res.headers["content-type"] });
      const link = document.createElement("a");
      link.download = fn;
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      message.error(err?.response?.data?.message);
      console.log(err);
    }
  };
  const deleteAttachment = async (filename) => {
    try {
      await axios.delete(`http://localhost:8080/api/user/attachments/${filename}`);
      message.success('Attachment deleted successfully.');
      await fetchUserInfo(token);
      setAttachments([]);
    } catch (err) {
      message.error('Something went wrong.');
      console.error(err);
    }
  };
  const fetchUserInfo = async (token) => {
    if (token) {
      try {
        const res = await axios.get("http://localhost:8080/api/user/info");
        setUserData(res?.data?.user);
        setTotalUploadedFiles(res?.data?.user?.attachments?.length || 0);
        setTuFiles(res?.data?.user?.attachments?.length || 1)
        setTotalUploadedFolder(res?.data?.user?.folders?.length || 0);
        setTuFolder(res?.data?.user?.folders?.length || 1)
      } catch (err) {
        message.error(err?.response?.data?.message);
        console.error(err);
      }
    }
  };
const renameAttachment = async (newFilename, id) => {
  try {
    await axios.post(`http://localhost:8080/api/user/rename/${id}`, {
      newFilename,
    });
    message.success('File renamed successfully.');
     fetchUserInfo(token);
     clearAttachments();
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      message.error(`Error: ${err.response.data.message}`);
      console.error('Error renaming file:', err.response.data.message);
    } else {
      message.error('Something went wrong.');
      console.error('Error renaming file:', err.message);
    }
  }
};
const clearFolders = () => {
  setFolderName([]);
} 
const creatFolder = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/user/folders/create', {
      folderName
    });
    fetchUserInfo(token);
    console.log(response.data);
  } catch (error) {
    console.error('Error renaming file:', error.message);
  }
};
const renameFolder = async (id, newFolderName) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/user/folders/rename/${id}`, {
      newFolderName
    });

    if (response && response.status === 200) {
      console.log(response.data);
      message.success('Folder renamed successfully.');
      await fetchUserInfo(token); 
      clearFolders();
    } else {
      console.error('Error renaming folder:', response.statusText);
    }
  } catch (error) {
    console.error('Error renaming folder:', error.message);
  }
};
const deleteFolder = async (name) => {
  try {
    await axios.delete(`http://localhost:8080/api/user/folders/delete/${name}`);
    message.success('Folder deleted successfully.');
    await fetchUserInfo(token);
    setFolderName([]);
  } catch (err) {
    message.error('Something went wrong.');
    console.error(err);
  }
}


  const logout = () => {
    setAuthToken();
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        fetchUserInfo,
        logout,
        attachments,
        handleAttachments,
        clearAttachments,
        uploadAttachments,
        totalUploadedFiles,
        tuFiles,
        totalUploadedFolder,
        tuFolder,
        handleDownloadAttachment,
        deleteAttachment,
        renameAttachment,
        creatFolder,
        renameFolder,
        deleteFolder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthenticationContext, AuthContext };