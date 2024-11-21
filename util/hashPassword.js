const bcrypt = require('bcrypt');
const saltRounds = 10;

async function generateHashPassword(password) {
    try {
        const hash=bcrypt.hash(password,saltRounds);
        if(!hash){
            throw new Error("Failed to generated hash password.")
        }
        return hash;
    } catch (error) {
        console.log("hash-pass-gen-error-",error.message);
    }
}

async function compareHashPassword(password,hash) {
    try {
        const result=bcrypt.compare(password,hash);
        return result;
    } catch (error) {
        console.log("hash-pass-compare-error-",error.message);
    }
}


module.exports={
    generateHashPassword,
    compareHashPassword
}
