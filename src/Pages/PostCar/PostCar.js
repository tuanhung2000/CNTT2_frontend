import {
  Card,
  CardMedia,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  Step,
  StepLabel,
  Stepper,
  Switch,
} from "@mui/material";
import faPlus from "@fortawesome/free-regular-svg-icons";
import "./PostCar.scss";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
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
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#00a550",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
function PostCar() {
  const [pan, setPan] = useState("");
  const [chair, setChair] = useState("");
  const [door, setDoor] = useState("");
  const [selfDr, setSelfDr] = useState("");
  const [desc, setDesc] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [img, setImg] = useState(
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
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
  function handleStep(step) {
    setActiveStep(step);
    window.scrollTo(0, 0);
  }
  function handleBackStep(step) {
    setActiveStep(step);
    window.scrollTo(0, 0);
  }
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <section className="postContainer">
      <section className="post-area">
        <h2>Đăng ký xe</h2>
        <Grid container className="body-container">
          <Grid
            item
            xs={12}
            style={{
              borderBottom: "1px solid #e5e5e5",
              paddingBottom: "20px",
            }}
          >
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
                      "&.Mui-active": {
                        background: "white",
                        borderRadius: "24px",
                        fill: "#00a550",
                      },
                    },
                  }}
                >
                  Thông tin
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
                  Cho thuê
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
                  Hình ảnh
                </StepLabel>
              </Step>
            </Stepper>
          </Grid>
          {/* Area 1 */}
          {activeStep === 0 && (
            <>
              <div style={{ width: "100%" }}>
                <div
                  className="item-container"
                  style={{
                    paddingRight: "10px",
                  }}
                >
                  <label
                    className="label"
                    style={{ fontSize: "20px", fontWeight: "700" }}
                  >
                    Biển số xe
                  </label>
                  <span
                    style={{ color: "red", fontSize: "14px" }}
                    className="note"
                  >
                    Lưu ý: Biển số sẽ không thể thay đổi sau khi đăng kí.
                  </span>
                  <input
                    style={{
                      width: "100%",
                      border: "1px solid #e5e5e5",
                      outline: "none",
                      boxSizing: "border-box",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                    className="input"
                  ></input>
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <div
                  className="item-container"
                  style={{
                    paddingRight: "10px",
                    width: "100%",
                  }}
                >
                  <label
                    className="label"
                    style={{ fontSize: "20px", fontWeight: "700" }}
                  >
                    Thông tin cơ bản
                  </label>
                  <span
                    style={{ color: "red", fontSize: "14px" }}
                    className="note"
                  >
                    Lưu ý: Các thông tin cơ bản sẽ không thể thay đổi sau khi
                    đăng kí.
                  </span>
                </div>
              </div>
              <div style={{ width: "100%", display: "flex" }}>
                <div
                  className="item-container"
                  style={{
                    paddingRight: "10px",
                  }}
                >
                  <label>Hãng xe</label>
                  <select name="cars" id="cars" className="select">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
                <div
                  className="item-container"
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  <label>Mẫu xe</label>
                  <select name="cars" id="cars" className="select">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
              </div>
              <div style={{ width: "100%", display: "flex" }}>
                <div
                  className="item-container"
                  style={{
                    paddingRight: "10px",
                  }}
                >
                  <label>Số ghế</label>
                  <select name="cars" id="cars" className="select">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
                <div
                  className="item-container"
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  <label>Năm sản xuất</label>
                  <select name="cars" id="cars" className="select">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
              </div>
              <div style={{ width: "100%", display: "flex" }}>
                <div
                  className="item-container"
                  style={{
                    paddingRight: "10px",
                  }}
                >
                  <label>Truyền động</label>
                  <select name="cars" id="cars" className="select">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
                <div
                  className="item-container"
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  <label>Loại nhiên liệu</label>
                  <select className="select" name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
              </div>
              <div style={{ width: "100%", display: "flex" }}>
                <div
                  className="item-container"
                  style={{
                    paddingRight: "10px",
                  }}
                >
                  <label>Số khung xe</label>
                  <input
                    style={{
                      width: "100%",
                      border: "1px solid #e5e5e5",
                      outline: "none",
                      boxSizing: "border-box",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  ></input>
                </div>
                <div
                  className="item-container"
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  <label>Có tài xế</label>
                  <select className="select" name="cars" id="cars">
                    <option value="">Chọn hình thức</option>
                    <option value="saab">Có tài xế</option>
                    <option value="mercedes">Không có tài xế</option>
                  </select>
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <div
                  className="item-container"
                  style={{
                    paddingRight: "10px",
                  }}
                >
                  <label
                    className="label"
                    style={{ fontSize: "20px", fontWeight: "700" }}
                  >
                    Mức tiêu thụ nhiên liệu
                  </label>
                  <span
                    style={{ color: "#c6c6c6", fontSize: "14px" }}
                    className="note"
                  >
                    Số lít nhiên liệu cho quãng đường 100km.
                  </span>
                  <input
                    style={{
                      width: "100%",
                      border: "1px solid #e5e5e5",
                      outline: "none",
                      boxSizing: "border-box",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                    className="input"
                  ></input>
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <div
                  className="item-container"
                  style={{
                    paddingRight: "10px",
                    width: "100%",
                  }}
                >
                  <label
                    className="label"
                    style={{ fontSize: "20px", fontWeight: "700" }}
                  >
                    Mô tả
                  </label>

                  <textarea
                    style={{
                      width: "100%",
                      border: "1px solid #e5e5e5",
                      outline: "none",
                      boxSizing: "border-box",
                      resize: "none",
                      height: "100px",
                      padding: "10px",
                      borderRadius: "5px",
                      overflowY: "scroll",
                    }}
                    className="input"
                  ></textarea>
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <div className="list">
                  <div className="item">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/map-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Bản đồ</span>
                  </div>
                  <div className="item">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/bluetooth-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Bản đồ</span>
                  </div>
                  <div className="item">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/360_camera-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Camera 360</span>
                  </div>

                  <div className="item">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/parking_camera-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Camera cập lề</span>
                  </div>
                  <div className="item">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/dash_camera-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Camera hành trình</span>
                  </div>
                  <div className="item">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/reverse_camera-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Camera lùi</span>
                  </div>
                  <div className="item">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/sunroof-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Cửa sổ trời</span>
                  </div>
                  <div className="item">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/gps-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Định vị GPS</span>
                  </div>
                  <div className="item">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/babyseat-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Ghế trẻ em</span>
                  </div>

                  <div className="item">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/spare_tire-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Lốp dự phòng</span>
                  </div>
                  <div className="item">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/dvd-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Màn hình DVD</span>
                  </div>
                  <div className="item">
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/airbags-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Túi khí an toàn</span>
                  </div>
                </div>
              </div>

              <div style={{ width: "100%", display: "flex" }}>
                <div
                  className="item-container"
                  style={{
                    paddingRight: "10px",
                  }}
                >
                  <button
                    style={{
                      border: "1px solid #e0e0e0",
                      backgroundColor: "e0e0e0",
                      color: "e0e0e0",
                    }}
                    className="button"
                    disabled
                  >
                    Quay lại
                  </button>
                </div>
                <div
                  className="item-container"
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  <button
                    style={{
                      border: "1px solid #5fcf86",
                      backgroundColor: "#5fcf86",
                      color: "white",
                    }}
                    className="button"
                    onClick={() => handleStep(1)}
                  >
                    Tiếp tục
                  </button>
                </div>
              </div>
            </>
          )}
          {/* Area 1 */}

          {/* Area 2 */}
          {activeStep === 1 && (
            <>
              <div style={{ width: "100%" }}>
                <div
                  className="item-container"
                  style={{
                    paddingRight: "10px",
                    width: "100%",
                  }}
                >
                  <label
                    className="label"
                    style={{ fontSize: "20px", fontWeight: "700" }}
                  >
                    Đơn giá thuê mặc định
                  </label>
                  <span
                    style={{ color: "red", fontSize: "14px" }}
                    className="note"
                  >
                    Đơn giá áp dụng cho tất cả các ngày. Bạn có thuể tuỳ chỉnh
                    giá khác cho các ngày đặc biệt (cuối tuần, lễ, tết...) trong
                    mục quản lý xe sau khi đăng kí.
                  </span>
                  <span style={{ color: "#c6c6c6", fontSize: "14px" }}>
                    Giá đề xuất: 2,500,000 VND
                  </span>
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        width: "50%",
                        paddingRight: "5px",
                        display: "flex",
                      }}
                    >
                      <input
                        style={{
                          width: "80%",
                          border: "1px solid #e5e5e5",
                          outline: "none",
                          boxSizing: "border-box",
                          padding: "10px",
                          borderTopLeftRadius: "4px",
                          borderBottomLeftRadius: "4px",
                          display: "block",
                        }}
                        className="input"
                        type="number"
                        placeholder="Ví dụ: 2,500,000"
                      ></input>
                      <div
                        style={{
                          border: "1px solid #e5e5e5",
                          width: "20%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderTopRightRadius: "4px",
                          borderBottomRightRadius: "4px",
                        }}
                      >
                        <span>VND</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <div
                  className="item-container"
                  style={{
                    width: "100%",
                  }}
                >
                  <label
                    className="label"
                    style={{ fontSize: "20px", fontWeight: "700" }}
                  >
                    Địa chỉ mặc định để giao nhận xe
                  </label>

                  <div style={{ width: "100%", display: "flex", gap: "5px" }}>
                    <select
                      name="cars"
                      id="cars"
                      className="select"
                      style={{ flex: 1 }}
                    >
                      <option value="">Tỉnh/Thành phố</option>
                      <option value="saab">Saab</option>
                      <option value="mercedes">Mercedes</option>
                      <option value="audi">Audi</option>
                    </select>
                    <select
                      name="cars"
                      id="cars"
                      className="select"
                      style={{ flex: 1 }}
                    >
                      <option value="">Quận/Huyện</option>
                      <option value="saab">Saab</option>
                      <option value="mercedes">Mercedes</option>
                      <option value="audi">Audi</option>
                    </select>
                    <select
                      name="cars"
                      id="cars"
                      style={{ flex: 1 }}
                      className="select"
                    >
                      <option value="">Xã/Phường/Thị trấn</option>
                      <option value="saab">Saab</option>
                      <option value="mercedes">Mercedes</option>
                      <option value="audi">Audi</option>
                    </select>
                  </div>
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <label style={{ fontSize: "20px", fontWeight: "700" }}>
                    Yêu cầu thuế chấp
                  </label>
                  <IOSSwitch
                    sx={{ m: 1 }}
                    checked={checked}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div style={{ width: "100%", display: "flex" }}>
                <div
                  className="item-container"
                  style={{
                    paddingRight: "10px",
                  }}
                >
                  <button
                    style={{
                      border: "1px solid #00a550",
                      backgroundColor: "#ffffff",
                      color: "#00a550",
                    }}
                    className="button"
                    onClick={() => handleStep(0)}
                  >
                    Quay lại
                  </button>
                </div>
                <div
                  className="item-container"
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  <button
                    style={{
                      border: "1px solid #5fcf86",
                      backgroundColor: "#5fcf86",
                      color: "white",
                    }}
                    className="button"
                    onClick={() => handleStep(2)}
                  >
                    Tiếp tục
                  </button>
                </div>
              </div>
            </>
          )}
          {/* Area 2 */}
          {activeStep === 2 && (
            <>
              <div style={{ width: "100%" }}>
                <div
                  className="item-container"
                  style={{
                    width: "100%",
                  }}
                >
                  <label
                    className="label"
                    style={{ fontSize: "20px", fontWeight: "700" }}
                  >
                    Hình ảnh
                  </label>
                  <span
                    style={{ color: "red", fontSize: "14px" }}
                    className="note"
                  >
                    Lưu ý: Hãy chọn tối thiểu 4 tấm ảnh.
                  </span>
                  <div class="grid-container">
                    <div class="grid-item">
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#f0f0f0",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <span>Mặt trước của xe</span>
                      </div>
                      {/* <img
                        src="https://plus.unsplash.com/premium_photo-1671656349204-950bf60fdadb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
                        alt="Image 1"
                      /> */}
                    </div>
                    <div class="grid-item">
                      <img
                        src="https://plus.unsplash.com/premium_photo-1671656349204-950bf60fdadb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
                        alt="Image 1"
                      />
                    </div>
                    <div class="grid-item">
                      <img
                        src="https://plus.unsplash.com/premium_photo-1671656349204-950bf60fdadb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
                        alt="Image 1"
                      />
                    </div>
                    <div class="grid-item">
                      <img
                        src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/toyota_veloz_cross_2022/p/g/2023/02/14/15/4iz300-Bam8UfjxmkzenNw.jpg"
                        alt="Image 1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ width: "100%", display: "flex" }}>
                <div
                  className="item-container"
                  style={{
                    paddingRight: "10px",
                  }}
                >
                  <button
                    style={{
                      border: "1px solid #00a550",
                      backgroundColor: "#ffffff",
                      color: "#00a550",
                    }}
                    className="button"
                    onClick={() => handleStep(1)}
                  >
                    Quay lại
                  </button>
                </div>
                <div
                  className="item-container"
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  <button
                    style={{
                      border: "1px solid #5fcf86",
                      backgroundColor: "#5fcf86",
                      color: "white",
                    }}
                    className="button"
                    onClick={() => {
                      alert("đăng ký thành công");
                    }}
                  >
                    Tiếp tục
                  </button>
                </div>
              </div>
            </>
          )}
        </Grid>
      </section>
    </section>
  );
}

export default PostCar;
