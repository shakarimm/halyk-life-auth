<template>
  <!--START SECTION AUTH-->
  <section class="section s-auth">
    <div class="container">
      <div class="s-auth__form-wrapper">
        <template v-if="errorProfile">
          <div class="s-auth__form-error">
            <div class="s-auth__form-error-title">Пользователь не найден</div>
            <div class="s-auth__form-error__img-wrapper" @click="errorProfile = false">
              <img class="s-auth__form-error__img" src="@/images/close.svg" alt="#">
            </div>
          </div>
        </template>
        <div class="s-auth__title title">Вход</div>
        <form
            class="auth-form"
            @submit.prevent="submitSignInForm"
        >
          <div class="auth-form__inputs">
            <div class="auth-form__input-block">
              <div class="auth-form__input-block__wrapper">
                <input
                    type="text"
                    class="auth-form__input"
                    placeholder="Логин"
                    v-model="login"
                >
              </div>
            </div>
            <div class="auth-form__input-block">
              <div class="auth-form__input-block__wrapper">
                <input
                    type="password"
                    class="auth-form__input"
                    placeholder="Пароль"
                    v-model="password"
                >
              </div>
            </div>
          </div>
          <div class="auth-form__btn-wrapper">
            <button class="auth-form__btn">Вход в систему</button>
          </div>
        </form>
      </div>
    </div>
  </section>
  <!--END SECTION AUTH-->
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      login: '',
      password: '',
      errorProfile: false,
    }
  },
  methods: {
    async submitSignInForm() {
      try {
        const response = await axios.post('https://products.halyklife.kz/api/v1/test/insis/identity/api/Account/login',
            {login: this.login, password: this.password});
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        this.login = '';
        this.password = '';
        this.errorProfile = true;
        this.$router.push({ path: '/documents' });
      } catch (error) {
        this.errorProfile = true;
        alert(error);
      }
    }
  },
}
</script>



