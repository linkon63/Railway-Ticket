import { createContext, useContext, useState } from "react";

import Home from "./components/lib/Home/Home";

export const FormContext = createContext()

function App() {
  
  const [data, setData] = useState({});
  // const setFormValues = (values) => {
  //   setData((prevValues) => ({
  //     ...prevValues,
  //     ...values,
  //   }));
  // };
  return (
    <FormContext.Provider value={[data, setData]}>
      <Home />
    </FormContext.Provider>
  );
}
export default App;