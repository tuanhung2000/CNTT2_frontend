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
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              alignment: docx.AlignmentType.CENTER,
              children: [
                new docx.TextRun({
                  text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
                  size: 32,
                }),
              ],
            }),

            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              alignment: docx.AlignmentType.CENTER,
              children: [
                new docx.TextRun({
                  text: "Độc lập - Tự do - Hạnh phúc",
                  size: 30,
                  italics: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              alignment: docx.AlignmentType.CENTER,
              children: [
                new docx.TextRun({
                  break: 1,
                  text: "HỢP ĐỒNG THUÊ XE",
                  size: 32,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "Hôm nay, ngày ",
                  size: 26,
                  break: 1,
                }),
                new docx.TextRun({
                  text: new Date().toLocaleDateString("vi-VN"),
                  bold: true,
                  size: 26,
                }),
                new docx.TextRun({ text: ", tại ", size: 26 }),
                new docx.TextRun({
                  text: "địa chỉ thuê xe: Quảng Ngãi",
                  size: 26,
                }),
                new docx.TextRun({ text: ", giữa:", size: 26 }),
              ],
            }),

            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({ text: "Bên A: ", size: 26, bold: true }),
                new docx.TextRun({ text: "(Bên cho thuê)", size: 26 }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({ text: "- Tên: ", size: 26 }),
                new docx.TextRun({
                  text: "Cao Minh Bảo",
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({ text: "- Số điện thoại: ", size: 26 }),
                new docx.TextRun({
                  text: "043432424432",
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({ text: "Bên B: ", size: 26, bold: true }),
                new docx.TextRun({ text: "(Bên thuê xe)", size: 26 }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({ text: "- Tên: ", size: 26 }),
                new docx.TextRun({
                  text: "Cao Minh Bảo",
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({ text: "- Số điện thoại: ", size: 26 }),
                new docx.TextRun({
                  text: "043432424432",
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "Sau khi bàn bạc, thỏa thuận, hai bên thống nhất ký kết Hợp đồng thuê xe với các điều khoản như sau:",
                  size: 26,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "ĐIỀU 1:",
                  size: 26,
                  bold: true,
                  break: 1,
                }),
                new docx.TextRun({
                  text: " NỘI DUNG HỢP ĐỒNG",
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, //
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "Bên A đồng ý cho Bên B thuê phương tiện có thông tin như sau:",
                  size: 26,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "- Tên phương tiện: ",
                  size: 26,
                }),
                new docx.TextRun({
                  text: "Audi A3 2002",
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "- Biển số phương tiện: ",
                  size: 26,
                }),
                new docx.TextRun({
                  text: "76A4-32422",
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "- Số khung: ",
                  size: 26,
                }),
                new docx.TextRun({
                  text: "76A4-32422",
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "- Ngày bắt đầu thuê phương tiện: ",
                  size: 26,
                }),
                new docx.TextRun({
                  text: "76A4-32422",
                  size: 26,
                  bold: true,
                }),
              ],
            }),

            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              children: [
                new docx.TextRun({
                  text: "- Ngày kết thúc thuê phương tiện: ",
                  size: 26,
                }),
                new docx.TextRun({
                  text: "76A4-32422",
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "ĐIỀU 2:",
                  size: 26,
                  bold: true,
                  break: 1,
                }),
                new docx.TextRun({
                  text: " GIÁ TRỊ HỢP ĐỒNG",
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              children: [
                new docx.TextRun({
                  text: "- Tổng số tiền thuê phương tiện: ",
                  size: 26,
                }),
                new docx.TextRun({
                  text: "76A4-32422",
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              children: [
                new docx.TextRun({
                  text: "( Giá trên đã bao gồm thuế GTGT )",
                  size: 26,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "ĐIỀU 3:",
                  size: 26,
                  bold: true,
                  break: 1,
                }),
                new docx.TextRun({
                  text: " TRÁCH NHIỆM CỦA CÁC BÊN",
                  size: 26,
                  bold: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              children: [
                new docx.TextRun({
                  text: "3.1. Trách nhiệm của bên A:",
                  size: 26,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: "- Giao xe và toàn bộ giấy tờ liên quan đến xe ngay sau khi Hợp đồng có hiệu lực và Bên A đã thanh toán tiền thuê xe 01 tháng đầu tiên. Giấy tờ liên quan đến xe gồm: Giấy đăng ký xe, giấy kiểm định, giấy bảo hiểm xe.",
                  size: 26,
                  justified: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: "- Chịu trách nhiệm pháp lý về nguồn gốc và quyền sở hữu của xe.",
                  size: 26,
                  justified: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: "- Mua bảo hiểm xe và đăng kiểm xe cho các lần kế tiếp trong thời hạn hiệu lực của Hợp đồng.",
                  size: 26,
                  justified: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: "- Mua bảo hiểm xe và đăng kiểm xe cho các lần kế tiếp trong thời hạn hiệu lực của Hợp đồng.",
                  size: 26,
                  justified: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              children: [
                new docx.TextRun({
                  text: "3.2. Trách nhiệm của bên B :",
                  size: 26,
                  break: 1,
                }),
              ],
            }),

            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: "- Thanh toán tiền thuê xe cho Bên A đúng hạn.",
                  size: 26,
                  justified: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: "- Chịu toàn bộ chi phí bảo dưỡng xe theo định kỳ",
                  size: 26,
                  justified: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: "- Chịu toàn bộ chi phí xăng dầu khi sử dụng xe.",
                  size: 26,
                  justified: true,
                }),
              ],
            }),
            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20, // Convert to twips
                after: 3.6 * 20, // Convert to twips
              },
              children: [
                new docx.TextRun({
                  text: "ĐIỀU 4:",
                  size: 26,
                  bold: true,
                  break: 1,
                }),
                new docx.TextRun({
                  text: " HIỆU LỰC HỢP ĐỒNG",
                  size: 26,
                  bold: true,
                }),
              ],
            }),

            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: "- Hợp đồng có giá trị kể từ ngày ….. đến hết ngày …..",
                  size: 26,
                  justified: true,
                }),
              ],
            }),

            new docx.Paragraph({
              spacing: {
                before: 7.2 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.JUSTIFIED,
              children: [
                new docx.TextRun({
                  text: "- Nếu một trong hai Bên, bên nào muốn chấm dứt Hợp đồng trước thời hạn thì phải thông báo cho Bên kia trươc ít nhất 01 tháng.",
                  size: 26,
                  justified: true,
                }),
              ],
            }),

            new docx.Paragraph({
              spacing: {
                before: 10 * 20,
                after: 3.6 * 20,
              },
              alignment: docx.AlignmentType.CENTER,
              children: [
                new docx.TextRun({ text: `${benAChuKy}`, size: 26 }),
                new docx.TextRun(" ".repeat(30)), // Khoảng trống giữa hai chữ ký
                new docx.TextRun({ text: `${benBChuKy}`, size: 26 }),
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
