/*
 * User instance
 */
Template.registerHelper( 'isCurrentUser', ( currentUser ) => {
  return currentUser === Meteor.userId() ? true : false;
});

Template.registerHelper( 'disableIfAdmin', ( userId ) => {
  if ( Meteor.userId() === userId ) {
    return Roles.userIsInRole( userId, 'admin' ) ? "disabled" : "";
  }
});

/*
 * Comparison
 */
// http://themeteorchef.com/snippets/using-global-template-helpers/#tmc-writing-a-logic-helper
Template.registerHelper( 'equals', ( a1, a2 ) => {
 return a1 === a2;
});
Template.registerHelper( 'notEquals', ( a1, a2 ) => {
  return a1 !== a2;
});

// http://themeteorchef.com/snippets/using-global-template-helpers/#tmc-css-classes
Template.registerHelper( 'addClass', ( c1, className ) => {
  return c1 ? className : '';
});

// Base
Template.registerHelper( 'selected', ( v1, v2 ) => {
  return v1 === v2 ? true : false;
});


/*
 * Time and date
 */
Template.registerHelper( 'humanDate', ( timestamp ) => {
  if ( timestamp ) {
    return moment( timestamp ).format( "MMMM Do, YYYY" );
  }
});

// http://themeteorchef.com/snippets/using-global-template-helpers/#tmc-converting-an-iso-8601-string
Template.registerHelper('ISOToHuman', ( isoString ) => {
  if ( isoString ) {
    return moment( isoString ).format( 'MMMM Do, YYYY' );
  }
});

// http://themeteorchef.com/snippets/using-global-template-helpers/#tmc-converting-an-epoch-value
Template.registerHelper('epochToHuman', ( timestamp ) => {
  if ( timestamp ) {
    let length = timestamp.toString().length;
    if ( length === 10 ) {
      return moment.unix( timestamp ).format( 'MMMM Do, YYYY' );
    } else {
      return moment.unix( timestamp / 1000 ).format( 'MMMM Do, YYYY' );
    }
  }
});
