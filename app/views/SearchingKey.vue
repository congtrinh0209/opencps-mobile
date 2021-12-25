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
      text="Lĩnh vực"
      class="titletracuu"
      style="font-weight: normal; font-size: 15; color: black"
    ></Label>
    <Button
      :text="selectLinhVucValue === null ? 'Chọn lĩnh vực' : selectLinhVucValue"
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
    <Label
      text="Ngày tiếp nhận"
      class="titletracuu"
      style="font-weight: normal; font-size: 15; color: black"
    ></Label>

    <GridLayout columns="*,50,*" width="100%" height="50">
      <Stacklayout col="0" row="0">
        <TextField
          class="input"
          style="border: 1px solid #E6EFF4; background-color: #F7F8F9;"
          hint="Từ ngày"
          height="35"
          keyboardType="email"
          autocorrect="false"
          autocapitalizationType="none"
          v-model="receiveDateFrom"
          returnKeyType="next"
        ></TextField>
      </Stacklayout>
      <Stacklayout col="2" row="0">
        <TextField
          class="input"
          style="border: 1px solid #E6EFF4; background-color: #F7F8F9;"
          hint="Đến ngày"
          height="35"
          keyboardType="email"
          autocorrect="false"
          autocapitalizationType="none"
          v-model="receiveDateTo"
          returnKeyType="next"
        ></TextField>
      </Stacklayout>
    </GridLayout>
    <Label
      text="Ngày hẹn trả"
      class="titletracuu"
      style="font-weight: normal; font-size: 15; color: black"
    ></Label>
    <GridLayout columns="*,50,*" width="100%" height="50">
      <Stacklayout col="0" row="0">
        <TextField
          class="input"
          style="border: 1px solid #E6EFF4; background-color: #F7F8F9;"
          hint="Từ Ngày"
          height="35"
          keyboardType="email"
          autocorrect="false"
          autocapitalizationType="none"
          v-model="dueDateLuceneFrom"
          returnKeyType="next"
        ></TextField>
      </Stacklayout>
      <Stacklayout col="2" row="0">
        <TextField
          class="input"
          style="border: 1px solid #E6EFF4; background-color: #F7F8F9;"
          hint="Đến Ngày"
          height="35"
          keyboardType="email"
          autocorrect="false"
          autocapitalizationType="none"
          v-model="dueDateLuceneTo"
          returnKeyType="next"
        ></TextField>
      </Stacklayout>
    </GridLayout>
    <Stacklayout orientation="horizontal" class="locThuTuc" style="margin-left: 0; margin-top: 10">
      
      <Button
        text="Hủy"
        @tap="onCloseTap"
        :isEnabled="!processing"
        class="ediformhuy padding20"
        style="border-width: 1; border-radius: 15; border-color: #ec860f"
      >
      </Button>
      <Button
        text="Áp dụng"
        @tap="btnSearch"
        :isEnabled="!processing"
        class="btn-chinhsua textWhite padding20"
      >
      </Button>
    </Stacklayout>
  </StackLayout>
</template>

<script>
export default {
  created(){
    this.getLichVuc();
    this.getMucDo();
  },
  data() {
    return {
      selectLinhVucValue: null,
      selectMucDoValue: null,
      domainNameList: [],
      domainArr: [],
      maxLevelList: [],
      maxLevelArr: [],
      receiveDateFrom:"",
      receiveDateTo:"",
      dueDateLuceneFrom:"",
      dueDateLuceneTo:"",
      domainCodeSelected: "",
    };
  },
  methods: {
    getLichVuc() {
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
      vm.$store
        .dispatch("getLichVuc", filterGetService)
        .then(function (result) {
          const data = result.data.toJSON();
          // console.log("result.data: ", data);
          const buckets = data.aggregations.data.groupBy.buckets;
          // console.log("buckets", buckets);
          vm.domainNameList=[];
          vm.domainArr=[];
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
    onItemTap(event) {
      this.$modal.close(event.item.id);
    },
    onCloseTap() {
      this.$modal.close(-1);
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
          console.log(result);
          
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
          console.log(result);
        }
      });
    },
    btnSearch(event) {
      const jsonKeySearch = {};
      if (this.selectLinhVucValue != null) {
        for (let i = 0; i < this.domainArr.length; i++) {
          const domain = this.domainArr[i];
          if (domain.domainName == this.selectLinhVucValue) {
            const domainCode = domain.domainCode;
            jsonKeySearch.domainCode = domainCode;
          }
        }
      } else {
        jsonKeySearch.domainCode = "";
      }
      if(this.selectMucDoValue != null){
        const maxLevel = this.selectMucDoValue.replace("Mức ", "");
        jsonKeySearch.maxLevel = maxLevel;
      } else {
        jsonKeySearch.maxLevel = "";
      }
      if(this.receiveDateFrom != null){
        jsonKeySearch.receiveDateFrom = this.receiveDateFrom;
      }
      if(this.receiveDateTo != null){
        jsonKeySearch.receiveDateTo = this.receiveDateTo;
      }
      if(this.dueDateLuceneFrom != null){
        jsonKeySearch.dueDateLuceneFrom = this.dueDateLuceneFrom;
      }
      if(this.dueDateLuceneTo != null){
        jsonKeySearch.dueDateLuceneTo = this.dueDateLuceneTo;
      }
      console.log("jsonKeySearch: \n", jsonKeySearch)


      this.$modal.close(jsonKeySearch);
    },
  },
};
</script>

<style>
</style>
