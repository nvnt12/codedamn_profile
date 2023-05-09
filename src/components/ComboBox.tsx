import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export default function ComboBox(props: {
	label: string
	options: string[]
	value: string
	onChange: (e: string) => void
}) {
	const [selected, setSelected] = useState(props.options[0])
	const [query, setQuery] = useState('')

	const filteredOption =
		query === ''
			? props.options
			: props.options.filter(option =>
					option
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			  )

	return (
		<div>
			<Combobox
				value={selected}
				onChange={(e: string) => {
					setSelected(e)
					props.onChange(e)
				}}
			>
				<div className="relative mt-1 mb-6 flex flex-col">
					<label className="text-md text-gray-800 font-semibold mb-1"></label>
					<div
						className="relative w-full border-2 border-gray-100 p-2.5 focus:outline-none focus:border-indigo-600 rounded-md mb-2 bg-white text-gray-900 text-left sm:text-sm"
						tabIndex={0}
					>
						<Combobox.Input
							tabIndex={-1}
							className="w-full pl-1 border-none text-md leading-5 text-gray-900 outline-none"
							displayValue={option => option?.toString() || ''}
							onChange={event => setQuery(event.target.value)}
						/>
						<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronUpDownIcon
								className="h-5 w-5 text-gray-600"
								aria-hidden="true"
							/>
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery('')}
					>
						<Combobox.Options className="absolute mt-14 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm">
							{filteredOption.length === 0 && query !== '' ? (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
									Nothing found.
								</div>
							) : (
								filteredOption.map(option => (
									<Combobox.Option
										key={option}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active
													? 'bg-indigo-600 text-white'
													: 'text-gray-900'
											}`
										}
										value={option}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected ? 'font-medium' : 'font-normal'
													}`}
												>
													{option}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active
																? 'text-white'
																: 'text-indigo-600'
														}`}
													>
														<CheckIcon
															className="h-5 w-5"
															aria-hidden="true"
														/>
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	)
}
