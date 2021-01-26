import React from 'react';

import Theme from '../../Hooks';

//IMG
import backIcon from '../../Assets/back.svg';

import './styles.css';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <div>
      <header className="page-header">
        <div className="top-bar-container">
          <Link to="/">
            <img src={backIcon} alt="Voltar" />
          </Link>
          <Theme />
        </div>

        <div className="header-content">
          <strong>{props.title}</strong>
          {props.description && <p>{props.description}</p>}

          {props.children}
        </div>
      </header>
    </div>
  );
};

export default PageHeader;
