import React from "react";

export default function Card(props) {
  
    return (
        <div 
            className="card"
            id={props.id} 
            onClick={props.clickHandler}
        >
            <img
                
                alt={props.alt} 
                src={props.img} />
            <div className={props.clicked ? "" : "notClicked"}></div>
        </div>
    )
}