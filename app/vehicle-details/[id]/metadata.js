import axios from 'axios';

export async function generateMetadata({ params }) {
  const id = params.id;

  try {
    const { data } = await axios.get(
      `https://Gaadi9.in/api/get-specific-vehicle?id=${id}`
    );

    const vehicleName = data?.vehicle?.model || "Vehicle Details";
    const description = `View details for ${vehicleName}. Explore specifications, features, and more.`;

    return {
      title: `${vehicleName} - Vehicle Details`,
      description,
      openGraph: {
        title: `${vehicleName} - Vehicle Details`,
        description,
        url: `https://Gaadi9.in/vehicle-details/${id}`,
        images: [
          {
            url: data?.vehicle?.uploadedImages[0] || 'https://Gaadi9.in/public/assets/logo.png',
            width: 800,
            height: 600,
            alt: `${vehicleName} Image`,
          },
        ],
      },
    };
  } catch (error) {
    console.error('Failed to fetch metadata:', error);
    return {
      title: 'Vehicle Details',
      description: 'Explore vehicle details.',
    };
  }
}
