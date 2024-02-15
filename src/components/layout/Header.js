import React, { useContext, useEffect, useRef, useState } from 'react'
import {  Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../context/Auth';
import setAuthToken from '../utils/setAuthToken';

function Header() {
  const {logout, userData, handleAttachments, fetchUserInfo, uploadAttachments} = useContext(AuthContext)
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    handleAttachments(e.target.files);
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    uploadAttachments(token);
    setSelectedFile(null);
  }

  const handleAddNewClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
useEffect(() => {
  if (token) {
    setAuthToken(token);
    fetchUserInfo(token);
  }
}, []);

  useEffect(() =>{
    const script = document.createElement("script");
    script.innerHTML=
    `
    document.addEventListener("DOMContentLoaded", function() {

      const sideBarBtn = document?.querySelector('#sidebarBtn');
      let searchWrapper = document.querySelector('.search-wrapper');
      let wrapper = document.querySelector('.dashboard-wrapper');
      var windowWidth = document.body.clientWidth;
      const breakpoint = 991;

      sideBarBtn.addEventListener('click', () => {
          wrapper.classList.toggle('sidebar-toggle')
      })

      addEventListener("resize", () => {
          windowWidth = document.body.clientWidth;
          // wrapper.classList.add('show')
      });
  });
    `
    document.body.appendChild(script);

  }, []);

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
          <aside className="position-fixed top-0 start-0">
    <div className="sidebar-wrapper h-100 d-flex flex-column">
      <div className="logo-wrapper px-3">
        <img src="./images/logo.png" alt="" className="img-fluid" />
      </div>
      <div className="sidebar-menu-wrapper py-4 my-2">
        <div className="btn-wrapper px-3 mb-4 pb-2">
        {selectedFile ? (
          <button className="btn btn-light shadow-sm" onClick={handleUpload}>
            <i className="bi bi-upload" /> Upload
          </button>
            ) : (
          <button className="btn btn-light shadow-sm" onClick={handleAddNewClick} >
            <i className="bi bi-plus-lg" /> Add New
          </button>
            )}
          <input
            id="fileInput"
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={handleChange}
            ref={fileInputRef}
          />
        
        {/* Display selected file name */}
        {/* {selectedFile && <p>Selected File: {selectedFile.name}</p>} */}
  
        </div>
        <ul className="sidebar-listing list-unstyled px-3 mb-0 pb-4" id="collapse">
          <li className="nav-item">
          <NavLink className={`nav-link d-flex align-items-center mb-1`} to="/dashboard">
            <span className="icon d-inline-flex">
              <i className="bi bi-house" />
              <i className="bi bi-house-fill" />
            </span>
            <span className="sidebar-item">Dashboard</span>
          </NavLink>
          </li>{/*.nav-item*/}
          <li className="nav-item">
          <NavLink className={`nav-link d-flex align-items-center mb-1`} to="/mydrive">
            <span className="icon d-inline-flex">
              <i className="bi bi-hdd-stack" />
            </span>
            <span className="sidebar-item">My Drive</span>
          </NavLink>
          </li>{/*.nav-item*/}
          <li className="nav-item">
          <NavLink className="nav-link d-flex align-items-center mb-1" to="/profile">
            <span className="icon d-inline-flex">
              <i className="bi bi-gear" />
              <i className="bi bi-gear-fill" />
            </span>
            <span className="sidebar-item">Profile</span>
          </NavLink>
          </li>{/*.nav-item*/}
        </ul>
      </div>
    </div>{/*.sidebar-wrapper*/}
  </aside>{/*.aside*/}
         <header className=".header">
        <nav className="dashboard-nav position-fixed top-0 d-flex align-items-center pe-3 ps-3 ps-lg-0 mb-0">
          <Link id="sidebarBtn" className="btn-hamburger d-inline-flex p-2 d-lg-none">
            <span className="d-block position-relative" />
          </Link>{/*.btn-hamburger*/}
          <div className="w-100 h-100 d-flex">
            <div className="search-wrapper d-none d-md-flex align-items-center" style={{zIndex: 1}}>
              <div className="w-100 position-relative">
                <input className="form-control bg-white ps-5 border-0 rounded-pill" type="text" placeholder="Search..." />
                <span class="icon d-inline-flex position-absolute top-50 translate-middle-y start-0 mx-3">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
  </span>
              </div>
            </div>{/*.search-wrapper*/}
            <div className="nav-icons-wrapper d-flex flex-wrap align-items-center gap-3 gap-sm-4 ms-auto">
              <div className="dropdown position-static dropdown-end d-md-none d-flex">
                <Link className="d-flex align-items-center gap-1 gap-sm-2 text-decoration-none" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="d-inline-flex search-icons-wrapper">
                    <svg className="bi bi-search" xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </span>
                </Link>
                <div className="dropdown-menu top-100 start-50 translate-middle-x border-0 p-2 w-100">
                  <form className="search-form position-relative" action="#">
                    <input className="form-control bg-light w-100 rounded-pill ps-3" type="text" placeholder="Search..." aria-label="Search" />
                    <span className="search-box-icon position-absolute top-50 end-0 translate-middle-y text-dark mx-3 opacity-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </span>
                  </form>
                </div>{/*.dropdown-menu*/}
              </div>{/*.dropdown*/}
              <div className="dropdown">
                  <button
                    type="button"
                    className="btn d-flex p-0 align-items-center border-0 shadow-none"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      id="header-lang-img"
                      src="./images/us.svg"
                      alt="Header Language"
                      height={20}
                      className="rounded"
                    />
                    <span className="d-inline-block ms-2">En</span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end border-0 py-0">
                    {/* item*/}
                    <Link
                      to="#"
                      className="dropdown-item notify-item language py-2"
                      data-lang="en"
                      title="English"
                    >
                      <img
                        src="./images/us.svg"
                        alt=""
                        className="me-2 rounded"
                        height={18}
                      />
                      <span className="align-middle">English</span>
                    </Link>
                    {/* item*/}
                    <Link
                      to="#"
                      className="dropdown-item notify-item language"
                      data-lang="sp"
                      title="Spanish"
                    >
                      <img
                        src="./images/spain.svg"
                        alt=""
                        className="me-2 rounded"
                        height={18}
                      />
                      <span className="align-middle">Española</span>
                    </Link>
                    {/* item*/}
                    <Link
                      to="#"
                      className="dropdown-item notify-item language"
                      data-lang="gr"
                      title="German"
                    >
                      <img
                        src="./images/germany.svg"
                        alt=""
                        className="me-2 rounded"
                        height={18}
                      />{" "}
                      <span className="align-middle">Deutsche</span>
                    </Link>
                    {/* item*/}
                    <Link
                      to="#"
                      className="dropdown-item notify-item language"
                      data-lang="it"
                      title="Italian"
                    >
                      <img
                        src="./images/italy.svg"
                        alt=""
                        className="me-2 rounded"
                        height={18}
                      />
                      <span className="align-middle">Italiana</span>
                    </Link>
                    {/* item*/}
                    <Link
                      to="#"
                      className="dropdown-item notify-item language"
                      data-lang="ru"
                      title="Russian"
                    >
                      <img
                        src="./images/russia.svg"
                        alt=""
                        className="me-2 rounded"
                        height={18}
                      />
                      <span className="align-middle">русский</span>
                    </Link>
                    {/* item*/}
                    <Link
                      to="#"
                      className="dropdown-item notify-item language"
                      data-lang="ch"
                      title="Chinese"
                    >
                      <img
                        src="./images/china.svg"
                        alt=""
                        className="me-2 rounded"
                        height={18}
                      />
                      <span className="align-middle">中国人</span>
                    </Link>
                    {/* item*/}
                    <Link
                      to="#"
                      className="dropdown-item notify-item language"
                      data-lang="fr"
                      title="French"
                    >
                      <img
                        src="./images/french.svg"
                        alt=""
                        className="me-2 rounded"
                        height={18}
                      />
                      <span className="align-middle">français</span>
                    </Link>
                  </div>
                </div>

              <div className="dropdown profile-dropdown dropdown-end d-flex">
                <Link className="d-flex align-items-center text-dark gap-1 gap-sm-2 text-decoration-none dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <div className="profile d-block rounded-pill overflow-hidden me-sm-1">
                    <img className="img-fluid" src={`http://localhost:8080/${userData?.profileImage?.filePath}`} alt="" />
                  </div>{/*.profile*/}
                  <div className="profile-bio">
                    <h6 className="fw-semibold mb-0">{userData.firstName}{" "}{userData.lastName}</h6>
                  </div>{/*.profile-bio*/}
                </Link>
                <ul className="dropdown-menu dropdown-menu-end border-0 py-0">
                  <li>
                    <Link className="dropdown-item d-flex align-items-center gap-2 py-2" to="/profile">
                      <span className="d-inline-flex lh-base">
                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                        </svg>
                      </span>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center" to="#">
                      <span className="d-inline-flex lh-base me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                        </svg>
                      </span>
                      Settings
                    </Link>
                  </li >
                  <li  
                  onClick={()=>logout()}
                  >
                    <Link className="dropdown-item d-flex align-items-center"  to ="/">
                      <span className="d-inline-flex lh-base me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="currentColor" className="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z" />
                          <path fillRule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                        </svg>
                      </span>
                      Sign Out
                    </Link>
                  </li>
                </ul>{/*.dropdown-menu*/}
              </div>{/*.dropdown*/}
            </div>{/*.nav-icons-wrapper*/}
          </div>
        </nav>{/*dashboard-nav*/}
      </header>{/*.header*/}
</section>
    </div>
  )
}

export default Header