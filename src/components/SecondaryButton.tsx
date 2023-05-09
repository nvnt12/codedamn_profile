export default function SecondaryButton(props: {
	type: 'submit' | 'reset' | 'button'
	value: string
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
	return (
		<button
			type={props.type}
			className="mx-2 bg-gray-100 py-2 px-5 text-gray-700 text-md rounded-lg font-semibold border hover:bg-gray-200"
			onClick={props.onClick}
		>
			{props.value}
		</button>
	)
}
