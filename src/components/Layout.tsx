import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, FileText } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Doctors', href: '/doctors', icon: Users },
  { name: 'Businesses', href: '/businesses', icon: Building2 },
  { name: 'Reports', href: '/reports', icon: FileText },
];

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed h-screen w-64 bg-white shadow-lg">
          <div className="flex h-16 items-center px-6">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <nav className="space-y-1 px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="ml-64 flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}