const WhatsAppComponent = ({ phoneNumber }) => {
  const whatsappURL = `https://wa.me/+91${phoneNumber}`;

    return (
      <div className="flex items-center space-x-4 p-4 mt-2 bg-green-50 border border-green-300 rounded-lg shadow-md">
        {/* WhatsApp Icon */}
        <div className="text-green-500 text-3xl">
          <i className="fab fa-whatsapp"></i>
        </div>
        {/* Info Section */}
        <div>
          <h3 className="text-lg font-semibold text-green-800">WhatsApp</h3>
          <p className="text-sm text-green-600">
            Chat with us at:{" "}
            <span className="font-medium">{phoneNumber || "Not available"}</span>
          </p>
        </div>
        {/* Chat Button */}
        <a
          href={phoneNumber ? whatsappURL : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-4 py-2 text-white rounded-md shadow ${
            phoneNumber
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Chat Now
        </a>
      </div>
    );
  };
  
  export default WhatsAppComponent;
  