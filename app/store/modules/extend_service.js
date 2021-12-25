import { Http, HttpResponse } from '@nativescript/core'
import {
getString,
} from "@nativescript/core/application-settings";
const formatDataInput = function (input) {
    let queryDB = {
        "aggs": {
            data: {
                filter: {
                    bool: {
                        must: []
                    }
                },
                aggs: {
                    groupBy: {
                        terms: {

                        },
                        aggs: {
                            fields: {
                                top_hits: {
                                    _source: {
                                        include: input['source'].split(","),

                                    },
                                    size: 1,
                                },

                            }
                        }
                    }
                },
            }
        }
    }
    if (input.hasOwnProperty('field')) {
        queryDB.aggs.data.aggs.groupBy.terms.field = input.field
    }
    if (input.hasOwnProperty('size')) {
        queryDB.aggs.data.aggs.groupBy.terms.size = input.size
    }

    if (input.hasOwnProperty('params')) {
        let pram = []
        for (let key in input.params) {
            let prs = {}
            prs[key] = input.params[key]
            pram.push({ "match": prs })
        }
        queryDB.aggs.data.filter.bool.must = pram
    }
    if (input.hasOwnProperty('mustNot')) {
        queryDB.aggs.data.filter.bool.must_not = input.mustNot
    }
    return queryDB
}

export default {
    state: () => ({
        groupId: 35417,
        apiDomainOpencps: 'http://119.17.200.69:8074',
        apiDomainProxy: 'http://119.17.200.66:8378',
        endPointApi: 'http://119.17.200.66:8374/rest/flexdata/search/opencps/es',
        serviceInfoItems: []
    }),
    mutations: {

    },
    actions: {
        getDanhMucHoSo({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                let query = formatDataInput(data)
                Http.request({
                    url: state.apiDomainProxy + '/o/rest/v2_1/menuconfigs/todo',
                    method: "GET",
                    headers: data.headers,
                    // content: JSON.stringify(query)
                }).then((response) => {
                    let dataOutput = {
                        statusCode: response.statusCode,
                        data: response.content
                    }
                    resolve(dataOutput)
                },
                    e => {
                        reject('')
                    });
            })
        },
        getCoQuanQuanLy({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                let query = formatDataInput(data)
                Http.request({
                    url: state.endPointApi,
                    method: "POST",
                    headers: data.headers,
                    content: JSON.stringify(query)
                }).then((response) => {
                    let dataOutput = {
                        statusCode: response.statusCode,
                        data: response.content
                    }
                    resolve(dataOutput)
                },
                    e => {
                        reject('')
                    });
            })
        },
        getLichVuc({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                let query = formatDataInput(data)
                Http.request({
                    url: state.endPointApi,
                    method: "POST",
                    headers: data.headers,
                    content: JSON.stringify(query)
                }).then((response) => {
                    let dataOutput = {
                        statusCode: response.statusCode,
                        data: response.content
                    }
                    resolve(dataOutput)
                },
                    e => {
                        reject('')
                    });
            })
        },
        getMucDo({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                let query = formatDataInput(data)
                Http.request({
                    url: state.endPointApi,
                    method: "POST",
                    headers: data.headers,
                    content: JSON.stringify(query)
                }).then((response) => {
                    let dataOutput = {
                        statusCode: response.statusCode,
                        data: response.content
                    }
                    resolve(dataOutput)
                },
                    e => {
                        reject('')
                    });
            })
        },
        getDonViHanhChinh({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                let url = state.apiDomainProxy + '/o/rest/v2/dictcollections/ADMINISTRATIVE_REGION/dictitems?parent=' + data.parent
                Http.request({
                    url: url,
                    method: "GET",
                    headers: data.headers,
                }).then((response) => {
                    let dataOutput = {
                        statusCode: response.statusCode,
                        data: response.content
                    }
                    resolve(dataOutput)
                },
                    e => {
                        reject('')
                    });
            })
        },
        getThongKe({ commit, state }, data) {
            let year = (new Date()).getFullYear()
            return new Promise((resolve, reject) => {
                let url = state.apiDomainOpencps + '/o/rest/statistics?domain=total&agency=total&month=0&year='+year
                Http.request({
                    url: url,
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "groupId": state.groupId
                    }
                }).then((response) => {
                    let dataOutput = {
                        statusCode: response.statusCode,
                        data: response.content
                    }
                    resolve(dataOutput)
                },
                e => {
                    reject('')
                });
            })
        },
        checkSecret({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                let url = state.apiDomainOpencps + "/o/rest/v2/dossiers/" + data.dossierId
                Http.request({
                    url: url,
                    method: "GET",
                    headers: {
                    "groupId": state.groupId,
                    "secretCode": data.secretKey
                    }
                }).then((response) => {
                    resolve(response.statusCode)
                },
                e => {
                    reject('')
                });
            })
        },
        getNextAction({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                let url = state.apiDomainOpencps + "/o/rest/v2/dossiers/" + data.dossierId + "/nextactions"
                Http.request({
                    url: url,
                    method: "GET",
                    headers: {
                    "Accept": "application/json",
                    "groupId": state.groupId
                    }
                }).then((response) => {
                    let dataOutput = {
                        statusCode: response.statusCode,
                        data: response.content
                    }
                    resolve(dataOutput)
                },
                e => {
                    reject('')
                });
            })
        },
        getActionDetail({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                let url = state.apiDomainOpencps + "/o/rest/v2/dossiers/" + data.dossierId + "/nextactions/" + data.actionId
                Http.request({
                    url: url,
                    method: "GET",
                    headers: {
                    "Accept": "application/json",
                    "groupId": state.groupId
                    }
                }).then((response) => {
                    let dataOutput = {
                        statusCode: response.statusCode,
                        data: response.content
                    }
                    resolve(dataOutput)
                },
                e => {
                    reject('')
                });
            })
        },
        getPaymentDetail({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                let url = state.apiDomainProxy + "/o/rest/v2/dossiers/" + data.dossierId + "/payment"
                console.log('paymentUrl', url)
                Http.request({
                    url: url,
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "groupId": state.groupId,
                        "Authorization": "Bearer " + getString("Token", "")
                    }
                }).then((response) => {
                    console.log('statusCode', response.statusCode)
                    let dataOutput = {
                        statusCode: response.statusCode,
                        data: response.content
                    }
                    resolve(dataOutput)
                },
                e => {
                    reject('')
                });
            })
        },
        getUriPayGov ({commit, state}, data) {
            return new Promise((resolve, reject) => {
                let url = state.apiDomainProxy + "/o/pgi/paygov/urlRedirect?dossierId=" + data.dossierId + "&ipAddress=" + data.ipAddress
                Http.request({
                    url: url,
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "groupId": state.groupId,
                        "Authorization": "Bearer " + getString("Token", "")
                    }
                }).then((response) => {
                    console.log('ressPaygov123123', response.statusCode)
                    console.log('url', url)
                    let dataOutput = {
                        statusCode: response.statusCode,
                        data: response.content
                    }
                    resolve(dataOutput)
                },
                e => {
                    reject('')
                });
            })
        },
        getIpLocal ({commit, state}, data) {
            return new Promise((resolve, reject) => {
                let url = "https://geolocation-db.com/json/"
                Http.request({
                    url: url,
                    method: "GET",
                    headers: {}
                }).then((response) => {
                    let dataOutput = {
                        statusCode: response.statusCode,
                        data: response.content
                    }
                    resolve(dataOutput)
                },
                e => {
                    reject('')
                });
            })
        },
        doProcessAction({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                var formBody = [];
                for (var property in data.query) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(data.query[property]);
                formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&")
                let url = state.apiDomainProxy + "/o/rest/v2/dossiers/" + data.dossierId + "/actions"
                Http.request({
                    url: url,
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "x-www-form-urlencoded",
                        "groupId": state.groupId,
                        "Authorization": "Bearer " + getString("Token", "")
                    },
                    content: formBody
                }).then((response) => {
                    console.log('99999999', response.statusCode)
                    let dataOutput = {
                        statusCode: response.statusCode,
                        data: response.content
                    }
                    
                    resolve(dataOutput)
                },
                e => {
                    reject('')
                });
            })
        },
    },
    getters: {}
}