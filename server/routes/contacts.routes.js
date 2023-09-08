import { Router } from "express";
import { getContacts, addContact, getContact, deleteContact, updateContact } from "../controllers/contacts.controllers.js";

const router = Router();

router.get("/contacts", getContacts);
router.get("/contacts/:id", getContact);
router.post("/contacts", addContact);
router.put("/contacts/:id", updateContact);
router.delete("/contacts/:id", deleteContact);

export default router;
