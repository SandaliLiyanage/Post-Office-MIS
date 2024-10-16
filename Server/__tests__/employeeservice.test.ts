import EmployeeManagementService from '../services/employeemanagementservice';
import { EmployeeRepository } from '../repositeries/employeerepository';
import LeaveRepository from '../repositeries/leaverepository';

jest.mock('../../repositeries/employeerepository');  // Mock the EmployeeRepository

describe('EmployeeService', () => {
    let employeeService: EmployeeManagementService;
    let employeeRepository: jest.Mocked<EmployeeRepository>;
    let leaveRepository: jest.Mocked<LeaveRepository>;
    beforeEach(() => {
        employeeRepository = new EmployeeRepository() as jest.Mocked<EmployeeRepository>;
        leaveRepository = new LeaveRepository() as jest.Mocked<LeaveRepository>;
        employeeService = new EmployeeManagementService(employeeRepository, leaveRepository);
    });

    it('should return true if employee exists', async () => {
        // Mock the findUserbyID method to return a non-null value
        employeeRepository.findUserbyID.mockResolvedValue({employeeID: '123', password: 'password4', postalCode: '10120', employeeName: 'Sandali', email: 'dkflsdifoeer', telephone: '0485945945', role: 'POSTMAN'});

        const result = await employeeService.validateEmployeeID('123');

        expect(result).toBe(true);
        expect(employeeRepository.findUserbyID).toHaveBeenCalledWith('123');
    });

    it('should return false if employee does not exist', async () => {
        // Mock the findUserbyID method to return null
        employeeRepository.findUserbyID.mockResolvedValue(null);

        const result = await employeeService.validateEmployeeID('123');

        expect(result).toBe(false);
        expect(employeeRepository.findUserbyID).toHaveBeenCalledWith('123');
    });

    it('should return false if an error occurs', async () => {
        // Mock the findUserbyID method to throw an error
        employeeRepository.findUserbyID.mockRejectedValue(new Error('Database error'));

        const result = await employeeService.validateEmployeeID('123');

        expect(result).toBe(false);
        expect(employeeRepository.findUserbyID).toHaveBeenCalledWith('123');
    });
});