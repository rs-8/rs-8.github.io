import muGallery from './src/gallery.vue';

/* istanbul ignore next */
muGallery.install = (Vue) => {
    Vue.component(muGallery.name, muGallery);
};

export default muGallery;