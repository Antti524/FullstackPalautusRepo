const Filter = (props) => {
    return (
        <div>
            Find countries:<input value={props.filters} onChange={props.handleFilterChange} />
        </div>
    )
}

export default Filter