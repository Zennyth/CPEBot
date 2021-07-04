<template>
    <div class="tree w-100" >
        <Card v-for="(semester, index) in array" :key="index" variant="glass" class="mb-2 p-0" v-b-toggle="`${index}-semester`">
            <template v-slot:header>
                <h5>{{semester.id.toUpperCase()}}</h5>
                <b-icon icon="arrow-down-up" variant="text-primary" scale="1.25"></b-icon>
            </template>
            <template>
                <b-collapse :id="`${index}-semester`" class="mt-2">
                    <CardModule v-for="(moduleN, indexM) in semester.modules" :key="indexM" :moduleN="moduleN" variant="transparent" class="mb-4"/>
                </b-collapse>
            </template>
        </Card>
    </div>
</template>

<script>
export default {
  name: 'Tree',
  components: {
    Card: () => import("@/components/shared/Card"),
    CardModule: () => import("@/components/Grade/Card-Module"),
  },
  props: {
    array: Array
  },
  computed: {
  },
  methods: {
    changeIcon(event) {
        if(event.srcElement.classList.contains('arrow-rotate')) event.srcElement.classList.remove('arrow-rotate');
        else event.srcElement.classList.add('arrow-rotate');
    }
  }
}
</script>

<style lang="scss">
.bi-arrow-up {
    animation: transform 1s ease;
    transform: rotate(0deg) !important;
}
.arrow-rotate {
    transform: rotate(180deg) !important;
}
</style>
