import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import { useContext, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import './reserve.css'

const Reserve = ({ setOpenModal, hotelId, options }) => {
  const [count] = useState(options.room)
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`)
  const [selectedRooms, setSelectedRooms] = useState([])
  const { dates } = useContext(SearchContext)
  console.log(data)

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  // console.log(alldates);

  const isRoomAvailable = (roomNumber) => {
    const isAvailable = roomNumber.unavailableDates.some(date => {
      return alldates.includes(new Date(date).getTime())
    }
    );

    return !isAvailable;
  };

  const handleSelect = (e) => {
    const selected = e.target.checked
    const value = e.target.value
    setSelectedRooms(selected ? [...selectedRooms, value] : selectedRooms.filter(room => room !== value))
    console.log(value)
  }

  const handleReserve = async () => {
    try {
      await Promise.all(
        selectedRooms.map(roomId => {
          const res = axios.put(`/rooms/availability/${roomId}`, {dates: alldates})
          return res.data
        })
      )
      setOpenModal(false)
    } catch (err) {
      
    }
  }
  return (
    <div className="reserve">
      <div className="reserveContainer">
        <HighlightOffIcon className="closeReserve" onClick={() => setOpenModal(false)} />
        {
          !loading &&
          <span className="reserveSelectTitle">Select your room(s):</span>
        }
        {
          loading ? <div>Loading...</div> :
            data.map(room => (
              <>
                <div className="reserveItem">
                  <div className="reserveItemInfo">
                    <div className="reserveTitle">{room.title}:</div>
                    <div className="reserveDesc">
                      Price: ${room.price} / night
                    </div>
                    <div className="reserveDesc">{room.desc}</div>
                    <div className="reserveOccupancy">Max Occupancy: {room.maxPeople}</div>
                  </div>

                  <div className="room">
                    {
                      room.roomNumbers.map(roomNumber => {
                        
                          return <div className={`${isRoomAvailable(roomNumber) ? 'availableRoom' : 'unavailableRoom'} roomCheckbox`}>
                            <label className="roomNumber">Rm #{roomNumber.number}</label>
                            <div className="roomStatusContainer">

                            {
                              isRoomAvailable(roomNumber) ? 
                              <span className='roomStatus'>available <EventAvailableIcon /></span>
                              :
                              <span className='roomStatus'>unavailable <EventBusyIcon /></span> 
                            }
                            </div>
                            <input className="unavailableRoom" disabled={count === selectedRooms.length && !selectedRooms.includes(roomNumber._id) || !isRoomAvailable(roomNumber)} type="checkbox" value={roomNumber._id} onChange={handleSelect} />
                          </div>
                         
                      })
                    }
                  </div>
                </div>
              </>
            ))
        }
        <button onClick={handleReserve} className='reserveBtn'>Reserve</button>


      </div>
    </div>
  )
}

export default Reserve