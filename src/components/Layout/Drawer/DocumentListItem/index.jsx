import { StyledListItem } from './styles';
import useHovering from '../../../hooks/useHovering';

const formatDateAndTime = (createdDate) => {
	const date = new Date(createdDate).toISOString().split('T')[0];
	const hours = createdDate.getHours();
	const minutes = createdDate.getMinutes();

	return `${date} ${hours}:${minutes}`;
};

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
			<div>
				<p
					style={{
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
					}}
				>
					{documentName}
				</p>
				<p>
					{document.created && formatDateAndTime(new Date(document.created))}
				</p>
			</div>
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
