
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function App() {
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState(null);
    useEffect(() => {
		const user = localStorage.getItem('loggedInUser')
		if (user) {
			setLoggedInUser(user)
		} else {
			navigate('/auth/login') 
		}
	})
    const handleLogout = () => {
		localStorage.removeItem('loggedInUser') 
		setLoggedInUser(null) 
		navigate('/');
	}
	const handleQuiz =()=>{
		navigate('quest')
	}
	return (
		<>
			{loggedInUser ? (
                <>
    	   			<h3>{loggedInUser}</h3><br />
					<div><button onClick={handleQuiz}>Квіз</button></div>
					<div><button onClick={handleLogout}>Вихід</button>{' '}</div>
					{}
                </>
            ) : (
                <h3>Вы не вошли в систему</h3>
            )}
		</>
	)
}

export default App;