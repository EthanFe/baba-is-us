const combineStyles = styles => {
  const styleObject = {}
  styles.forEach(style => {
    if (style.if && style.thenUse) {
      Object.assign(styleObject, style.thenUse)
    } else if (style.if === undefined && style.thenUse === undefined) {
      Object.assign(styleObject, style)
    }
  })
  return styleObject
}

export { combineStyles }