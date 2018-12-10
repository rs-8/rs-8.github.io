<template>
    <div class="mu-carousel" :class="mode">
        <div :class="classes.container" ref="track">
            <slot name="parallax-bg"/>
            <div :class="classes.wrapper">
                <slot/>
            </div>
            <slot name="button-prev"/>
            <slot name="button-next"/>
            <slot v-if="paginationPos === 'inside'" name="pagination"/>
            <slot name="scrollbar"/>
        </div>
        <slot v-if="paginationPos === 'out-bottom'" name="pagination"/>
    </div>
</template>

<script>
    import Swiper from 'swiper/dist/js/swiper.js';
    import Events from './events';

    export default {
        name: 'mu-carousel',
        props: {
            options: {
                type: Object,
                default: () => ({}),
            },
            standart: {
                type: Boolean,
                default: true,
            },
            paginationPos: {
                type: String,
                default: 'out-bottom',
            }
        },
        data() {
            return {
                carousel: null,
                classes: {
                    container: 'swiper-container',
                    wrapper: 'swiper-wrapper',
                    standart: 'mu-carousel__standart',
                },          
            }
        },
        computed: {
            mode() {
                return this.standart ? this.classes.standart : '';
            },
        },
        methods: {
            init() {
                this.carousel = new Swiper(this.$refs.track, this.options);
                this.bindEvents();
                this.$emit('ready', this.carousel);
            },
            update() {
                if (this.carousel) {
                    this.carousel.update && this.carousel.update();
                    this.carousel.navigation && this.carousel.navigation.update();
                    this.carousel.pagination && this.carousel.pagination.render();
                    this.carousel.pagination && this.carousel.pagination.update();
                }
            },
            bindEvents() {
                const vm = this;
                Events.forEach(eventName => {
                    this.carousel.on(eventName, () => {
                        vm.$emit(eventName, ...arguments);
                        vm.$emit(eventName.replace(/([A-Z])/g, '-$1').toLowerCase(), ...arguments);
                    });
                });
            },
        },
        activated() {
            this.update();
        },
        updated() {
            this.update();
        },
        mounted() {
            this.$nextTick(() => this.init());
        },
        beforeDestroy() {
            this.$nextTick(() => {
                if (this.carousel) {
                    this.carousel.destroy && this.carousel.destroy();
                    delete this.carousel;
                }
            });
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../../styles/var.scss";
    @import "~swiper/dist/css/swiper.css";

    .mu-carousel__standart {
        .swiper-container {
            cursor: pointer;
            border-radius: 5px;
            &:hover .mu-button-prev,
            &:hover .mu-button-next {
                visibility: visible;
                opacity: 1;
                background-color: $--mu-carousel-hover-background;
            }
            .mu-button-prev, .mu-button-next {
                visibility: hidden;
                position: absolute;
                z-index: 1;
                top: 0;
                width: 60px;
                height: 100%;
                opacity: 0;
                transition: all 500ms ease-in-out;
                .icon {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 36px;
                    color: $--color-white;
                }
                &:hover {
                    background-color: $--mu-carousel-hover-navigation-background;
                }
                &:active {
                    background-color: $--mu-carousel-active-navigation-background;
                }
            }
            .mu-button-prev {
                left: 0;
                .icon {
                    left: 23px;
                }
            }
            .mu-button-next {
                right: 0;
                .icon {
                    right: 23px;
                }
            }
        }
        .mu-pagination {
            display: flex;
            justify-content: center;
            padding: 20px 0;

            /deep/ .swiper-pagination-bullet {
                display: inline-block;
                width: 12px;
                height: 12px;
                margin-left: 10px;
                border-radius: 50%;
                background-color: transparent;
                border: 2px solid $--mu-carousel-bullet-border-color;
                outline: none;
            }
            /deep/ .swiper-pagination-bullet-active {
                background-color: $--mu-carousel-bullet-border-color;
            }
        }
    }
</style>
