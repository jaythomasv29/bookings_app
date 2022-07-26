import { useContext, useState } from 'react'
import { faHeartCircleExclamation, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import Mailer from '../../components/mailer/Mailer'
import Footer from '../../components/footer/footer'
import Navbar from '../../components/navbar/Navbar'
import './hotel.css'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import { calculateDateDifference } from '../../utils/utils'
import Reserve from '../../components/reserve/Reserve'

const HOTEL_PHOTOS = [
  {
    id: 10,
    src: "https://t-cf.bstatic.com/xdata/images/landmark/max1024/200553.webp?k=fabaa471cca6c897a1b7f4f66fe5c96be8cd2aac0f5f60f855f9b9541f05fcf7&o="
  },
  {
    id: 11,
    src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/328908582.jpg?k=e9c8b756cb4294bfb9b19f048334cff4a59bd073c4aeffe8bec6499281f559a4&o=&hp=1"
  },
  {
    id: 12,
    src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/328908287.jpg?k=17bfdac954203cccdd46940f0f4e5addab58a4e08e1d80dd269662287fdb0dcd&o=&hp=1"
  },
  {
    id: 13,
    src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/328908590.jpg?k=ba2901e08c8ba6ef9faa68b08090c33e1032333b53cf72261fabb6271e2e7d40&o=&hp=1"
  },
  {
    id: 14,
    src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/200848359.jpg?k=bf92b1ff0e98c4f057c899acedac3c118028a88f025c5f9efeca3a1a46228993&o=&hp=1"
  },
  {
    id: 15,
    src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/200846827.jpg?k=d53e194067d77d16dc2c16c22de263a34c41b4a74472bf96687d7aad37ff5ad3&o=&hp=1"
  },
  {
    id: 16,
    src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/200846827.jpg?k=d53e194067d77d16dc2c16c22de263a34c41b4a74472bf96687d7aad37ff5ad3&o=&hp=1"
  },
  {
    id: 17,
    src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/165447875.jpg?k=1f53cd577dd41e493d48f16582946cdd842bd87900b21b43f62f58f8b4279b52&o=&hp=1"
  },
  {
    id: 18,
    src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/374161307.jpg?k=25d10103b4eb672c938683a5487fe0dea37cbd32d7f9442060ed5a2177530389&o=&hp=1"
  }

]

function Hotel() {
  const navigate = useNavigate()
  const location = useLocation()
  const { dates, options } = useContext(SearchContext)
  const { user } = useContext(AuthContext)

  const dateDiff = calculateDateDifference(dates[0]?.endDate, dates[0]?.startDate)
  const { data, loading, error } = useFetch(`/hotels/find/${location.state?.hotelId}`)
  const [ openModal, setOpenModal ] = useState(false)

  const handleClick = () => {
    if (user) {
      setOpenModal(!openModal)
    } else
      navigate('/login')
  }
  return (
    <div>

      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">

        <div className="hotelWrapper">
          {/* <button onClick={handleClick} className="bookNowBtn primaryButton">Book Now</button> */}
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon style={{ fontSize: "20px", color: "#0071c2" }} icon={faLocationDot} />
            <span>{data.address}, {data.city}</span>
            <span className="hotelDistance">
              Excellent location - {data.distance} from center
            </span>
          </div>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {
              HOTEL_PHOTOS.map((photo, idx) => (
                <div key={photo.id} className="hotelImgWrapper">
                  <img className="hotelImg" src={photo.src} alt="hotel-preview-display" />
                </div>
              ))
            }
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsText">

              <h2 className="hotelTitle">{data.name}</h2>
              <p className="hotelDescription">{data.description}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h2>Perfect for a {dateDiff}-night stay</h2>

              <span>
                <FontAwesomeIcon icon={faHeartCircleExclamation} style={{ marginRight: "5px" }} />
                Located in the real heart of Paris, this property has an excellent location score of 9.8!
              </span>
              <h2><b>${data.cheapestPrice * dateDiff * options.room}</b> ({dateDiff} night stay, {options.room} rooms)</h2>
              <p className='breakfastInfo'>Breakfast Info</p>
              <p className='breakfastDescription'>Complimentary breakfast, Breakfast to go</p>
              <button onClick={handleClick} className='primaryButton'>Reserve Now!</button>
            </div>
          </div>
            {
              openModal &&
              <Reserve options={options} hotelId={location.state?.hotelId}setOpenModal={setOpenModal}/>
            }
          <Mailer />
          <Footer />

        </div>
         

      </div>
           
    </div>

  )
}

export default Hotel