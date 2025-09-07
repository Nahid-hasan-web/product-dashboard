const otpTemplate = (otp) => {
return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Verification</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f7fa;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border: 1px solid #e3e7ec;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header h1 {
      color: #2a7de1;
      font-size: 24px;
      margin-bottom: 10px;
    }
    .otp-box {
      background-color: #eaf2fb;
      border: 1px dashed #2a7de1;
      border-radius: 6px;
      padding: 15px;
      text-align: center;
      font-size: 32px;
      letter-spacing: 6px;
      color: #2a7de1;
      font-weight: bold;
      margin: 20px 0;
    }
    .footer {
      margin-top: 30px;
      font-size: 13px;
      color: #777;
      text-align: center;
    }
    .info-text {
      font-size: 16px;
      line-height: 1.5;
      margin: 10px 0;
      text-align: center;
    }
      h2{
        color:balck
      }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>OTP Verification</h1>
    </div>
    <h2 class="info-text">
      Your One-Time Password (OTP) for email verification is below. Please use it to complete your verification. The code is valid for the next <strong>3 minutes</strong>.
    </h2>
    <div class="otp-box">
      ${otp}
    </div>
    <h2 class="info-text">
      If you didn’t request this, you can safely ignore this email.
    </h2>
    <h2 class="footer">
      &copy; 2025 Your Company. All rights reserved.
    </h2>
  </div>
</body>
</html>
`
}

module.exports = otpTemplate