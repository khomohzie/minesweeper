import React, { useState, useEffect } from 'react'
import Cell from './Cell';
import createBoard from '../util/createBoard'
import { revealed } from '../util/reveal';
import Modal from './Modal'
import TopBar from './TopBar'

const Board = () => {

    const [grid, setGrid] = useState([]);
    const [nonMineCount, setNonMineCount] = useState(0);
    const [mineLocations, setMineLocations] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [restart, setRestart] = useState(false);
    const [newTime, setTime] = useState(0);

    // ComponentDidMount
    useEffect(() => {
        // Calling the function to create a board
        freshBoard();
    }, [restart, setRestart])

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(10, 15, 15);

        setNonMineCount(10 * 15 - 15);
        setMineLocations(newBoard.mineLocation);
        setGrid(newBoard.board);
        setTime(0);
        setGameOver(false);
        setRestart(false);
    };

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
    };

    // On Right Click, Flag Cell
    const updateFlag = (e, x, y) => {
        e.preventDefault();
        console.log("Right click");

        let newGrid = JSON.parse(JSON.stringify(grid));
        console.log(newGrid[x][y]);

        newGrid[x][y].flagged = true;
        setGrid(newGrid);
    }

    // Reveal Cell
    // const revealCell = (x, y) => {
    //     let newGrid = JSON.parse(JSON.stringify(grid));

    //     if (newGrid[x][y].value === "X") {
    //         // alert("Mine found!")
    //         for (let i = 0; i < mineLocations.length; i++) {
    //             newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
    //         }

    //         setGrid(newGrid);
    //         setGameOver(true);
    //     } else {
    //         let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);

    //         setGrid(newRevealedBoard.arr);
    //         setNonMineCount(newRevealedBoard.newNonMinesCount);

    //         if (newRevealedBoard.newNonMinesCount === 0) {
    //             setGameOver(true);
    //         }
    //     }
    // }

    const revealCell = (x, y, e) => {
        let newGridValues = JSON.parse(JSON.stringify(grid));
        let newNonMineCount = nonMineCount;
        if (newGridValues[x][y].value === "X") {
            for (let i = 0; i < mineLocations.length; i++) {
                if (
                    !newGridValues[mineLocations[i][0]][mineLocations[i][1]].revealed
                ) {
                    // setInterval(() => {
                    newGridValues[mineLocations[i][0]][
                        mineLocations[i][1]
                    ].revealed = true;
                    setGrid(newGridValues);

                    // }, 500);
                }
            }
            setGameOver(true);
        } else {
            // newGridValues[x][y].revealed = true;
            newGridValues = revealed(newGridValues, x, y, newNonMineCount);
            if (!newGridValues) {
                return;
            }
            setGrid(newGridValues.arr);
            setNonMineCount(newGridValues.newNonMineCount);
        }
    };

    return (
        <div>
            <TopBar gameOver={gameOver} setTime={setTime} newTime={newTime} />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                }}
            >
                {gameOver && <Modal restartGame={restartGame} completeTime={newTime} />}
                {grid.map((singleRow, index1) => {
                    return (
                        <div key={index1} style={{ display: "flex" }}>
                            {singleRow.map((singleBlock, index2) => {
                                return (
                                    <Cell
                                        details={singleBlock}
                                        updateFlag={updateFlag}
                                        revealCell={revealCell}
                                        key={index2}
                                    />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )


}

export default Board
