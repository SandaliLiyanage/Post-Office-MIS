import { MailRepository } from "../repositeries/mailrepository";
import { MailType } from "@prisma/client";


class ReportService {
    
    mailrepository = new MailRepository()

    getReportData =async (startDate: Date, endDate: Date, type: String)=>{
        console.log(type,"typew")
        const response = await this.mailrepository.getMailCountByType(startDate, endDate)
        
        const chartDet: { [key: string]: { normal_mail: number; courier: number; registered_mail: number } } = {};
        response.forEach(response=>{
            const month = response.date.toLocaleString('default', { month: 'long' });
            const mails = response.mail
            if (!chartDet[month]) {
                chartDet[month] = { normal_mail: 0, courier: 0, registered_mail: 0 };
            }
            if(type == "Transaction_Count"){
            console.log("in transaction")
            mails.forEach(mail => {
                switch (mail.mailType) {
                    case MailType.NORMAL_MAIL: // Assuming MailType is an enum
                        chartDet[month].normal_mail++;
                        break;
                    case MailType.COURIER:
                        chartDet[month].courier++;
                        break;
                    case MailType.REGISTERED_MAIL:
                        chartDet[month].registered_mail++;
                        break;
                }
            })};
            if(type == "Revenue"){
                console.log("in revenue")
                mails.forEach(mail => {
                    switch (mail.mailType) {
                        case MailType.NORMAL_MAIL: 
                        chartDet[month].normal_mail= chartDet[month].normal_mail+ mail.price.toNumber();
                            console.log(mail.price.toNumber())
                            break;
                        case MailType.COURIER:
                            chartDet[month].courier = chartDet[month].courier+mail.price.toNumber();
                            console.log(mail.price.toNumber())
                            break;
                        case MailType.REGISTERED_MAIL:
                            chartDet[month].registered_mail = chartDet[month].registered_mail+mail.price.toNumber();
                            console.log(mail.price.toNumber())
                            console.log(chartDet[month].registered_mail)
                            break;
                    }
                })};
            return chartDet
        })
        const reportData = Object.entries(chartDet).map(([month, counts]) => ({
            month,
            ...counts
        }));
        console.log(reportData)
        console.log("hehe", chartDet)
        return reportData
    }
   

}
export default ReportService;