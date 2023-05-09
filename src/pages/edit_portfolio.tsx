import NavBar from '../components/NavBar'
import SideNav from '../components/SideNav'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import PlaygroundCard from '../components/PlaygroundCard'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { warningToast, successToast, errorToast } from '../components/Toast'
import { parseCookies, destroyCookie } from 'nookies'
import jsonwebtoken from 'jsonwebtoken'
import { db } from '../lib/db'
import { User, UserPlayground, UserProject } from '../lib/types'
import { jsonArrayFrom } from 'kysely/helpers/postgres'
import { UserJwtData } from './api/login'
import { UpdateBody } from './api/update'
import ProjectCard from '../components/ProjectCard'

type PropsType = {
	user: Pick<User, 'profilePictureUrl'> & {
		playgrounds: UserPlayground[]
		projects: UserProject[]
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
					eb
						.selectFrom('UserPlayground')
						.selectAll()
						.where('userId', '=', verified.userId)
				).as('playgrounds')
			)
			.select(eb =>
				jsonArrayFrom(
					eb.selectFrom('UserProject').selectAll().where('userId', '=', verified.userId)
				).as('projects')
			)
			.selectAll()
			.where('id', '=', verified.userId)
			.executeTakeFirst()

		if (!user) {
			return {
				notFound: true
			}
		}

		return {
			props: {
				user: {
					profilePictureUrl: user.profilePictureUrl,
					playgrounds: user.playgrounds,
					projects: user.projects
				}
			}
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

export default function Edit_Porfolio({ user }: PropsType) {
	const [projects, setProjects] = useState(user.projects)
	const [playgrounds, setPlaygrounds] = useState(user.playgrounds)
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
	const router = useRouter()

	async function updatePortfolio() {
		setHasUnsavedChanges(false)
		const reqBody: UpdateBody = {
			playgrounds,
			projects
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

	function handlePlaygroundClick(playground: UserPlayground) {
		if (playground.isSelected) {
			setPlaygrounds(
				playgrounds.map(pg =>
					pg.title === playground.title ? { ...playground, isSelected: false } : pg
				)
			)
			setHasUnsavedChanges(true)
		} else {
			const selectedPg = playgrounds.filter(playground => playground.isSelected)
			if (selectedPg.length <= 1) {
				setPlaygrounds(
					playgrounds.map(pg =>
						pg.title === playground.title ? { ...playground, isSelected: true } : pg
					)
				)
				setHasUnsavedChanges(true)
			} else {
				warningToast('Cannot select more than 2 playgrounds.')
			}
		}
	}

	function handleProjectClick(project: UserProject) {
		if (project.isSelected) {
			setProjects(
				projects.map(pj =>
					pj.title === project.title ? { ...project, isSelected: false } : pj
				)
			)
			setHasUnsavedChanges(true)
		} else {
			const selectedPro = projects.filter(project => project.isSelected)

			if (selectedPro.length <= 1) {
				setProjects(
					projects.map(pj =>
						pj.title === project.title ? { ...project, isSelected: true } : pj
					)
				)
				setHasUnsavedChanges(true)
			} else {
				warningToast('Cannot select more than 2 projects.')
			}
		}
	}

	return (
		<>
			<Head>
				<title>Edit Portfolio</title>
			</Head>
			<NavBar profilePictureUrl={user.profilePictureUrl} />
			<div className="w-full flex justify-center">
				<div className="w-full max-w-7xl flex p-14 justify-between sm:flex-wrap sm:px-3 sm:py-6 md:px-4 md:py-8 md:ml-2">
					<SideNav />
					<div className="w-9/12 pl-14 sm:w-full sm:mt-6 sm:px-2 md:w-full md:px-6">
						<div className="mb-8 w-full">
							<div className="flex justify-between items-center mb-6">
								<h1 className="font-semibold text-gray-800 text-xl">Playgrounds</h1>
							</div>
							<div className="grid grid-cols-2 gap-4 sm:grid-cols-1 sm:gap-3 md:grid-cols-1 md:gap-3">
								{playgrounds.map(playground => (
									<div
										key={`pg-${playground.id}-${playground.title}`}
										className={`${
											playground.isSelected
												? 'rounded-lg border-2 border-indigo-600'
												: 'rounded-lg border-2 border-gray-100'
										} `}
										onClick={() => {
											handlePlaygroundClick(playground)
										}}
									>
										<div>
											<PlaygroundCard
												title={playground.title}
												language={playground.language}
												createdAt={playground.createdAt}
												isSelected={playground.isSelected}
											/>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="mb-8 w-full">
							<div className="flex justify-between items-center mb-6">
								<h1 className="font-semibold text-gray-800 text-xl">Projects</h1>
							</div>
							<div className="grid grid-cols-2 gap-4 sm:grid-cols-1 sm:gap-3 md:grid-cols-1 md:gap-3">
								{projects.map(project => (
									<div
										key={`pro-${project.id}-${project.title}`}
										className={`${
											project.isSelected
												? 'rounded-lg border-2 border-indigo-600'
												: 'rounded-lg border-2 border-gray-100'
										} `}
										onClick={() => {
											handleProjectClick(project)
										}}
									>
										<ProjectCard
											imageUrl={project.imageUrl}
											imageAltText={project.imageAltText}
											title={project.title}
											tags={project.tags}
											createdAt={project.createdAt}
											isSelected={project.isSelected}
										/>
									</div>
								))}
							</div>
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
									updatePortfolio()
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
