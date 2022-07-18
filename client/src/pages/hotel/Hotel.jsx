import { useState } from 'react'
import { faHeartCircleExclamation, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams } from 'react-router-dom'
import Header from '../../components/header/Header'
import Mailer from '../../components/mailer/Mailer'
import Footer from '../../components/footer/footer'
import Navbar from '../../components/navbar/Navbar'
import './hotel.css'

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
  const [slideNumber, setSlideNumber] = useState(0)
  const [slider, setSlider] = useState(true)

  const handleSlider = (idx) => {
    setSlideNumber(idx)
    setSlider(!slider)
  }
  return (
    <div>
        

      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
     
        <div className="hotelWrapper">
          <button className="bookNowBtn primaryButton">Book Now</button>
          <h1 className="hotelTitle">Grand Hotel</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon style={{ fontSize: "20px", color: "#0071c2" }} icon={faLocationDot} />
            <span>125 Elton St New York</span>
            <span className="hotelDistance">
              Excellent location - 500m from center
            </span>
          </div>
          <span className="hotelPriceHighlight">
            Book a stay over $114 at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            { 
              HOTEL_PHOTOS.map((photo, idx) => (
                <div key={photo.id} className="hotelImgWrapper">
                  <img onClick={() => handleSlider(idx)} className="hotelImg" src={photo.src} alt="hotel-preview-display" />
                </div>
              ))
            }
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsText">

              <h2 className="hotelTitle">Hotel Louison</h2>
              <p className="hotelDescription">Hotel Louison is located in central Paris, 1,650 feet from the Montparnasse Bienvenüe Metro (lines 4, 6, 12 and 13). <br />
                Free WiFi is available throughout the hotel.  Eco-label certified, the hotel has soundproofed and air-conditioned rooms with elevator access and satellite TV.  <br />
                <p className="hotelDescription">
                  <br />
                  The hotel is 2,650 feet from the Bon Marche and 0.8 mi from Saint-Germain-des-Prés. From the Montparnasse Bienvenüe Metro, guests can quickly access the rest of central Paris.
                  <br />
                </p>
                <p className="hotelDescription">
                  This is our guests' favorite part of Paris, according to independent reviews.
                  <br />
                </p>
                <p className="hotelDescription">
                  Among our eco-responsible commitments, we chose to offer breakfast served at the table. This is why we created four different formula : Parisian, Healthy, and a gourmet for each. <br /> However, guests can ask our team if they want other homemade waffles or pastries.Every evening, a buffet offering drinks is available free of charge in the hotel lobby.
                </p>
                <p className='hotelDescription'>
                  Among our eco-responsible commitments, we chose to offer breakfast served at the table. This is why we created four different formula : Parisian, Healthy, and a gourmet for each. <br /> However, guests can ask our team if they want other homemade waffles or pastries.Every evening, a buffet offering drinks is available free of charge in the hotel lobby.
                  Couples in particular like the location – they rated it 9.1 for a two-person trip.</p>
              </p>
              <p className="hotelDescription">Hotel Louison is located in central Paris, 1,650 feet from the Montparnasse Bienvenüe Metro (lines 4, 6, 12 and 13). <br />
                Free WiFi is available throughout the hotel.  Eco-label certified, the hotel has soundproofed and air-conditioned rooms with elevator access and satellite TV.  <br />
                <p className="hotelDescription">
                  <br />
                  The hotel is 2,650 feet from the Bon Marche and 0.8 mi from Saint-Germain-des-Prés. From the Montparnasse Bienvenüe Metro, guests can quickly access the rest of central Paris.
                  <br />
                </p>
                <p className="hotelDescription">
                  This is our guests' favorite part of Paris, according to independent reviews.
                  <br />
                </p>
                <p className="hotelDescription">
                  Among our eco-responsible commitments, we chose to offer breakfast served at the table. This is why we created four different formula : Parisian, Healthy, and a gourmet for each. <br /> However, guests can ask our team if they want other homemade waffles or pastries.Every evening, a buffet offering drinks is available free of charge in the hotel lobby.
                </p>
                <p className='hotelDescription'>
                  Among our eco-responsible commitments, we chose to offer breakfast served at the table. This is why we created four different formula : Parisian, Healthy, and a gourmet for each. <br /> However, guests can ask our team if they want other homemade waffles or pastries.Every evening, a buffet offering drinks is available free of charge in the hotel lobby.
                  Couples in particular like the location – they rated it 9.1 for a two-person trip.</p>
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h2>Perfect for a 9-night stay</h2>
              <span>
                <FontAwesomeIcon icon={faHeartCircleExclamation} style={{marginRight: "5px"}} />
                Located in the real heart of Paris, this property has an excellent location score of 9.8!
              </span>
              <h2><b>$945</b> (9 nights)</h2>
              <p className='breakfastInfo'>Breakfast Info</p>
              <p className='breakfastDescription'>Complimentary breakfast, Breakfast to go</p>

              <button className='primaryButton'>Reserve Now!</button>
            </div>
          </div>
        <Mailer />
        <Footer />
        </div>
        
      </div>
       
    </div>

  )
}

export default Hotel