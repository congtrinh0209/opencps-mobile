<template>
  <Page actionBarHidden="true">
    <FlexboxLayout class="page backgroundGrey">
      <GridLayout
        class="header"
        width="100%"
        orientation="horizontal"
        :columns="isLogin ? '2*, 7*, 1*, 1*' : '2*, 7*, 100'"
        style="padding-left:0"
      >
        <Button
          col="0"
          class="transparent"
          @tap="toggleDrawer()"
          style="margin-left: 0"
        >
          <FormattedString>
            <Label
              text.decode="&#xf036;"
              class="fas textWhite icon-bar"
            ></Label>
          </FormattedString>
        </Button>
        <Label col="1" textWrap="true" class="uppercase font14 actionbar-title">
          <FormattedString>
            <Span text="Cổng dịch vụ công"></Span>
            <Span text="\n"></Span>
            <Span text="Tỉnh Hậu Giang"></Span>
          </FormattedString>
        </Label>
        <Label
          col="2"
          text.decode="&#xf0f3;"
          class="fas textWhite icon-bar icon-notifycation"
          v-if="isLogin == true"
        ></Label>
        <Image
          col="3"
          src="~/assets/images/avatar-account.png"
          @tap="goThongTinTaiKhoan"
          v-if="isLogin == true"
        />
        <Button
          height="32"
          class="ediformhuy"
          style="border-width: 1; border-radius: 10; border-color: #ec860f; margin: 0"
          col="2"
          @tap="login"
          v-if="isLogin == false"
        >
          <FormattedString>
            <Span text.decode="&#xf2f6;" class="fas"></Span>
            <Span text=" Đăng nhập"></Span>
          </FormattedString>
        </Button>
      </GridLayout>
      <RadSideDrawer
        ref="drawer"
        @drawerOpened="onDrawerOpened()"
        @drawerClosed="onDrawerClosed()"
      >
        <!-- Layout Drawer -->
        <StackLayout ~drawerContent backgroundColor="#eee">
          <StackLayout class="bg-tab-header" height="100%">
            <GridLayout
              rows="auto, *"
              width="100%"
              class="bg-tab-header sidedrawer sidedrawer-left"
            >
              <StackLayout row="0" class="sidedrawer-header" v-if="isLogin">
                <Image
                  class="sidedrawer-avatar fas"
                  src.decode="font://&#xf2bd;"
                />
                <Label
                  class="sidedrawer-header-text var"
                  :text="userName"
                  style="color: black"
                  :textWrap="true"
                />
                <Label
                  class="sidedrawer-header-footnote var"
                  :text="emailUser"
                  style="color: black"
                />
              </StackLayout>

              <ScrollView row="1">
                <StackLayout class="sidedrawer-content">
                  <StackLayout class="hr-light"></StackLayout>
                  <GridLayout
                    class="sidedrawer-list-item"
                    columns="auto, *"
                    @tap="drawerToInfoUser()"
                    v-if="isLogin"
                  >
                    <Image
                      col="0"
                      row="0"
                      class="navIcon"
                      src="~/assets/images/account-icon.png"
                    />
                    <Label
                      row="0"
                      col="1"
                      text="Thông tin tài khoản"
                      class="m-l-20 sidedrawer-item"
                      style="color: black; font-weight: normal"
                    />
                  </GridLayout>
                  <StackLayout class="hr-light"></StackLayout>
                  <GridLayout
                    class="sidedrawer-list-item"
                    columns="auto, *"
                    @tap="hdsd"
                  >
                    <Image
                      col="0"
                      row="0"
                      class="navIcon"
                      src="~/assets/images/hdsd-icon.png"
                    />
                    <Label
                      row="0"
                      col="1"
                      text="Hướng dẫn sử dụng"
                      class="m-l-20 sidedrawer-item"
                      style="color: black; font-weight: normal"
                    />
                  </GridLayout>
                  <StackLayout class="hr-light"></StackLayout>
                  <!-- <GridLayout
                    class="sidedrawer-list-item"
                    columns="auto, *"
                    @tap="setting"
                  >
                    <Image
                      col="0"
                      row="0"
                      class="navIcon"
                      src="~/assets/images/setting-icon.png"
                    />
                    <Label
                      row="0"
                      col="1"
                      text="Cài đặt ứng dụng"
                      class="m-l-20 sidedrawer-item"
                      style="color: black; font-weight: normal"
                    />
                  </GridLayout>
                  <StackLayout class="hr-light"></StackLayout>
                  <GridLayout
                    class="sidedrawer-list-item"
                    columns="auto, *"
                    @tap="info"
                  >
                    <Image
                      col="0"
                      row="0"
                      class="navIcon"
                      src="~/assets/images/share-icon.png"
                    />
                    <Label
                      row="0"
                      col="1"
                      text="Giới thiệu phần mềm"
                      class="m-l-20 sidedrawer-item"
                      style="color: black; font-weight: normal"
                    />
                  </GridLayout>
                  <StackLayout class="hr-light"></StackLayout> -->
                  <GridLayout
                    class="sidedrawer-list-item"
                    columns="auto, *"
                    @tap="logout"
                    v-if="isLogin"
                  >
                    <Image
                      col="0"
                      row="0"
                      class="navIcon"
                      src="~/assets/images/logout-icon.png"
                    />
                    <Label
                      row="0"
                      col="1"
                      text="Đăng xuất"
                      class="m-l-20 sidedrawer-item"
                      style="color: black; font-weight: normal"
                    />
                  </GridLayout>
                  <GridLayout
                    class="sidedrawer-list-item"
                    columns="auto, *"
                    @tap="login"
                    v-else
                  >
                    <Image
                      col="0"
                      row="0"
                      class="navIcon"
                      src="~/assets/images/logout-icon.png"
                    />
                    <Label
                      row="0"
                      col="1"
                      text="Đăng nhập"
                      class="m-l-20 sidedrawer-item"
                      style="color: black; font-weight: normal"
                    />
                  </GridLayout>
                  <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
              </ScrollView>
            </GridLayout>
          </StackLayout>
        </StackLayout>

        <!--  -->
        <StackLayout ~mainContent>
          <DockLayout>
            <!-- Layout Content Page -->
            <StackLayout
              dock="top"
              height="92%"
              width="100%"
              style="margin-bottom: 0"
            >
              <ActivityIndicator
                v-show="isLoading"
                height="100%"
                :busy="isLoading"
              />

              <TraCuuHoSo v-show="selectedTab === 0 && !isLoading"></TraCuuHoSo>
              <ThuTucHanhChinh
                v-show="selectedTab === 1 && !isLoading"
              ></ThuTucHanhChinh>
              <QuanLyHoSo v-show="selectedTab === 2 && !isLoading"></QuanLyHoSo>
              <ThongTinTaiKhoan
                v-show="selectedTab === 3 && !isLoading"
              ></ThongTinTaiKhoan>
              <GopY v-show="selectedTab === 4 && !isLoading"></GopY>
            </StackLayout>
            <!--  -->
            <!-- Layout Bottom Nav Page -->
            <StackLayout dock="bottom" height="8%">
              <StackLayout ~mainContent>
                <GridLayout
                  class="navBottom"
                  width="100%"
                  rows="auto"
                  columns="auto,auto,auto,auto,auto"
                >
                  <GridLayout
                    :class="selectedTab == 0 ? 'active' : ''"
                    @tap="onButtonTap('tracuuhoso')"
                    rows="*,auto"
                    cols="auto"
                    class="nav"
                    col="0"
                    row="0"
                    width="20%"
                  >
                    <Image
                      :class="selectedTab == 0 ? 'active' : ''"
                      row="0"
                      class="navIcon"
                      :src="
                        selectedTab == 0
                          ? '~/assets/images/menu-tra-cuu-active.png'
                          : '~/assets/images/menu-tra-cuu-inactive.png'
                      "
                    />
                    <Label
                      v-if="selectedTab == 0"
                      row="1"
                      :class="selectedTab == 0 ? 'text-icon-active' : ''"
                      text="Tra cứu"
                      class="navText"
                    ></Label>
                  </GridLayout>
                  <GridLayout
                    :class="selectedTab == 1 ? 'active' : ''"
                    @tap="onButtonTap('thutuchanhchinh')"
                    rows="*,auto"
                    cols="auto"
                    class="nav"
                    col="1"
                    row="0"
                    width="20%"
                  >
                    <Image
                      :class="selectedTab == 1 ? 'active' : ''"
                      row="0"
                      class="navIcon"
                      :src="
                        selectedTab == 1
                          ? '~/assets/images/menu-tthc-active.png'
                          : '~/assets/images/menu-tthc-inactive.png'
                      "
                    />
                    <Label
                      v-if="selectedTab == 1"
                      row="1"
                      :class="selectedTab == 1 ? 'text-icon-active' : ''"
                      text="TTHC"
                      class="navText"
                    ></Label>
                  </GridLayout>
                  <GridLayout
                    :class="selectedTab == 2 ? 'active' : ''"
                    @tap="onButtonTap('quanlyhoso')"
                    rows="*,auto"
                    cols="auto"
                    class="nav"
                    col="2"
                    row="0"
                    width="20%"
                  >
                    <Image
                      :class="selectedTab == 2 ? 'active' : ''"
                      row="0"
                      class="navIcon"
                      :src="
                        selectedTab == 2
                          ? '~/assets/images/menu-ho-so-active.png'
                          : '~/assets/images/menu-ho-so-inactive.png'
                      "
                    />
                    <Label
                      v-if="selectedTab == 2"
                      row="1"
                      :class="selectedTab == 2 ? 'text-icon-active' : ''"
                      text="QL Hồ sơ"
                      class="navText"
                    ></Label>
                  </GridLayout>

                  <GridLayout
                    :class="selectedTab == 3 ? 'active' : ''"
                    @tap="onButtonTap('nguoidung')"
                    rows="*,auto"
                    cols="auto"
                    class="nav"
                    col="3"
                    row="0"
                    width="20%"
                  >
                    <Image
                      :class="selectedTab == 3 ? 'active' : ''"
                      row="0"
                      class="navIcon"
                      :src="
                        selectedTab == 3
                          ? '~/assets/images/menu-nguoi-dung-active.png'
                          : '~/assets/images/menu-nguoi-dung-inactive.png'
                      "
                    />
                    <Label
                      v-if="selectedTab == 3"
                      :class="selectedTab == 3 ? 'text-icon-active' : ''"
                      row="1"
                      text="Tài khoản"
                      class="navText"
                    ></Label>
                  </GridLayout>
                  <GridLayout
                    :class="selectedTab == 4 ? 'active' : ''"
                    @tap="onButtonTap('gopy')"
                    rows="*,auto"
                    cols="auto"
                    class="nav"
                    col="4"
                    row="0"
                    width="20%"
                  >
                    <Image
                      :class="selectedTab == 4 ? 'active' : ''"
                      row="0"
                      class="navIcon"
                      :src="
                        selectedTab == 4
                          ? '~/assets/images/menu-comment-active.png'
                          : '~/assets/images/menu-comment-inactive.png'
                      "
                    />
                    <Label
                      v-if="selectedTab == 4"
                      :class="selectedTab == 4 ? 'text-icon-active' : ''"
                      row="1"
                      text="Góp ý"
                      class="navText"
                    ></Label>
                  </GridLayout>
                </GridLayout>
              </StackLayout>
            </StackLayout>
            <!--  -->
          </DockLayout>
        </StackLayout>
      </RadSideDrawer>
    </FlexboxLayout>
  </Page>
</template>

<script>
// import DrawerNav from "./DrawerContent"
import {
  getBoolean,
  setBoolean,
  getNumber,
  setNumber,
  getString,
  setString,
  hasKey,
  remove,
  clear,
} from "@nativescript/core/application-settings";

// import NavBottom from "./navBottom";
import HoSo from "./QuanLyHoSo";
import ThuTucHanhChinh from "./ThuTucHanhChinh";
import QuanLyHoSo from "./QuanLyHoSo";
import ThongTinTaiKhoan from "./ThongTinTaiKhoan";
import Login from "./login";
import * as utils from "~/utils";
import Home from "./HomeController";
import TraCuuHoSo from "./TraCuu";
import GopY from "./GopY";

const ConfirmLogin = {
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
            text="Đăng nhập"
            @tap="goToLogin"
            class="btn-chinhsua textWhite padding20"
          >
          </Button>
      </Stacklayout>
    </StackLayout>
  `,
  methods: {
    goToLogin() {
      let vm = this
      vm.$modal.close({})
      vm.$navigateTo(Login, { clearHistory: false });
    }
  }
};

export default {
  components: {
    // DrawerNav,
    // NavBottom,
    TraCuuHoSo,
    HoSo,
    QuanLyHoSo,
    ThuTucHanhChinh,
    ThongTinTaiKhoan,
    GopY,
  },
  props: ["pageName"],
  computed: {},
  created() {
    this.onButtonTap(this.pageName);
    let vm = this
    let user = getString('UserInfo')
    try {
      let dataUser = JSON.parse(user)
      if (dataUser['type'] == 'T_CaNhan') {
        vm.userName  = dataUser.caNhan['hoVaTen']
        vm.emailUser = dataUser.caNhan['maSoCaNhan']
      } else if (dataUser['type'] == 'T_DonViKinhDoanh') {

      }
    } catch (error) {
    }
  },
  watch: {},
  mounted() {},
  data() {
    return {
      actionbarTitle: "Quản lý hồ sơ",
      selectedTab: 0,
      isLogin: getBoolean("isLogin", false),
      isLoading: false,
      drawerToggle: false,
      drawer1: "",
      drawer2: "",
      mainColor: "#1aa3ff",
      account: {
        hovaten: "",
        vitri: "",
        cmndcccd: "",
        ngaycap: "",
        email: "",
        sdt: "",
        diachi: "",
      },
      emailUser: '',
      userName: ''
    };
  },
  methods: {
    goThongTinTaiKhoan() {
      let vm = this;
      vm.isLoading = true;
      vm.selectedTab = 3;
      this.actionbarTitle = "Thông tin tài khoản";
      setTimeout(function () {
        vm.isLoading = false;
      }, 300);
    },
    onButtonTap(page) {
      let vm = this;
      vm.isLoading = true;
      if (page === "tracuuhoso") {
        vm.selectedTab = 0;
        this.actionbarTitle = "Quản lý hồ sơ";
      }
      if (page === "thutuchanhchinh") {
        vm.selectedTab = 1;
        this.actionbarTitle = "Thủ tục hành chính";
      }
      if (page === "quanlyhoso") {
        if (this.isLogin == true) {
          vm.selectedTab = 2;
          this.actionbarTitle = "Kho lưu trữ";
        } else {
          vm.$showModal(ConfirmLogin, { props: { message: 'YÊU CẦU ĐĂNG NHẬP HỆ THỐNG' }})
        }
      }
      if (page === "nguoidung") {
        if (this.isLogin == true) {
          vm.selectedTab = 3;
          this.actionbarTitle = "Thông tin tài khoản";
        } else {
          vm.$showModal(ConfirmLogin, { props: { message: 'YÊU CẦU ĐĂNG NHẬP HỆ THỐNG' }})
        }
      }
      if (page === "gopy") {
        vm.selectedTab = 4;
        this.actionbarTitle = "Góp ý";
      }
      setTimeout(function () {
        vm.isLoading = false;
      }, 300);
    },
    onDrawerClosed() {
      this.drawerToggle = false;
    },
    onDrawerOpened() {
      this.drawerToggle = true;
    },
    onOpenDrawerTap() {
      this.$refs.drawer.nativeView.showDrawer();
    },
    onCloseDrawerTap() {
      this.$refs.drawer.nativeView.closeDrawer();
      // this.$refs.drawer.nativeView.toggleDrawerState();
    },
    toggleDrawer() {
      this.$refs.drawer.nativeView.toggleDrawerState();
    },
    drawerToInfoUser() {
      this.selectedTab = 3;
      utils.closeDrawer();
    },
    logout() {
      let vm = this;
      setBoolean("isLogin", false);
      setString("Token", "");
      // setTimeout(function () {
        vm.$navigateTo(Home, { clearHistory: true });
      // }, 300)
    },
    login() {
      let vm = this;
      vm.$navigateTo(Login, { clearHistory: true });
    },
    homeTap() {},
    hdsd() {},
    info() {},
    setting() {},

    showDetails() {},
    goBackHome() {
      this.processing = false;
      this.$navigateTo(Home, {
        clearHistory: false,
        transition: { name: "slideRight" },
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@nativescript/theme/scss/variables/blue";

// Custom styles
// .fas {
//     @include colorize($color: accent);
// }
.actionbar-home {
  display: none !important;
}
.navBottom {
  background-color: #f4f4f4;
  margin-bottom: 0;
  padding-bottom: 0;
}

.nav {
  height: 100%;
  width: 100%;
}

.nav.active {
  // background-color: #E2763C;
}

.navIcon {
  horizontal-align: center;
  vertical-align: center;
  height: 27;
}

.navIcon.active {
  // vertical-align: bottom;
}

.navText {
  margin-bottom: 0;
  font-size: 12;
  color: #666666;
  horizontal-align: center;
}
.text-icon-active {
  color: white;
}
// style drawer
.hr-light {
  height: 2px;
  background-color: #fff;
}
.sidedrawer {
  background-color: white;
}

.sidedrawer-header {
  background-color: white;
  height: 190;
  padding-top: 15px;
  padding-bottom: 15px;
  z-index: 1000;
}

.sidedrawer-avatar {
  border-radius: 50%;
  width: 100;
  height: 100;
  border-width: 4;
  border-color: #ffc251;
  background-color: #9e9e9e;
  color: white;
}

.sidedrawer-header-text {
  color: white;
  font-size: 16;
  font-weight: bold;
  margin-top: 10;
  text-align: center;
}

.sidedrawer-header-footnote {
  color: white;
  text-align: center;
  font-size: 16;
}

.sidedrawer-icon {
  font-size: 22;
  border-radius: 50%;
  border-width: 3;
  border-color: #f07c3d;
  width: 36;
  height: 36;
  background-color: #f07c3d;
  vertical-align: center;
  color: white;
  text-align: center;
}

.sidedrawer-list-item {
  color: white;
  padding-left: 30;
  font-size: 18;
  font-weight: bold;
  height: 72;
}

.sidedrawer-item {
  vertical-align: center;
}

.sidedrawer-list-item-active {
  background-color: #a6a450;
}
</style>