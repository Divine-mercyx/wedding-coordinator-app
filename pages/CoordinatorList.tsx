import React, { useState, useEffect, useMemo } from 'react';
import CoordinatorCard from '../components/CoordinatorCard';
import SearchBar from '../components/SearchBar';
import { fetchCoordinators } from '../data/coordinators';

const CoordinatorList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [coordinators, setCoordinators] = useState([]);

    useEffect(() => {
        const loadCoordinators = async () => {
            const data = await fetchCoordinators();
            setCoordinators(data.data.coordinators);
        };
        loadCoordinators();
    }, []);

    console.log(coordinators);

    const filteredCoordinators = useMemo(() => {
        return coordinators.filter(c =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, coordinators]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          Find Your Perfect <span className="text-primary">Wedding Coordinator</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Browse our curated list of professional coordinators to make your special day unforgettable.
        </p>
      </div>

      <div className="mb-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {filteredCoordinators.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCoordinators.map(coordinator => (
            <CoordinatorCard key={coordinator._id} coordinator={coordinator} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">No Coordinators Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search term.</p>
        </div>
      )}
    </div>
  );
};

export default CoordinatorList;
