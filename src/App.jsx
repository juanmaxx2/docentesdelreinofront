import { Route, Routes } from "react-router-dom";
import { NotFound, UpdateUser, Home, Create, Institution, Landing, Activities, UpdateInstitution, UpdateActivity, Actions, NationalAgency, Law, Login, CreateUser, Admin } from "./views";
import { ActivityAdmin, ActivityDetail, AssociationAdmin, CreateNationalLaw, CreateProvinceLaw, LawAdmin, PrayerDayDetail, ProvinceAdmin, TokenExpiration, UpNationalLaw, UpProvince, UpProvinceLaw, UserAdmin } from "./components";
import style from './App.module.css';

function App() {

  return (
    <div className={style.appContainer}>
      <TokenExpiration />

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />

        <Route path='/activities' element={<Activities />} />
        <Route path='/activity/:id' element={<ActivityDetail />} />
        <Route path='/prayerday/:id' element={<PrayerDayDetail />} />
        <Route path='/updateactivity/:id/:tipo' element={<UpdateActivity />} />
        <Route path='/institution/:institutionName' element={<Institution />} />
        <Route path='/updateinstitution' element={<UpdateInstitution />} />
        <Route path='/action' element={<Actions />} />
        <Route path='/nationalagency' element={<NationalAgency />} />
        <Route path='/law' element={<Law />} />
        <Route path='/login' element={<Login />} />
        <Route path='/createuser' element={<CreateUser />} />

        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/activity' element={<ActivityAdmin />} />
        <Route path='/create' element={<Create />} />
        <Route path='/admin/user' element={<UserAdmin />} />
        <Route path='/admin/user/edit' element={<UpdateUser />} />

        <Route path='/admin/law' element={<LawAdmin />} />
        <Route path='/admin/law/createlaw' element={<CreateNationalLaw />} />
        <Route path='/admin/law/createprovintiallaw' element={<CreateProvinceLaw />} />
        <Route path='/admin/law/updatelaw' element={<UpNationalLaw />} />
        <Route path='/admin/law/updateprovintiallaw' element={<UpProvinceLaw />} />

        <Route path='/admin/association' element={<AssociationAdmin />} />
        <Route path='/admin/province' element={<ProvinceAdmin />} />
        <Route path='/admin/province/update' element={<UpProvince />} />

        <Route path="*" element={<NotFound />} />

        {/* <Route path='/imagen' element={<Imagen />} /> */}


      </Routes>
    </div>
  );
};

export default App;
