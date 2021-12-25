<template>
  <StackLayout class="p-20" backgroundColor="white">
    <Label>
      <FormattedString>
        <Span
          text.decode="&#xf0b0;"
          style="color: orange; font-size: 18"
          class="fas"
        ></Span>
        <Span
          text="  BỘ LỌC TÌM KIẾM"
          class="uppercase"
          style="color: orange; font-weight: bold; font-size: 18"
        ></Span>
      </FormattedString>
    </Label>
    <Label
      text="Cơ quan"
      class="titletracuu"
      style="font-weight: normal; font-size: 15; color: black"
    ></Label>
    <Button
      :text="selectCoQuanValue === null ? 'Chọn Cơ quan' : selectCoQuanValue"
      @tap="selectCoQuan"
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
      :text="selectLinhVucValue === null ? 'Chọn lĩnh vực' : selectLinhVucValue"
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
      @tap="selectMucDo"
      class="eformselect"
      style="border-radius: 5; background-color: #F7F8F9; border: 1px solid #E6EFF4;"
      width="100%"
      height="30"
    ></Button>

    <Stacklayout orientation="horizontal" class="locThuTuc" style="margin-left: 0; margin-top: 10">
      <Button
        text="Hủy"
        @tap="onCloseTap"
        class="ediformhuy padding20"
        style="border-width: 1; border-radius: 15; border-color: #ec860f"
      >
      </Button>
      <Button
        text="Áp dụng"
        @tap="btnSearch"
        class="btn-chinhsua textWhite padding20"
      >
      </Button>
    </Stacklayout>
  </StackLayout>
</template>

<script>
export default {
  props: ["administrationCode", "domainCode", "maxLevel"],
  created() {
    this.getCoQuanQuanLy();
    this.getLichVuc();
    this.getMucDo();
  },
  data() {
    return {
      administrationArr: [],
      administrationNameList: [],
      domainNameList: [],
      domainArr: [],
      maxLevelList: [],
      maxLevelArr: [],
      selectCoQuanValue: null,
      selectLinhVucValue: null,
      selectMucDoValue: null,
    };
  },
  methods: {
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
          let data = result.data.toJSON();
          let buckets = data.aggregations.data.groupBy.buckets;
          for (let i = 0; i < buckets.length; i++) {
            let bucket = buckets[i];
            let administrationName = bucket.fields.hits.hits[0]._source.administrationName;
            vm.administrationNameList.push(administrationName);
            vm.administrationArr.push(bucket.fields.hits.hits[0]._source);
          }
          if (vm.administrationCode) {
            try {
              vm.selectCoQuanValue = vm.administrationArr.find(function(item) {
                return item.administrationCode == vm.administrationCode
              })['administrationName']
            } catch (error) {
            }
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
          vm.domainNameList=[];
          vm.domainArr=[];
          for (let i = 0; i < buckets.length; i++) {
            const bucket = buckets[i];
            const domainName = bucket.fields.hits.hits[0]._source.domainName;

            vm.domainNameList.push(domainName);
            vm.domainArr.push(bucket.fields.hits.hits[0]._source);
          }
          if (vm.domainCode) {
            try {
              vm.selectLinhVucValue = vm.domainArr.find(function(item) {
                return item.domainCode == vm.domainCode
              })['domainName']
            } catch (error) {
            }
          }
        })
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
        if (vm.maxLevel) {
          try {
            vm.selectMucDoValue = vm.maxLevelArr.find(function(item) {
              return item.maxLevel == vm.maxLevel
            })['maxLevel']
          } catch (error) {
          }
        }
      });
    },

    btnSearch(event) {
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
      if(this.selectMucDoValue != null){
        const maxLevel = this.selectMucDoValue.replace("Mức ", "");
        jsonKeySearch.maxLevel = maxLevel;
      }
      this.$modal.close(jsonKeySearch);
    },
    onCloseTap() {
      this.$modal.close({
        administrationCode: '',
        domainCode: '',
        maxLevel: ''
      });
    },
    selectCoQuan() {
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
  },
};
</script>

<style>
</style>
