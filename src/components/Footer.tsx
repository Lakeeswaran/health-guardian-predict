
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner py-6 border-t border-medical-100 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-medical-900 mb-2">HealthPredict</h3>
            <p className="text-medical-700">Advanced healthcare prediction powered by machine learning.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-medical-900 mb-2">Resources</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-medical-600 hover:text-medical-800 transition-colors">About ML Models</a></li>
              <li><a href="#" className="text-medical-600 hover:text-medical-800 transition-colors">Usage Guidelines</a></li>
              <li><a href="#" className="text-medical-600 hover:text-medical-800 transition-colors">Medical Disclaimer</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-medical-900 mb-2">Contact</h3>
            <p className="text-medical-700">For questions and support:</p>
            <p className="text-medical-600">support@healthpredict.example</p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-medical-100 text-center text-medical-500 text-sm">
          &copy; {new Date().getFullYear()} HealthPredict. All rights reserved. For educational purposes only.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
