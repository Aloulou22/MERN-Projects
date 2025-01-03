import { Manga } from "../Interfaces/Manga"
import { FaMinus, FaTrashAlt , FaPlus} from "react-icons/fa"
import { decrease, increase, removeFromCart } from "../Features/ShopSlice"
import { useAppDispatch } from "../App/Hooks"

function CartItem({id, title , price , quantity , imgUrl}: Manga) {
  const dispatch = useAppDispatch()


  return (
    <div key={id} className="py-5">
        <img src={imgUrl} alt={title} className="w-25" />
        <h3 className="text-muted fs-4 my-4">{title}</h3>
        <h1 className="fs-2 my-2">{price}$</h1>
        <h4 className="fs-2 my-2">{quantity}</h4>
        <button className="btn btn-outline-danger me-2" onClick={() => {
            if(quantity === 1){
                dispatch(removeFromCart(id))
                return
            }dispatch(decrease({id}))
        }}><FaMinus /></button>
        <button className="btn btn-danger" onClick={() => {
            dispatch(removeFromCart(id))
        }}><FaTrashAlt className="me-2"/>Remove</button>
        <button className="btn btn-outline-danger ms-2" onClick={() => {
            dispatch(increase({id}))
        }}><FaPlus /></button>
    </div>
  )
}

export default CartItem