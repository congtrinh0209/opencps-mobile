<template>
  <Page actionBarHidden="true">
    <Gridlayout class="login_page" rows="1*, 7*">
      <Stacklayout row="1">
        <Image class="login_logo" src="~/assets/images/login_logo.png"></Image>
        <Stacklayout class="login_input_width">
          <AbsoluteLayout width="100%">
            <TextField
              left="0"
              class="login_input"
              hint="Tên đăng nhập"
              keyboardType="email"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="email"
              returnKeyType="next"
              width="90%"
            ></TextField>
            <Label left="30" top="15">
              <FormattedString>
                <Label text.decode="&#xf007;" class="fas black"></Label>
              </FormattedString>
            </Label>
          </AbsoluteLayout>
          <AbsoluteLayout width="100%" marginTop="10">
            <TextField
              left="0"
              class="login_input"
              hint="Mật khẩu"
              keyboardType="email"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="password"
              returnKeyType="next"
              width="90%"
              style="background-color: white;"
              secure="true"
            ></TextField>
            <Label left="30" top="15">
              <FormattedString>
                <Label text.decode="&#xf11c;" class="fas black"></Label>
              </FormattedString>
            </Label>
          </AbsoluteLayout>
          <GridLayout
            columns="2*,3*,5*"
            height="50"
            width="80%"
            style="margin-top: 20"
          >
            <Stacklayout col="0">
              <CheckBox
                checked="true"
                class="transparent textWhite"
                fillColor="white"
                style="opacity: 0.7"
                fontSize="16"
              />
            </Stacklayout>
            <Label
              col="1"
              text="Ghi nhớ?"
              style="
                color: white;
                margin-left: -5;
                font-size: 14;
                padding-bottom: 15;
              "
            ></Label>
            <Label
              col="2"
              text="Quên mật khẩu?"
              class="forgotPassword"
              style="padding-bottom: 15"
            >
            </Label>
          </GridLayout>
          <Button
            text="Đăng nhập"
            :isEnabled="!processing"
            @tap="submit"
            height="35"
            width="90%"
            class="btn-login textWhite"
            style="margin-top: 20"
          ></Button>
        </Stacklayout>
      </Stacklayout>
    </Gridlayout>
  </Page>
</template>

<script>
import HomeController from "./HomeController";
import { Connectivity } from "@nativescript/core";

import { Http, HttpResponse } from "@nativescript/core";
import {
  getBoolean,
  setBoolean,
  setString,
} from "@nativescript/core/application-settings";
export default {
  data() {
    return {
      networkStatus: "",
      isLoggingIn: true,
      processing: false,
      email: "congdan01",
      password: "Abc@1234"
    };
  },
  created() {
    let vm = this;
    console.log("isIOS", vm.isIOS);
    console.log("isAndroid", vm.isAndroid);
    console.log("deviceType", vm.deviceType);
    console.log("osVersion", vm.osVersion);
  },
  methods: {
    checkNetwork() {
      const connectionType = Connectivity.getConnectionType();
      switch (connectionType) {
        case Connectivity.connectionType.none:
          return false;
        case Connectivity.connectionType.wifi:
          return true;
        case Connectivity.connectionType.mobile:
          return true;
      }
    },
    alert(message) {
      return alert({
        title: "Không có kết nối Internet",
        okButtonText: "OK",
        message: message,
      });
    },
    submit() {
      let vm = this
      if (vm.email && vm.password) {
        if (this.checkNetwork() == false) {
          alert("Vui lòng kiểm tra lại đường truyền mạng của bạn!");
        } else {
          vm.processing = true
          let dataAction = {
            "username": String(vm.email).trim(),
            "password": String(vm.password).trim(),
            "app": "dvc-mobile"
          }
          vm.$store.dispatch("login", dataAction).then(function (result) {
            vm.processing = false
            if (result.statusCode == 200) {
              let tokenInfo = result.data.toJSON()
              let token = tokenInfo.access_token
              setString("Token", token)
              setBoolean("isLogin", true)
              setString("UserName", String(vm.email).trim())
              vm.$navigateTo(HomeController, { clearHistory: true });
              let dataAuth = {
                "Content-Type": "application/json",
                "secret": "kXS2AtaZUmcfy1rMZbgS+4XF0mv+79LT",
                "Token": token,
                "Authorization": "Bearer " + token
              }
              vm.$store.dispatch("getUserDetail", dataAuth).then(function (result) {
                let data = result.data.toJSON()
                setString("UserInfo", JSON.stringify(data))
              })
            } else {
              alert({
                title: "Đăng nhập thất bại",
                message: "",
                okButtonText: "OK"
              }).then(() => {
              })
            }
          }).catch(function () {
            vm.processing = false
          })
        }
      }
    },
  },
};
</script>

<style>
</style>