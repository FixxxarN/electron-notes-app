import { useCallback } from 'react';
import Button from '../../Common/Button/index.jsx';
import DocumentListItem from './DocumentListItem/index.jsx';
import { StyledDrawer } from './styles';

const Drawer = ({
	documents,
	selectDocument,
	addNewDocument,
	deleteDocument,
}) => {
	const handleAddNewDocument = useCallback(async () => {
		const newDocument = await window.fileSystem.addNewDocument();
		addNewDocument(newDocument);
	}, [window, addNewDocument]);

	const handleDeleteDocument = useCallback(
		async (id) => {
			await window.fileSystem.deleteDocument(id);
			deleteDocument(id);
		},
		[window, deleteDocument]
	);

	return (
		<StyledDrawer>
			<Button onClick={handleAddNewDocument}>Add new document</Button>
			{Object.entries(documents)?.map(([key, document]) => (
				<DocumentListItem
					key={key}
					document={document}
					selectDocument={selectDocument}
					deleteDocument={handleDeleteDocument}
				/>
			))}
		</StyledDrawer>
	);
};

export default Drawer;
