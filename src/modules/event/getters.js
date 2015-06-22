import { createByIdGetter, createEntityMapGetter, createHasDataGetter } from '../rest-api';
import model from './model';

export const hasData = createHasDataGetter(model);

export const entityMap = createEntityMapGetter(model);

export const byId = createByIdGetter(model);
