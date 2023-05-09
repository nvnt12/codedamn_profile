import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MainDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html>
				<Head>
					<link
						rel="shortcut icon"
						href="https://res.cloudinary.com/dum8ltv4o/image/upload/v1683723104/logo_zypdb5.svg"
						type="image/x-icon"
					/>
					<meta property="og:title" content="Codedamn Profile by nvnt" />
					<meta property="og:url" content="https://profile.nvnt.in" />
					<meta
						property="og:description"
						content="Public portfolio which provides a quick and comprehensive overview of the knowledge, skills, projects, and work experience of codedamn user"
					/>
					<meta property="og:type" content="website" />
					<meta
						property="og:image"
						content="https://res.cloudinary.com/dum8ltv4o/image/upload/v1679428819/ogImage_zxco3u-c_scale_h_630_w_1203_u1lzvt.png"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MainDocument
