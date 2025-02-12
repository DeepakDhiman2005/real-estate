"use client";
import { useRouter } from "next/navigation";
import "../styles/search.scss";
import { IoSearchSharp } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  cityName: string;
};

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsSearch(true);
    router.push(`/city/${data.cityName.toLowerCase()}`);
  };

  return (
    <div className="w-full my-36 flex justify-center gap-y-10 flex-col items-center">
      <h1 className="text-[48px] font-semibold">Search projects by city name</h1>
      <form className="search-field" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="City name"
          {...register("cityName", { required: "City name is required" })}
          className={`border p-2 rounded-md ${
            errors.cityName ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button type="submit" className="ml-2">
          <IoSearchSharp size={18} />
        </button>
      </form>

      {errors.cityName && (
        <p className="text-red-500 text-sm mt-1">{errors.cityName.message}</p>
      )}

      {
        isSearch ? 
        <h2>Data Fetch to Server....</h2>
        : null
      }

    </div>
  );
}
