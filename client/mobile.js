if(Meteor.isCordova){
  Template.body.helpers({
    isMobile: true,
    isDesktop: false
  });
}
