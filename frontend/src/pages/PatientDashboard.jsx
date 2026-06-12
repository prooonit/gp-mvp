import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PatientDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("currentUser")
    );

    const [prescriptions, setPrescriptions] =
        useState([]);

    const loadPrescriptions = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:5000/prescriptions"
                );

            console.log(response.data);

            const filtered =
                response.data.filter(
                    p =>
                        p.patientName?.trim().toLowerCase() ===
                        user.name?.trim().toLowerCase()
                );

            setPrescriptions(filtered);

        } catch (err) {

            console.log(err);

        }
    };

    useEffect(() => {

        loadPrescriptions();

        const interval =
            setInterval(
                loadPrescriptions,
                3000
            );

        return () =>
            clearInterval(interval);

    }, []);

    return (

        <div>

            <div className="navbar">
                Welcome {user.name}
            </div>

            <div className="container">

                <div className="card">

                    <h2>
                        Patient Dashboard
                    </h2>

                    <br />

                    <button
                        className="btn"
                        onClick={() =>
                            navigate("/chat")
                        }
                    >
                        Start Consultation
                    </button>

                </div>

                <br />

                <h2>
                    Doctor Responses
                </h2>

                {
                    prescriptions.length === 0
                        ? (
                            <div className="card">
                                No prescriptions yet
                            </div>
                        )
                        : (
                            prescriptions.map(
                                (p, index) => (

                                    <div
                                        key={index}
                                        className="card"
                                        style={{
                                            marginTop: "15px"
                                        }}
                                    >

                                        <h3>
                                            Prescription
                                        </h3>

                                        <br />

                                        <p>
                                            {p.prescription}
                                        </p>

                                    </div>

                                )
                            )
                        )
                }

            </div>

        </div>
    );
}

export default PatientDashboard;