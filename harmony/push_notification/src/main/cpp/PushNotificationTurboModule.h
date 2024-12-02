// Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.

#pragma once

#include <ReactCommon/TurboModule.h>
#include "RNOH/ArkTSTurboModule.h"


namespace rnoh {
    /**
     * JNI C++ class for module 'NativePushNotificationModule'
     */
    class JSI_EXPORT PushNotificationTurboModule : public ArkTSTurboModule {
    public:
        PushNotificationTurboModule(const ArkTSTurboModule::Context ctx, const std::string name);
    };
} // namespace rnoh
