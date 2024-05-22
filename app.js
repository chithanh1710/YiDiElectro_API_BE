const express = require("express");
const fs = require("fs");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
const html = fs.readFileSync("index.html", "utf-8");

app.use(cors()); // Use this to allow all origins

const dataCars = JSON.parse(fs.readFileSync("./data/dataCar.json", "utf-8"));
const dataUsers = JSON.parse(fs.readFileSync("./data/dataUser.json", "utf-8"));

app.get("/", (req, res) => {
  res.end(html);
});

app.get("/api/v1/cars", (req, res) => {
  res.status(200).json({
    status: "success",
    result: dataCars.length,
    data: dataCars,
  });
});

app.get("/api/v1/cars/:type", (req, res) => {
  const dataByType = dataCars.filter((item) =>
    item.img.includes(req.params.type)
  );
  res.status(200).json({
    status: "success",
    result: dataByType.length,
    data: dataByType,
  });
});

app.get("/api/v1/users", (req, res) => {
  res.status(200).json({
    status: "success",
    result: dataUsers.length,
    data: dataUsers,
  });
});

app.post("/send-email/:email", (req, res) => {
  const email = req.params.email;
  const { name } = req.query;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yidielectro@gmail.com",
      pass: "sepx eyhn fddn fvui",
    },
  });

  const mailOptions = {
    from: "yidielectro@gmail.com",
    to: email,
    subject: "Cảm ơn bạn đã đăng ký!",
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <h2 style="color: #FF5733;">Cảm ơn bạn đã đăng ký!</h2>
      <p>Chào bạn, ${name}</p>
      <p>Cảm ơn bạn đã đăng ký nhận thông tin từ YiDi Electro. Chúng tôi rất vui được có bạn đồng hành.</p>
      <p style="color: #555;">Chúng tôi sẽ gửi cho bạn những thông tin mới nhất về các mẫu xe, ưu đãi và các sự kiện đặc biệt. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua số điện thoại <strong>0123456789</strong>.</p>
      <p>Trân trọng,</p>
      <p><strong>Đội ngũ YiDi Electro</strong></p>
    </div>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).json({ message: "Email sent successfully" });
  });
});

module.exports = app;
