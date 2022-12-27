const Notification = ({ message, errorColor }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={errorColor}>
            {message}
        </div>
    )
}
export default Notification