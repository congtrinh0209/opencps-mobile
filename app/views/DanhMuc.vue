<template>
  <StackLayout backgroundColor="white" style="padding: 15 20;">
    <Label>
      <FormattedString>
        <Span
          text="DANH MỤC HỒ SƠ"
          class="uppercase"
          style="color: orange; font-weight: bold; font-size: 18"
        ></Span>
      </FormattedString>
    </Label>
    
    <ListView
      for="danhmuc in DanhMucs"
      @itemTap="onItemTap"
      style="width: 100%; height:400; padding: 0"
    >
      <v-template>
        <GridLayout columns="*,50">
          <Label textWrap="true" col="0">
            <FormattedString>
              <Span :text="danhmuc.menuType == 3 ? 'TẤT CẢ HỒ SƠ' : danhmuc.menuName" class="bold"></Span>
            </FormattedString>
          </Label>
          <Label
            textWrap="true"
            col="1"
            backgroundColor="orange"
            style="text-align: center; border-radius: 15"
          >
            <FormattedString>
              <Span :text="danhmuc.totalCount" class="bold" style="color: #fff"></Span>
            </FormattedString>
          </Label>
        </GridLayout>
      </v-template>
    </ListView>
    <ActivityIndicator :busy="processing"></ActivityIndicator>
    <Button
      text="Đóng"
      width="100"
      height="36"
      @tap="onCloseTap"
      class="ediformhuy"
      style="border-width: 1; border-radius: 15; border-color: #ec860f"
    >
    </Button>
    
  </StackLayout>
</template>

<script>
import { Http, HttpResponse } from "@nativescript/core";
import {
getBoolean,
getString,
} from "@nativescript/core/application-settings";
export default {
  created() {
    this.getDanhMucHoSo();
  },
  data() {
    return {
      processing: true,
      DanhMucs: [
      ],
    };
  },
  methods: {
    getDanhMucHoSo(username, password) {
      let vm = this
      this.processing = true
      Http.request({
        url: vm.apiDomainProxy + "/o/rest/v2_1/menuconfigs/todo",
        method: "GET",
        headers: {
          "Authorization": "Bearer " + getString("Token", ""),
          groupId: this.groupId,
        },
      }).then((response) => {
          this.processing = false
          if (response.statusCode == 200) {
            let responseData = response.content.toJSON();
            let data = responseData.data;
            let DanhMucValue = [];
            for (let i = 0; i < data.length; i++) {
              let entity = data[i];
              let menuEntity = {};
              menuEntity.menuGroup = entity.menuGroup;
              menuEntity.menuName = entity.menuName;
              menuEntity.menuType = entity.menuType;
              menuEntity.stepCodes = entity.queryParams.replace(
                "/o/rest/v2/dossiers/todo?owner=true&order=true&step=",
                ""
              );
              menuEntity.stepCodes = menuEntity.stepCodes.replace(
                "/o/rest/v2/dossiers?owner=true&order=true",
                ""
              );
              DanhMucValue.push(menuEntity);
            }
            this.DanhMucs = DanhMucValue;
            this.getSoLuongTheoDanhMucHoSo();
          } else {

          }
        },
        (e) => {
          console.log('errrrrrrrr')
        }
      );
    },
    getSoLuongTheoDanhMucHoSo() {
      let vm = this
      Http.request({
        url: vm.apiDomainProxy + "/o/rest/v2/statistics/dossiers/todo?owner=true",
        method: "GET",
        headers: {
          "Authorization": "Bearer " + getString("Token", ""),
          groupId: this.groupId,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(
        (response) => {
          let responseData = response.content.toJSON();
          let data = responseData.data;
          let DanhMucList = [];
          for(let i=0; i<this.DanhMucs.length; i++){
            let danhMuc = this.DanhMucs[i];
            for(let j=0; j<data.length; j++){
              if(danhMuc.stepCodes == data[j].stepCode && danhMuc.menuGroup == data[j].menuGroup){
                danhMuc.totalCount = data[j].totalCount;
                break;
              }
              if(danhMuc.menuGroup == "tra_cuu_ho_so"){
                danhMuc.totalCount = responseData.total;
                break;
              }
            }
            DanhMucList.push(danhMuc);
          }
          this.DanhMucs = DanhMucList;
          this.processing = false;
        },
        (e) => {}
      );
    },
    onItemTap(event) {
      this.$modal.close(event.item);
    },
    onCloseTap() {
      this.$modal.close(-1);
    },
  },
};
</script>

<style>
</style>
