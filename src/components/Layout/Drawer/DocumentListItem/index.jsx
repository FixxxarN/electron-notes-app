import { StyledListItem } from './styles';
import useHovering from '../../../hooks/useHovering';

const DocumentListItem = ({ document, selectDocument, deleteDocument }) => {
	const { hovering, handleMouseEnter, handleMouseLeave } = useHovering();

	if (!document) return null;

	const documentName =
		Object.values(document.elements)[0].content || 'New document';

	return (
		<StyledListItem
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={() => selectDocument(document.id)}
		>
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
				style={{ visibility: hovering ? 'visible' : 'hidden' }}
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
