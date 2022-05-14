import { updateuserService } from "../services/auth"

export async function updateUserMetaController(data, setloading,login_suc) {
  
   updateuserService(data).then(res => {
      setloading(false)
      login_suc()
      
   })
      .catch(error => {
         console.log("false")
         return false
      })
}