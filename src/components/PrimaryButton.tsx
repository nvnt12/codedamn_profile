export default function PrimaryButton(props: {
	type: 'submit' | 'reset' | 'button'
	value: string
	active: boolean
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
	return (
		<button
			type={props.type}
			className={`mx-2 py-2 px-5 text-white text-md rounded-lg font-semibold  
				bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400
			`}
			disabled={props.active === false ? true : false}
			onClick={props.onClick}
		>
			{props.value}
		</button>
	)
}
