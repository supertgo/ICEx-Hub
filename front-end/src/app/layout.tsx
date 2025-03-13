import StyledComponentsRegistry from 'lib/registry';
import type { Metadata } from 'next';
import { Epilogue } from 'next/font/google';
import { AppProviders } from 'providers/app-providers';
import { QueryProvider } from 'providers/query-provider';
import NextTopLoader from 'nextjs-toploader';

const epilogue = Epilogue({
	weight: ['100', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'ICEx-Hub',
	description: '',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="pt-br"
			translate="no"
			className={epilogue.className}
			suppressHydrationWarning={true}
		>
			<body>
				<StyledComponentsRegistry>
					<QueryProvider>
						<NextTopLoader />
						<AppProviders>{children}</AppProviders>
					</QueryProvider>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
