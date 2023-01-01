import { Session } from 'express-session';

export type ReqSession = Session & Record<'session', any>;
