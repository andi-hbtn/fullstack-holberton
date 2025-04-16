import Header from "../../components/Header/Header";
import Footer from '../../components/Footer';
import { Container, Row, Col } from "react-bootstrap";
import "./index.css";
const Faq = () => {
    return (
        <>
            <Header />
            <Container className="faq-cnt">
                <Row className="faq-title">
                    <h3>FAQ</h3>
                </Row>
                <Row className="q-a-cnt">
                    <Col>
                        <p className="question">How can my order be delivered?</p>
                        <p className="answer">
                            -All orders can be delivered to your preferred location within the M25 radius for a shipping fee .
                            We deliver from Monday to Friday 8am to 5pm. All items will be delivered to your entrance upon an appointment.
                        </p>

                        <p className="question">How long does the delivery take?</p>
                        <p className="answer">
                            -Delivery can take up to 2-3 working days,depending on your order.
                            Please let us know in advance if you need your order at a certain date and time and we can try to accommodate that for you.
                        </p>

                        <p className="question">Estimated lead times?</p>
                        <p className="answer">-Greater London : 2-3 working days .</p>

                        <p className="question">Can I collect the order?</p>
                        <p className="answer">-Will be soon available .</p>

                        <p className="question">I can't find what I am looking for, Can I still order it with you?</p>
                        <p className="answer">-Please contact us for further details .</p>

                        <p className="question">Do you provide fittings/installations ?</p>
                        <p className="answer">
                            -No , we dont offer fittings/installations,we only supply and deliver .
                        </p>

                        <p className="question">What is your return policy?</p>
                        <p className="answer">
                            -You have 14 calendar days to return any other item(s) from the date you received it.
                            For the return to be accepted, the item must be unused and in the same condition that you received it.
                        </p>

                        <p className="question">Refunds</p>
                        <p className="answer">
                            -Once we receive the item, we will inspect it , the product should be same condition as you received it for the return to be accepted.the refunds will be on debit/credit card (or original method of payment).
                            You will receive the credit within a certain amount of days, depending on your card issuer's policies.
                        </p>

                        <p className="question">What payment methods do you accept?</p>
                        <p className="answer">
                            -All of our orders are safely processed by worldpay.
                            We accept Visa Credit/ Debit, MasterCard Credit/Debit, Visa Electron, Maestro and JCB.
                        </p>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    )
}

export default Faq