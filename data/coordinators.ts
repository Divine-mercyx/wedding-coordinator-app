
// import { Coordinator } from '../types';
//
// export const coordinators: Coordinator[] = [
//   {
//     id: 1,
//     name: 'Eleanor Vance',
//     location: 'Napa Valley, CA',
//     price: 4500,
//     profilePhotoUrl: 'https://picsum.photos/seed/eleanor/400/400',
//     bio: 'With over a decade of experience in orchestrating dream weddings in the heart of wine country, Eleanor brings a touch of classic elegance and meticulous planning to every event. She believes in creating timeless memories that reflect the unique story of each couple.',
//     unavailableDates: ['2024-09-21', '2024-10-05', '2024-10-12'],
//   },
//   {
//     id: 2,
//     name: 'Marcus Thorne',
//     location: 'New York, NY',
//     price: 6200,
//     profilePhotoUrl: 'https://picsum.photos/seed/marcus/400/400',
//     bio: 'Marcus is the go-to coordinator for chic, modern weddings in the city that never sleeps. His expertise in logistics and design ensures a flawless, high-energy celebration. He thrives on transforming urban spaces into breathtaking wedding venues.',
//     unavailableDates: ['2024-09-14', '2024-11-02', '2024-11-09'],
//   },
//   {
//     id: 3,
//     name: 'Clara Monroe',
//     location: 'Charleston, SC',
//     price: 3800,
//     profilePhotoUrl: 'https://picsum.photos/seed/clara/400/400',
//     bio: 'Specializing in Southern charm and romantic aesthetics, Clara designs weddings that are both beautiful and deeply personal. Her calm demeanor and creative vision make the planning process a joy for her clients.',
//     unavailableDates: ['2024-10-19', '2024-10-26'],
//   },
//   {
//     id: 4,
//     name: 'Julian Hayes',
//     location: 'Aspen, CO',
//     price: 5500,
//     profilePhotoUrl: 'https://picsum.photos/seed/julian/400/400',
//     bio: 'For couples dreaming of a mountain-top wedding, Julian is the expert. He combines adventurous spirit with luxury service, creating unforgettable experiences against the stunning backdrop of the Rockies. He handles everything from venue selection to guest accommodations.',
//     unavailableDates: ['2024-12-07', '2024-12-14', '2025-01-18'],
//   },
//   {
//     id: 5,
//     name: 'Sofia Rossi',
//     location: 'Miami, FL',
//     price: 4900,
//     profilePhotoUrl: 'https://picsum.photos/seed/sofia/400/400',
//     bio: 'Sofia brings the heat with vibrant, glamorous weddings that capture the spirit of Miami. Her connections with top vendors and her flair for dramatic design result in spectacular events that are the talk of the town.',
//     unavailableDates: ['2024-11-16', '2024-11-23'],
//   },
//   {
//     id: 6,
//     name: 'Leo Chen',
//     location: 'Seattle, WA',
//     price: 4200,
//     profilePhotoUrl: 'https://picsum.photos/seed/leo/400/400',
//     bio: 'Leo focuses on eco-friendly and intimate weddings in the Pacific Northwest. His approach is thoughtful and sustainable, perfect for couples who want a beautiful celebration that is also kind to the planet.',
//     unavailableDates: ['2024-09-28', '2024-10-05'],
//   },
// ];

export const fetchCoordinators = async () => {
  const response = await fetch('https://wedding-coordinator-backend.onrender.com/api/v1/wedding/coordinators/');
  if (!response.ok) {
    throw new Error('Failed to fetch coordinators');
  }
  return response.json();
};

