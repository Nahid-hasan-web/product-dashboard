const bcrypt = require('bcrypt');
const saltRounds = 10;
const bcryptPassword = async (password) => {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    
    
    return hashPassword
}

module.exports = bcryptPassword