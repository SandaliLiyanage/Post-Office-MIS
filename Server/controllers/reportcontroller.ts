import ReportService from '../services/reportservice'
import { Request, Response } from 'express';
import { MailType } from '@prisma/client';

const reportService = new ReportService();

const ReportData = async (req: Request, res: Response) => {
    console.log("in report")
    const {startDate, endDate, type} = req.body;
    const result = await reportService.getReportData(startDate,endDate,type)
    console.log("in if. mail data", result)
    return res.json(result)
    
}

export {ReportData}