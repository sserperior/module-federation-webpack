import React, { Suspense } from 'react';
import { RemoteUrlProvider } from './RemoteUrlContext';
import RemoteInsuranceForm from './RemoteInsuranceForm';

export default function App() {
	return (
		<RemoteUrlProvider>
			<Suspense fallback={<div>Loading from server...</div>}>
				<div className="app">
					<h1>Host App (Webpack 5)</h1>
					<p>Simple React app served with Webpack 5.</p>
					<RemoteInsuranceForm />
				</div>
			</Suspense>
		</RemoteUrlProvider>
	);
}
