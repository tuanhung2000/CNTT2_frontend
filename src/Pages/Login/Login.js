import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { COLORS } from "../../assets/color";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
function Login() {
  const onSubmit = async (values) => {
    const { password, userName } = values;
    console.log(values);
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      userName: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Bắt buộc"),
      password: Yup.string().required("Bắt buộc"),
    }),
    onSubmit,
  });
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   Swal.fire({
  //     title: "Thành công!",
  //     text: "Bạn đăng nhập thành công!",
  //     icon: "success",
  //     confirmButtonColor: `${COLORS.main}`,
  //     confirmButtonText: "Tiếp tục",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       navigate("/");
  //     }
  //   });
  // };
  return (
    <LoginComponent>
      <Card
        style={{
          minHeight: "80vh",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "10px 5px",
          boxSizing: "border-box",
        }}
      >
        <CardContent style={{ height: "80vh", width: "100%" }}>
          <Grid container style={{ height: "100%", width: "100%" }}>
            <Grid
              item
              xs={6}
              md={6}
              className="bao1"
              style={{
                padding: "5px 10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
                borderRadius: "5px",
              }}
            ></Grid>
            <Grid
              item
              xs={6}
              md={6}
              style={{
                padding: "5px 10px 5px 31px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1 style={{ marginBottom: "20px", color: COLORS.main }}>
                Đăng nhập
              </h1>
              <p style={{ marginBottom: "20px", color: "GrayText" }}>
                Chào mừng đến với HVcar
              </p>
              <form autoComplete="off" onSubmit={formik.handleSubmit}>
                <Grid container spacing={1}>
                  <Grid xs={12} sm={12} item>
                    <TextField
                      name="userName"
                      label="Tên đăng nhập"
                      InputLabelProps={{ style: { color: `${COLORS.main}` } }}
                      placeholder="Nhập tên đăng nhập của bạn"
                      variant="outlined"
                      fullWidth
                      value={formik.values.userName}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.userName && formik.touched.userName ? (
                      <span className="error">{formik.errors.userName}*</span>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid xs={12} sm={12} item>
                    <TextField
                      name="password"
                      label="Mật khẩu"
                      InputLabelProps={{ style: { color: `${COLORS.main}` } }}
                      placeholder="Nhập mật khẩu của bạn"
                      variant="outlined"
                      fullWidth
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <span className="error">{formik.errors.password}*</span>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid xs={12} sm={12} item>
                    <Button
                      className="btn_signup"
                      type="submit"
                      variant="contained"
                      fullWidth
                    >
                      Đăng nhập
                    </Button>
                  </Grid>
                  <Grid xs={12} sm={12} item style={{ textAlign: "right" }}>
                    <p>
                      Bạn chưa có tài khoản?{" "}
                      <Link
                        to="/signup"
                        style={{
                          textDecoration: "none",
                          color: "black",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        Đăng ký
                      </Link>
                    </p>
                  </Grid>
                  <Grid xs={12} sm={12} item style={{ textAlign: "right" }}>
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Quên mật khẩu
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
          {/* <form onSubmit={handleSubmit}>
          </form> */}
        </CardContent>
      </Card>
    </LoginComponent>
  );
}

const LoginComponent = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .bao1 {
    background-position: center;
    background-size: cover;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url("https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YXVkaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60");
  }
  .btn_signup {
    background-color: ${COLORS.main};
  }
  .btn_signup:hover {
    background-color: white;
    color: ${COLORS.main};
  }
  .swal-button {
    padding: 7px 19px;
    border-radius: 2px;
    background-color: red;
    font-size: 12px;
    border: 1px solid #3e549a;
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.3);
  }
  .error {
    color: red;
    font-size: 12px;
  }
`;
export default Login;
