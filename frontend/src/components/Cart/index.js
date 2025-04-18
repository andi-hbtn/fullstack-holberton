import { useState, useEffect } from 'react';
import Header from "../Header/Header";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import "./index.css";

const Cart = () => {

    const [cart, setCart] = useState([]);
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("items")) || [];
        loadItems(storedCart);
    }, []);

    const loadItems = (items) => {
        const result = items.filter(el => el.items && el.items.length > 0)
        .map((el, index) => {
            return {
                id: el.id,
                product_id: el.items[0].product_id,
                title: el.items[0].title,
                image: el.items[0].image,
                price: el.items[0].price,
                quantity: el.items.length
            };
        });
        setCart(result);
    }

    const addQuantity = (item) => {
        let existingCart = JSON.parse(localStorage.getItem("items"));
        let found = false;

        const newItem = {
            image:item.image,
            price:item.price,
            product_id:item.id,
            quantity:item.quantity,
            title:item.title
        }
        
		existingCart.forEach(element => {
			if (element.id === newItem.product_id) {
                element.items.push(newItem);
				found = true;
			}
		});
        if (!found) {
			existingCart.push(newItem);
		}
		localStorage.setItem("items", JSON.stringify(existingCart));

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
        let existingCart = JSON.parse(localStorage.getItem("items"));

        const itemToRemove = {
            image:item.image,
            price:item.price,
            product_id:item.id,
            quantity:item.quantity,
            title:item.title
        }

        existingCart.forEach(element => {
			if (element.id === itemToRemove.product_id) {
                const indexToRemove = element.items.findIndex((e,i)=> e.product_id === itemToRemove.product_id );
                if (indexToRemove !== -1) {
                    element.items.splice(indexToRemove, 1);
                }
			}
		});
        existingCart = existingCart.filter(el => el.items.length > 0);
        localStorage.setItem("items", JSON.stringify(existingCart));

        setCart((prevState) => {
            return prevState.map((el) => {
                if (el.id === item.id) {
                    const newQuantity = Math.max(el.quantity - 1, 0);
                    return { ...el, quantity: newQuantity };
                }
                return el;
            }).filter(el => el.quantity > 0);
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
                                                        <img src={`${process.env.REACT_APP_API_URL}api/product/uploads/${item.image}`} alt='product name' />
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
