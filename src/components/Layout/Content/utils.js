import ContentEditable from 'react-contenteditable';
import styled from 'styled-components';

const ELEMENT_TYPES = {
	documentTitle: 'documentTitle',
	p: 'p',
};

const StyledDocumentTitle = styled(ContentEditable)`
	&&[contentEditable='true']:empty:before {
		content: attr(data-placeholder);
		color: #a2a2a2;
	}
`;

export const resolveElement = (element, handleOnChange) => {
	switch (element.type) {
		case ELEMENT_TYPES.documentTitle: {
			return (
				<StyledDocumentTitle
					key={element.id}
					onChange={(event) => {
						handleOnChange(element.id, event.nativeEvent.target.textContent);
					}}
					html={element.content}
					data-placeholder="New document"
					tagName="h1"
				/>
			);
		}
		case ELEMENT_TYPES.p: {
			return (
				<ContentEditable
					key={element.id}
					onChange={(event) => {
						handleOnChange(element.id, event.nativeEvent.target.textContent);
					}}
					html={element.content}
					tagName="pre"
				/>
			);
		}
	}
};
