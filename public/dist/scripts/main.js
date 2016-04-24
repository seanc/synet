'use strict';

(function ($) {
  $(function () {
    $('.navbar-toggle').on('click', function (e) {
      e.preventDefault();
      $('.navbar-menu').slideToggle();
    });
    $('.case-study .overlay').click(function (e) {
      var link = $(e.target).parent().find('.redirect').val();
      if (typeof link === 'undefined') return;
      window.open(link, '_blank');
    });
  });
})(jQuery);