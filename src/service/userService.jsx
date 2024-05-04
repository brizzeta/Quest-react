import { useState, useEffect } from 'react'

const UserManagementService = () => {
	const [userList, setUserList] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const BASE_URL = 'http://localhost:3001/users'

	useEffect(() => {
		fetchUsers()
	}, [])

	const fetchUsers = async () => {
		try {
			const response = await fetch(BASE_URL)
			if (!response.ok) {
				throw new Error(`Failed to fetch: ${response.status}`)
			}

			const data = await response.json()
			console.log('Loaded users:', data)
			setUserList(data)
		} catch (err) {
			console.error('Error fetching users:', err)
			setError('Failed to load users')
		} finally {
			setLoading(false)
		}
	}

	const addUser = (username, password) => {
		return new Promise((resolve, reject) => {
			if (isUserExists(username)) {
				resolve('User already exists')
				return
			}

			const newUser = { username, password }

			fetch(BASE_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newUser),
			})
				.then(response => {
					if (!response.ok) {
						throw new Error(`Failed to add user: ${response.status}`)
					}
					return response.json()
				})
				.then(() => {
					setUserList(prevUsers => [...prevUsers, newUser])
					resolve('User added successfully')
				})
				.catch(error => {
					console.error('Error adding user:', error)
					reject('Failed to add user')
				})
		})
	}

	const isUserExists = username => {
		return userList.some(user => user.username === username)
	}

	const isUserWithPassword = (username, password) => {
		return userList.some(
			user => user.username === username && user.password === password
		)
	}

	return {
		users: userList,
		addUser,
		isUserExists,
		isUserWithPassword,
		loading,
		error,
	}
}

export default UserManagementService
