import logo from "../assets/logo1.jpg";

export default function PageDashboard() {
  return (
    <div className="top-16  pt-8 pb-8 mt-16  pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 justify-between grid grid-2">
        <p className="text-xl font-bold">
          Welcome to Post Office Management System
        </p>
      </div >
      <img src={logo} alt="Post Office Logo" className="w-[500px]" />
    </div>
  );
}
