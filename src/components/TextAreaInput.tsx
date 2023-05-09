export default function TextArea(props: {
	label: string
	id: string
	value: string
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
	return (
		<div className="mb-3 flex flex-col">
			<label className="text-md text-gray-800 font-semibold mb-1">{props.label}</label>
			<textarea
				id={props.id}
				value={props.value}
				onChange={props.onChange}
				className=" border-2 border-gray-100 p-2.5 rounded-md mb-2 focus:outline-indigo-600"
			></textarea>
		</div>
	)
}
