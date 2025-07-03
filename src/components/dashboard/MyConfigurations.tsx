import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Play, 
  Pause, 
  Edit, 
  Trash2,
  ExternalLink,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const MyConfigurations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [configurations, setConfigurations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfigurations = async () => {
      setLoading(true);
      try {
        const userEmail = localStorage.getItem('userEmail') || '';
        const response = await fetch(`http://127.0.0.1:8000/api/accounts/scraping-configurations/?email=${encodeURIComponent(userEmail)}`, {
           credentials: 'include', // if you use cookies/session auth
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          setConfigurations(data);
        } else {
          const data = await response.json();
          setConfigurations(data);
        }
      } catch (error) {
        setConfigurations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchConfigurations();
  }, []);

  if (loading) {
    return <div>Loading configurations...</div>;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-accent" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-secondary" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-primary" />;
      default:
        return <AlertCircle className="w-4 h-4 text-darktext" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-lovable-yellow-700/20 text-accent border-accent';
      case 'paused':
        return 'bg-lovable-purple-700/20 text-secondary border-secondary';
      case 'error':
        return 'bg-lovable-red-700/20 text-primary border-primary';
      default:
        return 'bg-darktext/20 text-darktext border-darktext';
    }
  };

  const filteredConfigurations = configurations.filter((config) => {
    const matchesSearch = config.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      config.url.toLowerCase().includes(searchTerm.toLowerCase());
    // You can add status logic if your backend provides it
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-lovable-yellow-300">My Configurations</h1>
          <p className="text-darktext">Manage your data scraping configurations</p>
        </div>
        <Link
          to="/dashboard/configurations/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-lovable-red-600 transition-colors duration-300 shadow-md"
        >
          <Plus className="w-4 h-4" />
          New Configuration
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-darkcard p-6 rounded-xl border border-lovable-purple-900">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-darktext" />
            <input
              type="text"
              placeholder="Search configurations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-darksurface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-darksurface text-darktext placeholder-darktext"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-darktext" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-darksurface rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent bg-darksurface text-darktext"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>
      </div>

      {/* Configurations List */}
      <div className="bg-darkcard rounded-xl border border-lovable-purple-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-lovable-purple-900 border-b border-lovable-purple-800">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-lovable-yellow-300">Configuration</th>
                <th className="text-left py-4 px-6 font-medium text-lovable-yellow-300">Status</th>
                <th className="text-left py-4 px-6 font-medium text-lovable-yellow-300">Frequency</th>
                <th className="text-left py-4 px-6 font-medium text-lovable-yellow-300">Last Scraped</th>
                <th className="text-left py-4 px-6 font-medium text-lovable-yellow-300">Data Points</th>
                <th className="text-left py-4 px-6 font-medium text-lovable-yellow-300">Next Run</th>
                <th className="text-right py-4 px-6 font-medium text-lovable-yellow-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lovable-purple-900">
              {filteredConfigurations.map((config) => (
                <tr key={config.id} className="hover:bg-lovable-purple-800">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-darktext">{config.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <p className="text-sm text-darktext">{config.url}</p>
                        <ExternalLink className="w-3 h-3 text-darktext" />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(config.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(config.status)}`}>
                        {config.status.charAt(0).toUpperCase() + config.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1 text-sm text-darktext">
                      <Clock className="w-4 h-4" />
                      {config.frequency}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-darktext">{config.lastScraped}</td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-primary">{config.dataPoints}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-darktext">
                    {config.nextRun}
                  </td>
                  <td className="py-4 px-6 text-right relative">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === config.id ? null : config.id)}
                      className="text-darktext hover:text-lovable-yellow-300"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {openDropdown === config.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-darkcard rounded-md shadow-lg z-10 border border-lovable-purple-900">
                        <div className="py-1">
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-darktext hover:bg-lovable-purple-800">
                            <Play className="w-4 h-4" /> Run Now
                          </button>
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-darktext hover:bg-lovable-purple-800">
                            <Pause className="w-4 h-4" /> Pause
                          </button>
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-darktext hover:bg-lovable-purple-800">
                            <Edit className="w-4 h-4" /> Edit
                          </button>
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-primary hover:bg-lovable-red-700 hover:text-white">
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredConfigurations.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-darktext">
                    No configurations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyConfigurations;