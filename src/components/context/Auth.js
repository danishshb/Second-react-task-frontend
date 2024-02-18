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
  const [totalUploadedFiles, setTotalUploadedFiles] = useState(0);
  const [totalUploadedFolder, setTotalUploadedFolder] = useState(0);
  const token = localStorage.getItem('token');

  const MAX_ATTACHMENTS = 5;
  const MAX_FILE_SIZE_MB = 50;

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
        setTotalUploadedFolder(res?.data?.user?.folders?.length || 0);
      } catch (err) {
        message.error(err?.response?.data?.message);
        console.error(err);
      }
    }
  };
//   const renameFilesAndFolders = async (token, fileId, newName) => {
//     try {
//         const response = await axios.post(
//             `http://localhost:8080/api/user/rename/${fileId}`,
//             { newName },
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );

//         // Assuming the response from the backend indicates success
//         if (response.status === 200) {
//             console.log('File/Folder renamed successfully.');
//             // You can handle additional logic here if needed
//         } else {
//             console.log('Failed to rename file/folder.');
//             // Handle failure cases here
//         }
//     } catch (error) {
//         console.error('Error occurred while renaming file/folder:', error);
//         // Handle error cases here
//     }
// };
// const createFolderOnBackend = async function (folderName) {
//   try {
//     const response = await fetch('http://localhost:8080/api/user/create', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ folderName })
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Failed to create folder');
//     }

//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error('Error creating folder:', error.message);
//     throw error;
//   }
// }
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

const creatFolder = async (folderName) => {
  try {
    const response = await axios.post('http://localhost:8080/api/user/folders/create', {
     folderName
    });
    fetchUserInfo(token)
    console.log(response.data);
  } catch (error) {
    console.error('Error renaming file:', error.message);
  }
};

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
        totalUploadedFolder,
        handleDownloadAttachment,
        deleteAttachment,
        renameAttachment,
        creatFolder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthenticationContext, AuthContext };