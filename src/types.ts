export interface Driver {
  id: string;
  name: string;
}

export interface Expense {
  id: string;
  date: string;
  vehicleNumber: string;
  odometerReading: string;
  description: string;
  amount: number;
}

export interface DriverExpenses {
  [driverId: string]: Expense[];
}