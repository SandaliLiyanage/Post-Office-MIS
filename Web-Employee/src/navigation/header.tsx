import {useUser} from "../pages/authentication/usercontext"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"
// import logo from '../assets/logo.png';

export default function Nav() {


  const {removeUser, user} = useUser()
  const navigate = useNavigate()

  function handleClick(){
    console.log("user iss", user)
  }
  return (
    <div className = 'fixed top-0 w-full z-10 bg-slate-800 h-16 flex justify-between'>
      <div className="p-4 flex justify-start">

      <p className="text-xl text-white">Post-Office-{user?.postOfficeName}</p>
      </div>
      <Popover>
      <PopoverTrigger asChild>
        <Button onClick={handleClick} className="mt-3 pt-1 pb-1 mr-5 bg-slate-800 rounded-full text-white border border-white hover:bg-slate-600 hover:text-white"  variant="outline">{user?.role}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-slate-700 border-none border mr-5">
        <div className="grid gap-4 ">
          <div className="space-y-2 ">
          <h4 className="font-medium leading-none flex justify-center text-white">You are logged in as: {user?.name}</h4>
            <p className="text-sm flex justify-center text-white">
              {user?.email}
            </p>
            <p className="text-sm flex justify-center text-white">
              {user?.role.toLocaleLowerCase()}
              </p>
          </div>
          <div className="grid gap-2">
          
              <Button className=" bg-blue-200 text-black hover:text-white" onClick={()=> {{removeUser}; navigate('/')}}  >Logout</Button>
              <Button className=" text-white ">Change Password</Button>
            </div>      
          </div>
      </PopoverContent>
    </Popover>
    </div>
  )
}
