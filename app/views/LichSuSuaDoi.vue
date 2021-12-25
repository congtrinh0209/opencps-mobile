<template>
  <StackLayout class="p-20" backgroundColor="white">
    <GridLayout rows="auto, 45">
      <Stacklayout row="0">
        <Label>
          <FormattedString>
            <Span
              text="TIẾN TRÌNH HỒ SƠ"
              class="uppercase"
              style="color: orange; font-weight: bold; font-size: 18"
            ></Span>
          </FormattedString>
        </Label>
        <ListView
          for="dossierlog in dossierlogs"
          @itemTap="onItemTap"
          style="height: 400"
          v-if="dossierlogs != []"
        >
          <v-template>
            <StackLayout style="line-height: 2.5; font-size: 14px; padding: 0">
              <Label textWrap="true" style="font-size: 14px">
                <FormattedString>
                  <Span text="- Ngày " class="title black" />
                  <Span
                    :text="dossierlog._source.createDateString"
                    class="title grey"
                  />
                  <Span text="\n" class="title black" />
                  <Span text="Ông/bà " class="title black" />
                  <Span :text="dossierlog._source.author" class="title black" />
                  <Span text=": " class="title black" />
                  <Span
                    :text="dossierlog._source.payloadObj.stepName"
                    class="title orange"
                  />
                </FormattedString>
              </Label>

              <!-- <Label
                textWrap="true"
                v-for="file in dossierlog._source.payloadObj.files"
                :key="file.fileName"
              >
                <FormattedString>
                  <Span text.decode="&#xf15b;" class="fas grey" />
                  <Span text=" " class="title grey" />
                  <Span :text="file.fileName" class="title grey" />
                </FormattedString>
              </Label> -->
            </StackLayout>
          </v-template>
        </ListView>
        <Stacklayout v-else >
          <Label textWrap="true" style="height:100%; text-align: center; font-size: 36;">
            <FormattedString>
              <Span text="Không có lịch sử chỉnh sửa" class="title grey" />
            </FormattedString>
          </Label>
        </Stacklayout>
      </Stacklayout>
      <Stacklayout row="1">
        <Button
          text="Đóng"
          @tap="onCloseTap"
          :isEnabled="!processing"
          class="ediformhuy"
          height="40"
          width="120"
          style="border-width: 1; border-radius: 15; border-color: #ec860f"
        >
        </Button>
      </Stacklayout>
    </GridLayout>
  </StackLayout>
</template>

<script>
export default {
  props: ["dossierId"],
  created() {
    this.getDossierLog(this.dossierId);
  },
  data() {
    return {
      dossierlogs: [
        {
          _index: "",
          _type: "",
          _id: "",
          _score: 0,
          _source: {
            payload: '',
            author: "",
            dossierId: "",
            notificationType: "",
            content: "",
            createDate: "",
            payloadObj: {
              dossierActionId: "",
              stepCode: "",
              stepName: "",
              files: [],
              dossierStatusText: "",
              jobPosName: "",
              stepInstruction: "",
            },
            createDateString: "",
          },
        },
      ],
    };
  },
  methods: {
    getDossierLog(dossierIdParam) {
      let vm = this;
      let filterGetService = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Endpoint: "/dvc-hg-2009920099/LiferayDocumentType/_search",
          Method: "post",
        },
        params: {
          groupId: this.groupId,
          dossierId: dossierIdParam,
          notificationType: "PROCESS_TYPE",
          entryClassName: "org.opencps.dossiermgt.model.DossierLog",
        },
        source: "dossierId,payload,author,notificationType,content,createDate",
      };
      vm.$store
        .dispatch("getThuTucHanhChinh", filterGetService)
        .then(function (result) {
          const data = result.data.toJSON();
          const arr = data.hits.hits;
          for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
            const payload = JSON.parse(obj._source.payload);
            obj._source.payloadObj = payload;
            const createDate = obj._source.createDate;
            const datevalue = vm.reformatDate(createDate);
            obj._source.createDateString = datevalue;
            arr[i] = obj;
          }
          vm.dossierlogs = arr;
        });
    },
    reformatDate(createDate) {
      var year = createDate.substring(0, 4);
      var month = createDate.substring(4, 6);
      var day = createDate.substring(6, 8);
      var hour = createDate.substring(8, 10);
      var minute = createDate.substring(10, 12);
      var second = createDate.substring(12, 14);
      var date = new Date(year, month - 1, day, hour, minute, second);
      const createDateVlue =
        date.getDate() +
        "/" +
        String(date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      return createDateVlue;
    },
    onCloseTap() {
      this.$modal.close();
    },
  },
};
</script>

<style>
</style>