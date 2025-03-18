import { useState, useEffect } from 'react';
import Header from "../Header/Header";
import { Container,Row,Col } from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";

const Cart = () =>{

    const {addQuantity,removeQuantity} = useCartContext();

        const [cart,setCart] = useState([]);
        useEffect(() => {
            const storedCart = JSON.parse(localStorage.getItem("items")) || [];
            const items = storedCart.map((el,index)=>{
                console.log("tmp----",el);
                return {
                    product_id: el.items[0].product_id, 
                    title: el.items[0].title, 
                    image: el.items[0].image, 
                    price: 10, quantity: el.items.length
                };
            });

           
        }, []);

        //console.log("cart----",cart);

    return(
        <>
        <Header/>
            <Container>
                <Row className="prod-cart-cnt">
                    <Col>
                        <h4>Cart</h4>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={8} lg={8}>
                    {/* {
                        cart.map((item,index)=>{
                            return(
                                <Row>
                                    <Col sm={6} md={6} lg={6}>Product</Col>
                                    <Col sm={3} md={3} lg={3}>Product</Col>
                                    <Col sm={3} md={3} lg={3}>Product</Col>
                                </Row>
                            )
                        })
                    } */}
                    </Col>
                    <Col sm={12} md={4} lg={4}>
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                                <h4>Cart totals</h4>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cart;