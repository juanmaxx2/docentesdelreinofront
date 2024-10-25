import ActivityDetail from "./ActivityDetail/ActivityDetail";
import PrayerDayDetail from "./PrayerDayDetail/PrayerDayDetial";
import CreateActivity from "./CreateActivities/CreateActivity/CreateActivity";
import CreatePrayerDay from "./CreateActivities/CreatePrayerDay/CreatePrayerDay";
import Filter from "./Filter/Filter";
import UpActivity from "./UpActivity/UpActivity";
import UpPrayerDay from "./UpPrayerDay/UpPrayerDay";
import { PedirLocalStorage, GuardarLocalStorage, ClearLocalStorage, TokenExpiration } from "./LocalStorage/LocalStorage";

import Featured from "./Featured/Featured";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
import Province from "./Province/Province";
import Map from "./Map/Map";
import Activity from "./Activity/Activity";
import PrayerDay from "./PrayerDay/PrayerDay";
import ActivityAdmin from "./Admin/ActivityAdmin/ActivityAdmin";
import UserAdmin from "./Admin/UsersAdmin/UserAdmin";
import LawAdmin from "./Admin/LawAdmin/LawAdmin";
import CreateNationalLaw from "./CreateLaws/CreateNationaLaw/CreateNationalLaw";
import CreateProvinceLaw from "./CreateLaws/CreateProvinceLaw/CreateProvinceLaw";
import AssociationAdmin from "./Admin/AssociationAdmin/AssociationAdmin";
import ProvinceAdmin from "./Admin/ProvinceAdmin/ProvinceAdmin";
import UpProvince from "./UpProvince/UpProvince";
import UpNationalLaw from "./UpLaw/UpNationalLaw/UpNationalLaw";
import UpProvinceLaw from "./UpLaw/UpProvinceLaw/UpProvinceLaw";

export { UpProvinceLaw, UpNationalLaw, UpProvince, ProvinceAdmin, AssociationAdmin, CreateProvinceLaw, CreateNationalLaw, LawAdmin, UserAdmin, TokenExpiration, ActivityAdmin, Map, Province, Featured, ActivityDetail, NavBar, Activity, PrayerDay, PrayerDayDetail, CreateActivity, CreatePrayerDay, Filter, Footer, UpActivity, UpPrayerDay, PedirLocalStorage, GuardarLocalStorage, ClearLocalStorage };