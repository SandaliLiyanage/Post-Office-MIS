import {OTPService} from "../services/otpservice";
import OTPRepository from "../repositeries/otprepository";
import { EmailService } from "../services/emailservice";
import { EmployeeRepository } from "../repositeries/employeerepository";

jest.mock("../../repositeries/otprepository");
jest.mock("../../services/emailservice");

describe("OTPService", () => {
    let otpService: OTPService;
    let otpRepository: jest.Mocked<OTPRepository>;
    let emailService: jest.Mocked<EmailService>;
    let employeeaRepository: jest.Mocked<EmployeeRepository>;
    beforeEach(() => {
        employeeaRepository = new EmployeeRepository() as jest.Mocked<EmployeeRepository>;
        otpRepository = new OTPRepository() as jest.Mocked<OTPRepository>;
        emailService = new EmailService(employeeaRepository) as jest.Mocked<EmailService>;
        otpService = new OTPService(otpRepository, emailService);
    });

    describe("generateOTP", () => {
        it("should generate a 6-digit OTP and send it via email", async () => {
            const employeeID = "123";
            otpRepository.insertOTP.mockResolvedValue();
            emailService.sendEmail.mockResolvedValue("sending mail");

            const otp = await otpService.generateOTP(employeeID);

            expect(otp).toHaveLength(6);
            expect(otpRepository.insertOTP).toHaveBeenCalledWith(employeeID, otp);
            expect(emailService.sendEmail).toHaveBeenCalledWith(otp, employeeID);
        });
    });

    describe("sendOTP", () => {
        it("should send OTP via email", async () => {
            const otp = "123456";
            const employeeID = "123";
            emailService.sendEmail.mockResolvedValue("sending mail");

            await otpService.sendOTP(otp, employeeID);

            expect(emailService.sendEmail).toHaveBeenCalledWith(otp, employeeID);
        });
    });

    describe("validateOTP", () => {
        it("should return 'valid' if OTP matches", async () => {
            const employeeID = "123";
            const time = new Date();
            const otp = "123456";
            otpRepository.getOTP.mockResolvedValue(otp);

            const result = await otpService.validateOTP(employeeID, time, otp);

            expect(result).toBe("valid");
        });

        it("should return 'not valid' if OTP does not match", async () => {
            const employeeID = "123";
            const time = new Date();
            const otp = "123456";
            otpRepository.getOTP.mockResolvedValue("654321");

            const result = await otpService.validateOTP(employeeID, time, otp);

            expect(result).toBe("not valid");
        });
    });
});