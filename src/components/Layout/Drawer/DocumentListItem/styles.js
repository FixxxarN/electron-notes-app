import styled from 'styled-components';

export const StyledListItem = styled.div`
	border: 1px solid #a2a2a2;
	border-radius: 5px;
	padding: 0.5rem;
	font-size: 13px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const PlaceholderText = styled.p`
	&[contentEditable='true']:empty:before {
		content: attr(data-placeholder);
		color: #a2a2a2;
	}
`;
