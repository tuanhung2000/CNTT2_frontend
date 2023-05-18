import { Card, Grid } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";

import StepLabel from "@mui/material/StepLabel";
import { red } from "@mui/material/colors";
function Payment() {
  const [activeStep, setActiveStep] = useState(2);
  return (
    <PaymentContainer>
      <Card
        style={{
          minHeight: "calc(100vh - 100px)",
          backgroundColor: "ButtonFace",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <div>
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel
                StepIconProps={{
                  sx: {
                    "&.Mui-completed": {
                      background: "white",
                      borderRadius: "24px",
                      fill: "#00a550",
                    },
                  },
                }}
              >
                Chọn xe
              </StepLabel>
            </Step>
            <Step>
              <StepLabel
                StepIconProps={{
                  sx: {
                    "&.Mui-completed": {
                      background: "white",
                      borderRadius: "24px",
                      fill: "#00a550",
                    },
                  },
                }}
              >
                Nhập thông tin
              </StepLabel>
            </Step>
            <Step>
              <StepLabel
                StepIconProps={{
                  sx: {
                    "&.Mui-completed": {
                      background: "white",
                      borderRadius: "24px",
                      fill: "#00a550",
                    },
                    "&.Mui-active": {
                      background: "white",
                      borderRadius: "24px",
                      fill: "#00a550",
                    },
                  },
                }}
              >
                Kiểm tra thông tin
              </StepLabel>
            </Step>
            <Step>
              <StepLabel
                StepIconProps={{
                  sx: {
                    "&.Mui-completed": {
                      background: "white",
                      borderRadius: "24px",
                      fill: "#00a550",
                    },
                    "&.Mui-active": {
                      background: "white",
                      borderRadius: "24px",
                      fill: "#00a550",
                    },
                  },
                }}
              >
                Thanh toán
              </StepLabel>
            </Step>
          </Stepper>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid container>
            <Grid item xs={12} md={12}>
              <Grid
                container
                style={{ display: "flex", boxSizing: "border-box" }}
              >
                <Grid
                  item
                  xs={3}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  <label>Tên</label>
                  <input className="input"></input>
                </Grid>
                <Grid
                  item
                  xs={3}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  <label>Họ</label>
                  <input className="input"></input>
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  <label>Số điện thoại</label>
                  <input className="input"></input>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid
                container
                style={{ display: "flex", boxSizing: "border-box" }}
              >
                <Grid
                  item
                  xs={3}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  <label>Tên xe</label>
                  <input className="input"></input>
                </Grid>
                <Grid
                  item
                  xs={3}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  <label>Loại xe</label>
                  <input className="input"></input>
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  <label>Biển số xe</label>
                  <input className="input"></input>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid
                container
                style={{ display: "flex", boxSizing: "border-box" }}
              >
                <Grid
                  item
                  xs={3}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  <label>Giá giờ thuê</label>
                  <input className="input"></input>
                </Grid>
                <Grid
                  item
                  xs={3}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  <label>Số giờ thuê</label>
                  <input className="input"></input>
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  <label>Tổng chi phí</label>
                  <input className="input"></input>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid
                container
                style={{ display: "flex", boxSizing: "border-box" }}
              >
                <Grid
                  item
                  xs={6}
                  md={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  <label>Ngày bắt đầu</label>
                  <input className="input"></input>
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  <label>Ngày kết thúc</label>
                  <input className="input"></input>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid
                container
                style={{ display: "flex", boxSizing: "border-box" }}
              >
                <Grid
                  item
                  xs={12}
                  md={4}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  <label>Tỉnh</label>
                  <input className="input"></input>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  <label>Quận/Huyện</label>
                  <input className="input"></input>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  <label>Phường/Xã/Thị trấn</label>
                  <input className="input"></input>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              style={{
                padding: "10px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {activeStep === 3 ? (
                <button
                  className="btn_continute"
                  onClick={() => {
                    alert("Đã gửi yêu cầu");
                  }}
                >
                  Thuê xe
                </button>
              ) : (
                <button
                  className="btn_continute"
                  onClick={() => {
                    setActiveStep(3);
                  }}
                >
                  Tiếp tục
                </button>
              )}
            </Grid>
          </Grid>
        </div>
      </Card>
    </PaymentContainer>
  );
}
const PaymentContainer = styled.section`
  min-height: calc(100vh - 60px);
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .input {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    outline: none;
    border: none;
    cursor: pointer;
  }
  .input:focus {
    outline: 0.5px solid black;
  }

  .btn_continute {
    padding: 10px 20px;
    background-color: #00a550;
    border: 1px solid #00a550;
    outline: none;
    cursor: pointer;
    border-radius: 5px;
    color: white;
    font-weight: bold;
  }
  .btn_continute:hover {
    background-color: white;
    color: #00a550;
  }
`;
export default Payment;
