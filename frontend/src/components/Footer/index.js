import { Row, Col } from 'react-bootstrap';
import {  FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import "./index.css";

const Footer = () => {
    return (
        <footer className="luxury-footer">
            {/* Top Section */}
            <div className="footer-top">
                <Row className="g-4">
                    {/* Company Info */}
                    <Col lg={4} md={6}>
                        <div className="footer-brand">
                            <div className="footer-logo">
                                <span className="logo-footer">LONDON</span>
                                <span className="logo-subtext">GLASS</span>
                            </div>
                            <p className="footer-description">
                                Crafting exceptional glass solutions for discerning clients with precision, elegance, and unparalleled craftsmanship.
                            </p>
                        </div>
                    </Col>

                    {/* Quick Links */}
                    <Col lg={2} md={6}>
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/about-us">About Us</a></li>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/gallery">Gallery</a></li>
                            <li><a href="/faq">FAQ</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </Col>

                    {/* Our Services */}
                    <Col lg={3} md={6}>
                        <h4 className="footer-heading">Our Services</h4>
                        <ul className="footer-links">
                            <li>Custom Glass Design</li>
                            <li>Architectural Glass Solutions</li>
                            <li>Premium Shower Enclosures</li>
                            <li>Glass Railings & Partitions</li>
                            <li>Commercial Glass Installations</li>
                            <li>Luxury Glass Tabletops</li>
                        </ul>
                    </Col>

                    {/* Contact Info */}
                    <Col lg={3} md={6}>
                        <h4 className="footer-heading">Contact Us</h4>
                        <ul className="contact-info">
                            <li>
                                <FaMapMarkerAlt className="contact-icon" />
                                <span>123 Design Avenue, London SW1A 1AA</span>
                            </li>
                            <li>
                                <FaPhone className="contact-icon" />
                                <span>+44 20 7123 4567</span>
                            </li>
                            <li>
                                <FaEnvelope className="contact-icon" />
                                <span>info@londonglassfittings.co.uk</span>
                            </li>
                            <li>
                                <FaClock className="contact-icon" />
                                <span>Mon-Fri: 9am - 6pm</span>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>

            {/* Divider */}
            <div className="footer-divider"></div>

            {/* Bottom Section */}
            <div className="footer-bottom">
                <Row>
                    <Col md={6} className="copyright">
                        <p>&copy; {new Date().getFullYear()} Luxe Glass Fittings. All rights reserved.</p>
                    </Col>
                    <Col md={6} className="footer-links-bottom">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Service</a>
                        <a href="/sitemap">Sitemap</a>
                    </Col>
                </Row>
            </div>

            {/* Decorative Glass Element */}
            <div className="glass-decoration"></div>
        </footer>
    )
}

export default Footer;