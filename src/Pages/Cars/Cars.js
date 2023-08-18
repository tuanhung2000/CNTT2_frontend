import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  MdAttachMoney,
  MdBackpack,
  MdDirectionsCarFilled,
  MdElectricCar,
  MdStar,
} from "react-icons/md";
import { nameCar, listCar } from "../../APIFake/ApiFake";
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
import { useGetAllVehiclesQuery } from "../../features/user/userApiSlice";
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
  const [selectedCar, setSelectedCar] = useState("");
  const [activeFilter, setActiveFilter] = useState(0);
  const [openMotor, setOpenMotor] = useState(false);
  const [selectedMotor, setSelectedMotor] = useState("");
  const [filteredCars, setFilteredCars] = useState(null);
  const [openMoney, setOpenMoney] = useState(false);
  const [selectedMoney, setSelectedMoney] = useState("");
  const { data: allvehicle } = useGetAllVehiclesQuery();
  console.log("allvehicle", allvehicle);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
    if (activeFilter === 1) {
      setActiveFilter(0);
    } else {
      setActiveFilter(1);
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenBranch = (item) => {
    if (activeFilter === 2) {
      setActiveFilter(0);
    } else {
      setActiveFilter(2);
    }
    setOpenBranch(true);
  };
  const handleCloseBranch = () => {
    setOpenBranch(false);
  };

  const handleRent = () => {
    if (activeFilter === 3) {
      setActiveFilter(0);
    } else {
      setActiveFilter(3);
      const filtered = listCar.filter((car) => car.required_rent === true);
      setFilteredCars(filtered.length > 0 ? filtered : []);
    }
  };
  const handleClickOpenMotor = (item) => {
    if (activeFilter === 4) {
      setActiveFilter(0);
    } else {
      setActiveFilter(4);
    }
    setOpenMotor(true);
  };
  const handleCloseMotor = () => {
    setOpenMotor(false);
  };
  const handleElectric = () => {
    if (activeFilter === 5) {
      setActiveFilter(0);
    } else {
      setActiveFilter(5);
    }
  };
  const handlePhysic = () => {
    if (activeFilter === 6) {
      setActiveFilter(0);
    } else {
      setActiveFilter(6);
    }
  };
  const handleClickOpenMoney = (item) => {
    if (activeFilter === 5) {
      setActiveFilter(0);
    } else {
      setActiveFilter(5);
    }
    setOpenMoney(true);
  };
  const handleCloseMoney = () => {
    setOpenMoney(false);
  };
  const calculate = (price) => {
    return price / 1000;
  };
  // =========================handleBranch=======================================
  const handleFilterBranch = (item) => {
    if (item === "all") {
      setFilteredCars(null);
    } else {
      const filtered = allvehicle.result.filter(
        (car) => car.make.toUpperCase() === item
      );
      setFilteredCars(filtered.length > 0 ? filtered : []);
    }
  };
  const handleFilterTypeCar = (item) => {
    const filtered = listCar.filter((car) => car.countChairs === item);
    setFilteredCars(filtered.length > 0 ? filtered : []);
  };
  const handleUndo = (item) => {
    setFilteredCars(null);
    setActiveFilter(0);
  };
  const handleFilterMotor = (item) => {
    if (item === "all") {
      setFilteredCars(null);
    } else {
      const filtered = listCar.filter((car) => car.motor === item);
      setFilteredCars(filtered.length > 0 ? filtered : []);
    }
  };
  const handleFilterMoney = (item) => {
    const filtered = listCar.filter((car) => car.price < item);
    setFilteredCars(filtered.length > 0 ? filtered : []);
  };
  console.log(filteredCars);

  return (
    <section className="car-page">
      {allvehicle === undefined ? (
        <div
          style={{
            minHeight: "calc(100vh - 160px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <section
            className="filter-container"
            issticky={isSticky}
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
              <div className="item" onClick={() => handleUndo()}>
                <FaUndoAlt />
              </div>
              <div
                className="item"
                style={{
                  border:
                    activeFilter === 1
                      ? "1px solid #00a550"
                      : "1px solid #c6c6c6",
                }}
                onClick={() => handleClickOpen()}
              >
                <FaCarSide />
                <span>Loại xe</span>
              </div>
              <div
                className="item"
                style={{
                  border:
                    activeFilter === 2
                      ? "1px solid #00a550"
                      : "1px solid #c6c6c6",
                }}
                onClick={() => handleClickOpenBranch()}
              >
                <FaRegWindowMaximize />
                <span>Hãng xe</span>
              </div>
              <div
                className="item"
                style={{
                  border:
                    activeFilter === 3
                      ? "1px solid #00a550"
                      : "1px solid #c6c6c6",
                }}
                onClick={() => handleRent()}
              >
                <FaMoneyBillAlt />
                <span>Miễn thuế chấp</span>
              </div>
              <div
                className="item"
                style={{
                  border:
                    activeFilter === 4
                      ? "1px solid #00a550"
                      : "1px solid #c6c6c6",
                }}
                onClick={() => handleClickOpenMotor()}
              >
                <FaCodeBranch />
                <span>Truyền động</span>
              </div>

              <div
                className="item"
                style={{
                  border:
                    activeFilter === 5
                      ? "1px solid #00a550"
                      : "1px solid #c6c6c6",
                }}
                onClick={() => handleClickOpenMoney()}
              >
                <MdAttachMoney />
                <span>Giá tiền</span>
              </div>
            </div>
          </section>
          <section className="container-body">
            {filteredCars === null ? (
              allvehicle.result.map((item, index) => {
                return (
                  <Link className="item" to={`/listcars/${item._id}`}>
                    <img alt="" src={item.image[0]} />
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        gap: "5px",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        {item.make} {item.model} {item.year}
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
                      {/* <p>{item.address.city}</p> */}
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
                          <span style={{ color: "#767676", fontSize: "13px" }}>
                            {item.rate}
                          </span>
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
                            1 chuyến
                          </span>
                        </div>
                      </div>
                      <div className="bottom-right">
                        <span style={{ color: "#5fcf86", fontWeight: "bold" }}>
                          {calculate(item.price)}K
                        </span>
                        <span>/ngày</span>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : filteredCars.length === 0 ? (
              <div className="no-data">Không có dữ liệu</div>
            ) : (
              filteredCars.map((item, index) => {
                return (
                  <Link className="item" to={`/listcars/${item.id}`}>
                    <img alt="" src={item.image[0]} />
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        gap: "5px",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        {item.make} {item.model} {item.year}
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
                      {/* <p>{item.address.city}</p> */}
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
                          <span style={{ color: "#767676", fontSize: "13px" }}>
                            {item.rate}
                          </span>
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
                            1 chuyến
                          </span>
                        </div>
                      </div>
                      <div className="bottom-right">
                        <span style={{ color: "#5fcf86", fontWeight: "bold" }}>
                          {calculate(item.price)}K
                        </span>
                        <span>/ngày</span>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </section>
          {/* ==========================================TOTAL CHAIR====================================================== */}
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
                    setSelectedCar(2);
                  } else {
                    setTypeCar(0);
                    setSelectedCar(0);
                  }
                }}
              >
                <FaCarSide
                  style={{
                    fontSize: "50px",
                    color: "GrayText",
                    fontWeight: "400",
                  }}
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
                    setSelectedCar(4);
                  } else {
                    setTypeCar(0);
                    setSelectedCar(0);
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
                    setSelectedCar(5);
                  } else {
                    setTypeCar(0);

                    setSelectedCar(0);
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
                    setSelectedCar(7);
                  } else {
                    setTypeCar(0);
                    setSelectedCar(0);
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
                onClick={() => handleFilterTypeCar(selectedCar)}
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

          {/* ===============================================BRANCH================================================================================= */}
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
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                padding: "0 20px 10px 20px",
              }}
              className="dialog-content"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: "10px",
                  gap: "10px",
                }}
              >
                <input
                  id="all"
                  type="radio"
                  value={"all"}
                  checked={selectedCar === "all"}
                  style={{
                    cursor: "pointer",
                  }}
                  onChange={() => setSelectedCar("all")}
                ></input>
                <label
                  htmlFor="all"
                  style={{
                    display: "flex",
                    gap: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  {/* <img
                src="https://n1-cstg.mioto.vn/m/vehicle-makes/Baic.png"
                alt=""
                style={{ height: "48px", width: "48px" }}
              /> */}
                  <span>Tất cả</span>
                </label>
              </div>
              {nameCar &&
                nameCar.map((item, index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: "10px",
                        gap: "10px",
                      }}
                    >
                      <input
                        value={item.name}
                        id={item.name}
                        type="radio"
                        checked={selectedCar === item.name.toUpperCase()}
                        style={{
                          cursor: "pointer",
                        }}
                        onChange={() => setSelectedCar(item.name.toUpperCase())}
                      ></input>
                      <label
                        htmlFor={item.name}
                        style={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={item.logo}
                          alt=""
                          style={{ height: "48px", width: "48px" }}
                        />
                        <span>{item.name}</span>
                      </label>
                    </div>
                  );
                })}
            </DialogContent>
            <DialogActions style={{ padding: "10px 20px" }}>
              <button
                onClick={() => handleFilterBranch(selectedCar)}
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
          {/* ====================================MOTOR===================================== */}
          <Dialog
            open={openMotor}
            onClose={handleCloseMotor}
            className="dialog-container"
            sx={{
              "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                width: "500px", /// edit here
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
              Truyền động
              <div
                onClick={handleCloseMotor}
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
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: "10px",
                padding: "0 20px 10px 20px",
              }}
              className="dialog-content"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "18px",
                }}
              >
                <input
                  type="radio"
                  id="all-motor"
                  name="motor-type"
                  value={"all"}
                  onChange={(e) => setSelectedCar("all")}
                ></input>
                <label htmlFor="all-motor" style={{ cursor: "pointer" }}>
                  Tất cả
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "18px",
                }}
              >
                <input
                  type="radio"
                  id="auto-motor"
                  name="motor-type"
                  value={"auto"}
                  onChange={(e) => setSelectedCar("Số tự động")}
                ></input>
                <label htmlFor="auto-motor" style={{ cursor: "pointer" }}>
                  Số tự động
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "18px",
                }}
              >
                <input
                  type="radio"
                  id="physic-motor"
                  value={"physic"}
                  name="motor-type"
                  onChange={(e) => setSelectedCar("Số sàn")}
                ></input>
                <label htmlFor="physic-motor" style={{ cursor: "pointer" }}>
                  Số sàn
                </label>
              </div>
            </DialogContent>
            <DialogActions style={{ padding: "10px 20px" }}>
              <button
                onClick={() => handleFilterMotor(selectedCar)}
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
          {/* ================================MONEY================================ */}
          <Dialog
            open={openMoney}
            onClose={handleCloseMoney}
            className="dialog-container"
            sx={{
              "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                width: "500px", /// edit here
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
              Giá tiền
              <div
                onClick={handleCloseMoney}
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
                display: "flex",
                flexDirection: "column",
                alignItems: "space-between",
                justifyContent: "center",
                gap: "10px",
                padding: "0 20px 10px 20px",
              }}
              className="dialog-content"
            >
              <input
                // value={selectedMoney}
                onChange={(e) => setSelectedCar(e.target.value)}
                type="range"
                id="vol"
                name="vol"
                min="300000"
                max="3000000"
                style={{
                  width: "100%",
                  cursor: "pointer",
                  padding: "10px 0",
                }}
              ></input>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span>Giá đang chọn : {calculate(selectedCar)}K</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span>Giá thấp nhất : 300K</span>
                <span>Giá cao nhất : 3000K</span>
              </div>
            </DialogContent>
            <DialogActions style={{ padding: "10px 20px" }}>
              <button
                onClick={() => handleFilterMoney(selectedCar)}
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
        </>
      )}
    </section>
  );
}

export default Cars;
