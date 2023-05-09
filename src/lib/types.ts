import type { ColumnType } from 'kysely'
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
	? ColumnType<S, I | undefined, U>
	: ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>
export type PlaygroundLanguage = 'Html' | 'React' | 'NextJs'
export const PlaygroundLanguage = {
	Html: 'Html',
	React: 'React',
	NextJs: 'NextJs'
}
export type User = {
	id: string
	email: string
	name: string
	password: string
	profession: string
	institute: string
	location: string
	about: string
	dateOfBirth: number
	gender: string
	isFollowersVisible: boolean
	isOpenToWork: boolean
	isAchievementBadgeVisible: boolean
	isXpPointsVisible: boolean
	githubUrl: string
	youtubeUrl: string
	instagramUrl: string
	facebookUrl: string
	behanceUrl: string
	dribbbleUrl: string
	coverPictureUrl: string
	profilePictureUrl: string
}
export type UserEducation = {
	id: string
	userId: string
	degreeType: string
	collegeName: string
	startDate: number
	endDate: number
	description: string
}
export type UserExperience = {
	id: string
	userId: string
	jobTitle: string
	companyName: string
	jobLocation: string
	startDate: number
	endDate: number
	description: string
}
export type UserInterest = {
	id: string
	userId: string
	interest: string
}
export type UserPlayground = {
	id: string
	userId: string
	title: string
	language: PlaygroundLanguage
	createdAt: number
	isSelected: boolean
}
export type UserProject = {
	id: string
	userId: string
	title: string
	imageUrl: string
	imageAltText: string
	tags: string[]
	createdAt: number
	isSelected: boolean
}
export type UserSkill = {
	id: string
	userId: string
	name: string
	rating: string
}
export type DB = {
	User: User
	UserEducation: UserEducation
	UserExperience: UserExperience
	UserInterest: UserInterest
	UserPlayground: UserPlayground
	UserProject: UserProject
	UserSkill: UserSkill
}
