import React from 'react';
import Image from 'next/image';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      <section className="relative overflow-hidden h-screen w-full">
        <div className="absolute inset-0">
          <Image
            src="/DroneDay.jpg"
            alt="Pelican Point East on Venetian Bay"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: 'center bottom' }}
            quality={90}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

          <div 
            className="absolute inset-0" 
            style={{ 
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)' 
            }}
          />
        </div>
        

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">

            <div className="rounded-2xl p-8 sm:p-12 lg:p-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Pelican Point East
              </h1>
              <p className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 mb-8 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] font-light">
                Waterfront living on Venetian Bay in Park Shore. Walk to The Village Shops, enjoy radiant sunsets, and private beach access via the Park Shore Association.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 rounded-xl bg-white/95 text-gray-900 px-8 py-4 text-lg font-semibold shadow-xl hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
        

      </section>


      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Boat slips","Covered parking","Secure entry","Walk to Venetian Village","Kayak access","Landscaped grounds"].map((item, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg bg-white p-3 ring-1 ring-gray-200">
                  <span className="inline-block h-2 w-2 rounded-full bg-blue-600 mt-2" />
                  <span className="text-lg text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-gray-200">
            <Image src="/BackPPE.jpg" alt="Pelican Point East Condominium Amenities and Grounds" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]"><div className="hidden"></div>
          {[
            { src: '/Paint1.jpg', alt: 'Pelican Point East Condominium Building Exterior' },
            { src: '/Bay Reflection.jpg', alt: 'Venetian Bay Reflection at Pelican Point East' },
            { src: '/Docks.jpg', alt: 'Private Docks and Waterfront Access at Pelican Point East' },
            { src: '/Paint2.jpg', alt: 'Pelican Point East Condominium Complex' },
            { src: '/PoolArea.jpg', alt: 'Resort-Style Pool Area at Pelican Point East Condos' },
            { src: '/BoatSlip.jpg', alt: 'Boat Slips at Pelican Point East on Venetian Bay' },
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
            </figure>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;
