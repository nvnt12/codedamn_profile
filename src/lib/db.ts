import { createKysely } from '@vercel/postgres-kysely'
import { DB } from './types'
import { createId } from '@paralleldrive/cuid2'
import dayjs from 'dayjs'

export const db = createKysely<DB>()

/**
 * for creating default user in db
 */
async function defaultUser() {
	const userId = process.env.DEFAULT_USER_ID as string

	await db.deleteFrom('UserEducation').execute()
	await db.deleteFrom('UserExperience').execute()
	await db.deleteFrom('UserInterest').execute()
	await db.deleteFrom('UserPlayground').execute()
	await db.deleteFrom('UserProject').execute()
	await db.deleteFrom('UserSkill').execute()
	await db.deleteFrom('User').execute()

	await db
		.insertInto('User')
		.values({
			id: userId,
			name: 'Navneet Chadha',
			email: 'demo@gmail.com',
			password: 'password',
			profession: 'Student',
			institute: 'University of Mumbai',
			coverPictureUrl:
				'https://res.cloudinary.com/dum8ltv4o/image/upload/v1683664777/uploads/bg_opm8uy.jpg',
			profilePictureUrl:
				'https://res.cloudinary.com/dum8ltv4o/image/upload/v1683664769/uploads/pfp_ug1mmm.jpg',
			location: 'Mumbai, India',
			about: 'Hello, I am Navneet. I love dogs.',
			dateOfBirth: dayjs('12 Jul 2002').unix(),
			gender: 'Female',
			isFollowersVisible: true,
			isAchievementBadgeVisible: true,
			isXpPointsVisible: true,
			isOpenToWork: true,
			githubUrl: 'https://github.com/nvnt12',
			youtubeUrl: '',
			instagramUrl: '',
			facebookUrl: '',
			behanceUrl: '',
			dribbbleUrl: ''
		})
		.execute()

	await db
		.insertInto('UserInterest')
		.values(
			['Dogs', 'Cats', 'Semantics', 'Ted Talks'].map(interest => ({
				id: createId(),
				userId: userId,
				interest
			}))
		)
		.execute()

	await db
		.insertInto('UserEducation')
		.values([
			{
				id: createId(),
				userId: userId,
				degreeType: 'Bachelor of Science',
				collegeName: 'Mulund College of Commerce',
				startDate: dayjs('May 2020').unix(),
				endDate: dayjs('Apr 2023').unix(),
				description: 'Something...'
			}
		])
		.execute()

	await db
		.insertInto('UserExperience')
		.values([
			{
				id: createId(),
				userId: userId,
				jobTitle: 'Frontend Developer at Facebook',
				jobLocation: 'London',
				startDate: dayjs('May 2021').unix(),
				endDate: dayjs().unix(),
				companyName: 'Facebook',
				description: 'something'
			}
		])
		.execute()

	await db
		.insertInto('UserPlayground')
		.values([
			{
				id: createId(),
				userId: userId,
				title: 'HTML Playground',
				isSelected: true,
				language: 'Html',
				createdAt: dayjs('1 Feb 2023').unix()
			},
			{
				id: createId(),
				userId: userId,
				title: 'React Playground',
				isSelected: false,
				language: 'React',
				createdAt: dayjs('13 Feb 2023').unix()
			},
			{
				id: createId(),
				userId: userId,
				title: 'Next.js Playground',
				isSelected: true,
				language: 'NextJs',
				createdAt: dayjs('15 Feb 2023').unix()
			}
		])
		.execute()

	await db
		.insertInto('UserProject')
		.values([
			{
				id: createId(),
				userId: userId,
				title: 'Tesla Clone',
				imageUrl:
					'https://res.cloudinary.com/dum8ltv4o/image/upload/v1683664093/tesla_clone_lx9wtv.png',
				imageAltText: 'Project Img',
				isSelected: true,
				tags: ['React', 'NextJs'],
				createdAt: dayjs('1 Apr 2023').unix()
			},
			{
				id: createId(),
				userId: userId,
				title: 'Bird App',
				imageUrl:
					'https://res.cloudinary.com/dum8ltv4o/image/upload/v1683664063/bird_app_egeaew.png',
				imageAltText: 'Project Img',
				isSelected: true,
				tags: ['Html', 'CSS'],
				createdAt: dayjs('6 Apr 2023').unix()
			},
			{
				id: createId(),
				userId: userId,
				title: 'Discord',
				imageUrl:
					'https://res.cloudinary.com/dum8ltv4o/image/upload/v1683664100/discord_clone_zvandn.png',
				imageAltText: 'Project Img',
				isSelected: false,
				tags: ['React', 'Tailwind'],
				createdAt: dayjs('30 Apr 2023').unix()
			}
		])
		.execute()

	await db
		.insertInto('UserSkill')
		.values([
			{
				id: createId(),
				userId: userId,
				name: 'HTML5',
				rating: 'Advanced'
			},
			{
				id: createId(),
				userId: userId,
				name: 'CSS3',
				rating: 'Advanced'
			},
			{
				id: createId(),
				userId: userId,
				name: 'NextJs',
				rating: 'Advanced'
			},
			{
				id: createId(),
				userId: userId,
				name: 'Sql',
				rating: 'Beginner'
			},
			{
				id: createId(),
				userId: userId,
				name: 'Git',
				rating: 'Intermediate'
			}
		])
		.execute()
}
