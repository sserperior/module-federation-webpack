import React, { createContext, useEffect, useState } from "react";

// This is for the preview functionality. Remote-app will be running in preview mode as well.
const defaultRemoteUrl = 'http://localhost:3000/remoteEntry.js';

export const RemoteUrlContext = createContext(null);

export const RemoteUrlProvider = ({ children }) => {
	const [remoteUrlPromise, setRemoteUrlPromise] = useState(null);

	useEffect(() => {
		const fetchRemoteUrl = async () => {
			try {
				const response = await fetch('/api/remote-url');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				console.info(`Using remoteEntry URL from /api/remote-url: ${data.url}`);
				return data.url;
			} catch (error) {
				console.error(`Error fetching remote URL from /api/remote-url. Using default remoteEntry URL ${defaultRemoteUrl}.`);
				return defaultRemoteUrl;
			}
		};
		setRemoteUrlPromise(fetchRemoteUrl());
	}, []);

	return (
		<RemoteUrlContext.Provider value={{ remoteUrlPromise }}>
			{children}
		</RemoteUrlContext.Provider>
	 );
};
