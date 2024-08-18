import InputField from "@/components/custom/inputfield";
import Button from "../../../components/custom/button";
import FormField from "../../../components/custom/formfield"
import LabelField from "@/components/custom/label";

export default function MailOrder() {

  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
        <p className="text-xl">Mail Order</p>
      </div>
      <div>
      <LabelField label="Customer Name"></LabelField>
        <div className="grid grid-cols-2">
          <InputField type="text" placeholder="First Name" className=""/>
          <InputField type="text" placeholder="Second Name" />
        </div>
        <LabelField label="Address"></LabelField>
        <div className="grid grid-cols-2">
          <InputField type="text" placeholder="Number" />
          <InputField type="text" placeholder="Road" />
          <InputField type="text" placeholder="Area" />
          <InputField type="text" placeholder="City" />
        </div>
        <FormField width = "w-1/2" type = "password" label="Telephone" placeholder="Telephone" ></FormField>
        <div>
          <Button className="bg-slate-700 text-white m-4 "> Add Mail </Button>
        </div>
      </div>
    </div>
  )
}
