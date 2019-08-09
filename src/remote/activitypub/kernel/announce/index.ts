import Resolver from '~/remote/activitypub/resolver';
import { IRemoteUser } from '~/models/entities/user';
import announceNote from './note';
import { IAnnounce, INote, validPost, getApId } from '~/remote/activitypub/type';
import { apLogger } from '~/remote/activitypub/logger';

const logger = apLogger;

export default async (actor: IRemoteUser, activity: IAnnounce): Promise<void> => {
	const uri = getApId(activity);

	logger.info(`Announce: ${uri}`);

	const resolver = new Resolver();

	let object;

	try {
		object = await resolver.resolve(activity.object);
	} catch (e) {
		logger.error(`Resolution failed: ${e}`);
		throw e;
	}

	if (validPost.includes(object.type)) {
		announceNote(resolver, actor, activity, object as INote);
	} else {
		logger.warn(`Unknown announce type: ${object.type}`);
	}
};
