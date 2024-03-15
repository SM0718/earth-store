import React, {useState} from 'react'
import appwriteService from '../appwrite/config'

export function addToCart({productName, productImg, productPrice, amount="1"}) {

    // const [data, setData] = useState("")
    
    const addItem = async() => {
        try {
            const info = await appwriteService.createCartItems(productName, productImg, productPrice.toString(), amount)
            if(info) {
                console.log(info)
            }
        } catch (error) {
            console.log("Error", error)
        }
    }
    
    addItem()
    
}
