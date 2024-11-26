import React from 'react';
import { Driver, Expense } from '../types';

interface PrintableExpenseTableProps {
  driver: Driver;
  expenses: Expense[];
}

export default function PrintableExpenseTable({ driver, expenses }: PrintableExpenseTableProps) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">كشف حساب {driver.name}</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-3 text-right">التاريخ</th>
            <th className="border p-3 text-right">رقم المركبة</th>
            <th className="border p-3 text-right">رقم العداد</th>
            <th className="border p-3 text-right">البيان</th>
            <th className="border p-3 text-right">المبلغ</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="border p-3">{expense.date}</td>
              <td className="border p-3">{expense.vehicleNumber}</td>
              <td className="border p-3">{expense.odometerReading}</td>
              <td className="border p-3">{expense.description}</td>
              <td className="border p-3">{expense.amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-50 font-bold">
            <td colSpan={4} className="border p-3 text-right">
              الإجمالي
            </td>
            <td className="border p-3 text-right">{total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}