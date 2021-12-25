
import { Http, HttpResponse } from '@nativescript/core'
const formatDataInput = function (input) {
  let queryDB = {
    "query": {
        bool: {
          must: []
        }
    },
    "_source": {
      includes: input['source'].split(",")
    },
    "sort":[]
  }
  if (input.hasOwnProperty('from')) {
    queryDB['from'] = input.from
  }
  if (input.hasOwnProperty('size')) {
    queryDB['size'] = input.size
  }
  if (input.hasOwnProperty('params')) {
    let pram = []
    for (let key in input.params) {
      let prs = {}
      prs[key] = input.params[key]
      pram.push({"match": prs})
    }
    queryDB.query.bool.must = pram
  }
  if (input.hasOwnProperty('sort')) {
    let sorts = []
    for (let key in input.sort) {
      let prs = {}
      prs[key] = input.sort[key]
      sorts.push(prs)
    }
    queryDB.sort = sorts
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
    getThuTucHanhChinh ({commit, state}, data) {
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
  },
  getters: {}
}