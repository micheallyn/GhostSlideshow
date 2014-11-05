;(function($){
  $(document).ready(function() {
      var options = {
        nextButton: '.controls .next',
        prevButton: '.controls .prev',
        pauseButton: '.controls .pause',
        pagination: '.pagination',
        animateStartingFrameIn: true,
        autoPlay: true,
        autoPlayDelay: 4000
      };
      var sequence = $(".w3-slideshow").sequence(options).data("sequence");
  });
})(jQuery);
