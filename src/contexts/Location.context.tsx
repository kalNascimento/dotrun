import React, { createContext, useContext, useState } from 'react';

// Defina um tipo para o contexto
type LocationContextType = {
  coordinates: { latitude: number; longitude: number };
  setCoordinates: React.Dispatch<React.SetStateAction<{ latitude: number; longitude: number }>>;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: any) {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  return (
    <LocationContext.Provider value={{ coordinates, setCoordinates }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }

  return context;
}