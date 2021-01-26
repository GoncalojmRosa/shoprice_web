import React, { useContext } from "react";
import Switch from "react-switch";
import { ThemeContext } from "styled-components";

import { shade } from "polished";

import { Container, SwitchContainer } from "./styles";
import "./styles.css";
import { Link } from "react-router-dom";

interface Props {
  toggleTheme(): void;
}

const Header: React.FC<Props> = ({ toggleTheme }) => {
  const { colors, title } = useContext(ThemeContext);

  return (
    <Container>
      <div className="top-bar-container">
        <Link
          to="/login"
          className="login"
          style={{ textDecoration: "none", color: colors.text }}
        >
          Login
        </Link>
      </div>

      <SwitchContainer>
        <Switch
          onChange={toggleTheme}
          checked={title === "dark"}
          checkedIcon={false}
          uncheckedIcon={false}
          height={10}
          width={40}
          handleDiameter={20}
          offColor={shade(0.15, colors.secundary)}
          onColor={colors.secundary}
        />
      </SwitchContainer>
    </Container>
  );
};

export default Header;
