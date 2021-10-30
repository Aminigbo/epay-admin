import axios from 'axios';  



function email(payload) {
   var data = JSON.stringify(payload);

   console.log(payload)

   var config = {
   method: 'post',
   url: 'https://ogabike.com/reelwood/api/v1/event/sendemail',
   // url: 'http://localhost:1100/api/v1/event/sendemail',
      
   headers: { 
      'Content-Type': 'application/json'
   },
   data : data
   };

   axios(config)
   .then(function (response) {
      console.log("email sent")
   })
   .catch(function (error) {
   console.log(error);
   });

}




export async function sendEmail(payload) {

   // for (let i = 0; i < payload.tickets.length; i++) {
   //    // console.log(payload.tickets[i])
   // }  
   email(payload)
   return "done"
}


export  async function initiateTransaction(payload) {
   // generate code 
      String.prototype.shuffle = function () {
         var a = this.split(""),
            n = a.length;

         for (var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
         }
         return a.join("");
      }
      const radm = "123456789009876543211234567890987673748576343285738948576898738475621342875928857829847729300399488299498587377488489939399390000992382843885834585".shuffle()
      const radm2 = radm.shuffle();

      let radm3 = radm2.substring(3, 50).shuffle();
      const radm4 = radm3.shuffle().substring(3, 30).shuffle();

      const radm5 = radm4.shuffle().substring(3, 20).shuffle();

      const radm6 = radm5.shuffle().substring(4, 10).shuffle();
      const ref = radm6.shuffle()

   let boughtTickets = [
      {
         event: payload.event,
         tickets:[]
      }
   ]
   for (let i = 0; i < payload.tickets.length; i++) {
      
      for (let ii = 0; ii < payload.tickets[i].picked; ii++) {
         // generate code 
         String.prototype.shuffle = function () {
            var a = this.split(""),
               n = a.length;

            for (var i = n - 1; i > 0; i--) {
               var j = Math.floor(Math.random() * (i + 1));
               var tmp = a[i];
               a[i] = a[j];
               a[j] = tmp;
            }
            return a.join("");
         }
         const radm = "123456789009876543211234567890987673748576343285738948576898738475621342875928857829847729300399488299498587377488489939399390000992382843885834585".shuffle()
         const radm2 = radm.shuffle();

         let radm3 = radm2.substring(3, 50).shuffle();
         const radm4 = radm3.shuffle().substring(3, 30).shuffle();

         const radm5 = radm4.shuffle().substring(3, 20).shuffle();

         const radm6 = radm5.shuffle().substring(4, 10).shuffle();
         const ref = radm6.shuffle()


         const radm_num = "theqbroyhyhyhwnfoxjumpsotyhyhyhthuickbrownfoxyhyhyjuhhythmpsobrownfoxjumpsovyhthyerthebjghjghfgjklrowtyhytnfoxjumpsolafgfhtyhzydog".shuffle()
         const radm2_num = radm_num.shuffle();

         let radm3_num = radm2_num.substring(3, 50).shuffle();
         const radm4_num = radm3_num.shuffle().substring(3, 30).shuffle();

         const radm5_num = radm4_num.shuffle().substring(3, 20).shuffle();

         const radm6_num = radm5_num.shuffle().substring(4, 10).shuffle();
         const ref_num = radm6_num.toUpperCase().shuffle()[0]
         
         let ticketId = ref_num + '-' + ref


         let ticket = {
            meta: payload.event,
            ticket: payload.tickets[i],
            ticketId : ticketId,
            buyer:payload.buyer
         }
         boughtTickets[0].tickets.push(ticket)
         
      }
      
   } 
   

      var data = {
         "tx_ref": ref,
         "amount": payload.amount,
         "currency": "NGN",
         "redirect_url": "https://reelwoodticket.com/paysuccess",
         "payment_options": "card",
         "meta": {
            "consumer_id": ref+payload.firstname,
            "consumer_mac": ref+payload.firstname + new Date().getTime() + ref
         },
         "customer": {
            "email":payload.email,
            "phonenumber": payload.phone,
            "name": payload.firstname+" "+payload.lastname
         },
         "customizations": {
            "title": "Reelwood",
            "description": "Event ticket purchase",
            "logo": "https://reelwoodticket.com/static/media/reel.72ba09b1.png"
         },

         "key":"FLWSECK_TEST-8f61bec54454e6290c8371285b6a690b-X"
      }
      data = JSON.stringify(data);
      var config = {
         method: 'post',
         // url: 'https://ogapredictor.herokuapp.com/api/v1/user/flutterwave',
         url: 'https://ogabike.com/reelwood/api/v1/event/buyTicket',
         

         headers: {
            'Content-Type': 'application/json'
         },
         data: data
      };
      axios(config)
         .then(function (response) { 
            window.location.assign(response.data.response.data.link);
            // console.log(response)
         })
         .catch(function (error) { 
            console.log(error) 
         });
   

   // return ticketId
   return boughtTickets[0]
   }







export async function freePromoTicket(payload){
   // generate code 
      String.prototype.shuffle = function () {
      var a = this.split(""),
         n = a.length;

      for (var i = n - 1; i > 0; i--) {
         var j = Math.floor(Math.random() * (i + 1));
         var tmp = a[i];
         a[i] = a[j];
         a[j] = tmp;
      }
      return a.join("");
   }
   const radm = "123456789009876543211234567890987673748576343285738948576898738475621342875928857829847729300399488299498587377488489939399390000992382843885834585".shuffle()
   const radm2 = radm.shuffle();

   let radm3 = radm2.substring(3, 50).shuffle();
   const radm4 = radm3.shuffle().substring(3, 30).shuffle();

   const radm5 = radm4.shuffle().substring(3, 20).shuffle();

   const radm6 = radm5.shuffle().substring(4, 10).shuffle();
   const ref = radm6.shuffle()

   let boughtTickets = [
      {
         event: payload.event,
         tickets:[]
      }
   ]
   for (let i = 0; i < payload.tickets.length; i++) {
      
      for (let ii = 0; ii < payload.tickets[i].picked; ii++) {
         // generate code 
         String.prototype.shuffle = function () {
            var a = this.split(""),
               n = a.length;

            for (var i = n - 1; i > 0; i--) {
               var j = Math.floor(Math.random() * (i + 1));
               var tmp = a[i];
               a[i] = a[j];
               a[j] = tmp;
            }
            return a.join("");
         }
         const radm = "123456789009876543211234567890987673748576343285738948576898738475621342875928857829847729300399488299498587377488489939399390000992382843885834585".shuffle()
         const radm2 = radm.shuffle();

         let radm3 = radm2.substring(3, 50).shuffle();
         const radm4 = radm3.shuffle().substring(3, 30).shuffle();

         const radm5 = radm4.shuffle().substring(3, 20).shuffle();

         const radm6 = radm5.shuffle().substring(4, 10).shuffle();
         const ref = radm6.shuffle()


         const radm_num = "theqbroyhyhyhwnfoxjumpsotyhyhyhthuickbrownfoxyhyhyjuhhythmpsobrownfoxjumpsovyhthyerthebjghjghfgjklrowtyhytnfoxjumpsolafgfhtyhzydog".shuffle()
         const radm2_num = radm_num.shuffle();

         let radm3_num = radm2_num.substring(3, 50).shuffle();
         const radm4_num = radm3_num.shuffle().substring(3, 30).shuffle();

         const radm5_num = radm4_num.shuffle().substring(3, 20).shuffle();

         const radm6_num = radm5_num.shuffle().substring(4, 10).shuffle();
         const ref_num = radm6_num.toUpperCase().shuffle()[0]
         
         let ticketId = ref_num + '-' + ref


         let ticket = {
            meta: payload.event,
            ticket: payload.tickets[i],
            ticketId : ticketId,
            buyer:payload.buyer
         }
         boughtTickets[0].tickets.push(ticket)
         
      }
      
   }

   
   
   

   // return ticketId
   return boughtTickets[0]
}