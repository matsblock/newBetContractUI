

export default function Content( allPokemons ) {
    console.log("ALLPOKEMOS en Content:", allPokemons.prop[0].name)
    return (
        <div>
            <ul>
                {allPokemons.prop.map((poke) => (
          <li key={poke.url}>{poke.name}</li>
        ))}
            </ul>

        </div>
    )
}



