import useFetch from '../../hooks/useFetch'
import { capitalize } from '../../utils/utils'

import './featuredProperty.css'

const FEATURED_IMAGES = [
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
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4")
  
  return (
    <>
    <h2 className="homeTitle">Featured Listings</h2>
      <div className="featuredProperty">
        { loading ? "Loading..." :
          data.map((property,idx) => (
            <div key={property._id} className="featuredPropertyItem">
              <div className="featuredPropertyInfo">
                <img className="featuredPropertyImage" src={property.photos[0] || FEATURED_IMAGES[idx].img} alt={property.name} />
                <span className="featuredPropertyName">{capitalize(property.name)}</span>
                <span className="featuredPropertyCity">{capitalize(property.city)}</span>
                <span className="featuredPropertyPrice">Starting from ${property.price}</span>
                {
                  property.rating && 
                  <div className="featuredPropertyRatingContainer">
                <button className="featuredPropertyRating">{property.rating}</button>
                <span className="featuredPropertyCategory">{property.type} &#x2219;</span>
                </div>
              }
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default FeaturedProperty