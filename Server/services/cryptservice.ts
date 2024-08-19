import bcrypt from 'bcryptjs';

class BCryptService{
    async hashPassword(password: string): Promise<string>{
        return bcrypt.hash(password, 10);
    }           
    async comparePassword(password: string, hash: string): Promise<boolean>{
        console.log("in comparePassword")
        return bcrypt.compare(password, hash);
    }
}
export default BCryptService;
