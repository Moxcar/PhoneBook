import NavBar from "./NavBar";
import ContactsList from "./ContactsList";
import Container from "react-bootstrap/Container";

const Home = () => {
    return (
        <div>
            <NavBar />
            <Container fluid>
                <ContactsList></ContactsList>
            </Container>
        </div>
    );
};

export default Home;
