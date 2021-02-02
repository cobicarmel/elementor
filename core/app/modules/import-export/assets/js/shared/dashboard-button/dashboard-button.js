import Button from 'elementor-app/ui/molecules/button';

import useLink from '../../hooks/use-link/use-link';

export default function DashboardButton() {
	const { action } = useLink();

	return (
		<Button
			variant="contained"
			text={ __( 'Back to dashboard', 'elementor' ) }
			color="primary"
			onClick={ action.backToDashboard }
		/>
	);
}