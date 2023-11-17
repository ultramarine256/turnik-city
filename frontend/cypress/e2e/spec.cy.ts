describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io');
  });
});

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });
});

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });
});

describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://example.cypress.io');

    cy.contains('type');
    cy.contains('type').click();
    cy.url().should('include', '/commands/actions');

    cy.get('.action-email').type('fake@email.com');

    //  Verify that the value has been updated
    cy.get('.action-email').should('have.value', 'fake@email.com');
  });
});
