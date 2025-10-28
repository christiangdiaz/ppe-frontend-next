import React from 'react';
import Image from 'next/image';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/PPE.jpg"
            alt="Pelican Point East on Venetian Bay"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 text-white">
          <p className="max-w-2xl text-lg md:text-2xl text-white/100 mb-10">
            Waterfront living on Venetian Bay in Park Shore. Walk to The Village Shops, enjoy radiant sunsets, and private beach access via the Park Shore Association.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/login" className="inline-flex items-center gap-2 rounded-md bg-white text-gray-900 px-5 py-3 font-semibold shadow-sm hover:bg-gray-100 transition">
              Owner Login
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-md bg-white/10 text-white px-5 py-3 font-semibold ring-1 ring-white/30 hover:bg-white/20 transition">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Quick Links for Residents */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 md:-mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[{
            title: 'Owners’ Area', href: '/owners-area', desc: 'Files and documents'
          },{
            title: 'Upload Files', href: '/upload', desc: 'Managers only'
          },{
            title: 'Resident Directory', href: '/resident-directory', desc: 'Unit contacts'
          },{
            title: 'Contact', href: '/contact', desc: 'Management & support'
          }].map((link, i) => (
            <a key={i} href={link.href} className="block rounded-xl bg-white p-4 ring-1 ring-gray-200 hover:ring-gray-300 transition">
              <div className="text-gray-900 font-semibold mb-1">{link.title}</div>
              <div className="text-sm text-gray-600">{link.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Amenities (concise) */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Heated pool","Boat slips","On-site management","Covered parking","Secure entry","Walk to Ventian Village","Kayak access","Landscaped grounds"].map((item, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg bg-white p-3 ring-1 ring-gray-200">
                  <span className="inline-block h-2 w-2 rounded-full bg-blue-600 mt-2" />
                  <span className="text-lg text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-gray-200">
            <Image src="/BackPPE.jpg" alt="Amenities" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]"><div className="hidden"></div>
          {[
            { src: '/Paint1.jpg'},
            { src: '/Bay Reflection.jpg'},
            { src: '/Docks.jpg' },
            { src: '/Paint2.jpg'},
            { src: '/PoolArea.jpg'},
            { src: '/BoatSlip.jpg' },
          ].map((image, index) => (
            <figure key={index} className="relative mb-4 break-inside-avoid overflow-hidden rounded-lg shadow">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <figcaption className="absolute left-0 bottom-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2 text-white text-xs">
                {image.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;
