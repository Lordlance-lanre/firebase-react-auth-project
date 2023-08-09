import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import app from '../api/axios.js';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const Home = () =>{
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const navigate = useNavigate();

	const auth = getAuth(app);

	const submitDetails = async(e) =>{
		e.preventDefault;
		let allDetails ={
			email: email,
			password: password
		}
		console.log(typeof(allDetails));
		if(email.includes("@") && email.includes(".") && password.length >= 7){
			setTimeout(() => navigate('/login'), 1000)
        	console.log("successful");
		}
		createUserWithEmailAndPassword(auth, email, password)
  			.then((userCredential) => {
    		// Signed in 
    		const user = userCredential.user;
    		console.log("userToken>>", user);
    		// ...
  		})
  			.catch((error) => {
    		const errorCode = error.code;
    		const errorMessage = error.message;
    	// ..
  		});

      }

	function handleEmail(e){
		if(email === ""){
			setEmailError("Email is required");
		}else if(!email.includes("@") || !email.includes(".")){
			setEmailError("Valid email is required")
		}else{
			setEmailError("");
		}
	}
	
	function handlePassword(e){
		if(password === ""){
			setPasswordError("Password is required")
		}else if (password.length < 7){
			setPasswordError("Password must be at least 7 chars")
		}else{
			setPasswordError("")
		}
	}

	return(
		<div className="bg-slate-500 w-full h-screen">
			<div className="">
				<p className="text-center py-20 font-bold text-white text-2xl">Login Auth Project</p>
				
				<div className="bg-slate-400 h-[420px] py-5">
					<p className="text-center font-bold mb-10 text-lg text-white">Registeration page</p>
					<div className="flex pb-2">
						<input type="text"  onBlur={handleEmail} value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-9/12 px-3 text-xl rounded py-2 border md:w-3/12 mx-auto outline-indigo-200 "/>
					</div>
					{
						emailError && <div className="text-center text-rose-500 text-xs">{emailError}</div>
					}

					<div className="flex mt-12 pb-2">
						<input type="password"  onBlur={handlePassword} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" className="w-9/12 px-3 text-xl rounded py-2 border md:w-3/12 mx-auto outline-indigo-200 "/>
						<img src="../Vector2.svg" className="absolute ml-[350px] mt-[12px] md:ml-[740px] w-6" alt=""/>
					</div>	

					{
						passwordError && <div className="text-center text-rose-500 text-xs">{passwordError}</div>
					}
					<button onClick={submitDetails} className="mx-auto flex bg-zinc-500 px-8 py-2 mt-9 text-white rounded-lg">Register</button>
				</div>
			</div>
		</div>
		)
}
export default Home;