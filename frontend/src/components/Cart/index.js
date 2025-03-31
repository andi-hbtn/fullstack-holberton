import { useState, useEffect } from 'react';
import Header from "../Header/Header";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { useCartContext } from "../../context/CartContext";
import "./index.css";
import { Prev } from 'react-bootstrap/esm/PageItem';

const Cart = () => {

    const [cart, setCart] = useState([]);
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("items")) || [];
        loadItems(storedCart);
    }, []);

    const loadItems = (items) => {
        const result = items.map((el, index) => {
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
        setCart((prevState) => {
            return prevState.map((el, index) => {
                if (el.id === item.id) {
                    const newQuantity = Math.max(el.quantity + 1, 0);
                    return {
                        ...el,
                        quantity: newQuantity
                    };
                }
                return el;
            });
        });
    }

    const removeQuantity = (item) => {
        setCart((prevState) => {
            return prevState.map((el, index) => {
                if (el.id === item.id) {
                    const newQuantity = Math.max(el.quantity - 1, 0);
                    return {
                        ...el,
                        quantity: newQuantity
                    };
                }
                return el;
            });
        });
    }

    const removeItem = (item) => {
        setCart((prevState) => {
            return prevState.filter((el) => { return el.id !== item.id });
        });
    }


    const subtotal = cart.reduce((acc, item) => {
        return acc + (Number(item.price) * Number(item.quantity))
    }, 0);


    const handleCheckout = () => {

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
                                                <td className='td-p'>
                                                    <div className='item-img-cnt'>
                                                        <img src={`http://localhost:3000/api/product/uploads/${item.image}`} alt='product name' />
                                                    </div>
                                                    <div className='item-desc-cnt'>
                                                        <a href=''>{item.title}</a>
                                                    </div>
                                                </td>
                                                <td className='td-p'>
                                                    <Row className='price-cnt'>
                                                        <span>${item.price}</span>
                                                    </Row>
                                                </td>
                                                <td className='td-p'>
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
                                                        <span>$ {item.price * item.quantity}</span>
                                                        <span className='remove-item' onClick={() => { removeItem(item) }}>
                                                            <FaTrashAlt />
                                                        </span>
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
                                    <span>${subtotal}</span>
                                </div>
                                <div className='total-cnt'>
                                    <span>Total</span>
                                    <span>${subtotal}</span>
                                </div>
                                <Button variant="dark" className='checkout-btn' onClick={handleCheckout}>
                                    <a href='/checkout'>Proceed to checkout</a>
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