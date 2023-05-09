import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar'
import { HiOutlineBookmark } from 'react-icons/hi'
import { BiMap } from 'react-icons/bi'
import { GetStaticProps } from 'next'
import { TbEdit } from 'react-icons/tb'
import PrimaryButton from '../components/PrimaryButton'
import Portfolio from '../components/Porfolio'
import Resume from '../components/Resume'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { errorToast, successToast } from '../components/Toast'
import { db } from '../lib/db'
import {
	User,
	UserEducation,
	UserExperience,
	UserInterest,
	UserPlayground,
	UserProject,
	UserSkill
} from '../lib/types'
import { jsonArrayFrom } from 'kysely/helpers/postgres'
import { UpdateBody } from './api/update'

type PropsType = {
	user: Omit<User, 'password'> & {
		skills: UserSkill[]
		educations: UserEducation[]
		experiences: UserExperience[]
		interests: UserInterest[]
		playgrounds: UserPlayground[]
		projects: UserProject[]
	}
}

export const getStaticProps: GetStaticProps<PropsType> = async () => {
	const userId = process.env.DEFAULT_USER_ID as string

	const user = await db
		.selectFrom('User')
		.select(eb =>
			jsonArrayFrom(eb.selectFrom('UserSkill').selectAll().where('userId', '=', userId)).as(
				'skills'
			)
		)
		.select(eb =>
			jsonArrayFrom(
				eb.selectFrom('UserEducation').selectAll().where('userId', '=', userId)
			).as('educations')
		)
		.select(eb =>
			jsonArrayFrom(
				eb.selectFrom('UserExperience').selectAll().where('userId', '=', userId)
			).as('experiences')
		)
		.select(eb =>
			jsonArrayFrom(
				eb.selectFrom('UserInterest').selectAll().where('userId', '=', userId)
			).as('interests')
		)
		.select(eb =>
			jsonArrayFrom(
				eb.selectFrom('UserPlayground').selectAll().where('userId', '=', userId)
			).as('playgrounds')
		)
		.select(eb =>
			jsonArrayFrom(eb.selectFrom('UserProject').selectAll().where('userId', '=', userId)).as(
				'projects'
			)
		)
		.selectAll()
		.where('id', '=', userId)
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
		props: {
			user
		}
	}
}

export default function Home({ user }: PropsType) {
	const skills = user.skills
	const filteredSkills = skills.filter(skill => skills.indexOf(skill) < 3)
	const [portfolio, setPortfolio] = useState(true)
	const [resume, setResume] = useState(false)
	const [coverPictureUrl, setCoverPictureUrl] = useState(user.coverPictureUrl)
	const [bookmark, setBookmark] = useState(false)
	const { isLoggedIn } = useAuth()

	async function uploadCoverPictureUrl(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files
		if (file && file.length > 0) {
			const img = file[0] as File
			const formData = new FormData()
			formData.append('file', img)
			formData.append('upload_preset', 'my-uploads')
			const response = await fetch(`https://api.cloudinary.com/v1_1/dum8ltv4o/image/upload`, {
				method: 'POST',
				body: formData
			})
			const data = await response.json()
			const reqBody: UpdateBody = {
				user: {
					coverPictureUrl: data.secure_url
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
				successToast('Cover picture uploaded.')
				setCoverPictureUrl(data.secure_url)
			} else {
				errorToast('Could not upload image. Please try again later.')
			}
		}
	}

	return (
		<>
			<Head>
				<title>Nvnt Profile page</title>
			</Head>

			<NavBar profilePictureUrl={user.profilePictureUrl} />

			<div className="h-full w-full flex flex-col items-center sm:px-3 sm:w-full md:w-full md:px-6">
				<div className="border-2 w-8/12 h-fit rounded-2xl border-gray-100 mt-12 sm:w-full sm:mt-6 md:w-full max-w-5xl">
					<div className="relative">
						<Image
							src={coverPictureUrl}
							alt={'Cover Image'}
							width="1000"
							height="80"
							priority={true}
							className="rounded-t-2xl w-full h-40"
						/>
						{isLoggedIn && (
							<div className="flex items-center absolute top-5 right-7 sm:right-5 w-fit">
								<label className="px-2 py-1.5 rounded-lg border border-white border-opacity-70 hover:bg-opacity-80 flex text-sm sha items-center text-white font-semibold bg-gray-300 bg-opacity-60 sm:text-sm">
									<input
										type="file"
										name="cover"
										id="cover"
										className="hidden"
										accept="image/*"
										onChange={e => {
											uploadCoverPictureUrl(e)
										}}
									/>
									<TbEdit className="h-5 w-5 mr-2 sm:h-5 sm:w-5" />
									Edit cover
								</label>
							</div>
						)}
					</div>

					<div className="relative flex p-5 sm:flex-wrap sm:px-2 md:flex-wrap md:p-4">
						<div className="relative pl-2 w-52 -top-24 mt-2 sm:-top-20 sm:h-8 sm:pl-1 sm:mt-1 md:h-12">
							<Image
								src={user.profilePictureUrl}
								alt={'Profile picture'}
								width="144"
								height="144"
								className="rounded-full border-2 w-36 h-36 border-gray-50 sm:h-28 sm:w-28 md:h-36 md:w-36"
							/>
							<div className="relative flex justify-center items-center w-fit -top-16 -right-[88px] sm:pl-1 sm:-top-14 sm:-right-14 ">
								<svg
									width="87"
									height="88"
									viewBox="0 0 87 88"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g filter="url(#filter0_d_101_3)">
										<path
											d="M41.7163 25.1148C42.8201 24.5173 44.1799 24.5173 45.2837 25.1148L57.5497 31.7548C58.6534 32.3523 59.3333 33.4566 59.3333 34.6516V47.9317C59.3333 49.1267 58.6534 50.2309 57.5497 50.8284L45.2837 57.4685C44.1799 58.066 42.8201 58.066 41.7163 57.4685L29.4504 50.8284C28.3466 50.2309 27.6667 49.1267 27.6667 47.9317V34.6516C27.6667 33.4566 28.3466 32.3523 29.4504 31.7548L41.7163 25.1148Z"
											fill="url(#paint0_radial_101_3)"
										/>
										<path
											d="M57.9265 31.0586L45.6606 24.4186C44.3217 23.6938 42.6783 23.6938 41.3394 24.4186L29.0735 31.0586C27.7301 31.7858 26.875 33.1482 26.875 34.6516V47.9317C26.875 49.435 27.7301 50.7974 29.0735 51.5246L41.3394 58.1647C42.6783 58.8895 44.3217 58.8895 45.6606 58.1647L57.9265 51.5246C59.2699 50.7974 60.125 49.435 60.125 47.9317V34.6516C60.125 33.1482 59.2699 31.7858 57.9265 31.0586Z"
											stroke="#0EA5E9"
											strokeWidth="1.58333"
										/>
									</g>
									<defs>
										<filter
											id="filter0_d_101_3"
											x="0.749943"
											y="0.916605"
											width="85.5001"
											height="87.0834"
											filterUnits="userSpaceOnUse"
											colorInterpolationFilters="sRGB"
										>
											<feFlood floodOpacity="0" result="BackgroundImageFix" />
											<feColorMatrix
												in="SourceAlpha"
												type="matrix"
												values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
												result="hardAlpha"
											/>
											<feOffset dy="3.16667" />
											<feGaussianBlur stdDeviation="12.6667" />
											<feComposite in2="hardAlpha" operator="out" />
											<feColorMatrix
												type="matrix"
												values="0 0 0 0 0.341176 0 0 0 0 0.27451 0 0 0 0 0.956863 0 0 0 0.5 0"
											/>
											<feBlend
												mode="normal"
												in2="BackgroundImageFix"
												result="effect1_dropShadow_101_3"
											/>
											<feBlend
												mode="normal"
												in="SourceGraphic"
												in2="effect1_dropShadow_101_3"
												result="shape"
											/>
										</filter>
										<radialGradient
											id="paint0_radial_101_3"
											cx="0"
											cy="0"
											r="1"
											gradientUnits="userSpaceOnUse"
											gradientTransform="translate(43.5 41.2916) rotate(90) scale(16.625 15.8333)"
										>
											<stop />
											<stop offset="1" stopColor="#222023" />
										</radialGradient>
									</defs>
								</svg>
								<span className="absolute w-fit text-xl sm:text-lg font-semibold text-white mb-1.5">
									5
								</span>
							</div>
						</div>
						<div className="pl-4 w-full sm:pl-0 md:pl-2">
							<div className="flex items-center mb-1 sm:flex-wrap sm:pl-2 md:flex-wrap flex-wrap">
								<h1 className="text-3xl text-gray-800 font-bold mt-1 mr-3">
									{user.name}
								</h1>
								<p className="bg-lime-300 text-lime-800 px-3 py-0.5 rounded-md mt-1 text-sm font-semibold mr-3 sm:mt-1 md:mt-1">
									Pro
								</p>
								{user.isOpenToWork && (
									<p className="bg-sky-100 px-3 py-0.5 rounded-md text-sm mt-1 font-semibold text-sky-800 sm:mt-1 md:mt-1">
										Looking for job
									</p>
								)}
							</div>
							<div className="flex items-center sm:pl-2 mb-1">
								<p className="text-md text-gray-500 font-normal">
									{user.profession}
								</p>
								<span className="text-lg text-gray-500 font-normal mr-2 ml-2">
									|
								</span>
								<p className="text-md text-gray-500 font-normal">
									{user.institute}
								</p>
							</div>
							<div className="flex items-center sm:pl-2">
								<BiMap className="h-5 w-5 fill-gray-400 mr-1" />
								<p className="text-lg text-gray-400 font-normal">{user.location}</p>
							</div>
							<div className="pt-10 pb-10 sm:pt-4 sm:pb-4 sm:pl-2">
								<ul className="flex flex-wrap">
									{filteredSkills.map(skill => (
										<li
											key={`skill-${skill.id}-${skill.name}`}
											className="bg-gray-100 pr-4 pl-4 pt-1.5 pb-1.5 rounded-md text-md text-gray-800 font-semibold mr-3 mb-4"
										>
											{skill.name}
										</li>
									))}
								</ul>
							</div>

							<div className="flex justify-between pt-10 pb-4 border-t-2 border-gray-100 sm:pt-3 sm:pb-0 sm:flex-wrap flex-wrap items-center">
								<div className="flex sm:flex-wrap sm:mt-1 sm:pl-2 mt-2">
									{user.githubUrl && (
										<div className="sm:mt-1 mx-1">
											<a
												href={user.githubUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 30 30"
													width="30px"
													height="30px"
													className="border-2 border-gray-100 rounded-lg w-10 h-10 p-1.5 mr-4 hover:border-gray-300"
												>
													<path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
												</svg>
											</a>
										</div>
									)}
									{user.youtubeUrl && (
										<div className="sm:mt-1 mx-1">
											<a
												href={user.youtubeUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<svg
													width="800px"
													height="800px"
													viewBox="0 0 16 16"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													className="border-2 border-gray-100 rounded-lg w-10 h-10 p-1.5 mr-4 hover:border-gray-300"
												>
													<path
														fill="red"
														d="M14.712 4.633a1.754 1.754 0 00-1.234-1.234C12.382 3.11 8 3.11 8 3.11s-4.382 0-5.478.289c-.6.161-1.072.634-1.234 1.234C1 5.728 1 8 1 8s0 2.283.288 3.367c.162.6.635 1.073 1.234 1.234C3.618 12.89 8 12.89 8 12.89s4.382 0 5.478-.289a1.754 1.754 0 001.234-1.234C15 10.272 15 8 15 8s0-2.272-.288-3.367z"
													/>
													<path
														fill="#ffffff"
														d="M6.593 10.11l3.644-2.098-3.644-2.11v4.208z"
													/>
												</svg>
											</a>
										</div>
									)}
									{user.instagramUrl && (
										<div className="sm:mt-1 mx-1">
											<a
												href={user.instagramUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<svg
													width="40px"
													height="40px"
													viewBox="0 0 2500 2500"
													xmlns="http://www.w3.org/2000/svg"
													className="border-2 border-gray-100 rounded-lg w-10 h-10 p-2 mr-4 hover:border-gray-300"
												>
													<defs>
														<radialGradient
															id="0"
															cx="332.14"
															cy="2511.81"
															r="3263.54"
															gradientUnits="userSpaceOnUse"
														>
															<stop
																offset=".09"
																stopColor="#fa8f21"
															/>
															<stop
																offset=".78"
																stopColor="#d82d7e"
															/>
														</radialGradient>
														<radialGradient
															id="1"
															cx="1516.14"
															cy="2623.81"
															r="2572.12"
															gradientUnits="userSpaceOnUse"
														>
															<stop
																offset=".64"
																stopColor="#8c3aaa"
																stop-opacity="0"
															/>
															<stop offset="1" stopColor="#8c3aaa" />
														</radialGradient>
													</defs>
													<path
														d="M833.4,1250c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7S833.4,1480.11,833.4,1250m-225.26,0c0,354.5,287.36,641.86,641.86,641.86S1891.86,1604.5,1891.86,1250,1604.5,608.14,1250,608.14,608.14,895.5,608.14,1250M1767.27,582.69a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M745,2267.47c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27s373.28,1.31,505.15,7.27c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M734.65,7.57c-133.07,6.06-224,27.16-303.41,58.06C349,97.54,279.38,140.35,209.81,209.81S97.54,349,65.63,431.24c-30.9,79.46-52,170.34-58.06,303.41C1.41,867.93,0,910.54,0,1250s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43S349,2402.37,431.24,2434.37c79.56,30.9,170.34,52,303.41,58.06C868,2498.49,910.54,2500,1250,2500s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2150.95,97.54,2068.86,65.63c-79.56-30.9-170.44-52.1-303.41-58.06C1632.17,1.51,1589.56,0,1250.1,0S868,1.41,734.65,7.57"
														fill="url(#0)"
													/>
													<path
														d="M833.4,1250c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7S833.4,1480.11,833.4,1250m-225.26,0c0,354.5,287.36,641.86,641.86,641.86S1891.86,1604.5,1891.86,1250,1604.5,608.14,1250,608.14,608.14,895.5,608.14,1250M1767.27,582.69a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M745,2267.47c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27s373.28,1.31,505.15,7.27c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M734.65,7.57c-133.07,6.06-224,27.16-303.41,58.06C349,97.54,279.38,140.35,209.81,209.81S97.54,349,65.63,431.24c-30.9,79.46-52,170.34-58.06,303.41C1.41,867.93,0,910.54,0,1250s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43S349,2402.37,431.24,2434.37c79.56,30.9,170.34,52,303.41,58.06C868,2498.49,910.54,2500,1250,2500s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2150.95,97.54,2068.86,65.63c-79.56-30.9-170.44-52.1-303.41-58.06C1632.17,1.51,1589.56,0,1250.1,0S868,1.41,734.65,7.57"
														fill="url(#1)"
													/>
												</svg>
											</a>
										</div>
									)}
									{user.behanceUrl && (
										<div className="sm:mt-1 mx-1">
											<a
												href={user.behanceUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<svg
													width="800px"
													height="800px"
													viewBox="0 -3.5 20 20"
													version="1.1"
													xmlns="http://www.w3.org/2000/svg"
													xmlnsXlink="http://www.w3.org/1999/xlink"
													className="border-2 border-gray-100 rounded-lg w-10 h-10 p-2 mr-4 hover:border-gray-300"
												>
													<title>behance [#163]</title>
													<desc>Created with Sketch.</desc>
													<defs></defs>
													<g
														id="Page-1"
														stroke="none"
														strokeWidth="1"
														fill="none"
														fill-rule="evenodd"
													>
														<g
															id="Dribbble-Light-Preview"
															transform="translate(-100.000000, -7482.000000)"
															fill="#000000"
														>
															<g
																id="icons"
																transform="translate(56.000000, 160.000000)"
															>
																<path
																	d="M56.981,7324.11726 L62.069,7324.11726 L62.069,7322.65997 L56.981,7322.65997 L56.981,7324.11726 Z M59.489,7327.04322 C58.354,7327.04322 57.492,7327.74656 57.409,7329.04584 L61.481,7329.04584 C61.205,7327.50385 60.52,7327.04322 59.489,7327.04322 L59.489,7327.04322 Z M59.648,7333.06968 C60.696,7333.06968 61.465,7332.40764 61.622,7331.84992 L63.826,7331.84992 C63.196,7333.86701 61.895,7335 59.559,7335 C56.578,7335 54.905,7332.87964 54.905,7330.06626 C54.905,7323.44077 64.465,7323.20323 63.985,7330.68491 L57.409,7330.68491 C57.473,7332.20418 58.1,7333.06968 59.648,7333.06968 L59.648,7333.06968 Z M49.73,7332.77842 C50.933,7332.77842 51.775,7332.31572 51.775,7331.06705 C51.775,7329.77191 51.031,7329.21006 49.782,7329.21006 L46.768,7329.21006 L46.768,7332.77842 L49.73,7332.77842 Z M49.571,7327.26218 C50.572,7327.26218 51.263,7326.79638 51.263,7325.71399 C51.263,7324.57377 50.459,7324.22158 49.36,7324.22158 L46.768,7324.22158 L46.768,7327.26218 L49.571,7327.26218 L49.571,7327.26218 Z M49.924,7322 C52.295,7322 53.943,7322.7839 53.943,7325.22237 C53.943,7326.42973 53.458,7327.32931 52.233,7327.93557 C53.801,7328.40137 54.543,7329.62422 54.543,7331.23127 C54.543,7333.78232 52.52,7335 50.1,7335 L44,7335 L44,7322 L49.924,7322 Z"
																	id="behance-[#163]"
																></path>
															</g>
														</g>
													</g>
												</svg>
											</a>
										</div>
									)}
									{user.dribbbleUrl && (
										<div className="sm:mt-1 mx-1">
											<a
												href={user.dribbbleUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 48 48"
													width="48px"
													height="48px"
													fill-rule="evenodd"
													clip-rule="evenodd"
													className="border-2 border-gray-100 rounded-lg w-10 h-10 p-1.5 mr-4 hover:border-gray-300"
												>
													<circle
														cx="24"
														cy="24"
														r="19.375"
														fill="#ed3675"
													/>
													<path
														fill="#bd1949"
														fill-rule="evenodd"
														d="M24,4C12.959,4,4,12.959,4,24c0,11.041,8.959,20,20,20	c11.02,0,20-8.959,20-20C44,12.959,35.02,4,24,4z M37.21,13.219c2.386,2.907,3.818,6.616,3.861,10.629	c-0.564-0.108-6.204-1.258-11.887-0.542c-0.13-0.282-0.239-0.586-0.369-0.889c-0.347-0.824-0.738-1.67-1.128-2.473	C33.978,17.384,36.842,13.696,37.21,13.219z M24,6.95c4.338,0,8.308,1.627,11.323,4.295c-0.304,0.434-2.885,3.883-8.959,6.16	c-2.798-5.141-5.9-9.349-6.377-10C21.267,7.102,22.612,6.95,24,6.95z M16.733,8.555c0.455,0.607,3.492,4.837,6.334,9.87	c-7.983,2.126-15.033,2.083-15.792,2.083C8.382,15.215,11.961,10.811,16.733,8.555z M6.907,24.022c0-0.174,0-0.347,0-0.521	c0.738,0.022,9.024,0.13,17.549-2.43c0.499,0.954,0.954,1.931,1.388,2.907c-0.217,0.065-0.456,0.13-0.672,0.195	c-8.807,2.842-13.492,10.607-13.883,11.258C8.577,32.417,6.907,28.403,6.907,24.022z M24,41.093c-3.948,0-7.592-1.345-10.477-3.601	c0.304-0.629,3.774-7.31,13.406-10.672c0.043-0.022,0.065-0.022,0.109-0.043c2.408,6.226,3.384,11.453,3.644,12.95	C28.62,40.616,26.364,41.093,24,41.093z M33.523,38.165c-0.174-1.041-1.085-6.03-3.319-12.169	c5.358-0.846,10.043,0.542,10.629,0.738C40.096,31.484,37.362,35.583,33.523,38.165z"
														clip-rule="evenodd"
													/>
												</svg>
											</a>
										</div>
									)}
									{user.facebookUrl && (
										<div className="sm:mt-1 mx-1">
											<a
												href={user.facebookUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<svg
													width="800px"
													height="800px"
													viewBox="0 0 48 48"
													version="1.1"
													xmlns="http://www.w3.org/2000/svg"
													xmlnsXlink="http://www.w3.org/1999/xlink"
													className="border-2 border-gray-100 rounded-lg w-10 h-10 p-2 mr-4 hover:border-gray-300"
												>
													<title>Facebook-color</title>
													<desc>Created with Sketch.</desc>
													<defs></defs>
													<g
														id="Icons"
														stroke="none"
														strokeWidth="1"
														fill="none"
														fill-rule="evenodd"
													>
														<g
															id="Color-"
															transform="translate(-200.000000, -160.000000)"
															fill="#4460A0"
														>
															<path
																d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
																id="Facebook"
															></path>
														</g>
													</g>
												</svg>
											</a>
										</div>
									)}
								</div>

								<div className="flex sm:mt-2 sm:pl-3 pl-1 sm:items-end mt-2">
									<button
										type="button"
										onClick={() => {
											setBookmark(bookmark ? false : true)
										}}
										className="mr-4 sm:mr-2 bg-gray-100 rounded-lg"
									>
										<HiOutlineBookmark
											className={` rounded-lg w-10 h-10 p-2 hover:bg-gray-200 text-gray-700 ${
												bookmark ? 'fill-gray-700' : 'fill-none'
											}`}
										/>
									</button>

									<a
										href="mailto:admin@nvnt.in?body=Hello!"
										target="_blank"
										rel="noopener noreferrer"
									>
										<PrimaryButton
											value="Contact"
											type="button"
											onClick={() => {
												//
											}}
											active={true}
										/>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="border-2 w-8/12 h-fit rounded-2xl border-gray-100 mt-12 pr-4 pl-4 pt-3 pb-3 sm:w-full sm:mt-6 md:w-full max-w-5xl">
					<button
						className={`${
							portfolio === true
								? 'w-20 h-8 bg-indigo-100 text-indigo-500 text-sm font-semibold pr-3 pl-3 rounded-lg mr-4'
								: 'w-20 h-8 bg-gray-100 text-gray-500 text-sm font-semibold pr-3 pl-3 hover:bg-gray-200 rounded-lg mr-4'
						} `}
						onClick={() => {
							setPortfolio(true)
							setResume(false)
						}}
					>
						Portfolio
					</button>
					<button
						className={`${
							resume === true
								? 'w-20 h-8 bg-indigo-100 text-indigo-500 text-sm font-semibold pr-3 pl-3 rounded-lg mr-4'
								: 'w-20 h-8 bg-gray-100 text-gray-500 text-sm font-semibold pr-3 pl-3 hover:bg-gray-200 rounded-lg mr-4'
						} `}
						onClick={() => {
							setResume(true)
							setPortfolio(false)
						}}
					>
						Resume
					</button>
				</div>

				<div className="w-8/12 h-fit sm:w-full md:w-full  max-w-5xl">
					{portfolio && (
						<Portfolio
							isAchievementBadgeVisible={user.isAchievementBadgeVisible}
							isXpPointsVisible={user.isXpPointsVisible}
							playgrounds={user.playgrounds}
							projects={user.projects}
						/>
					)}

					{resume && (
						<Resume
							about={user.about}
							skills={user.skills}
							educations={user.educations}
							experiences={user.experiences}
							interests={user.interests}
						/>
					)}
				</div>
			</div>
		</>
	)
}
