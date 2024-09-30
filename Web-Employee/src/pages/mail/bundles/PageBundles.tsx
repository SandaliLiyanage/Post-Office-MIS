import {IBundle, columnstoTransfer} from './columnsbundles';
import {DataTable} from './datatablebundles';
import { useUser } from '../../authentication/usercontext';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { Input } from '../../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {columnsforDelivery} from './columnsdelivery';

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
    <div className=''>
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Mail Bundles for Transfer</TabsTrigger>
        <TabsTrigger value="password">Mail Bundles for Delivery</TabsTrigger>
      </TabsList>
      <TabsContent value="account" ><div className='bg-white'><DataTable columns={columnstoTransfer} data={bundle} /></div></TabsContent>
      <TabsContent value="password"><div className='bg-white'><DataTable columns={columnsforDelivery} data={bundle} /></div></TabsContent>
    </Tabs>
    </div>
    <div className="flex flex-col space-y-4 bg-white border-0">
      </div>
    </div>
  )
}