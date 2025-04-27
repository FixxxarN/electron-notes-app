import { useContext } from 'react';
import { DocumentContext } from '../Providers/DocumentProvider/index.jsx';
import Drawer from './Drawer/index.jsx';
import { Container } from './styles.js';
import Content from './Content/index.jsx';

const Layout = () => {
	const {
		documents,
		currentDocument,
		selectDocument,
		addNewDocument,
		updateDocument,
		deleteDocument,
	} = useContext(DocumentContext);

	return (
		<Container>
			<Drawer
				documents={documents}
				selectDocument={selectDocument}
				addNewDocument={addNewDocument}
				deleteDocument={deleteDocument}
			/>
			<Content
				currentDocument={currentDocument}
				updateDocument={updateDocument}
			/>
		</Container>
	);
};

export default Layout;
