import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import MyConfigurations from '../components/dashboard/MyConfigurations';
import ConfigurationForm from '../components/dashboard/ConfigurationForm';
import MyData from '../components/dashboard/MyData';
import AccountSettings from '../components/dashboard/AccountSettings';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/configurations" element={<MyConfigurations />} />
        <Route path="/configurations/new" element={<ConfigurationForm />} />
        <Route path="/configurations/edit/:id" element={<ConfigurationForm />} />
        <Route path="/data" element={<MyData />} />
        <Route path="/settings" element={<AccountSettings />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;