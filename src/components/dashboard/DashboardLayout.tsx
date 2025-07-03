import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Database, 
  Settings, 
  BarChart3, 
  FileText, 
  LogOut, 
  Menu, 
  X,
  User,
  Bell,
  Search
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getAuth, signOut } from 'firebase/auth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { continueWithGoogle } = useAuth();

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: BarChart3 },
    { name: 'My Configurations', href: '/dashboard/configurations', icon: Settings },
    { name: 'My Data', href: '/dashboard/data', icon: FileText },
    { name: 'Account Settings', href: '/dashboard/settings', icon: User },
  ];

  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-darkbg">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-darksurface bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-darksurface shadow-xl border-r border-lovable-purple-900">
          <div className="flex h-16 items-center justify-between px-6 border-b border-lovable-purple-900">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Database className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-lovable-yellow-300">DataFlow</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6 text-darktext" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-lovable-purple-800 text-primary border-r-2 border-primary'
                      : 'text-darktext hover:bg-lovable-purple-800 hover:text-accent'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-lovable-purple-900 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-darktext hover:bg-lovable-purple-800 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-darksurface border-r border-lovable-purple-900">
          <div className="flex h-16 items-center px-6 border-b border-lovable-purple-900">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Database className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-lovable-yellow-300">DataFlow</span>
            </Link>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-lovable-purple-800 text-primary border-r-2 border-primary'
                      : 'text-darktext hover:bg-lovable-purple-800 hover:text-accent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-lovable-purple-900 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-darktext hover:bg-lovable-purple-800 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <div className="sticky top-0 z-40 bg-darksurface border-b border-lovable-purple-900">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-darktext hover:text-darktext"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-darktext" />
                <input
                  type="text"
                  placeholder="Search configurations..."
                  className="pl-10 pr-4 py-2 border border-lovable-purple-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-64 bg-darksurface text-darktext placeholder-darksurface"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-darktext hover:text-darktext relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
              
                <div className="hidden sm:block">
                  <p className="text-xs text-darktext">{user?.email || ''}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;