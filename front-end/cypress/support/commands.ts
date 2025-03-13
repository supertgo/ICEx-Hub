import '@testing-library/cypress/add-commands';
import 'cypress-wait-until';

Cypress.Commands.add('getByDataCy', (selector, ...args) => {
	return cy.get(`[data-cy="${selector}"]`, ...args);
});

Cypress.Commands.add('getByName', (name, element = 'input', ...args) => {
	return cy.get(`${element}[name="${name}"]`, ...args);
});

Cypress.Commands.add(
	'signIn',
	(email = 'candidato@gmail.com', password = 'testaa') => {
		cy.findByPlaceholderText(/e-mail/i).type(email);
		cy.findByPlaceholderText(/senha/i).type(password);

		cy.findByRole('button', { name: /entrar/i }).click();
	},
);
