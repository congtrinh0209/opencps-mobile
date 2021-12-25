import { Http, HttpResponse } from '@nativescript/core'
import { data } from 'jquery'
export default {
    state: () => ({
        groupId: 35417,
        apiDomainOpencps: 'http://119.17.200.69:8074',
        apiDomainProxy: 'http://119.17.200.66:8378',
        endPointApi: 'http://119.17.200.66:8374/rest/flexdata/search/opencps/es'
    }),
    actions: {
        login ({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                let url = state.apiDomainProxy + "/flex/oauth2/token?username=" + data.username + "&password=" + data.password+ "&app=dvc-mobile"
                Http.request({
                    url: url,
                    method: "POST",
                    headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "secret": "kXS2AtaZUmcfy1rMZbgS+4XF0mv+79LT"
                    },
                    content: JSON.stringify({})
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
        changePassword ({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                let url = state.apiDomainProxy + "/v1/datasharing/account/changepwd"
                Http.request({
                    url: url,
                    method: "POST",
                    headers: data.headers,
                    content: JSON.stringify(data.body)
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
        getUserDetail({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                let url = state.apiDomainProxy + "/v1/datasharing/account/profile"
                Http.request({
                    url: url,
                    method: "GET",
                    headers: data
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
        getAvatar({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                let url = state.apiDomainOpencps + '/o/v1/opencps/users/avatar/org.opencps.usermgt.model.ApplicantAvatar/' + data.classPK
                Http.request({
                    url: url,
                    method: "GET",
                    headers: data.headers,
                }).then((response) => {
                    resolve(response.content)
                },
                    e => {
                        reject('')
                    });
            })
        },
    }
}