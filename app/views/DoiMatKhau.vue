<template>
  <Page>
    <ActionBar title="Đổi mật khẩu" class="uppercase action-bar">
      <NavigationButton  />
    </ActionBar>
    <Stacklayout class="backgroundGrey">
      <Stacklayout class="backgroundWhite editform">
        <Label text="Mật khẩu hiện tại" class="font14"></Label>
        <TextField
          hint="Nhập mật khẩu hiện tại"
          width="90%"
          class="editforminput"
          v-model="matKhauHienTai"
        ></TextField>
        <Label text="Mật khẩu mới" class="font14"></Label>
        <TextField
          hint="Nhập mật khẩu mới"
          width="90%"
          class="editforminput"
          v-model="matKhauMoi"
        ></TextField>
        <Label text="Nhập lại mật khẩu mới" class="font14"></Label>
        <TextField
          hint="Nhập lại mật khẩu mới"
          width="90%"
          class="editforminput"
          v-model="matKhauMoiAgain"
        ></TextField>
        <!-- <Label text="Mã captcha" class="font14"></Label>
        <GridLayout columns="5*,4*,1*" height="50" width="100%">
          <TextField
            col="0"
            hint="Nhập mã"
            width="90%"
            class="editforminput"
          ></TextField>
          <Image
            col="1"
            height="35"
            style="margin: 0 5"
            src="~/assets/images/captcha.png"
          ></Image>
          <Button
            col="2"
            row="0"
            @tap="resetCaptcha"
            style="margin: 0; padding: 0"
          >
            <FormattedString>
              <Label text.decode="&#xf0e2;" class="fas h1"></Label>
            </FormattedString>
          </Button>
        </GridLayout> -->
        <GridLayout columns="6*,4*" height="50" style="margin-top: 10">
          <Stacklayout col="0" orientation="horizontal">
            <Button
              text="Hủy"
              :isEnabled="!processing"
              @tap="goBack"
              class="ediformhuy"
              style="
                border-width: 1;
                margin-left: 0;
                border-radius: 15;
                border-color: #ec860f;
              "
              height="40"
            >
            </Button>
            <Button
              text="Cập nhật"
              :isEnabled="!processing"
              @tap="updatePassword"
              class="btn-chinhsua textWhite"
              style="margin-left: 10; padding:0 10"
              height="40"
            >
            </Button>
          </Stacklayout>
          <!-- <Label
            col="1"
            text="Quên mật khẩu?"
            class="font14"
            style="text-align: right"
          ></Label> -->
        </GridLayout>
      </Stacklayout>
    </Stacklayout>
  </Page>
</template>

<script>
import HomeController from "./HomeController"
import Login from "./login"
import {
  setBoolean,
  setString,
  getString,
} from "@nativescript/core/application-settings";
import { parsePercentageOrLength } from '@nativescript/core/css/parser';
const ThongBao = {
  props: ['message'],
  template: `
    <StackLayout class="p-10" backgroundColor="white">
      <Label textWrap="true">
        <FormattedString>
          <Span
            :text="message"
            class="uppercase"
            style="color: #EC860F;font-size: 16"
          ></Span>
        </FormattedString>
      </Label>
      <Stacklayout class="locThuTuc" style="margin-left: 0; margin-top: 10">
          <Button  horizontalAlignment="center"
            text="Đồng ý"
            @tap="goToLogin()"
            class="btn-chinhsua textWhite padding20"
          >
          </Button>
      </Stacklayout>
    </StackLayout>
  `,
  methods: {
    goToLogin () {
      let vm = this
      vm.$modal.close({})
      if (vm.changeSuccess) {
        setBoolean("isLogin", false);
        setString("Token", "");
        vm.$navigateTo(Login, { clearHistory: true });
      }      
    }
  }
};
export default {
  data() {
    return {
      processing: false,
      matKhauHienTai: '',
      matKhauMoi: '',
      tenDangNhap: '',
      matKhauMoiAgain: '',
      changeSuccess: false
    };
  },
  methods: {
    goBack() {
      this.$navigateTo(HomeController, 
        { clearHistory: false, 
          props: {
            pageName: 'nguoidung'
          }
        });
    },
    updatePassword () {
      let vm = this
      let token = getString('Token')
      let tenDangNhap = getString('UserName')
      vm.matKhauHienTai = String(vm.matKhauHienTai).trim()
      vm.matKhauMoi = String(vm.matKhauMoi).trim()
      vm.matKhauMoiAgain = String(vm.matKhauMoiAgain).trim()
      if (vm.matKhauMoi == vm.matKhauMoiAgain) {
        let filterGetService = {
          headers: {
            "Content-Type": "application/json",
            "secret": "kXS2AtaZUmcfy1rMZbgS+4XF0mv+79LT",
            "Authorization": "Bearer " + token
          },
          body: {
            "matKhauHienTai": vm.matKhauHienTai,
            "matKhauMoi": vm.matKhauMoi,
            "tenDangNhap": tenDangNhap
          },
        };
        console.log('filterGetService', filterGetService)
        vm.$store
          .dispatch("changePassword", filterGetService)
          .then(function (result) {
            let data = result.data.toJSON()
            console.log('dataChangePass', data)
            if (result.statusCode == 200) {
              vm.changeSuccess = true
              vm.$showModal(ThongBao, { props: { message: 'Đổi mật khẩu thành công. Đăng nhập lại với mật khẩu mới' }})
            } else {
              vm.changeSuccess = false
              vm.$showModal(ThongBao, { props: { message: 'Đổi mật khẩu không thành công.' }})
            }
          });
      } else {
        alert('Mật khẩu mới không trùng nhau')
      }
    }
  },
};
</script>
<style>
</style>