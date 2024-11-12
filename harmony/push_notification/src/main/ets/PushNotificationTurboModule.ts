/**
 * MIT License
 *
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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