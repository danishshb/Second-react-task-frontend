import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { AuthContext } from '../context/Auth';
import setAuthToken from '../utils/setAuthToken';
import { Link } from 'react-router-dom';

function Profile() {
  const { userData, fetchUserInfo, setUserData } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);
  const token = localStorage.getItem('token');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      if (isEditing) {
        const formData = new FormData();
        formData.append('attachments', image);
        formData.append('firstName', userData.firstName);
        formData.append('lastName', userData.lastName);
        formData.append('email', userData.email);

        if (password.trim() !== '') {
          formData.append('password', password);
        }

        const res = await axios.put(
          // 'http://localhost:8080/api/user/update',
          'http://209.38.164.171/api/user/update',
          formData
        );

        message.success(res?.data?.message);
        fetchUserInfo(token);

        if (res.data.success) {
          setImage(null);
          setPreviewImage(null);
          setUserData({});
          setPassword(''); 
        }
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);

      setImage(selectedImage);
    }
  };

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchUserInfo(token);
    }
  }, []);

  useEffect(() => {
    if (userData && userData.profileImage && userData.profileImage.filePath) {
      setPreviewImage(`http://209.38.164.171/${userData.profileImage.filePath}`);
    }
  }, [userData]);

  return (
    <div>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Client Dashbord</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossOrigin="anonymous" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link rel="stylesheet" href="./css/main.css" />
    {/*=============== Start Dashboard  ===============*/}
    <section className="dashboard-wrapper sidebar-toggle">
      <main className="page-content shadow-sm d-flex flex-column justify-content-between">
        <div className="container-fluid p-3 p-md-4">
          <div className="row">
            <div className="col-12">
              <div className="page-header d-flex flex-column flex-sm-row align-items-md-center justify-content-between gap-3 mb-4">
                <div className="breadcrumb-wrapper">
                  <h3 className="fs-4">My Profile</h3>
                </div>{/*breadcrumb-wrapper*/}
              </div>{/*.page-header*/}
              <div className="page-body position-relative mb-4">
                <div className="row g-3">
                  <div className="col-12">
                    <div className="user-img-edit mb-2">
                      <div className="user-img-wrapper profile-img mb-2">
                      {isEditing && (
                        <label className="label-overlay" htmlFor="file">
                          <span className="icon"><i className="bi bi-camera" /></span>
                          <span className="overylay-txt">Change</span>
                        </label>
                        )}
                        {isEditing && (
                    <input 
                      type="file" 
                      className="form-control" 
                      id="file"
                      onChange={handleImageChange} 
                    />
                    )}
                    {/* {userData?.profileImage?.filePath && (
                      <img
                        src={`http://localhost:8080/${userData?.profileImage?.filePath}`}
                        alt="Profile Preview"
                        className="img-fluid mt-2"
                      />
                    )} */}
            {previewImage && <img src={previewImage} alt="Profile Preview" className="img-fluid mt-2" />}
                         {/* <img src="./images/user-img.png" class="rounded-pill user-img" id="pfImg" alt="Profile Preview"/>  */}
                         {!userData?.profileImage?.filePath && (
                            <div className="fallback-avatar">
                              <span className="user-name-txt">{userData.firstName ? userData.firstName[0] : 'js'}</span>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="col-sm-7 col-lg-5">
                      <label htmlFor="firstName" className="form-label fw-semibold">First Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="firstName" 
                        name="firstName" 
                        defaultValue={userData?.firstName} 
                        readOnly={!isEditing} 
                        onChange={handleInputChange}
                     />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="col-sm-7 col-lg-5">
                      <label htmlFor="lastName" className="form-label fw-semibold">Last Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="lastName" 
                        name="lastName" 
                        defaultValue={userData?.lastName} 
                        readOnly={!isEditing} 
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  {/*.col-grid*/}
                  <div className="col-12">
                    <div className="col-sm-7 col-lg-5">
                      <label htmlFor="email" className="form-label fw-semibold">Email</label>
                     <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email" 
                      defaultValue={userData?.email} 
                      readOnly={!isEditing} 
                      onChange={handleInputChange}
                   />
                    </div>
                  </div>{/*.col-grid*/}
                {isEditing && (
                  <div className="col-12">
                  <div className="col-sm-7 col-lg-5">
                    <label htmlFor="password" className="form-label fw-semibold">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      name="password" 
                      defaultValue={userData?.password} 
                      readOnly={!isEditing} 
                      onChange={handleInputChange}
                   />
                  </div>
                  </div>
                )}
                </div>{/*..row*/}
                <div className="row mt-4 mt-md-5">
                <div className="col-12">
                {isEditing ? (
                        <Link to="#" className="btn primary-btn mx-2" onClick={handleSaveClick}>
                          Save update
                        </Link>
                      ) : (
                        <Link to="#" className="btn gray-btn" onClick={handleEditClick}>
                          Edit
                        </Link>
                      )}
                  </div>
                </div>
              </div>{/*.page-body*/}
            </div>{/*.col-grid*/}
          </div>{/*.row*/}
        </div>{/*.container-fluid*/}
      </main>{/*.page-content"*/}
    </section>
    {/*=============== End Dashboard ===============*/}
  </div>
  
  )
}

export default Profile