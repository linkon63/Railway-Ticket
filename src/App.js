import { createContext, useContext, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomeComponent from "./components/lib/Home/HomeComponent";
import Location from "./components/lib/Form/Location"
import TimeForm from "./components/lib/Form/TimeForm";
import NotesFrom from "./components/lib/Form/NotesFrom";
import AmountForm from "./components/lib/Form/AmountForm";
import SendingForm from "./components/lib/Form/SendingForm";
export const FormContext = createContext()

function App() {

  const [data, setData] = useState({});

  return (
    <FormContext.Provider value={[data, setData]}>
      <Routes>
        <Route path="/" element={<Layout props={<HomeComponent />} />} />
        <Route path="step1" element={<Layout props={<HomeComponent />} />} />
        <Route path="step2" element={<Layout props={<Location />} />} />
        <Route path="step3" element={<Layout props={<TimeForm />} />} />
        <Route path="step4" element={<Layout props={<AmountForm />} />} />
        <Route path="step5" element={<Layout props={<NotesFrom />} />} />
        <Route path="step6" element={<Layout props={<SendingForm />} />} />
      </Routes>
    </FormContext.Provider>
  );
}
export default App;