import {
  Card,
  CardMedia,
  Grid,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
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
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(
    "https://plus.unsplash.com/premium_photo-1683880731495-ae0f4bf18c7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
  );
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (desc) {
      const textarea = document.querySelector("#text_des");
      if (textarea) {
        textarea.addEventListener("keyup", (e) => {
          textarea.style.height = "50px";
          textarea.style.height = `${e.target.scrollHeight}px`;
        });
      }
    }
  }, [desc]);

  function uploadImageToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pzoe2lzh"); // replace with your Cloudinary upload preset

    return axios
      .post("https://api.cloudinary.com/v1_1/djhhzmcps/image/upload", formData)
      .then((response) => {
        setImgUrl(response.data.url);
        return response.data.url; // return the URL of the uploaded image
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  function handleFileChange(event) {
    setLoading(true);
    const selectedFile = event.target.files[0];
    uploadImageToCloudinary(selectedFile)
      .then((url) => {
        setLoading(false);
        setImg(url);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }

  return (
    <PostContainer>
      <Card style={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
        <Grid container>
          <Grid
            item
            xs={4}
            md={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: "400px", position: "relative" }}>
              {loading ? (
                <>
                  <div
                    style={{
                      width: "100%",
                      height: "400px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <Skeleton variant="rectangular" width={400} height={400} />
                    <CircularProgress style={{ position: "absolute" }} />
                  </div>
                </>
              ) : (
                <>
                  <CardMedia
                    component="img"
                    height="400"
                    image={img}
                    alt="Paella dish"
                  />
                  <input
                    onChange={handleFileChange}
                    type="file"
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      opacity: "0",
                      cursor: "pointer",
                    }}
                  />
                </>
              )}
            </div>
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
                        padding: "10px",
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
                    <label className="text-color">Giá thuê xe</label>
                    <input
                      type="number"
                      style={{
                        width: "100%",
                        display: "block",
                        outline: "none",
                        border: "none",
                        boxSizing: "border-box",
                        padding: "10px",
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
                style={{
                  padding: "0 20px",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <label className="text-color">Mô tả </label>
                <textarea
                  id="text_des"
                  style={{ resize: "none" }}
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                ></textarea>
              </Grid>
              <Grid
                xs={12}
                md={12}
                style={{
                  padding: "20px",
                  boxSizing: "border-box",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "5px",
                }}
              >
                <button className="btn_post" onClick={() => alert(img)}>
                  Đăng
                </button>
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
  #text_des {
    width: 100%;
    height: 50px;
    padding: 15px;
    line-height: 20px;
    box-sizing: border-box;
    outline: none;
    resize: none;
    border: none;
    border-radius: 5px;
    max-height: 100px;
  }
  #text_des::-webkit-scrollbar {
    width: 0;
  }
  .btn_post {
    padding: 10px 20px;
    cursor: pointer;
    background-color: #00a550;
    color: white;
    font-weight: bold;
    border: 1px solid #00a550;
    border-radius: 5px;
  }
  .btn_post:hover {
    background-color: white;
    color: #00a550;
  }
`;
export default PostCar;
