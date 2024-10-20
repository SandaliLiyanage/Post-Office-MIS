import {Leave, columns} from './columnsleaves';
import {DataTable} from './dataleaves';
import { useUser } from '../authentication/usercontext';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { IP } from '../../../config';

export default function PageViewLeaves() {
  const {removeUser, user} = useUser()
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null|string>(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchEmployees() {
      try {
        if(user){
        console.log(user, "token")
        const response = await axios.post(`http://${IP}/employee/getLeaves`, 
          {postalCode: user.postalCode},
          {
            headers: {
              Authorization: `Bearer ${user.token}`, 
            },
          });
        setLeaves(response.data);
         console.log(response.data, "data")}
      } catch (error) {
        setError('Failed to fetch employees');
      } finally {
        setLoading(false);
      }
    }
    fetchEmployees();
  }, [user]);
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }
    

  return (
    <div className="pl-8 pr-8 ml-60 min-h-screen flex-col bg-stone-300 bg-opacity-15">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
        <p className="text-xl font-bold">Employee Accounts</p>
    </div>
    <div className="flex flex-col space-y-4 border-0">
      <DataTable columns={columns} data={leaves} />
      </div>
    </div>
  )
}