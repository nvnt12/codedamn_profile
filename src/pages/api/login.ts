import { NextApiRequest, NextApiResponse } from 'next'
import jsonwebtoken from 'jsonwebtoken'
import { db } from '../../lib/db'
import { User } from '../../lib/types'
import { setCookie } from 'nookies'

export type UserJwtData = {
	userId: User['id']
}

export type LoginBody = Pick<User, 'email' | 'password'>

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const reqUser = req.body as LoginBody
	const user = await db
		.selectFrom('User')
		.selectAll()
		.where('email', '=', reqUser.email)
		.executeTakeFirst()

	if (!user) {
		return res.status(404).send('Could not find user')
	} else {
		if (reqUser.email === user.email && reqUser.password === user.password) {
			const jwtData: UserJwtData = {
				userId: user.id
			}
			const token = jsonwebtoken.sign(jwtData, process.env.JWT_KEY as string)
			await res.revalidate('/')
			setCookie({ res }, 'token', token, {
				path: '/',
				maxAge: 30 * 24 * 60 * 60
			})
			return res.status(200).send('ok')
		} else if (reqUser.email !== user.email || reqUser.password !== user.password) {
			return res.status(401).send('Invalid credentials')
		}
	}
}
