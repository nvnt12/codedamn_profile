import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export default function Dropdown(props: {
	label: string
	options: string[]
	value: string
	onChange: (e: string) => void
}) {
	const options = props.options
	const [selected, setSelected] = useState(props.value)

	return (
		<div>
			<Listbox
				value={selected}
				onChange={e => {
					setSelected(e)
					props.onChange(e)
				}}
			>
				<div className="relative mt-1 mb-6 flex flex-col">
					<label className="text-md text-gray-800 font-semibold mb-1">
						{props.label}
					</label>
					<Listbox.Button
						className="relative w-full border-2 border-gray-100 p-2.5 focus:outline-none focus:border-indigo-600 rounded-md mb-2 bg-white text-gray-900 text-left sm:text-sm"
						tabIndex={0}
					>
						<span className="block truncate pl-1">{selected}</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronUpDownIcon
								className="h-5 w-5 text-gray-600"
								aria-hidden="true"
							/>
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className="absolute mt-20 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{options.map(option => (
								<Listbox.Option
									key={option}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 group ${
											active ? 'bg-indigo-600 text-white' : 'text-gray-900'
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
														active ? 'text-white' : 'text-indigo-600'
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
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	)
}
