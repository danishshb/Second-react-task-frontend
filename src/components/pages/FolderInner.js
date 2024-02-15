import React from 'react'
import { Link } from 'react-router-dom'

function FolderInner() {
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
                    <li className="breadcrumb-item fs-4"><a href="#">My Drive</a></li>
                    <li className="breadcrumb-item active fs-4" aria-current="page">Development Data</li>
                  </ol>
                </div>
                <div className="add-inner-wrapper">
                  <button className="btn btn-add-new rounded-pill shadow-sm"><i className="bi bi-plus-lg" /></button>
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
                          </div>{/*..row*/}
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="panelsFiles">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                          <span>Files</span><span>(2)</span>
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show" aria-labelledby="panelsFiles">
                        <div className="accordion-body">
                          <div className="row g-3">
                            <div className="col-md-4 col-sm-6">
                              <div className="listing-item">
                                <div className="icon-wrapper">
                                  <span className="icon"><i className="bi bi-file-earmark-text-fill" /></span>
                                </div>
                                <div className="item-text"><span>Text note</span></div>
                                <div className="item-action dropdown">
                                  <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical" /></a>
                                  <ul className="dropdown-menu dropdown-menu-end border py-0 shadow-sm">
                                    <li><a className="dropdown-item" href="#"><i className="bi bi-pencil" /> Rename</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="bi bi-download" /> Download</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="bi bi-trash" /> Delete</a></li>
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
                                  <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical" /></a>
                                  <ul className="dropdown-menu dropdown-menu-end border py-0 shadow-sm">
                                    <li><a className="dropdown-item" href="#"><i className="bi bi-pencil" /> Rename</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="bi bi-download" /> Download</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="bi bi-trash" /> Delete</a></li>
                                  </ul>
                                </div>
                              </div>{/*.listing-item*/}
                            </div>{/*.col-grid*/}
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