// Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.

import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import notificationManager from '@ohos.notificationManager';
import { NotificationRequest } from './NotificationRequest';
import { ConvertUtils } from './ConvertUtils';
import Logger from './Logger';

export class PushNotificationTurboModule extends TurboModule {
  private TAG: string = "PushNotificationTurboModule";
  utils: ConvertUtils = new ConvertUtils();

  addNotificationRequest(request: NotificationRequest) {
    this.utils.convertNotification(request).then((data) => {
      if (data) {
        notificationManager.publish(data, (err) => {
          if (err) {
            Logger.info(this.TAG, `publish failed, code is ${err.code}, message is ${err.message}`);
          } else {
            Logger.info(this.TAG, "publish success");
          }
        });
      } else {
        Logger.info(this.TAG, "publish failed");
      }
    })
  }

  removeDeliveredNotifications(identifiers: Array<string>) {
    for (let i = 0; i < identifiers.length; i++) {
      let data = identifiers[i];
      let id = this.utils.parsePositiveInteger(data);

      notificationManager.cancel(id, (err) => {
        if (err) {
          Logger.info(this.TAG, `cancel failed, code is ${err.code}, message is ${err.message}`);
        } else {
          Logger.info(this.TAG, "cancel success");
        }
      })
    }
  }

  removeAllDeliveredNotifications() {
    notificationManager.cancelAll((err) => {
      if (err) {
        Logger.info(this.TAG, `cancelAll failed, code is ${err.code}, message is ${err.message}`);
      } else {
        Logger.info(this.TAG, "cancelAll success");
      }
    });
  }

  setApplicationIconBadgeNumber(badgeNumber: number) {
    notificationManager.setBadgeNumber(badgeNumber, (err) => {
      if (err) {
        Logger.info(this.TAG, `setBadge fail: ${JSON.stringify(err)}`);
      } else {
        Logger.info(this.TAG, "setBadge success");
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