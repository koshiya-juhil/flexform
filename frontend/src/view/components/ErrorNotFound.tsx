import { Link } from "react-router-dom";

const ErrorNotFound = () => {
    return (
        <div>
            404 Not Found
            <Link to="/">Home</Link>
        </div>
    )
}

export default ErrorNotFound;