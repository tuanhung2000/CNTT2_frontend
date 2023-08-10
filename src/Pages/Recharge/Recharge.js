import React, { useState } from "react";
import "./Recharge.scss";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Recharge = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cvv, setCvv] = useState("");
  const [money, setMoney] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const years = Array.from(
    { length: new Date().getFullYear() - 1990 + 1 },
    (_, index) => 1990 + index
  );
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };
  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };
  const handleChange = (e) => {
    const formattedValue = format(e.target.value);
    setCardNumber(formattedValue);
  };

  function format(value) {
    const v = value
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .substr(0, 16);
    const parts = [];

    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }

    return parts.join(" ");
  }

  const handleSubmit = (e) => {
    if (checkbox) {
      alert(money);
      navigate("/");
    }
  };
  const handleRecharge = (e) => {
    alert(
      "Name" +
        cardName +
        "\n" +
        "Number" +
        cardNumber +
        "\n" +
        "Cvv" +
        " " +
        cvv +
        "\n" +
        "Month" +
        " " +
        selectedMonth +
        " " +
        selectedYear
    );
  };
  return (
    <section className="recharge-page">
      <section className="recharge-container">
        <section className="recharge-body">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <FaArrowCircleLeft
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </div>
          <h2>Nạp tiền</h2>
          {!loading ? (
            <>
              <div className="input-container">
                <label htmlFor="card-number">Số thẻ</label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleChange}
                  maxLength="19"
                />
              </div>
              <div className="input-container">
                <label htmlFor="name">Tên chủ thẻ</label>
                <input
                  type="text"
                  id="name"
                  value={cardName}
                  onChange={(e) => {
                    setCardName(e.target.value);
                  }}
                ></input>
              </div>
              <div className="input-container-last">
                <div className="container-left">
                  <div className="first">
                    <label htmlFor="monthSelect">Ngày mở thẻ</label>
                    <select
                      id="monthSelect"
                      value={selectedMonth}
                      onChange={handleMonthChange}
                    >
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="first">
                    <label htmlFor="yearSelect" style={{ opacity: 0 }}>
                      Ngày mở thẻ
                    </label>
                    <select
                      id="yearSelect"
                      value={selectedYear}
                      onChange={handleYearChange}
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="input-container">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    maxLength="3"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => {
                      setCvv(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="container-button">
                <button onClick={handleSubmit}>Kiểm tra</button>
              </div>
            </>
          ) : (
            <>
              <div className="input-container">
                <label htmlFor="money">Nhập số tiền bạn muốn nạp</label>
                <input
                  type="text" // Use type="text" to allow formatting
                  id="money"
                  value={money}
                  onChange={(e) => setMoney(e.target.value)}
                />
              </div>
              <div style={{ width: "100%", display: "flex", gap: "5px" }}>
                <p>
                  <input
                    type="checkbox"
                    style={{ cursor: "pointer", marginRight: "5px" }}
                    value={checkbox}
                    onChange={(e) => {
                      if (checkbox) {
                        setCheckbox(false);
                      } else {
                        setCheckbox(true);
                      }
                    }}
                  ></input>
                  Tôi xác nhận và đồng ý thực hiện giao dịch nạp tiền vào hệ
                  thống Micar. Nhấn nút xác nhận hoặc tiến hành thanh toán, tôi
                  chấp nhận các điều khoản và điều kiện liên quan. Thông tin
                  cung cấp là chính xác và tôi đã đọc, hiểu rõ trước khi giao
                  dịch.
                </p>
              </div>
              <div className="container-button">
                <button onClick={handleSubmit}>Nạp tiền</button>
              </div>
            </>
          )}
        </section>
      </section>
    </section>
  );
};

export default Recharge;
