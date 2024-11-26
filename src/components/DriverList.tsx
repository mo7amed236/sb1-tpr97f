import React from 'react';
import { PlusCircle, User, Trash2 } from 'lucide-react';
import { Driver } from '../types';

interface DriverListProps {
  drivers: Driver[];
  onAddDriver: () => void;
  onDeleteDriver: (driverId: string) => void;
  onSelectDriver: (driverId: string) => void;
  selectedDriverId: string | null;
}

export default function DriverList({
  drivers,
  onAddDriver,
  onDeleteDriver,
  onSelectDriver,
  selectedDriverId
}: DriverListProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">قائمة المناديب</h2>
        <button
          onClick={onAddDriver}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          <PlusCircle size={20} />
          إضافة مندوب
        </button>
      </div>
      <div className="space-y-2">
        {drivers.map((driver) => (
          <div
            key={driver.id}
            className="flex items-center gap-2"
          >
            <button
              onClick={() => onSelectDriver(driver.id)}
              className={`flex-1 flex items-center gap-2 p-3 rounded-md text-right ${
                selectedDriverId === driver.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <User size={20} />
              <span>{driver.name}</span>
            </button>
            <button
              onClick={() => onDeleteDriver(driver.id)}
              className="p-3 text-red-500 hover:text-red-700 rounded-md hover:bg-gray-100"
              title="حذف المندوب"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}