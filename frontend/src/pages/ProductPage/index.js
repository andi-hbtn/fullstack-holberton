import {useEffect,useState } from "react";
import { Container, Row, Col,Button,Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";
import Header from "../../components/Header/Header";
import NotFount from "../../components/NotFount";
import "./index.css";

const ProductPage = () => {
  const { id } = useParams();
  const { getProduct } = useProductContext();
  const [product, setProduct] = useState([]);
  const [error, setError] = useState({message:"",status:0});


  useEffect(()=>{
    getById(id)
  },[id]);

  const getById = async(id)=>{
    try{
        const result = await getProduct(id);
       if(result.status === 200){
            setProduct(result.data);
       }else{
            setError({message:result.response.data.message , status:result.response.data.statusCode})
       }
    }catch(error){
        console.log(error);
    }
  } 

  return (
    <>
    <Header/>
    <Container>
    { 
    error.message
        ?
        <Row>
            <Col md={10} className="p-4">
                <NotFount errors={error}/>
            </Col>
        </Row>
        :
        <Row className="prod-cart-cnt">
            <Col sm={5} md={5} lg={5} className="card-cnt">
            <Card.Img variant="top" src={`http://localhost:3000/api/product/uploads/${product.image}`} />
            </Col>
            <Col sm={5} md={5} lg={5} className="prod-desc">
                <h1>{product.title}</h1>
                <h4>{product.price}</h4>
                <p>{product.description}</p>
                  <Col sm={12} md={12} lg={12}>
                      <Row>
                          <Col sm={2} md={2} lg={1} className="p-0 c-b">
                              <Button variant="dark">-</Button>
                          </Col>
                          <Col sm={2} md={2} lg={1} className="c-b">
                              <span>1</span>
                          </Col>
                          <Col sm={2} md={2} lg={1} className="p-0 c-b">
                              <Button variant="dark">+</Button>
                          </Col>

                          <Col sm={2} md={2} lg={3} className="p-0 m-l-50 cart-btn">
                              <Button variant="dark">Add to cart</Button>
                          </Col>
                      </Row>
                  </Col>
            </Col>
        </Row>
    }
    </Container>
    
    </>
  )
}

export default ProductPage;