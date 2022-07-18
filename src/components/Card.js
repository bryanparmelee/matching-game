import React from "react";

export default function Card(props) {
  
    return (
        <div 
            className="card"
            id={props.id} 
            onClick={(e) => props.clickHandler(e, props.id)}
        >
            <img
                
                alt={props.alt} 
                src={props.img} />
            <div className={!props.clicked ? "notClicked" : ""}></div>
        </div>
    )
}