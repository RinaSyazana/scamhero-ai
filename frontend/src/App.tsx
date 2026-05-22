import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import CommunityReport from './pages/CommunityReport';
import AddReport from './pages/AddReport';
import DetectScam from './pages/DetectScam';
import Education from './pages/Education';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected/Main Routes Wrapped in Layout */}
        <Route path="*" element={
          <ProtectedRoute>
            <MainLayout>
              <div className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/reports" element={<CommunityReport />} />
                  <Route path="/detect" element={<DetectScam />} />
                  <Route path="/add-report" element={<AddReport />} />
                  <Route path="/education" element={<Education />} />
                </Routes>
              </div>
            </MainLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
