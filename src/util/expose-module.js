export default function exposeModule(target, reactor, name, module) {
  if ('register' in module) {
    module.register(reactor);
  }

  if ('getters' in module) {
    const gettersKey = `${name}Getters`;
    target[gettersKey] = module.getters;
  }

  if ('actions' in module) {
    const actionsKey = `${name}Actions`;
    const actions = {}

    Object.getOwnPropertyNames(module.actions).forEach(actionKey => {
      if (actionKey === '__esModule') {
        return
      }
      actions[actionKey] = module.actions[actionKey].bind(null, reactor);
    })

    target[actionsKey] = actions;
  }
}
