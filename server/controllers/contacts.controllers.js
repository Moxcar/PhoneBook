import { pool } from "../db.js";

export const getContacts = async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM contacts ORDER BY firstName ASC"
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getContact = async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM contacts WHERE id = ?",
            [req.params.id]
        );
        if (result.length === 0)
            return res.status(404).json({ message: "Contact not found" });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const addContact = async (req, res) => {
    console.log("addContact", req.body)
    try {
        const { firstName, lastName, phoneNumber, email } = req.body;
        const [result] = await pool.query(
            "INSERT INTO contacts(firstname, lastname, phonenumber, email) VALUES (?,?,?,?)",
            [firstName, lastName, phoneNumber, email]
        );
        res.json({
            id: result.insertId,
            firstName,
            lastName,
            phoneNumber,
            email,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
};

export const deleteContact = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM contacts WHERE id = ?", [
          req.params.id,
        ]);
    
        if (result.affectedRows === 0)
          return res.status(404).json({ message: "Contact not found" });
    
        return res.sendStatus(204);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
};

export const updateContact = async (req, res) => {
    try {
        const result = await pool.query("UPDATE contacts SET ? WHERE id = ?", [
          req.body,
          req.params.id,
        ]);
        res.json(result);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
};
