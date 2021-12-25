<template>
  <Page class="backgroundGrey">
    <ActionBar title="Thông Tin TTHC" class="uppercase action-bar">
      <NavigationButton />
    </ActionBar>
    <Stacklayout style="margin-top: 10">
      <GridLayout columns="2*,4*,2*" height="40">
        <Button
          col="0"
          :text="'Mức ' + serviceinfo._source.maxLevel"
          class="ediformhuy"
          style="border-width: 1; border-radius: 15; border-color: #ec860f"
        >
        </Button>
        <Label col="1" textWrap="true" style="font-size: 14px;">
          <FormattedString>
            <Span text="Mã thủ tục"></Span>
            <Span text="\n"></Span>
            <Span :text="serviceinfo._source.serviceCode" class="bold"></Span>
          </FormattedString>
        </Label>
        <Button
          v-if="serviceinfo._source.maxLevel != 2"
          col="2"
          text="Nộp"
          :isEnabled="!processing"
          @tap="nophoso"
          class="btn-chinhsua textWhite"
          style="font-weight: bold"
        >
        </Button>
      </GridLayout>
      <Label
        textWrap="true"
        :text="serviceinfo._source.serviceName"
        class="uppercase"
        style="margin-top: 10; text-align: left; padding: 0 10"
      ></Label>
      <Stacklayout width="100%" orientation="horizontal" marginTop="10">
        <Button
          text="Thông tin"
          height="30"
          width="25%"
          :class="
            selectedTab == 0
              ? 'btn-tab-chitiettthc active'
              : 'btn-tab-chitiettthc'
          "
          @tap="onButtonTap('thongtin')"
          style="margin-right: 0; margin-left: 0"
        ></Button>
        <Button
          text="Trình tự"
          height="30"
          width="25%"
          :class="
            selectedTab == 1
              ? 'btn-tab-chitiettthc active'
              : 'btn-tab-chitiettthc'
          "
          @tap="onButtonTap('trinhtu')"
          style="margin-right: 0; margin-left: 0"
        ></Button>
        <Button
          text="Thành phần"
          height="30"
          width="25%"
          :class="
            selectedTab == 2
              ? 'btn-tab-chitiettthc active'
              : 'btn-tab-chitiettthc'
          "
          @tap="onButtonTap('thanhphan')"
          style="margin-right: 0; margin-left: 0"
        ></Button>
        <Button
          text="Điều kiện"
          height="30"
          width="25%"
          :class="
            selectedTab == 3
              ? 'btn-tab-chitiettthc active'
              : 'btn-tab-chitiettthc'
          "
          @tap="onButtonTap('dieukien')"
          style="margin-right: 0; margin-left: 0"
        ></Button>
      </Stacklayout>
      <ScrollView v-if="selectedTab == 0" style="font-size: 14px">
        <Stacklayout class="backgroundGrey">
          <Stacklayout class="backgroundWhite" style="padding: 10 10">
            <Label textWrap="true">
              <FormattedString>
                <Span text="Cơ quan quản lý \t " class="bold"></Span>
                <Span :text="serviceinfo._source.administrationName"></Span>
              </FormattedString>
            </Label>
          </Stacklayout>
          <Stacklayout class="backgroundGrey" style="padding: 10 10">
            <Label textWrap="true">
              <FormattedString>
                <Span text="Lĩnh vực \t " class="bold"></Span>
                <Span :text="serviceinfo._source.domainName"></Span>
              </FormattedString>
            </Label>
          </Stacklayout>
          <Stacklayout class="backgroundWhite" style="padding: 10 10">
            <Label textWrap="true">
              <FormattedString>
                <Span text="Cách thực hiện \n" class="bold"></Span>
                <Span :text="serviceinfo._source.methodText"></Span>
              </FormattedString>
            </Label>
          </Stacklayout>
          <Stacklayout class="backgroundGrey" style="padding: 10 10">
            <Label textWrap="true">
              <FormattedString>
                <Span text="Thời gian giải quyết \n" class="bold"></Span>
                <Span :text="serviceinfo._source.durationText"></Span>
              </FormattedString>
            </Label>
          </Stacklayout>
          <Stacklayout class="backgroundWhite" style="padding: 10 10">
            <Label textWrap="true">
              <FormattedString>
                <Span text="Đối tượng \t" class="bold"></Span>
                <Span :text="serviceinfo._source.applicantText"></Span>
              </FormattedString>
            </Label>
          </Stacklayout>
          <Stacklayout class="backgroundGrey" style="padding: 10 10">
            <Label textWrap="true">
              <FormattedString>
                <Span text="Kết quả giải quyết \n" class="bold"></Span>
                <Span :text="serviceinfo._source.resultText"></Span>
              </FormattedString>
            </Label>
          </Stacklayout>
          <Stacklayout class="backgroundWhite" style="padding: 10 10">
            <Label textWrap="true">
              <FormattedString>
                <Span text="Lệ phí \t" class="bold"></Span>
                <Span :text="serviceinfo._source.feeText"></Span>
              </FormattedString>
            </Label>
          </Stacklayout>
          <Stacklayout class="backgroundGrey" style="padding: 10 10">
            <Label textWrap="true">
              <FormattedString>
                <Span text="Căn cứ pháp lý \n" class="bold"></Span>
                <Span :text="serviceinfo._source.regularText"></Span>
              </FormattedString>
            </Label>
          </Stacklayout>
        </Stacklayout>
      </ScrollView>
      <ScrollView v-if="selectedTab == 1">
        <Stacklayout class="padding20">
          <Label
            textWrap="true"
            :text="serviceinfo._source.processText"
            style="font-size: 14px"
          ></Label>
        </Stacklayout>
      </ScrollView>
      <ScrollView v-if="selectedTab == 2">
        <Stacklayout class="padding20">
          <Label
            textWrap="true"
            :text="serviceinfo._source.dossierText"
            style="font-size: 14px"
          ></Label>
        </Stacklayout>
      </ScrollView>
      <ScrollView v-if="selectedTab == 3">
        <Stacklayout class="padding20">
          <Label
            textWrap="true"
            :text="serviceinfo._source.conditionText"
            style="font-size: 14px"
          ></Label>
        </Stacklayout>
      </ScrollView>
    </Stacklayout>
  </Page>
</template>

<script>
import ThuTucHanhChinh from "./ThuTucHanhChinh";
import ThemMoiHoSoBuoc1 from "./ThemMoiBuoc1";
export default {
  props: ["entryClassPK"],
  created() {
    this.callGetServiceInfoDetail(this.entryClassPK);
  },
  data() {
    return {
      selectedTab: 0,
      serviceinfo: {
        _index: "",
        _type: "",
        _id: "",
        _score: null,
        _source: {
          resultText: "",
          maxLevel: "",
          domainCode: "",
          durationText: "",
          administrationName: "",
          serviceCode: "",
          methodText: "",
          applicantText: "",
          serviceCodeDVCQG: "",
          conditionText: "",
          serviceName: "",
          administrationCode: "",
          processText: "",
          dossierText: "",
          regularText: "",
          domainName: "",
          feeText: "",
        },
        sort: [4],
      },
    };
  },
  methods: {
    nophoso() {
      this.processing = false;
      let output = {};
      output.serviceCode = this.serviceinfo._source.serviceCode;
      output.govAgencyCode = this.serviceinfo._source.administrationCode;
      output.dossierTemplateNo = "MAU_" + this.serviceinfo._source.serviceCode;
      output.originality = 1;
      this.$navigateTo(ThemMoiHoSoBuoc1, {
        clearHistory: false,
        props: {
          info: output,
        },
      });
    },
    callGetServiceInfoDetail(entryClassPKParam) {
      let vm = this;
      let filterGetService = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Endpoint: "/dvc-hg-20099/LiferayDocumentType/_search",
          Method: "post",
        },
        params: {
          groupId: this.groupId,
          entryClassPK: entryClassPKParam,
          entryClassName: "org.opencps.dossiermgt.model.ServiceInfo",
        },
        source:
          "serviceCode,serviceName,domainName,administrationCode,administrationName,serviceCodeDVCQG,maxLevel,domainCode,domainName,methodText,durationText,applicantText,resultText,feeText,regularText,processText,dossierText,conditionText",
        sort: {
          maxLevel_Number_sortable: "desc",
        },
      };
      vm.$store
        .dispatch("getThuTucHanhChinh", filterGetService)
        .then(function (result) {
          const data = result.data.toJSON();
          vm.serviceinfo = data.hits.hits[0];
          vm.serviceinfo._source.feeText = vm.removeHtmlTabContent(
            vm.serviceinfo._source.feeText
          );
          vm.serviceinfo._source.methodText = vm.removeHtmlTabContent(
            vm.serviceinfo._source.methodText
          );
          vm.serviceinfo._source.regularText = vm.removeHtmlTabContent(
            vm.serviceinfo._source.regularText
          );
          vm.serviceinfo._source.resultText = vm.removeHtmlTabContent(
            vm.serviceinfo._source.resultText
          );
          vm.serviceinfo._source.applicantText = vm.removeHtmlTabContent(
            vm.serviceinfo._source.applicantText
          );
          vm.serviceinfo._source.processText = vm.removeHtmlTabContent(
            vm.serviceinfo._source.processText
          );
          vm.serviceinfo._source.dossierText = vm.removeHtmlTabContent(
            vm.serviceinfo._source.dossierText
          );
          vm.serviceinfo._source.conditionText = vm.removeHtmlTabContent(
            vm.serviceinfo._source.conditionText
          );
        });
    },
    removeHtmlTabContent(input) {
      input = input.replace(/<strong>/g, "");
      input = input.replace(/<\/strong>/g, "");
      input = input.replace(/<em>/g, "");
      input = input.replace(/<\/em>/g, "");
      input = input.replace(/<b>/g, "");
      input = input.replace(/<\/b>/g, "");
      input = input.replace(/<br\/>\n/g, '\n');
      input = input.replace(/<br\/>/g, '\n');
      input = input.replace(/<p>/g, "");
      input = input.replace(/<\/p>/g, "");
      return input;
    },
    goBack() {
      this.processing = false;
      this.$navigateTo(ThuTucHanhChinh, { clearHistory: false });
    },
    goBackHome() {
      this.processing = false;
      this.$navigateTo(ThuTucHanhChinh, { clearHistory: false });
    },
    
    onButtonTap(page) {
      let vm = this;
      vm.isLoading = true;
      if (page === "thongtin") {
        vm.selectedTab = 0;
      }
      if (page === "trinhtu") {
        vm.selectedTab = 1;
      }
      if (page === "thanhphan") {
        vm.selectedTab = 2;
      }
      if (page === "dieukien") {
        vm.selectedTab = 3;
      }
      setTimeout(function () {
        vm.isLoading = false;
      }, 500);
    },
  },
};
</script>

<style>
</style>