import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import CommunityReport from './pages/CommunityReport';
import AddReport from './pages/AddReport';
import DetectScam from './pages/DetectScam';
import Education from './pages/Education';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

const HomeRedirect = () => {
  const { user } = useAuth();
  return user ? <Dashboard /> : <Navigate to="/detect" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Public & Protected Routes wrapped in Layout */}
        <Route path="*" element={
          <MainLayout>
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomeRedirect />} />
                <Route path="/reports" element={
                  <ProtectedRoute>
                    <CommunityReport />
                  </ProtectedRoute>
                } />
                <Route path="/detect" element={<DetectScam />} />
                <Route path="/add-report" element={
                  <ProtectedRoute>
                    <AddReport />
                  </ProtectedRoute>
                } />
                <Route path="/education" element={
                  <ProtectedRoute>
                    <Education />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/detect" replace />} />
              </Routes>
            </div>
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
