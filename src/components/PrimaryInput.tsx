export default function Input(props: {
	label: string
	type: string
	id: string
	value: string
	info?: string
	required: boolean
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
	return (
		<div className="mb-3 flex flex-col flex-1">
			<label className="text-md text-gray-800 font-semibold mb-1">{props.label}</label>
			<input
				type={props.type}
				id={props.id}
				value={props.value}
				onChange={props.onChange}
				required={props.required}
				className={`border-2 border-gray-100 p-2.5 text-md rounded-md mb-2 focus:outline-indigo-600 sm:pl-2.5`}
			/>
			{props.info && <p className="text-md font-normal text-gray-500">{props.info}</p>}
		</div>
	)
}
