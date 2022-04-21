import {
  cashbackRegEx,
  formatAMPM,
  daysOfTheWeek,
  monthsOfTheYear,
  coinsPercentage,
} from "../utils/index";
import {
  updateUserMeta,
  saveCashBack,
  verifyCashbackToken,
  deactivateToken,
  insertNotification,
  fetchUserProfileWithRef,
  getVendor,
} from "../models/index";

import {
  generate_cashback,
  resolve_cashback,
} from "../workers_functions/notifications";

// Scan vendors code to retrieve their details
export async function handleScanToPayVerifyVendor(
  token,
  compState,
  setStates,
  setVendorVerified,
  vendorVerified,
  logout
) {
  let vendorPhone = "0" + token; // getting vendor's phone from his beneficiary id
  setStates({
    ...compState,
    loading: true,
  });

  // setVendorVerified(true)

  getVendor(vendorPhone)
    .then((res) => {
      setStates({
        ...compState,
        loading: false,
      });

      if (res.error && res.error.message == "JWT expired") {
        logout("HARD");
      } else {
        setVendorVerified({
          ...vendorVerified,
          verified: true,
          data: [res.data[0]],
        });
        console.log(res);
      }
    })
    .catch((error) => {
      setStates({
        ...compState,
        loading: false,
      });
      console.log(error);
    });
}

// @======== VERIFY CASHBACK TOKEN
export async function handleVerifyToken(
  token,
  compState,
  setStates,
  setVerifypayload,
  verifyPayload,
  setcashbackpinresolved,
  setDrawerState,
  drawerState,
  setDrawerState4,
  drawerState4
) {
  if (token.length != 6) {
    setcashbackpinresolved(false);
    setDrawerState({ ...drawerState, bottom: false });
    setDrawerState4({ ...drawerState4, bottom: false });
    setVerifypayload({
      ...verifyPayload,
      success: false,
      data: null,
    });
    setStates({
      ...compState,
      loading: false,
      error: true,
      errorMsg: "Invalid  kashback",
    });
  } else {
    setStates({
      ...compState,
      loading: true,
    });
    verifyCashbackToken(token)
      .then((res) => {
        if (res.body.length > 0) {
          setcashbackpinresolved(true);
          setVerifypayload({
            ...verifyPayload,
            success: true,
            data: res.body[0],
          });
          setStates({
            ...compState,
            loading: false,
            error: false,
            errorMsg: null,
            resolved: true,
          });
        } else {
          setcashbackpinresolved(false);
          setDrawerState({ ...drawerState, bottom: false });
          setVerifypayload({
            ...verifyPayload,
            success: false,
            data: null,
          });
          setStates({
            ...compState,
            loading: false,
            error: true,
            errorMsg: "The provided cashback token has expired",
          });
        }
      })
      .catch((err) => {
        setcashbackpinresolved(false);
        setDrawerState({ ...drawerState, bottom: false });
        setStates({
          ...compState,
          loading: false,
          error: true,
          errorMsg: "We could not complete this operation due to network error",
        });
        setVerifypayload({
          ...verifyPayload,
          success: false,
          data: null,
        });
      });
  }
}

export async function handleChashbackGeneration(
  setInitiateCreate,
  setGeneratedcode,
  setGeneratedToken,
  payload,
  login_suc,
  state,
  compState,
  setStates,
  setPin
) {
  let userwallet = payload.user.meta.wallet;
  let amount = payload.amount;
  let amountPlusCharge = payload.amountPlusCharge;
  let extraCharge = amountPlusCharge - amount;
  let adminPercentage = (12.5 * extraCharge) / 100;

  let userTakes = amountPlusCharge - adminPercentage;

  const newUserWallet = userwallet - amountPlusCharge;
  const newUserData = {
    ...payload.user.meta,
    wallet: newUserWallet,
  };

  // @======== NEW USER LOGIN DATA
  const newUserLogginData = {
    ...payload.user,
    meta: newUserData,
  };

  // @======== SAVE USER'S META DATA
  const metaDataPayload = {
    email: payload.user.email,
    newUser: newUserData,
  };

  setStates({
    ...compState,
    loading: true,
  });

  const token = cashbackRegEx(
    payload.user.meta.beneficiaryId,
    payload.user.phone,
    payload.user.email,
    payload.user.meta.password,
    payload.amount
  );

  // @==  generate token send sms payload
  let generateSMSPayload = {
    phone: `+234${payload.user.phone.substring(1, 11)}`,
    token,
    amount: payload.amount,
  };

  updateUserMeta(metaDataPayload)
    .then((res) => {
      if (res.success === true) {
        let saveCashbackTokenData = {
          token,
          user: payload.user.id,
          meta: {
            amountPlusCharge: amountPlusCharge,
            serviceCharge: adminPercentage,
            amount: userTakes,
            tokenamount: amount,
            name: payload.user.fullname,
            user: metaDataPayload,
            token,
            phone: payload.user.phone,
            date: {
              day: daysOfTheWeek(new Date()),
              month: monthsOfTheYear(),
              year: new Date().getFullYear(),
              date: new Date().getDate(),
              time: formatAMPM(new Date()),
            },
          },
        };
        saveCashBack(saveCashbackTokenData)
          .then((res2) => {
            console.log(res2);
            if (res.body === null) {
              return setStates({
                ...compState,
                loading: false,
                error: true,
                errorMsg: "Sorry, this operation could not be completed.",
              });
            } else if (res2.body.length > 0) {
              setStates({
                ...compState,
                error: false,
                loading: false,
              });
              login_suc({
                user: newUserLogginData,
                meta: state.loggedInUser.meta,
              });
              setGeneratedToken(token);
              setInitiateCreate(false);
              setGeneratedcode(true);
              setPin("");
              console.log(generateSMSPayload);
              generate_cashback(generateSMSPayload);

              // @=================  settle who referred
              fetchUserProfileWithRef(
                state.loggedInUser.user.meta.referedBy
              ).then((resXX) => {
                if (resXX.body.length > 0) {
                  let perc = (0.1 * amount) / 100;
                  let newRefWallet =
                    parseInt(resXX.body[0].meta.buzzcoin) + perc;
                  const newUserDataXX = {
                    ...resXX.body[0].meta,
                    buzzcoin: newRefWallet,
                  };
                  const metaDataPayloadXX = {
                    email: resXX.body[0].email,
                    newUser: newUserDataXX,
                  };
                  updateUserMeta(metaDataPayloadXX);

                  // @=========== send notification
                  let notificationPayload = {
                    sendeId: state.loggedInUser.user.id,
                    recieverId: resXX.body[0].id,
                    meta: {
                      amount: perc,
                      from: state.loggedInUser.user.fullname,
                      date: {
                        day: daysOfTheWeek(new Date()),
                        month: monthsOfTheYear(),
                        year: new Date().getFullYear(),
                        date: new Date().getDate(),
                        time: formatAMPM(new Date()),
                      },
                    },
                    type: "REF BONUS",
                  };
                  insertNotification(notificationPayload);
                }
              });
              // @=============
            } else {
              return setStates({
                ...compState,
                loading: false,
                error: true,
                errorMsg: "Sorry, this operation could not be completed.",
              });
            }
            // login_suc({user:newUserData,meta:state.loggedInUser.meta})
          })
          .catch((error) => {
            return setStates({
              ...compState,
              loading: false,
              error: true,
              errorMsg: "Sorry, this operation could not be completed",
            });
          });
      }
    })
    .catch((error) => {
      return setStates({
        ...compState,
        loading: false,
        error: true,
        errorMsg: "Sorry, this operation could not be completed",
      });
    });
}

//@========= SCAN VENDOR'S CODE TO PAY
export async function scanToPayVendors(
  vendor,
  customer,
  amount,
  setResolved,
  compState,
  setStates,
  login_suc,
  setDrawerState4,
  drawerState4,
  setVendorVerified,
  setpaymentdrawerState,
  paymentdrawerState
) {
  // console.log(vendor);
  // console.log(customer);
  // console.log(amount);

  // return customer wallet after subtracting amount
  const customerNewWallet = () => {
    let userWallet = customer.user.meta.wallet;
    return parseInt(userWallet) - parseInt(amount);
  };

  // return wendor wallet after subtracting amount
  const vendorNewWallet = () => {
    let vendorWallet = vendor.meta.wallet;
    return parseInt(vendorWallet) + parseInt(amount);
  };

  // customer data to login
  let loginData = {
    meta: customer.meta,
    user: {
      ...customer.user,
      meta: {
        ...customer.user.meta,
        wallet: customerNewWallet(),
      },
    },
  };

  // customer data to update  db
  let userDBupdataData = {
    email: customer.user.email,
    newUser: {
      ...customer.user.meta,
      wallet: customerNewWallet(),
    },
  };

  // vendor's data to update in the database
  let vendorDBupdataData = {
    email: vendor.email,
    newUser: {
      ...vendor.meta,
      wallet: vendorNewWallet(),
    },
  };

  // notification payload
  let notificationPayload = {
    sendeId: customer.user.id,
    recieverId: vendor.id,
    meta: {
      amount: amount,
      amountPlusCharge: amount,
      serviceCharge: 0,
      tokenamount: 0,
      resolvedby: customer.user.fullname,
      token: "Scan to pay",
      date: {
        day: daysOfTheWeek(new Date()),
        month: monthsOfTheYear(),
        year: new Date().getFullYear(),
        date: new Date().getDate(),
        time: formatAMPM(new Date()),
      },
    },
    type: "Pay by scan",
  };

  // @== ALERT PAYLOAD
  let alertPayload = {
    phone1: [`+234${vendor.phone.substring(1, 11)}`], // who resolved
    phone2: [`+234${customer.user.phone.substring(1, 11)}`], // who created
    amount: amount, // amount that wa paid
    name: vendor.fullname, // who recieved the paymment
    name2: customer.user.fullname, // who made the payment
    bal1: vendorNewWallet(), //vendor's new wallet
    bal2: customerNewWallet(), // customer's new wallet
  };
  setStates({
    ...compState,
    loading: true,
  });
  updateUserMeta(userDBupdataData)
    .then((customerRes) => {
      //update customer's wallet
      if (customerRes.success === true) {
        updateUserMeta(vendorDBupdataData)
          .then((vendorRes) => {
            //update vendor's wallet
            if (vendorRes.success === true) {
              insertNotification(notificationPayload)
                .then((res) => {
                  setStates({
                    ...compState,
                    loading: false,
                    error: false,
                    errorMsg: "",
                  });
                  login_suc(loginData);
                  setResolved(true);
                  resolve_cashback(alertPayload);
                  setDrawerState4({ ...drawerState4, bottom: false }); //send sms notification
                  setVendorVerified({
                    //close the vendor scan windoe
                    verified: false,
                    proceedToAuth: false,
                  });
                  setpaymentdrawerState({
                    ...paymentdrawerState,
                    bottom: false,
                  });
                })
                .catch((error) => {});
            } else {
            }
          })
          .catch((error) => {});
      } else {
      }
    })
    .catch((error) => {});
  console.log(alertPayload);
}

// @======== CASH IN CASHBACK TOKEN ====================================================================================================
export async function settleCashbackToWallet(
  payload,
  setcashbackpinresolved,
  setValue,
  state,
  compState,
  setStates,
  login_suc,
  setResolved
) {
  setStates({
    ...compState,
    loading: true,
  });
  setcashbackpinresolved(false);
  setValue(null);
  //  form new TO object
  const to = {
    ...state.user.meta,
    fullname: state.user.fullname,
    phone: state.user.phone,
    email: state.user.email,
    id: state.user.id,
    // wallet: null,
    transactionPin: null,
    password: null,
    uuid: null,
  };

  let newTokenData = {
    ...payload.data.meta,
    to: to,
  };
  let userWallet = state.user.meta.wallet;
  let amount = payload.data.meta.amount;

  let tokenId = payload.data.id;
  let token = payload.data.token;

  let userNewAmount = parseInt(userWallet) + parseInt(amount);

  // data to login
  let loginData = {
    meta: state.meta,
    user: {
      ...state.user,
      meta: {
        ...state.user.meta,
        wallet: userNewAmount,
        buzzcoin: coinsPercentage(amount, state).totalcoin,
      },
    },
  };

  // user data to update  db
  let userDBupdataData = {
    email: state.user.email,
    newUser: {
      ...state.user.meta,
      wallet: userNewAmount,
      buzzcoin: coinsPercentage(amount, state).totalcoin,
    },
  };

  verifyCashbackToken(token).then((res) => {
    if (res.body.length > 0) {
      deactivateToken(token, newTokenData).then((res2) => {
        if (res2.body.length > 0) {
          updateUserMeta(userDBupdataData).then((res3) => {
            if (res3.success === true) {
              let notificationPayload = {
                sendeId: state.user.id,
                recieverId: res.body[0].user,
                meta: {
                  amount: res.body[0].meta.amount,
                  amountPlusCharge: res.body[0].meta.amountPlusCharge,
                  serviceCharge: res.body[0].meta.serviceCharge,
                  tokenamount: res.body[0].meta.tokenamount,
                  resolvedby: res2.body[0].meta.to.fullname,
                  token,
                  date: {
                    day: daysOfTheWeek(new Date()),
                    month: monthsOfTheYear(),
                    year: new Date().getFullYear(),
                    date: new Date().getDate(),
                    time: formatAMPM(new Date()),
                  },
                },
                type: "CASHBACK RESOLVED",
              };
              insertNotification(notificationPayload).then((res4) => {
                login_suc(loginData);
                setResolved(true);

                console.log(res2);
                console.log(res3);

                // @== ALERT PAYLOAD
                let alertPayload = {
                  phone1: [`+234${to.phone.substring(1, 11)}`], // who resolved
                  phone2: [`+234${res2.body[0].meta.phone.substring(1, 11)}`], // who created
                  amount: res2.body[0].meta.amount,
                  name: to.fullname,
                  name2: state.user.fullname,
                  bal1: to.wallet, // who resolve
                  bal2: res2.body[0].meta.user.newUser.wallet, // who created
                };
                resolve_cashback(alertPayload);
                setStates({
                  ...compState,
                  loading: false,
                  error: false,
                  errorMsg: "",
                });
              });
            } else {
              setStates({
                ...compState,
                loading: false,
                error: true,
                errorMsg: "Sorry, a network error occured",
              });
            }
          });
        } else {
          setStates({
            ...compState,
            loading: false,
            error: true,
            errorMsg: "Sorry, a network error occured",
          });
        }
      });
    } else {
      setStates({
        ...compState,
        loading: false,
        error: true,
        errorMsg: "The provided cashback token has expired",
      });
    }
  });
}
