import {
   CheckCircle
} from "@material-ui/icons";
import Logo from "../statics/assets/loaderAlt.png"



export var optionAlert = (payload) => {


   let { message, actionOne, actionTwo, meta } = payload
   return (
      <>

      </>
   )
}

export var successAlert = (action, message,data) => {
   return (
      <>
         <div style={{ position: "fixed", background: "rgb(0,0,0,0.9)", left: "0px", height: "100%", width: "100%", top: "0px", zIndex: "2000" }}>
            <center style={{ marginTop: "40%",background:"#073F74",width:"90%",marginLeft:"5%",padding:"20px 0px",borderRadius:"6px" }}>
               {/* <CheckCircle style={{ fontSize: "80px",color:"white" }} /> */}
             <img src={Logo} style={{ width: "30px", }} />

               <div style={{ margin: "5px 20px", width: "70%", textAlign: "center" }}>
                  <div style={{color:"white",fontSize:"18px"}}> {!data ? message : data()}</div>
                  <div style={{ textAlign: "center" }}>
                     <button
                        style={{
                           marginTop: "30px",
                           border: "none",
                           padding: "10px 20px",
                           borderRadius: "5px",
                           color: "#385b74",
                           background: "white"
                        }}
                        onClick={() => {
                           action();
                        }}>
                        <b>OK</b>
                     </button>
                  </div>
               </div>
            </center>
         </div>
      </>
   )
}

export var errorAlert = (payload) => {
   let { action, message } = payload;
   return (
      <>
      </>
   )
}