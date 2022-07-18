import './featuredProperty.css'

const FEATURED_PROPERTIES = [
  {
    id: 1,
    img: "https://t-cf.bstatic.com/xdata/images/hotel/max500/103951224.jpg?k=03736dd4e1e89c1132e4957149e394d01ac6e8f64f4b09e30ade97a6176f0640&o=",
    name: "Aparthotel Stare Miasto",
    city: "Krakow",
    price: 80,
    rating: 8.8,
    category: "Excellent"
  },
  {
    id: 2,
    img: "https://t-cf.bstatic.com/xdata/images/hotel/max500/30565641.jpg?k=5aa6e2c62d9f84253c10d3c625617a70d8a1e93579091081e1229850934bc556&o=",
    name: "Villa Rock",
    city: "Barcelona",
    price: 2873,
    rating: 8.9,
    category: "Excellent"
  },
  {
    id: 3,
    img: "https://t-cf.bstatic.com/xdata/images/hotel/max500/45976851.jpg?k=7bd839dd07e1384ebfde004069e25090a4a901728e9bdc8e200f411ed243999d&o=",
    name: "LivinParis Luxury Suites",
    city: "Paris",
    price: 269,
    rating: 8.2,
    category: "Very Good"
  },
  {
    id: 4,
    img: "https://t-cf.bstatic.com/xdata/images/hotel/max500/109169996.jpg?k=82bee70e09800d9254479024406baebaf45c1482c6627ef44ee35e1df5110dc5&o=",
    name: "Terrace Aparments at City Park",
    city: "Budapest",
    price: 247,
    rating: 9.6,
    category: "Exceptional"
  }
]
function FeaturedProperty() {
  
  return (
    <>
    <h2 className="homeTitle">Featured Listings</h2>
      <div className="featuredProperty">
        {
          FEATURED_PROPERTIES.map(property => (
            <div key={property.id} className="featuredPropertyItem">
              <div className="featuredPropertyInfo">
                <img className="featuredPropertyImage" src={property.img} alt={property.name} />
                <span className="featuredPropertyName">{property.name}</span>
                <span className="featuredPropertyCity">{property.city}</span>
                <span className="featuredPropertyPrice">Starting from ${property.price}</span>
                <div className="featuredPropertyRatingContainer">
                <button className="featuredPropertyRating">{property.rating}</button>
                <span className="featuredPropertyCategory">{property.category} &#x2219; <span className="featuredPropertyReviews">13 review</span></span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default FeaturedProperty