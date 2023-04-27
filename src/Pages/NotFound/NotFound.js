import React from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/color";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <NotFoundComponent>
      <h1 style={{ color: "white", fontWeight: "bold", fontSize: "100px" }}>
        4<span style={{ color: COLORS.main }}>0</span>4
      </h1>
      <h3 style={{ color: "white", fontWeight: "bold", fontSize: "50px" }}>
        Không tìm thấy trang
      </h3>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "white",
          backgroundColor: COLORS.main,
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Quay về trang chủ
      </Link>
    </NotFoundComponent>
  );
}
const NotFoundComponent = styled.section`
  min-height: 100vh;
  width: 100%;
  gap: 20px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export default NotFound;
