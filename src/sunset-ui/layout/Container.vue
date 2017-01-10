<style lang="sass">
    .sunset-container {
        display: table;
        width: 100%;
        height: 100%;
        vertical-align: top;
        border-collapse: collapse;
        border-spacing: 0px;
        table-layout: fixed;
        .sunset-leftside {
            display: table-cell;
            position: relative;
            width: 300px;
            background: #2c2e2f;
            z-index: 1;
        }
        .sunset-content {
            display: table-cell;
            position: relative;
            z-index: 1;
            padding-bottom: 0;
            vertical-align: top;
            word-break: break-word;
        }
    }
</style>
<template>
    <div class="sunset-container">
        <div class="sunset-leftside">
            <slot name="leftside"></slot>
        </div>
        <div class="sunset-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {};
</script>