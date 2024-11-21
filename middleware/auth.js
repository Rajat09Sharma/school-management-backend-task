const jwt=require("jsonwebtoken");
const secretKey="neinaSchoolMangementtaskbyRajATSHARMA@#$5%%0900)()()../"

async function isAuth(req,res,next) {
    const bearer=req.headers['authorization'];
    // console.log(bearer);
    
    if(!bearer){
        return res.status(401).json({eroorMessage:"Please login."});
    }
    const token=bearer.split(" ")[1];
    console.log("token",token);
    try {
        const authData= await jwt.verify(token,secretKey);
        console.log(authData);
        next();
    } catch (error) {
        console.log("auth-error-",error);
        res.status(401).send("Invalid token."); 
    }
}

module.exports={
    isAuth
}