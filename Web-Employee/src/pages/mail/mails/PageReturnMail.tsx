import {useEffect, useState} from 'react';
import { useUser } from '../../authentication/usercontext';
import axios from 'axios';
import { DataTable } from './datatablemail';
import {IReturnMail, columns} from './columnsreturn';
import {IP} from '../../../../config';
export default function ReturnMail() {
    const {user} = useUser();
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<null|string>(null);
    const [returnMail, setReturnMail] = useState<IReturnMail[]>([]);
    useEffect(() => {
        async function fetchMails() {
          try { 
            if(user){
            console.log(user?.token)
            const response = await axios.post(`http://${IP}/mail/returnmail`, 
              {postalCode: user.postalCode},
              {
                headers: {
                  Authorization: `Bearer ${user?.token}`, 
                },
              });
            console.log(response.data)
            const returnMail: IReturnMail[] = []
            if(response){
              response.data.map((item: any) => {
                const iMail: IReturnMail = {
                  mailID: item.mailID.toString(),
                  customerName: item.transaction.customerName,
                  customerTelephone: item.transaction.customerTelephone,
                  customerAddressID: item.transaction.customerAddressID.toString(),
                };
                returnMail.push(iMail)
              }
            );
            console.log(returnMail, "return mail")
            setReturnMail(returnMail)
            }
            
            };
          } catch (error) {
            // setError('Failed to fetch bundles');
          } finally {
            // setLoading(false);
          }
        }
        fetchMails();
      }, [user]);
  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
        <p className="text-xl font-bold">Return Mail</p>
      </div>
      <div className="flex flex-col space-y-4 border-0">
      <DataTable columns={columns} data={returnMail}/>
      </div>
    </div>
  )

}
