import React, { useState } from 'react';
import { XIcon, CalendarIcon, UsersIcon } from './IconComponents';

interface BookingModalProps {
  coordinator: any;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ coordinator, onClose }) => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [guestCount, setGuestCount] = useState(100);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const today = new Date().toISOString().split('T')[0];


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !weddingDate) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      const isoDate = new Date(weddingDate).toISOString();

      const availabilityResponse = await fetch(
          `https://wedding-coordinator-backend.onrender.com/api/v1/wedding/coordinators/${coordinator._id}/check-availability`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: isoDate }),
          }
      );

      console.log(availabilityResponse);
      if (!availabilityResponse.ok) {
        throw new Error('Availability check failed');
      }

      const availabilityData = await availabilityResponse.json();
      console.log(availabilityData);
      if (!availabilityData.data.isAvailable) {
        setError('This date is not available. Please select another date.');
        return;
      }

      const bookingResponse = await fetch(
          'https://wedding-coordinator-backend.onrender.com/api/v1/wedding/bookings/',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              coordinator: coordinator._id,
              name: clientName,
              email: clientEmail,
              weddingDate,
              guestNumber: guestCount,
            }),
          }
      );

      if (!bookingResponse.status) {
        setError('Coordinator already booked. Please select another date.');
      }

      alert("Booking request sent successfully!");
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };


  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
          <XIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Book {coordinator.name}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Complete the form below to request a booking.</p>

        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
            <input type="text" id="name" value={clientName} onChange={e => setClientName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900 dark:text-gray-100" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
            <input type="email" id="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900 dark:text-gray-100" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Wedding Date</label>
              <div className="relative mt-1">
                <input type="date" id="date" value={weddingDate} min={today} onChange={e => setWeddingDate(e.target.value)} required className="block w-full pl-3 pr-10 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900 dark:text-gray-100" />
                <CalendarIcon className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
               <p className="text-xs text-gray-500 mt-1">Unavailable dates are blocked.</p>
            </div>
            <div className="flex-1">
              <label htmlFor="guests" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Number of Guests</label>
              <div className="relative mt-1">
                <input type="number" id="guests" value={guestCount} min="1" onChange={e => setGuestCount(parseInt(e.target.value))} required className="block w-full pl-3 pr-10 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900 dark:text-gray-100" />
                <UsersIcon className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 text-lg">
            Send Booking Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
