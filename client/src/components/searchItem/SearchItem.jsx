import './searchItem.css'

function SearchItem() {
  return (
    <div className="searchItem">
      <img src="https://t-cf.bstatic.com/xdata/images/hotel/square200/239424471.webp?k=2a94f06794fe58832b32a5797c7bcd45f61dc7d896e99fe5744462303ea11d8e&o=&s=1" alt="destination-search-listing" className="searchImage" />
      <div className="searchItemDescription">
        <h2 className="searchItemTitle">Tower Street Apartments</h2>
        <span className="searchItemDistance">500m from center</span>
        <span className="searchItemTaxiOption">Free airport taxi</span>
        <span className="searchItemSubtitle">Hotel with king size bed and ammenities</span>
        <span className="searchItemFeatures">400 sq ft 	&#8226; King size bed 	&#8226; 24-hour lounge</span>
        <span className="searchItemCancelOption">Free cancellation</span>
        <span className="searchOptionCancelSubtitle">
          You can cancel later, so lock in this great rate today!
        </span>
      </div>
      <div className="searchItemDetails">
        <div className="ratingsWrapper">
          <div className="ratingCategoryContainer">
            <h4>Excellent</h4>
            <p>583 reviews</p>
          </div>
          <div className="ratingScaleContainer">
            <p className="ratingScale">9.2</p>
          </div>
        </div>
        <p className="comfortScaleTitle">
          Comfort 9.1
        </p>
        <div className="searchItemRate">
          <p>7 nights, 2 adults</p>
          <h2>$1,120</h2>
        </div>
        <button className="checkAvailabilityButton">See availability &#8594;</button>
      </div>
    </div>
  )
}

export default SearchItem