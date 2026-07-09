import React from "react";

const ContactUs: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
            Pelican Point East
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Contact Management
          </h1>

          <p className="mt-4 text-base leading-7 text-gray-600 md:text-lg">
            Reach the Pelican Point East management office for building
            questions, resident support, and association-related requests.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-gray-200">
          <div className="flex flex-col md:flex-row">
            <div className="bg-gray-900 p-8 text-white md:w-2/5 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                Community Association Manager
              </p>

              <h2 className="mt-4 text-3xl font-bold">Guillermo Ruiz</h2>

              <p className="mt-3 text-gray-300">Altaira Property Management</p>

              <div className="mt-8 h-px bg-white/10" />

              <p className="mt-8 text-sm leading-6 text-gray-300">
                For urgent building matters, please contact the management
                office directly by phone. For general requests, email is
                preferred.
              </p>
            </div>

            <div className="flex-1 p-8 md:p-10">
              <div className="space-y-7">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Phone
                  </p>
                  <a
                    href="tel:+12393613501"
                    className="mt-1 inline-block text-xl font-semibold text-gray-900 hover:underline"
                  >
                    (239) 361-3501
                  </a>
                </div>

                <div className="h-px bg-gray-200" />

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Email
                  </p>
                  <a
                    href="mailto:Guillermo@propertymanager247.com"
                    className="mt-1 inline-block text-xl font-semibold text-gray-900 hover:underline"
                  >
                    Guillermo@propertymanager247.com
                  </a>
                </div>

                <div className="h-px bg-gray-200" />

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Management Office
                  </p>
                  <a
                    href="https://www.google.com/maps?q=5660+Strand+Ct+%23107,+Naples,+FL+34110"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-gray-700 hover:text-gray-900 hover:underline"
                  >
                    Altaira Property Management
                    <br />
                    5660 Strand Ct #107
                    <br />
                    Naples, FL 34110
                  </a>
                </div>

                <div className="h-px bg-gray-200" />

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Property Address
                  </p>
                  <a
                    href="https://www.google.com/maps?q=300+Park+Shore+Drive,+Naples,+Florida+34103"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-gray-700 hover:text-gray-900 hover:underline"
                  >
                    Pelican Point East
                    <br />
                    300 Park Shore Drive
                    <br />
                    Naples, Florida 34103
                  </a>
                </div>

                <div className="pt-2">
                  <a
                    href="https://propertymanager247.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
                  >
                    Visit Propertymanager247.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
