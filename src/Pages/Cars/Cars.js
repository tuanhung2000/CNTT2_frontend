import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import {
  MdAttachMoney,
  MdBackpack,
  MdDirectionsCarFilled,
  MdElectricCar,
  MdStar,
} from "react-icons/md";
import { nameCar } from "../../APIFake/ApiFake";
import React, { useEffect, useState } from "react";
import { FaShieldHeart, FaXmark } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { RiCarLine } from "react-icons/ri";
import {
  FaCarSide,
  FaCodeBranch,
  FaMapMarkerAlt,
  FaMoneyBillAlt,
  FaRegTimesCircle,
  FaRegWindowMaximize,
  FaUndoAlt,
} from "react-icons/fa";
import "./Cars.scss";
import axios from "axios";
function Cars() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isSticky, setIsSticky] = useState(false);
  const [listCity, setListCity] = useState("");
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [city, setCity] = useState("");
  const [typeCar, setTypeCar] = useState(0);
  const [openBranch, setOpenBranch] = useState(false);
  const [branchCar, setBranchCar] = useState(0);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  React.useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/").then((response) => {
      setListCity(response.data);
    });
  }, []);
  console.log(nameCar);
  useEffect(() => {
    if (listCity && searchTerm) {
      const filteredResults = listCity.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  }, [searchTerm]);
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCity(null); // Clear selected city when typing
  };

  const handleCitySelect = (city) => {
    setSearchTerm(city.name);
    setSelectedCity(city);
  };
  const handleClickOpen = (item) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenBranch = (item) => {
    setOpenBranch(true);
  };
  const handleCloseBranch = () => {
    setOpenBranch(false);
  };
  return (
    <section className="car-page">
      <section
        className="filter-container"
        isSticky={isSticky}
        style={{ position: "sticky", top: isSticky ? "0" : "auto" }}
      >
        <div className="top-filter">
          <div className="input-container">
            <input
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Nhập thành phố bạn muốn tìm xe"
              style={{
                width: "100%",
                padding: "10px 10px 10px 30px",
                cursor: "pointer",
                outline: "none",
                display: "block",
                height: "40px",
                border: "none",
              }}
            ></input>
            <FaMapMarkerAlt
              style={{
                position: "absolute",
                top: "5px",
                left: "5px",
                height: "30px",
                width: "20px",
              }}
            />

            <ul
              style={{
                listStyle: "none",
                position: "absolute",
                top: "40px",
                left: "0",
                width: "100%",
                maxHeight: "300px",
                overflow: "scroll",
                overflowX: "hidden",
                backgroundColor: "white",
              }}
            >
              {searchResults.map((city) => (
                <li
                  key={city.id}
                  onClick={() => handleCitySelect(city)}
                  style={{
                    padding: "5px",
                    display: selectedCity || !searchTerm ? "none" : "block",
                    cursor: "pointer",
                  }}
                >
                  {city.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bottom-filter">
          <div className="item">
            <FaUndoAlt />
          </div>
          <div className="item" onClick={() => handleClickOpen()}>
            <FaCarSide />
            <span>Loại xe</span>
          </div>
          <div className="item" onClick={() => handleClickOpenBranch()}>
            <FaRegWindowMaximize />
            <span>Hãng xe</span>
          </div>
          <div className="item">
            <FaMoneyBillAlt />
            <span>Miễn thuế chấp</span>
          </div>
          <div className="item">
            <FaCodeBranch />
            <span>Truyền động</span>
          </div>
          <div className="item">
            <MdElectricCar />
            <span>Xe điện</span>
          </div>
          <div className="item">
            <MdDirectionsCarFilled />
            <span>Xe số sàn</span>
          </div>
          <div className="item">
            <MdAttachMoney />
            <span>Giá tiền</span>
          </div>
        </div>
      </section>
      <section className="container-body">
        <Link className="item" to="/listcars/id">
          <img
            alt=""
            src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/vinfast_vf8_eco_2023/p/g/2023/04/24/13/8aWfyau14UiKwz0nOKgCzg.jpg"
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "5px",
              justifyContent: "center",
            }}
          >
            <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              vinfast_vf8_eco_2023
            </p>
            <FaShieldHeart style={{ color: "#00a550" }} />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <FaMapMarkerAlt />
            <p>Hồ Chí Minh</p>
          </div>
          <div className="bottom">
            <div className="bottom-left">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MdStar style={{ color: "yellow" }} />
                <span style={{ color: "#767676", fontSize: "13px" }}>5.0</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MdBackpack style={{ color: "green" }} />
                <span style={{ color: "#767676", fontSize: "13px" }}>
                  7 chuyến
                </span>
              </div>
            </div>
            <div className="bottom-right">
              <span style={{ color: "#5fcf86", fontWeight: "bold" }}>
                1550K
              </span>
              <span>/ngày</span>
            </div>
          </div>
        </Link>
        <Link className="item" to="/listcars/id">
          <img
            alt=""
            src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/vinfast_vf8_eco_2023/p/g/2023/04/24/13/8aWfyau14UiKwz0nOKgCzg.jpg"
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "5px",
              justifyContent: "center",
            }}
          >
            <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              vinfast_vf8_eco_2023
            </p>
            <FaShieldHeart style={{ color: "#00a550" }} />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <FaMapMarkerAlt />
            <p>Hồ Chí Minh</p>
          </div>
          <div className="bottom">
            <div className="bottom-left">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MdStar style={{ color: "yellow" }} />
                <span style={{ color: "#767676", fontSize: "13px" }}>5.0</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MdBackpack style={{ color: "green" }} />
                <span style={{ color: "#767676", fontSize: "13px" }}>
                  7 chuyến
                </span>
              </div>
            </div>
            <div className="bottom-right">
              <span style={{ color: "#5fcf86", fontWeight: "bold" }}>
                1550K
              </span>
              <span>/ngày</span>
            </div>
          </div>
        </Link>
        <Link className="item" to="/listcars/id">
          <img
            alt=""
            src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/vinfast_vf8_eco_2023/p/g/2023/04/24/13/8aWfyau14UiKwz0nOKgCzg.jpg"
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "5px",
              justifyContent: "center",
            }}
          >
            <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              vinfast_vf8_eco_2023
            </p>
            <FaShieldHeart style={{ color: "#00a550" }} />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <FaMapMarkerAlt />
            <p>Hồ Chí Minh</p>
          </div>
          <div className="bottom">
            <div className="bottom-left">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MdStar style={{ color: "yellow" }} />
                <span style={{ color: "#767676", fontSize: "13px" }}>5.0</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MdBackpack style={{ color: "green" }} />
                <span style={{ color: "#767676", fontSize: "13px" }}>
                  7 chuyến
                </span>
              </div>
            </div>
            <div className="bottom-right">
              <span style={{ color: "#5fcf86", fontWeight: "bold" }}>
                1550K
              </span>
              <span>/ngày</span>
            </div>
          </div>
        </Link>
        <Link className="item" to="/listcars/id">
          <img
            alt=""
            src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/vinfast_vf8_eco_2023/p/g/2023/04/24/13/8aWfyau14UiKwz0nOKgCzg.jpg"
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "5px",
              justifyContent: "center",
            }}
          >
            <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              vinfast_vf8_eco_2023
            </p>
            <FaShieldHeart style={{ color: "#00a550" }} />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <FaMapMarkerAlt />
            <p>Hồ Chí Minh</p>
          </div>
          <div className="bottom">
            <div className="bottom-left">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MdStar style={{ color: "yellow" }} />
                <span style={{ color: "#767676", fontSize: "13px" }}>5.0</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MdBackpack style={{ color: "green" }} />
                <span style={{ color: "#767676", fontSize: "13px" }}>
                  7 chuyến
                </span>
              </div>
            </div>
            <div className="bottom-right">
              <span style={{ color: "#5fcf86", fontWeight: "bold" }}>
                1550K
              </span>
              <span>/ngày</span>
            </div>
          </div>
        </Link>
        <Link className="item" to="/listcars/id">
          <img
            alt=""
            src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/vinfast_vf8_eco_2023/p/g/2023/04/24/13/8aWfyau14UiKwz0nOKgCzg.jpg"
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "5px",
              justifyContent: "center",
            }}
          >
            <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              vinfast_vf8_eco_2023
            </p>
            <FaShieldHeart style={{ color: "#00a550" }} />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <FaMapMarkerAlt />
            <p>Hồ Chí Minh</p>
          </div>
          <div className="bottom">
            <div className="bottom-left">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MdStar style={{ color: "yellow" }} />
                <span style={{ color: "#767676", fontSize: "13px" }}>5.0</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MdBackpack style={{ color: "green" }} />
                <span style={{ color: "#767676", fontSize: "13px" }}>
                  7 chuyến
                </span>
              </div>
            </div>
            <div className="bottom-right">
              <span style={{ color: "#5fcf86", fontWeight: "bold" }}>
                1550K
              </span>
              <span>/ngày</span>
            </div>
          </div>
        </Link>
        <Link className="item" to="/listcars/id">
          <img
            alt=""
            src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/vinfast_vf8_eco_2023/p/g/2023/04/24/13/8aWfyau14UiKwz0nOKgCzg.jpg"
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "5px",
              justifyContent: "center",
            }}
          >
            <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              vinfast_vf8_eco_2023
            </p>
            <FaShieldHeart style={{ color: "#00a550" }} />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <FaMapMarkerAlt />
            <p>Hồ Chí Minh</p>
          </div>
          <div className="bottom">
            <div className="bottom-left">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MdStar style={{ color: "yellow" }} />
                <span style={{ color: "#767676", fontSize: "13px" }}>5.0</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MdBackpack style={{ color: "green" }} />
                <span style={{ color: "#767676", fontSize: "13px" }}>
                  7 chuyến
                </span>
              </div>
            </div>
            <div className="bottom-right">
              <span style={{ color: "#5fcf86", fontWeight: "bold" }}>
                1550K
              </span>
              <span>/ngày</span>
            </div>
          </div>
        </Link>
      </section>
      <Dialog
        open={open}
        onClose={handleClose}
        className="dialog-container"
        sx={{
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            width: "600px", /// edit here
          },
        }}
      >
        <DialogTitle
          className="dialog-title"
          style={{
            color: "black",
            fontSize: "20px",
            fontWeight: "600",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            padding: "20px 10px 10px 10px",
            height: "60px",
          }}
        >
          Loại xe
          <div
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "20px",
              display: "flex",
              justifyContent: "center",
              padding: "10px",
              alignItems: "center",
              cursor: "pointer",
              border: "1px solid #c6c6c6",
              borderRadius: "50%",
            }}
          >
            <FaXmark
              style={{
                height: "15px",
                width: "15px",

                color: "black",
              }}
            />
          </div>
        </DialogTitle>
        <DialogContent
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
            padding: "0 20px 10px 20px",
          }}
          className="dialog-content"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #c6c6c6",
              cursor: "pointer",
              borderRadius: "5px",
              gap: "10px",
              backgroundColor: typeCar === 2 ? "#effaf3" : "white",
              borderColor: typeCar === 2 ? "#00a550" : "#c6c6c6",
            }}
            onClick={() => {
              if (typeCar !== 2) {
                setTypeCar(2);
              } else {
                setTypeCar(0);
              }
            }}
          >
            <FaCarSide
              style={{ fontSize: "50px", color: "GrayText", fontWeight: "400" }}
            />
            <span style={{ fontWeight: "bold" }}>2 chỗ</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #c6c6c6",
              cursor: "pointer",
              borderRadius: "5px",
              gap: "10px",
              backgroundColor: typeCar === 4 ? "#effaf3" : "white",
              borderColor: typeCar === 4 ? "#00a550" : "#c6c6c6",
            }}
            onClick={() => {
              if (typeCar !== 4) {
                setTypeCar(4);
              } else {
                setTypeCar(0);
              }
            }}
          >
            <FaCarSide style={{ fontSize: "50px", color: "GrayText" }} />
            <span style={{ fontWeight: "bold" }}>4 chỗ</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #c6c6c6",
              cursor: "pointer",
              borderRadius: "5px",
              gap: "10px",
              backgroundColor: typeCar === 5 ? "#effaf3" : "white",
              borderColor: typeCar === 5 ? "#00a550" : "#c6c6c6",
            }}
            onClick={() => {
              if (typeCar !== 5) {
                setTypeCar(5);
              } else {
                setTypeCar(0);
              }
            }}
          >
            <FaCarSide style={{ fontSize: "50px", color: "GrayText" }} />
            <span style={{ fontWeight: "bold" }}>5 chỗ</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #c6c6c6",
              cursor: "pointer",
              borderRadius: "5px",
              gap: "10px",
              backgroundColor: typeCar === 7 ? "#effaf3" : "white",
              borderColor: typeCar === 7 ? "#00a550" : "#c6c6c6",
            }}
            onClick={() => {
              if (typeCar !== 7) {
                setTypeCar(7);
              } else {
                setTypeCar(0);
              }
            }}
          >
            <FaCarSide style={{ fontSize: "50px", color: "GrayText" }} />
            <span style={{ fontWeight: "bold" }}>7 chỗ</span>
          </div>
        </DialogContent>
        <DialogActions style={{ padding: "10px 20px" }}>
          <button
            style={{
              width: "100%",
              backgroundColor: "#00a550",
              color: "#fff",
              padding: "20px",
              border: "1px solid #00a550",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "15px",
              fontWeight: "bold",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#fff";
              e.target.style.color = "#00a550"; // Change color on hover
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#00a550";
              e.target.style.color = "#fff"; // Revert color when not hovered
            }}
          >
            Áp dụng
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openBranch}
        onClose={handleCloseBranch}
        className="dialog-container"
        sx={{
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            width: "600px", /// edit here
          },
        }}
      >
        <DialogTitle
          className="dialog-title"
          style={{
            color: "black",
            fontSize: "20px",
            fontWeight: "600",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            padding: "20px 10px 10px 10px",
            height: "60px",
          }}
        >
          Hãng xe
          <div
            onClick={handleCloseBranch}
            style={{
              position: "absolute",
              top: "10px",
              right: "20px",
              display: "flex",
              justifyContent: "center",
              padding: "10px",
              alignItems: "center",
              cursor: "pointer",
              border: "1px solid #c6c6c6",
              borderRadius: "50%",
            }}
          >
            <FaXmark
              style={{
                height: "15px",
                width: "15px",

                color: "black",
              }}
            />
          </div>
        </DialogTitle>
        <DialogContent
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
            padding: "0 20px 10px 20px",
          }}
          className="dialog-content"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #c6c6c6",
              cursor: "pointer",
              borderRadius: "5px",
              gap: "10px",
              backgroundColor: typeCar === 2 ? "#effaf3" : "white",
              borderColor: typeCar === 2 ? "#00a550" : "#c6c6c6",
            }}
            onClick={() => {
              if (typeCar !== 2) {
                setTypeCar(2);
              } else {
                setTypeCar(0);
              }
            }}
          >
            <FaCarSide
              style={{ fontSize: "50px", color: "GrayText", fontWeight: "400" }}
            />
            <span style={{ fontWeight: "bold" }}>2 chỗ</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #c6c6c6",
              cursor: "pointer",
              borderRadius: "5px",
              gap: "10px",
              backgroundColor: typeCar === 4 ? "#effaf3" : "white",
              borderColor: typeCar === 4 ? "#00a550" : "#c6c6c6",
            }}
            onClick={() => {
              if (typeCar !== 4) {
                setTypeCar(4);
              } else {
                setTypeCar(0);
              }
            }}
          >
            <FaCarSide style={{ fontSize: "50px", color: "GrayText" }} />
            <span style={{ fontWeight: "bold" }}>43 chỗ</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #c6c6c6",
              cursor: "pointer",
              borderRadius: "5px",
              gap: "10px",
              backgroundColor: typeCar === 5 ? "#effaf3" : "white",
              borderColor: typeCar === 5 ? "#00a550" : "#c6c6c6",
            }}
            onClick={() => {
              if (typeCar !== 5) {
                setTypeCar(5);
              } else {
                setTypeCar(0);
              }
            }}
          >
            <FaCarSide style={{ fontSize: "50px", color: "GrayText" }} />
            <span style={{ fontWeight: "bold" }}>5 chỗ</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #c6c6c6",
              cursor: "pointer",
              borderRadius: "5px",
              gap: "10px",
              backgroundColor: typeCar === 7 ? "#effaf3" : "white",
              borderColor: typeCar === 7 ? "#00a550" : "#c6c6c6",
            }}
            onClick={() => {
              if (typeCar !== 7) {
                setTypeCar(7);
              } else {
                setTypeCar(0);
              }
            }}
          >
            <FaCarSide style={{ fontSize: "50px", color: "GrayText" }} />
            <span style={{ fontWeight: "bold" }}>7 chỗ</span>
          </div>
        </DialogContent>
        <DialogActions style={{ padding: "10px 20px" }}>
          <button
            style={{
              width: "100%",
              backgroundColor: "#00a550",
              color: "#fff",
              padding: "20px",
              border: "1px solid #00a550",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "15px",
              fontWeight: "bold",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#fff";
              e.target.style.color = "#00a550"; // Change color on hover
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#00a550";
              e.target.style.color = "#fff"; // Revert color when not hovered
            }}
          >
            Áp dụng
          </button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default Cars;
