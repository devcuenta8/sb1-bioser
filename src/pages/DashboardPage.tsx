import { useEffect, useState } from 'react';
import { Users, Building2, ArrowUp, ArrowDown } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function DashboardPage() {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalBusinesses: 0,
    newDoctorsThisMonth: 0,
    newBusinessesThisMonth: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

      // Fetch total counts
      const [doctorsResult, businessesResult] = await Promise.all([
        supabase.from('doctors').select('id', { count: 'exact' }),
        supabase.from('businesses').select('id', { count: 'exact' }),
      ]);

      // Fetch new entries this month
      const [newDoctorsResult, newBusinessesResult] = await Promise.all([
        supabase
          .from('doctors')
          .select('id', { count: 'exact' })
          .gte('created_at', firstDayOfMonth),
        supabase
          .from('businesses')
          .select('id', { count: 'exact' })
          .gte('created_at', firstDayOfMonth),
      ]);

      setStats({
        totalDoctors: doctorsResult.count || 0,
        totalBusinesses: businessesResult.count || 0,
        newDoctorsThisMonth: newDoctorsResult.count || 0,
        newBusinessesThisMonth: newBusinessesResult.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Doctors"
          value={stats.totalDoctors}
          icon={Users}
          trend={{
            value: stats.newDoctorsThisMonth,
            label: 'This month',
          }}
        />
        <StatCard
          title="Total Businesses"
          value={stats.totalBusinesses}
          icon={Building2}
          trend={{
            value: stats.newBusinessesThisMonth,
            label: 'This month',
          }}
        />
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  trend: {
    value: number;
    label: string;
  };
}

function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
      <div className="mt-2 flex items-center text-sm">
        <span className="flex items-center text-green-600">
          <ArrowUp className="mr-1 h-4 w-4" />
          {trend.value}
        </span>
        <span className="ml-2 text-gray-500">{trend.label}</span>
      </div>
    </div>
  );
}