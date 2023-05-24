import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Carousel } from "antd";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";
import { MenuItem, Select } from "@mui/material";
import axios from "axios";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function Home() {
  const [open, setOpen] = useState("close");
  const [city, setCity] = useState("");
  const [active, setActive] = useState(1);
  const [listcity, setListCity] = useState([]);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [daystart, setDaystart] = useState(null);
  const [dayend, setDayend] = useState(null);
  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/").then((response) => {
      setListCity(response.data);
    });
  }, []);
  // const scrollTop = () => {
  //   window.scrollTo(0, 0);
  // };
  // var targetElm = document.querySelector("HomeSectionBottom");
  const handleDayStartChange = (newValue) => {
    setDaystart(newValue);

    if (dayend && dayjs(dayend).isBefore(dayjs(newValue))) {
      setDayend(dayjs(newValue).add(1, "hour"));
    }
  };
  const handleDayendChange = (newValue) => {
    setDayend(newValue);
  };
  const openDialog = () => {
    if (open === "close") {
      setOpen("open");
      // scrollTop();
    } else {
      setOpen("close");
    }
  };
  const { username } = useAuth();
  console.log(username);
  return (
    <HomeSection>
      <HomeSectionTop
        style={{ marginBottom: active === 1 ? "100px" : "200px" }}
      >
        <div
          style={{ margin: "0 auto", maxWidth: "1140px", position: "relative" }}
        >
          <div className="img_first">
            <h1
              style={{
                position: "absolute",
                bottom: "200px",
                width: "100%",
                textAlign: "center",
                fontSize: "50px",
                lineHeight: "50px",
                color: "white",
              }}
            >
              Micar - Cùng Bạn Đến Mọi Hành Trình
            </h1>
          </div>
          <div className="container_search">
            <div style={{ width: "40%", display: "flex" }}>
              <div
                onClick={() => {
                  setActive(1);
                }}
                style={{
                  borderRadius: "16px 0 0",
                  width: "100%",
                  padding: "16px",
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: active === 1 ? "#5fcf86" : "white",
                  cursor: "pointer",
                }}
              >
                <ion-icon
                  name="car-sport-outline"
                  style={{
                    color: active === 1 ? "white" : "black",
                    backgroundColor: active === 1 ? "#5fcf86" : "white",
                  }}
                ></ion-icon>
                <p
                  style={{
                    color: active === 1 ? "white" : "black",
                    backgroundColor: active === 1 ? "#5fcf86" : "white",
                  }}
                  className="name"
                >
                  Xe tự lái
                </p>
              </div>
              <div
                onClick={() => {
                  setActive(2);
                }}
                style={{
                  width: "100%",
                  padding: "16px",
                  display: "flex",
                  gap: "8px",
                  cursor: "pointer",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: active === 2 ? "#5fcf86" : "white",
                  borderRadius: "0px 16px 0px 0px",
                }}
              >
                <ion-icon
                  name="car-sport-outline"
                  style={{
                    color: active === 2 ? "white" : "black",
                    backgroundColor: active === 2 ? "#5fcf86" : "white",
                  }}
                ></ion-icon>
                <p
                  style={{
                    color: active === 2 ? "white" : "black",
                    backgroundColor: active === 2 ? "#5fcf86" : "white",
                  }}
                  className="name"
                >
                  Xe có tài xế
                </p>
              </div>
            </div>
            {active === 1 ? (
              <>
                <div className="search">
                  <div className="search-item">
                    <div className="title">
                      <ion-icon name="car-sport-outline"></ion-icon>
                      <p style={{ color: "black" }}>Địa điểm</p>
                    </div>
                    <div className="input">
                      {" "}
                      <Select
                        name="city"
                        displayEmpty
                        labelId="demo-simple-select-label"
                        id="city"
                        value={city}
                        style={{ height: "56px", width: "100%" }}
                        onChange={(e) => setCity(e.target.value)}
                        MenuProps={{
                          getcontentanchorel: null,
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center",
                          },
                          PaperProps: {
                            style: {
                              maxHeight: 100,
                              width: "auto",
                            },
                          },
                        }}
                      >
                        <MenuItem value="">Tỉnh/Thành phố</MenuItem>
                        {listcity.map((item) => (
                          <MenuItem value={item.code} key={item.code}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "0.5px",
                      lineHeight: "20px",
                      margin: "4px 12px",
                      backgroundColor: "gray",
                    }}
                  ></div>
                  <div className="search-item">
                    <div className="title">
                      <ion-icon name="calendar-outline"></ion-icon>
                      <p style={{ color: "black" }}>Bắt đầu</p>
                    </div>
                    <div className="input">
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        style={{ backgroundColor: "red" }}
                      >
                        <DateTimePicker
                          id="daystart"
                          minDateTime={dayjs()}
                          value={daystart}
                          onChange={handleDayStartChange}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "0.5px",
                      lineHeight: "20px",
                      margin: "4px 12px",
                      backgroundColor: "gray",
                    }}
                  ></div>
                  <div className="search-item">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        width: "100%",
                        justifyContent: "space-between",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "80%",
                        }}
                      >
                        <div className="title">
                          <ion-icon name="calendar-outline"></ion-icon>
                          <p style={{ color: "black" }}>Kết thúc</p>
                        </div>
                        <div className="input">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              id="dayend"
                              minDateTime={
                                daystart
                                  ? dayjs(daystart).add(1, "hour")
                                  : dayjs()
                              }
                              value={dayend}
                              onChange={handleDayendChange}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                      <button
                        style={{
                          width: "20%",
                          padding: "10px",
                          backgroundColor: "#5fcf86",
                          border: "none",
                          height: "56px",
                          outline: "none",
                          borderRadius: "5px",
                          color: "white",
                          display: "flex",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        Tìm kiếm
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="search">
                  <div className="search-item">
                    <div className="title">
                      <ion-icon name="car-sport-outline"></ion-icon>
                      <p style={{ color: "black" }}>Địa điểm đón</p>
                    </div>
                    <div className="input">
                      {" "}
                      <Select
                        name="city"
                        displayEmpty
                        labelId="demo-simple-select-label"
                        id="city"
                        value={city}
                        style={{ height: "56px", width: "100%" }}
                        onChange={(e) => setCity(e.target.value)}
                        MenuProps={{
                          getcontentanchorel: null,
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center",
                          },
                          PaperProps: {
                            style: {
                              maxHeight: 100,
                              width: "auto",
                            },
                          },
                        }}
                      >
                        <MenuItem value="">Tỉnh/Thành phố</MenuItem>
                        {listcity.map((item) => (
                          <MenuItem value={item.code} key={item.code}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "0.5px",
                      lineHeight: "20px",
                      margin: "4px 12px",
                      backgroundColor: "gray",
                    }}
                  ></div>
                  <div className="search-item">
                    <div className="title">
                      <ion-icon name="calendar-outline"></ion-icon>
                      <p style={{ color: "black" }}>Bắt đầu</p>
                    </div>
                    <div className="input">
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        style={{ backgroundColor: "red" }}
                      >
                        <DateTimePicker
                          id="daystart"
                          minDateTime={dayjs()}
                          value={daystart}
                          onChange={handleDayStartChange}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "0.5px",
                      lineHeight: "20px",
                      margin: "4px 12px",
                      backgroundColor: "gray",
                    }}
                  ></div>
                  <div className="search-item">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        width: "100%",
                        justifyContent: "space-between",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "80%",
                        }}
                      >
                        <div className="title">
                          <ion-icon name="calendar-outline"></ion-icon>
                          <p style={{ color: "black" }}>Kết thúc</p>
                        </div>
                        <div className="input">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              id="dayend"
                              minDateTime={
                                daystart
                                  ? dayjs(daystart).add(1, "hour")
                                  : dayjs()
                              }
                              value={dayend}
                              onChange={handleDayendChange}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                      <button
                        style={{
                          width: "20%",
                          padding: "10px",
                          backgroundColor: "#5fcf86",
                          border: "none",
                          height: "56px",
                          outline: "none",
                          borderRadius: "5px",
                          color: "white",
                          display: "flex",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        Tìm kiếm
                      </button>
                    </div>
                  </div>
                </div>
                <div className="search">
                  <div className="search-item">
                    <div className="title">
                      <ion-icon name="car-sport-outline"></ion-icon>
                      <p style={{ color: "black" }}>Địa điểm đón</p>
                    </div>
                    <div className="input">
                      {" "}
                      <Select
                        name="city"
                        displayEmpty
                        labelId="demo-simple-select-label"
                        id="city"
                        value={city}
                        style={{ height: "56px", width: "100%" }}
                        onChange={(e) => setCity(e.target.value)}
                        MenuProps={{
                          getcontentanchorel: null,
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center",
                          },
                          PaperProps: {
                            style: {
                              maxHeight: 100,
                              width: "auto",
                            },
                          },
                        }}
                      >
                        <MenuItem value="">Tỉnh/Thành phố</MenuItem>
                        {listcity.map((item) => (
                          <MenuItem value={item.code} key={item.code}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "0.5px",
                      lineHeight: "20px",
                      margin: "4px 12px",
                      backgroundColor: "gray",
                    }}
                  ></div>
                  <div className="search-item">
                    <div className="title">
                      <ion-icon name="calendar-outline"></ion-icon>
                      <p style={{ color: "black" }}>Bắt đầu</p>
                    </div>
                    <div className="input">
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        style={{ backgroundColor: "red" }}
                      >
                        <DateTimePicker
                          id="daystart"
                          minDateTime={dayjs()}
                          value={daystart}
                          onChange={handleDayStartChange}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "0.5px",
                      lineHeight: "20px",
                      margin: "4px 12px",
                      backgroundColor: "gray",
                    }}
                  ></div>
                  <div className="search-item">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        width: "100%",
                        justifyContent: "space-between",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "80%",
                        }}
                      >
                        <div className="title">
                          <ion-icon name="calendar-outline"></ion-icon>
                          <p style={{ color: "black" }}>Kết thúc</p>
                        </div>
                        <div className="input">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              id="dayend"
                              minDateTime={
                                daystart
                                  ? dayjs(daystart).add(1, "hour")
                                  : dayjs()
                              }
                              value={dayend}
                              onChange={handleDayendChange}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                      <button
                        style={{
                          width: "20%",
                          padding: "10px",
                          backgroundColor: "#5fcf86",
                          border: "none",
                          height: "56px",
                          outline: "none",
                          borderRadius: "5px",
                          color: "white",
                          display: "flex",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        Tìm kiếm
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </HomeSectionTop>
      <HomeSectionBottom>
        <Titleh3>Ưu đãi hiện hành</Titleh3>
        <div className="cover_carousel">
          <Carousel autoplay>
            <div>
              <div
                className="carousel carousel_1"
                // onClick={openDialog}
              ></div>
            </div>
            <div>
              <div className="carousel carousel_2"></div>
            </div>
            <div>
              <div className="carousel carousel_3 "></div>
            </div>
          </Carousel>
        </div>
      </HomeSectionBottom>
      <div className={open}>
        <div className="card-open">
          <img
            src="https://n1-cstg.mioto.vn/g/2023/02/02/01/HCHM7MTN.jpg"
            alt=""
          ></img>
          <ion-icon name="close-circle-outline" onClick={openDialog}></ion-icon>
          <div>
            <h3>NHẬP MÃ MI03 - TIẾT KIỆM 15% KHI THUÊ XE TẠI MIOTO</h3>
            <p>
              Với dịch vụ thuê xe có tài tiện lợi, nhanh chóng cùng thủ tục đơn
              giản. Hãy để Mioto đồng hành cùng bạn trong mọi chuyến đi. Nhập mã
              MI03 - Tiết kiệm 15% (tối đa 150k) chi phí khi thuê xe có tài tại
              Mioto. *Ưu đãi được áp dụng đến hết ngày 31/03
            </p>
          </div>
        </div>
      </div>
      <HomeGuide>
        <div className="title">
          <h1>Hướng dẫn thuê xe</h1>
        </div>
        <div className="card-box_wrap">
          <div className="card-box_item">
            <img
              src="https://www.mioto.vn/static/media/step-1.c204d3e1.svg"
              alt=""
            />
            <h3>Đặt xe</h3>
          </div>
          <div className="card-box_item">
            <img
              src="https://www.mioto.vn/static/media/step-1.c204d3e1.svg"
              alt=""
            />
            <h3>Nhận xe</h3>
          </div>
          <div className="card-box_item">
            <img
              src="https://www.mioto.vn/static/media/step-1.c204d3e1.svg"
              alt=""
            />
            <h3>Trải nghiệm</h3>
          </div>
        </div>
      </HomeGuide>
      <HomeDestination>
        <div className="title">
          <Titleh3>Đặc điểm nổi bật</Titleh3>
        </div>
        <div className="destinationcard-wrap">
          <div class="image">
            <div id="zoom-In">
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnxlbnwwfDF8MHx8&auto=format&fit=crop&w=600&q=60"
                  alt=""
                />
              </figure>
              <h3>Nâng tầm cuộc sống Việt</h3>
              <p>
                Phục vụ Phi Ngôn Ngữ giúp khách hàng cảm giác được Nâng tầm khi
                mà Khách đến Công ty và lái xe đi như chính là xe của mình mà
                không cần ái ngại gặp mặt bất cứ nhân viên nào với cảm giác đi
                thuê.
              </p>
            </div>
          </div>
          <div class="image">
            <div id="zoom-In">
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                  alt=""
                />
              </figure>
              <h3>Thuê xe ngồi tại nhà</h3>
              <p>
                Phục vụ Phi Ngôn Ngữ giúp khách hàng cảm giác được Nâng tầm khi
                mà Khách đến Công ty và lái xe đi như chính là xe của mình mà
                không cần ái ngại gặp mặt bất cứ nhân viên nào với cảm giác đi
                thuê.
              </p>
            </div>
          </div>
          <div class="image">
            <div id="zoom-In">
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1609520505218-7421df70121d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGNhcnxlbnwwfDF8MHx8&auto=format&fit=crop&w=600&q=60"
                  alt=""
                />
              </figure>
              <h3>Zoom In</h3>
              <p>
                Phục vụ Phi Ngôn Ngữ giúp khách hàng cảm giác được Nâng tầm khi
                mà Khách đến Công ty và lái xe đi như chính là xe của mình mà
                không cần ái ngại gặp mặt bất cứ nhân viên nào với cảm giác đi
                thuê.
              </p>
            </div>
          </div>
        </div>
      </HomeDestination>
      <HomeExtra>
        <section className="bao1">
          <div className="TitleExtra">
            <h3>Bạn muốn cho thuê xe</h3>
          </div>
          <div>
            <p>
              Hãy đăng kí trở thành đối tác của chúng tôi ngay để có cơ hội kiếm
              thêm thu nhập hằng tháng.
            </p>
          </div>
          <LinkArea>
            <LinkExtra to="">Tìm hiểu ngay</LinkExtra>
            <LinkExtra to="">Đăng ký xe</LinkExtra>
          </LinkArea>
        </section>
      </HomeExtra>
    </HomeSection>
  );
}
const HomeSection = styled.section`
  width: 100%;
  min-height: calc(100vh - 60px);
  .open {
    display: block;
    position: absolute;
    top: 50vh;
    left: 0;
    z-index: 200;
    background-color: white;
    .card-open {
      padding-top: 40px;
      min-height: 100vh;
      width: 70%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      ion-icon {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 40px;
        right: 22vw;
        cursor: pointer;
      }
    }
  }
  .close {
    display: none;
  }
`;
const HomeSectionTop = styled.section`
  width: 100%;
  margin-bottom: 100px;
  .img_first {
    background-position: 50% 50%;
    background-size: cover;
    border-radius: 16px;
    line-height: 24px;
    padding: 80px 0px;
    background-image: url("https://www.mioto.vn/static/media/bg-landingpage-1.f91d3a0d.png");
    position: relative;
    height: 720px;
    width: 100%;
    z-index: 1;
    display: flex;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    border-radius: 16px;
  }
  .container_search {
    position: absolute;
    bottom: -50px;
    z-index: 10;
    height: 186px;
    color: red;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .name {
    }
    .search {
      box-sizing: border-box;
      width: 90%;
      box-shadow: 0px 3px 8px rgb(100, 100, 100);
      background-color: #ffffff;
      border-radius: 16px;
      display: flex;
      height: 136px;
      margin: 0px 16px;
      padding: 25px;
      .search-item {
        display: flex;
        flex-direction: column;
        width: 40%;
        box-sizing: border-box;
      }
      .title {
        display: flex;
        height: 25px;
        margin-bottom: 5px;
        line-height: 25px;
        align-items: center;
        gap: 5px;
      }
      .input {
        height: 56px;
      }
      .search-item:nth-child(2) {
        display: flex;
        flex-direction: column;
        width: 30%;
        box-sizing: border-box;
      }
      .search-item:nth-child(3) {
        display: flex;
        flex-direction: column;
        width: 30%;
        box-sizing: border-box;
      }
    }
  }
`;
const Title = styled.h1`
  color: #4b4d52;
  font-size: 36px;
  text-align: center;
  font-weight: 700;
  line-height: 50px;
  margin: 0 0 20px;
`;
const SearchSection = styled.section`
  border-radius: 5px;
  padding: 25px;
  background-color: rgba(0, 0, 0, 0.35);
  width: 100%;
  height: 60%;
  display: flex;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
`;
const SearchLeft = styled.section`
  width: 30%;
  height: 100%;

  .van {
    border-right: 2px solid white;
    padding: 10px;
    border-radius: 5px 0 0 5px;
    background-color: rgba(0, 0, 0, 0.7);
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    ion-icon {
      padding: 20px;
      background-color: green;
      border-radius: 10px;
    }
    p {
      font-size: 18px;
      font-weight: 700;
      color: white;
    }
  }
`;
const SearchRight = styled.section`
  * {
    box-sizing: border-box;
  }
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
  width: 70%;
  .form {
    height: 100%;
    padding: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .button-search {
      padding: 0.5rem 0.5rem;
      cursor: pointer;
    }
  }
  .form-group {
    margin-bottom: 0.5em;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .form-content {
    display: flex;
    width: 100%;
    align-items: center;
    ${"" /* line-height: 1.5rem; */}
    ion-icon {
      color: green;
      font-weight: bold;
    }
    input {
      width: 100%;
      font-size: 1rem;
      border-top-style: hidden;
      border-right-style: hidden;
      border-left-style: hidden;
      border-bottom-style: groove;
      background-color: inherit;
      color: white;
      ::placeholder {
        color: white;
      }
    }
  }
  .label-content {
    color: green;
    font-weight: bold;
  }
`;
const ContainerTop = styled.section`
  width: 50vw;
`;
const HomeSectionBottom = styled.section`
  box-sizing: border-box;
  padding: 2rem;
  min-height: 40vh;
  width: 100%;

  h3 {
    color: black;
    margin-bottom: 1.4rem;
    font-weight: 800;
    font-size: 18px;
    text-transform: uppercase;
  }
  .cover_carousel {
    width: 100%;
    height: 200px;
    margin: 0 auto;
    position: relative;
  }

  .carousel {
    text-align: center;
    padding: 1rem;
    border-radius: 10px;
    cursor: pointer;
  }

  .carousel p {
    margin-top: 2rem;
    padding: 1rem;
    font-size: medium;
    position: relative;
    font-weight: bolder;
  }

  .carousel span {
    color: var(--yellwo-color);
  }

  .carousel h1 {
    color: var(--yellwo-color);
  }

  .carousel_1 {
    width: 100%;
    height: 200px;
    color: white;
    position: relative;
  }

  .carousel_1::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: url("https://n1-cstg.mioto.vn/g/2023/02/01/09/H4831UA7.jpg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    border-radius: 20px;
  }

  .carousel_1 > * {
    z-index: 100;
  }

  .carousel_1::after {
    z-index: -1;
  }

  .carousel_2 {
    width: 100%;
    height: 200px;
    color: white;
    position: relative;
  }

  .carousel_2::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: url("https://n1-cstg.mioto.vn/g/2023/02/08/15/3YFZLZRC.jpg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 20px;
  }

  .carousel_2 > * {
    z-index: 100;
  }

  .carousel_2::after {
    z-index: -1;
  }

  .carousel_3 {
    max-width: 100%;
    height: 200px;
    color: white;
    position: relative;
  }

  .carousel_3::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: url("https://n1-cstg.mioto.vn/g/2023/02/02/01/3GWTMTCV.jpg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 20px;
  }

  .carousel_3 > * {
    z-index: 100;
  }

  .carousel_3::after {
    z-index: -1;
  }
`;
const HomeGuide = styled.section`
  position: relative;
  background-clip: content-box;
  min-height: 30vh;
  margin-top: 20px;
  text-align: center;
  h1 {
    margin: 0 auto;
    width: 30%;
    border-bottom: 2px solid black;
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
  }
  .card-box_wrap {
    height: 50%;
    background-image: linear-gradient(to bottom, white, #e5f6ea);
    display: flex;
    flex-wrap: wrap;
    weight: 100%;
    justify-content: center;
    gap: 20px;
    padding: 20px;

    .card-box_item {
      padding: 10px;

      img {
        width: 50%;
        height: auto;
      }
    }
  }
`;
const Titleh3 = styled.h3`
  color: black;
  margin-bottom: 1.4rem;
  font-weight: 800;
  font-size: 18px;
  text-transform: uppercase;
`;
const HomeDestination = styled.section`
  margin-top: 20px;
  padding: 2rem;

  .destinationcard-wrap {
    width: 100%;
    min-height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    .image {
      display: inline-block;
      text-align: center;
      width: 30%;
      float: left;
      border-radius: 20px;
      padding: 0.5rem;
      border: 1px solid black;
    }
    figure {
      overflow: hidden;
      margin: 0 10px;
      border-radius: 20px;
    }
    h3 {
      color: #000;
      margin-top: 40px;
    }
    p {
      padding: 0 10px 10px;
    }
    .image img {
      display: block;
      width: 100%;
      height: 222px;
      cursor: pointer;
      border-radius: 20px;
      object-fit: cover;
      object-position: center;
    }
    .image #zoom-In figure img {
      transform: scale(1);
      transition: 0.3s ease-in-out;
    }
    .image #zoom-In figure:hover img {
      transform: scale(1.5);
    }
  }
`;
const HomeExtra = styled.section`
  width: 100%;
  min-height: 100vh;
  background: url("https://images.unsplash.com/photo-1496147433903-1e62fdb6f4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=821&q=80");
  background-position: center;
  background-size: cover;
  .bao1 {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    padding-left: 50px;
    color: white;
    .TitleExtra {
      font-size: 40px;
      font-weight: 700;
      line-height: 50px;
    }
    p {
      font-size: 18px;
      line-height: 27px;
    }
  }
`;
const LinkArea = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
`;
const LinkExtra = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0px 20px;
  font-weight: bold;
  line-height: 46px;
  text-transform: uppercase;
  border-radius: 0.2em;
  border: 1px solid white;
  &:nth-child(1) {
    &:hover {
      background-color: green;
    }
  }
  &:nth-child(2) {
    background-color: green;
    &:hover {
      background-color: rgba(0, 255, 0, 0.1);
    }
  }
`;
export default Home;
