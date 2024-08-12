import { Share } from '@capacitor/share';

export async function share_product(product: object) {
    await Share.share({
    title: 'Achadinho imperdivel',
    text: product.name,
    url: useRouter().currentRoute,
    dialogTitle: 'Compartilhe com os amigos',
  }); 
}