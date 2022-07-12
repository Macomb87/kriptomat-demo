import Vue from "vue"


Vue.filter("fixedNumber", str => {
    if (parseFloat(str) < 1) {
        return parseFloat(str).toFixed(4)
    } else {
        return parseFloat(str).toFixed(2)

    }
})
