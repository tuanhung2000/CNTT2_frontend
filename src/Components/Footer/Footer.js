import React from "react";
import styled from "styled-components";
function Footer() {
  return (
    <FooterContainer>
      <FooterLeft>
        <h3>Công ty Cổ phần Hùng</h3>
        <p>Loremahai</p>
      </FooterLeft>
      <FooterRight>
        Địa chỉ: Văn phòng 02, Tầng 08, Tòa nhà Pearl Plaza, Số 561A Điện Biên
        Phủ, Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam.
      </FooterRight>
    </FooterContainer>
  );
}
const FooterContainer = styled.section`
  min-height: 100px;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  color: black;
`;
const FooterLeft = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const FooterRight = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 0.3rem;
  justify-content: center;
`;
export default Footer;
