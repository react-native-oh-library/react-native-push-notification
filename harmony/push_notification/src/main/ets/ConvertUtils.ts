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

import notificationManager from '@ohos.notificationManager';
import { NotificationRequest, NotificationItem } from './NotificationRequest'

export class ConvertUtils {
  private id: number;

  private title: string;

  private subtitle: string;

  private body: string;

  private deliverTime: number;

  private badge: number;

  private localContent: notificationManager.NotificationContent;

  private slotType: notificationManager.SlotType;

  private notificationRequest: notificationManager.NotificationRequest;

  private extraInfo: {
    [key: string]: any;
  }

  private beijingOffset = 8 * 60 * 60 * 1000;

  constructor() {
    this.notificationRequest = {
      content: undefined
    };

    this.extraInfo = {};
  }

  // ... (其他方法)

  convertNotification(request: NotificationRequest): Promise<notificationManager.NotificationRequest> {
    return new Promise((resolve, reject) => {
      try {
        this.getLocalRequest(request);
        resolve(this.notificationRequest);
        this.clearState();
      } catch (err) {
        console.error('Error', err);
        reject(err);
      }
    });
  }

  getLocalRequest(request: NotificationRequest) {
    if (!this.isNullOrUndefined(request.title) && !this.isNullOrUndefined(request.body)) {
      this.title = request.title;
      this.body = request.body;
    } else {
      throw new Error('The parameter cannot be null or undefined');
    }

    this.localContent = this.getContentType(request.subtitle);
    this.notificationRequest = { ...this.notificationRequest, content: this.localContent };

    if (!this.isNullOrUndefined(request.id)) {
      this.id = this.parsePositiveInteger(request.id);
      this.notificationRequest = { ...this.notificationRequest, id: this.id };
    }

    if (!this.isNullOrUndefined(request.fireDate)) {
      const date = new Date(request.fireDate);
      this.deliverTime = date.getTime() + this.beijingOffset;
      this.notificationRequest = { ...this.notificationRequest, deliveryTime: this.deliverTime };
    }

    if (!this.isNullOrUndefined(request.badge)) {
      this.badge = request.badge
      this.notificationRequest = { ...this.notificationRequest, badgeNumber: this.badge };
    }

    if (!this.isNullOrUndefined(request.userInfo)) {
      this.convertUserInfo(request.userInfo);
      this.notificationRequest = { ...this.notificationRequest, extraInfo: this.extraInfo };
    }

    if (!this.isNullOrUndefined(request.isSilent)) {
      if (request.isSilent) {
        this.slotType = notificationManager.SlotType.CONTENT_INFORMATION;
        this.notificationRequest = { ...this.notificationRequest, notificationSlotType: this.slotType };
      } else {
        this.slotType = notificationManager.SlotType.SOCIAL_COMMUNICATION;
        this.notificationRequest = { ...this.notificationRequest, notificationSlotType: this.slotType };
      }
    } else {
      this.slotType = notificationManager.SlotType.SERVICE_INFORMATION;
      this.notificationRequest = { ...this.notificationRequest, notificationSlotType: this.slotType };
    }

    if (!this.isNullOrUndefined(request.repeats)) {
      if (!request.repeats) {
        this.notificationRequest = { ...this.notificationRequest, isAlertOnce: true };
      } else {
        this.notificationRequest = { ...this.notificationRequest, isAlertOnce: false };
      }
    }
  }

  isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined || value === "";
  }

  stringToAsciiArray(str: string): number[] {
    return str.split('').map((char) => char.charCodeAt(0));
  }

  parsePositiveInteger(str: string): number {
    let num = parseInt(str);
    if (!isNaN(num) && num > 0 && num.toString() === str) {
      return num;
    }
    let asciiCodes = this.stringToAsciiArray(str)
    num = asciiCodes.length + asciiCodes[0] + asciiCodes[asciiCodes.length - 1];
    return num;
  }

  convertUserInfo(obj: object) {
    Object.keys(obj).forEach(key => {
      this.extraInfo[key] = String(obj[key]);
    });
  }

  clearState() {
    this.id = undefined;
    this.title = undefined;
    this.subtitle = undefined;
    this.body = undefined;
    this.deliverTime = undefined;
    this.badge = undefined;
    this.localContent = undefined;
    this.slotType = undefined;
    this.extraInfo = {};
    this.notificationRequest = {
      content: undefined
    }
  }

  getContentType(subtitle: string): notificationManager.NotificationContent {
    if (subtitle) {
      this.subtitle = subtitle;
      return {
        notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_MULTILINE,
        multiLine: {
          title: this.title,
          text: this.body,
          briefText: this.subtitle,
          longTitle: this.title,
          lines: [this.subtitle, this.body]
        }
      }
    } else {
      return {
        notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
        normal: {
          title: this.title,
          text: this.body,
        }
      }
    }
  }

  transformArray(items: Array<notificationManager.NotificationRequest>): Array<NotificationItem> {
    return items.reduce((newArray: Array<NotificationItem>, item) => {
      if (!this.isNullOrUndefined(item.content.multiLine)) {
        if (item.extraInfo != null) {
          newArray.push({
            id: item.id,
            title: item.content.multiLine.title,
            body: item.content.multiLine.text,
            userInfo: item.extraInfo
          });
        } else {
          newArray.push({
            id: item.id,
            title: item.content.multiLine.title,
            body: item.content.multiLine.text
          });
        }
      } else {
        if (item.extraInfo != null) {
          newArray.push({
            id: item.id,
            title: item.content.normal.title,
            body: item.content.normal.text,
            userInfo: item.extraInfo
          });
        } else {
          newArray.push({
            id: item.id,
            title: item.content.normal.title,
            body: item.content.normal.text
          });
        }
      }
      return newArray;
    }, []);
  }

  // ... (其他方法)
}