import './Featured.css'
import React from 'react'

function Featured() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img className="featuredImg" src="https://t-cf.bstatic.com/xdata/images/city/540x270/620099.webp?k=93e8bfacbaec3c2a2b846d44fbd383dec7e37861abae778f316c499c91e1ae4c&o=" alt="featuredLocations" />
        <div className="featuredTitles">
        <h1>Orlando, FL</h1>
        <h2>3684 properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img className="featuredImg" src="https://t-cf.bstatic.com/xdata/images/city/540x270/856674.webp?k=70a9589c2f7d2fc175c3ac02c55702c2e433f588866756a394cddfe215170f38&o=" alt="featuredLocations" />
        <div className="featuredTitles">
        <h1>New York, NY</h1>
        <h2>1382 properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img className="featuredImg" src="https://t-cf.bstatic.com/xdata/images/city/540x270/349717.webp?k=15138e712e1083b40d0c1164fad96f5adce36dbe3707fe483f516a555765e561&o=" alt="featuredLocations" />
        <div className="featuredTitles">
        <h1>Las Vegas, NV</h1>
        <h2>900 properties</h2>
        </div>
      </div>
    </div>
  )
}

export default Featured