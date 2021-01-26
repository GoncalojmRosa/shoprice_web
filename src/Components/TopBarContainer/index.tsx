import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import backIconPurple from '../../Assets/backPurple.svg';
import backIcon from '../../Assets/back.svg';
import leaveIcon from '../../Assets/icons/leave.svg';
import logoImg from '../../Assets/logo.svg';
import logoImgPurple from '../../Assets/logoPurple.svg';

import './styles.scss';
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
    <div className={`holder-top-bar ${!profile || (transparent && 'holder-dark')}`}>
      {profile ? (
        <div className="top-bar-container">
          <Link to="/profile" className="profile-button">
            <img alt="Perfil" />
            <p>Olá</p> {[user.email, 'aaaa'].join(' ')}
          </Link>
          <p>{title}</p>
          <img src={leaveIcon} alt="Sair" onClick={(e) => handleSignOut()} />
        </div>
      ) : (
        <div className="top-bar-container">
          {linkToHome ? (
            <Link to="/">
              <img src={backIcon} alt="Voltar" />
            </Link>
          ) : (
            <Link to="/">
              <img src={backIconPurple} alt="Voltar" />
            </Link>
          )}

          <p>{title}</p>
          {logoColor ? (
            <img src={logoImg} alt="Proffy" />
          ) : (
            <img src={logoImgPurple} alt="Proffy" />
          )}
        </div>
      )}
    </div>
  );
};

export default TopBarContainer;
