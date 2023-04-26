import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { COLORS } from "../../assets/color";
import Swal from "sweetalert2";
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  console.log(role);
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Thành công!",
      text: "Bạn đã đăng ký thành công!",
      icon: "success",
      confirmButtonColor: `${COLORS.main}`,
      confirmButtonText: "Tiếp tục",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };
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
          <form onSubmit={handleSubmit}>
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
                      label="Tên"
                      InputLabelProps={{ style: { color: `${COLORS.main}` } }}
                      placeholder="Nhập tên của bạn"
                      variant="outlined"
                      fullWidth
                      value={firstName}
                      required
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      label="Họ"
                      InputLabelProps={{ style: { color: `${COLORS.main}` } }}
                      placeholder="Nhập họ của bạn"
                      variant="outlined"
                      fullWidth
                      value={lastName}
                      required
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} item>
                    <TextField
                      label="Tên đăng nhập"
                      required
                      InputLabelProps={{ style: { color: `${COLORS.main}` } }}
                      placeholder="Nhập tên đăng nhập của bạn"
                      variant="outlined"
                      fullWidth
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} item>
                    <TextField
                      label="Email"
                      required
                      InputLabelProps={{ style: { color: `${COLORS.main}` } }}
                      placeholder="Nhập email của bạn"
                      variant="outlined"
                      fullWidth
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} item>
                    <TextField
                      label="Mật khẩu"
                      required
                      InputLabelProps={{ style: { color: `${COLORS.main}` } }}
                      placeholder="Nhập mật khẩu của bạn"
                      variant="outlined"
                      fullWidth
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} item>
                    <TextField
                      label="Địa chỉ"
                      required
                      InputLabelProps={{ style: { color: `${COLORS.main}` } }}
                      placeholder="Nhập địa chỉ của bạn"
                      variant="outlined"
                      fullWidth
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} item>
                    <TextField
                      required
                      InputLabelProps={{ style: { color: `${COLORS.main}` } }}
                      label="Số điện thoại"
                      placeholder="Nhập số điện thoại của bạn"
                      variant="outlined"
                      fullWidth
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} item style={{ marginBottom: "10px" }}>
                    <InputLabel
                      id="demo-simple-select-label"
                      required
                      style={{ color: `${COLORS.main}` }}
                    >
                      Chọn vai trò của bạn
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      required
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                    >
                      <MenuItem value={"customer"}>Người thuê xe</MenuItem>
                      <MenuItem value={"owner"}>Người cho thuê</MenuItem>
                    </Select>
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
            {/* <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField
                  label="Tên"
                  placeholder="Nhập tên của bạn"
                  variant="outlined"
                  fullWidth
                  value={firstName}
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  label="Họ"
                  placeholder="Nhập họ của bạn"
                  variant="outlined"
                  fullWidth
                  value={lastName}
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={12} sm={12} item>
                <TextField
                  label="Email"
                  required
                  placeholder="Nhập email của bạn"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={12} sm={12} item>
                <TextField
                  label="Mật khẩu"
                  required
                  placeholder="Nhập mật khẩu của bạn"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={12} sm={12} item>
                <TextField
                  label="Địa chỉ"
                  required
                  placeholder="Nhập địa chỉ của bạn"
                  variant="outlined"
                  fullWidth
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={12} sm={12} item>
                <TextField
                  required
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại của bạn"
                  variant="outlined"
                  fullWidth
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={12} sm={12} item style={{ marginBottom: "10px" }}>
                <InputLabel id="demo-simple-select-label" required>
                  Chọn vai trò của bạn
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <MenuItem value={"customer"}>Người thuê xe</MenuItem>
                  <MenuItem value={"owner"}>Người cho thuê</MenuItem>
                </Select>
              </Grid>
              <Grid xs={12} sm={12} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Đăng ký
                </Button>
              </Grid>
            </Grid> */}
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
`;

export default Signup;
