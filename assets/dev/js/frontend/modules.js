import elementorModules from '../modules/modules';
import Document from './document';
import InteractionsBaseAction from './interactions/actions/base';
import StretchElement from './tools/stretch-element';

elementorModules.frontend = {
	Document: Document,
	tools: {
		StretchElement: StretchElement,
	},
	interactions: {
		actions: {
			Base: InteractionsBaseAction,
		},
	},
};
