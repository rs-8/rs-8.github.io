/* eslint-disable */
import Vue from 'vue'

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Welcome from './Welcome.vue';

// layout
import layout from './components/layout.vue';
import Header from './components/header.vue';

// UI components
import muDropdown from '../components/dropdown/index.js';
import muModalCommon from '../components/modal-common/index.js';
import muChangeLang from '../components/change-lang/index.js';
import muDropdownItem from '../components/dropdown-item/index.js';
import muModal from '../components/modal/index.js';
import muHighlight from '../components/highlight/index.js';
import muCollapse from '../components/collapse/index.js';
import muSwitch from '../components/switch/index.js';
import muStores from '../components/stores/index.js';
import muInputSlider from '../components/input-slider/index.js';
import muPreloader from '../components/preloader/index.js';
import muOfferCard from '../components/offer-card/index.js';
import muDatepicker from '../components/datepicker/index.js';
import { muCarousel, muSlide } from '../components/carousel/index.js';
import muSocialChannels from '../components/social-channels';
import muFooter from '../components/footer';
import muGallery from '../components/gallery';

import { Input, Loading } from 'element-ui';
Vue.use(Input);
Vue.use(Loading);

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleLeft } from '@fortawesome/pro-regular-svg-icons/faAngleLeft';
import { faAngleRight } from '@fortawesome/pro-regular-svg-icons/faAngleRight';
import { library } from '@fortawesome/fontawesome-svg-core';
import bg from '../components/carousel/images/bg.png';

library.add(faAngleLeft, faAngleRight);

storiesOf('Welcome', module).add('to Storybook', () => ({
    components: { Welcome },
    template: '<welcome />',
    methods: { action: linkTo('Button') },
}));

// Header
storiesOf('Header', module)
    .add('Basic', () => ({
        components: { Header },
        template: `
            <Header />
        `,
        data() {
            return {

            };
        },
    }));
// /Header


storiesOf('Layout', module).add('Basic', () => ({
    components: { layout },
    template: '<layout />',
}));


// Special modal
storiesOf('Special modal', module)
    .add('Modal', () => ({
        components: { muModal },
        template: `
            <div>
                <button @click="openModal">Show modal</button>

                <mu-modal :visible.sync="modal">
                    <template slot="body">
                        <span>This is modal...</span>
                    </template>
                </mu-modal>
            </div>
        `,
        data() {
            return {
                modal: false,

            }
        },
        methods: {
            openModal() {
                this.modal = !this.modal;
            }
        },
    }))
    .add('Small modal', () => ({
        components: { muModal },
        template: `
            <div>
                <button @click="openModal">Show modal</button>

                <mu-modal :visible.sync="modal" :full-size="false">
                    <template slot="body">
                        <span>This is modal...</span>
                    </template>
                </mu-modal>
            </div>
        `,
        data() {
            return {
                modal: false,

            }
        },
        methods: {
            openModal() {
                this.modal = !this.modal;
            }
        },
    }))
    .add('Modal that cant be closed', () => ({
        components: { muModal },
        template: `
            <div>
                <button @click="openModal">Show modal</button>

                <mu-modal :visible.sync="modal" :can-close="false">
                    <template slot="body">
                        <p>This is modal...</p>
                        <button @click="openModal">Close modal</button>
                    </template>
                </mu-modal>
            </div>
        `,
        data() {
            return {
                modal: false,

            }
        },
        methods: {
            openModal() {
                this.modal = !this.modal;
            }
        },
    }));
// /Special modal

// Change lang
storiesOf('Changelang', module)
    .add('Changelang', () => ({
        components: { muChangeLang },
        template: `
            <mu-change-lang 
                :current-language="routerLang" 
                :all-languages="allLanguages" 
                position="bottom" 
                style-dropdown="gray" 
                v-on:changelang="changeLang"
                ></mu-change-lang>
        `,
        data() {
            return {
                lang: 'en',
                allLanguages: ['ru', 'en', 'es']
            }
        },
        computed: {
            routerLang() {
                return this.lang
            }
        },
        methods: {
            changeLang(lang) {
                this.lang = lang;
                console.log('Language:', lang)
            }
        },
    }))
    .add('Changelang red theme', () => ({
        components: { muChangeLang },
        template: `
            <mu-change-lang
                :current-language="routerLang"
                :all-languages="allLanguages"
                position="bottom"
                style-dropdown="gray"
                v-on:changelang="changeLang"
                theme="red"
                ></mu-change-lang>
        `,
        data() {
            return {
                lang: 'en',
                allLanguages: ['ru', 'en', 'es']
            }
        },
        computed: {
            routerLang() {
                return this.lang
            }
        },
        methods: {
            changeLang(lang) {
                this.lang = lang;
                console.log('Language:', lang)
            }
        },
    }));
// /ChangeLang

storiesOf('Dropdown', module)
    .add('Dont close on click', () => ({
        components: { muDropdown, muDropdownItem },
        template: `
            <mu-dropdown :closeOnClick="false">
                <template slot="button">
                    Dropdown
                </template>
                <template slot="body">
                    <mu-dropdown-item>Item 1</mu-dropdown-item>
                    <mu-dropdown-item>Item 2</mu-dropdown-item>
                </template>
            </mu-dropdown>
        `,
    }))
    .add('Gray', () => ({
        components: { muDropdown, muDropdownItem },
        template: `
            <mu-dropdown :closeOnClick="false" style-name="gray">
                <template slot="button">
                    Dropdown
                </template>
                <template slot="body">
                    <mu-dropdown-item>Item 1</mu-dropdown-item>
                    <mu-dropdown-item>Item 2</mu-dropdown-item>
                </template>
            </mu-dropdown>
        `,
    }));


storiesOf('Common modal', module)
    .add('universal modal', () => ({
        components: { muModalCommon },
        template: `
            <div>
                <button @click="openModalNew">Show modal</button>
                <mu-modal-common :visible.sync="modalNew" :can-close="true">
                    <template slot="headerTitle">
                        <span>This is modal header-title...</span>    
                    </template>
                    <template slot="headerSubtitle">
                        <span>This is modal header-subtitle...</span>
                    </template>
                    <template slot="headerSubtitleGrayText">
                        <span>This is modal header-subtitle gray...</span>
                    </template>
                     <template slot="body">
                    <span>This is modal new body...</span>
                    </template>
                    <template slot="footer">
                        <span>This is modal new footer...</span>
                    </template>
                </mu-modal-common>
            </div>
        `,
        data() {
            return {
                modalNew: true
            }
        },
        methods: {
            openModalNew() {
                this.modalNew = !this.modalNew;
            },
        }
    }));

storiesOf('Highlight', module)
    .add('Basic', () => ({
        components: { muHighlight },
        template: `
            <div>
                <el-input placeholder="Please input" v-model="newSearch"></el-input>
                <mu-highlight :result="arrayForSearch" :search="newSearch" string="name"></mu-highlight>
            </div>
        `,
        data() {
            return {
                arrayForSearch: [],
                newSearch: ''
            }
        },
        watch: {
            newSearch() {
                if (this.newSearch !== '') {
                    this.arrayForSearch = [{
                            attributes: {
                                name: "AliExpress",
                                url: 'ali'
                            },
                            id: '1',
                            type: 'offers'
                        },
                        {
                            attributes: {
                                name: "Aviasales",
                                url: 'aviasales',
                            },
                            id: '28',
                            type: 'offers'
                        },
                        {
                            attributes: {
                                name: "FocalPrice",
                                url: 'focalprice',
                            },
                            id: '59',
                            type: 'offers'
                        },
                        {
                            attributes: {
                                name: "Alltime",
                                url: 'alltime',
                            },
                            id: '75',
                            type: 'offers'
                        },
                        {
                            attributes: {
                                name: "NYX Professional Makeup",
                                url: 'nyxcosmetic',
                            },
                            id: '101',
                            type: 'offers'
                        }
                    ]
                }
            }
        }
    }))
    .add('Basic with loaded results', () => ({
        components: { muHighlight },
        template: `
                <div>
                    <el-input placeholder="Please input" v-model="newSearch"></el-input>
                    <mu-highlight :result="arrayForSearch" :search="newSearch" string="name"></mu-highlight>
                </div>
            `,
        data() {
            return {
                arrayForSearch: [{
                        attributes: {
                            name: "AliExpress",
                            url: 'ali'
                        },
                        id: '1',
                        type: 'offers'
                    },
                    {
                        attributes: {
                            name: "Aviasales",
                            url: 'aviasales',
                        },
                        id: '28',
                        type: 'offers'
                    },
                    {
                        attributes: {
                            name: "FocalPrice",
                            url: 'focalprice',
                        },
                        id: '59',
                        type: 'offers'
                    },
                    {
                        attributes: {
                            name: "Alltime",
                            url: 'alltime',
                        },
                        id: '75',
                        type: 'offers'
                    },
                    {
                        attributes: {
                            name: "NYX Professional Makeup",
                            url: 'nyxcosmetic',
                        },
                        id: '101',
                        type: 'offers'
                    }
                ],
                newSearch: ''
            }
        }
    }));

storiesOf('Collapse', module)
    .add('Basic', () => ({
        components: { muCollapse },
        template: `
            <mu-collapse :items="collapseItems"></mu-collapse>
        `,
        data() {
            return {
                collapseItems: [{
                    header: "First title",
                    content: "First description"
                }, {
                    header: "Second title",
                    content: "Second description"
                }, {
                    header: "Third title",
                    content: "Third description"
                }]
            }
        }
    }))
    .add('Basic with theme', () => ({
        components: { muCollapse },
        template: `
            <mu-collapse :items="collapseItems" theme="red"></mu-collapse>
        `,
        data() {
            return {
                collapseItems: [{
                    header: "First title",
                    content: "First description"
                }, {
                    header: "Second title",
                    content: "Second description"
                }, {
                    header: "Third title",
                    content: "Third description"
                }]
            }
        }
    }));

// Switch
storiesOf('Switch', module)
    .add('Basic', () => ({
        components: { muSwitch },
        template: `
            <mu-switch v-model="switchValue"></mu-switch>
        `,
        data() {
            return {
                switchValue: false,
                switchValueActive: true,
            };
        }
    }))
    .add('Basic with theme', () => ({
        components: { muSwitch },
        template: `
            <mu-switch v-model="switchValue" theme="red"></mu-switch>
        `,
        data() {
            return {
                switchValue: false,
                switchValueActive: true,
            };
        }
    }));
// /Switch

// preloader
storiesOf('Preloader', module)
    .add('Basic', () => ({
        components: { muPreloader },
        template: `
            <div>
                <mu-preloader :show="show" type="something"></mu-preloader>
                <button @click="showPreloader">Show preloader</button>
            </div>
        `,
        data() {
            return {
                show: false
            };
        },
        methods: {
            showPreloader() {
                window.setTimeout(() => {
                    this.show = !this.show;
                }, 2000);

                this.show = !this.show;
            }
        }
    }));
// /preloader

// Social channels
storiesOf('Social channels', module)
    .add('Default', () => ({
        components: { muSocialChannels },
        template: `
            <mu-social-channels :links="links"></mu-social-channels>
        `,
        data() {
            return {
                links: {
                    "facebook": {
                        "link": "https://www.facebook.com/epn.cashback.official",
                        "icon": "facebook-f"
                    },
                    "instagram": {
                        "link": "https://www.instagram.com/epn_official/",
                        "icon": "instagram"
                    },
                    "youtube": {
                        "link": "https://www.youtube.com/channel/UCeGdk5cQZGOJS5V4Vw50eog",
                        "icon": "youtube"
                    },
                    "telegram": {
                        "link": "https://telegram.me/ePN_Cashback_channel",
                        "icon": "telegram-plane"
                    },
                    "vk": {
                        "link": "https://vk.com/epn.official",
                        "icon": "vk"
                    }
                }
            }
        },
    }))
    .add('Tapicash', () => ({
        components: { muSocialChannels },
        template: `
            <mu-social-channels :links="links"></mu-social-channels>
        `,
        data() {
            return {
                links: {
                    "facebook": {
                        "link": "https://www.facebook.com/epn.cashback.official",
                        "icon": "facebook-f"
                    },
                }
            }
        },
    }))
    .add('Custom class', () => ({
        components: { muSocialChannels },
        template: `
            <mu-social-channels :links="links" className="test"></mu-social-channels>
        `,
        data() {
            return {
                links: {
                    "facebook": {
                        "link": "https://www.facebook.com/epn.cashback.official",
                        "icon": "facebook-f"
                    },
                }
            }
        },
    }))
    .add('Full support', () => ({
        components: { muSocialChannels },
        template: `
            <mu-social-channels :links="links"></mu-social-channels>
        `,
        data() {
            return {
                links: {
                    "facebook": {
                        "link": "https://www.facebook.com/epn.cashback.official",
                        "icon": "facebook-f"
                    },
                    "instagram": {
                        "link": "https://www.instagram.com/epn_official/",
                        "icon": "instagram"
                    },
                    "youtube": {
                        "link": "https://www.youtube.com/channel/UCeGdk5cQZGOJS5V4Vw50eog",
                        "icon": "youtube"
                    },
                    "telegram": {
                        "link": "https://telegram.me/ePN_Cashback_channel",
                        "icon": "telegram-plane"
                    },
                    "vk": {
                        "link": "https://vk.com/epn.official",
                        "icon": "vk"
                    },
                    "twitter": {
                        "link": "1",
                        "icon": "twitter"
                    },
                    "twitch": {
                        "link": "2",
                        "icon": "twitch"
                    },
                    "whatsapp": {
                        "link": "3",
                        "icon": "whatsapp"
                    },
                    "vimeo": {
                        "link": "4",
                        "icon": "vimeo-v"
                    }
                }
            }
        },
    }));
// /Social channels

// Input slider
storiesOf('Input slider', module)
    .add('Basic', () => ({
        components: { muInputSlider },
        template: `
            <mu-input-slider 
                :min="0" 
                :max="1" 
                :step="0.01" 
                :decimals="2" 
                :start="0" 
                :max-input-length="12"
                icon="ruble-sign" 
                v-model="model"
            ></mu-input-slider>
        `,
        data() {
            return {
                model: 0,
            }
        }
    }))
    .add('Without icon', () => ({
        components: { muInputSlider },
        template: `
            <mu-input-slider 
                :min="0" 
                :max="1" 
                :step="0.01" 
                :decimals="2" 
                :start="0" 
                :max-input-length="12"
                v-model="model"
            ></mu-input-slider>
        `,
        data() {
            return {
                model: 0,
            }
        }
    }))
    .add('Disabled', () => ({
        components: { muInputSlider },
        template: `
            <mu-input-slider 
                :min="0" 
                :max="1" 
                :step="0.01" 
                :decimals="2" 
                :start="0" 
                :max-input-length="12"
                icon="ruble-sign"
                v-model="model"
                :disable="true"
            ></mu-input-slider>
        `,
        data() {
            return {
                model: 0,
            }
        }
    }));
// /Input slider

// Offer card
storiesOf('Offer card', module)
    .add('Basic', () => ({
        components: { muOfferCard },
        template: `
            <div style="padding: 40px; background-color: #f5f6fa;display: flex;justify-content: center;">
                <mu-offer-card :shop="shopItem" :like-action="likeAction" size="grid"></mu-offer-card>
            </div>
        `,
        data() {
            return {
                shopItem: {
                    id: 1,
                    link: 'https://epn.bz',
                    name: 'Shop',
                    percent: '50%',
                    percentSale: '90%',
                    persentPhrase: 'up to',
                    hotsaleInfo: 'Promo',
                    hotsaleColor: '#e5353e',
                    logo: 'https://cdn1.epn.bz/public/7be55b97ccd52d3d15e2a0ea0a3c1b9c.png',
                    firstEmoji: '😩',
                    secondEmoji: '🙋🏽‍',
                    favorite: true,
                },
            };
        },
        methods: {
            likeAction() {
                this.shopItem.favorite = !this.shopItem.favorite;
            }
        }
    }))
    .add('Basic with theme', () => ({
        components: { muOfferCard },
        template: `
            <div style="padding: 40px; background-color: #f5f6fa;display: flex;justify-content: center;">
                <mu-offer-card :shop="shopItem" :like-action="likeAction" theme="red"></mu-offer-card>
            </div>
        `,
        data() {
            return {
                shopItem: {
                    id: 1,
                    link: 'https://epn.bz',
                    name: 'Shop',
                    percent: '0.001%',
                    persentPhrase: 'up to',
                    logo: 'https://cdn1.epn.bz/public/7be55b97ccd52d3d15e2a0ea0a3c1b9c.png',
                    firstEmoji: '😩',
                    secondEmoji: '🙋🏽‍',
                    favorite: false,
                },
            };
        },
        methods: {
            likeAction() {
                this.shopItem.favorite = !this.shopItem.favorite;
            }
        }
    }));

// Datepicker
storiesOf('Datepicker', module)
    .add('Basic', () => ({
        components: { muDatepicker },
        template: `
            <div>
                <p>Date: {{dateValue}}</p>
                <mu-datepicker class=""
                     v-model="dateValue"
                     :value="dateValue"
                     placeholder="I am new datapicker"
                     language="en"
                     :minDate="minDate"
                     :maxDate="maxDate"
                     :clearButton="true"
                     :todayButton="true"
                     :range="true"
                     :defaultDate="defaultDate"
                     :defaultDateRange="defaultDateRange"
                     :readonly="false"
                     :langFormat="false"
                     :disableDays="disableDays" 
                     :rangeStep="rangeStep"      
                     @rangeLimit="rangeLimitMethod"         
                    >
                </mu-datepicker>
            </div>
        `,
        data() {
            return {
                dateValue: '',
                defaultDate: new Date('06/11/2018'),
                defaultDateRange: new Date('07/12/2018'),
                minDate: new Date('05/03/2013'),
                maxDate: new Date('09/10/2019'),
                disableDays: [6],
                rangeStep: 30,
            };
        },
        methods: {
            rangeLimitMethod() {
                alert(`Превышен range между датами = ${this.rangeStep}`);
            }
        }
    }));

// Carousel
storiesOf('Carousel', module)
    .add('Basic', () => ({
        components: { muCarousel, muSlide, FontAwesomeIcon },
        template: `
        <mu-carousel :options="options">
            <mu-slide v-for="(slide, index) in slides" :key="index">
                <div :style="slideWrapperStyles">
                    <p class="title">{{slide.title}}</p>
                </div>
            </mu-slide>
            <div class="mu-button-prev" slot="button-prev">
                <font-awesome-icon :icon="['far', 'angle-left']" class="icon"/>
            </div>
            <div class="mu-button-next" slot="button-next">
                <font-awesome-icon :icon="['far', 'angle-right']" class="icon"/>
            </div>
            <div class="mu-pagination" slot="pagination"></div>
        </mu-carousel>
        `,
        data() {
            return {
                options: {
                    loop: true,
                    pagination: {
                        el: '.mu-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.mu-button-next',
                        prevEl: '.mu-button-prev'
                    }
                },
                slides: [
                    {
                        title: 'First title'
                    },
                    {
                        title: 'Second title'
                    },
                    {
                        title: 'Third title'
                    },
                    {
                        title: 'Four title'
                    },
                ],
                slideWrapperStyles: {
                    display: 'flex',
                    minHeight: '284px',
                    backgroundSize: 'cover',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage: 'url(' + bg + ')',
                    color: '#fff',
                    fontSize: '20px',
                },
            };
        },
    }));
// /Carousel

// Footer
storiesOf('Footer', module)
    .add('Basic', () => ({
        components: { muFooter, muSocialChannels, muStores, muChangeLang },
        template: `
            <mu-footer>
                <template slot="links">
                    <a
                        class="dark mu-footer__info-item"
                        :href="link.mainCashback"
                        rel="nofollow"
                    >
                        О проекте
                    </a>
                    <a
                        class="dark mu-footer__info-item"
                        :href="link.help"
                        rel="nofollow"
                    >
                        Помощь
                    </a>
                    <a
                        class="dark mu-footer__info-item"
                        :href="link.support"
                        rel="nofollow"
                    >
                        Техподдержка
                    </a>
                    <a
                        class="dark mu-footer__info-item"
                        :href="link.appManual"
                        rel="nofollow"
                    >
                        Мобильное приложение
                    </a>
                    <a
                        class="dark mu-footer__info-item"
                        :href="link.getplugin"
                        rel="nofollow"
                    >
                        Браузерное расширение
                    </a>
                    <a
                        class="dark mu-footer__info-item"
                        :href="link.job"
                        rel="nofollow noopener noreferrer"
                    >
                        Вакансии
                    </a>
                    <a
                        class="dark mu-footer__info-item"
                        :href="link.gifts"
                        rel="nofollow"
                    >
                        Розыгрыши
                    </a>
                </template>

                <template slot="social">
                    <mu-social-channels :links="socialLinks" class-name="mu-footer__social-link"></mu-social-channels>
                </template>

                <template slot="stores">
                    <mu-stores :links="storeLinks" lang="ru"></mu-stores>
                </template>

                <template slot="locale">
                    <mu-change-lang 
                        :current-language="routerLang" 
                        :all-languages="allLanguages" 
                        position="bottom" 
                        style-dropdown="gray" 
                        v-on:changelang="changeLang"
                        ></mu-change-lang>
                </template>

                <template slot="info">
                    <ul class="mu-footer__info-bottom">
                        <li class="mu-footer__info-bottom-item">
                            Обратная связь
                            <a
                                class="dark"
                                :href="link.email"
                                rel="nofollow noopener noreferrer"
                            >: {{ link.email }}</a>
                        </li>
                        <li class="mu-footer__info-bottom-item">
                            <a
                                class="dark"
                                :href="link.rules"
                                rel="nofollow"
                            >
                                Правила
                            </a>
                        </li>
                        <li class="mu-footer__info-bottom-item">
                            <a
                                class="dark"
                                :href="link.privacy"
                                rel="nofollow"
                            >
                                Политика конфиденциальности
                            </a>
                        </li>
                        <li class="mu-footer__info-bottom-item">&copy;{{ currentYear }} chimu-developers</li>
                    </ul>
                </template>
            </mu-footer>
        `,
        data() {
            return {
                currentYear: '2077',
                socialLinks: {
                    "facebook": {
                        "link": "https://www.facebook.com/epn.cashback.official",
                        "icon": "facebook-f"
                    },
                    "instagram": {
                        "link": "https://www.instagram.com/epn_official/",
                        "icon": "instagram"
                    },
                    "youtube": {
                        "link": "https://www.youtube.com/channel/UCeGdk5cQZGOJS5V4Vw50eog",
                        "icon": "youtube"
                    },
                    "telegram": {
                        "link": "https://telegram.me/ePN_Cashback_channel",
                        "icon": "telegram-plane"
                    },
                    "vk": {
                        "link": "https://vk.com/epn.official",
                        "icon": "vk"
                    }
                },
                storeLinks: {
                    telegram: {
                        name: 'telegram_bot',
                        link: 'https://telegram.me/epncashbackbot?utm_source=email&utm_medium=system&utm_campaign=20161227_epn_ny_cashback_ru',
                    },
                    itunes: {
                        name: 'app_store',
                        link: 'https://itunes.apple.com/us/app/epn-cashback/id1202254959',
                    },
                    googlePlay: {
                        name: 'google_play',
                        link: 'https://play.google.com/store/apps/details?id=bz.epn.cashback.epncashback',
                    },
                    yandexStore: {
                        name: 'yandex_store',
                        link: 'https://m.store.yandex.ru/',
                    },
                },
                link: {
                    mainCashback: '',
                    help: '',
                    support: '',
                    appManual: '',
                    email: 'cyberp@chimu.design',
                    getplugin: '',
                    gifts: '',
                    job: '',
                    privacy: '',
                    rules: '',
                },
                lang: 'en',
                allLanguages: ['ru', 'en', 'es'],
            };
        },
        computed: {
            routerLang() {
                return this.lang
            }
        },
        methods: {
            changeLang(lang) {
                this.lang = lang;
                console.log('Language:', lang)
            }
        },
    }));
// /Footer

// Gallery
storiesOf('Gallery', module)
    .add('Basic', () => ({
        components: { muGallery },
        template: `
        <div>
            <button @click="showGallery">Show gallery</button>

            <mu-gallery
                :opened.sync="opened"
                :options="options"
                :images="images"
            >
            </mu-gallery>
        </div>
        `,
        data() {
            return {
                opened: false,
                options: {
                    loop: true,
                },
                images: [
                    'https://pulson.ru/wp-content/uploads/2012/12/wallpaper-5790.jpg',
                    'https://i.pinimg.com/originals/77/9d/57/779d57efeca6ec306cb2f1dce9c2d332.png',
                    'https://files.adme.ru/files/news/part_78/780610/9458310-006-999-f4157468d0-1484579029.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/SMOM-d.svg/1024px-SMOM-d.svg.png'
                ]
            };
        },
        methods: {
            showGallery() {
                this.opened = !this.opened;
            }
        },
    }));
// /Gallery
/* eslint-enable */
