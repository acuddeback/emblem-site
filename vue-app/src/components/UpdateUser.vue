<template>
  <div class="container">
    <form class="userDataForm" id="updatePassword">
      <p>Update Password</p>
      <input type="email" v-model="userData.email" placeholder="E-mail" autofocus required/>
      <input type="password" v-model="userData.password" placeholder="Old password" autofocus required/>
      <input type="password" v-model="userData.newPassword" placeholder="New password" autofocus required/>
      <input type="password" v-model="userData.confirmNewPassword" placeholder="Confirm new password" autofocus required/>
      <input type="email" v-model="userData.email" placeholder="E-mail" autofocus required/>
      <input type="password" v-model="userData.password" placeholder="password" autofocus required/>
      <input type="First" v-model="userData.firstName" placeholder="First Name" autofocus required/>
      <input type="Middle" v-model="userData.middleName" placeholder="Middle Name" />
      <input type="Last" v-model="userData.lastName" placeholder="Last Name" required/>
      <input type="DOB" v-model="userData.userDOB" placeholder="Date of Birth MM/DD/YYYY" autofocus required maxlength="10"/>
      <input type="school" v-model="userData.schoolID" placeholder="School" required/>
    </form>
    <button type="submit">SIGN UP NOW</button>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Update',

  created () {
    this.checkUser()
  },

  computed: {
    ...mapState({

    }),
    ...mapGetters('user', [
      'userInfo',
      'hasStoredUser'
    ])
  },

  data () {
    return {
      userData: {
        accountType: '',
        firstName: '',
        middleName: '',
        lastName: '',
        userDOB: '',
        schoolID: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
      }
    }
  },

  methods: {
    updateUser () {
      this.$store.dispatch('user/updateUser', this.$data.userData)
    }
  }
}

</script>
