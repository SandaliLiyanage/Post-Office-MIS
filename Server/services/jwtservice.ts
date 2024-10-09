import jwt from "jsonwebtoken";


const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";

class JwtService{
  sign(payload: any): string {
    console.log("in jwt service")
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    console.log(token)
    return token
  }

  verify(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, SECRET_KEY);
  }
}

export default JwtService;
