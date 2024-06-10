const nodemailer = require("nodemailer");

exports.sendEmail = (req, res) => {
  const email = req.params.email;
  const { name } = req.query;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yidielectro@gmail.com",
      pass: "sepx eyhn fddn fvui",
    },
  });

  let mailOptions;

  if (!name) {
    return fetch(`https://todoappbe-598e.onrender.com/user?email=${email}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Account not found");
        }
        return res.json();
      })
      .then((data) => {
        mailOptions = {
          from: "yidielectro@gmail.com",
          to: email,
          subject: "Quên mật khẩu",
          html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #FF5733;">Mật khẩu</h2>
          <p>${data.password}</p>
          `,
        };
        return transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            return res.status(500).send(err.message);
          }
          res.status(200).json({ message: "Password sent successfully" });
        });
      })
      .catch((err) => {
        throw new Error("Account not found");
      });
  } else {
    mailOptions = {
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
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).json({ message: "Email sent successfully" });
  });
};
