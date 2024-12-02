export  const formFields = [
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "first name",
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "last name",
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
      placeholder: "password",
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

export const districtsInKerala = [
  "Alappuzha",
  "Ernakulam",
  "Idukki",
  "Kannur",
  "Kasaragod",
  "Kollam",
  "Kottayam",
  "Kozhikode",
  "Malappuram",
  "Palakkad",
  "Pathanamthitta",
  "Thiruvananthapuram",
  "Thrissur",
  "Wayanad"
];


  export const chartConfig = {
    visitors: {
      label: "Visitors",
      color: "#1E90FF",
    },
    twoWheeler: {
      label: "Two-Wheeler",
      color: "#1E90FF", // Dodger Blue
    },
    fourWheeler: {
      label: "Four-Wheeler",
      color: "#FF6347", // Tomato Red
    },
    commercialVehicles: {
      label: "Commercial Vehicles",
      color: "#FFD700", // Gold
    },
    other: {
      label: "Other",
      color: "#32CD32", // Lime Green
    },
  };

  export const INITIAL_CHART_DATA = [
    { category: "Two-Wheeler", visitors: 0, fill: "var(--color-twoWheeler)" },
    { category: "Four-Wheeler", visitors: 0, fill: "var(--color-fourWheeler)" },
    { category: "Commercial Vehicle", visitors: 0, fill: "var(--color-commercialVehicles)" },
    { category: "Other", visitors: 0, fill: "var(--color-other)" },
  ];


  // testimonials

export const getDefaultTestimonial = (vehicle, agentData) => ({
  brand: `${vehicle.brand} ${vehicle.model}`,
  year: vehicle.year,
  transmissionType: vehicle.transmissionType,
  ownership: vehicle.ownership,
  fuelType: vehicle.fuelType,
  agentName: agentData?.user?.[0]
    ? `${agentData.user[0].firstName} ${agentData.user[0].lastName}`
    : vehicle.fullname,
  contact: agentData?.user[0]?.contact,
  primaryContact: vehicle.primaryContact,
  secondaryContact: vehicle.secondaryContact,
  vehicleType: vehicle.vehicleType,
  price: vehicle.price,
  place: vehicle.place,
  district: vehicle.district,
  src: vehicle.uploadedImages?.[0] || "https://via.placeholder.com/150",
});
