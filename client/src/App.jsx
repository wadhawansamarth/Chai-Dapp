import { useState,useEffect } from 'react'
import {ethers} from "ethers"
import abi from './contractJson/chai.json'
import Buy from './components/Buy'
import Memos from './components/Memos'
import chaii from './cha.png'
import './App.css'

function App() {
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })
  const [account,setAccount]=useState('Not connected');
  useEffect(()=>{
    const template=async()=>{
   
      const contractAddres="0x5928C0c7029F5dcC182F7817ef698C23f61204a3";
      const contractABI=abi.abi;
      //Metamask part
      //1. In order do transactions on goerli testnet
      //2. Metmask consists of infura api which actually help in connectig to the blockhain
      try{

        const {ethereum}=window;
        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })
 
        window.ethereum.on("accountsChanged",()=>{
         window.location.reload()
        })
        setAccount(account);
        const provider = new ethers.BrowserProvider(ethereum);//read the Blockchain
        const signer = await provider.getSigner(); //write the blockchain
        
        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        )
        console.log(contract)
      setState({provider,signer,contract});
       
      }catch(error){
        console.log(error)
      }
    }
    template();
  },[])
  return (
    
    <div style={{backgroundColor:"#EFEFEF",height:"100%"}}>
      
    <img src={chaii} className="img-fluid" alt=".." width="100%" />
    <p 
       clas="text-muted lead" 
       style={{ marginTop: "10px", marginLeft: "5px" }}
    >
      <p align="center"><b>Account - {account}</b></p>
    </p>
    <div className="container">
    <Buy state={state}></Buy>
    <Memos state={state}></Memos>
    </div>
      
  </div>
  )
}

export default App
