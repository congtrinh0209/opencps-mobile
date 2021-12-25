<template>
  <FlexboxLayout class="page backgroundGrey" style="width: 100%; height: 100%">
    <ScrollView style="width: 100%; height: 100%">
      <Stacklayout class="padding0">
        <Label text="Tra cứu hồ sơ" class="uppercase titletracuu" style="padding: 10 15"></Label>
        <Label textWrap="true" style="padding: 0 20 10 15">
          <FormattedString>
            <Span text="(*) " style="color: red"></Span>
            <Span
              class="font14"
              text='Nhập mã số hồ sơ mà bạn nhận được từ Hệ thống dịch vụ công trực tuyến hoặc mã số hồ sơ có ghi trên "Giấy tiếp nhận hồ sơ và hẹn trả kết quả" mà bạn nhận được từ Bộ phận một cửa.'
            ></Span>
          </FormattedString>
        </Label>
        <!-- <Stacklayout orientation="horizontal">
          <TextField
            hint="Nhập mã số hồ sơ"
            width="235"
            height="40"
            class="tracuuinput"
            style="margin-right: 0;"
          ></TextField>
          <Button
            :isEnabled="!processing"
            @tap="tracuumahoso"
            width="100"
            height="40"
            class="btn-chinhsua textWhite padding20"
            style="margin-left: -20; padding: 0 20"
          >
            <FormattedString>
              <Span style="font-size: 16" text="Tìm "></Span>
              <Span text.decode="&#xf002;" class="fas"></Span>
            </FormattedString>
          </Button>
        </Stacklayout> -->
        <GridLayout columns="*, 80" rows="40">
          <TextField
            col="0"
            hint="Nhập mã số hồ sơ"
            height="40"
            class="tracuuinput"
            style="margin-right: 0;"
            v-model="dossierNoSearch"
            @returnPress="tracuumahoso"
          ></TextField>
          <Button
            col="1"
            :isEnabled="!processing"
            @tap="tracuumahoso"
            height="40"
            class="btn-tracuu textWhite padding20"
            style="margin-left: -20; padding: 0 20"
          >
            <FormattedString>
              <Span style="font-size: 16" text="Tìm "></Span>
              <Span text.decode="&#xf002;" class="fas"></Span>
            </FormattedString>
          </Button>
        </GridLayout>
        <Button
          :isEnabled="!processing"
          @tap="btnNopHoSo"
          height="40"
          class="btn-chinhsua textWhite btn-nophoso"
          width="60%"
          style="margin-top: 15"
        >
          <FormattedString>
            <Span text.decode="&#xf093;" class="fas"></Span>
            <Span text=" Nộp hồ sơ trực tuyến"></Span>
          </FormattedString>
        </Button>

        <Label
          width="60%"
          text="thống kê xử lý hồ sơ"
          class="uppercase textWhite thongkehoso"
          style="margin-top: 10; margin-bottom: 0; z-index: 1000"
        >
        </Label>
        <Stacklayout
          class="backgroundWhite editform padding20"
          style="margin-top: -30"
        >
          <GridLayout columns="35*,65*" height="72" marginTop="45">
            <Label
              style="
                font-size: 36;
                color: #ec860f;
                text-align: center;
                font-weight: bold;
              "
              col="0"
              backgroundColor="#FFF6EC"
            >
              <FormattedString>
                <Span :text="statisticData.ontimePercentage"></Span>
                <Span text="%" style="font-size: 18"></Span>
              </FormattedString>
            </Label>
            <Label
              col="1"
              textWrap="true"
              marginLeft="10"
              style="font-size: 14px"
            >
              <FormattedString>
                <Span text="Hồ sơ hoàn thành đúng hạn!"></Span>
                <Span text="\n"></Span>
                <Span text="Tổng số hồ sơ tiếp nhận:"></Span>
                <Span text="\n"></Span>
                <Span
                  :text="statisticData.receivedCount"
                  style="color: #ec860f; font-weight: bold; font-size: 20"
                ></Span>
                <Span text=" hồ sơ" style="color: grey"></Span>
              </FormattedString>
            </Label>
          </GridLayout>
          <GridLayout columns="*, 9*" rows="*,*,*" height="150">
            <Label
              col="0"
              row="0"
              text="❖"
              class="fas"
              style="font-size: 25; color: orange"
            ></Label>
            <Label
              col="1"
              row="0"
              textWrap="true"
              marginLeft="10"
              style="font-size: 14"
            >
              <FormattedString>
                <Span
                  :text="statisticData.receivedCount"
                  style="color: black; font-weight: bold; font-size: 16"
                ></Span>
                <Span text="\n"></Span>
                <Span text="Tổng số tiếp nhận trong kỳ"></Span>
              </FormattedString>
            </Label>
            <Label
              col="0"
              row="1"
              text="❖"
              class="fas"
              style="font-size: 25; color: orange"
            ></Label>
            <Label
              col="1"
              row="1"
              textWrap="true"
              marginLeft="10"
              style="font-size: 14"
            >
              <FormattedString>
                <Span
                  :text="statisticData.releaseInAPeriodCount"
                  style="color: black; font-weight: bold; font-size: 16"
                ></Span>
                <Span text="\n"></Span>
                <Span text="Tổng số hoàn thành"></Span>
              </FormattedString>
            </Label>
            <Label
              col="0"
              row="2"
              text="❖"
              class="fas"
              style="font-size: 25; color: orange"
            ></Label>
            <Label
              col="1"
              row="2"
              textWrap="true"
              marginLeft="10"
              style="font-size: 14"
            >
              <FormattedString>
                <Span
                  :text="statisticData.processingInAPeriodCount"
                  style="color: black; font-weight: bold; font-size: 16"
                ></Span>
                <Span text="\n"></Span>
                <Span text="Tổng số đang xử lý"></Span>
              </FormattedString>
            </Label>
          </GridLayout>
        </Stacklayout>
      </Stacklayout>
    </ScrollView>
  </FlexboxLayout>
</template>

<script>
import Login from "./login";
import ThongTinTaiKhoan from "./ThongTinTaiKhoan";
import ThemMoiBuoc1 from "./ThemMoiBuoc1";
import ChiTietHS from "./ChiTietHS";
import {
  getBoolean
} from "@nativescript/core/application-settings";
const MaXacThuc = {
  props: ['dossierId'],
  data() {
    return {
      secretKey: '6789',
      processing: false
    }
  },
  template: `
    <StackLayout class="p-10" backgroundColor="white">
      <Label style="text-align: center" class="padding-bottom: 10">
        <FormattedString>
          <Span
            text="Mã bí mật tra cứu hồ sơ"
            class="uppercase"
            style="color: #EC860F;font-size: 18"
          ></Span>
        </FormattedString>
      </Label>
      <Label
        text="(*) Mã bí mật được ghi trên Giấy tiếp nhận và hẹn trả kết quả"
        class="titletracuu"
        textWrap="true"
        style="font-weight: normal; font-size: 14; color: black"
      ></Label>
      <TextField
        hint="Nhập mã bí mật"
        height="40"
        class="tracuuinput tracuuinputTthc"
        style="margin-right: 0; margin-top: 10"
        v-model="secretKey"
        @returnPress="btnSearch"
      ></TextField>
      <Stacklayout orientation="horizontal" class="locThuTuc" style="margin-left: 0; margin-top: 10">
        <Button
          text="Hủy"
          @tap="$modal.close"
          class="ediformhuy padding20"
          style="border-width: 1; border-radius: 15; border-color: #ec860f"
        >
        </Button>
        <Button
          text="Đồng ý"
          @tap="btnSearch"
          class="btn-chinhsua textWhite padding20"
          :isEnabled="!processing"
        >
        </Button>
      </Stacklayout>
    </StackLayout>
  `,
  methods: {
    btnSearch(event) {
      let vm = this
      if (vm.secretKey) {
        vm.processing = true
        let filter = {
          dossierId: vm.dossierId,
          secretKey: vm.secretKey
        }
        vm.$store.dispatch("checkSecret", filter).then(function (result) {
          vm.processing = false
          if (result == 203) {
            vm.$showModal(ThongBao, { props: { message: 'Mã bí mật không chính xác' }})
          } else {
            vm.$modal.close({})
            vm.$navigateTo(ChiTietHS, {
              clearHistory: false,
              props: {
                dossierId: vm.dossierId,
              },
            });
          }
        }).catch(function () {
          vm.processing = false
          vm.$showModal(ThongBao, { props: { message: 'Lỗi kết nối' }})
        })
      }
    },
  }
};
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
            @tap="$modal.close"
            class="btn-chinhsua textWhite padding20"
          >
          </Button>
      </Stacklayout>
    </StackLayout>
  `
};
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
  data() {
    return {
      dossierNoSearch: '000.00.13.H30-211130-0001',
      dossierId: '',
      statisticData: {
        receivedCount: 0,
        releaseInAPeriodCount: 0,
        processingInAPeriodCount: 0,
        ontimePercentage: 0
      },
      isLogin: getBoolean("isLogin", false),
    };
  },
  created () {
    let vm = this
    vm.getSoLieuThongKe()
  },
  methods: {
    btnNopHoSo() {
      this.processing = false
      if (this.isLogin == true) {
        this.$navigateTo(ThemMoiBuoc1, { clearHistory: false });
      } else {
        this.$showModal(ConfirmLogin, { props: { message: 'YÊU CẦU ĐĂNG NHẬP HỆ THỐNG' }})
      }
    },
    goThongTinTaiKhoan() {
      this.processing = false;
      this.$navigateTo(ThongTinTaiKhoan, { clearHistory: true });
    },
    tracuumahoso() {
      let vm = this;
      this.processing = false;
      if (this.dossierNoSearch) {
        let filterGetService = {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Endpoint:
              "/dvc-hg-2009920099/LiferayDocumentType/_search?filter_path=hits.total,hits.hits._source",
            Method: "post",
          },
          params: {
            groupId: this.groupId,
            dossierNoSearch: String(this.dossierNoSearch).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '_'),
            entryClassName: "org.opencps.dossiermgt.model.Dossier",
          },
          ranges: {},
          source:
            "dossierNo,dossierId",
          sort: {
          },
        };
      
        vm.$store
        .dispatch("filterDossier", filterGetService)
        .then(function (result) {
          try {
            const data = result.data.toJSON()
            let dataDossier = data.hits.hits[0]['_source']
            vm.dossierId = dataDossier['dossierId']
            vm.$showModal(MaXacThuc, { props: { dossierId: dataDossier['dossierId'] }})
          } catch (error) {
            vm.$showModal(ThongBao, { props: { message: 'Không có hồ sơ nào được tìm thấy' }})
          }
        })
      }
    },
    btnSearch(event) {
      this.$modal.close({})
      // this.$navigateTo(ChiTietHS, {
        //   clearHistory: false,
        //   props: {
        //     dossierId: "81007",
        //   },
        // });
    },
    getSoLieuThongKe () {
      let vm = this
      vm.$store
      .dispatch("getThongKe")
      .then(function (result) {
        try {
          let res = result.data.toJSON()
          vm.statisticData = res.data[0]
        } catch (error) {
        }
      })
    }

  },
};
</script>

<style>
</style>