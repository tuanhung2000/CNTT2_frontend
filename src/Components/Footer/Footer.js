import React from "react";
import styled from "styled-components";
import img from "../../assets/logo.png";
function Footer() {
  return (
    <FooterContainer>
      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0px 42px 0px 0",
            gap: "20px",
          }}
        >
          <img src={img} alt="" width={250} height={50} />
          <div style={{ padding: "0 5px" }}>
            <p>1900 9217</p>
            <p>Hỗ trợ 9AM-9PM T2-T7</p>
          </div>
          <div style={{ padding: "0 5px" }}>
            <p>contact@EasyCar.vn</p>
            <p>Đặt câu hỏi cho EasyCar</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            lineHeight: "24px",
            width: "100%",
          }}
        >
          <div className="item_four">
            <p className="main">Chính sách</p>
            <div className="item-sub">
              <p>Chính sách và quy định</p>
              <p>Quy chế hoạt động</p>
              <p>Bảo mật thông tin</p>
              <p>Giải quyết tranh chấp</p>
            </div>
          </div>
          <div className="item_four">
            <p className="main">Tìm hiểu thêm</p>
            <div className="item-sub">
              <p>Hướng dẫn chung</p>
              <p>Hướng dẫn đặt xe</p>
            </div>
          </div>
          <div className="item_four">
            <p className="main1">ddd</p>
            <div className="item-sub">
              <p>Hỏi và trả lời</p>
              <p>EasyCar blog</p>
            </div>
          </div>
          <div className="item_four">
            <p className="main">Đối tác</p>
            <div className="item-sub">
              <p>Đăng ký chủ xe EasyCar</p>
              <p>Đăng ký thuê xe EasyCar</p>
            </div>
          </div>
        </div>
      </div>
    </FooterContainer>
  );
}
const FooterContainer = styled.footer`
  width: 100%;
  color: #6f6f6f;
  display: flex;
  padding: 40px;
  box-sizing: border-box;
  color: #6f6f6f;
  border-top: 0.5px solid #f0f0f0;
  .item_four {
    width: calc(25% - 15px);
  }
  .main {
    color: #242420;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 32px;
  }
  .main1 {
    color: #242420;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 32px;
    opacity: 0;
  }
  .item-sub {
    display: flex;
    flex-direction: column;
    gap: 24px;
    p {
      font-size: 16px;
    }
  }
`;

export default Footer;
