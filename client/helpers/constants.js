  Template.registerHelper( 'brandName', () => {
    return Meteor.settings.public.info.brand.name;
  });

  Template.registerHelper( 'cmsName', () => {
    return Meteor.settings.public.info.cms.name;
  });
