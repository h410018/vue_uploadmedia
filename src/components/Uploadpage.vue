<template>
  <div>
    <div class="blockarea"></div>
    <div class="msg" id="popupmsg">
      <div id="msgcontent">
        <h2 style="position: absolute; left: 10px; width: 90%;">
          注意事項及操作步驟 / Notes and Manual:
        </h2>
        <span
          id="closebtn"
          style="position:absolute; display: block; width: 40px; height: 40px; top: 10px; right:10px; cursor: pointer;"
          ><img src="../assets/images/close.png" alt=""
        /></span>

        <ul class="pointslist">
          <li>
            此系統僅供處理人員統整事故相關資料，您的資料將不會作為其他使用。
          </li>
          <li>上傳檔案只能為圖檔或是影片檔</li>
          <li><b style="color: red;">影片檔請注意大小不要超過 10 mb</b></li>
          <li>
            點擊
            <img
              style="width: 100px; height: 30px;"
              src="../assets/images/upload.png"
              alt=""
            />
            按鈕可增加您想上傳的檔案
          </li>
          <li>
            點擊
            <img
              style="width: 30px; height: 30px;"
              src="../assets/images/cancel.png"
            />
            按鈕可刪除該檔案
          </li>
          <li>標記 <span class="required_sign">*</span> 的欄位為必填的項目</li>
          <li>
            點擊
            <img
              style="width: 130px; height: 30px;"
              src="../assets/images/submit.png"
            />
            送出您的資訊
          </li>
          <li>事故地址可藉由 google map 進行定位</li>
          <li><b style="color: red;">全部檔案請注意大小不要超過 30 mb</b></li>
        </ul>
      </div>
    </div>
    <!-- <div id="qrcode"></div> -->
    <!-- <button @click="callApi()">testcallApi</button> -->
    <div class="container-contact100">
      <div
        class="contact100-map"
        id="google_map"
        data-map-x="40.722047"
        data-map-y="-73.986422"
        data-pin="images/icons/map-marker.png"
        data-scrollwhell="0"
        data-draggable="1"
      ></div>

      <div class="wrap-contact100">
        <div
          class="contact100-form-title"
          :style="{'background-image': 'url(' + require('../assets/images/bg-01.jpg') + ')'}"
        >
          <span class="contact100-form-title-1">
            Contact Us
          </span>

          <span class="contact100-form-title-2">
            Feel free to drop us a line below!
          </span>
        </div>
        <form
          id="uploadform"
          class="contact100-form validate-form"
          autocomplete="off"
          enctype="multipart/form-data"
          ref="form"
        >
          <button
            type="button"
            style="font-size: initial;padding: 10px 16px;"
            class="btn btn-primary btn-lg"
            onclick="window.open('./definelocation', 'blank')"
          >
            使用 google map 進行定位
          </button>
          <div
            class="wrap-input100 validate-input"
            data-validate="事故地址 is required"
          >
            <span class="label-input100"></span>
            <input
              class="input100 info required"
              type="text"
              id="accident_address"
              name="accident_address"
              placeholder="請輸入事故地址"
            />
            <span class="focus-input100"></span>
          </div>
          <div
            class="wrap-input100 validate-input"
            data-validate="事故時間 is required"
          >
            <span class="label-input100"></span>
            <!-- <input
              class="input100 info required"
              type="text"
              id="happened_date"
              name="happened_date"
              placeholder="請輸入事故時間"
            /> -->
            <DateTimePickerInput></DateTimePickerInput>
            <span class="focus-input100"></span>
          </div>
          <div class="wrap-input100">
            <span class="label-input100"></span>
            <input
              class="input100"
              type="text"
              id="informer_name"
              name="informer_name"
              placeholder="請輸入通知人姓名"
            />
            <span class="focus-input100"></span>
          </div>
          <div class="wrap-input100">
            <span class="label-input100"></span>
            <input
              class="input100"
              type="text"
              id="informer_phonenumber"
              name="informer_phonenumber"
              placeholder="請輸入通知人電話"
            />
            <span class="focus-input100"></span>
          </div>
          <div
            class="wrap-input100 validate-input"
            data-validate="駕駛人姓名 is required"
          >
            <span class="label-input100"></span>
            <input
              class="input100 info required"
              type="text"
              id="driver_name"
              name="driver_name"
              placeholder="請輸入駕駛人姓名"
            />
            <span class="focus-input100"></span>
          </div>
          <div
            class="wrap-input100 validate-input"
            data-validate="駕駛人電話 is required"
          >
            <span class="label-input100"></span>
            <input
              class="input100 info required"
              type="text"
              id="driver_phonenumber"
              name="driver_phonenumber"
              placeholder="請輸入駕駛人電話"
            />
            <span class="focus-input100"></span>
          </div>
          <div
            class="wrap-input100 validate-input"
            data-validate="車牌號碼 is required"
          >
            <span class="label-input100"></span>
            <input
              class="input100 info required"
              type="text"
              id="license_plate_number"
              name="license_plate_number"
              placeholder="請輸入車牌號碼"
            />
            <span class="focus-input100"></span>
          </div>
          <div class="wrap-input100">
            <span class="label-input100"></span>
            <input
              class="input100"
              type="text"
              id="note"
              name="note"
              placeholder="備註"
            />
            <span class="focus-input100"></span>
          </div>
          <RecipientDropdownMenu
            @get-recipient="getRecipient($event)"
          >
          </RecipientDropdownMenu>
          <div class="wrap-input100">
            <span class="label-input100"></span>
            <input
              class="input100"
              type="text"
              id="recipient"
              name="recipient"
              placeholder="收件人"
              :value="recipient"
              readonly
            />
            <span class="focus-input100"></span>
          </div>
          <div>
            累計檔案大小 :
            <span id="total_size_of_file" :style="sizeWarning">{{ size }}</span>
          </div>
          <ul class="inputlist">
            <template v-for="(field, index) in fields">
              <component
                :is="field.input"
                :key="field.id"
                :id="field.id"
                @add-size="addSize"
                @delete-element="removeInput(index, $event)"
              ></component>
            </template>
          </ul>
          <UploadFileBtn
            @add-size="addSize($event)"
            @delete-element="minusSize($event)"
            @push-files="pushFiles()"
            @remove-from-filelist="removeFromFileList($event)"
          ></UploadFileBtn>
          <div class="container-contact100-form-btn">
            <button class="contact100-form-btn" type="submit">
              <span>
                Submit
                <i class="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="loadingpart">
      <div class="ml-loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p id="wait_msg">請稍後，傳送完成速度視檔案大小而定...</p>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import cancelImg from '../assets/images/cancel.png'
import DateTimePickerInput from './DateTimePickerInput'
import NewInput from './NewInput'
import UploadFileBtn from './UploadFileBtn'
import RecipientDropdownMenu from './RecipientDropdownMenu'

export default {
  name: 'Uploadpage',
  data () {
    return {
      image: cancelImg, // 設定 cancel 圖片屬性 供生成 input 使用
      fields: [],
      id: 0,
      totalSize: null,
      sizeWarning: {
        color: ''
      },
      check: null,
      fileList: [],
      recipient: null // for input value
    }
  },
  components: {
    DateTimePickerInput,
    NewInput,
    UploadFileBtn,
    RecipientDropdownMenu
  },
  beforeCreate () {
    this.$loadScript('/js/jquery.min.js') // for public/js/
    this.$store.dispatch('setDefaultAuthHeader')
  },
  mounted () {
    var accidentAddressIinput = document.getElementById('accident_address')
    // 將地圖中獲取到的地址傳到表單頁內
    window.addEventListener('storage', function () {
      // Listen when local storage changes
      if (Object.keys(window.localStorage).length !== 0) {
        if (
          'confirmedAddress' in window.localStorage &&
          window.localStorage.confirmedAddress !== undefined
        ) {
          accidentAddressIinput.value = window.localStorage.getItem(
            'confirmedAddress'
          )
          window.localStorage.removeItem('confirmedAddress') // 帶入後刪除該 storage
        } else {
          document.getElementById('accident_address').value = ''
        }
      }
    })
    this.showPopup()
    this.controlAlert()
    this.$loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAKFWBqlKAGCeS1rMVoaNlwyayu0e0YRes')
    this.$loadScript('/js/map-custom.js')
  },
  computed: {
    size () {
      return this.formatBytes(this.totalSize)
    }
  },
  methods: {
    // 判斷 pop up 只顯示一次，關閉後不再顯示，除非清 cookie
    showPopup: function () {
      const cookieValuePair = document.cookie.split('; ')
      if (!cookieValuePair.includes('isShowMsg=1')) {
        ;(function () {
          $('.blockarea').animate(
            {
              opacity: 1
            },
            {
              queue: false,
              duration: 800,
              complete: function () {
                $('#popupmsg').animate(
                  {
                    opacity: 1,
                    top: '-=20%'
                  },
                  {
                    duration: 2000,
                    complete: function () {
                      $('#closebtn').on('click', function () {
                        $('#popupmsg').remove()
                        $('.blockarea').css('display', 'none')
                        document.cookie = 'isShowMsg=1'
                      })
                    }
                  }
                )
              }
            }
          )
        })()
      } else {
        $('#popupmsg').remove()
        $('.blockarea').css('display', 'none')
      }
    },
    /** 以舊的上傳方式所寫的加總寫法
    // 添加 input
    // addInput: function () {
    //   this.fields.push({
    //     id: this.id++,
    //     input: NewInput
    //   })
    //   window.scrollTo(0, document.body.scrollHeight)
    // },
    // removeInput: function (index, filesize) {
    //   this.fields.splice(index, 1)
    //   this.totalSize -= filesize
    // },
    // addSize: function (...args) {
    //   var incomingFileSize = args[0]
    //   var currentFileSize = args[1]
    //   this.totalSize -= currentFileSize
    //   this.totalSize += incomingFileSize
    // },
    */
    // 因應新的上傳方式，改變檔案加總大小寫法
    addSize: function (event) {
      this.totalSize = event
    },
    minusSize: function (event) {
      this.totalSize -= event
    },
    pushFiles: function () {
      const inputData = document.querySelectorAll('input')
      for (const iterator of inputData) {
        if (iterator.files !== null) {
          iterator.files.forEach(element => {
            this.fileList.push(element)
          })
        }
      }
    },
    removeFromFileList: function (event) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].uid === event.uid) {
          this.fileList.splice(i, 1)
        }
      }
    },
    formatBytes: function (bytes, decimals = 2) {
      if (bytes === 0) {
        this.sizeWarning.color = ''
        return '0 Bytes'
      }
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      const i = Math.floor(Math.log(bytes) / Math.log(k))
      const number = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
      if (i > 2) {
        this.sizeWarning.color = 'red'
      } else if (i === 2) {
        if (number >= 30) {
          this.sizeWarning.color = 'red'
        } else {
          this.sizeWarning.color = ''
        }
      } else {
        this.sizeWarning.color = ''
      }
      return number + ' ' + sizes[i]
    },
    // 傳送資料
    postFormData: function () {
      $('.blockarea').css({
        opacity: 1,
        display: 'block'
      })
      $('.loadingpart').css('display', 'block')
      const inputData = document.querySelectorAll('input')
      const formData = new FormData()
      for (const iterator of inputData) {
        if (iterator.files === null) {
          formData.append(iterator.name, iterator.value)
        } else {
          this.fileList.forEach(element => {
            formData.append(element.name, element)
          })
        }
      }
      axios
        .get('https://ipinfo.io/json')
        .then(response => {
          formData.append('sender_ip', response.data.ip)
          axios
            .post('/api/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(response => {
              $(document.body).append(response.data) // alert msg
              console.log('SUCCESS!!')
            })
            .catch(err => {
              console.log('FAILURE!!', err)
            })
        })
        .catch(err => {
          console.log(err)
          console.log('form data is not sent')
        })
    },
    // 控制警告顯示
    controlAlert: function () {
      var check = this.check
      var vm = this
      /* ==================================================================
      [ Focus Contact2 ] */
      $('.input100').each(function () {
        $(this).on('blur', function () {
          if ($(this).val().trim() !== '') {
            $(this).addClass('has-val')
          } else {
            $(this).removeClass('has-val')
          }
        })
      })

      /* ==================================================================
      [ Validate ] */
      var input = $('.validate-input .input100')

      $('.validate-form').on('submit', function () {
        event.preventDefault()
        check = true
        for (var i = 0; i < input.length; i++) {
          if (validate(input[i]) === false) {
            showValidate(input[i])
            check = false
          }
        }
        if (check === true) {
          vm.postFormData()
        }
        return check
      })

      $('.validate-form .input100').each(function () {
        $(this).focus(function () {
          hideValidate(this)
        })
      })

      function validate (input) {
        if ($(input).attr('type') === 'email' || $(input).attr('name') === 'email') {
          // eslint-disable-next-line
          if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false
          }
        } else {
          if ($(input).val().trim() === '') {
            return false
          }
        }
      }

      function showValidate (input) {
        var thisAlert = $(input).parent()
        $(thisAlert).addClass('alert-validate')
      }

      function hideValidate (input) {
        var thisAlert = $(input).parent()
        $(thisAlert).removeClass('alert-validate')
      }
    },
    getRecipient: function (event) {
      this.recipient = event
    },
    callApi: function () {
      console.log(window.sessionStorage.getItem('token'))
    }
  }
}
</script>

<style scoped src="../assets/style/main.css"></style>
<style scoped src="../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css"></style>
<style scoped src="../assets/style/uploadpagestyle.css"></style>
<style scoped src="../assets/style/loading.css"></style>
