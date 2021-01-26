import React from 'react';
import { Link } from 'react-router-dom';
import doneIcon from '../../Assets/icons/done.svg';
import backgroundImg from '../../Assets/success-background.svg';
import './styles.scss';

const pageFullBackgroundStyle = {
  backgroundImage: `url(${backgroundImg})`,
};

interface FullContentProps {
  className?: string;
  title: string;
  disabled?: boolean;
  message: string;
  link: {
    url: string;
    text: string;
  };
}

const FullContent: React.FunctionComponent<FullContentProps> = ({
  title,
  message,
  disabled = false,
  link,
  className,
}) => {
  return (
    <div id="page-full-content" className={className}>
      <div className="page-full-container">
        <div className="page-full-background" style={pageFullBackgroundStyle} />
        <div>
          <img src={doneIcon} alt="" />
          <h2>{title}</h2>
          <p>{message}</p>
          {!disabled ? (
            <Link to={link.url}>{link.text}</Link>
          ) : (
            <span>
              <Link className="link_Disable" to="">
                {link.text}
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullContent;
