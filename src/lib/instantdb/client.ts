import { init } from '@instantdb/core';
import { PUBLIC_INSTANTDB_APP_ID } from '$env/static/public';

export const db = init({
	appId: PUBLIC_INSTANTDB_APP_ID
});
