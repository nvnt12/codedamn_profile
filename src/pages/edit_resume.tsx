import NavBar from '../components/NavBar'
import SideNav from '../components/SideNav'
import { BiTrashAlt } from 'react-icons/bi'
import { FiX } from 'react-icons/fi'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import EducationModal from '../components/EducationModal'
import ExperienceModal from '../components/ExperienceModal'
import AddSkillModal from '../components/SkillModal'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import InterestModal from '../components/InterestModal'
import Head from 'next/head'
import { errorToast, successToast } from '../components/Toast'
import { parseCookies, destroyCookie } from 'nookies'
import jsonwebtoken from 'jsonwebtoken'
import { db } from '../lib/db'
import { User, UserEducation, UserExperience, UserInterest, UserSkill } from '../lib/types'
import { jsonArrayFrom } from 'kysely/helpers/postgres'
import dayjs from 'dayjs'
import { UserJwtData } from './api/login'
import { UpdateBody } from './api/update'

type PropsType = {
	user: Omit<User, 'password'> & {
		skills: UserSkill[]
		educations: UserEducation[]
		experiences: UserExperience[]
		interests: UserInterest[]
	}
}

export const getServerSideProps: GetServerSideProps<PropsType> = async context => {
	try {
		const { token } = parseCookies(context)

		const verified = jsonwebtoken.verify(token, process.env.JWT_KEY as string) as UserJwtData

		const user = await db
			.selectFrom('User')
			.select(eb =>
				jsonArrayFrom(
					eb.selectFrom('UserSkill').selectAll().where('userId', '=', verified.userId)
				).as('skills')
			)
			.select(eb =>
				jsonArrayFrom(
					eb.selectFrom('UserEducation').selectAll().where('userId', '=', verified.userId)
				).as('educations')
			)
			.select(eb =>
				jsonArrayFrom(
					eb
						.selectFrom('UserExperience')
						.selectAll()
						.where('userId', '=', verified.userId)
				).as('experiences')
			)
			.select(eb =>
				jsonArrayFrom(
					eb.selectFrom('UserInterest').selectAll().where('userId', '=', verified.userId)
				).as('interests')
			)
			.selectAll()
			.where('id', '=', verified.userId)
			.executeTakeFirst()
			.then(data => {
				if (!data) {
					return data
				}

				const { password, ...user } = data

				return user
			})

		if (!user) {
			return {
				notFound: true
			}
		}

		return {
			props: { user }
		}
	} catch {
		destroyCookie(context, 'token', {
			path: '/'
		})
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		}
	}
}

export default function Edit_Resume({ user }: PropsType) {
	const [skills, setSkills] = useState(user.skills)
	const [interests, setInterests] = useState(user.interests)
	const [educations, setEducations] = useState(user.educations)
	const [experiences, setExperiences] = useState(user.experiences)
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
	const router = useRouter()

	function addEducation(newEducation: UserEducation) {
		setEducations(education => [
			...education,
			{
				...newEducation
			}
		])
		setHasUnsavedChanges(true)
	}

	function addExperience(newExperience: UserExperience) {
		setExperiences(experience => [
			...experience,
			{
				...newExperience
			}
		])
		setHasUnsavedChanges(true)
	}

	function addSkill(newSkill: UserSkill) {
		setSkills(skills => [
			...skills,
			{
				...newSkill
			}
		])
		setHasUnsavedChanges(true)
	}

	function addInterest(newInterest: UserInterest) {
		setInterests(interests => [
			...interests,
			{
				...newInterest
			}
		])
		setHasUnsavedChanges(true)
	}

	function deleteEducation(id: string) {
		setEducations(educations => educations.filter(edu => edu.id !== id))
		setHasUnsavedChanges(true)
	}
	function deleteExperience(id: string) {
		setExperiences(experience => experience.filter(exp => exp.id !== id))
		setHasUnsavedChanges(true)
	}
	function deleteSkill(id: string) {
		setSkills(skills => skills.filter(skill => skill.id !== id))
		setHasUnsavedChanges(true)
	}
	function deleteInterest(id: string) {
		setInterests(interests => interests.filter(interest => interest.id !== id))
		setHasUnsavedChanges(true)
	}

	async function updateResume() {
		setHasUnsavedChanges(false)
		const reqBody: UpdateBody = {
			educations,
			experiences,
			skills,
			interests
		}
		const res = await fetch('/api/update', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(reqBody)
		})
		if (res.status === 200) {
			successToast('Changes Saved!')
		} else {
			errorToast('Could not save changes. Please try again later.')
		}
	}

	return (
		<>
			<Head>
				<title>Edit Resume</title>
			</Head>
			<NavBar profilePictureUrl={user.profilePictureUrl} />
			<div className="w-full flex justify-center">
				<div className="w-full flex p-14 justify-between sm:flex-wrap sm:px-3 sm:py-6 md:px-4 md:py-8 md:ml-2 max-w-7xl">
					<SideNav />
					<div className="w-9/12 pl-14 sm:w-full sm:mt-6 sm:px-2 md:w-full md:px-6">
						<div className="mb-8">
							<div className="flex justify-between items-center mb-6">
								<h1 className="font-semibold text-gray-800 text-xl">Education</h1>
								<EducationModal addEducation={addEducation} userId={user.id} />
							</div>
							{educations.length === 0 && (
								<div className="bg-gray-50 bg-opacity-50 px-5 py-8 rounded-2xl border-2 border-gray-100 flex justify-center text-center">
									<h2 className="text-md text-gray-500 font-medium mb-1">
										No Education to be displayed. <br />
										Click on + Add Education to add your education.
									</h2>
								</div>
							)}
							{educations.length > 0 && (
								<div className="bg-gray-50 bg-opacity-50 p-5 rounded-2xl border-2 border-gray-100 flex  flex-col justify-between">
									{educations.map(edu => (
										<div
											className="flex justify-between mb-6"
											key={`edu-${edu.id}-${edu.degreeType}`}
										>
											<div className="flex flex-col w-5/6">
												<h2 className="text-lg text-gray-800 font-semibold mb-1">
													{edu.degreeType}
												</h2>
												<div className="flex justify-between sm:flex-col mb-4">
													<h3 className="text-md text-gray-800 font-medium">
														{edu.collegeName}
													</h3>
													<p className=" text-gray-700 text-sm font-semibold ">
														{dayjs
															.unix(edu.startDate)
															.format('MMM YYYY')}
														&nbsp;&ndash;&nbsp;
														{dayjs.unix(edu.endDate).format('MMM YYYY')}
													</p>
												</div>
												<p className="text-gray-500 text-md">
													{edu.description}
												</p>
											</div>

											<div>
												<button onClick={() => deleteEducation(edu.id)}>
													<BiTrashAlt className="h-6 w-6 fill-gray-400" />
												</button>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
						<div className="mb-8">
							<div className="flex justify-between items-center mb-6">
								<h1 className="font-semibold text-gray-800 text-xl">
									Work Experience
								</h1>
								<ExperienceModal addExperience={addExperience} userId={user.id} />
							</div>
							{experiences.length === 0 && (
								<div className="bg-gray-50 bg-opacity-50 px-5 py-8 rounded-2xl border-2 border-gray-100 flex justify-center text-center">
									<h2 className="text-md text-gray-500 font-medium mb-1">
										No Experience to be displayed. <br />
										Click on + Add Experience to add your experience.
									</h2>
								</div>
							)}
							{experiences.length > 0 && (
								<div className="bg-gray-50 bg-opacity-50 p-5 rounded-2xl border-2 border-gray-100 flex  flex-col justify-between">
									{experiences.map(exp => (
										<div
											className="flex justify-between pb-8"
											key={`exp-${exp.id}-${exp.jobTitle}`}
										>
											<div className="flex flex-col w-5/6">
												<h2 className="text-lg text-gray-800 font-semibold mb-1">
													{exp.jobTitle}
												</h2>
												<div className="flex justify-between sm:flex-col mb-4">
													<div>
														<h3 className="text-md text-gray-800 font-medium">
															{exp.jobLocation} &bull;&nbsp;
															{exp.companyName}
														</h3>
													</div>
													<div>
														<p className=" text-gray-700 text-sm font-semibold">
															{dayjs
																.unix(exp.startDate)
																.format('MMM YYYY')}
															&nbsp;&ndash;&nbsp;
															{dayjs
																.unix(exp.endDate)
																.format('MMM YYYY')}
														</p>
													</div>
												</div>
												<p className="text-gray-500 text-md">
													{exp.description}
												</p>
											</div>
											<div>
												<button onClick={() => deleteExperience(exp.id)}>
													<BiTrashAlt className="h-6 w-6 fill-gray-400" />
												</button>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
						<div className="mb-8">
							<div className="flex justify-between items-center mb-6">
								<h1 className="font-semibold text-gray-800 text-xl">Skills</h1>
								<AddSkillModal
									addSkill={addSkill}
									selectedSkills={skills}
									userId={user.id}
								/>
							</div>
							{skills.length === 0 && (
								<div className="bg-gray-50 bg-opacity-50 px-5 py-8 rounded-2xl border-2 border-gray-100 flex justify-center text-center">
									<h2 className="text-md text-gray-500 font-medium mb-1">
										No Skills to be displayed. <br />
										Click on + Add Skill to add your skills.
									</h2>
								</div>
							)}
							{skills.length > 0 && (
								<div className="bg-gray-50 bg-opacity-50 p-5 rounded-2xl border-2 border-gray-100 flex-col">
									<div className="flex justify-between ">
										<div className="pt-1 pb-1 grid grid-cols-2 w-full gap-x-14 sm:grid-cols-1">
											{skills.map(skill => (
												<div
													key={`skill-${skill.id}-${skill.name}`}
													className="flex shrink mb-4 justify-between items-center"
												>
													<div className="pr-4 pl-4 pt-1 pb-1 rounded-md mr-3 ">
														<p className="text-md text-gray-800 font-semibold">
															{skill.name}
														</p>
														<p className="text-sm text-gray-500">
															{skill.rating}
														</p>
													</div>
													<div className="mt-1 mr-4">
														<button
															onClick={() => deleteSkill(skill.id)}
														>
															<BiTrashAlt className="h-6 w-6 fill-gray-400" />
														</button>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							)}
						</div>
						<div className="mb-8">
							<div className="flex justify-between items-center mb-6 sm:mb-4">
								<h1 className="font-semibold text-gray-800 text-xl">Interests</h1>
								<InterestModal addInterest={addInterest} userId={user.id} />
							</div>
							{interests.length === 0 && (
								<div className="bg-gray-50 bg-opacity-50 px-5 py-8 rounded-2xl border-2 border-gray-100 flex justify-center text-center">
									<h2 className="text-md text-gray-500 font-medium mb-1">
										No Interests to be displayed. <br />
										Click on + Add Interest to add your interests.
									</h2>
								</div>
							)}
							{interests.length > 0 && (
								<div>
									<div className="flex flex-wrap">
										{interests.map(interest => (
											<div
												className="flex justify-between items-center mt-2"
												key={`interest-${interest.id}-${interest}`}
											>
												<div className="bg-gray-50 border-2 border-gray-100 flex items-center px-3 py-1 mr-4 rounded-lg ">
													<p className="text-md text-gray-800 font-semibold pr-3">
														{interest.interest}
													</p>
													<button
														className="flex justify-center items-center h-5 w-5"
														onClick={() => deleteInterest(interest.id)}
													>
														<FiX className="text-gray-700 h-4 w-4" />
													</button>
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
						<div className="mb-6 flex justify-end">
							<SecondaryButton
								type="button"
								value="Cancel"
								onClick={() => {
									router.push('/')
								}}
							/>
							<PrimaryButton
								value="Save changes"
								type="button"
								onClick={() => {
									updateResume()
								}}
								active={hasUnsavedChanges}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
