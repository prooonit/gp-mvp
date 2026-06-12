import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

function Register(){

    const { role } = useParams();

    const navigate = useNavigate();

    const [form,setForm] = useState({
        name:"",
        email:"",
        password:"",
        pincode:""
    });

    const submit = ()=>{

        const users =
        JSON.parse(localStorage.getItem("users"))
        || [];

        users.push({
            ...form,
            role:role.toUpperCase()
        });

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Registered");

        navigate(`/login/${role}`);
    }

    return(
        <div className="center">

            <div className="card" style={{width:"400px"}}>

                <h2>{role} Register</h2>

                <input
                className="input"
                placeholder="Name"
                onChange={(e)=>
                setForm({...form,name:e.target.value})
                }
                />

                <input
                className="input"
                placeholder="Email"
                onChange={(e)=>
                setForm({...form,email:e.target.value})
                }
                />

                <input
                type="password"
                className="input"
                placeholder="Password"
                onChange={(e)=>
                setForm({...form,password:e.target.value})
                }
                />

                <input
                className="input"
                placeholder="Pincode"
                onChange={(e)=>
                setForm({...form,pincode:e.target.value})
                }
                />

                <button
                className="btn"
                onClick={submit}
                >
                    Register
                </button>

            </div>

        </div>
    )
}

export default Register;