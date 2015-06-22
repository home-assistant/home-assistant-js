import { createApiActions } from '../rest-api';
import model from './model';

const entityApiActions = createApiActions(model);

export default entityApiActions;
