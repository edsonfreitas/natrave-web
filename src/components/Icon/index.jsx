import { ReactComponent as arrowLeft } from './svgs/arrow-left.svg'
import { ReactComponent as arrowEsquerda } from './svgs/arrowesquerda.svg'
import { ReactComponent as arrowDireita } from './svgs/arrowdireita.svg'
import { ReactComponent as avatar } from './svgs/avatar.svg'

const icons = {
    arrowLeft,
    avatar,
    arrowEsquerda,
    arrowDireita
}
export const Icon =({name, ...props}) =>{
    const Element = icons[name]
    return <Element {...props} />
}