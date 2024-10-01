import {Request, Response} from "express"
import AreaRepository from "../repositeries/arearepository"

const arearepository = new AreaRepository()
const getAreaDet = async(req: Request, res: Response)=>{
    console.log("getkfdsfi", req.body)
    const {postalCode} = req.body
    const resp = await arearepository.getArea(postalCode)
    if (resp){
        // for (let areas of resp) {
        //     if (areas.areaName )
        // }
    }
    
    console.log(resp)
    return res.json(resp);
}
export {getAreaDet}