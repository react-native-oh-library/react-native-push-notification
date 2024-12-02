// Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file.

#pragma once
#include "RNOH/Package.h"
#include "PushNotificationTurboModule.h"

using namespace rnoh;
using namespace facebook;

class PushNotificatonTurboModuleFactoryDelegate : public TurboModuleFactoryDelegate {
public:
    SharedTurboModule createTurboModule(Context ctx, const std::string &name) const override {
        if (name == "PushNotificationTurboModule") {
            return std::make_shared<PushNotificationTurboModule>(ctx, name);
        }
        return nullptr;
    };
};

namespace rnoh {

    class PushNotificationPackage : public Package {
    public:
        PushNotificationPackage(Package::Context ctx) : Package(ctx) {}

        std::unique_ptr<TurboModuleFactoryDelegate> createTurboModuleFactoryDelegate() override {
            return std::make_unique<PushNotificatonTurboModuleFactoryDelegate>();
        }
    };
} // namespace rnoh