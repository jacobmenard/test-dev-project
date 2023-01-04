<template>
    <div class="main-container">
        <div class="main-container-wrapper px-203">

            <h2>Project</h2>
            <div class="header-tab-container d-flex justify-content-between align-items-center px-24 position-relative">
                <div class="tab-label d-flex align-items-center">
                    <div class="badge badge-active d-flex align-items-center justify-content-center">
                        <span>1</span>
                    </div>
                    <span class="active">Configuration</span>
                </div>

                <div class="tab-label d-flex align-items-center pl-8">
                    <div class="badge d-flex align-items-center justify-content-center" :class="{'badge-active' : tabController == 2, 'badge-default' : tabController == 1}">
                        <span>2</span>
                    </div>
                    <span :class="{'active' : tabController == 2}">Summary</span>
                </div>

                <div class="spacer position-absolute" :class="{'active' : tabController == 2}"></div>
            </div>

            <div class="content-container">

                <table v-if="tabController == 1">
                    <thead>
                        <tr>
                            <th class="pl-1rem">Add plan name</th>
                            <th class="pl-1rem">$ Amount</th>
                            <th class="pl-1rem">Job Owner</th>
                            <th class="width-50">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in plan" :key="i">
                            <td>
                                <input type="text" v-model="item.plan" placeholder="Product name">
                            </td>
                            <td>
                                <input type="number" v-model="item.amount" placeholder="Dollar amount">
                            </td>
                            <td>
                                <select name="" id="" v-model="item.jobOwner">
                                    <option value="" disabled selected>Select job owner</option>
                                    <option v-for="(opt, i) in owners" :key="i">{{ opt.name }}</option>
                                </select>
                            </td>
                            <td>
                                <img src="~assets/images/delete.svg" alt="" class="cursor-pointer" @click="removePlan(i)">
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <table v-if="tabController == 2" class="summarize-table">
                    <thead>
                        <tr>
                            <th class="pl-1rem">$ Sum</th>
                            <th class="pl-1rem">Job Owner</th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in ownerSummary" :key="i">
                            <td>
                                <span class="pl-1rem">{{ item.amount }}</span>
                            </td>
                            <td>
                                
                                <span class="pl-1rem">{{ item.jobOwner }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="button-footer d-flex justify-content-between">
                    <template v-if="tabController == 1">
                        <button class="default" @click="addNewRow()">+ ADD ROW</button>
                        <button class="primary" @click="summarizePlans()">NEXT</button>
                    </template>
                    <template v-else>
                        <button class="default" @click="tabChange(1)">< BACK</button>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vue from 'vue'
import axios from 'axios'
export default {
    
    data() {
        return {
            tabController: 1,
            plan: [
                {
                    plan: '',
                    amount: '',
                    jobOwner: ''
                }
            ],
                
            owners: [],
            ownerSummary: []

        }
    },
    methods: {
        tabChange(tab) {
            this.tabController = tab
        },

        getOwners() {
            let url = `https://demo-api.bettercommissions.com/interview-data/users`
            axios.get(url).then((res) => {
                this.owners = res.data.users
            })

        },

        addNewRow() {
            var data = {
                plan: '',
                amount: '',
                jobOwner: ''
            }
            this.plan.push(data)
        },

        summarizePlans() {
            this.tabChange(2)

            let summarize = {}

            this.plan.forEach(item => {
                var sums = summarize[item.jobOwner]
                if (sums) {
                    sums.amount = parseInt(sums.amount) + parseInt(item.amount)
                } else {
                    summarize[item.jobOwner] = {
                        jobOwner: item.jobOwner,
                        plan: item.plan,
                        amount: item.amount
                    }
                }
            })

            this.ownerSummary = summarize
        },

        removePlan(idx) {
            this.plan.splice(idx, 1)
            if (this.plan.length < 1) {
                
                var data = {
                    plan: '',
                    amount: '',
                    jobOwner: ''
                }
                this.plan.push(data)
            }
        }

    },

    mounted() {
        Promise.all([
            this.getOwners(),
        ])
    }

}
</script>

<style lang="scss">
@import '~assets/scss/colors';
@import '~assets/scss/fonts';
    .main-container {
        max-width: 1440px;
        background-color: $bg;      
        margin: auto;
        
        .main-container-wrapper {
            h2 {
                @include roboto-sans(24px, 32px, 600, $black1);
            }

            

            .header-tab-container {
                height: 72px;
                box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
                background-color: $white1;
                .tab-label {
                    background-color: $white1;
                    position: relative;
                    z-index: 10;
                    .badge {
                        height: 24px;
                        width: 24px;
                        @include roboto-sans(12px, 18px, 400, $white1);
                    }

                    > span {
                        @include roboto-sans(16px, 16px, 400, $gray1) {
                            padding-left: 8px;
                            padding-right: 8px;
                        }

                        &.active {
                            color: $black1;
                        }
                    }
                }

                .spacer {
                    top: 50%;
                    left: 0px;
                    z-index: 0;
                    margin-left: 24px;
                    width: calc(100% - 48px);
                }
            }

            .content-container {
                .button-footer {
                    margin: 1rem 0px;
                }
            }
        }

        table {
            width: 100%;
            margin-top: 1rem;
            thead {
                tr {
                    height: 48px;
                }
            }
            th {
                @include roboto-sans(12px, 22px, 700, $black2) {
                    text-align: left;
                    border-bottom: 1px solid $black3;
                }
            }

            tbody {
                tr {
                    td {
                        height: 72px;
                        border-bottom: 1px solid $black3;
                        span {
                            @include roboto-sans(16px, 24px, 400, $black5) {
                                letter-spacing: 0.5px;
                            }
                        }
                    }
                }
            }

            &.summarize-table {
                max-width: 474px;
                tbody {
                    tr {
                        td {
                            height: 56px !important;
                        }
                    }
                }
            }

        }
    }
</style>