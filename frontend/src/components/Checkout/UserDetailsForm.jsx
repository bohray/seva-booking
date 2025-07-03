import { useState } from "react";
import axios from "axios";
import InputField from "../common/InputField";
import { toast } from "sonner";
import { initialUserData } from "../constant/Checkout/static-data-checkout";

const UserDetailsForm = ({ onVerified }) => {
  const [form, setForm] = useState(initialUserData);

  const [userExists, setUserExists] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactCheck = async () => {
    const isValid = /^[6-9]\d{9}$/.test(form.contact);
    if (!isValid) toast.error("Enter a valid 10-digit mobile number");

    try {
      const res = await axios.get(
        `/api/users/identity-exist?contact=${form.contact}`
      );
      setUserExists(res.data.exists);
      if (res.data.exists) {
        setOtpSent(true);
      }
    } catch (err) {
      toast.error("Failed to Verify Number.");
    }
  };

  const handleOTPVerify = async () => {
    try {
      const res = await axios.post("/api/users/verify-otp", {
        contact: form.contact,
        otp: form.otp,
      });

      if (res.data.otpVerified) {
        onVerified(res.data);
        setOtpVerified(true);
      }
    } catch (err) {
      toast.error("Verification failed");
    }
  };

  return (
    <div>
      <InputField
        name="contact"
        type="tel"
        value={form.contact}
        onChange={handleChange}
        placeholder="Enter mobile number"
        required
      />

      {!otpSent && <button onClick={handleContactCheck}>Send OTP</button>}

      {otpSent && (
        <>
          <InputField
            name="otp"
            value={form.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            required
          />

          {!userExists &&
            ["name", "email"].map((field) => (
              <InputField
                key={field}
                name={field}
                type={field === "email" ? "email" : "text"}
                value={form[field]}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
              />
            ))}

          <button onClick={handleOTPVerify}>
            {otpVerified ? "OTP Verfied" : "Verify OTP"}
          </button>
        </>
      )}
    </div>
  );
};

export default UserDetailsForm;
