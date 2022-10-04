const generateMatrix = (width: number, heigth: number) => {
    return Array(heigth)
        .fill([])
        .map(() => {
            return Array(width)
                .fill(null)
                .map(() => randomInt())
        })
}

const generateEmptyMatrix = (width: number, heigth: number) => {
    return Array(heigth)
        .fill([])
        .map(() => {
            return Array(width)
                .fill(0)
        })
}

const copyMatrix = (matrix: number[][]) => {
    return matrix.map(numbers => numbers.slice())
}

const generateNextMatrix = (matrix: number[][]) => {
    const copiedMatrix = copyMatrix(matrix)

    const res: number[][] = copiedMatrix.map(numbers => numbers.map(() => 0))

    const height = copiedMatrix.length

    for (let i = 0; i < height; i++) {
        const numbers = copiedMatrix[i];

        const width = copiedMatrix[i].length
        
        for (let j = 0; j < width; j++) {
            const number = numbers[j]

            let aliveNeighbors = 0

            for (let h = -1; h <= 1; h++) {

                const verticalIndex = i + h

                if (verticalIndex < 0 || verticalIndex > height - 1) {
                    continue;
                }

                for (let w = -1; w <= 1; w++) {

                    const horizontalIndex = j + w

                    if (horizontalIndex < 0 || horizontalIndex > width - 1) {
                        continue;
                    }

                    if (isAlive(copiedMatrix[verticalIndex][horizontalIndex])) {
                        aliveNeighbors++
                    }

                }
            }

            

            const isAliveCell = isAlive(number)

            if (isAliveCell) {
                aliveNeighbors--
            }

            if (isAliveCell && aliveNeighbors === 2) {
                res[i][j] = 1
            } else if (isAliveCell && aliveNeighbors === 3) {
                res[i][j] = 1
            } else if (!isAliveCell && aliveNeighbors === 3) {
                res[i][j] = 1
            } else {
                res[i][j] = 0
            }

        }
    }

    return res
}

const isAlive = (number: number) => {
    return number === 1
}

const randomInt = () => { 
    return Math.round(Math.random())
}
  

export {
    generateMatrix,
    generateEmptyMatrix,
    generateNextMatrix,
    isAlive
}