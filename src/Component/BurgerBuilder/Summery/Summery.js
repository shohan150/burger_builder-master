import React from "react";

const Summery = props => {
    const ingredientSummery = props.ingredient.map(item => {
        return (
            <li key={item.type}>
                <span>{item.type}</span> : {item.amount}


            </li>
        )
    })

    return (
        <div>
            <ul>
                {ingredientSummery}
            </ul>
        </div>
    )
}

export default Summery;