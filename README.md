# sampleSupertest
This Repo is for service/BFF testing using supertest 
a node package useful for service/API testing (Data driven)

To run these tests locally
Clone this project 
run `npm install`
run `npm run test`

This test suite validates country code endpoint by accepting data from the spreadsheet (data.xlsx)

My opionion on using supertest for Service testing 
-------------------------------------------------
Pros: Very fast and reliable( 3 tests takes about 10s)
----
Cons: As the calls made are asynchronous it might get difficult managing tests when you have multiple/nested calls where you have to 
----
wait for response from 1 call to pass it to the other) 