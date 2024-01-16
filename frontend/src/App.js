import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DestinationDetailPage from './pages/DestinationDetailPage';
import DestinationTablePage from './pages/DestinationTablePage';
import UpdateDestinationPage from './pages/UpdateDestinationPage';
import AddDestinationPage from './pages/AddDestinationPage';
import { DestinationContextProvider } from './context/DestinationContext';

const App = () => {
  return (
    <DestinationContextProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<DestinationTablePage />} />
            <Route path='/add/destination' element={<AddDestinationPage />} />
            <Route path='/destinations/:id/update' element={<UpdateDestinationPage />} />
            <Route path='/destinations/:id' element={<DestinationDetailPage />} />
          </Routes>
        </Router>
      </div>
    </DestinationContextProvider>
  );
};

export default App;
