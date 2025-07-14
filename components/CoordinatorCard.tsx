
import React from 'react';
import { Link } from 'react-router-dom';
import { Coordinator } from '../types';
import { MapPinIcon, DollarSignIcon } from './IconComponents';

interface CoordinatorCardProps {
  coordinator: Coordinator;
}
const CoordinatorCard: React.FC<CoordinatorCardProps> = ({ coordinator }) => {
  return (
      <Link
          to={`/coordinator/${coordinator._id}`}
          className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl dark:hover:shadow-primary/20 transform hover:-translate-y-1 transition-all duration-300"
      >
      <div className="relative">
        <img
          className="w-full h-56 object-cover"
          src={coordinator.profilePhoto}
          alt={`Profile of ${coordinator.name}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-bold text-white">{coordinator.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
          <MapPinIcon className="w-5 h-5 mr-2 text-primary" />
          <span>{coordinator.location}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <DollarSignIcon className="w-5 h-5 mr-2 text-primary" />
          <span className="font-semibold">{coordinator.price.toLocaleString()}</span>
          <span className="text-sm ml-1">starting price</span>
        </div>
      </div>
    </Link>
  );
};

export default CoordinatorCard;
