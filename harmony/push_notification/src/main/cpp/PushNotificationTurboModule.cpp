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

#include "PushNotificationTurboModule.h"
#include "RNOH/ArkTSTurboModule.h"

using namespace rnoh;
using namespace facebook;

static jsi::Value __hostFunction_PushNotificationTurboModule_removeAllDeliveredNotifications(
    jsi::Runtime &rt, 
    react::TurboModule &turboModule, 
    const jsi::Value *args, 
    size_t count) {
    return jsi::Value(static_cast<ArkTSTurboModule &>(turboModule).call(rt, "removeAllDeliveredNotifications", args, count));
}

static jsi::Value __hostFunction_PushNotificationTurboModule_removeDeliveredNotifications(
    jsi::Runtime &rt,
    react::TurboModule &turboModule,
    const jsi::Value *args,
    size_t count) {
    return jsi::Value(static_cast<ArkTSTurboModule &>(turboModule).call(rt, "removeDeliveredNotifications", args, count));
}

static jsi::Value __hostFunction_PushNotificationTurboModule_addNotificationRequest(
    jsi::Runtime &rt,
    react::TurboModule &turboModule,
    const jsi::Value *args,
    size_t count) {
    return jsi::Value(static_cast<ArkTSTurboModule &>(turboModule).call(rt, "addNotificationRequest", args, count));
}

static jsi::Value __hostFunction_PushNotificationTurboModule_setApplicationIconBadgeNumber(
    jsi::Runtime &rt,
    react::TurboModule &turboModule,
    const jsi::Value *args,
    size_t count) {
    return jsi::Value(static_cast<ArkTSTurboModule &>(turboModule).call(rt, "setApplicationIconBadgeNumber", args, count));
}

static jsi::Value __hostFunction_PushNotificationTurboModule_getDeliveredNotifications(
    jsi::Runtime &rt,
    react::TurboModule &turboModule,
    const jsi::Value *args,
    size_t count) {
    return jsi::Value(static_cast<ArkTSTurboModule &>(turboModule).call(rt, "getDeliveredNotifications", args, count));
}

PushNotificationTurboModule::PushNotificationTurboModule(const ArkTSTurboModule::Context ctx, const std::string name)
  : ArkTSTurboModule(ctx, name) {
  methodMap_["removeAllDeliveredNotifications"] = MethodMetadata {0, __hostFunction_PushNotificationTurboModule_removeAllDeliveredNotifications};
  methodMap_["removeDeliveredNotifications"] = MethodMetadata {1, __hostFunction_PushNotificationTurboModule_removeDeliveredNotifications};
  methodMap_["addNotificationRequest"] = MethodMetadata {1, __hostFunction_PushNotificationTurboModule_addNotificationRequest};
  methodMap_["setApplicationIconBadgeNumber"] = MethodMetadata {1, __hostFunction_PushNotificationTurboModule_setApplicationIconBadgeNumber};
  methodMap_["getDeliveredNotifications"] = MethodMetadata {1, __hostFunction_PushNotificationTurboModule_getDeliveredNotifications};
}
