import './Featured.css'
import React from 'react'
import useFetch from '../../hooks/useFetch'


function Featured() {
  const { data, loading, error } = useFetch("/hotels/countByCity?cities=dallas,london,tokyo")
  return (
    <div className="featured">
      {loading ? "Loading data..." :
        <>
          <div className="featuredItem">
            <img className="featuredImg" src="https://t-cf.bstatic.com/xdata/images/city/540x270/620099.webp?k=93e8bfacbaec3c2a2b846d44fbd383dec7e37861abae778f316c499c91e1ae4c&o=" alt="featuredLocations" />
            <div className="featuredTitles">
              <h1>Dallas, TX</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img className="featuredImg" src="https://t-cf.bstatic.com/xdata/images/city/540x270/856674.webp?k=70a9589c2f7d2fc175c3ac02c55702c2e433f588866756a394cddfe215170f38&o=" alt="featuredLocations" />
            <div className="featuredTitles">
              <h1>London, UK</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img className="featuredImg" src="https://d1ix9yerv4y8lr.cloudfront.net/blog/wp-content/uploads/2019/07/tokyo-ops-7-19-750x375.jpg" alt="featuredLocations" />
            <div className="featuredTitles">
              <h1>Tokyo, JPN</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
          </> 
          }
        </div>
  )
}

export default Featured