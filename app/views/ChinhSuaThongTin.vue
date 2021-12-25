<template>
  <Page>
    <ActionBar title="Chỉnh sửa tài khoản" class="uppercase action-bar">
      <NavigationButton />
    </ActionBar>
    <Stacklayout class="backgroundGrey">
      <Stacklayout class="backgroundWhite editform">
        <Label text="Số CMND/ CCCD" class="font14"></Label>
        
        <TextField
          hint="Nhập số"
          width="90%"
          v-model="account.applicantIdNo"
          class="editforminput"
        >
        </TextField>
        <TextField
          hint="Cấp ngày"
          width="90%"
          v-model="account.applicantIdDateString"
          class="editforminput"
          style="color: black"
        >
        </TextField>
        <Label text="Email" class="font14"></Label>
        <TextField
          hint="Nhập mail của bạn"
          v-model="account.applicantContactEmail"
          width="90%"
          class="editforminput"
        >
        </TextField>
        <Label text="Số điện thoại liên hệ" class="font14"></Label>
        <TextField
          hint="Nhập số điện thoại của bạn"
          width="90%"
          class="editforminput"
          v-model="account.applicantContactTelNo"
        >
        </TextField>
        <Label text="Địa chỉ" class="font14"></Label>
        <TextField
          hint="Ghi rõ số nhà, ngõ, ngách"
          width="90%"
          class="editforminput"
          v-model="account.applicantAddress"
        >
        </TextField>
        <Button
          :text="
            account.applicantCityCode !== '' && account.applicantCityCode !== null ? account.applicantCityName : 'Chọn Tỉnh/ Thành Phố'
          "
          :isEnabled="!processing"
          @tap="selectTinhThanh"
          class="eformselect"
          style="border-width: 1; border-radius: 5"
          width="100%"
          height="35"
        ></Button>

        <Button
          :text="
            account.applicantDistrictCode !== '' && account.applicantDistrictCode !== null ? account.applicantDistrictName : 'Chọn Quận/ Huyện'
          "
          :isEnabled="!processing"
          @tap="selectQuanHuyen"
          class="eformselect"
          style="border-width: 1; border-radius: 5"
          width="100%"
          height="35"
        ></Button>
        <Button
          :text="
            account.applicantWardCode !== '' && account.applicantWardCode !== null ? account.applicantWardName : 'Chọn Phường/ Xã'
          "
          :isEnabled="!processing"
          @tap="selectPhuongXa"
          class="eformselect"
          style="border-width: 1; border-radius: 5"
          width="100%"
          height="35"
        ></Button>
        <Stacklayout orientation="horizontal" style="margin-top: 10">
          <Button
            text="Hủy"
            :isEnabled="!processing"
            @tap="goBack"
            class="ediformhuy"
            height="40"
            style="border-width: 1; border-radius: 15; border-color: #ec860f"
          >
          </Button>
          <Button
            text="Cập nhật"
            :isEnabled="!processing"
            @tap="chinhsua"
            class="btn-chinhsua textWhite"
            height="40"
            style="margin: 0; padding:0 10"
          >
          </Button>
        </Stacklayout>
      </Stacklayout>
    </Stacklayout>
  </Page>
</template>

<script>
import HomeController from "./HomeController";
import { Menu } from "nativescript-menu";
export default {
  created() {
    this.getUserDetail(835414);
  },
  data() {
    return {
      level0: [{ id: "01", title: "Hà Nội" }],
      level1: [{ id: "01", title: "Hà Nội" }],
      level2: [{ id: "01", title: "Hà Nội" }],
      account: {
        className: "org.opencps.usermgt.model.Applicant",
        classPK: 0,
        userId: 0,
        screenName: "",
        applicantIdNo: 0,
        applicantActivationCode: "",
        applicantAddress: "",
        applicantCityCode: "",
        applicantCityName: "",
        applicantContactEmail: "",
        applicantContactName: "",
        applicantContactTelNo: "",
        applicantDistrictCode: "",
        applicantDistrictName: "",
        applicantIdDate: "",
        applicantLock: 0,
        applicantName: "",
        applicantTmpPass: "",
        applicantType: "",
        applicantWardCode: "",
        applicantWardName: "",
        avatar: "",
        employeeFileCerId: 0,
        employeeFileSignId: 0,
        employeeGender: 0,
        employeeMainJobPostId: 0,
        employeePhotoFileEntryId: 0,
        employeeWorkingStatus: 0,
        govAgencyCode: "",
        govAgencyName: "",
        mappingUserId: 0,
      },
    };
  },
  methods: {
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
          vm.getDonViHanhChinh(0, 0);
          vm.getDonViHanhChinh(data.applicantCityCode, 1);
          vm.getDonViHanhChinh(data.applicantDistrictCode, 2);
        });
    },
    convertDate(input) {
      let date = Date.parse(input);
      var dateString = new Date(date);
      var y = dateString.getFullYear();
      ``;
      var m = dateString.getMonth() + 1;
      var d = dateString.getDate();
      return d + "/" + m + "/" + y;
    },
    getDonViHanhChinh(parentId, level) {
      let vm = this;
      let filterGetService = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        parent: parentId,
      };
      vm.$store
        .dispatch("getDonViHanhChinh", filterGetService)
        .then(function (result) {
          const data = result.data.toJSON();
          let datav2 = data.data;
          if (level == 0) {
            vm.level0 = [];
            let list = [];
            for (let i = 0; i < datav2.length; i++) {
              let dataEntity = datav2[i];
              let value = {};
              value.id = dataEntity.itemCode;
              value.title = dataEntity.itemName;
              list.push(value);
            }
            vm.level0 = list;
          } else if (level == 1) {
            vm.level1 = [];
            let list = [];
            for (let i = 0; i < datav2.length; i++) {
              let dataEntity = datav2[i];
              let value = {};
              value.id = dataEntity.itemCode;
              value.title = dataEntity.itemName;
              list.push(value);
            }
            vm.level1 = list;
          } else if (level == 2) {
            vm.level2 = [];
            let list = [];
            for (let i = 0; i < datav2.length; i++) {
              let dataEntity = datav2[i];
              let value = {};
              value.id = dataEntity.itemCode;
              value.title = dataEntity.itemName;
              list.push(value);
            }
            vm.level2 = list;
          }
        });
    },
    selectTinhThanh() {
      Menu.popup({
        cancelButtonText: "Hủy bỏ",
        // view: this.$refs.element.menuBtn,
        actions: this.level0,
      })
        .then((action) => {
          if (action.id > 0) {
            let parent = action.id;
            this.account.applicantCityCode = action.id;
            this.account.applicantCityName = action.title;
            this.getDonViHanhChinh(parent, 1);
            this.account.applicantDistrictCode = 0;
            this.account.applicantDistrictName = null;
            this.account.applicantWardCode = 0;
            this.account.applicantWardName = null;
          }
        })
        .catch(console.log());
    },
    selectQuanHuyen() {
      Menu.popup({
        cancelButtonText: "Hủy bỏ",
        // view: this.$refs.element.menuBtn,
        actions: this.level1,
      })
        .then((action) => {
          if (action.id > 0) {
            let parent = action.id;
            this.account.applicantDistrictCode = action.id;
            this.account.applicantDistrictName = action.title;
            this.account.applicantWardCode = 0;
            this.account.applicantWardName = null;
            this.getDonViHanhChinh(parent, 2);
          }
        })
        .catch(console.log());
    },
    selectPhuongXa() {
      Menu.popup({
        cancelButtonText: "Hủy bỏ",
        // view: this.$refs.element.menuBtn,
        actions: this.level2,
      })
        .then((action) => {
          this.account.applicantWardCode = action.id;
          this.account.applicantWardName = action.title;
        })
        .catch(console.log());
    },
    huy() {
      this.processing = false;
      this.$navigateTo(ThongTinTaiKhoan, {
        clearHistory: false,
        transition: { name: "slideRight" },
      });
    },
    goBack() {
      this.processing = false;
      this.$navigateTo(HomeController, 
        { clearHistory: false, 
          props: {
            pageName: 'nguoidung'
          }
        });
    },
  },
};
</script>

<style>
</style>