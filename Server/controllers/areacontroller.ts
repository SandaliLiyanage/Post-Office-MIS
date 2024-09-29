import {Request, Response} from "express"
import AreaRepository from "../repositeries/arearepository"

const arearepository = new AreaRepository()
const getAreaDet = async(req: Request, res: Response)=>{
    console.log("getkfdsfi", req.body)
    const {postalCode} = req.body
    const resp = await arearepository.getArea(postalCode)
    console.log(resp)
    return res.json(resp);
}
export {getAreaDet}