import { SlBell, SlMagnifier } from 'react-icons/sl'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import { FiChevronDown } from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PrimaryButton from './PrimaryButton'
import NavMenu from './Menu'
import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react'

export default function NavBar(props: { profilePictureUrl?: string }) {
	const router = useRouter()
	const [isLoading, setLoading] = useState(true)
	const { isLoggedIn } = useAuth()
	const [animateHeader, setAnimateHeader] = useState(false)

	useEffect(() => {
		setLoading(false)
		const listener = () => {
			if (window.scrollY) {
				setAnimateHeader(true)
			} else setAnimateHeader(false)
		}
		window.addEventListener('scroll', listener)
		return () => {
			window.removeEventListener('scroll', listener)
		}
	}, [])

	return (
		<div
			className={`flex justify-center w-full bg-white sticky z-20 top-0 ${
				animateHeader &&
				`bg-gradient-to-t from-white/95 via-gray-100/95 to-white/95 border-b border-b-gray-200`
			}`}
		>
			<div className="flex items-center w-full justify-between h-20 sm:h-16 max-w-[86rem]">
				<Link href={'/'}>
					<p className="font-extrabold text-2xl text-gray-700 items-start mr-8 ml-8 sm:mr-4 sm:ml-3">
						codedamn
					</p>
				</Link>

				{!isLoading && (
					<div className="flex items-center">
						<div className="flex relative items-center w-fit sm:hidden md:hidden">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<SlMagnifier className="h-4 w-4 text-gray-600" aria-hidden="true" />
							</div>
							<input
								type="text"
								placeholder="Search"
								className="w-96 mr-6 focus:outline-none border-2 rounded-lg p-2 pt-1.5 pb-1.5 block pl-10 border-gray-100 font-normal text-lg focus:border-indigo-600"
							/>
							<div className="absolute inset-y-0 right-8 pl-3 flex items-center">
								<button className="bg-gray-100 py-1 px-3 rounded-md w-fit flex items-center text-gray-500 hover:bg-gray-200">
									Courses
									<FiChevronDown className="w-5 h-5 ml-2 gray-300" />
								</button>
							</div>
						</div>

						<>
							{isLoggedIn === 'unknown' ||
								(isLoggedIn === false && (
									<div className="pr-6 sm:pr-2 md:pr-">
										<PrimaryButton
											value="Login"
											type="button"
											onClick={() => {
												router.push('/login')
											}}
											active={true}
										/>
									</div>
								))}
							{isLoggedIn === true && (
								<div className="flex items-center ml-5 mr-5 sm:mr-2 sm:hidden">
									<BsFillLightningChargeFill className="w-5 h-5 mr-1 fill-indigo-400" />
									<p className="text-gray-600 font-bold text-lg">2</p>
								</div>
							)}

							{isLoggedIn === true && (
								<SlBell className="mr-5 ml-5 w-5 h-5 fill-gray-600 sm:mr-2 sm:ml-2" />
							)}
							{isLoggedIn === true && props.profilePictureUrl && (
								<div className="flex items-center">
									<NavMenu profilePictureUrl={props.profilePictureUrl} />
								</div>
							)}
						</>
					</div>
				)}
			</div>
		</div>
	)
}
