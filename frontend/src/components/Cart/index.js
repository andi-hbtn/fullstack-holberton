import { useState, useEffect } from 'react';
import Header from "../Header/Header";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";
import "./index.css";

const Cart = () => {

    const [cart, setCart] = useState([]);
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("items")) || [];
        loadItems(storedCart);
    }, []);

    const loadItems = (items) => {
        const result = items.map((el, index) => {
            console.log("el----", el);
            return {
                id: el.id,
                product_id: el.items[0].product_id,
                title: el.items[0].title,
                image: el.items[0].image,
                price: 10, 
                quantity: el.items.length
            };
        });
        setCart(result);
    }

    const addQuantity = (item) => {
        console.log("addQuantity---", item);
        console.log("cart----", cart);
    }

    const removeQuantity = (item) => {
        console.log("removeQuantity---", item);
    }

    return (
        <>
            <Header />
            <Container>
                <Row className="prod-cart-cnt">
                    <Col>
                        <h4>Cart</h4>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={7} lg={7}>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th className='text-center'>Quantity</th>
                                    <th className='text-center'>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className='item-img-cnt'>
                                                        <img src={`http://localhost:3000/api/product/uploads/${item.image}`} alt='product name' />
                                                    </div>
                                                    <div className='item-desc-cnt'>
                                                        <a href=''>{item.title}</a>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Row className='price-cnt'>
                                                        <span>${item.price}</span>
                                                    </Row>
                                                </td>
                                                <td>
                                                    <Row className='quantity-cnt'>
                                                        <Col sm={3} md={3} lg={3} className="p-0 c-b">
                                                            <Button variant="dark" onClick={() => { removeQuantity(item) }}>-</Button>
                                                        </Col>
                                                        <Col sm={3} md={3} lg={3} className="c-b">
                                                            <span>{item.quantity}</span>
                                                        </Col>
                                                        <Col sm={3} md={3} lg={3} className="p-0 c-b">
                                                            <Button variant="dark" onClick={() => addQuantity(item)}>+</Button>
                                                        </Col>
                                                    </Row>
                                                </td>
                                                <td>
                                                    <Row className='subtotal-quantity'>
                                                        <span className='text-center'>$ {item.price * item.quantity}</span>
                                                    </Row>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Col>
                    <Col sm={12} md={4} lg={4} className='cart-total-cnt'>
                        <Row>
                            <Col sm={12} md={12} lg={12} className='cart-total'>
                                <h4>Cart totals</h4>
                                <div className='subtotal-cnt'>
                                    <span>Subtotal</span>
                                    <span>$30452145</span>
                                </div>
                                <div className='total-cnt'>
                                    <span>Total</span>
                                    <span>$30452145</span>
                                </div>
                                <Button variant="dark" className='checkout-btn'>
                                    Proceed to checkout
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cart;