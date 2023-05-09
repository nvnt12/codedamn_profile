export default function TertiaryButton(props: {
	type: 'submit' | 'reset' | 'button'
	value: string
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
	return (
		<button
			className="text-indigo-600 font-semibold text-md mr-1 mb-1 outline-none hover:outline-none flex items-center"
			type={props.type}
			onClick={props.onClick}
		>
			<span className="text-xl mr-2 sm:mr-1">+</span>
			{props.value}
		</button>
	)
}
