import { useEffect, useState } from 'react'
import { parseCookies, destroyCookie } from 'nookies'

export default function useAuth() {
	const [isLoggedIn, setLoggedIn] = useState<boolean | 'unknown'>('unknown')

	const { token } = parseCookies()

	useEffect(() => {
		try {
			if (token) {
				setLoggedIn(true)
			} else {
				destroyCookie(null, 'token', {
					path: '/'
				})
				setLoggedIn(false)
			}
		} catch (error) {
			destroyCookie(null, 'token', {
				path: '/'
			})
			setLoggedIn(false)
		}
	}, [token])

	return { isLoggedIn }
}
