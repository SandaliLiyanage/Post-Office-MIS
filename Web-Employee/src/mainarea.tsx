import Button from './components/button';
import Searchbar from './components/searchbar';

export default function mainarea() {
  return (
    <div className="  ml-60 bg-stone-300 bg-opacity-15 min-h-screen">
      <div className="p-8 mt-16 flex justify-between ">
        <p className="text-lg">Mail Transfer</p>
        <div><Button className="bg-red-950 text-white ">Label</Button></div>
        <div><Button className="bg-rose-800 text-white ">Label</Button></div>
        <div><Searchbar className='bg-slate-800 text-white' placeholder='Search here'></Searchbar></div>
      </div>
    </div>
  )
}
