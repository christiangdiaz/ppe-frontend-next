import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="text-gray-900 font-bold mb-2">Pelican Point East</div>
            <p className="text-gray-600">Venetian Bay, Park Shore</p>
          </div>
          <div>
            <div className="text-gray-900 font-semibold mb-2">Links</div>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/owners-area" className="hover:text-gray-900">Owners’ Area</a></li>
              <li><a href="/resident-directory" className="hover:text-gray-900">Resident Directory</a></li>
              <li><a href="/contact" className="hover:text-gray-900">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="text-gray-900 font-semibold mb-2">Contact</div>
            <p className="text-gray-600">Management Office</p>
            <p className="text-gray-600">Naples, FL</p>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-3 text-xs text-gray-500">© 2024 Pelican Point East. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
