import {Employee, columns} from './columnsemp';
import {DataTable} from './datatableemp';
import { useUser } from '../authentication/usercontext';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
export default function EmployeeRecords() {
  const {user} = useUser();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null|string>(null);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        console.log(user?.token)
        const response = await axios.post('http://localhost:5000/employee/employeeRecords', 
          user?.postalCode,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`, 
            },
          });
        setEmployees(response.data);
      } catch (error) {
        setError('Failed to fetch employees');
      } finally {
        setLoading(false);
      }
    }
    fetchEmployees();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
        <p className="text-xl">Employee Records</p>
        <div className='flex flex-end gap-2 '>
        <Input type="email" placeholder="Search Employee"className='w-50'  />
        <Button className="bg-slate-600">Add Employee</Button>
        </div>
    </div>
    <div className="flex flex-col space-y-4 bg-white border-0">
      <DataTable columns={columns} data={employees} />
      </div>
    </div>
  )
}