<template>
    <ion-grid class="warning-text">
        <ion-row>
            <ion-col>
                <ion-text color="dark" id="open-toast" >
                    <h6 >{{ props.text }}</h6>
                    <ion-toast position-anchor="footer" color="warning" trigger="open-toast" :message="props.message" :duration="5000"></ion-toast>
                </ion-text>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>
<script lang="ts" setup>
const props = useAttrs() 
</script>