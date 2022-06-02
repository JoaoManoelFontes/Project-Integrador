import { ethers } from "ethers";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState(false);

  useEffect(() => {
    //verificar se o MetaMask está instalado
    if (window.ethereum) setMessage(true);
    else setMessage(false);
  }, []);

  //conectar com a carteira pelo Metamask
  async function connect() {
    //? Pop-Up do MetaMask para conectar
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Pegar os dados do usuário (provider, balance..)

    //? Objeto que representa o usuário
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    //? Saldo da carteira do usuário
    const balance = await provider.getBalance(
      provider.getSigner().getAddress()
    );

    //? Formatar o saldo e mostrar na tela
    console.log(ethers.utils.formatEther(balance));
  }

  return (
    <div className="App">
      <h1>Metamask</h1>
      {message ? (
        //? Se o usuário tiver instalado o Metamask, aparecer o botão de conectar
        <button onClick={connect}>Connect</button>
      ) : (
        //? se não, aparecer o botão de instalar
        <button>Install</button>
      )}
    </div>
  );
}

export default App;

// ghost rookie next blast layer once equal conduct captain sleep domain usual
