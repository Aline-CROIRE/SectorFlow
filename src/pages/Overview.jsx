import { useSector } from "../contexts/SectorContexts"
import RetailOverview from "./retail/RetailOverview"
import ConstructionOverview from "./Constraction/ConstractionOverview"

const Overview = () => {
  const { sector } = useSector()

  // Render sector-specific overview
  switch (sector) {
    case "retail":
      return <RetailOverview />
    case "construction":
      return <ConstructionOverview />
    // Add other sector overviews as they are implemented
    case "restaurant":
      // return <RestaurantOverview />
      return <PlaceholderOverview sectorName="Restaurant" />
    case "pharmacy":
      // return <PharmacyOverview />
      return <PlaceholderOverview sectorName="Pharmacy" />
    case "hotel":
      // return <HotelOverview />
      return <PlaceholderOverview sectorName="Hotel" />
    case "agribusiness":
      // return <AgribusinessOverview />
      return <PlaceholderOverview sectorName="Agribusiness" />
    default:
      return <PlaceholderOverview sectorName="Business" />
  }
}

// Placeholder for sectors that haven't been implemented yet
const PlaceholderOverview = ({ sectorName }) => {
  return (
    <div style={{ textAlign: "center", padding: "3rem", backgroundColor: "white", borderRadius: "8px" }}>
      <h2>{sectorName} Dashboard</h2>
      <p style={{ marginTop: "1rem", color: "#6c757d" }}>
        The {sectorName.toLowerCase()} dashboard is under development. Please check back soon for sector-specific
        features and analytics.
      </p>
    </div>
  )
}

export default Overview
