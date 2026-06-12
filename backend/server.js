const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const DB_FILE = "./db.json";

function readDB() {
    return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.post("/ticket", (req, res) => {

    const db = readDB();

    const ticket = {
        id: Date.now(),
        ...req.body,
        status: "PENDING"
    };

    db.tickets.push(ticket);

    writeDB(db);

    res.json({
        success: true,
        ticket
    });
});

app.get("/tickets", (req, res) => {

    const db = readDB();

    res.json(db.tickets);
});

app.get("/ticket/:id", (req, res) => {

    const db = readDB();

    const ticket = db.tickets.find(
        t => t.id == req.params.id
    );

    res.json(ticket);
});

app.post("/prescription", (req, res) => {

    const db = readDB();

    db.prescriptions.push(req.body);

    writeDB(db);

    res.json({
        message: "Prescription Saved"
    });
});

app.post("/appointment", (req, res) => {

    const db = readDB();

    db.appointments.push(req.body);

    writeDB(db);

    res.json({
        message: "Appointment Saved"
    });
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});