import { Navigate, Route, Routes } from 'react-router-dom';

import { PatientInfo } from '../components/PatientInfo';

// import { Configuration } from './Configuration';
import { Patient } from './Patient';

// import { PatientsList } from '../components/PatientsList';

export const PatientsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<PatientInfo />} />
      <Route path=":clinic_user_id/*" element={<Patient />} />
      {/* <Route path=":clinic_user_id/configuration" element={<Configuration />} /> */}
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
