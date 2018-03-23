const xlHelper = require(`../Data/xlHelper`);
let request = require('supertest');
const expect = require('chai').expect;

let baseUrl = 'http://services.groupkt.com/country/';

suite('Sample test to validate API', function () {

    let testData = xlHelper.getRows('./data.xlsx', 'CountryCode', { 'testExecute': 'Y' })
    testData.forEach((testCase) => {
        if (testCase.Scenario.includes('GET-COUNTRY-DATA')) {
            test('Validate GET country code call', (done) => {
                expectedResponse = JSON.parse(testCase.ExpectedResponse)
                request(baseUrl)
                    .get(testCase.testURI)
                    .set({ "Access-Control-Allow-Origin": "*", "Accept": "application/json" })
                    .expect(parseInt(testCase.ExpectedResCode, 10))
                    .end(function (err, res) {
                        console.log('*********************************************');
                        console.log(res.text);
                        console.log('*********************************************');
                        expect(res.body.RestResponse.messages[0]).to.equal(expectedResponse.RestResponse.messages[0])
                        expect(res.body.RestResponse.result.name).to.equal(expectedResponse.RestResponse.result.name)
                        expect(res.body.RestResponse.result.alpha2_code).to.equal(expectedResponse.RestResponse.result.alpha2_code)
                        expect(res.body.RestResponse.result.alpha3_code).to.equal(expectedResponse.RestResponse.result.alpha3_code)
                        done();
                    })

            })
        }
    })
})