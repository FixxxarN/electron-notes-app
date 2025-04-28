import { useEffect, useRef } from 'react';
import { StyledDocumentTitle } from './styles';

const DocumentTitle = ({ element, handleOnChange }) => {
	const elementRef = useRef();

	useEffect(() => {
		console.log(element, elementRef);

		if (elementRef.current && !element.content) {
			elementRef.current.getEl().focus();
		}
	}, [elementRef.current]);

	return (
		<StyledDocumentTitle
			ref={elementRef}
			key={element.id}
			onChange={(event) => {
				handleOnChange(element.id, event.nativeEvent.target.textContent);
			}}
			html={element.content}
			data-placeholder="New document"
			tagName="h1"
		/>
	);
};

export default DocumentTitle;
