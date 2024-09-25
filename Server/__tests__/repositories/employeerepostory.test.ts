import prisma from "../../client";
import { EmployeeRepository } from "../../repositeries/employeerepository";
import { prismaMock } from '../../singleton'

jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => ({
            employee: {
                findUnique: jest.fn(),
            },
        })),
    };
});

describe('EmployeeRepository.findUserbyID', () => {
    const employeeRepository = EmployeeRepository.getInstance();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return an employee', async () => {
        const testEmployee = {
            employeeID: "1",
            password: "password3",
            postalCode: "10120",
            employeeName: "Kavya",
            email: "sandali@gmail.com",
            role: "SUPERVISOR",
            telephone: "0769445355",
        };

        (prismaMock.employee.findUnique as jest.Mock).mockResolvedValue(testEmployee);

        const result = await employeeRepository.findUserbyID('1');

        expect(prismaMock.employee.findUnique).toHaveBeenCalledWith({
            where: { employeeID: '1'},
        });

        expect(result).toEqual(testEmployee);
    });
});
