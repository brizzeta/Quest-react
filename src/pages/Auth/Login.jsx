import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserManagementService from '../../service/userService'
import styles from './Auth.module.css'

function LoginForm() {
	const userManager = UserManagementService()
	const redirect = useNavigate()
	const [loginName, setLoginName] = useState('')
	const [loginPassword, setLoginPassword] = useState('')
	const [feedbackMessage, setFeedbackMessage] = useState('')

	const isFormValid = loginName && loginPassword;

	const handleLogin = e => {
		e.preventDefault() 

		if (!userManager.isUserWithPassword(loginName, loginPassword)) {
			setFeedbackMessage('Невірний логін або пароль')
			return
		}

		localStorage.setItem('loggedInUser', loginName)
		redirect('/')
	}

	return (
		<div>
			<form className={styles['form-box']} onSubmit={handleLogin}>
				<label htmlFor='loginName'>Им'я</label>
				<input className={styles['text']} type='text' id='loginName' value={loginName} onChange={e => setLoginName(e.target.value)}/>
				<label htmlFor='loginPassword'>Пароль</label>
				<input className={styles['text']} type='password' id='loginPassword' value={loginPassword} onChange={e => setLoginPassword(e.target.value)}/>
				<button className={`${styles['button']} ${!isFormValid ? styles['disabled'] : ''}`} type='submit' disabled={!isFormValid}>Вхід</button>
				{feedbackMessage && (
					<div className={feedbackMessage === 'Реєстрація успішна' ? styles['message'] + ' ' + styles['success'] : styles['message'] + ' ' + styles['error'] }>
						{feedbackMessage}
					</div>
				)}
			</form>

			<div className={styles['link']}>
				<p>Немає облікового запису? <a href='register'>Зареєструватись</a></p>
			</div>
		</div>
	)
}

export default LoginForm
