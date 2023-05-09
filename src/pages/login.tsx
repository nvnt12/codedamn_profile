import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Input from '../components/PrimaryInput'
import { warningToast, successToast, errorToast } from '../components/Toast'
import useAuth from '../hooks/useAuth'
import { LoginBody } from './api/login'

export default function LogIn() {
	const [email, setEmail] = useState('demo@gmail.com')
	const [password, setPassword] = useState('password')
	const [isLoading, setLoading] = useState(true)
	const { isLoggedIn } = useAuth()

	const router = useRouter()

	useEffect(() => {
		if (isLoggedIn === true) {
			router.push('/')
		} else if (isLoggedIn === false) {
			setLoading(false)
		}
	}, [isLoggedIn, router])

	async function handleSignIn() {
		setLoading(true)

		const reqBody: LoginBody = {
			email,
			password
		}

		const res = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(reqBody)
		})

		if (res.status === 200) {
			successToast('Logged in successfully.')
			router.push('/')
			return
		} else if (res.status === 401) {
			warningToast('Enter valid email and password.')
		} else if (res.status === 404) {
			errorToast('Could not find user.')
		} else {
			errorToast('Could not log in. Please try again later.')
		}

		setLoading(false)
	}

	return (
		<>
			<Head>
				<title>Login</title>
			</Head>

			<NavBar />

			<div className="absolute top-0 w-full h-[100vh] bg-zinc-50">
				<div className="w-full h-full flex flex-col justify-center items-center">
					<div className="text-center">
						<h1 className="text-3xl font-extrabold text-gray-900 mb-6">
							Sign in to&nbsp;
							<span className="text-3xl text-transparent font-black bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-400">
								codedamn
							</span>
						</h1>
					</div>
					<div className="bg-white max-w-md p-6 w-full rounded-lg flex flex-col border border-gray-100 items-center drop-shadow-sm shadow-slate-50 m-2">
						<form
							className="flex flex-col w-full"
							onSubmit={e => {
								e.preventDefault()
								handleSignIn()
							}}
						>
							<Input
								label="Email"
								type="email"
								id="email"
								required={true}
								value={email}
								onChange={e => {
									setEmail(e.target.value)
								}}
							></Input>
							<Input
								label="Password"
								type="password"
								id="password"
								value={password}
								required={true}
								onChange={e => {
									setPassword(e.target.value)
								}}
							></Input>

							<button
								type="submit"
								disabled={isLoading}
								className="mt-2 mb-2 py-2 bg-indigo-600 rounded-lg w-full xs:w-72 text-md font-medium text-white hover:bg-indigo-700 disabled:bg-indigo-400"
							>
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
