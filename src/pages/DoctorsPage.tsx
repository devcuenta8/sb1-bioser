import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/useStore';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import type { Doctor } from '@/types';

export function DoctorsPage() {
  const { doctors, setDoctors } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  async function fetchDoctors() {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  }

  const columns = [
    { header: 'Name', accessor: 'name' as keyof Doctor },
    { header: 'Email', accessor: 'email' as keyof Doctor },
    { header: 'Specialty', accessor: 'specialty' as keyof Doctor },
    { header: 'Phone', accessor: 'phone' as keyof Doctor },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Doctors</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Doctor
        </Button>
      </div>
      <Table data={doctors} columns={columns} />
    </div>
  );
}