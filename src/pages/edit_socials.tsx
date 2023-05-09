import { GetServerSideProps } from 'next'
import { useState } from 'react'
import NavBar from '../components/NavBar'
import SideNav from '../components/SideNav'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import Input from '../components/PrimaryInput'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { errorToast, successToast } from '../components/Toast'
import { destroyCookie, parseCookies } from 'nookies'
import jsonwebtoken from 'jsonwebtoken'
import { db } from '../lib/db'
import { User } from '../lib/types'
import { UserJwtData } from './api/login'
import { UpdateBody } from './api/update'

type PropsType = {
	user: Pick<
		User,
		| 'profilePictureUrl'
		| 'githubUrl'
		| 'youtubeUrl'
		| 'instagramUrl'
		| 'facebookUrl'
		| 'dribbbleUrl'
		| 'behanceUrl'
	>
}

export const getServerSideProps: GetServerSideProps<PropsType> = async context => {
	try {
		const { token } = parseCookies(context)

		const verified = jsonwebtoken.verify(token, process.env.JWT_KEY as string) as UserJwtData

		const user = await db
			.selectFrom('User')
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
					githubUrl: user.githubUrl,
					youtubeUrl: user.youtubeUrl,
					instagramUrl: user.instagramUrl,
					facebookUrl: user.facebookUrl,
					behanceUrl: user.behanceUrl,
					dribbbleUrl: user.dribbbleUrl
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

export default function Edit_Socials({ user }: PropsType) {
	const [githubUrl, setGithubUrl] = useState(user.githubUrl)
	const [youtubeUrl, setYoutubeUrl] = useState(user.youtubeUrl)
	const [instagramUrl, setInstagramUrl] = useState(user.instagramUrl)
	const [facebookUrl, setFacebookUrl] = useState(user.facebookUrl)
	const [behanceUrl, setBehanceUrl] = useState(user.behanceUrl)
	const [dribbbleUrl, setDribbbleUrl] = useState(user.dribbbleUrl)
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
	const router = useRouter()

	async function updateLinks() {
		setHasUnsavedChanges(false)
		const reqBody: UpdateBody = {
			user: {
				githubUrl,
				youtubeUrl,
				facebookUrl,
				instagramUrl,
				behanceUrl,
				dribbbleUrl
			}
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
				<title>Edit Socials</title>
			</Head>

			<NavBar profilePictureUrl={user.profilePictureUrl} />
			<div className="w-full flex justify-center">
				<div className="w-full flex p-14 justify-between sm:flex-wrap sm:px-3 sm:py-6 md:px-4 md:py-8 md:ml-2 max-w-7xl">
					<SideNav />
					<div className="w-9/12 pl-14 sm:w-full sm:mt-6 sm:px-2 md:w-full md:px-6">
						<form
							onSubmit={e => {
								e.preventDefault()
								updateLinks()
							}}
						>
							<div className="flex flex-col">
								<Input
									label="Github"
									type="text"
									id="githubUrl"
									value={githubUrl}
									required={false}
									onChange={e => {
										setGithubUrl(e.target.value)
										setHasUnsavedChanges(true)
									}}
								></Input>
								<Input
									label="Youtube"
									type="text"
									id="youtubeUrl"
									value={youtubeUrl}
									required={false}
									onChange={e => {
										setYoutubeUrl(e.target.value)
										setHasUnsavedChanges(true)
									}}
								></Input>
								<Input
									label="Instagram"
									type="text"
									id="instagramUrl"
									value={instagramUrl}
									required={false}
									onChange={e => {
										setInstagramUrl(e.target.value)
										setHasUnsavedChanges(true)
									}}
								></Input>
								<Input
									label="Facebook"
									type="text"
									id="facebookUrl"
									value={facebookUrl}
									required={false}
									onChange={e => {
										setFacebookUrl(e.target.value)
										setHasUnsavedChanges(true)
									}}
								></Input>
								<Input
									label="Behance"
									type="text"
									id="behanceUrl"
									value={behanceUrl}
									required={false}
									onChange={e => {
										setBehanceUrl(e.target.value)
										setHasUnsavedChanges(true)
									}}
								></Input>
								<Input
									label="Dribbble"
									type="text"
									id="dribbleUrl"
									value={dribbbleUrl}
									required={false}
									onChange={e => {
										setDribbbleUrl(e.target.value)
										setHasUnsavedChanges(true)
									}}
								></Input>

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
										type="submit"
										onClick={() => {}}
										active={hasUnsavedChanges}
									/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
