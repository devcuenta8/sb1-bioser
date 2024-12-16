import { useState } from 'react';
import { Download } from 'lucide-react';
import { utils, writeFile } from 'xlsx';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/Button';

export function ReportsPage() {
  const { doctors, businesses } = useStore();
  const [generating, setGenerating] = useState(false);

  const generateExcel = async (data: any[], filename: string) => {
    setGenerating(true);
    try {
      const ws = utils.json_to_sheet(data);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Report');
      writeFile(wb, `${filename}.xlsx`);
    } catch (error) {
      console.error('Error generating Excel:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Reports</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Doctors Report</h2>
          <p className="mb-4 text-gray-600">
            Download a complete list of all registered doctors with their details.
          </p>
          <Button
            onClick={() => generateExcel(doctors, 'doctors-report')}
            disabled={generating}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Excel
          </Button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Businesses Report</h2>
          <p className="mb-4 text-gray-600">
            Download a complete list of all registered businesses with their details.
          </p>
          <Button
            onClick={() => generateExcel(businesses, 'businesses-report')}
            disabled={generating}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Excel
          </Button>
        </div>
      </div>
    </div>
  );
}