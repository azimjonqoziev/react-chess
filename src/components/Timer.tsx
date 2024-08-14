import React, { FC, useEffect, useRef, useState } from "react";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    // Start timer on player change
    useEffect(() => {
        startTimer();
    }, [currentPlayer])

    // Start timer
    function startTimer() { 
        // Reset timer after the move
        if (timer.current) { 
            clearInterval(timer.current);
        }
        // Decrement timer by 1 depending on the player
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000)
    }

    // Decrement timer by 1
    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1);
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1);
    }

    // Restart the timer on game restart
    const handleRestart = () => { 
        setWhiteTime(300);
        setBlackTime(300);
        restart();
    }

    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart Game</button>
            </div>
            <h2>Black - {blackTime}</h2>
            <h2>White - {whiteTime}</h2>
        </div>
    );
};

export default Timer;