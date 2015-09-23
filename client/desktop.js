if(!Meteor.isCordova){
  Template.body.helpers({
    isMobile: false,
    isDesktop: true
  });
  Template.datepicker.helpers({
    isMobile: false,
    isDesktop: true
  });
}
