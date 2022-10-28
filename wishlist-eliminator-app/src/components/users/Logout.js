import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    fetch('/api/sessions', {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            navigate('/');
            window.location.reload();
        })

    return (
        <div className="default-content-box row">
            <div className="col-12 text-center">
                <h3>Logging out...</h3>
            </div>
        </div>
    )
}

export default Logout;
