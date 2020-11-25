import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useSelector, shallowEqual } from 'react-redux'
import WatchLists from "./childrenComponents/WatchLists";
import { CSSTransition } from 'react-transition-group'

library.add(faPlusCircle)
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
        icon={["fas", "plus-circle"]}
        size="4x"
      />
      <CSSTransition
        in={show}
        unmountOnExit={true}
        timeout={1000}
        classNames="watchLists">
        {watchLists.length > 0 ?
          <WatchLists watchLists={watchLists} />
          :
          <div></div>
        }
      </CSSTransition>
    </div>
  )
}

export default FloatingButton
