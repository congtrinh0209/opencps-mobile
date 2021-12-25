<template>
  <Page class="backgroundGrey">
    <ActionBar title="Thêm mới hồ sơ" class="uppercase action-bar">
      <NavigationButton />
    </ActionBar>
    <Stacklayout class="backgroundGrey">
      <Stacklayout
        class="backgroundWhite editform"
        v-if="isChonThuTuc == false"
      >
        <Gridlayout columns="9*,1*" height="40">
          <Label
            col="0"
            text="chọn thủ tục"
            class="uppercase titletracuu"
            style="font-weight: normal; font-size: 15"
          ></Label>
          <Button col="1" @tap="rotateChonThuTuc" style="margin: 0; padding: 0">
            <FormattedString>
              <Label
                text.decode="&#xf078;"
                :class="viewChonThuTuc == true ? 'fas' : 'fas rotate90'"
              ></Label>
            </FormattedString>
          </Button>
        </Gridlayout>
        <Stacklayout v-if="viewChonThuTuc == true">
          <Gridlayout columns="15*, 85*" rows="30,30,30">
            <CheckBox
              col="0"
              row="0"
              checked="true"
              class="transparent textWhite"
              fillColor="#EC860F"
              style="opacity: 0.7"
              fontSize="16"
            />
            <Label
              col="1"
              row="0"
              text="Cấp sở, ban ngành"
              style="color: black; font-size: 14; padding-bottom: 10"
            ></Label>
            <CheckBox
              col="0"
              row="1"
              checked="false"
              class="transparent textWhite"
              fillColor="#EC860F"
              style="opacity: 0.7"
              fontSize="16"
            />
            <Label
              col="1"
              row="1"
              text="Cấp quận huyện"
              style="color: black; font-size: 14; padding-bottom: 10"
            ></Label>
            <CheckBox
              col="0"
              row="2"
              checked="false"
              class="transparent textWhite"
              fillColor="#EC860F"
              style="opacity: 0.7"
              fontSize="16"
            />
            <Label
              col="1"
              row="2"
              text="Cấp phường xã"
              style="color: black; font-size: 14; padding-bottom: 10"
            ></Label>
          </Gridlayout>
          <Label
            text="Cơ quan"
            class="titletracuu"
            style="font-weight: normal; font-size: 15; color: black"
          ></Label>
          <Button
            :text="
              selectCoQuanValue === null
                ? 'Chọn sở, ban ngành'
                : selectCoQuanValue
            "
            :isEnabled="!processing"
            @tap="selectSoBanNganh"
            class="eformselect"
            style="border-radius: 5; background-color: #F7F8F9; border: 1px solid #E6EFF4;"
            width="100%"
            height="30"
          ></Button>
          <Label
            text="Lĩnh vực"
            class="titletracuu"
            style="font-weight: normal; font-size: 15; color: black"
          ></Label>
          <Button
            :text="
              selectLinhVucValue === null ? 'Chọn lĩnh vực' : selectLinhVucValue
            "
            :isEnabled="!processing"
            @tap="selectLinhVuc"
            class="eformselect"
            style="border-radius: 5; background-color: #F7F8F9; border: 1px solid #E6EFF4;"
            width="100%"
            height="30"
          ></Button>
          <Label
            text="Mức độ"
            class="titletracuu"
            style="font-weight: normal; font-size: 15; color: black"
          ></Label>
          <Button
            :text="selectMucDoValue === null ? 'Chọn mức độ' : selectMucDoValue"
            :isEnabled="!processing"
            @tap="selectMucDo"
            class="eformselect"
            style="border-radius: 5; background-color: #F7F8F9; border: 1px solid #E6EFF4;"
            width="100%"
            height="30"
          ></Button>
          <TextField
            style="
              border-radius: 5;
              background-color: #F7F8F9;
              text-align: center;
            "
            width="100%"
            hint="Nhập tên thủ tục"
            autocorrect="false"
            autocapitalizationType="none"
            v-model="keysearching"
            returnKeyType="next"
            height="35"
          ></TextField>
          <Gridlayout columns="4*,6*" height="32" marginTop="15" marginBottom="15">
            <Button
              col="0"
              text="Hủy"
              @tap="goBack"
              class="ediformhuy"
              style="border-width: 1; border-radius: 15; border-color: #ec860f"
            >
            </Button>
            <Button
              col="1"
              style="margin: 0; padding: 0"
              text="Tìm kiếm thủ tục"
              :isEnabled="!processing"
              @tap="timkiemthutuc"
              class="btn-chinhsua textWhite padding20"
            ></Button>
            <!-- <Button
              col="2"
              row="0"
              @tap="goBack"
              style="margin: 0; padding: 0"
            >
              <FormattedString>
                <Label text.decode="&#xf0e2;" class="fas"></Label>
              </FormattedString>
            </Button> -->
          </Gridlayout>
        </Stacklayout>
      </Stacklayout>
      <Label
        :text="'Có ' + total + ' kết quả'"
        class="grey"
        style="padding: 0 20; margin-bottom: 20"
        v-if="viewThongTin == true && isChonThuTuc == false"
      ></Label>
      <Stacklayout
        class="backgroundWhite editform"
        v-if="viewThongTin == true && isChonThuTuc == false"
        marginTop="0"
        height="100%"
      >
        <ListView
          for="serviceinfo in serviceinfos"
          @itemTap="onServiceInfoTap"
          style="height: 92%; width: 100%; padding: 0"
          separatorColor="orange"
        >
          <v-template>
            <GridLayout columns="1*,9*">
              <Label
                text.decode="&#xf15b;"
                class="fas orange"
                style="font-size: 14px"
                col="0"
              ></Label>
              <Label textWrap="true" col="1">
                <FormattedString>
                  <Span :text="serviceinfo._source.serviceName"></Span>
                  <Span text="\n"></Span>
                  <Span text="Lĩnh vực" class="grey"></Span>
                  <Span text="\t"></Span>
                  <Span :text="serviceinfo._source.domainName"></Span>
                  <Span text="\n"></Span>
                  <Span text="Cơ quan" class="grey"></Span>
                  <Span text="\t"></Span>
                  <Span :text="serviceinfo._source.administrationName"></Span>
                  <Span text="\n"></Span>
                  <Span text="Mức độ" class="grey"></Span>
                  <Span text="\t"></Span>
                  <Span :text="serviceinfo._source.maxLevel"></Span>
                </FormattedString>
              </Label>
            </GridLayout>
          </v-template>
        </ListView>
        <Stacklayout
          height="100"
          class="padding20"
          style="padding-bottom: 0; padding-top: 10"
        >
          <GridLayout columns="*,*,*" height="70" width="50%">
            <Button
              col="0"
              class="btn-filter transparent"
              @tap="previosPage"
              :isEnabled="from != 0"
            >
              <FormattedString>
                <Span text.decode="&#xf053;" class="fas" style="font-size: 16px"></Span>
              </FormattedString>
            </Button>
            <Label
              col="1"
              :text="textPage"
              style="text-align: center; font-weight: bold; font-size: 14px"
            >
            </Label>

            <Button
              col="2"
              class="btn-filter transparent"
              @tap="nextPage"
              :isEnabled="from + size <= total"
            >
              <FormattedString>
                <Span text.decode="&#xf054;" class="fas" style="font-size: 16px"></Span>
              </FormattedString>
            </Button>
          </GridLayout>
        </Stacklayout>
      </Stacklayout>
      <Stacklayout v-if="isChonThuTuc == true">
        <Stacklayout class="backgroundWhite editform" height="85%">
          <Label text="Nội dung hồ sơ" class="bold"> </Label>
          <TextView
            class="input backgroundGrey"
            v-model="dossier.dossierContent"
            style="margin: 15 0; color: #206de0; padding: 10 10 10 10; font-size: 13px; color: black"
            borderColor="#DEDEDE"
            borderWidth="1"
            height="100"
            hint="Nhập nội dung hồ sơ"
            returnKeyType="send"
          ></TextView>
          <Label text="Thành phần hồ sơ" class="bold"> </Label>
          <ListView
            for="dossierpart in dossierparts"
            style="height: 500; width: 100%;margin: 0"
            id="listViewDossierPart"
          >
            <v-template>
              <Stacklayout style="margin: 0; margin-bottom: 5">
                <Label textWrap="true">
                  <FormattedString>
                    <Span :text="($index + 1) + '. ' + dossierpart.partName" />
                    <Span
                      text=" (*)"
                      v-if="dossierpart.required"
                      style="color: red"
                    />
                  </FormattedString>
                </Label>
                <Button
                  style="padding: 0 10; margin:0 5; text-align: left; z-index: 1000"
                  @tap="uploadFile(dossierpart)"
                >
                  <FormattedString>
                    <Span
                      text.decode="&#xf093;"
                      class="fas"
                      style="color: grey; margin: 0 10"
                    />
                    <Span text=" Nhấn để tải file lên" style="color: grey" />
                  </FormattedString>
                </Button>
                <Gridlayout
                  columns="20,*,30"
                  v-for="(file, index) in dossierfiles"
                  :key="index"
                  style="margin: 0 5"
                >
                  <Label
                    v-if="file._source.dossierPartNo == dossierpart.partNo"
                    col="0"
                    style="padding: 0; margin-left: 5"
                    text.decode="&#xf0c6;"
                    class="fas"
                  ></Label>
                  <Label
                    v-if="file._source.dossierPartNo == dossierpart.partNo"
                    col="1"
                    :text="file._source.displayName"
                    style="border-radius: 5"
                  ></Label>
                  
                  <!-- <Button
                    v-if="file._source.dossierPartNo == dossierpart.partNo"
                    col="2"
                    height="30"
                    style="padding: 0; margin: 0"
                    @tap="deleteFile(file._source)"
                    class="transparent"
                  >
                    <FormattedString>
                      <Label
                        style="padding: 0; margin: 0; color: red"
                        text.decode="&#xf00d;"
                        class="fas"
                      ></Label>
                    </FormattedString>
                  </Button> -->
                  <Label
                    v-if="file._source.dossierPartNo == dossierpart.partNo"
                    col="2"
                    style="padding: 0; margin: 0; color: red"
                    text.decode="&#xf00d;"
                    class="fas"
                    @tap="deleteFile(file._source)"
                  ></Label>
                </Gridlayout>
              </Stacklayout>
            </v-template>
          </ListView>
        </Stacklayout>
        <Stacklayout orientation="horizontal">
          <Button
            text="Hủy"
            :isEnabled="!processing"
            @tap="huythemoi"
            class="ediformhuy"
            style="border-width: 1; border-radius: 15; border-color: #ec860f"
            height="36"
          >
          </Button>
          <Button
            text="Thêm mới"
            :isEnabled="!processing"
            @tap="themmoi"
            class="btn-chinhsua textWhite"
            height="36"
          >
          </Button>
        </Stacklayout>
      </Stacklayout>
    </Stacklayout>
  </Page>
</template>

<script>
import ChiTietHS from "./ChiTietHS";
import HomeController from "./HomeController";
import {getBoolean,getString} from "@nativescript/core/application-settings";
import {Http, HTTPFormData, HTTPFormDataEntry} from "@klippa/nativescript-http";
import { openFilePicker } from '@nativescript-community/ui-document-picker';
const { Mediafilepicker } = require("nativescript-mediafilepicker");
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
export default {
  props: ["info"],
  created() {
    this.setView(this.info);
    this.getCoQuanQuanLy();
    this.getLichVuc();
    // this.getMucDo();
  },
  data() {
    return {
      pageNumber: 1,
      total: 0,
      pageNumber: 1,
      totalPage: 1,
      textPage: '1/1',
      from: 0,
      size: 10,
      administrationArr: [],
      administrationNameList: [],
      domainNameList: [],
      domainArr: [],
      maxLevelList: ["Mức 3", "Mức 4"],
      maxLevelArr: [
        [{
          "maxLevel": "3"
        }, {
          "maxLevel": "4"
        }]
      ],
      dossierparts: [
      ],
      dossier: {
        dossierIdCTN: "",
        dossierId: 0,
        userId: 0,
        createDate: "",
        modifiedDate: "",
        referenceUid: "",
        counter: 0,
        serviceCode: "",
        serviceName: "",
        govAgencyCode: "",
        govAgencyName: "",
        dossierTemplateNo: "",
        applicantName: "",
        applicantIdType: "",
        applicantIdNo: "",
        applicantIdDate: "",
        address: "",
        cityCode: "",
        cityName: "",
        districtCode: 0,
        districtName: "",
        wardCode: "",
        wardName: "",
        contactName: "",
        contactTelNo: "",
        contactEmail: "",
        dossierNote: "",
        submissionNote: "",
        briefNote: "",
        dossierNo: "",
        submitting: false,
        submitDate: "",
        receiveDate: "",
        dueDate: "",
        releaseDate: "",
        finishDate: "",
        cancellingDate: "",
        correctingDate: "",
        dossierStatus: "",
        dossierStatusText: "",
        dossierSubStatus: "",
        dossierSubStatusText: "",
        viaPostal: 0,
        postalAddress: "",
        postalCityCode: "",
        postalCityName: "",
        postalTelNo: "",
        permission: "",
        visited: false,
        pending: false,
        applicantNote: "",
        notification: false,
        online: true,
        lockState: "",
        delegateAddress: "",
        delegateCityCode: "",
        delegateCityName: "",
        delegateDistrictCode: 0,
        delegateDistrictName: "",
        delegateEmail: "",
        delegateIdNo: "",
        delegateName: "",
        delegateTelNo: "",
        delegateWardCode: "",
        delegateWardName: "",
        postalDistrictCode: "",
        postalDistrictName: "",
        processUnit: 0,
        durationCount: 0,
        durationUnit: 0,
        sampleCount: 0,
        extendDate: "",
        dossierName: "",
        originality: 1,
        originDossierId: 0,
        originDossierNo: "",
        metaData: "",
        groupDossierId: "",
        delegateType: 0,
        documentNo: "",
        serverNo: "",
        systemId: 0,
        groupId: 0,
        dossierCounter: "",
        vnpostalStatus: 0,
        vnpostalProfile: "",
        fromViaPostal: 0,
        postalCodeSend: "",
        processNo: "",
        dossierMarks: "{}",
        serviceLevel: 0,
      },
      processing: false,
      total: 0,
      serviceinfos: [
        {
          _index: "",
          _type: "",
          _id: "",
          _score: null,
          _source: {
            maxLevel: "",
            entryClassPK: "",
            administrationName: "",
            serviceCode: "",
            serviceCodeDVCQG: "",
            domainName: "",
            serviceName: "",
            administrationCode: "",
          },
          sort: [],
        },
      ],
      selectCoQuanValue: null,
      selectLinhVucValue: null,
      selectMucDoValue: null,
      keysearching: null,
      viewChonThuTuc: true,
      viewThongTin: false,
      isChonThuTuc: false,
      dossierfiles: [],
      fileType: {"doc":	"application/msword",
        "docx":	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "csv":	"text/csv",
        "gif":	"image/gif",
        "jar":	"application/java-archive",
        "jpeg": "image/jpeg",
        "jpg":  "image/jpeg",
        "mp3":	"audio/mpeg",
        "mp4":	"video/mp4",
        "mpeg":	"video/mpeg",
        "png":	"image/png",
        "pdf":	"application/pdf",
        "ppt":	"application/vnd.ms-powerpoint",
        "pptx":	"application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "rar":	"application/vnd.rar",
        "svg":	"image/svg+xml",
        "txt":	"text/plain",
        "xls":	"application/vnd.ms-excel",
        "xlsx":	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "xml":	"application/xml",
        "zip":	"application/zip"
      }
    };
  },
  methods: {
    previosPage() {
      this.from = this.from - this.size;
      if (this.from < 0) {
        this.from = 0;
      }
      this.pageNumber = this.from / this.size + 1;
      this.callGetServiceInfo(
        this.administrationCode,
        this.domainCode,
        this.maxLevel,
        this.serviceName
      );
    },
    nextPage() {
      this.from = this.from + this.size;
      this.pageNumber = this.from / this.size + 1;
      this.callGetServiceInfo(
        this.administrationCode,
        this.domainCode,
        this.maxLevel,
        this.serviceName
      );
    },
    getDossierTemplate(input) {
      let vm = this;
      let filterGetService = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          groupId: this.groupId,
          "Authorization": "Bearer " + getString("Token", "")
        },
        dossierTemplate: input,
      };
      vm.$store
        .dispatch("getDossierTemplate", filterGetService)
        .then(function (result) {
          if (result.statusCode == 200) {
            let data = result.data.toJSON();
            let dossierParts = data.dossierParts;
            vm.dossierparts = dossierParts;
          } else {
            
          }
        }).catch(function () {
        })
    },
    callGetServiceInfo(administrationCode, domainCode, maxLevel, serviceName) {
      let vm = this;
      let filterGetService = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Endpoint: "/dvc-hg-20099/LiferayDocumentType/_search",
          Method: "post",
        },
        from: vm.from,
        size: vm.size,
        params: {
          groupId: this.groupId,
          entryClassName: "org.opencps.dossiermgt.model.ServiceInfo",
        },
        source:
          "serviceCode,serviceName,domainName,administrationCode,administrationName,serviceCodeDVCQG,maxLevel,entryClassPK",
        sort: {
          maxLevel_Number_sortable: "desc",
          serviceNameSearch_String_sortable: "asc",
        },
      };
      if (administrationCode != null && administrationCode != undefined) {
        filterGetService.params.administrationCode = administrationCode;
      }
      if (domainCode != null && domainCode != undefined) {
        filterGetService.params.domainCode = domainCode;
      }
      // if (maxLevel != null && maxLevel != undefined) {
        filterGetService.params.maxLevel = maxLevel ? maxLevel : '3, 4';
      // }
      if (
        serviceName != null &&
        serviceName != "" &&
        serviceName != undefined
      ) {
        filterGetService.params.serviceName = serviceName;
      }

      vm.$store
        .dispatch("getThuTucHanhChinh", filterGetService)
        .then(function (result) {
          const data = result.data.toJSON();

          vm.total = data.hits.total;
          vm.totalPage = Math.ceil(vm.total / vm.size)
          vm.textPage = vm.pageNumber + '/' + vm.totalPage
          vm.serviceinfos = data.hits.hits;
        });
    },
    getCoQuanQuanLy() {
      let vm = this;
      let filterGetService = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Endpoint:
            "/dvc-hg-20099/LiferayDocumentType/_search?size=0&filter_path=aggregations.data.doc_count,aggregations.data.groupBy.buckets.fields.hits.total,aggregations.data.groupBy.buckets.fields.hits.hits._source",
          Method: "post",
        },
        field: "administrationIndex_Number_sortable",
        params: {
          groupId: this.groupId,
          entryClassName: "org.opencps.dossiermgt.model.ServiceInfo",
        },
        source: "administrationCode,administrationName",
      };
      vm.$store
        .dispatch("getCoQuanQuanLy", filterGetService)
        .then(function (result) {
          const data = result.data.toJSON();
          const buckets = data.aggregations.data.groupBy.buckets;
          for (let i = 0; i < buckets.length; i++) {
            const bucket = buckets[i];
            const administrationName =
              bucket.fields.hits.hits[0]._source.administrationName;
            vm.administrationNameList.push(administrationName);
            vm.administrationArr.push(bucket.fields.hits.hits[0]._source);
          }
        });
    },
    getLichVuc(administrationCode) {
      let vm = this;
      let filterGetService = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Endpoint:
            "/dvc-hg-20099/LiferayDocumentType/_search?size=0&filter_path=aggregations.data.doc_count,aggregations.data.groupBy.buckets.fields.hits.total,aggregations.data.groupBy.buckets.fields.hits.hits._source",
          Method: "post",
        },
        field: "domainIndex_Number_sortable",
        params: {
          groupId: this.groupId,
          entryClassName: "org.opencps.dossiermgt.model.ServiceInfo",
        },
        source: "domainCode,domainName",
      };
      if (administrationCode != null) {
        filterGetService.params.administrationCode = administrationCode;
      }
      vm.$store
        .dispatch("getLichVuc", filterGetService)
        .then(function (result) {
          const data = result.data.toJSON();
          const buckets = data.aggregations.data.groupBy.buckets;
          vm.domainNameList = [];
          vm.domainArr = [];
          for (let i = 0; i < buckets.length; i++) {
            const bucket = buckets[i];
            const domainName = bucket.fields.hits.hits[0]._source.domainName;

            vm.domainNameList.push(domainName);
            vm.domainArr.push(bucket.fields.hits.hits[0]._source);
          }
        });
    },
    getMucDo() {
      let vm = this;
      let filterGetService = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Endpoint:
            "/dvc-hg-20099/LiferayDocumentType/_search?size=0&filter_path=aggregations.data.doc_count,aggregations.data.groupBy.buckets.fields.hits.total,aggregations.data.groupBy.buckets.fields.hits.hits._source",
          Method: "post",
        },
        field: "maxLevel_Number_sortable",
        size: 1000,
        params: {
          groupId: this.groupId,
          public: true,
          entryClassName: "org.opencps.dossiermgt.model.ServiceInfo",
        },
        source: "maxLevel",
      };
      vm.$store.dispatch("getMucDo", filterGetService).then(function (result) {
        const data = result.data.toJSON();
        const buckets = data.aggregations.data.groupBy.buckets;
        for (let i = 0; i < buckets.length; i++) {
          const bucket = buckets[i];
          const maxLevel = "Mức " + bucket.fields.hits.hits[0]._source.maxLevel;
          vm.maxLevelList.push(maxLevel);
          vm.maxLevelArr.push(bucket.fields.hits.hits[0]._source);
        }
      });
    },
    setView(input) {
      if (input != null) {
        this.isChonThuTuc = true;
        this.viewThongTin = false;
        this.viewChonThuTuc = false;
        this.createNewDossier(input);
        this.getDossierTemplate(input.dossierTemplateNo);
      }
    },
    themmoi() {
      this.processing = false;
      this.$navigateTo(ChiTietHS, {
        clearHistory: false,
        props: {
          dossierId: this.dossier.dossierId,
        },
      });
    },
    deleteFile(file) {
      let vm = this
      file.headers = {
        "Authorization": "Bearer " + getString("Token", ""),
        groupId: vm.groupId,
        "Content-Type": "application/json"
      },
      confirm({
        title: "Xác nhận xóa giấy tờ",
        message: "Bạn có chắc chắn thực hiện thao tác này?",
        okButtonText: "Đồng ý",
        cancelButtonText: "Hủy"
      }).then(result => {
        console.log('fileDelete', file)
        vm.$store.dispatch("deleteDossierFile", file).then(function (result) {
          console.log('result.statusCode.delete', result.statusCode)
          if (result.statusCode == 200) {
            vm.getDossierFile()
          } else {

          }
        });
      })
    },
    huythemoi() {
      this.isChonThuTuc = false;
      this.viewThongTin = true;
    },

    timkiemthutuc() {
      const jsonKeySearch = {};
      if (this.selectCoQuanValue != null) {
        for (let i = 0; i < this.administrationArr.length; i++) {
          const administration = this.administrationArr[i];
          if (administration.administrationName == this.selectCoQuanValue) {
            const administrationCode = administration.administrationCode;
            jsonKeySearch.administrationCode = administrationCode;
          }
        }
      }
      if (this.selectLinhVucValue != null) {
        for (let i = 0; i < this.domainArr.length; i++) {
          const domain = this.domainArr[i];
          if (domain.domainName == this.selectLinhVucValue) {
            const domainCode = domain.domainCode;
            jsonKeySearch.domainCode = domainCode;
          }
        }
      }
      if (this.selectMucDoValue != null) {
        const maxLevel = this.selectMucDoValue.replace("Mức ", "");
        jsonKeySearch.maxLevel = maxLevel;
      }

      this.callGetServiceInfo(
        jsonKeySearch.administrationCode,
        jsonKeySearch.domainCode,
        jsonKeySearch.maxLevel,
        this.keysearching
      );
      this.viewChonThuTuc = false;
      this.viewThongTin = true;
    },
    resetForm() {
      (this.selectCoQuanValue = null),
        (this.selectLinhVucValue = null),
        (this.selectMucDoValue = null),
        (this.keysearching = null);
    },
    rotateChonThuTuc() {
      if (this.viewChonThuTuc) {
        this.viewChonThuTuc = false;
      } else {
        this.viewChonThuTuc = true;
      }
    },
    selectSoBanNganh() {
      let options = {
        title: "Chọn Cơ Quan",
        message: "Thực hiện chọn cơ quan thực hiện thủ tục hành chính",
        cancelButtonText: "Hủy bỏ",
        actions: this.administrationNameList,
      };

      action(options).then((result) => {
        if (result !== "Hủy bỏ") {
          this.selectCoQuanValue = result;

          for (let i = 0; i < this.administrationArr.length; i++) {
            const administration = this.administrationArr[i];
            if (administration.administrationName == this.selectCoQuanValue) {
              this.getLichVuc(administration.administrationCode);
            }
          }
        }
      });
    },
    selectLinhVuc() {
      let options = {
        title: "Chọn lĩnh vực",
        message:
          "Thực hiện chọn lĩnh vực của thủ tục hành chính mà bạn cần tìm kiếm",
        cancelButtonText: "Hủy bỏ",
        actions: this.domainNameList,
      };

      action(options).then((result) => {
        if (result !== "Hủy bỏ") {
          this.selectLinhVucValue = result;
          // console.log(result);
        }
      });
    },
    selectMucDo() {
      let options = {
        title: "Chọn mức độ",
        message: "Thực hiện mức độ của thủ tục hành chính",
        cancelButtonText: "Hủy bỏ",
        actions: this.maxLevelList,
      };

      action(options).then((result) => {
        if (result !== "Hủy bỏ") {
          this.selectMucDoValue = result;
        }
      });
    },
    goBack() {
      this.processing = false;
      this.$navigateTo(HomeController, 
        { clearHistory: false, 
          props: {
            pageName: 'quanlyhoso'
          }
        });
    },
    selectFile() {
      let options = {
        android: {
          maxNumberFiles: 1,
          extensions: ["pdf", "img", "jpeg", "doc", "docx"],
        },
        ios: {
          multipleSelection: false,
          extensions: ["pdf", "img", "jpeg", "doc", "docx"],
        },
      };
      let mediafilepicker = new Mediafilepicker();
      mediafilepicker.openFilePicker(options);

      mediafilepicker.on("getFiles", function (res) {
        let results = res.object.get("results");
        console.dir(results);
      });
      mediafilepicker.on("error", (res) => {
        let msg = res.object.get("msg");
        // console.log(msg);
      });
      mediafilepicker.on("cancel", (res) => {
        let msg = res.object.get("msg");
        // console.log(msg);
      });
    },
    onServiceInfoTap(event) {
      let output = {};
      output.serviceCode = event.item._source.serviceCode;
      output.govAgencyCode = event.item._source.administrationCode;
      output.dossierTemplateNo = "MAU_" + event.item._source.serviceCode;
      output.originality = 1;
      this.createNewDossier(output);
      this.getDossierTemplate(output.dossierTemplateNo);
    },
    createNewDossier(details) {
      let vm = this
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&")
      Http.request({
        url: vm.apiDomainProxy + "/o/rest/v2/dossiers",
        method: "POST",
        headers: {
          "Content-Type": "x-www-form-urlencoded",
          "Authorization": "Bearer " + getString("Token", ""),
          groupId: vm.groupId,
          Accept: "application/json",
        },
        content: formBody,
      }).then(
        (response) => {
          if (response.statusCode == 200) {
            this.isChonThuTuc = true;
            this.viewThongTin = false;
            this.viewChonThuTuc = false;
            let result = response.content.toJSON();
            let dossierContent = result.dossierName + " cho ông/bà/tổ chức " + result.applicantName;
            this.dossier = result;
            this.dossier["dossierContent"] = dossierContent;
          } else {
            vm.$showModal(ThongBao, { props: { message: 'Thêm mới hồ sơ thất bại' }})
          }
        },
        (e) => {
          vm.$showModal(ThongBao, { props: { message: 'Thêm mới hồ sơ thất bại' }})
        }
      );
    },
    async uploadFile(dossierPart) {
      let vm = this
			try {
				var bghttp = require("@nativescript/background-http");
				let files  = await openFilePicker({
					// extensions:['xml']
				});
				let url = vm.apiDomainProxy + '/o/rest/v2/dossiers/' + this.dossier.dossierId + '/files'
				const session = bghttp.session('file-upload')
				let request = {
					url,
					method: 'POST',
					headers: {
						'Content-Type': 'application/octet-stream',
						"Authorization": "Bearer " + getString("Token", "")
					},
					description: 'multipart/form-data',
				}
        let fileName = files.files[0].split("/")
        let displayName = fileName[fileName.length - 1]
        let displayNameSplit = displayName.split(".")
        let type = displayNameSplit[displayNameSplit.length - 1]
        if (!vm.fileType.hasOwnProperty(type)) {
          vm.$showModal(ThongBao, { props: { message: 'Định dạng tài liệu không cho phép' }})
          return
        }
        console.log('fileType', vm.fileType[type])
				let parameter = [
					{ name: 'file', filename: files.files[0], mimeType:  vm.fileType[type] },
					{ name: 'displayName', value: displayName },
					// { name: 'fileType', value: 'image/jpeg' },
          { name: 'fileType', value:  vm.fileType[type] },
					{ name: 'fileSize', value: '489614' },
					{ name: 'isSync', value: 'false' },
					{ name: 'dossierPartNo', value: dossierPart.partNo },
					{ name: 'dossierTemplateNo', value: this.dossier.dossierTemplateNo },
					{ name: 'fileTemplateNo', value: dossierPart.fileTemplateNo },
					{ name: 'formData', value: '' },
					{ name: 'referenceUid', value: '' }
				]
        console.log('file upload', parameter)
				const task = session.multipartUpload(parameter, request)
				task.on('complete', response => {
          if (response.responseCode == 200) {
            setTimeout(function () {
              vm.getDossierFile()
            }, 300)
          } else {
          }
				})
			} catch (error) {
				console.error(error)
			}
		},
    getDossierFile() {
      let vm = this;
      vm.dossierfiles = []
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
          dossierId: this.dossier.dossierId,
          entryClassName: "org.opencps.dossiermgt.model.DossierFile",
          removed: false
        },
        source:
          "dossierId,displayName,dossierPartNo,modifiedDateLucene,eForm,esign,formData,fileSize,eSign,fileEntryId,fileType,referenceUid",
      };
      vm.$store.dispatch("getThuTucHanhChinh", filterGetService).then(function (result) {
        let data = result.data.toJSON();
        vm.dossierfiles = data.hits.hits;
        vm.getDossierTemplate(vm.dossier.dossierTemplateNo)
      });
    },
  },
};
</script>

<style>
</style>