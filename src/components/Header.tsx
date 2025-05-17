
import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4 border-b border-medical-100">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <HeartPulse className="h-8 w-8 text-medical-500 mr-2" />
          <h1 className="text-xl font-semibold text-medical-900">
            <Link to="/" className="hover:text-medical-700 transition-colors">
              HealthPredict
            </Link>
          </h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-medical-700 hover:text-medical-900 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/sickness" className="text-medical-700 hover:text-medical-900 transition-colors">
                Sickness Prediction
              </Link>
            </li>
            <li>
              <Link to="/stroke" className="text-medical-700 hover:text-medical-900 transition-colors">
                Stroke Detection
              </Link>
            </li>
          </ul>
        </nav>
        <Button variant="outline" className="text-medical-600 border-medical-300 hover:bg-medical-50">
          Login
        </Button>
      </div>
    </header>
  );
};

export default Header;
