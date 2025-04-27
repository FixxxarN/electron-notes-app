import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from '../../utils';

export const DocumentContext = React.createContext({
	documents: {},
	currentDocument: undefined,
	selectDocument: () => {},
	addNewDocument: () => {},
	updateDocument: () => {},
	deleteDocument: () => {},
});

const DocumentProvider = ({ children }) => {
	const [documents, setDocuments] = useState([]);
	const [currentDocument, setCurrentDocument] = useState(undefined);

	useEffect(() => {
		const getAllDocuments = async () => {
			const documents = await window.fileSystem.getAllDocuments();

			setDocuments(documents);
		};

		getAllDocuments();
	}, []);

	const handleSelectDocument = useCallback(
		(id) => {
			if (documents[id]) {
				setCurrentDocument({ ...documents[id] });
			}
		},
		[documents, setCurrentDocument]
	);

	const handleAddNewDocument = useCallback(
		(document) => {
			setDocuments({ [document.id]: { ...document }, ...documents });
			setCurrentDocument(document);
		},
		[documents, setDocuments, setCurrentDocument]
	);

	const saveChangesToDocumentFile = async (document) => {
		await window.fileSystem.updateDocument(document);
	};

	const saveToFile = debounce(saveChangesToDocumentFile, 1000);

	const handleUpdateDocument = useCallback(
		(documentId, elementId, data) => {
			const document = documents[documentId];
			const element = document.elements.find(
				(element) => element.id === elementId
			);

			if (element) {
				element.content = data;
			}

			setDocuments({ ...documents });
			saveToFile(documents[documentId]);
		},
		[documents, setDocuments]
	);

	const handleDeleteDocument = useCallback(
		(id) => {
			delete documents[id];
			setDocuments({ ...documents });

			if (currentDocument?.id === id) {
				setCurrentDocument(undefined);
			}
		},
		[documents, currentDocument, setDocuments, setCurrentDocument]
	);

	const value = useMemo(
		() => ({
			documents,
			currentDocument,
			selectDocument: handleSelectDocument,
			addNewDocument: handleAddNewDocument,
			updateDocument: handleUpdateDocument,
			deleteDocument: handleDeleteDocument,
		}),
		[
			documents,
			currentDocument,
			handleSelectDocument,
			handleAddNewDocument,
			handleUpdateDocument,
			handleDeleteDocument,
		]
	);

	return (
		<DocumentContext.Provider value={value}>
			{children}
		</DocumentContext.Provider>
	);
};

export default DocumentProvider;
