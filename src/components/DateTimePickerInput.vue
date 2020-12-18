<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <date-picker
          :class="dateTimePickerClassOptions"
          v-model="date"
          :config="dateTimePickerConfig"
          id="happened_date"
          name="happened_date"
        ></date-picker>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

// Import required dependencies
import 'bootstrap/dist/css/bootstrap.css'

// Import this component
import datePicker from 'vue-bootstrap-datetimepicker'

// Import date picker css
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
// import Icon
import '@fortawesome/fontawesome-free/css/all.css'

$.extend(true, $.fn.datetimepicker.defaults, {
  icons: {
    time: 'far fa-clock',
    date: 'far fa-calendar',
    up: 'fas fa-arrow-up',
    down: 'fas fa-arrow-down',
    previous: 'fas fa-chevron-left',
    next: 'fas fa-chevron-right',
    today: 'fas fa-calendar-check',
    clear: 'far fa-trash-alt',
    close: 'far fa-times-circle'
  }
})

export default {
  name: 'DateTimePickerInput',
  data () {
    return {
      date: new Date(), // for dateTimePicker
      dateTimePickerConfig: {
        // for dateTimePicker
        format: 'YYYY/MM/DD HH:mm:ss',
        useCurrent: true
      },
      dateTimePickerClassOptions: {
        info: true,
        required: true
      }
    }
  },
  components: {
    datePicker
  }
}
</script>
