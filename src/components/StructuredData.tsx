import React from "react";

interface StructuredDataProps {
  type?: "Organization" | "LocalBusiness" | "Residence";
}

const StructuredData: React.FC<StructuredDataProps> = ({
  type = "Residence",
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ppecondo.com";

  const contactInfo = {
    telephone: "+1-239-361-3501",
    email: "guillermo@propertymanager247.com",
  };

  const propertyAddress = {
    "@type": "PostalAddress",
    streetAddress: "300 Park Shore Drive",
    addressLocality: "Naples",
    addressRegion: "FL",
    postalCode: "34103",
    addressCountry: "US",
  };

  const managementAddress = {
    "@type": "PostalAddress",
    streetAddress: "5660 Strand Ct #107",
    addressLocality: "Naples",
    addressRegion: "FL",
    postalCode: "34110",
    addressCountry: "US",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pelican Point East Condos",
    url: baseUrl,
    logo: `${baseUrl}/favicon.ico`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contactInfo.telephone,
      contactType: "Property Management",
      email: contactInfo.email,
      areaServed: "US",
      availableLanguage: "English",
    },
    address: propertyAddress,
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Pelican Point East Condos",
    image: `${baseUrl}/DroneDay.jpg`,
    description:
      "Waterfront condominiums on Venetian Bay in Park Shore, Naples, Florida. Luxury living with boat slips, covered parking, and resort-style amenities.",
    address: propertyAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: "26.1944",
      longitude: "-81.7980",
    },
    telephone: contactInfo.telephone,
    email: contactInfo.email,
    url: baseUrl,
    priceRange: "$$$",
    parentOrganization: {
      "@type": "Organization",
      name: "Altaira Property Management",
      url: "https://propertymanager247.com",
      address: managementAddress,
    },
  };

  const residenceSchema = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: "Pelican Point East Condos",
    image: `${baseUrl}/DroneDay.jpg`,
    description:
      "Waterfront condominiums on Venetian Bay in Park Shore, Naples, Florida. Luxury living with boat slips, covered parking, and resort-style amenities.",
    address: propertyAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: "26.1944",
      longitude: "-81.7980",
    },
    telephone: contactInfo.telephone,
    email: contactInfo.email,
    url: baseUrl,
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Boat Slips",
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Covered Parking",
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Private Beach Access",
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Kayak Access",
      },
    ],
    managedBy: {
      "@type": "Organization",
      name: "Altaira Property Management",
      url: "https://propertymanager247.com",
      address: managementAddress,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: contactInfo.telephone,
        contactType: "Property Management",
        email: contactInfo.email,
        availableLanguage: "English",
      },
    },
  };

  const schemaMap = {
    Organization: organizationSchema,
    LocalBusiness: localBusinessSchema,
    Residence: residenceSchema,
  };

  const schema = schemaMap[type];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default StructuredData;
