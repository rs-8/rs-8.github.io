<template>
    <div class="mu-slide" :class="slideClass">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'mu-slide',
        data() {
            return {
                slideClass: 'swiper-slide',
            }
        },
        methods: {
            update() {
                if (this.$parent && this.$parent.carousel) {
                    this.$parent.update();
                }
            }
        },
        updated() {
            this.update();
        },
        mounted() {
            this.update();
        },
    };
</script>
