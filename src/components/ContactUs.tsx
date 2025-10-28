import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="mb-6">
          <h2 className="text-left text-gray-900 text-3xl md:text-4xl font-extrabold tracking-tight">Contact</h2>
          <p className="text-gray-600 text-sm">Reach the Pelican Point East management office.</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl bg-white ring-1 ring-gray-200 p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-semibold text-gray-900">Address</div>
                <a
                  href="https://www.google.com/maps?q=300+Park+Shore+Drive,+Naples,+Florida+34103"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-gray-700 hover:text-gray-900 hover:underline"
                >
                  300 Park Shore Drive<br/>Naples, Florida 34103
                </a>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Phone</div>
                <a href="tel:+12392623332" className="mt-1 inline-block text-gray-700 hover:text-gray-900 hover:underline">
                  (239) 262-3332
                </a>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Email</div>
                <a href="mailto:manager@pelicanpoint300.com" className="mt-1 inline-block text-gray-700 hover:text-gray-900 hover:underline">
                  manager@pelicanpoint300.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
