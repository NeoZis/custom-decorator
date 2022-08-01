import { Component as ComponentDecoratorBase, Vue } from 'vue-property-decorator';

import type { ComponentOptions } from 'vue';
import type { VueClass } from 'vue-class-component/lib/declarations';

type LifecycleHooks =
  | 'beforeCreate'
  | 'created'
  | 'beforeMount'
  | 'mounted'
  | 'beforeUpdate'
  | 'updated'
  | 'beforeDestroy'
  | 'destroyed'
  | 'activated'
  | 'deactivated';

type NewComponentOptions<V extends Vue> = ComponentOptions<V> & {
  extendConfig?: { chained?: LifecycleHooks[]; override?: LifecycleHooks[]; }
}

type LayoutDecorator<V extends Vue> = <VC extends VueClass<V>>(target: VC) => VC;

export function Component<V extends Vue>(options?: NewComponentOptions<V>): LayoutDecorator<V> {
  const componentOptions = options ?? {};

  return function decorator(object) {
    if (options?.extendConfig) {
      const proto = Object.getPrototypeOf(object);

      if (options.extendConfig.chained?.length) {
        setChainedProperties(object, proto, options.extendConfig.chained);
      }
      if (options.extendConfig.override?.length) {
        overrideProperties(object, proto, options.extendConfig.override);
      }
    }

    return ComponentDecoratorBase(componentOptions)(object);
  };
}

function setChainedProperties(object: VueClass<Vue>, proto: any, keys: string[]): void {
  for (const key of keys) {
    if (object.prototype[key]) {
      proto.options[key] ??= [];

      const hooks = [...proto.options[key], object.prototype[key]];

      const composeAsync = async () => {
        for (const f of hooks) {
          await f();
        }
      };

      proto.options[key] = [composeAsync];

      delete object.prototype[key];
    }
  }
}

function overrideProperties(object: VueClass<Vue>, proto: any, keys: string[]): void {
  for (const key of keys) {
    if (object.prototype[key]) {
      proto.options[key] = [object.prototype[key]];

      delete object.prototype[key];
    }
  }
}
