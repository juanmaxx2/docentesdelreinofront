import { Route, Routes } from "react-router-dom";
import { Home, Create, Institution, Landing, Activities, UpdateInstitution, UpdateActivity } from "./views";
import { ActivityDetail, PrayerDayDetail } from "./components";
import style from './App.module.css';

function App() {
  return (
    <div className={style.appContainer}>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/activities' element={<Activities />} />
        <Route path='/activity/:id' element={<ActivityDetail />} />
        <Route path='/prayerday/:id' element={<PrayerDayDetail />} />
        <Route path='/updateactivity/:id/:tipo' element={<UpdateActivity />} />
        <Route path='/institution' element={<Institution />} />
        <Route path='/updateinstitution' element={<UpdateInstitution />} />
      </Routes>
    </div>
  );
};

export default App;
