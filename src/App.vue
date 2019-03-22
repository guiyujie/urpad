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
    background: url("./assets/ur.gif") no-repeat center center;
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

#预加载策略,每次提前加载2张,直到全部加载完成
PREFIX = "https://p.gu321.com/"
STEP = 1
PRELOAD = (m,idx= 0) ->
    s = idx
    e = idx + STEP
    if s<0 then s = 0
    if s >= m.length  
        return 
    if e>= m.length-1 then e =m.length-1
    new Promise (resolve) ->
        count  = STEP
        finish = () ->
            if count-- <= 0
                resolve() 
        #console.log("preloadStart:#{s}-#{e}")        
        for i in [s..e]
            if m[i].video || m[i].preloaded 
                finish() 
            else
                img = new Image()
                img.onerror = img.onload = finish
                img.src = PREFIX + m[i].h_id
                m[i].preloaded = true
                #console.log("preload:#{i}",m[i].h_id)


export default {
    components: {
        media : require('./_vue/media.vue').default
    }
    data: -> 
        {
            n:1
            show:false
            config:{
                sideTime:10
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
    watch:{
        index:(v)->
            PRELOAD(@li,v+STEP)
            
    }
    methods:{
        timeout:->
            _timer = (time)=>
                _TIMER = setTimeout(@play,time*1000)
            if (@n==0 and @current.video) or (@n==1 and @next.video)
                console.log("stoped")
                #done
            else
                #console.log(@index)
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
            @li = res.data.filter((x)=>x.h_id!='0')    
            for material  in @li
                if RE_VIDEO.test(material[@key])
                    material.video = true
            if @li.length < 2
                return
            await PRELOAD(@li)
            @current = @li[@index]
            @next = @li[(@index+1)%@li.length]
            @show = true
            @play()
        )
      

}

document.addEventListener('keydown', (e)->
    e.preventDefault()
);
document.addEventListener('keyup', (e) ->
    e.preventDefault()
);


</script>
