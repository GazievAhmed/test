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

  $('.slider-box').on('afterChange', (event, slick, currentSlide) => {
    if(currentSlide !== 3) {
      $('.gift__progress').attr('data-active-slide', currentSlide + 1)
      $('.gift__steps').text(`${currentSlide + 1} из 3 шагов`)
    }
  });

  $('.gift__btn').click(() => {
    $('.slider-box').slick('slickNext');
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

$('.item__button').on('click', function () {
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

    if($(this).attr('type') === 'checkbox') {
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
