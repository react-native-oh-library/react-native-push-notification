// Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.

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
