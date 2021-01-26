import styled from 'styled-components';

export const Container = styled.div`
  height: 60px;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
  font: 700 2.5rem Lemonada;
`;

export const SwitchContainer = styled.div`
  padding-top: 20px;
  margin-left: 40px;
`;

export const Link = styled.a`
    &{
      opacity: 0.6;
    }
`;