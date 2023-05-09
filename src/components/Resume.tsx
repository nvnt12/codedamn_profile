import SecondaryButton from './SecondaryButton'
import { useState } from 'react'
import { UserEducation, UserExperience, UserInterest, UserSkill } from '../lib/types'
import dayjs from 'dayjs'

export default function Resume(props: {
	about: string
	skills: UserSkill[]
	interests: UserInterest[]
	educations: UserEducation[]
	experiences: UserExperience[]
}) {
	const skills = props.skills
	const interests = props.interests
	const educations = props.educations
	const experiences = props.experiences

	const ReadMore = ({ children, maxLength }: { children: string; maxLength: number }) => {
		const text = children
		const [isTruncated, setIsTruncated] = useState(true)

		const toggleReadMore = () => {
			setIsTruncated(!isTruncated)
		}

		return (
			<div className="sm:ml-0">
				<h2 className="text-md text-gray-800 font-medium">
					{isTruncated && text.length > maxLength
						? `${text.slice(0, maxLength)}...`
						: text}
				</h2>
				{text.length > maxLength && (
					<div className="mt-6 -ml-2">
						<SecondaryButton
							type="button"
							value={isTruncated ? 'Read more' : 'Read less'}
							onClick={toggleReadMore}
						/>
					</div>
				)}
			</div>
		)
	}

	return (
		<div className="mb-12">
			{props.about && (
				<div className="w-full h-fit my-12 sm:w-full sm:mt-6 sm:mb-6">
					<div className="mb-6">
						<h1 className="font-bold text-gray-800 text-2xl">About me</h1>
					</div>
					<div>
						<div className="flex bg-gray-50 p-6 sm:p-3 rounded-2xl border-2 border-gray-100 flex-col">
							<ReadMore maxLength={180}>{props.about}</ReadMore>
						</div>
					</div>
				</div>
			)}

			{experiences.length > 0 && (
				<div className="w-full h-fit my-12 sm:w-full sm:mt-6 sm:mb-6">
					<div className="mb-6">
						<h1 className="font-bold text-gray-800 text-2xl">Work experience</h1>
					</div>
					<div>
						{experiences.map(exp => (
							<div
								className="flex mb-6 bg-gray-50 p-8 sm:p-4 rounded-2xl border-2 border-gray-100 sm:flex-wrap"
								key={`exp-${exp.id}-${exp.jobTitle}`}
							>
								<div className="mr-5 w-10 sm:mb-1">
									<svg
										height="40px"
										width="40px"
										version="1.1"
										id="Layer_1"
										xmlns="http://www.w3.org/2000/svg"
										xmlnsXlink="http://www.w3.org/1999/xlink"
										viewBox="0 0 512 512"
									>
										<circle
											className="fill-[#FFEDB5]"
											cx="256"
											cy="256"
											r="256"
										/>
										<g>
											<path
												className="fill-[#FEE187]"
												d="M512,256c0-4.248-0.109-8.471-0.314-12.669l-93.284-92.767L92.517,360.296l151.412,151.412
		C247.93,511.895,251.952,512,256,512C397.384,512,512,397.384,512,256z"
											/>
											<polygon
												className="fill-[#FEE187]"
												points="316.002,99.145 377.823,162.047 199.399,154.29 201.123,109.468 	"
											/>
										</g>
										<path
											className="fill-[#606060]"
											d="M295.577,197.818h-79.155c-15.724,0-28.517-12.793-28.517-28.517v-50.71
	c0-15.724,12.793-28.517,28.517-28.517h79.155c15.724,0,28.517,12.793,28.517,28.517v50.71
	C324.094,185.025,311.301,197.818,295.577,197.818z M216.423,112.485c-3.367,0-6.106,2.739-6.106,6.106v50.71
	c0,3.367,2.739,6.106,6.106,6.106h79.155c3.367,0,6.106-2.739,6.106-6.106v-50.71c0-3.367-2.739-6.106-6.106-6.106H216.423z"
										/>
										<g>
											<path
												className="fill-[#494949]"
												d="M295.577,90.074h-40.726v22.411h40.726c3.367,0,6.106,2.739,6.106,6.106v50.71
		c0,3.367-2.739,6.106-6.106,6.106h-40.726v22.411h40.726c15.724,0,28.517-12.793,28.517-28.517v-50.71
		C324.094,102.867,311.301,90.074,295.577,90.074z"
											/>
											<path
												className="fill-[#494949]"
												d="M398.365,369.778H113.633c-15.631,0-28.3-12.671-28.3-28.301V170.522
		c0-15.631,12.671-28.3,28.3-28.3h284.732c15.631,0,28.301,12.671,28.301,28.3v170.955
		C426.667,357.107,413.996,369.778,398.365,369.778z"
											/>
										</g>
										<path
											className="fill-[#353535]"
											d="M398.365,142.222H254.85v227.556h143.515c15.631,0,28.301-12.671,28.301-28.301V170.524
	C426.667,154.893,413.996,142.222,398.365,142.222z"
										/>
										<path
											className="fill-[#333333]"
											d="M398.367,256H113.635c-15.631,0-28.301-12.671-28.301-28.301v-57.177
	c0-15.631,12.671-28.3,28.301-28.3h284.732c15.631,0,28.301,12.671,28.301,28.3v57.177C426.667,243.329,413.996,256,398.367,256z"
										/>
										<path
											className="fill-[#1E1E1E]"
											d="M398.365,142.222H254.85V256h143.515c15.631,0,28.301-12.671,28.301-28.301v-57.175
	C426.667,154.893,413.996,142.222,398.365,142.222z"
										/>
										<path
											className="fill-[#FEE187]"
											d="M158.455,284.444h-4.022c-6.744,0-12.212-5.466-12.212-12.21v-32.466
	c0-6.744,5.467-12.21,12.212-12.21h4.022c6.744,0,12.212,5.467,12.212,12.21v32.466C170.667,278.978,165.2,284.444,158.455,284.444z
	"
										/>
										<path
											className="fill-[#FFC61B]"
											d="M158.455,287.892h-4.022c-8.635,0-15.658-7.025-15.658-15.66v-32.465
	c0-8.635,7.023-15.66,15.658-15.66h4.022c8.635,0,15.66,7.025,15.66,15.66v32.465C174.114,280.867,167.09,287.892,158.455,287.892z
	 M154.433,231.003c-4.832,0-8.763,3.931-8.763,8.764v32.465c0,4.834,3.931,8.764,8.763,8.764h4.022c4.834,0,8.764-3.93,8.764-8.764
	v-32.465c0-4.834-3.931-8.764-8.764-8.764H154.433z"
										/>
										<path
											className="fill-[#FEE187]"
											d="M357.567,284.444h-4.022c-6.744,0-12.21-5.466-12.21-12.21v-32.466c0-6.744,5.467-12.21,12.21-12.21
	h4.022c6.744,0,12.21,5.467,12.21,12.21v32.466C369.778,278.978,364.311,284.444,357.567,284.444z"
										/>
										<path
											className="fill-[#FFC61B]"
											d="M357.566,287.892h-4.022c-8.635,0-15.658-7.025-15.658-15.66v-32.465
	c0-8.635,7.023-15.66,15.658-15.66h4.022c8.635,0,15.66,7.025,15.66,15.66v32.465C373.226,280.867,366.201,287.892,357.566,287.892z
	 M353.544,231.003c-4.832,0-8.763,3.931-8.763,8.764v32.465c0,4.834,3.931,8.764,8.763,8.764h4.022c4.834,0,8.764-3.93,8.764-8.764
	v-32.465c0-4.834-3.931-8.764-8.764-8.764H353.544z"
										/>
										<path
											className="fill-[#1E1E1E]"
											d="M426.667,341.476v-28.588c-31.418,0-56.889,25.471-56.889,56.889h28.588
	C413.996,369.778,426.667,357.107,426.667,341.476z"
										/>
										<path
											className="fill-[#333333]"
											d="M85.333,312.889v28.588c0,15.631,12.671,28.301,28.301,28.301h28.588
	C142.222,338.36,116.752,312.889,85.333,312.889z"
										/>
									</svg>
								</div>
								<div className="w-full">
									<div className="flex flex-col mb-6">
										<h1 className="font-semibold text-gray-800 text-xl mb-2">
											{exp.jobTitle}
										</h1>
										<div className="flex justify-between sm:flex-wrap">
											<p className="text-md font-medium text-gray-800">
												{exp.jobLocation} &bull; {exp.companyName}
											</p>
											<p className="text-sm font-bold text-zinc-800">
												{dayjs.unix(exp.startDate).format('MMM YYYY')}{' '}
												&ndash; {dayjs.unix(exp.endDate).format('MMM YYYY')}
											</p>
										</div>
									</div>
									<div>
										<p className="text-gray-500 text-md">{exp.description}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{educations.length > 0 && (
				<div className="w-full h-fit my-12 sm:w-full sm:mb-6 sm:mt-6">
					<div className="w-full">
						<div className="mb-6">
							<h1 className="font-bold text-gray-800 text-2xl">Education</h1>
						</div>
					</div>
					<div>
						{educations.map(edu => (
							<div
								className="flex mb-6 bg-gray-50 p-8 sm:p-4 rounded-2xl border-2 border-gray-100 sm:flex-wrap"
								key={`edu-${edu.id}-${edu.degreeType}`}
							>
								<div className="mr-5 w-10 sm:mb-1">
									<svg
										height="40px"
										width="40px"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										xmlnsXlink="http://www.w3.org/1999/xlink"
										viewBox="0 0 506 506"
									>
										<circle
											className="fill-[#FD8469]"
											cx="253"
											cy="253"
											r="253"
										/>
										<g>
											<path
												className="fill-[#2B3B4E];"
												d="M151.7,272.1v4.3v33.7l2.7-1c1-0.4,99.7-35.2,197.1,0l2.7,1v-33.7v-4.3
		C258.1,237.7,160.8,269,151.7,272.1z"
											/>
											<polygon
												className="fill-[#2B3B4E]"
												points="253,98.9 94.9,153.5 253,208.1 411.1,153.5 	"
											/>
										</g>
										<path
											className="fill-[#435E70]"
											d="M253,208.1l-101.3-35v99c9.1-3.1,106.4-34.4,202.6,0v-99L253,208.1z"
										/>
										<circle
											className="fill-[#FFD05B]"
											cx="253.1"
											cy="344.5"
											r="25"
										/>
										<path
											className="fill-[#F1543F]"
											d="M253.1,319.5c8.9,0,16.7,4.7,21.2,11.7v-15.1c0-2-1.6-3.7-3.7-3.7h-35.2c-2,0-3.7,1.6-3.7,3.7v15.4
	C236.1,324.3,244,319.5,253.1,319.5z"
										/>
										<g>
											<path
												className="fill-[#E6E9EE]"
												d="M235.7,326.6l-0.1,0.1C235.6,326.7,235.6,326.7,235.7,326.6z"
											/>
											<path
												className="fill-[#E6E9EE]"
												d="M233.3,329.3c0.1-0.1,0.2-0.3,0.3-0.4C233.6,329,233.5,329.1,233.3,329.3z"
											/>
										</g>
										<g>
											<path
												className="fill-[#FFFFFF]"
												d="M231.9,331.4c0,0.1-0.1,0.1-0.1,0.2v-10.9H99.1v32.2h130.5c-0.9-2.6-1.4-5.4-1.4-8.3
		C228.1,339.7,229.5,335.2,231.9,331.4z"
											/>
											<path
												className="fill-[#FFFFFF]"
												d="M274.3,320.6v10.6c-0.1-0.1-0.2-0.2-0.2-0.3c2.6,3.9,4.1,8.6,4.1,13.6c0,2.9-0.5,5.7-1.4,8.3h130.3
		v-32.2H274.3z"
											/>
										</g>
										<g>
											<path
												className="fill-[#E6E9EE]"
												d="M270.3,326.4c0.2,0.1,0.3,0.3,0.4,0.5C270.6,326.7,270.4,326.5,270.3,326.4z"
											/>
											<path
												className="fill-[#E6E9EE]"
												d="M272.8,329.2c-0.2-0.2-0.3-0.4-0.5-0.7C272.4,328.7,272.6,328.9,272.8,329.2z"
											/>
										</g>
										<circle
											className="fill-[#F9B54C]"
											cx="253.1"
											cy="344.5"
											r="16.5"
										/>
										<polygon
											className="fill-[#1C2A38]"
											points="253,157.6 253,149.5 107.4,149.5 107.4,247.5 98.9,275.8 124.1,275.8 115.5,247.7 
	115.5,157.6 "
										/>
										<path
											className="fill-[#F1543F]"
											d="M253.1,369.5c-9.1,0-17-4.8-21.4-12.1v51.8l21.3-18.4l21.3,18.4v-51.5
	C269.8,364.8,262,369.5,253.1,369.5z"
										/>
										<g>
											<path
												className="fill-[#ACB3BA]"
												d="M235.7,362.4c-0.1-0.1-0.2-0.2-0.3-0.3C235.5,362.2,235.6,362.3,235.7,362.4z"
											/>
											<path
												className="fill-[#ACB3BA]"
												d="M233.2,359.5c0.2,0.2,0.3,0.4,0.5,0.6C233.5,360,233.3,359.7,233.2,359.5z"
											/>
										</g>
										<path
											className="fill-[#CED5E0]"
											d="M231.7,357.5c0,0.1,0.1,0.2,0.2,0.2c-0.9-1.5-1.8-3.1-2.4-4.9H99.1v4.1v20.4h132.7v-19.8H231.7z"
										/>
										<path
											className="fill-[#ACB3BA]"
											d="M270.3,362.7c0.3-0.3,0.6-0.6,0.9-0.9C270.8,362,270.6,362.4,270.3,362.7z"
										/>
										<path
											className="fill-[#CED5E0]"
											d="M276.7,352.8c-0.6,1.8-1.5,3.5-2.5,5.1c0-0.1,0.1-0.1,0.1-0.2v19.5H407v-20.4v-4.1H276.7V352.8z"
										/>
										<path
											className="fill-[#ACB3BA]"
											d="M273.1,359.4c-0.2,0.3-0.5,0.7-0.7,1C272.6,360.1,272.8,359.8,273.1,359.4z"
										/>
									</svg>
								</div>
								<div className="w-full">
									<div className="flex flex-col mb-6">
										<h1 className="font-semibold text-gray-800 text-xl mb-2">
											{edu.collegeName}
										</h1>
										<div className="flex justify-between sm:flex-wrap">
											<p className="text-md font-medium text-gray-800">
												{edu.degreeType}
											</p>
											<p className="text-sm font-bold text-zinc-800">
												{dayjs.unix(edu.startDate).format('MMM YYYY')}{' '}
												&ndash; {dayjs.unix(edu.endDate).format('MMM YYYY')}
											</p>
										</div>
									</div>
									<div>
										<p className="text-gray-500 text-md">{edu.description}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{skills.length > 0 && (
				<div className="w-full h-fit my-12 sm:w-full sm:mb-6 sm:mt-6">
					<div className=" w-full">
						<div className="mb-2 sm:mb-2">
							<h1 className="font-bold text-gray-800 text-2xl">Tech skills</h1>
						</div>
					</div>
					<div className="flex flex-wrap">
						{skills.map(skill => (
							<div
								className="flex justify-between items-center"
								key={`skill-${skill.id}-${skill.name}`}
							>
								<div className="bg-gray-50 border-2 border-gray-100 px-3 py-1 mr-4 rounded-lg mt-2">
									<p className="text-md text-gray-800 font-semibold">
										{skill.name}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{interests.length > 0 && (
				<div className="w-full h-fit my-12 sm:w-full sm:mt-6">
					<div className="w-full">
						<div className="mb-2 sm:mb-2">
							<h1 className="font-bold text-gray-800 text-2xl">Interests</h1>
						</div>
						<div className="flex flex-wrap">
							{interests.map(interest => (
								<div
									className="flex justify-between items-center"
									key={`interest-${interest.id}-${interest}`}
								>
									<div className="bg-gray-50 border-2 border-gray-100 px-3 py-1 mr-4 rounded-lg mt-2">
										<p className="text-md text-gray-800 font-semibold">
											{interest.interest}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
