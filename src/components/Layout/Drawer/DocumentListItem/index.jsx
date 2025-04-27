import { StyledListItem } from './styles';

const DocumentListItem = ({ document, selectDocument, deleteDocument }) => {
	if (!document) return null;

	const documentName =
		Object.values(document.elements)[0].content || 'New document';

	return (
		<StyledListItem onClick={() => selectDocument(document.id)}>
			<p
				style={{
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
				}}
			>
				{documentName}
			</p>
			<button
				onClick={(event) => {
					event.stopPropagation();
					deleteDocument(document.id);
				}}
			>
				Delete
			</button>
		</StyledListItem>
	);
};

export default DocumentListItem;
