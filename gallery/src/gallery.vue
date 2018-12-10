<template>
    <div class="mu-gallery">
        <mu-modal :visible.sync="opened" :full-size="false">
            <template slot="body">
                <mu-carousel :options="options">
                    <mu-slide v-for="(image, index) in images" :key="index">
                        <div class="mu-image" :style="{ backgroundImage: `url('${image}')` }"></div>
                    </mu-slide>
                </mu-carousel>
            </template>
        </mu-modal>
    </div> 
</template>

<script>
    import muModal from '../../modal';
    import { muCarousel, muSlide } from '../../carousel';

    export default {
        name: 'mu-gallery',
        components: {
            muModal,
            muCarousel,
            muSlide,
        },
        props: {
            opened: {
                type: Boolean,
                required: true,
            },
            options: {
                type: Object,
                required: false,
            },
            images: {
                type: Array,
                required: true,
            }
        },
        data() {
            return {
                
            }
        },
        watch: {
            opened() {
                this.$emit('update:opened', this.opened);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .mu-gallery {
        .mu-image {
            background-size: contain;
            background-position: center center;
            background-repeat: no-repeat;
            background-color: #000;
            height: 300px;
        }
        /deep/ .mu-modal__header {
            min-height: 0;
        }
    }
</style>


