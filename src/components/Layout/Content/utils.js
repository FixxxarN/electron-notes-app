import ContentEditable from 'react-contenteditable';
import styled from 'styled-components';
import DocumentTitle from '../../Common/Elements/DocumentTitle/index.jsx';

const ELEMENT_TYPES = {
	documentTitle: 'documentTitle',
	p: 'p',
};

const StyledParagraph = styled(ContentEditable)`
	text-wrap: auto;
`;

export const resolveElement = (element, handleOnChange) => {
	switch (element.type) {
		case ELEMENT_TYPES.documentTitle: {
			return (
				<DocumentTitle
					key={element.id}
					element={element}
					handleOnChange={handleOnChange}
				/>
			);
		}
		case ELEMENT_TYPES.p: {
			return (
				<StyledParagraph
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
