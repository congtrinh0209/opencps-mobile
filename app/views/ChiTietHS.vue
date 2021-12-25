<template>
  <Page class="backgroundGrey">
    <ActionBar title="HỒ SƠ DỊCH VỤ CÔNG" class="uppercase action-bar">
      <!-- <NavigationButton android.systemIcon="ic_menu_back" /> -->
      <NavigationButton />
    </ActionBar>
    <!-- <FlexboxLayout>
      <Stacklayout> -->
      <GridLayout :rows="actionItems.length ? '56, *, 65' : '56, *, 1'">
        <Stacklayout row="0"
          style="padding: 10 10"
        >
          <GridLayout columns="*,140" height="30">
            <Label
              col="0"
              text="thông tin hồ sơ"
              class="uppercase titletracuu"
            ></Label>
            <Button
              class="btn-chinhsua textWhite"
              col="1"
              @tap="lichsusuadoi"
              style="
                border-width: 1;
                border-radius: 15;
              "
            >
              <FormattedString>
                <Span style="font-size: 14" text="Tiến trình "></Span>
                <Span text.decode="&#xf1da;" class="fas"></Span>
              </FormattedString>
            </Button>
          </GridLayout>
        </Stacklayout>
        <Stacklayout row="1">
          <ScrollView style="height: 100%; width: 100%">
            <Stacklayout class="backgroundWhite" style="font-size: 14px">
              <Stacklayout style="padding: 10 10">
                <Label textWrap="true">
                  <FormattedString>
                    <Span text="Nội dung hồ sơ \n" class="bold"></Span>
                    <Span :text="dossier._source.dossierName"></Span>
                  </FormattedString>
                </Label>
              </Stacklayout>
              <Stacklayout class="backgroundGrey" style="padding: 10 10">
                <Label textWrap="true">
                  <FormattedString>
                    <Span text="Chủ hồ sơ \t " class="bold"></Span>
                    <Span :text="dossier._source.applicantName"></Span>
                  </FormattedString>
                </Label>
              </Stacklayout>
              <Stacklayout class="backgroundWhite" style="padding: 10 10">
                <Label textWrap="true">
                  <FormattedString>
                    <Span text="Mã hồ sơ \t " class="bold"></Span>
                    <Span :text="dossier._source.dossierNo"></Span>
                  </FormattedString>
                </Label>
              </Stacklayout>
              <Stacklayout class="backgroundGrey" style="padding: 10 10">
                <Label textWrap="true">
                  <FormattedString>
                    <Span text="Cơ quan giải quyết \t" class="bold"></Span>
                    <Span :text="dossier._source.govAgencyName"></Span>
                  </FormattedString>
                </Label>
              </Stacklayout>
              <Stacklayout class="backgroundWhite" style="padding: 10 10">
                <Label textWrap="true">
                  <FormattedString>
                    <Span text="Tình trạng \t " class="bold"></Span>
                    <Span :text="dossier._source.dossierStatusText"></Span>
                  </FormattedString>
                </Label>
              </Stacklayout>
              <GridLayout columns="*,*" class="backgroundGrey">
                <Label textWrap="true" col="0" style="padding: 10 10">
                  <FormattedString>
                    <Span text="Ngày gửi \t" class="bold"></Span>
                    <Span
                      :text="
                        dossier._source.submitDateLucene == '' ||
                        dossier._source.submitDateLucene == null
                          ? '----'
                          : dossier._source.submitDateLucene
                      "
                    ></Span>
                  </FormattedString>
                </Label>

                <Label textWrap="true" col="1" style="padding: 10 20">
                  <FormattedString>
                    <Span text="Ngày tiếp nhận \t" class="bold"></Span>
                    <Span
                      :text="
                        dossier._source.receiveDateLucene == '' ||
                        dossier._source.receiveDateLucene == null
                          ? '----'
                          : dossier._source.receiveDateLucene
                      "
                    ></Span>
                  </FormattedString>
                </Label>
              </GridLayout>
              <GridLayout class="backgroundWhite" columns="*,*">
                <Label textWrap="true" col="0" style="padding: 10 10">
                  <FormattedString>
                    <Span text="Ngày hẹn trả \t" class="bold"></Span>
                    <Span
                      :text="
                        dossier._source.submitDateLucene == '' ||
                        dossier._source.submitDateLucene == null
                          ? '----'
                          : dossier._source.submitDateLucene
                      "
                    ></Span>
                  </FormattedString>
                </Label>

                <Label textWrap="true" col="1" style="padding: 10 20">
                  <FormattedString>
                    <Span text="Ngày có kết quả \t" class="bold"></Span>
                    <Span
                      :text="
                        dossier._source.ngaycoketqua == '' ||
                        dossier._source.ngaycoketqua == null
                          ? '----'
                          : dossier._source.ngaycoketqua
                      "
                    ></Span>
                  </FormattedString>
                </Label>
              </GridLayout>
              <Stacklayout style="padding: 10 10" class="backgroundGrey">
                <Label textWrap="true">
                  <FormattedString>
                    <Span text="Ngày trả kết quả \t" class="bold"></Span>
                    <Span
                      :text="
                        dossier._source.dueDate == '' ||
                        dossier._source.dueDate == null
                          ? '----'
                          : dossier._source.dueDate
                      "
                    ></Span>
                  </FormattedString>
                </Label>
              </Stacklayout>
              
              <Label
                v-if="isLogin"
                text="Thành phần hồ sơ"
                class="bold backgroundWhite"
                style="padding: 10 10 0 10;"
              >
              </Label>
              <ListView
                v-if="isLogin"
                for="dossierpart in dossierparts"
                style="height: 500; width: 100%"
                class="backgroundWhite"
              >
                <v-template>
                  <Stacklayout style="padding: 0 10 10 10">
                    <Label textWrap="true">
                      <FormattedString>
                        <Span :text="$index + 1" class="bold"></Span>
                        <Span>. </Span>
                        <Span :text="dossierpart._source.partName" />
                        <Span
                          text=" (*)"
                          v-if="dossierpart._source.required == 'true'"
                          style="color: red"
                        />
                      </FormattedString>
                    </Label>
                    <Stacklayout v-if="dossierfiles && dossierfiles.length && dossierfiles[0]['_source']['dossierPartNo']">
                      <Gridlayout
                        columns="*,45"
                        v-for="dossierfile in dossierfiles"
                        :key="dossierfile._source.displayName"
                        backgroundColor="#E6EFF4"
                        style="border-radius: 5;"
                      >
                        <Label
                          v-if="
                            dossierfile._source.dossierPartNo ==
                            dossierpart._source.partNo
                          "
                          col="0"
                          
                          :text="dossierfile._source.displayName"
                        ></Label>
                        <Button
                        v-if="
                          dossierfile._source.dossierPartNo ==
                          dossierpart._source.partNo
                        "
                        col="1"
                        @tap="openFile(dossierfile._source)"
                        height="28"
                        class="btn-chinhsua textWhite btn-nophoso"
                        width="45"
                        style="padding: 0;"
                      >
                        <FormattedString>
                          <Span text.decode="&#xf019;" class="fas" style="color: #ffffff"></Span>
                        </FormattedString>
                      </Button>
                      </Gridlayout>
                    </Stacklayout>
                  </Stacklayout>
                </v-template>
              </ListView>
            </Stacklayout>
          </ScrollView>
        </Stacklayout>
        <FlexboxLayout v-if="isLogin" alignItems="flex-center"
          style="padding: 10 0;" row="2"
        >
          <Button
            height="36"
            :isEnabled="!processing"
            class="btn-chinhsua textWhite"
            v-for="(item, index) in actionItems"
            :text="item.actionName"
            :key="index"
            @tap="getActionDetail(item)"
          >
          </Button>
        </FlexboxLayout>
      </GridLayout>
      <!-- </Stacklayout>
    </FlexboxLayout> -->
  </Page>
</template>

<script>
import HomeController from "./HomeController";
import LichSuSuaDoi from "./LichSuSuaDoi";
import { Http } from "@nativescript/core";
import {File, knownFolders, path} from "@nativescript/core/file-system";
import {Utils} from "@nativescript/core";
// import {openFile} from "@nativescript/core/utils/utils";
import {
  getBoolean, getString
} from "@nativescript/core/application-settings";
const permissions = require("nativescript-permissions")
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
const ChonThanhToan = {
  props: ['epaymentProfile'],
  template: `
    <StackLayout class="p-10" backgroundColor="white">
      <Label textWrap="true" horizontalAlignment="center" class="">
        <FormattedString>
          <Span
            text="THANH TOÁN TRỰC TUYẾN"
            class="uppercase"
            style="color: #EC860F;font-size: 18; font-weight: 700"
          ></Span>
        </FormattedString>
      </Label>
      <GridLayout columns="150,150" height="100">
        <Stacklayout col="0" style="margin-left: 0; margin-top: 10">
          <Image
            horizontalAlignment="center"
            src="~/assets/images/paygov_logo.png"
            style="margin-left: 10;width: 100; height: 50"
          />
          <Label text="CỔNG THANH TOÁN" class="uppercase" horizontalAlignment="center"></Label>
          <Label text="QUỐC GIA" class="uppercase" horizontalAlignment="center"></Label>
        </Stacklayout>
        <Stacklayout col="1" style="margin-left: 0; margin-top: 10" @tap="toKeyPay(epaymentProfile.keypayUrl)">
          <Image
            horizontalAlignment="center"
            src="~/assets/images/logo-keypay.png"
            style="margin-left: 10; margin-bottom: 10; margin-top: 5;width: 100; height: 50"
          />
          <Label horizontalAlignment="center" text="CỔNG KEYPAY" class="uppercase"></Label>
        </Stacklayout>
      </GridLayout>
    </StackLayout>
  `,
  methods: {
    toKeyPay (item) {
      Utils.openUrl(item)
    }
  }
};
export default {
  props: ["dossierId"],
  created() {
    this.getDossierDetail()
    if (this.isLogin) {
      this.getDossierFile(this.dossierId)
    }
  },
  data() {
    return {
      processing: false,
      isLogin: getBoolean("isLogin", false),
      dossier: {
        _source: {
          receiveDateLucene: "",
          dossierName: "",
          submitDateLucene: "",
          dossierNo: "",
          dossierTemplateNo: "",
          dueDate: "",
          govAgencyName: "",
          dossierId: "",
          dossierNote: "",
          dossierStatusText: "",
        },
      },
      dossierparts: [
        {
          _source: {
            fileTemplateNo: "",
            eform: "",
            templateNoLucene: "",
            multiple: "",
            partName: "",
            partType: "",
            partNo: "",
          },
        },
      ],
      dossierfiles: [
        {
          _source: {
            dossierPartNo: "",
            eSign: "",
            fileSize: "",
            displayName: "",
            dossierId: "",
            eForm: "",
            modifiedDateLucene: "",
            referenceUid: "",
            fileEntryId: "",
            fileType: "",
          },
        },
      ],
      actionItems: [],
      actionDetail: '',
      feeDetail: ''
    };
  },
  methods: {
    getDossierDetail() {
      let vm = this;
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
          dossierId: this.dossierId,
          entryClassName: "org.opencps.dossiermgt.model.Dossier",
        },
        source:
          "dossierId,referenceUid,dossierNo,dossierName,applicantName,govAgencyName,dueDate,dossierStatusText,submitDate,submitDateLucene,receiveDateLucene,dossierNote,dossierTemplateNo",
      };
      vm.$store
        .dispatch("getThuTucHanhChinh", filterGetService)
        .then(function (result) {
          let data = result.data.toJSON();
          vm.dossier = data.hits.hits[0];
          let dossierTemplateNo = vm.dossier._source.dossierTemplateNo;
          dossierTemplateNo = dossierTemplateNo.replace(/\./g, "_");
          if (vm.isLogin) {
            vm.getDossierPart(dossierTemplateNo)
            vm.getNextAction()
          }
        });
    },
    getNextAction () {
      let vm = this
      let filter = {
        dossierId: vm.dossierId
      }
      vm.$store.dispatch("getNextAction", filter).then(function (result) {
        try {
          let data = result.data.toJSON()
          if (data.data) {
            vm.actionItems = data.data.filter(function (item) {
              return item.enable !== 0
            })
          } else {
            vm.actionItems = []
          }
        } catch (error) {
          vm.actionItems = []
        }
      }).catch(function () {
      })
    },
    getActionDetail (item) {
      let vm = this
      let filter = {
        dossierId: vm.dossierId,
        actionId: item.processActionId
      }
      vm.processing = true
      vm.$store.dispatch("getActionDetail", filter).then(function (result) {
        vm.processing = false
        try {
          let data = result.data.toJSON()
          vm.actionDetail = data
          // console.log('actionDetail', vm.actionDetail)
          if (vm.actionDetail.hasOwnProperty('payment') && (vm.actionDetail.payment.requestPayment == 3 || vm.actionDetail.payment.requestPayment == 5)) {
            let filter2 = {
              dossierId: vm.dossier._source.referenceUid
            }
            vm.$store.dispatch("getPaymentDetail", filter2).then(function (result) {
              let payment = result.data.toJSON()
              vm.feeDetail = vm.getEPaymentProfile(payment.epaymentProfile)
              vm.$showModal(ChonThanhToan, { props: { epaymentProfile: vm.feeDetail }})
              vm.$store.dispatch("getIpLocal", {}).then(function (resData) {
                let ipLocal = resData.data.toJSON()
                let ip = ipLocal['IPv4']
                let filter3 = {
                  dossierId: vm.dossier._source.dossierId,
                  ipAddress: ip
                }
                vm.$store.dispatch("getUriPayGov", filter3).then(function (result) {

                })   
              }).catch(function () {
                let filter3 = {
                  dossierId: vm.dossier._source.dossierId,
                  ipAddress: ''
                }
                vm.$store.dispatch("getUriPayGov", filter3).then(function (result) {

                })   
              })
                         
            })
          } else {
            vm.doAction(item)
          }
        } catch (error) {
          vm.actionDetail = ''
          vm.doAction(item)
        }
      }).catch(function () {
        vm.processing = false
        vm.doAction(item)
      })
    },
    doAction (item) {
      let vm = this
      confirm({
        title: "Xác nhận thao tác hồ sơ",
        message: "Bạn có chắc chắn thực hiện thao tác này?",
        okButtonText: "Đồng ý",
        cancelButtonText: "Hủy"
      }).then(result => {
        let dataAction = {
          dossierId: vm.dossierId,
          query: {
            "actionCode": item.actionCode,
            "actionNote": "",
            "actionUser": "",
            "payload": "",
            "security": "",
            "assignUsers": "",
            "payment": {},
            "createDossiers": ""
          }
        }
        vm.processing = true
        vm.$store.dispatch("doProcessAction", dataAction).then(function (result) {
          vm.processing = false
          if (result.statusCode == 200) {
            alert({
              title: "Thao tác hồ sơ thành công",
              message: "",
              okButtonText: "OK"
            }).then(() => {
              vm.getDossierDetail()
              if (item.actionCode == 1300) {
                vm.$navigateTo(HomeController, 
                { clearHistory: false, 
                  props: {
                    pageName: 'quanlyhoso'
                  }
                });
              }
            })
          } else {
            vm.processing = false
            alert({
              title: "Thao tác hồ sơ thất bại",
              message: "",
              okButtonText: "OK"
            }).then(() => {
            })
          }
          
        })
      })
    },
    getDossierPart(templateNo) {
      let vm = this;
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
          templateNoLucene: templateNo,
          entryClassName: "org.opencps.dossiermgt.model.DossierPart",
        },
        source:
          "partNo,partName,eform,fileTemplateNo,templateNoLucene,partType,multiple,partType,required",
      };
      vm.$store
        .dispatch("getThuTucHanhChinh", filterGetService)
        .then(function (result) {
          const data = result.data.toJSON();
          vm.dossierparts = data.hits.hits;
        });
    },
    getDossierFile(dossierIdParam) {
      let vm = this;
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
          dossierId: dossierIdParam,
          entryClassName: "org.opencps.dossiermgt.model.DossierFile",
          removed: false
        },
        source:
          "dossierId,displayName,dossierPartNo,modifiedDateLucene,eForm,esign,formData,fileSize,eSign,fileEntryId,fileType,referenceUid",
      };
      vm.$store
        .dispatch("getThuTucHanhChinh", filterGetService)
        .then(function (result) {
          const data = result.data.toJSON();
          vm.dossierfiles = data.hits.hits;
        });
    },
    lichsusuadoi() {
      this.$showModal(LichSuSuaDoi, { props: { dossierId: this.dossierId } });
    },
    goBack() {},
    redirectUrl (url) {
			Utils.openUrl(url)
		},
    openFile(file) {
      let vm = this
      // console.log(file);
      let fileName = ''
      if (file.eForm == "true") {
        fileName = file.displayName + '.pdf'
      } else {
        if (file.fileType == 'xlsx') {
          fileName = file.displayName.replace('xlsx', 'xls')
        } else {
          fileName = file.displayName
        }
      }
      let downloadUrl = vm.apiDomainProxy + "/o/rest/v2/dossiers/"+this.dossierId+"/files/" + file.referenceUid
      let downloadFilePath = path.join(
        knownFolders.currentApp().path,
        fileName
      )
      Http.getFile({
        url: downloadUrl,
        method: "GET",
        headers: {
            "groupId": vm.groupId,
            "Authorization": "Bearer " + getString("Token", "")
        }
      },downloadFilePath).then(
        (resultFile) => {
          console.log("resultFile._path123123: " ,resultFile)
            Utils.openFile(resultFile._path)
          .catch( () => {
          });
        },
        (e) => {}
      );
    },
    getEPaymentProfile (paymentProfile) {
      if (paymentProfile) {
        try {
          JSON.parse(paymentProfile)
          return JSON.parse(paymentProfile)
        } catch (e) {
          return ''
        }
      } else {
        return ''
      }
    },
  },
};
</script>

<style>
</style>