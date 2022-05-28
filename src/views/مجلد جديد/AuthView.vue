<template>
  <div class="Auth mt-3">
   
    <div class="login" v-if="isLogin">
      <button type="button" class="btn btn-primary" @click="logout">
        Logout
      </button>
    </div>
    <div class="login" v-if="!isLogin">
      <button type="button" class="btn btn-primary" @click="login">
        Login
      </button>
      <button type="button" class="btn btn-primary">Register</button>
    </div>
  </div>
</template>

<script>
// // ////
import router from "../router";
import app from "../firebase/index";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export default {
  name: "AuthView",
  components: {},
  data() {
    return {
      user: {
        name: "",
        email: "",
        pw: "",
      },
    };
  },
 
  methods: {
    login: async function () {
      var me = this;
      await signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;

          //    const uid = user.uid;me.$store.dispatch("set_user", token);
          
         
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    },
    logout: async function () {
      var me = this;

      await signOut(auth)
        .then(() => {
       

          //   router.push('/auth')   me.$store.dispatch("destroy_user");
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
  created() {
      if (this.$store.state.user!=null) {
          router.push('/')
      }
  },
};
</script>
