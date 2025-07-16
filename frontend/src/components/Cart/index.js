import { useEffect } from 'react';
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import { useCartContext } from '../../context/CartContext';
import Header from "../Header/Header";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import EmptyCart from '../EmptyCart';
import { FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";
import "./index.css";

const Cart = () => {
    const { authUser } = useAuthenticateContext();
    const { cart, setCart, setFinalCart } = useCartContext();

    useEffect(() => {
        const cartFromStorage = JSON.parse(localStorage.getItem("cart") || '{"items": []}');
        const items = Array.isArray(cartFromStorage.items) ? cartFromStorage.items : [];
        const newQtu = items.reduce((total, item) => total + item.quantity, 0);
        setFinalCart(newQtu);
    }, [cart]);

    const subTotal = cart.items?.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    const totalWithVat = +(subTotal * 0.20).toFixed(2);
    const totalPrice = +(subTotal + totalWithVat).toFixed(2);

    // Update quantity in cart
    const addQuantity = (item) => {
        setCart((prevState) => {
            const newItems = [...prevState.items];
            const existingIndex = newItems.findIndex(
                (cartItem) => cartItem.productId === item.productId && cartItem.variantId === item.variantId
            );
            if (existingIndex !== -1) {
                // Update quantity for the matching item
                newItems[existingIndex] = {
                    ...newItems[existingIndex],
                    quantity: newItems[existingIndex].quantity + 1,
                };
            }

            // Recalculate total price
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

    // Decrease quantity in cart
    const removeQuantity = (item) => {
        setCart((prevState) => {
            const newItems = [...prevState.items];
            const existingIndex = newItems.findIndex(
                (cartItem) => cartItem.productId === item.productId && cartItem.variantId === item.variantId
            );
            if (existingIndex !== -1) {
                // Decrease quantity
                if (newItems[existingIndex].quantity === 1) {
                    newItems.splice(existingIndex, 1); // Remove item if quantity reaches 0
                } else {
                    newItems[existingIndex].quantity -= 1;
                }
            }

            // Recalculate total price
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

    // Delete item from cart
    const deleteItem = (item) => {
        setCart((prevState) => {
            const newItems = prevState.items.filter(
                (cartItem) => cartItem.productId !== item.productId || cartItem.variantId !== item.variantId
            );

            const newTotalPrice = newItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            const updatedCart = {
                ...prevState,
                items: newItems,
                total_price: newTotalPrice,
                user_id: authUser.id || null,
            };
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    return (
        <>
            <Header />
            <Container>
                {cart.items?.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <>
                        <Row className="prod-cart-cnt">
                            <Col>
                                <h4>Cart</h4>
                            </Col>
                        </Row>
                        <Row className="cart-table-total-cnt">
                            <Col sm={12} md={7} lg={7}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th className="text-center">Quantity</th>
                                            <th className="text-center">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.items?.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="td-p">
                                                        <div className="item-img-cnt">
                                                            <img
                                                                src={`${process.env.REACT_APP_API_URL}api/product/uploads/colors/${item.main_image}`}
                                                                alt="product name"
                                                            />
                                                        </div>
                                                        <div className="item-desc-cnt">
                                                            <a href="/">{item.title}</a>
                                                            <p>{item.color}</p>
                                                        </div>
                                                    </td>
                                                    <td className="td-p">
                                                        <Row className="price-cnt">
                                                            <span>&#163;{item.price}</span>
                                                        </Row>
                                                    </td>
                                                    <td className="td-p">
                                                        <Row className="quantity-cnt justify-content-center">
                                                            <Col className="position-relative d-flex align-items-center justify-content-center">
                                                                <div className="ellips-quantity-control">
                                                                    <Button
                                                                        variant="link"
                                                                        className="quantity-btn minus-btn p-0"
                                                                        onClick={() => removeQuantity(item)}
                                                                    >
                                                                        <FaMinus className="quantity-icon" />
                                                                    </Button>
                                                                    <span className="quantity-number">{item.quantity}</span>
                                                                    <Button
                                                                        variant="link"
                                                                        className="quantity-btn plus-btn p-0"
                                                                        onClick={() => addQuantity(item)}
                                                                    >
                                                                        <FaPlus className="quantity-icon" />
                                                                    </Button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </td>
                                                    <td>
                                                        <Row className="subtotal-quantity">
                                                            <span>&#163; {item.price * item.quantity}</span>
                                                            <span className="remove-item" onClick={() => deleteItem(item)}>
                                                                <FaTrashAlt />
                                                            </span>
                                                        </Row>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col sm={12} md={4} lg={4} className="cart-total-cnt">
                                <Row>
                                    <Col sm={12} md={12} lg={12} className="cart-total">
                                        <h4>Cart totals</h4>
                                        <div className="subtotal-cnt">
                                            <span>Subtotal</span>
                                            <span>&#163; {subTotal}</span>
                                        </div>
                                        <div className="total-cnt">
                                            <span>Vat (20%)</span>
                                            <span>&#163; {totalWithVat}</span>
                                        </div>

                                        <div className="total-cnt">
                                            <span>Total</span>
                                            <span>&#163; {totalPrice}</span>
                                        </div>

                                        <Button variant="dark" className="checkout-btn">
                                            <a href="/checkout">Proceed to checkout</a>
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </>
    );
};

export default Cart;
