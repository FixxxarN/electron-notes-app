import { useCallback } from 'react';
import { StyledContent } from './styles';
import { resolveElement } from './utils';

const Content = ({ currentDocument, updateDocument }) => {
	const handleOnChange = useCallback(
		(elementId, content) => {
			updateDocument(currentDocument.id, elementId, content);
		},
		[updateDocument, currentDocument]
	);

	if (!currentDocument) {
		return null;
	}

	return (
		<StyledContent>
			{currentDocument?.elements?.map((element) =>
				resolveElement(element, handleOnChange)
			)}
		</StyledContent>
	);
};

export default Content;
