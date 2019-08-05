import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  padding: 0 2rem;
  background-color: #000;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  width: 100%;
  img {
    height: 1.2rem;
    @media (max-width: 480px) {
      height: 1rem;
    }
  }
`;

const Header = () => (
  <StyledHeader>
    <img
      alt="logo"
      src="https://clutchpoints.com/wp-content/uploads/2017/06/CPLogo.png"
    />
  </StyledHeader>
);

export default Header;
