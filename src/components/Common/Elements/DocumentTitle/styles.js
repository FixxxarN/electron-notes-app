import ContentEditable from 'react-contenteditable';
import styled from 'styled-components';

export const StyledDocumentTitle = styled(ContentEditable)`
	&&[contentEditable='true']:empty:before {
		content: attr(data-placeholder);
		color: #a2a2a2;
	}
`;
