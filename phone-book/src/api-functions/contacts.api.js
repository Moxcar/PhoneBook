import axios from "axios";

export const getContactsReq = async () =>
    await axios.get("http://localhost:4000/contacts");

export const getContactReq = async (id) =>
    await axios.get("http://localhost:4000/contacts/" + id);

export const addContactReq = async (contact) =>
    await axios.post("http://localhost:4000/contacts/", contact);

export const updateContactReq = async (id, contact) => 
    await axios.put("http://localhost:4000/contacts/" + id, contact);

export const deleteContactReq = async (id) =>
    await axios.delete("http://localhost:4000/contacts/" + id);
