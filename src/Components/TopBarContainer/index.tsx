import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Group2 from '../../Assets/images/Group2.svg';
import '../../Assets/Styles/style.min.css';
import 'mdi/css/materialdesignicons.min.css';
// import './styles.scss';
import { AuthContext } from '../../contexts/auth';

import './style.scss';

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
  children,
}) => {
  const { signOut, user, isAdmin } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  function handleSignOut() {
    signOut();
  }

  return (
    <header id="header-section" style={{ zIndex: 2 }}>
      <nav
        className="navbar navbar-expand-lg pl-3 pl-sm-0"
        // style={{ backgroundColor: 'transparent' }}
        id="navbar"
      >
        <div className="container">
          <div className="navbar-brand-wrapper d-flex w-100">
            {/* <img src={Group2} alt="" /> */}
            <Link to="/" className="nav-link">
              Shoprice
            </Link>
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
                <Link to="/compare" className="nav-link">
                  Comparar
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#features-section">
                  Sobre
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#digital-marketing-section">
                  Doar
                </a>
              </li>
              <li className="nav-item">
                <Link to="/app/suggestions">Sugestões</Link>
              </li>
              {profile ? (
                <li className="nav-item">
                  <div
                    className="header__avatar"
                    style={{
                      backgroundImage: `url(${user.avatar})`,
                    }}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <div
                      className={isOpen ? 'dropdown dropdown--active' : 'dropdown'}
                      style={{ zIndex: 99999 }}
                    >
                      <ul className="dropdown__list">
                        <Link to="/app/account">
                          <li className="dropdown__list-item">
                            <span className="dropdown__icon">
                              <i className="far fa-user"></i>
                            </span>
                            <span className="dropdown__title">Perfil</span>
                          </li>
                        </Link>
                        {isAdmin ? (
                          <div>
                            <Link to="/app/customers">
                              <li className="dropdown__list-item">
                                <span className="dropdown__icon">
                                  <i className="fas fa-columns"></i>
                                </span>
                                <span className="dropdown__title">Dashboard</span>
                              </li>
                            </Link>
                            <Link to="/reports">
                              <li className="dropdown__list-item">
                                <span className="dropdown__icon">
                                  <i className="fas fa-clipboard-list"></i>
                                </span>
                                <span className="dropdown__title">Bug's Reportados</span>
                              </li>
                            </Link>
                          </div>
                        ) : (
                          ''
                        )}

                        <li className="dropdown__list-item" onClick={() => handleSignOut()}>
                          <span className="dropdown__icon">
                            <i className="fas fa-sign-out-alt"></i>
                          </span>
                          <span className="dropdown__title">log out</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ) : (
                ''
              )}

              {children}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TopBarContainer;
