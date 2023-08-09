import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import app from '../api/axios.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () =>{
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const navigate = useNavigate();

	const auth = getAuth(app);

	const submitLog = (e) =>{
		e.preventDefault();	
		signInWithEmailAndPassword(auth, email, password)
	  		.then((userCredential) => {
	    	// Signed in 
	    	const user = userCredential.user;
	    	console.log("user>>>>",user);
	    	// ...
	  	})
	  		.catch((error) => {
	    	const errorCode = error.code;
	    	const errorMessage = error.message;
	    	console.log("err>>>>",error.code)
	 	});
	}

	function logPassword(e){
		if(password === ""){
			setPasswordError("Password is required")
		}else if (password.length < 7){
			setPasswordError("Password must be at least 7 chars")
		}else{
			setPasswordError("")
		}
	}

	function logEmail(e){
		if(email === ""){
			setEmailError("Email is required");
		}else if(!email.includes("@") || !email.includes(".")){
			setEmailError("Valid email is required")
		}else{
			setEmailError("");
		}
	}	
	
	return(
		<div className="bg-slate-500 w-full h-screen py-40">
			<div className="bg-slate-400 h-[420px] py-10">
					<p className="text-center font-bold mb-10 text-lg text-white">Login page</p>
					<div className="flex pb-2">
						<input value={email} onChange={(e) => setEmail(e.target.value)} onBlur={logEmail} type="text" placeholder="Email"  className="w-9/12 px-3 text-xl rounded py-2 border md:w-3/12 mx-auto outline-indigo-200 "/>
					</div>
					{
						emailError && <div className="text-center text-rose-500 text-xs">{emailError}</div>
					}

					<div className="flex mt-12 pb-2">
						<input value={password} onChange={(e) => setPassword(e.target.value)} onBlur={logPassword} type="password"  placeholder="Password" className="w-9/12 px-3 text-xl rounded py-2 border md:w-3/12 mx-auto outline-indigo-200 "/>
						<img src="../Vector2.svg" className="absolute ml-[350px] mt-[12px] md:ml-[740px] w-6" alt=""/>
					</div>	
					{
						passwordError && <div className="text-center text-rose-500 text-xs">{passwordError}</div>
					}
					
					<button onClick={submitLog} className="mx-auto flex bg-zinc-500 px-8 py-2 mt-9 text-white rounded-lg">Login</button>
			</div>
		</div>
		)
}

export default Login;