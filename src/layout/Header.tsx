function Header() {
    return (
        <nav className="#42a5f5 blue lighten-1">
            <div className="nav-wrapper">
            <button>
                Logo
            </button>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                    <a
                        href="https://github.com/TimofeyKibardin/react-movies"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Repo
                    </a>
                </li>
            </ul>
            </div>
        </nav>
    )
}

export {Header}