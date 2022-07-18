import './Mailer.css'

function Mailer() {
  return (
    <div className='mailer'>
      <h2 className='mailTitle'>Save time, save money!
      </h2>
      <p className='mailDesc'>Sign up and we'll send the best deals to you
      </p>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your email"/>
        <button>Subscribe</button>
      </div>
      <div className='checkbox'>
      <input type="checkbox" name="" id="" />
    Send me a link to get the FREE Booking.com app!
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Mailer