const Countries = (props) => {
    {
        if (props.filterCountries === '') {
            { props.setDownloadWheather(true) }
            return (
                <div>Find countries by search</div>
            )
        }
        else if (props.filterCountries.map(county => <div>{county.name.common}</div>).length > 10) {
            { props.setDownloadWheather(true) }
            return (
                <div>More than 10, use more marks to limit search.</div>
            )
        }
        else if (props.filterCountries.map(county => <div>{county.name.common}</div>).length === 0) {
            { props.setDownloadWheather(true) }
            return (
                <div>No search results.</div>
            )
        }
        else if (props.filterCountries.map(county => <div>{county.name.common}</div>).length === 1) {
            if (props.wheatherToTown == props.wheatherToTown) {
                { props.setDownloadWheather2(true) }
                { console.log('hei') }
            }
            return (props.filterCountries.map(county =>
                <li key={county.name.common}>
                    <h3>{county.name.common}</h3>
                    <p>Official name is: {county.name.official}<br />
                        Capital is {county.capital}<br />
                        area is {county.area} km2</p>
                    <ul>
                        {Object.keys(county.languages).map(l => <li key={l}>{l}</li>)}
                    </ul>
                    <img src={county.flags.png} ></img>
                    <h3>Wheather in {county.capital}</h3>
                    {props.setWheatherToTown(county.capital)}
                    {props.Weather()}
                </li >
            ))
            { props.setDownloadWheather2(false) }
        }
        else {
            { props.setDownloadWheather(true) }
            return (props.filterCountries.map(county =>
                <li key={county.name.common}>
                    {county.name.common}
                    <button onClick={event => {
                        event.preventDefault()
                        props.setFilter(county.name.common)
                    }}>
                        Show</button>
                </li >
            ))
        }
    }
}

export default Countries