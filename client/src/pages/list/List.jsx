import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { useLocation } from 'react-router-dom'

import './list.css'
import { useState } from 'react'
import { format, setDate } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'

function List() {
  const location = useLocation()
  const [date, setDate] = useState(location.state.date)
  const [destination, setDestination] = useState(location.state.destination)
  const [options, setOptions] = useState(location.state.options)
  const [openDate, setOpenDate] = useState(false)

  return (
    <div>
      <Navbar /><Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h2 className="listSearchTitle">Search</h2>
            <div className="listSearchItem">
              <label>Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="listSearchItem dateSearch">
              <label>Check-in date</label>
              <span onClick={() => setOpenDate(!openDate)} className="dateSearchItem">{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {
                openDate &&
                <DateRange
                  onChange={item => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                  className="dateListing"
                />
              }
            </div>
            <div className="listSearch">
              <label>Options</label>
              <div className="listItemOptions">
                <div className="listSearchOptionItem">
                  <span className="listOptionText">Min price <small>per night</small></span>
                  <input type="number" className="listOptionInput" />
                </div>
                <div className="listSearchOptionItem">
                  <span className="listOptionText">Max price <small>per night</small></span>
                  <input type="number" className="listOptionInput"min={1} />
                </div>
                <div className="listSearchOptionItem">
                  <span className="listOptionText">Adult(s)</span>
                  <input type="number" className="listOptionInput" placeholder={options.adult} min={1} />
                </div>
                <div className="listSearchOptionItem">
                  <span className="listOptionText">Children </span>
                  <input type="number" className="listOptionInput" placeholder={options.children} min={0} />
                </div>
                <div className="listSearchOptionItem">
                  <span className="listOptionText">Room </span>
                  <input type="number" className="listOptionInput" placeholder={options.room} min={1} />
                </div>
              </div>
              <button>Search</button>
            </div>
          </div>
          <div className="listResult">
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
          </div>
        </div>
      </div>
    </div>
  )
}

export default List