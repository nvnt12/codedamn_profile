import dayjs from 'dayjs'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ProjectCard(props: {
	isSelected: boolean
	imageUrl: string
	imageAltText: string
	title: string
	tags: string[]
	createdAt: number
}) {
	const [createdAt, setCreatedAt] = useState<string>()

	useEffect(() => {
		setCreatedAt(dayjs.unix(props.createdAt).format('DD-MM-YY'))
	}, [])

	return (
		<div>
			<div className="flex flex-col bg-gray-50 p-3 rounded-lg">
				<div className="w-full h-full">
					<Image
						src={props.imageUrl}
						alt={props.imageAltText}
						width="320"
						height="100"
						className="rounded-md w-full h-full sm:w-full mb-2 "
					/>
				</div>
				<div className="ml-2">
					<h2 className="text-md text-gray-700 font-semibold">{props.title}</h2>
					<div className="flex justify-between">
						<h3 className="text-sm text-gray-500 font-normal">
							{props.tags.join(', ')}
						</h3>
						<p className=" text-gray-500 text-xs font-normal">{createdAt}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
