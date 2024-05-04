import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserManagementService from '../../service/userService'
import styles from './Auth.module.css'

function RegistrationForm() {
	const [newUsername, setNewUsername] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmNewPassword, setConfirmNewPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [initialFocus, setInitialFocus] = useState(true)
	const userService = UserManagementService()
	const navigate = useNavigate()

	const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/ 

	const validateForm = () => {
		if (!newUsername) {
			setErrorMessage('Укажите имя пользователя')
			return false
		}

		if (!newPassword || !confirmNewPassword) {
			setErrorMessage('Введіть пароль')
			return false
		}

		if (newPassword.length < 6) {
			setErrorMessage('Пароль повинен містити щонайменше 6 символів')
			return false
		}

		if (!passwordPattern.test(newPassword)) {
			setErrorMessage(
				'Пароль повинен містити мінімум 6 символів, включати літери у верхньому та нижньому регістрах та одну цифру.'
			)
			return false
		}

		if (newPassword !== confirmNewPassword) {
			setErrorMessage('Паролі не співпадають')
			return false
		}

		return true
	}
	
	const isFormValid = newUsername && newPassword && confirmNewPassword;

	const handleRegistration = e => {
		e.preventDefault() 

		if (!validateForm()) {
			return
		}

		userService
			.addUser(newUsername, newPassword)
			.then(result => {
				if (result === 'User already exists') {
					setErrorMessage('Користувач із таким ім\'ям вже існує')
				} else {
					setErrorMessage('Реєстрація успішна')
					navigate('/auth/login')
				}
			})
			.catch(error => {
				console.error('Error:', error)
				setErrorMessage('Сталася помилка під час реєстрації')
			})
	}

	const handleConfirmPasswordChange = e => {
		if (!initialFocus && e.target.value !== newPassword) {
			setErrorMessage('Паролі не співпадають')
		} else {
			setErrorMessage('')
		}

		setConfirmNewPassword(e.target.value)
	}

	const handleConfirmPasswordBlur = e => {
		if (initialFocus) {
			setInitialFocus(false) 

			if (e.target.value !== newPassword) {
				setErrorMessage('Паролі не співпадають')
			}
		}
	}

	return (
		<div>
			<form className={styles['form-box']} onSubmit={handleRegistration}>
				<label htmlFor='username'>Им'я</label>
				<input className={styles['text']} type='text' id='username' value={newUsername} onChange={e => setNewUsername(e.target.value)}/>
				<label htmlFor='new_password'>Пароль</label>
				<input className={styles['text']} type='password' id='new_password' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
				<label htmlFor='confirm_new_password'>Підтвердження пароль</label>
				<input className={styles['text']} type='password' id='confirm_new_password' value={confirmNewPassword} onChange={e => handleConfirmPasswordChange(e)} onBlur={e => handleConfirmPasswordBlur(e)}/>
				<button className={`${styles['button']} ${!isFormValid ? styles['disabled'] : ''}`} type='submit' disabled={!isFormValid}>Зареєструватись</button>
				{errorMessage && (
					<div className={errorMessage === 'Реєстрація успішна' ? styles['message'] + ' ' + styles['success'] : styles['message'] + ' ' + styles['error']}>
						{errorMessage}
					</div>
				)}
			</form>
			<div className={styles['link']}>
				<p>Є обліковий запис? <a href='login'>Увійти</a></p>
			</div>
		</div>
	)
}

export default RegistrationForm
