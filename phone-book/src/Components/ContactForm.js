import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
    addContactReq,
    getContactReq,
    updateContactReq,
} from "../api-functions/contacts.api";
import { useNavigate, useParams } from "react-router-dom";

const ContactForm = () => {
    const [validated, setValidated] = useState(false);
    const [newContact, setNewContact] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
    });

    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity()) {
            if (params.id) {
                try {
                    const response = await updateContactReq(params.id, {
                        ...newContact,
                    });
                    navigate("/");
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const response = await addContactReq({ ...newContact });
                    navigate("/");
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        setValidated(true);
    };

    useEffect(() => {
        const loadContact = async () => {
            const contact = await getContactReq(params.id);
            console.log(contact);
            setNewContact({
                firstName: contact.data.FirstName,
                lastName: contact.data.LastName,
                phoneNumber: contact.data.PhoneNumber,
                email: contact.data.Email,
            });
        };
        if (params.id) loadContact();
    }, []);

    return (
        <div>
            <NavBar />
            <Container fluid className="justify-content-center">
                <h2>{params.id ? "Edit contact" : "Add a new contact"}</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                        >
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                value={newContact.firstName}
                                onChange={(e) =>
                                    setNewContact({
                                        ...newContact,
                                        firstName: e.target.value,
                                    })
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a First name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                        >
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                value={newContact.lastName}
                                type="text"
                                placeholder="Last name"
                                onChange={(e) =>
                                    setNewContact({
                                        ...newContact,
                                        lastName: e.target.value,
                                    })
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a Last name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom03"
                        >
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                required
                                value={newContact.phoneNumber}
                                type="tel"
                                placeholder="1234567890"
                                pattern="[0-9]{10}"
                                onChange={(e) =>
                                    setNewContact({
                                        ...newContact,
                                        phoneNumber: e.target.value,
                                    })
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a 10 digit phone number.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                        >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={newContact.email}
                                placeholder="example@gmail.com"
                                required
                                onChange={(e) =>
                                    setNewContact({
                                        ...newContact,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button type="submit" variant="success">
                        Save
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default ContactForm;
