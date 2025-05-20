import { useEffect } from 'react';
import { useCartContext } from '../../context/CartContext';
import Header from "../Header/Header";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import "./index.css";

const Cart = () => {
    const { cart, setCart, finalCart, setFinalCart } = useCartContext();

    useEffect(() => {
        const cartFromStorage = JSON.parse(localStorage.getItem("cart") || '{"items": []}');
        const newQtu = cartFromStorage.items.reduce((total, item) => total + item.quantity, 0);
        setFinalCart(newQtu);
    }, [cart]);

    const totalPrice = cart.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    const addQuantity = (product) => {
        setCart((prevState) => {
            const newItems = [...prevState.items];
            const existingIndex = newItems.findIndex(item => item.id === product.id);
            if (existingIndex !== -1) {
                // Update quantity
                newItems[existingIndex] = {
                    ...newItems[existingIndex],
                    quantity: newItems[existingIndex].quantity + 1,
                };
            } else {
                // console.log("product---", product);
                // Add new item
                newItems.push({
                    id: product.id,
                    title: product.title,
                    image: product.image,
                    price: product.price,
                    quantity: 2,
                });
            }

            const newTotalPrice = newItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            const updatedCart = {
                ...prevState,
                items: newItems,
                total_price: newTotalPrice
            };
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    }

    const removeQuantity = (product) => {
        setCart((prevState) => {
            const existingItem = prevState.items.find(item => item.id === product.id);
            if (!existingItem) return prevState;

            let newItems;
            if (existingItem.quantity === 1) {
                newItems = prevState.items.filter(item => item.id !== product.id);
            } else {
                newItems = prevState.items.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
            const newTotalPrice = newItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            const updatedCart = {
                ...prevState,
                items: newItems,
                total_price: newTotalPrice,
            };
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

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
                                    cart.items.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='td-p'>
                                                    <div className='item-img-cnt'>
                                                        <img src={`${process.env.REACT_APP_API_URL}api/product/uploads/${item.image}`} alt='product name' />
                                                    </div>
                                                    <div className='item-desc-cnt'>
                                                        <a href='/'>{item.title}</a>
                                                    </div>
                                                </td>
                                                <td className='td-p'>
                                                    <Row className='price-cnt'>
                                                        <span>&#163;{item.price}</span>
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
                                                            <Button variant="dark" onClick={() => { addQuantity(item) }}>+</Button>
                                                        </Col>
                                                    </Row>
                                                </td>
                                                <td>
                                                    <Row className='subtotal-quantity'>
                                                        <span>&#163; {item.price * item.quantity}</span>
                                                        <span className='remove-item'>
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
                                    <span>&#163; {totalPrice}</span>
                                </div>
                                <div className='total-cnt'>
                                    <span>Total</span>
                                    <span>&#163; {totalPrice}</span>
                                </div>
                                <Button variant="dark" className='checkout-btn'>
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
