import {RNPackage, TurboModulesFactory} from 'rnoh/ts';
import type {TurboModule, TurboModuleContext} from 'rnoh/ts';
import {PushNotificationTurboModule} from './PushNotificationTurboModule';

class PushNotificationTurboModulesFactory extends TurboModulesFactory {
  createTurboModule(name: string): TurboModule | null {
    if (name === 'PushNotificationTurboModule') {
      return new PushNotificationTurboModule(this.ctx);
    }
    return null;
  }

  hasTurboModule(name: string): boolean {
    return name === 'PushNotificationTurboModule';
  }
}

export class PushNotificationPackage extends RNPackage {
  createTurboModulesFactory(ctx: TurboModuleContext): TurboModulesFactory {
    return new PushNotificationTurboModulesFactory(ctx);
  }
}
