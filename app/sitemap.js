import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  const baseUrl = 'https://Gaadi9.in'; 

  // Fetch all vehicle data for the sitemap
  const vehicleIds = await fetchAllVehicles();

  // Generate XML for the sitemap
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${vehicleIds
        .map(
          (id) => `
        <url>
          <loc>${baseUrl}/vehicle/${id}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join('')}
    </urlset>
  `.trim();

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

// Fetch all vehicles for sitemap
async function fetchAllVehicles() {
  try {
    // Use the same API but remove pagination for full data
    const { data } = await axios.get('https://Gaadi9.in/api/get-all-vehicles'); // Replace with your actual API
    return data.vehicleIds || []; // Ensure the data format matches expected structure
  } catch (error) {
    console.error('Failed to fetch vehicle IDs:', error);
    return [];
  }
}

export async function GET() {
    try {
      // Fetch all vehicle IDs from your API
      const { data } = await axios.get('https://Gaadi9.in/api/get-all-vehicles'); // Adjust API endpoint
      const vehicleIds = data?.vehicles?.map((vehicle) => vehicle._id) || [];
  
      const baseUrl = 'https://Gaadi9.in';
  
      // Generate XML sitemap
      const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${vehicleIds
            .map(
              (id) => `
            <url>
              <loc>${baseUrl}/vehicle-details/${id}</loc>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
            </url>
          `
            )
            .join('')}
        </urlset>
      `.trim();
  
      return new NextResponse(sitemap, {
        headers: {
          'Content-Type': 'application/xml',
        },
      });
    } catch (error) {
      console.error('Error generating sitemap:', error);
  
      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
        {
          headers: {
            'Content-Type': 'application/xml',
          },
        }
      );
    }
  }
