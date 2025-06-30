import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
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
import CurrenciesDashboard from './pages/CurrenciesDashboard';
import AboutPage from './pages/AboutPage';
import StrategiesPage from './pages/StrategiesPage';
import ResearchPage from './pages/ResearchPage';
import WaitlistPage from './pages/WaitlistPage';
import AuthRequired from './components/AuthRequired';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/strategies" element={<StrategiesPage />} />
      <Route path="/research" element={<ResearchPage />} />
      <Route path="/waitlist" element={<WaitlistPage />} />
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
      <Route path="/research-monitor" element={
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
      <Route path="/currencies" element={
        <AuthRequired>
          <CurrenciesDashboard />
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