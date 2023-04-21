import React from "react";
import './Burger.css'

import Ingredient from "../Ingredient/Ingredient";


const Burger = props => {
    let ingredientArr = props.ingredient.map(item => {
        let amountArr = [...Array(item.amount).keys()]
        return amountArr.map(_ => {
            return <Ingredient type={item.type} key={Math.random()} />
        })
    })
        .reduce((arr, element) => {
            return arr.concat(element)
        }, [])

    if (ingredientArr.length === 0) {
        ingredientArr = <p>please add some ingredient</p>
    }
    return (
        <div className="Burger">
            <Ingredient type="Bread_Top" />

            {ingredientArr}

            <Ingredient type="Bread_Bottom" />
        </div>
    )
}


export default Burger;