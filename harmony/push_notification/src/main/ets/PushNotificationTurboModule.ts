import { TurboModule } from 'rnoh/ts';
import notificationManager from '@ohos.notificationManager';
import { NotificationRequest } from './NotificationRequest'
import { ConvertUtils } from './ConvertUtils'

export class PushNotificationTurboModule extends TurboModule {
  utils: ConvertUtils = new ConvertUtils();

  addNotificationRequest(request: NotificationRequest) {
    this.utils.convertNotification(request).then((data) => {
      if (data) {
        notificationManager.publish(data, (err) => {
          if (err) {
            console.error(`publish failed, code is ${err.code}, message is ${err.message}`);
          } else {
            console.info("publish success");
          }
        });
      } else {
        console.error("publish failed");
      }
    })
  }

  removeDeliveredNotifications(identifiers: Array<string>) {
    for (let i = 0; i < identifiers.length; i++) {
      let data = identifiers[i];
      let id = this.utils.parsePositiveInteger(data);

      notificationManager.cancel(id, (err) => {
        if (err) {
          console.error(`cancel failed, code is ${err.code}, message is ${err.message}`);
        } else {
          console.info("cancel success");
        }
      })
    }
  }

  removeAllDeliveredNotifications() {
    notificationManager.cancelAll((err) => {
      if (err) {
        console.error(`cancelAll failed, code is ${err.code}, message is ${err.message}`);
      } else {
        console.info("cancelAll success");
      }
    });
  }

  setApplicationIconBadgeNumber(badgeNumber: number) {
    notificationManager.setBadgeNumber(badgeNumber, (err) => {
      if (err) {
        console.error(`setBadge fail: ${JSON.stringify(err)}`);
      } else {
        console.info("setBadge success");
      }
    })
  }

  getDeliveredNotifications(callback: (result?: Array<object>) => void) {
    notificationManager.getActiveNotifications().then((data) => {
      let newArray = this.utils.transformArray(data)
      callback(newArray);
    })
  }
}