import Image from 'next/image'
import NavBar from '../components/NavBar'
import SideNav from '../components/SideNav'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import Input from '../components/PrimaryInput'
import ToggleInput from '../components/ToggleInput'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Dropdown from '../components/Dropdown'
import TextArea from '../components/TextAreaInput'
import { errorToast, successToast } from '../components/Toast'
import { parseCookies, destroyCookie } from 'nookies'
import jsonwebtoken from 'jsonwebtoken'
import { db } from '../lib/db'
import { User } from '../lib/types'
import dayjs from 'dayjs'
import { UserJwtData } from './api/login'
import { UpdateBody } from './api/update'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type PropsType = {
	user: Pick<
		User,
		| 'name'
		| 'about'
		| 'profession'
		| 'institute'
		| 'profilePictureUrl'
		| 'location'
		| 'isAchievementBadgeVisible'
		| 'isOpenToWork'
		| 'isXpPointsVisible'
		| 'isFollowersVisible'
		| 'gender'
		| 'dateOfBirth'
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
					name: user.name,
					profilePictureUrl: user.profilePictureUrl,
					about: user.about,
					profession: user.profession,
					dateOfBirth: user.dateOfBirth,
					gender: user.gender,
					isFollowersVisible: user.isFollowersVisible,
					isXpPointsVisible: user.isXpPointsVisible,
					isOpenToWork: user.isOpenToWork,
					isAchievementBadgeVisible: user.isAchievementBadgeVisible,
					institute: user.institute,
					location: user.location
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

export default function Edit_Profile({ user }: PropsType) {
	const [name, setName] = useState(user.name)
	const [about, setAbout] = useState(user.about)
	const [institute, setInstitute] = useState(user.institute)
	const [location, setLocation] = useState(user.location)
	const [profession, setProfession] = useState(user.profession)
	const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth)
	const [gender, setGender] = useState(user.gender)
	const [isOpenToWork, setIsOpenToWork] = useState(user.isOpenToWork)
	const [isFollowersVisible, setIsFollowersVisible] = useState(user.isFollowersVisible)
	const [isXpPointsVisible, setIsXpPointsVisible] = useState(user.isXpPointsVisible)
	const [isAchievementBadgeVisible, setIsAchievementBadgeVisible] = useState(
		user.isAchievementBadgeVisible
	)
	const [profilePictureUrl, setProfilePictureUrl] = useState(user.profilePictureUrl)
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
	const router = useRouter()

	async function deleteProfilePictureUrl() {
		const reqBody: UpdateBody = {
			user: {
				profilePictureUrl:
					'https://res.cloudinary.com/dum8ltv4o/image/upload/v1683719698/default_cqeqak.png'
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
			successToast('Profile picture deleted.')
			setProfilePictureUrl(
				'https://res.cloudinary.com/dum8ltv4o/image/upload/v1683719698/default_cqeqak.png'
			)
		} else {
			errorToast('Could not upload image. Please try again later.')
		}
	}

	async function uploadProfilePictureUrl(event: React.ChangeEvent<HTMLInputElement>) {
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
					profilePictureUrl: data.secure_url
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
				successToast('Profile picture updated.')
				setProfilePictureUrl(data.secure_url)
			} else {
				errorToast('Could not upload image. Please try again later.')
			}
		}
	}

	async function updateUserInfo() {
		setHasUnsavedChanges(false)
		const reqBody: UpdateBody = {
			user: {
				name,
				about,
				profession,
				dateOfBirth,
				gender,
				isFollowersVisible,
				isOpenToWork,
				isAchievementBadgeVisible,
				isXpPointsVisible,
				location,
				institute
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
				<title>Edit Profile</title>
			</Head>
			<NavBar profilePictureUrl={user.profilePictureUrl} />
			<div className="w-full flex justify-center">
				<div className="w-full max-w-7xl flex p-14 justify-between sm:flex-wrap sm:px-3 sm:py-6 md:px-4 md:py-8 md:ml-2">
					<SideNav />
					<div className="w-9/12 pl-14 sm:w-full sm:mt-6 sm:px-2 md:w-full md:px-6">
						<form
							onSubmit={e => {
								e.preventDefault()
								updateUserInfo()
							}}
						>
							<div className="flex items-center mb-8">
								<Image
									src={profilePictureUrl}
									alt="Profile picture"
									width="100"
									height="100"
									className="rounded-full w-16 h-16 mr-6 sm:h-14 sm:w-14 sm:mr-2"
								/>

								<label className="mx-2 bg-indigo-600 py-2 px-5 text-white text-md rounded-lg font-semibold hover:bg-indigo-700">
									<input
										type="file"
										id="profile"
										name="profile"
										className="hidden"
										accept="image/*"
										onChange={e => {
											uploadProfilePictureUrl(e)
										}}
									/>
									Change
								</label>

								<SecondaryButton
									type="button"
									value="Delete"
									onClick={() => {
										deleteProfilePictureUrl()
									}}
								/>
							</div>
							<div className="flex flex-col">
								<Input
									label="Display name"
									type="text"
									id="name"
									value={name}
									required={false}
									info="Name entered above will be used for all issued certificates"
									onChange={e => {
										setName(e.target.value)
										setHasUnsavedChanges(true)
									}}
								/>
								<TextArea
									label="About"
									id="about"
									value={about}
									onChange={e => {
										setAbout(e.target.value)
										setHasUnsavedChanges(true)
									}}
								/>
								<Input
									label="Profession"
									type="text"
									id="profession"
									value={profession}
									required={false}
									onChange={e => {
										setProfession(e.target.value)
										setHasUnsavedChanges(true)
									}}
								></Input>
								<Input
									label="Institute"
									type="text"
									id="institute"
									value={institute}
									required={false}
									onChange={e => {
										setInstitute(e.target.value)
										setHasUnsavedChanges(true)
									}}
								></Input>
								<Input
									label="Location"
									type="text"
									id="location"
									value={location}
									required={false}
									onChange={e => {
										setLocation(e.target.value)
										setHasUnsavedChanges(true)
									}}
								></Input>
								<div className="w-full">
									<label className="text-md text-gray-800 font-semibold mb-1">
										{'Date of Birth'}
									</label>
									<DatePicker
										selected={
											dateOfBirth
												? new Date(
														dayjs.unix(dateOfBirth).format('YYYY-MM-DD')
												  )
												: undefined
										}
										onChange={date => {
											setDateOfBirth(dayjs(date).unix())
											setHasUnsavedChanges(true)
										}}
										dateFormat={'dd MMMM yyyy'}
										showFullMonthYearPicker
										className="border-2 w-full h-[50px] border-gray-100 p-2.5 text-md rounded-md mb-2 focus:outline-indigo-600 sm:pl-2.5"
									/>
								</div>

								<Dropdown
									label="Gender"
									options={['Male', 'Female', 'Other']}
									value={gender}
									onChange={(e: string) => {
										setGender(e)
										setHasUnsavedChanges(true)
									}}
								/>

								<div className="mb-6 flex flex-col mt-6">
									<h3 className="text-2xl font-bold mb-1 text-gray-800">
										Section visibility
									</h3>
									<p className="text-md font-normal mb-1 text-gray-500">
										Select which sections and content should show on your
										profile page.
									</p>
								</div>
								<div className="mb-6 flex flex-col bg-gray-50 p-6 rounded-xl">
									<ToggleInput
										label="Followers and following"
										info="Shows your followers and the users you follow on codedamn"
										type="checkbox"
										name="followers"
										id="followers"
										checked={isFollowersVisible}
										onClick={() => {
											setIsFollowersVisible(!isFollowersVisible)
											setHasUnsavedChanges(true)
										}}
									></ToggleInput>
									<ToggleInput
										label="XP"
										info="Shows the XP you have earned"
										type="checkbox"
										name="xp"
										id="xp"
										checked={isXpPointsVisible}
										onClick={() => {
											{
												setIsXpPointsVisible(!isXpPointsVisible)
												setHasUnsavedChanges(true)
											}
										}}
									></ToggleInput>
									<ToggleInput
										label="Achievement badges"
										info="Shows your relative percentile and proficiency"
										type="checkbox"
										name="achievements"
										id="achievements"
										checked={isAchievementBadgeVisible}
										onClick={() => {
											setIsAchievementBadgeVisible(!isAchievementBadgeVisible)
											setHasUnsavedChanges(true)
										}}
									></ToggleInput>
									<ToggleInput
										label="Open to work"
										info="Shows recruiters and others that you are open to work"
										type="checkbox"
										name="job"
										id="job"
										checked={isOpenToWork}
										onClick={() => {
											{
												setIsOpenToWork(!isOpenToWork)
												setHasUnsavedChanges(true)
											}
										}}
									></ToggleInput>
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
										type="submit"
										active={hasUnsavedChanges}
										onClick={() => {}}
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
