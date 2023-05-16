import { Card, CardMedia, Grid, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
const listPan = [
  { name: "Có", value: true },
  { name: "Không", value: false },
];
const listChairs = [1, 2, 3, 4, 5];
const listDoor = [1, 2, 3, 4];
const listSeftDrive = [
  { name: "Có", value: true },
  { name: "Không", value: false },
];
function PostCar() {
  const [pan, setPan] = useState("");
  const [chair, setChair] = useState("");
  const [door, setDoor] = useState("");
  const [selfDr, setSelfDr] = useState("");
  console.log(pan);
  return (
    <PostContainer>
      <Card style={{ backgroundColor: "#f0f0f0" }}>
        <Grid container>
          <Grid item xs={4} md={4}>
            <CardMedia
              component="img"
              height="400"
              image="https://plus.unsplash.com/premium_photo-1683880731495-ae0f4bf18c7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
              alt="Paella dish"
            />
          </Grid>
          <Grid
            item
            xs={8}
            md={8}
            style={{
              boxSizing: "border-box",
              padding: "0 20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Grid container style={{}}>
              <Grid
                item
                xs={6}
                md={6}
                style={{ boxSizing: "border-box", padding: "20px" }}
              >
                <Grid
                  container
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    md={12}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <label className="text-color">Tên xe</label>
                    <input
                      style={{
                        width: "100%",
                        display: "block",
                        outline: "none",
                        border: "none",
                        boxSizing: "border-box",
                        padding: "5px",
                      }}
                    ></input>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <label className="text-color">Điều hòa</label>
                    <Select
                      name="pan"
                      displayEmpty
                      labelId="demo-simple-select-label"
                      id="pan"
                      value={pan}
                      style={{ height: "40px", width: "100%" }}
                      onChange={(e) => setPan(e.target.value)}
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
                      <MenuItem value="">Điều hòa</MenuItem>
                      {listPan.map((item, index) => (
                        <MenuItem value={item.value} key={index}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <label className="text-color">Số cửa</label>
                    <Select
                      name="door"
                      displayEmpty
                      labelId="demo-simple-select-label"
                      id="door"
                      value={door}
                      style={{ height: "40px", width: "100%" }}
                      onChange={(e) => setDoor(e.target.value)}
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
                      <MenuItem value="">Số lượng</MenuItem>
                      {listDoor.map((item, index) => (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={6}
                md={6}
                style={{ boxSizing: "border-box", padding: "20px" }}
              >
                <Grid
                  container
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    md={12}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <label className="text-color">Chủ xe</label>
                    <input
                      style={{
                        width: "100%",
                        display: "block",
                        outline: "none",
                        border: "none",
                        boxSizing: "border-box",
                        padding: "5px",
                      }}
                    ></input>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <label className="text-color">Số ghế</label>
                    <Select
                      name="chair"
                      displayEmpty
                      labelId="demo-simple-select-label"
                      id="chair"
                      value={chair}
                      style={{ height: "40px", width: "100%" }}
                      onChange={(e) => setChair(e.target.value)}
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
                      <MenuItem value="">Số lượng</MenuItem>
                      {listChairs.map((item, index) => (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <label className="text-color">Có tài xế</label>
                    <Select
                      name="self"
                      displayEmpty
                      labelId="demo-simple-select-label"
                      id="self"
                      value={selfDr}
                      style={{ height: "40px", width: "100%" }}
                      onChange={(e) => setSelfDr(e.target.value)}
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
                      <MenuItem value="">Chọn</MenuItem>
                      {listSeftDrive.map((item, index) => (
                        <MenuItem value={item.value} key={index}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                xs={12}
                md={12}
                style={{ padding: "0 20px", boxSizing: "border-box" }}
              >
                <label>Mô tả </label>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </PostContainer>
  );
}

const PostContainer = styled.section`
  min-height: calc(100vh - 160px);
  width: 100%;
  padding: 20px;
  .text-color {
    font-weight: 500;
    cursor: pointer;
  }
`;
export default PostCar;
