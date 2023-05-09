import '../globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Router } from 'next/router'

Router.events.on('routeChangeStart', newUrl => {
	if (newUrl !== window.location.pathname) {
		NProgress.start()
	}
})
Router.events.on('routeChangeComplete', () => {
	NProgress.done()
})
Router.events.on('routeChangeError', () => {
	NProgress.done()
})

NProgress.configure({
	minimum: 0.3,
	easing: 'ease',
	speed: 250,
	showSpinner: false,
	trickle: false,
	trickleSpeed: 300,
	parent: '#__next',
	positionUsing: '',
	barSelector: '[role="bar"]',
	spinnerSelector: '[role="spinner"]',
	template: `
	  <div class="bar" role="bar" style="background-color: ${'#818cf8'}; height: ${'6px'}">
		<div class="peg"></div>
	  </div>
	`
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<div>
				<Toaster position="top-right" />
			</div>
			<Component {...pageProps}></Component>
		</>
	)
}
