<template>
   <ion-content>
      <ion-grid justify-content-center align-items-center style='height: 100%;'>
        <ion-row>
          <ion-col>
            <ion-img :src="logo"/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-input @ionInput="form.validateEmail" label-placement="floating" ref="emailInput" fill="outline" label="E-mail" :icon="ioniconsPersonCircle" placeholder="Seu.email@exemplo.com"/>
            <ion-note slot="helper">Enter a valid email</ion-note>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-input @ionInput="form.validatePassword" label-placement="floating" class="ion-invalid" ref="passwordInput" fill="outline" :minlength="12" label="Senha" type="password" placeholder="*********"/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button id="native_login_btn" @click="logar()">
              <ion-text >Login</ion-text>
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button id="native_signIn_btn">
              <ion-text>Inscreva-se</ion-text>
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div id="split"></div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <GoogleSignInButton
              class="GSignButton"
              @success="handleLoginSuccess"
              @error="handleLoginError"/>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
</template>

<script lang="ts" setup>


import { alertController } from '@ionic/vue';
import logo from '../assets/icon.png'

function logar() {
  console.log("Email: "+form.email+" Senha: "+form.password)

}

const form = {
  email:'',
  password:'',
  validatePassword(password: String) {
    const verifiedPassword = String(password).match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/
    )
    if(verifiedPassword != null) {
      this.password = String(verifiedPassword)
    }
    console.log(verifiedPassword)
  },
  validateEmail(email: String) {
    let verifiedEmail = String(email).match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )

    if (verifiedEmail != null) {
      
      this.email = String(verifiedEmail)
    }
    console.log(verifiedEmail)
  }

}


// handle success event
const handleLoginSuccess = (response: any) => {
  const { credential } = response;
  console.log("Access Token", credential);
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};

</script>

<style scoped>
ion-img {
  width: 60%;
  margin:auto;
}
ion-text#separadorDeTexto {
  font-weight: bold;
  font-size: large;
}
ion-content {
  --background:var(--ion-color-secondary);
}
ion-input {
  --background:var(--ion-color-primary);
  --padding-start: 20px;
  text-align: left;
  border-radius: 10px;
}
ion-button {
  --background: var(--ion-color-tertiary);
  --color:var(--ion-color-primary);
  width:95%;
}

ion-row {
  text-align: center;
}
div#split {
  width: 100%;
  height: 50px;
}
ion-grid {
  padding-top: 25%;
}
</style>