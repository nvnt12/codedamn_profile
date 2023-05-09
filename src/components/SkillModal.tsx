import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import ComboBox from './ComboBox'
import Dropdown from './Dropdown'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'
import TertiaryButton from './TertiaryButton'
import { errorToast } from './Toast'
import { UserSkill } from '../lib/types'
import { createId } from '@paralleldrive/cuid2'

const TECH_STACKS = [
	'HTML5',
	'CSS3',
	'Javascript',
	'React',
	'NextJs',
	'NodeJs',
	'Git',
	'PHP',
	'Vue',
	'Angular',
	'MongoDB',
	'Sql',
	'Solidity'
]

const RATINGS = ['Beginner', 'Intermediate', 'Advanced']

export default function AddSkillModal(props: {
	addSkill: (skill: UserSkill) => void
	selectedSkills: UserSkill[]
	userId: string
}) {
	const [isOpen, setIsOpen] = useState(false)
	const [filteredOptions, setFilteredOptions] = useState(
		TECH_STACKS.filter(
			techStack => !props.selectedSkills.some(skill => skill.name === techStack)
		)
	)
	const [skill, setSkill] = useState(filteredOptions[0])
	const [skillRating, setSkillRating] = useState(RATINGS[0])

	function closeModal() {
		setIsOpen(false)
	}

	function openModal() {
		setIsOpen(true)
	}

	useEffect(() => {
		const newFilteredOptions = TECH_STACKS.filter(
			techStack => !props.selectedSkills.some(skill => skill.name === techStack)
		)
		setFilteredOptions(newFilteredOptions)
		setSkill(newFilteredOptions[0])
		setSkillRating(RATINGS[0])
	}, [props.selectedSkills])

	return (
		<>
			<TertiaryButton
				type="button"
				value="Add Skill"
				onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
					if (filteredOptions?.length > 0) {
						openModal()
					} else {
						errorToast('Cannot add more skills.')
					}
				}}
			></TertiaryButton>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-20" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-2 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-8/12 mx-auto max-w-3xl sm:w-full sm:px-3 md:w-10/12 md:px-6 sm:h-5/6 rounded-xl bg-zinc-50 p-6 text-left align-middle shadow-xl transition-all">
									<div className="flex items-start justify-start p-3 rounded-t">
										<h3 className="text-2xl font-semibold ml-1">Add Skill</h3>
									</div>

									<div className="relative py-2 px-4 flex-auto">
										<form
											className="w-full relative flex-auto"
											onSubmit={e => {
												e.preventDefault()
												const newSkill: UserSkill = {
													id: createId(),
													userId: props.userId,
													name: skill,
													rating: skillRating
												}
												console.log('skill', newSkill)
												props.addSkill(newSkill)
												setIsOpen(false)
											}}
										>
											<ComboBox
												label="Skill"
												options={filteredOptions}
												value={skill}
												onChange={(e: string) => {
													setSkill(e)
												}}
											/>

											<Dropdown
												label="How would you rate yourself on this?"
												options={RATINGS}
												value={skillRating}
												onChange={(e: string) => {
													setSkillRating(e)
												}}
											/>

											<div className="flex items-center justify-end rounded-b">
												<SecondaryButton
													type="button"
													value="Cancel"
													onClick={() => setIsOpen(false)}
												/>
												<PrimaryButton
													type="submit"
													value="Save"
													onClick={() => {}}
													active={true}
												/>
											</div>
										</form>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}
