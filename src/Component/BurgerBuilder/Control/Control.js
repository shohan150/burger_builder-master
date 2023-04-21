
import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button } from 'reactstrap'


const control = [
    { label: 'Salad', type: 'Salad' }
    , { label: 'Cheese', type: 'Cheese' }
    , { label: 'Meat', type: 'Meat' }
]


const BuildControl = props => {
    return (
        <div className="d-flex">
            <div className="mr-auto"
                style={{
                    fontSize: '16px'
                    , fontWeight: 'bold'
                }}

            >{props.label}</div>
            <div>
                <Button className='btn btn-danger btn-sm m-1' onClick={props.Remove} >Less</Button>
                <Button className='btn btn-success btn-sm m-1' onClick={props.Added}>More</Button>
            </div>
        </div>
    )
}
const Control = props => {
    return (
        <div className="container ml-md-5">
            <Card style={{
                textAlign: 'center'
                , marginTop: '30px'
                , marginBottom: '30px'
            }}>
                <CardHeader
                    style={{
                        backgroundColor: '#d70f64'
                        , color: 'white'
                    }}

                > Add Ingredient</CardHeader>
                <CardBody>
                    {
                        control.map(item => {
                            return <BuildControl label={item.label} type={item.type} key={Math.random()}
                                Added={(type) => props.ingredientAdded(item.type)}

                                Remove={(type) => props.ingredientRemove(item.type)}

                            />
                        })
                    }
                </CardBody>
                <CardFooter>
                    <h5>Price:TK. {props.Price} BDT</h5>
                </CardFooter>
                <Button color="success" onClick={props.toggleModal} disabled={!props.purchasable}>Order Now</Button>
            </Card>
        </div>
    )
}


export default Control;