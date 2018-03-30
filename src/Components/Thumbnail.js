import React from 'react'
import './Thumbnail.css'

export default ({src,caption}) =>
  <div className="Thumbnail">
    <div className="Thumbnail-image" style={{backgroundImage:`url(${src})`}}/>
    <span className="Thumbnail-caption">{caption}</span>
  </div>