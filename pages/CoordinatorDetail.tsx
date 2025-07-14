import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPinIcon, DollarSignIcon, CalendarIcon } from '../components/IconComponents';
import BookingModal from '../components/BookingModal';

const CoordinatorDetail: React.FC = () => {
  const [coordinator, setCoordinator] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoordinatorDetails = async () => {
      const response = await fetch(`https://wedding-coordinator-backend.onrender.com/api/v1/wedding/coordinators/${id}`);
      if (!response.ok) {
        navigate('/');
      }
      const data = await response.json();
      setCoordinator(data.data.coordinator);
    };
    fetchCoordinatorDetails();
  }, [id, navigate]);

  if (!coordinator) {
    return (
        <div className="flex justify-center items-center h-screen">
          <div className="text-xl">Loading coordinator details...</div>
        </div>
    );
  }

  console.log(coordinator);
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-64 w-full object-cover md:h-full md:w-64 lg:w-80"
                src={coordinator.profilePhoto}
                alt={`Profile of ${coordinator.name}`}
              />
            </div>
            <div className="p-6 sm:p-8 flex-grow">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">{coordinator.name}</h1>
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2 text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2 text-primary" />
                  <span>{coordinator.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSignIcon className="w-5 h-5 mr-2 text-primary" />
                  <span className="font-semibold">{coordinator.price.toLocaleString()}</span>
                  <span className="text-sm ml-1.5">starting price</span>
                </div>
              </div>
              <p className="mt-4 text-gray-700 dark:text-gray-300 text-base leading-relaxed">{coordinator.bio}</p>

              <div className="mt-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto bg-primary hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold flex items-center text-gray-800 dark:text-gray-200">
                <CalendarIcon className="w-6 h-6 mr-3 text-primary" />
                Availability
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                .
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                    <span className={`bg-red-100 ${ coordinator.availability[0].isAvailable ? "dark:bg-violet-400 dark:text-gray-50" : "dark:bg-red-900 dark:text-red-300" }  text-xs font-medium px-2.5 py-1.5 rounded-full dark:bg-red-900 `}>
                      {coordinator.availability[0].isAvailable ? 'Available' : 'Unavailable'}
                    </span>
              </div>
          </div>
        </div>
         <button
            onClick={() => navigate('/')}
            className="mt-8 text-primary dark:text-primary-400 hover:underline"
        >
            &larr; Back to all coordinators
        </button>
      </div>

      {isModalOpen && (
        <BookingModal
          coordinator={coordinator}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default CoordinatorDetail;
