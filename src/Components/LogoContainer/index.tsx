import React from 'react';

import shopping from '../../Assets/shopping_app.svg';

import './styles.scss';

const logoContainerStyle = {
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  zIndex: 0,
};

const LogoContainer: React.FunctionComponent<{ background?: boolean }> = ({
  background = true,
}) => {
  return (
    <div className="logo-container">
      {background && <div className="logo-bg-container" style={logoContainerStyle} />}
      <div className="logo-hero">
        <img src={shopping} alt="Proffy" />
        <h2>A Sua plataforma de comparação de preços online</h2>
      </div>
    </div>
  );
};

export default LogoContainer;
