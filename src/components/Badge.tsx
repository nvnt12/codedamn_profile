export default function Badge(props: { icon: string; heading: string; title: string }) {
	return (
		<div className="flex mb-2 bg-gray-50 p-4 rounded-lg border-2 border-gray-100">
			<div>
				{props.icon === 'Lightning' && (
					<svg
						viewBox="0 0 55 63"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="h-14 w-12"
					>
						<g filter="url(#filter0_d_4_8255)">
							<path
								d="M38.9745 26.7752C38.9374 26.6141 38.8609 26.4646 38.7518 26.3402C38.6427 26.2159 38.5045 26.1206 38.3495 26.0627L31.1495 23.3627L32.9745 14.2002C33.0165 13.988 32.9894 13.7679 32.8972 13.5722C32.8049 13.3765 32.6524 13.2155 32.462 13.1127C32.2698 13.0105 32.049 12.9746 31.8343 13.0108C31.6195 13.047 31.4227 13.1531 31.2745 13.3127L17.2745 28.3127C17.1598 28.4318 17.0768 28.5777 17.0331 28.7371C16.9895 28.8965 16.9865 29.0644 17.0245 29.2252C17.0637 29.3855 17.1409 29.534 17.2497 29.6581C17.3586 29.7821 17.4957 29.8781 17.6495 29.9377L24.8495 32.6377L23.0245 41.8002C22.9826 42.0125 23.0097 42.2326 23.1019 42.4283C23.1941 42.624 23.3466 42.785 23.537 42.8877C23.6806 42.9602 23.8388 42.9986 23.9995 43.0002C24.1354 43.0008 24.2699 42.9734 24.3946 42.9196C24.5194 42.8658 24.6317 42.7869 24.7245 42.6877L38.7245 27.6877C38.8393 27.5687 38.9223 27.4228 38.9659 27.2634C39.0096 27.104 39.0126 26.9361 38.9745 26.7752Z"
								fill="#6366F1"
							/>
						</g>
						<defs>
							<filter
								id="filter0_d_4_8255"
								x="0.998047"
								y="0.99707"
								width="54.003"
								height="62.0032"
								filterUnits="userSpaceOnUse"
								colorInterpolationFilters="sRGB"
							>
								<feFlood floodOpacity="0" result="BackgroundImageFix" />
								<feColorMatrix
									in="SourceAlpha"
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
									result="hardAlpha"
								/>
								<feOffset dy="4" />
								<feGaussianBlur stdDeviation="8" />
								<feComposite in2="hardAlpha" operator="out" />
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 0.354425 0 0 0 0 0.254063 0 0 0 0 0.970937 0 0 0 0.48 0"
								/>
								<feBlend
									mode="normal"
									in2="BackgroundImageFix"
									result="effect1_dropShadow_4_8255"
								/>
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="effect1_dropShadow_4_8255"
									result="shape"
								/>
							</filter>
						</defs>
					</svg>
				)}
				{props.icon === 'StarFour' && (
					<svg
						viewBox="0 0 62 62"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="h-14 w-12"
					>
						<g filter="url(#filter0_d_4_8262)">
							<path
								d="M45.0749 27.0001C45.0779 27.4102 44.9531 27.8111 44.7179 28.1471C44.4827 28.4831 44.1488 28.7376 43.7624 28.8751L35.7749 31.7751L32.8749 39.7626C32.7328 40.1454 32.477 40.4755 32.1418 40.7086C31.8066 40.9417 31.4081 41.0667 30.9999 41.0667C30.5916 41.0667 30.1931 40.9417 29.8579 40.7086C29.5228 40.4755 29.267 40.1454 29.1249 39.7626L26.2249 31.7751L18.2374 28.8751C17.8546 28.7331 17.5245 28.4772 17.2914 28.1421C17.0583 27.8069 16.9333 27.4084 16.9333 27.0001C16.9333 26.5919 17.0583 26.1934 17.2914 25.8582C17.5245 25.523 17.8546 25.2672 18.2374 25.1251L26.2249 22.2251L29.1249 14.2376C29.267 13.8549 29.5228 13.5248 29.8579 13.2917C30.1931 13.0585 30.5916 12.9336 30.9999 12.9336C31.4081 12.9336 31.8066 13.0585 32.1418 13.2917C32.477 13.5248 32.7328 13.8549 32.8749 14.2376L35.7749 22.2251L43.7624 25.1251C44.1488 25.2627 44.4827 25.5171 44.7179 25.8531C44.9531 26.1891 45.0779 26.59 45.0749 27.0001V27.0001Z"
								fill="#0EA5E9"
							/>
						</g>
						<defs>
							<filter
								id="filter0_d_4_8262"
								x="0.93335"
								y="0.933594"
								width="60.1416"
								height="60.1331"
								filterUnits="userSpaceOnUse"
								colorInterpolationFilters="sRGB"
							>
								<feFlood floodOpacity="0" result="BackgroundImageFix" />
								<feColorMatrix
									in="SourceAlpha"
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
									result="hardAlpha"
								/>
								<feOffset dy="4" />
								<feGaussianBlur stdDeviation="8" />
								<feComposite in2="hardAlpha" operator="out" />
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 0.254063 0 0 0 0 0.798887 0 0 0 0 0.970937 0 0 0 0.48 0"
								/>
								<feBlend
									mode="normal"
									in2="BackgroundImageFix"
									result="effect1_dropShadow_4_8262"
								/>
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="effect1_dropShadow_4_8262"
									result="shape"
								/>
							</filter>
						</defs>
					</svg>
				)}
				{props.icon === 'Cup' && (
					<svg
						viewBox="0 0 58 58"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="h-14 w-12"
					>
						<g filter="url(#filter0_d_4_8268)">
							<path
								d="M28 34.3334H25C23.5333 34.3334 22.3333 35.5334 22.3333 37V37.3334H21C20.4533 37.3334 20 37.7867 20 38.3334C20 38.88 20.4533 39.3334 21 39.3334H37C37.5467 39.3334 38 38.88 38 38.3334C38 37.7867 37.5467 37.3334 37 37.3334H35.6667V37C35.6667 35.5334 34.4667 34.3334 33 34.3334H30V31.28C29.6667 31.32 29.3333 31.3334 29 31.3334C28.6667 31.3334 28.3333 31.32 28 31.28V34.3334Z"
								fill="#FE6712"
							/>
							<path
								d="M37.64 25.5201C38.52 25.1867 39.2933 24.6401 39.9067 24.0267C41.1467 22.6534 41.96 21.0134 41.96 19.0934C41.96 17.1734 40.4533 15.6667 38.5333 15.6667H37.7867C36.92 13.8934 35.1067 12.6667 33 12.6667H25C22.8933 12.6667 21.08 13.8934 20.2133 15.6667H19.4667C17.5467 15.6667 16.04 17.1734 16.04 19.0934C16.04 21.0134 16.8533 22.6534 18.0933 24.0267C18.7067 24.6401 19.48 25.1867 20.36 25.5201C21.7467 28.9334 25.08 31.3334 29 31.3334C32.92 31.3334 36.2533 28.9334 37.64 25.5201ZM32.7867 21.2667L31.96 22.2801C31.8267 22.4267 31.7333 22.7201 31.7467 22.9201L31.8267 24.2267C31.88 25.0267 31.3067 25.4401 30.56 25.1467L29.3467 24.6667C29.16 24.6001 28.84 24.6001 28.6533 24.6667L27.44 25.1467C26.6933 25.4401 26.12 25.0267 26.1733 24.2267L26.2533 22.9201C26.2667 22.7201 26.1733 22.4267 26.04 22.2801L25.2133 21.2667C24.6933 20.6534 24.92 19.9734 25.6933 19.7734L26.96 19.4534C27.16 19.4001 27.4 19.2134 27.5067 19.0401L28.2133 17.9467C28.6533 17.2667 29.3467 17.2667 29.7867 17.9467L30.4933 19.0401C30.6 19.2134 30.84 19.4001 31.04 19.4534L32.3067 19.7734C33.08 19.9734 33.3067 20.6534 32.7867 21.2667Z"
								fill="#FE6712"
							/>
						</g>
						<defs>
							<filter
								id="filter0_d_4_8268"
								x="-3"
								y="-2"
								width="64"
								height="64"
								filterUnits="userSpaceOnUse"
								colorInterpolationFilters="sRGB"
							>
								<feFlood floodOpacity="0" result="BackgroundImageFix" />
								<feColorMatrix
									in="SourceAlpha"
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
									result="hardAlpha"
								/>
								<feOffset dy="4" />
								<feGaussianBlur stdDeviation="8" />
								<feComposite in2="hardAlpha" operator="out" />
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 0.970937 0 0 0 0 0.598163 0 0 0 0 0.254063 0 0 0 0.48 0"
								/>
								<feBlend
									mode="normal"
									in2="BackgroundImageFix"
									result="effect1_dropShadow_4_8268"
								/>
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="effect1_dropShadow_4_8268"
									result="shape"
								/>
							</filter>
						</defs>
					</svg>
				)}
				{props.icon === 'Heart' && (
					<svg
						viewBox="0 0 59 56"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="h-14 w-12"
					>
						<g filter="url(#filter0_d_4_8276)">
							<path
								d="M43 19.5C43 23.325 40.7875 27.25 36.425 31.175C34.444 32.9559 32.2871 34.5306 29.9875 35.875C29.8381 35.9571 29.6704 36.0001 29.5 36.0001C29.3296 36.0001 29.1619 35.9571 29.0125 35.875C28.6125 35.65 21.4625 31.5875 17.9375 25.7625C17.8908 25.6868 17.8651 25.6 17.8632 25.5111C17.8612 25.4221 17.883 25.3343 17.9263 25.2566C17.9696 25.1789 18.0329 25.1141 18.1095 25.069C18.1862 25.0239 18.2735 25.0001 18.3625 25H22.5C22.6662 25.0015 22.8301 24.9611 22.9765 24.8824C23.1229 24.8038 23.247 24.6894 23.3375 24.55L24.5 22.8L27.6625 27.55C27.7849 27.7324 27.9632 27.87 28.1707 27.9422C28.3781 28.0143 28.6034 28.0171 28.8125 27.95C29.0306 27.8725 29.2187 27.7281 29.35 27.5375L31.0375 25H33.4625C33.722 25.0041 33.9734 24.9096 34.1659 24.7356C34.3585 24.5616 34.4779 24.3211 34.5 24.0625C34.5085 23.926 34.489 23.7892 34.4426 23.6606C34.3962 23.532 34.3239 23.4142 34.2302 23.3146C34.1364 23.2151 34.0233 23.1358 33.8977 23.0816C33.7721 23.0275 33.6368 22.9997 33.5 23H30.5C30.3338 22.9985 30.1699 23.0389 30.0235 23.1176C29.8771 23.1962 29.753 23.3106 29.6625 23.45L28.5 25.2L25.3375 20.45C25.2151 20.2676 25.0368 20.13 24.8293 20.0578C24.6219 19.9857 24.3966 19.9829 24.1875 20.05C23.9694 20.1275 23.7813 20.2719 23.65 20.4625L21.9625 23H16.975C16.8689 22.9996 16.7658 22.9654 16.6804 22.9025C16.595 22.8396 16.5318 22.7512 16.5 22.65C16.178 21.6306 16.0095 20.569 16 19.5C16 17.9259 16.4953 16.3917 17.4157 15.1147C18.3361 13.8377 19.635 12.8827 21.1283 12.3849C22.6216 11.8871 24.2337 11.8718 25.7363 12.3411C27.2388 12.8105 28.5555 13.7407 29.5 15C30.4445 13.7407 31.7612 12.8105 33.2637 12.3411C34.7663 11.8718 36.3784 11.8871 37.8717 12.3849C39.365 12.8827 40.6639 13.8377 41.5843 15.1147C42.5047 16.3917 43 17.9259 43 19.5Z"
								fill="#EC4899"
							/>
						</g>
						<defs>
							<filter
								id="filter0_d_4_8276"
								x="0"
								y="0"
								width="59"
								height="56"
								filterUnits="userSpaceOnUse"
								colorInterpolationFilters="sRGB"
							>
								<feFlood floodOpacity="0" result="BackgroundImageFix" />
								<feColorMatrix
									in="SourceAlpha"
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
									result="hardAlpha"
								/>
								<feOffset dy="4" />
								<feGaussianBlur stdDeviation="8" />
								<feComposite in2="hardAlpha" operator="out" />
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 0.970937 0 0 0 0 0.254063 0 0 0 0 0.813225 0 0 0 0.48 0"
								/>
								<feBlend
									mode="normal"
									in2="BackgroundImageFix"
									result="effect1_dropShadow_4_8276"
								/>
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="effect1_dropShadow_4_8276"
									result="shape"
								/>
							</filter>
						</defs>
					</svg>
				)}
			</div>
			<div className="ml-4">
				<h2 className="text-xl text-gray-700 font-bold">{props.heading}</h2>
				<div className="flex justify-between">
					<p className="text-sm text-gray-500 font-normal">{props.title}</p>
				</div>
			</div>
		</div>
	)
}
