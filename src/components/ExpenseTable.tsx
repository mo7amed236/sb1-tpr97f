import React from 'react';
import { Trash2, Plus, Printer } from 'lucide-react';
import { Driver, Expense } from '../types';

interface ExpenseTableProps {
  driver: Driver;
  expenses: Expense[];
  onAddRow: () => void;
  onDeleteRow: (id: string) => void;
  onUpdateExpense: (id: string, field: keyof Expense, value: string | number) => void;
}

export default function ExpenseTable({
  driver,
  expenses,
  onAddRow,
  onDeleteRow,
  onUpdateExpense,
}: ExpenseTableProps) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">كشف حساب {driver.name}</h2>
        <div className="flex gap-2">
          <button
            onClick={onAddRow}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            <Plus size={20} />
            إضافة صف
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <Printer size={20} />
            طباعة
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-3 text-right">التاريخ</th>
              <th className="border p-3 text-right">رقم المركبة</th>
              <th className="border p-3 text-right">رقم العداد</th>
              <th className="border p-3 text-right">البيان</th>
              <th className="border p-3 text-right">المبلغ</th>
              <th className="border p-3 text-center">حذف</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="border p-3">
                  <input
                    type="date"
                    value={expense.date}
                    onChange={(e) => onUpdateExpense(expense.id, 'date', e.target.value)}
                    className="w-full bg-transparent"
                  />
                </td>
                <td className="border p-3">
                  <input
                    type="text"
                    value={expense.vehicleNumber}
                    onChange={(e) => onUpdateExpense(expense.id, 'vehicleNumber', e.target.value)}
                    className="w-full bg-transparent"
                  />
                </td>
                <td className="border p-3">
                  <input
                    type="text"
                    value={expense.odometerReading}
                    onChange={(e) => onUpdateExpense(expense.id, 'odometerReading', e.target.value)}
                    className="w-full bg-transparent"
                  />
                </td>
                <td className="border p-3">
                  <input
                    type="text"
                    value={expense.description}
                    onChange={(e) => onUpdateExpense(expense.id, 'description', e.target.value)}
                    className="w-full bg-transparent"
                  />
                </td>
                <td className="border p-3">
                  <input
                    type="number"
                    value={expense.amount}
                    onChange={(e) => onUpdateExpense(expense.id, 'amount', parseFloat(e.target.value) || 0)}
                    className="w-full bg-transparent"
                  />
                </td>
                <td className="border p-3 text-center">
                  <button
                    onClick={() => onDeleteRow(expense.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-bold">
              <td colSpan={4} className="border p-3 text-right">
                الإجمالي
              </td>
              <td className="border p-3 text-right">{total}</td>
              <td className="border p-3"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}