import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Dashboard() {
  const [itemName, setItemName] = useState('Development Data');
  const [editing, setEditing] = useState(false); 
  

  const startEditing = () => {
    setEditing(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setEditing(false);
    }
  };
  
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
              </div>{/*breadcrumb-wrapper*/}
              <div className="page-header-right">
                <div className="d-inline-flex rounded-pill overflow-hidden">
                  <input type="radio" className="btn-check" name="options" id="option1" autoComplete="off" />
                  <label className="btn btn-light rounded-0" htmlFor="option1"><i className="bi bi-card-text" /> Files</label>
                  <input type="radio" className="btn-check" name="options" id="option2" autoComplete="off" />
                  <label className="btn btn-light rounded-0" htmlFor="option2"><i className="bi bi-folder" /> Folders</label>
                </div>
              </div>
            </div>{/*.page-header*/}
            <div className="page-body position-relative mb-4">
              <div className="row g-3">
                <div className="col-md-4 col-sm-6">
                  <div className="listing-item">
                    <div className="icon-wrapper">
                      <span className="icon"><i className="bi bi-folder-fill" /></span>
                    </div>
                    {editing ? (
                        <input
                          type="text"
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                          onKeyPress={handleKeyPress}
                          onBlur={() => setEditing(false)}
                          autoFocus 
                        />
                      ) : (
                        <NavLink className={`nav-link d-flex align-items-center mb-1`} to="/folderinner">
                          <div className="item-text" onDoubleClick={startEditing}><span>{itemName}</span></div>
                        </NavLink>
                      )}
                    <div className="item-action dropdown">
                      <Link to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical" /></Link>
                      <ul className="dropdown-menu dropdown-menu-end border py-0 shadow-sm">
                      <li><button className="dropdown-item" onClick={startEditing}>
                            <i className="bi bi-pencil" /> Rename
                          </button></li>
                        <li><Link className="dropdown-item" to="#"><i className="bi bi-download" /> Download</Link></li>
                        <li><Link className="dropdown-item" to="#"><i className="bi bi-trash" /> Delete</Link></li>
                      </ul>
                    </div>
                  </div>{/*.listing-item*/}
                </div>{/*.col-grid*/}
                <div className="col-md-4 col-sm-6">
                  <div className="listing-item">
                    <div className="icon-wrapper">
                      <span className="icon"><i className="bi bi-file-earmark-text-fill" /></span>
                    </div>
                    <div className="item-text"><span>Text note</span></div>
                    <div className="item-action dropdown">
                      <Link to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical" /></Link>
                      <ul className="dropdown-menu dropdown-menu-end border py-0 shadow-sm">
                        <li><Link className="dropdown-item" to="#"><i className="bi bi-pencil" /> Rename</Link></li>
                        <li><Link className="dropdown-item" to="#"><i className="bi bi-download" /> Download</Link></li>
                        <li><Link className="dropdown-item" to="#"><i className="bi bi-trash" /> Delete</Link></li>
                      </ul>
                    </div>
                  </div>{/*.listing-item*/}
                </div>{/*.col-grid*/}
                <div className="col-md-4 col-sm-6">
                  <div className="listing-item">
                    <div className="icon-wrapper">
                      <span className="icon"><i className="bi bi-file-zip-fill" /></span>
                    </div>
                    <div className="item-text"><span>Zip file</span></div>
                    <div className="item-action dropdown">
                      <Link to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical" /></Link>
                      <ul className="dropdown-menu dropdown-menu-end border py-0 shadow-sm">
                        <li><Link className="dropdown-item" to="#"><i className="bi bi-pencil" /> Rename</Link></li>
                        <li><Link className="dropdown-item" to="#"><i className="bi bi-download" /> Download</Link></li>
                        <li><Link className="dropdown-item" to="#"><i className="bi bi-trash" /> Delete</Link></li>
                      </ul>
                    </div>
                  </div>{/*.listing-item*/}
                </div>{/*.col-grid*/}
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
                </div>{/*.col-grid*/}
                <div className="col-md-4 col-sm-6">
                  <div className="listing-item">
                    <div className="icon-wrapper">
                      <span className="icon"><i className="bi bi-file-earmark-text-fill" /></span>
                    </div>
                    <div className="item-text"><span>Text note</span></div>
                    <div className="item-action dropdown">
                      <Link to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical" /></Link>
                      <ul className="dropdown-menu dropdown-menu-end border py-0 shadow-sm">
                        <li><Link className="dropdown-item" to="#"><i className="bi bi-pencil" /> Rename</Link></li>
                        <li><Link className="dropdown-item" to="#"><i className="bi bi-download" /> Download</Link></li>
                        <li><Link className="dropdown-item" to="#"><i className="bi bi-trash" /> Delete</Link></li>
                      </ul>
                    </div>
                  </div>{/*.listing-item*/}
                </div>{/*.col-grid*/}
                <div className="col-md-4 col-sm-6">
                  <div className="listing-item">
                    <div className="icon-wrapper">
                      <span className="icon"><i className="bi bi-file-zip-fill" /></span>
                    </div>
                    <div className="item-text"><span>Zip file</span></div>
                    <div className="item-action dropdown">
                      <Link to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical" /></Link>
                      <ul className="dropdown-menu dropdown-menu-end border py-0 shadow-sm">
                        <li><Link className="dropdown-item" to="#"><i className="bi bi-pencil" /> Rename</Link></li>
                        <li><Link className="dropdown-item" to="#"><i className="bi bi-download" /> Download</Link></li>
                        <li><Link className="dropdown-item" to="#"><i className="bi bi-trash" /> Delete</Link></li>
                      </ul>
                    </div>
                  </div>{/*.listing-item*/}
                </div>{/*.col-grid*/}
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
  )
}

export default Dashboard