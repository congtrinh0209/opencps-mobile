<template>
  <FlexboxLayout class="page backgroundGrey" style="width: 100%; height: 100%">
    <Stacklayout style="padding-bottom: 0">
      <GridLayout columns="*, 80" rows="60">
        <Label col="0" text="Thủ tục hành chính" class="uppercase titletracuu padding20" style="padding-left: 10"></Label>
      </GridLayout>
      <!-- <Stacklayout orientation="horizontal">
        <TextField
          hint="Tìm kiếm"
          height="40"
          width="273"
          class="tracuuinput tracuuinputTthc"
          style="margin-right: 0"
          v-model="serviceNameSearch"
        ></TextField>
        <Button
          :isEnabled="!processing"
          @tap="tracuumahoso"
          height="40"
          class="btn-chinhsua textWhite padding20"
          style="margin-left: -50; padding: 0 5; margin-right: 5"
        >
          <FormattedString>
            <Span text.decode="&#xf002;" class="fas"></Span>
          </FormattedString>
        </Button>
        <Button
          :isEnabled="!processing"
          @tap="btnLoc"
          height="40"
          class="btn-chinhsua textWhite"
          style="margin-left: 5; padding: 0 5"
        >
          <FormattedString>
            <Span text="Lọc "></Span>
            <Span text.decode="&#xf0b0;" class="fas"></Span>
          </FormattedString>
        </Button>
      </Stacklayout> -->
      <GridLayout columns="*, 30" rows="40" style="padding-left: 10">
        <TextField
          hint="Tìm kiếm"
          height="40"
          class="tracuuinput tracuuinputTthc"
          style="margin-right: 0"
          v-model="serviceNameSearch"
          col="0"
        ></TextField>
        <Button
          col="1"
          :isEnabled="!processing"
          @tap="tracuumahoso"
          height="40"
          class="btn-chinhsua textWhite padding20"
          style="margin-left: -20; padding: 0 5; margin-right: 5"
        >
          <FormattedString>
            <Span text.decode="&#xf002;" class="fas"></Span>
          </FormattedString>
        </Button>
      </GridLayout>
      <Gridlayout columns="*, 80" height="52" class="" style="padding: 10 0 10 10">
        <Label col="0" style="font-size: 14px">
          <FormattedString>
            <Span text="Tổng số "></Span>
            <Span :text="total" style="font-weight: bold"></Span>
            <Span text=" thủ tục"></Span>
          </FormattedString>
        </Label>
        <Button
          col="1"
          :isEnabled="!processing"
          @tap="btnLoc"
          height="40"
          class="btn-chinhsua textWhite"
          style="margin-right:5 ; padding: 0 5"
        >
          <FormattedString>
            <Span text="Lọc "></Span>
            <Span text.decode="&#xf0b0;" class="fas"></Span>
          </FormattedString>
        </Button>
      </Gridlayout>
      <!-- <Gridlayout columns="*, 45, 45, 45" height="52" class="padding20" style="padding-right: 0, padding-left: 10">
        <Label col="0" style="font-size: 14px">
          <FormattedString>
            <Span text="Tổng số "></Span>
            <Span :text="total" style="font-weight: bold"></Span>
            <Span text=" TTHC"></Span>
          </FormattedString>
        </Label>
        <Button col="1" class="btn-filter transparent" @tap="filterByName">
          <FormattedString>
            <Span text.decode="&#xf15d;" class="fas font16" v-if="sortByName"></Span>
            <Span text.decode="&#xf15e;" class="fas font16" v-else></Span>
          </FormattedString>
        </Button>
        <Button col="2" class="btn-filter transparent" @tap="filterByLevel">
          <FormattedString>
            <Span text.decode="&#xf161;" class="fas font16" v-if="sortByLevel"></Span>
            <Span text.decode="&#xf160;" class="fas font16" v-else></Span>
          </FormattedString>
        </Button>
        <Button col="3" class="btn-filter transparent" @tap="refreshLoc">
          <FormattedString>
            <Span text.decode="&#xf0e2;" class="fas"></Span>
          </FormattedString>
        </Button>
      </Gridlayout> -->
      <GridLayout
        columns="*, 5*,2*,*"
        backgroundColor="#F6E0C5"
        height="32"
        style="font-size: 14px"
      >
        <Label text="#" col="0" class="columnName"></Label>
        <Label text="Mã - Tên thủ tục" col="1" class="columnName"></Label>
        <Label text="Lĩnh vực" col="2" class="columnName"></Label>
        <Label text="Mức" col="3" class="columnName" style="margin-left: 5"></Label>
      </GridLayout>
      <ListView
        v-if="serviceinfos.length && serviceinfos[0]['_id']"
        for="serviceinfo in serviceinfos"
        @itemTap="onItemTap"
        style="height: 1700px; width: 100%; padding: 0; font-size: 14px"
        separatorColor="orange"
      >
        <v-template>
          <GridLayout columns="*, 5*,2*,*" width="100%" style="padding-top: 0; padding-bottom:5">
            <Label col="0" :text="(pageNumber*size - size) + $index + 1 "></Label>
            <Label
              col="1"
              textWrap="true"
              v-if="serviceinfo._source.domainName != null"
            >
              <FormattedString>
                <Span
                  :text="serviceinfo._source.serviceCode"
                  class="bold"
                ></Span>
                <Span text="\n("></Span>
                <Span :text="serviceinfo._source.domainName"></Span>
                <Span text=")"></Span>
                <Span :text="serviceinfo._source.serviceName"></Span>
              </FormattedString>
            </Label>
            <Label col="1" textWrap="true" v-else>
              <FormattedString>
                <Span
                  :text="serviceinfo._source.serviceCode"
                  class="bold"
                ></Span>
                <Span text="\n"></Span>
                <Span :text="serviceinfo._source.administrationName"></Span>
              </FormattedString>
            </Label>
            <Label
              textWrap="true"
              :text="serviceinfo._source.domainName"
              col="2"
            ></Label>
            <Label
              :text="serviceinfo._source.maxLevel"
              col="3"
              style="
                font-weight: bold;
                text-align: center;
                padding: 0;
                margin: 0;
              "
            ></Label>
          </GridLayout>
        </v-template>
      </ListView>
    </Stacklayout>
    <Stacklayout
      v-if="serviceinfos.length && serviceinfos[0]['_id']"
      height="70"
      class="padding20"
      style="padding-bottom: 0; padding-top: 0"
    >
      <GridLayout columns="*,*,*" height="70" width="50%" >
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
import ChiTietTTHC from "./ChiTietTTHC";
import ThongTinTaiKhoan from "./ThongTinTaiKhoan.vue";
import LocThuTucHanhChinh from "./LocThuTucHanhChinh";
export default {
  created() {
    this.callGetServiceInfo();
  },
  data() {
    return {
      pageNumber: 1,
      totalPage: 1,
      textPage: '1/1',
      total: 0,
      from: 0,
      size: 30,
      sortByLevel: true,
      sortByName: true,
      serviceNameSearch: null,
      administrationCode: "",
      domainCode: "",
      maxLevel: "",
      serviceName: "",
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
    tracuumahoso() {
      (this.administrationCode = null),
        (this.domainCode = null),
        (this.maxLevel = null),
        this.callGetServiceInfo(null, null, null, this.serviceNameSearch);
    },
    refreshLoc() {
      this.callGetServiceInfo(null, null, null, null);
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
        sort: {},
      };
      if (
        administrationCode != null &&
        administrationCode != "" &&
        administrationCode != undefined
      ) {
        filterGetService.params.administrationCode = administrationCode;
      }
      if (domainCode != null && domainCode != "" && domainCode != undefined) {
        filterGetService.params.domainCode = domainCode;
      }
      if (maxLevel != null && maxLevel != "" && maxLevel != undefined) {
        filterGetService.params.maxLevel = maxLevel;
      }
      if (
        serviceName != null &&
        serviceName != "" &&
        serviceName != undefined
      ) {
        filterGetService.params.serviceName = serviceName;
      }
      if (vm.sortByName) {
        filterGetService.sort.serviceNameSearch_String_sortable = "asc";
      } else {
        filterGetService.sort.serviceNameSearch_String_sortable = "desc";
      }
      if (vm.sortByLevel) {
        filterGetService.sort.maxLevel_Number_sortable = "asc";
      } else {
        filterGetService.sort.maxLevel_Number_sortable = "desc";
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
    filterByName() {
      if (this.sortByName) {
        this.sortByName = false;
      } else {
        this.sortByName = true;
      }
      this.callGetServiceInfo(
        this.administrationCode,
        this.domainCode,
        this.maxLevel,
        this.serviceNameSearch
      );
    },
    filterByLevel() {
      if (this.sortByLevel) {
        this.sortByLevel = false;
      } else {
        this.sortByLevel = true;
      }
      this.callGetServiceInfo(
        this.administrationCode,
        this.domainCode,
        this.maxLevel,
        this.serviceNameSearch
      );
    },
    btnLoc() {
      this.$showModal(LocThuTucHanhChinh, {
        props: {
          administrationCode: this.administrationCode,
          domainCode: this.domainCode,
          maxLevel: this.maxLevel
        }
      }).then((returnValue) => {
        this.administrationCode = returnValue.administrationCode;
        this.domainCode = returnValue.domainCode;
        this.maxLevel = returnValue.maxLevel;
        this.from = 0;
        this.pageNumber = 1;
        this.callGetServiceInfo(
          this.administrationCode,
          this.domainCode,
          this.maxLevel
        );
      });
    },
    onItemTap(event) {
      this.processing = false;
      this.$navigateTo(ChiTietTTHC, {
        clearHistory: false,
        props: {
          entryClassPK: event.item._source.entryClassPK,
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