import $ from 'cafy';
import { ID } from '~/misc/cafy-id';
import define from '~/server/api/define';
import { PageLikes } from '~/models';
import { makePaginationQuery } from '~/server/api/common/make-pagination-query';

export const meta = {
	desc: {
		'ja-JP': '「いいね」したページ一覧を取得します。',
		'en-US': 'Get liked pages'
	},

	tags: ['account', 'pages'],

	requireCredential: true,

	kind: 'read:page-likes',

	params: {
		limit: {
			validator: $.optional.num.range(1, 100),
			default: 10
		},

		sinceId: {
			validator: $.optional.type(ID),
		},

		untilId: {
			validator: $.optional.type(ID),
		},
	}
};

export default define(meta, async (ps, user) => {
	const query = makePaginationQuery(PageLikes.createQueryBuilder('like'), ps.sinceId, ps.untilId)
		.andWhere(`like.userId = :meId`, { meId: user.id })
		.leftJoinAndSelect('like.page', 'page');

	const likes = await query
		.take(ps.limit!)
		.getMany();

	return await PageLikes.packMany(likes, user);
});
