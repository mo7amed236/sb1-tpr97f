import React, { useState } from 'react';
import { Driver, Expense, DriverExpenses } from './types';
import DriverList from './components/DriverList';
import ExpenseTable from './components/ExpenseTable';
import PrintView from './components/PrintView';
import { Trash2, RefreshCcw } from 'lucide-react';

function App() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<DriverExpenses>({});

  const handleAddDriver = () => {
    const name = prompt('أدخل اسم المندوب');
    if (name) {
      const newDriver: Driver = {
        id: Date.now().toString(),
        name,
      };
      setDrivers([...drivers, newDriver]);
      setExpenses({ ...expenses, [newDriver.id]: [] });
    }
  };

  const handleDeleteDriver = (driverId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المندوب وجميع مصاريفه؟')) {
      const newExpenses = { ...expenses };
      delete newExpenses[driverId];
      setExpenses(newExpenses);
      setDrivers(drivers.filter(d => d.id !== driverId));
      if (selectedDriverId === driverId) {
        setSelectedDriverId(null);
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('هل أنت متأكد من مسح جميع البيانات؟')) {
      setDrivers([]);
      setExpenses({});
      setSelectedDriverId(null);
    }
  };

  const handleAddRow = (driverId: string) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      vehicleNumber: '',
      odometerReading: '',
      description: '',
      amount: 0,
    };
    setExpenses({
      ...expenses,
      [driverId]: [...(expenses[driverId] || []), newExpense],
    });
  };

  const handleDeleteRow = (driverId: string, expenseId: string) => {
    setExpenses({
      ...expenses,
      [driverId]: expenses[driverId].filter((exp) => exp.id !== expenseId),
    });
  };

  const handleUpdateExpense = (
    driverId: string,
    expenseId: string,
    field: keyof Expense,
    value: string | number
  ) => {
    setExpenses({
      ...expenses,
      [driverId]: expenses[driverId].map((exp) =>
        exp.id === expenseId ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const selectedDriver = drivers.find((d) => d.id === selectedDriverId);

  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="no-print">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              نظام تتبع مصاريف المناديب
            </h1>
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              <RefreshCcw size={20} />
              مسح جميع البيانات
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <DriverList
                drivers={drivers}
                onAddDriver={handleAddDriver}
                onDeleteDriver={handleDeleteDriver}
                onSelectDriver={setSelectedDriverId}
                selectedDriverId={selectedDriverId}
              />
            </div>
            
            <div className="md:col-span-3">
              {selectedDriver && (
                <ExpenseTable
                  driver={selectedDriver}
                  expenses={expenses[selectedDriver.id] || []}
                  onAddRow={() => handleAddRow(selectedDriver.id)}
                  onDeleteRow={(expenseId) => handleDeleteRow(selectedDriver.id, expenseId)}
                  onUpdateExpense={(expenseId, field, value) =>
                    handleUpdateExpense(selectedDriver.id, expenseId, field, value)
                  }
                />
              )}
            </div>
          </div>
        </div>
        
        <PrintView drivers={drivers} expenses={expenses} />
      </div>
    </div>
  );
}

export default App;