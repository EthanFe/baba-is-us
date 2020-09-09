import React from 'react';

const calcEntitiesByRow = (entities) => {
  const entitiesByRow = {}
  entities.forEach(entity => {
    if (!entitiesByRow[entity.y]) { entitiesByRow[entity.y] = [] }
    entitiesByRow[entity.y].push(entity)
  })
  return entitiesByRow
}

const Grid = ({gameState}) => {
  const {width, height} = gameState
  const entities = calcEntitiesByRow(gameState.entities)

  const rows = []
  for (var y = 0; y < height; y++) {
    rows.push(<GridRow key={y} width={width} entities={entities[y] || []} />)
  }

  return (
    <div style={{margin: "0px 30px"}}>
      {rows}
    </div>
  )
}

const GridRow = ({width, entities}) => {
  const tiles = []
  for (var x = 0; x < width; x++) {
    tiles.push(<Tile key={x} entities={entities.filter(entity => entity.x === x)} />)
  }

  return (
    <div style={{height: "64px", display: "flex"}}>
      {tiles}
    </div>
  )
}

const Tile = ({entities}) => {
  const style = {
    width: "64px",
    height: "100%",
    border: "1px grey solid",
    backgroundColor: "black",

    // text bullshit
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }

  const entity = entities[0] // we only display one entity because we're lazy lol

  let textToDisplay = ""

  if (entity !== undefined) {
    if (entity.type === "text") {
      style.textTransform = "uppercase"
      textToDisplay = entity.value
    } else {
      textToDisplay = entity.type
    }
  }

  return entity && (entity.type === "baba" || entity.type === "keke")
          ? <img 
              style={style}
              src={require(`../images/${entity.type}.png`)}
              alt=""
            />
          : <div style={style}>{textToDisplay}</div>
}

export default Grid;