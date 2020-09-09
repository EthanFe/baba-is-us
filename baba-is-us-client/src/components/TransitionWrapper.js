import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const TransitionWrapper = ({diffData, children, scale, transitionTime}) => {

  const [cachedRenderContent, setCachedRenderContent] = useState(null)
  const [currentData, setCurrentData] = useState(null)
  const [transitionState, setTransitionState] = useState("maximized")

  useEffect(() => {
    if (currentData !== diffData) {
      setCurrentData(diffData)
      setTransitionState("minimized")
      setTimeout(() => {
        setCachedRenderContent(children)
        setTransitionState("maximized")
      }, transitionTime * 1000 / 2)
    } else if (transitionState === "maximized") {
      setCachedRenderContent(children)
    }
  })

  return (
    <div style={{transform: `scale(${scale})`}}>
      <div className={"transition-wrapper " + transitionState} style={{transition: `all ${transitionTime / 2}s`}}>
        {cachedRenderContent}
      </div>
    </div>
  );

}

export default TransitionWrapper