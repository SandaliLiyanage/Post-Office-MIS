import { useState, useEffect } from "react";
import axios from 'axios';
import { useUser } from '../../authentication/usercontext';
import { Label } from "../../../components/ui/label";
interface AreaAssignments{
  area: string,
  employeeName: string,
  mailID: number[]


}
export default function MailDelivery() {
    const {user} = useUser();
    const [areaDet, setAreaDet] = useState<null|AreaAssignments[]>(null);

  useEffect(()=>{
    const fetchPostmanAssignments = async()=>{
        console.log("he")
        try{
            if(user){
            console.log("he")
            const response= await axios.post('http://localhost:5000/delivery/areaDet',
                {postalCode: user.postalCode},
                {
                    headers: {
                      Authorization: `Bearer ${user?.token}`, 
                    },
                  }
            )
            console.log(response)
            console.log(areaDet)
            setAreaDet(response.data)
        }}
        catch(error){
            throw(error)
        }
    }
    fetchPostmanAssignments()
  },[]);
  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
        <p className="text-xl font-bold">Mail and Area Assignments</p>
        <p></p>
    </div>
    <div className="grid: grid-cols-2">
    {
        areaDet !=null && areaDet.map((area)=>(
            <div> 
            <div className="bg-blue-200  w-1/2 m-5 p-5 rounded-sm">
            <div >
            <Label className="font-bold text-black">{area.area} <p className="text-slate-500 font-light text-sm">  </p></Label>
          </div>
          <div>
            <Label className="text-base">Assigned Postman: <p className="text-slate-500 font-light text-sm"> {area.employeeName}</p></Label>
          </div>
          <div>
          <Label className="text-base">Mail To be delivered:</Label>
          <div className="grid grid-cols-2">
            {
              area.mailID.map((ID, index)=>(
                <p className="text-slate-500 font-light text-sm 2" key={index}>  {ID}</p>
              ))
            }
          </div>
          </div>
          </div>
          
            </div>
        ))
    }
    </div>
 </div>
  )
}
