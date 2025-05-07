import { useSector } from "../contexts/SectorContexts"
import RetailInventory from "./retail/RetailInventory"

const Inventory = () => {
  const { sector } = useSector()

  // Render sector-specific inventory
  switch (sector) {
    case "retail":
      return <RetailInventory />
    // Add other sector inventories as they are implemented
    case "restaurant":
      // return <RestaurantInventory />
      return <PlaceholderInventory sectorName="Restaurant" />
    case "pharmacy":
      // return <PharmacyInventory />
      return <PlaceholderInventory sectorName="Pharmacy" />
    case "hotel":
      // return <HotelInventory />
      return <PlaceholderInventory sectorName="Hotel" />
    case "agribusiness":
      // return <AgribusinessInventory />
      return <PlaceholderInventory sectorName="Agribusiness" />
    case "construction":
      // return <ConstructionInventory />
      return <PlaceholderInventory sectorName="Construction" />
    default:
      return <PlaceholderInventory sectorName="Business" />
  }
}

// Placeholder for sectors that haven't been implemented yet
const PlaceholderInventory = ({ sectorName }) => {
  return (
    <div style={{ textAlign: "center", padding: "3rem", backgroundColor: "white", borderRadius: "8px" }}>
      <h2>{sectorName} Inventory Management</h2>
      <p style={{ marginTop: "1rem", color: "#6c757d" }}>
        The {sectorName.toLowerCase()} inventory management is under development. Please check back soon for
        sector-specific features and functionality.
      </p>
    </div>
  )
}

export default Inventory
