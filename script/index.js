console.log(areageojson);
const pointJson = {
  features: [],
  type: "FeatureCollection"
}

areageojson.features.forEach((item, index) => {
  const { properties } = item

  if (properties.name) {
    const newObj = {
      properties: JSON.parse(JSON.stringify(properties)),
      geometry: { type: "Point", coordinates: JSON.parse(JSON.stringify(properties.center)) }
    }
    pointJson.features.push(newObj)
  }
})

console.log(pointJson);