import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { successToast } from './Toast'
import { destroyCookie } from 'nookies'

export default function NavMenu(props: { profilePictureUrl: string }) {
	const router = useRouter()

	return (
		<div className="">
			<Menu as="div" className="relative inline-block text-left">
				<Menu.Button className="w-8 h-8 mr-8 ml-4 mt-1 sm:mr-3 sm:ml-1 flex items-center">
					<Image
						src={props.profilePictureUrl}
						alt={'Profile Picture'}
						width="30"
						height="30"
						className="rounded-full w-8 h-8 sm:w-7 sm:h-7"
					/>
					<div className="relative -top-3 right-3 flex justify-center items-center w-fit">
						<svg
							width="17"
							height="18"
							viewBox="0 0 35 37"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M15.7163 2.1148C16.8201 1.5173 18.1799 1.5173 19.2837 2.1148L31.5497 8.7548C32.6534 9.3523 33.3333 10.4566 33.3333 11.6516V24.9317C33.3333 26.1267 32.6534 27.2309 31.5497 27.8284L19.2837 34.4685C18.1799 35.066 16.8201 35.066 15.7163 34.4685L3.4504 27.8284C2.3466 27.2309 1.6667 26.1267 1.6667 24.9317V11.6516C1.6667 10.4566 2.3466 9.3523 3.4504 8.7548L15.7163 2.1148Z"
								fill="url(#paint0_radial_101_3)"
							/>
							<path
								d="M31.9265 8.0586L19.6606 1.4186C18.3217 0.6938 16.6783 0.6938 15.3394 1.4186L3.0735 8.0586C1.7301 8.7858 0.875 10.1482 0.875 11.6516V24.9317C0.875 26.435 1.7301 27.7974 3.0735 28.5246L15.3394 35.1647C16.6783 35.8895 18.3217 35.8895 19.6606 35.1647L31.9265 28.5246C33.2699 27.7974 34.125 26.435 34.125 24.9317V11.6516C34.125 10.1482 33.2699 8.7858 31.9265 8.0586Z"
								stroke="#0EA5E9"
								strokeWidth="1.58333"
							/>
							<defs>
								<radialGradient
									id="paint0_radial_101_3"
									cx="0"
									cy="0"
									r="1"
									gradientUnits="userSpaceOnUse"
									gradientTransform="translate(17.5 18.2916) rotate(90) scale(16.625 15.8333)"
								>
									<stop />
									<stop offset="1" stopColor="#222023" />
								</radialGradient>
							</defs>
						</svg>
						<span className="absolute w-fit text-[10px] font-semibold text-white">
							5
						</span>
					</div>
				</Menu.Button>

				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="px-1 py-1">
							<Menu.Item>
								<Link
									href="/"
									className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-50 hover:text-gray-800 "
								>
									Your profile
								</Link>
							</Menu.Item>
							<Menu.Item>
								<Link
									href="/edit_profile"
									className={
										'block px-4 py-2 text-md text-gray-700 hover:bg-gray-50 hover:text-gray-800 '
									}
								>
									Edit profile
								</Link>
							</Menu.Item>
						</div>
						<div className="px-1 py-1">
							<Menu.Item>
								<Link
									href="/"
									className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-50 hover:text-gray-800 "
									onClick={() => {
										destroyCookie(null, 'token', {
											path: '/'
										})

										successToast('Signed out successfully.')
										router.reload()
									}}
								>
									Sign out
								</Link>
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	)
}
