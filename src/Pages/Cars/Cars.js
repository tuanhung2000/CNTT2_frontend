import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Input,
} from "@mui/material";
import { Rate } from "antd";
import {
  MdAttachMoney,
  MdBackpack,
  MdDirectionsCarFilled,
  MdElectricCar,
  MdStar,
} from "react-icons/md";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaShieldHeart } from "react-icons/fa6";
import { COLORS } from "../../assets/color";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router";
import {
  FaCarSide,
  FaCodeBranch,
  FaLocationArrow,
  FaMapMarkerAlt,
  FaMoneyBillAlt,
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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [city, setCity] = useState("");
  // const [checked, setChecked] = React.useState(true);
  // const [star, setStar] = React.useState();
  const [rateScore, setRateScore] = useState(3);
  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };

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
  console.log(listCity);
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
          <div className="item">
            <FaCarSide />
            <span>Loại xe</span>
          </div>
          <div className="item">
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
    </section>
  );
}

export default Cars;
