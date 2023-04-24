import React, { useState } from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardActionArea, CardMedia } from "@mui/material";
import axios from "axios";
function Bao() {
  const [i, setI] = useState(1);
  const [selected, setSelected] = useState(null);

  axios.all([
    axios.get('https://api.github.com/users/mapbox'),
    axios.get('https://api.github.com/users/phantomjs')
  ])
  .then(responseArr => {
    //this will be executed only when all requests are complete
    console.log('Date created: ', responseArr[0].data.created_at);
    console.log('Date created: ', responseArr[1].data.created_at);
  });

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  return (
    <>
      <section
        style={{
          minHeight: "100vh",
          width: "100%",
          padding: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper sx={{ padding: "32px", minHeight: "100%" }}>
          <Grid container>
            <Grid style={{}} item xs={12} md={6}>
              <Grid
                style={{
                  // backgroundColor: "black",
                  padding: "30px",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <div style={{}} className="bao_test">
                  <span className="babaa">FPT.BI</span>
                </div>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300px"
                    image="https://images.unsplash.com/photo-1679996799366-7780298d013e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
                    alt="green iguana"
                  />
                </CardActionArea>
              </Grid>
            </Grid>
            <Grid style={{}} item xs={12} md={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  padding: "30px",
                  height: "100%",
                  gap: "5px",
                }}
              >
                <Grid container>
                  <Grid item xs={10} style={{}}>
                    <h2
                      className="bao111"
                      style={{
                        padding: "0 10px",
                        fontWeight: "900",
                      }}
                    >
                      FPT.BI
                    </h2>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{
                      boxSizing: "border-box",
                    }}
                  >
                    <p
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "orange",
                        borderRadius: "10px",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      New
                    </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid style={{ padding: "0 10px" }} item xs={6} md={6}>
                    <p>
                      {" "}
                      <span style={{ fontWeight: "500" }}>Ngày đăng </span>
                    </p>
                  </Grid>
                  <Grid style={{ textAlign: "right" }} item xs={6} md={6}>
                    <p>
                      {" "}
                      <span className="text-content">02.02.2023</span>
                    </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid style={{ padding: "0 10px" }} item xs={6} md={6}>
                    <p>
                      {" "}
                      <span style={{ fontWeight: "500" }}>Công nghệ </span>
                    </p>
                  </Grid>
                  <Grid style={{ textAlign: "right" }} item xs={6} md={6}>
                    <p>
                      {" "}
                      <span className="text-content">Java,typescript</span>
                    </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid style={{ padding: "0 10px" }} item xs={6} md={6}>
                    <p>
                      {" "}
                      <span style={{ fontWeight: "500" }}>Mã sản phẩm </span>
                    </p>
                  </Grid>
                  <Grid style={{ textAlign: "right" }} item xs={6} md={6}>
                    <p>
                      {" "}
                      <span className="text-content">Java,typescript</span>
                    </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid style={{ padding: "0 10px" }} item xs={6} md={6}>
                    <p>
                      {" "}
                      <span style={{ fontWeight: "500" }}>Nhóm sản phẩm </span>
                    </p>
                  </Grid>
                  <Grid style={{ textAlign: "right" }} item xs={6} md={6}>
                    <p>
                      {" "}
                      <span className="text-content">Java,typescript</span>
                    </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid style={{ padding: "0 10px" }} item xs={6} md={6}>
                    <p>
                      {" "}
                      <span style={{ fontWeight: "500" }}>Khách hàng </span>
                    </p>
                  </Grid>
                  <Grid style={{ textAlign: "right" }} item xs={6} md={6}>
                    <p>
                      {" "}
                      <span className="text-content">Java,typescript</span>
                    </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid style={{ padding: "0 10px" }} item xs={6} md={6}>
                    <p>
                      {" "}
                      <span style={{ fontWeight: "500" }}>Ghi chú </span>
                    </p>
                  </Grid>
                  <Grid style={{ textAlign: "right" }} item xs={6} md={6}>
                    <p>
                      {" "}
                      <span className="text-content">Java,typescript</span>
                    </p>
                  </Grid>
                </Grid>
                <Grid container className="expand-area">
                  <Grid style={{}} item xs={12}>
                    <div className="accordion-header" onClick={() => toggle(i)}>
                      <p style={{ fontWeight: "600" }}>Chi tiết</p>
                      <span>{selected === i ? "-" : "+"}</span>
                    </div>
                    <div
                      className={selected === i ? "content-show" : "contents"}
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </section>
    </>
  );
}

export default Bao;
