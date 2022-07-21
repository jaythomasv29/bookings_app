import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCar, faMountainSun, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays, faUser } from '@fortawesome/free-regular-svg-icons'
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './Header.css'
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext'

function Header({ type }) {
  const { dispatch } = useContext(SearchContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [openDate, setOpenDate] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [destination, setDestination] = useState("")
  const [openOption, setOpenOption] = useState(false)
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  })

  const handleOption = (optionType, action) => {
    setOptions(prev => {
      return {
        ...prev,
        [optionType]: action === "i" ? prev[optionType]++ : prev[optionType]--
      }
    })
  }

  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, options }
    })
    navigate('/hotels', { state: { destination, dates, options } })
  }

  return (
    <div className='header'>
      {/* <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}> */}
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faMountainSun} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>

        {type !== 'list' &&
          <>
            <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
            <p className="headerDesc">Get rewarded for your travels - unlock instant savings of 10% or more with a free Booking.com account</p>
            {
              !user &&
              <button className="headerBtn">Sign in / Register</button>
            }
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input onChange={(e) => setDestination(e.target.value)} type="text" placeholder='Where are you going' className='headerSearchInput' />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{format(dates[0].startDate, "MM/dd/yyyy")} to {format(dates[0].endDate, "MM/dd/yyyy")}</span>
                {openDate &&
                  <DateRange
                    minDate={new Date()}
                    editableDateInputs={true}
                    onChange={item => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                  />}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faUser} className="headerIcon" />

                <span onClick={() => setOpenOption(!openOption)} className='headerSearchText'>{options.adult} adult - {options.children} children - {options.room} room</span>
                {
                  openOption &&
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className='optionCounter'>
                        <button
                          onClick={() => handleOption('adult', "d")}
                          disabled={options["adult"] <= 0}
                          className={`optionCounterButton ${options["adult"] <= 0} ? 'disabled' : '' `}>-</button>
                        <span className="optionCounterNumber">{options.adult}</span>
                        <button
                          onClick={() => handleOption('adult', "i")}
                          className="optionCounterButton">+</button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className='optionCounter'>
                        <button
                          onClick={() => handleOption('children', "d")}
                          disabled={options["children"] <= 0}
                          className={`optionCounterButton ${options["children"] <= 0 ? 'disabled' : ''}`}>-</button>
                        <span className="optionCounterNumber">{options.children}</span>
                        <button
                          onClick={() => handleOption('children', "i")}
                          className="optionCounterButton">+</button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className='optionCounter'>
                        <button
                          onClick={() => handleOption('room', "d")}
                          disabled={options["room"] <= 0}
                          className={`optionCounterButton ${options["room"] <= 0 ? 'disabled' : ''}`}>-</button>
                        <span className="optionCounterNumber">{options.room}</span>
                        <button
                          onClick={() => handleOption('room', "i")}
                          className="optionCounterButton">+</button>
                      </div>
                    </div>
                  </div>
                }
              </div>
              <div className="headerSearchItem">
                <button
                  onClick={handleSearch}
                  disabled={(options["adult"] <= 0 || options["room"] === 0)}
                  className={`headerBtn ${(options["adult"] <= 0 || options["room"] === 0) ? 'btnDisabled' : ''}`}>Search</button>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Header