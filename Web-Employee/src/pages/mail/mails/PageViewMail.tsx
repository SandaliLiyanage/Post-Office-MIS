import {IMail, columns} from './columnsmail';
import { DataTable } from './datatablemail';
import { useUser } from '../../authentication/usercontext';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { Input } from '../../../components/ui/input';

export default function Mails() {
  const {user} = useUser();
  const [mail, setMail] = useState<IMail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null|string>(null);

useEffect(() => {
    async function fetchMails() {
      try { 
        if(user){
        console.log(user?.token)
        const response = await axios.post('http://localhost:5000/mail/viewmails', 
          {postalCode: user.postalCode},
          {
            headers: {
              Authorization: `Bearer ${user?.token}`, 
            },
          });
        console.log(response.data)
        setMail(response.data)};
      } catch (error) {
        setError('Failed to fetch bundles');
      } finally {
        setLoading(false);
      }
    }
    fetchMails();
  }, [user]);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
        <p className="text-xl font-bold">Mail</p>
        <div className='flex flex-end gap-2 '>
        <Input type="email" placeholder="Search Mail by ID"className='w-50'  />
        </div>
    </div>
    <div className="flex flex-col space-y-4 bg-white border-0">
      <DataTable columns={columns} data={mail} />
      </div>
    </div>
  )
}