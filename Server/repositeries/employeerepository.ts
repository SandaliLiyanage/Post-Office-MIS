import {Prisma, PrismaClient, Employee, Role} from "@prisma/client"
const prisma = new PrismaClient();

class EmployeeRepository {
    private static instance: EmployeeRepository;
    static getInstance(): EmployeeRepository{
        if(!EmployeeRepository.instance){
            EmployeeRepository.instance = new EmployeeRepository();
        }
        return EmployeeRepository.instance;
    }

    async findUserbyDB(username: string): Promise<Employee|null>{
        try {
            const res = await prisma.employee.findUnique({
                where: {
                    employeeID: username,
                },
            });
            console.log("employee queried", res) 
            return res;
        } catch (error) {
            console.error("Error getting password from DB:", error);
            throw error;
        }
    }
    async registerUser(userName: string, hashedPassword: string, postalCode: string, employeeName:string, email:string, telephone: string, role: Role): Promise<Employee | null> {
        try {
            const res = await prisma.employee.create({
                data: {
                    employeeID: userName,
                    postalCode: postalCode,
                    employeeName: employeeName,
                    email: email,
                    telephone: telephone,
                    role: role,
                    password: hashedPassword,
                },
            });
            return res;
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    }
    async getEmployees(postalCode: string): Promise<Employee[]> {
        try {
            const res = await prisma.employee.findMany({
                where:{
                    postalCode: postalCode,
                },
            });
            return res;
        } catch (error) {
            console.error("Error getting employees:", error);
            throw error;
        }
    }
}
export {EmployeeRepository}


