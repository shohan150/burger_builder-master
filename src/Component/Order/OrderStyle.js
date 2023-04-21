import React from "react";


const OrderStyle = props => {
    const ingredientSummery = props.order.ingredient.map(item => {
        return (
            <span key={item.type}

                style={{
                    border: '1px solid grey',
                    padding: '2px',
                    marginRight: '5px',

                }}
            >


                {item.amount}x
                <span style={{ textTransform: "capitalize" }}>{item.type}</span>

            </span>
        )
    })


    return (
        <div
            style={{
                border: '1px solid grey',
                boxShadow: '1px 1px 5px grey'
                , padding: '20px'
                , marginBottom: '10px'
            }}

        >
            <p>Order Number: {props.order.id}</p>
            <p>Delivery Address: {props.order.customer.deliveryAddress}</p>
            {ingredientSummery}

            <br />
            <br></br>
            <p>Price: TK. {props.order.totalPrice}</p>
        </div>
    )

}

export default OrderStyle;