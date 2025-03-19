import { useState, useEffect } from 'react';
import Header from "../Header/Header";
import { Container,Row,Col,Table,Button} from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";
import "./index.css";

const Cart = () =>{

    const {addQuantity,removeQuantity} = useCartContext();

        const [cart,setCart] = useState([]);
        useEffect(() => {
            const storedCart = JSON.parse(localStorage.getItem("items")) || [];
            loadItems(storedCart);
        },[]);

        const loadItems = (items)=>{
            const result = items.map((el,index)=>{
               return {
                   product_id: el.items[0].product_id,
                   title: el.items[0].title,
                   image: el.items[0].image,
                   price: 10, quantity: el.items.length
               };
           });
           setCart(result);
        }


        // console.log("cart-----",cart);

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
                        <Table>
                            <thead>
                                <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map((item,index)=>{
                                        console.log("item----",item);
                                        return(
                                        
                                            <tr>
                                                <td>
                                                <div className='item-img-cnt'>
                                                        <img src={`http://localhost:3000/api/product/uploads/${item.image}`} height={"150px"} width={"150"} alt='product name'/>
                                                </div>
                                                <div className='item-desc-cnt'>
                                                        <a href=''>{item.title}</a>
                                                        <p>
                                                            <span>${item.price}</span>
                                                        </p>
                                                </div>
                                                </td>
                                                <td>
                                                   <Row>
                                                    <Col sm={2} md={2} lg={1} className="p-0 c-b">
                                                            <Button variant="dark">-</Button>
                                                        </Col>
                                                        <Col sm={2} md={2} lg={1} className="c-b">
                                                            <span>{item.quantity}</span>
                                                        </Col>
                                                        <Col sm={2} md={2} lg={1} className="p-0 c-b">
                                                            <Button variant="dark">+</Button>
                                                        </Col>
                                                   </Row>
                                                </td>
                                                <td>
                                                   <span>$ {item.price * item.quantity}</span>
                                                </td>
                                            </tr>
                                            
                                        )
                                    })
                                }
                            </tbody>
                         </Table>
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