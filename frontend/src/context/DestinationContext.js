import React, { useState, useContext, createContext } from "react";

export const DestinationContext = createContext();

export const DestinationContextProvider = (props) => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);

  // context for adding new destination in Destinations
  const addDestination = (destination) => {
    setDestinations([...destinations, destination]);
  };

  return (
    <DestinationContext.Provider 
    value={{ 
      destinations, 
      setDestinations, 
      addDestination, 
      selectedDestination, 
      setSelectedDestination 
      }}>
      {props.children}
    </DestinationContext.Provider>
  );
};
