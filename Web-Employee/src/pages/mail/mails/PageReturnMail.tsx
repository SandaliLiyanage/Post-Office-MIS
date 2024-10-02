import {useEffect, useState} from 'react';
import { useUser } from '../../authentication/usercontext';
import axios from 'axios';

export default function ReturnMail() {
    const {user} = useUser();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null|string>(null);
    useEffect(() => {
        async function fetchMails() {
          try { 
            if(user){
            console.log(user?.token)
            const response = await axios.post('http://localhost:5000/mail/returnmail', 
              {postalCode: user.postalCode},
              {
                headers: {
                  Authorization: `Bearer ${user?.token}`, 
                },
              });
            console.log(response.data)

            };
          } catch (error) {
            setError('Failed to fetch bundles');
          } finally {
            setLoading(false);
          }
        }
        fetchMails();
      }, [user]);
  return (
    <div>
      
    </div>
  )

}
