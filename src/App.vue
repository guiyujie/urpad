<style>
html,body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border:none;
    -webkit-app-region: no-drag;
}
#app{
    width: 100%;
    height: 100%;
}
body{
    background: #000;
    cursor: none;
}
.body{
    width: 100%;
    height: 100%;
    position: absolute;
}

</style>

<template lang="pug">
.body(v-if="show")
    transition(enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft" @after-leave="cal")
        media(:url="urlCurrent" :video="current.video" v-show="!n" @next="play")
    transition(enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft" @after-leave="cal")
        media(:url="urlNext" :video="next.video" v-show="n" @next="play")
</template>

<script lang="coffee">
import 'animate.css/animate.min.css'
import axios from 'axios';
_TIMER = undefined
RE_VIDEO = /\.(mp4|ogg|swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb)$/i
qs = ->
    result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
    if result == null or result.length < 1
        return ""
    return result[1]

export default {
    components: {
        media : require('./_vue/media.vue').default
    }
    data: -> 
        {
            n:0
            show:false
            config:{
                sideTime:2
            },
            current:{}
            next:{},
            key:"h_id"
            index:0
            li:[]
        }

    computed: {
        urlCurrent: ->
            @current[@key]

        urlNext: ->
            @next[@key]

    }
    methods:{
        timeout:->
            _timer = (time)=>
                _TIMER = setTimeout(@play,time*1000)
            if @current.video
                #done
            else
                _timer(@config.sideTime)

        play:->
            _TIMER && clearTimeout(_TIMER)
            @n = !@n-0
            @index = (++@index)%@li.length
            @timeout()

        cal:->
            material = @li[@index]
            if RE_VIDEO.test(material[@key])
                material.video = true
            if @n==1
                @current = material
            else
                @next = material


    }

    mounted:->
        imei = (qs("imei") || 353114008096366)
        
        axios.get("https://gyj.urer.top/-api/upad/gg?imei=#{imei}").then((res)=>
            @li = res.data
            @current = @li[@index]
            @next = @li[(@index+1)%@li.length]
            @show = true
            @timeout()
        )
        

}

document.addEventListener('keydown', (e)->
    e.preventDefault()
);
document.addEventListener('keyup', (e) ->
    e.preventDefault()
);


</script>
