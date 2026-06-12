import { useNavigate } from "react-router-dom";

function Home(){

    const navigate = useNavigate();

    return(
        <div className="center">

            <div className="card">

                <h1>Health Assistant</h1>

                <br/>

                <button
                className="btn"
                onClick={()=>navigate("/login/patient")}
                >
                    Patient Login
                </button>

                <br/><br/>

                <button
                className="btn"
                onClick={()=>navigate("/register/patient")}
                >
                    Patient Register
                </button>

                <br/><br/>

                <button
                className="btn"
                onClick={()=>navigate("/login/gp")}
                >
                    GP Login
                </button>

                <br/><br/>

                <button
                className="btn"
                onClick={()=>navigate("/register/gp")}
                >
                    GP Register
                </button>

            </div>

        </div>
    )
}

export default Home;