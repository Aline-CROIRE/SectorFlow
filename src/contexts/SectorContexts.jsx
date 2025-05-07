"use client"

import { createContext, useState, useContext, useEffect } from "react"

const defaultSectorFeatures = {
  retail: ["Barcode scanning", "POS interface", "Customer loyalty"],
  restaurant: ["Menu builder", "Table reservations", "Kitchen order tickets"],
  pharmacy: ["Expiry tracking", "Prescription linking", "Medicine categories"],
  hotel: ["Room booking", "Guest check-in/out", "Housekeeping"],
  agribusiness: ["Crop records", "Harvest stock", "Seasonal sales tracking"],
  construction: ["Material stock by site", "Equipment usage", "Project-specific inventory"],
}

const SectorContext = createContext({
  sector: null,
  setSector: () => {},
  sectorFeatures: defaultSectorFeatures,
})

export const useSector = () => useContext(SectorContext)

export const SectorProvider = ({ children }) => {
  // Initialize with null instead of potentially getting a value from localStorage
  const [sector, setSector] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load sector from localStorage only after component mounts (client-side)
  useEffect(() => {
    const storedSector = localStorage.getItem("selectedSector")
    if (storedSector) {
      setSector(storedSector)
    }
    setIsLoading(false)
  }, [])

  const handleSetSector = (newSector) => {
    setSector(newSector)
    localStorage.setItem("selectedSector", newSector)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <SectorContext.Provider
      value={{
        sector,
        setSector: handleSetSector,
        sectorFeatures: defaultSectorFeatures,
      }}
    >
      {children}
    </SectorContext.Provider>
  )
}
