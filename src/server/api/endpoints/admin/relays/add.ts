import $ from 'cafy';
import define from '../../../define';
import { addRelay } from '../../../../../services/relay';

export const meta = {
	desc: {
		'ja-JP': 'Add relay'
	},

	tags: ['admin'],

	requireCredential: true as const,
	requireModerator: true as const,

	params: {
		inbox: {
			validator: $.str
		},
	},
};

export default define(meta, async (ps, user) => {
	return await addRelay(ps.inbox);
});
