import { NextApiRequest, NextApiResponse } from 'next'
import jsonwebtoken from 'jsonwebtoken'
import { db } from '../../lib/db'
import { UserJwtData } from './login'
import {
	User,
	UserEducation,
	UserExperience,
	UserInterest,
	UserPlayground,
	UserProject,
	UserSkill
} from '../../lib/types'
import { parseCookies } from 'nookies'

export type UpdateBody = {
	user?: Partial<User>
	playgrounds?: UserPlayground[]
	projects?: UserProject[]
	educations?: UserEducation[]
	experiences?: UserExperience[]
	skills?: UserSkill[]
	interests?: UserInterest[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { token } = parseCookies({ req })

	const verified = jsonwebtoken.verify(token, process.env.JWT_KEY as string) as UserJwtData

	if (!verified.userId) {
		return res.status(404).send('Could not find user')
	}

	const reqBody = req.body as UpdateBody

	if (reqBody.user) {
		await db.updateTable('User').set(reqBody.user).where('id', '=', verified.userId).execute()
	}
	if (reqBody.playgrounds) {
		await db.deleteFrom('UserPlayground').where('userId', '=', verified.userId).execute()

		if (reqBody.playgrounds.length > 0) {
			await db.insertInto('UserPlayground').values(reqBody.playgrounds).execute()
		}
	}
	if (reqBody.projects) {
		await db.deleteFrom('UserProject').where('userId', '=', verified.userId).execute()

		if (reqBody.projects.length > 0) {
			await db.insertInto('UserProject').values(reqBody.projects).execute()
		}
	}
	if (reqBody.educations) {
		await db.deleteFrom('UserEducation').where('userId', '=', verified.userId).execute()

		if (reqBody.educations.length > 0) {
			await db.insertInto('UserEducation').values(reqBody.educations).execute()
		}
	}
	if (reqBody.experiences) {
		await db.deleteFrom('UserExperience').where('userId', '=', verified.userId).execute()

		if (reqBody.experiences.length > 0) {
			await db.insertInto('UserExperience').values(reqBody.experiences).execute()
		}
	}
	if (reqBody.skills) {
		await db.deleteFrom('UserSkill').where('userId', '=', verified.userId).execute()

		if (reqBody.skills.length > 0) {
			await db.insertInto('UserSkill').values(reqBody.skills).execute()
		}
	}
	if (reqBody.interests) {
		await db.deleteFrom('UserInterest').where('userId', '=', verified.userId).execute()

		if (reqBody.interests.length > 0) {
			await db.insertInto('UserInterest').values(reqBody.interests).execute()
		}
	}

	await res.revalidate('/')
	return res.status(200).send('ok')
}
