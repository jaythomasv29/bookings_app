import React from 'react'
import { useParams } from 'react-router-dom'

function Hotel() {
  const params = useParams()
  return (
    <div>Hotel {params.id}</div>
  )
}

export default Hotel