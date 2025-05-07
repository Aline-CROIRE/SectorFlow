import { useSector } from "../contexts/SectorContexts"

const Sales = () => {
  const { sector } = useSector()

  // Placeholder for sales page
  return (
    <div style={{ textAlign: "center", padding: "3rem", backgroundColor: "white", borderRadius: "8px" }}>
      <h2>{getSectorName(sector)} Sales Management</h2>
      <p style={{ marginTop: "1rem", color: "#6c757d" }}>
        The sales management module for {getSectorName(sector).toLowerCase()} is under development. This will include
        features like:
      </p>
      <ul
        style={{
          listStyle: "none",
          marginTop: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          maxWidth: "400px",
          margin: "1.5rem auto",
        }}
      >
        <li>• Point of Sale (POS) system</li>
        <li>• Sales history and reporting</li>
        <li>• Customer management</li>
        <li>• Discounts and promotions</li>
        <li>• Receipt generation</li>
      </ul>
    </div>
  )
}

// Helper function to get sector name
const getSectorName = (sector) => {
  switch (sector) {
    case "retail":
      return "Retail"
    case "restaurant":
      return "Restaurant"
    case "pharmacy":
      return "Pharmacy"
    case "hotel":
      return "Hotel"
    case "agribusiness":
      return "Agribusiness"
    case "construction":
      return "Construction"
    default:
      return "Business"
  }
}

export default Sales
