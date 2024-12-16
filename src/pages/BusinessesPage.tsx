import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/useStore';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import type { Business } from '@/types';

export function BusinessesPage() {
  const { businesses, setBusinesses } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  async function fetchBusinesses() {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBusinesses(data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  }

  const columns = [
    { header: 'Name', accessor: 'name' as keyof Business },
    { header: 'Email', accessor: 'email' as keyof Business },
    { header: 'Address', accessor: 'address' as keyof Business },
    { header: 'Phone', accessor: 'phone' as keyof Business },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Businesses</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Business
        </Button>
      </div>
      <Table data={businesses} columns={columns} />
    </div>
  );
}