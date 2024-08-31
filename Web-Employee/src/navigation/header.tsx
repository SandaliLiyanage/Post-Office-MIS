import {useUser} from "../pages/authentication/usercontext"
export default function Nav() {
  const {user} = useUser()
 

  return (
    <div className = 'fixed top-0 w-full z-10'>
      <nav className=' h-16 bg-slate-700' >
      <div className="flex justify-between">
      <div className="p-4 flex items-center ">
      <p className="text-xl text-white">Post-Office-{user?.postOfficeName}</p>
      </div>
      </div>
      </nav>
    </div>
  )
}
