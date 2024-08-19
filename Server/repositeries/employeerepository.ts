import {Prisma, PrismaClient, Employee} from "@prisma/client"
const prisma = new PrismaClient();

class EmployeeRepository {
    private static instance: EmployeeRepository;
    static getInstance(): EmployeeRepository{
        if(!EmployeeRepository.instance){
            EmployeeRepository.instance = new EmployeeRepository();
        }
        return EmployeeRepository.instance;
    }

    async getPasswordfromDB(username: string): Promise<string>{
        let password = ("postmaster2")
        console.log(password);
        return password;
    }

    async registerUser(userName: string, hashedPassword: string): Promise<Employee | null> {
        try {
            const res = await prisma.employee.create({
                data: {
                    employee_id: userName,
                    password: hashedPassword,
                },
            });
            return res;
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    }
}
export {EmployeeRepository}


