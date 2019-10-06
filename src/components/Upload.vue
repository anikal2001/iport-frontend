<template>
 <v-layout align-center justify-space-around row fill-height>
     <v-hover>
         <v-card
         slot-scope="{ hover }"
         :class="`elevation-${hover ? 18 : 2}`"
         class="mx-auto"
         style="padding-bottom:0px;padding-top:20px;"
         id="UploadBar">
  <div>
    <div class="large-12 medium-12 small-12 cell">
    <br>
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <div class="uploadbutton">
            <button v-on:click="addFiles" type="button">
            <h1 class="mx-auto mb-4">MMS Patrol Upload Video</h1>
              <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
            
            <v-icon class="mx-auto" style="font-size:200px">fas fa-file-upload</v-icon>
            
            <v-card-title primary-title>
              <div>
                <span class="headline" style="padding:20px">
                  Choose File(s) for Upload
                  <p v-if="isSaving">Uploading {{ files.Length }} files...</p>
                </span>
              </div>
            </v-card-title>
            </button>
          </div>
        </form>
        
        <div class="mx-4" v-if="isInitial && files.length>0">
        <v-btn
          large
          @click="submitFiles"
        >upload</v-btn>
        
        <v-btn large class="mx-4" @click="reset()">Cancel</v-btn>
        </div>


                <!--Success-->
        <div v-if="isSuccess" class="container successBox">       
        <h2 >Uploaded {{ files.length }} file(s) successfully.</h2>
        <h2 >You will recieve a notification in your email regarding the status of the MMS report generated from the videos Uploaded</h2>
        <v-btn large class="mx-5 my-2" href="javascript:void(0)" @click="reset()">Upload again</v-btn>
        </div>

        
        <!--FAILED-->
        <div v-if="isFailed" class="container">
          <h2>Uploaded failed.</h2>
          <p>
            <v-btn large href="javascript:void(0)" @click="reset()">Try Again</v-btn>
          </p>
          <pre>{{ uploadError }}</pre>
        </div>


    </div>
  </div>
  </v-card>
  </v-hover>
  <!--------------------------------------------------List of Files-------------------------------------------->

  <v-card
      v-if="files.length>0 && !isSuccess && !isFailed"
      class="mx-auto ml-0 FileList"
      style="padding:20px;"
      :min-height="getheight()"
      :max-height="getheight()"
    >
      <v-card-title>List of Files</v-card-title>
      <v-list>
        <v-list-tile v-for="(file,key) in files" v-bind:key="file.name">
          <v-list-tile-title v-html="(key+1)+'. '+file.name"></v-list-tile-title>
          <span  v-on:click="removeFile( key )">
              <v-icon v-if="!isSaving" class="mx-3" style="cursor:pointer;">fas fa-times</v-icon>
          </span>
        </v-list-tile>
      </v-list>
    </v-card>
<!--
  <div class="large-12 medium-12 small-12 cell">
      <div v-for="(file, key) in files" class="file-listing">{{ file.name }} <span class="remove-file" v-on:click="removeFile( key )">Remove</span></div>
    </div>-->
 </v-layout>
</template>

<script>
import { wait } from './utils.js';

const upload = require('../services/file-upload.service')
const axios = require('axios')
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;
var urlobject =[];


  export default {
    /*
      Defines the data used by the component
    */
    data(){
      return {
        currentStatus: null,
        files: []
      }
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
      this.files = [];
      this.uploadError = null;
    },

      /*
        Adds a file
      */
      addFiles(){
          if(this.currentStatus== STATUS_INITIAL){
              this.$refs.files.click();
          }
          else{
              return null;
          }
      },

      /*
        Submits files to the server
      */
       submitFiles(){
          this.currentStatus=STATUS_SAVING;
        /*
          Initialize the form data
        */
        let formData = new FormData();

        /*
          Iteate over any file sent over appending the files
          to the form data.
        */
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];

          formData.append('files[' + i + ']', file);
        }

        upload.getSignedurl(this.files)

        /*
          Make the request to the POST /select-files URL
        */
       },




        /*axios.post( 'http://localhost:5000/api/video/upload',
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        ).then(()=>{
          console.log('SUCCESS!!')
          this.currentStatus = STATUS_SUCCESS;
          console.log(response)
        })
        .catch( (error)=> {
            this.currentStatus = STATUS_FAILED;
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });


      }*/

      /*
        Handles the uploading of files
      */
      handleFilesUpload(){
        let uploadedFiles = this.$refs.files.files;

        /*
          Adds the uploaded file to the files array
        */
        for( var i = 0; i < uploadedFiles.length; i++ ){
          this.files.push( uploadedFiles[i] );
        }
      },

      /*
        Removes a select file the user has uploaded
      */
      removeFile( key ){
        this.files.splice( key, 1 );
      },
      getheight() {
          var offsetHeight = document.getElementById("UploadBar").scrollHeight;
          return offsetHeight;
    }
    },
    mounted() {
        this.reset();
  }

  }
</script>
<style>
  input[type="file"]{
    position: absolute;
    top: -500px;
  }

  div.file-listing{
    width: 200px;
  }

  .uploadbutton {
  display: flex;
  flex-direction: column;
}
.FileList {
  overflow: scroll;
}
.successBox{
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>