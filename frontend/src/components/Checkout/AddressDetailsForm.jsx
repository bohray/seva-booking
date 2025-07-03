import { useState } from "react";
import InputField from "../common/InputField";
import { toast } from "sonner";
import {
  addressFields,
  initialAddress,
} from "../constant/Checkout/static-data-checkout";

const AddressDetailsForm = ({ onVerified }) => {
  const [form, setForm] = useState(initialAddress);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "pincode") {
      setForm((prev) => ({
        ...prev,
        pincode: value,
      }));

      if (value.length === 6) {
        try {
          const res = await fetch(
            `https://api.postalpincode.in/pincode/${value}`
          );
          const data = await res.json();

          if (data[0].Status === "Success") {
            const office = data[0].PostOffice[0];
            setForm((prev) => ({
              ...prev,
              city: office.District || "",
              state: office.State || "",
            }));
          } else {
            setForm((prev) => ({
              ...prev,
              city: "",
              state: "",
            }));
            toast.warning("Invalid OTP");
          }
        } catch (err) {
          console.error("Error fetching pincode info", err);
          toast.error("Failed to fetch city/state");
        }
      } else {
        setForm((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));
      }

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      {addressFields.map((field) => (
        <InputField
          key={field.name}
          {...field}
          value={form[field.name]}
          onChange={handleChange}
        />
      ))}

      <button onClick={() => onVerified(form)}>Save Address</button>
    </div>
  );
};

export default AddressDetailsForm;
