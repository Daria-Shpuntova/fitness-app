import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import NutritionPage from './pages/NutritionPage/NutritionPage'; // позже добавим
import WorkoutPage from './pages/WorkoutPage/WorkoutPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/workout" element={<WorkoutPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;