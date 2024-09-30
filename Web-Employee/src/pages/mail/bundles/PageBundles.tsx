import {IBundle, columns} from './columnsbundles';
import {DataTable} from './datatablebundles';
import { useUser } from '../../authentication/usercontext';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { Input } from '../../../components/ui/input';

export default function Bundle() {
  const {user, removeUser} = useUser();
  const [bundle, setBundle] = useState<IBundle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null|string>(null);
  axios.defaults.headers.common['Authorization'] = `Bearer ${user?.token}`
  
  useEffect(() => {
    async function fetchBundles() {
      try { 
        if(user != null){
        console.log(user.token)
        console.log(user.postalCode, "user")
        const response = await axios.post('http://localhost:5000/mail/bundles', 
          {postalCode: user.postalCode});
        console.log(response.data)
        setBundle(response.data);}
      } catch (error) {
        setError('Failed to fetch bundles');
      } finally {
        setLoading(false);
      }
    }
    fetchBundles();
  }, [user]);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="font-bold top-16 pt-8 pb-8 mt-16 flex justify-between ">
        <p className="text-xl font-bold">Bundles</p>
        <div className='flex flex-end gap-2 '>
        <Input type="email" placeholder="Search Bundle"className='w-50'  />
        </div>
    </div>
    <div className="flex flex-col space-y-4 bg-white border-0">
      <DataTable columns={columns} data={bundle} />
      </div>
    </div>
  )
}