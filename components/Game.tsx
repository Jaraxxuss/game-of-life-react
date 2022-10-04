import React, { useCallback, useMemo, useState } from 'react'
import { generateMatrix, generateEmptyMatrix, generateNextMatrix, isAlive } from '../service/GameService'
import { useInterval } from 'react-interval-hook'
import { clsx } from 'clsx'


import styles from '../styles/Game.module.css'

interface GameProps {
    height: number;
    width: number;
}

const Game = ({
    height,
    width
}: GameProps): JSX.Element => {

    const [matrix, setMatrix] = useState<number[][]>(generateEmptyMatrix(width, height))
    const [generation, setGeneration] = useState(0)

    const callback = useCallback(() => {
        const generatedMatrix = generateNextMatrix(matrix)

        setMatrix(generatedMatrix)
        setGeneration(prev => prev + 1)
    }, [matrix, setMatrix, setGeneration])

    const options = useMemo(() => ({
        autoStart: false,
        immediate: false,
        selfCorrecting: false,
        onFinish: () => {
            console.log('Callback when timer is stopped')
        },
    }), [])

    const { start, stop, isActive } = useInterval(
        callback,
        1000,
        options
    )

    const handleStartBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const generatedMatrix = generateMatrix(width, height)

        setMatrix(generatedMatrix)
        setGeneration(1)
        start()
    }

    const handlePauseBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        stop()
    }

    const handleContinueBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        start()
    }

    const handleStopBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setMatrix(generateEmptyMatrix(width, height))
        setGeneration(0)
        stop()
    }

    return (
        <div>
            <div>Game Of Life</div>
            <div>Generation: {generation}</div>
            <div>
                {
                    matrix
                        .map((numbers, i) => {
                            return (
                                <div key={i} className={styles.row}>
                                    {
                                        numbers
                                            .map((number, j) => (
                                                <div key={j} className={clsx([isAlive(number) ? styles.columnActive : styles.column])}>
                                                    {number}
                                                </div>
                                            ))
                                    }
                                </div>
                            )
                        })
                       

                }
            </div>
            <div>
                <button onClick={handleStartBtnClick}>
                    Start
                </button>
                <button onClick={handlePauseBtnClick}>
                    Pause
                </button>
                <button onClick={handleContinueBtnClick}>
                    Continue
                </button>
                <button onClick={handleStopBtnClick}>
                    Stop
                </button>
            </div>

        </div>
    )
}
  
export default Game