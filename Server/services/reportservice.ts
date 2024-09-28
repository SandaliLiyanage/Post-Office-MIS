import { MailRepository } from "../repositeries/mailrepository";
import { MailType } from "@prisma/client";


class ReportService {
    
    mailrepository = new MailRepository()

    getReportData =async (startDate: Date, endDate: Date, type: MailType)=>{
        console.log(type,"typew")
        const response = await this.mailrepository.getMailCountByType(type, startDate, endDate)
        const mailCounts: { [key: string]: { normal_mail: number; courier: number; registered_mail: number } } = {};
        response.forEach(response=>{
            const month = response.date.toLocaleString('default', { month: 'long' });
            const mails = response.mail
            if (!mailCounts[month]) {
                mailCounts[month] = { normal_mail: 0, courier: 0, registered_mail: 0 };
            }
            mails.forEach(mail => {
                switch (mail.mailType) {
                    case MailType.NORMAL_MAIL: // Assuming MailType is an enum
                        mailCounts[month].normal_mail++;
                        break;
                    case MailType.COURIER:
                        mailCounts[month].courier++;
                        break;
                    case MailType.REGISTERED_MAIL:
                        mailCounts[month].registered_mail++;
                        break;
                }
            });
            return mailCounts
        })
        const reportData = Object.entries(mailCounts).map(([month, counts]) => ({
            month,
            ...counts
        }));
        console.log(reportData)
        console.log("hehe", mailCounts)
        return reportData
    }
   

}
export default ReportService;