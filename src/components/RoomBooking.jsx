// RoomBooking.js
import React, { useState } from 'react';

const services = [
  {
    type: 'Checkout',
    rooms: [
      { name: 'Studio', credit: 35 },
      { name: '1 Bed', credit: 46 },
      { name: '2 Bed', credit: 72 },
      { name: '3 Bed', credit: 83 },
      { name: 'PENTHOUSE', credit: 125 },
    ],
  },
  {
    type: 'Full Service',
    rooms: [
      { name: 'Studio', credit: 30 },
      { name: '1 Bed', credit: 36 },
      { name: '2 Bed', credit: 46 },
      { name: '3 Bed', credit: 68 },
      { name: 'PENTHOUSE', credit: 88 },
    ],
  },
  {
    type: 'Express Service',
    rooms: [
      { name: 'Studio', credit: 13 },
      { name: '1 Bed', credit: 15 },
      { name: '2 Bed', credit: 25 },
      { name: '3 Bed', credit: 35 },
      { name: 'PENTHOUSE', credit: 48 },
    ],
  },
];

const RoomBooking = () => {
  const [roomCounts, setRoomCounts] = useState({});
  const [total, setTotal] = useState(0);

  const handleRoomChange = (serviceType, roomName, count) => {
    setRoomCounts((prev) => ({
      ...prev,
      [`${serviceType}-${roomName}`]: count,
    }));
  };

  const calculateTotal = () => {
    let sum = 0;
    Object.keys(roomCounts).forEach((key) => {
      const [serviceType, roomName] = key.split('-');
      const count = parseInt(roomCounts[key]) || 0;

      // Find the corresponding service and room
      const service = services.find((s) => s.type === serviceType);
      if (service) {
        const room = service.rooms.find((r) => r.name === roomName);
        if (room) {
          sum += count * room.credit;
        }
      }
    });
    setTotal(sum);
  };

  const resetForm = () => {
    setRoomCounts({});
    setTotal(0);
  };


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Room Booking by Tanvir Aranya</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Service Type</th>
            <th className="border border-gray-300 px-4 py-2">Room Type</th>
            <th className="border border-gray-300 px-4 py-2">Credit</th>
            <th className="border border-gray-300 px-4 py-2">Rooms</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            service.rooms.map((room) => (
              <tr key={`${service.type}-${room.name}`}>
                {room === service.rooms[0] && (
                  <td rowSpan={service.rooms.length} className="border border-gray-300 px-4 py-2">{service.type}</td>
                )}
                <td className="border border-gray-300 px-4 py-2">{room.name}</td>
                <td className="border border-gray-300 px-4 py-2">{room.credit}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    min="0"
                    onChange={(e) => handleRoomChange(service.type, room.name, e.target.value)}
                    className="border border-gray-400 rounded w-full p-1"
                  />
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex space-x-2">
        <button
          onClick={calculateTotal}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Calculate Total
        </button>
        <button
          onClick={resetForm}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold">Total: ${total}</h4>
      </div>

      
    </div>
  );
};

export default RoomBooking;