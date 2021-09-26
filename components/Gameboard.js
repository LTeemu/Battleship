import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Pressable, Button, TouchableOpacity } from 'react-native'
import Entypo from "@expo/vector-icons/Entypo"
import styles from '../style/style'
import update from 'immutability-helper'

const DEFAULT = "plus";
const HIT = 'circle';
const MISS = 'cross';

let shipCount = 3;
let bombCount = 15;
let timeLimit = 30;
let defaultStatus = 'Game has not started.';

let initialBoard = [
    DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT,
    DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT,
    DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT,
    DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT,
    DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT];

export default function Gameboard() {

    const [board, setBoard] = useState(initialBoard);
    const [ships, setShips] = useState([]);
    const [gameOn, setGameOn] = useState(false);
    const [status, setStatus] = useState(defaultStatus);
    const [time, setTime] = useState(timeLimit);
    const [shipsLeft, setShipsLeft] = useState(shipCount);
    const [bombs, setBombs] = useState(bombCount);
    const [hits, setHits] = useState(0);

    const COL = board.length / 5;
    const ROW = board.length / 5;
    const items = [];
    const timerRef = useRef();

    useEffect(() => {
        randomShips();
    }, []);

    useEffect(() => {
        if (shipsLeft === 0 || bombs === 0 || time === 0) {
            stopGame();
        }
    }, [bombs, shipsLeft, time]);

    for (let x = 0; x < ROW; x++) {
        const cols = [];
        for (let y = 0; y < COL; y++) {
            cols.push(
                <Pressable
                    //disabled={!gameOn}
                    key={y * COL + x}
                    style={styles.item}
                    onPress={() => { gameOn ? checkGuess(y * COL + x) : board === initialBoard ? setStatus('Press the start button first.') : '' }}>
                    <Entypo key={y * COL + x}
                        name={board[y * COL + x]}
                        size={40}
                        color={itemColor(y * COL + x)} />
                </Pressable>
            );
        }
        let row =
            <View key={"row" + x}>
                {cols.map((item) => item)}
            </View>
        items.push(row);
    }

    function randomShips() {
        const tempList = [];
        for (let n = 0; n < shipCount; n++) {
            let random = Math.floor((Math.random() * board.length)) + 0;
            if (tempList.includes(random)) {
                n--;
            } else {
                tempList.push(random);
            }
        }
        setShips(tempList);
    }

    function checkGuess(number) {
        if (board[number] === DEFAULT) {
            const newBoard = update(board, {
                [number]: {
                    $set: ships.includes(number) ? HIT : MISS
                }
            })
            setBoard(newBoard);
            if (ships.includes(number)) {
                setShipsLeft(shipsLeft - 1);
                setHits(hits + 1);
            }
            setBombs(bombs - 1)
        }
    }

    function itemColor(number) {
        if (board[number] === HIT) {
            if (gameOn === false) {
                return "lightgreen";
            } else {
                return "green";
            }
        }
        else if (board[number] === MISS) {
            if (gameOn === false) {
                return "pink";
            } else {
                return "red";
            }
        }
        else {
            if (gameOn === false) {
                return "lightblue";
            } else {
                return "#78c0de";
            }
        }
    }

    function startGame() {
        setGameOn(true);
        setStatus('Game is on.');
        startTimer();
    }

    function stopGame() {
        setGameOn(false);
        stopTimer();
        if (shipsLeft === 0 && bombs >= 0 && time > 0) {
            setStatus('You won, all ships sunk!');
        }
        if (bombs === 0 && shipsLeft > 0 && time > 0) {
            setStatus('You lost, the bombs ran out.');
        }
        if (time === 0) {
            setStatus('You lost, the time ran out.');
        }
    }

    function restartGame() {
        setBoard(initialBoard);
        setBombs(bombCount);
        setShipsLeft(shipCount);
        setHits(0);
        setShips(randomShips);
        setStatus(defaultStatus);
        setGameOn(false);
        stopTimer();
        setTime(timeLimit);
    }

    function startTimer() {
        timerRef.current = setInterval(() => {
            setTime(oldTime => oldTime-1);         
        }, 1000);             
    }

    function stopTimer() {
        clearInterval(timerRef.current);
    }

    return (
        <>
            <View style={styles.gameboard}>
                {items}
            </View>
            <View style={styles.gameinfo}>
                <Text style={styles.infotext}>Status: {status}</Text>
                <Text style={styles.infotext}>{'Hits: ' + hits + '   Ships: ' + shipsLeft + '   Bombs: ' + bombs}</Text>
                <Text style={styles.infotext}>Time: {time} s</Text>
                <TouchableOpacity activeOpacity={0.95}
                    style={styles.button}
                    onPress={(!gameOn && board === initialBoard && time === timeLimit ? startGame : restartGame)}>
                    <Text style={styles.buttontext}>{(!gameOn && board === initialBoard && time === timeLimit ? 'Start Game' : 'Restart Game')}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

