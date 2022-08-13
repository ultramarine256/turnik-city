import { connect as mongooseConnect } from 'mongoose';

const MONGO_CONN_STR = process.env.MONGO_CONNECTION_STRING;

export async function connect() {
  try {
    await mongooseConnect(MONGO_CONN_STR);
  } catch (e) {
    console.error('⛔', e);
  }
}
