import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

interface FormValues {
  firstName: string;
  lastName: string;
  number: string;
  road: string;
  area: string;
  city: string;
  telephone: string;
}

const CustomerDetails = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("saving customer details");
    console.log(data);
    try {
      await axios.post("/customerDetails", data);
      // handle success (e.g., show a success message or redirect)
    } catch (error) {
      // handle error (e.g., show an error message)
    }
  };

  return (
    <div className="pl-8 pr-8 ml-60 bg-stone-300 bg-opacity-15 min-h-screen flex-col">
      <div className="top-16 pt-8 pb-8 mt-16 flex justify-between ">
        <p className="text-xl">Mail Order</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-lg font-medium">Customer Name</label>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <input
                {...register("firstName", { required: "First name is required" })}
                type="text"
                placeholder="First Name"
                className="mt-4 pr-4 pt-4 pb-4 pl-4 w-full p-2 border border-gray-300 rounded-lg"
              />
              {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}
            </div>
            <div>
              <input
                {...register("lastName", { required: "Last name is required" })}
                type="text"
                placeholder="Last Name"
                className="mt-4 pr-4 pt-4 pb-4 pl-4 w-full p-2 border border-gray-300 rounded-lg"
              />
              {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}
            </div>
          </div>
          <label className="block text-lg font-medium">Address</label>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <input
                {...register("number", { required: "Number is required" })}
                type="text"
                placeholder="Number"
                className="mt-4 pr-4 pt-4 pb-4 pl-4 w-full p-2 border border-gray-300 rounded-lg"
              />
              {errors.number && <p className="text-red-600">{errors.number.message}</p>}
            </div>
            <div>
              <input
                {...register("road")}
                type="text"
                placeholder="Road"
                className="mt-4 pr-4 pt-4 pb-4 pl-4 w-full p-2 border border-gray-300 rounded-lg"
              />
              {errors.road && <p className="text-red-600">{errors.road.message}</p>}
            </div>
            <div>
              <input
                {...register("area", { required: "Area is required" })}
                type="text"
                placeholder="Area"
                className="mt-4 pr-4 pt-4 pb-4 pl-4 w-full p-2 border border-gray-300 rounded-lg"
              />
              {errors.area && <p className="text-red-600">{errors.area.message}</p>}
            </div>
            <div>
              <input
                {...register("city", { required: "City is required" })}
                type="text"
                placeholder="City"
                className="mt-4 pr-4 pt-4 pb-4 pl-4 w-full p-2 border border-gray-300 rounded-lg"
              />
              {errors.city && <p className="text-red-600">{errors.city.message}</p>}
            </div>
          </div>
          <label className="block text-lg font-medium">Telephone</label>
          <div className="mb-4">
            <input
              {...register("telephone", { required: "Telephone is required" })}
              type="text"
              placeholder="Telephone"
              className="mt-4 pr-4 pt-4 pb-4 pl-4 w-full p-2 border border-gray-300 rounded-lg"
            />
            {errors.telephone && <p className="text-red-600">{errors.telephone.message}</p>}
          </div>
          <button
            type="submit"
            className="bg-slate-700 text-white py-2 px-4 rounded"
          >
            Add Mail
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerDetails;
