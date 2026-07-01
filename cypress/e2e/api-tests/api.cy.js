/// <reference types = "cypress"/>

describe('Learn Get Rest Apis with Cypress', () => {

    //see the json response for this it block under fixtures --> get-user-list-response.json
    it('Get User List', () => {
        cy.request('GET', 'api/users?page=2').then((response) => {
            expect(response.status).to.eq(200)
            // Assert that "data" array contains correct values for a user
            expect(response.body.data).to.have.length(6); // Ensure there are 6 users in the data array

            // Validate the first user's data
            const firstUser = response.body.data[0];
            expect(firstUser).to.have.property('id', 7);
            expect(firstUser).to.have.property('email', 'michael.lawson@reqres.in');
            expect(firstUser).to.have.property('first_name', 'Michael');
            expect(firstUser).to.have.property('last_name', 'Lawson');
            expect(firstUser).to.have.property('avatar', 'https://reqres.in/img/faces/7-image.jpg');

            // Validate the last user's data
            const lastUser = response.body.data[5];
            expect(lastUser).to.have.property('id', 12);
            expect(lastUser).to.have.property('email', 'rachel.howell@reqres.in');
            expect(lastUser).to.have.property('first_name', 'Rachel');
            expect(lastUser).to.have.property('last_name', 'Howell');
            expect(lastUser).to.have.property('avatar', 'https://reqres.in/img/faces/12-image.jpg');

            // Assert that the "support" section contains correct values
            expect(response.body.support.url).to.eq('https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral');
            expect(response.body.support.text).to.eq('Tired of writing endless social media content? Let Content Caddy generate it for you.');

            // Validate _meta section
            expect(response.body._meta).to.have.property('powered_by', '🚀 ReqRes - Deploy backends in 30 seconds');
            expect(response.body._meta.upgrade_url).to.eq('https://app.reqres.in/upgrade');
            expect(response.body._meta.docs_url).to.eq('https://reqres.in');
        })
    })

    //see the fixtures folder get-single-user-response.json for the json response of this it block
    it('Get Single User', () => {
        cy.request({
            method: 'GET',
            url: 'api/users/2'
        })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.data).to.include.keys('id', 'email', 'first_name', 'last_name', 'avatar');
                expect(response.body.data).to.have.property('id', 2);
                expect(response.body.data).to.have.property('email', 'janet.weaver@reqres.in');
                expect(response.body.data).to.have.property('first_name', 'Janet');
                expect(response.body.data).to.have.property('last_name', 'Weaver');
                expect(response.body.data).to.have.property('avatar', 'https://reqres.in/img/faces/2-image.jpg');

                expect(response.body.support.url).to.eq('https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral');
                expect(response.body.support.text).to.eq('Tired of writing endless social media content? Let Content Caddy generate it for you.');

                // Assert Content-Type header
                expect(response.headers).to.have.property('content-type').and.include('application/json');

                // Assert that there is a Server header
                expect(response.headers).to.have.property('server');

            })
    })

    //this is a post request to login successfully
    it('Post Login Successful', () => {
        cy.request({
            method: 'POST',
            url: 'api/login',
            body: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            },
            headers: {
                'x-api-key': 'reqres-free-v1'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('token', 'QpwL5tke4Pnpja7X4');
        })
    })

    //this is a post request to login unsuccessfully
    it('Post Login Unsuccessful', () => {
        cy.request({
            method: 'POST',
            url: 'api/login',
            failOnStatusCode: false, // Do not fail the test on non-2xx response
            body: {
                "email": "eve.holt@reqres.in",
            },
            headers: {
                'x-api-key': 'reqres-free-v1'
            }
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('error', 'Missing password');
        })
    })

    //this is a put request to update a user
    it('Put Update User', () => {
        cy.request({
            method: 'PUT',
            url: 'api/users/2',
            body:
            {
                "name": "morpheus",
                "job": "zion resident"
            },
            headers: {
                'x-api-key': 'reqres-free-v1'
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name', 'morpheus');
            expect(response.body).to.have.property('job', 'zion resident');
        })

    })

    //this is a delete request to delete a user
    it('Delete User', () => {
        cy.request({
            method: 'DELETE',
            url: 'api/users/2',
            headers: {
                'x-api-key': 'reqres-free-v1'
            }
        }).then((response) => {
            expect(response.status).to.eq(204)
            expect(response.body).to.be.empty;
        })
    })

    //this is a get request for a user that is not found
    it('Get Single User Not Found', () => {
        cy.request({
            method: 'GET',
            url: 'api/users/23',
            failOnStatusCode: false // Do not fail the test on non-2xx response
        })
            .then((response) => {
                expect(response.status).to.eq(404)
                expect(response.body).to.be.empty;
            })  
    })

})
