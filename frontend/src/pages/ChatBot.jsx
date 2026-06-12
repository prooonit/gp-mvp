import { useState } from "react";
import axios from "axios";

function ChatBot() {

    const user =
    JSON.parse(
        localStorage.getItem("currentUser")
    );

    const questions = [
        "What problem are you facing?",
        "What is your temperature?",
        "Any breathing difficulty? (yes/no)"
    ];

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: questions[0]
        }
    ]);

    const [input, setInput] = useState("");

    const [step, setStep] = useState(0);

    const [answers, setAnswers] = useState({
        problem: "",
        temp: "",
        breathing: ""
    });

    const handleSend = async () => {

        if (!input.trim()) return;

        const updated = [
            ...messages,
            {
                sender: "user",
                text: input
            }
        ];

        if (step === 0) {

            setAnswers(prev => ({
                ...prev,
                problem: input
            }));

            updated.push({
                sender: "bot",
                text: questions[1]
            });

            setStep(1);
        }

        else if (step === 1) {

            setAnswers(prev => ({
                ...prev,
                temp: input
            }));

            updated.push({
                sender: "bot",
                text: questions[2]
            });

            setStep(2);
        }

        else if (step === 2) {

    const breathing = input;

    let severity = "LOW";

    if (
        Number(answers.temp) > 102 ||
        breathing.toLowerCase() === "yes"
    ) {
        severity = "HIGH";
    }

    if (severity === "HIGH") {

        await axios.post(
            "https://gp-mvp.onrender.com/ticket",
            {
                patientName: user.name,
                pincode: user.pincode,
                symptoms:
                    `${answers.problem}
                    | Temp:${answers.temp}
                    | Breathing:${breathing}`,
                severity
            }
        );

        updated.push({
            sender: "bot",
            text:
                "⚠️ Serious symptoms detected. Case forwarded to your GP."
        });

    } else {

        updated.push({
            sender: "bot",
            text:
                "✅ Mild symptoms detected. Rest and drink water."
        });
    }

    setMessages(updated);

    setTimeout(() => {

        alert("Consultation Completed");

        window.location.href = "/patient";

    }, 2000);

    return;
}

        setMessages(updated);
        setInput("");
    };

    return (

        <div className="chat-container">

            <div className="chat-header">
                Health Assistant
            </div>

            <div className="chat-body">

                {
                    messages.map((msg, index) => (

                        <div
                            key={index}
                            className={
                                msg.sender === "bot"
                                ? "bot-message"
                                : "user-message"
                            }
                        >
                            {msg.text}
                        </div>

                    ))
                }

            </div>

            <div className="chat-input">

                <input
                    value={input}
                    onChange={(e) =>
                        setInput(e.target.value)
                    }
                    placeholder="Type your answer..."
                />

                <button
                    className="btn"
                    onClick={handleSend}
                >
                    Send
                </button>

            </div>

        </div>
    );
}

export default ChatBot;