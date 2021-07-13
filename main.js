$(document).ready(function () {
  $(function () {
    var controller = new ScrollMagic.Controller();

    var firstScreen = new ScrollMagic.Scene({
      triggerElement: "#trigger1",
      triggerHook: 1,
    })
      .setClassToggle(".features", "show")
      .addTo(controller);

    var secondScreen = new ScrollMagic.Scene({
      triggerElement: ".features-item-wrap",
      triggerHook: 1,
    })
      .setClassToggle(".ball-wrap", "bottom-ball")
      .addTo(controller);

    var thirdScreen = new ScrollMagic.Scene({
      triggerElement: ".third-section ",
      triggerHook: 0.5,
    })
      .setClassToggle(".third-section", "show")
      .addTo(controller);

    var hideBall = new ScrollMagic.Scene({
      triggerElement: ".how-we-work-img-wrap",
      triggerHook: 0,
    })
      .setClassToggle(".ball-wrap", "hide-ball")
      .addTo(controller);

    $("#toggle-menu").click(function () {
      $("body").toggleClass("show-menu");
    });

    $(".info-tooltip").mouseover(function (e) {
      $(e.currentTarget).addClass("active");
    });

    $(".info-tooltip").mouseleave(function (e) {
      $(e.currentTarget).removeClass("active");
    });

    $(".how-we-work-menu-btn").click(function (e) {
      var value = e.target.getAttribute("data-order-btn");
      setTimeout(
        () => $(".fake-bg").attr("class", "fake-bg fake-slide-" + value),
        1000
      );

      $(".how-we-work-inner").attr(
        "class",
        "how-we-work-inner active-slide-" + value
      );
    });

    Array.prototype.forEach.call(
      document.querySelectorAll(".ball-wrap"),
      function (ball) {
        const circle = document.querySelector(
          "." + ball.getAttribute("data-circle")
        );
        TweenMax.set(circle, { scale: 1, xPercent: -50, yPercent: -50 });

        ball.addEventListener("pointerenter", function (e) {
          TweenMax.to(circle, 1, { scale: 1.5, opacity: 1 });
          positionCircle(e, ball, circle);
          $(this).removeClass("spin");
        });

        ball.addEventListener("pointerleave", function (e) {
          TweenMax.to(circle, 1, { scale: 1, opacity: 1 });

          positionCircle(e, ball, circle);
          $(this).addClass("spin");
        });

        ball.addEventListener("pointermove", function (e) {
          positionCircle(e, ball, circle);
        });
      }
    );

    function positionCircle(e, ball, circle) {
      var rect = ball.getBoundingClientRect();
      var relX = e.pageX - rect.left;
      var relY = e.pageY - rect.top - window.scrollY;
      TweenMax.to(circle, 0.15, { x: relX, y: relY });
    }
  });
});
