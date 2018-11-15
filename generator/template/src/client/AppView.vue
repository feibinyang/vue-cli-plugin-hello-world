<template>
    <app-view id="app" class="client-app-view">
        <div>Hello veui!</div>
        <veui-schedule v-model="selected" :hourClass="hourClass"
        :shortcuts="shortcuts" shortcuts-display="popup"></veui-schedule>
    </app-view>
</template>

<script>
import AppView from 've-ria/views/AppView';
import AppModel from 've-ria/views/AppModel';
import createView from 've-ria/views/createView';
import { Schedule } from 'veui'

export default createView(AppView, AppModel, {
    name: 'client-app-view',
    components: {
        'veui-schedule': Schedule
    },
  data () {
    return {
      selected: {
        0: [ [0, 23] ],           // 周日
        1: [ [9, 11], [13, 17] ], // 周一
        3: [ [13, 16] ],          // 周三
        5: [ [9, 9], [16, 17] ]   // 周五
      },
      isDisabled (day, hour) {
        return day === 2 && hour > 11 && hour < 14
      },
      hourClass (day, hour) {
        return {
          night: hour > 19,
          weekend: day === 6 || day === 0
        }
      },
      shortcuts: [
        {
          label: '全周',
          selected: {
            0: true,
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true
          }
        },
        {
          label: '工组日',
          selected: {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true
          }
        },
        {
          label: '周末',
          selected: {
            0: true,
            6: true
          }
        }
      ]
    }
  }
});
</script>

<style lang="less">
.client-app-view {}
</style>
