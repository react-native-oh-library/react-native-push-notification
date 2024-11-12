import { RNPackage, TurboModulesFactory } from '@rnoh/react-native-openharmony/ts';
import type { TurboModule, TurboModuleContext } from '@rnoh/react-native-openharmony/ts';
import { PushNotificationTurboModule } from './PushNotificationTurboModule';

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
