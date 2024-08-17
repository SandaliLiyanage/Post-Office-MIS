import NavButton from "../components/custom/sidebutton";
import { useState } from "react";

export default function SideBarComponent() {
  const clickedColour: string = 'bg-slate-400 text-white';
  const normalColour: string = 'hover:bg-slate-400 hover:text-white'
  const [activeButton, setActiveButton] = useState('Employee Records');
  const handleClick = (button: string) => {
    setActiveButton(button);
  };

  return (
    <div className="fixed left-0 h-full">
      <nav className="w-60 h-full bg-slate-300 bg-opacity-25">
        
        <NavButton className={`${activeButton === 'Employee Records' ? clickedColour : normalColour}`}
          onClick={() => handleClick('Employee Records') }>Employee Records</NavButton>

        <NavButton className={`${activeButton === 'Mail Assignments' ? clickedColour : normalColour}`}
        onClick={() => handleClick('Mail Assignments')}>Mail Assignments</NavButton>

        <NavButton className={`${activeButton === 'Settings' ? clickedColour : normalColour}`} 
          onClick={() => handleClick('Settings') }>Mail Order</NavButton>

        <NavButton className={`${activeButton === 'Reports' ? clickedColour : normalColour}`}
          onClick={() => handleClick('Reports')}>Reports</NavButton>

      </nav>
    </div>
  );
};