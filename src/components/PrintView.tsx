import React from 'react';
import { Driver, DriverExpenses } from '../types';
import PrintableExpenseTable from './PrintableExpenseTable';

interface PrintViewProps {
  drivers: Driver[];
  expenses: DriverExpenses;
}

export default function PrintView({ drivers, expenses }: PrintViewProps) {
  const totalAllDrivers = Object.values(expenses).reduce(
    (total, driverExpenses) =>
      total + driverExpenses.reduce((sum, expense) => sum + expense.amount, 0),
    0
  );

  return (
    <div className="print-only hidden">
      <h1 className="text-3xl font-bold text-center mb-8">تقرير مصاريف المناديب</h1>
      {drivers.map((driver) => (
        <PrintableExpenseTable
          key={driver.id}
          driver={driver}
          expenses={expenses[driver.id] || []}
        />
      ))}
      <div className="mt-8 pt-8 border-t-2">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          الإجمالي الكلي لجميع المناديب: {totalAllDrivers}
        </h2>
      </div>
    </div>
  );
}