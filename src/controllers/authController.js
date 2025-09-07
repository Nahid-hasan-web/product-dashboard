const bcryptPassword = require("../helpers/bcrypt");
const { generateOTP, otpExpireTime } = require("../helpers/genarators");
const sendOtpmail = require("../helpers/mailSender");
const { emailRegex, passwordRegex } = require("../helpers/regex");
const authModel = require("../models/authModel");
const otpTemplate = require("../templates/otpTemplate");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// --------------------------------------------- registration controller -----------------------------------------
const registerController = async (req, res) => {
  try {
    // ----- getting data from the client
    const { userName, email, password } = req.body;

    // ----- validation of client data
    if (!userName) return res.status(404).send("user name required");
    if (!emailRegex.test(email))
      return res.status(404).send("email is not valid");
    if (!passwordRegex.test(password))
      return res.status(404).send("password is not valid");

    // ---- getting existing user info from the db
    const existUser = await authModel.findOne({ email });
    console.log(existUser);
    if (existUser) return res.status(401).send("User already exist");

    // ----- bcrypt palin passsword
    const bcryptPass = await bcryptPassword(password);

    // ----- otp genarator funciotn
    const otp = generateOTP();
    const otpexpiredAt = otpExpireTime();
    // ----- sending data to the db
    await new authModel({
      userName: userName.trim(),
      email: email.trim(),
      password: bcryptPass,
      otp,
      otpexpiredAt,
    })
      .save()
      .then(() => {
        sendOtpmail(email, "Account verification OTP", otpTemplate(otp));
      });

    res
      .status(201)
      .send("user registration succesfull and otp send to registerd email");
  } catch (err) {
    res.status(501).send("Internal Server Error");
  }
};

// --------------------------------------------- verify otp controller -----------------------------------------
const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    if (!otp) return res.send("otp required");

    const verifyOtp = await authModel.find({
      otp,
      otpexpiredAt: { $gt: Date.now() },
    });

    if (verifyOtp.length === 0)
      return res.status(401).send("verifecation time expired");

    verifyOtp[0].isverified = true;
    verifyOtp[0].otpexpiredAt = null;
    verifyOtp[0].otp = null;

    verifyOtp[0].save();
    res.status(200).send(verifyOtp);
  } catch (err) {
    res.status(501).send("Internal Server Error");
  }
};

// --------------------------------------------- resend otp controller -----------------------------------------
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(404).send("user email required");

    const existUser = await authModel.findOne({ email });

    if (!existUser) return res.status(404).send("email is not registered");

    // ----- otp genarator funciotn
    const otp = generateOTP();
    const otpexpiredAt = otpExpireTime();

    // ----- sending otp to email
    sendOtpmail(email, "Account verification OTP", otpTemplate(otp));

    existUser.otp = otp;
    existUser.otpexpiredAt = otpexpiredAt;
    existUser.isverified = false;

    existUser.save();

    res.status(200).send("otp verifecation send");
  } catch (err) {
    res.status(501).send("Internal Server Error");
  }
};

// --------------------------------------------- login controller -----------------------------------------
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!emailRegex.test(email))
      return res.status(404).send("email is not valid");
    if (!passwordRegex.test(password))
      return res.status(404).send("password is not valid");

    const existUser = await authModel.find({ email });
    if (!existUser) return res.status(404).send("user not found");
    // ------- check the password
    const checkPass = await bcrypt.compare(password, existUser[0].password);
    if (!checkPass) return res.status(401).send("Wrong password");

    if(existUser[0].isverified === false) return res.status(401).send('User Email is not Verified')
  
  // ---------------- reacte jwt token 
  const accessToken = jwt.sign({email:existUser[0].email} , process.env.jwt_secret , {expiresIn:'2m'})

     const userInfo = await authModel.find({ email }).select('-password')



    res.status(200).send({userInfo , accessToken});
  } catch (err) {
    res.status(501).send(`error ${err}`);
  }
};

// ---------------------------------------------- update profile -------------------------------------------
const updateProfileController  = (req,res)=>{
  res.send('this is update profile')
} 
// ---------------------------------------------- get current user  -----------------------------------------

const get_currect_user = async (req,res)=>{
  const {userId} = req.params

  const currentUserInfo  = await authModel.findOne({_id:userId}).select('-password -otp -otpexpiredAt -isverified')

  res.status(200).send(currentUserInfo)
}


module.exports = { registerController, loginController, verifyOtp, resendOtp ,updateProfileController , get_currect_user};
