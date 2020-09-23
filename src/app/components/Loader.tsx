// react
import React, { FC } from 'react';

// material
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader: FC = () => {
	return (
		<div className="wf-loader">
			<CircularProgress color="secondary" />
		</div>
	);
};
export default Loader;
