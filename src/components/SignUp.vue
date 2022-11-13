<template>
    
</template>

<script lang="ts">
    export default {
        data() {
            return {
                token: ""
            }
        },
        mounted() {
            document.onkeydown = (e) => {
                if(e.code === "Enter") return; //this.next();
            };
        },
        methods: {
        }
    }
</script>