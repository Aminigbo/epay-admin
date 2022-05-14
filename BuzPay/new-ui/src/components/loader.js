import CircularProgress from '@mui/material/CircularProgress';
import Logo from "../statics/assets/loaderAlt.png"
// @======== LOADING TO GENERATE TOKEN





export function loader(type, setpinController, setloading, loading, pin, successAlert, btnAction, message,login_suc) {
  if (type == "SETPIN") {
     let data = {
       transactionPin: pin,
       otp:'-'
   }
    setpinController(data, setloading,login_suc)
    
    
    if (loading == true) {
      return (
        <>
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "fixed",
              background: "rgb(0,0,0,0.6)",
              left: "0px",
              top: "0px",
              zIndex: "100000"
            }}
          >
            <div
              style={{
                position: "relative",
                width: "15%",
                // height: "60px",
                background: "lightgrey",
                top: "40%",
                left: "40%",
                borderRadius: "5px",
                textAlign: "center",
                padding: "5px 0px"
              }}
            >
              {/* <img src={loaderImg} /> */}
              <CircularProgress />
            </div>
          </div>
        </>
      );
    } else {
      return successAlert(btnAction, message)
    }
  } else {
    return (
        <>
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "fixed",
              background: "rgb(0,0,0,0.9)",
              left: "0px",
              top: "0px",
              zIndex: "100000"
            }}
          >
            <div
              style={{
                position: "relative",
                width: "30%",
                height: "70px",
                background: "#073F74",
                top: "35%",
                left: "35%",
                borderRadius: "5px",
                textAlign: "center",
                padding: "9px 0px"
              }}
            >
              {/* <img src={loaderImg} /> */}
            {/* <CircularProgress /> */}
             <img src={Logo} style={{ width: "30px",transformOrigin:' 100% 0%',transition:' transform 0.5s ease-in', }} />
            </div>
          </div>
        </>
      );
  }

}
