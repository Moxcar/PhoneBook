import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import {
    getContactsReq,
    deleteContactReq,
} from "../api-functions/contacts.api";
import { useNavigate } from "react-router-dom";

const ContactsList = () => {
    const [contacts, setContacts] = useState([]);
    const [prefixSearch, setPrefixSearch] = useState("")

    const navigate = useNavigate();

    const deleteContact = async (id) => {
        console.log(id);
        if (id) {
            const response = await deleteContactReq(id);
            setContacts(contacts.filter((contact) => contact.ID !== id));
            console.log(response);
        }
    };

    const getContacts = async () => {
        console.log(contacts.filter((e) => e.FirstName.startsWith(prefixSearch)))
        const response = await getContactsReq();
        setContacts(response.data);
        console.log(response.data);
        console.log("a",response.data.filter((e) => e.FirstName.startsWith(prefixSearch)))
    };

    useEffect(() => {
        getContacts();
    }, []);
    return (
        <>
            <Form className="d-flex" style={{ margin: "15px" }}>
                <Form.Control
                    type="search"
                    placeholder="Search by name"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setPrefixSearch(e.target.value)}
                />
            </Form>
            <ListGroup>
                {contacts.filter((e) => (e.FirstName + " " + e.LastName).startsWith(prefixSearch))
                    .map((contact) => {
                        return (
                            <ListGroup.Item
                                className="d-flex justify-content-between align-items-start"
                                key={contact.id}
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">
                                        {contact.FirstName +
                                            " " +
                                            contact.LastName}
                                    </div>
                                    {"Phone number: " + contact.PhoneNumber}
                                    <br />
                                    {"Email: " + contact.Email}
                                </div>
                                <ButtonGroup>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() =>
                                            navigate(
                                                "/editcontact/" + contact.ID
                                            )
                                        }
                                    >
                                        🖊
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() =>
                                            deleteContact(contact.ID)
                                        }
                                    >
                                        🗑
                                    </Button>
                                </ButtonGroup>
                            </ListGroup.Item>
                        );
                    })}
            </ListGroup>
        </>
    );
};
export default ContactsList;
