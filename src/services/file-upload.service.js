import * as axios from 'axios';
import { wait } from '../components/utils';


function getSignedurl(files) {

  var urlobject = []
  axios.get('http://localhost:5000/api/videos/upload/generatepresignedurl')
    .then( function (response) {
      urlobject = response.data.urls
      putFiles(urlobject, files)
    }
    )

}
async function sendfiles(files){
  var namelist=[]
  namelist.push(files.name);
  axios.post('http://localhost:5000/api/videos/upload', namelist)
  .then(()=>{
    console.log('names sent')
    Promise.resolve();
  })
  .catch((error) => {
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
  
}
function putFiles(urlobject, files) {

  sendfiles(files)
  wait(3600)
  axios.put(urlobject,
    files,
    {
      headers: {
        'Content-Type': 'video/mp4',
      }
    }
  )
    .then(function() {
      console.log('Success!')
      
    })
    .catch((error) => {
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
}
export {getSignedurl, sendfiles}

