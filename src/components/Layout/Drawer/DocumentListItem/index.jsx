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
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					overflow: 'hidden',
				}}
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
				<p>
					{document.created &&
						new Date(document.created).toLocaleString([], {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						})}
				</p>
			</div>
			<div style={{ padding: '0.25rem' }}>
				<button
					style={{ visibility: hovering ? 'visible' : 'hidden' }}
					onClick={(event) => {
						event.stopPropagation();
						deleteDocument(document.id);
					}}
				>
					Delete
				</button>
			</div>
		</StyledListItem>
	);
};

export default DocumentListItem;
