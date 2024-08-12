<template>
  <modal-head :name="product.name" />
  <ion-content>
    <ion-img :src="formatUrl(product.image)" :alt="product.name"/>

    <h6 id="figcaption">(Foto e descrição meramente ilustrativas)</h6>
    
    <ion-text color="dark">
      <h5 id="title">{{ product.name }}</h5>
      <br>
      <h6 class="description-title">Descrição:</h6>
      <p id="description">{{ product.desc }}</p>
      <br>
      <p class="description-title">Última atualização: {{ product.date.toDate() }}</p>
    </ion-text>


    <!--<mainteinance-toast 
    text="Se alguns dos botões não estiver funcionando, clique aqui." 
    message="Já estamos trabalhando para resolver o problema, obrigado por avisar!"/>-->
    
  </ion-content>
  <ion-footer class="call-to-action-footer">
    <call-to-action :link="product.links"/>
  </ion-footer>
</template>

<script lang="ts" setup>
import { formatUrl } from '~/utils/string';
import { findDocInCollectionAction } from '~/services/actions/product-action';
import { getKey } from '~/utils/key';
import type { DocumentData } from 'firebase/firestore';

const savedId: string | undefined = await getKey("cod")
let productsList: DocumentData[] | unknown[] = await findDocInCollectionAction("Products","id","==", Number(savedId))
let product: DocumentData | unknown = productsList.pop()

if(product.name == undefined) {
  console.log("Segunda tentativa de conectar com o banco")
  productsList = await findDocInCollectionAction("Products","id","==", Number(savedId))
  product = productsList.pop()
}

</script>

<style >
ion-action-sheet {
  --button-color: blue;
}

#open-action-sheet {
  --box-shadow:0px;
}

ion-toast, #title, .description-title, #figcaption {
  text-align: center;
}

.description-title, #figcation {
  font-size: medium; 
  color: gray; 
  font-style: oblique;
}
#description {
  text-align: center;
}
#figcaption {
  font-size: smaller;
}
.call-to-action-footer {
  background-color: var(--ion-color-secondary);
}
</style>
