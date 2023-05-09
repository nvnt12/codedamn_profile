import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import PrimaryButton from './PrimaryButton'
import Input from './PrimaryInput'
import SecondaryButton from './SecondaryButton'
import TertiaryButton from './TertiaryButton'
import TextArea from './TextAreaInput'
import { UserEducation } from '../lib/types'
import dayjs from 'dayjs'
import { createId } from '@paralleldrive/cuid2'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function EducationModal(props: {
	addEducation: (edu: UserEducation) => void
	userId: string
}) {
	const [isOpen, setIsOpen] = useState(false)
	const [degreeType, setDegreeType] = useState('')
	const [collegeName, setCollegeName] = useState('')
	const [startDate, setStartDate] = useState(dayjs().subtract(1, 'day').unix())
	const [endDate, setEndDate] = useState(dayjs().unix())
	const [description, setDescription] = useState('')

	function closeModal() {
		setIsOpen(false)
	}

	function openModal() {
		setIsOpen(true)
	}

	return (
		<>
			<TertiaryButton
				type="button"
				value="Add Education"
				onClick={openModal}
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
								<Dialog.Panel className="w-9/12 max-w-3xl sm:w-full sm:px-3 md:w-10/12 md:px-6 sm:h-5/6 rounded-xl bg-zinc-50 p-6 text-left align-middle shadow-xl transition-all">
									<div className="flex items-start justify-start p-3 rounded-t">
										<h3 className="text-2xl font-semibold ml-1">
											Add Education
										</h3>
									</div>

									<div className="relative py-2 px-3 flex-auto">
										<form
											className="w-full relative flex-auto"
											onSubmit={e => {
												e.preventDefault()
												const newEdu: UserEducation = {
													id: createId(),
													userId: props.userId,
													degreeType,
													collegeName,
													startDate,
													endDate,
													description
												}
												props.addEducation(newEdu)
												setIsOpen(false)
												setDegreeType('')
												setCollegeName('')
												setStartDate(dayjs().subtract(1, 'day').unix())
												setEndDate(dayjs().unix())
												setDescription('')
											}}
										>
											<Input
												type="text"
												label="Degree"
												id="degreeType"
												value={degreeType}
												required={true}
												onChange={e => {
													setDegreeType(e.target.value)
												}}
											/>
											<Input
												type="text"
												label="College"
												id="collegeName"
												value={collegeName}
												required={true}
												onChange={e => {
													setCollegeName(e.target.value)
												}}
											/>
											<div className="flex w-full gap-4 sm:flex-wrap md:gap-4 sm:w-full">
												<div className="w-3/6 flex flex-col sm:w-full">
													<label className="text-md text-gray-800 font-semibold mb-1">
														{'Start Date'}
													</label>
													<DatePicker
														selected={
															startDate
																? new Date(
																		dayjs
																			.unix(startDate)
																			.format('YYYY-MM-DD')
																  )
																: undefined
														}
														onChange={date => {
															setStartDate(dayjs(date).unix())
														}}
														dateFormat={'MMMM yyyy'}
														showMonthYearPicker
														className="border-2 w-full h-[50px] border-gray-100 p-2.5 text-md rounded-md mb-2 focus:outline-indigo-600 sm:pl-2.5"
													/>
												</div>
												<div className="w-3/6 flex flex-col sm:w-full">
													<label className="text-md text-gray-800 font-semibold mb-1">
														{'End Date'}
													</label>
													<DatePicker
														selected={
															endDate
																? new Date(
																		dayjs
																			.unix(endDate)
																			.format('YYYY-MM-DD')
																  )
																: undefined
														}
														onChange={date => {
															setEndDate(dayjs(date).unix())
														}}
														dateFormat={'MMMM yyyy'}
														showMonthYearPicker
														className="border-2 w-full h-[50px] border-gray-100 p-2.5 text-md rounded-md mb-2 focus:outline-indigo-600 sm:pl-2.5"
													/>
												</div>
											</div>
											<TextArea
												label="Description"
												id="description"
												value={description}
												onChange={e => {
													setDescription(e.target.value)
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
