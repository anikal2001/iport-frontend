<template>

   <v-layout align-center justify-space-around row fill-height> 
    <v-hover>
      <v-card
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 18 : 2}`"
        class="mx-auto "
        style="padding-bottom:0px;padding-top:20px;"
        id="UploadBar"
      >
      <form enctype="application/x-www-form-urlencoded" novalidate v-if="isInitial || isSaving">
      <div class="uploadbutton">
      <h1 class="mx-auto mb-4">MMS Patrol Upload Video</h1>
      <input id="fileid" :name="uploadFieldName" type="file" :disabled="isSaving" multiple @change="NameOfFiles = $event.target.name; ListofFiles = $event.target.files;" >
       <v-icon class="mx-auto" style="font-size:200px" >fas fa-file-upload</v-icon>
        <v-card-title primary-title>
          <div>
            <span class="headline" style="padding:20px">Choose File(s) for Upload
            <p v-if="isSaving">
              Uploading {{ ListofFiles.Length }} files...
            </p>
            </span>
            </div>
        </v-card-title>
        </div>
        </form>
        <v-btn v-if="isInitial && ListofFiles.length>0" large @click ="filesChange(NameOfFiles, ListofFiles)">upload</v-btn>
        <v-btn v-if="isInitial && ListofFiles.length>0" large @click ="reset()">Cancel</v-btn>
        <!--Success-->
        <h2 v-if="isSuccess">Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
        <v-btn v-if="isSuccess" large href="javascript:void(0)" @click="reset()">Upload again</v-btn>
        <!--FAILED-->
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>
      </v-card>
      </v-hover>
      <v-card
      v-if="ListofFiles.length>0 && !isSuccess"
      class="mx-auto ml-0 FileList"
      style="padding:20px;"
      :min-height="getheight()"
      :max-height="getheight()"
      >
        <v-card-title>List of Files</v-card-title>
      <v-list>
        <v-list-tile
        v-for="ListofFile in ListofFiles" v-bind:key="ListofFile.name"
        >
        <v-list-tile-title v-html="ListofFile.name"></v-list-tile-title>
        </v-list-tile>
        </v-list>
      </v-card>
  </v-layout>
</template>

<script>
  //import { upload } from './file-upload.fake.service'; // fake service
  import { upload } from './file-upload.service';   // real service
  import { wait } from './utils';
  import menubar from './Menu_Bar.vue'

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
export default {
  name: 'Upload_Video',
    data() {
      return {
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        ListofFiles:[],
        NameOfFiles: '',
        uploadFieldName: 'photos',
      }
    },
    components:{
      menubar
    },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },
    
    methods: {
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
        this.ListofFiles = [];
      },
      getheight(){
        var offsetHeight = document.getElementById('UploadBar').scrollHeight;
        return offsetHeight;
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING;
        upload("iris-iport","item1", "./Downloads/careers 1.jpg" )
          .then(wait(1500)) // DEV ONLY: wait for 1.5s 
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();
        if (!fileList.length) return;
        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });
        // save it
        this.save(formData);
      }
    }, 
    mounted() {
      this.reset();
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Exo+2:400,700,500,300);
.uploadbutton{
  display: flex;
  flex-direction: column;

}
.FileList{
  overflow: scroll;
}

#fileid{
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;

}



</style>
