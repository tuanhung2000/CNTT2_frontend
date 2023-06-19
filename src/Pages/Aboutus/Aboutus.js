import React, { useEffect, useState } from "react";
import styled from "styled-components";
import car from "../../assets/car3.png";
import AboutusImg from "../../assets/aboutus.png";
function Aboutus() {
  const listAds = [
    {
      name: "Đặt xe bằng 1 Click",
      url: "data:image/png;base64,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",
    },
    {
      name: "Hơn 100 mẫu xe",
      url: "data:image/png;base64,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",
    },
    {
      name: "Mioto đã có mặt ở hầu hết các quận huyện và các tỉnh thành lớn",
      url: "data:image/png;base64,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",
    },
    {
      name: "Rẻ hơn 10% xe truyền thống",
      url: "data:image/png;base64,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",
    },
    {
      name: "Thu nhập 10 - 15 triệu/tháng",
      url: "data:image/png;base64,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",
    },
  ];
  const [delay, setDelay] = useState(0);
  const [delaytime, setDelayTime] = useState(0);
  useEffect(() => {
    listAds.forEach((item, index) => {
      const duration = (index + 1) * 1000 + 1000;
      const delaytime = duration + 1000;
      setTimeout(() => {
        setDelay(duration);
        setDelayTime(delaytime);
      }, duration);
    });
  }, []);
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
          <div style={{ width: "calc(95% - 400px)", overflowX: "hidden" }}>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                padding: "15px 0px 0px",
              }}
              data-aos="fade-left"
              data-aos-duration="1000"
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
              data-aos="fade-left"
              data-aos-duration="2000"
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
              data-aos="fade-left"
              data-aos-duration="3000"
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
            src={AboutusImg}
            style={{ width: "100%", height: "auto" }}
            alt=""
          />
        </div>
      </div>
      <div style={{ margin: "0 60px 80px" }}>
        <h2
          style={{
            margin: "0px 0px 30px",
            fontSize: "40px",
            fontWeight: "700",
            lineHeight: "60px",
            fontFamily: "Manrope",
          }}
        >
          Lợi thế của Micar
        </h2>
        <div className="list_ads">
          {listAds.map((item, index) => (
            <div
              className="ads_item"
              key={index}
              data-aos="fade-up"
              data-aos-easing="ease-in"
              data-aos-duration="1000"
            >
              <img
                style={{ margin: "0px 0px 24px", lineHeight: "24px" }}
                src={item.url}
                alt=""
                width={190}
                height={200}
              />
              <p className="text">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          margin: "0",
          boxSizing: "border-box",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: "200px",
            width: "60%",
            position: "relative",
            textAlign: "center",
          }}
        >
          <img
            src={car}
            width={600}
            height={200}
            alt=""
            style={{ position: "relative", zIndex: 2 }}
          ></img>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              width: "100%",
              gap: "10%",

              alignItems: "flex-end",
              boxSizing: "border-box",
              height: "300px",
            }}
          >
            <span
              style={{ fontSize: "300px", lineHeight: "300px", color: "black" }}
            >
              C
            </span>{" "}
            <span
              style={{
                fontSize: "300px",
                lineHeight: "300px",
                color: "black",
                // backgroundColor: "#00a550",
              }}
            >
              {" "}
              A{" "}
            </span>{" "}
            <span
              style={{ fontSize: "300px", lineHeight: "300px", color: "black" }}
            >
              R
            </span>
          </div>
        </div>
        <div style={{ marginTop: "20px", fontSize: "20px" }}>
          Hãy để chúng tôi giúp bạn có những trải nghiệm tốt nhất!
        </div>
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <span>Mazda</span>
            <span>Toyota</span>
            <span>BMW</span>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <span>Ford</span>
            <span>Mercedes-Benz</span>
            <span>Volkswagen</span>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <span>Honda</span>
            <span>Nissan</span>
            <span>Chevrolet</span>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <span>Audi</span>
            <span>Hyundai</span>
            <span>Kia</span>
          </div>
        </div>
        {/* <div
          style={{
            position: "relative",
            // backgroundColor: "red",
            zIndex: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={car}
            width={600}
            height={200}
            alt=""
            style={{ position: "relative", zIndex: 2 }}
          ></img>
          <p
            style={{
              height: "400px",
              padding: "0",
              position: "absolute",
              zIndex: 1,
              bottom: 0,
              display: "block",
              lineHeight: "400px",
              fontSize: "400px",
            }}
          >
            C
            <span style={{ backgroundColor: "#00a550", height: "400px" }}>
              {" "}
              A{" "}
            </span>
            R
          </p>
        </div>
        <div style={{ marginTop: "20px", fontSize: "20px" }}>
          Hãy để chúng tôi giúp bạn có những trải nghiệm tốt nhất!
        </div>
        <div style={{ marginTop: "20px", display: "flex" }}>
          Life's too short to drive boring cars
        </div> */}
      </div>
    </AboutusComponent>
  );
}

const AboutusComponent = styled.section`
  min-height: calc(100vh - 160px);
  width: 100%;
  span {
    color: gray;
    font-size: 12px;
  }
  .list_ads {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .ads_item {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      line-height: 24px;
      margin: 0px 0px 50px;
      flex-direction: column;
      flex-basis: 33.3333333333%;
      .text {
        font-size: 24px;
        font-weight: 500;
        line-height: 36px;
        padding: 0px 20px;
        text-align: center;
      }
    }
  }
`;
export default Aboutus;
