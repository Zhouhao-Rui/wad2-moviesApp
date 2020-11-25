import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBox } from '@fortawesome/free-solid-svg-icons'
import { useSelector, shallowEqual } from 'react-redux'
import WatchLists from "./childrenComponents/WatchLists";

library.add(faBox)
function FloatingButton() {
  const { watchLists } = useSelector(state => ({
    watchLists: state.getIn(["movies", "watchLists"])
  }), shallowEqual)
  const [show, setShow] = useState(false)
  return (
    <div style={{ position: "fixed", right: 0, bottom: 0 }}
      onClick={() => (
        setShow(!show)
      )}>
      <FontAwesomeIcon
        className="text-dark"
        icon={["fas", "box"]}
        size="4x"
      />
      {show && <WatchLists watchLists={watchLists} />}
    </div>
  )
}

export default FloatingButton
