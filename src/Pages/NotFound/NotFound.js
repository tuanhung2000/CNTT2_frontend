import React from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/color";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import * as docx from "docx";

function NotFound() {
  function generate() {
    const benAChuKy = "Chữ ký của Bên A";
    const benBChuKy = "Chữ ký của Bên B";
    const doc = new docx.Document({
      sections: [
        {
          properties: {},
          children: [
            new docx.Paragraph({
              alignment: docx.AlignmentType.CENTER,
              children: [
                new docx.TextRun("HỢP ĐỒNG THUÊ XE", {
                  bold: true,
                  size: 32,
                }),
              ],
            }),
            new docx.Paragraph({
              children: [
                new docx.TextRun("Hôm nay, ngày "),
                new docx.TextRun({
                  text: new Date().toLocaleDateString("vi-VN"),
                  bold: true,
                }),
                new docx.TextRun(", tại "),
                new docx.TextRun("địa chỉ thuê xe"),
                new docx.TextRun(", giữa:"),
              ],
            }),
            new docx.Paragraph({
              children: [
                new docx.TextRun("Bên A:"),
                new docx.TextRun(" ... "), // Thay thế bằng thông tin của Bên A
              ],
            }),
            new docx.Paragraph({
              children: [
                new docx.TextRun("Bên B:"),
                new docx.TextRun(" ... "), // Thay thế bằng thông tin của Bên B
              ],
            }),
            new docx.Paragraph({
              children: [
                new docx.TextRun(
                  "Bên A đồng ý cho Bên B thuê xe có thông tin chi tiết như sau:"
                ),
              ],
            }),
            new docx.Paragraph({
              children: [
                new docx.TextRun("Loại xe:"),
                new docx.TextRun(" ... "), // Thay thế bằng loại xe
              ],
            }),
            new docx.Paragraph({
              children: [
                new docx.TextRun("Biển số xe:"),
                new docx.TextRun(" ... "), // Thay thế bằng biển số xe
              ],
            }),
            new docx.Paragraph({
              children: [
                new docx.TextRun("Số khung:"),
                new docx.TextRun(" ... "), // Thay thế bằng số khung
              ],
            }),
            new docx.Paragraph({
              children: [
                new docx.TextRun("Số tiền thuê xe:"),
                new docx.TextRun(" ... "), // Thay thế bằng số tiền thuê xe
              ],
            }),
            // Thêm các mục khác của hợp đồng...
            new docx.Paragraph({
              children: [new docx.TextRun("Chúng tôi ký tên như sau:")],
            }),
            new docx.Paragraph({
              alignment: docx.AlignmentType.CENTER,
              children: [
                new docx.TextRun(`Bên A: ${benAChuKy}`),
                new docx.TextRun(" ".repeat(30)), // Khoảng trống giữa hai chữ ký
                new docx.TextRun(`Bên B: ${benBChuKy}`),
              ],
            }),
          ],
        },
      ],
    });

    // Xuất tệp DOCX
    docx.Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "hopdongthuexe.docx");
      console.log("Document created successfully");
    });
  }
  return (
    <NotFoundComponent>
      <h1 style={{ color: "white", fontWeight: "bold", fontSize: "100px" }}>
        4<span style={{ color: COLORS.main }}>0</span>4
      </h1>
      <h3 style={{ color: "white", fontWeight: "bold", fontSize: "50px" }}>
        Không tìm thấy trang
      </h3>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "white",
          backgroundColor: COLORS.main,
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Quay về trang chủ
      </Link>
      <button type="button" onClick={generate}>
        Xuất file
      </button>
    </NotFoundComponent>
  );
}
const NotFoundComponent = styled.section`
  min-height: 100vh;
  width: 100%;
  gap: 20px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export default NotFound;
