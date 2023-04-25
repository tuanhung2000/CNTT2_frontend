import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
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
  console.log(role);
  return (
    <SignupComponent>
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid xs={12} sm={6} item>
              <TextField
                label="Tên"
                placeholder="Nhập tên của bạn"
                variant="outlined"
                fullWidth
                value={firstName}
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
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                label="Email"
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
            <Grid xs={12} sm={12} item>
              <InputLabel id="demo-simple-select-label">
                Chọn vai trò của bạn
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Chọn mục đích của bạn"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <MenuItem value={"customer"}>Người thuê xe</MenuItem>
                <MenuItem value={"owner"}>Người cho thuê</MenuItem>
              </Select>
            </Grid>
          </Grid>
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
`;

export default Signup;
