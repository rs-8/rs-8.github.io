import muCarousel from './src/carousel.vue';
import muSlide from './src/slide.vue';

/* istanbul ignore next */
muCarousel.install = (Vue) => {
    Vue.component(muCarousel.name, muCarousel);
    Vue.component(muSlide.name, muSlide);
};

export { muCarousel, muSlide };
export default muCarousel;
