import React from 'react';

interface StructuredDataProps {
  type?: 'Organization' | 'LocalBusiness' | 'Residence';
}

const StructuredData: React.FC<StructuredDataProps> = ({ type = 'LocalBusiness' }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ppecondo.com';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pelican Point East Condos',
    url: baseUrl,
    logo: `${baseUrl}/favicon.ico`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-239-262-3332',
      contactType: 'Customer Service',
      email: 'manager@pelicanpoint300.com',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '300 Park Shore Drive',
      addressLocality: 'Naples',
      addressRegion: 'FL',
      postalCode: '34103',
      addressCountry: 'US',
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name: 'Pelican Point East Condos',
    image: `${baseUrl}/DroneDay.jpg`,
    description:
      'Waterfront condominiums on Venetian Bay in Park Shore, Naples, Florida. Luxury living with boat slips, covered parking, and resort-style amenities.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '300 Park Shore Drive',
      addressLocality: 'Naples',
      addressRegion: 'FL',
      postalCode: '34103',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '26.1944',
      longitude: '-81.7980',
    },
    telephone: '+1-239-262-3332',
    email: 'manager@pelicanpoint300.com',
    url: baseUrl,
    priceRange: '$$$',
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Boat Slips',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Covered Parking',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Private Beach Access',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Kayak Access',
      },
    ],
  };

  const schema = type === 'Organization' ? organizationSchema : localBusinessSchema;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default StructuredData;

