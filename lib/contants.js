export  const formFields = [
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter agent's first name",
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter agent's last name",
    },
    {
      id: "contact",
      label: "Email or Phone Number",
      type: "text",
      placeholder: "Email or phone number",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter agent's password",
    },
  ];

  export const validateContact = (value) => {
    const phonePattern = /^[0-9]{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (phonePattern.test(value) || emailPattern.test(value)) {
      return true;
    }
    return "Please enter a valid 10-digit phone number or email address";
  };
