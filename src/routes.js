import Login_Page from './components/Login_Page.vue';
import Upload_Video from './components/Upload.vue';

const routes = [
    {
        path:'/',
        component: Login_Page, 
        name: 'login'
    },
    {
        path:'/Upload', 
        component: Upload_Video
    }
];

export default routes;