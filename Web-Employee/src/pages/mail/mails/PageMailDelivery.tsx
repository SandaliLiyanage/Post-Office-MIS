import { useState, useEffect } from "react";
import axios from 'axios';
import { useUser } from '../../authentication/usercontext';
import { Label } from "../../../components/ui/label";
import { Edit } from 'lucide-react';
import { Button } from "../../../components/ui/button";
interface AreaAssignments{
  area: string,
  employeeName: string,
  dict: { [mailID: number]: { address: string } }[]


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
  },[user]);
  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
        <div className="flex justify-start">
          <p className="text-xl font-bold">Mail and Area Assignments</p>
        </div>
      <div className="flex justify-end">
        <Button className="btn bg-white " variant="outline"  size="icon"><Edit color="black" size={18} className="hover:none"></Edit></Button>
      </div>
    </div>
    <div className=" ">
    {
        areaDet !=null && areaDet.map((area)=>(
            <div> 
            <div className="bg-blue-200 m-5 p-5 rounded-sm">
            <div className="flex justify-between">
              <div className="flex justify-start">
            <Label className="font-bold text-black">{area.area} <p className="text-slate-500 font-light text-sm">  </p></Label>
            </div>
          </div>
          <div>
            <Label className="text-base">Assigned Postman: {area.employeeName}</Label>
          </div>
          <div>
          <Label className="text-base">Mail To be delivered:</Label>
          <div className="grid grid-cols-2">
              {area.dict.map((item, index) => {
                // Extract the mail ID (key) and address
                const mailID = Number(Object.keys(item)[0]); // Get the mail ID
                const address = item[mailID].address; // Get the associated address

                return (
                  <p className="text-slate-500 font-light text-sm" key={index}>
                    Mail ID: {mailID}, Address: {address}
                  </p>
                );
              })}
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
