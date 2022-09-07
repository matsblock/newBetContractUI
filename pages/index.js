import styles from '../styles/Home.module.css'
import Header from '../components/Header.js'
import Content from '../components/Content.js'

export default function Home( {allPokemons} ) {
  // console.log("ALLPOKEMOS en Home:", allPokemons)
  return (
    <div>
      <Header />
      <Content prop={allPokemons}/>
    </div>
  )
}

export async function getServerSideProps() {
  // await Moralis.start({ apiKey: "UoQF1E6oakFLmxsaOkZeei8KdzTjr596oi0fZd7k" });
  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon/');
  const data = await response.json();

  // const gameCreate = await getGameCreate()
 
  return {
    props: { allPokemons: data.results },
  };
}


// async function getGameCreate() {
//   const sendOptions = {
//       contractAddress: SevillaVSValladolidContractAddress,
//       functionName: "getGameCreate",
//       abi: betContractAbi,
//       params: {
//           _requestId: "0x48a6e2a61be93ac9ac688aa2c1a5fede2ecd1d894cfd2b3e5e7ba3c6008f8503",
//           _idx: 1
//       },
//   };
//   const _gameCreate = await Moralis.executeFunction(sendOptions)
//   console.log("_gameCreate: ", _gameCreate)
//   //setGameCreate(_gameCreate)
//   //const _date = moment.unix(_gameCreate[1]).format('LLLL')
//   //setMatchDate(_date)       
// }
