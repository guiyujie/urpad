<style lang="scss">
.media{
    bottom:0;
    left:0;
    position:absolute;
    right:0;
    top:0;
    width: 100%;
    height: 100%;

}
video,.img{
    width: 100%;
    height: 100%;
    border:none;
}
.img{
    height: 100%;
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>
<template lang="pug">
.media
    video(v-if="video"
        muted
        autoplay="true"
        poster="//cdn-321.xvc.com/spin.svg"
        @ended="next"
        @error="next"
    )
        source(:src="prefix+url")
    .img(
        v-else
        :style="{backgroundImage:'url('+prefix+url+')'}"
    )
</template>
<script lang="coffee">

export default {
    props: {
        url:String
        video:Boolean
        prefix:{
            type:String,
            default:"https://p.gu321.com/"
        }
    },
    methods:
        next:->
            @$emit('next')

}
</script>
