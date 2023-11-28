describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    cy.exec('npm help');

    // seed a post in the DB that we control from our tests
    // cy.request('POST', '/test/seed/post', {
    //   title: 'First Post',
    //   authorId: 1,
    //   body: '...',
    // });

    // seed a user in the DB that we can control from our tests
    // cy.request('POST', '/test/seed/user', { name: 'Jane' }).its('body').as('currentUser');
  });

  it('successfully loads', () => {
    cy.visit('/');
  });
});
