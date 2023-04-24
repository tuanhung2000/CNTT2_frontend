import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
function Navbar() {
  const [active, setActive] = useState("nav_menu");
  const [toggleIcon, setToggleIcon] = useState("nav_toggler");
  const toggle = () => {
    active === "nav_menu"
      ? setActive("nav_menu nav_active")
      : setActive("nav_menu");
    toggleIcon === "nav_toggler"
      ? setToggleIcon("nav_toggler toggle")
      : setToggleIcon("nav_toggler");
  };
  return (
    <NavbarContainer>
      <NavbarLeft>
        <LogoSections>
          <LinkCustom to="/">
            B<Green className="green">i</Green>cycle
          </LinkCustom>
        </LogoSections>
        <ContactSection>
          <div>
            <IconSection>
              <ion-icon name="car-sport-outline"></ion-icon>
              1900 9217
            </IconSection>
          </div>
          <div>
            <IconSection>
              <ion-icon name="call-outline"></ion-icon>
              1900 9217
            </IconSection>
          </div>
        </ContactSection>
      </NavbarLeft>
      <NavbarRight>
        <section className="product">
          <Bao to="/products">
            <ion-icon name="car-sport-outline"></ion-icon>
            <span className="hidden">Trở thành chủ xe</span>
          </Bao>
        </section>
        <ul className={active}>
          <li>
            <LinkCustom to="/login">Đăng nhập</LinkCustom>
          </li>
          <li>
            <ButtonSignup to="/signup">Đăng ký</ButtonSignup>
          </li>
        </ul>
        <div onClick={toggle} className={toggleIcon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </NavbarRight>
    </NavbarContainer>
  );
}
const NavbarContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  background-color: #141414;
  color: white;
`;
const NavbarLeft = styled.section`
  padding-left: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const LogoSections = styled.section`
  font-size: 30px;
  font-weight: bold;
`;
const Green = styled.span`
  color: Green;
  ${
    "" /* &:hover {
    background-color: white;
  } */
  }
`;
const ContactSection = styled.section`
  display: flex;
  flex-direction: row
  align-items: center;
  justify-content: space-between;
  padding-left: 50px;
  gap:30px;
  font-weight: bold
`;
const NavbarRight = styled.section`
  padding-right: 50px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  .nav_menu {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 3rem;

    @media screen and (max-width: 767px) {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      background-color: #141414;
      flex-direction: column;
      transform: translateX(100%);
      z-index: 10;
    }
  }
  .button-signup {
    border: 1px solid green;
  }
  .nav_active {
    transform: translateX(0);
    transition: 0.5s;
  }
  .nav_toggler div {
    width: 2.5rem;
    height: 0.2rem;
    margin: 0.4rem;
    background-color: chartreuse;
    transition: 0.5s ease-in-out;
  }
  .nav_toggler {
    cursor: pointer;
    display: none;
    @media screen and (max-width: 767px) {
      display: block;
      position: absolute;
      top: 10px;
      right: 0;
      z-index: 100;
    }
  }
  .nav_toggler {
    cursor: pointer;
    display: none;
    @media screen and (max-width: 767px) {
      display: block;
    }
  }
  .toggle .line1 {
    transform: rotate(-45deg) translate(-4px, 5px);
    -webkit-transform: rotate(-45deg) translate(-4px, 5px);
  }
  .toggle .line2 {
    opacity: 0;
  }
  .toggle .line3 {
    transform: rotate(45deg) translate(-4px, -5px);
  }
`;
const LinkCustom = styled(Link)`
  color: white;
  padding: 10px;
  font-weight: bold;
  &:hover {
    color: #00a550;
    .green {
      color: white;
    }
  }
`;
const ButtonSignup = styled(Link)`
  color: white;
  padding: 10px;
  font-weight: bold;
  border: 1px solid white;
  &:hover {
    color: #00a550;
    border-color: #00a550;
  }
`;
const Bao = styled(Link)`
  display: flex;
  color: white;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  &:hover {
    color: #00a550;
  }
  ion-icon {
    padding-left: 10px;
  }
  @media screen and (max-width: 767px) {
    ion-icon {
      padding-right: 10px;
      width: 30px;
      height: 30px;
    }
  }
  @media screen and (max-width: 900px) {
    .hidden {
      display: none;
    }
  }
`;
// IconSection;
const IconSection = styled(Link)`
  display: flex;
  color: white;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export default Navbar;
