export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialty: string;
  phone: string;
  created_at: string;
}

export interface Business {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  created_at: string;
}

export interface Report {
  id: string;
  title: string;
  type: 'doctors' | 'businesses';
  date: string;
  data: any;
}