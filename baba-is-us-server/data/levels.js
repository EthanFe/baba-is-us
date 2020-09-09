const levelLayouts = [
  {
    name: "the first level",
    width: 9,
    height: 9,
    entities: [
      {x: 4, y: 3, type: "baba"},
      {x: 1, y: 3, type: "text", value: "baba"},
      {x: 1, y: 4, type: "text", value: "is"},
      {x: 1, y: 5, type: "text", value: "you"},

      {x: 4, y: 5, type: "keke"},
      {x: 7, y: 3, type: "text", value: "keke"},
      {x: 7, y: 4, type: "text", value: "is"},
      {x: 7, y: 5, type: "text", value: "me"},

      {x: 4, y: 4, type: "flag"},
      {x: 2, y: 1, type: "text", value: "flag"},
      {x: 6, y: 1, type: "text", value: "is"},
      {x: 5, y: 7, type: "text", value: "win"}
    ]
  },
  {
    name: "tbh, i didn't think of level names",
    width: 11,
    height: 8,
    entities: [
      {x: 2, y: 2, type: "baba"},
      {x: 8, y: 2, type: "keke"},
      {x: 2, y: 4, type: "flag"},
      {x: 8, y: 4, type: "flag"},
      {x: 2, y: 7, type: "text", value: "baba"},
      {x: 3, y: 7, type: "text", value: "is"},
      {x: 4, y: 7, type: "text", value: "you"},
      {x: 6, y: 7, type: "text", value: "keke"},
      {x: 7, y: 7, type: "text", value: "is"},
      {x: 8, y: 7, type: "text", value: "me"},
      {x: 3, y: 3, type: "text", value: "flag"},
      {x: 5, y: 0, type: "text", value: "is"},
      {x: 7, y: 3, type: "text", value: "win"},
      {x: 5, y: 1, type: "rock"},
      {x: 5, y: 2, type: "rock"},
      {x: 5, y: 3, type: "rock"},
      {x: 5, y: 4, type: "rock"},
      {x: 5, y: 5, type: "rock"},
      {x: 5, y: 6, type: "rock"},
      {x: 5, y: 7, type: "rock"},
      {x: 3, y: 0, type: "rock"},
      {x: 7, y: 0, type: "rock"},
      {x: 10, y: 5, type: "text", value: "rock"},
      {x: 10, y: 6, type: "text", value: "is"},
      {x: 10, y: 7, type: "text", value: "stop"},
    ]
  },
  {
    name: "but here we are anyway.",
    width: 3,
    height: 4,
    entities: [
      {x: 0, y: 1, type: "text", value: "this"},
      {x: 1, y: 1, type: "text", value: "level"},
      {x: 2, y: 1, type: "text", value: "isn't"},
      {x: 0, y: 2, type: "text", value: "implem"},
      {x: 1, y: 2, type: "text", value: "ented"},
      {x: 2, y: 2, type: "text", value: "lol"},
    ]
  },
]

const getLevelLayout = (levelNumber) => {
  const layout = levelLayouts[levelNumber]
  return {
    width: layout.width,
    height: layout.height,
    entities: layout.entities.map(entity => ({...entity}))
  }
}

module.exports = { getLevelLayout, levelLayouts }