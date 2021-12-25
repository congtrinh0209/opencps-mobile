<template>
  <FlexboxLayout class="page backgroundGrey" style="width: 100%; height: 100%">
    <Stacklayout ref="body" style="margin-bottom: 0">
      <Stacklayout style="padding: 0 10;padding-top: 10;">
        <GridLayout columns="*, 120" height="50">
          <Label
            col="0"
            text="Quản lý hồ sơ"
            class="uppercase titletracuu"
          ></Label>
          <Button
            height="32"
            class="btn-chinhsua textWhite"
            col="1"
            @tap="Themmoihoso"
            style="margin-top: -5; margin-right: 0"
          >
            <FormattedString>
              <Span text="Thêm mới "></Span>
              <Span text.decode="&#xf067;" class="fas"></Span>
            </FormattedString>
          </Button>
        </GridLayout>
        <GridLayout columns="*, 20" height="40">
          <TextField
            col="0"
            hint="Nhập mã hồ sơ, tên thủ tục"
            height="40"
            class="tracuuinput"
            style="margin-left: 0; margin-right: 0"
          ></TextField>
          <Button
            col="1"
            :isEnabled="!processing"
            @tap="tracuumahoso"
            height="40"
            class="btn-chinhsua textWhite padding20"
            style="margin-left: -50; padding: 0 5; margin-right: 0"
          >
            <FormattedString>
              <Span text.decode="&#xf002;" class="fas"></Span>
            </FormattedString>
          </Button>
        </GridLayout>
        <Gridlayout columns="*, 75, 120" height="52" style="padding-right: 0">
          <Label col="0" style="font-size: 14px; padding-top: 15">
            <!-- <FormattedString>
              <Span text="Tổng số "></Span>
              <Span :text="total" style="font-weight: bold"></Span>
              <Span text=" hồ sơ"></Span>
            </FormattedString> -->
          </Label>
          <Button
            col="1"
            :isEnabled="!processing"
            @tap="btnLoc"          
            height="32"
            class="btn-chinhsua textWhite"
            style="margin-top: 0; padding: 0 5; margin-right: 0"
          >
            <FormattedString>
              <Span text="Lọc "></Span>
              <Span text.decode="&#xf0b0;" class="fas"></Span>
            </FormattedString>
          </Button>
          <Button
            height="32"
            class="btn-chinhsua textWhite"
            col="2"
            @tap="showModal"
            style="margin-top: 0; margin-right: 0"
          >
            <FormattedString>
              <Span text="Danh mục "></Span>
              <Span text.decode="&#xf0ca;" class="fas"></Span>
            </FormattedString>
          </Button>
          <!-- <Button col="1" class="btn-filter transparent" @tap="sortbyDate">
            <FormattedString>
              <Span
                text.decode="&#xf162;"
                class="fas"
                v-if="sortbyCreateDate"
              ></Span>
              <Span text.decode="&#xf163;" class="fas" v-else></Span>
            </FormattedString>
          </Button>
          <Button col="2" class="btn-filter transparent">
            <FormattedString>
              <Span text.decode="&#xf0e2;" class="fas"></Span>
            </FormattedString>
          </Button> -->
        </Gridlayout>
      </Stacklayout>
      <GridLayout columns="*, 9*" backgroundColor="#F6E0C5" height="32">
        <Label text="#" col="0" class="columnName" style="padding: 7 5"></Label>
        <Label col="1" class="columnName" style="font-size: 14px; padding-top: 5">
          <FormattedString>
            <Span :text="DanhMucName"></Span>
            <Span text=" ("></Span>
            <Span :text="DanhMucCount"></Span>
            <Span text=")"></Span> </FormattedString
        ></Label>
      </GridLayout>
      <ListView
        for="dossier in dossiers"
        @itemTap="onItemTap"
        style="height: 1400px; width: 100%; padding: 0"
        separatorColor="orange"
        ref="listview"
      >
        <v-template>
          <GridLayout columns="*, 9*" style="font-size: 14px; padding-top: 0; padding-bottom:5">
            <Label col="0" :text="(pageNumber*size - size) + $index + 1 "></Label>
            <Label textWrap="true" col="1">
              <FormattedString>
                <Span
                  :text="dossier._source.dossierNo"
                  class="bold"
                  v-if="
                    dossier._source.dossierNo != null &&
                    dossier._source.dossierNo != ''
                  "
                ></Span>
                <Span text="Chưa có mã" class="bold" v-else></Span>
                <Span text="\n"></Span>
                <Span :text="dossier._source.dossierName"></Span>
                <Span text="\n"></Span>
                <Span text="Tình trạng: " class="grey"></Span>
                <Span :text="dossier._source.dossierStatusText"></Span>
                <Span text="\n"></Span>
                <Span text="Cơ quan: " class="grey"></Span>
                <Span :text="dossier._source.govAgencyName"></Span>
                <Span text="\n"></Span>
                <Span text="Ngày tiếp nhận: " class="grey"></Span>
                <Span :text="dossier._source.receiveDate"></Span>
                <Span text="\n"></Span>
                <Span text="Ngày hẹn trả: " class="grey"></Span>
                <Span :text="dossier._source.dueDate"></Span>
              </FormattedString>
            </Label>
          </GridLayout>
        </v-template>
      </ListView>
    </Stacklayout>
    <Stacklayout
      height="70"
      class="padding20"
      style="padding-bottom: 0; padding-top: 0"
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
          class="pageNumberPagination"
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
  </FlexboxLayout>
</template>

<script>
import SearchingKey from "./SearchingKey";
import DanhMuc from "./DanhMuc";
import ChiTietHS from "./ChiTietHS.vue";
import ThongTinTaiKhoan from "./ThongTinTaiKhoan";
import ThemMoiBuoc1 from "./ThemMoiBuoc1";
import { Http, HttpResponse } from "@nativescript/core";
import { Menu } from "nativescript-menu";
export default {
  created() {
    this.getHoSoByLoc(this.locJSON);
  },
  data() {
    return {
      stepCodesFilter: '',
      sortbyCreateDate: true,
      DanhMucName: "Tất cả hồ sơ",
      DanhMucCount: 0,
      pageNumber: 1,
      totalPage: 1,
      textPage: '1/1',
      total: 0,
      from: 0,
      size: 10,
      StepCodesActive: "",
      locJSON: {},
      dossiers: [
        // {
        //   _index: "",
        //   _type: "",
        //   _id: "",
        //   _score: 0,
        //   _source: {
        //     dossierName: "",
        //     dossierNo: "",
        //     govAgencyCode: "",
        //     dueDate: "",
        //     govAgencyName: "",
        //     dossierId: "",
        //     dossierStatusText: "",
        //   },
        // },
      ],
    };
  },
  methods: {
    previosPage() {
      this.from = this.from - this.size;
      if (this.from < 0) {
        this.from = 0;
      }
      this.pageNumber = this.from / this.size + 1;
      this.getHoSoByLoc(this.locJSON);
    },
    nextPage() {
      this.from = this.from + this.size;
      this.pageNumber = this.from / this.size + 1;
      this.getHoSoByLoc(this.locJSON);
    },
    optionHoSo(dossierId) {
      Menu.popup({
        cancelButtonText: "Hủy bỏ",
        // view: this.$refs.element.menuBtn,
        actions: [
          { id: "1", title: "Yêu cầu rút hồ sơ" },
          { id: "2", title: "Chi tiết hồ sơ" },
        ],
      })
        .then((action) => {
          if (action.id == 2) {
            this.processing = false;
            this.$navigateTo(ChiTietHS, {
              clearHistory: false,
              props: {
                dossierId: dossierId,
              },
            });
          }
        })
        .catch(console.log());
    },
    sortbyDate() {
      if (this.sortbyCreateDate) {
        this.sortbyCreateDate = false;
      } else {
        this.sortbyCreateDate = true;
      }
      this.getHoSoByLoc(this.locJSON);
    },
    callGetDossierByApplicantId(applicantIdNo) {
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
          applicantIdNo: applicantIdNo,
          entryClassName: "org.opencps.dossiermgt.model.Dossier",
        },
        mustNot: {
          "match": {"dossierActionId":  0}
        },
        source: "dossierId,dossierNo,dossierName,govAgencyCode,govAgencyName,dueDate,dossierStatusText",
      };
      vm.$store
        .dispatch("getThuTucHanhChinh", filterGetService)
        .then(function (result) {
          const data = result.data.toJSON();
          vm.total = data.hits.total;
          vm.dossiers = data.hits.hits;
          vm.DanhMucCount = data.hits.total;
        });
    },
    Themmoihoso() {
      this.processing = false;
      this.$navigateTo(ThemMoiBuoc1, { clearHistory: false });
    },
    tracuumahoso () {
      this.getHoSoByLoc(this.locJSON)
    },
    btnLoc() {
      this.$showModal(SearchingKey).then((returnValue) => {
        returnValue.stepCodes = this.StepCodesActive;
        let st = returnValue.stepCodes.replace(/,/g, ", ");
        returnValue.stepCodes = st;
        this.stepCodesFilter = st
        this.from = 0
        this.pageNumber = 1
        this.getHoSoByLoc(returnValue);
      });
    },
    getHoSoByLoc(locJSON) {
      let vm = this
      this.locJSON = locJSON
      let filterGetService = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Endpoint:
            "/dvc-hg-2009920099/LiferayDocumentType/_search?filter_path=hits.total,hits.hits._source",
          Method: "post",
        },
        from: this.from,
        size: this.size,
        params: {
          groupId: this.groupId,
          userId: 864070,
          entryClassName: "org.opencps.dossiermgt.model.Dossier",
          systemId:  0,
          originality:  "0, 1, 2, 3, 4"
        },
        ranges: {},
        mustNot: {
          "match": {"dossierActionId":  0}
        },
        source:
          "dossierNo,dossierName,serviceName,govAgencyName,createDateMobile,dossierSubStatusText,dossierId,lastActionDate,receiveDate,dueDate,domainCode,dossierStatusText",
        sort: {
          // createDate_Number_sortable: "desc",
        },
      };
      if (this.sortbyCreateDate) {
        filterGetService.sort.createDate_Number_sortable = "desc";
      } else {
        filterGetService.sort.createDate_Number_sortable = "asc";
      }
      if (locJSON.stepCodes != "" && locJSON.stepCodes != null) {
        filterGetService.params.stepCode = locJSON.stepCodes;
      }
      if (locJSON.domainCode != "" && locJSON.domainCode != null) {
        filterGetService.params.domainCode = locJSON.domainCode;
      }
      if (locJSON.maxLevel != "" && locJSON.maxLevel != null) {
        filterGetService.params.serviceLevel = locJSON.maxLevel;
      }
      if (locJSON.receiveDateFrom != "" && locJSON.receiveDateFrom != null) {
        let gte = {};
        gte.gte = locJSON.receiveDateFrom;
        filterGetService.ranges.receiveDateFrom = gte;
      }
      if (locJSON.receiveDateTo != "" && locJSON.receiveDateTo != null) {
        let lte = {};
        lte.lte = locJSON.receiveDateTo;
        filterGetService.ranges.receiveDateTo = lte;
      }
      if (
        locJSON.dueDateLuceneFrom != "" &&
        locJSON.dueDateLuceneFrom != null
      ) {
        let gte = {};
        gte.gte = locJSON.dueDateLuceneFrom;
        filterGetService.ranges.dueDateLuceneFrom = gte;
      }
      if (locJSON.dueDateLuceneTo != "" && locJSON.dueDateLuceneTo != null) {
        let lte = {};
        lte.lte = locJSON.dueDateLuceneTo;
        filterGetService.ranges.dueDateLuceneTo = lte;
      }
      if (vm.stepCodesFilter) {
        filterGetService.params.stepCode = vm.stepCodesFilter.split(',').map(item => {
          item = item + ' '
          return item
        }).toString()
      }
      // console.log("filterGetService: ", filterGetService);

      vm.$store
        .dispatch("filterDossier", filterGetService)
        .then(function (result) {
          const data = result.data.toJSON();
          vm.total = data.hits.total;
          vm.totalPage = Math.ceil(vm.total / vm.size)
          vm.textPage = vm.pageNumber + '/' + vm.totalPage
          vm.dossiers = data.hits.hits;
          vm.DanhMucCount = data.hits.total;
          // console.log('dossier', vm.dossiers)
        });
    },

    getHoSoByDanhMuc(stepCodes) {
      let vm = this
      var authorizationBasic = "ZHVhbnRyYW52YW5AZ21haWwuY29tOkFiY2RAMTIzNA=="
      Http.request({
        url:
          vm.apiDomainProxy + "/o/rest/v2/dossiers/todo?owner=true&order=true&step=" +
          stepCodes +
          "&start=0&end=15",
        method: "GET",
        headers: {
          Authorization: "Basic " + authorizationBasic,
          groupId: this.groupId,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(
        (response) => {
          let responseData = response.content.toJSON();
          this.DanhMucCount = responseData.total;
          let dossierList = responseData.data;
          let dosssierResult = [];
          for (let i = 0; i < dossierList.length; i++) {
            let dossier = dossierList[i];
            let entity = {};
            entity._source = dossier;
            dosssierResult.push(entity);
          }
          this.dossiers = dosssierResult;
          this.total = responseData.total;
          this.StepCodesActive = stepCodes;
        },
        (e) => {}
      );
    },
    showModal() {
      this.$showModal(DanhMuc).then((returnValue) => {
        if (returnValue != -1) {
          this.DanhMucName = returnValue.menuType == 3 ? 'Tất cả hồ sơ' : returnValue.menuName;
          this.DanhMucCount = returnValue.totalCount;
          this.stepCodesFilter = returnValue.stepCodes;
          // this.getHoSoByDanhMuc(stepCodes);
          this.from = 0
          this.pageNumber = 1
          this.getHoSoByLoc(this.locJSON);
        }
      });
    },

    onItemTap(event) {
      this.processing = false;
      this.$navigateTo(ChiTietHS, {
        clearHistory: false,
        props: {
          dossierId: event.item._source.dossierId,
        },
      });
    },
    goThongTinTaiKhoan() {
      this.processing = false;
      this.$navigateTo(ThongTinTaiKhoan, { clearHistory: false });
    },
  },
};
</script>

<style>
</style>