import { useEffect, useState } from "react";
import axios from "axios";

function GPDashboard() {

    const [tickets,
    setTickets] = useState([]);

    const [prescriptions,
    setPrescriptions] = useState({});

    const user =
    JSON.parse(
        localStorage.getItem(
            "currentUser"
        )
    );

    useEffect(() => {

        loadTickets();

    }, []);

    const loadTickets =
    async () => {

        const response =
        await axios.get(
            "https://gp-mvp.onrender.com/tickets"
        );

        const filtered =
        response.data.filter(
            ticket =>
            ticket.pincode ===
            user.pincode
        );

        setTickets(filtered);
    };

    const sendPrescription =
    async (ticket) => {

        const prescription =
        prescriptions[ticket.id];

        if(!prescription){
            alert(
             "Write prescription first"
            );
            return;
        }

        await axios.post(
            "https://gp-mvp.onrender.com/prescription",
            {
                patientName:
                ticket.patientName,

                prescription
            }
        );

        alert(
            "Prescription Sent"
        );
    };

    return (

        <div>

            <div className="navbar">

                Welcome Dr.
                {user?.name}

            </div>

            <div className="container">

                <h2>
                    Your Area Cases
                </h2>

                <br />

                {
                    tickets.map(ticket => (

                        <div
                            key={ticket.id}
                            className="card"
                            style={{
                                marginBottom:"20px"
                            }}
                        >

                            <h3>
                                {ticket.patientName}
                            </h3>

                            <br />

                            <p>
                                {ticket.symptoms}
                            </p>

                            <br />

                            <p>
                                Severity :
                                {ticket.severity}
                            </p>

                            <br />

                            <textarea

                                style={{
                                    width:"100%",
                                    height:"100px"
                                }}

                                placeholder=
                                "Write prescription"

                                onChange={(e)=>

                                    setPrescriptions(
                                    prev => ({
                                        ...prev,
                                        [ticket.id]:
                                        e.target.value
                                    }))
                                }
                            />

                            <br />
                            <br />

                            <button

                                className="btn"

                                onClick={() =>
                                sendPrescription(
                                    ticket
                                )}

                            >
                                Send Prescription
                            </button>

                        </div>

                    ))
                }

            </div>

        </div>

    );
}

export default GPDashboard;