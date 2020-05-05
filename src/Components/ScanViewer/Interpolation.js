function Interpolate(data, factor) {
  var level = factor
  var i_row = []
  var interpolated_array = []
  var interpolated_rows = []
  //2D iterpolation for x axis
  for (var k = 0; k < data.length; k++) {
    i_row.push(data[k][0])
    for (var i = 0; i < data[k].length - 1; i++) {
      var fark = data[k][i] - data[k][i + 1]
      for (var y = 0; y < level; y++) {
        i_row.push(parseInt(data[k][i] - (fark / (level + 1) * (y + 1))))
      }
      i_row.push(data[k][i + 1])
    }
    interpolated_array.push(i_row)
    i_row = []
  }
  //2D iterpolation for y axis
  for (i = 0; i < interpolated_array.length - 1; i++) {
    for (k = 0; k < level; k++) {
      for (var j = 0; j < interpolated_array[0].length; j++) {
        fark = interpolated_array[i][j] - interpolated_array[i + 1][j]
        i_row.push(parseInt(interpolated_array[i][j] - (fark / (level + 1) * (k + 1))))
        if (interpolated_array[0].length - 1 === j) {
          interpolated_rows.push(i_row)
          i_row = []
        }
      }
    }
    i_row = []
  }
  var result = []
  j = 0
  for (let i = 0; i < interpolated_array.length - 1; i++) {
    result.push(interpolated_array[i])
    for (j; j < ((i + 1) * level); j++) {
      result.push(interpolated_rows[j])
    }
  }
  result.push(interpolated_array[interpolated_array.length - 1])
  return result
}

module.exports = Interpolate