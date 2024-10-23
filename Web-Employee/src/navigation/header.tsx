import { useUser } from "../pages/auth/usercontext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { User, Bell } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IP } from "../../config";
type Notification = {
  RequestStatus: string;
  startDate: string;
};

export default function Nav() {
  const { removeUser, user } = useUser();
  const [notifications, setNotifications] = useState([] as Notification[]);
  const navigate = useNavigate();
  async function getNotifications() {
    console.log("Getting Notifications");
    const res = await axios.post(
      `http://${IP}/employee/getNotifications`,
      { employeeID: user?.employeeID },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    console.log(res);
    setNotifications(res.data);
  }
  function handleClick() {
    console.log("user iss", user);
  }
  return (
    <div className="fixed top-0 w-full z-10 bg-slate-800 h-16 flex justify-between shadow-sm">
      <div className="p-4 flex justify-start">
        {/* <img src={logo} alt="Post Office Logo"  /> */}
        <p className="text-xl text-white">Post-Office-{user?.postOfficeName}</p>
      </div>
      <div className="flex justify-end">
        {/* <Button onClick={handleClick} className="mt-3 bg-slate-800"><Bell className="bg-slate-800"></Bell></Button> */}

        <Popover>
          <PopoverTrigger asChild>
            <Button onClick={handleClick} className="mt-3 bg-slate-800">
              <User className="bg-slate-800"></User>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-slate-200 border-none border mr-5">
            <div className="grid gap-4 ">
              <div className="space-y-2 ">
                <h4 className="font-medium leading-none flex justify-center text-black">
                  You are logged in as: {user?.name}
                </h4>
                <p className="text-sm flex justify-center text-black">
                  {user?.email}
                </p>
                <p className="text-sm flex justify-center text-black">
                  {user?.role.toLocaleLowerCase()}
                </p>
              </div>
              <div className="grid gap-2">
                <Button
                  className=" bg-slate-400 text-black hover:text-white"
                  onClick={() => {
                    {
                      removeUser();
                      navigate("/");
                    }
                  }}
                >
                  Logout
                </Button>
                <Button
                  className=" text-white "
                  onClick={() => navigate("/forgotpassword")}
                >
                  Reset Password
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="mt-3 bg-slate-800 ">
              <Bell
                className="bg-slate-800"
                onClick={() => {
                  getNotifications();
                }}
              ></Bell>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetDescription></SheetDescription>
            <SheetHeader>
              <SheetTitle className="text-black">Notifications</SheetTitle>
            </SheetHeader>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div key={index} className="grid gap-4 py-4">
                  <div className="bg-slate-400 w-full h-20 gap-4 rounded-md p-5">
                    <p>
                      Your Leave request for the date {notification.startDate}{" "}
                      is {notification.RequestStatus.toLowerCase()}.
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No Notifications to be displayed</p>
            )}

            <SheetFooter>
              <SheetClose asChild>
                {/* <Button type="submit">Save changes</Button> */}
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <Button
          className="mt-3 pt-1 pb-1 mr-5 bg-slate-800 rounded-full text-white border border-white hover:bg-slate-600 hover:text-white"
          variant="outline"
        >
          {user?.role}
        </Button>
      </div>
    </div>
  );
}
