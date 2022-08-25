import axios from "axios";

const novaAccessKey = "6e42ef74bae876c04fb84dcc2912126a"

export class NovaPoshtaService {
    static async getCities(findByString) {
        try {
            const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                apiKey: novaAccessKey,
                modelName: "Address",
                calledMethod: "getCities",
                methodProperties: {
                    FindByString: findByString
                },
            }).catch(function (error) {
                throw new Error(error)
            })

            return JSON.parse(JSON.stringify(response.data.data))
        } catch (e) {
            console.log(e)
            return e
        }
    }

    static async getDepartments(cityRef) {
        try {
            const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                apiKey: novaAccessKey,
                modelName: "Address",
                calledMethod: "getWarehouses",
                methodProperties: {
                    CityRef: cityRef
                }
            }).catch(function (err) {
                throw new Error(err)
            })

            return JSON.parse(JSON.stringify(response.data.data))
        } catch (e) {
            console.log(e)
            return e
        }
    }
}