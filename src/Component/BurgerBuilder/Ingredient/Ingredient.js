import React from "react";
import './Ingredient.css'

import Bread_Top from '../../../assets/images/top.png';
import Salad from '../../../assets/images/salad.png';
import Cheese from '../../../assets/images/cheese.png';
import Meat from '../../../assets/images/meat.png';
import Bread_Bottom from '../../../assets/images/bottom.png';


const Ingredient = props => {
    let ingredient = null;

    switch (props.type) {
        case 'Bread_Top':
            ingredient = <img src={Bread_Top} alt='Bread_Top' />
            break;

        case 'Salad':
            ingredient = <img src={Salad} alt='Salad' />
            break;

        case 'Cheese':
            ingredient = <img src={Cheese} alt='Cheese' />
            break;

        case 'Meat':
            ingredient = <img src={Meat} alt='Meat' />
            break;

        case 'Bread_Bottom':
            ingredient = <img src={Bread_Bottom} alt='Bread_Bottom' />
            break;

        default:
            ingredient = null;
    }
    return (
        <div className="Ingredient">
            {ingredient}
        </div>
    )
}

export default Ingredient;