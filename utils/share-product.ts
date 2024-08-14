import { Share } from '@capacitor/share';
import type { Product } from '~/models/Product';
import { useRoute } from 'vue-router';

export async function share_product(product: Product): Promise<void> {
  const route = useRoute()
  await Share.share({
    title: product?.getName(),
    text: product?.getName(),
    url: route.fullPath,
    dialogTitle: 'Compartilhe com a família e amigos!',
  }); 
}