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
            @li = res.data
            # @li = [
            #     {"id":48,"time":1552962730,"h_id":"lqzBS_Mx9cWcaI3mDv7WfCckqe50.mp4","v_id":"FhCBtFN6lF2jKvDViOSvD1nmJike.jpg","name":"moon-1","user_id":3},
            #     {"id":49,"time":1552962730,"h_id":"lqzBS_Mx9cWcaI3mDv7WfCckqe50.mp4","v_id":null,"name":"moon-2","user_id":3},
            #     {"id":50,"time":1552963861,"h_id":"lqzBS_Mx9cWcaI3mDv7WfCckqe50.mp4","v_id":"ltF2KS_y5KKD9DWNxRH1p83WTrYU.JPG","name":"van Gogh-1","user_id":3},
            #     {"id":51,"time":1552963861,"h_id":"lpbncK35xa3Ia2EIz5tZjjf60D-S.JPG","v_id":"lm9WxGGxeGT-Dhp9CIfrcBmUeP37.JPG","name":"van Gogh-2","user_id":3},
            #     {"id":52,"time":1552963861,"h_id":"0","v_id":"lu05GP_09E4LFOzeYhJbQhoJo51A.JPG","name":"van Gogh-3","user_id":3},
            #     {"id":18,"time":1552445588,"h_id":"Frcsjv7CK6f7IY43ETyUC7lx85JM.jpg","v_id":"Frcsjv7CK6f7IY43ETyUC7lx85JM.jpg","name":"Black Ocean-1","user_id":5},
            #     {"id":19,"time":1552445588,"h_id":"lrcw8OW8EFvDxPA93jdjSwvwiQX0.jpg","v_id":"lrcw8OW8EFvDxPA93jdjSwvwiQX0.jpg","name":"Black Ocean-2","user_id":5},
            #     {"id":20,"time":1552445588,"h_id":"Fs7saaMTAn8_qC3pFBZZEPRGYxqn.jpg","v_id":"0","name":"Black Ocean-3","user_id":5},
            #     {"id":21,"time":1552445803,"h_id":"FpXk0Ew1eJerK60Ks-RgIOku3LFU.jpg","v_id":"FsHHX6H6iZ1CvPm02R3ez-FEJHFf.jpg","name":"APP-1","user_id":7},
            #     {"id":40,"time":1552887316,"h_id":"Fk7HU8Q00cePZcMh3an0SujZ5pbQ.jpg","v_id":"FhCBtFN6lF2jKvDViOSvD1nmJike.jpg","name":"start-1","user_id":3},
            #     {"id":41,"time":1552887316,"h_id":"0","v_id":"lkKgi77oHacqVu8Tx70OhHWYQ6YJ.png","name":"start-2","user_id":3},
            #     {"id":42,"time":1552887316,"h_id":"FgeWtOn5HGjsmml3KEaJZrpf2YHU.jpg","v_id":null,"name":"start-3","user_id":3},
            #     {"id":43,"time":1552887742,"h_id":"0","v_id":"FqiRQHiV37etzX98ZGmxz3BbqMoo.jpg","name":"flower-1","user_id":7},
            #     {"id":46,"time":1552888355,"h_id":"Fo1mvl40_bUU551M0yLtK0sJSoeh.png","v_id":"Fo1mvl40_bUU551M0yLtK0sJSoeh.png","name":"tree-1","user_id":3},
            #     {"id":47,"time":1552888838,"h_id":"FjJFl0azaQ5zzSPn8tSn74fYDdX2.jpg","v_id":"lsJG3Pc2Csc9AgLalHWSg9EJPN-l.gif","name":"M&M-1","user_id":3},
            #     {"id":2,"time":1552376658,"h_id":"FsoxUrdPuHhym2RDz7I2uGv6eEpP.jpg","v_id":"0","name":"aaa-1","user_id":7},
            #     {"id":7,"time":1552390997,"h_id":"FonNipOOrRUUd_ZHKi7XAetayFQU.jpg","v_id":"0","name":"aaa-2","user_id":7},
            #     {"id":30,"time":1552635979,"h_id":"lqzBS_Mx9cWcaI3mDv7WfCckqe50.mp4","v_id":"0","name":"aaa-3","user_id":7}
            # ]
            material = @li[@index]
            if RE_VIDEO.test(material[@key])
                material.video = true
            @current = material
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
