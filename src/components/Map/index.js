import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Pins from './Pins'
import PopUpDisplay from './Popup'
import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
} from 'react-map-gl'
import { FullscreenControlDiv, NavDiv, ScaleControlDiv } from './styles'

const mapboxApiAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const Map = ({ pins }) => {
  const [popUp, setPopUp] = useState(null)
  const [viewport, setViewport] = useState({
    latitude: 40.67,
    longitude: -73.94,
    zoom: 2,
    bearing: 0,
    pitch: 0,
  })
  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle='mapbox://styles/mapbox/dark-v10?optimize=true'
      mapboxApiAccessToken={mapboxApiAccessToken}
      width='100%'
      height='100%'
    >
      <Pins data={pins} onClick={setPopUp} />
      {popUp && (
        <PopUpDisplay popupInfo={popUp} onClose={() => setPopUp(null)} />
      )}
      <FullscreenControlDiv>
        <FullscreenControl />
      </FullscreenControlDiv>
      <NavDiv>
        <NavigationControl />
      </NavDiv>
      <ScaleControlDiv>
        <ScaleControl />
      </ScaleControlDiv>
    </ReactMapGL>
  )
}

Map.propTypes = {
  pins: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    })
  ),
}

Map.defaultProps = {
  pins: null,
}

export default Map
