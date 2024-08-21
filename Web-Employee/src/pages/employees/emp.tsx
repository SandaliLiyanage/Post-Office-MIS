import {Employee, columns} from './columns';
import {DataTable} from './datatable';
import { useUser } from '../authentication/usercontext';
import axios from 'axios';
import {useEffect, useState} from 'react';
export default function EmployeeRecords() {
  const {user} = useUser();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null|string>(null);

  useEffect(() => {
    async function fetchEmployees() {
      try {
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
    </div>
    <div className="flex flex-col space-y-4">
      <DataTable columns={columns} data={employees} />
      </div>
    </div>
  )
}