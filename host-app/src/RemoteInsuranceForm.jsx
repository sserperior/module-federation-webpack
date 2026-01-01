import React, { useContext, use, Suspense } from 'react';
import { RemoteUrlContext } from './RemoteUrlContext';
import { useFederatedComponent } from 'dynamic-module-federation';

const RemoteInsuranceForm = () => {
	const { remoteUrlPromise } = useContext(RemoteUrlContext);

	const remoteUrl = remoteUrlPromise ? use(remoteUrlPromise) : null;

	const { error, Component } = useFederatedComponent({
		remoteUrl,
		scope: 'remote_app',
		module: './InsuranceForm',
	});

	const RemoteComponentRenderer = ({ error, RemoteComponent }) => {
		if (error) {
			return <div>Error loading remote component</div>;
		}

		if (RemoteComponent) {
			return (
				<Suspense fallback={<div>Loading remote insurance form...</div>}>
					<RemoteComponent/>
				</Suspense>
			);
		} else {
			return <div>Loading remote component...</div>;
		}
	};

	return (
		<RemoteComponentRenderer error={error} RemoteComponent={Component} />
	);
};

export default RemoteInsuranceForm;