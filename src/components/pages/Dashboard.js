import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/Auth';
import setAuthToken from '../utils/setAuthToken';

function Dashboard() { 
  const token = localStorage.getItem('token');
  const { userData, fetchUserInfo, handleDownloadAttachment, renameAttachment, deleteAttachment } = useContext(AuthContext);
  const [viewOption, setViewOption] = useState(false);

  const handleRenameAttachment = (name, id) => {
    const newFilename = prompt('Enter the new filename:', name);
    if (newFilename !== null && newFilename !== '') {
      renameAttachment(newFilename, id);
    }
  };
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
                  <div className="page-header d-flex flex-column flex-sm-row align-items-md-center justify-content-between gap-3 mb-4">
                    <div className="breadcrumb-wrapper">
                      <h3 className="fs-4">Dashboard</h3>
                    </div>
                    <div className="page-header-right">
                      <div className="d-inline-flex rounded-pill overflow-hidden">
                        <input 
                          type="radio" 
                          className="btn-check" 
                          name="options" 
                          id="option1" 
                          autoComplete="off" 
                          checked={viewOption === 'files'} 
                          onChange={() => setViewOption('files')} 
                        />
                        <label className="btn btn-light rounded-0" htmlFor="option1">
                          <i className="bi bi-card-text" /> Files
                        </label>
                        <input 
                          type="radio" 
                          className="btn-check" 
                          name="options" 
                          id="option2" 
                          autoComplete="off" 
                          checked={viewOption === 'folders'} 
                          onChange={() => setViewOption('folders')} 
                        />
                        <label className="btn btn-light rounded-0" htmlFor="option2">
                          <i className="bi bi-folder" /> Folders
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="page-body position-relative mb-4">
                    <div className="row g-3">
                      {(viewOption === 'folders' ? userData?.folders : userData?.attachments)?.map((a, i) => (
                        <div className="col-md-4 col-sm-6" key={i}>
                          <div className="listing-item">
                            <div className="icon-wrapper">
                              <span className="icon">
                                <i className={viewOption === 'folders' ? "bi bi-folder-fill" : "bi bi-file-earmark-text-fill"} />
                              </span>
                            </div>
                            <NavLink className={`nav-link d-flex align-items-center mb-1`} to={viewOption === 'folders' ? "/folderinner" : "#"}>
                              <div className="item-text">
                                <span>{viewOption === 'folders' ? a?.name : a?.filename}</span>
                              </div>
                            </NavLink>
                            <div className="item-action dropdown">
                              <Link to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-three-dots-vertical" />
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end border py-0 shadow-sm">
                                <li>
                                  <button 
                                    className="dropdown-item"
                                    onClick={() => handleRenameAttachment(a.filename, a?._id)}
                                  >
                                    <i className="bi bi-pencil" /> Rename
                                  </button>
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
                      ))}
                    </div>{/*..row*/}
                    <div className="row mt-5">
                      <div className="col-12 text-center">
                        <Link to="#" className="btn primary-btn">Show more</Link>
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
  );
}

export default Dashboard;
