import { Button, Card, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { Rate } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/color";
import { useNavigate } from "react-router-dom";
function Cars() {
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(true);
  const [star, setStar] = React.useState();
  const [rateScore, setRateScore] = useState(3);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <CarsComponent>
      <Grid container>
        <Grid item xs={2} md={2} style={{ paddingRight: "20px" }}>
          <Grid
            item
            xs={12}
            md={12}
            style={{
              borderTop: "1px solid gray",
            }}
          >
            <h4>Loại xe</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Honda"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Mescedes"
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            style={{
              borderTop: "1px solid gray",
            }}
          >
            <h4>Số chỗ ngồi</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="1 ghế"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="2 ghế"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="3 ghế"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="4 ghế"
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            style={{
              borderTop: "1px solid gray",
            }}
          >
            <h4>Đánh giá</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                cursor: "pointer",
                gap: "5px",
                marginTop: "5px",
              }}
            >
              <Rate onChange={setRateScore} value={rateScore} />
            </div>
          </Grid>
        </Grid>
        <Grid
          item
          xs={10}
          md={10}
          style={{
            minHeight: "calc(100vh - 200px)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Card style={{ backgroundColor: "ButtonFace", padding: "10px" }}>
            <Grid
              container
              style={{ paddingBottom: "10px", borderBottom: "1px solid white" }}
            >
              <Grid item xs={4} md={4}>
                <img
                  alt=""
                  height={200}
                  style={{ objectFit: "cover", width: "100%" }}
                  src="https://images.unsplash.com/photo-1541348263662-e068662d82af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXVkaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                />
              </Grid>
              <Grid item xs={8} md={8} style={{ padding: "10px 20px" }}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: "30px" }}>
                    Audi{" "}
                    <span style={{ fontSize: "14px", color: "GrayText" }}>
                      DangDuy
                    </span>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>
                      <ion-icon
                        name="person-outline"
                        style={{ display: "block" }}
                      ></ion-icon>
                    </span>
                    <span>1 ghế</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>
                      <ion-icon
                        name="logo-windows"
                        style={{ display: "block" }}
                      ></ion-icon>
                    </span>
                    <span>4 cửa</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>
                      <ion-icon
                        name="snow-outline"
                        style={{ display: "block" }}
                      ></ion-icon>
                    </span>
                    <span>Có điều hòa</span>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>Tài xế:</span>
                    <span>Có</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>Tự lái:</span>
                    <span>Không</span>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              style={{ paddingBottom: "10px", borderBottom: "1px solid white" }}
            >
              <Grid item xs={4} md={4}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <ion-icon
                    name="battery-half"
                    style={{ fontSize: "2em" }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p>Tình trạng xe</p>
                    <p>2 năm</p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <ion-icon
                    name="compass"
                    style={{ fontSize: "2em" }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p>Khu vực</p>
                    <p>Hồ Chí Minh</p>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={4} md={4}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <ion-icon
                    name="checkmark"
                    style={{ fontSize: "1em", color: COLORS.main }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p>Hỗ trợ giao xe tận nơi</p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <ion-icon
                    name="checkmark"
                    style={{ fontSize: "1em", color: COLORS.main }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p>Có thể thuê tài xế</p>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={4} md={4}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                    backgroundColor: "#e2ffd0",
                  }}
                >
                  <ion-icon
                    name="checkmark"
                    style={{ fontSize: "1em", color: COLORS.main }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ color: COLORS.main }}>Làm thủ tục trực tuyến</p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                    backgroundColor: "#e2ffd0",
                  }}
                >
                  <ion-icon
                    name="checkmark"
                    style={{ fontSize: "1em", color: COLORS.main }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ color: COLORS.main, fontWeight: "bold" }}>
                      Hủy miễn phí
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",

                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "5px",
                    padding: "10px 0",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      color: "white",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: COLORS.main,
                      fontWeight: "bold",
                      marginLeft: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    5/10
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Rất tốt</span>
                    <span style={{ fontSize: "14px" }}>100 đánh giá</span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ color: "GrayText", fontSize: "15px" }}>
                      Giá trong vòng 7 ngày
                    </p>
                    <p style={{ fontWeight: "bold", fontSize: "20px" }}>$500</p>
                  </div>
                  <Button
                    className="btn_view"
                    onClick={() => {
                      navigate("/listcars/id");
                      window.scrollTo(0, 0);
                    }}
                  >
                    Chi tiết
                  </Button>
                </div>
              </div>
            </Grid>
          </Card>
          <Card style={{ backgroundColor: "ButtonFace", padding: "10px" }}>
            <Grid
              container
              style={{ paddingBottom: "10px", borderBottom: "1px solid white" }}
            >
              <Grid item xs={4} md={4}>
                <img
                  alt=""
                  height={200}
                  style={{ objectFit: "cover", width: "100%" }}
                  src="https://images.unsplash.com/photo-1541348263662-e068662d82af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXVkaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                />
              </Grid>
              <Grid item xs={8} md={8} style={{ padding: "10px 20px" }}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: "30px" }}>
                    Audi{" "}
                    <span style={{ fontSize: "14px", color: "GrayText" }}>
                      DangDuy
                    </span>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>
                      <ion-icon
                        name="person-outline"
                        style={{ display: "block" }}
                      ></ion-icon>
                    </span>
                    <span>1 ghế</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>
                      <ion-icon
                        name="logo-windows"
                        style={{ display: "block" }}
                      ></ion-icon>
                    </span>
                    <span>4 cửa</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>
                      <ion-icon
                        name="snow-outline"
                        style={{ display: "block" }}
                      ></ion-icon>
                    </span>
                    <span>Có điều hòa</span>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>Tài xế:</span>
                    <span>Có</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>Tự lái:</span>
                    <span>Không</span>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              style={{ paddingBottom: "10px", borderBottom: "1px solid white" }}
            >
              <Grid item xs={4} md={4}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <ion-icon
                    name="battery-half"
                    style={{ fontSize: "2em" }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p>Tình trạng xe</p>
                    <p>2 năm</p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <ion-icon
                    name="compass"
                    style={{ fontSize: "2em" }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p>Khu vực</p>
                    <p>Hồ Chí Minh</p>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={4} md={4}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <ion-icon
                    name="checkmark"
                    style={{ fontSize: "1em", color: COLORS.main }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p>Hỗ trợ giao xe tận nơi</p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <ion-icon
                    name="checkmark"
                    style={{ fontSize: "1em", color: COLORS.main }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p>Có thể thuê tài xế</p>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={4} md={4}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                    backgroundColor: "#e2ffd0",
                  }}
                >
                  <ion-icon
                    name="checkmark"
                    style={{ fontSize: "1em", color: COLORS.main }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ color: COLORS.main }}>Làm thủ tục trực tuyến</p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                    backgroundColor: "#e2ffd0",
                  }}
                >
                  <ion-icon
                    name="checkmark"
                    style={{ fontSize: "1em", color: COLORS.main }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ color: COLORS.main, fontWeight: "bold" }}>
                      Hủy miễn phí
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",

                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "5px",
                    padding: "10px 0",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      color: "white",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: COLORS.main,
                      fontWeight: "bold",
                      marginLeft: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    5/10
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Rất tốt</span>
                    <span style={{ fontSize: "14px" }}>100 đánh giá</span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ color: "GrayText", fontSize: "15px" }}>
                      Giá trong vòng 7 ngày
                    </p>
                    <p style={{ fontWeight: "bold", fontSize: "20px" }}>$500</p>
                  </div>
                  <Button
                    className="btn_view"
                    onClick={() => {
                      navigate("/listcars/id");
                      window.scrollTo(0, 0);
                    }}
                  >
                    Chi tiết
                  </Button>
                </div>
              </div>
            </Grid>
          </Card>
          <Card style={{ backgroundColor: "ButtonFace", padding: "10px" }}>
            <Grid
              container
              style={{ paddingBottom: "10px", borderBottom: "1px solid white" }}
            >
              <Grid item xs={4} md={4}>
                <img
                  alt=""
                  height={200}
                  style={{ objectFit: "cover", width: "100%" }}
                  src="https://images.unsplash.com/photo-1541348263662-e068662d82af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXVkaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                />
              </Grid>
              <Grid item xs={8} md={8} style={{ padding: "10px 20px" }}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: "30px" }}>
                    Audi{" "}
                    <span style={{ fontSize: "14px", color: "GrayText" }}>
                      DangDuy
                    </span>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>
                      <ion-icon
                        name="person-outline"
                        style={{ display: "block" }}
                      ></ion-icon>
                    </span>
                    <span>1 ghế</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>
                      <ion-icon
                        name="logo-windows"
                        style={{ display: "block" }}
                      ></ion-icon>
                    </span>
                    <span>4 cửa</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>
                      <ion-icon
                        name="snow-outline"
                        style={{ display: "block" }}
                      ></ion-icon>
                    </span>
                    <span>Có điều hòa</span>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>Tài xế:</span>
                    <span>Có</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>Tự lái:</span>
                    <span>Không</span>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              style={{ paddingBottom: "10px", borderBottom: "1px solid white" }}
            >
              <Grid item xs={4} md={4}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <ion-icon
                    name="battery-half"
                    style={{ fontSize: "2em" }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p>Tình trạng xe</p>
                    <p>2 năm</p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <ion-icon
                    name="compass"
                    style={{ fontSize: "2em" }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p>Khu vực</p>
                    <p>Hồ Chí Minh</p>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={4} md={4}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <ion-icon
                    name="checkmark"
                    style={{ fontSize: "1em", color: COLORS.main }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p>Hỗ trợ giao xe tận nơi</p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <ion-icon
                    name="checkmark"
                    style={{ fontSize: "1em", color: COLORS.main }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p>Có thể thuê tài xế</p>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={4} md={4}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                    backgroundColor: "#e2ffd0",
                  }}
                >
                  <ion-icon
                    name="checkmark"
                    style={{ fontSize: "1em", color: COLORS.main }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ color: COLORS.main }}>Làm thủ tục trực tuyến</p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    padding: "10px",
                    backgroundColor: "#e2ffd0",
                  }}
                >
                  <ion-icon
                    name="checkmark"
                    style={{ fontSize: "1em", color: COLORS.main }}
                  ></ion-icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ color: COLORS.main, fontWeight: "bold" }}>
                      Hủy miễn phí
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",

                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "5px",
                    padding: "10px 0",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      color: "white",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: COLORS.main,
                      fontWeight: "bold",
                      marginLeft: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    5/10
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Rất tốt</span>
                    <span style={{ fontSize: "14px" }}>100 đánh giá</span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ color: "GrayText", fontSize: "15px" }}>
                      Giá trong vòng 7 ngày
                    </p>
                    <p style={{ fontWeight: "bold", fontSize: "20px" }}>$500</p>
                  </div>
                  <Button
                    className="btn_view"
                    onClick={() => {
                      navigate("/listcars/id");
                      window.scrollTo(0, 0);
                    }}
                  >
                    Chi tiết
                  </Button>
                </div>
              </div>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </CarsComponent>
  );
}
const CarsComponent = styled.section`
  min-height: calc(100vh - 160px);
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  .star {
    width: 40px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
  }
  .btn_view {
    background-color: #00a550;
    color: white;
    padding: 10px 20px;
    font-weight: bold;
    border: 1px solid ${COLORS.main};
  }
  .btn_view:hover {
    background-color: white;
    border: 1px solid ${COLORS.main};
    color: #00a550;
  }
`;
export default Cars;
