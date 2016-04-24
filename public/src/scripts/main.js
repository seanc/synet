'use strict';

(function($) {
  $(function() {
    $('.navbar-toggle').on('click', e => {
      e.preventDefault();
      $('.navbar-menu').slideToggle();
    });
    $('.case-study .overlay').click(e => {
      let link = $(e.target).parent().find('.redirect').val();
      if (typeof link === 'undefined') return;
      window.open(link, '_blank');  
    });
  });
}(jQuery));