// RESPONSIVE

// Breakpoints
const breakpoints = {
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xsm: 375,
};

// Media quires
const MQ = {
  wWidth: 0,
  isXL: false,
  isLG: false,
  isMD: false,
  isSM: false,
  isXSM: false,
  updateState: function () {
    this.wWidth = $(window).width();

    for (let key in breakpoints) {
      this['is' + key.toUpperCase()] = this.wWidth <= breakpoints[key];
    }
  },
};

MQ.updateState();

$(document).ready(function () {
  //
});

$(window).on('load', function () {
  //
});

$(window).on('resize', function () {
  MQ.updateState();
});

// COMMON FUNCTIONS

// Popup opener
$('.js-popup').on('click', function (event) {
  event.preventDefault();
  let popupID = $(this).attr('href');

  mfpPopup(popupID);
});

$(document).ready(function () {
  $(".slider").slick({
    infinite: false,
    arrows: true,
    adaptiveHeight: true,
  });

  $(".slider-box").slick({
    infinite: false,
    arrows: false,
    adaptiveHeight: true,
    draggable: false,
    swipeToSlide: false,
    swipe: false,
  });

  let giftCurrentSlide = 1;

  $('.slider-box').on('afterChange', (event, slick, currentSlide) => {
    if (currentSlide !== 3) {
      giftCurrentSlide = currentSlide + 1;
      $('.gift__progress').attr('data-active-slide', currentSlide + 1)
      $('.gift__steps').text(`${currentSlide + 1} из 3 шагов`)
    }
  });

  $('.gift__btn-back').click(() => {
    $('.slider-box').slick('slickPrev');
  })

  $('.gift__btn').click(() => {
    const isActiveFirstStep = $('.first-step__item').hasClass('is-active');
    const isActiveSecondStep = $('.second-step__item').hasClass('is-active');
    const isActiveThirdStep = $('.third-step__checkbox').toArray().some((checkbox) => checkbox.checked);
    $('.gift__btn-back').addClass('show');

    if(giftCurrentSlide === 1 && isActiveFirstStep) {
      $('.slider-box').slick('slickNext');
    }

    if(giftCurrentSlide === 2 && isActiveSecondStep) {
      $('.slider-box').slick('slickNext');
    }

    if(giftCurrentSlide === 3 && isActiveThirdStep) {
      $('.slider-box').slick('slickNext');
    }
  });

  $(".owl-carousel").owlCarousel({
    margin: 30,
    autoWidth: true,
  });
});

// Mobile menu toggle
$('.js-menu').on('click', function () {
  $(this).toggleClass('is-active');
  $('.menu').toggleClass('is-opened');
});

$('.filial__sity').on('click', function () {
  $('.filial__sity').removeClass('is-active');
  $(this).toggleClass('is-active');

  const activeId = $(this).attr('id');

  $('.filial__wrapper').removeClass('is-active');

  $(`.${activeId}`).addClass('is-active');
});

$('.first-step__item').on('click', function () {
  $('.first-step__item').removeClass('is-active');
  $(this).toggleClass('is-active');
});

$('.second-step__item').on('click', function () {
  $('.second-step__item').removeClass('is-active');
  $(this).toggleClass('is-active');
});

$('.training__boxtitle').on('click', function () {
  $('.training__boxtitle').removeClass('is-active');
  $('.training__boxtitle').addClass('is-hide');
  $(this).removeClass('is-hide');
  $(this).toggleClass('is-active');
});

$('.submenu__close-icon').on('click', function (e) {
  e.stopPropagation();
  $('.training__boxtitle').removeClass('is-active');
  $('.training__boxtitle').removeClass('is-hide');
});

$('.faqitem__button').on('click', function () {
  $(this).parent().parent().toggleClass('is-active');
});

// E-mail Ajax Send
$('form').on('submit', function (e) {
  e.preventDefault();

  let form = $(this);
  let formData = {};
  formData.data = {};

  // Serialize
  form.find('input, textarea').each(function () {
    let name = $(this).attr('name');
    let title = $(this).attr('data-name');
    let value = $(this).val();

    if ($(this).attr('type') === 'checkbox') {
      formData.data[name] = {
        title: title,
        value: this.checked,
      };
    } else {
      formData.data[name] = {
        title: title,
        value: value,
      };
    }

    if(form.hasClass('gift-form')) {
      const firstStepData = $('.first-step__item.is-active').attr('data-value');
      const secondStepData = $('.second-step__item.is-active').attr('data-value');
      const thirdStepData = $('.third-step__checkbox').toArray()
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => $(checkbox).attr('data-value'))
          .join(', ');

      formData.data['first-step'] = {
        title: 'Район',
        value: firstStepData,
      }

      formData.data['second-step'] = {
        title: 'Коробка',
        value: secondStepData,
      }

      formData.data['third-step'] = {
        title: 'Траектория',
        value: thirdStepData,
      }
    }

    if (name === 'subject') {
      formData.subject = {
        value: value,
      };
      delete formData.data.subject;
    }
  });

  $.ajax({
    type: 'POST',
    url: 'mail/mail.php',
    dataType: 'json',
    data: formData,
  }).done(function (data) {
    if (data.status === 'success') {
      mfpPopup('#success');
    } else {
      alert('Ajax result: ' + data.status);
    }
  });
  return false;
});

const mfpPopup = function (popupID, source) {
  // https://dimsemenov.com/plugins/magnific-popup/
  $.magnificPopup.open({
    items: { src: popupID },
    type: 'inline',
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    closeMarkup: '<button type="button" class="mfp-close">&times;</button>',
    mainClass: 'mfp-fade-zoom',
    // callbacks: {
    // 	open: function() {
    // 		$('.source').val(source);
    // 	}
    // }
  });
};
