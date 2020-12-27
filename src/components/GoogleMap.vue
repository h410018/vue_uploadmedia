<template>
  <div id="mapwrapper">
    <gmap-map
    :center="pos"
    :zoom="18"
    map-type-id="terrain"
    style="width: 100%; height: 100%"
    >
      <gmap-info-window
      ref="infoWindowRef"
      :options="infoOptions"
      :position="pos"
      :opened="infoWinOpen"
      @closeclick="closeInfoWindow()"
      >
        <div style="color: #000000;">
          <h1>您目前是在這個位置附近嗎？</h1>
          如果此處不是您目前的位置，請按下<b style="color: red">否</b>返回表單頁手動輸入地址.
          <p>您目前的位置：<b style="font-weight: bold;"> {{ addr }} </b></p>
          <button @click="mapEvent(addr)"><span style="color: green">是 / Yes</span></button>
          <button onclick="window.close()"><span style="color: red">否 / No</span></button>
        </div>
      </gmap-info-window>
      <gmap-marker
      :position="pos"
      :clickable="true"
      :draggable="false"
      @click="toggleInfoWindow()"
      />
    </gmap-map>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'GoogleMap',
  data () {
    return {
      map: null,
      pos: {},
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -45
        }
      },
      infoWinOpen: true,
      addr: null
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getPosition()
    })
  },
  methods: {
    getPosition: function () {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(this.setPosition)
      } else {
        alert('Your browser doesn\'t support geolocation.')
      }
    },
    setPosition: function (position) {
      var geoPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.pos = geoPosition
      this.getAddress(geoPosition)
    },
    toggleInfoWindow: function () {
      this.infoWinOpen = !this.infoWinOpen
    },
    closeInfoWindow: function () {
      this.infoWinOpen = false
    },
    mapEvent: function (address) {
      localStorage.setItem('confirmedAddress', address)
      alert('已自動填入位置！')
      window.close()
    },
    getAddress: function (pos) {
      $.ajax({
        async: false,
        type: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.lat +
              ', ' + pos.lng +
              '&key=AIzaSyCOjqwIEwZxqICNaRJmBuLcZYdqtuUcA3Y',
        success: function (data, textStatus, jqXHR) {
          //
        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert('something wrong with ajax for getting address')
        }
      }).then(response => {
        this.addr = response.results[0].formatted_address
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
html,
body,
.app,
#mapwrapper {
  height: 100%;
  width: 100%;
}

</style>
