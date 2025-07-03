import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [step, setStep] = useState("phone");
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    otp: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckUser = async () => {
    if (!new RegExp(/^\d{10}$/).test(form.contact)) {
      return alert("Phone number must be exactly 10 digits");
    }

    try {
      const res = await axios.get(`/api/users/contact/${form.contact}`);
      if (res.data) {
        setStep("otp");
      } else {
        setStep("details");
      }
    } catch (err) {
      setStep("details");
    }
  };

  const handleRegister = async () => {
    if (!form.name || !form.email) return alert("Please fill all fields");

    try {
      const res = await axios.post("/api/users", {
        name: form.name.trim(),
        email: form.email,
        contact: form.contact,
      });
      localStorage.setItem("seva_user", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };

  const handleVerifyOtp = async () => {
    if (!/^\d{6}$/.test(form.otp)) {
      return alert("OTP must be exactly 6 digits");
    }

    try {
      const res = await axios.post("/api/users/verify-otp", {
        contact: form.contact,
        otp: form.otp,
      });
      localStorage.setItem("seva_user", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      alert("Invalid OTP");
      console.error(err);
    }
  };

  const fields = {
    phone: [
      {
        name: "contact",
        type: "tel",
        placeholder: "Enter 10-digit phone number",
        pattern: "^\\d{10}$",
        required: true,
      },
    ],
    details: [
      {
        name: "name",
        type: "text",
        placeholder: "Enter your name",
        pattern: "^[a-zA-Z ]{2,50}$",
        required: true,
      },
      {
        name: "email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
      },
      {
        name: "contact",
        type: "tel",
        disabled: true,
      },
    ],
    otp: [
      {
        name: "otp",
        type: "text",
        inputMode: "numeric",
        placeholder: "Enter 6-digit OTP",
        pattern: "^\\d{6}$",
        required: true,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>

      <form onSubmit={(e) => e.preventDefault()} autoComplete="off" noValidate>
        {fields[step].map((field) => (
          <div key={field.name} className={styles.inputWrapper}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              {...field}
              id={field.name}
              value={form[field.name]}
              onChange={handleChange}
              className={styles.input}
              onWheel={(e) => e.target.blur()}
            />
          </div>
        ))}

        {step === "phone" && (
          <button onClick={handleCheckUser}>Continue</button>
        )}
        {step === "details" && (
          <button onClick={handleRegister}>Register & Continue</button>
        )}
        {step === "otp" && (
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        )}
      </form>
    </div>
  );
};

export default Login;
