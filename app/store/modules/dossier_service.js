
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
  const pram = []
  if (input.hasOwnProperty('from')) {
    queryDB['from'] = input.from
  }
  if (input.hasOwnProperty('size')) {
    queryDB['size'] = input.size
  }
  if (input.hasOwnProperty('ranges')) {
    
    for (let key in input.ranges) {
      let prs = {}
      let key1 = '';
      key1 = key.replace('From','');
      key1 = key1.replace('To','');
      prs[key1] = input.ranges[key]
      pram.push({"range": prs})
    }
    queryDB.query.bool.must = pram
  }
  if (input.hasOwnProperty('mustNot')) {
    queryDB.query.bool.must_not = input.mustNot
  }
  if (input.hasOwnProperty('params')) {
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
  // console.log("queryDB: ", queryDB);
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
    filterDossier ({commit, state}, data) {
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
    getDossier ({commit, state}, data) {
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
    getDossierPart ({commit, state}, data) {
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
    getDossierTemplate ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        let url = state.apiDomainProxy + '/o/rest/v2/dossiertemplates/'+ data.dossierTemplate
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
          reject('312312312312')
        });
      })
    },
    getDossierFile ({commit, state}, data) {
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
    deleteDossierFile ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        let url = state.apiDomainProxy + '/o/rest/v2/dossiers/'+ data.dossierId + '/files/' + data.referenceUid
        console.log('url', url)
        console.log('data.headers', data.headers)
        Http.request({
          url: url,
          method: "DELETE",
          headers: data.headers,
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
    createNewDossier({commit, state}, data){
      return new Promise((resolve, reject) => {
        let url = state.apiDomainProxy + '/o/rest/v2/dossiers';
        // let query = formatDataInput(data)
        Http.request({
          url: url,
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
    getDossierLog ({commit, state}, data) {
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