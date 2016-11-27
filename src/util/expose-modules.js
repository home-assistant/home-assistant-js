export default function exposeModules(target, reactor, modules) {
  Object.keys(modules).forEach((name) => {
    const module = modules[name];

    if ('register' in module) {
      module.register(reactor);
    }

    if ('getters' in module) {
      Object.defineProperty(target, `${name}Getters`, {
        value: module.getters,
        enumerable: true,
      });
    }

    if ('actions' in module) {
      const actions = {};

      Object.getOwnPropertyNames(module.actions).forEach((actionKey) => {
        if (typeof module.actions[actionKey] === 'function') {
          Object.defineProperty(actions, actionKey, {
            value: module.actions[actionKey].bind(null, reactor),
            enumerable: true,
          });
        }
      });

      Object.defineProperty(target, `${name}Actions`, {
        value: actions,
        enumerable: true,
      });
    }
  });
}
