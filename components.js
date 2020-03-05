var Event = new Vue()
Vue.component ('tabs', {
    template:`
        <div>
        <ul>
        <li  v-for="tab in tabs" :class="{'active':tab.selectedNow}" @click="activeTab(tab.name)">
        {{tab.name}}
</li>
</ul>
        <hr>
        <slot></slot>
        
</div>
        
    `,
    data(){
        return {
            tabs: []
        }
    },
    created(){
        this.tabs = this.$children
    },
    methods:{
        activeTab(tabName){
            Event.$emit("tabChange", tabName)
        }
    }

})

Vue.component('tab', {
    template:`
<div v-if="selectedNow">
        <slot></slot>
        </div>
    `,
    data(){
        return {
            selectedNow:this.selected
        }
    },
    created(){
        var localThis = this
        Event.$on('tabChange', function(s){
            localThis.selectedNow  = localThis.selected
            if(s == localThis.name){
                localThis.selectedNow = true

            }else{
                localThis.selectedNow = false
            }
        })
    },
    props:['name', 'selected']
})