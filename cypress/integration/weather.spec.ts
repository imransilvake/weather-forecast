// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

context('Weather', () => {
	it('[App] Visits the app link', () => {
		cy.visit('http://localhost:3000/');
	});

	it('[Input] By default input should be empty', () => {
		cy.get('.wf-form .wf-input input').should('have.value', '');
	});

	it('[Input] Change city name to "Munich"', () => {
		cy.get('.wf-form .wf-input input').clear();
		cy.get('.wf-form .wf-input input').type('Munich');
		cy.get('.wf-form .wf-input input').should('have.value', 'Munich');
	});

	it('[Submit] Enter submit button to get the city data', () => {
		cy.get('.wf-form button').click();
	});

	it('[Result] Validate current weather content', () => {
		cy.wait(1000);
		cy.get('.wf-result .wf-current .wf-block1 .wf-location img').should('be.visible');
		cy.get('.wf-result .wf-current .wf-block1 h4').should('exist').contains('Munich');
		cy.get('.wf-result .wf-current .wf-block1 h1').should('exist');
		cy.get('.wf-result .wf-current .wf-block2 p').should('exist');
		cy.get('.wf-result .wf-current .wf-block2 img').should('be.visible');
	});

	it('[Result] Validate weather forecast content', () => {
		cy.get('.wf-result .wf-forecast .wf-item').should('have.length', 5)
		cy.get('.wf-result .wf-forecast .wf-item h4').should('exist');
		cy.get('.wf-result .wf-forecast .wf-item h6').should('exist');
		cy.get('.wf-result .wf-forecast .wf-item img').should('be.visible');
	});
});
