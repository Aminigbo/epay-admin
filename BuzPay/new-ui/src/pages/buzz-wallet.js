{/* <div>
                  <b>
                     Buzz Me walance
                  </b>
               </div> */}
               <div
                  style={{
                     width: "100%",
                     height: "60px",
                     background: "white",
                     boxShadow: " 1px 1px 3px #888888",
                     // border: "2px solid #f3f3f3",
                     marginBottom: "40px",
                     marginTop: "10px",
                     marginLeft: "0%",
                     position: "relative",
                  }}
               >
                  {/* <FiberPin style={{ margin: "5px", color: "#0a3d62" }} /> */}
                  <div
                     style={{
                        height: "100%",
                        background: " ",
                        textAlign: "center",
                        display: "inline-block",
                        padding: "4px 0px",
                        position: "absolute",
                        width: "45%",
                     }}
                  >
                     <span>Transfer to wallet</span> <br />
                     <b>
                        {vewbuzzmewallet === true ? (
                           <>
                              <b style={{ fontSize: "18px", marginRight: "4px" }}>
                                 ₦{separator(state.userData.buzzme_wallet)}
                              </b>{" "}<small style={{ fontSize: "10px" }}>.00</small>
                              <VisibilityOff
                                 onClick={() => {
                                    setvewbuzzmewallet(false)
                                 }}
                                 style={{
                                    fontSize: "17px",
                                    color: "#0a3d62",
                                    // float: "right",
                                    marginLeft: "15px",
                                 }}
                              />
                           </>
                        ) : (
                           <>
                              {vewbuzzmewallet === false && (
                                 <>
                                    <b
                                       style={{
                                          fontSize: "7px",
                                          marginRight: "4px",
                                          color: "gray",
                                       }}
                                    >
                                       ⚫ ⚫ ⚫ ⚫
                                    </b>
                                    <Visibility
                                       onClick={() => {
                                          setvewbuzzmewallet(true)
                                       }}
                                       style={{
                                          fontSize: "17px",
                                          color: "#0a3d62",
                                          float: " ",
                                          marginLeft: "20px",
                                       }}
                                    />
                                 </>
                              )}
                           </>
                        )}
                     </b>



                  </div>
                  {state.userData.buzzme_wallet < 1 ? <button
                     style={{
                        background: "#0C1825",
                        border: "1px solid #0C1825",
                        outline: "none",
                        color: "white",
                        float: "right",
                        height: "100%",
                        width: "100px",
                        opacity: "0.5"
                     }}
                  >
                     {" "}
                     <b>
                        {/* Move to wallet */}
                        <ArrowRightAlt
                           style={{ color: "#ffaa0f", fontSize: "45px" }}
                        />
                     </b>
                  </button> : <button
                     onClick={() => {
                        moneToWallet()
                     }}
                     style={{
                        background: "#0C1825",
                        border: "1px solid #0C1825",
                        outline: "none",
                        color: "white",
                        float: "right",
                        height: "100%",
                        width: "100px"
                     }}
                  >
                     {" "}
                     <b>
                        {/* Move to wallet */}
                        <ArrowRightAlt
                           style={{ color: "#ffaa0f", fontSize: "45px" }}
                        />
                     </b>
                  </button>}

               </div>