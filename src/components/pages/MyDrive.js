import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../context/Auth';
import setAuthToken from '../utils/setAuthToken';

function MyDrive() {
  const {handleAttachments, userData, totalUploadedFiles, totalUploadedFolder, fetchUserInfo, uploadAttachments, handleDownloadAttachment, deleteAttachment, creatFolder, renameAttachment } = useContext(AuthContext)
  const [selectedFile, setSelectedFile] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [folderName, setFolderName] = useState("");
  const token = localStorage.getItem('token');
  const fileInputRef = useRef(null);

const handleChange = (e) => {
  handleAttachments(e.target.files);
  setSelectedFile(e.target.files.length > 0);
  setShowOptions(false);
};
const handleUpload = () => {
  uploadAttachments();
  setSelectedFile(false);
};
const handleAddNewClick = () => {
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
};
const handleAddClick = () => {
  setShowOptions(!showOptions); 
};
const handleRenameAttachment = (name, id) => {
  const newFilename = prompt('Enter the new filename:', name);
  if (newFilename !== null && newFilename !== '') {
    renameAttachment(newFilename, id);
  }
};

// const handleCreateNewFolder = () => {
//   const folderName = prompt('Enter the name of the new folder:');
//   if (folderName) {
//     createFolderOnBackend(folderName)
//       .then(() => {
//         fetchUserInfo();
//       })
//       .catch((error) => {
//         console.error('Error creating folder:', error);
//       });
//   }
// };
const handlecreatFolder=()=>{
  const newfolderName = prompt('Enter the new Folder Name:', folderName)
  if (newfolderName.trim()!==""){
    creatFolder(newfolderName);
    setFolderName("")
    setShowOptions(false);
  }
}


useEffect(() => {
  if (token) {
    setAuthToken(token);
    fetchUserInfo(token);
  }
}, [token, fetchUserInfo]);
 

  return (
    <> 
      <div>

  {/*=============== Start Dashboard  ===============*/}
  <section className="dashboard-wrapper sidebar-toggle">
    <main className="page-content shadow-sm d-flex flex-column justify-content-between">
      <div className="container-fluid p-3 p-md-4">
        <div className="row">
          <div className="col-12">
            <div className="page-header position-relative d-flex flex-column flex-sm-row align-items-md-center justify-content-between gap-3 mb-4">
              <div className="page-navigator d-flex gap-2">
              <Link className={`nav-link d-flex align-items-center mb-1`} to="/dashboard">
                <button className="btn p-0 navi-prev"><i className="bi bi-arrow-left-circle-fill" /></button></Link>
                <button className="btn p-0 navi-next" disabled><i className="bi bi-arrow-right-circle-fill" /></button>
              </div>
              <div className="breadcrumb-wrapper mb-3 d-flex flex-wrap align-items-center gap-3">
                <div aria-label="breadcrumb" style={{ '-bsBreadcrumbDivider': '">"' }}>
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item fs-4 active" aria-current="page">My Drive</li>
                  </ol>
                </div>
                <div className="add-inner-wrapper">
                {/* {selectedFile ? (
                        <button className="btn btn-primary rounded-pill shadow-sm" onClick={handleUpload}>
                          <i className="bi bi-upload" /> Upload
                        </button>
                      ) : (
                        )} */}
                         {selectedFile ? (
                          <button className="dropdown-item" onClick={handleUpload}>
                            <i className="bi bi-upload" />
                          </button>
                         ):(
                        <button className="btn btn-add-new rounded-pill shadow-sm" onClick={handleAddClick}>
                          <i className="bi bi-plus-lg" />
                        </button>
                        )}
                        {showOptions && (
                          <ul className="dropdown-menu dropdown-menu-end show-options" style={{ display: 'block',  }}>
                            <li>
                              <button 
                                className="dropdown-item" 
                                onClick={handleAddNewClick}
                              >
                                <i class="bi bi-file-plus"/> File
                              </button>
                              </li>
                            <li>
                              <button 
                                className="dropdown-item" 
                                onClick={handlecreatFolder}
                              >
                                <i class="bi bi-folder-plus"/> New Folder
                              </button>
                              </li>
                          </ul>
                        )}
                      <input
                        id="fileInput"
                        type="file"
                        multiple
                        style={{ display: 'none' }}
                        onChange={handleChange}
                        ref={fileInputRef}
                      />
                </div>
              </div>{/*breadcrumb-wrapper*/}
              <div className="page-header-right">
              </div>
            </div>{/*.page-header*/}
            <div className="page-body position-relative mb-4">
              <div className="row">
                <div className="col-12">
                  <div className="accordion drive-accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="panelsFolders">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                          <span>Folders</span><span>({totalUploadedFolder})</span>
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsFolders">
                        <div className="accordion-body">
                          <div className="row g-3">
                          {userData?.folders?.map((folder, i) => (
                            <div className="col-md-4 col-sm-6" key={i}>
                              <div className="listing-item">
                                <div className="icon-wrapper">
                                  <span className="icon"><i className="bi bi-folder-fill" /></span>
                                </div>
                                <NavLink className={`nav-link d-flex align-items-center mb-1`} to="/folderinner">
                                  <div className="item-text"><span>{folder?.name}</span></div></NavLink>
                                <div className="item-action dropdown">
                                  <Link to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical" /></Link>
                                  <ul className="dropdown-menu dropdown-menu-end border py-0 shadow-sm">
                                    <li><Link className="dropdown-item" to="#"><i className="bi bi-pencil" /> Rename</Link></li>
                                    <li><Link className="dropdown-item" to="#"><i className="bi bi-download" /> Download</Link></li>
                                    <li><Link className="dropdown-item" to="#"><i className="bi bi-trash" /> Delete</Link></li>
                                  </ul>
                                </div>
                              </div>{/*.listing-item*/}
                            </div>
                          ))}
                          </div>{/*..row*/}
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="panelsFiles">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                          <span>Files</span><span>({totalUploadedFiles})</span>
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show" aria-labelledby="panelsFiles">
                        <div className="accordion-body">
                          <div className="row g-3">
                            {userData?.attachments?.map((a,i) =>{
                              const fileExtension = a.filename.split('.').pop().toLowerCase();
                              return (
                              <div className="col-md-4 col-sm-6" key={i}>
                              <div className="listing-item">
                                <div className="icon-wrapper">
                                {fileExtension === 'zip' ? (
                                  <span className="icon"><i className="bi bi-file-zip-fill" /></span>
                                  ) : (
                                  <span className="icon"><i className="bi bi-file-earmark-text-fill" /></span>
                                  )}
                                </div>
                                <div className="item-text"><span>{a?.filename}</span></div>
                                <div className="item-action dropdown">
                                  <Link to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical" /></Link>
                                  <ul className="dropdown-menu dropdown-menu-end border py-0 shadow-sm">
                                    <li>
                                      <Link 
                                        className="dropdown-item" 
                                        to="#" 
                                        onClick={() => handleRenameAttachment(a.filename, a?._id)}
                                      >
                                        <i className="bi bi-pencil"/> Rename
                                      </Link>
                                    </li>
                                    <li>
                                      <Link 
                                        className="dropdown-item" 
                                        to="#" 
                                        onClick={() => handleDownloadAttachment(a?.filename, a?.filePath)}
                                      >
                                        <i className="bi bi-download" /> Download
                                      </Link>
                                    </li>
                                    <li>
                                      <Link 
                                        className="dropdown-item" 
                                        to="#" 
                                        onClick={() => deleteAttachment(a?.filename, a?.filePath)}
                                      >
                                        <i className="bi bi-trash" /> Delete
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>{/*.listing-item*/}
                            </div>
                            );
                            })}
                          </div>{/*..row*/}
                        </div>
                      </div>
                    </div>
                  </div>
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

    </>
  )
}

export default MyDrive