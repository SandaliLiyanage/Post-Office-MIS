import {useUser} from "../pages/authentication/usercontext"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"
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
        <Button onClick={handleClick} className="mt-3 pt-1 pb-1 mr-5 bg-slate-800 rounded-full text-white border border-white"  variant="outline">{user?.role}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-blue-200 bg-opacity-90 mr-5">
        <div className="grid gap-4 ">
          <div className="space-y-2 ">
            <h4 className="font-medium leading-none flex justify-center">{user?.name}</h4>
            <p className="text-sm flex justify-center text-black">
              {user?.email}
            </p>
            <p className="text-sm flex justify-center text-black">
              {user?.role.toLowerCase()}
              </p>
          </div>
          <div className="grid gap-2">
          
              <Button className="rounded-full text-white border border-white" onClick={()=> {{removeUser}; navigate('/')}}  >Logout</Button>
              <Button className="rounded-full text-white border border-white">Change Password</Button>
            </div>      
          </div>
      </PopoverContent>
    </Popover>
    </div>
  )
}
