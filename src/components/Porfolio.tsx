import { UserPlayground, UserProject } from '../lib/types'
import Badge from './Badge'
import PlaygroundCard from './PlaygroundCard'
import ProjectCard from './ProjectCard'

export default function Portfolio(props: {
	isXpPointsVisible: boolean
	isAchievementBadgeVisible: boolean
	playgrounds: UserPlayground[]
	projects: UserProject[]
}) {
	const selectedPlaygrounds = props.playgrounds.filter(playground => playground.isSelected)

	const selectedProjects = props.projects.filter(project => project.isSelected)

	return (
		<>
			<div className="w-full h-fit mt-12 mb-12 sm:w-full sm:mb-6 sm:mt-6">
				<div className="mb-6">
					<h1 className="font-bold text-gray-800 text-2xl">Stats</h1>
				</div>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-1 sm:gap-1">
					<Badge icon="Lightning" heading="2" title="Longest streak" />

					{props.isXpPointsVisible === true && (
						<Badge icon="StarFour" heading="1200" title="Experience points" />
					)}

					{props.isAchievementBadgeVisible === true && (
						<Badge icon="Cup" heading="Novice" title="Current league" />
					)}

					<Badge icon="Heart" heading="120" title="Karma points" />
				</div>
			</div>

			{selectedProjects.length > 0 && (
				<div className="w-full h-fit mt-12 mb-12 sm:w-full sm:mb-6 sm:mt-6">
					<div className="mb-8 w-full">
						<div className="mb-6">
							<h1 className="font-bold text-gray-800 text-2xl">Projects</h1>
						</div>
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-1 sm:gap-3">
							{selectedProjects.map(project => (
								<div
									key={`pro-${project.id}-${project.title}`}
									className="rounded-lg border-2 border-gray-100"
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
				</div>
			)}

			{selectedPlaygrounds.length > 0 && (
				<div className="w-full h-fit mt-12 mb-12 sm:w-full sm:mb-6 sm:mt-6">
					<div className="mb-8 w-full">
						<div className="mb-6">
							<h1 className="font-bold text-gray-800 text-2xl">Playgrounds</h1>
						</div>
						<div className="grid grid-cols-2 mb-12 gap-4 sm:grid-cols-1 sm:gap-3">
							{selectedPlaygrounds.map(playground => (
								<div
									key={`pg-${playground.id}-${playground.title}`}
									className="rounded-lg border-2 border-gray-100"
								>
									<PlaygroundCard
										title={playground.title}
										language={playground.language}
										createdAt={playground.createdAt}
										isSelected={playground.isSelected}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	)
}
