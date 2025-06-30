import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TerminalPage from './pages/TerminalPage';
import DashboardPage from './pages/DashboardPage';
import EmailTemplate from './pages/EmailTemplate';
import MarketReport from './pages/MarketReport';
import ResearchMonitorPage from './pages/ResearchMonitorPage';
import HedgeFundDashboard from './pages/HedgeFundDashboard';
import StockDashboard from './pages/StockDashboard';
import InsiderTradesPage from './pages/InsiderTradesPage';
import DefenseReport from './pages/DefenseReport';
import AuthRequired from './components/AuthRequired';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/terminal" element={
        <AuthRequired>
          <TerminalPage />
        </AuthRequired>
      } />
      <Route path="/dashboard" element={
        <AuthRequired>
          <DashboardPage />
        </AuthRequired>
      } />
      <Route path="/research" element={
        <AuthRequired>
          <ResearchMonitorPage />
        </AuthRequired>
      } />
      <Route path="/hedge-funds" element={
        <AuthRequired>
          <HedgeFundDashboard />
        </AuthRequired>
      } />
      <Route path="/stocks" element={
        <AuthRequired>
          <StockDashboard />
        </AuthRequired>
      } />
      <Route path="/insider-trades" element={
        <AuthRequired>
          <InsiderTradesPage />
        </AuthRequired>
      } />
      <Route path="/defense-report" element={<DefenseReport />} />
      <Route path="/email" element={<EmailTemplate />} />
      <Route path="/market" element={<MarketReport />} />
    </Routes>
  );
}

export default App;