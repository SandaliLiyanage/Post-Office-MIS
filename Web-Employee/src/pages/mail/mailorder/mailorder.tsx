import InputField from "@/components/custom/inputfield";
import Button from "../../../components/custom/button";
import LabelField from "@/components/custom/label";
import { ChangeEvent, FormEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const CustomerDetails = () => {

  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    number: "",
    road: "",
    area: "",
    city: "",
    telephone: "",
  });

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }; 

  function saveCustomerDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("saving customer details");
    console.log(customerDetails);
    // axios.post("/customerDetails", customerDetails)
  }

  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
        <p className="text-xl">Mail Order</p>
      </div>
      <div>
      <form onSubmit={saveCustomerDetails}>
      <LabelField label="Customer Name"></LabelField>
        <div className="grid grid-cols-2">
          <input onChange={handleInput} name="firstName"
          value={customerDetails.firstName}
           type="text" placeholder="First Name"/>
          <InputField value = {customerDetails.firstName} onChange={handleInput} name="lastName" type="text" placeholder="Second Name" />
        </div>
        <LabelField label="Address"></LabelField>
        <div className="grid grid-cols-2">
          <InputField value = {customerDetails.firstName} onChange={handleInput} name="number" type="text" placeholder="Number" />
          <InputField onChange={handleInput} name="road" type="text" placeholder="Road" />
          <InputField onChange={handleInput} name="area" type="text" placeholder="Area" />
          <InputField value onChange={handleInput} name="city" type="text" placeholder="City" />
        </div>
        <LabelField label="Telephone"></LabelField>
        <div>
          <InputField className="w-1/2" onChange={handleInput} name="telephone" type="text" placeholder="Telephone"/>
        </div>
        <div>

          <input type = "submit" value={"Add Mail"} className="bg-slate-700 text-white m-4 "/>
        </div>
      </form>
      </div>
    </div>
  )
}
export default CustomerDetails;