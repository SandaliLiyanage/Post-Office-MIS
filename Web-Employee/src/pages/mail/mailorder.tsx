import Button from "../../components/button";

export default function MailOrder() {
  return (
    <div className="relative pl-6 ml-60 bg-stone-300 bg-opacity-15 min-h-screen">
      <div className="sticky top-0 pt-8 pb-8 mt-16 flex justify-between ">
        <p className="text-xl">Mail Order</p>
      </div>
      <div>
        <Button className="bg-slate-800 text-white">Add Mail</Button>
      </div>
    </div>
  )
}
