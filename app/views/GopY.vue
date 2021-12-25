<template>
	<FlexboxLayout class="page backgroundGrey" style="width: 100%; height: 100%">
		<Stacklayout style="padding-bottom: 0">
			<Label text="Góp ý, phản ánh" class="uppercase titletracuu padding20"></Label>
		</Stacklayout>
		<Button
			style="margin: 0; padding: 0"
			text="Thanh toán"
			@tap="redirectUri"
			class="btn-chinhsua textWhite padding20"
		></Button>
	</FlexboxLayout>
</template>

<script>
// const permissions = require("nativescript-permissions")
// permissions.requestPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE, "I need these permissions")
// .then( () => {
// })
// .catch( () => {
// });
import {Utils} from "@nativescript/core";
export default {
	mounted() {
	},
	methods: {
		redirectUri () {
			Utils.openUrl("https://keypay.gov.vn/")
		}
	}
};

</script>

<style lang="scss" scoped>
	.page Label {
		font-size: 35;
		horizontal-alignment: center;
		vertical-alignment: center;
		color: #ffffff;
		text-transform: uppercase;
	}
</style>
