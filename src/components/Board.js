import React, { useEffect, useState } from "react";
import Card from "./Card";
import { nanoid } from "nanoid";

export default function Board(props) {
    const [board, setBoard] = useState([])
    

    useEffect(() => {
        let array = [...props.pics]
        let doubled = array.concat(array)
        let random = randomizeBoard(doubled)
        setBoard(random)
    }, [props.pics])

  
    
    function randomizeBoard(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array
    }

   function clickHandler(e, id) {
        e.preventDefault()
        console.log("You clicked", id)
       
   }
      
    const gameBoard = board.map(item => {
     

        return (
       
        <Card 
            key={nanoid()}
            id={nanoid()}
            clicked={false}
            clickHandler={clickHandler}
            img={item} 
            alt={item.substring(item.lastIndexOf('/') + 1)}
        />
    
      
        )
    })


   
    return (
        <div className="board">{gameBoard}</div>
    )
}