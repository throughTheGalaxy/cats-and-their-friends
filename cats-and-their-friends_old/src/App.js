import React, { useState, useEffect, useContext } from "react";
import { RouterApp } from "./router/routerapp";
import {
  LastLocationContext,
  SetLastLocationContext,
} from "./context/location";
import { useLocation } from "react-router";

function App() {
  const [lastLocation, setLastLocation] = useState("");
  const setlastLocation = useContext(SetLastLocationContext);
  let location = useLocation();

  useEffect(() => {
    return () => {
      setLastLocation(location.pathname.slice(1));
    };
  }, [location]);

  return (
    <LastLocationContext.Provider value={lastLocation}>
      <SetLastLocationContext.Provider value={setLastLocation}>
        <RouterApp />
      </SetLastLocationContext.Provider>
    </LastLocationContext.Provider>
  );
}

export default App;
