<template>
  <section class="s-documents section">
    <div class="container">
      <button class="s-documents__btn" @click="signOut">Выйти</button>
      <div class="s-documents__num">Количество документов <span>{{ this.files.length }}</span></div>
      <div class="document-cards">
        <div class="document-card" v-for="file in files" :key="file">
          <div class="document-card__title">Наименование</div>
          <div class="document-card__file-type-name">{{ file.fileTypeName }}</div>
          <div class="document-card__file-name-wrapper">
            <div class="document-card__file-name__img-wrapper">
              <img class="document-card__file-name__img" src="@/images/docs.svg" alt="#">
            </div>
            <div class="document-card__file-name">{{ file.fileName }}</div>
          </div>
          <upload-file-input
              :process-instance-id="this.processInstanceId"
              :files="files"
              @send-file="getFilesList"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import uploadFileInput from "@/components/upload-file-input";

export default {
  components: {
    uploadFileInput,
  },
  data() {
    return{
      processInstanceId: '0370c1fd-3b3d-4974-a0cb-23e8ccc727cd',
      files: [],
    }
  },
  methods: {
    getFilesList() {
      axios.post(' https://products.halyklife.kz/api/v1/test/insis/arm/api/File/List ', {
        processInstanceId: this.processInstanceId
      },{
        headers: {
          'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      })
      .then( res => {
        this.files = [];
        this.$nextTick(function(){
          res.data.forEach((item) => {
            let obj = {
              fileTypeName: item.fileTypeName,
              fileName: item.fileName,
              id: item.id,
            }
            this.files.push(obj);
          })
        });
      }).catch((error) => {
        alert(error);
      })
    },
    signOut() {
      window.localStorage.clear();
      this.$router.push({ path: '/' });
    },
  },
  mounted() {
    this.getFilesList();
  }
}
</script>

