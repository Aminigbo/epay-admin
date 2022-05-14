import {
   LOGIN,
   INITIALIZED,
   LOADING,
   TRANACTIONS,
   TRANSACTIONTOVIEW,
   RE_AUTH,
   LOGOUT,
   GIVEAWAY_BENEFICIARIES,
   INIT_TOPUP,
   WALLET,
   ALL_ONE_ON_ONE,
   WINNER,
   SCANNED_DATA,
   ISSIGNAL,
   DRAFT,
   WHOREQUEESTED,
   NOTIFICATION,
   REQUEST,

   REALTIME,

   BETSLIPDATA,

   // withdrawal
   WITHDRAW,
   ALLTRANSACTIONS,

   // SESSION
   SESSION,

   // ========================== ADMIN
   ADMIN_WITHDRAWAL_REQUEST,

   // new test category
   FEED,
   SPLASH
} from './type'


const initialState = {
   initialized: false,
   loggedIn: false,
   userData: null,
   benefited: [],
   payment: "",
   WALLET: 0,
   notification: false,
   loading: false,
   whoRequested: null,
   request: false,
   realtime: [],
   draft: [],
   session: '',
   withdrawal: [],
   feeds: [],
   signal: "",
   authenticated: false,
   withdrawal_request_noti: [],
   transactions: [],
   viewTransaction: {},
   kashbacks:[]

}





const reducer = (state = initialState, action) => {
   switch (action.type) {
      case INITIALIZED:
         return {
            ...state,
            initialized: true
         }
      case LOGIN:
         return {
            ...state,
            loggedIn: true,
            authenticated: true,
            userData:action.data

         }
      case ALLTRANSACTIONS:
         return {
            ...state,
            kashbacks: action.payload
         }

      case TRANACTIONS:
         return {
            ...state,
            transactions: action.payload
         }
      
      case TRANSACTIONTOVIEW:
         return{
            ...state,
            viewTransaction:action.payload
         }

      case SPLASH:
         return {
            ...state,
            splsh: true,
         }


      case RE_AUTH:
         return {
            ...state,
            authenticated: false,
         }

      case LOGOUT:
         return {
            ...state,
            loggedIn: false,
            authenticated: false,
            refresh: [],
            loading: false,
         }
      case GIVEAWAY_BENEFICIARIES:
         return {
            ...state,
            benefited: action.payload
         }

      case LOADING:
         return {
            ...state,
            loading: action.bolean
         }

      case INIT_TOPUP:
         return {
            ...state,
            payment: action.payment
         }
      case WALLET:
         return {
            ...state,
            wallet: action.wallet
         }

      case ALL_ONE_ON_ONE:
         return {
            ...state,
            allOneOnOne: action.data
         }

      case WINNER:
         return {
            ...state,
            winner: action.winner
         }
      case SCANNED_DATA:
         return {
            ...state,
            scannedData: action.payload
         }

      case ISSIGNAL:
         return {
            ...state,
            signal: action.signal
         }
      case DRAFT:
         return {
            ...state,
            draft: action.payload
         }

      case WHOREQUEESTED:
         return {
            ...state,
            whoRequested: action.who
         }

      case NOTIFICATION:
         return {
            ...state,
            notification: action.payload
         }

      case REALTIME:
         return {
            ...state,
            realtime: action.realData
         }

      case REQUEST:
         return {
            ...state,
            request: action.bolean
         }

      // loggout user at every inactivity
      case SESSION:
         return {
            ...state,
            session: action.time
         }

      case BETSLIPDATA:
         return {
            ...state,
            betslip: action.betslip
         }

      // user place withdrawal
      case WITHDRAW:
         return {
            ...state,
            withdrawal: action.meta
         }

      // admin receive withdrawal request
      case ADMIN_WITHDRAWAL_REQUEST:
         return {
            ...state,
            withdrawal_request_noti: action.request
         }

      case FEED:
         return {
            ...state,
            feeds: action.payload
         }

      default: return state
   }
}

export default reducer