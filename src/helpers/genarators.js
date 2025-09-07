const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
const otpExpireTime = () => {
  const now = new Date();
  const threeMinutesLater = new Date(now.getTime() + 3 * 60 * 1000);
  console.log(threeMinutesLater)
    return threeMinutesLater.toLocaleString();
};

module.exports = {generateOTP , otpExpireTime}