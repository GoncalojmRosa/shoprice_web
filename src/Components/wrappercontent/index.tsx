import React from "react";

import "./styles.scss";
import TopBarContainer from "../TopBarContainer";

const WrapperContent: React.FunctionComponent<{
  className?: string;
  linkColor?: boolean;
  logoColor?: boolean;
}> = ({ children, className, linkColor, logoColor }) => {
  return (
    <div id="page-content" className={className}>
      <TopBarContainer
        transparent={true}
        linkToHome={linkColor}
        logoColor={logoColor}
      />
      {children}
    </div>
  );
};

export default WrapperContent;
