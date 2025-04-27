import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './components/Layout/index.jsx';
import DocumentProvider from './components/Providers/DocumentProvider/index.jsx';

const root = createRoot(document.body);
root.render(
	<DocumentProvider>
		<Layout />
	</DocumentProvider>
);
