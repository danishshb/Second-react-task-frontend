import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../context/Auth';
import setAuthToken from '../utils/setAuthToken';

function FolderInner() {

  const {handleAttachments,fetchUserInfo, uploadAttachments, creatFolder,  } = useContext(AuthContext)
  const [sFile, setSFile] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [folderName, setFolderName] = useState("");
  const fileInputRef = useRef(null);
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    handleAttachments(e.target.files);
    setSFile(e.target.files.length > 0);
    setShowOptions(false);
  };
  const handleUpload = () => {
    uploadAttachments();
    setSFile(false);
    setShowOptions(!showOptions);
  };
  const handleAddClick = () => {
    setShowOptions(!showOptions); 
  };
  const handleAddNewClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
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
            <div className="page-header position-relative d-flex flex-column flex-sm-row align-items-md-center justify-content-between gap-3 mb-4">
              <div className="page-navigator d-flex gap-2">
              <Link className={`nav-link d-flex align-items-center mb-1`} to="/mydrive">
                <button className="btn p-0 navi-prev"><i className="bi bi-arrow-left-circle-fill" /></button></Link>
                <button className="btn p-0 navi-next" disabled><i className="bi bi-arrow-right-circle-fill" /></button>
              </div>
              <div className="breadcrumb-wrapper mb-3 d-flex flex-wrap align-items-center gap-3">
                <div aria-label="breadcrumb" style={{ '-bsBreadcrumbDivider': '">"' }}>
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item fs-4"><Link to="#">My Drive</Link></li>
                    <li className="breadcrumb-item active fs-4" aria-current="page">Development Data</li>
                  </ol>
                </div>
                <div className="add-inner-wrapper">
                  {sFile ? (
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
                          <i class="bi bi-file-plus"/> Upload File
                        </button>
                      </li>
                      <li>
                        <button 
                          className="dropdown-item" 
                          onClick={handlecreatFolder}
                        >
                          <i class="bi bi-folder-plus"/> Create Folder
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
                          <span>Folders</span><span>(0)</span>
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsFolders">
                        <div className="accordion-body">
                          <div className="row g-3">
                            <div className="col-md-4 col-sm-6">
                              <div className="listing-item">
                                <div className="icon-wrapper">
                                  <span className="icon"><i className="bi bi-folder-fill" /></span>
                                </div>
                                <NavLink className={`nav-link d-flex align-items-center mb-1`} to="/folderinner">
                                  <div className="item-text"><span>Development Data</span></div></NavLink>
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
                          </div>{/*..row*/}
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="panelsFiles">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                          <span>Files</span><span>(0)</span>
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show" aria-labelledby="panelsFiles">
                        <div className="accordion-body">
                        <div className="row g-3">
                              <div className="col-md-4 col-sm-6" >
                              <div className="listing-item">
                                <div className="icon-wrapper">
                                  <span className="icon"><i className="bi bi-file-zip-fill" /></span>
                                  <span className="icon"><i className="bi bi-file-earmark-text-fill" /></span>
                                </div>
                                <div className="item-text"><span>Development Data</span></div>
                                <div className="item-action dropdown">
                                  <Link to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical" /></Link>
                                  <ul className="dropdown-menu dropdown-menu-end border py-0 shadow-sm">
                                    <li>
                                      <Link 
                                        className="dropdown-item" 
                                        to="#" 
                                      >
                                        <i className="bi bi-pencil"/> Rename
                                      </Link>
                                    </li>
                                    <li>
                                      <Link 
                                        className="dropdown-item" 
                                        to="#" 
                                      >
                                        <i className="bi bi-download" /> Download
                                      </Link>
                                    </li>
                                    <li>
                                      <Link 
                                        className="dropdown-item" 
                                        to="#" 
                                      >
                                        <i className="bi bi-trash" /> Delete
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>{/*.listing-item*/}
                            </div>
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

export default FolderInner