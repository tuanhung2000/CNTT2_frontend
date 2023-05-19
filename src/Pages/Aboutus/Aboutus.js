import React from "react";
import styled from "styled-components";
function Aboutus() {
  return (
    <AboutusComponent>
      <div style={{ padding: "80px 0" }}>
        <div style={{ display: "flex", margin: "0 60px" }}>
          <h1
            style={{
              fontFamily: "Manrope",
              fontSize: "64px",
              fontWeight: "700",
              lineHeight: "72px",
              margin: "0px 5% 0px 0px",
              width: "400px",
            }}
          >
            Micar - Cùng bạn đến mọi hành trình
          </h1>
          <div style={{ width: "calc(95% - 400px)" }}>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                padding: "15px 0px 0px",
              }}
            >
              Công ty Cổ phần Micar Asia hoạt động trên nền tảng ứng dụng cho
              thuê xe tự lái 4-7 chỗ, theo mô hình kinh tế sẻ chia.
            </p>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                padding: "15px 0px 0px",
              }}
            >
              Micar được thành lập với sứ mệnh mang đến nền tảng công nghệ hiện
              đại kết nối chủ xe ô tô và hành khách theo cách Nhanh Nhất, An
              Toàn Nhất và Tiết Kiệm Nhất
            </p>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                padding: "15px 0px 0px",
              }}
            >
              Micar hướng tới việc xây dựng một cộng đồng chia sẻ ô tô văn minh
              với nhiều tiện ích thông qua ứng dụng trên di động, nhằm nâng cao
              chất lượng cuộc sống của cộng đồng.
            </p>
          </div>
        </div>
      </div>
      <div style={{ margin: "0 0 100px" }}>
        <div style={{ display: "flex", margin: "0 60px" }}>
          <img
            src="https://www.mioto.vn/static/media/aboutus1.4c31a699.png"
            style={{ width: "100%", height: "auto" }}
            alt=""
          />
        </div>
      </div>
    </AboutusComponent>
  );
}

const AboutusComponent = styled.section`
  min-height: calc(100vh - 160px);
  width: 100%;
`;
export default Aboutus;
