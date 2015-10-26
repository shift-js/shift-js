String.raw`func minMax(array: [Int]) -> (var min: Int, var max: Int) {
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}`

String.raw``

String.raw``

String.raw``


























