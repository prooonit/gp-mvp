import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";

function Login(){

    const { role } = useParams();

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const login = ()=>{

        const users =
        JSON.parse(localStorage.getItem("users"))
        || [];

        const user = users.find(
            u =>
            u.email===email &&
            u.password===password &&
            u.role===role.toUpperCase()
        );

        if(!user){
            alert("Invalid Credentials");
            return;
        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        if(role==="patient"){
            navigate("/patient");
        }else{
            navigate("/gp");
        }
    }

    return(
        <div className="center">

            <div className="card" style={{width:"400px"}}>

                <h2>{role} Login</h2>

                <input
                className="input"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                type="password"
                className="input"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
                />

                <button
                className="btn"
                onClick={login}
                >
                    Login
                </button>

            </div>

        </div>
    )
}

export default Login;