const express = require("express");
const router = express.Router();
const fs = require("fs");

const allProduct = JSON.parse(fs.readFileSync("./data/dataCar.json", "utf-8"));

router.route("/").get((req, res) => {
  const product = allProduct
    .map(
      (product) =>
        ` <img style="border-top:1px solid black;width:100%;height:100px;padding:20px;object-fit:contain" src="https://ik.imagekit.io/yidiElectro/${product.img}" width="100px" height="auto"/>
          <p style="border-top:1px solid black;width:100%;height:100%;padding:20px;">${product.brand}</p>
          <p style="border-top:1px solid black;width:100%;height:100%;padding:20px;">${product.name}</p>
          <p style="border-top:1px solid black;width:100%;height:100%;padding:20px;">${product.price}</p>
          <p style="border-top:1px solid black;width:100%;height:100%;padding:20px;">${product.productType}</p>
          <div style="border-top:1px solid black;display:flex;justify-content:center;align-items: center;">
            <button style="background-color:dodgerblue;color:white;padding:16px 32px;border:none;cursor:pointer;border-radius:6px">Edit</button>
          </div>
          <div style="border-top:1px solid black;display:flex;justify-content:center;align-items: center;">
            <button style="background-color:red;color:white;padding:16px 32px;border:none;cursor:pointer;border-radius:6px">Delete</button>
          </div>
        `
    )
    .join("");
  const html = ` 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    *{
      padding:0;
      margin:0;
      box-sizing:border-box;
    }
    @media (max-width:700px){
      body *{
        display:none !important;
      }
      body {
        height:100vh;
        background-color:black;
      }
      .text {
        display:block !important;
        color:white;
        font-weight:bold;
        font-size:20px;
        width:300px;
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
      }
    }
  </style>
</head>
<body style="font-family:sans-serif;padding:10px">
  <div style="display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:20px;">
    <h2 style="padding:20px"></h2>
    <h2 style="padding:20px">Brand</h2>
    <h2 style="padding:20px">Name</h2>
    <h2 style="padding:20px">Price</h2>
    <h2 style="padding:20px">Product Type</h2>
    <h2 style="padding:20px"></h2>
    <div style="display:flex;justify-content:center;align-items: center;">
      <button style="background-color:green;color:white;padding:10px 20px;border:none;cursor:pointer;border-radius:6px;font-weight:bold;font-size:20px">+</button>
    </div>  
  </div>
  <div style="display:grid;grid-template-columns:repeat(7,1fr)">
    ${product}
  </div>
  <p class="text">Không hỗ trợ màn hình nhỏ</p>
</body>
</html>
    `;
  res.status(200).send(html);
});

module.exports = router;
