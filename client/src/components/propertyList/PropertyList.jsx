import useFetch from '../../hooks/useFetch'
import './propertyList.css'
const BOOKING_TYPES = [
  "https://r-xx.bstatic.com/xdata/images/xphoto/300x240/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=",
  "https://r-xx.bstatic.com/xdata/images/hotel/300x240/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=",
  "https://r-xx.bstatic.com/xdata/images/xphoto/300x240/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=",
  "https://r-xx.bstatic.com/xdata/images/hotel/300x240/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=",
]
function PropertyList() {

  const { data, loading, error } = useFetch("/hotels/countByType")
  return (
    <>
      <h2 className="homeTitle">Browse by property type</h2>

      {
        loading ? "Loading..." :
          <div className="propertyList">
            {
              BOOKING_TYPES.map((typeImg, idx) => {
                return <div key={typeImg}className="propertyListItem">
                  <img className="propertyListImage" src={typeImg} alt="hotel-property" />
                  <div className="propertyListTitles">
                    <h2>{data[idx]?.propertyType}</h2>
                    <h3>{data[idx]?.count} hotels</h3>
                  </div>
                </div>
              })
            }
          </div>
      }
    </>
  )
}

export default PropertyList