import jwt from "jsonwebtoken";


const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";

class JwtService{
  sign(payload: any): string {
    console.log("in jwt service")
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  }

  verify(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, SECRET_KEY);
  }
}

export default JwtService;
