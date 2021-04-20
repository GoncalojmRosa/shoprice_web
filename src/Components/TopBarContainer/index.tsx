import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Group2 from '../../Assets/images/Group2.svg';
import '../../Assets/Styles/style.min.css';
import 'mdi/css/materialdesignicons.min.css';
// import './styles.scss';
import { AuthContext } from '../../contexts/auth';

interface TopBarContainerProps {
  profile?: boolean;
  title?: string;
  transparent?: boolean;
  linkToHome?: boolean;
  logoColor?: boolean;
}

const TopBarContainer: React.FunctionComponent<TopBarContainerProps> = ({
  profile = false,
  title,
  transparent = false,
  linkToHome = true,
  logoColor = true,
}) => {
  const { signOut, user } = useContext(AuthContext);

  function handleSignOut() {
    signOut();
  }

  return (
    <header id="header-section" style={{ zIndex: 2 }}>
      <nav
        className="navbar navbar-expand-lg pl-3 pl-sm-0"
        style={{ backgroundColor: 'transparent' }}
        id="navbar"
      >
        <div className="container">
          <div className="navbar-brand-wrapper d-flex w-100">
            <img src={Group2} alt="" />
            <button
              className="navbar-toggler ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="mdi mdi-menu navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse navbar-menu-wrapper" id="navbarSupportedContent">
            <ul className="navbar-nav align-items-lg-center align-items-start ml-auto">
              <li className="d-flex align-items-center justify-content-between pl-4 pl-lg-0">
                <div className="navbar-collapse-logo">
                  <img src={Group2} alt="" />
                </div>
                <button
                  className="navbar-toggler close-button"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="mdi mdi-close navbar-toggler-icon pl-5"></span>
                </button>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" href="#header-section">
                    Home <span className="sr-only">(current)</span>
                  </a> */}
                <Link to="/Test" className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#features-section">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#digital-marketing-section">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#feedback-section">
                  Testimonials
                </a>
              </li>
              <li className="nav-item btn-contact-us pl-4 pl-lg-0">
                <button className="btn btn-info" data-toggle="modal" data-target="#exampleModal">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TopBarContainer;
