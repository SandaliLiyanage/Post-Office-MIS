export default function Nav() {
  const Area: string = 'Matara';
 

  return (
    <div className = 'fixed top-0 w-full z-10'>
      <nav className=' h-16 bg-slate-700' >
      <div className="flex justify-between">
      <div className="p-4 flex items-center ">
      {/* <img className= " h-[40px]" src={logo}  alt="logo" /> */}
      <p className="text-xl text-white">Post-Office-{Area}</p>
      </div>
      </div>
      </nav>
    </div>
  )
}
