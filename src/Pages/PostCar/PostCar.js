import { Grid, Step, StepLabel, Stepper, Switch } from "@mui/material";

import "./PostCar.scss";
import { nameCar, modelCar, yearCar, fuel } from "../../APIFake/ApiFake";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Swal from "sweetalert2";
import { COLORS } from "../../assets/color";
import { useNavigate } from "react-router-dom";
import { useCreateVehicleQuery } from "../../features/user/userApiSlice";
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
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [img, setImg] = useState(
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
  );
  const [price, setPrice] = useState(0);
  const [isSelfDrive, setIsSelfDrive] = useState(false);
  const [make, setMake] = useState("");
  const [type, setType] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [provinces, setProvinces] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [numberConstructor, setNumberConstructor] = useState("");
  const [numberChair, setNumberChair] = useState("");
  ////////////////
  const [map, setMap] = useState(false);
  const [bluetooth, setBluetooth] = useState(false);
  const [camera360, setCamera360] = useState(false);
  const [cameratruoc, setCameratruoc] = useState(false);
  const [cameratrip, setCameratrip] = useState(false);
  const [camerasau, setCamerasau] = useState(false);
  const [cuaso, setCuaso] = useState(false);
  const [gps, setGps] = useState(false);
  const [ghe, setGhe] = useState(false);
  const [lop, setLop] = useState(false);
  const [manhinh, setManhinh] = useState(false);
  const [tuikhi, setTuikhi] = useState(false);
  const [listFeatures, setListFeatures] = useState([]);
  ////////////////////////////////////////////////////////////////////////
  const [listCity, setListCity] = useState("");
  const [listDistrict, setListDistrict] = useState("");
  const [listWard, setListWard] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const listImg = [];
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [urlImg, setUrlImg] = useState("");
  const url = "http://localhost:9090/vehicle/";
  const token = localStorage.getItem("token");
  const opts = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
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
  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/").then((response) => {
      setListCity(response.data);
    });
  }, []);
  useEffect(() => {
    if (city) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${city}?depth=2`)
        .then((response) => {
          setListDistrict(response.data.districts);
          setListWard("");
        });
    } else {
      setListDistrict("");
      setListWard("");
    }
  }, [city]);
  useEffect(() => {
    if (district) {
      axios
        .get(
          `https://provinces.open-api.vn/api/d/${district}?depth=2
      `
        )
        .then((response) => {
          setListWard(response.data.wards);
        });
    } else {
      setListWard("");
    }
  }, [district]);
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
    if (step === 1) {
      const featureList = [
        { id: 1, value: map },
        { id: 2, value: bluetooth },
        { id: 3, value: camera360 },
        { id: 4, value: cameratruoc },
        { id: 5, value: cameratrip },
        { id: 6, value: camerasau },
        { id: 7, value: cuaso },
        { id: 8, value: gps },
        { id: 9, value: ghe },
        { id: 10, value: lop },
        { id: 11, value: manhinh },
        { id: 12, value: tuikhi },
      ];

      setListFeatures(featureList);
    }
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
  function handleImg1(event) {
    setLoading1(true);
    const selectedFile = event.target.files[0];
    uploadImageToCloudinary(selectedFile)
      .then((url) => {
        setLoading1(false);
        setImg1(url);
      })
      .catch((error) => {
        setLoading1(false);
        console.error(error);
      });
  }
  function handleImg2(event) {
    setLoading2(true);
    const selectedFile = event.target.files[0];
    uploadImageToCloudinary(selectedFile)
      .then((url) => {
        setLoading2(false);
        setImg2(url);
      })
      .catch((error) => {
        setLoading2(false);
        console.error(error);
      });
  }
  function handleImg3(event) {
    setLoading3(true);
    const selectedFile = event.target.files[0];
    uploadImageToCloudinary(selectedFile)
      .then((url) => {
        setLoading3(false);
        setImg3(url);
      })
      .catch((error) => {
        setLoading3(false);
        console.error(error);
      });
  }
  function handleImg4(event) {
    setLoading4(true);
    const selectedFile = event.target.files[0];
    uploadImageToCloudinary(selectedFile)
      .then((url) => {
        setLoading4(false);
        setImg4(url);
      })
      .catch((error) => {
        setLoading4(false);
        console.error(error);
      });
  }
  function uploadImageToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pzoe2lzh"); // replace with your Cloudinary upload preset

    return axios
      .post("https://api.cloudinary.com/v1_1/djhhzmcps/image/upload", formData)
      .then((response) => {
        setUrlImg(response.data.url);
        return response.data.url; // return the URL of the uploaded image
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
  useEffect(() => {
    if (img1 && img2 && img3 && img4) {
      listImg.push(img1);
      listImg.push(img2);
      listImg.push(img3);
      listImg.push(img4);
    }
  }, [img1, img2, img3, img4]);

  const handlePushedFeature = () => {};
  const handlePostCar = (e) => {
    e.preventDefault();
    axios
      .post(
        url,
        {
          image: listImg,
          licensePlate: licensePlate,
          price: price,
          extraFee: 150000,
          isSelfDrive: isSelfDrive,
          make: make,
          type: type,
          model: model,
          year: year,
          feature: listFeatures,
          description: desc,
          powers: "500hp",
          fuelType: fuelType,
          // numberConstructor: numberConstructor,
          insurance: "1201234",
          consumption: 20,
          maxSpeed: 100,
          isSelfDrive: isSelfDrive,
          numberConstructor: numberChair,
        },
        opts
      )
      .then((response) => {
        Swal.fire({
          title: "Thành công!",
          text: "Vui lòng chờ kiểm tra thông tin từ quản trị viên!",
          icon: "success",
          confirmButtonColor: `${COLORS.main}`,
          confirmButtonText: "Đồng ý",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/listcars");
          }
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Thất bại!",
          text: "Vui lòng chờ kiểm tra thông tin từ quản trị viên!",
          icon: "error",
          confirmButtonColor: `${COLORS.main}`,
          confirmButtonText: "Xác nhận",
        });
      });
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
                    value={licensePlate}
                    onChange={(e) => {
                      setLicensePlate(e.target.value);
                    }}
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
                  <select
                    name="cars"
                    id="cars"
                    className="select"
                    value={make}
                    onChange={(e) => {
                      setMake(e.target.value);
                    }}
                  >
                    <option value="" defaultValue>
                      Chọn hãng xe
                    </option>
                    {nameCar &&
                      nameCar.map((car) => {
                        return (
                          <option value={car.name} key={car.id}>
                            {car.name.toUpperCase()}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div
                  className="item-container"
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  <label>Mẫu xe</label>
                  <select
                    name="cars"
                    id="cars"
                    className="select"
                    value={model}
                    onChange={(e) => {
                      setModel(e.target.value);
                    }}
                  >
                    <option value="" defaultValue>
                      Chọn mẫu xe
                    </option>
                    {modelCar &&
                      modelCar.map((model) => {
                        return (
                          <option value={model.name} key={model.id}>
                            {model.name.toUpperCase()}
                          </option>
                        );
                      })}
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
                  <select
                    name="cars"
                    id="cars"
                    className="select"
                    value={numberChair}
                    onChange={(e) => {
                      setNumberChair(e.target.value);
                    }}
                  >
                    <option value="">Chọn số ghế</option>
                    <option value={"2"}>2</option>
                    <option value={"4"}>4</option>
                    <option value={"5"}>5</option>
                    <option value={"7"}>7</option>
                  </select>
                </div>
                <div
                  className="item-container"
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  <label>Năm sản xuất</label>
                  <select
                    name="year"
                    id="year"
                    className="select"
                    value={year}
                    onChange={(e) => {
                      setYear(e.target.value);
                    }}
                  >
                    <option value="" defaultValue>
                      Chọn năm sản xuất
                    </option>
                    {yearCar &&
                      yearCar.map((year) => {
                        return (
                          <option value={year.value} key={year.id}>
                            {year.value}
                          </option>
                        );
                      })}
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
                  <select
                    name="cars"
                    id="cars"
                    className="select"
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  >
                    <option value="">Chọn loại truyền động</option>
                    <option value="auto">Số tự động</option>
                    <option value="physic">Số sàn</option>
                  </select>
                </div>
                <div
                  className="item-container"
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  <label>Loại nhiên liệu</label>
                  <select
                    className="select"
                    name="cars"
                    id="cars"
                    value={fuelType}
                    onChange={(e) => {
                      setFuelType(e.target.value);
                    }}
                  >
                    <option value="">Chọn nhiên liệu</option>
                    {fuel &&
                      fuel.map((fuel) => {
                        return (
                          <option value={fuel.name} key={fuel.id}>
                            {fuel.name}
                          </option>
                        );
                      })}
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
                    value={numberConstructor}
                    onChange={(e) => {
                      setNumberConstructor(e.target.value);
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
                  <select
                    className="select"
                    name="cars"
                    id="cars"
                    value={isSelfDrive}
                    onChange={(e) => {
                      setIsSelfDrive(e.target.value);
                    }}
                  >
                    <option value="">Chọn hình thức</option>
                    <option value={true}>Có tài xế</option>
                    <option value={false}>Không có tài xế</option>
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
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                    value={desc}
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
                  <div
                    className={map ? "item-active" : "item"}
                    onClick={() => {
                      if (map) {
                        setMap(false);
                      } else {
                        setMap(true);
                      }
                    }}
                  >
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/map-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Bản đồ</span>
                  </div>
                  <div
                    className={bluetooth ? "item-active" : "item"}
                    onClick={(e) => {
                      if (bluetooth) {
                        setBluetooth(false);
                      } else {
                        setBluetooth(true);
                      }
                    }}
                  >
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/bluetooth-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Bluetooth</span>
                  </div>
                  <div
                    className={camera360 ? "item-active" : "item"}
                    onClick={(e) => {
                      if (camera360) {
                        setCamera360(false);
                      } else {
                        setCamera360(true);
                      }
                    }}
                  >
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/360_camera-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Camera 360</span>
                  </div>

                  <div
                    className={cameratruoc ? "item-active" : "item"}
                    onClick={(e) => {
                      if (cameratruoc) {
                        setCameratruoc(false);
                      } else {
                        setCameratruoc(true);
                      }
                    }}
                  >
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/parking_camera-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Camera cập lề</span>
                  </div>
                  <div
                    className={cameratrip ? "item-active" : "item"}
                    onClick={(e) => {
                      if (cameratrip) {
                        setCameratrip(false);
                      } else {
                        setCameratrip(true);
                      }
                    }}
                  >
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/dash_camera-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Camera hành trình</span>
                  </div>
                  <div
                    className={camerasau ? "item-active" : "item"}
                    onClick={(e) => {
                      if (camerasau) {
                        setCamerasau(false);
                      } else {
                        setCamerasau(true);
                      }
                    }}
                  >
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/reverse_camera-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Camera lùi</span>
                  </div>
                  <div
                    className={cuaso ? "item-active" : "item"}
                    onClick={(e) => {
                      if (cuaso) {
                        setCuaso(false);
                      } else {
                        setCuaso(true);
                      }
                    }}
                  >
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/sunroof-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Cửa sổ trời</span>
                  </div>
                  <div
                    className={gps ? "item-active" : "item"}
                    onClick={(e) => {
                      if (gps) {
                        setGps(false);
                      } else {
                        setGps(true);
                      }
                    }}
                  >
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/gps-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Định vị GPS</span>
                  </div>
                  <div
                    className={ghe ? "item-active" : "item"}
                    onClick={(e) => {
                      if (ghe) {
                        setGhe(false);
                      } else {
                        setGhe(true);
                      }
                    }}
                  >
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/babyseat-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Ghế trẻ em</span>
                  </div>

                  <div
                    className={lop ? "item-active" : "item"}
                    onClick={(e) => {
                      if (lop) {
                        setLop(false);
                      } else {
                        setLop(true);
                      }
                    }}
                  >
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/spare_tire-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Lốp dự phòng</span>
                  </div>
                  <div
                    className={manhinh ? "item-active" : "item"}
                    onClick={(e) => {
                      if (manhinh) {
                        setManhinh(false);
                      } else {
                        setManhinh(true);
                      }
                    }}
                  >
                    <img
                      src="https://n1-cstg.mioto.vn/v4/p/m/icons/features/dvd-v2.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Màn hình DVD</span>
                  </div>
                  <div
                    className={tuikhi ? "item-active" : "item"}
                    onClick={(e) => {
                      if (tuikhi) {
                        setTuikhi(false);
                      } else {
                        setTuikhi(true);
                      }
                    }}
                  >
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
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
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
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">Tỉnh/Thành phố</option>

                      {listCity &&
                        listCity.map((city, index) => {
                          return (
                            <option value={city.code} key={city.code}>
                              {city.name}
                            </option>
                          );
                        })}
                    </select>
                    <select
                      name="cars"
                      id="cars"
                      className="select"
                      style={{ flex: 1 }}
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    >
                      <option value="">Quận/Huyện</option>
                      {listDistrict &&
                        listDistrict.map((item, index) => {
                          return (
                            <option value={item.code} key={item.code}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                    <select
                      name="cars"
                      id="cars"
                      style={{ flex: 1 }}
                      className="select"
                      value={provinces}
                      onChange={(e) => setProvinces(e.target.value)}
                    >
                      <option value="">Xã/Phường/Thị trấn</option>
                      {listWard &&
                        listWard.map((item) => {
                          return (
                            <option value={item.code} key={item.code}>
                              {item.name}
                            </option>
                          );
                        })}
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
                          boxSizing: "border-box",
                          gap: "10px",
                          position: "relative",
                        }}
                      >
                        <input
                          onChange={handleImg1}
                          type="file"
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            opacity: "0",
                            cursor: "pointer",
                            zIndex: "11",
                          }}
                        ></input>
                        {loading1 ? (
                          <CircularProgress />
                        ) : (
                          <img
                            alt="1"
                            src={img1}
                            style={{ opacity: img1 ? "" : "0" }}
                          ></img>
                        )}
                        {!loading1 && (
                          <>
                            <ion-icon
                              name="add-circle-outline"
                              style={{ opacity: img1 ? "0" : "" }}
                            ></ion-icon>
                            <span style={{ opacity: img1 ? "0" : "" }}>
                              Mặt trước của xe
                            </span>
                          </>
                        )}
                      </div>
                    </div>
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
                          boxSizing: "border-box",
                          gap: "10px",
                          position: "relative",
                        }}
                      >
                        <input
                          onChange={handleImg2}
                          type="file"
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            opacity: "0",
                            cursor: "pointer",
                            zIndex: "11",
                          }}
                        ></input>
                        {loading2 ? (
                          <CircularProgress />
                        ) : (
                          <img
                            alt="1"
                            src={img2}
                            style={{ opacity: img2 ? "" : "0" }}
                          ></img>
                        )}
                        {!loading2 && (
                          <>
                            <ion-icon
                              name="add-circle-outline"
                              style={{ opacity: img2 ? "0" : "" }}
                            ></ion-icon>
                            <span style={{ opacity: img2 ? "0" : "" }}>
                              Mặt sau của xe
                            </span>
                          </>
                        )}
                      </div>
                    </div>
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
                          boxSizing: "border-box",
                          gap: "10px",
                          position: "relative",
                        }}
                      >
                        <input
                          onChange={handleImg3}
                          type="file"
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            opacity: "0",
                            cursor: "pointer",
                            zIndex: "11",
                          }}
                        ></input>
                        {loading3 ? (
                          <CircularProgress />
                        ) : (
                          <img
                            alt="1"
                            src={img3}
                            style={{ opacity: img3 ? "" : "0" }}
                          ></img>
                        )}
                        {!loading3 && (
                          <>
                            <ion-icon
                              name="add-circle-outline"
                              style={{ opacity: img3 ? "0" : "" }}
                            ></ion-icon>
                            <span style={{ opacity: img3 ? "0" : "" }}>
                              Nội thất của xe
                            </span>
                          </>
                        )}
                      </div>
                    </div>
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
                          boxSizing: "border-box",
                          gap: "10px",
                          position: "relative",
                        }}
                      >
                        <input
                          onChange={handleImg4}
                          type="file"
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            opacity: "0",
                            cursor: "pointer",
                            zIndex: "11",
                          }}
                        ></input>
                        {loading4 ? (
                          <CircularProgress />
                        ) : (
                          <img
                            alt="1"
                            src={img4}
                            style={{ opacity: img4 ? "" : "0" }}
                          ></img>
                        )}
                        {!loading4 && (
                          <>
                            <ion-icon
                              name="add-circle-outline"
                              style={{ opacity: img4 ? "0" : "" }}
                            ></ion-icon>
                            <span style={{ opacity: img4 ? "0" : "" }}>
                              Tổng quan của xe
                            </span>
                          </>
                        )}
                      </div>
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
                    onClick={handlePostCar}
                  >
                    Đăng xe
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
