<template>
    <div class='pagination'>
        <div class='first' @click='toFirstPage()' :class='paginationInfo.currentPage <= 1 ? "inactive" : "active"'><<</div>
        <div class='prev' @click='toPrevPage()' :class='paginationInfo.currentPage <= 1 ? "inactive" : "active"'><</div>
        <div class='next' @click='toNextPage()' :class='paginationInfo.currentPage >= this.paginationInfo.totalPages ? "inactive" : "active"'>></div>
        <div class='last' @click='toLastPage()' :class='paginationInfo.currentPage >= this.paginationInfo.totalPages ? "inactive" : "active"'>>></div>
        <span class='pageInfo'>
            <span v-text='paginationInfo.currentPage'></span>
            <span v-text='paginationInfo.totalPages'></span>
        </span>
    </div>
</template>

<script type='text/javascript'>
export default {
    props: {
        pagination: {
            type: Object,
            default: function () {
                return {
                    currentPage: 1,
                    pageSize: 3,
                    count: 0
                }
            }
        }
    },
    data () {
        return {
            paginationInfo: this.handlePaginationObj(this.pagination)
        }
    },
    methods: {
        toFirstPage () {
            if (this.paginationInfo.currentPage <= 1) {
                return
            }
            this.paginationInfo.currentPage = 1
            this.goPage()
        },
        toPrevPage () {
            if (this.paginationInfo.currentPage <= 1) {
                return
            }
            this.paginationInfo.currentPage -= 1
            this.goPage()
        },
        toNextPage() {
            if (this.paginationInfo.currentPage >= this.paginationInfo.totalPages) {
                return
            }
            this.paginationInfo.currentPage += 1
            this.goPage()
        },
        toLastPage () {
            if (this.paginationInfo.currentPage >= this.paginationInfo.totalPages) {
                return
            }
            this.paginationInfo.currentPage = this.paginationInfo.totalPages
            this.goPage()
        },
        goPage () {
            this.$emit('goPage', { pagination: this.paginationInfo })
        },
        handlePaginationObj (pagination) {
            let paginationInfo = Object.assign({}, pagination)
            paginationInfo.totalPages = parseInt(pagination.count / pagination.pageSize) + (pagination.count % pagination.pageSize > 0 ? 1 : 0)
            return paginationInfo
        }
    },
    watch: {
        pagination (newVal) {
            console.log('newVal: ', newVal)
            this.paginationInfo = this.handlePaginationObj(newVal)
        }
    }
}
</script>

<style lang='less' scoped>
.pagination {
    flex: 1;
    padding: 10px;
    display: flex;
    align-items: center;
    margin-right: 10px;
    div {
        border: 1px solid;                    
        padding: 10px 30px;
        cursor: pointer;
        &.active {
            &:hover {
                background-color: red;
                color: #FFF;
                border-color: #000;
            }
        }
        &.inactive {
            background-color: #666;
            color: #FFF;
            cursor: default;
            border-color: #666
        }
    }
    div + div {
        border-left: 0;
    }
    .pageInfo {
        margin-left: 10px;
        span:first-child {
            margin-right: 10px;
            position: relative;
            &::after {
                content: '/';
                position: absolute;
                left: 15px;
            }
        }
    }
}
</style>
