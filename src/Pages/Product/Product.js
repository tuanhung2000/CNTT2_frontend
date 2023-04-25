import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
function Product() {
  const [user, setUser] = useState(true);
  return (
    <ProductComponent>
      {user ? (
        <>
          <section className="productTop">
            <div className="productTop-left">
              <h2 style={{ fontWeight: "800", fontSize: "40px", width: "50%" }}>
                Cho thuê xe trên Mioto để gia tăng thu nhập đến 10tr/tháng !
              </h2>
              <p>Hotline: 1900 9217 (T2-T7 9AM-9PM)</p>
              <p>
                Mioto không thu phí khi bạn đăng xe. Bạn chỉ chia sẻ phí dịch vụ
                với Mioto khi có giao dịch cho thuê thành công.
              </p>
            </div>
            <div className="productTop-right">
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  boxSizing: "border-box",
                  padding: "5px",
                  gap: "20px",
                }}
              >
                <h3
                  style={{
                    textAlign: "center",
                    color: "#00a550",
                    letterSpacing: "2px",
                  }}
                >
                  Đăng ký cho thuê xe
                </h3>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "yellow",
                    height: "100%",
                  }}
                >
                  <input
                    placeholder="Nơi bạn muốn cho thuê xe"
                    className="input-group"
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "yellow",
                    height: "100%",
                  }}
                >
                  <input
                    placeholder="Nhập tên của bạn"
                    className="input-group"
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "yellow",
                    height: "100%",
                  }}
                >
                  <input placeholder="Số điện thoại" className="input-group" />
                </div>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "yellow",
                    height: "100%",
                  }}
                >
                  <input placeholder="Xe cho thuê" className="input-group" />
                </div>
                <div
                  style={{
                    width: "100%",

                    height: "100%",
                  }}
                >
                  <button className="button">Gửi đến thông tin</button>
                </div>
              </form>
            </div>
          </section>
          <section className="productMid">
            <div className="row">
              {/* <div className="col">
                <h1>Những chiếc xe hàng đầu</h1>
                <p>
                  Deserunt minim incididunt nisi ipsum nisi Lorem qui sit
                  laborum id quis do. Pariatur proident duis labore eiusmod
                  occaecat reprehenderit anim ea dolore et. Fugiat dolore
                  reprehenderit labore non adipisicing reprehenderit veniam
                </p>
                <button type="button">Đăng ký</button>
              </div> */}
              <div className="col" style={{ textAlign: "center" }}>
                <div className="card card1">
                  <h5>Audi</h5>
                  <p>hihih</p>
                </div>
                <div className="card card2">
                  <h5>BMW</h5>
                  <p>hihih</p>
                </div>
                <div className="card card3">
                  <h5>Mercedes</h5>
                  <p>hihih</p>
                </div>
                <div className="card card4">
                  <h5>Honda</h5>
                  <p>hihih</p>
                </div>
              </div>
              <div className="col">
                <h1>Những chiếc xe hàng đầu</h1>
                <p style={{ fontSize: "15px", textAlign: "right" }}>
                  Bạn đồng hành cùng bạn trên những chuyến đi
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button type="button" className="btn_signup">
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <p>Khoong phai</p>
        </>
      )}
    </ProductComponent>
  );
}
const ProductComponent = styled.section`
  min-height: 100vh;
  width: 100%;
  ${"" /* background-color: darkgray; */}
  .productTop::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0.9;
    bottom: 0;
    z-index: 1;
    background: url("https://images.unsplash.com/photo-1511994477422-b69e44bd4ea9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1079&q=80");
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;
  }
  .productTop {
    min-height: calc(100vh - (60px));
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .productTop-left {
      width: 60%;
      color: white;
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 1em;
      z-index: 2;
    }
    .productTop-right {
      width: 40%;
      background-color: #f8f9fb;
      padding: 15px 30px 10px;
      line-height: 24px;
      display: flex;
      flex-direction: column;
      z-index: 2;
      .input-group {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        boxsizing: border-box;
        padding: 10px 10px;
        display: block;
      }
      .button {
        color: white;
        width: 100%;
        height: 100%;
        display: block;
        padding: 10px 10px;
        cursor: pointer;
        background-color: #00a550;
        border: none;
        border-radius: 5px;
        font-weight: bold;
        margin-bottom: 5px;
      }
    }
  }
  .productMid {
    min-height: 100vh;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url("https://images.unsplash.com/photo-1675057852299-7ce1e5f53de3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1215&q=80");
  }
  .row {
    display: flex;
    box-sizing: border-box;
    height: 100vh;
    padding: 30px;
    gap: 30px;
    align-items: center;
    .col {
      flex-basis: 50%;
    }
    h1 {
      color: #fff;
      font-size: 80px;
      font-weight: bold;
      text-align: right;
    }
    p {
      color: #fff;
      font-size: 12px;
      line-height: 16px;
      margin-top: 20px;
    }
    button {
      width: 190px;
      color: white;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      padding: 12px 0;
      background-color: #00a550;
      border: none;
      border-radius: 20px;
      outline: none;
      transition: background-color color 2s ease-in-out;
      margin-top: 20px;
    }
    button:hover {
      background-color: white;
      color: #00a550;
    }
  }
  .card {
    width: 200px;
    height: 230px;
    display: inline-block;
    boder-radius: 10;
    padding: 15px 25px;
    box-sizing: border-box;
    cursor: pointer;
    transition: transform 0.5s;
    margin: 10px 15px;
    border-radius: 5px;
    h5 {
      font-weight: bold;
      font-size: 19px;
      color: white;
      letter-spacing: 1px;
    }
  }
  .card:hover {
    transform: translateY(-5px) !important;
  }
  .card1 {
    background-position: center;
    background-size: cover;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url("https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YXVkaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60");
  }
  .card2 {
    background-position: center;
    background-size: cover;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url("https://images.unsplash.com/photo-1601359169004-f9663c04c892?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGJtd3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60");
  }
  .card3 {
    background-position: center;
    background-size: cover;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url("https://images.unsplash.com/photo-1616790151040-47661836dd26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fG1lcmNlZGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60");
  }
  .card4 {
    background-position: center;
    background-size: cover;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url("https://images.unsplash.com/photo-1570303278489-041bd897a873?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG9uZGF8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60");
  }
  .btn_signup {
    color: red;
  }
`;
const ProductComponent2 = styled.section``;
export default Product;
