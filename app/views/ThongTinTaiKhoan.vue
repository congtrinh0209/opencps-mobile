<template>
  <FlexboxLayout class="page backgroundGrey" style="width: 100%; height: 100%">
    <!-- <GridLayout
      class="top-banner"
      width="100%"
      height="20%"
      orientation="horizontal"
      columns="1*, 9*"
      rows="3*,*"
      style="padding: 0 10 0 20; z-index: 1"
    >
      <Button
        col="0"
        class="transparent"
        style="padding: 0; margin: 0"
        @tap="toggleDrawer()"
      >
        <FormattedString>
          <Label
            text.decode="&#xf036;"
            class="fas textWhite"
            style="font-size: 25"
          ></Label>
        </FormattedString>
      </Button>
      <Image
        col="1"
        class="login_logo"
        src="~/assets/images/banner-dvc.png"
      ></Image>
    </GridLayout> -->
    <Stacklayout class="backgroundGrey" v-if="accountType === 'canhan'">
      <Stacklayout class="account-detail" marginTop="0">
        <StackLayout style="padding-left: 20; padding-top: 10; padding-bottom: 10;">
          <Label :textWrap="true" class="account-name" :text="account.hoVaTen"></Label>
          <Label class="account-position" text="Cá nhân"></Label>
        </StackLayout>
        <Label textWrap="true" class="padding20 backgroundWhite">
          <FormattedString>
            <Span text="Số CMND/ CCCD \t" class="font13 bold"></Span>
            <Span :text="account.maSoCaNhan" class="font13"></Span>
          </FormattedString>
        </Label>
        <Label textWrap="true" class="padding20">
          <FormattedString>
            <Span text="Ngày sinh \t" class="font13 bold"></Span>
            <Span :text="dateLocale(account.ngaySinh)" class="font13"></Span>
          </FormattedString>
        </Label>
        <Label textWrap="true" class="padding20 backgroundWhite">
          <FormattedString>
            <Span text="Email \t" class="font13 bold"></Span>
            <Span :text="account.danhBaLienLac.thuDienTu" class="font13"></Span>
          </FormattedString>
        </Label>
        <Label textWrap="true" class="padding20">
          <FormattedString>
            <Span text="Điện thoại \t" class="font13 bold"></Span>
            <Span :text="account.danhBaLienLac.soDienThoai" class="font13"></Span>
          </FormattedString>
        </Label>
        <Label textWrap="true" class="padding20 backgroundWhite">
          <FormattedString>
            <Span text="Địa chỉ \n" class="font13 bold"></Span>
            <Span
              :text="
                account['noiOHienTai']['soNhaChiTiet'] +
                ', ' +
                account['noiOHienTai']['phuongXa']['tenMuc'] +
                ', ' +
                account['noiOHienTai']['quanHuyen']['tenMuc'] +
                ', ' +
                account['noiOHienTai']['tinhThanh']['tenMuc']
              "
              class="font13 lineheight5"
            ></Span>
          </FormattedString>
        </Label>
        <Stacklayout orientation="horizontal" style="margin-top: 10">
          <!-- <Button
            text="Chỉnh sửa"
            :isEnabled="!processing"
            @tap="chinhsua"
            class="btn-chinhsua textWhite"
            height="40"
          >
          </Button> -->
          <Button
            text="Đổi mật khẩu"
            :isEnabled="!processing"
            @tap="doimatkhau"
            class="btn-chinhsua textWhite"
            height="40"
          >
          </Button>
        </Stacklayout>
      </Stacklayout>
    </Stacklayout>
    <Stacklayout class="backgroundGrey" v-if="accountType === 'doanhnghiep'">
      <Stacklayout class="account-detail" marginTop="0">
        <StackLayout col="0" style="padding-left: 20; padding-top: 10; padding-bottom: 10;">
          <Label class="account-name" :text="account.applicantName"></Label>
          <Label class="account-position" text="Doanh nghiệp, tổ chức"></Label>
        </StackLayout>
        <Label textWrap="true" class="padding20 backgroundWhite">
          <FormattedString>
            <Span text="Số CMND/ CCCD \t" class="font13 bold"></Span>
            <Span :text="account.applicantIdNo" class="font13"></Span>
          </FormattedString>
        </Label>
        <Label textWrap="true" class="padding20">
          <FormattedString>
            <Span text="Ngày cấp CMND/ CCCD \t" class="font13 bold"></Span>
            <Span :text="account.applicantIdDateString" class="font13"></Span>
          </FormattedString>
        </Label>
        <Label textWrap="true" class="padding20 backgroundWhite">
          <FormattedString>
            <Span text="Email \t" class="font13 bold"></Span>
            <Span :text="account.applicantContactEmail" class="font13"></Span>
          </FormattedString>
        </Label>
        <Label textWrap="true" class="padding20">
          <FormattedString>
            <Span text="Điện thoại \t" class="font13 bold"></Span>
            <Span :text="account.applicantContactTelNo" class="font13"></Span>
          </FormattedString>
        </Label>
        <Label textWrap="true" class="padding20 backgroundWhite">
          <FormattedString>
            <Span text="Địa chỉ \n" class="font13 bold"></Span>
            <Span
              :text="
                account.applicantAddress +
                ', ' +
                account.applicantWardName +
                ', ' +
                account.applicantDistrictName +
                ', ' +
                account.applicantCityName
              "
              class="font13 lineheight5"
            ></Span>
          </FormattedString>
        </Label>
        <Stacklayout orientation="horizontal" style="margin-top: 10">
          <Button
            text="Đổi mật khẩu"
            :isEnabled="!processing"
            @tap="doimatkhau"
            class="btn-chinhsua textWhite"
            height="40"
          >
          </Button>
        </Stacklayout>
      </Stacklayout>
    </Stacklayout>
  </FlexboxLayout>
</template>

<script>
import ChinhSuaThongTin from "./ChinhSuaThongTin";
import DoiMatKhau from "./DoiMatKhau";
import {
  getString,
} from "@nativescript/core/application-settings";
export default {
  created() {
    // this.getUserDetail(835414);
    let vm = this
    let user = getString('UserInfo')
    try {
      console.log('dataUser1233', JSON.parse(user))
      let dataUser = JSON.parse(user)
      if (dataUser['type'] == 'T_CaNhan') {
        vm.accountType = 'canhan'
        vm.account  = dataUser.caNhan
      } else if (dataUser['type'] == 'T_DonViKinhDoanh') {
        vm.accountType = 'doanhnghiep'
        vm.accountDoanhNghiep  = dataUser
      }
    } catch (error) {
    }
  },
  data() {
    return {
      account: '',
      accountDoanhNghiep: '',
      accountType: ''
    };
  },
  methods: {
    chinhsua() {
      this.processing = false;
      this.$navigateTo(ChinhSuaThongTin, { clearHistory: false });
    },
    doimatkhau() {
      this.processing = false;
      this.$navigateTo(DoiMatKhau, { clearHistory: false });
    },
    toggleDrawer() {
      this.$refs.drawer.nativeView.toggleDrawerState();
    },
    convertDate(input) {
      let date = Date.parse(input);
      var dateString = new Date(date);
      var y = dateString.getFullYear();
      var m = dateString.getMonth() + 1;
      var d = dateString.getDate();
      return d + "/" + m + "/" + y;
    },
    getAvatar(classPK){
      var authorizationBasic = "ZHVhbnRyYW52YW5AZ21haWwuY29tOkFiY2RAMTIzNA==";
      let vm = this;
      let filterGetService = {
        headers: {
          Authorization: "Basic " + authorizationBasic,
          groupId: vm.groupId,
        },
        classPK: classPK,
      };
      vm.$store
        .dispatch("getAvatar", filterGetService)
        .then(function (result) {
          vm.account.avatar = result;
        });
    },
    getUserDetail(userIdParam) {
      let vm = this;
      let filterGetService = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          groupId: vm.groupId,
        },
        userId: userIdParam,
      };
      vm.$store
        .dispatch("getUserDetail", filterGetService)
        .then(function (result) {
          const data = result.data.toJSON();
          let applicantIdDate = data.applicantIdDate;
          if (applicantIdDate != null && applicantIdDate != "") {
            let applicantIdDateString = vm.convertDate(applicantIdDate);
            data.applicantIdDateString = applicantIdDateString;
          } else {
            data.applicantIdDateString = "";
          }
          vm.account = data;
          // vm.getAvatar(data.classPK);
        });
    },
    dateLocale (dateInput) {
      try {
        let date = new Date(dateInput)
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
      } catch (error) {
        return ''
      }
    }
  },
};
</script>

<style>
</style>