const express = require("express");
const router = express.Router();
const fs = require("fs");

router.route("/").get((req, res) => {
  const allProduct = JSON.parse(
    fs.readFileSync("./data/dataCar.json", "utf-8")
  );
  const product = allProduct
    .map(
      (product) =>
        ` <img style="border-top:1px solid black;width:100%;height:100px;padding:20px;object-fit:contain" src="https://ik.imagekit.io/yidiElectro/${product.img}" width="100px" height="auto"/>
          <p style="border-top:1px solid black;width:100%;height:100%;padding:20px;">${product.brand}</p>
          <p style="border-top:1px solid black;width:100%;height:100%;padding:20px;">${product.name}</p>
          <p style="border-top:1px solid black;width:100%;height:100%;padding:20px;">${product.price}</p>
          <p style="border-top:1px solid black;width:100%;height:100%;padding:20px;">${product.productType}</p>
          <div style="border-top:1px solid black;display:flex;justify-content:center;align-items: center;">
            <button pathName="${product.name}" class="button-edit" style="background-color:dodgerblue;color:white;padding:16px 32px;border:none;cursor:pointer;border-radius:6px">Edit</button>
          </div>
          <div style="border-top:1px solid black;display:flex;justify-content:center;align-items: center;">
            <button pathName="${product.name}" class="button-delete" style="background-color:red;color:white;padding:16px 32px;border:none;cursor:pointer;border-radius:6px">Delete</button>
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

    a {
      color:white;
      text-decoration: none;
    }

    #carForm {
      display:none;
    }

    .text{
      display:none;
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
<body style="font-family:sans-serif">
  <div style="display:flex">
    <div style="width:200px;background-color:#343a40;padding:20px;">
      <button style="font-size:40px;font-weight:bold;width:120px;border:none;border-radius:10px;cursor:pointer;background-color:white;position:fixed;top:25px;left:30px">&larr;</button>
      <button id="button-reset" style="font-size:20px;font-weight:bold;width:120px;border:none;border-radius:10px;cursor:pointer;background-color:white;position:fixed;top:85px;left:30px">Reset</button>
    </div>
    <div style="width:100%">
      <div style="display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:20px;">
        <h2 style="padding:20px"></h2>
        <h2 style="padding:20px">Brand</h2>
        <h2 style="padding:20px">Name</h2>
        <h2 style="padding:20px">Price</h2>
        <h2 style="padding:20px">Product Type</h2>
        <h2 style="padding:20px"></h2>
        <div style="display:flex;justify-content:center;align-items: center;">
          <button id="button-add" style="background-color:green;color:white;padding:10px 20px;border:none;cursor:pointer;border-radius:6px;font-weight:bold;font-size:20px">+</button>
        </div>  
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr)">
        ${product}
      </div>
    </div>  
  </div>

  <p class="text">Không hỗ trợ màn hình nhỏ</p>

  <form id="carForm" style="width:100%;height:100vh;background-color:rgba(0,0,0,0.75);position:fixed;top:50%;left:50%;z-index:999;transform:translate(-50%,-50%);justify-content:center;align-items:center">
        <div id="divForm" style="width:400px;height:500px;background-color:white;padding:20px;border-radius:10px;overflow-y: scroll;">
          <div>
              <h4 style="margin-bottom:6px">Brand</h4>
              <input required name="brand" value="Tesla" type="radio"/> <span style="margin-right:30px">Tesla</span>
              <input required name="brand" value="Audi" type="radio"/> <span style="margin-right:30px">Audi</span>
              <input required name="brand" value="Porsche" type="radio"/> <span>Porsche</span>
          </div>
          <div>
              <h4 style="margin-bottom:6px;margin-top:12px;">Name</h4>
              <input required name="name" style="padding:3px 6px" type="text" placeholder="Model X">
          </div>
          <div>
              <h4 style="margin-bottom:6px;margin-top:12px;">Price</h4>
              <input required name="price" style="padding:3px 6px" type="number">
          </div>
          <div>
              <h4 style="margin-bottom:6px;margin-top:12px;">Price Range</h4>
              <select required name="priceRange" style="padding:3px 6px">
                  <option value="$100.000 - $199.999">$100.000 - $199.999</option>
                  <option value="$200.000 - $299.999">$200.000 - $299.999</option>
                  <option value="$300.000 - $399.999">$300.000 - $399.999</option>
                  <option value="$400.000 - $499.999">$400.000 - $499.999</option>
                  <option value="$500.000+">$500.000+</option>
              </select>
          </div>
          <div>
              <h4 style="margin-bottom:6px;margin-top:12px;">Image</h4>
              <input required name="img" style="padding:3px 6px" type="text">
          </div>
          <div>
              <h4 style="margin-bottom:6px;margin-top:12px;">Year</h4>
              <input required name="year" style="padding:3px 6px" type="number">
          </div>
          <div>
              <h4 style="margin-bottom:6px;margin-top:12px;">Energy</h4>
              <input required name="energy" style="padding:3px 6px;outline: none;cursor:not-allowed" value="Electric" readonly>
          </div>
          <div>
              <h4 style="margin-bottom:6px;margin-top:12px;">Speed</h4>
              <input required name="km" style="padding:3px 6px" type="number">
          </div>
          <div>
              <h4 style="margin-bottom:6px;margin-top:12px;">Mode</h4>
              <input required name="mode" style="padding:3px 6px;outline: none;cursor:not-allowed" value="Automatic" readonly>
          </div>
          <div>
              <h4 style="margin-bottom:6px;margin-top:12px;">Product type</h4>
              <input required name="productType" value="Luxury" type="radio"/> <span style="margin-right:30px">Luxury</span>
              <input required name="productType" value="Sports" type="radio"/> <span style="margin-right:30px">Sports</span>
              <input required name="productType" value="Family" type="radio"/> <span>Family</span>
          </div>
          <button id="submitButton" style="display:block;width:90px;padding:12px;border:none;background-color:dodgerblue;color:white;font-weight:bold;border-radius:6px;margin:20px auto;margin-bottom:0;cursor:pointer">Submit</button>
        </div>
      </form>

      <script>
        const carForm = document.getElementById('carForm');
        const divForm = document.getElementById('divForm');

        divForm.addEventListener('click', function(e) {
          e.stopPropagation();
        });

        carForm.addEventListener('click', function(e) {
          e.preventDefault();
          carForm.style.display = "none";
        });

        function summitForm(METHOD,pathName) {
          carForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            const path = pathName ? "/" + pathName : "";

            fetch('https://yidielectro-api-be.onrender.com/api/v1/cars' + path, {
                method: METHOD,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
        } 

        document.getElementById('button-add').addEventListener('click',function(e) {
          e.preventDefault();
          carForm.style.display = "flex";
          summitForm("POST");
        });

        document.querySelectorAll('.button-edit').forEach(item => {
          item.addEventListener('click',function(e) {
            e.preventDefault();
            const pathName = this.getAttribute('pathName');
            carForm.style.display = "flex";
            summitForm("PUT",pathName);
          })
        });

        document.querySelectorAll('.button-delete').forEach(item => {
          item.addEventListener('click',function(e) {
            e.preventDefault();
            const pathName = this.getAttribute('pathName');
            fetch('https://yidielectro-api-be.onrender.com/api/v1/cars/' + pathName, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
          })
        });

        document.getElementById('button-reset').addEventListener('click',function(e) {
          location.reload();
        });
        
      </script>
</body>
</html>
    `;
  res.status(200).send(html);
});

module.exports = router;
