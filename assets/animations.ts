import { createAnimation } from '@ionic/vue';
import type { Ref } from 'vue';

export function basicAnimation(ref: Ref) {

    const animation = createAnimation()
        .addElement(ref.value.$el)
        .duration(1500)
        .iterations(Infinity)
        .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
        .fromTo('opacity', '1', '0.2');

    return animation
}

 