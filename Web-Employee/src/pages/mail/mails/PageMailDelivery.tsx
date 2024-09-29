import { useState, useEffect } from "react";
import axios from 'axios';
import { useUser } from '../../authentication/usercontext';

export default function MailDelivery() {
    const {user} = useUser();
    const [areaDet, setAreaDet] = useState<null|string[]>(null);

  useEffect(()=>{
    const fetchPostmanAssignments = async()=>{
        console.log("he")
        try{
            if(user){
            console.log("he")
            const response = await axios.post('http://localhost:5000/delivery/areaDet',
                {postalCode: user.postalCode},
                {
                    headers: {
                      Authorization: `Bearer ${user?.token}`, 
                    },
                  }
            )
            console.log(response)
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
    {
        // areaDet && areaDet.map((area, index)=>(
        //     <div> 
        //         <p>dhfoaihfdd</p>
        //     </div>
        // ))
    }
 </div>
  )
}
