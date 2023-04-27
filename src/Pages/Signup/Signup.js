import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { COLORS } from "../../assets/color";
import Swal from "sweetalert2";
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
function Signup() {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [address, setAddress] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [userName, setUserName] = useState("");
  // const [role, setRole] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber,
      userName,
      role,
    } = values;
    console.log(values);
    Swal.fire({
      title: "Thành công!",
      text: "Bạn đăng ký thành công!",
      icon: "success",
      confirmButtonColor: `${COLORS.main}`,
      confirmButtonText: "Tiếp tục",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      phoneNumber: "",
      userName: "",
      role: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Bắt buộc"),
      lastName: Yup.string().required("Bắt buộc"),
      email: Yup.string()
        .required("Bắt buộc")
        .matches(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Email không hợp lệ"
        ),
      password: Yup.string()
        .required("Bắt buộc")
        .matches(
          /^[A-Za-z]\w{7,14}$/,
          "Mật khẩu phải từ 7 đến 15 ký tự, chứa ký tự, số, dấu gạch dưới và ký tự đầu tiên phải là chữ"
        ),
      address: Yup.string().required("Bắt buộc"),
      phoneNumber: Yup.string().required("Bắt buộc"),
      userName: Yup.string().required("Bắt buộc"),
      role: Yup.string().required("Bắt buộc"),
    }),
    onSubmit,
  });

  return (
    <SignupComponent>
      <Card
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "10px 5px",
          boxSizing: "border-box",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" style={{ fontWeight: "bold" }}>
            Đăng ký
          </Typography>
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid
                item
                xs={4}
                md={4}
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
              >
                <h1 style={{ textAlign: "center", color: "white" }}>
                  Bắt đầu cuộc hành trình của bạn
                </h1>
                <p style={{ color: "white" }}>
                  Hãy để chúng tôi giúp bạn có những gợi ý tốt nhất trước khi
                  khởi hành!
                </p>
              </Grid>
              <Grid item xs={8} md={8} style={{ padding: "5px 5px 5px 26px" }}>
                <Grid container spacing={1}>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      name="firstName"
                      label="Tên"
                      InputLabelProps={{ style: { color: `${COLORS.main}` } }}
                      placeholder="Nhập tên của bạn"
                      variant="outlined"
                      fullWidth
                      value={formik.values.firstName}
                      // onChange={(e) => {
                      //   setFirstName(e.target.value);
                      // }}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.firstName && formik.touched.firstName ? (
                      <span className="error">{formik.errors.firstName}*</span>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      name="lastName"
                      label="Họ"
                      InputLabelProps={{ style: { color: `${COLORS.main}` } }}
                      placeholder="Nhập họ của bạn"
                      variant="outlined"
                      fullWidth
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.lastName && formik.touched.lastName ? (
                      <span className="error">{formik.errors.lastName}*</span>
                    ) : (
                      <></>
                    )}
                  </Grid>
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
                      name="email"
                      label="Email"
                      InputLabelProps={{ style: { color: `${COLORS.main}` } }}
                      placeholder="Nhập email của bạn"
                      variant="outlined"
                      fullWidth
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <span className="error">{formik.errors.email}*</span>
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
                    <TextField
                      name="address"
                      label="Địa chỉ"
                      InputLabelProps={{ style: { color: `${COLORS.main}` } }}
                      placeholder="Nhập địa chỉ của bạn"
                      variant="outlined"
                      fullWidth
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.address && formik.touched.address ? (
                      <span className="error">{formik.errors.address}*</span>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid xs={12} sm={12} item>
                    <TextField
                      name="phoneNumber"
                      InputLabelProps={{ style: { color: `${COLORS.main}` } }}
                      label="Số điện thoại"
                      placeholder="Nhập số điện thoại của bạn"
                      variant="outlined"
                      fullWidth
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
                      <span className="error">
                        {formik.errors.phoneNumber}*
                      </span>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid xs={12} sm={12} item style={{ marginBottom: "10px" }}>
                    <InputLabel
                      id="demo-simple-select-label"
                      style={{ color: `${COLORS.main}` }}
                    >
                      Chọn vai trò của bạn
                    </InputLabel>
                    <Select
                      name="role"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value={"customer"}>Người thuê xe</MenuItem>
                      <MenuItem value={"owner"}>Người cho thuê</MenuItem>
                    </Select>
                    {formik.errors.role && formik.touched.role ? (
                      <span className="error">{formik.errors.role}*</span>
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
                      Đăng ký
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </SignupComponent>
  );
}
const SignupComponent = styled.section`
  ${
    "" /* min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center; */
  }
  .bao1 {
    background-color: ${COLORS.main}; /* background-position: center;
    background-size: cover;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url("https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YXVkaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"); */
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

export default Signup;
