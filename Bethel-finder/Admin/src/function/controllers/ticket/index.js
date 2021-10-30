import { supabase } from "../../config/index" 
  



  
export async function uploadTicket(event, payload) {  
   let onChangeData = null
   
 
   if (!event.target.files || event.target.files.length === 0) {
      return {
         success: false,
         message: "You must select an image to upload",
         data:null
      }
   } 

   if (!payload || !event || !payload.event_title || !payload.seller_id || !payload.seller_name || !payload.meta) {
      return {
         success: false,
         message: "Parameters not complete",
         data:null
      }
   } 

   const file = event.target.files[0]
   const fileExt = file.name.split('.').pop()
   const fileName = `${Math.random()}.${fileExt}`
   const filePath = `${fileName}` 

   await supabase.storage.from('tickets').upload(filePath, file).then(value => { 
      if (value.error == null) { 
         return onChangeData = supabase.from("event").insert([{
            event_title: payload.event_title, seller_id: payload.seller_id, seller_name:payload.seller_name,blob:'url', ticket_image: value.data.Key, meta: payload.meta, date: new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear()
         }]) 
      } 
   }).catch(error => {
      return onChangeData = null 
   })



   if (onChangeData == null) { 
      return {
         success: false,
         message: "Network error occured",
         data:null
      }
   } 
   else {
      return {
         success: true,
         message: "Created",
         data:onChangeData.body
      }
   }

}












export async function saveTicket(payload) {
   return supabase.from("tickets").insert([{
      meta: payload,
      ticketId:payload.ticketId,
      event:payload.event,
      isActive: true,
      user:payload.seller
   }]) 
}





// viewing single event
export async function viewSingleEvent(eventId) {
   let onChangeData = ''
   let avater = null
   if (!eventId) {
      return {
         success: false,
         message: "Missing event ID",
         data:null
      }
   } else {
      onChangeData = await supabase.from("event").select("*").eq("id",eventId)
   }

   if (onChangeData.error == null) {
      if (onChangeData.body.length < 1) {
         return {
            success: false,
            message: "event not found",
            data:onChangeData.body
         }
      } else { 

         let path = onChangeData.body[0].ticket_image.split("/")[1]
         const { data, error } = await supabase.storage.from('tickets').download(path)
         console.log(data)
         const url = window.URL.createObjectURL(data)  

         return {
            success: true,
            message: "event fetched",
            data:{...onChangeData.body[0], ticket_image:url}
         }
      }
      
   } else {
      return {
         success: false,
         message: "event not fetched",
         data:onChangeData.error
      }
   }
}



//  get all active events

export async function  allEvents() {
   let onChangeData = await supabase.from("event").select("*")
   if (onChangeData.error == null) {
      if (onChangeData.body.length < 1) {
         return {
            success: false,
            message: "event not found",
            data:onChangeData.body
         }
      } else {  
         return {
            success: true,
            message: "event fetched",
            data:onChangeData.body
         }
      }

   } else {
      return {
         success: false,
         message: "a network error",
         data:onChangeData.error
      }
   }
      
}