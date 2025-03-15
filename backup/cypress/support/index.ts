// load type definitions from Cypress module
/// <reference types="cypress" />

declare global {
	namespace Cypress {
		interface Chainable {
			/**
			 * Custom command to get element by data-cy
			 * @example cy.getByDataCy('selector')
			 */
			getByDataCy(selector: string): Chainable<JQuery<Element>>;

			/**
			 * Custom command to get element by name
			 * @example cy.getByDataCy('selector')
			 */
			getByName(name: string, element?: string): Chainable<JQuery<Element>>;

			/**
			 * Custom command to singUp an user
			 * @example cy.signUp(user)
			 */
			signUp(user: User): Chainable<Element>;

			/**
			 * Custom command to sing in an user
			 * @example cy.signIn(user)
			 */
			signIn(email?: string, password?: string): Chainable<Element>;

			/**
			 * Custom command to logout an user
			 * @example cy.logout(user)
			 */
			logOut(): Chainable<Element>;

			/**
			 * Custom command to sing in an recruiter user
			 * @example cy.signInAsRecruiter()
			 */
			signInAsRecruiter(): Chainable<Element>;

			/**
			 * Custom command to check banner in page
			 * @example cy.shouldRenderBanner()
			 */
			shouldRenderBanner(): Chainable<Element>;

			/**
			 * Custom command to find a price and compare to the passed number
			 * @example cy.shouldBeLessThan(number)
			 */
			shouldBeLessThan(number: number): Chainable<Element>;

			/**
			 * Custom command to find a price and compare to the passed number
			 * @example cy.shouldBeGreaterThan(number)
			 */
			shouldBeGreaterThan(number: number): Chainable<Element>;
		}
	}
}

import './commands';
