import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Download, Eye, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const MyData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFormat, setFilterFormat] = useState('all');

  const dataEntries = [
    {
      id: 1,
      name: 'E-commerce Price Data',
      configuration: 'E-commerce Price Monitor',
      format: 'CSV',
      size: '1.2 MB',
      lastUpdated: '2 minutes ago',
      status: 'completed',
    },
    {
      id: 2,
      name: 'Local Events Feed',
      configuration: 'Local Events Scraper',
      format: 'JSON',
      size: '0.8 MB',
      lastUpdated: '15 minutes ago',
      status: 'completed',
    },
    {
      id: 3,
      name: 'Academic Publications',
      configuration: 'Academic Papers Monitor',
      format: 'XML',
      size: '0 MB',
      lastUpdated: '1 hour ago',
      status: 'failed',
    },
    {
      id: 4,
      name: 'Real Estate Market Report',
      configuration: 'Real Estate Listings',
      format: 'CSV',
      size: '2.5 MB',
      lastUpdated: '2 hours ago',
      status: 'completed',
    },
    {
      id: 5,
      name: 'Financial News Archive',
      configuration: 'Stock Market Data',
      format: 'JSON',
      size: '1.1 MB',
      lastUpdated: '45 minutes ago',
      status: 'completed',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-accent" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-primary" />;
      default:
        return <AlertCircle className="w-4 h-4 text-darktext" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-lovable-yellow-700/20 text-accent border-accent';
      case 'failed':
        return 'bg-lovable-red-700/20 text-primary border-primary';
      default:
        return 'bg-darktext/20 text-darktext border-darktext';
    }
  };

  const filteredEntries = dataEntries.filter(entry => {
    const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          entry.configuration.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || entry.status === filterStatus;
    const matchesFormat = filterFormat === 'all' || entry.format.toLowerCase() === filterFormat;
    return matchesSearch && matchesStatus && matchesFormat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-lovable-yellow-300">My Data</h1>
          <p className="text-darktext">View and manage your collected data</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-lovable-red-600 transition-colors duration-300 shadow-md">
          <Download className="w-4 h-4" />
          Bulk Download
        </button>
      </div>

      {/* Filters */}
      <div className="bg-darkcard p-6 rounded-xl border border-lovable-purple-900">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-darktext" />
            <input
              type="text"
              placeholder="Search data entries..."
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
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-darktext" />
            <select
              value={filterFormat}
              onChange={(e) => setFilterFormat(e.target.value)}
              className="border border-darksurface rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent bg-darksurface text-darktext"
            >
              <option value="all">All Formats</option>
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="xml">XML</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data List */}
      <div className="bg-darkcard rounded-xl border border-lovable-purple-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-lovable-purple-900 border-b border-lovable-purple-800">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-lovable-yellow-300">Data Entry</th>
                <th className="text-left py-4 px-6 font-medium text-lovable-yellow-300">Configuration</th>
                <th className="text-left py-4 px-6 font-medium text-lovable-yellow-300">Format</th>
                <th className="text-left py-4 px-6 font-medium text-lovable-yellow-300">Size</th>
                <th className="text-left py-4 px-6 font-medium text-lovable-yellow-300">Last Updated</th>
                <th className="text-left py-4 px-6 font-medium text-lovable-yellow-300">Status</th>
                <th className="text-right py-4 px-6 font-medium text-lovable-yellow-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lovable-purple-900">
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-lovable-purple-800">
                  <td className="py-4 px-6">
                    <p className="font-medium text-darktext">{entry.name}</p>
                    <Link to="#" className="text-sm text-darktext hover:underline">
                      View Details
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-sm text-darktext">{entry.configuration}</td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary border border-secondary">
                      {entry.format}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-darktext">{entry.size}</td>
                  <td className="py-4 px-6 text-sm text-darktext">{entry.lastUpdated}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(entry.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(entry.status)}`}>
                        {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="inline-flex items-center gap-2 text-darktext hover:text-primary transition-colors duration-300">
                      <Eye className="w-4 h-4" /> View
                    </button>
                    <button className="ml-4 inline-flex items-center gap-2 text-primary hover:text-lovable-red-600 transition-colors duration-300">
                      <Download className="w-4 h-4" /> Download
                    </button>
                  </td>
                </tr>
              ))}
              {filteredEntries.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-darktext">
                    No data entries found.
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

export default MyData;