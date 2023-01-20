<template>
  <label class="document-card__label">
    {{  this.uploadFileName ?? 'Вложить' }}
    <input
        class="document-card__input"
        type="file"
        ref="file"
        @change="onUploadFileChange"
    >
  </label>
  <template v-if="this.uploadFile">
    <button
        class="document-card__btn"
        type="button"
        @click="sendFile"
    >
      Отправить
    </button>
  </template>
</template>

<script>
import axios from "axios";

export default {
  props: {
    processInstanceId: String,
    files: Array,
  },
  data() {
    return{
      uploadFile: null,
    }
  },
  computed: {
    uploadFileName() {
      return this.uploadFile?.name;
    }
  },
  emits: ['send-file'],
  methods: {
    sendFile() {
      const fileData = [{
        "processInstanceId": this.processInstanceId,
        "fileTypeCode": "7",
        "page": 3,
        "fileName": this.uploadFileName,
      }]
      const formData = new FormData();
      formData.append('file', this.uploadFile)
      formData.append('fileData', JSON.stringify(fileData));
      axios.post('https://products.halyklife.kz/api/v1/test/insis/arm/api/File/UploadFiles', formData, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      }).then((res) => {
        res.data;
      });
      axios.post(' https://products.halyklife.kz/api/v1/test/insis/arm/api/File/List ', {
        processInstanceId: this.processInstanceId
      },{
        headers: {
          'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      }).then( res => {
        let vue = this;
        setTimeout(function () {
          vue.$emit('send-file');
        },1000)
      }).catch((error) => {
        alert(error);
      })
    },
    onUploadFileChange() {
      this.uploadFile = this.$refs.file.files[0];
    },
  },
}
</script>

