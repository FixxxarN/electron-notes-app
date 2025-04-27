import { useCallback, useState } from 'react';

const useHovering = () => {
	const [hovering, setHovering] = useState(false);
	const handleMouseEnter = useCallback(() => {
		setHovering(true);
	}, [setHovering]);

	const handleMouseLeave = useCallback(() => {
		setHovering(false);
	}, [setHovering]);

	return { hovering, handleMouseEnter, handleMouseLeave };
};

export default useHovering;
