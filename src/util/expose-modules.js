import isFunction from 'lodash/lang/isFunction';

export default function exposeModules(target, reactor, modules) {
  Object.keys(modules).forEach(name => {
    const module = modules[name];

    if ('register' in module) {
      module.register(reactor);
    }

    if ('getters' in module) {
      const gettersKey = `${name}Getters`;
      target[gettersKey] = module.getters;
    }

    if ('actions' in module) {
      const actionsKey = `${name}Actions`;
      const actions = {};

      Object.getOwnPropertyNames(module.actions).forEach(actionKey => {
        if (isFunction(module.actions[actionKey])) {
          actions[actionKey] = module.actions[actionKey].bind(null, reactor);
        }
      });

      target[actionsKey] = actions;
    }
  });
}
