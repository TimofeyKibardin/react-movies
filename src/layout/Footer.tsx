function Footer() {
    return (
        <footer className="page-footer #42a5f5 blue lighten-1">
          <div className="footer-copyright">
            <div className="container">
                © {new Date().getFullYear()} Copyright Text
                <a className="grey-text text-lighten-4 right" href="#!">Repo</a>
            </div>
          </div>
        </footer>
    )
}

export {Footer}