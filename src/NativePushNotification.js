import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';
import { NotificationRequest } from '../js/types';


export interface Spec extends TurboModule {
    addNotificationRequest(notificationRequest: NotificationRequest): void;
    removeAllDeliveredNotifications(): void;
    setApplicationIconBadgeNumber(badgeNumber: number): void;
    removeDeliveredNotifications(identifiers: Array<string>): void;
    getDeliveredNotifications(callback: (result?: Array<object>) => void): void
}


const PushNotificationTurboModule = TurboModuleRegistry.get<Spec>('PushNotificationTurboModule')

export default PushNotificationTurboModule;