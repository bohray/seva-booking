export const initialAddress = {
  pincode: "",
  city: "",
  state: "",
  addrLine1: "",
  addrLine2: "",
  type: "",
};

export const initialUserData = {
  contact: "",
  otp: "",
  name: "",
  email: "",
};

export const addressFields = [
  {
    placeholder: "Enter pincode",
    name: "pincode",
    required: true,
  },
  {
    placeholder: "City",
    name: "city",
    disabled: true,
  },
  {
    placeholder: "State",
    name: "state",
    disabled: true,
  },
  {
    placeholder: "Address Line 1",
    name: "addrLine1",
    required: true,
  },
  {
    placeholder: "Address Line 2",
    name: "addrLine2",
  },
  {
    placeholder: "Home / Work",
    name: "type",
  },
];
